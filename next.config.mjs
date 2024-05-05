/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "uploadthing.com",
          port: '',
          pathname: '/**'
        },
        {
          protocol: "https",
          hostname: "utfs.io",
          port: '',
          pathname: '/**'
        },
      ],
      unoptimized: true,
    },
  };

export default nextConfig;
