'use client';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { Box, Button, TextField, Typography } from '@mui/material';
import { ResetPassword } from '../../../../api/auth';
import userContext from '../../UseContext/UseContext';
import Cookies from 'js-cookie';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [subdomain2, setSubdomain2] = useState('');

    const contextvalue = useContext(userContext);
    const { flexilogo } = contextvalue;

    useEffect(() => {
        const sub = Cookies.get('subdomain');
        if (sub) setSubdomain2(sub);
    }, []);

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email.toLowerCase());
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address');
            setLoading(false);
            return;
        }

        try {
            const response = await ResetPassword(subdomain2, { email });
            if (response.success) {
                setMessage(response.data.message || 'Password reset link has been sent to your email');
            } else {
                setError(response.data.errors || 'Failed to send reset email');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', textAlign: 'center' }}>
            {flexilogo?.logo ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                    <Box component="img" src={flexilogo.logo} alt="Logo" sx={{ width: 140, height: 'auto' }} />
                </Box>
            ) : (
                subdomain2 && (
                    <Typography variant="h6" gutterBottom sx={{ mb: '32px', fontWeight: 'bold', textTransform: 'capitalize ' }}>
                        {subdomain2.replace(/-/g, ' ')}
                    </Typography>
                )
            )}

            <Typography variant="h4" gutterBottom>
                Forgot Your Password
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, textAlign: 'start' }}>
                {`Enter your email and we'll send you a link to reset your password.`}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                {error && (
                    <Typography color="error" align="center" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}
                {message && (
                    <Typography align="center" sx={{ mb: 2, color: 'green' }}>
                        {message}
                    </Typography>
                )}

                <TextField
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    size="small"
                    autoComplete="email"
                    autoFocus
                    margin="normal"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailError('');
                    }}
                    error={!!emailError}
                    helperText={emailError}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            height: 40,
                            '& input': {
                                fontSize: '14px',
                                lineHeight: '2.1rem'
                            }
                        },
                        '& .MuiInputLabel-root': {
                            lineHeight: '1.3rem'
                        },
                        '& .MuiFormHelperText-root': {
                            fontSize: '0.875rem'
                        }
                    }}
                />

                <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 2.5, fontSize: 14, fontWeight: 400 }}>
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>

                <Typography variant="body2" sx={{ fontSize: 14, fontWeight: 400, mt: 2 }}>
                    Remember your password?{' '}
                    {subdomain2 && (
                        <Link href={`/${subdomain2}/login`} passHref style={{ textDecoration: 'none', color: 'primary.main' }}>
                            Sign in
                        </Link>
                    )}
                </Typography>
            </Box>
        </Box>
    );
}
