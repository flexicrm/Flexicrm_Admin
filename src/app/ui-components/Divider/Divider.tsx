'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

const CustomDivider = styled(Divider)(({ theme }) => ({
    margin: theme.spacing(2, 0)
}));

export const MyDivider: React.FC = () => {
    return <CustomDivider />;
};
