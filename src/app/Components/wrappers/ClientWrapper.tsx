'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { SubdmoainChekers } from '../../../../api/SubdomainCheker';

export const useSubdomainCheck = () => {
    const pathname = usePathname();
    const router = useRouter();
    const crmaccess = Cookies.get('crmaccess');
    const subdomainCookie = Cookies.get('subdomain');
    const [locationvaleu, setLocationvalue] = useState<string | null>(null);
    // const { setFlexilogo } = useContext(userContext);

    useEffect(() => {
        const pathSegments = pathname?.split('/').filter(Boolean);
        const location1 = pathSegments?.[0];
        console.log(location1, 'location1');
        // if (location1 == undefined) {
        //     throw new Error('Resource not found');
        //     //    isError: true, data: 'Resource not found' };
        // }
        if (!location1 || crmaccess) return;
        setLocationvalue(location1);
        const fetchData = async () => {
            try {
                if (location1 != 'not-found') {
                    const response = await SubdmoainChekers(location1);
                    console.log(response, 'response>>>>>>>>>>>>>>>>>>>>');
                    if (response?.success) {
                        // alert('client');
                        Cookies.set('subdomain', response.data.urlPath);
                        // setFlexilogo(response.data);
                    }
                    if (response?.success && !subdomainCookie) {
                        console.log('first>>>>>>>>>>>');
                        const newSubdomain = response.data.urlPath;
                        Cookies.set('subdomain', newSubdomain);
                        // setFlexilogo(response.data.data);
                        router.push(`/${newSubdomain}/login`);
                    }
                }
            } catch (error: any) {
                if (error.response?.status === 404) {
                    // router.push(`/`);
                }
                return { isError: true, data: 'Resource not found' };
                // throw new Error('Simulated client-side error!');
            }
        };

        fetchData();
    }, [locationvaleu, crmaccess, subdomainCookie, router, pathname]);
};
