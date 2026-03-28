'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from '../../store/store';
import { ThemeProvider } from '../../Theme/ThemeContext';
import ErrorBoundary from '../ErrorBoundry';
import { useAuthRedirect } from './useAuthRedirect';
import { useSubdomainCheck } from './useSubdomainCheck';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false);
    const pathname = usePathname();

    // ✅ Ensure client-side rendering
    useEffect(() => {
        setIsClient(true);
    }, []);

    // ✅ Normalize path
    const cleanPath = pathname?.replace(/\/$/, '') || '';

    const rootPaths = [
        '/login',
        '/Otp',
        '/forgot-password',
        '/reset-password',
        '/dashboard'
    ];

    const isRootPath = rootPaths.includes(cleanPath);

    // ✅ ALWAYS call hooks (NO conditions)
    useSubdomainCheck(!isRootPath);
    useAuthRedirect(!isRootPath);

    // ✅ Prevent hydration mismatch
    if (!isClient) return null;

    return (
        <ErrorBoundary>
            <ThemeProvider>
                <Provider store={store}>
                    {children}
                </Provider>
            </ThemeProvider>
        </ErrorBoundary>
    );
}