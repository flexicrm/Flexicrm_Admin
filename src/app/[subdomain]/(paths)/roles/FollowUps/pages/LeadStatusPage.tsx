// // // pages/lead-status.tsx
// // import React, { useEffect, useState } from 'react';
// // import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
// // import { Edit, Delete } from '@mui/icons-material';
// // import Cookies from 'js-cookie';
// // // import api from '../utils/axios';
// // import { createFollowupStatus, createStatus, DELETEFollowupStatus, DELETEStatus, GetFollowupStatus, GetStatus, UpdateFollowupStatus, UpdateStatus } from '../../../../../../../api/Leads';
// // import { MyButton } from '../../../../../Component/Buttons/Buttons';

// // interface LeadStatus {
// //     _id: string;
// //     typeName: string;
// // }

// // const LeadStatusPage: React.FC = () => {
// //     // const accessToken = Cookies.get('accessToken');
// //     const subdomain = Cookies.get('subdomain');
// //     // const token = 'your-jwt-token';

// //     const [statuses, setStatuses] = useState<LeadStatus[]>([]);
// //     const [dialogOpen, setDialogOpen] = useState(false);
// //     const [editId, setEditId] = useState<string | null>(null);
// //     const [name, setName] = useState('');

// //     const fetchStatuses = async () => {
// //         try {
// //             const res = await GetStatus(subdomain);
// //             //  await api.get(`/${subdomain}/lead-status`, {
// //             //     headers: { Authorization: `Bearer ${accessToken}` }
// //             // });
// //             console.log(res, 'res');

// //             setStatuses(res.data);
// //         } catch (err) {
// //             console.error(err);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchStatuses();
// //     }, []);

// //     const handleSave = async () => {
// //         try {
// //             if (editId) {
// //                 const payload = { name: name };
// //                 await UpdateStatus(subdomain, editId, payload);
// //                 // api.patch(`/${subdomain}/lead-status/${editId}`, { name }, { headers: { Authorization: `Bearer ${token}` } });
// //             } else {
// //                 const payload = { name: name };
// //                 await createStatus(subdomain, payload);
// //                 //  api.post(`/${subdomain}/lead-status`, { name }, { headers: { Authorization: `Bearer ${token}` } });
// //             }
// //             setDialogOpen(false);
// //             setName('');
// //             setEditId(null);
// //             fetchStatuses();
// //         } catch (err) {
// //             console.error(err);
// //         }
// //     };

// //     const handleDelete = async (id: string) => {
// //         try {
// //             await DELETEStatus(subdomain, id);
// //             // api.delete(`/${subdomain}/lead-status/${id}`, {
// //             //     headers: { Authorization: `Bearer ${token}` }
// //             // });
// //             fetchStatuses();
// //         } catch (err) {
// //             console.error(err);
// //         }
// //     };

// //     const handleEdit = (status: LeadStatus) => {
// //         setEditId(status._id);
// //         setName(status.name);
// //         setDialogOpen(true);
// //     };

// //     const openCreate = () => {
// //         setEditId(null);
// //         setName('');
// //         setDialogOpen(true);
// //     };

// //     return (
// //         <Box sx={{ p: 4 }}>
// //             <Box sx={{ display: 'flex', justifyContent: 'end' }}>
// //                 <MyButton variant="contained" onClick={openCreate}>
// //                     Add Status
// //                 </MyButton>
// //             </Box>

