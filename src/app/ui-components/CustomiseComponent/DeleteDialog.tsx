import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import React from 'react';

export default function DeleteDialog({ deleteDialogOpen, cancelDelete, data, confirmDelete, title }: any) {
    return (
        <div>
            <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
                {title ? <DialogTitle>{title}</DialogTitle> : <DialogTitle>Delete Lead</DialogTitle>}
                <DialogContent>
                    <Typography>Are you sure you want to remove this {`${data}`}?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
