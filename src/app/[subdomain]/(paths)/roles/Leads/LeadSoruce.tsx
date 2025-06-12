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

const LeadSoruce = () => {
    const [leadStatuses, setLeadStatuses] = useState<any>([]);
    const [isAddingNewStatus, setIsAddingNewStatus] = useState(false);
    const [editingStatus, setEditingStatus] = useState<any | null>(null);
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
            const response = await axios.get(`${API_BASE_URL}/leadsource/${subdomain}`, { headers });
            console.log(response?.data?.data, 'response>>>>>>>>>>>');
            setLeadStatuses(response?.data?.data?.leadSources || []);
        } catch (error) {
            setLeadStatuses([]);
            showSnackbar('Error fetching lead statuses.', 'error');
        } finally {
            setTableLoading(false);
        }
    };

    const addFormik = useFormik({
        initialValues: { sourceName: '' },
        onSubmit: async (values, { resetForm }) => {
            const headers = { Authorization: `Bearer ${accessToken}` };
            try {
                setLoading(true);
                await axios.post(
                    `${API_BASE_URL}/leadsource/${subdomain}`,
                    {
                        sourceName: values.sourceName
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
        initialValues: { sourceName: '' },
        onSubmit: async (values) => {
            if (!editingStatus) return;
            const headers = { Authorization: `Bearer ${accessToken}` };
            try {
                setLoading(true);
                await axios.patch(
                    `${API_BASE_URL}/leadsource/${subdomain}/${editingStatus._id}`,
                    {
                        sourceName: values.sourceName
                    },
                    { headers }
                );
                setEditingStatus(null);
                showSnackbar('Lead sourceName updated!', 'success');
                fetchLeadStatuses();
            } catch (error) {
                showSnackbar('Error updating sourceName', 'error');
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
            await axios.delete(`${API_BASE_URL}/leadsource/${subdomain}/${statusToDelete}`, { headers });
            setStatusToDelete(null);
            setDeleteConfirmOpen(false);
            showSnackbar('sourceName deleted!', 'success');
            fetchLeadStatuses();
        } catch (error) {
            showSnackbar('Error deleting sourceName', 'error');
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
                sourceName: editingStatus.sourceName
            });
        }
    }, [editingStatus]);

    return (
        <Box sx={{ p: 0 }}>
            {/* Add/Edit Form */}
            {isAddingNewStatus || editingStatus ? (
                <Box component="form" onSubmit={editingStatus ? editFormik.handleSubmit : addFormik.handleSubmit} sx={{ mb: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                    <TextField
                        name="sourceName"
                        label="Source Name"
                        size="small"
                        value={editingStatus ? editFormik.values.sourceName : addFormik.values.sourceName}
                        onChange={editingStatus ? editFormik.handleChange : addFormik.handleChange}
                        required
                        sx={{ flex: 1 }}
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
                            <TableCell width="60%">Lead Source </TableCell>
                            {/* <TableCell width="20%">Color</TableCell> */}
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
                            leadStatuses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((status, index) => (
                                <TableRow key={status._id} hover>
                                    <TableCell>{status.sourceName}</TableCell>
                                    <TableCell align="right">
                                        <IconButton size="small" onClick={() => setEditingStatus(status)}>
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
                <DialogContent>Are you sure you want to delete this sourceName?</DialogContent>
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

export default LeadSoruce;
