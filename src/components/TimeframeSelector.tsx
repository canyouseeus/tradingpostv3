import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

export type Timeframe = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';

interface TimeframeSelectorProps {
  value: Timeframe;
  onChange: (value: Timeframe) => void;
}

export function TimeframeSelector({ value, onChange }: TimeframeSelectorProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as Timeframe)}>
      <TabsList className="bg-secondary border border-white/10">
        <TabsTrigger 
          value="hourly" 
          className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all"
        >
          Hourly
        </TabsTrigger>
        <TabsTrigger 
          value="daily" 
          className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all"
        >
          Daily
        </TabsTrigger>
        <TabsTrigger 
          value="weekly" 
          className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all"
        >
          Weekly
        </TabsTrigger>
        <TabsTrigger 
          value="monthly" 
          className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all"
        >
          Monthly
        </TabsTrigger>
        <TabsTrigger 
          value="yearly" 
          className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all"
        >
          Yearly
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
