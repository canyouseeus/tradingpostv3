import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { HelpCircle, Zap, DollarSign } from 'lucide-react';
import { WalletSelector, WalletType } from './WalletSelector';

interface PayoutPreferencesProps {
  autoPayoutEnabled: boolean;
  minPayoutThreshold: number;
  walletType: WalletType;
  walletAddress: string;
  availableBalance: number;
  onAutoPayoutChange: (enabled: boolean) => void;
  onThresholdChange: (threshold: number) => void;
  onWalletTypeChange: (type: WalletType) => void;
  onWalletAddressChange: (address: string) => void;
  onWithdraw: () => void;
  withdrawing?: boolean;
}

export function PayoutPreferences({
  autoPayoutEnabled,
  minPayoutThreshold,
  walletType,
  walletAddress,
  availableBalance,
  onAutoPayoutChange,
  onThresholdChange,
  onWalletTypeChange,
  onWalletAddressChange,
  onWithdraw,
  withdrawing = false
}: PayoutPreferencesProps) {
  const canWithdraw = availableBalance >= minPayoutThreshold && walletAddress.length > 0;

  return (
    <Card className="bg-secondary border-white/10 p-6">
      <h3 className="mb-4">Payout Preferences</h3>

      <div className="space-y-6">
        {/* Auto-Payout Toggle */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <Label htmlFor="auto-payout">Auto-Payout</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="w-3 h-3 cursor-help text-white/60" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-secondary border-white/10 text-white max-w-xs">
                    <p>When enabled, available funds are automatically sent to your wallet once they exceed the minimum threshold. Payouts are instant via Lightning or Strike.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-xs text-white/50">
              Automatically send funds when threshold is reached
            </p>
          </div>
          <Switch
            id="auto-payout"
            checked={autoPayoutEnabled}
            onCheckedChange={onAutoPayoutChange}
          />
        </div>

        {/* Minimum Payout Threshold */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="threshold">Minimum Payout Threshold (USD)</Label>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-3 h-3 cursor-help text-white/60" />
                </TooltipTrigger>
                <TooltipContent className="bg-secondary border-white/10 text-white max-w-xs">
                  <p>The minimum amount required before {autoPayoutEnabled ? 'auto-payout triggers' : 'you can withdraw'}. Helps reduce transaction fees for small amounts.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/60">$</span>
            <Input
              id="threshold"
              type="number"
              min="1"
              max="1000"
              step="1"
              value={minPayoutThreshold}
              onChange={(e) => onThresholdChange(parseFloat(e.target.value) || 1)}
              className="bg-black border-white/20 text-white"
            />
          </div>
          <p className="text-xs text-white/50">
            Current threshold: ${minPayoutThreshold.toFixed(2)} • Available: ${availableBalance.toFixed(2)}
          </p>
        </div>

        {/* Verification Buffer Info */}
        <div className="bg-black border border-white/10 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <HelpCircle className="w-4 h-4 mt-0.5 text-[#f7931a] flex-shrink-0" />
            <div className="space-y-1">
              <div className="text-sm">Verification Buffer</div>
              <p className="text-xs text-white/50">
                New commissions enter a 24-48h verification window before becoming available. 
                This protects against chargebacks and refunds. Once verified, funds move to your available balance.
              </p>
            </div>
          </div>
        </div>

        {/* Wallet Configuration */}
        <div className="space-y-3">
          <WalletSelector
            walletType={walletType}
            walletAddress={walletAddress}
            onWalletTypeChange={onWalletTypeChange}
            onAddressChange={onWalletAddressChange}
            required
          />
        </div>

        {/* Withdraw Button (Manual Mode Only) */}
        {!autoPayoutEnabled && (
          <div className="pt-4 border-t border-white/10">
            <Button
              onClick={onWithdraw}
              disabled={!canWithdraw || withdrawing}
              className="w-full bg-[#f7931a] hover:bg-[#f7931a]/90 text-black hover:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {withdrawing ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  {walletType === 'lightning' ? (
                    <Zap className="w-4 h-4 mr-2" />
                  ) : (
                    <DollarSign className="w-4 h-4 mr-2" />
                  )}
                  Withdraw Now
                </>
              )}
            </Button>
            
            {!canWithdraw && walletAddress.length === 0 && (
              <p className="text-xs text-red-500 mt-2">⚠️ Please configure wallet address</p>
            )}
            
            {!canWithdraw && walletAddress.length > 0 && availableBalance < minPayoutThreshold && (
              <p className="text-xs text-yellow-500 mt-2">
                ⚠️ Available balance (${availableBalance.toFixed(2)}) is below threshold (${minPayoutThreshold.toFixed(2)})
              </p>
            )}
          </div>
        )}

        {/* Auto-Payout Status */}
        {autoPayoutEnabled && (
          <div className="pt-4 border-t border-white/10">
            <Badge className="bg-[#14f195]/20 text-[#14f195] border-[#14f195]/30">
              <Zap className="w-3 h-3 mr-1" />
              Auto-Payout Active
            </Badge>
            <p className="text-xs text-white/50 mt-2">
              Funds will be automatically sent when available balance exceeds ${minPayoutThreshold.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
