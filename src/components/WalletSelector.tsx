import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Zap, DollarSign, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export type WalletType = 'lightning' | 'strike';

interface WalletSelectorProps {
  walletType: WalletType;
  walletAddress: string;
  onWalletTypeChange: (type: WalletType) => void;
  onAddressChange: (address: string) => void;
  showLabel?: boolean;
  required?: boolean;
}

export function WalletSelector({
  walletType,
  walletAddress,
  onWalletTypeChange,
  onAddressChange,
  showLabel = true,
  required = false
}: WalletSelectorProps) {
  return (
    <div className="space-y-3">
      {showLabel && (
        <Label className="flex items-center gap-2">
          Wallet Type & Address
          {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Wallet Type Selector */}
        <Select value={walletType} onValueChange={(value) => onWalletTypeChange(value as WalletType)}>
          <SelectTrigger className="bg-black border-white/20 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-secondary border-white/10 text-white">
            <SelectItem value="lightning">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#f7931a]" />
                <span>Lightning Address</span>
              </div>
            </SelectItem>
            <SelectItem value="strike">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-[#14f195]" />
                <span>Strike Wallet</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Wallet Address Input */}
        <div className="md:col-span-2">
          <Input
            type="text"
            value={walletAddress}
            onChange={(e) => onAddressChange(e.target.value)}
            placeholder={
              walletType === 'lightning'
                ? 'lnbc1... or user@getalby.com'
                : 'Strike username or $cashtag'
            }
            className="bg-black border-white/20 text-white font-mono"
            required={required}
          />
        </div>
      </div>

      {/* Help Text */}
      <div className="flex items-start gap-2 text-xs text-white/50">
        {walletType === 'lightning' ? (
          <>
            <Zap className="w-3 h-3 mt-0.5 text-[#f7931a] flex-shrink-0" />
            <span>
              Accepts LNURL, Lightning Address (user@domain.com), or standard invoice format. 
              Payouts are instant and non-custodial.
            </span>
          </>
        ) : (
          <>
            <DollarSign className="w-3 h-3 mt-0.5 text-[#14f195] flex-shrink-0" />
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <span>Requires Strike account connection — payouts routed via Strike API.</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-3 h-3 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-secondary border-white/10 text-white max-w-xs">
                      <p>Strike integration requires OAuth authentication. You'll be redirected to authorize access. Funds arrive in your Strike balance instantly.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="text-yellow-500">⚠️ OAuth connection required (will prompt on first use)</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
