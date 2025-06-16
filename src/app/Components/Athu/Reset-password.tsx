'use client';
import { useState, useContext } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import userContext from '../../UseContext/UseContext';
import { Changepassword, ResetPasswordChange } from '../../../../api/auth';
import PasswordField from '../../[subdomain]/reset-password/PasswordField';
import { useRouter } from 'next/navigation';

interface Props {
    slug?: string;
    subdomain: string;
}

export default function ResetPasswordForm({ slug, subdomain }: Props) {
    const { flexilogo } = useContext(userContext);
    const [formData, setFormData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const [showPassword, setShowPassword] = useState({ oldPassword: false, newPassword: false, confirmPassword: false });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
    const subdomain2 = Cookies.get('subdomain') || '';
    const router = useRouter();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const toggleShowPassword = (field: keyof typeof showPassword) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const validate = () => {
        const newErrors: any = {};
        let valid = true;

        if (!slug && !formData.oldPassword) {
            newErrors.oldPassword = 'Current password is required';
            valid = false;
        }

        if (formData.newPassword.length < 8) {
            newErrors.newPassword = 'Password must be at least 8 characters';
            valid = false;
        }

        if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords don't match";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const payload = slug ? { Newpassword: formData.newPassword } : { oldPassword: formData.oldPassword, newPassword: formData.newPassword };

            const res = slug ? await ResetPasswordChange(subdomain, payload, slug) : await Changepassword(subdomain, payload);

            if (res?.isError) {
                setError(res.message);
            } else {
                setMessage(res.message);
                router.push(`/${subdomain}/dashboard`);
            }
        } catch (err: any) {
            setError(err.response?.data || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', textAlign: 'center' }}>
            {flexilogo?.logo ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: '32px', width: 120, height: 120, borderRadius: '50%', boxShadow: '0 0px 3px rgba(0, 0, 0, 0.2)', margin: '0 auto 22px auto', border: '1px solid white' }}>
                    <Box component="img" src={flexilogo.logo || '/logo/android-icon-72x72.png'} alt="FlexiCRM Logo" sx={{ width: '110px', height: 'auto' }} />
                </Box>
            ) : (
                <Typography variant="h6" gutterBottom sx={{ mb: '32px', fontWeight: 'bold', textTransform: 'capitalize ' }}>
                    {subdomain2?.replace(/-/g, ' ')}
                </Typography>
            )}

            <Typography variant="h6" gutterBottom>
                {slug ? 'Reset Your Password' : 'Change Password'}
            </Typography>
            <Typography variant="body2">{slug ? 'Set a new password for your account.' : 'Enter your current and new password.'}</Typography>

            {error && (
                <Typography color="error" sx={{ mb: 2 }}>
                    {error}
                </Typography>
            )}
            {message && (
                <Typography color="success.main" sx={{ mb: 2 }}>
                    {message}
                </Typography>
            )}

            <Box component="form" onSubmit={handleSubmit}>
                {!slug && (
                    <PasswordField
                        label="Current Password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        show={showPassword.oldPassword}
                        toggleShow={() => toggleShowPassword('oldPassword')}
                        onChange={handleChange}
                        error={!!errors.oldPassword}
                        helperText={errors.oldPassword}
                    />
                )}

                <PasswordField
                    label="New Password"
                    name="newPassword"
                    value={formData.newPassword}
                    show={showPassword.newPassword}
                    toggleShow={() => toggleShowPassword('newPassword')}
                    onChange={handleChange}
                    error={!!errors.newPassword}
                    helperText={errors.newPassword}
                />

                <PasswordField
                    label="Confirm Password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    show={showPassword.confirmPassword}
                    toggleShow={() => toggleShowPassword('confirmPassword')}
                    onChange={handleChange}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                />

                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }} disabled={loading}>
                    {loading ? 'Please wait...' : slug ? 'Reset Password' : 'Change Password'}
                </Button>
            </Box>
        </Box>
    );
}
