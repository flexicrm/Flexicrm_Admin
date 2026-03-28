"use client"

import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import React from 'react';

const CustomSlider = styled(Slider)(({ theme }) => ({
    color: theme.palette.primary.main,
    height: 6,
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:hover': {
            boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)'
        }
    }
}));

export const MySlider: React.FC<{ defaultValue?: number }> = ({ defaultValue = 30 }) => {
    return <CustomSlider defaultValue={defaultValue} />;
};
