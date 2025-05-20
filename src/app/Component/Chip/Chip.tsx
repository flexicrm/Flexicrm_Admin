'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

const CustomChip = styled(Chip)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MyChip: React.FC<{ label: string }> = ({ label }) => {
    return <CustomChip label={label} color="primary" />;
};
