// import React from 'react';
// import { styled } from '@mui/material/styles';
// import TextField from '@mui/material/TextField';

// const CustomTextField = styled(TextField)(({ theme }) => ({
//     margin: theme.spacing(1),
//     width: '25ch'
// }));

// export const MyTextField: React.FC<{ label: string }> = ({ label }) => {
//     return <CustomTextField label={label} variant="outlined" />;
// };
"use client"
import React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const CustomTextField = styled(TextField)(({ theme }) => ({
    margin: theme.spacing(1),
    width: '25ch'
}));

export const MyTextField: React.FC<{ label: string; variant?: 'filled' | 'outlined' | 'standard' }> = ({ label, variant = 'outlined' }) => {
    return <CustomTextField label={label} variant={variant} />;
};
