'use client';
import { Provider } from 'react-redux';
import store from './store/store';
import { Box, Typography } from '@mui/material';
import { useTour } from './Components/TourContext';
import { useEffect } from 'react';

export default function Home() {
    const { startTour, setSteps } = useTour();

    useEffect(() => {
        setSteps([
            { element: '#step1', intro: 'This is the main message area.' },
            { element: '#step2', intro: 'Click here to start the tour again.' }
        ]);
    }, [setSteps]);
    return (
        <>
            <Provider store={store}>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
                    <Typography id="step1" variant="h6">
                        The URL is incorrect. Please check the path.
                    </Typography>
                </Box>
            </Provider>
        </>
    );
}
