
import React from 'react';
import { Calendar, Users, Heart, Check, Clock } from 'lucide-react';
import PriceTag from '@/components/ui/PriceTag';
import { Property } from '@/data/properties';

interface PropertyBookingCardProps {
  property: Property;
  isInWatchlist: boolean;
  toggleWatchlist: () => void;
}

const PropertyBookingCard = ({ 
  property, 
  isInWatchlist, 
  toggleWatchlist 
}: PropertyBookingCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border p-6 sticky top-24">
      <div className="mb-4">
        <PriceTag 
          price={property.price} 
          originalPrice={property.originalPrice}
          size="lg"
        />
        {property.period && (
          <div className="text-sm text-timedrop-muted-gray mt-2">
            {property.period}から予約可能
          </div>
        )}
      </div>
      
      {property.roomsLeft <= 3 && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center">
          <Clock className="mr-2" size={18} />
          <span>早めのご予約を！残り<b>{property.roomsLeft}室</b>のみ</span>
        </div>
      )}
      
      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1">
          <div className="bg-timedrop-gray/50 rounded-xl px-4 py-3 flex items-center">
            <Calendar className="text-timedrop-muted-gray flex-shrink-0 mr-2" size={20} />
            <input
              type="text"
              placeholder="日付を選択"
              className="w-full bg-transparent outline-none text-timedrop-dark-gray placeholder:text-timedrop-muted-gray"
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mb-6">
        <div className="flex-1">
          <div className="bg-timedrop-gray/50 rounded-xl px-4 py-3 flex items-center">
            <Users className="text-timedrop-muted-gray flex-shrink-0 mr-2" size={20} />
            <input
              type="text"
              placeholder="人数"
              className="w-full bg-transparent outline-none text-timedrop-dark-gray placeholder:text-timedrop-muted-gray"
            />
          </div>
        </div>
      </div>
      
      <button className="w-full bg-timedrop-primary text-white rounded-xl py-3 font-medium hover:bg-timedrop-primary/90 transition-colors mb-3">
        今すぐ予約する
      </button>
      
      <button 
        onClick={toggleWatchlist}
        className={`w-full py-3 rounded-xl font-medium border transition-colors ${
          isInWatchlist 
            ? "bg-red-50 text-red-500 border-red-500" 
            : "bg-white text-timedrop-dark-gray border-timedrop-gray/50 hover:bg-timedrop-gray/20"
        }`}
      >
        <Heart size={16} className="inline-block mr-2" fill={isInWatchlist ? "currentColor" : "none"} />
        {isInWatchlist ? "ウォッチリストから削除" : "ウォッチリストに追加"}
      </button>
      
      <div className="mt-4 text-sm text-timedrop-muted-gray">
        <div className="flex items-center mb-1">
          <Check size={16} className="text-green-500 mr-2" />
          <span>料金変動をリアルタイムに通知</span>
        </div>
        <div className="flex items-center">
          <Check size={16} className="text-green-500 mr-2" />
          <span>キャンセル無料（7日前まで）</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyBookingCard;
