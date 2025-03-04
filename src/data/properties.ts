
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
    period: '1ヶ月から'
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
  }
];
