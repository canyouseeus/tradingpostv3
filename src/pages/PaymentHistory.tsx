import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Home, Calendar, Filter, Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';

export function PaymentHistory() {
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
  const [campaignFilter, setCampaignFilter] = useState('all');

  const payments = [
    {
      id: 1,
      date: '2025-10-07',
      time: '10:24 AM',
      campaign: 'Premium Hardware Wallet',
      amount: 45.67,
      status: 'Released',
      txId: 'a1b2c3d4ef56gh78',
      pendingDays: 0
    },
    {
      id: 2,
      date: '2025-10-06',
      time: '03:15 PM',
      campaign: 'Lightning Node Kit',
      amount: 34.12,
      status: 'Released',
      txId: 'xy9z8a7b6c5d4e3f',
      pendingDays: 0
    },
    {
      id: 3,
      date: '2025-10-05',
      time: '11:45 AM',
      campaign: 'Bitcoin Merch Collection',
      amount: 28.90,
      status: 'Pending',
      txId: '-',
      pendingDays: 5
    },
    {
      id: 4,
      date: '2025-10-04',
      time: '09:30 AM',
      campaign: 'Premium Hardware Wallet',
      amount: 52.34,
      status: 'Released',
      txId: 'lm4n5o6p7q8r9s0t',
      pendingDays: 0
    },
    {
      id: 5,
      date: '2025-10-03',
      time: '02:20 PM',
      campaign: 'Crypto Trading Course',
      amount: 19.45,
      status: 'Pending',
      txId: '-',
      pendingDays: 6
    },
    {
      id: 6,
      date: '2025-10-02',
      time: '04:50 PM',
      campaign: 'Lightning Node Kit',
      amount: 67.89,
      status: 'Released',
      txId: 'ab1cd2ef3gh4ij5k',
      pendingDays: 0
    },
    {
      id: 7,
      date: '2025-10-01',
      time: '01:15 PM',
      campaign: 'Premium Hardware Wallet',
      amount: 41.23,
      status: 'Released',
      txId: '6lm7no8pq9rs0tu1',
      pendingDays: 0
    },
    {
      id: 8,
      date: '2025-09-30',
      time: '10:05 AM',
      campaign: 'Bitcoin Merch Collection',
      amount: 33.56,
      status: 'Released',
      txId: 'vw2xy3za4bc5de6f',
      pendingDays: 0
    }
  ];

  const totalReleased = payments
    .filter(p => p.status === 'Released')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = payments
    .filter(p => p.status === 'Pending')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back to Dashboard */}
      <Link to="/affiliate-dashboard" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors">
        <Home className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Payment History</h1>
        <p className="text-white/60">View all your past and pending Lightning payouts</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-secondary border-white/10 p-6">
          <div className="text-sm text-white/60 mb-2">Total Released</div>
          <div className="text-2xl text-[#14f195]">${totalReleased.toFixed(2)}</div>
        </Card>
        <Card className="bg-secondary border-white/10 p-6">
          <div className="text-sm text-white/60 mb-2">Total Pending</div>
          <div className="text-2xl text-yellow-500">${totalPending.toFixed(2)}</div>
        </Card>
        <Card className="bg-secondary border-white/10 p-6">
          <div className="text-sm text-white/60 mb-2">Total Payments</div>
          <div className="text-2xl">{payments.length}</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-secondary border-white/10 p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4" />
          <h3>Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                id="startDate"
                type="date"
                value={dateFilter.start}
                onChange={(e) => setDateFilter({ ...dateFilter, start: e.target.value })}
                className="bg-black border-white/20 text-white pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                id="endDate"
                type="date"
                value={dateFilter.end}
                onChange={(e) => setDateFilter({ ...dateFilter, end: e.target.value })}
                className="bg-black border-white/20 text-white pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="campaign">Campaign</Label>
            <select
              id="campaign"
              value={campaignFilter}
              onChange={(e) => setCampaignFilter(e.target.value)}
              className="w-full h-9 px-3 rounded-md bg-black border border-white/20 text-white"
            >
              <option value="all">All Campaigns</option>
              <option value="hw">Premium Hardware Wallet</option>
              <option value="node">Lightning Node Kit</option>
              <option value="merch">Bitcoin Merch Collection</option>
              <option value="course">Crypto Trading Course</option>
            </select>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
            <Filter className="w-4 h-4 mr-2" />
            Apply Filters
          </Button>
          <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/5">
            Clear All
          </Button>
        </div>
      </Card>

      {/* Payment Table */}
      <Card className="bg-secondary border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2>All Transactions</h2>
          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
        <div className="overflow-x-auto">
          <TooltipProvider>
            <Table>
              <TableHeader>
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead>Date</TableHead>
                  <TableHead>Campaign</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Transaction ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map(payment => (
                  <TableRow key={payment.id} className="border-white/10 hover:bg-white/5">
                    <TableCell>
                      <div>{payment.date}</div>
                      <div className="text-xs text-white/50">{payment.time}</div>
                    </TableCell>
                    <TableCell>{payment.campaign}</TableCell>
                    <TableCell className="text-[#f7931a]">${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      {payment.status === 'Released' ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge className="bg-[#14f195]/20 text-[#14f195] border-[#14f195]/30 cursor-help">
                              Released
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent className="bg-secondary border-white/10 text-white">
                            <p>Payment sent via Lightning Network</p>
                            <p className="text-xs text-white/60">Final - no clawbacks possible</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 cursor-help">
                              Pending ({payment.pendingDays}d left)
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent className="bg-secondary border-white/10 text-white">
                            <p>Pending commission - awaiting release</p>
                            <p className="text-xs text-white/60">Vendor can issue refunds during this period</p>
                            <p className="text-xs text-white/60">Auto-released after 7-14 days</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </TableCell>
                    <TableCell>
                      {payment.status === 'Released' ? (
                        <code className="text-xs text-white/70 font-mono">{payment.txId}</code>
                      ) : (
                        <span className="text-white/40">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TooltipProvider>
        </div>
      </Card>
    </div>
  );
}
