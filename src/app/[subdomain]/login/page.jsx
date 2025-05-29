// 'use client';
// import { useEffect, useState } from 'react';
// import Link from 'next/link';
// // import axios from 'axios';
// import { useParams, useRouter } from 'next/navigation';
// import Cookies from 'js-cookie';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import { useDispatch } from 'react-redux';
// import { setCredentials } from '../../store/slice/authslice';
// import { API_BASE_URL } from '../../utils/index';
// import { Box, Button, Checkbox, CircularProgress, Container, CssBaseline, FormControlLabel, Grid, IconButton, InputAdornment, Paper, TextField, Typography, styled } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { AiOutlineThunderbolt } from 'react-icons/ai';
// import { Circle1, Circle2, Dot, LeftPanel, LoginContainer, RightPanel } from '../../ReuseableStyle/ReusableStyleCom';
// import { LoginAPI } from '../../../../api/auth';

// // Create a custom theme

// // Styled components

// export default function DynamicLogin() {
//     const { values, handleChange, errors, touched } = useFormik({
//         initialValues: {
//             email: '',
//             password: ''
//         },
//         validationSchema: yup.object({
//             email: yup.string().email('Invalid email').required('Email is required'),
//             password: yup.string().required('Password is required')
//         }),
//         onSubmit: (values) => {
//             handleLogin(values);
//         }
//     });

//     const { subdomain } = useParams();

//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [isFirstLogin, setIsFirstLogin] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const router = useRouter();
//     const location = window.location;
//     const heding = location.pathname.split('/')[1];
//     const dispatch = useDispatch();
//     const [activeDot, setActiveDot] = useState(0);
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const handleClickShowPassword = () => setShowPassword((show) => !show);

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccess('');
//         const paylod = { email: values.email, password: values.password };
//         try {
//             setLoading(true);
//             // const response = await axios.post(`${API_BASE_URL}/user/${subdomain}/login`, );
//             // const response = await axios.post(`${API_BASE_URL}/user/${subdomain}/login`, { email: values.email, password: values.password });
//             const response = await LoginAPI(subdomain, paylod);
//             console.log(response, 'response');
//             if (response.isError) {
//                 setError(response.data.errors);
//                 // setSuccess(response.data);
//             } else {
//                 const data = response.data || null;
//                 const { accessToken, refreshToken, isFirstlogin } = data;
//                 dispatch(
//                     setCredentials({
//                         accessToken: accessToken,
//                         refreshToken: refreshToken,
//                         isFirstlogin: isFirstlogin
//                     })
//                 );
//                 setIsFirstLogin(data.isFirstlogin);
//                 localStorage.setItem('crmaccess', accessToken);
//                 localStorage.setItem('crmrefresh', refreshToken);

//                 // if (accessToken) {
//                 Cookies.set('crmaccess', accessToken, {
//                     secure: true,
//                     sameSite: 'Strict',
//                     expires: 1 / 24
//                 });

//                 // }
//                 Cookies.set('crmrefresh', refreshToken, {
//                     secure: true,
//                     sameSite: 'Strict',
//                     expires: 7
//                 });

//                 Cookies.set('subdomain', subdomain);
//                 setSuccess('Login successful!');
//                 if (data.isFirstlogin) {
//                     router.push(`reset-password`);
//                 } else {
//                     router.push(`dashboard`);
//                 }
//             }
//         } catch (err) {
//             // console.log(err, 'error');
//             // const errorMessage = err.response?.data?.message || 'Login failed!';
//             // setError(errorMessage);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (item?.length > 0) {
//             const timer = setInterval(() => {
//                 setCurrentIndex((prevIndex) => (prevIndex + 1) % item?.length);
//                 setActiveDot((prevDot) => (prevDot + 1) % item?.length);
//             }, 5000);

//             return () => clearInterval(timer);
//         }
//     }, []);

//     const item = [{ img: '/Group.png' }, { img: '/Group.png' }, { img: '/Group.png' }];

