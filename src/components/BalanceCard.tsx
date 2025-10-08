import { Card } from './ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { DollarSign, Clock, TrendingUp, HelpCircle } from 'lucide-react';

interface BalanceCardProps {
  pending: number;
  available: number;
  lifetime: number;
}

export function BalanceCard({ pending, available, lifetime }: BalanceCardProps) {
  return (
    <Card className="bg-secondary border-white/10 p-6">
      <h3 className="mb-4">Balance Overview</h3>
      
      <div className="space-y-4">
        {/* Available Balance */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-[#14f195]" />
            <div>
              <div className="text-sm text-white/60 flex items-center gap-1">
                Available to Withdraw
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-3 h-3 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-secondary border-white/10 text-white max-w-xs">
                      <p>Verified earnings that have cleared the pending window (24-72h) and are ready for withdrawal or auto-payout.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-2xl text-[#14f195]">${available.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Pending Balance */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-yellow-500" />
            <div>
              <div className="text-sm text-white/60 flex items-center gap-1">
                Pending Verification
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-3 h-3 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-secondary border-white/10 text-white max-w-xs">
                      <p>Recent commissions in verification buffer (24-48h). Cannot be withdrawn until verified. Refunds/chargebacks may cancel these.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-2xl text-yellow-500">${pending.toFixed(2)}</div>
            </div>
          </div>
        </div>

        {/* Lifetime Earnings */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#f7931a]" />
            <div>
              <div className="text-sm text-white/60">Lifetime Earnings</div>
              <div className="text-2xl text-[#f7931a]">${lifetime.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="text-xs text-white/50">
          Next payout verification: Rolling 24-48h window
        </div>
      </div>
    </Card>
  );
}
