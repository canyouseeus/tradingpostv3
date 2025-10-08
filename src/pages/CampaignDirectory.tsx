import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Search, Home, Store, Network, TrendingUp, DollarSign, ExternalLink } from 'lucide-react';

interface Campaign {
  id: number;
  name: string;
  vendor: string;
  rewardType: string;
  rewardPercent: number;
  hasMLM: boolean;
  mlmDepth?: number;
  category: string;
  status: 'active' | 'paused';
  affiliates: number;
  avgPayout: number;
  description: string;
  createdDate: string;
}

export function CampaignDirectory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterReward, setFilterReward] = useState('all');
  const [filterMLM, setFilterMLM] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [customLink, setCustomLink] = useState('');

  const campaigns: Campaign[] = [
    {
      id: 1,
      name: 'Premium Bitcoin Hardware Wallet',
      vendor: 'SecureStore',
      rewardType: 'Flat 20%',
      rewardPercent: 20,
      hasMLM: true,
      mlmDepth: 3,
      category: 'Hardware',
      status: 'active',
      affiliates: 89,
      avgPayout: 45.50,
      description: 'Top-tier cold storage wallet with military-grade security. Perfect for serious Bitcoin holders.',
      createdDate: '2025-09-15'
    },
    {
      id: 2,
      name: 'Lightning Node Starter Kit',
      vendor: 'NodeRunner Co',
      rewardType: 'Percentage + Points',
      rewardPercent: 15,
      hasMLM: false,
      category: 'Software',
      status: 'active',
      affiliates: 67,
      avgPayout: 32.80,
      description: 'Everything needed to run your own Lightning Network node. Earn routing fees and support the network.',
      createdDate: '2025-08-22'
    },
    {
      id: 3,
      name: 'Crypto Trading Course',
      vendor: 'BitcoinEdu',
      rewardType: 'MLM 3-level',
      rewardPercent: 25,
      hasMLM: true,
      mlmDepth: 3,
      category: 'Education',
      status: 'active',
      affiliates: 145,
      avgPayout: 67.20,
      description: 'Comprehensive trading course covering TA, risk management, and market psychology.',
      createdDate: '2025-07-10'
    },
    {
      id: 4,
      name: 'Bitcoin Mining Hardware',
      vendor: 'MinerDirect',
      rewardType: 'Flat 12%',
      rewardPercent: 12,
      hasMLM: false,
      category: 'Hardware',
      status: 'active',
      affiliates: 34,
      avgPayout: 156.00,
      description: 'Latest generation ASIC miners with industry-best efficiency ratings.',
      createdDate: '2025-10-01'
    },
    {
      id: 5,
      name: 'Lightning Wallet Premium',
      vendor: 'FastPay',
      rewardType: 'Flat 18%',
      rewardPercent: 18,
      hasMLM: true,
      mlmDepth: 2,
      category: 'Software',
      status: 'active',
      affiliates: 203,
      avgPayout: 28.40,
      description: 'User-friendly Lightning wallet with advanced features and instant transactions.',
      createdDate: '2025-06-18'
    }
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesReward = filterReward === 'all' || campaign.rewardType.toLowerCase().includes(filterReward);
    const matchesMLM = filterMLM === 'all' || 
                      (filterMLM === 'mlm' && campaign.hasMLM) ||
                      (filterMLM === 'no-mlm' && !campaign.hasMLM);
    const matchesCategory = filterCategory === 'all' || campaign.category === filterCategory;
    
    return matchesSearch && matchesReward && matchesMLM && matchesCategory && campaign.status === 'active';
  }).sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
    if (sortBy === 'oldest') return new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime();
    if (sortBy === 'payout') return b.avgPayout - a.avgPayout;
    if (sortBy === 'affiliates') return b.affiliates - a.affiliates;
    return 0;
  });

  const handleJoinCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };

  const handleGenerateCustomLink = () => {
    const utmParams = customLink ? `?utm=${encodeURIComponent(customLink)}` : '';
    const link = `https://tradingpost.io/c/${selectedCampaign?.id}/ref/yourname${utmParams}`;
    navigator.clipboard.writeText(link);
    alert('Custom link copied to clipboard!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back to Home */}
      <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
        <Home className="w-4 h-4" />
        Back to Landing Page
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Campaign Directory</h1>
        <p className="text-white/60">Browse and join active affiliate campaigns</p>
      </div>

      {/* Filters */}
      <Card className="bg-secondary border-white/10 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                type="text"
                placeholder="Search campaigns or vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-black border-white/20 text-white pl-10"
              />
            </div>
          </div>

          {/* Reward Type Filter */}
          <Select value={filterReward} onValueChange={setFilterReward}>
            <SelectTrigger className="bg-black border-white/20 text-white">
              <SelectValue placeholder="Reward Type" />
            </SelectTrigger>
            <SelectContent className="bg-secondary border-white/10 text-white">
              <SelectItem value="all">All Rewards</SelectItem>
              <SelectItem value="flat">Flat %</SelectItem>
              <SelectItem value="mlm">MLM</SelectItem>
              <SelectItem value="points">Points</SelectItem>
            </SelectContent>
          </Select>

          {/* MLM Filter */}
          <Select value={filterMLM} onValueChange={setFilterMLM}>
            <SelectTrigger className="bg-black border-white/20 text-white">
              <SelectValue placeholder="MLM" />
            </SelectTrigger>
            <SelectContent className="bg-secondary border-white/10 text-white">
              <SelectItem value="all">All Campaigns</SelectItem>
              <SelectItem value="mlm">MLM Enabled</SelectItem>
              <SelectItem value="no-mlm">No MLM</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="bg-black border-white/20 text-white">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="bg-secondary border-white/10 text-white">
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="payout">Highest Payout</SelectItem>
              <SelectItem value="affiliates">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 mt-4 text-sm text-white/60">
          <span>{filteredCampaigns.length} campaigns found</span>
        </div>
      </Card>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCampaigns.map(campaign => (
          <Card key={campaign.id} className="bg-secondary border-white/10 p-6 hover:border-white/20 transition-colors">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1 truncate">{campaign.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <Store className="w-3 h-3" />
                    {campaign.vendor}
                  </div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-[#f7931a] hover:bg-[#f7931a]/90 text-black hover:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all flex-shrink-0"
                      onClick={() => handleJoinCampaign(campaign)}
                    >
                      Join
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-secondary border-white/10 text-white max-w-lg">
                    <DialogHeader>
                      <DialogTitle>{campaign.name}</DialogTitle>
                      <DialogDescription className="text-white/70">
                        Generate your custom affiliate link
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <p className="text-sm mb-2">{campaign.description}</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm">Custom UTM / Note (optional)</label>
                        <Input
                          type="text"
                          placeholder="e.g., summer-promo or twitter-campaign"
                          value={customLink}
                          onChange={(e) => setCustomLink(e.target.value)}
                          className="bg-black border-white/20 text-white"
                        />
                      </div>
                      <Button
                        onClick={handleGenerateCustomLink}
                        className="w-full bg-[#f7931a] hover:bg-[#f7931a]/90 text-black"
                      >
                        Generate & Copy Link
                      </Button>
                      <p className="text-xs text-white/50">
                        Your link will be saved to "My Links" in your dashboard
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Description */}
              <p className="text-sm text-white/60 line-clamp-2">
                {campaign.description}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-[#f7931a]/30 text-[#f7931a]">
                  <DollarSign className="w-3 h-3 mr-1" />
                  {campaign.rewardPercent}% Commission
                </Badge>
                {campaign.hasMLM && (
                  <Badge variant="outline" className="border-[#14f195]/30 text-[#14f195]">
                    <Network className="w-3 h-3 mr-1" />
                    MLM {campaign.mlmDepth}-Level
                  </Badge>
                )}
                <Badge variant="outline" className="border-white/20 text-white/60">
                  {campaign.category}
                </Badge>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                <div>
                  <div className="text-xs text-white/50">Avg Payout</div>
                  <div className="text-[#f7931a]">${campaign.avgPayout.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-xs text-white/50">Active Affiliates</div>
                  <div className="text-white">{campaign.affiliates}</div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <Card className="bg-secondary border-white/10 p-12 text-center">
          <p className="text-white/60">No campaigns match your filters. Try adjusting your search criteria.</p>
        </Card>
      )}
    </div>
  );
}
