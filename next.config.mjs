/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Increase static page generation timeout to 300 seconds
  staticPageGenerationTimeout: 300,

  // Add image domain configuration for external image loading
  images: {
    domains: ['cdn.noitatnemucod.net', 'img.zorores.com'],
  },
};

export default nextConfig;
