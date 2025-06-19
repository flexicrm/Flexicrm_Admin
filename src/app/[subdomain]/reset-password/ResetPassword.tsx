'use client';
import { useParams } from 'next/navigation';
import { CssBaseline, Grid } from '@mui/material';
import { LeftPanel, LoginContainer, RightPanel } from '../../ReuseableStyle/ReusableStyleCom';
import LoginSlider from '../../Components/Athu/LoginSlider';
import ResetPasswordForm from '../../Components/Athu/Reset-password';

export default function ResetPasswordPage({ slug }: any) {
    const { subdomain } = useParams();

    return (
        <>
            <CssBaseline />
            <LoginContainer maxWidth={false} disableGutters>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    {/* Left Panel - Same as login page */}
                    <Grid size={{ xs: false, sm: 6, md: 6, lg: 6 }} sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <LeftPanel elevation={3}>
                            <LoginSlider />
                        </LeftPanel>
                    </Grid>

                    {/* Right Panel - Modified for password reset */}
                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }} sx={{ height: '100vh' }}>
                        <RightPanel>
                            <ResetPasswordForm slug={slug} subdomain={subdomain as string} />
                        </RightPanel>
                    </Grid>
                </Grid>
            </LoginContainer>
        </>
    );
}
