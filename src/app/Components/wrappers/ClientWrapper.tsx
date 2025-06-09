'use client';

import { useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import { API_BASE_URL } from '../../utils';
import userContext from '../../UseContext/UseContext';

export const useSubdomainCheck = () => {
    const pathname = usePathname();
    const router = useRouter();
    const crmaccess = Cookies.get('crmaccess');
    const subdomainCookie = Cookies.get('subdomain');
    const pathSegments = pathname?.split('/').filter(Boolean);
    const location1 = pathSegments?.[0];
    // const { setFlexilogo } = useContext(userContext);
    console.log('location1', location1, 'crmaccess', crmaccess, 'subdomainCookie', subdomainCookie);
    useEffect(() => {
        if (!location1 || crmaccess) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/user/check-subdomain/${location1}`);
                if (response?.data?.success && !subdomainCookie) {
                    const newSubdomain = response.data.data.urlPath;
                    Cookies.set('subdomain', newSubdomain);
                    // setFlexilogo(response.data.data);
                    router.push(`/${newSubdomain}/login`);
                }
            } catch (error: any) {
                if (error.response?.status === 404) {
                    router.push(`/`);
                }
                console.error('Subdomain Check Error:', error);
            }
        };

        fetchData();
    }, [location1, crmaccess, subdomainCookie, router]);
};
