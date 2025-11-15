'use client';
import React, { useEffect, useState, useRef, useContext, useCallback } from 'react';
import { Button, Dialog, TextField, MenuItem, Checkbox, FormControlLabel, Snackbar, Alert, Grid, Typography, Box, InputAdornment } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import userContext from '../../../UseContext/UseContext';
import { API_BASE_URL } from '../../../utils';

const fieldTypes = [
    { name: 'Text', code: 'text' },
    { name: 'Calendar', code: 'calendar' },
    { name: 'Number', code: 'number' },
    { name: 'Telephone', code: 'telephone' },
    { name: 'Password', code: 'password' }
];

const CustomizedLeadPage = () => {
    const [dialogVisible, setDialogVisible] = useState(false);
    const [fieldName, setFieldName] = useState('');
    const [fieldType, setFieldType] = useState('');
    const [required, setRequired] = useState(false);
    const [fields, setFields] = useState({});
    const [data, setData] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const { setValues } = useContext(userContext);
    const subdomain = Cookies.get('subdomain');
    const accessToken = Cookies.get('crmaccess');

    const handleSubmit = async () => {
        if (!fieldName || !fieldType) {
            setSnackbarMessage('Field Name and Type are required!');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        const newField = {
            fieldName,
            fieldType,
            required,
            value: ''
        };

        setFields((prevFields) => ({
            ...prevFields,
            [fieldName]: newField
        }));

        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            await axios.post(
                `${API_BASE_URL}/customefield/${subdomain}`,
                {
                    fieldName: newField.fieldName,
                    fieldType: newField.fieldType,
                    required: newField.required,
                    schemaName: 'lead'
                },
                { headers }
            );

            setSnackbarMessage('Field added successfully!');
            setSnackbarSeverity('success');
            setSnackbarOpen(true);
            fetchData();
        } catch (error) {
            console.error('Submission error:', error);
            setSnackbarMessage('Failed to add field!');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }

        setFieldName('');
        setFieldType('');
        setRequired(false);
        setDialogVisible(false);
    };

    const handleFieldChange = (fieldName, value) => {
        setValues((prevValues) => {
            const existingFieldIndex = prevValues.findIndex((item) => item.label === fieldName);

            if (existingFieldIndex >= 0) {
                const updatedValues = [...prevValues];
                updatedValues[existingFieldIndex].value = value;
                return updatedValues;
            } else {
                return [...prevValues, { label: fieldName, value: value }];
            }
        });
        setFields((prevFields) => ({
            ...prevFields,
            [fieldName]: {
                ...prevFields[fieldName],
                value
            }
        }));
    };

    const fetchData = useCallback(async () => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            const response = await axios.get(`${API_BASE_URL}/customefield/${subdomain}/lead`, { headers });
            setData(response.data.data.custmefields);
        } catch (error) {
            console.error('Error fetching data:', error);
            setSnackbarMessage('Failed to fetch data!');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
        }
    }, [accessToken, subdomain]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box sx={{ padding: '20px' }}>
            <Button variant="contained" onClick={() => setDialogVisible(true)}>
                Add Custom Field
            </Button>

            <Dialog open={dialogVisible} onClose={() => setDialogVisible(false)}>
                <Box sx={{ padding: '20px' }}>
                    <Typography variant="h6" gutterBottom>
                        Add Custom Field
                    </Typography>
                    <TextField label="Field Name" value={fieldName} onChange={(e) => setFieldName(e.target.value)} fullWidth margin="normal" />
                    <TextField select label="Field Type" value={fieldType} onChange={(e) => setFieldType(e.target.value)} fullWidth margin="normal">
                        {fieldTypes.map((type) => (
                            <MenuItem key={type.code} value={type.code}>
                                {type.name}
                            </MenuItem>
                        ))}
                    </TextField>
                    <FormControlLabel control={<Checkbox checked={required} onChange={(e) => setRequired(e.target.checked)} />} label="Required" />
                    <Button variant="contained" onClick={handleSubmit} sx={{ mt: 2 }}>
                        Submit
                    </Button>
                </Box>
            </Dialog>

            <Grid container spacing={2}>
                {data?.map((field, index) => (
                    <Grid size={{sm:12,md:6}} key={index}>
                        <Typography variant="subtitle1" gutterBottom>
                            {field.fieldName}
                        </Typography>
                        <TextField
                            type={field.fieldType}
                            value={fields[field.fieldName]?.value || ''}
                            onChange={(e) => handleFieldChange(field.fieldName, e.target.value)}
                            fullWidth
                            required={field.required}
                            InputProps={{
                                endAdornment: field.required && (
                                    <InputAdornment position="end">
                                        <Typography color="error">(Required)</Typography>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                ))}
            </Grid>

            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CustomizedLeadPage;
