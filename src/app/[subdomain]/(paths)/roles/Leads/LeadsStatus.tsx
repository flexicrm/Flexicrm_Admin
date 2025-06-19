'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import {
    TextField,
    Button,
    CircularProgress,
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
    TablePagination,
    useMediaQuery
} from '@mui/material';
import { Add, Check, Close, Edit, Delete } from '@mui/icons-material';
import { MyButton } from '../../../../ui-components/Buttons/Buttons';

interface LeadStatusType {
    _id: string;
    statusName: string;
    color: string;
}

const LeadsStatus = () => {
    const [leadStatuses, setLeadStatuses] = useState<LeadStatusType[]>([]);
    const [isAddingNewStatus, setIsAddingNewStatus] = useState(false);
    const [editingStatus, setEditingStatus] = useState<LeadStatusType | null>(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [statusToDelete, setStatusToDelete] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const accessToken = Cookies.get('crmaccess');
    const subdomain = Cookies.get('subdomain');
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    const isMobile = useMediaQuery('(max-width: 425px)');

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const fetchLeadStatuses = async () => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            setTableLoading(true);
            const response = await axios.get(`${API_BASE_URL}/leadstatus/${subdomain}`, { headers });
            setLeadStatuses(response?.data?.data || []);
        } catch (error) {
            setLeadStatuses([]);
            showSnackbar('Error fetching lead statuses.', 'error');
        } finally {
            setTableLoading(false);
        }
    };

    const addFormik = useFormik({
        initialValues: { statusName: '', color: '#000000' },
        onSubmit: async (values, { resetForm }) => {
            const headers = { Authorization: `Bearer ${accessToken}` };
            try {
                setLoading(true);
                await axios.post(
                    `${API_BASE_URL}/leadstatus/${subdomain}`,
                    {
                        statusName: values.statusName,
                        color: values.color.replace('#', '')
                    },
                    { headers }
                );
                showSnackbar('Lead status added!', 'success');
                resetForm();
                setIsAddingNewStatus(false);
                fetchLeadStatuses();
            } catch (error) {
                showSnackbar('Error adding lead status', 'error');
            } finally {
                setLoading(false);
            }
        }
    });

    const editFormik = useFormik({
        initialValues: { statusName: '', color: '#000000' },
        onSubmit: async (values) => {
            if (!editingStatus) return;
            const headers = { Authorization: `Bearer ${accessToken}` };
            try {
                setLoading(true);
                await axios.patch(
                    `${API_BASE_URL}/leadstatus/${subdomain}/${editingStatus._id}`,
                    {
                        statusName: values.statusName,
                        color: values.color.replace('#', '')
                    },
                    { headers }
                );
                setEditingStatus(null);
                showSnackbar('Lead status updated!', 'success');
                fetchLeadStatuses();
            } catch (error) {
                showSnackbar('Error updating status', 'error');
            } finally {
                setLoading(false);
            }
        }
    });

    const handleDeleteStatus = async () => {
        if (!statusToDelete) return;
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            setLoading(true);
            await axios.delete(`${API_BASE_URL}/leadstatus/${subdomain}/${statusToDelete}`, { headers });
            setStatusToDelete(null);
            setDeleteConfirmOpen(false);
            showSnackbar('Status deleted!', 'success');
            fetchLeadStatuses();
        } catch (error) {
            showSnackbar('Error deleting status', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (subdomain && accessToken) fetchLeadStatuses();
    }, [subdomain, accessToken]);

    useEffect(() => {
        if (editingStatus) {
            editFormik.setValues({
                statusName: editingStatus.statusName,
                color: `#${editingStatus.color}`
            });
        }
    }, [editingStatus]);

    return (
        <Box sx={{ p: 0 }}>
            {/* Add/Edit Form */}
            {isAddingNewStatus || editingStatus ? (
                <Box component="form" onSubmit={editingStatus ? editFormik.handleSubmit : addFormik.handleSubmit} sx={{ mb: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                        name="statusName"
                        label="Status Name"
                        size="small"
                        value={editingStatus ? editFormik.values.statusName : addFormik.values.statusName}
                        onChange={editingStatus ? editFormik.handleChange : addFormik.handleChange}
                        required
                        sx={{ flex: 1 }}
                    />
                    <input
                        type="color"
                        name="color"
                        value={editingStatus ? editFormik.values.color : addFormik.values.color}
                        onChange={editingStatus ? editFormik.handleChange : addFormik.handleChange}
                        style={{ width: 35, height: 35, cursor: 'pointer', borderRadius: '30%', border: '1px solid white' }}
                    />
                    <MyButton type="submit" variant="contained" disabled={loading} startIcon={<Check />} sx={{ all: isMobile ? 'unset' : '' }}>
                        {!isMobile && (loading ? <CircularProgress size={20} /> : 'Save')}
                    </MyButton>
                    <MyButton
                        variant="outlined"
                        onClick={() => {
                            if (editingStatus) setEditingStatus(null);
                            else {
                                setIsAddingNewStatus(false);
                                addFormik.resetForm();
                            }
                        }}
                        disabled={loading}
                        startIcon={<Close />}
                        sx={{ all: isMobile ? 'unset' : '' }}
                    >
                        {!isMobile && 'Cancel'}
                    </MyButton>
                </Box>
            ) : (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <MyButton variant="contained" startIcon={<Add />} onClick={() => setIsAddingNewStatus(true)}>
                        Add Status
                    </MyButton>
                </Box>
            )}

            {/* Status Table */}
            <TableContainer component={Paper} elevation={1}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell width="60%">Status Name</TableCell>
                            <TableCell width="20%">Color</TableCell>
                            <TableCell width="20%" align="right">
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableLoading ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    <CircularProgress size={24} />
                                </TableCell>
                            </TableRow>
                        ) : leadStatuses.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No statuses found
                                </TableCell>
                            </TableRow>
                        ) : (
                            leadStatuses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((status) => (
                                <TableRow key={status._id} hover>
                                    <TableCell>{status.statusName}</TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                width: 20,
                                                height: 20,
                                                bgcolor: `#${status.color}`,
                                                border: '1px solid #ddd',
                                                borderRadius: '50%'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                setEditingStatus(status);
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                        >
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                setStatusToDelete(status._id);
                                                setDeleteConfirmOpen(true);
                                            }}
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={leadStatuses.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(_, newPage) => setPage(newPage)}
                    onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                    }}
                />
            </TableContainer>

            {/* Delete Confirmation */}
            <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to delete this status?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteStatus} color="error" disabled={loading}>
                        {loading ? <CircularProgress size={20} /> : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default LeadsStatus;
