
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import LongStayPropertyCard from '@/components/rentals/LongStayPropertyCard';
import { sampleProperties } from '@/data/properties';
import AnimatedTransition from '@/components/shared/AnimatedTransition';
import { Globe, Briefcase, Home, Sparkles, Droplet } from 'lucide-react';
import { Link } from 'react-router-dom';

const LongStayRentals = () => {
  // 長期滞在プロパティだけをフィルタリング
  const longStayProperties = sampleProperties.filter(property => property.longStay);

  return (
    <div className="min-h-screen flex flex-col bg-timedrop-gray/30">
      <Navbar />
      
      <main className="pt-20 flex-1">
        <div className="bg-gradient-to-b from-blue-600 to-blue-400 text-white">
          <div className="page-container py-16">
            <h1 className="text-4xl font-bold mb-4">長期滞在者向け特別プラン</h1>
            <p className="text-xl opacity-90 max-w-3xl">
              リモートワークや長期滞在に最適な物件を特別価格でご提供。
              直前予約で最大80%OFFの特別料金でラグジュアリーな滞在をお楽しみいただけます。
            </p>
          </div>
        </div>
        
        <section className="page-container py-12">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-timedrop-dark-gray mb-6">TimeDrop長期滞在の魅力</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatedTransition animation="slide-up" delay={0}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4">
                    <Globe size={24} />
                  </div>
                  <h3 className="text-lg font-medium mb-2">世界中の高級物件</h3>
                  <p className="text-timedrop-muted-gray">厳選された世界各地の高級民泊施設を月単位でご利用いただけます。</p>
                </div>
              </AnimatedTransition>
              
              <AnimatedTransition animation="slide-up" delay={100}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4">
                    <Briefcase size={24} />
                  </div>
                  <h3 className="text-lg font-medium mb-2">リモートワーク対応</h3>
                  <p className="text-timedrop-muted-gray">高速Wi-Fi完備で、快適なワークスペースを確保した物件をご用意。</p>
                </div>
              </AnimatedTransition>
              
              <AnimatedTransition animation="slide-up" delay={200}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4">
                    <Home size={24} />
                  </div>
                  <h3 className="text-lg font-medium mb-2">充実した設備</h3>
                  <p className="text-timedrop-muted-gray">キッチン、洗濯機など長期滞在に必要な設備が全て整っています。</p>
                </div>
              </AnimatedTransition>
              
              <AnimatedTransition animation="slide-up" delay={300}>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="text-lg font-medium mb-2">特別価格</h3>
                  <p className="text-timedrop-muted-gray">時間の経過とともに価格が下がる独自システムで、お得に滞在できます。</p>
                </div>
              </AnimatedTransition>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-timedrop-dark-gray mb-8">
            2025年5月〜 ハワイ長期滞在プラン
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {longStayProperties.map((property, index) => (
              <AnimatedTransition key={property.id} animation="slide-up" delay={index * 100}>
                <LongStayPropertyCard property={property} />
              </AnimatedTransition>
            ))}
          </div>
          
          <div className="mt-12 bg-blue-50 border border-blue-100 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-timedrop-dark-gray mb-3">
              長期滞在者向けの特別サポート
            </h3>
            <ul className="space-y-2 text-timedrop-dark-gray">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                24時間日本語サポートデスク
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                到着時の空港送迎サービス
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                週1回の清掃サービス込み
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                現地アクティビティの割引特典
              </li>
            </ul>
          </div>
        </section>
      </main>

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
    </div>
  );
};

export default LongStayRentals;
