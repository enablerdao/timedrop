
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import RentalCard from '@/components/rentals/RentalCard';
import { Search, Calendar, Users, SlidersHorizontal, X, MapPin } from 'lucide-react';
import AnimatedTransition from '@/components/shared/AnimatedTransition';
import { sampleProperties, type Property, popularDestinations } from '@/data/properties';
import FilterSidebar from '@/components/rentals/FilterSidebar';
import { type FilterOptions } from '@/components/rentals/FilterSidebar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const VacationRentals = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [properties, setProperties] = useState<Property[]>(sampleProperties);
  const [showDestinations, setShowDestinations] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState(popularDestinations);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 200000],
    capacity: 1,
    amenities: [],
    location: ''
  });

  // 外部クリックを検出して候補リストを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowDestinations(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 目的地の入力に基づいて候補をフィルタリング
  useEffect(() => {
    if (searchQuery) {
      const filtered = popularDestinations.filter(dest => 
        dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dest.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDestinations(filtered);
    } else {
      setFilteredDestinations(popularDestinations);
    }
  }, [searchQuery]);

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
      
      const matchesGuests = guests ? 
        property.capacity >= parseInt(guests) : 
        true;
      
      return matchesSearch && matchesGuests;
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
    setDates('');
    setGuests('');
    setFilters({
      priceRange: [0, 200000],
      capacity: 1,
      amenities: [],
      location: ''
    });
    setProperties(sampleProperties);
  };

  // エンターキーでの検索
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 目的地選択の処理
  const handleDestinationSelect = (destName: string) => {
    setSearchQuery(destName);
    setShowDestinations(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-timedrop-gray/30">
      <Navbar />
      
      <main className="pt-20 flex-1">
        <div className="bg-white border-b border-timedrop-gray/50 sticky top-16 z-40">
          <div className="page-container py-4">
            <div className="flex flex-col lg:flex-row items-stretch gap-4">
              <div 
                ref={searchContainerRef}
                className="flex-1 flex items-center gap-2 bg-timedrop-gray/50 rounded-xl px-4 py-3 relative"
              >
                <Search className="text-timedrop-muted-gray flex-shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="場所を入力"
                  className="w-full bg-transparent outline-none text-timedrop-dark-gray placeholder:text-timedrop-muted-gray"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setShowDestinations(true)}
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="text-timedrop-muted-gray hover:text-timedrop-dark-gray"
                  >
                    <X size={16} />
                  </button>
                )}

                {/* 目的地の候補リスト */}
                {showDestinations && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
                    {filteredDestinations.length > 0 ? (
                      <ul className="py-2">
                        {filteredDestinations.map((dest) => (
                          <li 
                            key={dest.id}
                            className="px-4 py-2 hover:bg-timedrop-gray/20 cursor-pointer flex items-center gap-2"
                            onClick={() => handleDestinationSelect(dest.name)}
                          >
                            <MapPin size={16} className="text-timedrop-blue" />
                            <div>
                              <p className="font-medium text-timedrop-dark-gray">{dest.name}</p>
                              <p className="text-xs text-timedrop-muted-gray">{dest.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="p-4 text-center text-timedrop-muted-gray">
                        該当する目的地が見つかりません
                      </div>
                    )}
                  </div>
                )}
              </div>
              
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
                  type="number"
                  placeholder="人数"
                  className="w-full bg-transparent outline-none text-timedrop-dark-gray placeholder:text-timedrop-muted-gray"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  onClick={handleSearch}
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
              
              {(searchQuery || dates || guests || filters.amenities.length > 0 || filters.location) && (
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
