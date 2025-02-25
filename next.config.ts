import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Amplify では Next.js の画像最適化が使えないため無効化
  },
  experimental: {
    // outputStandalone: true, // 古い設定を削除
  },
  output: 'standalone', // 新しい設定
};

export default nextConfig;
