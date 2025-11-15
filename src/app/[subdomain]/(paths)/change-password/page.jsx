'use client';
import React, { useState } from 'react';
import { Button, Container, Grid, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_BASE_URL } from '../../../utils';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function ChangePassword() {
    const subdomain = Cookies.get('subdomain');
    const accessToken = Cookies.get('crmaccess');
    const router = useRouter();
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState({
        old: false,
        new: false,
        confirm: false
    });

    const handleClickShowPassword = (field) => {
        setShowPassword({
            ...showPassword,
            [field]: !showPassword[field]
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'newPassword' || name === 'confirmPassword') {
            if (name === 'newPassword' && formData.confirmPassword && value !== formData.confirmPassword) {
                setErrors({
                    ...errors,
                    confirmPassword: 'Passwords do not match'
                });
            } else if (name === 'confirmPassword' && value !== formData.newPassword) {
                setErrors({
                    ...errors,
                    confirmPassword: 'Passwords do not match'
                });
            } else {
                setErrors({
                    ...errors,
                    confirmPassword: ''
                });
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        if (!formData.oldPassword) {
            newErrors.oldPassword = 'Old password is required';
            valid = false;
        }

        if (!formData.newPassword) {
            newErrors.newPassword = 'New password is required';
            valid = false;
        } else if (formData.newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters';
            valid = false;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
            valid = false;
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleUpdatePassword = async () => {
        if (!validateForm()) return;

        try {
            await axios.patch(
                `${API_BASE_URL}/user/${subdomain}/change-password`,
                {
                    oldPassword: formData.oldPassword,
                    newPassword: formData.newPassword
                },
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }
            );

            Swal.fire({
                icon: 'success',
                title: 'Password Updated',
                text: 'Your password has been updated successfully.'
            });
            router.push(`dashboard`);
            setFormData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error('Error updating password:', error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: error.response?.data?.message || 'Please try again.'
            });
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" color="primary" align="center" gutterBottom>
                    Update Password
                </Typography>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Old password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        type={showPassword.old ? 'text' : 'password'}
                        error={!!errors.oldPassword}
                        helperText={errors.oldPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle old password visibility" onClick={() => handleClickShowPassword('old')} edge="end">
                                        {showPassword.old ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="New Password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        type={showPassword.new ? 'text' : 'password'}
                        error={!!errors.newPassword}
                        helperText={errors.newPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle new password visibility" onClick={() => handleClickShowPassword('new')} edge="end">
                                        {showPassword.new ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        type={showPassword.confirm ? 'text' : 'password'}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle confirm password visibility" onClick={() => handleClickShowPassword('confirm')} edge="end">
                                        {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" color="primary" onClick={handleUpdatePassword} size="large" sx={{ mt: 2 }}>
                        Update Password
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
