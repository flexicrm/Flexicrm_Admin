'use client';
import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';

interface SummaryCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, color = '#1d5755' }) => (
    <motion.div
        initial="hidden"
        animate="show"
        variants={fadeIn('up', 'spring', 0.2, 0.75)}
        whileHover={{ scale: 1.03 }}
    >
        <Card
            sx={{
                minWidth: 220,
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                borderBottom: `5px solid ${color}`,
                borderRadius: 3,
                backgroundColor: '#fff',
            }}
        >
            <Box sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                <Box
                    sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        bgcolor: color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                    }}
                >
                    {icon}
                </Box>
                <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontSize: 16, color: '#878a99' }}>
                        {title}
                    </Typography>
                    <Typography variant="h5" fontWeight={700}>
                        {value}
                    </Typography>
                </Box>
            </Box>
        </Card>
    </motion.div>
);
