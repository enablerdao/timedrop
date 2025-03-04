
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users, Wifi, Calendar } from 'lucide-react';
import PriceTag from '../ui/PriceTag';
import { Property } from '@/data/properties';
import PriceGraph from './PriceGraph';

const LongStayPropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const navigate = useNavigate();
  const longStay = property.longStay;

  if (!longStay) return null;

  // 利用可能な月を簡潔に表示
  const availableMonthsText = longStay.availableMonths.length > 2 
    ? `${longStay.availableMonths[0]}〜${longStay.availableMonths[longStay.availableMonths.length - 1]}`
    : longStay.availableMonths.join('、');

  // 価格変動データを生成
  const priceData = generatePriceData(longStay.originalMonthlyPrice, longStay.monthlyPrice, property.id);

  return (
    <div 
      onClick={() => navigate(`/rentals/${property.id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-border cursor-pointer group"
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={property.imageUrl}
          alt={property.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&auto=format&fit=crop&q=60";
            target.alt = "民泊施設のイメージ";
          }}
        />
        <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-timedrop-primary px-3 py-1 rounded-full text-sm font-medium">
          長期滞在特典あり
        </div>
        {property.roomsLeft <= 3 && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            残り{property.roomsLeft}室
          </div>
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-timedrop-dark-gray line-clamp-2">
            {property.name}
          </h3>
        </div>

        <p className="text-sm text-timedrop-muted-gray mb-3 flex items-center">
          <span className="mr-1">{property.location}</span>
          {longStay.targetAudience && longStay.targetAudience.includes('リモートワーカー') && (
            <Wifi size={14} className="text-timedrop-blue ml-1" />
          )}
        </p>

        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <Star className="text-yellow-400" size={16} />
            <span className="text-sm font-medium text-timedrop-dark-gray">
              {property.rating}
            </span>
            <span className="text-sm text-timedrop-muted-gray">
              ({property.reviewCount})
            </span>
          </div>
          <div className="flex items-center gap-1 text-timedrop-muted-gray">
            <Users size={16} />
            <span className="text-sm">最大{property.capacity}名</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm font-medium text-timedrop-dark-gray mb-2">月額料金:</div>
          <PriceTag 
            price={longStay.monthlyPrice} 
            originalPrice={longStay.originalMonthlyPrice} 
            size="lg" 
          />
        </div>

        <div className="mb-4">
          <div className="text-sm text-timedrop-muted-gray mb-2 flex items-center">
            <Calendar size={14} className="mr-1" />
            利用可能期間: {availableMonthsText}
          </div>
        </div>

        <div className="h-[200px] mb-4">
          <PriceGraph 
            data={priceData}
            currentPrice={longStay.monthlyPrice} 
            originalPrice={longStay.originalMonthlyPrice}
            propertyId={property.id}
            height={200}
          />
        </div>

        {longStay.targetAudience && (
          <div className="flex flex-wrap gap-2 mt-3">
            {longStay.targetAudience.map((audience, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-timedrop-blue/10 text-timedrop-blue rounded-full text-xs"
              >
                {audience}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// 価格変動データを生成する関数
function generatePriceData(originalPrice: number, currentPrice: number, propertyId: string) {
  const data = [];
  const today = new Date();
  const targetMonth = new Date(2025, 4, 1); // 2025年5月
  
  // 現在から2025年5月までの月ごとの価格変動を計算
  const monthsUntilTarget = (targetMonth.getFullYear() - today.getFullYear()) * 12 + 
                           (targetMonth.getMonth() - today.getMonth());
  
  // 価格は直前に近づくほど下がっていく
  for (let i = monthsUntilTarget; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(date.getMonth() + i);
    
    let price;
    if (i >= 3) {
      // 3ヶ月以上前: 定価に近い (100万円付近)
      price = currentPrice + ((originalPrice - currentPrice) * 0.8 * (i / monthsUntilTarget));
    } else if (i > 1) {
      // 1-3ヶ月前: 徐々に下がる (100万円から下がっていく)
      price = currentPrice + ((originalPrice - currentPrice) * 0.4 * (i / 3));
    } else {
      // 直前: 最低価格に近づく (50万円付近)
      price = currentPrice * (1 + (i * 0.3));
    }
    
    data.push({
      date: `${date.getMonth() + 1}月`,
      price: Math.round(price),
      predicted: i > 0
    });
  }
  
  return data;
}

export default LongStayPropertyCard;
