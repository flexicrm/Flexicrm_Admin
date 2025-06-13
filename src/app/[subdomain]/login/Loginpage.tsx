'use client';
import { CssBaseline, Grid } from '@mui/material';
import { LeftPanel, LoginContainer, RightPanel } from '../../ReuseableStyle/ReusableStyleCom';
import LoginSlider from '../../Components/Athu/LoginSlider';
import LoginForm from '../../Components/Athu/LoginForm';
import { usePathname } from 'next/navigation';
export default function DynamicLogin() {
    const location1 = usePathname();
    console.log('checking url:', location1.split('/')[1]);
    if (location1.split('/')[1] === 'undefined') {
        // alert('demo');
        throw new Error('Resource not found');
        //    isError: true, data: 'Resource not found' };
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
