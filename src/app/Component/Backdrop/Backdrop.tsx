'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const CustomBackdrop = styled(Backdrop)(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
}));

export const MyBackdrop: React.FC<{ open: boolean }> = ({ open }) => {
    return (
        <CustomBackdrop open={open}>
            <CircularProgress color="inherit" />
        </CustomBackdrop>
    );
};
