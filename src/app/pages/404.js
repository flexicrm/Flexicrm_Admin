// pages/404.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';

export default function Custom404() {
    // const router = useRouter();

    // useEffect(() => {
    //     // Redirect to the home page after a short delay
    //     const timer = setTimeout(() => {
    //         // router.replace('/');
    //     }, 3000); // Redirect after 3 seconds

    //     return () => clearTimeout(timer);
    // }, [router]);

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <Typography variant="h6">URL is Wrong check the Path</Typography>
        </Box>
    );
}
