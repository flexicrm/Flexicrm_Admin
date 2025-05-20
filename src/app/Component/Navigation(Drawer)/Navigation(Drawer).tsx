'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { ListItem } from '@mui/material';

const CustomDrawer = styled(Drawer)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MyDrawer: React.FC<{ open: boolean; items: string[]; onClose: () => void }> = ({ open, items, onClose }) => {
    return (
        <CustomDrawer open={open} onClose={onClose}>
            <List>
                {items.map((item) => (
                    <ListItem component="div" key={item}>
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </List>
        </CustomDrawer>
    );
};
