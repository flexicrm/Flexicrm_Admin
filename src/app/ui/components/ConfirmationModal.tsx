// import React from 'react';
// import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

// interface ConfirmationModalProps {
//     open: boolean;
//     onClose: () => void;
//     onConfirm: () => void;
//     title: string;
//     message?: string;
// }

// const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, onClose, onConfirm, title, message }) => {
//     return (
//         <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
//             <DialogTitle id="alert-dialog-title" style={{ fontSize: '17px' }}>
//                 {title}
//             </DialogTitle>
//             {/* <DialogContent> */}
//             <DialogContentText id="alert-dialog-description" sx={{ margin: 'auto' }}>
//                 {message}
//             </DialogContentText>
//             {/* </DialogContent> */}
//             <DialogActions>
//                 <div>
//                     <Button onClick={onClose} color="primary" size="small">
//                         Cancel
//                     </Button>
//                 </div>
//                 <div>
//                     <Button onClick={onConfirm} sx={{ background: '#e74949', color: 'white' }} autoFocus size="small">
//                         Confirm
//                     </Button>
//                 </div>
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default ConfirmationModal;
import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface ConfirmationModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ open, onClose, onConfirm, title, message }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
                sx: {
                    minWidth: '400px',
                    borderRadius: '12px',
                    padding: '16px'
                }
            }}
        >
            <DialogTitle
                id="alert-dialog-title"
                sx={{
                    fontSize: '20px',
                    fontWeight: '600',
                    padding: '16px 16px 8px 16px',
                    color: 'text.primary'
                }}
            >
                {title}
            </DialogTitle>
            <DialogContent sx={{ padding: '8px 16px' }}>
                <DialogContentText
                    id="alert-dialog-description"
                    sx={{
                        color: 'text.secondary',
                        fontSize: '15px',
                        lineHeight: '1.5'
                    }}
                >
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ padding: '16px', gap: '12px' }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    size="medium"
                    sx={{
                        textTransform: 'none',
                        borderRadius: '8px',
                        padding: '6px 16px',
                        borderColor: 'grey.300',
                        color: 'text.primary',
                        '&:hover': {
                            borderColor: 'grey.400',
                            backgroundColor: 'action.hover'
                        }
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onClick={onConfirm}
                    variant="contained"
                    size="medium"
                    sx={{
                        textTransform: 'none',
                        borderRadius: '8px',
                        padding: '6px 16px',
                        backgroundColor: '#e74949',
                        '&:hover': {
                            backgroundColor: '#d04242'
                        }
                    }}
                    autoFocus
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationModal;
