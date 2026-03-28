'use client';

import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useAuthRedirect = (enabled: boolean = true) => {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (!enabled || !pathname) return;

        const subdomainCookie = Cookies.get('subdomain');
        const crmaccess = Cookies.get('crmaccess') || Cookies.get('token'); // fallback

        // ❌ If no subdomain, don't do anything
        if (!subdomainCookie) return;

        const cleanPath = pathname.replace(/\/$/, '');
        const pathSegments = cleanPath.split('/').filter(Boolean);

        const location0 = pathSegments?.[0]; // subdomain
        const location1 = pathSegments?.[1]; // page

        const publicPaths = ['login', 'forgot-password', 'reset-password', 'otp'];

        const isCorrectSubdomain = location0 === subdomainCookie;
        const isPublicPath = publicPaths.includes(location1);

        const loginPath = `/${subdomainCookie}/login`;
        const dashboardPath = `/${subdomainCookie}/dashboard`;

        // 🔥 NOT LOGGED IN
        if (!crmaccess) {
            // Only block protected routes
            if (isCorrectSubdomain && !isPublicPath) {
                router.replace(loginPath); // ✅ replace (no flicker)
            }
            return;
        }

        // 🔥 LOGGED IN
        if (crmaccess) {
            // Prevent going back to login page
            if (isCorrectSubdomain && isPublicPath) {
                router.replace(dashboardPath);
            }
        }

    }, [enabled, pathname, router]);
};