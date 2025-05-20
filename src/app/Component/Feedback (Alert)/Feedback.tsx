'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';

const CustomAlert = styled(Alert)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MyAlert: React.FC<{ message: string; severity: 'error' | 'warning' | 'info' | 'success' }> = ({ message, severity }) => {
    return <CustomAlert severity={severity}>{message}</CustomAlert>;
};
