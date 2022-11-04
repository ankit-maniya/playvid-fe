/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
});;

module.exports = withPWA({
  swcMinify: true,
  reactStrictMode: true,
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
});
