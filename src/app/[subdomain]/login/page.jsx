// "use client";

// import { Col, Row } from "react-bootstrap";
// import React, { useEffect, useState } from "react";
// import { Password } from "primereact/password";
// import { InputText } from "primereact/inputtext";
// import Link from "next/link";
// import axios from "axios";
// import { useParams, useRouter } from "next/navigation";
// import "../../styles/login.scss";
// // import { API_BASE_URL } from "@/app/utils";
// import Cookies from "js-cookie";
// import { Checkbox } from "primereact/checkbox";
// import { Button } from "primereact/button";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { AiOutlineThunderbolt } from "react-icons/ai";
// import { CiMail } from "react-icons/ci";
// import { IoIosRadioButtonOn, IoMdRadioButtonOff } from "react-icons/io";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "../../store/slice/authslice";
// // import { setCredentials } from "@/app/store/slice/authslice";
// import { API_BASE_URL } from "../../utils/index";

// export default function DynamicLogin() {
//   const { values, handleChange, errors, touched } = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: yup.object({
//       email: yup.string().email("Invalid email").required("Email is required"),
//       password: yup.string().required("Password is required"),
//     }),
//     onSubmit: (values) => {
//       handleLogin(values);
//     },
//   });

//   const { subdomain } = useParams();
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isFirstLogin, setIsFirstLogin] = useState(false);
//   const router = useRouter();
//   const location = window.location;
//   const heding = location.pathname.split("/")[1];
//   const dispatch = useDispatch();
//   const [activeDot, setActiveDot] = useState(0);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/user/${subdomain}/login`,
//         { email: values.email, password: values.password }
//       );
//       const data = response.data.data || null;
//       const { accessToken, refreshToken, isFirstlogin } = data;
//       dispatch(
//         setCredentials({
//           accessToken: accessToken,
//           refreshToken: refreshToken,
//           isFirstlogin: isFirstlogin,
//         })
//       );
//       setIsFirstLogin(data.isFirstlogin);
//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("refreshToken", refreshToken);
//       Cookies.set("accessToken", accessToken, {
//         secure: true,
//         sameSite: "Strict",
//         expires: 1 / 24,
//       });
//       Cookies.set("refreshToken", refreshToken, {
//         secure: true,
//         sameSite: "Strict",
//         expires: 7,
//       });

//       Cookies.set("subdomain", subdomain);
//       setSuccess("Login successful!");

//       if (data.isFirstlogin) {
//         router.push(`change-password`);
//       } else {
//         router.push(`dashboard`);
//       }
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || "Login failed!";
//       setError(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     // fetchData();

//     if (item.length > 0) {
//       const timer = setInterval(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % item.length);
//         setActiveDot((prevDot) => (prevDot + 1) % item.length);
//       }, 5000); // Set interval to 5 seconds

//       return () => clearInterval(timer);
//     }
//   }, []); // Depend on item.length to restart timer when quotes are fetched

//   const item = [{ img: "/Group.png" },
//   { img: "/Group.png" },
//   { img: "/Group.png" },
//   ]
//   return (
//     <div className="container-login">
//       <div className="">
//         <Row className="login-row">
//           <Col className="login-col1 d-none d-sm-block " md={6}>
//             <div className=" d-flex p-1">
//               <span className="ms-3">
//                 <img src="../image/Exclude.png" alt="" style={{ width: "20px" }} />
//                 {/* <AiOutlineThunderbolt /> */}
//               </span>{" "}
//               <span className="ms-2">

//                 {heding}
//               </span>
//             </div>
//             <div className="">
//               <div className="">
//                 {/* <h5 className="text-center ">Welcome to User Login</h5> */}
//                 <div className="align-self-center circle-1">
//                   <div className="circle-2 text-center ">
//                     <img src={item[currentIndex].img} alt="Group" loading="lazy" />
//                   </div>
//                 </div>
//               </div>
//               <h6 className="text-center  mt-5">
//                 Customizable Multipurpose Dashboard
//               </h6>
//               <p className="text-center  mt-2" style={{ fontSize: "12px" }}>
//                 Everything you need in an easily customizable dashboard.
//               </p>
//               <div className="dots-container">
//                 {item.map((_, index) => (
//                   <div
//                     key={index}
//                     className={`dot ${index === activeDot ? "active" : ""}`}
//                   ></div>
//                 ))}
//               </div>
//             </div>
//           </Col>

