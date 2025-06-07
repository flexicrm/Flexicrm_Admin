'use client';
import { Provider } from 'react-redux';
import store from './store/store';
import { Box, Typography } from '@mui/material';
import { notFound, usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import userContext from './UseContext/UseContext';
import { API_BASE_URL } from './utils';
export default function Home() {
    return (
        <>
            <Provider store={store}>
                {/* {children} */}

                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <Typography variant="h6">The URL is incorrect. Please check the path.</Typography>
                </Box>
            </Provider>
        </>
    );
}
