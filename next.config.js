/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["i.ytimg.com", "i0.wp.com", "aiovideodl.ml", "f4.bcbits.com", "scontent.fstv5-1.fna.fbcdn.net"],
  },
};

module.exports = nextConfig;
