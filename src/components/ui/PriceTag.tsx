
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowDownCircle } from 'lucide-react';

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  showDiscount?: boolean;
  isAnimated?: boolean;
  className?: string;
}

const PriceTag: React.FC<PriceTagProps> = ({
  price,
  originalPrice,
  currency = '¥',
  size = 'md',
  showDiscount = true,
  isAnimated = false,
  className,
}) => {
  const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;
  const hasDiscount = originalPrice && originalPrice > price;

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-3xl font-bold',
  };

  return (
    <div className={cn('flex items-end gap-2', className)}>
      <div className="flex items-baseline">
        <span className="text-timedrop-dark-gray mr-0.5">{currency}</span>
        <span 
          className={cn(
            'font-semibold', 
            sizeClasses[size],
            isAnimated && 'animate-price-drop text-timedrop-blue transition-colors'
          )}
        >
          {price.toLocaleString()}
        </span>
      </div>
      
      {hasDiscount && showDiscount && (
        <div className="flex items-center space-x-1">
          <span className="text-xs text-timedrop-muted-gray line-through">
            {currency}{originalPrice.toLocaleString()}
          </span>
          
          <div className="flex items-center gap-0.5 bg-timedrop-accent/10 text-timedrop-accent px-1.5 py-0.5 rounded text-xs font-medium">
            <ArrowDownCircle size={12} />
            <span>{discount}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceTag;
