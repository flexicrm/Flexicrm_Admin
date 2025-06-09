'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';

const CustomPagination = styled(Pagination)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MyPagination: React.FC<{ count: number; page: number; onChange: (event: React.ChangeEvent<unknown>, page: number) => void }> = ({ count, page, onChange }) => {
    return <CustomPagination count={count} page={page} onChange={onChange} />;
};
