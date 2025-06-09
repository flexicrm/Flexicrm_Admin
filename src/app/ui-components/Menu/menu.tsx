'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const CustomMenu = styled(Menu)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MyMenu: React.FC<{ anchorEl: null | HTMLElement; open: boolean; items: string[]; onClose: () => void }> = ({ anchorEl, open, items, onClose }) => {
    return (
        <CustomMenu anchorEl={anchorEl} open={open} onClose={onClose}>
            {items.map((item) => (
                <MenuItem key={item} onClick={onClose}>
                    {item}
                </MenuItem>
            ))}
        </CustomMenu>
    );
};
