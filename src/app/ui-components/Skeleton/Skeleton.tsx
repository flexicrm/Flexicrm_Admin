'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';

const CustomSkeleton = styled(Skeleton)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MySkeleton: React.FC<{ variant: 'text' | 'rectangular' | 'circular'; width: number; height: number }> = ({ variant, width, height }) => {
    return <CustomSkeleton variant={variant} width={width} height={height} />;
};
