
import React from 'react';
import { Star } from 'lucide-react';
import { Review } from '@/data/reviews';

interface PropertyReviewsProps {
  reviews: Review[];
  averageRating: number;
}

const PropertyReviews: React.FC<PropertyReviewsProps> = ({ reviews, averageRating }) => {
  // 日付をフォーマットする関数
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold mb-6 flex items-center">
        宿泊者のレビュー
        <div className="flex items-center ml-3 bg-green-100 text-green-700 px-2 py-1 rounded-md">
          <Star className="fill-green-500 text-green-500 mr-1" size={16} />
          <span className="font-bold">{averageRating}</span>
          <span className="text-sm ml-1">({reviews.length}件)</span>
        </div>
      </h2>

      {reviews.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-timedrop-muted-gray">まだレビューがありません</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100 pb-6">
              <div className="flex items-start">
                <div className="mr-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                    {review.userAvatar ? (
                      <img 
                        src={review.userAvatar} 
                        alt={review.userName} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-500 font-semibold">
                        {review.userName.charAt(0)}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{review.userName}</h3>
                    <span className="text-sm text-timedrop-muted-gray">
                      {formatDate(review.date)}
                    </span>
                  </div>
                  
                  <div className="flex items-center mt-1 mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i}
                        size={16}
                        className={`${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} mr-0.5`}
                      />
                    ))}
                  </div>
                  
                  <p className="text-timedrop-dark-gray">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyReviews;
