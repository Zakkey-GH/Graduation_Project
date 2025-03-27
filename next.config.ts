// import { NextConfig } from 'next';

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   // Amplifyで静的エクスポートを行う場合は以下を追加
//   // output: 'export',
//   // Amplifyでの画像最適化を有効にする場合は以下を追加
//   images: {
//     unoptimized: process.env.NODE_ENV === 'production',
//     // または特定のドメインを許可する場合
//     // domains: ['example.com'],
//   },
//   // 必要に応じてbasePathを設定
//   // basePath: '',
//   // 環境変数の設定
//   env: {
//     API_URL: process.env.API_URL || 'http://localhost:3000/api',
//   },
// };

// export default nextConfig;

import { NextConfig } from 'next'

const config: NextConfig = {
  // ... existing code ...
  async redirects() {
    return [
      // リダイレクトを無効にするか、条件を追加
      // {
      //   source: '/',
      //   destination: '/signup',
      //   permanent: true,
      // },
    ]
  },
}

export default config