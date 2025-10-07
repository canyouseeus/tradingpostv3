import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Home, Users, Store, TrendingUp, DollarSign, Zap, Activity, Network, CheckCircle, XCircle, Clock } from 'lucide-react';
import { AnalyticsCard } from '../components/AnalyticsCard';
import { Timeframe } from '../components/TimeframeSelector';
import { generateTimeframeData, generateChartData } from '../utils/analytics';

export function AdminDashboard() {
  const [affiliatesTimeframe, setAffiliatesTimeframe] = useState<Timeframe>('daily');
  const [vendorsTimeframe, setVendorsTimeframe] = useState<Timeframe>('daily');
  const [earningsTimeframe, setEarningsTimeframe] = useState<Timeframe>('daily');
  const [txTimeframe, setTxTimeframe] = useState<Timeframe>('daily');
  const [chartTimeframe, setChartTimeframe] = useState<Timeframe>('daily');
  const platformStats = {
    totalAffiliates: 1247,
    totalVendors: 89,
    activeCampaigns: 156,
    pausedCampaigns: 23,
    expiringCampaigns: 5,
    totalProfits: 234567.89,
    lightningTxs: 8934,
    platformEarnings: 7036.04
  };

  const topAffiliates = [
    { id: 1, name: 'CryptoMarketer', conversions: 234, profit: 12456.78, status: 'Active', network: 8 },
    { id: 2, name: 'BitcoinPromo', conversions: 189, profit: 9823.45, status: 'Active', network: 5 },
    { id: 3, name: 'LightningFan', conversions: 156, profit: 8234.90, status: 'Active', network: 12 },
    { id: 4, name: 'SatoshiSells', conversions: 142, profit: 7456.12, status: 'Active', network: 3 },
    { id: 5, name: 'NodeRunner', conversions: 128, profit: 6789.34, status: 'Active', network: 15 }
  ];

  const topVendors = [
    { id: 1, name: 'SecureStore', campaigns: 12, budget: 5.67, conversions: 456, status: 'Approved', mlmCampaigns: 4 },
    { id: 2, name: 'NodeRunner Co', campaigns: 8, budget: 3.89, conversions: 312, status: 'Approved', mlmCampaigns: 2 },
    { id: 3, name: 'BitcoinEdu', campaigns: 6, budget: 2.45, conversions: 234, status: 'Approved', mlmCampaigns: 3 },
    { id: 4, name: 'CryptoGear', campaigns: 5, budget: 1.92, conversions: 189, status: 'Pending', mlmCampaigns: 0 },
    { id: 5, name: 'LightningShop', campaigns: 4, budget: 1.34, conversions: 145, status: 'Approved', mlmCampaigns: 1 }
  ];

  const recentTransactions = [
    { id: 1, type: 'Payout', from: 'SecureStore', to: 'CryptoMarketer', amount: 45.67, status: 'Completed', timestamp: 'Oct 6, 10:24 AM' },
    { id: 2, type: 'Payout', from: 'NodeRunner Co', to: 'BitcoinPromo', amount: 34.12, status: 'Completed', timestamp: 'Oct 6, 10:18 AM' },
    { id: 3, type: 'Payout', from: 'BitcoinEdu', to: 'LightningFan', amount: 28.90, status: 'Processing', timestamp: 'Oct 6, 10:15 AM' },
    { id: 4, type: 'Payout', from: 'SecureStore', to: 'SatoshiSells', amount: 52.34, status: 'Completed', timestamp: 'Oct 6, 10:12 AM' },
    { id: 5, type: 'Payout', from: 'CryptoGear', to: 'NodeRunner', amount: 19.45, status: 'Completed', timestamp: 'Oct 6, 10:08 AM' }
  ];

  // Chart data
  const platformGrowthData = [
    { month: 'Apr', affiliates: 823, vendors: 54 },
    { month: 'May', affiliates: 912, vendors: 61 },
    { month: 'Jun', affiliates: 1034, vendors: 69 },
    { month: 'Jul', affiliates: 1089, vendors: 74 },
    { month: 'Aug', affiliates: 1156, vendors: 79 },
    { month: 'Sep', affiliates: 1198, vendors: 84 },
    { month: 'Oct', affiliates: 1247, vendors: 89 },
  ];

  const lightningVolumeData = [
    { week: 'Week 1', volume: 1234, transactions: 156 },
    { week: 'Week 2', volume: 1567, transactions: 189 },
    { week: 'Week 3', volume: 1891, transactions: 234 },
    { week: 'Week 4', volume: 2123, transactions: 267 },
  ];

  const campaignStatusData = [
    { name: 'Active', value: platformStats.activeCampaigns, color: '#14f195' },
    { name: 'Paused', value: platformStats.pausedCampaigns, color: '#f59e0b' },
    { name: 'Expiring', value: platformStats.expiringCampaigns, color: '#ef4444' },
  ];

  // MLM Network Distribution
  const mlmDistribution = [
    { campaign: 'Hardware Wallet', level1: 89, level2: 234, level3: 567 },
    { campaign: 'Node Kit', level1: 67, level2: 178, level3: 423 },
    { campaign: 'Trading Course', level1: 56, level2: 145, level3: 334 },
  ];

  // Generate dynamic stats based on timeframes
  const affiliatesData = generateTimeframeData(platformStats.totalAffiliates, affiliatesTimeframe);
  const vendorsData = generateTimeframeData(platformStats.totalVendors, vendorsTimeframe);
  const earningsData = generateTimeframeData(platformStats.platformEarnings, earningsTimeframe);
  const txData = generateTimeframeData(platformStats.lightningTxs, txTimeframe);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back to Home */}
      <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
        <Home className="w-4 h-4" />
        Back to Landing Page
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Admin Dashboard</h1>
        <p className="text-white/60">Platform overview and management</p>
      </div>

      {/* Platform Overview with Timeframes */}
      <div className="mb-8">
        <h2 className="mb-4">Platform Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <AnalyticsCard
            title="Total Affiliates"
            currentValue={affiliatesData.current}
            previousValue={affiliatesData.previous}
            format="number"
            timeframe={affiliatesTimeframe}
            onTimeframeChange={setAffiliatesTimeframe}
          />
          <AnalyticsCard
            title="Total Vendors"
            currentValue={vendorsData.current}
            previousValue={vendorsData.previous}
            format="number"
            timeframe={vendorsTimeframe}
            onTimeframeChange={setVendorsTimeframe}
          />
          <AnalyticsCard
            title="Platform Earnings"
            currentValue={earningsData.current}
            previousValue={earningsData.previous}
            format="currency"
            prefix="$"
            timeframe={earningsTimeframe}
            onTimeframeChange={setEarningsTimeframe}
          />
          <AnalyticsCard
            title="Lightning Txs"
            currentValue={txData.current}
            previousValue={txData.previous}
            format="number"
            timeframe={txTimeframe}
            onTimeframeChange={setTxTimeframe}
          />
        </div>
      </div>

      {/* Campaign Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-secondary border-white/10 p-6">
          <div className="flex items-center gap-2 mb-2 text-white/60">
            <Activity className="w-4 h-4" />
            <span>Campaign Status</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div className="text-sm">
              <span className="text-[#14f195]">{platformStats.activeCampaigns}</span> Active
            </div>
            <div className="text-sm">
              <span className="text-yellow-500">{platformStats.pausedCampaigns}</span> Paused
            </div>
            <div className="text-sm">
              <span className="text-red-500">{platformStats.expiringCampaigns}</span> Expiring
            </div>
          </div>
        </Card>
        <Card className="bg-secondary border-white/10 p-6">
          <div className="flex items-center gap-2 mb-2 text-white/60">
            <TrendingUp className="w-4 h-4" />
            <span>Total Profits Facilitated</span>
          </div>
          <div className="text-3xl">${platformStats.totalProfits.toLocaleString()}</div>
        </Card>
        <Card className="bg-secondary border-white/10 p-6">
          <div className="flex items-center gap-2 mb-2 text-white/60">
            <Network className="w-4 h-4" />
            <span>MLM Campaigns</span>
          </div>
          <div className="text-3xl">{mlmDistribution.length}</div>
        </Card>
      </div>

      {/* Platform Charts with Timeframe Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-secondary border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2>Platform Growth</h2>
            <Tabs value={chartTimeframe} onValueChange={(v) => setChartTimeframe(v as Timeframe)}>
              <TabsList className="bg-black border-white/10">
                <TabsTrigger value="hourly" className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">H</TabsTrigger>
                <TabsTrigger value="daily" className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">D</TabsTrigger>
                <TabsTrigger value="weekly" className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">W</TabsTrigger>
                <TabsTrigger value="monthly" className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">M</TabsTrigger>
                <TabsTrigger value="yearly" className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">Y</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
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
              <Line type="monotone" dataKey="value" stroke="#f7931a" strokeWidth={3} dot={{ fill: '#f7931a', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-secondary border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2>Lightning Payout Volume</h2>
            <Tabs value={chartTimeframe} onValueChange={(v) => setChartTimeframe(v as Timeframe)}>
              <TabsList className="bg-black border-white/10">
                <TabsTrigger value="hourly" className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">H</TabsTrigger>
                <TabsTrigger value="daily" className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">D</TabsTrigger>
                <TabsTrigger value="weekly" className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">W</TabsTrigger>
                <TabsTrigger value="monthly" className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">M</TabsTrigger>
                <TabsTrigger value="yearly" className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all">Y</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
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
              <Bar dataKey="value" fill="#00d4ff" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Campaign Status Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-secondary border-white/10 p-6">
          <h2 className="mb-4">Campaign Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={campaignStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {campaignStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card className="bg-secondary border-white/10 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Network className="w-5 h-5 text-[#9945ff]" />
            <h2>MLM Network Distribution</h2>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mlmDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="campaign" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="level1" stackId="a" fill="#9945ff" />
              <Bar dataKey="level2" stackId="a" fill="#f7931a" />
              <Bar dataKey="level3" stackId="a" fill="#00d4ff" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#9945ff]"></div>
              <span>Level 1</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#f7931a]"></div>
              <span>Level 2</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-[#00d4ff]"></div>
              <span>Level 3</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Vendor Management */}
      <Card className="bg-secondary border-white/10 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2>Vendor Management</h2>
          <Badge variant="outline" className="border-yellow-500/30 text-yellow-500">1 Pending Approval</Badge>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead>Vendor Name</TableHead>
                <TableHead>Campaigns</TableHead>
                <TableHead>MLM Campaigns</TableHead>
                <TableHead>Budget (BTC)</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topVendors.map(vendor => (
                <TableRow key={vendor.id} className="border-white/10 hover:bg-white/5">
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.campaigns}</TableCell>
                  <TableCell>
                    {vendor.mlmCampaigns > 0 ? (
                      <Badge variant="outline" className="border-[#9945ff]/30 text-[#9945ff]">
                        {vendor.mlmCampaigns}
                      </Badge>
                    ) : (
                      <span className="text-white/40">-</span>
                    )}
                  </TableCell>
                  <TableCell className="font-mono">{vendor.budget}</TableCell>
                  <TableCell>{vendor.conversions}</TableCell>
                  <TableCell>
                    {vendor.status === 'Approved' ? (
                      <Badge className="bg-[#14f195]/20 text-[#14f195] border-[#14f195]/30">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approved
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      {vendor.status === 'Pending' ? 'Review' : 'Manage'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Affiliate Management */}
      <Card className="bg-secondary border-white/10 p-6 mb-8">
        <h2 className="mb-4">Top Affiliates</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead>Rank</TableHead>
                <TableHead>Affiliate Name</TableHead>
                <TableHead>Conversions</TableHead>
                <TableHead>Total Profit</TableHead>
                <TableHead>Network Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topAffiliates.map((affiliate, index) => (
                <TableRow key={affiliate.id} className="border-white/10 hover:bg-white/5">
                  <TableCell>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-yellow-500/20 text-yellow-500' :
                      index === 1 ? 'bg-gray-400/20 text-gray-400' :
                      index === 2 ? 'bg-orange-500/20 text-orange-500' :
                      'bg-white/10'
                    }`}>
                      {index + 1}
                    </div>
                  </TableCell>
                  <TableCell>{affiliate.name}</TableCell>
                  <TableCell>{affiliate.conversions}</TableCell>
                  <TableCell className="text-[#f7931a]">${affiliate.profit.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Network className="w-4 h-4 text-[#9945ff]" />
                      <span>{affiliate.network}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-[#14f195]/20 text-[#14f195] border-[#14f195]/30">{affiliate.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Transaction Log */}
      <Card className="bg-secondary border-white/10 p-6">
        <h2 className="mb-4">Recent Lightning Transactions</h2>
        <p className="text-sm text-white/50 mb-4">Admin monitoring only - no custody or manual intervention</p>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead>Type</TableHead>
                <TableHead>From (Vendor)</TableHead>
                <TableHead>To (Affiliate)</TableHead>
                <TableHead>Amount ($)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map(tx => (
                <TableRow key={tx.id} className="border-white/10 hover:bg-white/5">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-[#f7931a]" />
                      {tx.type}
                    </div>
                  </TableCell>
                  <TableCell>{tx.from}</TableCell>
                  <TableCell>{tx.to}</TableCell>
                  <TableCell className="font-mono">${tx.amount}</TableCell>
                  <TableCell>
                    <Badge className={tx.status === 'Completed' ? 'bg-[#14f195]/20 text-[#14f195] border-[#14f195]/30' : 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30'}>
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white/60 text-sm">{tx.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
