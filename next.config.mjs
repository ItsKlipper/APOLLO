/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_PORT: process.env.REACT_APP_PORT,
  },
};

export default nextConfig;