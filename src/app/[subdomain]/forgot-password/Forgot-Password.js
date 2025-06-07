'use client';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
// import axios from 'axios';
import { useParams } from 'next/navigation';
import { Box, Button, Container, CssBaseline, Grid, IconButton, Paper, TextField, Typography, styled } from '@mui/material';
// import { API_BASE_URL } from '../../utils/index';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { Circle1, Circle2, Dot, LeftPanel, LoginContainer, RightPanel } from '../../ReuseableStyle/ReusableStyleCom';
import { ResetPassword } from '../../../../api/auth';
import userContext from '../../UseContext/UseContext';
import Cookies from 'js-cookie';
export default function ForgotPasswordPage() {
    const { subdomain } = useParams();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeDot, setActiveDot] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [emailError, setEmailError] = useState('');
    const contextvalue = useContext(userContext);
    const { flexilogo } = contextvalue;
    const subdomain2 = Cookies.get('subdomain');
    console.log(flexilogo, 'flexilogo');

    const item = [{ img: '/Group.png' }, { img: '/Group.png' }, { img: '/Group.png' }];

    useEffect(() => {
        if (item?.length > 0) {
            const timer = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % item?.length);
                setActiveDot((prevDot) => (prevDot + 1) % item?.length);
            }, 5000);

            return () => clearInterval(timer);
        }
    }, [item.length]);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = async (e) => {
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
            const response = await ResetPassword(subdomain, { email });
            console.log(response, 'response');
            if (response.success) {
                setMessage(response.data.message || 'Password reset link has been sent to your email');
            } else {
                setError(response.data.errors || 'Failed to send reset email');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <CssBaseline />
            <LoginContainer maxWidth={false} disableGutters>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    {/* Left Panel - Same as login page */}
                    <Grid size={{ xs: false, sm: 6, md: 6, lg: 6 }} sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <LeftPanel elevation={3}>
                            {/* <Box sx={{ display: 'flex', alignItems: 'center', alignSelf: 'flex-start', p: 1 }}>
                                <IconButton sx={{ color: 'secondary.main' }}>
                                    <AiOutlineThunderbolt />
                                </IconButton>
                                <Typography variant="body1">{subdomain}</Typography>
                            </Box> */}

                            <Box sx={{ textAlign: 'center', mt: 4 }}>
                                <Circle1>
                                    <Circle2>
                                        <Box component="img" src={item[currentIndex].img} alt="Group" loading="lazy" sx={{ width: '80%', height: 'auto' }} />
                                    </Circle2>
                                </Circle1>

                                <Typography variant="h6" sx={{ mt: 5 }}>
                                    Customizable Multipurpose Dashboard
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 2, fontSize: '12px' }}>
                                    Everything you need in an easily customizable dashboard.
                                </Typography>

                                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 2 }}>
                                    {item.map((_, index) => (
                                        <Dot key={index} active={index === activeDot} />
                                    ))}
                                </Box>
                            </Box>
                        </LeftPanel>
                    </Grid>

                    {/* Right Panel - Modified for forgot password */}
                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }} width={'50%'} sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <RightPanel>
                            <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', textAlign: 'center' }}>
                                {flexilogo?.logo ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Box component="img" src={flexilogo.logo} alt="FlexiCRM Logo" sx={{ width: '100px', height: 'auto' }} />
                                    </Box>
                                ) : (
                                    <Typography variant="h6" gutterBottom>
                                        {subdomain2}
                                    </Typography>
                                )}
                                <Typography variant="h6" gutterBottom>
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
                                        margin="normal"
                                        // required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            setEmailError('');
                                        }}
                                        error={!!emailError}
                                        helperText={emailError}
                                        sx={{ mb: 2 }}
                                    />

                                    <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 2, mb: 2 }}>
                                        {loading ? 'Sending...' : 'Send Reset Link'}
                                    </Button>

                                    <Typography variant="body2" sx={{ mt: 2 }}>
                                        Remember your password?{' '}
                                        <Link href={`/${subdomain}/login`} passHref style={{ textDecoration: 'none', color: 'primary.main' }}>
                                            Sign in
                                        </Link>
                                    </Typography>
                                </Box>
                            </Box>
                        </RightPanel>
                    </Grid>
                </Grid>
            </LoginContainer>
        </>
    );
}
