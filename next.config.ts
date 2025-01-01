import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // サイズ上限を10MBに設定
    },
  },
};

export default nextConfig;
