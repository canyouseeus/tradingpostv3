import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Zap, Loader2 } from 'lucide-react';
import { api } from '../utils/supabase/client';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner@2.0.3';

export function AffiliateSignup() {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    displayName: '',
    email: '',
    walletAddress: '',
    password: '',
    agreeToTerms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.auth.signupAffiliate({
        fullName: formData.fullName,
        displayName: formData.displayName,
        email: formData.email,
        walletAddress: formData.walletAddress,
        password: formData.password || `temp_${Date.now()}` // Generate temp password
      });

      if (response.success) {
        toast.success('Account created successfully!');
        setShowSuccess(true);
        await refreshUser();
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      toast.error(error.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate('/affiliate-dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-8 h-8 text-[#f7931a]" />
            <h1 className="text-4xl">Join TRADING POST as an Affiliate</h1>
          </div>
          <p className="text-white/60">Start earning instant Lightning payouts by promoting vendor campaigns</p>
        </div>

        {/* Form */}
        <Card className="bg-secondary border-white/10 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="bg-black border-white/20 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                type="text"
                placeholder="johndoe_crypto"
                value={formData.displayName}
                onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                className="bg-black border-white/20 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              <p className="text-xs text-white/50">This is where you'll receive your instant payouts</p>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                className="mt-1"
                required
              />
              <Label htmlFor="terms" className="cursor-pointer leading-relaxed">
                I agree to the terms and confirm I control this wallet. I understand that all payouts will be sent directly to my Lightning wallet address.
              </Label>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-[#f7931a] hover:bg-[#f7931a]/90 text-black hover:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all"
              disabled={!formData.agreeToTerms || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Sign Up and Start Earning'
              )}
            </Button>
          </form>
        </Card>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-secondary/50 border-white/10 p-4 text-center">
            <div className="text-2xl mb-1">⚡</div>
            <p className="text-sm text-white/60">Instant Payouts</p>
          </Card>
          <Card className="bg-secondary/50 border-white/10 p-4 text-center">
            <div className="text-2xl mb-1">🔒</div>
            <p className="text-sm text-white/60">Non-Custodial</p>
          </Card>
          <Card className="bg-secondary/50 border-white/10 p-4 text-center">
            <div className="text-2xl mb-1">💰</div>
            <p className="text-sm text-white/60">Profit-Based</p>
          </Card>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-secondary border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-[#f7931a]" />
              Welcome to TRADING POST!
            </DialogTitle>
            <DialogDescription className="text-white/70">
              Signup complete — your unique referral link is now active! Access your dashboard to start promoting campaigns and share your referral link with others.
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
