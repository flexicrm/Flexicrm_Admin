'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import MailIcon from '@mui/icons-material/Mail';

const CustomBadge = styled(Badge)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MyBadge: React.FC<{ count: number }> = ({ count }) => {
    return (
        <CustomBadge badgeContent={count} color="primary">
            <IconButton color="inherit">
                <MailIcon />
            </IconButton>
        </CustomBadge>
    );
};
