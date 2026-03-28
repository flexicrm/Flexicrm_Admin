'use client';
import { Box, Button, Checkbox, CircularProgress, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import * as yup from 'yup';

import { LoginAPI } from '../../../../api/auth';
import userContext from '../../UseContext/UseContext';

export default function LoginForm() {
    const router = useRouter();
    const subdomain = Cookies.get('subdomain') || '';
    const contextvalue = useContext(userContext);
    const { flexilogo } = contextvalue;
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const subdomain2 = Cookies.get('subdomain');
    const [isFirstLogin, setIsFirstLogin] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) => setRememberMe(event.target.checked);


    const formik = useFormik({
    initialValues: { mobile: '' }, // ✅ only mobile
    validationSchema: yup.object({
        mobile: yup
            .string()
            .matches(/^[6-9]\d{9}$/, 'Enter valid mobile number')
            .required('Mobile is required')
    }),
    onSubmit: async (values) => {
        const payload = { mobile: values.mobile }; // ✅ only mobile

        const response = await LoginAPI(subdomain, payload);
        console.log(localStorage.setItem('response', JSON.stringify(response)));


        if (response.isError) {
            setError(typeof response?.data === 'string' ? response?.data : 'Login failed');
        } else {
            // 👉 Usually here you redirect to OTP screen
            router.push(`/Otp?mobile=${values.mobile}`);
        }
    }
});


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
    id="mobile"
    name="mobile"
    label="Mobile"
    type="tel"
    inputProps={{ maxLength: 10 }}
    margin="normal"
    value={formik.values.mobile}
    onChange={formik.handleChange}
    error={formik.touched.mobile && Boolean(formik.errors.mobile)}
    helperText={formik.touched.mobile && formik.errors.mobile}
/>
                </Box>

                {/* <Box>
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
                </Box> */}

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
                <p>Don't have an account? <Link href={`/register`}>Register</Link></p>
            </form>
        </Box>
    );
}
