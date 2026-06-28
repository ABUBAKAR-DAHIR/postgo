import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "postgo-bucket.t3.tigrisfiles.io"
      },

      {
        protocol: "https",
        hostname: "postgo-bucket.t3.storage.dev"
      },
      
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      },

      {
        protocol: "https",
        hostname: "gravatar.com"
      },


    ]
  }
};

export default nextConfig;
