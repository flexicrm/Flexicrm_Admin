'use client';

import React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const CustomTabs = styled(Tabs)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MyTabs: React.FC<{ value: number; onChange: (event: React.SyntheticEvent, newValue: number) => void; items: string[] }> = ({ value, onChange, items }) => {
    return (
        <CustomTabs value={value} onChange={onChange}>
            {items.map((item) => (
                <Tab key={item} label={item} />
            ))}
        </CustomTabs>
    );
};
