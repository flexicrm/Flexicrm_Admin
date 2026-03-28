'use client';
import { CssBaseline, Grid } from '@mui/material';
import { usePathname } from 'next/navigation';
<<<<<<< HEAD:src/app/login/Loginpage.tsx
import { LeftPanel, LoginContainer, RightPanel } from "../../app/ReuseableStyle/ReusableStyleCom";
import LoginForm from '../Components/Athu/LoginForm';
import LoginSlider from '../Components/Athu/LoginSlider';
=======
import LoginForm from '../../components/Athu/LoginForm';
import LoginSlider from '../../components/Athu/LoginSlider';
import { LeftPanel, LoginContainer, RightPanel } from '../../ReuseableStyle/ReusableStyleCom';
>>>>>>> 0cf7339feec569a55541ff1b0cb6a92efd8921bf:src/app/[subdomain]/login/Loginpage.tsx
export default function DynamicLogin() {
    const location1 = usePathname();
    console.log('checking url:', location1.split('/')[1]);
    if (location1.split('/')[1] === 'undefined') {
        throw new Error('Resource not found');
    }
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
