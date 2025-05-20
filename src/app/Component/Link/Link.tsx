'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';

const CustomLink = styled(Link)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MyLink: React.FC<{ href: string; text: string }> = ({ href, text }) => {
    return <CustomLink href={href}>{text}</CustomLink>;
};
