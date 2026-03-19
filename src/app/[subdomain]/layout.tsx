'use client';

import ErrorBoundary from '../Components/ErrorBoundry';
import UserContextProvider from '../UseContext/Appprovider';
import SubdomainChecker from '../UseContext/SubdomainChecker';

export default function RootLayout({ children }) {
    return (
        <ErrorBoundary>
            <UserContextProvider>
                {children}
                <SubdomainChecker />
            </UserContextProvider>
        </ErrorBoundary>
    );
}