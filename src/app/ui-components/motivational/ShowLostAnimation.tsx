import { SentimentVeryDissatisfied } from '@mui/icons-material';
import { Box, Fade, Typography } from '@mui/material';
import React from 'react';

export default function ShowLostAnimation(showLostAnimation,currentMessage) {
    return (
        <Box
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
                pointerEvents: 'none',
                backgroundColor: 'rgba(0,0,0,0.7)'
            }}
        >
            <Fade in={showLostAnimation} timeout={500}>
                <Box textAlign="center">
                    <SentimentVeryDissatisfied sx={{ fontSize: 120, color: 'white', mb: 2 }} />
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                        OPPORTUNITY LOST
                    </Typography>
                    <Typography variant="h5" sx={{ color: 'white', mt: 2, maxWidth: '80%', mx: 'auto' }}>
                        {currentMessage}
                    </Typography>
                </Box>
            </Fade>
        </Box>
    );
}
