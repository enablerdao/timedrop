
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import LongStayPropertyCard from '@/components/rentals/LongStayPropertyCard';
import { sampleProperties } from '@/data/properties';
import AnimatedTransition from '@/components/shared/AnimatedTransition';
import { Globe, Briefcase, Home, Sparkles } from 'lucide-react';

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
    </div>
  );
};

export default LongStayRentals;
