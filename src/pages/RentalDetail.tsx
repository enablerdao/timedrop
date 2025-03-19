
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { sampleProperties, type Property } from '@/data/properties';
import AnimatedTransition from '@/components/shared/AnimatedTransition';
import { useToast } from '@/components/ui/use-toast';
import { getReviewsByPropertyId, getAverageRating } from '@/data/reviews';
import { useWatchlist } from '@/hooks/use-watchlist';
import { Droplet } from 'lucide-react';

// Import the components
import PropertyBreadcrumbs from '@/components/rentals/detail/PropertyBreadcrumbs';
import PropertyHeader from '@/components/rentals/detail/PropertyHeader';
import PropertyDescription from '@/components/rentals/detail/PropertyDescription';
import PriceHistorySection from '@/components/rentals/detail/PriceHistorySection';
import PropertyBookingCard from '@/components/rentals/detail/PropertyBookingCard';
import PropertyReviews from '@/components/rentals/detail/PropertyReviews';

const RentalDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [property, setProperty] = useState<Property | null>(null);
  const { isInWatchlist, toggleWatchlist: toggleWatchlistState } = useWatchlist();

  useEffect(() => {
    const foundProperty = sampleProperties.find(p => p.id === id);
    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      navigate('/rentals');
    }
  }, [id, navigate]);

  const toggleWatchlist = () => {
    if (!property) return;
    
    const isNowInWatchlist = toggleWatchlistState(property.id);
    toast({
      title: isNowInWatchlist ? "ウォッチリストに追加しました" : "ウォッチリストから削除しました",
      description: isNowInWatchlist ? "価格変動を通知します" : "物件がウォッチリストから削除されました",
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
        <PropertyBreadcrumbs property={null} />
        <main className="pt-24 flex-1 page-container">
          <div className="flex items-center justify-center h-full">
            <div className="animate-pulse">読み込み中...</div>
          </div>
        </main>
      </div>
    );
  }

  // Get reviews for this property
  const propertyReviews = getReviewsByPropertyId(property.id);
  const averageRating = getAverageRating(property.id);

  return (
    <div className="min-h-screen flex flex-col bg-timedrop-gray/30">
      <Navbar />
      <PropertyBreadcrumbs property={property} />
      
      <main className="pt-20 flex-1">
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
                
                <PropertyHeader 
                  property={property}
                  isInWatchlist={isInWatchlist(property.id)}
                  toggleWatchlist={toggleWatchlist}
                  shareProperty={shareProperty}
                />
                
                <PropertyDescription property={property} />
                
                <PriceHistorySection property={property} />
                
                <PropertyReviews 
                  reviews={propertyReviews} 
                  averageRating={averageRating} 
                />
              </AnimatedTransition>
            </div>
            
            <div className="lg:col-span-1">
              <AnimatedTransition animation="slide-up" delay={200}>
                <PropertyBookingCard 
                  property={property}
                  isInWatchlist={isInWatchlist(property.id)}
                  toggleWatchlist={toggleWatchlist}
                />
              </AnimatedTransition>
            </div>
          </div>
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

export default RentalDetail;
