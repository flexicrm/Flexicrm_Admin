'use client';

import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { API_BASE_URL } from './utils';
import userContext from './UseContext/UseContext';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    const location = usePathname();
    const subdomain = Cookies.get('subdomain');
    const crmaccess = Cookies.get('crmaccess');
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { setSubdmoainchecker } = useContext(userContext);
    const pathSegments = location.split('/').filter(Boolean);
    const [location1] = pathSegments;

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/user/check-subdomain/${location1}`);
            if (response?.data?.success && !crmaccess) {
                setSubdmoainchecker(response?.data?.success);
                Cookies.set('subdomain', response.data.data.urlPath);
                router.push(`/${subdomain}/login`);
            }
        } catch (error: any) {
            if (error?.response?.status === 404) {
                router.push(`/`);
            }
            console.error('Subdomain error:', error);
        } finally {
            setLoading(true); // Set to true after logic is done so we can show children
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!loading) return null;

    return <>{children}</>;
}
