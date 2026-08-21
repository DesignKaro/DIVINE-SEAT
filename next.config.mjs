/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    qualities: [75, 100],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
