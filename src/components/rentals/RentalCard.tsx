
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Users, Heart } from 'lucide-react';
import PriceTag from '../ui/PriceTag';
import { type Property } from '@/data/properties';
import { useWatchlist } from '@/hooks/use-watchlist';
import { useToast } from '@/components/ui/use-toast';

const RentalCard: React.FC<Property> = ({
  id,
  name,
  location,
  rating,
  reviewCount,
  price,
  originalPrice,
  imageUrl,
  roomsLeft,
  capacity,
  description,
  features,
  period
}) => {
  const navigate = useNavigate();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const { toast } = useToast();
  const inWatchlist = isInWatchlist(id);

  const handleWatchlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isNowInWatchlist = toggleWatchlist(id);
    toast({
      title: isNowInWatchlist ? "ウォッチリストに追加しました" : "ウォッチリストから削除しました",
      description: isNowInWatchlist ? "価格変動を通知します" : "物件がウォッチリストから削除されました",
    });
  };

  return (
    <div 
      onClick={() => navigate(`/rentals/${id}`)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border cursor-pointer group"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=800&auto=format&fit=crop&q=60";
            target.alt = "民泊施設のイメージ";
          }}
        />
        <div className="absolute top-4 right-4 flex gap-2">
          {roomsLeft <= 3 && (
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              残り{roomsLeft}室
            </div>
          )}
          <button
            onClick={handleWatchlistToggle}
            className={`p-2 rounded-full shadow-md transition-colors ${
              inWatchlist 
                ? "bg-red-50 text-red-500" 
                : "bg-white text-gray-400 hover:text-red-500 hover:bg-red-50"
            }`}
          >
            <Heart size={16} fill={inWatchlist ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-timedrop-dark-gray line-clamp-2">
            {name}
          </h3>
          <PriceTag price={price} originalPrice={originalPrice} size="sm" />
        </div>

        <p className="text-sm text-timedrop-muted-gray mb-3">{location}</p>

        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-1">
            <Star className="text-yellow-400" size={16} />
            <span className="text-sm font-medium text-timedrop-dark-gray">
              {rating}
            </span>
            <span className="text-sm text-timedrop-muted-gray">
              ({reviewCount})
            </span>
          </div>
          <div className="flex items-center gap-1 text-timedrop-muted-gray">
            <Users size={16} />
            <span className="text-sm">最大{capacity}名</span>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-sm text-timedrop-muted-gray line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-timedrop-gray/30 text-timedrop-dark-gray rounded-full text-xs"
            >
              {feature}
            </span>
          ))}
        </div>

        {period && (
          <div className="mt-3 text-sm text-timedrop-muted-gray">
            {period}から予約可能
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalCard;
