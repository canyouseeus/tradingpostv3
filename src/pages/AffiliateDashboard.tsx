import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Home, Copy, Check, Search, Users, ExternalLink, Settings } from 'lucide-react';
import { BalanceCard } from '../components/BalanceCard';
import { PayoutPreferences } from '../components/PayoutPreferences';
import { EarningsSplitEditor, WalletSplit } from '../components/EarningsSplitEditor';
import { UnifiedGraphCard } from '../components/UnifiedGraphCard';
import { MLMTreeVisualization, MLMNode } from '../components/MLMTreeVisualization';
import { WalletType } from '../components/WalletSelector';
import { toast } from 'sonner@2.0.3';

export function AffiliateDashboard() {
  const [copied, setCopied] = useState(false);
  const [autoPayoutEnabled, setAutoPayoutEnabled] = useState(false);
  const [minPayoutThreshold, setMinPayoutThreshold] = useState(50);
  const [walletType, setWalletType] = useState<WalletType>('lightning');
  const [walletAddress, setWalletAddress] = useState('lnbc1pvjluezpp5qqqsyqcyq5...');
  const [withdrawing, setWithdrawing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [walletSplits, setWalletSplits] = useState<WalletSplit[]>([
    {
      id: '1',
      walletType: 'lightning',
      address: 'lnbc1pvjluezpp5qqqsyqcyq5...',
      percentage: 100
    }
  ]);

  const displayName = 'CryptoMarketer';
  const referralLink = `https://tradingpost.io/ref/${displayName.toLowerCase()}`;

  // Balance data
  const balanceData = {
    pending: 127.45,
    available: 234.80,
    lifetime: 6234.90
  };

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Link copied to clipboard!');
  };

  const handleWithdraw = async () => {
    setWithdrawing(true);
    // Simulate withdrawal
    await new Promise(resolve => setTimeout(resolve, 2000));
    setWithdrawing(false);
    toast.success(`Withdrawal of $${balanceData.available.toFixed(2)} initiated via ${walletType === 'lightning' ? 'Lightning' : 'Strike'}!`);
  };

  // Mock MLM network data
  const mlmNetwork: MLMNode = {
    id: '1',
    displayName: displayName,
    level: 1,
    clicks: 1247,
    conversions: 23,
    earned: 432.50,
    joinedDate: '2025-01-15',
    children: [
      {
        id: '2',
        displayName: 'BitcoinFan123',
        level: 2,
        clicks: 456,
        conversions: 8,
        earned: 156.30,
        joinedDate: '2025-02-10',
        children: [
          {
            id: '5',
            displayName: 'CryptoNewbie',
            level: 3,
            clicks: 123,
            conversions: 2,
            earned: 34.50,
            joinedDate: '2025-03-05'
          },
          {
            id: '6',
            displayName: 'SatsStacker',
            level: 3,
            clicks: 234,
            conversions: 4,
            earned: 67.20,
            joinedDate: '2025-03-12'
          }
        ]
      },
      {
        id: '3',
        displayName: 'LightningLover',
        level: 2,
        clicks: 789,
        conversions: 12,
        earned: 245.80,
        joinedDate: '2025-02-18',
        children: [
          {
            id: '7',
            displayName: 'NodeRunner99',
            level: 3,
            clicks: 345,
            conversions: 6,
            earned: 89.40,
            joinedDate: '2025-03-20'
          }
        ]
      },
      {
        id: '4',
        displayName: 'SatoshiSells',
        level: 2,
        clicks: 567,
        conversions: 9,
        earned: 189.20,
        joinedDate: '2025-02-25'
      }
    ]
  };

  const campaigns = [
    {
      id: 1,
      name: 'Premium Bitcoin Hardware Wallet',
      vendor: 'SecureStore',
      rewardType: 'Flat 20%',
      hasMLM: true,
      mlmDepth: 3,
      clicks: 1247,
      conversions: 23,
      earnings: 432.50,
      status: 'active'
    },
    {
      id: 2,
      name: 'Lightning Node Starter Kit',
      vendor: 'NodeRunner Co',
      rewardType: 'Percentage + Points',
      hasMLM: false,
      clicks: 892,
      conversions: 17,
      earnings: 289.30,
      status: 'active'
    },
    {
      id: 3,
      name: 'Crypto Trading Course',
      vendor: 'BitcoinEdu',
      rewardType: 'MLM 3-level',
      hasMLM: true,
      mlmDepth: 3,
      clicks: 634,
      conversions: 12,
      earnings: 156.75,
      status: 'active'
    }
  ];

  const filteredCampaigns = campaigns.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.vendor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back to Home */}
      <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
        <Home className="w-4 h-4" />
        Back to Landing Page
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Affiliate Dashboard</h1>
        <p className="text-white/60">Hi {displayName}, here's your performance summary</p>
      </div>

      {/* Top Section: Balance + Payout Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <BalanceCard
          pending={balanceData.pending}
          available={balanceData.available}
          lifetime={balanceData.lifetime}
        />
        
        <PayoutPreferences
          autoPayoutEnabled={autoPayoutEnabled}
          minPayoutThreshold={minPayoutThreshold}
          walletType={walletType}
          walletAddress={walletAddress}
          availableBalance={balanceData.available}
          onAutoPayoutChange={setAutoPayoutEnabled}
          onThresholdChange={setMinPayoutThreshold}
          onWalletTypeChange={setWalletType}
          onWalletAddressChange={setWalletAddress}
          onWithdraw={handleWithdraw}
          withdrawing={withdrawing}
        />
      </div>

      {/* Earnings Split Configuration */}
      <div className="mb-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Settings className="w-4 h-4 mr-2" />
              Configure Earnings Split ({walletSplits.length} wallet{walletSplits.length !== 1 ? 's' : ''})
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-secondary border-white/10 text-white max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Earnings Split Configuration</DialogTitle>
              <DialogDescription className="text-white/70">
                Split your payouts across multiple wallets
              </DialogDescription>
            </DialogHeader>
            <EarningsSplitEditor
              splits={walletSplits}
              onChange={setWalletSplits}
            />
            <div className="flex justify-end gap-3 mt-4">
              <DialogTrigger asChild>
                <Button variant="outline" className="border-white/20 text-white">
                  Cancel
                </Button>
              </DialogTrigger>
              <Button
                className="bg-[#f7931a] hover:bg-[#f7931a]/90 text-black"
                onClick={() => {
                  toast.success('Earnings split configuration saved!');
                }}
              >
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Unified Analytics Graph */}
      <div className="mb-8">
        <UnifiedGraphCard
          title="Performance Analytics"
          categories={['clicks', 'conversions', 'profit']}
          defaultCategory="conversions"
          timeframes={['hourly', 'daily', 'weekly', 'monthly', 'yearly']}
          defaultTimeframe="daily"
        />
      </div>

      {/* Referral Tools */}
      <Card className="bg-secondary border-white/10 p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-[#f7931a]" />
          <h2>Referral Tools</h2>
        </div>
        <p className="text-white/60 mb-4">Share your unique referral link to grow your network and earn from downline commissions</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Card className="bg-black border-white/10 p-4">
            <div className="text-sm text-white/60 mb-2">Your Referral Link</div>
            <div className="flex items-center gap-2">
              <code className="flex-1 text-sm text-[#f7931a] break-all">{referralLink}</code>
              <Button
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={() => handleCopyLink(referralLink)}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </Card>

          <Card className="bg-black border-white/10 p-4">
            <div className="text-sm text-white/60 mb-2">Network Stats</div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl">{mlmNetwork.children?.length || 0}</div>
                <div className="text-xs text-white/50">Direct Referrals</div>
              </div>
              <div>
                <div className="text-2xl text-[#14f195]">$189.50</div>
                <div className="text-xs text-white/50">Network Earnings</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="flex gap-2">
          <Link to="/campaigns" className="flex-1">
            <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
              <ExternalLink className="w-4 h-4 mr-2" />
              Browse Campaigns
            </Button>
          </Link>
        </div>
      </Card>

      {/* MLM Network Visualization */}
      <div className="mb-8">
        <MLMTreeVisualization rootNode={mlmNetwork} maxDepth={3} />
      </div>

      {/* Active Campaigns */}
      <Card className="bg-secondary border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2>My Active Campaigns</h2>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              type="text"
              placeholder="Search campaigns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black border-white/20 text-white pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10">
                <TableHead>Campaign</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Reward</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
                <TableHead className="text-right">Earnings</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCampaigns.map(campaign => (
                <TableRow key={campaign.id} className="border-white/10">
                  <TableCell>
                    <div>
                      <div>{campaign.name}</div>
                      {campaign.hasMLM && (
                        <Badge variant="outline" className="mt-1 border-[#14f195]/30 text-[#14f195] text-xs">
                          MLM {campaign.mlmDepth}-Level
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-white/60">{campaign.vendor}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-[#f7931a]/30 text-[#f7931a]">
                      {campaign.rewardType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{campaign.clicks.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-[#14f195]">{campaign.conversions}</TableCell>
                  <TableCell className="text-right text-[#f7931a]">${campaign.earnings.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className="bg-[#14f195]/20 text-[#14f195] border-[#14f195]/30">
                      Active
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex justify-center">
          <Link to="/campaigns">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <ExternalLink className="w-4 h-4 mr-2" />
              Browse More Campaigns
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
