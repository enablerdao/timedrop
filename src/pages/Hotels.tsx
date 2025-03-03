
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import HotelCard from '@/components/hotels/HotelCard';
import { Search, Calendar, Users, SlidersHorizontal, ArrowDownCircle } from 'lucide-react';
import AnimatedTransition from '@/components/shared/AnimatedTransition';
import { cn } from '@/lib/utils';

// Sample hotel data
const sampleHotels = [
  {
    id: '1',
    name: 'グランドホテル東京',
    location: '東京都中央区',
    rating: 4.8,
    reviewCount: 423,
    price: 32000,
    originalPrice: 38000,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop',
    roomsLeft: 2,
    capacity: 2
  },
  {
    id: '2',
    name: 'ロイヤルステイ京都',
    location: '京都市東山区',
    rating: 4.7,
    reviewCount: 345,
    price: 29500,
    originalPrice: 41000,
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=500&auto=format&fit=crop',
    roomsLeft: 5,
    capacity: 3
  },
  {
    id: '3',
    name: 'ベイサイドホテル大阪',
    location: '大阪市港区',
    rating: 4.5,
    reviewCount: 287,
    price: 18500,
    originalPrice: 25000,
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=500&auto=format&fit=crop',
    roomsLeft: 8,
    capacity: 2
  },
  {
    id: '4',
    name: 'オーシャンビュー沖縄',
    location: '沖縄県那覇市',
    rating: 4.9,
    reviewCount: 512,
    price: 45000,
    originalPrice: 58000,
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=500&auto=format&fit=crop',
    roomsLeft: 1,
    capacity: 4
  },
  {
    id: '5',
    name: 'シティホテル札幌',
    location: '札幌市中央区',
    rating: 4.3,
    reviewCount: 198,
    price: 15000,
    originalPrice: 19000,
    imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=500&auto=format&fit=crop',
    roomsLeft: 12,
    capacity: 2
  },
  {
    id: '6',
    name: 'マウンテンロッジ軽井沢',
    location: '長野県軽井沢町',
    rating: 4.6,
    reviewCount: 234,
    price: 27500,
    originalPrice: 35000,
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=500&auto=format&fit=crop',
    roomsLeft: 3,
    capacity: 4
  }
];

// Filter options
const priceRanges = [
  { label: '〜¥10,000', value: '0-10000' },
  { label: '¥10,000〜¥20,000', value: '10000-20000' },
  { label: '¥20,000〜¥30,000', value: '20000-30000' },
  { label: '¥30,000〜¥50,000', value: '30000-50000' },
  { label: '¥50,000〜', value: '50000-999999' },
];

const discountRanges = [
  { label: '10%以上', value: 10 },
  { label: '20%以上', value: 20 },
  { label: '30%以上', value: 30 },
  { label: '40%以上', value: 40 },
];

const ratings = [5, 4, 3, 2, 1];

