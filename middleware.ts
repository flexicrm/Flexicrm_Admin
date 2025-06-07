// import { NextRequest, NextResponse } from 'next/server';

import { NextRequest, NextResponse } from 'next/server';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

// export async function middleware(request: NextRequest) {
//     const { pathname, url } = request.nextUrl;

//     console.log('[Middleware] Incoming request:', pathname);

//     if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname === '/favicon.ico') {
//         console.log('[Middleware] Skipping static or API path');
//         return NextResponse.next();
//     }

//     const pathSegments = pathname.split('/').filter(Boolean);
//     const subdomain = pathSegments[1]; // <--- FIXED here

//     console.log('[Middleware] Extracted subdomain:', subdomain);

//     if (!subdomain) {
//         console.log('[Middleware] No subdomain found, continue');
//         return NextResponse.next();
//     }

//     try {
//         const res = await fetch(`${API_BASE_URL}/user/check-subdomain/${subdomain}`, {
//             headers: { 'Content-Type': 'application/json' },
//             next: { revalidate: 10 }
//         });

//         if (!res.ok) {
//             console.log('[Middleware] API responded with error status:', res.status);
//             return NextResponse.rewrite(new URL('/not-found', url));
//         }

//         const data = await res.json();
//         console.log('[Middleware] API response:', data);

//         if (!data?.success) {
//             console.log('[Middleware] Subdomain invalid, rewriting to /not-found');
//             return NextResponse.rewrite(new URL('/not-found', url));
//         }
//     } catch (error) {
//         console.log('[Middleware] API call failed:', error);
//         return NextResponse.rewrite(new URL('/not-found', url));
//     }

//     const accessToken = request.cookies.get('crmaccess')?.value;
//     console.log('[Middleware] Access token:', accessToken || 'None');

//     if (accessToken && pathname === `/${subdomain}/login`) {
//         console.log('[Middleware] Logged in user trying to access login page, redirecting to dashboard');
//         return NextResponse.redirect(new URL(`/${subdomain}/dashboard`, url));
//     }

//     const response = NextResponse.next();
//     response.headers.set('x-middleware-subdomain', subdomain || 'none'); // for debugging
//     console.log('[Middleware] Passing request through');
//     return response;
// }

// export const config = {
//     matcher: ['/:subdomain*']
// };
export async function middleware(request: NextRequest) {
    console.log('Middleware is running');
    return NextResponse.next();
}
export const config = {
    matcher: ['/:path*'] // Run on all paths for testing
};
