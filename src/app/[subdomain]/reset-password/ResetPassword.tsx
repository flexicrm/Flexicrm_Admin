// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams, useSearchParams } from 'next/navigation';
// import axios from 'axios';
// import { Box, Button, Container, CssBaseline, Grid, IconButton, Paper, TextField, Typography, styled, InputAdornment } from '@mui/material';
// import { API_BASE_URL } from '../../utils/index';
// import { AiOutlineThunderbolt, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
// import { Circle1, Circle2, Dot, LeftPanel, LoginContainer, RightPanel } from '../../ReuseableStyle/ReusableStyleCom';
// import Link from 'next/link';
// import { Changepassword, ResetPasswordChange } from '../../../../api/auth';

// export default function ResetPasswordPage({ slug }) {
//     const { subdomain } = useParams();
//     console.log(subdomain, 'subdomain>>>>>>>>>>>>>>');
//     const searchParams = useSearchParams();
//     // const token = searchParams.get('token');
//     const [formData, setFormData] = useState({
//         oldPassword: '',
//         newPassword: '',
//         confirmPassword: ''
//     });
//     const [showPassword, setShowPassword] = useState({
//         oldPassword: false,
//         newPassword: false,
//         confirmPassword: false
//     });
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [activeDot, setActiveDot] = useState(0);
//     const [currentIndex, setCurrentIndex] = useState(0);

//     const item = [{ img: '/Group.png' }, { img: '/Group.png' }, { img: '/Group.png' }];

//     useEffect(() => {
//         if (item.length > 0) {
//             const timer = setInterval(() => {
//                 setCurrentIndex((prevIndex) => (prevIndex + 1) % item.length);
//                 setActiveDot((prevDot) => (prevDot + 1) % item.length);
//             }, 5000);

