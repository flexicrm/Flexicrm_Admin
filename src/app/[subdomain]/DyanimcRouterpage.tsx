'use client';
import { usePathname, useRouter } from 'next/navigation';

import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../utils';
import axios from 'axios';

export default function DyanimcRouterpage() {
    const location = usePathname();
    const subdomain = Cookies.get('subdomain');
    const crmaccess = Cookies.get('crmaccess');
    const router = useRouter();

    // Split the path and filter out empty segments
    const pathSegments = location.split('/').filter(Boolean);
    const [location1, location2] = pathSegments;

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/user/check-subdomain/${location1}`);

            if (response?.data?.success && !crmaccess) {
                alert('demo');
                Cookies.set('subdomain', response.data.data.urlPath);
                router.push(`/${subdomain}/login`);
            }
        } catch (error) {
            if (error.status == 404) {
                // alert('demo');
                // notFound();
                router.push(`/`);
                // NotFound();
                // setSubdmoainchecker(error || '');
            }

            console.log(error, 'error');
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    return <div></div>;
}
