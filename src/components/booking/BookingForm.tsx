import React, { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { addDays, differenceInDays } from 'date-fns';
import { Button } from '@/components/ui/button';
import { DateRangePicker } from './DateRangePicker';
import { GuestSelector } from './GuestSelector';
import { Property } from '@/data/properties';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/components/ui/use-toast';
import BookingConfirmModal from './BookingConfirmModal';
import AuthModal from '@/components/auth/AuthModal';

interface BookingFormProps {
  property: Property;
}

const BookingForm: React.FC<BookingFormProps> = ({ property }) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 3),
  });
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleBookNow = () => {
    if (!dateRange?.from || !dateRange?.to) {
      toast({
        title: '日付を選択してください',
        variant: 'destructive',
      });
      return;
    }

    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    setIsBookingModalOpen(true);
  };

  const calculateTotalPrice = () => {
    if (!dateRange?.from || !dateRange?.to) return property.price;
    
    const nights = differenceInDays(dateRange.to, dateRange.from);
    return property.price * nights;
  };

  return (
    <div className="space-y-4">
      <DateRangePicker
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />
      
      <GuestSelector
        adults={adults}
        children={children}
        onAdultsChange={setAdults}
        onChildrenChange={setChildren}
        maxGuests={property.capacity}
      />
      
      <div className="pt-2">
        <Button 
          className="w-full"
          onClick={handleBookNow}
        >
          今すぐ予約する
        </Button>
      </div>
      
      <BookingConfirmModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        property={property}
        dateRange={dateRange}
        adults={adults}
        children={children}
        totalPrice={calculateTotalPrice()}
      />
      
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
};

export default BookingForm;