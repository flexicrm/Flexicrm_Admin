'use client';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { TextField, Button, Snackbar, Alert, Box, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../../utils';

interface ConvertCustomerProps {
    currentLead: any;
    setConvertFormVisible: (visible: boolean) => void;
    convertid: string;
    leadStatus: Array<{ _id: string; statusName: string }>;
    fetchDatas: () => void;
}

const ConvertCustomer: React.FC<ConvertCustomerProps> = ({ currentLead, setConvertFormVisible, convertid, leadStatus, fetchDatas }) => {
    const convertedStatus = leadStatus?.find((item) => item.statusName === 'Converted');
    const [status] = useState<string | null>(convertedStatus ? convertedStatus._id : null);
    const accessToken = Cookies.get('accessToken');
    const subdomain = Cookies.get('subdomain');

    // Snackbar state
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({ open: false, message: '', severity: 'success' });

    const handleSnackbarClose = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const values = {
            Companyname: currentLead?.manualData?.company,
            email: currentLead?.manualData?.email,
            phone: currentLead?.manualData?.mobileNo
        };

        const headers = { Authorization: `Bearer ${accessToken}` };

        try {
            await axios.post(`${API_BASE_URL}/customer/${subdomain}`, values, { headers });
            setSnackbar({
                open: true,
                message: 'Your data has been submitted successfully.',
                severity: 'success'
            });
            await Convertedfetch();
            // setConvertFormVisible(false);
            setConvertFormVisible(false);
            fetchDatas();
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'There was an error submitting your data.',
                severity: 'error'
            });
            // eslint-disable-next-line no-console
            console.error('Error submitting form:', error);
        }
    };

    const Convertedfetch = async () => {
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const res = await axios.put(`${API_BASE_URL}/lead/converted/${subdomain}/${convertid}`, { leadstatus: status }, { headers });
            const data = res.data.data.message;
            setSnackbar({
                open: true,
                message: data,
                severity: 'success'
            });
            fetchDatas();
        } catch (error) {
            // Optionally handle error
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
            <Typography>
                <TextField label="Company" name="company" required value={currentLead?.manualData?.company || ''} disabled fullWidth margin="normal" />
            </Typography>
            <Typography sx={{ mt: 2, mb: 2 }}>
                <TextField label="Email" name="email" required value={currentLead?.manualData?.email || ''} disabled fullWidth margin="normal" />
            </Typography>
            <Typography>
                <TextField label="Mobile No" name="mobileNo" required value={currentLead?.manualData?.mobileNo || ''} disabled fullWidth margin="normal" />
            </Typography>
            <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                Add to Customer
            </Button>
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ConvertCustomer;
