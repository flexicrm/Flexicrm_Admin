'use client';
import React, { useState, useEffect } from 'react';
import { Card, Box, Typography, FormControl, InputLabel, Select, MenuItem, Skeleton } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

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
        margin: '1px'
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
    const [dateRange, setDateRange] = useState<DateRange>([null, null]);
    const [pickerOpen, setPickerOpen] = useState(false);

    // Open picker automatically when timeframe is custom
    useEffect(() => {
        setPickerOpen(timeframe === 'custom');
    }, [timeframe]);

    const handleDateRangeChange = (newValue: DateRange) => {
        setDateRange(newValue);

        if (newValue[0] && newValue[1]) {
            handleTimeframeChange({
                target: { value: 'custom' },
                startDate: newValue[0].format('YYYY-MM-DD'),
                endDate: newValue[1].format('YYYY-MM-DD')
            });
            setPickerOpen(false); // Auto-close on full selection
        }
    };

    return (
        <Card
            sx={{
                height: 350,
                p: 2,
                borderRadius: 2,
                border: '1px solid #e0e0e0',
                boxShadow: 0,
                m: 1,
                '&:hover': {
                    boxShadow: 5
                }
            }}
        >
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h5" component="h2" fontWeight={600} sx={{ ml: 2 }}>
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
                    <DateRangePicker
                        calendars={1}
                        value={dateRange}
                        onChange={handleDateRangeChange}
                        localeText={{ start: 'Start', end: 'End' }}
                        open={pickerOpen}
                        onClose={() => setPickerOpen(false)}
                        onOpen={() => setPickerOpen(true)}
                        sx={{ mb: 2, width: '100%', ...calendarStyles }}
                        slotProps={{
                            textField: {
                                size: 'small',
                                // placeholder applies same on both start and end inputs
                                placeholder: 'YYYY-MM-DD'
                            }
                        }}
                    />
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
