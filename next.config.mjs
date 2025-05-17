/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        // Enable ESLint
        ignoreDuringBuilds: true, // Ignore ESLint during production builds
        dirs: ['app', 'components'], // Specify the directories to lint
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_CONVEX_URL?.replace('https://', ''),
            },
            {
                protocol: 'https',
                hostname: 'img.clerk.com'
            },
        ]
    }
};

export default nextConfig;
