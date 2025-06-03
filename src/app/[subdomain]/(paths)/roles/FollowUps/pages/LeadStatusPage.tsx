// import React, { useEffect, useState, useCallback } from 'react';
// import {
//     Box,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     IconButton,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     TextField,
//     Typography,
//     Snackbar,
//     Alert,
//     DialogContentText,
//     Tooltip,
//     CircularProgress
// } from '@mui/material';
// import { Edit, Delete, Add, CheckCircle } from '@mui/icons-material';
// import Cookies from 'js-cookie';
// import { createStatus, DELETEStatus, GetStatus, UpdateStatus } from '../../../../../../../api/Leads';
// import { MyButton } from '../../../../../Component/Buttons/Buttons';
// import { CustomChip } from '../../../../../Component/Chip/Chip';

// interface LeadStatus {
//     _id: string;
//     StatusName: string;
//     color: string;
// }

// const LeadStatusPage: React.FC = () => {
//     const subdomain = Cookies.get('subdomain');
//     const [statuses, setStatuses] = useState<LeadStatus[]>([]);
//     const [dialogOpen, setDialogOpen] = useState(false);
//     const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//     const [editId, setEditId] = useState<string | null>(null);
//     const [name, setName] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [snackbar, setSnackbar] = useState({
//         open: false,
//         message: '',
//         severity: 'success' as 'success' | 'error' | 'info' | 'warning'
//     });
//     const [itemToDelete, setItemToDelete] = useState<string | null>(null);

//     const fetchStatuses = useCallback(async () => {
//         setLoading(true);
//         try {
//             const res = await GetStatus(subdomain);
//             setStatuses(res.data);
//         } catch (err) {
//             console.error(err);
//             showSnackbar('Failed to fetch statuses', 'error');
//         } finally {
//             setLoading(false);
//         }
//     }, [subdomain]);

//     useEffect(() => {
//         fetchStatuses();
//     }, [fetchStatuses]);

//     const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
//         setSnackbar({ open: true, message, severity });
//     };

//     const handleSave = async () => {
//         if (!name.trim()) {
//             showSnackbar('Status name cannot be empty', 'error');
//             return;
//         }

//         try {
//             if (editId) {
//                 const payload = { StatusName: name };
//                 await UpdateStatus(subdomain, editId, payload);
//                 showSnackbar('Status updated successfully', 'success');
//             } else {
//                 const payload = { StatusName: name };
//                 await createStatus(subdomain, payload);
//                 showSnackbar('Status created successfully', 'success');
//             }
//             setDialogOpen(false);
//             setName('');
//             setEditId(null);
//             fetchStatuses();
//         } catch (err) {
//             console.error(err);
//             showSnackbar(editId ? 'Failed to update status' : 'Failed to create status', 'error');
//         }
//     };

// const handleDeleteClick = (id: string) => {
//     setItemToDelete(id);
//     setDeleteConfirmOpen(true);
// };

// const handleDeleteConfirm = async () => {
//     if (!itemToDelete) return;

//     try {
//         await DELETEStatus(subdomain, itemToDelete);
//         showSnackbar('Status deleted successfully', 'success');
//         fetchStatuses();
//     } catch (err) {
//         console.error(err);
//         showSnackbar('Failed to delete status', 'error');
//     } finally {
//         setDeleteConfirmOpen(false);
//         setItemToDelete(null);
//     }
// };

//     const handleEdit = (status: LeadStatus) => {
//         setEditId(status._id);
//         setName(status.StatusName);
//         setDialogOpen(true);
//     };

//     const openCreate = () => {
//         setEditId(null);
//         setName('');
//         setDialogOpen(true);
//     };

//     return (
//         <Box sx={{ p: 0, maxWidth: '1200px', margin: '0 auto' }}>
//             <Box
//                 sx={{
//                     display: 'flex',
//                     justifyContent: 'end',
//                     alignItems: 'center',
//                     mb: 4,
//                     flexWrap: 'wrap',
//                     gap: 2
//                 }}
//             >
//                 <MyButton variant="contained" onClick={openCreate} startIcon={<Add />}>
//                     Status
//                 </MyButton>
//             </Box>

//             {loading && statuses.length === 0 ? (
//                 <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//                     <CircularProgress />
//                 </Box>
//             ) : (
//                 <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
//                     <TableContainer>
//                         <Table>
//                             <TableHead>
//                                 <TableRow>
//                                     <TableCell sx={{ fontWeight: 600 }}>Status Name</TableCell>
//                                     <TableCell sx={{ fontWeight: 600, width: '150px' }}>Actions</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {statuses.length > 0 ? (
//                                     statuses?.map((status) => (
//                                         <TableRow key={status._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                                             <TableCell>
//                                                 <CustomChip
//                                                     status={{
//                                                         hexColor: status?.color,
//                                                         statusName: status?.StatusName || 'null'
//                                                     }}
//                                                 />
//                                             </TableCell>
//                                             <TableCell>
//                                                 <Tooltip title="Edit">
//                                                     <IconButton onClick={() => handleEdit(status)} color="primary" sx={{ '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' } }}>
//                                                         <Edit />
//                                                     </IconButton>
//                                                 </Tooltip>
//                                                 <Tooltip title="Delete">
//                                                     <IconButton onClick={() => handleDeleteClick(status._id)} color="error" sx={{ '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.08)' } }}>
//                                                         <Delete />
//                                                     </IconButton>
//                                                 </Tooltip>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))
//                                 ) : (
//                                     <TableRow>
//                                         <TableCell colSpan={2} sx={{ textAlign: 'center', py: 4 }}>
//                                             <Typography variant="body1" color="textSecondary">
//                                                 No lead statuses found. Add one to get started.
//                                             </Typography>
//                                         </TableCell>
//                                     </TableRow>
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Paper>
//             )}

