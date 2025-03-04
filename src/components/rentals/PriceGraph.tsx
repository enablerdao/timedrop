
import React, { useEffect, useState, useRef } from 'react';
import { 
  Area, 
  AreaChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { cn } from '@/lib/utils';

export interface PriceGraphProps {
  data?: Array<{ date: string; price: number; predicted?: boolean }>;
  currentPrice: number;
  originalPrice: number;
  className?: string;
  height?: number;
  propertyId?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const isPredicted = payload[0].payload.predicted;
    return (
      <div className="bg-white p-2 border border-border rounded-lg shadow-sm">
        <p className="text-sm text-timedrop-dark-gray">{`${label}`}</p>
        <p className="text-sm font-semibold">
          <span className={isPredicted ? "text-timedrop-muted-gray" : "text-timedrop-primary"}>
            ¥{payload[0].value.toLocaleString()}
          </span>
          {isPredicted && <span className="text-xs ml-1">(予測)</span>}
        </p>
      </div>
    );
  }
  return null;
};

const PriceGraph: React.FC<PriceGraphProps> = ({
  data = [],
  currentPrice,
  originalPrice,
  className,
  height = 300,
  propertyId
}) => {
  const [graphData, setGraphData] = useState<Array<{ date: string; price: number; predicted?: boolean }>>(data);
  const chartRef = useRef<HTMLDivElement>(null);
  const [minMax, setMinMax] = useState({ min: 0, max: 0 });

  useEffect(() => {
    // If no data is provided, generate mock data
    if (data.length === 0) {
      setGraphData(generateMockData(currentPrice, originalPrice, propertyId));
    } else {
      setGraphData(data);
    }
    
    // Calculate min and max for y-axis
    const prices = graphData.map(item => item.price);
    const minPrice = Math.min(...prices) * 0.95;
    const maxPrice = Math.max(...prices) * 1.05;
    setMinMax({ min: minPrice, max: maxPrice });
  }, [data, currentPrice, originalPrice, propertyId, graphData.length]);

  // Split data into actual and predicted datasets for better visualization
  const actualData = graphData.filter(point => !point.predicted);
  const predictedData = graphData.filter(point => point.predicted);

  return (
    <div className={cn('bg-white rounded-xl border border-border p-4', className)} ref={chartRef}>
      <div className="mb-2">
        <h3 className="text-sm font-medium text-timedrop-dark-gray">
          直近の料金推移と今後の予測
        </h3>
        <div className="flex items-center justify-between text-sm">
          <span className="text-timedrop-muted-gray">
            定価: ¥{originalPrice.toLocaleString()}
          </span>
          <span className="flex items-center gap-1 text-timedrop-primary font-medium">
            <span className="inline-block w-2 h-2 bg-timedrop-primary rounded-full"></span>
            現在: ¥{currentPrice.toLocaleString()}
          </span>
        </div>
      </div>
      
      <div style={{ width: '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={graphData}
            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#94A3B8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              domain={['auto', 'auto']}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              tickCount={5}
              tickFormatter={(value) => `¥${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine 
              y={currentPrice} 
              stroke="#0EA5E9" 
              strokeDasharray="3 3" 
              label={{ value: '現在', position: 'insideBottomLeft', fill: '#0EA5E9', fontSize: 10 }}
            />
            
            {/* Historical price data */}
            <Area 
              type="monotone" 
              dataKey="price" 
              data={actualData}
              stroke="#0EA5E9" 
              strokeWidth={2}
              fill="url(#colorPrice)"
              activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
              dot={{ r: 3, stroke: 'white', strokeWidth: 2, fill: '#0EA5E9' }}
            />
            
            {/* Predicted price data */}
            <Area 
              type="monotone" 
              dataKey="price" 
              data={predictedData}
              stroke="#94A3B8" 
              strokeDasharray="5 5"
              strokeWidth={2}
              fill="url(#colorPredicted)"
              activeDot={{ r: 4, stroke: 'white', strokeWidth: 1 }}
              dot={{ r: 3, stroke: 'white', strokeWidth: 1, fill: '#94A3B8' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-2 flex items-center justify-end text-xs gap-4">
        <span className="flex items-center">
          <span className="inline-block w-3 h-3 bg-timedrop-blue rounded-full mr-1"></span>
          実際の価格
        </span>
        <span className="flex items-center">
          <span className="inline-block w-3 h-3 bg-timedrop-muted-gray/50 rounded-full mr-1"></span>
          <span className="inline-block w-3 h-0.5 bg-timedrop-muted-gray mr-1 border-t border-dashed"></span>
          予測価格
        </span>
      </div>
    </div>
  );
};

// Helper function to generate mock price data when no data is provided
function generateMockData(currentPrice: number, originalPrice: number, propertyId?: string) {
  const data: Array<{ date: string; price: number; predicted?: boolean }> = [];
  const today = new Date();
  
  // Generate data for the past 30 days (actual data)
  for (let i = 30; i >= 1; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate random fluctuations based on the property ID (for consistency)
    const seed = propertyId ? propertyId.charCodeAt(0) + propertyId.charCodeAt(propertyId.length - 1) : 42;
    const rand = (min: number, max: number) => {
      const x = Math.sin(seed * (min + max)) * 10000;
      return Math.floor((x - Math.floor(x)) * (max - min) + min);
    };
    
    // Calculate a price between original and current, with some randomness
    const factor = i / 30;
    const basePrice = originalPrice - (originalPrice - currentPrice) * (1 - factor);
    const randomVariation = rand(-5000, 5000);
    
    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      price: Math.round(basePrice + randomVariation),
      predicted: false
    });
  }
  
  // Generate data for the next 15 days (predicted data)
  for (let i = 1; i <= 15; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    
    // Make predictions based on current trend
    const trend = (originalPrice - currentPrice) / 30; // daily price change
    const randomFactor = Math.random() * 0.2 + 0.9; // random factor between 0.9 and 1.1
    const predictedPrice = Math.max(currentPrice - trend * i * randomFactor, currentPrice * 0.7);
    
    data.push({
      date: `${date.getMonth() + 1}/${date.getDate()}`,
      price: Math.round(predictedPrice),
      predicted: true
    });
  }
  
  return data;
}

export default PriceGraph;
