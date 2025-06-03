'use client';
import { usePathname, useRouter } from 'next/navigation';

import React from 'react';
import Cookies from 'js-cookie';

export default function DyanimcRouterpage() {
    // const location = typeof window.location.pathname === 'string' ? window.location.pathname : null;
    const location = usePathname();
    const router = useRouter();
    const subdomain = Cookies.get('subdomain');

    const location1 = location.split('/')[0];
    const location2 = location.split('/')[1];
    if (location1 || location2) {
        router.push(`/${subdomain}/login`);
        // window.location.href = `/${subdomain}/login`;
    }

    return <div></div>;
}
