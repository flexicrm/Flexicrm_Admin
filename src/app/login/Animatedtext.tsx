'use client';
import { Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

// Motion wrapper
const MotionTypography = motion(Typography);

const AnimatedText = ({ textKey, text }: { textKey: string | number; text: string }) => {
    return (
        <AnimatePresence mode="wait">
            <MotionTypography
                key={textKey} // Important for animation on change
                variant="h6"
                sx={{ mt: 1 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
            >
                {text}
            </MotionTypography>
        </AnimatePresence>
    );
};

export default AnimatedText;
