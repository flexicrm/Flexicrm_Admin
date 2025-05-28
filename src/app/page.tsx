'use client';
import { Provider } from 'react-redux';
import store from './store/store';
export default function Home({ children }: any) {
    return (
        <>
            {/* <h1>Welcome to the Home Page</h1> */}
            <Provider store={store}>{children}</Provider>
        </>
    );
}