// //             <TableContainer component={Paper}>
// //                 <Table>
// //                     <TableHead>
// //                         <TableRow>
// //                             <TableCell>Name</TableCell>
// //                             <TableCell>Actions</TableCell>
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {statuses?.map((status) => (
// //                             <TableRow key={status?._id}>
// //                                 <TableCell>{status?.typeName}</TableCell>
// //                                 <TableCell>
// //                                     <IconButton onClick={() => handleEdit(status)}>
// //                                         <Edit />
// //                                     </IconButton>
// //                                     <IconButton onClick={() => handleDelete(status._id)}>
// //                                         <Delete />
// //                                     </IconButton>
// //                                 </TableCell>
// //                             </TableRow>
// //                         ))}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>

// //             <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
// //                 <DialogTitle sx={{ fontSize: '12px' }}>{editId ? 'Edit Status' : 'Add Status'}</DialogTitle>
// //                 <DialogContent>
// //                     <Box sx={{ p: 1 }}>
// //                         <TextField size="small" fullWidth label="Status Name" value={name} onChange={(e) => setName(e.target.value)} margin="normal" />
// //                     </Box>
// //                 </DialogContent>
// //                 <DialogActions>
// //                     <MyButton variant="text" onClick={() => setDialogOpen(false)}>
// //                         Cancel
// //                     </MyButton>
// //                     <MyButton variant="contained" onClick={handleSave}>
// //                         Save
// //                     </MyButton>
// //                 </DialogActions>
// //             </Dialog>
// //         </Box>
// //     );
// // };

// // export default LeadStatusPage;
// // pages/lead-status.tsx
// import React, { useEffect, useState } from 'react';
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

//     const fetchStatuses = async () => {
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
//     };

//     useEffect(() => {
//         fetchStatuses();
//     }, []);

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

//     const handleDeleteClick = (id: string) => {
//         setItemToDelete(id);
//         setDeleteConfirmOpen(true);
//     };

//     const handleDeleteConfirm = async () => {
//         if (!itemToDelete) return;

//         try {
//             await DELETEStatus(subdomain, itemToDelete);
//             showSnackbar('Status deleted successfully', 'success');
//             fetchStatuses();
//         } catch (err) {
//             console.error(err);
//             showSnackbar('Failed to delete status', 'error');
//         } finally {
//             setDeleteConfirmOpen(false);
//             setItemToDelete(null);
//         }
//     };

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
//                             <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
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
//                 <DialogTitle
//                 // sx={{
//                 //     backgroundColor: editId ? '#2196f3' : '#4caf50',
//                 //     color: 'white',
//                 //     py: 2,
//                 //     px: 3
//                 // }}
//                 >
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         {editId ? (
//                             <>
//                                 <Edit fontSize="small" />
//                                 <Typography variant="h6">Edit Status</Typography>
//                             </>
//                         ) : (
//                             <>
//                                 <Add fontSize="small" />
//                                 <Typography variant="h6">Add New Status</Typography>
//                             </>
//                         )}
//                     </Box>
//                 </DialogTitle>
//                 <DialogContent>
//                     <Box sx={{ p: 1 }}>
//                         <TextField
//                             // fullWidth
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
    DialogContentText,
    Tooltip,
    CircularProgress
} from '@mui/material';
import { Edit, Delete, Add, CheckCircle } from '@mui/icons-material';
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
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error' | 'info' | 'warning'
    });
    const [itemToDelete, setItemToDelete] = useState<string | null>(null);

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
            setDialogOpen(false);
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

    const handleEdit = (status: LeadStatus) => {
        setEditId(status._id);
        setName(status.StatusName);
        setDialogOpen(true);
    };

    const openCreate = () => {
        setEditId(null);
        setName('');
        setDialogOpen(true);
    };

    return (
        <Box sx={{ p: 0, maxWidth: '1200px', margin: '0 auto' }}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    mb: 4,
                    flexWrap: 'wrap',
                    gap: 2
                }}
            >
                <MyButton variant="contained" onClick={openCreate} startIcon={<Add />}>
                    Status
                </MyButton>
            </Box>

            {loading && statuses.length === 0 ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableRow>
                                    <TableCell sx={{ fontWeight: 600 }}>Status Name</TableCell>
                                    <TableCell sx={{ fontWeight: 600, width: '150px' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {statuses.length > 0 ? (
                                    statuses?.map((status) => (
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
                                                    <IconButton onClick={() => handleEdit(status)} color="primary" sx={{ '&:hover': { backgroundColor: 'rgba(25, 118, 210, 0.08)' } }}>
                                                        <Edit />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Delete">
                                                    <IconButton onClick={() => handleDeleteClick(status._id)} color="error" sx={{ '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.08)' } }}>
                                                        <Delete />
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
                </Paper>
            )}

            {/* Add/Edit Dialog */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm">
                <DialogTitle>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {editId ? (
                            <>
                                <Edit fontSize="small" />
                                <Typography variant="h6">Edit Status</Typography>
                            </>
                        ) : (
                            <>
                                <Add fontSize="small" />
                                <Typography variant="h6">Add New Status</Typography>
                            </>
                        )}
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ p: 1 }}>
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
                    </Box>
                </DialogContent>
                <DialogActions>
                    <MyButton variant="outlined" onClick={() => setDialogOpen(false)}>
                        Cancel
                    </MyButton>
                    <MyButton variant="contained" onClick={handleSave} startIcon={<CheckCircle />}>
                        {editId ? 'Update' : 'Create'}
                    </MyButton>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)} maxWidth="xs">
                <DialogTitle sx={{ fontWeight: 600 }}>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this status? This action cannot be undone.</DialogContentText>
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
