import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2.39.3";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-31915980/health", (c) => {
  return c.json({ status: "ok" });
});

// ============================================
// AUTHENTICATION ROUTES
// ============================================

// Affiliate Signup
app.post("/make-server-31915980/auth/signup/affiliate", async (c) => {
  try {
    const body = await c.req.json();
    const { fullName, displayName, email, walletAddress, password } = body;

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password: password || `temp_${Date.now()}`, // Generate temp password if not provided
      user_metadata: { 
        fullName,
        displayName,
        walletAddress,
        role: 'affiliate',
        createdAt: new Date().toISOString()
      },
      email_confirm: true // Auto-confirm since we don't have email server configured
    });

    if (authError) {
      console.error('Affiliate signup auth error:', authError);
      return c.json({ error: authError.message }, 400);
    }

    // Store affiliate profile in KV store
    const affiliateProfile = {
      id: authData.user.id,
      fullName,
      displayName,
      email,
      walletAddress,
      role: 'affiliate',
      totalEarnings: 0,
      totalClicks: 0,
      totalConversions: 0,
      activeCampaigns: [],
      referralCode: displayName.toLowerCase(),
      downlineAffiliates: [],
      createdAt: new Date().toISOString()
    };

    await kv.set(`user:${authData.user.id}`, affiliateProfile);
    await kv.set(`affiliate:${authData.user.id}`, affiliateProfile);
    await kv.set(`displayName:${displayName.toLowerCase()}`, authData.user.id);

    return c.json({ 
      success: true, 
      userId: authData.user.id,
      displayName,
      message: 'Affiliate account created successfully' 
    });
  } catch (error) {
    console.error('Affiliate signup error:', error);
    return c.json({ error: 'Failed to create affiliate account' }, 500);
  }
});

// Vendor Signup
app.post("/make-server-31915980/auth/signup/vendor", async (c) => {
  try {
    const body = await c.req.json();
    const { businessName, contactName, email, website, walletAddress, password } = body;

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password: password || `temp_${Date.now()}`,
      user_metadata: { 
        businessName,
        contactName,
        walletAddress,
        website,
        role: 'vendor',
        createdAt: new Date().toISOString()
      },
      email_confirm: true
    });

    if (authError) {
      console.error('Vendor signup auth error:', authError);
      return c.json({ error: authError.message }, 400);
    }

    // Store vendor profile in KV store
    const vendorProfile = {
      id: authData.user.id,
      businessName,
      contactName,
      email,
      website,
      walletAddress,
      role: 'vendor',
      campaigns: [],
      totalSpent: 0,
      totalConversions: 0,
      status: 'approved', // Auto-approve for prototype
      createdAt: new Date().toISOString()
    };

    await kv.set(`user:${authData.user.id}`, vendorProfile);
    await kv.set(`vendor:${authData.user.id}`, vendorProfile);

    return c.json({ 
      success: true, 
      userId: authData.user.id,
      businessName,
      message: 'Vendor account created successfully' 
    });
  } catch (error) {
    console.error('Vendor signup error:', error);
    return c.json({ error: 'Failed to create vendor account' }, 500);
  }
});

// Login (works for both affiliates and vendors)
app.post("/make-server-31915980/auth/login", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    // Sign in with Supabase Auth
    const { data: sessionData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError) {
      console.error('Login error:', authError);
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // Get user profile
    const userProfile = await kv.get(`user:${sessionData.user.id}`);

    return c.json({
      success: true,
      accessToken: sessionData.session.access_token,
      user: userProfile,
      role: userProfile?.role || 'unknown'
    });
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'Login failed' }, 500);
  }
});

// Get current user (requires auth)
app.get("/make-server-31915980/auth/me", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userProfile = await kv.get(`user:${user.id}`);
    return c.json({ success: true, user: userProfile });
  } catch (error) {
    console.error('Get user error:', error);
    return c.json({ error: 'Failed to get user' }, 500);
  }
});

// ============================================
// CAMPAIGN ROUTES
// ============================================

