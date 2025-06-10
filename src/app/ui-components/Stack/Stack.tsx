'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

const CustomStack = styled(Stack)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MyStack: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <CustomStack spacing={2}>{children}</CustomStack>;
};
