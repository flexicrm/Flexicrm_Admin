'use client';
import React, { useState, useEffect } from 'react';
import {
    Box, Grid, TextField, Typography, MenuItem, InputAdornment, Divider,
    CardContent, Checkbox, FormControlLabel
} from '@mui/material';
import {
    Person as PersonIcon, Email as EmailIcon, Lock as LockIcon,
    Business as BusinessIcon, Public as CountryIcon, LocationCity as CityIcon,
    Work as RoleIcon, AttachMoney as MoneyIcon
} from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { MyButton } from "../../../ui-components/Buttons/Buttons";
import { MySnackbar } from '../../../ui-components/Snackbar/Snackbar';
import { API_BASE_URL } from "../../../utils";

const AddUserForm = ({ user, onUserSaved, onClose }) => {
    const subdomain = Cookies.get('subdomain');
    const accessToken = Cookies.get('crmaccess');
    const isEditMode = !!user;

    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        const fetchRoles = async () => {
            try {
                const headers = { Authorization: `Bearer ${accessToken}` };
                const res = await axios.get(`${API_BASE_URL}/roleandpermission/${subdomain}/all-roles-permissions`, { headers });
                setRoles(res.data?.data || []);
            } catch (err) {
                console.error("Error fetching roles:", err);
            }
        };
        if (subdomain && accessToken) fetchRoles();
    }, [subdomain, accessToken]);

    const formik = useFormik({
        initialValues: {
            firstname: user?.firstname || '',
            lastname: user?.lastname || '',
            mobile: user?.mobile || '',
            email: user?.email || '',
            userRole: user?.userRole || '',
            password: '',
            salaryPerMonth: user?.salaryPerMonth || '',
            company: user?.company || '',
            address: {
                street: user?.address?.street || '',
                city: user?.address?.city || '',
                state: user?.address?.state || '',
                zipCode: user?.address?.zipCode || '',
                country: user?.address?.country || '',
            },
            permissions: user?.permissions || {},
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            firstname: Yup.string().required('First name is required'),
            lastname: Yup.string().required('Last name is required'),
            mobile: Yup.string().required('Mobile number is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            userRole: Yup.string().required('User role is required'),
            password: isEditMode
                ? Yup.string().nullable()
                : Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
            salaryPerMonth: Yup.number().required('Salary is required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const headers = { Authorization: `Bearer ${accessToken}` };
                const payload = {
                    ...values,
                    attendanceList: user?.attendanceList || [],
                    createdBy: user?.createdBy || 'creator_user_id',
                    deleted: false,
                };

                if (isEditMode) {
                    // PATCH: Update user
                    await axios.patch(`${API_BASE_URL}/user/${subdomain}/${user._id}`, payload, { headers });
                    setSnackbar({ open: true, message: 'User updated successfully!', severity: 'success' });
                } else {
                    // POST: Add new user
                    await axios.post(`${API_BASE_URL}/user/${subdomain}/adduser`, payload, { headers });
                    setSnackbar({ open: true, message: 'User created successfully!', severity: 'success' });
                    resetForm();
                    setPermissions({});
                }

                if (onUserSaved) onUserSaved();
            } catch (err) {
                setSnackbar({
                    open: true,
                    message: isEditMode ? 'Failed to update user.' : 'Failed to create user.',
                    severity: 'error',
                });
            }
        },
    });

    // Sync permissions when role changes
    useEffect(() => {
        if (formik.values.userRole) {
            const selectedRole = roles.find(r => r.userRole === formik.values.userRole);
            const rolePermissions = selectedRole?.permissions || {};
            setPermissions(rolePermissions);
            formik.setFieldValue("permissions", rolePermissions);
        }
    }, [formik.values.userRole, roles]);

    const handlePermissionChange = (module, key) => {
        const updated = {
            ...permissions,
            [module]: {
                ...permissions[module],
                [key]: !permissions[module]?.[key],
            },
        };
        setPermissions(updated);
        formik.setFieldValue("permissions", updated);
    };

    return (
        <Box>
            <CardContent sx={{ p: 2 }}>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                    {isEditMode ? 'Edit User' : 'Create New User'}
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                    {/* === PERSONAL INFO === */}
                    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>Personal Information</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth size="small" label="First Name" name="firstname" value={formik.values.firstname}
                                onChange={formik.handleChange} error={formik.touched.firstname && Boolean(formik.errors.firstname)}
                                helperText={formik.touched.firstname && formik.errors.firstname}
                                InputProps={{ startAdornment: <InputAdornment position="start"><PersonIcon fontSize="small" /></InputAdornment> }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth size="small" label="Last Name" name="lastname" value={formik.values.lastname}
                                onChange={formik.handleChange} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <PhoneInput country={'in'} value={formik.values.mobile}
                                onChange={(val) => formik.setFieldValue('mobile', val)}
                                inputStyle={{ width: '100%', height: '38px' }} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth size="small" label="Email" name="email" value={formik.values.email}
                                onChange={formik.handleChange}
                                InputProps={{ startAdornment: <InputAdornment position="start"><EmailIcon fontSize="small" /></InputAdornment> }}
                            />
                        </Grid>
                        {!isEditMode && (
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth size="small" type="password" label="Password" name="password"
                                    value={formik.values.password} onChange={formik.handleChange}
                                    InputProps={{ startAdornment: <InputAdornment position="start"><LockIcon fontSize="small" /></InputAdornment> }}
                                />
                            </Grid>
                        )}
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    {/* === WORK INFO === */}
                    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>Work Information</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField select fullWidth size="small" label="User Role" name="userRole"
                                value={formik.values.userRole} onChange={formik.handleChange}>
                                <MenuItem value="">Select User Role</MenuItem>
                                {roles.map((role) => (
                                    <MenuItem key={role._id} value={role.userRole}>{role.userRole}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth size="small" label="Company ID" name="company" value={formik.values.company}
                                onChange={formik.handleChange}
                                InputProps={{ startAdornment: <InputAdornment position="start"><BusinessIcon fontSize="small" /></InputAdornment> }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField fullWidth size="small" label="Salary Per Month" name="salaryPerMonth"
                                value={formik.values.salaryPerMonth} onChange={formik.handleChange}
                                InputProps={{ startAdornment: <InputAdornment position="start"><MoneyIcon fontSize="small" /></InputAdornment> }}
                            />
                        </Grid>
                    </Grid>

                    {/* === PERMISSIONS === */}
                    {Object.keys(permissions).length > 0 && (
                        <>
                            <Divider sx={{ my: 3 }} />
                            <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>Role Permissions</Typography>
                            {Object.entries(permissions).map(([module, perms]) => (
                                <Box key={module} sx={{ mb: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>{module}</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                                        {["canCreate", "canRead", "canUpdate", "canDelete"].map((key) => (
                                            <FormControlLabel key={key}
                                                control={<Checkbox checked={!!perms[key]} onChange={() => handlePermissionChange(module, key)} size="small" />}
                                                label={key.replace("can", "")}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            ))}
                        </>
                    )}
                    <Divider sx={{ my: 3 }} />
                    <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>Address Details</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="Street" name="address.street" value={formik.values.address.street} onChange={formik.handleChange} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="City" name="address.city" value={formik.values.address.city} onChange={formik.handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><CityIcon fontSize="small" /></InputAdornment> }} /></Grid>
                        <Grid item xs={12} sm={6}><TextField fullWidth size="small" label="State" name="address.state" value={formik.values.address.state} onChange={formik.handleChange} /></Grid>
                        <Grid item xs={12} sm={3}><TextField fullWidth size="small" label="Zip Code" name="address.zipCode" value={formik.values.address.zipCode} onChange={formik.handleChange} /></Grid>
                        <Grid item xs={12} sm={3}><TextField fullWidth size="small" label="Country" name="address.country" value={formik.values.address.country} onChange={formik.handleChange} InputProps={{ startAdornment: <InputAdornment position="start"><CountryIcon fontSize="small" /></InputAdornment> }} /></Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'end', mt: 4, gap: 2 }}>
                        <MyButton onClick={onClose}>Cancel</MyButton>
                        <MyButton type="submit" variant="contained" color="primary">
                            {isEditMode ? 'Update User' : 'Create User'}
                        </MyButton>
                    </Box>
                </form>
            </CardContent>

            <MySnackbar open={snackbar.open} message={snackbar.message} severity={snackbar.severity}
                onClose={() => setSnackbar({ ...snackbar, open: false })} />
        </Box>
    );
};

export default AddUserForm;