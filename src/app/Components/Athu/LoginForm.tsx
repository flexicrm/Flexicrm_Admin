'use client';
import { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { Box, Button, Checkbox, CircularProgress, TextField, Typography } from '@mui/material';

import { LoginAPI } from '../../../../api/auth';
import userContext from '../../UseContext/UseContext';
import PasswordField from '../../ui-components/password/Password';

export default function LoginForm() {
    const router = useRouter();
    const params = useParams();
    const subdomain = params?.subdomain || '';
    const contextvalue = useContext(userContext);
    const { flexilogo } = contextvalue;
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const subdomain2 = Cookies.get('subdomain');
    const [isFirstLogin, setIsFirstLogin] = useState(false);
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
            console.log(response, 'response');
            if (response.isError) {
                setError(typeof response?.data === 'string' ? response?.data : 'Login failed');
            } else {
                const data = response.data || null;
                const { accessToken, refreshToken, isFirstlogin } = data;
                setIsFirstLogin(isFirstlogin);
                if (!isFirstlogin) {
                    Cookies.set('crmaccess', accessToken);
                    Cookies.set('crmrefresh', refreshToken);
                }
                if (rememberMe) {
                    localStorage.setItem('rememberedEmail', values.email);
                    localStorage.setItem('rememberedPassword', values.password);
                }
                // loginSuccess(response.data);
                // Cookies.set('', response.data.token);
                router.push(isFirstlogin ? `/${subdomain}/reset-password` : `/${subdomain}/dashboard`);
            }
        }
    });

    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        const rememberedPassword = localStorage.getItem('rememberedPassword');
        if (rememberedEmail && rememberedPassword) {
            // Use timeout to defer setFieldValue to avoid sync updates inside mount
            setTimeout(() => {
                formik.setFieldValue('email', rememberedEmail);
                formik.setFieldValue('password', rememberedPassword);
            }, 0);
            setRememberMe(true);
        }
    }, []);

    return (
        <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', textAlign: 'center', p: 3 }}>
            {flexilogo?.logo ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: '32px', width: 120, height: 120, borderRadius: '50%', boxShadow: '0 0px 3px rgba(0, 0, 0, 0.2)', margin: '0 auto 22px auto', border: '1px solid white' }}>
                    <Box component="img" src={flexilogo.logo || '/logo/android-icon-72x72.png'} alt="FlexiCRM Logo" sx={{ borderRadius: '50%', width: 110 }} />
                </Box>
            ) : (
                <Box>
                    <Typography variant="h6" gutterBottom sx={{ mb: '32px', fontWeight: 'bold', textTransform: 'capitalize ' }}>
                        {subdomain2?.replace(/-/g, ' ')}
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
                    <PasswordField
                        label="password"
                        name="password"
                        value={formik.values.password}
                        show={showPassword}
                        toggleShow={handleClickShowPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
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