const Hotels = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('recommended');
  
  // Filters
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([]);
  const [selectedDiscountRange, setSelectedDiscountRange] = useState<number[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  
  const togglePriceRange = (range: string) => {
    setSelectedPriceRange(prev => 
      prev.includes(range) 
        ? prev.filter(r => r !== range) 
        : [...prev, range]
    );
  };
  
  const toggleDiscountRange = (range: number) => {
    setSelectedDiscountRange(prev => 
      prev.includes(range) 
        ? prev.filter(r => r !== range) 
        : [...prev, range]
    );
  };
  
  const toggleRating = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating) 
        : [...prev, rating]
    );
  };
  
  // Sort hotels
  const sortHotels = (hotels: typeof sampleHotels) => {
    switch (sortOption) {
      case 'price-asc':
        return [...hotels].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...hotels].sort((a, b) => b.price - a.price);
      case 'discount':
        return [...hotels].sort((a, b) => 
          (1 - a.price / a.originalPrice) - (1 - b.price / b.originalPrice)
        ).reverse();
      case 'rating':
        return [...hotels].sort((a, b) => b.rating - a.rating);
      default:
        return hotels;
    }
  };
  
  const sortedHotels = sortHotels(sampleHotels);

  return (
    <div className="min-h-screen flex flex-col bg-timedrop-gray/30">
      <Navbar />
      
      <main className="pt-20 flex-1">
        <div className="bg-white border-b border-timedrop-gray/50 sticky top-16 z-40">
          <div className="page-container py-4">
            <div className="flex flex-col lg:flex-row items-stretch gap-4">
              <div className="flex-1 flex items-center gap-2 bg-timedrop-gray/50 rounded-xl px-4 py-3">
                <Search className="text-timedrop-muted-gray flex-shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="目的地、ホテル名を入力"
                  className="w-full bg-transparent outline-none text-timedrop-dark-gray placeholder:text-timedrop-muted-gray"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-1 gap-2">
                <div className="flex-1 flex items-center gap-2 bg-timedrop-gray/50 rounded-xl px-4 py-3">
                  <Calendar className="text-timedrop-muted-gray flex-shrink-0" size={20} />
                  <input
                    type="text"
                    placeholder="日付を選択"
                    className="w-full bg-transparent outline-none text-timedrop-dark-gray placeholder:text-timedrop-muted-gray"
                    value={dates}
                    onChange={(e) => setDates(e.target.value)}
                  />
                </div>
                
                <div className="flex-1 flex items-center gap-2 bg-timedrop-gray/50 rounded-xl px-4 py-3">
                  <Users className="text-timedrop-muted-gray flex-shrink-0" size={20} />
                  <input
                    type="text"
                    placeholder="人数"
                    className="w-full bg-transparent outline-none text-timedrop-dark-gray placeholder:text-timedrop-muted-gray"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  />
                </div>
              </div>
              
              <button
                className="flex-shrink-0 flex items-center justify-center gap-2 bg-timedrop-gray/50 hover:bg-timedrop-gray text-timedrop-dark-gray rounded-xl px-4 py-3"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <SlidersHorizontal size={20} />
                <span className="hidden sm:inline">フィルター</span>
              </button>
            </div>
            
            {isFilterOpen && (
              <div className="mt-4 p-4 border-t border-timedrop-gray/50 grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-down">
                <div>
                  <h3 className="text-sm font-medium text-timedrop-dark-gray mb-3">価格帯</h3>
                  <div className="space-y-2">
                    {priceRanges.map(range => (
                      <label key={range.value} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2 h-4 w-4 rounded border-timedrop-muted-gray/50 text-timedrop-blue focus:ring-timedrop-blue"
                          checked={selectedPriceRange.includes(range.value)}
                          onChange={() => togglePriceRange(range.value)}
                        />
                        <span className="text-sm text-timedrop-dark-gray">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-timedrop-dark-gray mb-3">値下げ率</h3>
                  <div className="space-y-2">
                    {discountRanges.map(range => (
                      <label key={range.value} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2 h-4 w-4 rounded border-timedrop-muted-gray/50 text-timedrop-blue focus:ring-timedrop-blue"
                          checked={selectedDiscountRange.includes(range.value)}
                          onChange={() => toggleDiscountRange(range.value)}
                        />
                        <span className="text-sm text-timedrop-dark-gray">{range.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-timedrop-dark-gray mb-3">評価</h3>
                  <div className="space-y-2">
                    {ratings.map(rating => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2 h-4 w-4 rounded border-timedrop-muted-gray/50 text-timedrop-blue focus:ring-timedrop-blue"
                          checked={selectedRatings.includes(rating)}
                          onChange={() => toggleRating(rating)}
                        />
                        <span className="flex items-center text-sm text-timedrop-dark-gray">
                          {rating}
                          <span className="ml-1 text-yellow-400">★</span>
                          {rating === 5 && <span className="ml-1">以上</span>}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="page-container py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold text-timedrop-dark-gray">
              {sortedHotels.length}件のホテルが見つかりました
            </h1>
            
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-timedrop-dark-gray whitespace-nowrap">
                並び替え:
              </label>
              <select
                id="sort"
                className="text-sm bg-timedrop-gray/50 border border-timedrop-gray/50 rounded-lg px-3 py-2"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="recommended">おすすめ順</option>
                <option value="price-asc">料金の安い順</option>
                <option value="price-desc">料金の高い順</option>
                <option value="discount">値下げ率の高い順</option>
                <option value="rating">評価の高い順</option>
              </select>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="inline-flex items-center p-1 px-2 bg-timedrop-blue/10 rounded-full text-sm text-timedrop-blue font-medium mb-4">
              <ArrowDownCircle size={14} className="mr-1" />
              本日の値下げ率ランキング
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedHotels.slice(0, 3).map((hotel, index) => (
                <AnimatedTransition key={hotel.id} animation="slide-up" delay={index * 100}>
                  <HotelCard {...hotel} />
                </AnimatedTransition>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedHotels.slice(3).map((hotel, index) => (
              <AnimatedTransition key={hotel.id} animation="slide-up" delay={index * 100}>
                <HotelCard {...hotel} />
              </AnimatedTransition>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="py-8 bg-white border-t border-border mt-8">
        <div className="page-container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-timedrop-blue mb-1">TimeDrop</h3>
              <p className="text-sm text-timedrop-muted-gray">時間とともに変わる新しい宿泊予約体験</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              <a href="#" className="text-sm text-timedrop-dark-gray hover:text-timedrop-blue">
                サービスについて
              </a>
              <a href="#" className="text-sm text-timedrop-dark-gray hover:text-timedrop-blue">
                ホテル一覧
              </a>
              <a href="#" className="text-sm text-timedrop-dark-gray hover:text-timedrop-blue">
                ヘルプ
              </a>
              <a href="#" className="text-sm text-timedrop-dark-gray hover:text-timedrop-blue">
                お問い合わせ
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t border-timedrop-gray/50 text-center text-xs text-timedrop-muted-gray">
            &copy; {new Date().getFullYear()} TimeDrop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Hotels;
