import React, { useEffect } from 'react';
import { Box, Typography, Fade } from '@mui/material';
import { SentimentVeryDissatisfied } from '@mui/icons-material';

const motivationalMessages = ['Better luck next time!', "Every 'no' brings you closer to 'yes'", 'This setback is just setup for a comeback', 'The comeback is always stronger than the setback', 'Learn from this and come back stronger'];

interface LostAnimationProps {
    show: boolean;
    message: string;
    setMessage: (msg: string) => void;
}

const LostAnimation: React.FC<LostAnimationProps> = ({ show, message, setMessage }) => {
    useEffect(() => {
        if (show && !message) {
            // setShowWonAnimation(false);
            setMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
        }
    }, [show, message, setMessage]);

    return (
        <Fade in={show} timeout={500}>
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
                <SentimentVeryDissatisfied sx={{ fontSize: 120, color: 'white', mb: 2 }} />
                <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                    Oops! You lost this lead
                </Typography>
                <Typography variant="h6" sx={{ color: 'white', mt: 1, textShadow: '0 0 5px rgba(0,0,0,0.8)' }}>
                    {message}
                </Typography>
            </Box>
        </Fade>
    );
};
export default LostAnimation;
