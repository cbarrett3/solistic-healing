/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
    ],
  },
  // Add redirects for blog posts
  async redirects() {
    return [
      {
        source: '/blog/:id(\\d+)',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
