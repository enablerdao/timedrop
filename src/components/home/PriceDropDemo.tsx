
import React, { useState, useEffect } from 'react';
import { ArrowDownCircle, Clock, AlertCircle } from 'lucide-react';
import AnimatedTransition from '../shared/AnimatedTransition';
import PriceTag from '../ui/PriceTag';
import { cn } from '@/lib/utils';

const PriceDropDemo = () => {
  const [currentPrice, setCurrentPrice] = useState(32000);
  const [priceHistory, setPriceHistory] = useState([
    { day: '7日前', price: 38000 },
    { day: '6日前', price: 36000 },
    { day: '5日前', price: 35000 },
    { day: '4日前', price: 34000 },
    { day: '3日前', price: 33000 },
    { day: '2日前', price: 32500 },
    { day: '昨日', price: 32000 },
    { day: '現在', price: 32000 },
  ]);
  
  const [activeStep, setActiveStep] = useState(7); // Start with current day
  const originalPrice = 38000;
  const lowestPrice = 28000;

  useEffect(() => {
    // Simulate price drops
    const interval = setInterval(() => {
      if (currentPrice > lowestPrice) {
        const newPrice = currentPrice - Math.floor(Math.random() * 500);
        const finalPrice = Math.max(newPrice, lowestPrice);
        
        setCurrentPrice(finalPrice);
        setPriceHistory(prev => {
          const newHistory = [...prev];
          newHistory[7] = { ...newHistory[7], price: finalPrice };
          return newHistory;
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [currentPrice, lowestPrice]);

  return (
    <section className="section">
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedTransition animation="slide-up">
            <div>
              <h2 className="heading-2 text-timedrop-dark-gray mb-4">
                時間とともに変わる<br /><span className="text-timedrop-blue">宿泊料金</span>の仕組み
              </h2>
              <p className="text-timedrop-muted-gray mb-6">
                TimeDrop では、ビーチハウスや民泊施設の空室状況や予約状況に応じて料金が変動します。
                一般的に、宿泊日に近づくにつれて料金は下がる傾向がありますが、
                予約が増えると下落率は減少し、場合によっては料金が上がることもあります。
              </p>
              
              <div className="mb-8 flex flex-col space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-timedrop-blue/10 flex items-center justify-center text-timedrop-blue flex-shrink-0 mt-0.5">
                    <ArrowDownCircle size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-timedrop-dark-gray">価格下落アルゴリズム</h3>
                    <p className="text-timedrop-muted-gray">
                      宿泊日からの日数、部屋の空き状況、曜日、シーズンなど複数の要素から最適な価格を計算します。
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-timedrop-blue/10 flex items-center justify-center text-timedrop-blue flex-shrink-0 mt-0.5">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-timedrop-dark-gray">タイミング戦略</h3>
                    <p className="text-timedrop-muted-gray">
                      確実に予約したい場合は早めに、よりお得に泊まりたい場合は価格下落を待つ戦略が可能です。
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-timedrop-accent/10 flex items-center justify-center text-timedrop-accent flex-shrink-0 mt-0.5">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-timedrop-dark-gray">リスク管理</h3>
                    <p className="text-timedrop-muted-gray">
                      価格が下がる可能性がある一方で、人気の高い施設は予約が埋まる可能性もあります。あなたの判断が鍵です。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedTransition>
          
          <AnimatedTransition animation="slide-up" delay={200}>
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-border">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-timedrop-dark-gray">料金変動シミュレーション</h3>
                <p className="text-timedrop-muted-gray">熱海オーシャンビュー・サウナヴィラの1泊料金推移</p>
              </div>
              
              <div className="flex flex-col items-center mb-8">
                <div className="text-xs text-timedrop-muted-gray mb-2">現在の価格</div>
                <PriceTag 
                  price={currentPrice} 
                  originalPrice={originalPrice}
                  size="lg"
                  isAnimated={true}
                />
                <div className="text-xs text-timedrop-muted-gray mt-2">
                  開始価格より {Math.round((1 - currentPrice / originalPrice) * 100)}% お得
                </div>
              </div>
              
              {/* Price timeline */}
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-1/2 w-px bg-timedrop-gray/50 -translate-x-1/2" />
                  
                  {priceHistory.map((item, index) => (
                    <div 
                      key={index}
                      className={cn(
                        "relative flex items-center mb-6 last:mb-0 cursor-pointer transition-all duration-300",
                        activeStep === index ? "opacity-100" : "opacity-60 hover:opacity-80"
                      )}
                      onClick={() => setActiveStep(index)}
                    >
                      <div className="w-24 text-right pr-4 text-sm font-medium text-timedrop-dark-gray">
                        {item.day}
                      </div>
                      
                      <div className={cn(
                        "w-4 h-4 rounded-full z-10 border-2 border-white transition-all duration-300",
                        activeStep === index ? "bg-timedrop-blue scale-125" : "bg-timedrop-gray"
                      )} />
                      
                      <div className="pl-4 flex-1">
                        <PriceTag 
                          price={item.price} 
                          originalPrice={index > 0 ? priceHistory[0].price : undefined}
                          size="sm"
                          isAnimated={activeStep === index && index === 7}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-xs text-timedrop-muted-gray p-3 bg-timedrop-gray/50 rounded-lg">
                <span className="block font-medium text-timedrop-dark-gray mb-1">注意事項:</span>
                実際の価格変動はビーチハウスや民泊施設の設定やリアルタイムの予約状況により異なります。
                上記はシミュレーションのため、実際のサービスとは異なる場合があります。
              </div>
            </div>
          </AnimatedTransition>
        </div>
      </div>
    </section>
  );
};

export default PriceDropDemo;