//           <Col className="align-self-center" md={6}>
//             <div className="login-container mt-5 ">
//               <div className=" login-layout">
//                 <div className="container">
//                   <div className="login-layout-container">
//                     <h6 className=""> Welcome to {subdomain} Login</h6>
//                     <form onSubmit={handleLogin}>
//                       <Row>
//                         <Col>
//                           {error && (
//                             <p className="text-danger text-center" role="alert">
//                               {error}
//                             </p>
//                           )}
//                           {success && (
//                             <p
//                               className="text-success text-center"
//                               role="alert"
//                             >
//                               {success}
//                             </p>
//                           )}
//                         </Col>
//                         <Col md={12}>
//                           <div className="mt-0">
//                             <InputText
//                               value={values.email}
//                               onChange={handleChange}
//                               id="email"
//                               placeholder="Email"
//                               type="email"
//                               required
//                               aria-label="Email"
//                               className="w-100"
//                             />
//                             {errors.email && (
//                               <small className="text-danger">
//                                 {errors.email}
//                               </small>
//                             )}
//                           </div>
//                         </Col>
//                         <Col md={12}>
//                           <div className="mt-2 w-100 login-password">
//                             <Password
//                               id="password"
//                               value={values.password}
//                               onChange={handleChange}
//                               placeholder="Password"
//                               toggleMask
//                               name="password"
//                               className="w-100"
//                               required
//                               aria-label="Password"
//                             />
//                             {errors.password && (
//                               <small className="text-danger">
//                                 {errors.password}
//                               </small>
//                             )}
//                           </div>
//                         </Col>
//                         <Col>
//                           <div className="d-flex align-self-center mt-3">
//                             <div className="col-sm-12 col-md-6">
//                               <Checkbox />
//                               <label htmlFor="" className="ms-2">
//                                 REMEMER ME
//                               </label>
//                             </div>
//                             <div className="col-sm-12 col-md-6">
//                               <p className="fs-6 text-end">
//                                 <Link href="#" className="text-end">
//                                   Forgot Password?
//                                 </Link>
//                               </p>
//                             </div>
//                           </div>
//                           <div className="col-sm-12 mt-1">
//                             <Button
//                               className="w-100 submit-btn"
//                               type="submit"
//                               disabled={loading}
//                             >
//                               {loading ? " login..." : "Login"}
//                             </Button>
//                           </div>
//                         </Col>
//                       </Row>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </div>
//     </div>
//   );
// }
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slice/authslice';
import { API_BASE_URL } from '../../utils/index';
import { Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, IconButton, InputAdornment, Paper, TextField, Typography, styled } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { Circle1, Circle2, Dot, LeftPanel, LoginContainer, RightPanel } from '../../ReuseableStyle/ReusableStyleCom';
import { LoginAPI } from '../../../../api/auth';

// Create a custom theme

// Styled components

