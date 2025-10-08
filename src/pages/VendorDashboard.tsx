import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Home, Store, TrendingUp, DollarSign, ShoppingCart, Plus, AlertCircle, Pause, Play, Trash2, Network, Users } from 'lucide-react';
import { AnalyticsCard } from '../components/AnalyticsCard';
import { Timeframe } from '../components/TimeframeSelector';
import { generateTimeframeData, generateChartData } from '../utils/analytics';

export function VendorDashboard() {
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [campaignType, setCampaignType] = useState('');
  const [costPrice, setCostPrice] = useState<number>(0);
  const [retailPrice, setRetailPrice] = useState<number>(0);
  const [lifetimeTracking, setLifetimeTracking] = useState(true);
  const [autoPayout, setAutoPayout] = useState(true);
  const [enableMLM, setEnableMLM] = useState(false);
  const [mlmDepth, setMLMDepth] = useState(3);
  const [mlmTiers, setMLMTiers] = useState([
    { level: 1, percentage: 10 },
    { level: 2, percentage: 5 },
    { level: 3, percentage: 3 }
  ]);
  const [revenueTimeframe, setRevenueTimeframe] = useState<Timeframe>('daily');
  const [conversionsTimeframe, setConversionsTimeframe] = useState<Timeframe>('daily');
  const [profitTimeframe, setProfitTimeframe] = useState<Timeframe>('daily');
  const [chartTimeframe, setChartTimeframe] = useState<Timeframe>('daily');

  const campaigns = [
    {
      id: 1,
      name: 'Premium Hardware Wallet',
      type: 'Flat 20%',
      hasMLM: true,
      mlmDepth: 3,
      status: 'Active',
      startDate: '2025-09-15',
      spent: 2.45,
      conversions: 156,
      profit: 7834.50,
      revenue: 15669.00,
      change30day: 'Cannot reduce',
      affiliates: 89
    },
    {
      id: 2,
      name: 'Lightning Node Kit',
      type: 'Percentage + Points',
      hasMLM: false,
      mlmDepth: 0,
      status: 'Active',
      startDate: '2025-08-22',
      spent: 1.87,
      conversions: 112,
      profit: 5623.20,
      revenue: 11246.40,
      change30day: 'Cannot reduce',
      affiliates: 67
    },
    {
      id: 3,
      name: 'Bitcoin Merch Collection',
      type: 'MLM 3-level',
      hasMLM: true,
      mlmDepth: 3,
      status: 'Paused',
      startDate: '2025-10-01',
      spent: 0.92,
      conversions: 45,
      profit: 2245.75,
      revenue: 4491.50,
      change30day: 'Can modify',
      affiliates: 34
    }
  ];

  const totalStats = campaigns.reduce((acc, c) => ({
    spent: acc.spent + c.spent,
    conversions: acc.conversions + c.conversions,
    profit: acc.profit + c.profit,
    revenue: acc.revenue + c.revenue
  }), { spent: 0, conversions: 0, profit: 0, revenue: 0 });

  // Generate dynamic stats based on timeframes
  const revenueData = generateTimeframeData(totalStats.revenue, revenueTimeframe);
  const conversionsData = generateTimeframeData(totalStats.conversions, conversionsTimeframe);
  const profitData = generateTimeframeData(totalStats.profit, profitTimeframe);

  // Chart data
  const revenueChartData = [
    { name: 'Week 1', revenue: 3245, conversions: 42, profit: 1622 },
    { name: 'Week 2', revenue: 4123, conversions: 53, profit: 2061 },
    { name: 'Week 3', revenue: 3891, conversions: 48, profit: 1945 },
    { name: 'Week 4', revenue: 4512, conversions: 58, profit: 2256 },
  ];

  const topAffiliates = [
    { id: 1, name: 'CryptoMarketer', sales: 42, revenue: 4234.50, tier: 'Tier 1' },
    { id: 2, name: 'BitcoinPromo', sales: 38, revenue: 3812.30, tier: 'Tier 1' },
    { id: 3, name: 'LightningFan', sales: 31, revenue: 3124.80, tier: 'Tier 2' },
    { id: 4, name: 'SatoshiSells', sales: 28, revenue: 2789.45, tier: 'Tier 1' },
    { id: 5, name: 'NodeRunner', sales: 24, revenue: 2412.67, tier: 'Tier 3' },
  ];

  const totalMLMTierPercentage = mlmTiers.reduce((sum, tier) => sum + tier.percentage, 0);

  // Calculate profit in real time
  const calculatedProfit = retailPrice - costPrice;
  const tradingPostFee = calculatedProfit * 0.03; // 3% fee
  const availableForAffiliates = calculatedProfit - tradingPostFee;

  const handleMLMTierChange = (level: number, percentage: number) => {
    setMLMTiers(prev => prev.map(tier => 
      tier.level === level ? { ...tier, percentage } : tier
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back to Home */}
      <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
        <Home className="w-4 h-4" />
        Back to Landing Page
      </Link>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl mb-2">Vendor Dashboard</h1>
          <p className="text-white/60">Manage your affiliate campaigns and track performance</p>
        </div>
        <Dialog open={showCreateCampaign} onOpenChange={setShowCreateCampaign}>
          <DialogTrigger asChild>
            <Button className="bg-[#f7931a] hover:bg-[#f7931a]/90 text-black">
              <Plus className="w-4 h-4 mr-2" />
              Create New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-secondary border-white/10 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
              <DialogDescription className="text-white/70">
                Set up a new affiliate campaign for your products
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Campaign Name</Label>
                <Input className="bg-black border-white/20 text-white" placeholder="e.g., Summer Sale Campaign" />
              </div>

              <div className="space-y-2">
                <Label>Campaign Type</Label>
                <Select onValueChange={setCampaignType}>
                  <SelectTrigger className="bg-black border-white/20 text-white">
                    <SelectValue placeholder="Select reward structure" />
                  </SelectTrigger>
                  <SelectContent className="bg-secondary border-white/10 text-white">
                    <SelectItem value="flat">Flat Rate</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="points">Reward Points</SelectItem>
                    <SelectItem value="mlm">MLM (up to 3 levels)</SelectItem>
                    <SelectItem value="combination">Combination</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cost Price ($)</Label>
                  <Input 
                    type="number" 
                    step="0.01" 
                    value={costPrice || ''} 
                    onChange={(e) => setCostPrice(parseFloat(e.target.value) || 0)}
                    className="bg-black border-white/20 text-white" 
                    placeholder="49.99" 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Retail Price ($)</Label>
                  <Input 
                    type="number" 
                    step="0.01" 
                    value={retailPrice || ''} 
                    onChange={(e) => setRetailPrice(parseFloat(e.target.value) || 0)}
                    className="bg-black border-white/20 text-white" 
                    placeholder="99.99" 
                  />
                </div>
              </div>

              <Card className="bg-black border-[#f7931a]/30 p-4">
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-white/70">Calculated Profit:</span>
                    <span className="text-[#f7931a]">${calculatedProfit >= 0 ? calculatedProfit.toFixed(2) : '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">TRADING POST Fee (3%):</span>
                    <span>${tradingPostFee >= 0 ? tradingPostFee.toFixed(2) : '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Available for Affiliates:</span>
                    <span className="text-white">${availableForAffiliates >= 0 ? availableForAffiliates.toFixed(2) : '0.00'}</span>
                  </div>
                </div>
              </Card>

              {/* MLM Configuration */}
              <div className="border border-white/10 rounded-lg p-4 bg-black/50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <Label>Enable MLM</Label>
                    <p className="text-xs text-white/50">Multi-level marketing with tiered rewards</p>
                  </div>
                  <Switch checked={enableMLM} onCheckedChange={setEnableMLM} />
                </div>

                {enableMLM && (
                  <div className="space-y-4 mt-4 pt-4 border-t border-white/10">
                    <div className="space-y-2">
                      <Label>MLM Depth (Levels)</Label>
                      <Select value={mlmDepth.toString()} onValueChange={(val) => setMLMDepth(parseInt(val))}>
                        <SelectTrigger className="bg-black border-white/20 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-secondary border-white/10 text-white">
                          <SelectItem value="1">1 Level</SelectItem>
                          <SelectItem value="2">2 Levels</SelectItem>
                          <SelectItem value="3">3 Levels</SelectItem>
                          <SelectItem value="4">4 Levels</SelectItem>
                          <SelectItem value="5">5 Levels</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Reward Percentage by Tier</Label>
                      {mlmTiers.slice(0, mlmDepth).map((tier) => (
                        <div key={tier.level} className="flex items-center gap-2">
                          <span className="text-sm w-16">Level {tier.level}:</span>
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            step="0.5"
                            value={tier.percentage}
                            onChange={(e) => handleMLMTierChange(tier.level, parseFloat(e.target.value))}
                            className="bg-black border-white/20 text-white"
                          />
                          <span className="text-sm text-white/60">%</span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between p-2 bg-black rounded border border-white/10">
                        <span className="text-sm text-white/70">Total MLM Percentage:</span>
                        <span className={`${totalMLMTierPercentage > 48.5 ? 'text-red-500' : 'text-[#14f195]'}`}>
                          {totalMLMTierPercentage.toFixed(1)}%
                        </span>
                      </div>
                      {totalMLMTierPercentage > 48.5 && (
                        <p className="text-xs text-red-500">Total must be ≤ overall affiliate reward % (48.5%)</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Budget (BTC)</Label>
                <Input type="number" step="0.00000001" className="bg-black border-white/20 text-white font-mono" placeholder="0.01" />
              </div>

              <div className="bg-black border border-white/10 p-4 rounded-lg">
                <h3 className="mb-2">Upload Price Sheet (Optional)</h3>
                <p className="text-sm text-white/60 mb-3">Upload a CSV file with your product catalog</p>
                <Button type="button" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Choose CSV File
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-black rounded-lg">
                <div>
                  <Label>Lifetime Tracking</Label>
                  <p className="text-xs text-white/50">Track customer lifetime value</p>
                </div>
                <Switch checked={lifetimeTracking} onCheckedChange={setLifetimeTracking} />
              </div>

              <div className="flex items-center justify-between p-4 bg-black rounded-lg">
                <div>
                  <Label>Automatic Payouts</Label>
                  <p className="text-xs text-white/50">Pay affiliates automatically</p>
                </div>
                <Switch checked={autoPayout} onCheckedChange={setAutoPayout} />
              </div>

              <Card className="bg-black/50 border-yellow-500/30 p-4">
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-white/80">
                    <p className="mb-1">Campaign Restriction Notice:</p>
                    <p className="text-white/60">You cannot reduce rewards during an active campaign. You may only increase rewards or pause the campaign.</p>
                  </div>
                </div>
              </Card>

              <Button className="w-full bg-[#f7931a] hover:bg-[#f7931a]/90 text-black">
                Create Campaign
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Performance Metrics with Timeframes */}
      <div className="mb-8">
        <h2 className="mb-4">Performance Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AnalyticsCard
            title="Total Revenue"
            currentValue={revenueData.current}
            previousValue={revenueData.previous}
            format="currency"
            prefix="$"
            timeframe={revenueTimeframe}
            onTimeframeChange={setRevenueTimeframe}
          />
          <AnalyticsCard
            title="Total Conversions"
            currentValue={conversionsData.current}
            previousValue={conversionsData.previous}
            format="number"
            timeframe={conversionsTimeframe}
            onTimeframeChange={setConversionsTimeframe}
          />
          <AnalyticsCard
            title="Total Profit"
            currentValue={profitData.current}
            previousValue={profitData.previous}
            format="currency"
            prefix="$"
            timeframe={profitTimeframe}
            onTimeframeChange={setProfitTimeframe}
          />
        </div>
      </div>

      {/* Additional Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="bg-secondary border-white/10 p-6">
          <div className="flex items-center gap-2 mb-2 text-white/60">
            <Store className="w-4 h-4" />
            <span>Active Campaigns</span>
          </div>
          <div className="text-2xl">{campaigns.filter(c => c.status === 'Active').length}</div>
        </Card>
        <Card className="bg-secondary border-white/10 p-6">
          <div className="flex items-center gap-2 mb-2 text-white/60">
            <DollarSign className="w-4 h-4" />
            <span>Total Spent (BTC)</span>
          </div>
          <div className="text-2xl font-mono">{totalStats.spent.toFixed(2)}</div>
        </Card>
      </div>

      {/* Performance Analytics with Timeframe Selection */}
      <Card className="bg-secondary border-white/10 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2>Performance Analytics</h2>
          <Tabs value={chartTimeframe} onValueChange={(v) => setChartTimeframe(v as Timeframe)}>
            <TabsList className="bg-black border-white/10">
              <TabsTrigger value="hourly" className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">Hourly</TabsTrigger>
              <TabsTrigger value="daily" className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">Daily</TabsTrigger>
              <TabsTrigger value="weekly" className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">Weekly</TabsTrigger>
              <TabsTrigger value="monthly" className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">Monthly</TabsTrigger>
              <TabsTrigger value="yearly" className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Tabs defaultValue="revenue" className="w-full">
          <TabsList className="bg-black border-white/10 mb-4">
            <TabsTrigger 
              value="revenue"
              className="data-[state=active]:bg-[#f7931a]/20 data-[state=active]:text-[#f7931a] data-[state=active]:shadow-[0_0_10px_rgba(247,147,26,0.3)]"
            >
              Revenue
            </TabsTrigger>
            <TabsTrigger 
              value="conversions"
              className="data-[state=active]:bg-[#f7931a]/20 data-[state=active]:text-[#f7931a] data-[state=active]:shadow-[0_0_10px_rgba(247,147,26,0.3)]"
            >
              Conversions
            </TabsTrigger>
            <TabsTrigger 
              value="profit"
              className="data-[state=active]:bg-[#f7931a]/20 data-[state=active]:text-[#f7931a] data-[state=active]:shadow-[0_0_10px_rgba(247,147,26,0.3)]"
            >
              Profit Margin
            </TabsTrigger>
          </TabsList>
          <TabsContent value="revenue">
            <div className="bg-black border border-white/10 rounded-lg p-4">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={generateChartData(chartTimeframe)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar dataKey="value" fill="#f7931a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="conversions">
            <div className="bg-black border border-white/10 rounded-lg p-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={generateChartData(chartTimeframe)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#14f195" strokeWidth={3} dot={{ fill: '#14f195', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="profit">
            <div className="bg-black border border-white/10 rounded-lg p-4">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={generateChartData(chartTimeframe)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1a1a1a', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line type="monotone" dataKey="value" stroke="#00d4ff" strokeWidth={3} dot={{ fill: '#00d4ff', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Affiliate Insights */}
      <Card className="bg-secondary border-white/10 p-6 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5" />
          <h2>Affiliate Insights</h2>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead>Affiliate Name</TableHead>
                <TableHead>Total Sales</TableHead>
                <TableHead>Revenue Generated</TableHead>
                <TableHead>Tier Position</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topAffiliates.map(affiliate => (
                <TableRow key={affiliate.id} className="border-white/10 hover:bg-white/5">
                  <TableCell>{affiliate.name}</TableCell>
                  <TableCell>{affiliate.sales}</TableCell>
                  <TableCell className="text-[#f7931a]">${affiliate.revenue.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-[#9945ff]/30 text-[#9945ff]">
                      {affiliate.tier}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-[#14f195]/20 text-[#14f195] border-[#14f195]/30">Active</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Campaign Management */}
      <Card className="bg-secondary border-white/10 p-6 mb-8">
        <h2 className="mb-4">Campaign Management</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead>Campaign Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Spent (BTC)</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>Profit</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map(campaign => (
                <TableRow key={campaign.id} className="border-white/10 hover:bg-white/5">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{campaign.name}</span>
                      {campaign.hasMLM && (
                        <Badge variant="outline" className="border-[#9945ff]/30 text-[#9945ff] text-xs">
                          MLM Active
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-white/20">{campaign.type}</Badge>
                  </TableCell>
                  <TableCell>
                    {campaign.status === 'Active' ? (
                      <Badge className="bg-[#14f195]/20 text-[#14f195] border-[#14f195]/30">Active</Badge>
                    ) : (
                      <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Paused</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-white/60">{campaign.startDate}</TableCell>
                  <TableCell className="font-mono">{campaign.spent}</TableCell>
                  <TableCell>{campaign.conversions}</TableCell>
                  <TableCell className="text-[#f7931a]">${campaign.profit.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {campaign.status === 'Active' ? (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-white/20 text-white hover:bg-white/10"
                          title="Pause Campaign"
                        >
                          <Pause className="w-4 h-4" />
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-[#14f195]/30 text-[#14f195] hover:bg-[#14f195]/10"
                          title="Resume Campaign"
                        >
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-500/30 text-red-500 hover:bg-red-500/10"
                        title="Schedule Deletion (30-day countdown)"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Payment Processing States */}
      <Card className="bg-secondary border-white/10 p-6">
        <h2 className="mb-4">Recent Payment Activity</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-black rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
              <div>
                <div>Campaign #1 - Conversion #892</div>
                <div className="text-sm text-white/50">Processing... (Pending period: 7 days remaining)</div>
              </div>
            </div>
            <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Pending</Badge>
          </div>
          <div className="flex items-center justify-between p-4 bg-black rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <div>
                <div>Campaign #2 - Conversion #445</div>
                <div className="text-sm text-white/50">Verified at 09:42 AM</div>
              </div>
            </div>
            <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/30">Verified</Badge>
          </div>
          <div className="flex items-center justify-between p-4 bg-black rounded-lg border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#14f195]"></div>
              <div>
                <div>Campaign #1 - Conversion #891</div>
                <div className="text-sm text-white/50">Sent at 09:15 AM • TX: a1b2c3d4 • Final (no clawback)</div>
              </div>
            </div>
            <Badge className="bg-[#14f195]/20 text-[#14f195] border-[#14f195]/30">Released</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
