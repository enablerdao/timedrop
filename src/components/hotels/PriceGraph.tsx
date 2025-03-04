
import React, { useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { cn } from '@/lib/utils';

interface PricePoint {
  day: string;
  price: number;
  predicted?: boolean;
}

interface PriceGraphProps {
  data?: PricePoint[];
  currentPrice: number;
  originalPrice: number;
  className?: string;
  height?: number;
  propertyId?: string; // Added propertyId as an optional prop
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    const isPredicted = dataPoint.predicted;
    
    return (
      <div className="bg-white p-3 shadow-md rounded-lg border border-border text-sm">
        <p className="font-medium text-timedrop-dark-gray">{label}</p>
        <p className="text-timedrop-blue font-semibold">¥{dataPoint.price.toLocaleString()}</p>
        {isPredicted && (
          <p className="text-xs text-timedrop-muted-gray mt-1">予測価格</p>
        )}
      </div>
    );
  }

  return null;
};

const PriceGraph: React.FC<PriceGraphProps> = ({
  data = [],  // Provide a default empty array for data
  currentPrice,
  originalPrice,
  className,
  height = 200,
  propertyId
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  const discount = Math.round((1 - currentPrice / originalPrice) * 100);
  
  // Generate mock data if no data is provided
  const graphData = data.length > 0 ? data : generateMockData(currentPrice, originalPrice, propertyId);

  // Add gradient
  useEffect(() => {
    if (!chartRef.current) return;
    
    // Find min and max for better visualization
    const prices = graphData.map(point => point.price);
    const minPrice = Math.min(...prices) * 0.95;
    const maxPrice = Math.max(...prices) * 1.05;
    
  }, [graphData]);

  return (
    <div className={cn('bg-white rounded-xl border border-border p-4', className)} ref={chartRef}>
      <div className="mb-4">
        <h3 className="text-base font-medium text-timedrop-dark-gray">価格推移グラフ</h3>
        <p className="text-xs text-timedrop-muted-gray">過去7日間と予測価格</p>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-xs text-timedrop-muted-gray">現在</div>
          <div className="text-xl font-semibold text-timedrop-blue">¥{currentPrice.toLocaleString()}</div>
        </div>
        
        <div className="text-right">
          <div className="text-xs text-timedrop-muted-gray">当初価格</div>
          <div className="text-sm text-timedrop-muted-gray">
            ¥{originalPrice.toLocaleString()}
            <span className="ml-2 text-xs bg-timedrop-accent/10 text-timedrop-accent px-1.5 py-0.5 rounded">
              -{discount}%
            </span>
          </div>
        </div>
      </div>
      
      <div style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={graphData}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#94A3B8' }}
            />
            <YAxis 
              domain={['auto', 'auto']}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#94A3B8' }}
              tickFormatter={(value) => `¥${value.toLocaleString()}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={currentPrice} stroke="#0EA5E9" strokeDasharray="3 3" />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#0EA5E9" 
              strokeWidth={2}
              fill="url(#colorPrice)"
              activeDot={{ r: 6, stroke: 'white', strokeWidth: 2 }}
              dot={{ r: 3, stroke: 'white', strokeWidth: 2, fill: '#0EA5E9' }}
            />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              stroke="#94A3B8" 
              strokeDasharray="5 5" 
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex justify-between mt-2 text-xs">
        <span className="flex items-center">
          <span className="inline-block w-3 h-3 bg-timedrop-blue rounded-full mr-1"></span>
          実際の価格
        </span>
        <span className="flex items-center">
          <span className="inline-block w-3 h-0.5 bg-timedrop-muted-gray mr-1 border-t border-dashed"></span>
          予測価格
        </span>
      </div>
    </div>
  );
};

// Helper function to generate mock data based on property ID
function generateMockData(currentPrice: number, originalPrice: number, propertyId?: string): PricePoint[] {
  // Get today and previous dates
  const today = new Date();
  const dateFormat = new Intl.DateTimeFormat('ja', { month: 'short', day: 'numeric' });
  
  // Generate random fluctuations based on the property ID (for consistency)
  const seed = propertyId ? propertyId.charCodeAt(0) + propertyId.charCodeAt(propertyId.length - 1) : 42;
  const rand = (min: number, max: number) => {
    const x = Math.sin(seed) * 10000;
    return Math.floor((x - Math.floor(x)) * (max - min) + min);
  };
  
  // Generate past data (real prices)
  const pastData: PricePoint[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    // Create a price point with some random fluctuation
    const fluctuation = rand(85, 115) / 100;
    const dayPrice = Math.round(
      originalPrice - ((originalPrice - currentPrice) * (7 - i) / 7) * fluctuation
    );
    
    pastData.push({
      day: dateFormat.format(date),
      price: dayPrice,
      predicted: false
    });
  }
  
  // Generate future data (predicted prices)
  const futureData: PricePoint[] = [];
  for (let i = 1; i <= 3; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    
    // Create a predicted price point with some downward trend
    const fluctuation = rand(85, 115) / 100;
    const predictedReduction = rand(2, 8) / 100; // 2-8% reduction
    const dayPrice = Math.round(currentPrice * (1 - predictedReduction * i) * fluctuation);
    
    futureData.push({
      day: dateFormat.format(date),
      price: dayPrice,
      predicted: true
    });
  }
  
  return [...pastData, ...futureData];
}

export default PriceGraph;
