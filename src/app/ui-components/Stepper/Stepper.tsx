'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const CustomStepper = styled(Stepper)(({ theme }) => ({
    margin: theme.spacing(1),
    color: 'white',
    '& .MuiStepLabel-label': {
        color: 'white'
    },
    '& .MuiStepLabel-label.Mui-active': {
        color: 'white'
    },
    '& .MuiStepLabel-label.Mui-completed': {
        color: 'white'
    },
    '& .MuiStepIcon-root': {
        color: 'white'
    },
    '& .MuiStepIcon-root.Mui-active': {
        color: 'white'
    },
    '& .MuiStepIcon-root.Mui-completed': {
        color: 'white'
    }
}));

export const MyStepper: React.FC<{ steps: string[]; activeStep: number }> = ({ steps, activeStep }) => {
    return (
        <CustomStepper activeStep={activeStep}>
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </CustomStepper>
    );
};
