import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Tab, Tabs, Theme } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[1],
    zIndex: theme.zIndex.drawer + 1
}));

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    minHeight: 64,
    [theme.breakpoints.down('sm')]: {
        minHeight: 56,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    }
}));

export const StyledTabs = styled(Tabs)(({ theme }) => ({
    '& .MuiTabs-indicator': {
        backgroundColor: theme.palette.secondary.main,
        height: 3
    }
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: 600,
    fontSize: '0.9375rem',
    minWidth: 72,
    '&.Mui-selected': {
        color: theme.palette.secondary.main
    },
    [theme.breakpoints.down('sm')]: {
        minWidth: 60,
        fontSize: '0.8125rem',
        padding: theme.spacing(1, 1.5)
    }
}));
