# TimeDrop - 時間とともに変わる宿泊予約サービス

## プロジェクト概要

TimeDrop（タイムドロップ）は、時間経過とともに宿泊料金が変動する革新的な宿泊予約サービスです。一般的に、宿泊日に近づくにつれて料金は下がる傾向がありますが、予約状況によって変動します。ユーザーは予約を急ぐか、価格下落を待つかを選択できます。

### 主な特徴

- **時間経過による価格変動**: 宿泊日からの日数、空室状況、曜日、シーズンなどに基づいて料金が変動
- **価格変動の可視化**: 過去の価格推移グラフで変動傾向を確認可能
- **予約タイミングの自由**: 確実に予約するか、価格下落を待つかをユーザーが選択可能
- **値下がり率ランキング**: 値下がり率の高い施設をランキング表示

## システムアーキテクチャ

TimeDrop は現在、フロントエンドのみの実装となっています。将来的にはバックエンドAPIと連携する予定です。

### 技術スタック

このプロジェクトは以下の技術で構築されています：

- **フロントエンド**:
  - React 18.3.1 - UIコンポーネントライブラリ
  - TypeScript 5.5.3 - 型安全な JavaScript
  - Vite 5.4.1 - 高速な開発環境とビルドツール
  - React Router 6.26.2 - クライアントサイドルーティング
  - React Query 5.56.2 - データフェッチングとキャッシュ管理
  - shadcn-ui - 再利用可能なUIコンポーネント
  - Tailwind CSS 3.4.11 - ユーティリティファーストのCSSフレームワーク
  - Lucide React - アイコンライブラリ
  - React Hook Form - フォーム管理
  - Zod - スキーマ検証

### ディレクトリ構造

```
timedrop/
├── public/              # 静的ファイル
├── src/                 # ソースコード
│   ├── components/      # Reactコンポーネント
│   │   ├── home/        # ホームページ用コンポーネント
│   │   ├── hotels/      # ホテル関連コンポーネント
│   │   ├── layout/      # レイアウト関連コンポーネント
│   │   ├── rentals/     # 民泊施設関連コンポーネント
│   │   │   └── detail/  # 施設詳細ページ用コンポーネント
│   │   ├── shared/      # 共通コンポーネント
│   │   └── ui/          # 基本UIコンポーネント
│   ├── data/            # モックデータ
│   ├── hooks/           # カスタムReactフック
│   ├── lib/             # ユーティリティ関数
│   ├── pages/           # ページコンポーネント
│   ├── App.tsx          # メインアプリケーションコンポーネント
│   ├── index.css        # グローバルCSS
│   └── main.tsx         # エントリーポイント
├── .gitignore           # Gitの除外ファイル設定
├── components.json      # shadcn-ui設定
├── eslint.config.js     # ESLint設定
├── index.html           # HTMLテンプレート
├── package.json         # プロジェクト依存関係
├── postcss.config.js    # PostCSS設定
├── tailwind.config.ts   # Tailwind CSS設定
├── tsconfig.json        # TypeScript設定
└── vite.config.ts       # Vite設定
```

### 主要コンポーネント

- **ページコンポーネント**:
  - `Index.tsx` - ホームページ
  - `VacationRentals.tsx` - 民泊施設一覧ページ
  - `RentalDetail.tsx` - 施設詳細ページ
  - `LongStayRentals.tsx` - 長期滞在向け物件ページ
  - `Watchlist.tsx` - ウォッチリストページ
  - `About.tsx` - サービス紹介ページ
  - `NotFound.tsx` - 404ページ

- **主要機能コンポーネント**:
  - `PriceDropDemo.tsx` - 価格変動のデモ表示
  - `PriceGraph.tsx` - 価格推移グラフ
  - `PriceTag.tsx` - 価格表示コンポーネント
  - `FilterSidebar.tsx` - 検索フィルター
  - `RentalCard.tsx` - 民泊施設カード

