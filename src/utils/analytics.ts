import { Timeframe } from '../components/TimeframeSelector';

// Generate mock data based on timeframe
export function generateTimeframeData(baseValue: number, timeframe: Timeframe) {
  const variance = 0.15; // 15% variance
  const trendFactor = 1.05; // 5% growth trend
  
  // Current value with some random variation
  const currentValue = baseValue * (1 + (Math.random() - 0.5) * variance);
  
  // Previous value (slightly lower to show growth)
  const previousValue = currentValue / trendFactor * (1 + (Math.random() - 0.5) * variance * 0.5);
  
  return {
    current: Math.round(currentValue * 100) / 100,
    previous: Math.round(previousValue * 100) / 100
  };
}

// Generate chart data based on timeframe
export function generateChartData(timeframe: Timeframe, dataPoints: number = 12) {
  const labels = getTimeframeLabels(timeframe, dataPoints);
  
  return labels.map((label, index) => {
    // Create a trend over time
    const baseValue = 100;
    const trend = (index / dataPoints) * 50; // Upward trend
    const variance = Math.random() * 30;
    
    return {
      name: label,
      value: Math.round(baseValue + trend + variance)
    };
  });
}

// Get appropriate labels for the timeframe
function getTimeframeLabels(timeframe: Timeframe, count: number): string[] {
  const now = new Date();
  const labels: string[] = [];
  
  switch (timeframe) {
    case 'hourly':
      for (let i = count - 1; i >= 0; i--) {
        const hour = new Date(now.getTime() - i * 60 * 60 * 1000);
        labels.push(hour.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      }
      break;
      
    case 'daily':
      for (let i = count - 1; i >= 0; i--) {
        const day = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
        labels.push(day.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      }
      break;
      
    case 'weekly':
      for (let i = count - 1; i >= 0; i--) {
        const week = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
        labels.push(`Week ${count - i}`);
      }
      break;
      
    case 'monthly':
      for (let i = count - 1; i >= 0; i--) {
        const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
        labels.push(month.toLocaleDateString('en-US', { month: 'short' }));
      }
      break;
      
    case 'yearly':
      for (let i = count - 1; i >= 0; i--) {
        labels.push(`${now.getFullYear() - i}`);
      }
      break;
  }
  
  return labels;
}

// Generate revenue data with MLM tiers
export function generateRevenueByTier(timeframe: Timeframe) {
  const data = generateChartData(timeframe);
  
  return data.map(point => ({
    name: point.name,
    tier1: Math.round(point.value * 0.5),
    tier2: Math.round(point.value * 0.3),
    tier3: Math.round(point.value * 0.2),
    total: point.value
  }));
}

// Generate conversion data
export function generateConversionData(timeframe: Timeframe) {
  const data = generateChartData(timeframe);
  
  return data.map(point => ({
    name: point.name,
    conversions: Math.round(point.value * 0.8),
    clicks: Math.round(point.value * 10)
  }));
}

// Generate campaign performance data
export function generateCampaignData(campaigns: string[], timeframe: Timeframe) {
  return campaigns.map(campaign => {
    const baseRevenue = Math.random() * 1000 + 500;
    const baseConversions = Math.random() * 50 + 20;
    
    return {
      name: campaign,
      revenue: generateTimeframeData(baseRevenue, timeframe),
      conversions: generateTimeframeData(baseConversions, timeframe),
      clicks: generateTimeframeData(baseConversions * 20, timeframe)
    };
  });
}
