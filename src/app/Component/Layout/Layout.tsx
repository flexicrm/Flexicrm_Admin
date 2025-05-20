import { styled } from '@mui/material/styles';
import { Box, Paper, Divider, Theme } from '@mui/material';

export const PageContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2)
    }
}));

export const LeftPanel = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2)
    }
}));

export const RightPanel = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2)
    }
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
    backgroundColor: theme.palette.divider,
    margin: theme.spacing(2, 0)
}));
