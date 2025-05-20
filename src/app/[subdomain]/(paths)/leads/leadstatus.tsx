'use client';
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../utils';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, CircularProgress, Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

interface LeadStatusType {
    _id: string;
    statusName: string;
    color: string;
}

interface LeadStatusProps {
    onSelect: (id: string) => void;
    leadStatus: any;
}

const LeadStatus: React.FC<LeadStatusProps> = ({ onSelect, leadStatus }) => {
    const [leadstatus, setLeadStatus] = useState<LeadStatusType[]>([]);
    const [isAddingNewSource, setIsAddingNewSource] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const accessToken = Cookies.get('accessToken');
    const subdomain = Cookies.get('subdomain');
    console.log(onSelect, 'onSelect');
    // Set default values if leadStatus is provided
    useEffect(() => {
        if (leadStatus?.leadstatus) {
            formik.setFieldValue('statusName', leadStatus.leadstatus._id || '');
            formik.setFieldValue('color', `#${leadStatus.leadstatus.color || '000000'}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [leadStatus]);
    console.log(leadStatus, 'leadStatus>>>>>>>>>>>>>>>>>>>>>>>');

    const formik = useFormik({
        initialValues: { statusName: leadStatus?.leadstatus?._id || '', color: '#000000' },
        onSubmit: async (values, { resetForm }) => {
            const newLeadSource = values.statusName;
            const colors = values.color;

            const headers = { Authorization: `Bearer ${accessToken}` };

            try {
                setLoading(true);
                await axios.post(`${API_BASE_URL}/leadstatus/${subdomain}`, { statusName: newLeadSource, color: colors.replace('#', '') }, { headers });
                resetForm();
                setIsAddingNewSource(false);
                setError('');
                fetchLeadSources();
            } catch (error) {
                setError('Error adding new lead source. Please try again.');
                console.error('Error adding new lead source:', error);
            } finally {
                setLoading(false);
            }
        }
    });

    const fetchLeadSources = async () => {
        setError('');
        const headers = { Authorization: `Bearer ${accessToken}` };

        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/leadstatus/${subdomain}`, { headers });
            setLeadStatus(response?.data?.data || []);
        } catch (error) {
            setLeadStatus([]);
            setError('Error fetching lead sources.');
            console.error('Error fetching lead sources:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (subdomain && accessToken) {
            fetchLeadSources();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subdomain, accessToken]);

    const UsersOptions = useMemo(
        () =>
            leadstatus.map((lead) => ({
                label: lead.statusName,
                value: lead._id,
                color: lead.color
            })),
        [leadstatus]
    );

    return (
        <>
            <Box display="flex" alignItems="center" mb={2}>
                {!isAddingNewSource && (
                    <>
                        <FormControl sx={{ minWidth: 200 }} fullWidth size="small">
                            <InputLabel id="lead-status-label">Select Lead Status</InputLabel>
                            <Select
                                labelId="lead-status-label"
                                value={formik.values.statusName}
                                label="Select Lead Status"
                                onChange={(e) => {
                                    const selectedValue = e.target.value;
                                    if (selectedValue === 'addNew') {
                                        setIsAddingNewSource(true);
                                        formik.setFieldValue('statusName', '');
                                    } else {
                                        onSelect(selectedValue as string);
                                        formik.setFieldValue('statusName', selectedValue);
                                    }
                                }}
                                renderValue={(selected) => {
                                    const option = UsersOptions?.find((opt) => opt.value === selected);
                                    return option ? (
                                        <Box display="flex" alignItems="center">
                                            <Box
                                                sx={{
                                                    width: 16,
                                                    height: 16,
                                                    borderRadius: '50%',
                                                    bgcolor: `#${option.color}`,
                                                    mr: 1
                                                }}
                                            />
                                            {option.label}
                                        </Box>
                                    ) : (
                                        <span>Select Lead Status</span>
                                    );
                                }}
                            >
                                {UsersOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        <Box display="flex" alignItems="center">
                                            <Box
                                                sx={{
                                                    width: 16,
                                                    height: 16,
                                                    borderRadius: '50%',
                                                    bgcolor: `#${option.color}`,
                                                    mr: 1
                                                }}
                                            />
                                            {option.label}
                                        </Box>
                                    </MenuItem>
                                ))}
                                <MenuItem value="addNew">
                                    <Box display="flex" alignItems="center">
                                        <AddIcon fontSize="small" sx={{ mr: 1 }} />
                                        Add New Status
                                    </Box>
                                </MenuItem>
                            </Select>
                        </FormControl>
                        {/* <IconButton sx={{ ml: 2 }} onClick={() => setIsAddingNewSource(true)}>
                            <AddIcon />
                        </IconButton> */}
                        {/* <Button variant="contained" color="primary" onClick={() => setIsAddingNewSource(true)} sx={{ minWidth: 40, ml: 1 }}>
                            +
                        </Button> */}
                    </>
                )}
                {isAddingNewSource && (
                    <Box display="flex" alignItems="center">
                        <TextField name="statusName" id="statusName" placeholder="New status Name" value={formik.values.statusName} onChange={formik.handleChange} required sx={{ ml: 1 }} />
                        <input type="color" id="color" name="color" value={formik.values.color} onChange={formik.handleChange} style={{ marginLeft: 8, width: 40, height: 40, border: 'none', background: 'none' }} />
                        <IconButton color="primary" onClick={formik.handleSubmit as any} disabled={loading} sx={{ ml: 1 }}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => setIsAddingNewSource(false)} disabled={loading}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                )}
            </Box>
            {formik.touched.statusName && formik.errors.statusName && typeof formik.errors.statusName === 'string' && <Typography color="error">{formik.errors.statusName}</Typography>}
            {loading && (
                <Box display="flex" alignItems="center">
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    <Typography>Loading...</Typography>
                </Box>
            )}
            {error && <Typography color="error">{error}</Typography>}
        </>
    );
};

export default LeadStatus;
