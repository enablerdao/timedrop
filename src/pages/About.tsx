import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { ArrowRight, Clock, PiggyBank, Shield, Trophy } from 'lucide-react';
import AnimatedTransition from '@/components/shared/AnimatedTransition';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        <section className="section bg-timedrop-blue/5">
          <div className="page-container">
            <AnimatedTransition animation="slide-up">
              <div className="text-center mb-12">
                <h1 className="heading-1 text-timedrop-dark-gray mb-4">
                  TimeDrop について
                </h1>
                <p className="text-timedrop-muted-gray max-w-2xl mx-auto">
                  TimeDropは、時間経過で宿泊料金が変動する革新的な予約システムです。待てば待つほどお得になる、新しい宿泊予約の形を提供します。
                </p>
              </div>
            </AnimatedTransition>
          </div>
        </section>

        <section className="section">
          <div className="page-container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <AnimatedTransition animation="slide-right">
                <div>
                  <h2 className="heading-2 text-timedrop-dark-gray mb-4">
                    なぜ TimeDrop なのか？
                  </h2>
                  <p className="text-timedrop-muted-gray mb-6">
                    従来の宿泊予約サイトでは、予約が早ければ早いほど安く予約できるという考え方が一般的でした。しかし、実際には客室の空き状況や需要によって、直前の方が安くなるケースも多くあります。
                  </p>
                  <p className="text-timedrop-muted-gray mb-6">
                    TimeDropは、この「時間」という要素に着目し、宿泊施設と旅行者の双方にメリットをもたらす新しい予約システムを構築しました。
                  </p>
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="bg-timedrop-blue/10 p-3 rounded-full">
                        <Clock className="text-timedrop-blue" size={24} />
                      </div>
                      <div>
                        <h3 className="font-medium text-timedrop-dark-gray">時間とともに変わる価格</h3>
                        <p className="text-timedrop-muted-gray">予約可能期間が近づくにつれて価格が下がります</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-timedrop-blue/10 p-3 rounded-full">
                        <PiggyBank className="text-timedrop-blue" size={24} />
                      </div>
                      <div>
                        <h3 className="font-medium text-timedrop-dark-gray">最適な予約タイミング</h3>
                        <p className="text-timedrop-muted-gray">あなたが納得する価格になったタイミングで予約できます</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="bg-timedrop-blue/10 p-3 rounded-full">
                        <Trophy className="text-timedrop-blue" size={24} />
                      </div>
                      <div>
                        <h3 className="font-medium text-timedrop-dark-gray">Win-Winの関係</h3>
                        <p className="text-timedrop-muted-gray">宿泊施設は空室を効率的に埋めることができ、旅行者はお得に予約できます</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedTransition>
              <AnimatedTransition animation="slide-left" delay={200}>
                <div className="bg-white p-6 rounded-2xl shadow-md border border-timedrop-gray/30">
                  <img 
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                    alt="TimeDropのコンセプト" 
                    className="w-full h-auto rounded-xl mb-6" 
                  />
                  <div className="bg-timedrop-blue/5 p-4 rounded-xl">
                    <h3 className="font-medium text-timedrop-dark-gray mb-2">お客様の声</h3>
                    <p className="text-timedrop-muted-gray italic">
                      "TimeDropのおかげで、通常なら予算オーバーだった高級ヴィラに半額で宿泊できました。予約のゲーム感覚が楽しく、次の旅行も絶対に使います！"
                    </p>
                    <p className="text-right text-timedrop-blue font-medium mt-2">- 田中さん（東京）</p>
                  </div>
                </div>
              </AnimatedTransition>
            </div>
          </div>
        </section>

        <section className="section bg-timedrop-blue/5">
          <div className="page-container">
            <AnimatedTransition animation="slide-up">
              <div className="text-center mb-12">
                <h2 className="heading-2 text-timedrop-dark-gray mb-4">
                  TimeDrop の使い方
                </h2>
                <p className="text-timedrop-muted-gray max-w-2xl mx-auto">
                  簡単3ステップで、あなたにぴったりの宿泊施設を最適な価格で予約できます。
                </p>
              </div>
            </AnimatedTransition>
            
            <div className="grid md:grid-cols-3 gap-8">
              <AnimatedTransition animation="slide-up" delay={100}>
                <div className="bg-white p-6 rounded-2xl shadow-md border border-timedrop-gray/30">
                  <div className="bg-timedrop-blue/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                    <span className="text-timedrop-blue font-bold text-xl">1</span>
                  </div>
                  <h3 className="font-medium text-timedrop-dark-gray text-lg mb-2">宿泊施設を検索</h3>
                  <p className="text-timedrop-muted-gray">
                    行きたい場所、日程、人数などを入力して、あなたの条件に合った宿泊施設を検索します。
                  </p>
                </div>
              </AnimatedTransition>
              
              <AnimatedTransition animation="slide-up" delay={200}>
                <div className="bg-white p-6 rounded-2xl shadow-md border border-timedrop-gray/30">
                  <div className="bg-timedrop-blue/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                    <span className="text-timedrop-blue font-bold text-xl">2</span>
                  </div>
                  <h3 className="font-medium text-timedrop-dark-gray text-lg mb-2">価格変動を監視</h3>
                  <p className="text-timedrop-muted-gray">
                    時間経過による料金の変化を確認。価格予測グラフを参考に、予約のベストタイミングを見極めましょう。
                  </p>
                </div>
              </AnimatedTransition>
              
              <AnimatedTransition animation="slide-up" delay={300}>
                <div className="bg-white p-6 rounded-2xl shadow-md border border-timedrop-gray/30">
                  <div className="bg-timedrop-blue/10 w-12 h-12 flex items-center justify-center rounded-full mb-4">
                    <span className="text-timedrop-blue font-bold text-xl">3</span>
                  </div>
                  <h3 className="font-medium text-timedrop-dark-gray text-lg mb-2">お得に予約</h3>
                  <p className="text-timedrop-muted-gray">
                    納得のいく価格になったタイミングで予約を確定。あなたのタイミングで、最適な価格での宿泊が可能になります。
                  </p>
                </div>
              </AnimatedTransition>
            </div>
            
            <AnimatedTransition animation="slide-up" delay={400}>
              <div className="flex justify-center mt-12">
                <a
                  href="/rentals"
                  className="bg-timedrop-blue hover:bg-timedrop-dark-blue text-white py-4 px-8 rounded-xl flex items-center space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:translate-y-[-2px]"
                >
                  <span className="font-medium">さっそく宿泊施設を探す</span>
                  <ArrowRight size={18} />
                </a>
              </div>
            </AnimatedTransition>
          </div>
        </section>

        <section className="section">
          <div className="page-container">
            <AnimatedTransition animation="slide-up">
              <div className="text-center mb-12">
                <h2 className="heading-2 text-timedrop-dark-gray mb-4">
                  安心・信頼のサービス
                </h2>
                <p className="text-timedrop-muted-gray max-w-2xl mx-auto">
                  TimeDropは、お客様の安心と満足を最優先に考えたサービスを提供しています。
                </p>
              </div>
            </AnimatedTransition>
            
            <div className="grid md:grid-cols-3 gap-8">
              <AnimatedTransition animation="slide-up" delay={100}>
                <div className="flex flex-col items-center text-center p-6">
                  <div className="bg-timedrop-blue/10 p-4 rounded-full mb-4">
                    <Shield className="text-timedrop-blue" size={32} />
                  </div>
                  <h3 className="font-medium text-timedrop-dark-gray text-lg mb-2">安全な決済</h3>
                  <p className="text-timedrop-muted-gray">
                    全ての決済は暗号化され、あなたの個人情報は厳重に保護されます。安心してご利用いただけます。
                  </p>
                </div>
              </AnimatedTransition>
              
              <AnimatedTransition animation="slide-up" delay={200}>
                <div className="flex flex-col items-center text-center p-6">
                  <div className="bg-timedrop-blue/10 p-4 rounded-full mb-4">
                    <Shield className="text-timedrop-blue" size={32} />
                  </div>
                  <h3 className="font-medium text-timedrop-dark-gray text-lg mb-2">厳選された宿泊施設</h3>
                  <p className="text-timedrop-muted-gray">
                    当サイトに掲載されている宿泊施設は全て審査済み。品質と安全を保証しています。
                  </p>
                </div>
              </AnimatedTransition>
              
              <AnimatedTransition animation="slide-up" delay={300}>
                <div className="flex flex-col items-center text-center p-6">
                  <div className="bg-timedrop-blue/10 p-4 rounded-full mb-4">
                    <Shield className="text-timedrop-blue" size={32} />
                  </div>
                  <h3 className="font-medium text-timedrop-dark-gray text-lg mb-2">24時間サポート</h3>
                  <p className="text-timedrop-muted-gray">
                    何かあった時もご安心ください。24時間対応のカスタマーサポートが問題解決をお手伝いします。
                  </p>
                </div>
              </AnimatedTransition>
            </div>
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
                <a href="/about" className="text-sm text-timedrop-dark-gray hover:text-timedrop-blue">
                  サービスについて
                </a>
                <a href="/rentals" className="text-sm text-timedrop-dark-gray hover:text-timedrop-blue">
                  民泊一覧
                </a>
                <a href="/long-stay" className="text-sm text-timedrop-dark-gray hover:text-timedrop-blue">
                  長期滞在
                </a>
                <a href="/watchlist" className="text-sm text-timedrop-dark-gray hover:text-timedrop-blue">
                  ウォッチリスト
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

export default About;
