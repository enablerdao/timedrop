
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import { sampleProperties, type Property } from '@/data/properties';
import AnimatedTransition from '@/components/shared/AnimatedTransition';
import { useToast } from '@/components/ui/use-toast';
import { getReviewsByPropertyId, getAverageRating } from '@/data/reviews';

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
                  isInWatchlist={isInWatchlist}
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
                  isInWatchlist={isInWatchlist}
                  toggleWatchlist={toggleWatchlist}
                />
              </AnimatedTransition>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RentalDetail;
