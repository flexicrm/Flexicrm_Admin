'use client';
import React, { useState, useContext, useRef } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import Cookies from 'js-cookie';
import { TextField, Button, Tabs, Tab, Box, Grid, MenuItem, Snackbar, Alert, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import userContext from '../../../../UseContext/UseContext';
import { API_BASE_URL } from '../../../../utils';

interface Address {
    street: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
}

interface FormValues {
    Companyname: string;
    GSTno: string;
    phone: string;
    Website: string;
    email: string;
    currency: string;
    address: Address;
    billigAddress: Address;
    shippingAddress: Address;
}

const currencyOptions = [
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'INR', value: 'INR' }
];

function TabPanel(props: { children?: React.ReactNode; value: number; index: number }) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
        </div>
    );
}

export default function Profiles() {
    const subdomain = Cookies.get('subdomain');
    const CustomerIddata = useContext(userContext);
    const accessToken = Cookies.get('accessToken');
    const [tabIndex, setTabIndex] = useState(0);
    const router = useRouter();
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success'
    });

    const formik = useFormik<FormValues>({
        initialValues: {
            Companyname: '',
            GSTno: '',
            phone: '',
            Website: '',
            email: '',
            currency: 'INR',
            address: {
                street: '',
                city: '',
                state: '',
                zipcode: '',
                country: ''
            },
            billigAddress: {
                street: '',
                city: '',
                state: '',
                zipcode: '',
                country: ''
            },
            shippingAddress: {
                street: '',
                city: '',
                state: '',
                zipcode: '',
                country: ''
            }
        },
        onSubmit: (values) => {
            handleSubmit(values);
        }
    });

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>, addressType: keyof Pick<FormValues, 'address' | 'billigAddress' | 'shippingAddress'>) => {
        const { name, value } = e.target;
        formik.setFieldValue(`${addressType}.${name}`, value);
    };

    const handleSubmit = async (values: FormValues) => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            const response = await axios.post(`${API_BASE_URL}/customer/${subdomain}`, values, { headers });
            const newCustomerId = response?.data?.data?.newcustomer;
            CustomerIddata.setCustomerId(newCustomerId);
            if (newCustomerId) {
                setSnackbar({ open: true, message: 'Your data has been submitted successfully.', severity: 'success' });
                router.push(`/${subdomain}/customers`);
            }
        } catch (error) {
            setSnackbar({ open: true, message: 'There was an error submitting your data.', severity: 'error' });
            // eslint-disable-next-line no-console
            console.error('Error submitting form:', error);
        }
    };

    const renderAddressFields = (addressType: keyof Pick<FormValues, 'address' | 'billigAddress' | 'shippingAddress'>) => (
        <Grid container spacing={2}>
            <Grid size={{ xs: 6 }}>
                <TextField fullWidth label="Street" name="street" value={formik.values[addressType].street} onChange={(e: any) => handleAddressChange(e, addressType)} margin="normal" />
            </Grid>
            <Grid size={{ xs: 6 }}>
                <TextField fullWidth label="City" name="city" value={formik.values[addressType].city} onChange={(e: any) => handleAddressChange(e, addressType)} margin="normal" />
            </Grid>
            <Grid size={{ xs: 6 }}>
                <TextField fullWidth label="State" name="state" value={formik.values[addressType].state} onChange={(e: any) => handleAddressChange(e, addressType)} margin="normal" />
            </Grid>
            <Grid size={{ xs: 6 }}>
                <TextField fullWidth label="Zipcode" name="zipcode" value={formik.values[addressType].zipcode} onChange={(e: any) => handleAddressChange(e, addressType)} margin="normal" />
            </Grid>
            <Grid size={{ xs: 6 }}>
                <TextField fullWidth label="Country" name="country" value={formik.values[addressType].country} onChange={(e: any) => handleAddressChange(e, addressType)} margin="normal" />
            </Grid>
        </Grid>
    );

    return (
        <Box sx={{ width: '100%' }}>
            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar((s) => ({ ...s, open: false }))} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <Tabs value={tabIndex} onChange={(_, idx) => setTabIndex(idx)} variant="scrollable" scrollButtons="auto">
                <Tab label="Customer Details" />
                <Tab label="Billing & Shipping" />
            </Tabs>
            <TabPanel value={tabIndex} index={0}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Company" id="Companyname" name="Companyname" value={formik.values.Companyname} onChange={formik.handleChange} margin="normal" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="GST" id="GSTno" name="GSTno" value={formik.values.GSTno} onChange={formik.handleChange} margin="normal" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Phone" id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} margin="normal" required />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} margin="normal" required />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField select fullWidth label="Currency" id="currency" name="currency" value={formik.values.currency} onChange={formik.handleChange} margin="normal">
                                {currencyOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="Website" id="Website" name="Website" value={formik.values.Website} onChange={formik.handleChange} margin="normal" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 12 }}>
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                Address
                            </Typography>
                            {renderAddressFields('address')}
                        </Grid>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Button type="submit" variant="contained" color="primary">
                                Submit
                            </Button>
                        </Box>
                    </Grid>
                </form>
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="subtitle1">Billing Form</Typography>
                            {renderAddressFields('billigAddress')}
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Typography variant="subtitle1">Shipping Form</Typography>
                            {renderAddressFields('shippingAddress')}
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Box sx={{ mt: 4, textAlign: 'center' }}>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </TabPanel>
        </Box>
    );
}
