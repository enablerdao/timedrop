
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import RentalCard from '@/components/rentals/RentalCard';
import { Search, Calendar, Users, SlidersHorizontal, X } from 'lucide-react';
import AnimatedTransition from '@/components/shared/AnimatedTransition';
import { sampleProperties, type Property } from '@/data/properties';
import FilterSidebar from '@/components/rentals/FilterSidebar';
import { type FilterOptions } from '@/components/rentals/FilterSidebar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { DateRange } from 'react-day-picker';
import { DateRangePicker } from '@/components/booking/DateRangePicker';
import { GuestSelector } from '@/components/booking/GuestSelector';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchModal from '@/components/search/SearchModal';

const VacationRentals = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [properties, setProperties] = useState<Property[]>(sampleProperties);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 200000],
    capacity: 1,
    amenities: [],
    location: ''
  });
  
  // URLクエリパラメータから検索条件を取得
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const locationParam = params.get('location');
    const checkInParam = params.get('checkIn');
    const checkOutParam = params.get('checkOut');
    const adultsParam = params.get('adults');
    const childrenParam = params.get('children');
    
    if (locationParam) {
      setSearchQuery(locationParam);
      setFilters(prev => ({ ...prev, location: locationParam }));
    }
    
    if (checkInParam && checkOutParam) {
      setDateRange({
        from: new Date(checkInParam),
        to: new Date(checkOutParam)
      });
    }
    
    if (adultsParam) {
      setAdults(parseInt(adultsParam));
    }
    
    if (childrenParam) {
      setChildren(parseInt(childrenParam));
    }
    
    // 検索条件があれば自動的に検索を実行
    if (locationParam || checkInParam || adultsParam) {
      handleSearch();
    }
  }, [location.search]);

  // フィルターを適用する関数
  const applyFilters = (filterOptions: FilterOptions) => {
    const filteredProperties = sampleProperties.filter(property => {
      // 価格フィルター
      if (property.price < filterOptions.priceRange[0] || property.price > filterOptions.priceRange[1]) {
        return false;
      }
      
      // 人数フィルター
      if (property.capacity < filterOptions.capacity) {
        return false;
      }
      
      // アメニティフィルター
      if (filterOptions.amenities.length > 0) {
        const hasAllAmenities = filterOptions.amenities.every(amenity => {
          // 単純化のために、property.featuresに含まれる文字列で検索
          return property.features.some(feature => 
            feature.toLowerCase().includes(amenity.toLowerCase())
          );
        });
        
        if (!hasAllAmenities) {
          return false;
        }
      }
      
      // ロケーションフィルター
      if (filterOptions.location && !property.location.toLowerCase().includes(filterOptions.location.toLowerCase())) {
        return false;
      }
      
      return true;
    });
    
    setProperties(filteredProperties);
    
    toast({
      title: "フィルターを適用しました",
      description: `${filteredProperties.length}件の物件が見つかりました`,
    });
  };

  // 検索機能
  const handleSearch = () => {
    const searchResults = sampleProperties.filter(property => {
      const matchesSearch = searchQuery ? 
        property.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) : 
        true;
      
      const matchesCapacity = (adults + children) > 0 ? 
        property.capacity >= (adults + children) : 
        true;
      
      // 日付範囲のチェック（実際のバックエンドでは空室状況をチェックする）
      // ここではモック実装のため、すべての日付で利用可能と仮定
      const matchesDateRange = true;
      
      return matchesSearch && matchesCapacity && matchesDateRange;
    });
    
    setProperties(searchResults);
    
    toast({
      title: "検索結果",
      description: `${searchResults.length}件の物件が見つかりました`,
    });
  };

  // 検索条件をリセット
  const resetSearch = () => {
    setSearchQuery('');
    setDateRange(undefined);
    setAdults(2);
    setChildren(0);
    setFilters({
      priceRange: [0, 200000],
      capacity: 1,
      amenities: [],
      location: ''
    });
    setProperties(sampleProperties);
    
    // URLからクエリパラメータを削除
    navigate('/rentals');
  };

  // エンターキーでの検索
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-timedrop-gray/30">
      <Navbar />
      
      <main className="pt-20 flex-1">
        <div className="bg-white border-b border-timedrop-gray/50 sticky top-16 z-40">
          <div className="page-container py-4">
            <div className="flex flex-col lg:flex-row items-stretch gap-4">
              <div 
                className="flex-1 flex items-center gap-2 bg-timedrop-gray/50 rounded-xl px-4 py-3 cursor-pointer"
                onClick={() => setIsSearchModalOpen(true)}
              >
                <Search className="text-timedrop-muted-gray flex-shrink-0" size={20} />
                <div className="w-full text-timedrop-dark-gray">
                  {searchQuery ? searchQuery : "場所を入力"}
                </div>
                {searchQuery && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSearchQuery('');
                    }}
                    className="text-timedrop-muted-gray hover:text-timedrop-dark-gray"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              <div 
                className="flex-1 flex items-center gap-2 bg-timedrop-gray/50 rounded-xl px-4 py-3 cursor-pointer"
                onClick={() => setIsSearchModalOpen(true)}
              >
                <Calendar className="text-timedrop-muted-gray flex-shrink-0" size={20} />
                <div className="w-full text-timedrop-dark-gray">
                  {dateRange?.from && dateRange?.to ? 
                    `${dateRange.from.toLocaleDateString('ja-JP')} - ${dateRange.to.toLocaleDateString('ja-JP')}` : 
                    "日付を選択"}
                </div>
              </div>
              
              <div 
                className="flex-1 flex items-center gap-2 bg-timedrop-gray/50 rounded-xl px-4 py-3 cursor-pointer"
                onClick={() => setIsSearchModalOpen(true)}
              >
                <Users className="text-timedrop-muted-gray flex-shrink-0" size={20} />
                <div className="w-full text-timedrop-dark-gray">
                  {`大人 ${adults}名${children > 0 ? `、子供 ${children}名` : ""}`}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => setIsSearchModalOpen(true)}
                  className="bg-timedrop-primary hover:bg-timedrop-primary/90"
                >
                  検索
                </Button>
                <Button
                  variant="outline"
                  className="border-timedrop-gray/50 hover:bg-timedrop-gray/20"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <SlidersHorizontal size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
        />
        
        <div className="flex">
          <FilterSidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)}
            onApplyFilters={applyFilters}
            filters={filters}
            setFilters={setFilters}
          />
          
          <div className="flex-1 page-container py-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-xl font-semibold text-timedrop-dark-gray">
                TimeDrop厳選の民泊物件
                <span className="text-timedrop-muted-gray ml-2 text-sm font-normal">
                  {properties.length}件
                </span>
              </h1>
              
              {(searchQuery || dateRange || adults > 2 || children > 0 || filters.amenities.length > 0 || filters.location) && (
                <Button 
                  variant="ghost" 
                  onClick={resetSearch}
                  className="text-timedrop-muted-gray hover:text-timedrop-dark-gray"
                >
                  検索条件をリセット
                </Button>
              )}
            </div>
            
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property, index) => (
                  <AnimatedTransition key={property.id} animation="slide-up" delay={index * 100}>
                    <RentalCard {...property} />
                  </AnimatedTransition>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                <div className="text-5xl mb-4">🔍</div>
                <h2 className="text-lg font-semibold text-timedrop-dark-gray mb-2">
                  条件に一致する物件が見つかりませんでした
                </h2>
                <p className="text-timedrop-muted-gray mb-6">
                  検索条件を変更して、もう一度お試しください
                </p>
                <Button onClick={resetSearch}>
                  検索条件をリセット
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VacationRentals;
