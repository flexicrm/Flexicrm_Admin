'use client';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import * as yup from 'yup';
// import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slice/authslice';
import { API_BASE_URL } from '../../utils/index';
import { Box, Button, Checkbox, CircularProgress, Container, CssBaseline, FormControlLabel, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { Circle1, Circle2, Dot, LeftPanel, LoginContainer, RightPanel } from '../../ReuseableStyle/ReusableStyleCom';
import { LoginAPI } from '../../../../api/auth';
import userContext from '../../UseContext/UseContext';
import SendIcon from '@mui/icons-material/Send';
import Custom404 from '../../pages/404';
import { keyframes } from 'framer-motion';
import AnimatedText from './Animatedtext';

export default function DynamicLogin() {
    const { subdomain } = useParams();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFirstLogin, setIsFirstLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();
    const location = usePathname();
    // const heding = location.split('/')[1];
    const subdomain2 = Cookies.get('subdomain');
    // const dispatch = useDispatch();
    const [activeDot, setActiveDot] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const contextvalue = useContext(userContext);
    const { flexilogo } = contextvalue;
    console.log('flexilogo', flexilogo);

    const item = [
        { img: '/Group.png', text: 'Crafted for Performance and Flexibility' },
        { img: '/slider1.png', text: 'Smart Dashboards for Smarter Decisions' },
        { img: '/slider2.png', text: 'Modular Components for Easy Customization' }
    ];

    useEffect(() => {
        if (item?.length > 0) {
            const timer = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % item?.length);
                setActiveDot((prevDot) => (prevDot + 1) % item?.length);
            }, 5000);

            return () => clearInterval(timer);
        }
    }, [item.length]);
    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        const rememberedPassword = localStorage.getItem('rememberedPassword');
        if (rememberedEmail && rememberedPassword) {
            formik.setFieldValue('email', rememberedEmail);
            formik.setFieldValue('password', rememberedPassword);
            setRememberMe(true);
        }
    }, []);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            email: yup.string().email('Invalid email').required('Email is required'),
            password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required')
        }),
        onSubmit: async (values) => {
            setError('');
            setSuccess('');
            const payload = { email: values.email, password: values.password };
            try {
                setLoading(true);
                const response = await LoginAPI(subdomain, payload);
                if (response.isError) {
                    setError(response.data.errors);
                } else {
                    const data = response.data || null;
                    const { accessToken, refreshToken, isFirstlogin } = data;
                    // dispatch(setCredentials({ accessToken, refreshToken, isFirstlogin }));
                    setIsFirstLogin(isFirstlogin);
                    localStorage.setItem('crmaccess', accessToken);
                    localStorage.setItem('crmrefresh', refreshToken);

                    Cookies.set('crmaccess', accessToken, {
                        secure: true,
                        sameSite: 'Strict'
                        // expires: 1 / 24
                    });

                    Cookies.set('crmrefresh', refreshToken, {
                        secure: true,
                        sameSite: 'Strict',
                        expires: 7
                    });

                    Cookies.set('subdomain', subdomain);

                    if (rememberMe) {
                        localStorage.setItem('rememberedEmail', values.email);
                        localStorage.setItem('rememberedPassword', values.password);
                    } else {
                        localStorage.removeItem('rememberedEmail');
                        localStorage.removeItem('rememberedPassword');
                    }

                    setSuccess('Login successful!');
                    router.push(isFirstlogin ? `/${subdomain}/reset-password` : `/${subdomain}/dashboard`);
                }
            } catch (err) {
                console.error('Login Error:', err);
            } finally {
                setLoading(false);
            }
        },
        validateOnChange: false,
        validateOnBlur: false
    });

    const { values, handleChange, errors, touched, handleSubmit, handleBlur, setFieldValue } = formik;

    // useEffect(() => {
    //     if (item?.length > 0) {
    //         const timer = setInterval(() => {
    //             setCurrentIndex((prevIndex) => (prevIndex + 1) % item.length);
    //             setActiveDot((prevDot) => (prevDot + 1) % item.length);
    //         }, 5000);
    //         return () => clearInterval(timer);
    //     }
    // }, []);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    };

    return (
        <>
            {' '}
            <CssBaseline />
            <LoginContainer maxWidth={false} disableGutters>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <Grid size={{ xs: false, sm: 6, md: 6, lg: 6 }} sx={{ display: { xs: 'none', sm: 'block' }, height: '100vh' }}>
                        <LeftPanel width="100%">
                            {/* <Box sx={{ display: 'flex', alignItems: 'center', alignSelf: 'flex-start', p: 1 }}>
                                <IconButton sx={{ color: 'secondary.main' }}>
                                    <AiOutlineThunderbolt />
                                </IconButton>
                                <Typography variant="body1">{subdomain2}</Typography>
                            </Box> */}

                            <Box sx={{ textAlign: 'center', mt: 2 }}>
                                <Circle1>
                                    <Circle2>
                                        <Box component="img" src={item[currentIndex].img} alt="Group" loading="lazy" sx={{ width: '80%', height: 'auto' }} />
                                    </Circle2>
                                </Circle1>

                                {/* <Typography
                                    variant="h6"
                                    sx={{
                                        mt: 1,
                                        animation: `${fadeIn} 0.5s ease-in-out`
                                    }}
                                >
                                    {item[currentIndex].text}
                                </Typography> */}
                                <AnimatedText textKey={currentIndex} text={item[currentIndex].text} />


                                <Typography variant="body1" sx={{ mt: 1, fontSize: '12px' }}>
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
                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }} sx={{ height: '100vh' }}>
                        <RightPanel>
                            <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', textAlign: 'center', p: 3 }}>
                                {flexilogo?.logo ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Box component="img" src={flexilogo.logo || '/logo/android-icon-72x72.png'} alt="FlexiCRM Logo" sx={{ width: '100px', height: 'auto' }} />
                                    </Box>
                                ) : (
                                    <Box>
                                        <Typography variant="h6" gutterBottom>
                                            {subdomain2}
                                        </Typography>
                                    </Box>
                                )}
                                <Typography variant="h2" gutterBottom>
                                    Login
                                </Typography>
                                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                                    {success && (
                                        <Typography color="success.main" align="center" sx={{ mb: 2 }}>
                                            {success}
                                        </Typography>
                                    )}
                                    <Box>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="email"
                                            name="email"
                                            label="Email"
                                            sx={{
                                                // mt: '24px',
                                                '& .MuiOutlinedInput-root': {
                                                    height: '40px',
                                                    lineHeight: '2.10rem',
                                                    '& input': {
                                                        // padding: '10px 1px', // Adjust based on height
                                                        fontSize: '14px',
                                                        lineHeight: '2.10rem'
                                                        // textIndent: '1rem'
                                                    }
                                                },
                                                '& .MuiInputLabel-root': {
                                                    // fontSize: '1rem',
                                                    lineHeight: '1rem'
                                                },
                                                '& .MuiFormHelperText-root': {
                                                    fontSize: '0.875rem'
                                                }
                                            }}
                                            type="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            size="small"
                                            onBlur={handleBlur}
                                            error={Boolean(errors.email)}
                                            helperText={errors.email}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Box>
                                    <Box>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="password"
                                            name="password"
                                            size="small"
                                            label="Password"
                                            sx={{
                                                mt: '24px',
                                                '& .MuiOutlinedInput-root': {
                                                    height: '40px',
                                                    '& input': {
                                                        // padding: '10px 1px', // Adjust based on height
                                                        fontSize: '14px',
                                                        lineHeight: '2.10rem'
                                                        // textIndent: '1rem'
                                                    }
                                                },
                                                '& .MuiInputLabel-root': {
                                                    // fontSize: '1rem',
                                                    lineHeight: '1rem'
                                                },
                                                '& .MuiFormHelperText-root': {
                                                    fontSize: '0.875rem'
                                                }
                                            }}
                                            type={showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(errors.password)}
                                            helperText={errors.password}
                                            InputLabelProps={{ shrink: true }}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                        {error && (
                                            <Typography color="error" sx={{ alignItems: 'start' }}>
                                                {error}
                                            </Typography>
                                        )}
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: '19px' }}>
                                        <Typography variant="body2" color="primary" sx={{ fontSize: '14px', fontWeight: 400, textAlign: 'start', display: 'flex', alignItems: 'center' }}>
                                            <Checkbox checked={rememberMe} onChange={handleRememberMeChange} value="remember" color="primary" size="small" sx={{ p: 0 }} />
                                            <span style={{ marginLeft: '5px', marginTop: '1px' }}>Remember Me</span>
                                        </Typography>

                                        {}
                                        <Link href={`/${subdomain}/forgot-password`} style={{ textDecoration: 'none' }}>
                                            <Typography variant="body2" color="primary" sx={{ fontSize: '14px', fontWeight: 400 }}>
                                                Forgot Password?
                                            </Typography>
                                        </Link>
                                    </Box>

                                    <Button type="submit" endIcon={<SendIcon />} fullWidth variant="contained" color="primary" disabled={loading} sx={{ mt: '19px', fontSize: '14px', fontWeight: 400 }}>
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                                    </Button>
                                </Box>
                            </Box>
                        </RightPanel>
                    </Grid>
                </Grid>
            </LoginContainer>
        </>
    );
}
