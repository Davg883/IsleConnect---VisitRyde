/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fonts are loaded via <link> tags in layout.tsx; skip build-time inlining
  // so builds succeed in offline/CI environments without font CDN access.
  optimizeFonts: false,
};
export default nextConfig;
