/** @type {import('next').NextConfig} */

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const nextConfig = {
    experimental: {
        serverActions: {
            allowedOrigins: ["localhost:8000", "localhost:3000", API_URL]
        }
    }
};

export default nextConfig;
