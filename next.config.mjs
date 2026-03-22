/** @type {import('next').NextConfig} */
const nextConfig = {

  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors. Fail-safe added per request.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
