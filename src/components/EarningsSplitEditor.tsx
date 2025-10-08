import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Trash2, Plus, PieChart, AlertCircle } from 'lucide-react';
import { WalletType } from './WalletSelector';
import { Badge } from './ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export interface WalletSplit {
  id: string;
  walletType: WalletType;
  address: string;
  percentage: number;
}

interface EarningsSplitEditorProps {
  splits: WalletSplit[];
  onChange: (splits: WalletSplit[]) => void;
}

export function EarningsSplitEditor({ splits, onChange }: EarningsSplitEditorProps) {
  const totalPercentage = splits.reduce((sum, split) => sum + split.percentage, 0);
  const isValid = Math.abs(totalPercentage - 100) < 0.01;

  const addSplit = () => {
    if (splits.length >= 10) return;
    
    const newSplit: WalletSplit = {
      id: Math.random().toString(36).substr(2, 9),
      walletType: 'lightning',
      address: '',
      percentage: 0
    };
    onChange([...splits, newSplit]);
  };

  const removeSplit = (id: string) => {
    onChange(splits.filter(s => s.id !== id));
  };

  const updateSplit = (id: string, updates: Partial<WalletSplit>) => {
    onChange(splits.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const distributePie = () => {
    const equal = 100 / splits.length;
    onChange(splits.map(s => ({ ...s, percentage: equal })));
  };

  return (
    <Card className="bg-secondary border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <PieChart className="w-5 h-5 text-[#f7931a]" />
          <h3>Earnings Split Configuration</h3>
        </div>
        {splits.length > 1 && (
          <Button
            size="sm"
            variant="outline"
            onClick={distributePie}
            className="border-white/20 text-white hover:bg-white/10"
          >
            Distribute Equally
          </Button>
        )}
      </div>

      <p className="text-sm text-white/60 mb-4">
        Split your earnings across up to 10 wallets. Changes take effect from the next payout.
      </p>

      <div className="space-y-3 mb-4">
        {splits.map((split, index) => (
          <div key={split.id} className="bg-black border border-white/10 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm">
                {index + 1}
              </div>
              
              <div className="flex-1 space-y-3">
                {/* Wallet Type */}
                <Select
                  value={split.walletType}
                  onValueChange={(value) => updateSplit(split.id, { walletType: value as WalletType })}
                >
                  <SelectTrigger className="bg-secondary border-white/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-secondary border-white/10 text-white">
                    <SelectItem value="lightning">⚡ Lightning</SelectItem>
                    <SelectItem value="strike">💰 Strike</SelectItem>
                  </SelectContent>
                </Select>

                {/* Address */}
                <Input
                  type="text"
                  value={split.address}
                  onChange={(e) => updateSplit(split.id, { address: e.target.value })}
                  placeholder={
                    split.walletType === 'lightning'
                      ? 'lnbc1... or user@getalby.com'
                      : 'Strike username'
                  }
                  className="bg-secondary border-white/20 text-white font-mono text-sm"
                />

                {/* Percentage */}
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min="0.01"
                    max="100"
                    step="0.01"
                    value={split.percentage}
                    onChange={(e) => updateSplit(split.id, { percentage: parseFloat(e.target.value) || 0 })}
                    className="bg-secondary border-white/20 text-white"
                  />
                  <span className="text-white/60">%</span>
                </div>
              </div>

              {/* Remove Button */}
              {splits.length > 1 && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeSplit(split.id)}
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Wallet Button */}
      {splits.length < 10 && (
        <Button
          variant="outline"
          className="w-full border-white/20 text-white hover:bg-white/10"
          onClick={addSplit}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Wallet ({splits.length}/10)
        </Button>
      )}

      {/* Total Percentage Indicator */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-sm text-white/60">Total Allocation:</span>
          <div className="flex items-center gap-2">
            <Badge
              className={
                isValid
                  ? 'bg-[#14f195]/20 text-[#14f195] border-[#14f195]/30'
                  : 'bg-red-500/20 text-red-500 border-red-500/30'
              }
            >
              {totalPercentage.toFixed(2)}%
            </Badge>
            {!isValid && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  </TooltipTrigger>
                  <TooltipContent className="bg-secondary border-white/10 text-white">
                    <p>Total must equal 100%</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>

        {/* Visual Pie Preview */}
        {isValid && splits.length > 1 && (
          <div className="mt-3">
            <div className="h-2 rounded-full overflow-hidden flex">
              {splits.map((split, i) => (
                <div
                  key={split.id}
                  style={{
                    width: `${split.percentage}%`,
                    backgroundColor: i % 2 === 0 ? '#f7931a' : '#00d4ff'
                  }}
                  className="transition-all"
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {splits.map((split, i) => (
                <div key={split.id} className="flex items-center gap-1 text-xs">
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: i % 2 === 0 ? '#f7931a' : '#00d4ff' }}
                  />
                  <span className="text-white/60">{split.percentage.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-xs text-white/50 mt-3">
          💡 Each payout will be split according to these percentages. Separate transactions will be created for each wallet.
        </div>
      </div>
    </Card>
  );
}
