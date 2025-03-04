
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Search, Users, ArrowRight } from 'lucide-react';
import AnimatedTransition from '../shared/AnimatedTransition';

const Hero = () => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [guests, setGuests] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/rentals');
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-timedrop-blue/5 to-transparent z-0" />
      
      {/* Circles decoration */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-timedrop-blue/5 blur-3xl" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-timedrop-accent/5 blur-3xl" />
      
      <div className="page-container relative z-10">
        <div className="max-w-3xl">
          <AnimatedTransition animation="slide-up" delay={100}>
            <div className="px-2 py-1 rounded-full bg-white/80 border border-border inline-flex items-center mb-6">
              <span className="px-3 py-1 bg-timedrop-blue text-white text-xs font-medium rounded-full">新登場</span>
              <span className="px-3 text-sm text-timedrop-dark-gray">時間経過で料金が下がる新しい予約体験</span>
            </div>
          </AnimatedTransition>
          
          <AnimatedTransition animation="slide-up" delay={200}>
            <h1 className="heading-1 mb-6">
              <span className="text-timedrop-dark-gray">待てば待つほど</span>
              <br />
              <span className="text-timedrop-blue">お得になる</span>
              <span className="text-timedrop-dark-gray">宿泊予約</span>
            </h1>
          </AnimatedTransition>
          
          <AnimatedTransition animation="slide-up" delay={300}>
            <p className="text-lg text-timedrop-muted-gray mb-8 max-w-2xl">
              TimeDrop では、時間経過とともに宿泊料金が段階的に下がっていきます。予約を急ぐか、価格下落を待つか、あなた次第です。
            </p>
          </AnimatedTransition>

          <AnimatedTransition animation="slide-up" delay={400}>
            <form 
              onSubmit={handleSearch} 
              className="bg-white rounded-2xl shadow-lg p-4 flex flex-col sm:flex-row gap-4 mb-8"
            >
              <div className="flex-1 flex items-center gap-2 border-b sm:border-b-0 sm:border-r border-timedrop-gray pb-4 sm:pb-0 sm:pr-4">
                <Search className="text-timedrop-muted-gray flex-shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="目的地を入力"
                  className="w-full bg-transparent outline-none text-timedrop-dark-gray placeholder:text-timedrop-muted-gray"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              
              <div className="flex-1 flex items-center gap-2 border-b sm:border-b-0 sm:border-r border-timedrop-gray pb-4 sm:pb-0 sm:pr-4">
                <Calendar className="text-timedrop-muted-gray flex-shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="日付を選択"
                  className="w-full bg-transparent outline-none text-timedrop-dark-gray placeholder:text-timedrop-muted-gray"
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                />
              </div>
              
              <div className="flex-1 flex items-center gap-2">
                <Users className="text-timedrop-muted-gray flex-shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="人数"
                  className="w-full bg-transparent outline-none text-timedrop-dark-gray placeholder:text-timedrop-muted-gray"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>
              
              <button
                type="submit"
                className="bg-timedrop-blue hover:bg-timedrop-dark-blue text-white py-3 px-6 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <span>検索</span>
                <ArrowRight size={18} />
              </button>
            </form>
          </AnimatedTransition>

          <AnimatedTransition animation="slide-up" delay={500}>
            <div className="flex flex-wrap items-center gap-4 text-sm text-timedrop-dark-gray">
              <span className="font-medium">人気の目的地:</span>
              {[
                { name: 'ハワイ', id: 'hawaii-beachfront' },
                { name: '熱海', id: 'atami-sauna' },
                { name: '北海道', id: 'teshikaga-retreat' }
              ].map((location) => (
                <button
                  key={location.name}
                  onClick={() => {
                    setDestination(location.name);
                    navigate(`/rentals/${location.id}`);
                  }}
                  className="px-3 py-1 rounded-full border border-timedrop-gray hover:border-timedrop-blue hover:text-timedrop-blue transition-colors"
                >
                  {location.name}
                </button>
              ))}
            </div>
          </AnimatedTransition>
        </div>
      </div>
    </section>
  );
};

export default Hero;

