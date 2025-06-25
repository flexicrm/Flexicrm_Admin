// import React from 'react';
// import { Box, Typography, Button, Container, Grid } from '@mui/material';
// import { motion } from 'framer-motion';
// import { styled } from '@mui/system';
// import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie';

// const HeroContainer = styled(Container)(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     minHeight: '80vh',
//     padding: theme.spacing(4),
//     position: 'relative'
// }));

// const WelcomeText = styled(Typography)(({ theme }) => ({
//     fontWeight: 700,
//     color: theme.palette.primary.main,
//     fontSize: '2rem',
//     marginBottom: theme.spacing(2)
// }));

// const SubtitleText = styled(Typography)(({ theme }) => ({
//     fontWeight: 400,
//     color: theme.palette.text.secondary,
//     fontSize: '1.1rem',
//     marginBottom: theme.spacing(4)
// }));

// const CreateButton = styled(Button)(({ theme }) => ({
//     padding: theme.spacing(1.5, 4),
//     fontSize: '1rem',
//     fontWeight: 600,
//     borderRadius: '8px',
//     boxShadow: theme.shadows[2],
//     '&:hover': {
//         boxShadow: theme.shadows[4]
//     }
// }));

// const LeadsWelcomePage = () => {
//     const subdomain = Cookies.get('subdomain');
//     const router = useRouter();
//     return (
//         <HeroContainer maxWidth="xl">
//             <Grid container spacing={4} alignItems="center">
//                 {/* Left Side: Image */}
//                 <Grid size={{ xs: 12, md: 6 }}>
//                     <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
//                         <Box component="img" src="/No leads Illustration.svg" alt="No Leads" sx={{ width: '100%', maxWidth: 400 }} />
//                     </motion.div>
//                 </Grid>

//                 {/* Right Side: Content */}
//                 <Grid size={{ xs: 12, md: 6 }}>
//                     <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
//                         <WelcomeText variant="h4">
//                             Welcome to{' '}
//                             <Box component="span" sx={{ color: 'primary' }}>
//                                 Flexi CRM
//                             </Box>{' '}
//                             Leads Page!
//                         </WelcomeText>

//                         <SubtitleText>
//                             Start creating your opportunities <br />
//                             and grow your customer base with ease.
//                         </SubtitleText>

//                         <motion.div
//                             animate={{
//                                 // opacity: [1, 0.6, 1],
//                                 scale: [1, 1.02, 1]
//                             }}
//                             transition={{
//                                 duration: 1,
//                                 repeat: Infinity,
//                                 ease: 'easeInOut'
//                             }}
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             <CreateButton variant="contained" color="primary" size="large" onClick={() => router.push(`/${subdomain}/leads/create`)} startIcon={<span>+</span>}>
//                                 Create New Lead
//                             </CreateButton>
//                         </motion.div>
//                     </motion.div>
//                 </Grid>
//             </Grid>
//         </HeroContainer>
//     );
// };

// export default LeadsWelcomePage;
import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const HeroContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    padding: theme.spacing(4),
    position: 'relative'
}));

const WelcomeText = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    color: theme.palette.primary.main,
    fontSize: '2rem',
    marginBottom: theme.spacing(2)
}));

const SubtitleText = styled(Typography)(({ theme }) => ({
    fontWeight: 400,
    color: theme.palette.text.secondary,
    fontSize: '1.1rem',
    marginBottom: theme.spacing(4)
}));

const CreateButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5, 4),
    fontSize: '1rem',
    fontWeight: 600,
    borderRadius: '8px',
    boxShadow: theme.shadows[2],
    '&:hover': {
        boxShadow: theme.shadows[4]
    }
}));

const LeadsWelcomePage = () => {
    const subdomain = Cookies.get('subdomain');
    const router = useRouter();

    return (
        <HeroContainer maxWidth="xl">
            <Grid container spacing={4} alignItems="center" id="leads-page-title">
                {/* Left Side: Image */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                        <Box component="img" src="/No leads Illustration.svg" alt="No Leads" sx={{ width: '100%', maxWidth: 400 }} />
                    </motion.div>
                </Grid>

                {/* Right Side: Content */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
                        <WelcomeText variant="h4">
                            Welcome to{' '}
                            <Box component="span" sx={{ color: 'primary' }}>
                                Flexi CRM
                            </Box>{' '}
                            Leads Page!
                        </WelcomeText>

                        <SubtitleText>
                            Start creating your opportunities <br />
                            and grow your customer base with ease.
                        </SubtitleText>

                        {/* Create Button with Floating Animation */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                y: [0, -5, 0]
                            }}
                            transition={{
                                duration: 2,
                                ease: 'easeInOut',
                                repeat: Infinity
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            id="create-lead-btn"
                        >
                            <CreateButton variant="contained" color="primary" size="large" onClick={() => router.push(`/${subdomain}/leads/create`)} startIcon={<span>+</span>}>
                                Create New Lead
                            </CreateButton>
                        </motion.div>
                    </motion.div>
                </Grid>
            </Grid>
        </HeroContainer>
    );
};

export default LeadsWelcomePage;
