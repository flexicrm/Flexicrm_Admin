'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const CustomBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MyBreadcrumbs: React.FC<{ items: string[] }> = ({ items }) => {
    return (
        <CustomBreadcrumbs>
            {items.map((item, index) => (
                <Link key={item} color={index === items.length - 1 ? 'text.primary' : 'inherit'} href="/">
                    {item}
                </Link>
            ))}
        </CustomBreadcrumbs>
    );
};
