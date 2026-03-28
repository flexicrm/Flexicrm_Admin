'use client';

import {
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from '@mui/material';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import * as yup from 'yup';

import { RegisterAPI, category } from '../../../../api/auth';
import userContext from '../../UseContext/UseContext';
import PasswordField from '../../ui-components/password/Password';

// Define types for better TypeScript support
interface Category {
    _id: string;
    categoryname: string;
    name?: string;
    type?: string;
}

interface ApiResponse {
    isError: boolean;
    data: any;
}

interface FlexiLogo {
    logo?: string;
}

export default function RegisterForm() {
    const router = useRouter();

    // ✅ SAFE CONTEXT with proper typing
    const contextvalue = useContext(userContext) as { flexilogo?: FlexiLogo } | null;
    const flexilogo = contextvalue?.flexilogo;
    
    const [industries, setIndustries] = useState<Category[]>([]);
    const [loadingIndustries, setLoadingIndustries] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [isRedirecting, setIsRedirecting] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleRememberMeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setRememberMe(event.target.checked);

    // Company size options
    const companySizeOptions = [
        '1-10',
        '11-50',
        '51-200',
        '201-500',
        '501-1000',
        '1000+'
    ];

    const validationSchema = yup.object({
        companyName: yup.string().required('Company name is required'),
        firstName: yup.string().required('First name is required'),
        lastName: yup.string().required('Last name is required'),
        email: yup.string().email('Invalid email format').required('Email is required'),
        mobile: yup.string()
            .required('Mobile number is required')
            .matches(/^[0-9]+$/, 'Must be only digits')
            .min(10, 'Must be exactly 10 digits')
            .max(10, 'Must be exactly 10 digits'),
        password: yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        industry: yup.string().required('Industry is required'),
        companySize: yup.string().required('Company size is required'),
        address: yup.string().required('Address is required')
    });

    const formik = useFormik({
        initialValues: {
            companyName: '',
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            password: '',
            industry: '',
            companySize: '',
            address: ''
        },
        validationSchema,
        onSubmit: async (values, { setSubmitting }) => {
            // Prevent multiple submissions
            if (isRedirecting) return;
            
            // Construct the payload in the required format
            const payload = {
                companyName: values.companyName,
                Admin: {
                    firstname: values.firstName,
                    lastname: values.lastName,
                    email: values.email,
                    mobile: values.mobile
                },
                industry: values.industry,
                companySize: values.companySize,
                address: values.address
            };

            try {
                // ✅ NO SUBDOMAIN
                const response = await RegisterAPI('', payload);

                if (response.isError) {
                    setError(
                        typeof response?.data === 'string'
                            ? response?.data
                            : 'Registration failed'
                    );
                    setSubmitting(false);
                } else {
                    const data = response.data || {};
                    const { accessToken, refreshToken, isFirstlogin } = data;

                    if (accessToken) {
                        Cookies.set('crmaccess', accessToken, { 
                            expires: 7,
                            sameSite: 'strict',
                            path: '/'
                        });
                        Cookies.set('crmrefresh', refreshToken, { 
                            expires: 7,
                            sameSite: 'strict',
                            path: '/'
                        });
                    }

                    if (rememberMe) {
                        localStorage.setItem('rememberedEmail', values.email);
                    } else {
                        localStorage.removeItem('rememberedEmail');
                    }

                    setIsRedirecting(true);
                    
                    setTimeout(() => {
                        router.push(isFirstlogin ? '/reset-password' : '/dashboard');
                    }, 100);
                }
            } catch (error) {
                setError('An unexpected error occurred');
                setSubmitting(false);
            }
        }
    });

    // Load remembered email
    useEffect(() => {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        
        if (rememberedEmail) {
            formik.setFieldValue('email', rememberedEmail);
            setRememberMe(true);
        }
    }, [formik]);

    // Fetch industries
    useEffect(() => {
        const fetchIndustries = async () => {
            setLoadingIndustries(true);
            try {
                const response: ApiResponse = await category();
                
                if (!response.isError && response.data) {
                    let industriesData: Category[] = [];
                    
                    if (Array.isArray(response.data)) {
                        industriesData = response.data;
                    } else if (response.data.data && Array.isArray(response.data.data)) {
                        industriesData = response.data.data;
                    } else if (response.data.categories && Array.isArray(response.data.categories)) {
                        industriesData = response.data.categories;
                    }
                    
                    setIndustries(industriesData);
                } else {
                    console.error('Failed to fetch industries:', response?.data);
                }
            } catch (error) {
                console.error('Error fetching industries:', error);
            } finally {
                setLoadingIndustries(false);
            }
        };

        fetchIndustries();
    }, []);

    return (
        <Box sx={{ 
            width: '100%', 
            maxWidth: 800, 
            mx: 'auto', 
            p: { xs: 2, sm: 4 },
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 3
        }}>
            
            {/* Logo or Title */}
            {flexilogo?.logo ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                    <Box
                        component="img"
                        src={flexilogo.logo}
                        alt="Logo"
                        sx={{ 
                            width: 120,
                            height: 'auto',
                            objectFit: 'contain'
                        }}
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            e.currentTarget.style.display = 'none';
                        }}
                    />
                </Box>
            ) : (
                <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 600 }}>
                    Create Account
                </Typography>
            )}

            <form onSubmit={formik.handleSubmit} noValidate>
                {/* Company Name - Full Width */}
                <Box sx={{ mb: 2 }}>
                    <TextField
                        fullWidth
                        id="companyName"
                        name="companyName"
                        label="Company Name"
                        value={formik.values.companyName}
                        onChange={formik.handleChange}
                        error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                        helperText={formik.touched.companyName && formik.errors.companyName}
                        disabled={formik.isSubmitting}
                        size="medium"
                    />
                </Box>

                {/* First Name & Last Name - Row using flexbox */}
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <TextField
                            fullWidth
                            id="firstName"
                            name="firstName"
                            label="First Name"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            disabled={formik.isSubmitting}
                            size="medium"
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <TextField
                            fullWidth
                            id="lastName"
                            name="lastName"
                            label="Last Name"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            helperText={formik.touched.lastName && formik.errors.lastName}
                            disabled={formik.isSubmitting}
                            size="medium"
                        />
                    </Box>
                </Box>

                {/* Email & Mobile - Row using flexbox */}
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <TextField
                            fullWidth
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            disabled={formik.isSubmitting}
                            size="medium"
                        />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <TextField
                            fullWidth
                            id="mobile"
                            name="mobile"
                            label="Mobile Number"
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                            helperText={formik.touched.mobile && formik.errors.mobile}
                            disabled={formik.isSubmitting}
                            inputProps={{ maxLength: 10 }}
                            size="medium"
                        />
                    </Box>
                </Box>

                {/* Password - Full Width */}
                <Box sx={{ mb: 2 }}>
                    <PasswordField
                        label="Password"
                        name="password"
                        value={formik.values.password}
                        show={showPassword}
                        toggleShow={handleClickShowPassword}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                </Box>

                {/* Industry - Full Width */}
                <Box sx={{ mb: 2 }}>
                    <FormControl 
                        fullWidth 
                        error={formik.touched.industry && Boolean(formik.errors.industry)}
                        size="medium"
                    >
                        <InputLabel id="industry-label">Industry</InputLabel>
                        <Select
                            labelId="industry-label"
                            id="industry"
                            name="industry"
                            value={formik.values.industry}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            label="Industry"
                            disabled={loadingIndustries || formik.isSubmitting}
                        >
                            {loadingIndustries ? (
                                <MenuItem disabled value="">
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CircularProgress size={20} /> 
                                        <span>Loading industries...</span>
                                    </Box>
                                </MenuItem>
                            ) : industries.length > 0 ? (
                                industries.map((industry) => (
                                    <MenuItem key={industry._id} value={industry._id}>
                                        {industry.categoryname || industry.name || 'Unnamed Industry'}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled value="">
                                    No industries found
                                </MenuItem>
                            )}
                        </Select>
                        {formik.touched.industry && formik.errors.industry && (
                            <FormHelperText>{formik.errors.industry}</FormHelperText>
                        )}
                    </FormControl>
                </Box>

                {/* Company Size & Address - Row using flexbox */}
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <FormControl 
                            fullWidth 
                            error={formik.touched.companySize && Boolean(formik.errors.companySize)}
                            size="medium"
                        >
                            <InputLabel id="companySize-label">Company Size</InputLabel>
                            <Select
                                labelId="companySize-label"
                                id="companySize"
                                name="companySize"
                                value={formik.values.companySize}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                label="Company Size"
                                disabled={formik.isSubmitting}
                            >
                                {companySizeOptions.map((size) => (
                                    <MenuItem key={size} value={size}>
                                        {size} employees
                                    </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.companySize && formik.errors.companySize && (
                                <FormHelperText>{formik.errors.companySize}</FormHelperText>
                            )}
                        </FormControl>
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <TextField
                            fullWidth
                            id="address"
                            name="address"
                            label="Address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                            disabled={formik.isSubmitting}
                            multiline
                            rows={1}
                            size="medium"
                        />
                    </Box>
                </Box>

                {/* Remember Me & Forgot Password - FIXED for Next.js 13+ */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 2
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                            size="small"
                            disabled={formik.isSubmitting}
                        />
                        <Typography variant="body2">Remember me</Typography>
                    </Box>

                    <Link 
                        href="/forgot-password"
                        style={{ textDecoration: 'none' }}
                    >
                        <Typography 
                            color="primary" 
                            sx={{ 
                                cursor: 'pointer',
                                '&:hover': { textDecoration: 'underline' }
                            }}
                            variant="body2"
                        >
                            Forgot password?
                        </Typography>
                    </Link>
                </Box>

                {/* Error Message */}
                {error && (
                    <Box sx={{ mb: 2 }}>
                        <Typography color="error" variant="body2" sx={{ textAlign: 'center' }}>
                            {error}
                        </Typography>
                    </Box>
                )}

                {/* Submit Button */}
                <Box sx={{ mb: 2 }}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={formik.isSubmitting || loadingIndustries}
                        sx={{ py: 1.5 }}
                    >
                        {formik.isSubmitting ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CircularProgress size={20} color="inherit" />
                                <span>Creating account...</span>
                            </Box>
                        ) : (
                            'Create Account'
                        )}
                    </Button>
                </Box>

                {/* Login Redirect - FIXED for Next.js 13+ */}
                <Typography sx={{ textAlign: 'center' }} variant="body2">
    Already have an account?{' '}
    <Link href="/login" style={{ textDecoration: 'none' }}>
        <span
            style={{
                color: '#1976d2',
                cursor: 'pointer',
                textDecoration: 'none'
            }}
        >
            Sign in
        </span>
    </Link>
</Typography>
            </form>
        </Box>
    );
}