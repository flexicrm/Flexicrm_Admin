'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const CustomDialog = styled(Dialog)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MyDialog: React.FC<{ open: boolean; title: string; content: string; onClose: () => void }> = ({ open, title, content, onClose }) => {
    return (
        <CustomDialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </CustomDialog>
    );
};
