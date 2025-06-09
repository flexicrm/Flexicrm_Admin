'use client';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Box, Button, Checkbox, CircularProgress, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoginAPI } from '../../../../api/auth';
import userContext from '../../UseContext/UseContext';

export default function LoginForm() {
    // const { loginSuccess } = useContext(userContext);
    const router = useRouter();
    const params = useParams();
    const subdomain = params?.subdomain || '';
    const contextvalue = useContext(userContext);
    const { flexilogo } = contextvalue;
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const subdomain2 = Cookies.get('subdomain');
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => setRememberMe(event.target.checked);

    const validationSchema = yup.object({
        email: yup.string().email('Invalid email format').required('Email is required'),
        password: yup.string().required('Password is required')
    });

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema,
        onSubmit: async (values) => {
            const payload = { email: values.email, password: values.password };
            const response = await LoginAPI(subdomain, payload);
            console.log('Login response:', response);
            if (response.isError) {
                setError(typeof response.data.errors === 'string' ? response.data.errors : 'Login failed');
            } else {
                const data = response.data || null;
                const { accessToken, refreshToken, isFirstlogin } = data;
                Cookies.set('crmaccess', accessToken);
                Cookies.set('crmrefresh', refreshToken);
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', values.email);
                    localStorage.setItem('rememberedPassword', values.password);
                }
                // loginSuccess(response.data);
                // Cookies.set('', response.data.token);
                router.push(`/${subdomain}/dashboard`);
            }
        }
    });

    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        const rememberedPassword = localStorage.getItem('rememberedPassword');
        if (rememberedEmail && rememberedPassword) {
            formik.setFieldValue('email', rememberedEmail);
            formik.setFieldValue('password', rememberedPassword);
            setRememberMe(true);
        }
    }, []);

    return (
        <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', textAlign: 'center', p: 3 }}>
            {flexilogo?.logo ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: '32px' }}>
                    <Box component="img" src={flexilogo.logo || '/logo/android-icon-72x72.png'} alt="FlexiCRM Logo" sx={{ width: '140px', height: 'auto' }} />
                </Box>
            ) : (
                <Box>
                    <Typography variant="h6" gutterBottom sx={{ mb: '32px', fontWeight: 'bold', textTransform: 'capitalize ' }}>
                        {subdomain2.replace(/-/g, ' ')}
                    </Typography>
                </Box>
            )}
            <form onSubmit={formik.handleSubmit} noValidate>
                <Box>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label="Email"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                height: '40px',
                                lineHeight: '2.10rem',
                                '& input': {
                                    fontSize: '14px',
                                    lineHeight: '2.10rem'
                                }
                            },
                            '& .MuiInputLabel-root': {
                                lineHeight: '1rem'
                            },
                            '& .MuiFormHelperText-root': {
                                fontSize: '0.875rem'
                            }
                        }}
                        margin="normal"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Box>

                <Box>
                    <TextField
                        fullWidth
                        id="password"
                        name="password"
                        label="Password"
                        margin="normal"
                        sx={{
                            mt: '24px',
                            '& .MuiOutlinedInput-root': {
                                height: '40px',
                                lineHeight: '2.10rem',
                                '& input': {
                                    fontSize: '14px',
                                    lineHeight: '2.10rem'
                                }
                            },
                            '& .MuiInputLabel-root': {
                                lineHeight: '1rem'
                            },
                            '& .MuiFormHelperText-root': {
                                fontSize: '0.875rem'
                            }
                        }}
                        type={showPassword ? 'text' : 'password'}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleClickShowPassword} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Checkbox checked={rememberMe} onChange={handleRememberMeChange} size="small" sx={{ p: 0 }} />
                        <Typography component="span" style={{ marginLeft: '5px', marginTop: '1px' }}>
                            Remember me
                        </Typography>
                    </Box>
                    <Link href={`/${subdomain}/forgot-password`}>
                        <Typography component="span" color="primary" sx={{ cursor: 'pointer' }}>
                            Forgot password?
                        </Typography>
                    </Link>
                </Box>

                {error && (
                    <Typography color="error" sx={{ mb: 2 }}>
                        {error}
                    </Typography>
                )}

                <Button type="submit" fullWidth variant="contained" color="primary" disabled={formik.isSubmitting}>
                    {formik.isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                </Button>
            </form>
        </Box>
    );
}
