import { useState } from 'react';
import { Card } from './ui/card';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MousePointerClick, TrendingUp, DollarSign } from 'lucide-react';
import { Timeframe } from './TimeframeSelector';
import { generateChartData } from '../utils/analytics';

type DataCategory = 'clicks' | 'conversions' | 'profit';

interface UnifiedGraphCardProps {
  title?: string;
  categories?: DataCategory[];
  defaultCategory?: DataCategory;
  timeframes?: Timeframe[];
  defaultTimeframe?: Timeframe;
  showMultiSeries?: boolean;
  multiSeriesData?: Array<{ key: string; name: string; color: string }>;
}

export function UnifiedGraphCard({
  title = 'Performance Analytics',
  categories = ['clicks', 'conversions', 'profit'],
  defaultCategory = 'conversions',
  timeframes = ['hourly', 'daily', 'weekly', 'monthly', 'yearly'],
  defaultTimeframe = 'daily',
  showMultiSeries = false,
  multiSeriesData = []
}: UnifiedGraphCardProps) {
  const [selectedCategory, setSelectedCategory] = useState<DataCategory>(defaultCategory);
  const [selectedTimeframe, setSelectedTimeframe] = useState<Timeframe>(defaultTimeframe);

  const categoryConfig = {
    clicks: {
      icon: MousePointerClick,
      label: 'Clicks',
      color: '#00d4ff',
      dataKey: 'value'
    },
    conversions: {
      icon: TrendingUp,
      label: 'Conversions',
      color: '#14f195',
      dataKey: 'value'
    },
    profit: {
      icon: DollarSign,
      label: 'Profit',
      color: '#f7931a',
      dataKey: 'value'
    }
  };

  const config = categoryConfig[selectedCategory];
  const Icon = config.icon;

  // Generate data based on selected timeframe
  const chartData = generateChartData(selectedTimeframe);

  return (
    <Card className="bg-secondary border-white/10 p-6">
      <div className="space-y-4">
        {/* Header with Title */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5 text-[#f7931a]" />
            <h2>{title}</h2>
          </div>
        </div>

        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          {/* Category Toggles */}
          {!showMultiSeries && categories.length > 1 && (
            <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as DataCategory)}>
              <TabsList className="bg-black border-white/10">
                {categories.includes('clicks') && (
                  <TabsTrigger
                    value="clicks"
                    className="data-[state=active]:bg-[#00d4ff]/20 data-[state=active]:text-[#00d4ff] data-[state=active]:shadow-[0_0_10px_rgba(0,212,255,0.3)]"
                  >
                    <MousePointerClick className="w-4 h-4 mr-1.5" />
                    Clicks
                  </TabsTrigger>
                )}
                {categories.includes('conversions') && (
                  <TabsTrigger
                    value="conversions"
                    className="data-[state=active]:bg-[#14f195]/20 data-[state=active]:text-[#14f195] data-[state=active]:shadow-[0_0_10px_rgba(20,241,149,0.3)]"
                  >
                    <TrendingUp className="w-4 h-4 mr-1.5" />
                    Conversions
                  </TabsTrigger>
                )}
                {categories.includes('profit') && (
                  <TabsTrigger
                    value="profit"
                    className="data-[state=active]:bg-[#f7931a]/20 data-[state=active]:text-[#f7931a] data-[state=active]:shadow-[0_0_10px_rgba(247,147,26,0.3)]"
                  >
                    <DollarSign className="w-4 h-4 mr-1.5" />
                    Profit
                  </TabsTrigger>
                )}
              </TabsList>
            </Tabs>
          )}

          {/* Timeframe Toggles */}
          <Tabs value={selectedTimeframe} onValueChange={(v) => setSelectedTimeframe(v as Timeframe)}>
            <TabsList className="bg-black border-white/10">
              {timeframes.includes('hourly') && (
                <TabsTrigger
                  value="hourly"
                  className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all text-xs sm:text-sm"
                >
                  Hourly
                </TabsTrigger>
              )}
              {timeframes.includes('daily') && (
                <TabsTrigger
                  value="daily"
                  className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all text-xs sm:text-sm"
                >
                  Day
                </TabsTrigger>
              )}
              {timeframes.includes('weekly') && (
                <TabsTrigger
                  value="weekly"
                  className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all text-xs sm:text-sm"
                >
                  7 Days
                </TabsTrigger>
              )}
              {timeframes.includes('monthly') && (
                <TabsTrigger
                  value="monthly"
                  className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all text-xs sm:text-sm"
                >
                  30 Days
                </TabsTrigger>
              )}
              {timeframes.includes('yearly') && (
                <TabsTrigger
                  value="yearly"
                  className="data-[state=active]:bg-[#f7931a] data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(247,147,26,0.5)] transition-all text-xs sm:text-sm"
                >
                  Year
                </TabsTrigger>
              )}
            </TabsList>
          </Tabs>
        </div>

        {/* Chart */}
        <div className="bg-black border border-white/10 rounded-lg p-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis
                dataKey="name"
                stroke="#888"
                style={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#888"
                style={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
                labelStyle={{ color: '#fff' }}
              />
              
              {showMultiSeries && multiSeriesData.length > 0 ? (
                <>
                  <Legend />
                  {multiSeriesData.map((series) => (
                    <Line
                      key={series.key}
                      type="monotone"
                      dataKey={series.key}
                      name={series.name}
                      stroke={series.color}
                      strokeWidth={2}
                      dot={{ fill: series.color, r: 3 }}
                    />
                  ))}
                </>
              ) : (
                <Line
                  type="monotone"
                  dataKey={config.dataKey}
                  stroke={config.color}
                  strokeWidth={3}
                  dot={{ fill: config.color, r: 4 }}
                  name={config.label}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Mobile-friendly summary */}
        <div className="sm:hidden text-xs text-white/50 text-center">
          Showing {config.label.toLowerCase()} over {selectedTimeframe} period
        </div>
      </div>
    </Card>
  );
}
