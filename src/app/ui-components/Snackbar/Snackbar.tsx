import React from 'react';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const CustomSnackbar = styled(Snackbar)(({ theme }) => ({
    margin: theme.spacing(1)
}));

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface MySnackbarProps {
    open: boolean;
    message: string;
    severity?: 'error' | 'warning' | 'info' | 'success';
    onClose?: () => void;
    autoHideDuration?: number;
    position?: {
        vertical: 'top' | 'bottom';
        horizontal: 'left' | 'center' | 'right';
    };
}

export const MySnackbar: React.FC<MySnackbarProps> = ({ open, message, severity = 'info', onClose, autoHideDuration = 6000, position = { vertical: 'bottom', horizontal: 'left' } }) => {
    return (
        <CustomSnackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose} anchorOrigin={position}>
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </CustomSnackbar>
    );
};
