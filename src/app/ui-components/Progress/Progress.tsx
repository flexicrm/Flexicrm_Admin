'use client';

import React from 'react';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

const CustomCircularProgress = styled(CircularProgress)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MyCircularProgress: React.FC = () => {
    return <CustomCircularProgress />;
};
