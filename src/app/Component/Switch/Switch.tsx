// import React from 'react';
// import { styled } from '@mui/material/styles';
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';

// const CustomSwitch = styled(Switch)(({ theme }) => ({
//     '& .MuiSwitch-switchBase.Mui-checked': {
//         color: theme.palette.primary.main
//     },
//     '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
//         backgroundColor: theme.palette.primary.main
//     }
// }));

// export const MySwitch: React.FC<{ label: string }> = ({ label }) => {
//     return <FormControlLabel control={<CustomSwitch />} label={label} />;
// };

"use client"
import React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

const CustomSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
        // color: theme.palette.primary.main
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: theme.palette.primary.main
    }
}));

export const MySwitch: React.FC<{ label: string }> = ({ label }) => {
    return <FormControlLabel control={<CustomSwitch />} label={label} />;
};
