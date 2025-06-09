'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export const useAuthRedirect = () => {
    const pathname = usePathname();
    const router = useRouter();

    const subdomainCookie = Cookies.get('subdomain');
    const crmaccess = Cookies.get('crmaccess');

    const pathSegments = pathname?.split('/').filter(Boolean);
    const location0 = pathSegments?.[0]; // subdomain
    const location1 = pathSegments?.[1]; // login, forgot-password, reset-password

    const publicPaths = ['login', 'forgot-password', 'reset-password'];

    const isCorrectSubdomain = location0 === subdomainCookie;
    const isPublicPath = isCorrectSubdomain && publicPaths.includes(location1);

    useEffect(() => {
        if (!subdomainCookie) return; // Can't redirect reliably without subdomain

        const loginPath = `/${subdomainCookie}/login`;
        const dashboardPath = `/${subdomainCookie}/dashboard`;

        // ✅ Case 1: Not logged in
        if (!crmaccess) {
            // Allow only public pages within correct subdomain
            if (!isPublicPath) {
                router.push(loginPath);
            }
            return;
        }

        // ✅ Case 2: Logged in
        if (crmaccess) {
            // Block access to login/forgot/reset pages
            if (isPublicPath) {
                router.push(dashboardPath);
            }
        }
    }, [crmaccess, subdomainCookie, pathname, isPublicPath, router]);
};
