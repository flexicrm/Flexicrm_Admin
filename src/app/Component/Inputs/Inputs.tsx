'use client';
import { styled } from '@mui/material/styles';
import { TextField, InputLabel, OutlinedInput, Theme } from '@mui/material';

export const StyledTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        borderRadius: theme.shape.borderRadius,
        '& fieldset': {
            borderColor: theme.palette.divider
        },
        '&:hover fieldset': {
            borderColor: theme.palette.primary.main
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.main,
            borderWidth: 1
        }
    },
    '& .MuiInputLabel-root': {
        color: theme.palette.text.secondary,
        '&.Mui-focused': {
            color: theme.palette.primary.main
        }
    },
    [theme.breakpoints.down('sm')]: {
        '& .MuiInputBase-input': {
            fontSize: '0.875rem'
        }
    }
}));

export const StyledInputLabel = styled(InputLabel)(({ theme }) => ({
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
    '&.Mui-focused': {
        color: theme.palette.primary.main
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem'
    }
}));

export const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.divider
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
        borderWidth: 1
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
        padding: theme.spacing(1)
    }
}));
