import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Zap } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-sm mt-auto">
      <div className="container mx-auto px-4 py-8">
        {/* Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <Link to="/" className="text-white/70 hover:text-white transition-colors">
            Home
          </Link>
          <span className="text-white/30">|</span>
          <Link to="/affiliate-dashboard" className="text-white/70 hover:text-white transition-colors">
            Affiliate Dashboard
          </Link>
          <span className="text-white/30">|</span>
          <Link to="/vendor-dashboard" className="text-white/70 hover:text-white transition-colors">
            Vendor Dashboard
          </Link>
          <span className="text-white/30">|</span>
          <Link to="/admin-dashboard" className="text-white/70 hover:text-white transition-colors">
            Admin Dashboard
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
          <Link to="/affiliate-signup">
            <Button className="bg-[#f7931a] hover:bg-[#f7931a]/90 text-black hover:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">
              Join as Affiliate
            </Button>
          </Link>
          <Link to="/vendor-signup">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Start as Vendor
            </Button>
          </Link>
        </div>

        {/* Tagline */}
        <div className="text-center text-white/50 flex items-center justify-center gap-2">
          <span>Non-custodial affiliate network powered by Bitcoin Lightning</span>
          <Zap className="w-4 h-4 text-[#f7931a]" />
        </div>
      </div>
    </footer>
  );
}
