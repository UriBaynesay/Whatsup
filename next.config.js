/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rskqekvnpfrkjgyztscg.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

module.exports = nextConfig;
