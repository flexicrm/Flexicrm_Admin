import { Fragment } from 'react';

export const metadata = {
    title: 'Flexi CRM',
    description: 'Welcome to Flexi CRM'
};

export default function RootLayout({ children }) {
    return (
        <Fragment>
            {/* <Header/>
      <MyProvider> */}
            {children}
            {/* </MyProvider>
      <Footer/> */}
        </Fragment>
    );
}