//             {/* Add/Edit Dialog */}
//             <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm">
//                 <DialogTitle>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         {editId ? (
//                             <>
//                                 <Edit fontSize="small" />
//                                 <Typography>Edit Follow Up Status</Typography>
//                             </>
//                         ) : (
//                             <>
//                                 <Add fontSize="small" />
//                                 <Typography> New Follow Up Status</Typography>
//                             </>
//                         )}
//                     </Box>
//                 </DialogTitle>
//                 <DialogContent>
//                     <Box sx={{ p: 1 }}>
//                         <TextField
//                             variant="outlined"
//                             label="Status Name"
//                             value={name}
//                             size="small"
//                             onChange={(e) => setName(e.target.value)}
//                             margin="normal"
//                             InputProps={{
//                                 sx: { borderRadius: 1 }
//                             }}
//                             autoFocus
//                         />
//                     </Box>
//                 </DialogContent>
//                 <DialogActions>
//                     <MyButton variant="outlined" onClick={() => setDialogOpen(false)}>
//                         Cancel
//                     </MyButton>
//                     <MyButton variant="contained" onClick={handleSave} startIcon={<CheckCircle />}>
//                         {editId ? 'Update' : 'Create'}
//                     </MyButton>
//                 </DialogActions>
//             </Dialog>

//             {/* Delete Confirmation Dialog */}
//             <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} maxWidth="xs">
//                 <DialogTitle sx={{ fontWeight: 600 }}>Confirm Delete</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>Are you sure you want to delete this status? This action cannot be undone.</DialogContentText>
//                 </DialogContent>
//                 <DialogActions sx={{ px: 3, py: 2 }}>
//                     <MyButton variant="outlined" onClick={() => setDeleteConfirmOpen(false)}>
//                         Cancel
//                     </MyButton>
//                     <MyButton variant="contained" onClick={handleDeleteConfirm} color="error" startIcon={<Delete />}>
//                         Delete
//                     </MyButton>
//                 </DialogActions>
//             </Dialog>

//             {/* Snackbar Notification */}
//             <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
//                 <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }} elevation={6} variant="filled">
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };

// export default LeadStatusPage;
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
    TablePagination
} from '@mui/material';
import { Edit, Delete, Add, CheckCircle, Close } from '@mui/icons-material';
import Cookies from 'js-cookie';
import { createStatus, DELETEStatus, GetStatus, UpdateStatus } from '../../../../../../../api/Leads';
import { MyButton } from '../../../../../Component/Buttons/Buttons';
import { CustomChip } from '../../../../../Component/Chip/Chip';

interface LeadStatus {
    _id: string;
    StatusName: string;
    color: string;
}

const LeadStatusPage: React.FC = () => {
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

    const fetchStatuses = useCallback(async () => {
        setLoading(true);
        try {
            const res = await GetStatus(subdomain);
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
                const payload = { StatusName: name };
                await UpdateStatus(subdomain, editId, payload);
                showSnackbar('Status updated successfully', 'success');
            } else {
                const payload = { StatusName: name };
                await createStatus(subdomain, payload);
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

    const handleEdit = (status: LeadStatus) => {
        setEditId(status._id);
        setName(status.StatusName);
        setIsAddingNewStatus(true);
    };

    const handleDeleteClick = (id: string) => {
        setItemToDelete(id);
        setDeleteConfirmOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!itemToDelete) return;

        try {
            await DELETEStatus(subdomain, itemToDelete);
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
                        Status
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
                        <MyButton type="submit" variant="contained" color="primary" startIcon={<CheckCircle />}>
                            {editId ? 'Update' : 'Create'}
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
                        >
                            Cancel
                        </MyButton>
                    </Box>
                </Box>
            )}

            {loading && statuses.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 600 }}>Status Name</TableCell>
                                    <TableCell sx={{ fontWeight: 600, width: '150px' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {statuses.length > 0 ? (
                                    statuses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((status) => (
                                        <TableRow key={status._id} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell>
                                                <CustomChip
                                                    status={{
                                                        hexColor: status?.color,
                                                        statusName: status?.StatusName || 'null'
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title="Edit">
                                                    <IconButton onClick={() => handleEdit(status)} sx={{ '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' } }}>
                                                        <Edit fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton onClick={() => handleDeleteClick(status._id)} sx={{ '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.08)' } }}>
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
                                                No lead statuses found. Add one to get started.
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={statuses.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
                </Paper>
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
                    <MyButton variant="contained" onClick={handleDeleteConfirm} color="error" startIcon={<Delete />}>
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

export default LeadStatusPage;
