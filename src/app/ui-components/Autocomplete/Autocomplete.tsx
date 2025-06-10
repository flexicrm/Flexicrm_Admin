"use client";
import React from 'react';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const CustomAutocomplete = styled(Autocomplete)(({ theme }) => ({
    margin: theme.spacing(1),
    width: 300
}));

export const MyAutocomplete: React.FC<{ options: string[] }> = ({ options }) => {
    return <CustomAutocomplete options={options} renderInput={(params) => <TextField {...params} label="Autocomplete" />} />;
};
