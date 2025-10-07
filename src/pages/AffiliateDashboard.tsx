import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Home, Zap, Copy, Check, Search, TrendingUp, DollarSign, MousePointerClick, Share2, Users, MoreVertical, Eye, Pause, Network } from 'lucide-react';
import { AnalyticsCard } from '../components/AnalyticsCard';
import { Timeframe } from '../components/TimeframeSelector';
import { generateTimeframeData, generateChartData } from '../utils/analytics';

export function AffiliateDashboard() {
  const [copied, setCopied] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const [customLink, setCustomLink] = useState('');
  const [clicksTimeframe, setClicksTimeframe] = useState<Timeframe>('daily');
  const [conversionsTimeframe, setConversionsTimeframe] = useState<Timeframe>('daily');
  const [profitTimeframe, setProfitTimeframe] = useState<Timeframe>('daily');

  const walletAddress = 'lnbc1pvjluezpp5qqqsyqcyq5...';
  const displayName = 'CryptoMarketer';
  const referralLink = `https://tradingpost.io/ref/${displayName.toLowerCase()}`;
  const downlineCount = 8;

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const campaigns = [
    {
      id: 1,
      name: 'Premium Bitcoin Hardware Wallet',
      vendor: 'SecureStore',
      rewardType: 'Flat 20%',
      mlmLevel: 'Level 1-3',
      hasMLM: true,
      earnings: 432.50,
      clicks: 1247,
      conversions: 23,
      profit: 432.50,
      status: 'active'
    },
    {
      id: 2,
      name: 'Lightning Node Starter Kit',
      vendor: 'NodeRunner Co',
      rewardType: 'Points + 15%',
      mlmLevel: null,
      hasMLM: false,
      earnings: 289.30,
      clicks: 892,
      conversions: 17,
      profit: 289.30,
      status: 'active'
    },
    {
      id: 3,
      name: 'Crypto Trading Course',
      vendor: 'BitcoinEdu',
      rewardType: 'MLM 3-level',
      mlmLevel: 'Level 1-3',
      hasMLM: true,
      earnings: 156.75,
      clicks: 634,
      conversions: 12,
      profit: 156.75,
      status: 'active'
    }
  ];

  // Generate dynamic stats based on timeframes
  const clicksData = generateTimeframeData(2500, clicksTimeframe);
  const conversionsData = generateTimeframeData(45, conversionsTimeframe);
  const profitData = generateTimeframeData(750, profitTimeframe);

  const stats = {
    daily: { clicks: 89, conversions: 3, profit: 45.20 },
    weekly: { clicks: 512, conversions: 18, profit: 234.80 },
    monthly: { clicks: 2773, conversions: 52, profit: 878.55 },
    yearly: { clicks: 18942, conversions: 347, profit: 6234.90 }
  };

  // Chart data
  const chartData = {
    daily: [
      { name: '12AM', clicks: 12, conversions: 1, profit: 5.2 },
      { name: '4AM', clicks: 8, conversions: 0, profit: 0 },
      { name: '8AM', clicks: 15, conversions: 0, profit: 0 },
      { name: '12PM', clicks: 22, conversions: 1, profit: 15.5 },
      { name: '4PM', clicks: 18, conversions: 1, profit: 14.3 },
      { name: '8PM', clicks: 14, conversions: 0, profit: 0 },
    ],
    weekly: [
      { name: 'Mon', clicks: 67, conversions: 2, profit: 32.4 },
      { name: 'Tue', clicks: 82, conversions: 3, profit: 45.8 },
      { name: 'Wed', clicks: 71, conversions: 3, profit: 38.2 },
      { name: 'Thu', clicks: 89, conversions: 4, profit: 51.3 },
      { name: 'Fri', clicks: 95, conversions: 3, profit: 42.1 },
      { name: 'Sat', clicks: 58, conversions: 2, profit: 15.0 },
      { name: 'Sun', clicks: 50, conversions: 1, profit: 10.0 },
    ],
    monthly: [
      { name: 'Week 1', clicks: 612, conversions: 11, profit: 189.5 },
      { name: 'Week 2', clicks: 734, conversions: 14, profit: 245.8 },
      { name: 'Week 3', clicks: 698, conversions: 13, profit: 221.3 },
      { name: 'Week 4', clicks: 729, conversions: 14, profit: 221.95 },
    ],
    yearly: [
      { name: 'Jan', clicks: 1234, conversions: 24, profit: 456.7 },
      { name: 'Feb', clicks: 1456, conversions: 28, profit: 523.4 },
      { name: 'Mar', clicks: 1689, conversions: 31, profit: 598.2 },
      { name: 'Apr', clicks: 1523, conversions: 27, profit: 512.8 },
      { name: 'May', clicks: 1789, conversions: 34, profit: 645.3 },
      { name: 'Jun', clicks: 1612, conversions: 29, profit: 567.9 },
      { name: 'Jul', clicks: 1834, conversions: 35, profit: 678.4 },
      { name: 'Aug', clicks: 1923, conversions: 37, profit: 712.5 },
      { name: 'Sep', clicks: 1756, conversions: 32, profit: 634.2 },
      { name: 'Oct', clicks: 2126, conversions: 41, profit: 789.6 },
      { name: 'Nov', clicks: 0, conversions: 0, profit: 0 },
      { name: 'Dec', clicks: 0, conversions: 0, profit: 0 },
    ]
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
        <h1 className="text-3xl mb-2">Affiliate Dashboard</h1>
        <p className="text-white/60">Hi {displayName}, here's your performance summary</p>
      </div>

      {/* Wallet & Payment Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card className="bg-secondary border-white/10 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3>Wallet Address</h3>
            <Zap className="w-5 h-5 text-[#f7931a]" />
          </div>
          <div className="font-mono text-sm text-white/80 break-all">{walletAddress}</div>
        </Card>

        <Card className="bg-secondary border-[#14f195]/20 p-6">
          <div className="flex items-center justify-between mb-3">
            <h3>Latest Payment</h3>
            <Link to="/payment-history" className="text-sm text-[#f7931a] hover:underline">
              View Full Payment History →
            </Link>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-[#14f195]/20 text-[#14f195] border-[#14f195]/30">Payment Sent via Lightning</Badge>
            </div>
            <div className="text-sm text-white/60">
              <div>TX ID: a1b2c3d4...ef56</div>
              <div>Oct 6, 2025 - 10:24 AM</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Analytics Summary with Individual Timeframes */}
      <div className="mb-8">
        <h2 className="mb-4">Analytics Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <AnalyticsCard
            title="Total Clicks"
            currentValue={clicksData.current}
            previousValue={clicksData.previous}
            format="number"
            timeframe={clicksTimeframe}
            onTimeframeChange={setClicksTimeframe}
          />
          <AnalyticsCard
            title="Conversions"
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

      {/* Performance Chart */}
      <Card className="bg-secondary border-white/10 p-6 mb-8">
        <h2 className="mb-4">Performance Over Time</h2>
        <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full">
          <TabsList className="bg-black border-white/10 mb-4">
            <TabsTrigger 
              value="hourly" 
              className="data-[state=active]:bg-[#f7931a]/20 data-[state=active]:text-[#f7931a] data-[state=active]:shadow-[0_0_10px_rgba(247,147,26,0.3)]"
            >
              Hourly
            </TabsTrigger>
            <TabsTrigger 
              value="daily" 
              className="data-[state=active]:bg-[#f7931a]/20 data-[state=active]:text-[#f7931a] data-[state=active]:shadow-[0_0_10px_rgba(247,147,26,0.3)]"
            >
              Daily
            </TabsTrigger>
            <TabsTrigger 
              value="weekly"
              className="data-[state=active]:bg-[#f7931a]/20 data-[state=active]:text-[#f7931a] data-[state=active]:shadow-[0_0_10px_rgba(247,147,26,0.3)]"
            >
              Weekly
            </TabsTrigger>
            <TabsTrigger 
              value="monthly"
              className="data-[state=active]:bg-[#f7931a]/20 data-[state=active]:text-[#f7931a] data-[state=active]:shadow-[0_0_10px_rgba(247,147,26,0.3)]"
            >
              Monthly
            </TabsTrigger>
            <TabsTrigger 
              value="yearly"
              className="data-[state=active]:bg-[#f7931a]/20 data-[state=active]:text-[#f7931a] data-[state=active]:shadow-[0_0_10px_rgba(247,147,26,0.3)]"
            >
              Yearly
            </TabsTrigger>
          </TabsList>
          <TabsContent value={selectedPeriod} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-black border-white/10 p-4">
                <div className="flex items-center gap-2 mb-2 text-white/60">
                  <MousePointerClick className="w-4 h-4" />
                  <span>Clicks</span>
                </div>
                <div className="text-2xl">{stats[selectedPeriod as keyof typeof stats]?.clicks?.toLocaleString() || '0'}</div>
              </Card>
              <Card className="bg-black border-white/10 p-4">
                <div className="flex items-center gap-2 mb-2 text-white/60">
                  <TrendingUp className="w-4 h-4" />
                  <span>Conversions</span>
                </div>
                <div className="text-2xl">{stats[selectedPeriod as keyof typeof stats]?.conversions || '0'}</div>
              </Card>
              <Card className="bg-black border-white/10 p-4">
                <div className="flex items-center gap-2 mb-2 text-white/60">
                  <DollarSign className="w-4 h-4" />
                  <span>Profit</span>
                </div>
                <div className="text-2xl text-[#f7931a]">${stats[selectedPeriod as keyof typeof stats]?.profit || '0'}</div>
              </Card>
            </div>

            {/* Performance Chart */}
            <div className="bg-black border border-white/10 rounded-lg p-4">
              <h3 className="mb-4">Performance Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={generateChartData(selectedPeriod as Timeframe)}>
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
                  <Line type="monotone" dataKey="value" stroke="#f7931a" strokeWidth={3} dot={{ fill: '#f7931a', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

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
            <div className="text-sm text-white/60 mb-2">Your Network</div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl">{downlineCount}</span>
                <span className="text-white/60 ml-2">affiliates in your network</span>
              </div>
              <Users className="w-8 h-8 text-[#f7931a]/50" />
            </div>
          </Card>
        </div>

        <div className="flex gap-2">
          <Button className="bg-[#f7931a] hover:bg-[#f7931a]/90 text-black hover:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">
            <Share2 className="w-4 h-4 mr-2" />
            Share Link
          </Button>
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
            <Network className="w-4 h-4 mr-2" />
            View Network Tree
          </Button>
        </div>
      </Card>

      {/* Campaign Browser */}
      <Card className="bg-secondary border-white/10 p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h2>Browse All Active Campaigns</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <Input
              placeholder="Search campaigns..."
              className="bg-black border-white/20 text-white pl-10 w-full md:w-64"
            />
          </div>
        </div>
        <div className="bg-black/50 border border-[#f7931a]/20 p-4 rounded-lg mb-4">
          <div className="flex items-center gap-2 text-[#f7931a]">
            <Zap className="w-4 h-4" />
            <span>New Vendor Joined TRADING POST! 3 new campaigns available</span>
          </div>
        </div>
        <div className="space-y-2">
          {campaigns.slice(0, 2).map(campaign => (
            <Card key={campaign.id} className="bg-black border-white/10 p-4 hover:border-[#f7931a]/50 transition-all hover:shadow-[0_0_15px_rgba(247,147,26,0.2)] cursor-pointer">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3>{campaign.name}</h3>
                    {campaign.hasMLM && (
                      <Badge variant="outline" className="border-[#9945ff]/30 text-[#9945ff] text-xs">MLM Active</Badge>
                    )}
                  </div>
                  <p className="text-sm text-white/60">by {campaign.vendor}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="border-white/20">{campaign.rewardType}</Badge>
                  <Button size="sm" className="bg-[#f7931a] hover:bg-[#f7931a]/90 text-black hover:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">
                    Promote
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* My Campaigns */}
      <Card className="bg-secondary border-white/10 p-6 mb-8">
        <h2 className="mb-4">My Campaigns</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead>Campaign</TableHead>
                <TableHead>Reward Type</TableHead>
                <TableHead>MLM Level</TableHead>
                <TableHead>Lifetime Earnings</TableHead>
                <TableHead>Clicks</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map(campaign => (
                <TableRow key={campaign.id} className="border-white/10 hover:bg-white/5">
                  <TableCell>
                    <div>
                      <div className="flex items-center gap-2">
                        <span>{campaign.name}</span>
                        {campaign.hasMLM && (
                          <Badge variant="outline" className="border-[#9945ff]/30 text-[#9945ff] text-xs">MLM</Badge>
                        )}
                      </div>
                      <div className="text-xs text-white/50">{campaign.vendor}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-white/20">{campaign.rewardType}</Badge>
                  </TableCell>
                  <TableCell>
                    {campaign.mlmLevel ? (
                      <span className="text-[#9945ff]">{campaign.mlmLevel}</span>
                    ) : (
                      <span className="text-white/40">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-[#f7931a]">${campaign.earnings}</TableCell>
                  <TableCell>{campaign.clicks}</TableCell>
                  <TableCell>{campaign.conversions}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 text-white hover:bg-white/10"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-secondary border-white/10 text-white">
                        <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
                          <Eye className="w-4 h-4 mr-2" />
                          View Campaign Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
                          <Pause className="w-4 h-4 mr-2" />
                          Pause Participation
                        </DropdownMenuItem>
                        {campaign.hasMLM && (
                          <DropdownMenuItem className="hover:bg-white/10 cursor-pointer">
                            <Network className="w-4 h-4 mr-2" />
                            View MLM Network
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Create Custom Link */}
      <Card className="bg-secondary border-white/10 p-6">
        <h2 className="mb-4">Create Custom Referral Link</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Enter product URL or campaign ID"
            value={customLink}
            onChange={(e) => setCustomLink(e.target.value)}
            className="bg-black border-white/20 text-white"
          />
          <Button className="bg-[#f7931a] hover:bg-[#f7931a]/90 text-black hover:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">
            Generate Link
          </Button>
        </div>
        {customLink && (
          <div className="mt-4 p-4 bg-black border border-white/10 rounded-lg">
            <div className="flex items-center justify-between gap-2">
              <code className="text-sm text-[#f7931a]">https://tradingpost.io/ref/{displayName.toLowerCase()}/{customLink}</code>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleCopyLink(`https://tradingpost.io/ref/${displayName.toLowerCase()}/${customLink}`)}
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
