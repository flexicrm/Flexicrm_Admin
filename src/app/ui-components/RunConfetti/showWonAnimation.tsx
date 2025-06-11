import { EmojiEvents } from '@mui/icons-material';
import { Box, Fade, Typography } from '@mui/material';
import React from 'react';

export default function ShowWonAnimation(showWonAnimation) {
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
                pointerEvents: 'none'
            }}
        >
            <Fade in={showWonAnimation} timeout={500}>
                <Box textAlign="center">
                    <EmojiEvents sx={{ fontSize: 120, color: 'gold', mb: 2 }} />
                    <Typography variant="h4" sx={{ color: 'gold', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                        CONGRATULATIONS!
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'white', mt: 1, textShadow: '0 0 5px rgba(0,0,0,0.8)' }}>
                        Deal Closed Successfully!
                    </Typography>
                </Box>
            </Fade>
        </Box>
    );
}
