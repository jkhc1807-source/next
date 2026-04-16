import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Turbopack 사용 시 webpack 설정 충돌 에러를 방지하기 위해 빈 객체 추가 [확실]
  // (Next.js 16 대응: experimental 외부로 이동)
  turbopack: {},

  // 네트워크 환경(IP 접속)에서 WebSocket HMR 연결 오류를 방지하기 위한 설정 [확실]
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
