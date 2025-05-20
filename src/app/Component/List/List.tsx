'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const CustomList = styled(List)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MyList: React.FC<{ items: string[] }> = ({ items }) => {
    return (
        <CustomList>
            {items.map((item) => (
                <ListItem key={item}>
                    <ListItemText primary={item} />
                </ListItem>
            ))}
        </CustomList>
    );
};
