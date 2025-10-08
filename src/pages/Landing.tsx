import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Zap, DollarSign, Lock, FileText, Bitcoin, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Landing() {
  const [stats, setStats] = useState({
    affiliates: 1247,
    campaigns: 89,
    profits: 45632.50,
    conversions: 3891
  });

  // Simulate live stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        affiliates: prev.affiliates + Math.floor(Math.random() * 3),
        campaigns: prev.campaigns + (Math.random() > 0.9 ? 1 : 0),
        profits: prev.profits + (Math.random() * 100),
        conversions: prev.conversions + Math.floor(Math.random() * 5)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-20 py-12">
        <div className="mb-6">
          <h1 className="text-4xl md:text-6xl mb-4 bg-gradient-to-r from-white via-[#f7931a] to-white bg-clip-text text-transparent">
            THE LOST+UNFOUNDS presents
          </h1>
          <h2 className="text-5xl md:text-7xl mb-6">TRADING POST</h2>
        </div>
        
        <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto">
          The non-custodial affiliate network powered by Bitcoin Lightning <Zap className="inline w-6 h-6 text-[#f7931a]" />
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/affiliate-signup">
            <Button size="lg" className="bg-[#f7931a] hover:bg-[#f7931a]/90 text-black hover:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">
              Join as Affiliate
            </Button>
          </Link>
          <Link to="/vendor-signup">
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all">
              Start as Vendor
            </Button>
          </Link>
        </div>
      </section>

      {/* Live Stats Section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-secondary border-white/10 p-6 text-center">
            <div className="text-3xl mb-2">{stats.affiliates.toLocaleString()}</div>
            <div className="text-white/50">Total Affiliates</div>
          </Card>
          <Card className="bg-secondary border-white/10 p-6 text-center">
            <div className="text-3xl mb-2">{stats.campaigns}</div>
            <div className="text-white/50">Active Campaigns</div>
          </Card>
          <Card className="bg-secondary border-white/10 p-6 text-center">
            <div className="text-3xl mb-2">${stats.profits.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
            <div className="text-white/50">Total Profits Generated</div>
          </Card>
          <Card className="bg-secondary border-white/10 p-6 text-center">
            <div className="text-3xl mb-2">{stats.conversions.toLocaleString()}</div>
            <div className="text-white/50">Total Conversions</div>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-20">
        <h2 className="text-3xl mb-8 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-secondary border-white/10 p-8 text-center hover:border-[#f7931a]/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#f7931a]/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-[#f7931a]">1</span>
            </div>
            <h3 className="mb-3">Vendors Create Campaigns</h3>
            <p className="text-white/60">Vendors set up profit-based campaigns with flexible reward structures</p>
          </Card>
          <Card className="bg-secondary border-white/10 p-8 text-center hover:border-[#f7931a]/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#f7931a]/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-[#f7931a]">2</span>
            </div>
            <h3 className="mb-3">Affiliates Promote</h3>
            <p className="text-white/60">Generate custom links and share products with your audience</p>
          </Card>
          <Card className="bg-secondary border-white/10 p-8 text-center hover:border-[#f7931a]/50 transition-colors">
            <div className="w-12 h-12 rounded-full bg-[#f7931a]/20 flex items-center justify-center mx-auto mb-4">
              <span className="text-[#f7931a]">3</span>
            </div>
            <h3 className="mb-3">Instant Lightning Payouts</h3>
            <p className="text-white/60">Verified conversions trigger automatic payouts directly to your wallet</p>
          </Card>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mb-20">
        <h2 className="text-3xl mb-8 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-secondary border-white/10 p-6">
            <Zap className="w-8 h-8 text-[#f7931a] mb-3" />
            <h3 className="mb-2">Instant Payouts</h3>
            <p className="text-white/60">Get paid instantly via Bitcoin Lightning network</p>
          </Card>
          <Card className="bg-secondary border-white/10 p-6">
            <DollarSign className="w-8 h-8 text-[#f7931a] mb-3" />
            <h3 className="mb-2">Profit-Based Earnings</h3>
            <p className="text-white/60">Earn a percentage of profits you generate.</p>
          </Card>
          <Card className="bg-secondary border-white/10 p-6">
            <Lock className="w-8 h-8 text-[#f7931a] mb-3" />
            <h3 className="mb-2">Non-Custodial</h3>
            <p className="text-white/60">Payments go directly to your wallet, never held by platform</p>
          </Card>
          <Card className="bg-secondary border-white/10 p-6">
            <FileText className="w-8 h-8 text-[#f7931a] mb-3" />
            <h3 className="mb-2">Transparent Tracking</h3>
            <p className="text-white/60">Real-time campaign analytics and conversion tracking</p>
          </Card>
          <Card className="bg-secondary border-white/10 p-6">
            <Bitcoin className="w-8 h-8 text-[#f7931a] mb-3" />
            <h3 className="mb-2">Bitcoin Lightning</h3>
            <p className="text-white/60">Fast, low-fee payments on the Lightning Network</p>
          </Card>
          <Card className="bg-secondary border-white/10 p-6">
            <Sparkles className="w-8 h-8 text-[#f7931a] mb-3" />
            <h3 className="mb-2">Lifetime Attribution</h3>
            <p className="text-white/60">Get credit for customer lifetime value, not just first purchase</p>
          </Card>
        </div>
      </section>

      {/* Testimonials Placeholder */}
      <section className="mb-20">
        <h2 className="text-3xl mb-8 text-center">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="bg-secondary border-white/10 p-6">
            <p className="text-white/80 mb-4">"Finally, a truly non-custodial affiliate platform. Instant payouts via Lightning are a game-changer."</p>
            <div className="text-white/50">— Alex, Affiliate Marketer</div>
          </Card>
          <Card className="bg-secondary border-white/10 p-6">
            <p className="text-white/80 mb-4">"The profit-based model aligns incentives perfectly. We only pay when we actually make money."</p>
            <div className="text-white/50">— Jordan, E-commerce Vendor</div>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="text-center py-12">
        <h2 className="text-3xl mb-6">Get Started Today</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/affiliate-signup">
            <Button size="lg" className="bg-[#f7931a] hover:bg-[#f7931a]/90 text-black hover:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">
              Join as Affiliate
            </Button>
          </Link>
          <Link to="/vendor-signup">
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all">
              Start as Vendor
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
