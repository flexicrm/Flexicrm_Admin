'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CustomAccordion = styled(Accordion)(({ theme }) => ({
    margin: theme.spacing(1)
}));

export const MyAccordion: React.FC<{ title: string; content: string }> = ({ title, content }) => {
    return (
        <CustomAccordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{content}</Typography>
            </AccordionDetails>
        </CustomAccordion>
    );
};
