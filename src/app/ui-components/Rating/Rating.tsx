'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';

const CustomRating = styled(Rating)(({ theme }) => ({
    margin: theme.spacing(1)
    // color: theme.primary.main
}));

export const MyRating: React.FC = () => {
    const [value, setValue] = React.useState<number | null>(2);

    return (
        <CustomRating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        />
    );
};
