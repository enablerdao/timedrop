
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { sampleProperties, type Property } from '@/data/properties';
import { 
  MapPin, 
  Star, 
  Users, 
  Heart, 
  Share2, 
  Check, 
  Calendar,
  Clock 
} from 'lucide-react';
import AnimatedTransition from '@/components/shared/AnimatedTransition';
import PriceTag from '@/components/ui/PriceTag';
import PriceGraph from '@/components/rentals/PriceGraph';
import { useToast } from '@/components/ui/use-toast';

const RentalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [property, setProperty] = useState<Property | null>(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const foundProperty = sampleProperties.find(p => p.id === id);
    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      navigate('/rentals');
    }
  }, [id, navigate]);

  const toggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
    toast({
      title: isInWatchlist ? "ウォッチリストから削除しました" : "ウォッチリストに追加しました",
      description: isInWatchlist ? "物件がウォッチリストから削除されました" : "価格変動を通知します",
    });
  };

  const shareProperty = () => {
    if (navigator.share) {
      navigator.share({
        title: property?.name,
        text: `TimeDrop: ${property?.name} - ${property?.location}`,
        url: window.location.href,
      }).catch(error => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support sharing
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "URLをコピーしました",
        description: "友達に共有できます",
      });
    }
  };

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col bg-timedrop-gray/30">
        <Navbar />
        <main className="pt-24 flex-1 page-container">
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse">読み込み中...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-timedrop-gray/30">
      <Navbar />
      
      <main className="pt-20 flex-1">
        <div className="bg-white border-b border-timedrop-gray/50">
          <div className="page-container py-4">
            <nav className="flex text-sm text-timedrop-muted-gray">
              <a href="/" className="hover:text-timedrop-primary">ホーム</a>
              <span className="mx-2">/</span>
              <a href="/rentals" className="hover:text-timedrop-primary">民泊一覧</a>
              <span className="mx-2">/</span>
              <span className="text-timedrop-dark-gray line-clamp-1">{property.name}</span>
            </nav>
          </div>
        </div>
        
        <div className="page-container py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AnimatedTransition animation="fade">
                <div className="rounded-2xl overflow-hidden mb-6">
                  <img 
                    src={property.imageUrl} 
                    alt={property.name}
                    className="w-full h-[40vh] object-cover"
                  />
                </div>
                
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
              </AnimatedTransition>
            </div>
            
            <div className="lg:col-span-1">
              <AnimatedTransition animation="slide-up" delay={200}>
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
              </AnimatedTransition>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RentalDetail;
