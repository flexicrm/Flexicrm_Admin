// import { styled, Container, Paper, Box } from '@mui/material';

// export const LoginContainer = styled(Container)(({ theme }) => ({
//     height: '100vh'
//     // display: 'flex',
//     // justifyContent: 'space-between'
//     // alignItems: 'center',
// }));

// export const LeftPanel = styled(Paper)(({ theme, width }:any) => ({
//     height: '100vh',
//     padding: theme.spacing(2),
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.secondary.main,
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width:width
//     [theme.breakpoints.down('sm')] {
//         display: 'none'
//     }
// }));

// export const RightPanel = styled(Paper)(({ theme }) => ({
//     padding: theme.spacing(4),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%'
// }));

// export const Circle1 = styled(Box)(({ theme }) => ({
//     width: 400,
//     height: 400,
//     borderRadius: '50%',
//     background: 'linear-gradient(179.94deg, rgba(255, 255, 255, 0.06) -5.48%, rgba(255, 255, 255, 0) 96.9%)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     [theme.breakpoints.down('md')]: {
//         width: 280,
//         height: 280
//     }
// }));

// export const Circle2 = styled(Box)(({ theme }) => ({
//     width: 350,
//     height: 350,
//     borderRadius: '50%',
//     background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) -25.29%, rgba(255, 255, 255, 0) 97.21%)',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     [theme.breakpoints.down('md')]: {
//         width: 250,
//         height: 250
//     }
// }));

// export const Dot = styled(Box)(({ active, theme }:any) => ({
//     width: 8,
//     height: 8,
//     borderRadius: '50%',
//     backgroundColor: active ? theme.palette.secondary.main : 'transparent',
//     border: `1px solid ${theme.palette.secondary.main}`,
//     transition: 'background-color 0.3s ease'
// }));
import { styled, Container, Paper, Box } from '@mui/material';
import { Theme } from '@mui/material/styles';

// Props for LeftPanel
interface LeftPanelProps {
    width?: number | string;
}

// Props for Dot
interface DotProps {
    active?: any;
}

// Login container styling
export const LoginContainer = styled(Container)(({ theme }: { theme: Theme }) => ({
    height: '100vh'
    // display: 'flex',
    // justifyContent: 'space-between',
    // alignItems: 'center',
}));

// Left panel styling
export const LeftPanel = styled(Paper)<LeftPanelProps>(({ theme, width }) => ({
    height: '100vh',
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    // width: width ?? '50%',
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}));

// Right panel styling
export const RightPanel = styled(Paper)(({ theme }: { theme: Theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    borderRadius: 0
}));

// Large background circle
export const Circle1 = styled(Box)(({ theme }: { theme: Theme }) => ({
    width: 400,
    height: 400,
    borderRadius: '50%',
    background: 'linear-gradient(179.94deg, rgba(255, 255, 255, 0.06) -5.48%, rgba(255, 255, 255, 0) 96.9%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        width: 280,
        height: 280
    }
}));

// Inner background circle
export const Circle2 = styled(Box)(({ theme }: { theme: Theme }) => ({
    width: 350,
    height: 350,
    borderRadius: '50%',
    background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.15) -25.29%, rgba(255, 255, 255, 0) 97.21%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: {
        width: 250,
        height: 250
    }
}));

// Dot for indicator
export const Dot = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'active'
})<DotProps>(({ active = false, theme }) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: active ? theme.palette.secondary.contrastText : 'white',
    border: `1px solid ${theme.palette.secondary.main}`,
    transition: 'background-color 0.3s ease'
}));
