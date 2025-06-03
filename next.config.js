/** @type {import('next').NextConfig} */
const nextConfig = {
    matcher: [
        '/', // match root
        '/dashboard', // match /dashboard
        '/:subdomain*' // match any dynamic subdomain route
    ]
};

module.exports = nextConfig;
