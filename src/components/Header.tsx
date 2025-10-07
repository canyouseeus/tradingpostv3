import { Link, useNavigate } from 'react-router-dom';
import { Zap, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export function Header() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Zap className="w-5 h-5 text-[#f7931a]" />
            <span className="text-white">THE LOST+UNFOUNDS | TRADING POST</span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">
              Home
            </Link>
            {!user && (
              <>
                <Link to="/affiliate-signup" className="text-white/70 hover:text-white transition-colors">
                  Affiliate Signup
                </Link>
                <Link to="/vendor-signup" className="text-white/70 hover:text-white transition-colors">
                  Vendor Signup
                </Link>
              </>
            )}
            {user?.role === 'affiliate' && (
              <Link to="/affiliate-dashboard" className="text-white/70 hover:text-white transition-colors">
                Dashboard
              </Link>
            )}
            {user?.role === 'vendor' && (
              <Link to="/vendor-dashboard" className="text-white/70 hover:text-white transition-colors">
                Dashboard
              </Link>
            )}
            {user?.role === 'admin' && (
              <Link to="/admin-dashboard" className="text-white/70 hover:text-white transition-colors">
                Admin Dashboard
              </Link>
            )}
            
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                    <User className="w-4 h-4 mr-2" />
                    {user.displayName || user.businessName || user.email}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-secondary border-white/10">
                  <DropdownMenuItem onClick={handleSignOut} className="text-white/70 hover:text-white cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
