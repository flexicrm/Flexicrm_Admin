'use client';
import { CssBaseline, Grid } from '@mui/material';
import { LeftPanel, LoginContainer, RightPanel } from '../../ReuseableStyle/ReusableStyleCom';
import LoginSlider from '../../Components/Athu/LoginSlider';
import LoginForm from '../../Components/Athu/LoginForm';
export default function DynamicLogin() {
    return (
        <>
            <CssBaseline />
            <LoginContainer maxWidth={false} disableGutters>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <Grid size={{ xs: false, sm: 6, md: 6, lg: 6 }} sx={{ display: { xs: 'none', sm: 'block' }, height: '100vh' }}>
                        <LeftPanel width="100%">
                            <LoginSlider />
                        </LeftPanel>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6, md: 6, lg: 6 }} sx={{ height: '100vh' }}>
                        <RightPanel>
                            <LoginForm />
                        </RightPanel>
                    </Grid>
                </Grid>
            </LoginContainer>
        </>
    );
}
