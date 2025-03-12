import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Calendar, Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import AnimatedTransition from '@/components/shared/AnimatedTransition';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  checkIn: string | Date;
  checkOut: string | Date;
  adults: number;
  children: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: string | Date;
}

const Bookings = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    // ローカルストレージから予約データを取得
    const storedBookings = localStorage.getItem('timedrop-bookings');
    if (storedBookings) {
      try {
        const parsedBookings = JSON.parse(storedBookings);
        setBookings(parsedBookings);
      } catch (error) {
        console.error('Failed to parse bookings from localStorage', error);
      }
    }
  }, [isAuthenticated, navigate]);

  const handleCancelBooking = (bookingId: string) => {
    // 予約をキャンセル
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'cancelled' as const } : booking
    );
    
    setBookings(updatedBookings);
    localStorage.setItem('timedrop-bookings', JSON.stringify(updatedBookings));
    
    toast({
      title: '予約をキャンセルしました',
      description: '予約のキャンセルが完了しました',
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return (
          <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-full text-xs">
            <CheckCircle className="w-3 h-3 mr-1" />
            <span>予約確定</span>
          </div>
        );
      case 'pending':
        return (
          <div className="flex items-center text-amber-600 bg-amber-50 px-2 py-1 rounded-full text-xs">
            <Clock className="w-3 h-3 mr-1" />
            <span>処理中</span>
          </div>
        );
      case 'cancelled':
        return (
          <div className="flex items-center text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs">
            <XCircle className="w-3 h-3 mr-1" />
            <span>キャンセル済</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center text-gray-600 bg-gray-50 px-2 py-1 rounded-full text-xs">
            <AlertCircle className="w-3 h-3 mr-1" />
            <span>不明</span>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-timedrop-gray/30">
      <Navbar />
      
      <main className="pt-24 flex-1">
        <div className="page-container py-6">
          <h1 className="text-xl font-semibold text-timedrop-dark-gray mb-2">
            予約履歴
          </h1>
          <p className="text-timedrop-muted-gray mb-8">
            過去の予約と今後の旅行プランを確認できます
          </p>
          
          {bookings.length > 0 ? (
            <div className="space-y-6">
              {bookings.map((booking, index) => (
                <AnimatedTransition key={booking.id} animation="slide-up" delay={index * 100}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 h-48 md:h-auto">
                        <img
                          src={booking.propertyImage}
                          alt={booking.propertyName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex flex-col md:flex-row md:items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-timedrop-dark-gray mb-1">
                              {booking.propertyName}
                            </h3>
                            <div className="flex items-center text-timedrop-muted-gray mb-4">
                              <Calendar className="w-4 h-4 mr-1" />
                              <span>
                                {format(new Date(booking.checkIn), 'yyyy年MM月dd日', { locale: ja })} - {format(new Date(booking.checkOut), 'yyyy年MM月dd日', { locale: ja })}
                              </span>
                            </div>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>
                        
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                          <div>
                            <div className="text-timedrop-muted-gray mb-1">
                              大人 {booking.adults}名
                              {booking.children > 0 ? `、子供 ${booking.children}名` : ""}
                            </div>
                            <div className="font-semibold">
                              ¥{booking.totalPrice.toLocaleString()}
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0 space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/rentals/${booking.propertyId}`)}
                            >
                              詳細を見る
                            </Button>
                            
                            {booking.status === 'confirmed' && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 border-red-500 hover:bg-red-50"
                                onClick={() => handleCancelBooking(booking.id)}
                              >
                                キャンセル
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AnimatedTransition>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-border">
              <Calendar className="mx-auto text-gray-300 mb-4" size={64} />
              <h2 className="text-lg font-semibold text-timedrop-dark-gray mb-2">予約履歴はありません</h2>
              <p className="text-timedrop-muted-gray mb-4">宿泊施設を予約すると、ここに表示されます</p>
              <Button 
                onClick={() => navigate('/rentals')}
                className="bg-timedrop-primary hover:bg-timedrop-primary/90"
              >
                宿泊施設を探す
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Bookings;