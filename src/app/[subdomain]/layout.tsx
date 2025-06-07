'use client';
import { Fragment, useContext } from 'react';
import UserContextProvider from '../UseContext/Appprovider';

import SubdomainChecker from '../UseContext/SubdomainChecker';

// export const metadata = {
//     title: 'Flexi CRM',
//     description: 'Welcome to Flexi CRM'
// };

export default function RootLayout({ children }) {
    return (
        <Fragment>
            {/* <Header/>
      <MyProvider> */}
            <UserContextProvider>
                {children}
                <SubdomainChecker />
            </UserContextProvider>
            {/* </MyProvider>
      <Footer/> */}
        </Fragment>
    );
}
