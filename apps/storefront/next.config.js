const checkEnvVariables = require("./check-env-variables")

checkEnvVariables()

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "*.s3.*.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "*.s3.amazonaws.com",
      },
      // Brand logo external sources
      { protocol: "https", hostname: "logodownload.org" },
      { protocol: "https", hostname: "www.henkel.com" },
      { protocol: "https", hostname: "banner2.cleanpng.com" },
      { protocol: "https", hostname: "d2j6dbq0eux0bg.cloudfront.net" },
      { protocol: "https", hostname: "soudal.co.nz" },
      { protocol: "https", hostname: "www.citypng.com" },
      { protocol: "https", hostname: "cdn.salla.sa" },
      { protocol: "https", hostname: "brandlogos.net" },
      { protocol: "https", hostname: "encrypted-tbn0.gstatic.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
}

module.exports = nextConfig
