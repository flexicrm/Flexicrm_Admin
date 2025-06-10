'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

const CustomBox = styled(Box)(({ theme }) => ({
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    border: '1px solid #ccc'
}));

export const MyBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <CustomBox>{children}</CustomBox>;
};
