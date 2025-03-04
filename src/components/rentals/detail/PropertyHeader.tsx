
import React from 'react';
import { MapPin, Star, Users, Heart, Share2 } from 'lucide-react';
import { Property } from '@/data/properties';

interface PropertyHeaderProps {
  property: Property;
  isInWatchlist: boolean;
  toggleWatchlist: () => void;
  shareProperty: () => void;
}

const PropertyHeader = ({ 
  property, 
  isInWatchlist, 
  toggleWatchlist, 
  shareProperty 
}: PropertyHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-timedrop-dark-gray mb-1">
          {property.name}
        </h1>
        <div className="flex items-center text-timedrop-muted-gray mb-2">
          <MapPin size={16} className="mr-1" />
          <span>{property.location}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <Star className="text-yellow-400 mr-1" size={18} />
            <span className="font-medium text-timedrop-dark-gray">
              {property.rating}
            </span>
            <span className="text-timedrop-muted-gray ml-1">
              ({property.reviewCount}件)
            </span>
          </div>
          <div className="flex items-center text-timedrop-muted-gray">
            <Users size={16} className="mr-1" />
            <span>最大{property.capacity}名</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <button 
          onClick={toggleWatchlist}
          className={`p-3 rounded-full transition-colors ${
            isInWatchlist 
              ? "bg-red-50 text-red-500" 
              : "bg-timedrop-gray/50 text-timedrop-muted-gray hover:bg-timedrop-gray/80"
          }`}
        >
          <Heart size={20} fill={isInWatchlist ? "currentColor" : "none"} />
        </button>
        <button 
          onClick={shareProperty}
          className="p-3 rounded-full bg-timedrop-gray/50 text-timedrop-muted-gray hover:bg-timedrop-gray/80 transition-colors"
        >
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default PropertyHeader;
