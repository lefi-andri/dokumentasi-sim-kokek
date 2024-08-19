/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'kokek.synology.me',
        port: '8091',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
