'use client';
import React, { useEffect, useState, useCallback } from 'react';
import {
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    Snackbar,
    Alert,
    Tooltip,
    CircularProgress,
    TablePagination,
    useMediaQuery
} from '@mui/material';
import { Edit, Delete, Add, CheckCircle, Close } from '@mui/icons-material';
import Cookies from 'js-cookie';
import { createFollowupStatus, DELETEFollowupStatus, GetFollowupStatus, UpdateFollowupStatus } from '../../../../../../../api/Leads';
import { MyButton } from '../../../../../ui-components/Buttons/Buttons';

interface LeadStatus {
    _id: string;
    typeName: string;
}

const LeadfollowPage: React.FC = () => {
    const subdomain = Cookies.get('subdomain');
    const [statuses, setStatuses] = useState<LeadStatus[]>([]);
    const [isAddingNewStatus, setIsAddingNewStatus] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error' | 'info' | 'warning'
    });
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page
    const isMobile = useMediaQuery('(max-width: 425px)');

    const fetchStatuses = useCallback(async () => {
        setLoading(true);
        try {
            const res = await GetFollowupStatus(subdomain);
            setStatuses(res.data);
        } catch (err) {
            console.error(err);
            showSnackbar('Failed to fetch statuses', 'error');
        } finally {
            setLoading(false);
        }
    }, [subdomain]);

    useEffect(() => {
        fetchStatuses();
    }, [fetchStatuses]);

    const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleSave = async () => {
        if (!name.trim()) {
            showSnackbar('Status name cannot be empty', 'error');
            return;
        }

        try {
            if (editId) {
                const payload = { typeName: name };
                await UpdateFollowupStatus(subdomain, editId, payload);
                showSnackbar('Status updated successfully', 'success');
            } else {
                const payload = { typeName: name };
                await createFollowupStatus(subdomain, payload);
                showSnackbar('Status created successfully', 'success');
            }
            setIsAddingNewStatus(false);
            setName('');
            setEditId(null);
            fetchStatuses();
        } catch (err) {
            console.error(err);
            showSnackbar(editId ? 'Failed to update status' : 'Failed to create status', 'error');
        }
    };

    const handleDeleteClick = (id: string) => {
        setItemToDelete(id);
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!itemToDelete) return;

        try {
            await DELETEFollowupStatus(subdomain, itemToDelete);
            showSnackbar('Status deleted successfully', 'success');
            fetchStatuses();
        } catch (err) {
            console.error(err);
            showSnackbar('Failed to delete status', 'error');
        } finally {
            setDeleteConfirmOpen(false);
            setItemToDelete(null);
        }
    };

    const handleEdit = (status: LeadStatus) => {
        setEditId(status._id);
        setName(status.typeName);
        setIsAddingNewStatus(true);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const openCreate = () => {
        setEditId(null);
        setName('');
        setIsAddingNewStatus(true);
    };

    return (
        <Box sx={{ p: 0, maxWidth: '1200px', margin: '0 auto' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    mb: 1,
                    flexWrap: 'wrap',
                    gap: 2
                }}
            >
                {!isAddingNewStatus && (
                    <MyButton variant="contained" onClick={openCreate} startIcon={<Add />}>
                        Type
                    </MyButton>
                )}
            </Box>

            {isAddingNewStatus && (
                <Box
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSave();
                    }}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        p: 2,
                        backgroundColor: '#f5f5f5',
                        borderRadius: 1,
                        mb: 2
                    }}
                >
                    <TextField
                        variant="outlined"
                        label="Status Name"
                        value={name}
                        size="small"
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        InputProps={{
                            sx: { borderRadius: 1 }
                        }}
                        autoFocus
                    />
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <MyButton type="submit" variant="contained" color="primary" startIcon={<CheckCircle />} sx={{ all: isMobile ? 'unset' : '' }}>
                            {!isMobile && (editId ? 'Update' : 'Create')}
                        </MyButton>
                        <MyButton
                            variant="outlined"
                            color="error"
                            onClick={() => {
                                setIsAddingNewStatus(false);
                                setEditId(null);
                                setName('');
                            }}
                            startIcon={<Close />}
                            sx={{ all: isMobile ? 'unset' : '' }}
                        >
                            {!isMobile && 'Cancel'}
                        </MyButton>
                    </Box>
                </Box>
            )}

            {loading && statuses.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                // <Paper elevation={1} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <TableContainer component={Paper} elevation={1}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 600 }}>Type Name</TableCell>
                                <TableCell sx={{ fontWeight: 600, width: '150px' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {statuses.length > 0 ? (
                                statuses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((status) => (
                                    <TableRow key={status._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{status.typeName}</TableCell>
                                        <TableCell>
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => {
                                                        handleEdit(status);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    sx={{ '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' } }}
                                                >
                                                    <Edit fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton size="small" onClick={() => handleDeleteClick(status._id)} sx={{ '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.08)' } }}>
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={2} sx={{ textAlign: 'center', py: 4 }}>
                                        <Typography variant="body1" color="textSecondary">
                                            No follow-up statuses found. Add one to get started.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}> */}
                    <TablePagination
                        sx={{ display: 'flex', justifyContent: 'flex-end' }}
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={statuses.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    {/* </Box> */}
                </TableContainer>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} maxWidth="xs">
                <DialogTitle sx={{ fontWeight: 600 }}>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to delete this status? This action cannot be undone.</Typography>
                </DialogContent>
                <DialogActions sx={{ px: 3, py: 2 }}>
                    <MyButton variant="outlined" onClick={() => setDeleteConfirmOpen(false)}>
                        Cancel
                    </MyButton>
                    <MyButton variant="contained" onClick={handleDeleteConfirm} startIcon={<Delete />}>
                        Delete
                    </MyButton>
                </DialogActions>
            </Dialog>

            {/* Snackbar Notification */}
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }} elevation={6} variant="filled">
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default LeadfollowPage;
