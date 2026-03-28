'use client';
import { Alert, Box, Button, CircularProgress, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LoginAPI, OtpAPI } from '../../../../api/auth';

interface OtpFormProps {
    mobileNumber?: string;
    onVerify?: (otp: string) => void;
    onResend?: () => void;
    onBack?: () => void;
}

const OtpForm = ({ mobileNumber, onVerify, onResend, onBack }: OtpFormProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const mobileFromUrl = searchParams.get('mobile');
    const subdomain = Cookies.get('subdomain') || 'default';
    const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    
    const phoneNumber = mobileNumber || mobileFromUrl || '';
    
    // Handle OTP input change
    const handleOtpChange = (index: number, value: string) => {
        // Allow only numbers
        if (value && !/^\d*$/.test(value)) return;
        
        const newOtpValues = [...otpValues];
        // Take only the last character if multiple characters are pasted
        const newValue = value.slice(-1);
        newOtpValues[index] = newValue;
        setOtpValues(newOtpValues);

        // Auto-focus next input
        if (newValue && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle OTP paste
    const handleOtpPaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text/plain');
        const otpDigits = pastedData.replace(/\D/g, '').slice(0, 6);
        
        if (otpDigits.length > 0) {
            const newOtpValues = [...otpValues];
            for (let i = 0; i < otpDigits.length && i < 6; i++) {
                newOtpValues[i] = otpDigits[i];
            }
            setOtpValues(newOtpValues);
            
            // Focus on the next empty input or last filled input
            const lastFilledIndex = Math.min(otpDigits.length - 1, 5);
            if (lastFilledIndex < 5) {
                inputRefs.current[lastFilledIndex + 1]?.focus();
            } else {
                inputRefs.current[5]?.focus();
            }
        }
    };

    // Handle backspace key
    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace') {
            if (!otpValues[index] && index > 0) {
                // Move to previous input if current is empty
                const newOtpValues = [...otpValues];
                newOtpValues[index - 1] = '';
                setOtpValues(newOtpValues);
                inputRefs.current[index - 1]?.focus();
            } else if (otpValues[index]) {
                // Clear current input
                const newOtpValues = [...otpValues];
                newOtpValues[index] = '';
                setOtpValues(newOtpValues);
            }
        }
    };

    // Handle OTP verification
    const handleVerifyOtp = async () => {
        const otp = otpValues.join('');
        if (otp.length !== 6) {
            setError('Please enter 6-digit OTP');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // If onVerify prop is provided, use it
            if (onVerify) {
                await OtpAPI(otp);
            } else {
                // Use the OtpAPI for verification
                const payload = {
                    mobile: phoneNumber,
                    otp: otp
                };
                
                const response = await OtpAPI(subdomain, payload);
                console.log('OTP Verification Response:', response);
                Cookies.set('crmrefresh', response.data.refreshToken, { expires: 7 });
                Cookies.set('crmaccess',response.data.accessToken, { expires: 1 });
                localStorage.setItem('otpVerificationResponse', JSON.stringify(response));
                if (response?.data?.accessToken) {
    const finalSubdomain = response?.data?.subdomain || subdomain || 'default';

    // Store data
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('user', JSON.stringify(response.data.user));

    Cookies.set('token', response.data.accessToken, { expires: 1 });
    Cookies.set('subdomain', finalSubdomain, { expires: 1 });
    Cookies.set('user', JSON.stringify(response.data.user), { expires: 1 });

    console.log('Redirecting to:', `/${finalSubdomain}/dashboard`);

    // ✅ Use replace instead of push (prevents stale route issues)
    router.replace(`/${finalSubdomain}/dashboard`);
} else {
    const finalSubdomain = response?.data?.subdomain || subdomain || 'default';

    console.log('Redirecting fallback to:', `/${finalSubdomain}/dashboard`);

    router.replace(`/${finalSubdomain}/dashboard`);
}
            }
        } catch (err) {
            console.error('OTP Verification Error:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle resend OTP
    const handleResendOtp = async () => {
        if (resendTimer > 0) return;
        
        setIsLoading(true);
        setError('');
        
        try {
            if (onResend) {
                await onResend();
            } else {
                // Use the LoginAPI to resend OTP (same API that sends OTP initially)
                const payload = {
                    mobile: phoneNumber
                };
                
                const response = await LoginAPI(subdomain, payload);
                console.log('Resend OTP Response:', response);
                
                // Store resend response in localStorage
                localStorage.setItem('resendOtpResponse', JSON.stringify(response));
                
                if (response.isError) {
                    setError(typeof response?.data === 'string' ? response?.data : 'Failed to resend OTP');
                } else {
                    // Successfully resent OTP
                    setError('');
                    // Clear previous OTP inputs
                    setOtpValues(['', '', '', '', '', '']);
                    // Focus on first input
                    setTimeout(() => {
                        inputRefs.current[0]?.focus();
                    }, 100);
                    
                    // Start the resend timer
                    setResendTimer(30);
                    const timer = setInterval(() => {
                        setResendTimer((prev) => {
                            if (prev <= 1) {
                                clearInterval(timer);
                                return 0;
                            }
                            return prev - 1;
                        });
                    }, 1000);
                    
                    // Show success message (optional)
                    // You can add a success toast/alert here if needed
                }
            }
        } catch (err) {
            console.error('Resend OTP Error:', err);
            setError('Failed to resend OTP. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Initialize refs array and start timer on mount
    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, 6);
        
        // Auto-focus first input on mount
        setTimeout(() => {
            inputRefs.current[0]?.focus();
        }, 100);
        
        // Start resend timer if not already started and phone number exists
        if (resendTimer === 0 && phoneNumber) {
            setResendTimer(30);
            const timer = setInterval(() => {
                setResendTimer((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            
            return () => clearInterval(timer);
        }
    }, [phoneNumber]);

    // Clear error when OTP values change
    useEffect(() => {
        if (error) {
            setError('');
        }
    }, [otpValues]);

    return (
        <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto', textAlign: 'center', p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 1, color: '#2D3142' }}>
                Verify OTP
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: '#6B7280' }}>
                Enter the 6-digit code sent to <strong>{phoneNumber}</strong>
            </Typography>
            
            {/* 6-Digit OTP Input Fields */}
            <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', mb: 3, flexWrap: 'wrap' }}>
                {otpValues.map((value, index) => (
                    <TextField
                        key={index}
                        inputRef={(el) => { inputRefs.current[index] = el; }}
                        value={value}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handleOtpPaste : undefined}
                        variant="outlined"
                        inputProps={{
                            maxLength: 1,
                            style: { 
                                textAlign: 'center', 
                                fontSize: '1.5rem', 
                                padding: '12px 0',
                                width: '50px'
                            }
                        }}
                        sx={{
                            width: { xs: '45px', sm: '50px' },
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&:hover fieldset': {
                                    borderColor: '#F5921E',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#F5921E',
                                },
                            },
                        }}
                        autoFocus={index === 0}
                        disabled={isLoading}
                    />
                ))}
            </Box>
            
            {/* Error Message */}
            {error && (
                <Alert severity="error" sx={{ mb: 2, textAlign: 'left' }}>
                    {error}
                </Alert>
            )}
            
            {/* Verify OTP Button (Post Button) */}
            <Button
                fullWidth
                variant="contained"
                onClick={handleVerifyOtp}
                disabled={isLoading || otpValues.some(v => !v)}
                sx={{
                    py: 1.5,
                    mb: 2,
                    backgroundColor: '#00008B',
                    '&:hover': { backgroundColor: '#4169E1' },
                    '&.Mui-disabled': { backgroundColor: '#ADD8E6' },
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem'
                }}
            >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Verify & Continue'}
            </Button>
            
            {/* Resend OTP Section */}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                <Button
                    variant="text"
                    onClick={handleResendOtp}
                    disabled={resendTimer > 0 || isLoading}
                    sx={{
                        color: '#F5921E',
                        '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' },
                        textTransform: 'none'
                    }}
                >
                    Resend OTP
                </Button>
                {resendTimer > 0 && (
                    <Typography variant="body2" sx={{ color: '#6B7280' }}>
                        in {resendTimer}s
                    </Typography>
                )}
            </Box>
            
            {/* Change Mobile Number Button */}
            {onBack && (
                <Button
                    variant="text"
                    fullWidth
                    onClick={() => {
                        setOtpValues(['', '', '', '', '', '']);
                        setError('');
                        onBack();
                    }}
                    sx={{ mt: 2, color: '#6B7280', textTransform: 'none' }}
                >
                    Change Mobile Number
                </Button>
            )}
        </Box>
    );
};

export default OtpForm;