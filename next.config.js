/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
runtimeCaching[0].handler = "StaleWhileRevalidate";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: false,
  fallbacks: {
    document: '/_offline',  // if you want to fallback to a custom page other than /_offline
  }
});

module.exports = withPWA({
  images: {
    domains: [
      "i.ytimg.com",
      "i0.wp.com",
      "aiovideodl.ml",
      "f4.bcbits.com",
      "scontent.fstv5-1.fna.fbcdn.net",
      "cdn2.sharechat.com",
      "media.chingari.io",
      "i1.sndcdn.com",
    ],
  },
});
