
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import HotelCard from '@/components/hotels/HotelCard';
import { Search, Calendar, Users } from 'lucide-react';
import AnimatedTransition from '@/components/shared/AnimatedTransition';
import { sampleProperties } from '@/data/properties';

const Hotels = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');

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
                  placeholder="場所を入力"
                  className="w-full bg-transparent outline-none text-timedrop-dark-gray placeholder:text-timedrop-muted-gray"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
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
                  type="text"
                  placeholder="人数"
                  className="w-full bg-transparent outline-none text-timedrop-dark-gray placeholder:text-timedrop-muted-gray"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="page-container py-6">
          <h1 className="text-xl font-semibold text-timedrop-dark-gray mb-8">
            TimeDrop厳選の民泊物件
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProperties.map((property, index) => (
              <AnimatedTransition key={property.id} animation="slide-up" delay={index * 100}>
                <HotelCard {...property} />
              </AnimatedTransition>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hotels;