// Create Campaign (Vendor only)
app.post("/make-server-31915980/campaigns", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { 
      name, 
      type, 
      rewardPercentage, 
      budget, 
      costPrice, 
      retailPrice,
      enableMLM, 
      mlmDepth, 
      mlmTiers 
    } = body;

    const campaignId = `campaign_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    
    const campaign = {
      id: campaignId,
      vendorId: user.id,
      name,
      type,
      rewardPercentage,
      budget,
      costPrice,
      retailPrice,
      profit: retailPrice - costPrice,
      enableMLM: enableMLM || false,
      mlmDepth: mlmDepth || 0,
      mlmTiers: mlmTiers || [],
      status: 'active',
      spent: 0,
      conversions: 0,
      affiliates: [],
      createdAt: new Date().toISOString()
    };

    await kv.set(`campaign:${campaignId}`, campaign);

    // Update vendor's campaigns list
    const vendorProfile = await kv.get(`vendor:${user.id}`);
    if (vendorProfile) {
      vendorProfile.campaigns = vendorProfile.campaigns || [];
      vendorProfile.campaigns.push(campaignId);
      await kv.set(`vendor:${user.id}`, vendorProfile);
      await kv.set(`user:${user.id}`, vendorProfile);
    }

    return c.json({ success: true, campaign });
  } catch (error) {
    console.error('Create campaign error:', error);
    return c.json({ error: 'Failed to create campaign' }, 500);
  }
});

// Get all campaigns
app.get("/make-server-31915980/campaigns", async (c) => {
  try {
    const campaigns = await kv.getByPrefix('campaign:');
    return c.json({ success: true, campaigns });
  } catch (error) {
    console.error('Get campaigns error:', error);
    return c.json({ error: 'Failed to get campaigns' }, 500);
  }
});

// Get campaign by ID
app.get("/make-server-31915980/campaigns/:id", async (c) => {
  try {
    const campaignId = c.req.param('id');
    const campaign = await kv.get(`campaign:${campaignId}`);
    
    if (!campaign) {
      return c.json({ error: 'Campaign not found' }, 404);
    }

    return c.json({ success: true, campaign });
  } catch (error) {
    console.error('Get campaign error:', error);
    return c.json({ error: 'Failed to get campaign' }, 500);
  }
});

// Update campaign status (pause/resume)
app.patch("/make-server-31915980/campaigns/:id/status", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const campaignId = c.req.param('id');
    const body = await c.req.json();
    const { status } = body;

    const campaign = await kv.get(`campaign:${campaignId}`);
    if (!campaign) {
      return c.json({ error: 'Campaign not found' }, 404);
    }

    if (campaign.vendorId !== user.id) {
      return c.json({ error: 'Unauthorized - not campaign owner' }, 403);
    }

    campaign.status = status;
    campaign.updatedAt = new Date().toISOString();
    await kv.set(`campaign:${campaignId}`, campaign);

    return c.json({ success: true, campaign });
  } catch (error) {
    console.error('Update campaign status error:', error);
    return c.json({ error: 'Failed to update campaign status' }, 500);
  }
});

// ============================================
// PAYMENT ROUTES
// ============================================

// Get payment history for user
app.get("/make-server-31915980/payments", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // Get all payments for this user
    const allPayments = await kv.getByPrefix(`payment:user:${user.id}:`);
    
    return c.json({ success: true, payments: allPayments });
  } catch (error) {
    console.error('Get payments error:', error);
    return c.json({ error: 'Failed to get payments' }, 500);
  }
});

// Create payment (simulation for prototype)
app.post("/make-server-31915980/payments", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    if (error || !user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const body = await c.req.json();
    const { campaignId, amount, affiliateId } = body;

    const paymentId = `payment_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const payment = {
      id: paymentId,
      campaignId,
      affiliateId: affiliateId || user.id,
      amount,
      status: 'pending',
      pendingUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      txId: null,
      createdAt: new Date().toISOString()
    };

    await kv.set(`payment:${paymentId}`, payment);
    await kv.set(`payment:user:${affiliateId || user.id}:${paymentId}`, payment);

    return c.json({ success: true, payment });
  } catch (error) {
    console.error('Create payment error:', error);
    return c.json({ error: 'Failed to create payment' }, 500);
  }
});

// ============================================
// STATISTICS ROUTES
// ============================================

// Get platform stats (admin)
app.get("/make-server-31915980/stats/platform", async (c) => {
  try {
    const affiliates = await kv.getByPrefix('affiliate:');
    const vendors = await kv.getByPrefix('vendor:');
    const campaigns = await kv.getByPrefix('campaign:');
    const payments = await kv.getByPrefix('payment:');

    const activeCampaigns = campaigns.filter((c: any) => c.status === 'active').length;
    const totalPayments = payments.reduce((sum: number, p: any) => sum + (p.amount || 0), 0);

    return c.json({
      success: true,
      stats: {
        totalAffiliates: affiliates.length,
        totalVendors: vendors.length,
        totalCampaigns: campaigns.length,
        activeCampaigns,
        totalPayments,
        platformEarnings: totalPayments * 0.03 // 3% platform fee
      }
    });
  } catch (error) {
    console.error('Get platform stats error:', error);
    return c.json({ error: 'Failed to get platform stats' }, 500);
  }
});

// Get affiliate stats
app.get("/make-server-31915980/stats/affiliate/:id", async (c) => {
  try {
    const affiliateId = c.req.param('id');
    const affiliate = await kv.get(`affiliate:${affiliateId}`);
    
    if (!affiliate) {
      return c.json({ error: 'Affiliate not found' }, 404);
    }

    const payments = await kv.getByPrefix(`payment:user:${affiliateId}:`);
    const totalEarnings = payments.reduce((sum: number, p: any) => sum + (p.amount || 0), 0);
    const pendingEarnings = payments
      .filter((p: any) => p.status === 'pending')
      .reduce((sum: number, p: any) => sum + (p.amount || 0), 0);

    return c.json({
      success: true,
      stats: {
        totalEarnings,
        pendingEarnings,
        totalClicks: affiliate.totalClicks || 0,
        totalConversions: affiliate.totalConversions || 0,
        activeCampaigns: affiliate.activeCampaigns?.length || 0,
        downlineCount: affiliate.downlineAffiliates?.length || 0
      }
    });
  } catch (error) {
    console.error('Get affiliate stats error:', error);
    return c.json({ error: 'Failed to get affiliate stats' }, 500);
  }
});

// ============================================
// REFERRAL ROUTES
// ============================================

// Track referral signup
app.post("/make-server-31915980/referrals", async (c) => {
  try {
    const body = await c.req.json();
    const { referrerDisplayName, newAffiliateId } = body;

    // Get referrer by display name
    const referrerId = await kv.get(`displayName:${referrerDisplayName.toLowerCase()}`);
    if (!referrerId) {
      return c.json({ error: 'Referrer not found' }, 404);
    }

    // Update referrer's downline list
    const referrer = await kv.get(`affiliate:${referrerId}`);
    if (referrer) {
      referrer.downlineAffiliates = referrer.downlineAffiliates || [];
      referrer.downlineAffiliates.push(newAffiliateId);
      await kv.set(`affiliate:${referrerId}`, referrer);
      await kv.set(`user:${referrerId}`, referrer);
    }

    return c.json({ success: true, message: 'Referral tracked' });
  } catch (error) {
    console.error('Track referral error:', error);
    return c.json({ error: 'Failed to track referral' }, 500);
  }
});

Deno.serve(app.fetch);
