'use client';

import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { SubdmoainChekers } from '../../../api/SubdomainCheker';
import userContext from '../UseContext/UseContext';

export default function SubdomainChecker() {
    const pathname = usePathname();
    const router = useRouter();
    const { setFlexilogo } = useContext(userContext);

    const subdomain = Cookies.get('subdomain');
    const crmaccess = Cookies.get('crmaccess');

    useEffect(() => {
        if (!pathname) return;

        // ✅ 🔥 STEP 1: HARD BLOCK ROOT ROUTES
        const cleanPath = pathname.replace(/\/$/, '');
        const rootPaths = ['/login', '/forgot-password', '/reset-password'];

        if (rootPaths.includes(cleanPath)) {
            console.log('⛔ Skip subdomain check for:', cleanPath);
            return;
        }

        const pathSegments = pathname.split('/').filter(Boolean);
        const [location1, location2] = pathSegments;

        // ✅ STEP 2: No subdomain → go home
        if (!location1) {
            router.push('/');
            return;
        }

        // ✅ STEP 3: If only /webdads2u → redirect to login
        if (!location2) {
            router.push(`/${location1}/login`);
            return;
        }

        const publicPaths = ['login', 'forgot-password', 'reset-password'];
        const isPublicPath = publicPaths.some((path) =>
            location2?.startsWith(path)
        );

        const checkSubdomain = async () => {
            try {
                if (location1 === 'not-found') return;

                // ✅ prevent duplicate API calls
                if (subdomain === location1) return;

                const res = await SubdmoainChekers(location1);

                if (!res?.success) {
                    router.push('/');
                    return;
                }

                const { urlPath, ...logoData } = res.data;

                Cookies.set('subdomain', urlPath);
                setFlexilogo(logoData);

                const loginPath = `/${urlPath}/login`;
                const dashboardPath = `/${urlPath}/dashboard`;

                if (crmaccess) {
                    // ✅ logged in users → no login page
                    if (isPublicPath && !location2?.startsWith('reset-password')) {
                        router.push(dashboardPath);
                    }
                } else {
                    // ✅ not logged in → force login
                    if (!isPublicPath) {
                        router.push(loginPath);
                    }
                }

            } catch (err) {
                router.push('/');
            }
        };

        checkSubdomain();
    }, [pathname, crmaccess, subdomain, router, setFlexilogo]);

    return null;
}