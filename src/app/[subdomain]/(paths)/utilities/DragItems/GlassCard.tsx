import { Box } from '@mui/material';
import React from 'react';

export const GlassCard: React.FC<{ children: React.ReactNode; gradient?: string }> = ({ children, gradient }) => (
    <Box
        sx={{
            background: 'linear-gradient(135deg, #0f0f23 0%, #16213e 25%, #1a1a2e 50%, #0f0f23 100%)',

            // background: gradient || 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            p: 3,
            position: 'relative',
            overflow: 'hidden',
            // '&::before': {
            //     content: '""',
            //     position: 'absolute',
            //     top: 0,
            //     left: 0,
            //     right: 0,
            //     height: '1px',
            //     background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)'
            // }
            '&::before': {
                content: '""',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                                        radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
                                        radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
                                        radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 70%)
                                    `,
                pointerEvents: 'none',
                zIndex: 0
            }
        }}
    >
        {children}
    </Box>
);
