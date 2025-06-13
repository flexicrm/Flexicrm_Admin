'use client';
import { Fragment, useContext } from 'react';
import UserContextProvider from '../UseContext/Appprovider';
import ClientWrapper from '../Components/wrappers/useSubdomainCheck';
import SubdomainChecker from '../UseContext/SubdomainChecker';
import ErrorBoundary from '../Components/ErrorBoundry';

export default function RootLayout({ children }) {
    return (
        <ErrorBoundary>
            <Fragment>
                <UserContextProvider>
                    {children}
                    <SubdomainChecker />
                </UserContextProvider>
            </Fragment>
        </ErrorBoundary>
    );
}
