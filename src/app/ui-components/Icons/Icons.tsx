'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Icon from '@mui/material/Icon';

const CustomIcon = styled(Icon)(({ theme }) => ({
    margin: theme.spacing(1),
    color: theme.palette.primary.main
}));

export const MyIcon: React.FC<{ name: string }> = ({ name }) => {
    return <CustomIcon>{name}</CustomIcon>;
};
