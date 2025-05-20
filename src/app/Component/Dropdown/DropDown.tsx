// import React from 'react';
// import { styled } from '@mui/material/styles';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';

// const CustomSelect = styled(Select)(({ theme }) => ({
//     margin: theme.spacing(1),
//     minWidth: 120
// }));

// export const MySelect: React.FC<{ label: string; options: string[] }> = ({ label, options }) => {
//     const [value, setValue] = React.useState('');

//     const handleChange = (event: SelectChangeEvent) => {
//         setValue(event.target.value);
//     };

//     return (
//         <FormControl>
//             <InputLabel id="select-label">{label}</InputLabel>
//             <CustomSelect labelId="select-label" value={value} onChange={handleChange} label={label}>
//                 {options.map((option) => (
//                     <MenuItem key={option} value={option}>
//                         {option}
//                     </MenuItem>
//                 ))}
//             </CustomSelect>
//         </FormControl>
//     );
// };
"use client"
import React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const CustomSelect = styled(Select)(({ theme }) => ({
    margin: theme.spacing(1),
    minWidth: 120
}));

export const MySelect: React.FC<{ label: string; options: string[] }> = ({ label, options }) => {
    const [value, setValue] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    };

    return (
        <FormControl>
            <InputLabel id="select-label">{label}</InputLabel>
            <CustomSelect labelId="select-label" value={value} onChange={handleChange} label={label}>
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </CustomSelect>
        </FormControl>
    );
};
