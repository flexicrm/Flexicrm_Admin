'use client';
import { useEffect, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import userContext from '../UseContext/UseContext';
import { SubdmoainChekers } from '../../../api/SubdomainCheker';
// Replace with real URL

export default function SubdomainChecker() {
    const location = usePathname();
    const router = useRouter();
    const { setFlexilogo } = useContext(userContext);
    const subdomain = Cookies.get('subdomain');
    const crmaccess = Cookies.get('crmaccess');
    useEffect(() => {
        const pathSegments = location.split('/').filter(Boolean);
        const [location1, location2] = pathSegments; // like 'login', 'forgot-password', etc.

        const publicPaths = ['login', 'forgot-password', 'reset-password'];
        const isCorrectSubdomain = location1 === subdomain;
        const isPublicPath = isCorrectSubdomain && publicPaths.includes(location1);
        const checkSubdomain = async () => {
            try {
                // const res = await axios.get(`${API_BASE_URL}/user/check-subdomain/${location1}`);
                const res = await SubdmoainChekers(location1);
                console.log(res, 'res');
                if (res?.success) {
                    // alert('sub');
                    Cookies.set('subdomain', res.data.urlPath);
                    setFlexilogo(res.data);
                }
                if (res?.success && !subdomain) {
                    Cookies.set('subdomain', res.data.urlPath);
                }
                // router.push(`/${subdomain}/login`);
                if (!publicPaths.includes(location2) && !res.success) {
                    router.push('/');
                }

                const loginPath = `/${subdomain}/login`;
                const dashboardPath = `/${subdomain}/dashboard`;

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
            } catch (err) {
                router.push('/');
                throw new Error('Simulated client-side error!');
            }
        };

        checkSubdomain();
        // useAuthRedirect();
    }, [location]); // runs on every route change

    return null;
}
