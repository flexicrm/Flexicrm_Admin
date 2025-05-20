'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const CustomImageList = styled(ImageList)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MyImageList: React.FC<{ items: { img: string; title: string }[] }> = ({ items }) => {
    return (
        <CustomImageList cols={3}>
            {items.map((item) => (
                <ImageListItem key={item.img}>
                    <img src={item.img} alt={item.title} loading="lazy" />
                </ImageListItem>
            ))}
        </CustomImageList>
    );
};
