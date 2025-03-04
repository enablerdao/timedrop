
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Heart, Trash2 } from 'lucide-react';
import AnimatedTransition from '@/components/shared/AnimatedTransition';
import { sampleProperties } from '@/data/properties';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const Watchlist = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [watchedProperties, setWatchedProperties] = useState(sampleProperties);

  const removeFromWatchlist = (id: string) => {
    setWatchedProperties(watchedProperties.filter(property => property.id !== id));
    toast({
      title: "物件をウォッチリストから削除しました",
      description: "正常に削除されました",
    });
  };

  const viewProperty = (id: string) => {
    navigate(`/hotels/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-timedrop-gray/30">
      <Navbar />
      
      <main className="pt-24 flex-1">
        <div className="page-container py-6">
          <h1 className="text-xl font-semibold text-timedrop-dark-gray mb-2">
            ウォッチリスト
          </h1>
          <p className="text-timedrop-muted-gray mb-8">
            気になる物件をチェックして、価格の変動を見守りましょう
          </p>
          
          {watchedProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {watchedProperties.map((property, index) => (
                <AnimatedTransition key={property.id} animation="slide-up" delay={index * 100}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-border cursor-pointer group relative">
                    <div 
                      className="relative aspect-[4/3] overflow-hidden"
                      onClick={() => viewProperty(property.id)}
                    >
                      <img
                        src={property.imageUrl}
                        alt={property.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {property.roomsLeft <= 3 && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          残り{property.roomsLeft}室
                        </div>
                      )}
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <button
                        onClick={() => removeFromWatchlist(property.id)}
                        className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="text-red-500" size={16} />
                      </button>
                    </div>

                    <div className="p-4" onClick={() => viewProperty(property.id)}>
                      <h3 className="text-lg font-semibold text-timedrop-dark-gray line-clamp-2 mb-2">
                        {property.name}
                      </h3>
                      <p className="text-sm text-timedrop-muted-gray mb-2">{property.location}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-timedrop-primary font-semibold">
                          ¥{property.price.toLocaleString()}
                        </div>
                        <div className="text-green-500 text-sm font-medium">
                          {Math.round(((property.originalPrice - property.price) / property.originalPrice) * 100)}% オフ
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedTransition>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-border">
              <Heart className="mx-auto text-gray-300 mb-4" size={64} />
              <h2 className="text-lg font-semibold text-timedrop-dark-gray mb-2">ウォッチリストは空です</h2>
              <p className="text-timedrop-muted-gray mb-4">気になる物件をウォッチリストに追加すると、ここに表示されます</p>
              <button 
                onClick={() => navigate('/hotels')}
                className="px-4 py-2 bg-timedrop-primary text-white rounded-lg hover:bg-timedrop-primary/90 transition-colors"
              >
                物件を探す
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Watchlist;
