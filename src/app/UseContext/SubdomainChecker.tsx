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
    useEffect(() => {
        const pathSegments = location.split('/').filter(Boolean);
        const [location1, location2] = pathSegments;

        const publicPaths = ['login', 'forgot-password', 'reset-password', 'reset-password/:id'];
        const isPublicPath = publicPaths.includes(location2); // Use location2 here
        const checkSubdomain = async () => {
            try {
                if (location1 == undefined) {
                    router.push('/');
                    return;
                }
                if (location1 != 'not-found') {
                    const res = await SubdmoainChekers(location1);
                    console.log(res, 'res');
                    if (res?.success) {
                        Cookies.set('subdomain', res.data.urlPath);
                        setFlexilogo(res.data);

                        if (!subdomain) {
                            Cookies.set('subdomain', res.data.urlPath);
                        }

                        const loginPath = `/${res.data.urlPath}/login`;
                        const dashboardPath = `/${res.data.urlPath}/dashboard`;

                        if (!crmaccess) {
                            if (!isPublicPath) {
                                router.push(loginPath);
                            }
                        } else {
                            if (isPublicPath) {
                                router.push(dashboardPath);
                            }
                        }
                    } else {
                        router.push('/');
                    }
                }
            } catch (err) {
                router.push('/');
            }
        };

        checkSubdomain();
    }, [location, crmaccess, router, setFlexilogo, subdomain]);

    return null;
}
