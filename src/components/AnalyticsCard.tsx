import { Card } from './ui/card';
import { TimeframeSelector, Timeframe } from './TimeframeSelector';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AnalyticsCardProps {
  title: string;
  currentValue: number;
  previousValue: number;
  format?: 'currency' | 'number' | 'percentage';
  timeframe: Timeframe;
  onTimeframeChange: (timeframe: Timeframe) => void;
  suffix?: string;
  prefix?: string;
}

export function AnalyticsCard({
  title,
  currentValue,
  previousValue,
  format = 'number',
  timeframe,
  onTimeframeChange,
  suffix = '',
  prefix = ''
}: AnalyticsCardProps) {
  // Calculate percentage change
  const percentageChange = previousValue === 0 
    ? (currentValue > 0 ? 100 : 0)
    : ((currentValue - previousValue) / previousValue) * 100;
  
  const isPositive = percentageChange >= 0;

  // Format the value based on type
  const formatValue = (value: number) => {
    if (format === 'currency') {
      return `${prefix}${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}${suffix}`;
    } else if (format === 'percentage') {
      return `${value.toFixed(1)}%`;
    } else {
      return `${prefix}${value.toLocaleString()}${suffix}`;
    }
  };

  // Get timeframe label
  const getTimeframeLabel = () => {
    switch (timeframe) {
      case 'hourly': return 'vs last hour';
      case 'daily': return 'vs yesterday';
      case 'weekly': return 'vs last week';
      case 'monthly': return 'vs last month';
      case 'yearly': return 'vs last year';
    }
  };

  return (
    <Card className="bg-secondary border-white/10 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-white/60 mb-1">{title}</p>
          <p className="text-3xl text-white">{formatValue(currentValue)}</p>
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded ${
          isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="text-sm">
            {isPositive ? '+' : ''}{percentageChange.toFixed(1)}%
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-white/40">
          {getTimeframeLabel()}
        </p>
        <TimeframeSelector value={timeframe} onChange={onTimeframeChange} />
      </div>
    </Card>
  );
}
