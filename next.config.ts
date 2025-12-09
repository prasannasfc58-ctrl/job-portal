/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/job',
  assetPrefix: '/job',
  reactStrictMode: false,
  experimental: {
    optimizeCss: true,
  },
  output: 'export',
  distDir: 'out',
  productionBrowserSourceMaps: false,
};

export default nextConfig;
