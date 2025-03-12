import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from '@/components/booking/DateRangePicker';
import { GuestSelector } from '@/components/booking/GuestSelector';
import { DateRange } from 'react-day-picker';
import { addDays } from 'date-fns';
import { Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const popularDestinations = [
  'ハワイ',
  '沖縄',
  '熱海',
  '京都',
  '北海道',
  '白馬',
];

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [location, setLocation] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  
  const navigate = useNavigate();

  const handleSearch = () => {
    // 検索パラメータをURLクエリに変換
    const params = new URLSearchParams();
    
    if (location) {
      params.append('location', location);
    }
    
    if (dateRange?.from) {
      params.append('checkIn', dateRange.from.toISOString());
    }
    
    if (dateRange?.to) {
      params.append('checkOut', dateRange.to.toISOString());
    }
    
    params.append('adults', adults.toString());
    params.append('children', children.toString());
    
    // 検索結果ページに遷移
    navigate(`/rentals?${params.toString()}`);
    onClose();
  };

  const handlePopularDestinationClick = (destination: string) => {
    setLocation(destination);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="行き先はどちらですか？"
                className="pl-10"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {popularDestinations.map((destination) => (
                <Button
                  key={destination}
                  variant="outline"
                  size="sm"
                  onClick={() => handlePopularDestinationClick(destination)}
                >
                  {destination}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <DateRangePicker
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
              />
            </div>
            <div>
              <GuestSelector
                adults={adults}
                children={children}
                onAdultsChange={setAdults}
                onChildrenChange={setChildren}
              />
            </div>
          </div>
          
          <Button className="w-full" onClick={handleSearch}>
            <Search className="mr-2 h-4 w-4" />
            検索
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;