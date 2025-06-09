'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.palette.primary.main,
    '&.Mui-checked': {
        color: theme.palette.primary.main
    }
}));

export const MyCheckbox: React.FC<{ label: string }> = ({ label }) => {
    return <FormControlLabel control={<CustomCheckbox />} label={label} />;
};
