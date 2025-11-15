import { NextRequest, NextResponse } from 'next/server';
import { SubdmoainChekers } from '../../api/SubdomainCheker';

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const url = request.nextUrl.href;

    console.log('[Middleware] Incoming request:', pathname);

    if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname === '/favicon.ico') {
        console.log('[Middleware] Skipping static or API path');
        return NextResponse.next();
    }

    const pathSegments = pathname.split('/').filter(Boolean);
    const subdomain = pathSegments[1];

    console.log('[Middleware] Extracted subdomain:', subdomain);

    if (!subdomain) {
        console.log('[Middleware] No subdomain found, continue');
        return NextResponse.next();
    }

    try {
        const res = await SubdmoainChekers(subdomain);
        if (!res.ok) {
            console.log('[Middleware] API responded with error status:', res.status);
            return NextResponse.rewrite(new URL('/not-found', url));
        }

        const data = await res.json();
        console.log('[Middleware] API response:', data);

        if (!data?.success) {
            console.log('[Middleware] Subdomain invalid, rewriting to /not-found');
            return NextResponse.rewrite(new URL('/not-found', url));
        }
    } catch (error) {
        console.log('[Middleware] API call failed:', error);
        return NextResponse.rewrite(new URL('/not-found', url));
    }

    const accessToken = request.cookies.get('crmaccess')?.value;
    console.log('[Middleware] Access token:', accessToken || 'None');

    if (accessToken && pathname === `/${subdomain}/login`) {
        console.log('[Middleware] Logged in user trying to access login page, redirecting to dashboard');
        return NextResponse.redirect(new URL(`/${subdomain}/dashboard`, url));
    }

    const response = NextResponse.next();
    response.headers.set('x-middleware-subdomain', subdomain || 'none');
    console.log('[Middleware] Passing request through');
    return response;
}

export const config = {
    matcher: ['/:subdomain*']
};
