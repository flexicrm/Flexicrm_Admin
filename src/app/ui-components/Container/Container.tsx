'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';

const CustomContainer = styled(Container)(({ theme }) => ({
    margin: theme.spacing(1),
    padding: theme.spacing(2),
    border: '1px solid #ccc'
}));

export const MyContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <CustomContainer>{children}</CustomContainer>;
};
