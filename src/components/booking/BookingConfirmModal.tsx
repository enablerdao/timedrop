import React, { useState } from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { DateRange } from 'react-day-picker';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Property } from '@/data/properties';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { Check, Calendar, Users, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BookingConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
  dateRange: DateRange | undefined;
  adults: number;
  children: number;
  totalPrice: number;
}

const BookingConfirmModal: React.FC<BookingConfirmModalProps> = ({
  isOpen,
  onClose,
  property,
  dateRange,
  adults,
  children,
  totalPrice,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleConfirmBooking = async () => {
    setIsLoading(true);
    
    // モック予約処理
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // 予約情報をローカルストレージに保存
    const bookingId = `booking-${Date.now()}`;
    const booking = {
      id: bookingId,
      propertyId: property.id,
      propertyName: property.name,
      propertyImage: property.imageUrl,
      checkIn: dateRange?.from,
      checkOut: dateRange?.to,
      adults,
      children,
      totalPrice,
      status: 'confirmed',
      createdAt: new Date(),
    };
    
    const existingBookings = JSON.parse(localStorage.getItem('timedrop-bookings') || '[]');
    localStorage.setItem('timedrop-bookings', JSON.stringify([...existingBookings, booking]));
    
    setIsLoading(false);
    onClose();
    
    toast({
      title: '予約が完了しました',
      description: '予約確認メールをお送りしました',
    });
    
    navigate('/bookings');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">予約内容の確認</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-start gap-4">
            <img
              src={property.imageUrl}
              alt={property.name}
              className="h-24 w-24 rounded-md object-cover"
            />
            <div>
              <h3 className="font-semibold">{property.name}</h3>
              <p className="text-sm text-muted-foreground">{property.location}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {dateRange?.from && dateRange?.to ? (
                  <>
                    {format(dateRange.from, 'yyyy年MM月dd日', { locale: ja })} - {format(dateRange.to, 'yyyy年MM月dd日', { locale: ja })}
                  </>
                ) : '日付が選択されていません'}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                大人 {adults}名
                {children > 0 ? `、子供 ${children}名` : ""}
                （計 {adults + children}名）
              </span>
            </div>
          </div>
          
          <Separator />
          
          <div className="space-y-2">
            <h4 className="font-medium">料金詳細</h4>
            <div className="flex justify-between">
              <span className="text-sm">
                ¥{property.price.toLocaleString()} × {dateRange?.from && dateRange?.to ? Math.max(1, Math.floor((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))) : 1}泊
              </span>
              <span>¥{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">サービス料</span>
              <span>¥{Math.floor(totalPrice * 0.1).toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>合計</span>
              <span>¥{Math.floor(totalPrice * 1.1).toLocaleString()}</span>
            </div>
          </div>
          
          <div className="rounded-md bg-muted p-3">
            <div className="flex items-start gap-2">
              <Check className="h-4 w-4 text-green-500 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">キャンセル無料（7日前まで）</p>
                <p className="text-xs text-muted-foreground">
                  {dateRange?.from && new Date(dateRange.from.getTime() - 7 * 24 * 60 * 60 * 1000) > new Date() ? 
                    format(new Date(dateRange.from.getTime() - 7 * 24 * 60 * 60 * 1000), 'yyyy年MM月dd日', { locale: ja }) : ''}
                  までは無料でキャンセル可能です。
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">お支払いはチェックイン時に行われます</span>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            キャンセル
          </Button>
          <Button onClick={handleConfirmBooking} disabled={isLoading}>
            {isLoading ? '処理中...' : '予約を確定する'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingConfirmModal;