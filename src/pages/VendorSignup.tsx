import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Store, Loader2 } from 'lucide-react';
import { api } from '../utils/supabase/client';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';

export function VendorSignup() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    contactEmail: '',
    website: '',
    walletAddress: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.auth.signupVendor({
        businessName: formData.businessName,
        contactName: formData.contactName,
        email: formData.contactEmail,
        website: formData.website,
        walletAddress: formData.walletAddress,
        password: formData.password || `temp_${Date.now()}`
      });

      if (response.success) {
        toast.success('Vendor account created successfully!');
        setShowSuccess(true);
        await refreshUser();
      }
    } catch (error: any) {
      console.error('Vendor signup error:', error);
      toast.error(error.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/vendor-dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Store className="w-8 h-8 text-[#f7931a]" />
            <h1 className="text-4xl">Start Selling with TRADING POST</h1>
          </div>
          <p className="text-white/60">Create affiliate campaigns and let our network promote your products</p>
        </div>

        {/* Form */}
        <Card className="bg-secondary border-white/10 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                type="text"
                placeholder="Your Store Name"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="bg-black border-white/20 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Name</Label>
              <Input
                id="contactName"
                type="text"
                placeholder="John Doe"
                value={formData.contactName}
                onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                className="bg-black border-white/20 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="store@example.com"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="bg-black border-white/20 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website / Store URL</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://yourstore.com"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="bg-black border-white/20 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password (Optional)</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password (optional)"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-black border-white/20 text-white"
              />
              <p className="text-xs text-white/50">Leave blank to auto-generate a password</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="walletAddress">Bitcoin Lightning Wallet Address</Label>
              <Input
                id="walletAddress"
                type="text"
                placeholder="lnbc1..."
                value={formData.walletAddress}
                onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                className="bg-black border-white/20 text-white font-mono"
                required
              />
              <p className="text-xs text-white/50">You'll set pricing when creating campaigns in your dashboard</p>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-[#f7931a] hover:bg-[#f7931a]/90 text-black hover:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Vendor Account'
              )}
            </Button>
          </form>
        </Card>

        {/* Info */}
        <Card className="mt-6 bg-secondary/50 border-white/10 p-4">
          <h3 className="mb-2">Why Choose TRADING POST?</h3>
          <ul className="space-y-2 text-sm text-white/60">
            <li>• Pay only when you make actual profit</li>
            <li>• Access to a network of motivated affiliates</li>
            <li>• Transparent tracking and instant settlements</li>
            <li>• Non-custodial payments via Lightning Network</li>
          </ul>
        </Card>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-secondary border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Store className="w-6 h-6 text-[#f7931a]" />
              Welcome to TRADING POST!
            </DialogTitle>
            <DialogDescription className="text-white/70">
              You can now create campaigns in your Vendor Dashboard and start working with our affiliate network.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={handleSuccessClose}
            className="bg-[#f7931a] hover:bg-[#f7931a]/90 text-black hover:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all"
          >
            Go to Dashboard
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
