
import React, { useState } from 'react';
import { Calendar, Users, Heart, Check, Clock } from 'lucide-react';
import PriceTag from '@/components/ui/PriceTag';
import { Property } from '@/data/properties';
import { DateRange } from 'react-day-picker';
import { DateRangePicker } from '@/components/booking/DateRangePicker';
import { GuestSelector } from '@/components/booking/GuestSelector';
import BookingForm from '@/components/booking/BookingForm';
import { useNotifications } from '@/hooks/use-notifications';

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
  const { createPriceDropNotification } = useNotifications();
  
  // ウォッチリストに追加したときに価格変動通知をシミュレート
  const handleToggleWatchlist = () => {
    toggleWatchlist();
    
    // ウォッチリストに追加された場合、価格変動通知をシミュレート
    if (!isInWatchlist) {
      // 5秒後に価格変動通知を表示（デモ用）
      setTimeout(() => {
        const oldPrice = property.originalPrice;
        const newPrice = property.price;
        createPriceDropNotification(property, oldPrice, newPrice);
      }, 5000);
    }
  };

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
      
      <BookingForm property={property} />
      
      <div className="mt-3">
        <button 
          onClick={handleToggleWatchlist}
          className={`w-full py-3 rounded-xl font-medium border transition-colors ${
            isInWatchlist 
              ? "bg-red-50 text-red-500 border-red-500" 
              : "bg-white text-timedrop-dark-gray border-timedrop-gray/50 hover:bg-timedrop-gray/20"
          }`}
        >
          <Heart size={16} className="inline-block mr-2" fill={isInWatchlist ? "currentColor" : "none"} />
          {isInWatchlist ? "ウォッチリストから削除" : "ウォッチリストに追加"}
        </button>
      </div>
      
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
