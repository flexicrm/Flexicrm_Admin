// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
    const pathSegments = request.nextUrl.pathname.split('/').filter(Boolean);
    const subdomain = pathSegments[1]; // First path segment = subdomain

    try {
        const res = await fetch(`https://api.example.com/user/check-subdomain/${subdomain}`);
        const data = await res.json();

        if (!data?.success) {
            return NextResponse.rewrite(new URL('/not-found', request.url)); // Rewrite to /app/not-found/page.tsx
        }
    } catch (err) {
        return NextResponse.rewrite(new URL('/not-found', request.url));
    }

    return NextResponse.next();
}

// Only apply middleware for paths starting with subdomain
export const config = {
    matcher: ['/:subdomain*']
};
