import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Theme } from '@mui/material';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            margin: theme.spacing(1),
            width: '100%'
        }
    }
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    padding: theme.spacing(2, 3),
    fontSize: '1.25rem',
    fontWeight: 600,
    color: theme.palette.primary.main,
    borderBottom: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1.5, 2)
    }
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2)
    }
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    padding: theme.spacing(2, 3),
    borderTop: `1px solid ${theme.palette.divider}`,
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1.5, 2),
        '& > *': {
            margin: theme.spacing(0.5)
        }
    }
}));
