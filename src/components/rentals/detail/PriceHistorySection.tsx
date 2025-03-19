
import React, { useState } from 'react';
import PriceGraph from '@/components/rentals/PriceGraph';
import { Property } from '@/data/properties';
import { toast } from '@/components/ui/use-toast';
import { Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWatchlist } from '@/hooks/use-watchlist';

interface PriceHistorySectionProps {
  property: Property;
}

const PriceHistorySection = ({ property }: PriceHistorySectionProps) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const [priceAlertEnabled, setPriceAlertEnabled] = useState(false);
  const [targetPrice, setTargetPrice] = useState(Math.floor(property.price * 0.9));

  const handleToggleAlert = () => {
    setPriceAlertEnabled(!priceAlertEnabled);
    
    if (!priceAlertEnabled) {
      // Enable price alert
      toast({
        title: "価格通知が設定されました",
        description: `¥${targetPrice.toLocaleString()}以下になったらお知らせします`,
        duration: 3000,
      });
    } else {
      // Disable price alert
      toast({
        title: "価格通知が解除されました",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleWatchlistToggle = () => {
    const isAdded = toggleWatchlist(property.id);
    
    if (isAdded) {
      toast({
        title: "ウォッチリストに追加しました",
        description: "マイページからいつでも確認できます",
        duration: 3000,
      });
    } else {
      toast({
        title: "ウォッチリストから削除しました",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-timedrop-dark-gray">価格推移</h2>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1 text-sm"
            onClick={handleToggleAlert}
          >
            {priceAlertEnabled ? (
              <>
                <BellOff className="h-4 w-4" />
                通知オフ
              </>
            ) : (
              <>
                <Bell className="h-4 w-4" />
                価格通知
              </>
            )}
          </Button>
          
          <Button
            variant={isInWatchlist(property.id) ? "default" : "outline"}
            size="sm"
            className="text-sm"
            onClick={handleWatchlistToggle}
          >
            {isInWatchlist(property.id) ? "ウォッチ中" : "ウォッチする"}
          </Button>
        </div>
      </div>
      
      {priceAlertEnabled && (
        <div className="bg-blue-50 p-3 rounded-lg mb-4 flex items-center justify-between">
          <div className="text-sm text-timedrop-dark-gray">
            <span className="font-medium">価格通知:</span> ¥{targetPrice.toLocaleString()}以下になったらお知らせします
          </div>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min={Math.floor(property.price * 0.7)}
              max={property.price}
              value={targetPrice}
              onChange={(e) => setTargetPrice(parseInt(e.target.value))}
              className="w-24"
            />
            <span className="text-sm font-medium">¥{targetPrice.toLocaleString()}</span>
          </div>
        </div>
      )}
      
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
