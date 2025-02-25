import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Amplifyの静的ホスティング向けに設定
  reactStrictMode: true,
  images: {
    unoptimized: true, // AmplifyではNext.jsの画像最適化が動作しないため無効化
  },
};

export default nextConfig;
