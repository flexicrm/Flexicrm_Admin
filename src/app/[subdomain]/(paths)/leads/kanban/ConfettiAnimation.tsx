import React, { useEffect } from 'react';
import { Box, Typography, Fade } from '@mui/material';
import { EmojiEvents } from '@mui/icons-material';
import confetti from 'canvas-confetti';

interface ConfettiAnimationProps {
    show: boolean;
}

const ConfettiAnimation: React.FC<ConfettiAnimationProps> = ({ show }) => {
    useEffect(() => {
        if (show) {
            const count = 200;
            const defaults = {
                origin: { y: 0.7 },
                spread: 100,
                startVelocity: 55
            };

            function fire(particleRatio: number, opts: confetti.Options) {
                confetti({
                    ...defaults,
                    ...opts,
                    particleCount: Math.floor(count * particleRatio)
                });
            }

            fire(0.25, {
                spread: 26,
                startVelocity: 55,
                angle: 60,
                decay: 0.9,
                scalar: 1.2
            });
            fire(0.2, {
                spread: 60,
                angle: 120,
                decay: 0.9,
                scalar: 1.2
            });
            fire(0.35, {
                spread: 100,
                decay: 0.91,
                scalar: 0.8
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 25,
                decay: 0.92,
                scalar: 1.3
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 45,
                scalar: 1.4
            });
        }
    }, [show]);

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
                    pointerEvents: 'none'
                }}
            >
                <EmojiEvents sx={{ fontSize: 120, color: 'gold', mb: 2 }} />
                <Typography variant="h4" sx={{ color: 'gold', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                    CONGRATULATIONS!
                </Typography>
                <Typography variant="h6" sx={{ color: 'white', mt: 1, textShadow: '0 0 5px rgba(0,0,0,0.8)' }}>
                    Deal Closed Successfully!
                </Typography>
            </Box>
        </Fade>
    );
};

export default ConfettiAnimation;
