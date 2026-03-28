'use client';

import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { SubdmoainChekers } from '../../../../api/SubdomainCheker';

export const useSubdomainCheck = (enabled: boolean = true) => {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Check if we should run the subdomain check
        const rootPaths = [
            '/login',
            '/forgot-password',
            '/reset-password',
            '/otp',
            '/otp/verify-otp',
            '/dashboard'
        ];
        
        // Don't run on root paths
        if (rootPaths.includes(pathname?.replace(/\/$/, '') || '')) {
            return;
        }

        // ✅ Use the enabled flag here
        if (!enabled || !pathname) return;

        const crmaccess = Cookies.get('crmaccess');
        const subdomainCookie = Cookies.get('subdomain');

        const cleanPath = pathname.replace(/\/$/, '');
        
        // Additional root paths check
        if (rootPaths.includes(cleanPath)) return;

        const pathSegments = pathname.split('/').filter(Boolean);
        const location1 = pathSegments?.[0];

        if (!location1 || crmaccess) return;

        const fetchData = async () => {
            try {
                if (location1 === 'not-found') return;
                if (subdomainCookie === location1) return;

                const response = await SubdmoainChekers(location1);
                if (!response?.success) return;

                const newSubdomain = response.data.urlPath;
                Cookies.set('subdomain', newSubdomain);

                if (pathSegments.length === 1) {
                    router.push(`/${newSubdomain}/login`);
                }
            } catch (error: any) {
                if (error?.response?.status === 404) {
                    router.push('/');
                }
            }
        };

        fetchData();
    }, [enabled, pathname, router]);
};