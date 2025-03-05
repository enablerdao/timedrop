
export interface Review {
  id: string;
  propertyId: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  userAvatar?: string;
}

export const sampleReviews: Review[] = [
  {
    id: 'rev-001',
    propertyId: 'hawaii-beachfront',
    userName: '田中 優子',
    rating: 5,
    date: '2024-02-15',
    comment: '最高のロケーションでした！海が目の前で、毎日美しいサンセットを眺めることができました。室内も清潔で設備も充実していて、長期滞在にもぴったりです。',
    userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 'rev-002',
    propertyId: 'hawaii-beachfront',
    userName: '鈴木 健太',
    rating: 4,
    date: '2024-01-20',
    comment: 'プライベートビーチが素晴らしかったです。キッチンの設備が少し古かったですが、全体的には満足しています。',
    userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 'rev-003',
    propertyId: 'atami-sauna',
    userName: '佐藤 直樹',
    rating: 5,
    date: '2024-03-05',
    comment: 'サウナが最高でした！海を見ながらのととのいは格別です。周辺環境も静かで、リラックスした時間を過ごせました。',
    userAvatar: 'https://randomuser.me/api/portraits/men/67.jpg'
  },
  {
    id: 'rev-004',
    propertyId: 'atami-sauna',
    userName: '山本 美咲',
    rating: 4,
    date: '2024-02-28',
    comment: '眺めが素晴らしく、サウナも良かったです。ただ、アクセスが少し不便だったのが残念でした。',
    userAvatar: 'https://randomuser.me/api/portraits/women/22.jpg'
  },
  {
    id: 'rev-005',
    propertyId: 'kyoto-machiya',
    userName: '伊藤 隆',
    rating: 5,
    date: '2024-03-10',
    comment: '京都の風情を存分に味わえる素晴らしい町家でした。静かな環境で、日本の伝統的な暮らしを体験できました。',
    userAvatar: 'https://randomuser.me/api/portraits/men/12.jpg'
  },
  {
    id: 'rev-006',
    propertyId: 'okinawa-beach',
    userName: '中村 さくら',
    rating: 5,
    date: '2024-02-10',
    comment: 'プライベートビーチで毎日シュノーケリングを楽しみました！カラフルな魚やウミガメも見れて、子供たちも大喜びでした。',
    userAvatar: 'https://randomuser.me/api/portraits/women/33.jpg'
  },
  {
    id: 'rev-007',
    propertyId: 'hakuba-cabin',
    userName: '高橋 誠',
    rating: 4,
    date: '2024-01-15',
    comment: '雪見風呂が最高でした。薪ストーブの使い方がちょっと難しかったですが、スタッフの方が丁寧に教えてくれました。',
    userAvatar: 'https://randomuser.me/api/portraits/men/45.jpg'
  }
];

export const getReviewsByPropertyId = (propertyId: string): Review[] => {
  return sampleReviews.filter(review => review.propertyId === propertyId);
};

export const getAverageRating = (propertyId: string): number => {
  const reviews = getReviewsByPropertyId(propertyId);
  if (reviews.length === 0) return 0;
  
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  return parseFloat((totalRating / reviews.length).toFixed(1));
};
