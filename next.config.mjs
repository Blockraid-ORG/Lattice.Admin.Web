/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    baseUrl: process.env.BASE_URL
  },
  images: {
    remotePatterns: [
      {
        'hostname': 'copper-random-mammal-506.mypinata.cloud',
        'protocol': 'https',
      },
      {
        'hostname': 'maroon-delicate-coyote-528.mypinata.cloud',
        'protocol': 'https',
      },
      {
        'hostname': 'red-careful-koala-550.mypinata.cloud',
        'protocol': 'https',
      },
      {
        'hostname': 'api-dev.e-wow.my.id',
        'protocol': 'https',
      },
      {
        'hostname': 'api.terravest.capital',
        'protocol': 'https',
      },
      {
        'hostname': 'localhost',
        'protocol': 'http',
      },
    ]
  },
};

export default nextConfig;
