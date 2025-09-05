/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Increase from the default of 1mb to handle image uploads
    },
  },
};

module.exports = nextConfig; 