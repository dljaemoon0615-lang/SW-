import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "*.googleusercontent.com" },
      { protocol: "http", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "k.kakaocdn.net" },
      { protocol: "https", hostname: "t1.kakaocdn.net" },
      { protocol: "https", hostname: "p.kakaocdn.net" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.travel.rakuten.co.jp" },
      { protocol: "https", hostname: "trvimg.r10s.jp" },
    ],
  },
};

export default nextConfig;
