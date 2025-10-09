/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // output: "export",
  async redirects() {
    return [
      // Redirect all routes to maintenance page except static assets and maintenance page itself
      {
        source:
          '/((?!maintenance|_next|favicon.ico|logo-dark-transparent.png|logo-ordinate.svg|public|static|images|fonts|css|js).*)',
        destination: '/maintenance',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
