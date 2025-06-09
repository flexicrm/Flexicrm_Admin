import React from 'react';
import { Card, Box, Typography, FormControl, InputLabel, Select, MenuItem, Skeleton } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface DataPoint {
    name: string;
    value: number;
}

interface LeadAcquisitionChartProps {
    data: DataPoint[];
    timeframe: string;
    handleTimeframeChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
    isLoading: boolean;
}

const LeadAcquisitionChart: React.FC<LeadAcquisitionChartProps> = ({ data, timeframe, handleTimeframeChange, isLoading }) => {
    return (
        <Card sx={{ height: 350, borderRadius: 2, border: '1px solid #e5e7eb', position: 'relative', p: 2, boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h5" fontWeight={600}>
                    Lead Acquisition
                </Typography>
                <FormControl size="small" sx={{ minWidth: 140 }}>
                    <InputLabel id="timeframe-label">Timeframe</InputLabel>
                    <Select labelId="timeframe-label" value={timeframe} label="Timeframe" onChange={() => handleTimeframeChange}>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {isLoading ? (
                <Skeleton variant="rectangular" height={320} />
            ) : (
                <ResponsiveContainer width="100%" height="85%">
                    <AreaChart data={data} margin={{ top: 0, right: 0, left: -40, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={'#0281FF'} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={'#0281FF'} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis fontSize={12} tickLine={false} axisLine={false} />
                        <Area type="monotone" dataKey="value" stroke="#0281FF" fill="url(#colorValue)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </Card>
    );
};

export default LeadAcquisitionChart;
