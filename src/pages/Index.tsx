
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import FeatureHighlight from '@/components/home/FeatureHighlight';
import PriceDropDemo from '@/components/home/PriceDropDemo';
import { ArrowRight } from 'lucide-react';
import AnimatedTransition from '@/components/shared/AnimatedTransition';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <FeatureHighlight />
        <PriceDropDemo />
        
        <section className="section bg-timedrop-blue/5">
          <div className="page-container">
            <AnimatedTransition animation="slide-up">
              <div className="text-center mb-12">
                <h2 className="heading-2 text-timedrop-dark-gray mb-4">
                  さっそく体験してみませんか？
                </h2>
                <p className="text-timedrop-muted-gray max-w-2xl mx-auto">
                  今すぐホテルを検索して、TimeDrop の革新的な予約体験をお試しください。
                  時間とともに変化する価格を見守りながら、最適なタイミングで予約を確定できます。
                </p>
              </div>
            </AnimatedTransition>
            
            <AnimatedTransition animation="slide-up" delay={100}>
              <div className="flex justify-center">
                <a
                  href="/hotels"
                  className="bg-timedrop-blue hover:bg-timedrop-dark-blue text-white py-4 px-8 rounded-xl flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
                >
                  <span className="font-medium">ホテルを検索する</span>
                  <ArrowRight size={18} />
                </a>
              </div>
            </AnimatedTransition>
          </div>
        </section>
        
        <footer className="py-8 bg-white border-t border-border">
          <div className="page-container">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-timedrop-blue mb-1">TimeDrop</h3>
                <p className="text-sm text-timedrop-muted-gray">時間とともに変わる新しい宿泊予約体験</p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                <a href="#" className="text-sm text-timedrop-dark-gray hover:text-timedrop-blue">
                  サービスについて
                </a>
                <a href="#" className="text-sm text-timedrop-dark-gray hover:text-timedrop-blue">
                  ホテル一覧
                </a>
                <a href="#" className="text-sm text-timedrop-dark-gray hover:text-timedrop-blue">
                  ヘルプ
                </a>
                <a href="#" className="text-sm text-timedrop-dark-gray hover:text-timedrop-blue">
                  お問い合わせ
                </a>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-timedrop-gray/50 text-center text-xs text-timedrop-muted-gray">
              &copy; {new Date().getFullYear()} TimeDrop. All rights reserved.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
