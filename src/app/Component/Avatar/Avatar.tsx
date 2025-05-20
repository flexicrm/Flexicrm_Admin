'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';

const CustomAvatar = styled(Avatar)(({ theme }) => ({
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
}));

export const MyAvatar: React.FC<{ alt: string; src?: string }> = ({ alt, src }) => {
    return <CustomAvatar alt={alt} src={src} />;
};
