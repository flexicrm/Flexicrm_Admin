'use client';
import { Fragment, useContext } from 'react';
import UserContextProvider from '../UseContext/Appprovider';

import ClientWrapper from '../Components/wrappers/useSubdomainCheck';
import SubdomainChecker from '../UseContext/SubdomainChecker';

export default function RootLayout({ children }) {
    return (
        <Fragment>
            <UserContextProvider>
                {children}
                <SubdomainChecker />
            </UserContextProvider>
        </Fragment>
    );
}
