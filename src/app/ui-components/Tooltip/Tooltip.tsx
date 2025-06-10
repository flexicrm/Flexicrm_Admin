'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

const CustomTooltip = styled(Tooltip)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MyTooltip: React.FC<{ title: string; children: React.ReactElement }> = ({ title, children }) => {
    return <CustomTooltip title={title}>{children}</CustomTooltip>;
};
