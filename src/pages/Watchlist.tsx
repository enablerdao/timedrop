
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Heart, Trash2, Droplet } from 'lucide-react';
import AnimatedTransition from '@/components/shared/AnimatedTransition';
import { sampleProperties } from '@/data/properties';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import { useWatchlist } from '@/hooks/use-watchlist';

const Watchlist = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { getWatchlistProperties, removeFromWatchlist } = useWatchlist();
  const watchedProperties = getWatchlistProperties(sampleProperties);

  const handleRemoveFromWatchlist = (id: string) => {
    removeFromWatchlist(id);
    toast({
      title: "物件をウォッチリストから削除しました",
      description: "正常に削除されました",
    });
  };

  const viewProperty = (id: string) => {
    navigate(`/rentals/${id}`);
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveFromWatchlist(property.id);
                        }}
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
                onClick={() => navigate('/rentals')}
                className="px-4 py-2 bg-timedrop-primary text-white rounded-lg hover:bg-timedrop-primary/90 transition-colors"
              >
                物件を探す
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 bg-white/90 backdrop-blur-sm border-t border-border relative z-10">
        <div className="page-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center">
              <div className="flex items-center justify-center w-8 h-8 bg-timedrop-blue rounded-full overflow-hidden text-white mr-2 animate-pulse-soft">
                <Droplet size={16} className="fill-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-timedrop-blue mb-1">TimeDrop</h3>
                <p className="text-sm text-timedrop-muted-gray">時間とともに変わる新しい宿泊予約体験</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <Link to="/about" className="text-sm text-timedrop-dark-gray hover:text-timedrop-blue transition-all duration-300 hover:translate-y-[-1px]">
                サービスについて
              </Link>
              <Link to="/rentals" className="text-sm text-timedrop-dark-gray hover:text-timedrop-blue transition-all duration-300 hover:translate-y-[-1px]">
                ヴィラ一覧
              </Link>
              <Link to="/long-stay" className="text-sm text-timedrop-dark-gray hover:text-timedrop-blue transition-all duration-300 hover:translate-y-[-1px]">
                長期滞在
              </Link>
              <Link to="/watchlist" className="text-sm text-timedrop-dark-gray hover:text-timedrop-blue transition-all duration-300 hover:translate-y-[-1px]">
                ウォッチリスト
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-timedrop-gray/50 flex flex-col items-center">
            <a 
              href="https://enablerhq.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mb-4 transform hover:scale-105 transition-transform duration-300"
            >
              <svg viewBox="0 0 450 100" xmlns="http://www.w3.org/2000/svg" className="w-36 h-12">
                <defs>
                  <linearGradient id="topBarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22B6FF" />
                    <stop offset="100%" stopColor="#2BBCFF" />
                  </linearGradient>
                  
                  <linearGradient id="middleBarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22B6FF" />
                    <stop offset="100%" stopColor="#4CAF50" />
                  </linearGradient>
                  
                  <linearGradient id="bottomBarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2BBCFF" />
                    <stop offset="100%" stopColor="#22B6FF" />
                  </linearGradient>
                </defs>
                
                {/* 3本のバー */}
                <rect x="16" y="40" width="162" height="8" rx="4" fill="url(#topBarGradient)" />
                <rect x="16" y="60" width="100" height="8" rx="4" fill="url(#middleBarGradient)" />
                <rect x="16" y="80" width="162" height="8" rx="4" fill="url(#bottomBarGradient)" />
                
                {/* ENABLERテキスト */}
                <text x="198" y="84" fontFamily="Montserrat, sans-serif" fontSize="48" fontWeight="bold" fill="url(#topBarGradient)">ENABLER</text>
              </svg>
            </a>
            
            <div className="text-center text-xs text-timedrop-muted-gray">
              &copy; {new Date().getFullYear()} TimeDrop. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Watchlist;
