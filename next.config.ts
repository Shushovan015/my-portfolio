/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
