
'use client';
import React, { useState, useEffect } from 'react';
import { Card, Box, Typography, FormControl, InputLabel, Select, MenuItem, Skeleton, Grid } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

type DateRange = [Dayjs | null, Dayjs | null];

interface DataPoint {
    name: string;
    value: number;
}

interface LeadAcquisitionChartProps {
    data: DataPoint[];
    timeframe: string;
    handleTimeframeChange: (event: { target: { value: string }; startDate?: string; endDate?: string }) => void;
    isLoading: boolean;
}

const calendarStyles = {
    '& .MuiPickersDay-root': {
        borderRadius: 0,
        border: '1px solid #e0e0e0',
        margin: '1px',
        backgroundColor: '#FFFFF'
    },
    '& .Mui-selected, & .Mui-selected:hover': {
        backgroundColor: '#0281FF !important',
        color: '#fff'
    },
    '& .MuiPickersDay-dayWithMargin': {
        margin: 0
    }
};

const LeadAcquisitionChart: React.FC<LeadAcquisitionChartProps> = ({ data, timeframe, handleTimeframeChange, isLoading }) => {
    const [startDate, setStartDate] = useState<Dayjs | null>(null);
    const [endDate, setEndDate] = useState<Dayjs | null>(null);

    useEffect(() => {
        if (timeframe !== 'custom') {
            setStartDate(null);
            setEndDate(null);
        }
    }, [timeframe]);

    const handleStartChange = (newValue: Dayjs | null) => {
        setStartDate(newValue);
        if (newValue && endDate) {
            triggerRangeChange(newValue, endDate);
        }
    };

    const handleEndChange = (newValue: Dayjs | null) => {
        setEndDate(newValue);
        if (startDate && newValue) {
            triggerRangeChange(startDate, newValue);
        }
    };

    const triggerRangeChange = (start: Dayjs, end: Dayjs) => {
        handleTimeframeChange({
            target: { value: 'custom' },
            startDate: start.format('YYYY-MM-DD'),
            endDate: end.format('YYYY-MM-DD')
        });
    };

    return (
        <Card
            sx={{
                height: 350,
                p: 2,
                borderRadius: 2,
                border: '1px solid #e0e0e0',
                boxShadow: 0,
                '&:hover': {
                    boxShadow: 5
                }
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h5" component="h2" fontWeight={600} sx={{ ml: { xs: '', md: 3 }, fontSize: { xs: '14px', md: '1.25rem' } }}>
                    Lead Acquisition
                </Typography>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Timeframe</InputLabel>
                    <Select value={timeframe} label="Timeframe" onChange={(e) => handleTimeframeChange({ target: { value: e.target.value } })}>
                        <MenuItem value="yearly">Yearly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="custom">Custom</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {timeframe === 'custom' && (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid container spacing={2} mb={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <DatePicker
                                label="Start Date"
                                value={startDate}
                                onChange={handleStartChange}
                                maxDate={endDate || undefined}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        fullWidth: true,
                                        placeholder: 'YYYY-MM-DD'
                                    }
                                }}
                                sx={{ width: '100%', ...calendarStyles }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <DatePicker
                                label="End Date"
                                value={endDate}
                                onChange={handleEndChange}
                                minDate={startDate || undefined}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        fullWidth: true,
                                        placeholder: 'YYYY-MM-DD'
                                    }
                                }}
                                sx={{ width: '100%', ...calendarStyles }}
                            />
                        </Grid>
                    </Grid>
                </LocalizationProvider>
            )}

            {isLoading ? (
                <Skeleton variant="rectangular" height={220} />
            ) : (
                <ResponsiveContainer width="100%" height="75%">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: -30, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0281FF" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#0281FF" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis fontSize={10} tickLine={false} axisLine={false} />
                        <Area type="monotone" dataKey="value" stroke="#0281FF" fill="url(#colorValue)" strokeWidth={2} />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </Card>
    );
};

export default LeadAcquisitionChart;
