'use client';
import { useEffect, useState } from 'react';
import { useAuthRedirect } from './useAuthRedirect';
import { ThemeProvider } from '../../Theme/ThemeContext'; // ✅ Correct path
import { Provider } from 'react-redux';
import store from '../../store/store';
import { useSubdomainCheck } from './ClientWrapper';
import ErrorBoundary from '../ErrorBoundry';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useSubdomainCheck();
    useAuthRedirect();

    if (!isClient) return null;

    return (
        <ErrorBoundary>
            <ThemeProvider>
                <Provider store={store}>{children}</Provider>
            </ThemeProvider>
        </ErrorBoundary>
    );
}