//     return (
//         <>
//             <CssBaseline />
//             <LoginContainer maxWidth={false} disableGutters>
//                 <Grid container component="main" sx={{ height: '100vh' }}>
//                     {/* Left Panel - now 6 columns */}
//                     <Grid item xs={false} sm={6} md={6} lg={6} width={'50%'} sx={{ display: { xs: 'none', sm: 'block' }, height: '100vh' }}>
//                         <LeftPanel elevation={3} width="100%">
//                             {/* Left panel content remains the same */}
//                             <Box sx={{ display: 'flex', alignItems: 'center', alignSelf: 'flex-start', p: 1 }}>
//                                 <IconButton sx={{ color: 'secondary.main' }}>
//                                     <AiOutlineThunderbolt />
//                                 </IconButton>
//                                 <Typography variant="body1">{heding}</Typography>
//                             </Box>

//                             <Box sx={{ textAlign: 'center', mt: 4 }}>
//                                 <Circle1>
//                                     <Circle2>
//                                         <Box component="img" src={item[currentIndex].img} alt="Group" loading="lazy" sx={{ width: '80%', height: 'auto' }} />
//                                     </Circle2>
//                                 </Circle1>

//                                 <Typography variant="h6" sx={{ mt: 5 }}>
//                                     Customizable Multipurpose Dashboard
//                                 </Typography>
//                                 <Typography variant="body1" sx={{ mt: 2, fontSize: '12px' }}>
//                                     Everything you need in an easily customizable dashboard.
//                                 </Typography>

//                                 <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mt: 2 }}>
//                                     {item.map((_, index) => (
//                                         <Dot key={index} active={(index === activeDot).toString()} />
//                                     ))}
//                                 </Box>
//                             </Box>
//                         </LeftPanel>
//                     </Grid>

//                     {/* Right Panel - now 6 columns (matches left panel) */}
//                     <Grid item xs={12} sm={6} md={6} lg={6} width={'50%'} sx={{ display: { xs: 'none', sm: 'block' }, height: '100vh' }}>
//                         <RightPanel>
//                             {/* Right panel content remains the same */}
//                             <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', textAlign: 'center' }}>
//                                 <Typography variant="h6" gutterBottom>
//                                     Welcome to {subdomain} Login
//                                 </Typography>

//                                 <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
//                                     {success && (
//                                         <Typography color="success" align="center" sx={{ mb: 2 }}>
//                                             {success}
//                                         </Typography>
//                                     )}
//                                     <Box>
//                                         <TextField
//                                             margin="normal"
//                                             fullWidth
//                                             id="email"
//                                             name="email"
//                                             label="Email"
//                                             type="email"
//                                             value={values.email}
//                                             onChange={handleChange}
//                                             error={touched.email && Boolean(errors.email)}
//                                             helperText={touched.email && errors.email}
//                                             InputLabelProps={{
//                                                 shrink: true
//                                             }}
//                                         />
//                                     </Box>
//                                     <Box sx={{ mt: 2 }}>
//                                         <TextField
//                                             margin="normal"
//                                             fullWidth
//                                             id="password"
//                                             name="password"
//                                             label="Password"
//                                             type={showPassword ? 'text' : 'password'}
//                                             value={values.password}
//                                             onChange={handleChange}
//                                             error={touched.password && Boolean(errors.password)}
//                                             helperText={touched.password && errors.password}
//                                             InputLabelProps={{
//                                                 shrink: true
//                                             }}
//                                             InputProps={{
//                                                 endAdornment: (
//                                                     <InputAdornment position="end">
//                                                         <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
//                                                             {showPassword ? <VisibilityOff /> : <Visibility />}
//                                                         </IconButton>
//                                                     </InputAdornment>
//                                                 )
//                                             }}
//                                         />
//                                         {error && (
//                                             <Typography color="error" align="start" sx={{ mb: 2 }}>
//                                                 {error}
//                                             </Typography>
//                                         )}
//                                     </Box>

//                                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
//                                         <FormControlLabel control={<Checkbox value="remember" color="primary" size="small" />} label="Remember me" />
//                                         <Link href={`/${subdomain}/forgot-password`} passHref>
//                                             <Typography variant="body2" color="primary">
//                                                 Forgot Password?
//                                             </Typography>
//                                         </Link>
//                                     </Box>

