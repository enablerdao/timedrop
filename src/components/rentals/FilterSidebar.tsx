
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from 'lucide-react';

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
}

export interface FilterOptions {
  priceRange: [number, number];
  capacity: number;
  amenities: string[];
  location: string;
}

const amenitiesList = [
  { id: 'beachfront', label: 'ビーチフロント' },
  { id: 'privatePool', label: 'プライベートプール' },
  { id: 'sauna', label: 'サウナ' },
  { id: 'hotTub', label: 'ジャグジー/露天風呂' },
  { id: 'bbq', label: 'BBQ設備' },
  { id: 'wifi', label: '高速Wi-Fi' },
];

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  isOpen,
  onClose,
  onApplyFilters,
  filters,
  setFilters
}) => {
  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: [value[0], value[1]]
    }));
  };

  const handleCapacityChange = (value: number) => {
    setFilters(prev => ({
      ...prev,
      capacity: value
    }));
  };

  const handleAmenityToggle = (amenityId: string) => {
    setFilters(prev => {
      const isSelected = prev.amenities.includes(amenityId);
      const newAmenities = isSelected
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId];
      
      return {
        ...prev,
        amenities: newAmenities
      };
    });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      location: e.target.value
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const handleResetFilters = () => {
    setFilters({
      priceRange: [0, 200000],
      capacity: 1,
      amenities: [],
      location: ''
    });
  };

  return (
    <div className={`fixed inset-y-0 left-0 z-50 bg-white w-80 shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:shadow-none md:w-72`}>
      <div className="flex flex-col h-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold flex items-center">
            <Filter className="mr-2" size={20} />
            フィルター
          </h2>
          <button 
            onClick={onClose}
            className="md:hidden text-timedrop-muted-gray hover:text-timedrop-dark-gray"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-6 flex-1 overflow-y-auto">
          {/* 価格範囲 */}
          <div>
            <h3 className="font-medium mb-4">価格範囲</h3>
            <Slider
              defaultValue={[filters.priceRange[0], filters.priceRange[1]]}
              max={200000}
              step={5000}
              value={[filters.priceRange[0], filters.priceRange[1]]}
              onValueChange={handlePriceChange}
              className="mb-2"
            />
            <div className="flex justify-between text-sm text-timedrop-muted-gray">
              <span>¥{filters.priceRange[0].toLocaleString()}</span>
              <span>¥{filters.priceRange[1].toLocaleString()}</span>
            </div>
          </div>
          
          {/* 宿泊人数 */}
          <div>
            <h3 className="font-medium mb-4">宿泊人数</h3>
            <div className="flex items-center">
              <Input 
                type="number"
                min={1}
                max={12}
                value={filters.capacity}
                onChange={(e) => handleCapacityChange(parseInt(e.target.value) || 1)}
                className="w-20 mr-2"
              />
              <span className="text-timedrop-muted-gray">名以上</span>
            </div>
          </div>
          
          {/* アメニティ */}
          <div>
            <h3 className="font-medium mb-4">アメニティ</h3>
            <div className="space-y-3">
              {amenitiesList.map(amenity => (
                <div className="flex items-center" key={amenity.id}>
                  <Checkbox
                    id={amenity.id}
                    checked={filters.amenities.includes(amenity.id)}
                    onCheckedChange={() => handleAmenityToggle(amenity.id)}
                    className="mr-2"
                  />
                  <label htmlFor={amenity.id} className="text-sm cursor-pointer">
                    {amenity.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          {/* エリア */}
          <div>
            <h3 className="font-medium mb-4">エリア</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-timedrop-muted-gray" size={16} />
              <Input 
                placeholder="地域を入力"
                value={filters.location}
                onChange={handleLocationChange}
                className="pl-10"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-4 space-y-2 mt-auto">
          <Button 
            onClick={handleApplyFilters}
            className="w-full bg-timedrop-primary hover:bg-timedrop-primary/90"
          >
            フィルターを適用
          </Button>
          <Button 
            onClick={handleResetFilters}
            variant="outline"
            className="w-full"
          >
            リセット
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
