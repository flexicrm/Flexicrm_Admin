'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

const CustomGrid = styled(Grid)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MyGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <CustomGrid container spacing={2}>
            {children}
        </CustomGrid>
    );
};