export default function DynamicLogin() {
    const { values, handleChange, errors, touched } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            email: yup.string().email('Invalid email').required('Email is required'),
            password: yup.string().required('Password is required')
        }),
        onSubmit: (values) => {
            handleLogin(values);
        }
    });

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

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        const paylod = { email: values.email, password: values.password };
        try {
            // const response = await axios.post(`${API_BASE_URL}/user/${subdomain}/login`, );
            // const response = await axios.post(`${API_BASE_URL}/user/${subdomain}/login`, { email: values.email, password: values.password });
            const response = await LoginAPI(subdomain, paylod);
            console.log(response, 'response');
            if (response.isError) {
                setError(response.data);
                // setSuccess(response.data);
            } else {
                const data = response.data || null;
                const { accessToken, refreshToken, isFirstlogin } = data;
                dispatch(
                    setCredentials({
                        accessToken: accessToken,
                        refreshToken: refreshToken,
                        isFirstlogin: isFirstlogin
                    })
                );
                setIsFirstLogin(data.isFirstlogin);
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
                if (data.isFirstlogin) {
                    router.push(`reset-password`);
                } else {
                    router.push(`dashboard`);
                }
            }
        } catch (err) {
            // console.log(err, 'error');
            // const errorMessage = err.response?.data?.message || 'Login failed!';
            // setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (item.length > 0) {
            const timer = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % item.length);
                setActiveDot((prevDot) => (prevDot + 1) % item.length);
            }, 5000);

            return () => clearInterval(timer);
        }
    }, []);

    const item = [{ img: '/Group.png' }, { img: '/Group.png' }, { img: '/Group.png' }];

    return (
        <>
            <CssBaseline />
            <LoginContainer maxWidth={false} disableGutters>
                {/* <Grid container component="main" sx={{ height: '100vh' }}>
                    <Grid item xs={false} sm={6} md={8} lg={10}>
                        <LeftPanel>
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
                                        <Dot key={index} active={index === activeDot} />
                                    ))}
                                </Box>
                            </Box>
                        </LeftPanel>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <RightPanel>
                            <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', textAlign: 'center' }}>
                                <Typography variant="h6" gutterBottom>
                                    Welcome to {subdomain} Login
                                </Typography>

                                <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
                                    {error && (
                                        <Typography color="error" align="center" sx={{ mb: 2 }}>
                                            {error}
                                        </Typography>
                                    )}

                                    {success && (
                                        <Typography color="success" align="center" sx={{ mb: 2 }}>
                                            {success}
                                        </Typography>
                                    )}
                                    <Typography>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="email"
                                            name="email"
                                            label="Email"
                                            type="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                    </Typography>
                                    <Typography sx={{ mt: 2 }}>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="password"
                                            name="password"
                                            label="Password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={handleChange}
                                            error={touched.password && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
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
                                    </Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                                        <Link href="#" passHref>
                                            <Typography variant="body2" color="primary">
                                                Forgot Password?
                                            </Typography>
                                        </Link>
                                    </Box>

                                    <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading} sx={{ mt: 3, mb: 2 }}>
                                        {loading ? 'Logging in...' : 'Login'}
                                    </Button>
                                </Box>
                            </Box>
                        </RightPanel>
                    </Grid>
                </Grid> */}
                <Grid container component="main" sx={{ height: '100vh' }}>
                    {/* Left Panel - now 6 columns */}
                    <Grid item xs={false} sm={6} md={6} lg={6} width={'50%'} sx={{ display: { xs: 'none', sm: 'block' }, height: '100vh' }}>
                        <LeftPanel elevation={3} width="100%">
                            {/* Left panel content remains the same */}
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
                                        <Dot key={index} active={index === activeDot} />
                                    ))}
                                </Box>
                            </Box>
                        </LeftPanel>
                    </Grid>

                    {/* Right Panel - now 6 columns (matches left panel) */}
                    <Grid item xs={12} sm={6} md={6} lg={6} width={'50%'} sx={{ display: { xs: 'none', sm: 'block' }, height: '100vh' }}>
                        <RightPanel>
                            {/* Right panel content remains the same */}
                            <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', textAlign: 'center' }}>
                                <Typography variant="h6" gutterBottom>
                                    Welcome to {subdomain} Login
                                </Typography>

                                <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
                                    {error && (
                                        <Typography color="error" align="center" sx={{ mb: 2 }}>
                                            {error}
                                        </Typography>
                                    )}

                                    {success && (
                                        <Typography color="success" align="center" sx={{ mb: 2 }}>
                                            {success}
                                        </Typography>
                                    )}
                                    <Typography>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="email"
                                            name="email"
                                            label="Email"
                                            type="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            error={touched.email && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
                                        />
                                    </Typography>
                                    <Typography sx={{ mt: 2 }}>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="password"
                                            name="password"
                                            label="Password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={values.password}
                                            onChange={handleChange}
                                            error={touched.password && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                            InputLabelProps={{
                                                shrink: true
                                            }}
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
                                    </Typography>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                                        <Link href={`/${subdomain}/forgot-password`} passHref>
                                            <Typography variant="body2" color="primary">
                                                Forgot Password?
                                            </Typography>
                                        </Link>
                                    </Box>

                                    <Button type="submit" fullWidth variant="contained" color="primary" disabled={loading} sx={{ mt: 3, mb: 2 }}>
                                        {loading ? 'Logging in...' : 'Login'}
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
