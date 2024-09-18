/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/anime/sitemap',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
