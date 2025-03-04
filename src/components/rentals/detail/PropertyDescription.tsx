
import React from 'react';
import { Check } from 'lucide-react';
import { Property } from '@/data/properties';

interface PropertyDescriptionProps {
  property: Property;
}

const PropertyDescription = ({ property }: PropertyDescriptionProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border p-6 mb-6">
      <h2 className="text-lg font-semibold text-timedrop-dark-gray mb-4">説明</h2>
      <p className="text-timedrop-dark-gray mb-6">
        {property.description}
      </p>
      
      <h3 className="text-lg font-semibold text-timedrop-dark-gray mb-3">特徴</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
        {property.features.map((feature, index) => (
          <div key={index} className="flex items-center text-timedrop-dark-gray">
            <Check size={18} className="text-green-500 mr-2" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyDescription;