//                                     {/* <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading} sx={{ mt: 3, mb: 2 }}>
//                                         {loading ? 'Logging in...' : 'Login'}
//                                     </Button> */}
//                                     <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading} sx={{ mt: 3, mb: 2 }}>
//                                         {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
//                                     </Button>
//                                 </Box>
//                             </Box>
//                         </RightPanel>
//                     </Grid>
//                 </Grid>
//             </LoginContainer>
//         </>
//     );
// }
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slice/authslice';
import { API_BASE_URL } from '../../utils/index';
import { Box, Button, Checkbox, CircularProgress, Container, CssBaseline, FormControlLabel, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { Circle1, Circle2, Dot, LeftPanel, LoginContainer, RightPanel } from '../../ReuseableStyle/ReusableStyleCom';
import { LoginAPI } from '../../../../api/auth';

export default function DynamicLogin() {
    const { subdomain } = useParams();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [isFirstLogin, setIsFirstLogin] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const location = window.location;
    const heding = location.pathname.split('/')[1];
    const dispatch = useDispatch();
    const [activeDot, setActiveDot] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    const item = [{ img: '/Group.png' }, { img: '/Group.png' }, { img: '/Group.png' }];

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
                    dispatch(setCredentials({ accessToken, refreshToken, isFirstlogin }));
                    setIsFirstLogin(isFirstlogin);
                    localStorage.setItem('crmaccess', accessToken);
                    localStorage.setItem('crmrefresh', refreshToken);

                    Cookies.set('crmaccess', accessToken, {
                        secure: true,
                        sameSite: 'Strict',
                        expires: 1 / 24
                    });

                    Cookies.set('crmrefresh', refreshToken, {
                        secure: true,
                        sameSite: 'Strict',
                        expires: 7
                    });

                    Cookies.set('subdomain', subdomain);
                    setSuccess('Login successful!');
                    router.push(isFirstlogin ? `reset-password` : `dashboard`);
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

    const { values, handleChange, errors, touched, handleSubmit, handleBlur } = formik;

    useEffect(() => {
        if (item?.length > 0) {
            const timer = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % item.length);
                setActiveDot((prevDot) => (prevDot + 1) % item.length);
            }, 5000);
            return () => clearInterval(timer);
        }
    }, []);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <>
            <CssBaseline />
            <LoginContainer maxWidth={false} disableGutters>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <Grid item xs={false} sm={6} md={6} lg={6} width={'50%'} sx={{ display: { xs: 'none', sm: 'block' }, height: '100vh' }}>
                        <LeftPanel elevation={3} width="100%">
                            <Box sx={{ display: 'flex', alignItems: 'center', alignSelf: 'flex-start', p: 1 }}>
                                <IconButton sx={{ color: 'secondary.main' }}>
                                    <AiOutlineThunderbolt />
                                </IconButton>
                                <Typography variant="body1">{heding}</Typography>
                            </Box>

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
                                        <Dot key={index} active={(index === activeDot).toString()} />
                                    ))}
                                </Box>
                            </Box>
                        </LeftPanel>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6} width={'50%'} sx={{ display: { xs: 'none', sm: 'block' }, height: '100vh' }}>
                        <RightPanel>
                            <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', textAlign: 'center' }}>
                                <Typography variant="h6" gutterBottom>
                                    Welcome to {subdomain} Login
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
                                            type="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={Boolean(errors.email)}
                                            helperText={errors.email}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                    </Box>
                                    <Box sx={{ mt: 2 }}>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="password"
                                            name="password"
                                            label="Password"
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
                                            <Typography color="error" align="start" sx={{ mb: 2 }}>
                                                {error}
                                            </Typography>
                                        )}
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                        <FormControlLabel control={<Checkbox value="remember" color="primary" size="small" />} label="Remember me" />
                                        <Link href={`/${subdomain}/forgot-password`} passHref>
                                            <Typography variant="body2" color="primary">
                                                Forgot Password?
                                            </Typography>
                                        </Link>
                                    </Box>

                                    <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading} sx={{ mt: 3, mb: 2 }}>
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
