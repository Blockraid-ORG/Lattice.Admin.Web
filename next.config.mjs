/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    baseUrl: process.env.BASE_URL
  },
  images: {
    domains: ['localhost','api-dev.e-wow.my.id'],
  },
};

export default nextConfig;
