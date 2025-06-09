'use client';
import { useEffect, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import userContext from '../UseContext/UseContext';
import { API_BASE_URL } from '../utils';
import { useAuthRedirect } from '../Components/wrappers/useAuthRedirect';
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

        const checkSubdomain = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/user/check-subdomain/${location1}`);
                setFlexilogo(res.data.data);

                Cookies.set('subdomain', res.data.data.urlPath);
                // router.push(`/${subdomain}/login`);
                if (!publicPaths.includes(location2) && !res.data.success) {
                    router.push('/');
                }
            } catch (err) {
                if (!publicPaths.includes(location2)) {
                    router.push('/');
                }
            }
        };

        checkSubdomain();
        // useAuthRedirect();
    }, [location]); // runs on every route change

    return null;
}
