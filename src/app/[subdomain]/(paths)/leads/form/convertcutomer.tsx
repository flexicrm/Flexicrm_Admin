'use client';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { TextField, Button, Snackbar, Alert, Box, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../../utils';
import { MyButton } from '../../../../Component/Buttons/Buttons';

interface ConvertCustomerProps {
    currentLead: any;
    setConvertFormVisible: (visible: boolean) => void;
    convertid: string;
    leadStatus: any;
    // fetchDatas: () => void;
}

const ConvertCustomer: React.FC<ConvertCustomerProps> = ({ currentLead, setConvertFormVisible, convertid, leadStatus }) => {
    console.log(convertid, 'currentLead??"??"?>""');

    console.log(currentLead, 'currentLead??"??"?>""');
    console.log(typeof leadStatus, leadStatus); // Check type and content

    const leadStatusArray = Array.isArray(leadStatus) ? leadStatus : [];
    const convertedStatus = leadStatusArray.find((item) => item.statusName === 'Converted');

    console.log(convertedStatus, 'convertedStatus');

    // const convertedStatus = leadStatus?.find((item) => item.statusName === 'Converted');
    // console.log(convertedStatus, 'convertedStatus');
    const [status] = useState<string | null>(convertedStatus ? convertedStatus._id : null);
    // const status = 'status';
    console.log(leadStatus, 'convertedStatus');

    const accessToken = Cookies.get('crmaccess');
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
            Companyname: currentLead?.Company || currentLead?.manualData?.company || '',
            email: currentLead?.Email || currentLead?.manualData?.email || '',
            phone: currentLead?.Phone || currentLead?.manualData?.mobileNo || ''
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
            // fetchDatas();
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
            // fetchDatas();
        } catch (error) {
            // Optionally handle error
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
            <Typography>
                <TextField label="Company" name="company" required value={currentLead?.Company || currentLead?.manualData?.company || ''} disabled fullWidth margin="normal" />
            </Typography>
            <Typography sx={{ mt: 2, mb: 2 }}>
                <TextField label="Email" name="email" required value={currentLead?.Email || currentLead?.manualData?.email || ''} disabled fullWidth margin="normal" />
            </Typography>
            <Typography>
                <TextField label="Mobile No" name="mobileNo" required value={currentLead?.Phone || currentLead?.manualData?.mobileNo || ''} disabled fullWidth margin="normal" />
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                <MyButton variant="contained" color="primary" type="submit">
                    Add to Customer
                </MyButton>
            </Box>
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ConvertCustomer;
