import { styled } from '@mui/material/styles';
import { Snackbar, Alert, AlertProps, LinearProgress, Theme } from '@mui/material';

export const StyledSnackbar = styled(Snackbar)(({ theme }) => ({
    '& .MuiAlert-root': {
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[6],
        fontWeight: 500
    },
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        left: 0,
        right: 0,
        bottom: 0
    }
}));

export const StyledAlert = styled(Alert)<AlertProps>(({ theme, severity }) => ({
    width: '100%',
    '& .MuiAlert-icon': {
        color: severity ? theme.palette[severity].main : theme.palette.primary.main
    }
}));

export const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 6,
    borderRadius: theme.shape.borderRadius,
    '& .MuiLinearProgress-bar': {
        borderRadius: theme.shape.borderRadius
    }
}));
