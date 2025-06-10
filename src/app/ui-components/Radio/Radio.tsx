'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const CustomRadio = styled(Radio)(({ theme }) => ({
    color: theme.palette.primary.main,
    '&.Mui-checked': {
        color: theme.palette.primary.main
    }
}));

export const MyRadioGroup: React.FC<{ label: string; options: string[] }> = ({ label, options }) => {
    const [value, setValue] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">{label}</FormLabel>
            <RadioGroup value={value} onChange={handleChange}>
                {options.map((option) => (
                    <FormControlLabel key={option} value={option} control={<CustomRadio />} label={option} />
                ))}
            </RadioGroup>
        </FormControl>
    );
};
