'use client';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { Theme } from '@mui/material';

export const PrimaryButton = styled(Button)<ButtonProps>(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1.5, 3),
    borderRadius: theme.shape.borderRadius,
    textTransform: 'none',
    fontWeight: 600,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark
    },
    '&:disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
        color: theme.palette.action.disabled
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1, 2),
        fontSize: '0.875rem'
    }
}));

export const SecondaryButton = styled(Button)<ButtonProps>(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    border: `1px solid ${theme.palette.primary.main}`,
    padding: theme.spacing(1.5, 3),
    borderRadius: theme.shape.borderRadius,
    textTransform: 'none',
    fontWeight: 600,
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        borderColor: theme.palette.primary.dark
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1, 2),
        fontSize: '0.875rem'
    }
}));

export const TextButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.primary.main,
    padding: theme.spacing(1, 2),
    textTransform: 'none',
    fontWeight: 600,
    '&:hover': {
        backgroundColor: 'transparent',
        textDecoration: 'underline'
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem'
    }
}));

// import React from 'react';
// import { styled } from '@mui/material/styles';
// import Button from '@mui/material/Button';

const CustomButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MyButton: React.FC<{
    children: React.ReactNode;
    variant?: 'text' | 'outlined' | 'contained';
    color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
    size?: 'small' | 'large';
    disabled?: boolean;
    startIcon?: any;
    autoFocus?: boolean;
    type?: any;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ children, variant = 'contained', color = 'primary', disabled = false, onClick, size = 'small', startIcon, autoFocus, type }) => {
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) return;
        console.log('Custom logic before onClick');
        if (onClick) onClick(event);
        console.log('Custom logic after onClick');
    };

    return (
        <CustomButton
            autoFocus={autoFocus}
            startIcon={startIcon}
            type={type}
            sx={{
                height: '12px',
                // width: '12px',
                borderRadius: '5px',
                margin: '0px',
                marginTop: '5px',
                marginLeft: '5px',
                // padding: '0px',
                fontSize: '12px',
                minHeight: '35px',
                // minWidth: '80px',
                transition: 'all 0.3s ease',
                '&.Mui-selected': {
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    boxShadow: 1
                },
                '&:hover': {
                    bgcolor: 'action.hover'
                },
                '&.Mui-selected:hover': {
                    bgcolor: 'primary.dark'
                }
            }}
            variant={variant}
            size={size}
            color={color}
            disabled={disabled}
            onClick={handleClick}
        >
            {children}
        </CustomButton>
    );
};
