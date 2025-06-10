'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const CustomTypography = styled(Typography)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MyTypography: React.FC<{ text: string; variant: 'h1' | 'h2' | 'body1' | 'body2' }> = ({ text, variant }) => {
    return <CustomTypography variant={variant}>{text}</CustomTypography>;
};
