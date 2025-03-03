
import React from 'react';
import { Link } from 'react-router-dom';
import { Star, TrendingDown, Users, MapPin } from 'lucide-react';
import PriceTag from '../ui/PriceTag';
import { cn } from '@/lib/utils';

interface HotelCardProps {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  imageUrl: string;
  roomsLeft?: number;
  capacity?: number;
  className?: string;
}

const HotelCard: React.FC<HotelCardProps> = ({
  id,
  name,
  location,
  rating,
  reviewCount,
  price,
  originalPrice,
  imageUrl,
  roomsLeft,
  capacity = 2,
  className,
}) => {
  // Calculate discount percentage
  const discount = Math.round((1 - price / originalPrice) * 100);
  const isLowAvailability = roomsLeft !== undefined && roomsLeft <= 3;

  return (
    <Link to={`/hotel/${id}`}>
      <div className={cn(
        'interactive-card overflow-hidden hover:translate-y-[-4px]',
        className
      )}>
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
          
          {discount >= 15 && (
            <div className="absolute top-3 left-3 bg-timedrop-accent text-white text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1">
              <TrendingDown size={14} />
              <span>{discount}% OFF</span>
            </div>
          )}
          
          {isLowAvailability && (
            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-timedrop-accent text-xs font-medium px-2 py-1 rounded-md">
              残り{roomsLeft}室のみ！
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-timedrop-dark-gray">{name}</h3>
            <div className="flex items-center gap-1 text-xs">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="font-medium">{rating}</span>
              <span className="text-timedrop-muted-gray">({reviewCount})</span>
            </div>
          </div>
          
          <div className="flex items-center text-xs text-timedrop-muted-gray mb-3">
            <MapPin size={14} className="mr-1" />
            <span>{location}</span>
          </div>
          
          <div className="flex items-center text-xs text-timedrop-muted-gray mb-4">
            <Users size={14} className="mr-1" />
            <span>最大{capacity}名</span>
          </div>
          
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs text-timedrop-muted-gray mb-1">1泊あたり</div>
              <PriceTag price={price} originalPrice={originalPrice} size="md" />
            </div>
            
            <button className="text-xs bg-timedrop-blue text-white px-3 py-1.5 rounded-lg hover:bg-timedrop-dark-blue transition-colors">
              詳細を見る
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default HotelCard;
