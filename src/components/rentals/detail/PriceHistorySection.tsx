
import React from 'react';
import PriceGraph from '@/components/rentals/PriceGraph';
import { Property } from '@/data/properties';

interface PriceHistorySectionProps {
  property: Property;
}

const PriceHistorySection = ({ property }: PriceHistorySectionProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border p-6 mb-6">
      <h2 className="text-lg font-semibold text-timedrop-dark-gray mb-4">価格推移</h2>
      <div className="h-[300px]">
        <PriceGraph 
          currentPrice={property.price} 
          originalPrice={property.originalPrice}
          propertyId={property.id}
        />
      </div>
    </div>
  );
};

export default PriceHistorySection;
