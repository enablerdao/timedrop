export interface Property {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice: number;
  imageUrl: string;
  roomsLeft: number;
  capacity: number;
  description: string;
  features: string[];
  period?: string;
  longStay?: {
    monthlyPrice: number;
    originalMonthlyPrice: number;
    availableMonths: string[];
    targetAudience?: string[];
  };
}

export const sampleProperties: Property[] = [
  {
    id: 'hawaii-beachfront',
    name: 'ワイキキ・ビーチフロントヴィラ',
    location: 'ハワイ・ホノルル',
    rating: 4.9,
    reviewCount: 42,
    price: 85000,
    originalPrice: 120000,
    imageUrl: 'https://images.unsplash.com/photo-1582610116397-edb318620e96?w=800&auto=format&fit=crop&q=60',
    roomsLeft: 1,
    capacity: 6,
    description: 'ワイキキビーチまで徒歩1分、完全プライベートなビーチフロントヴィラ。広々としたラナイから毎日美しいサンセットを楽しめます。',
    features: ['ビーチフロント', 'プライベートプール', 'フルキッチン', '専用駐車場'],
    period: '1ヶ月から',
    longStay: {
      monthlyPrice: 1000000,
      originalMonthlyPrice: 2500000,
      availableMonths: ['2025年5月', '2025年6月', '2025年7月'],
      targetAudience: ['リモートワーカー', '長期滞在者', 'ノマドワーカー', '家族旅行']
    }
  },
  {
    id: 'hawaii-luxury-longstay',
    name: 'ハワイ高級ビーチハウス【長期滞在向け】',
    location: 'ハワイ・ノースショア',
    rating: 4.8,
    reviewCount: 36,
    price: 95000,
    originalPrice: 150000,
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&auto=format&fit=crop&q=60',
    roomsLeft: 2,
    capacity: 8,
    description: 'ノースショアの美しいビーチに面した贅沢なビーチハウス。高速Wi-Fi完備で快適なリモートワークが可能。広々としたテラスからは絶景のオーシャンビューが広がります。',
    features: ['高速Wi-Fi', 'ビーチフロント', 'ワークスペース', '専用プール', 'BBQ設備'],
    period: '1ヶ月から',
    longStay: {
      monthlyPrice: 500000,
      originalMonthlyPrice: 2500000,
      availableMonths: ['2025年5月', '2025年6月', '2025年7月', '2025年8月'],
      targetAudience: ['リモートワーカー', 'デジタルノマド', '家族連れ', '長期滞在者']
    }
  },
  {
    id: 'atami-sauna',
    name: '熱海オーシャンビュー・サウナヴィラ',
    location: '静岡県熱海市',
    rating: 4.8,
    reviewCount: 156,
    price: 45000,
    originalPrice: 68000,
    imageUrl: 'https://images.unsplash.com/photo-1606402179428-a57976d71fa4?w=800&auto=format&fit=crop&q=60',
    roomsLeft: 1,
    capacity: 8,
    description: '熱海の高台に位置する、サウナ付き一軒家。相模湾を見下ろす絶景のロケーションで、至福のととのい体験を。',
    features: ['サウナ', '露天風呂', 'オーシャンビュー', 'BBQデッキ']
  },
  {
    id: 'teshikaga-retreat',
    name: 'リトリートサウナタワー 弟子屈',
    location: '北海道川上郡弟子屈町',
    rating: 4.7,
    reviewCount: 89,
    price: 38000,
    originalPrice: 55000,
    imageUrl: 'https://images.unsplash.com/photo-1626266061368-46a8f578ddd6?w=800&auto=format&fit=crop&q=60',
    roomsLeft: 1,
    capacity: 4,
    description: '摩周湖を望む森の中のリトリート施設。4階建てのタワー型サウナから、大自然を見渡す贅沢な時間を。',
    features: ['タワーサウナ', '水風呂', '瞑想室', '専属サウナマスター']
  },
  {
    id: 'kyoto-machiya',
    name: '京都 町家一棟貸し',
    location: '京都市東山区',
    rating: 4.9,
    reviewCount: 203,
    price: 52000,
    originalPrice: 75000,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&auto=format&fit=crop&q=60',
    roomsLeft: 2,
    capacity: 5,
    description: '築100年以上の京町家を現代的にリノベーション。伝統的な意匠と現代の快適さが融合した特別な空間で京都の風情を体験できます。',
    features: ['町家', '坪庭', '檜風呂', '無料貸出自転車']
  },
  {
    id: 'okinawa-beach',
    name: '沖縄プライベートビーチハウス',
    location: '沖縄県恩納村',
    rating: 4.8,
    reviewCount: 167,
    price: 68000,
    originalPrice: 95000,
    imageUrl: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&auto=format&fit=crop&q=60',
    roomsLeft: 3,
    capacity: 10,
    description: 'プライベートビーチに直結した贅沢なビーチハウス。ウミガメが泳ぐ美しい海でシュノーケリングやカヤックが楽しめます。',
    features: ['プライベートビーチ', '屋外シャワー', 'BBQ設備', 'マリン用品無料貸出']
  },
  {
    id: 'hakuba-cabin',
    name: '白馬マウンテンリゾートキャビン',
    location: '長野県白馬村',
    rating: 4.7,
    reviewCount: 128,
    price: 49000,
    originalPrice: 72000,
    imageUrl: 'https://images.unsplash.com/photo-1549298240-0d8e60513026?w=800&auto=format&fit=crop&q=60',
    roomsLeft: 4,
    capacity: 8,
    description: 'ゲレンデまで徒歩5分の立地に建つログキャビン。薪ストーブとジャグジーで雪見を楽しむ至福のひとときを。',
    features: ['薪ストーブ', 'ジャグジー', 'スキー置き場', 'ウッドデッキ']
  }
];
