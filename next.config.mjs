/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Tanda bintang dua ini artinya mengizinkan URL dari website mana pun
      },
    ],
  },
};

export default nextConfig;
