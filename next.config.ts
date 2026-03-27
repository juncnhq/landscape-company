import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'path';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  transpilePackages: ["@premieroctet/next-admin"],
  webpack: (config) => {
    config.resolve.alias["@premieroctet/next-admin/schema"] = path.join(
      process.cwd(),
      "src/generated/json-schema.json"
    );
    // Prisma 7 removed runtime/library — shim for next-admin compatibility
    config.resolve.alias["@prisma/client/runtime/library"] = path.join(
      process.cwd(),
      "src/lib/prisma-runtime-shim.js"
    );
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      }
    ],
  },
};

export default withNextIntl(nextConfig);
