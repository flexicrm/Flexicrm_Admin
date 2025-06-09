import React from 'react';
import { Card, CardContent, Box, Typography, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';

interface SummaryCardProps {
    title: string;
    value: string | number;
    loading: boolean;
    icon: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, loading, icon }) => {
    return (
        <motion.div transition={{ duration: 0.2 }}>
            <Card sx={{ borderRadius: 2, padding: 2, boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)', border: '1px solid #e5e7eb' }}>
                <CardContent sx={{ paddingBottom: '16px !important' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        <Box flexGrow={1}>
                            {loading ? (
                                <>
                                    <Skeleton variant="text" width="60%" />
                                    <Skeleton variant="rectangular" height={30} sx={{ my: 1 }} />
                                    <Skeleton variant="text" width="80%" />
                                </>
                            ) : (
                                <>
                                    <Typography variant="h3" color="text.secondary" sx={{ color: '#878a99' }}>
                                        {title}
                                    </Typography>
                                    <Typography variant="h5" fontWeight={600}>
                                        {value}
                                    </Typography>
                                </>
                            )}
                        </Box>
                        {!loading && <Box sx={{ p: 1.2, ml: 2, borderRadius: 2, bgcolor: 'rgb(10 45 90/5%)', color: '#00439a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</Box>}
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default SummaryCard;
