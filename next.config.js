/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // compiler: {
  //   removeConsole: process.env.NODE_ENV !== "development",
  // },
  pwa: {
    dest: "public",
    // disable: process.env.NODE_ENV === "development",
    register: true,
    runtimeCaching,
    buildExcludes: [/middleware-manifest.json$/],
  },
  images: {
    domains: [
      "i.ytimg.com",
      "i0.wp.com",
      "aiovideodl.ml",
      "f4.bcbits.com",
      "scontent.fstv5-1.fna.fbcdn.net",
      "cdn2.sharechat.com",
      "media.chingari.io",
    ],
  },
};

module.exports = () => {
  const plugins = [withPWA];
  const config = plugins.reduce((acc, next) => next(acc), nextConfig);
  return config;
};
