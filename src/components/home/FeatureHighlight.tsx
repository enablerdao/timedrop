
import React from 'react';
import AnimatedTransition from '../shared/AnimatedTransition';
import { Calendar, TrendingDown, Clock, Percent } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description, className, delay = 0 }) => (
  <AnimatedTransition animation="slide-up" delay={delay}>
    <div className={cn('bg-white rounded-2xl p-6 shadow-sm border border-border', className)}>
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-timedrop-blue/10 text-timedrop-blue mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-timedrop-dark-gray mb-2">{title}</h3>
      <p className="text-timedrop-muted-gray">{description}</p>
    </div>
  </AnimatedTransition>
);

const FeatureHighlight = () => {
  const features = [
    {
      icon: <TrendingDown size={24} />,
      title: "時間とともに価格が下がる",
      description: "時間経過とともに宿泊料金が段階的に下がっていくシステムで、お得なタイミングで予約できます。",
      delay: 100
    },
    {
      icon: <Clock size={24} />,
      title: "予約タイミングの自由",
      description: "今すぐ予約して確実に部屋を確保するか、価格下落を待つか、ご自身で選択できます。",
      delay: 200
    },
    {
      icon: <Calendar size={24} />,
      title: "価格変動の可視化",
      description: "過去7日間の価格推移グラフで変動傾向を確認し、最適な予約タイミングを判断できます。",
      delay: 300
    },
    {
      icon: <Percent size={24} />,
      title: "値下がり率ランキング",
      description: "値下がり率の高いホテルをランキング表示。大きな割引を狙いたい方におすすめです。",
      delay: 400
    }
  ];

  return (
    <section className="section bg-timedrop-gray/50">
      <div className="page-container">
        <AnimatedTransition animation="slide-up">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-timedrop-dark-gray mb-4">
              TimeDrop の特徴
            </h2>
            <p className="text-timedrop-muted-gray max-w-2xl mx-auto">
              従来の予約サイトとは一線を画す、まったく新しい宿泊予約の体験をご提供します。
              価格変動を味方につけて、最適なタイミングで最適な価格の宿泊を実現しましょう。
            </p>
          </div>
        </AnimatedTransition>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlight;
