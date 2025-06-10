import React from 'react';
import { Card, CardContent, Box, Typography, Skeleton } from '@mui/material';
import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp } from 'lucide-react';

interface SummaryCardProps {
    title: string;
    value: string | number;
    loading: boolean;
    icon: React.ReactNode;
    trend: string;
    change: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, loading, icon, trend, change }) => {
    {
        console.log(value, 'SummaryCard Props');
    }
    return (
        <motion.div transition={{ duration: 0.2 }}>
            <Card sx={{ borderRadius: 2, padding: 2, border: '1px solid #e5e7eb', boxShadow: 0 }}>
                <CardContent sx={{ paddingBottom: '0px !important', paddingTop: '0px' }}>
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
                                    <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
                                        {trend == 'increased' ? <TrendingUp fontSize="small" style={{ color: 'green' }} /> : <TrendingDown fontSize="small" style={{ color: 'red' }} />}
                                        <Typography variant="caption" fontWeight={500} color={trend == 'increased' ? 'success.main' : 'error.main'}>
                                            {Math.abs(change)}%
                                        </Typography>
                                    </Box>
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
