'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CustomCard = styled(Card)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MyCard: React.FC<{ title: string; content: string }> = ({ title, content }) => {
    return (
        <CustomCard>
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
            </CardContent>
        </CustomCard>
    );
};
