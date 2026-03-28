'use client';

import { CssBaseline, Grid } from '@mui/material';
import RegisterForm from '../Components/Athu/RegisterForm';
import RegisterSlider from '../Components/Athu/RegisterSlider';
import { LeftPanel, LoginContainer, RightPanel } from '../ReuseableStyle/ReusableStyleCom';

export default function DynamicRegister() {
    return (
        <>
            <CssBaseline />
            <LoginContainer maxWidth={false} disableGutters>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    
                    {/* Left Side */}
                    <Grid
                        size={{ xs: false, sm: 6 }}
                        sx={{ display: { xs: 'none', sm: 'block' }, height: '100vh' }}
                    >
                        <LeftPanel width="100%">
                            <RegisterSlider />
                        </LeftPanel>
                    </Grid>

                    {/* Right Side */}
                    <Grid size={{ xs: 12, sm: 6 }} sx={{ height: '100vh' }}>
                        <RightPanel>
                            <RegisterForm />
                        </RightPanel>
                    </Grid>

                </Grid>
            </LoginContainer>
        </>
    );
}