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
    const location0 = pathSegments?.[0];
    const location1 = pathSegments?.[1];
    const publicPaths = ['login', 'forgot-password', 'reset-password'];
    const isCorrectSubdomain = location0 === subdomainCookie;
    const isPublicPath = isCorrectSubdomain && publicPaths.includes(location1);

    useEffect(() => {
        if (!subdomainCookie) return;

        const loginPath = `/${subdomainCookie}/login`;
        const dashboardPath = `/${subdomainCookie}/dashboard`;

        if (!crmaccess) {
            if (!isPublicPath) {
                router.push(loginPath);
            }
            return;
        }

        if (crmaccess) {
            // if (isPublicPath) {
            //     router.push(dashboardPath);
            // }
        }
    }, [crmaccess, subdomainCookie, pathname, isPublicPath, router]);
};
