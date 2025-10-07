import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from './components/ui/sonner';
import { Layout } from './components/Layout';
import { Landing } from './pages/Landing';
import { AffiliateSignup } from './pages/AffiliateSignup';
import { VendorSignup } from './pages/VendorSignup';
import { AffiliateDashboard } from './pages/AffiliateDashboard';
import { VendorDashboard } from './pages/VendorDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { PaymentHistory } from './pages/PaymentHistory';

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/affiliate-signup" element={<AffiliateSignup />} />
            <Route path="/vendor-signup" element={<VendorSignup />} />
            <Route path="/affiliate-dashboard" element={<AffiliateDashboard />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/payment-history" element={<PaymentHistory />} />
          </Routes>
        </Layout>
        <Toaster />
      </AuthProvider>
    </HashRouter>
  );
}
