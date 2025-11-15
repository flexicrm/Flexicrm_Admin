'use client';
import { useEffect, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import userContext from '../UseContext/UseContext';
import { SubdmoainChekers } from '../../../api/SubdomainCheker';

export default function SubdomainChecker() {
    const location = usePathname();
    const router = useRouter();
    const { setFlexilogo } = useContext(userContext);

    const subdomain = Cookies.get('subdomain');
    const crmaccess = Cookies.get('crmaccess');
    const firstLogin = Cookies.get('firstLogin');

    useEffect(() => {
        const pathSegments = location.split('/').filter(Boolean);
        const [location1, location2] = pathSegments;

        if (!location1) {
            router.push('/');
            return;
        }

        const publicPaths = ['login', 'forgot-password', 'reset-password'];
        const isPublicPath = publicPaths.some((path) => location2?.startsWith(path));

        const checkSubdomain = async () => {
            try {
                if (location1 === 'not-found') return;
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
                    if (!isPublicPath || location2?.startsWith('reset-password')) return;
                    router.push(dashboardPath);
                } else {
                    if (!isPublicPath) router.push(loginPath);
                }
            } catch (err) {
                router.push('/');
            }
        };

        checkSubdomain();
    }, [location, crmaccess, router, setFlexilogo]);

    return null;
}
