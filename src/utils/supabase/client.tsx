import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;

// Singleton instance
let supabaseInstance: ReturnType<typeof createSupabaseClient> | null = null;

export function createClient() {
  if (!supabaseInstance) {
    supabaseInstance = createSupabaseClient(supabaseUrl, publicAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  }
  return supabaseInstance;
}

// API helper functions
export const api = {
  baseUrl: `https://${projectId}.supabase.co/functions/v1/make-server-31915980`,

  async request(endpoint: string, options: RequestInit = {}) {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': session?.access_token ? `Bearer ${session.access_token}` : `Bearer ${publicAnonKey}`,
      ...options.headers,
    };

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  },

  // Auth endpoints
  auth: {
    signupAffiliate: (data: any) => 
      api.request('/auth/signup/affiliate', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    
    signupVendor: (data: any) => 
      api.request('/auth/signup/vendor', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    
    login: (data: { email: string; password: string }) => 
      api.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    
    me: () => api.request('/auth/me'),
  },

  // Campaign endpoints
  campaigns: {
    create: (data: any) => 
      api.request('/campaigns', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    
    getAll: () => api.request('/campaigns'),
    
    getById: (id: string) => api.request(`/campaigns/${id}`),
    
    updateStatus: (id: string, status: string) => 
      api.request(`/campaigns/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      }),
  },

  // Payment endpoints
  payments: {
    getAll: () => api.request('/payments'),
    
    create: (data: any) => 
      api.request('/payments', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },

  // Stats endpoints
  stats: {
    platform: () => api.request('/stats/platform'),
    
    affiliate: (id: string) => api.request(`/stats/affiliate/${id}`),
  },

  // Referral endpoints
  referrals: {
    track: (data: { referrerDisplayName: string; newAffiliateId: string }) => 
      api.request('/referrals', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },
};