//             return () => clearInterval(timer);
//         }
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const toggleShowPassword = (field) => {
//         setShowPassword((prev) => ({
//             ...prev,
//             [field]: !prev[field]
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (subdomain) {
//             if (formData.newPassword !== formData.confirmPassword) {
//                 setError("Passwords don't match");
//                 return;
//             }

//             setLoading(true);
//             setError('');
//             setMessage('');

//             try {
//                 const payload = slug
//                     ? {
//                           // oldPassword: formData.oldPassword,
//                           // newPassword: formData.newPassword
//                           Newpassword: formData.newPassword
//                       }
//                     : {
//                           oldPassword: formData.oldPassword,
//                           newPassword: formData.newPassword
//                       };

//                 const response = slug ? await ResetPasswordChange(subdomain, payload, slug) : Changepassword(subdomain, payload);

//                 const data = await response;
//                 console.log(data, 'response');
//                 if (data.isError) {
//                     setError(data.message);
//                 } else {
//                     setMessage(data.message || 'Password has been changed successfully');
//                     window.location.href = `/${subdomain}/dashboard`;
//                 }
//             } catch (err) {
//                 setError(err.response?.data || 'Failed to change password');
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     return (
//         <>
//             <CssBaseline />
//             <LoginContainer maxWidth={false} disableGutters>
//                 <Grid container component="main" sx={{ height: '100vh' }}>
//                     {/* Left Panel - Same as login page */}
//                     <Grid item xs={false} sm={6} md={6} lg={6} width={'50%'} sx={{ display: { xs: 'none', sm: 'block' } }}>
//                         <LeftPanel elevation={3}>
//                             <Box sx={{ display: 'flex', alignItems: 'center', alignSelf: 'flex-start', p: 1 }}>
//                                 <IconButton sx={{ color: 'secondary.main' }}>
//                                     <AiOutlineThunderbolt />
//                                 </IconButton>
//                                 <Typography variant="body1">{subdomain}</Typography>
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
//                                         <Dot key={index} active={index === activeDot} />
//                                     ))}
//                                 </Box>
//                             </Box>
//                         </LeftPanel>
//                     </Grid>

//                     {/* Right Panel - Modified for password reset */}
//                     <Grid item xs={12} sm={6} md={6} lg={6} width={'50%'} sx={{ display: { xs: 'none', sm: 'block' } }}>
//                         <RightPanel>
//                             <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', textAlign: 'center' }}>
//                                 <Typography variant="h6" gutterBottom>
//                                     {slug ? ' Rest Your Password ' : 'Change Password '}
//                                 </Typography>
//                                 <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
//                                     Please enter your current and new password.
//                                 </Typography>

//                                 <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//                                     {error && (
//                                         <Typography color="error" align="center" sx={{ mb: 2 }}>
//                                             {error}
//                                         </Typography>
//                                     )}
//                                     {message && (
//                                         <Typography color="success" align="center" sx={{ mb: 2 }}>
//                                             {message}
//                                         </Typography>
//                                     )}
//                                     {slug ? (
//                                         <>
//                                             <TextField
//                                                 margin="normal"
//                                                 required
//                                                 fullWidth
//                                                 name="newPassword"
//                                                 label="New Password"
//                                                 type={showPassword.newPassword ? 'text' : 'password'}
//                                                 id="newPassword"
//                                                 value={formData.newPassword}
//                                                 onChange={handleChange}
//                                                 InputProps={{
//                                                     endAdornment: (
//                                                         <InputAdornment position="end">
//                                                             <IconButton onClick={() => toggleShowPassword('newPassword')} edge="end">
//                                                                 {showPassword.newPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
//                                                             </IconButton>
//                                                         </InputAdornment>
//                                                     )
//                                                 }}
//                                                 sx={{ mb: 2 }}
//                                             />

//                                             <TextField
//                                                 margin="normal"
//                                                 required
//                                                 fullWidth
//                                                 name="confirmPassword"
//                                                 label="Confirm New Password"
//                                                 type={showPassword.confirmPassword ? 'text' : 'password'}
//                                                 id="confirmPassword"
//                                                 value={formData.confirmPassword}
//                                                 onChange={handleChange}
//                                                 InputProps={{
//                                                     endAdornment: (
//                                                         <InputAdornment position="end">
//                                                             <IconButton onClick={() => toggleShowPassword('confirmPassword')} edge="end">
//                                                                 {showPassword.confirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
//                                                             </IconButton>
//                                                         </InputAdornment>
//                                                     )
//                                                 }}
//                                                 sx={{ mb: 2 }}
//                                             />
//                                         </>
//                                     ) : (
//                                         <>
//                                             <TextField
//                                                 margin="normal"
//                                                 required
//                                                 fullWidth
//                                                 name="oldPassword"
//                                                 label="Current Password"
//                                                 type={showPassword.oldPassword ? 'text' : 'password'}
//                                                 id="oldPassword"
//                                                 value={formData.oldPassword}
//                                                 onChange={handleChange}
//                                                 InputProps={{
//                                                     endAdornment: (
//                                                         <InputAdornment position="end">
//                                                             <IconButton onClick={() => toggleShowPassword('oldPassword')} edge="end">
//                                                                 {showPassword.oldPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
//                                                             </IconButton>
//                                                         </InputAdornment>
//                                                     )
//                                                 }}
//                                                 sx={{ mb: 2 }}
//                                             />

//                                             <TextField
//                                                 margin="normal"
//                                                 required
//                                                 fullWidth
//                                                 name="newPassword"
//                                                 label="New Password"
//                                                 type={showPassword.newPassword ? 'text' : 'password'}
//                                                 id="newPassword"
//                                                 value={formData.newPassword}
//                                                 onChange={handleChange}
//                                                 InputProps={{
//                                                     endAdornment: (
//                                                         <InputAdornment position="end">
//                                                             <IconButton onClick={() => toggleShowPassword('newPassword')} edge="end">
//                                                                 {showPassword.newPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
//                                                             </IconButton>
//                                                         </InputAdornment>
//                                                     )
//                                                 }}
//                                                 sx={{ mb: 2 }}
//                                             />

//                                             <TextField
//                                                 margin="normal"
//                                                 required
//                                                 fullWidth
//                                                 name="confirmPassword"
//                                                 label="Confirm New Password"
//                                                 type={showPassword.confirmPassword ? 'text' : 'password'}
//                                                 id="confirmPassword"
//                                                 value={formData.confirmPassword}
//                                                 onChange={handleChange}
//                                                 InputProps={{
//                                                     endAdornment: (
//                                                         <InputAdornment position="end">
//                                                             <IconButton onClick={() => toggleShowPassword('confirmPassword')} edge="end">
//                                                                 {showPassword.confirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
//                                                             </IconButton>
//                                                         </InputAdornment>
//                                                     )
//                                                 }}
//                                                 sx={{ mb: 2 }}
//                                             />
//                                         </>
//                                     )}

//                                     <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 2, mb: 2 }}>
//                                         {loading ? 'Changing...' : 'Change Password'}
//                                     </Button>

//                                     <Typography variant="body2" sx={{ mt: 2 }}>
//                                         <Link href={`/${subdomain}/login`} passHref style={{ textDecoration: 'none', color: 'primary.main' }}>
//                                             Back to login
//                                         </Link>
//                                     </Typography>
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
import { useContext, useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
// import axios from 'axios';
import { Box, Button, CssBaseline, Grid, IconButton, TextField, Typography, InputAdornment } from '@mui/material';
import { AiOutlineThunderbolt, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Circle1, Circle2, Dot, LeftPanel, LoginContainer, RightPanel } from '../../ReuseableStyle/ReusableStyleCom';
import Link from 'next/link';
import { Changepassword, ResetPasswordChange } from '../../../../api/auth';
import userContext from '../../UseContext/UseContext';
import Cookies from 'js-cookie';

export default function ResetPasswordPage({ slug }: any) {
    const { subdomain } = useParams();
    const searchParams = useSearchParams();
    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeDot, setActiveDot] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [errors, setErrors] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const contextvalue = useContext(userContext);
    const { flexilogo } = contextvalue;

    const subdomain2 = Cookies.get('subdomain');
    const item = [{ img: '/Group.png' }, { img: '/Group.png' }, { img: '/Group.png' }];

    useEffect(() => {
        if (item.length > 0) {
            const timer = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % item?.length);
                setActiveDot((prevDot) => (prevDot + 1) % item?.length);
            }, 5000);

            return () => clearInterval(timer);
        }
    }, [item.length]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        // Clear the error message when the user types
        setErrors((prev) => ({
            ...prev,
            [name]: ''
        }));
    };

    const toggleShowPassword = (field) => {
        setShowPassword((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const validatePassword = (password) => {
        // Example: Password must be at least 8 characters long
        return password.length >= 8;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (subdomain) {
            let isValid = true;
            const newErrors = { ...errors };

            if (!slug && !formData.oldPassword) {
                newErrors.oldPassword = 'Current password is required';
                isValid = false;
            }

            if (!validatePassword(formData.newPassword)) {
                newErrors.newPassword = 'Password must be at least 8 characters long';
                isValid = false;
            }

            if (formData.newPassword !== formData.confirmPassword) {
                newErrors.confirmPassword = "Passwords don't match";
                isValid = false;
            }

            setErrors(newErrors);

            if (!isValid) {
                return;
            }

            setLoading(true);
            setError('');
            setMessage('');

            try {
                const payload = slug
                    ? {
                          Newpassword: formData.newPassword
                      }
                    : {
                          oldPassword: formData.oldPassword,
                          newPassword: formData.newPassword
                      };

                const response = slug ? await ResetPasswordChange(subdomain, payload, slug) : Changepassword(subdomain, payload);

                const data = await response;
                console.log(data, 'response');
                if (data.isError) {
                    setError(data.message);
                } else {
                    setMessage(data.message || 'Password has been changed successfully');
                    window.location.href = `/${subdomain}/dashboard`;
                }
            } catch (err) {
                setError(err.response?.data || 'Failed to change password');
            } finally {
                setLoading(false);
            }
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

                    {/* Right Panel - Modified for password reset */}
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
                                    {slug ? 'Reset Your Password' : 'Change Password'}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                                    Please enter your current and new password.
                                </Typography>

                                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                                    {error && (
                                        <Typography color="error" align="center" sx={{ mb: 2 }}>
                                            {error}
                                        </Typography>
                                    )}
                                    {message && (
                                        <Typography color="success" align="center" sx={{ mb: 2 }}>
                                            {message}
                                        </Typography>
                                    )}
                                    {slug ? (
                                        <>
                                            <TextField
                                                margin="normal"
                                                // required
                                                fullWidth
                                                name="newPassword"
                                                label="New Password"
                                                type={showPassword.newPassword ? 'text' : 'password'}
                                                id="newPassword"
                                                value={formData.newPassword}
                                                onChange={handleChange}
                                                error={!!errors.newPassword}
                                                helperText={errors.newPassword}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={() => toggleShowPassword('newPassword')} edge="end">
                                                                {showPassword.newPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                sx={{ mb: 2 }}
                                            />

                                            <TextField
                                                margin="normal"
                                                // required
                                                fullWidth
                                                name="confirmPassword"
                                                label="Confirm New Password"
                                                type={showPassword.confirmPassword ? 'text' : 'password'}
                                                id="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                error={!!errors.confirmPassword}
                                                helperText={errors.confirmPassword}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={() => toggleShowPassword('confirmPassword')} edge="end">
                                                                {showPassword.confirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                sx={{ mb: 2 }}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <TextField
                                                margin="normal"
                                                // required
                                                fullWidth
                                                name="oldPassword"
                                                label="Current Password"
                                                type={showPassword.oldPassword ? 'text' : 'password'}
                                                id="oldPassword"
                                                value={formData.oldPassword}
                                                onChange={handleChange}
                                                error={!!errors.oldPassword}
                                                helperText={errors.oldPassword}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={() => toggleShowPassword('oldPassword')} edge="end">
                                                                {showPassword.oldPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                sx={{ mb: 2 }}
                                            />

                                            <TextField
                                                margin="normal"
                                                // required
                                                fullWidth
                                                name="newPassword"
                                                label="New Password"
                                                type={showPassword.newPassword ? 'text' : 'password'}
                                                id="newPassword"
                                                value={formData.newPassword}
                                                onChange={handleChange}
                                                error={!!errors.newPassword}
                                                helperText={errors.newPassword}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={() => toggleShowPassword('newPassword')} edge="end">
                                                                {showPassword.newPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                sx={{ mb: 2 }}
                                            />

                                            <TextField
                                                margin="normal"
                                                // required
                                                fullWidth
                                                name="confirmPassword"
                                                label="Confirm New Password"
                                                type={showPassword.confirmPassword ? 'text' : 'password'}
                                                id="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                error={!!errors.confirmPassword}
                                                helperText={errors.confirmPassword}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton onClick={() => toggleShowPassword('confirmPassword')} edge="end">
                                                                {showPassword.confirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    )
                                                }}
                                                sx={{ mb: 2 }}
                                            />
                                        </>
                                    )}

                                    <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ mt: 2, mb: 2 }}>
                                        {loading ? 'Changing...' : 'Change Password'}
                                    </Button>

                                    <Typography variant="body2" sx={{ mt: 2 }}>
                                        <Link href={`/${subdomain}/login`} passHref style={{ textDecoration: 'none', color: 'primary.main' }}>
                                            Back to login
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
