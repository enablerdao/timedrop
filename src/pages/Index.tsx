
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import FeatureHighlight from '@/components/home/FeatureHighlight';
import PriceDropDemo from '@/components/home/PriceDropDemo';
import AnimatedBackground from '@/components/home/AnimatedBackground';
import { ArrowRight, Droplet } from 'lucide-react';
import AnimatedTransition from '@/components/shared/AnimatedTransition';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground />
      <Navbar />
      
      <main className="flex-1 relative z-10">
        <Hero />
        <FeatureHighlight />
        <PriceDropDemo />
        
        <section className="section bg-white/80 backdrop-blur-sm">
          <div className="page-container">
            <AnimatedTransition animation="slide-up">
              <div className="text-center mb-12">
                <h2 className="heading-2 text-timedrop-dark-gray mb-4 animate-pulse-soft">
                  さっそく体験してみませんか？
                </h2>
                <p className="text-timedrop-muted-gray max-w-2xl mx-auto">
                  今すぐビーチハウスや熱海のヴィラなど、魅力的な民泊施設を検索して、TimeDrop の革新的な予約体験をお試しください。
                  時間とともに変化する価格を見守りながら、最適なタイミングで予約を確定できます。
                </p>
              </div>
            </AnimatedTransition>
            
            <AnimatedTransition animation="slide-up" delay={100}>
              <div className="flex justify-center">
                <Link
                  to="/rentals"
                  className="group relative overflow-hidden bg-gradient-to-r from-timedrop-blue to-timedrop-dark-blue text-white py-4 px-8 rounded-xl flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
                >
                  <span className="absolute w-full h-full top-0 left-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:animate-[shine_1.5s_ease-in-out]"></span>
                  <span className="font-medium">民泊施設を検索する</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </AnimatedTransition>
          </div>
        </section>
        
        <footer className="py-8 bg-white/90 backdrop-blur-sm border-t border-border relative z-10">
          <div className="page-container">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0 flex items-center">
                <div className="flex items-center justify-center w-8 h-8 bg-timedrop-blue rounded-full overflow-hidden text-white mr-2 animate-pulse-soft">
                  <Droplet size={16} className="fill-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-timedrop-blue mb-1">TimeDrop</h3>
                  <p className="text-sm text-timedrop-muted-gray">時間とともに変わる新しい宿泊予約体験</p>
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                <Link to="/about" className="text-sm text-timedrop-dark-gray hover:text-timedrop-blue transition-all duration-300 hover:translate-y-[-1px]">
                  サービスについて
                </Link>
                <Link to="/rentals" className="text-sm text-timedrop-dark-gray hover:text-timedrop-blue transition-all duration-300 hover:translate-y-[-1px]">
                  ヴィラ一覧
                </Link>
                <Link to="/long-stay" className="text-sm text-timedrop-dark-gray hover:text-timedrop-blue transition-all duration-300 hover:translate-y-[-1px]">
                  長期滞在
                </Link>
                <Link to="/watchlist" className="text-sm text-timedrop-dark-gray hover:text-timedrop-blue transition-all duration-300 hover:translate-y-[-1px]">
                  ウォッチリスト
                </Link>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-timedrop-gray/50 flex flex-col items-center">
              <a 
                href="https://enablerhq.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mb-4 transform hover:scale-105 transition-transform duration-300"
              >
                <svg viewBox="0 0 450 100" xmlns="http://www.w3.org/2000/svg" className="w-36 h-12">
                  <defs>
                    <linearGradient id="topBarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22B6FF" />
                      <stop offset="100%" stopColor="#2BBCFF" />
                    </linearGradient>
                    
                    <linearGradient id="middleBarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22B6FF" />
                      <stop offset="100%" stopColor="#4CAF50" />
                    </linearGradient>
                    
                    <linearGradient id="bottomBarGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2BBCFF" />
                      <stop offset="100%" stopColor="#22B6FF" />
                    </linearGradient>
                  </defs>
                  
                  {/* 3本のバー */}
                  <rect x="16" y="40" width="162" height="8" rx="4" fill="url(#topBarGradient)" />
                  <rect x="16" y="60" width="100" height="8" rx="4" fill="url(#middleBarGradient)" />
                  <rect x="16" y="80" width="162" height="8" rx="4" fill="url(#bottomBarGradient)" />
                  
                  {/* ENABLERテキスト */}
                  <text x="198" y="84" fontFamily="Montserrat, sans-serif" fontSize="48" fontWeight="bold" fill="url(#topBarGradient)">ENABLER</text>
                </svg>
              </a>
              
              <div className="text-center text-xs text-timedrop-muted-gray">
                &copy; {new Date().getFullYear()} TimeDrop. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