### データモデル

現在はモックデータを使用しています。主なデータモデルは以下の通りです：

- **Property** - 宿泊施設情報
  ```typescript
  interface Property {
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
  ```

## システムを動作させる方法

### 前提条件

- Node.js 18.x 以上と npm がインストールされていること
  - [nvm を使ったインストール方法](https://github.com/nvm-sh/nvm#installing-and-updating)

### 開発環境のセットアップ

```sh
# 1. リポジトリをクローン
git clone https://github.com/enablerdao/timedrop.git

# 2. プロジェクトディレクトリに移動
cd timedrop

# 3. 依存関係をインストール
npm install

# 4. 開発サーバーを起動
npm run dev

# 特定のホストとポートを指定して起動する場合
npm run dev -- --host 0.0.0.0 --port 3000
```

開発サーバーが起動すると、ブラウザで http://localhost:5173 にアクセスしてアプリケーションを確認できます。

### 本番ビルドの作成

```sh
# 本番用ビルドを作成
npm run build

# ビルド結果をプレビュー
npm run preview
```

## 現在の実装状況

### 実装済み機能

- **UI/UXデザイン**:
  - レスポンシブデザイン
  - アニメーションとトランジション効果
  - ダークモード対応（部分的）

- **ページ実装**:
  - ホームページ - サービス紹介と検索フォーム
  - 民泊施設一覧ページ - フィルタリングと並び替え機能
  - 施設詳細ページ - 詳細情報と価格履歴グラフ
  - 長期滞在向け物件ページ - 月額料金と利用可能期間表示
  - ウォッチリストページ - お気に入り物件の管理
  - サービス紹介ページ - TimeDrop の特徴と使い方

- **コンポーネント**:
  - 価格変動シミュレーター
  - 価格履歴グラフ
  - 施設カード表示
  - フィルターサイドバー
  - ナビゲーションバー

### モックデータ

現在のシステムはモックデータを使用しています：
- 7件の宿泊施設データ
- 価格変動シミュレーション
- レビューデータ

## 今後の開発計画

システムを完全に機能させるためには、以下の実装が必要です：

### 1. バックエンドAPIの実装

- **ユーザー管理**:
  - 認証システム（JWT、OAuth）
  - ユーザープロフィール管理
  - 権限管理

- **宿泊施設管理**:
  - 施設データベース設計
  - 検索・フィルタリングAPI
  - 画像管理システム

- **予約システム**:
  - 予約作成・管理
  - 空室状況管理
  - キャンセルポリシー

- **価格管理**:
  - 価格変動アルゴリズム
  - 価格履歴記録
  - 特別料金設定（シーズン、イベント）

### 2. フロントエンド機能の拡張

- **ユーザー体験**:
  - ユーザー登録・ログインフロー
  - マイページ機能
  - 予約履歴表示

- **予約フロー**:
  - 日付選択カレンダー
  - ゲスト数選択
  - 追加オプション選択
  - 支払い処理

- **通知システム**:
  - 価格変動アラート
  - 予約確認通知
  - リマインダー

### 3. インフラストラクチャ

- **データベース**:
  - リレーショナルデータベース設計
  - NoSQLデータベース（必要に応じて）
  - キャッシュシステム

- **デプロイ**:
  - コンテナ化（Docker）
  - CI/CDパイプライン
  - クラウドインフラ設定

- **セキュリティ**:
  - HTTPS設定
  - データ暗号化
  - セキュリティ監査

## プロジェクト情報

**元のプロジェクトURL**: https://lovable.dev/projects/deb0347c-1ae4-45bf-9162-75aad580ee4d

## カスタムドメインの使用

現在、カスタムドメインはサポートされていません。独自ドメインでプロジェクトをデプロイしたい場合は、Netlifyの使用をお勧めします。詳細については、[カスタムドメインのドキュメント](https://docs.lovable.dev/tips-tricks/custom-domain/)を参照してください。
