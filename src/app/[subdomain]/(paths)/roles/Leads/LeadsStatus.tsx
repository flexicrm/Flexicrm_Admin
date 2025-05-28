// // 'use client';
// // import React, { useEffect, useMemo, useState } from 'react';
// // import axios from 'axios';
// // import { useFormik } from 'formik';
// // import Cookies from 'js-cookie';
// // import { TextField, Button, MenuItem, Select, InputLabel, FormControl, CircularProgress, Box, Typography, IconButton } from '@mui/material';
// // import AddIcon from '@mui/icons-material/Add';
// // import CheckIcon from '@mui/icons-material/Check';
// // import CloseIcon from '@mui/icons-material/Close';

// // interface LeadStatusType {
// //     _id: string;
// //     statusName: string;
// //     color: string;
// // }

// // const LeadsStatus = () => {
// //     const [leadstatus, setLeadStatus] = useState<LeadStatusType[]>([]);
// //     const [isAddingNewSource, setIsAddingNewSource] = useState(false);
// //     const [error, setError] = useState('');
// //     const [loading, setLoading] = useState(false);
// //     const accessToken = Cookies.get('accessToken');
// //     const subdomain = Cookies.get('subdomain');
// //     // console.log(onSelect, 'onSelect');
// //     // Set default values if leadStatus is provided
// //     // console.log(leadStatus, 'leadStatusWWWWWWWWWWWWWWWWWW');

// //     useEffect(() => {
// //         if (leadStatus) {
// //             formik.setFieldValue('statusName', leadStatus._id || '');
// //             formik.setFieldValue('color', `#${leadStatus.color || '000000'}`);
// //         }
// //         // eslint-disable-next-line react-hooks/exhaustive-deps
// //     }, [leadStatus]);
// //     console.log(leadStatus, 'leadStatus>>>>>>>>>>>>>>>>>>>>>>>');

// //     const formik = useFormik({
// //         initialValues: { statusName: leadStatus || '', color: '#000000' },
// //         onSubmit: async (values, { resetForm }) => {
// //             const newLeadSource = values.statusName;
// //             const colors = values.color;

// //             const headers = { Authorization: `Bearer ${accessToken}` };

// //             try {
// //                 setLoading(true);
// //                 await axios.post(`${API_BASE_URL}/leadstatus/${subdomain}`, { statusName: newLeadSource, color: colors.replace('#', '') }, { headers });
// //                 resetForm();
// //                 setIsAddingNewSource(false);
// //                 setError('');
// //                 fetchLeadSources();
// //             } catch (error) {
// //                 setError('Error adding new lead source. Please try again.');
// //                 console.error('Error adding new lead source:', error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         }
// //     });

// //     const fetchLeadSources = async () => {
// //         setError('');
// //         const headers = { Authorization: `Bearer ${accessToken}` };

// //         try {
// //             setLoading(true);
// //             const response = await axios.get(`${API_BASE_URL}/leadstatus/${subdomain}`, { headers });
// //             setLeadStatus(response?.data?.data || []);
// //         } catch (error) {
// //             setLeadStatus([]);
// //             setError('Error fetching lead sources.');
// //             console.error('Error fetching lead sources:', error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     useEffect(() => {
// //         if (subdomain && accessToken) {
// //             fetchLeadSources();
// //         }
// //         // eslint-disable-next-line react-hooks/exhaustive-deps
// //     }, [subdomain, accessToken]);

// //     const UsersOptions = useMemo(
// //         () =>
// //             leadstatus.map((lead) => ({
// //                 label: lead.statusName,
// //                 value: lead._id,
// //                 color: lead.color
// //             })),
// //         [leadstatus]
// //     );

// //     return (
// //         <>
// //             <Box display="flex" alignItems="center" mb={2}>
// //                 {!isAddingNewSource && (
// //                     <>
// //                         <FormControl sx={{ minWidth: 200 }} fullWidth size="small">
// //                             <InputLabel id="lead-status-label">Select Lead Status</InputLabel>
// //                             <Select
// //                                 labelId="lead-status-label"
// //                                 value={formik.values.statusName}
// //                                 label="Select Lead Status"
// //                                 onChange={(e) => {
// //                                     const selectedValue = e.target.value;
// //                                     if (selectedValue === 'addNew') {
// //                                         setIsAddingNewSource(true);
// //                                         formik.setFieldValue('statusName', '');
// //                                     } else {
// //                                         onSelect(selectedValue as string);
// //                                         formik.setFieldValue('statusName', selectedValue);
// //                                     }
// //                                 }}
// //                                 renderValue={(selected) => {
// //                                     const option = UsersOptions?.find((opt) => opt.value === selected);
// //                                     return option ? (
// //                                         <Box display="flex" alignItems="center">
// //                                             <Box
// //                                                 sx={{
// //                                                     width: 16,
// //                                                     height: 16,
// //                                                     // borderRadius: '15px',
// //                                                     bgcolor: `#${option.color}`,
// //                                                     mr: 1
// //                                                 }}
// //                                             />
// //                                             {option.label}
// //                                         </Box>
// //                                     ) : (
// //                                         <span>Select Lead Status</span>
// //                                     );
// //                                 }}
// //                             >
// //                                 {UsersOptions.map((option) => (
// //                                     <MenuItem key={option.value} value={option.value}>
// //                                         <Box display="flex" alignItems="center">
// //                                             <Box
// //                                                 sx={{
// //                                                     width: 16,
// //                                                     height: 16,
// //                                                     // borderRadius: '15px',
// //                                                     bgcolor: `#${option.color}`,
// //                                                     mr: 1
// //                                                 }}
// //                                             />
// //                                             {option.label}
// //                                         </Box>
// //                                     </MenuItem>
// //                                 ))}
// //                                 <MenuItem value="addNew">
// //                                     <Box display="flex" alignItems="center">
// //                                         <AddIcon fontSize="small" sx={{ mr: 1 }} />
// //                                         Add New Status
// //                                     </Box>
// //                                 </MenuItem>
// //                             </Select>
// //                         </FormControl>
// //                         {/* <IconButton sx={{ ml: 2 }} onClick={() => setIsAddingNewSource(true)}>
// //                             <AddIcon />
// //                         </IconButton> */}
// //                         {/* <Button variant="contained" color="primary" onClick={() => setIsAddingNewSource(true)} sx={{ minWidth: 40, ml: 1 }}>
// //                             +
// //                         </Button> */}
// //                     </>
// //                 )}
// //                 {isAddingNewSource && (
// //                     <Box display="flex" alignItems="center">
// //                         <TextField name="statusName" id="statusName" size="small" placeholder="New status Name" value={formik.values.statusName} onChange={formik.handleChange} required sx={{ ml: 1 }} />
// //                         <input type="color" id="color" name="color" value={formik.values.color} onChange={formik.handleChange} style={{ marginLeft: 8, width: 40, border: 'none', background: 'none' }} />
// //                         <IconButton color="primary" onClick={formik.handleSubmit as any} disabled={loading} sx={{ ml: 1 }}>
// //                             <CheckIcon />
// //                         </IconButton>
// //                         <IconButton color="error" onClick={() => setIsAddingNewSource(false)} disabled={loading}>
// //                             <CloseIcon />
// //                         </IconButton>
// //                     </Box>
// //                 )}
// //             </Box>
// //             {formik.touched.statusName && formik.errors.statusName && typeof formik.errors.statusName === 'string' && <Typography color="error">{formik.errors.statusName}</Typography>}
// //             {loading && (
// //                 <Box display="flex" alignItems="center">
// //                     <CircularProgress size={20} sx={{ mr: 1 }} />
// //                     <Typography>Loading...</Typography>
// //                 </Box>
// //             )}
// //             {error && <Typography color="error">{error}</Typography>}
// //         </>
// //     );
// // };

// // export default LeadsStatus;
// 'use client';
// import React, { useEffect, useMemo, useState } from 'react';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import Cookies from 'js-cookie';
// import {
//     TextField,
//     Button,
//     MenuItem,
//     Select,
//     InputLabel,
//     FormControl,
//     CircularProgress,
//     Box,
//     Typography,
//     IconButton,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { MyButton } from '../../../../Component/Buttons/Buttons';

// interface LeadStatusType {
//     _id: string;
//     statusName: string;
//     color: string;
// }

// const LeadsStatus = () => {
//     const [leadStatuses, setLeadStatuses] = useState<LeadStatusType[]>([]);
//     const [isAddingNewStatus, setIsAddingNewStatus] = useState(false);
//     const [editingStatus, setEditingStatus] = useState<LeadStatusType | null>(null);
//     const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
//     const [statusToDelete, setStatusToDelete] = useState<string | null>(null);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const [tableLoading, setTableLoading] = useState(false);
//     const accessToken = Cookies.get('accessToken');
//     const subdomain = Cookies.get('subdomain');
//     const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

//     // Form for adding new status
//     const addFormik = useFormik({
//         initialValues: { statusName: '', color: '#000000' },
//         onSubmit: async (values, { resetForm }) => {
//             const newLeadStatus = values.statusName;
//             const color = values.color;

//             const headers = { Authorization: `Bearer ${accessToken}` };

//             try {
//                 setLoading(true);
//                 const response = await axios.post(`${API_BASE_URL}/leadstatus/${subdomain}`, { statusName: newLeadStatus, color: color.replace('#', '') }, { headers });
//                 if (response.status !== 200) {
//                     alert('Failed to add new lead status. Please try again.');
//                     resetForm();
//                     setError('');
//                     setIsAddingNewStatus(false);
//                     fetchLeadStatuses();
//                 }
//             } catch (error) {
//                 setError('Error adding new lead status. Please try again.');
//                 console.error('Error adding new lead status:', error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     });

//     // Form for editing status
//     const editFormik = useFormik({
//         initialValues: { statusName: '', color: '#000000' },
//         onSubmit: async (values) => {
//             if (!editingStatus) return;

//             const headers = { Authorization: `Bearer ${accessToken}` };

//             try {
//                 setLoading(true);
//                 await axios.patch(
//                     `${API_BASE_URL}/leadstatus/${subdomain}/${editingStatus._id}`,
//                     {
//                         statusName: values.statusName,
//                         color: values.color.replace('#', '')
//                     },
//                     { headers }
//                 );
//                 setEditingStatus(null);
//                 setError('');
//                 fetchLeadStatuses();
//             } catch (error) {
//                 setError('Error updating lead status. Please try again.');
//                 console.error('Error updating lead status:', error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     });

//     // Fetch all lead statuses
//     const fetchLeadStatuses = async () => {
//         setError('');
//         const headers = { Authorization: `Bearer ${accessToken}` };

//         try {
//             setTableLoading(true);
//             const response = await axios.get(`${API_BASE_URL}/leadstatus/${subdomain}`, { headers });
//             setLeadStatuses(response?.data?.data || []);
//         } catch (error) {
//             setLeadStatuses([]);
//             setError('Error fetching lead statuses.');
//             console.error('Error fetching lead statuses:', error);
//         } finally {
//             setTableLoading(false);
//         }
//     };

//     // Delete a lead status
//     const handleDeleteStatus = async () => {
//         if (!statusToDelete) return;

//         const headers = { Authorization: `Bearer ${accessToken}` };

//         try {
//             setLoading(true);
//             await axios.delete(`${API_BASE_URL}/leadstatus/${subdomain}/${statusToDelete}`, { headers });
//             setStatusToDelete(null);
//             setDeleteConfirmOpen(false);
//             setError('');
//             fetchLeadStatuses();
//         } catch (error) {
//             setError('Error deleting lead status. Please try again.');
//             console.error('Error deleting lead status:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (subdomain && accessToken) {
//             fetchLeadStatuses();
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [subdomain, accessToken]);

//     // Set edit form values when editing a status
//     useEffect(() => {
//         if (editingStatus) {
//             editFormik.setValues({
//                 statusName: editingStatus.statusName,
//                 color: `#${editingStatus.color}`
//             });
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [editingStatus]);

//     return (
//         <Box sx={{ p: 0 }}>
//             {/* Add New Status Section */}
//             <Box sx={{ mb: 3 }}>
//                 {!isAddingNewStatus && !editingStatus ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'end' }}>
//                         <MyButton variant="contained" startIcon={<AddIcon />} onClick={() => setIsAddingNewStatus(true)}>
//                             New Status
//                         </MyButton>
//                     </Box>
//                 ) : (
//                     <Box
//                         component="form"
//                         onSubmit={editingStatus ? editFormik.handleSubmit : addFormik.handleSubmit}
//                         sx={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: 2,
//                             p: 2,
//                             backgroundColor: '#f5f5f5',
//                             borderRadius: 1
//                         }}
//                     >
//                         <TextField
//                             name="statusName"
//                             label="Status Name"
//                             size="small"
//                             value={editingStatus ? editFormik.values.statusName : addFormik.values.statusName}
//                             onChange={editingStatus ? editFormik.handleChange : addFormik.handleChange}
//                             required
//                         />
//                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                             <input
//                                 type="color"
//                                 id="color"
//                                 name="color"
//                                 value={editingStatus ? editFormik.values.color : addFormik.values.color}
//                                 onChange={editingStatus ? editFormik.handleChange : addFormik.handleChange}
//                                 style={{
//                                     width: 40,
//                                     height: 40,
//                                     border: 'none',
//                                     borderRadius: 4,
//                                     cursor: 'pointer'
//                                 }}
//                             />
//                         </Box>
//                         <Box sx={{ display: 'flex', gap: 1 }}>
//                             <MyButton type="submit" variant="contained" color="primary" disabled={loading} startIcon={<CheckIcon />}>
//                                 {loading ? <CircularProgress size={20} /> : 'Save'}
//                             </MyButton>
//                             <MyButton
//                                 variant="outlined"
//                                 color="error"
//                                 onClick={() => {
//                                     if (editingStatus) {
//                                         setEditingStatus(null);
//                                     } else {
//                                         setIsAddingNewStatus(false);
//                                         addFormik.resetForm();
//                                     }
//                                 }}
//                                 disabled={loading}
//                                 startIcon={<CloseIcon />}
//                             >
//                                 Cancel
//                             </MyButton>
//                         </Box>
//                     </Box>
//                 )}
//             </Box>

//             {/* Error Message */}
//             {/* {error && (
//                 <Typography color="error" sx={{ mb: 2 }}>
//                     {error}
//                 </Typography>
//             )} */}

//             {/* Status Table */}
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Status Name</TableCell>
//                             <TableCell>Color</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {tableLoading ? (
//                             <TableRow>
//                                 <TableCell colSpan={3} align="center">
//                                     <CircularProgress />
//                                 </TableCell>
//                             </TableRow>
//                         ) : leadStatuses.length === 0 ? (
//                             <TableRow>
//                                 <TableCell colSpan={3} align="center">
//                                     No lead statuses found
//                                 </TableCell>
//                             </TableRow>
//                         ) : (
//                             leadStatuses.map((status) => (
//                                 <TableRow key={status._id}>
//                                     <TableCell>{status.statusName}</TableCell>
//                                     <TableCell>
//                                         <Box
//                                             sx={{
//                                                 width: 24,
//                                                 height: 24,
//                                                 backgroundColor: `#${status.color}`,
//                                                 border: '1px solid #ddd'
//                                             }}
//                                         />
//                                     </TableCell>
//                                     <TableCell>
//                                         <IconButton onClick={() => setEditingStatus(status)} color="primary">
//                                             <EditIcon />
//                                         </IconButton>
//                                         <IconButton
//                                             onClick={() => {
//                                                 setStatusToDelete(status._id);
//                                                 setDeleteConfirmOpen(true);
//                                             }}
//                                             color="error"
//                                         >
//                                             <DeleteIcon />
//                                         </IconButton>
//                                     </TableCell>
//                                 </TableRow>
//                             ))
//                         )}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             {/* Delete Confirmation Dialog */}
//             <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
//                 <DialogTitle>Confirm Delete</DialogTitle>
//                 <DialogContent>Are you sure you want to delete this status? This action cannot be undone.</DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setDeleteConfirmOpen(false)} disabled={loading}>
//                         Cancel
//                     </Button>
//                     <Button onClick={handleDeleteStatus} color="error" disabled={loading} startIcon={loading ? <CircularProgress size={20} /> : <DeleteIcon />}>
//                         Delete
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default LeadsStatus;
'use client';
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import {
    TextField,
    Button,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    CircularProgress,
    Box,
    Typography,
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
    Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MyButton } from '../../../../Component/Buttons/Buttons';

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
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const accessToken = Cookies.get('accessToken');
    const subdomain = Cookies.get('subdomain');
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    // Form for adding new status
    const addFormik = useFormik({
        initialValues: { statusName: '', color: '#000000' },
        onSubmit: async (values, { resetForm }) => {
            const newLeadStatus = values.statusName;
            const color = values.color;

            const headers = { Authorization: `Bearer ${accessToken}` };

            try {
                setLoading(true);
                const response = await axios.post(`${API_BASE_URL}/leadstatus/${subdomain}`, { statusName: newLeadStatus, color: color.replace('#', '') }, { headers });
                if (response.status !== 200) {
                    showSnackbar('Failed to add new lead status. Please try again.', 'error');
                    resetForm();
                    setIsAddingNewStatus(false);
                    fetchLeadStatuses();
                } else {
                    showSnackbar('Lead status added successfully!', 'success');
                    resetForm();
                    setIsAddingNewStatus(false);
                    fetchLeadStatuses();
                }
            } catch (error) {
                showSnackbar('Error adding new lead status. Please try again.', 'error');
                console.error('Error adding new lead status:', error);
            } finally {
                setLoading(false);
            }
        }
    });

    // Form for editing status
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
                showSnackbar('Lead status updated successfully!', 'success');
                fetchLeadStatuses();
            } catch (error) {
                showSnackbar('Error updating lead status. Please try again.', 'error');
                console.error('Error updating lead status:', error);
            } finally {
                setLoading(false);
            }
        }
    });

    // Fetch all lead statuses
    const fetchLeadStatuses = async () => {
        setError('');
        const headers = { Authorization: `Bearer ${accessToken}` };

        try {
            setTableLoading(true);
            const response = await axios.get(`${API_BASE_URL}/leadstatus/${subdomain}`, { headers });
            setLeadStatuses(response?.data?.data || []);
        } catch (error) {
            setLeadStatuses([]);
            showSnackbar('Error fetching lead statuses.', 'error');
            console.error('Error fetching lead statuses:', error);
        } finally {
            setTableLoading(false);
        }
    };

    // Delete a lead status
    const handleDeleteStatus = async () => {
        if (!statusToDelete) return;

        const headers = { Authorization: `Bearer ${accessToken}` };

        try {
            setLoading(true);
            await axios.delete(`${API_BASE_URL}/leadstatus/${subdomain}/${statusToDelete}`, { headers });
            setStatusToDelete(null);
            setDeleteConfirmOpen(false);
            showSnackbar('Lead status deleted successfully!', 'success');
            fetchLeadStatuses();
        } catch (error) {
            showSnackbar('Error deleting lead status. Please try again.', 'error');
            console.error('Error deleting lead status:', error);
        } finally {
            setLoading(false);
        }
    };

    const showSnackbar = (message: string, severity: 'success' | 'error') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        if (subdomain && accessToken) {
            fetchLeadStatuses();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subdomain, accessToken]);

    // Set edit form values when editing a status
    useEffect(() => {
        if (editingStatus) {
            editFormik.setValues({
                statusName: editingStatus.statusName,
                color: `#${editingStatus.color}`
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editingStatus]);

    return (
        <Box sx={{ p: 0 }}>
            {/* Add New Status Section */}
            <Box sx={{ mb: 3 }}>
                {!isAddingNewStatus && !editingStatus ? (
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                        <MyButton variant="contained" startIcon={<AddIcon />} onClick={() => setIsAddingNewStatus(true)}>
                            Status
                        </MyButton>
                    </Box>
                ) : (
                    <Box
                        component="form"
                        onSubmit={editingStatus ? editFormik.handleSubmit : addFormik.handleSubmit}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            p: 2,
                            backgroundColor: '#f5f5f5',
                            borderRadius: 1
                        }}
                    >
                        <TextField
                            name="statusName"
                            label="Status Name"
                            size="small"
                            value={editingStatus ? editFormik.values.statusName : addFormik.values.statusName}
                            onChange={editingStatus ? editFormik.handleChange : addFormik.handleChange}
                            required
                        />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="color"
                                id="color"
                                name="color"
                                value={editingStatus ? editFormik.values.color : addFormik.values.color}
                                onChange={editingStatus ? editFormik.handleChange : addFormik.handleChange}
                                style={{
                                    width: 40,
                                    height: 40,
                                    border: 'none',
                                    borderRadius: 4,
                                    cursor: 'pointer'
                                }}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <MyButton type="submit" variant="contained" color="primary" disabled={loading} startIcon={<CheckIcon />}>
                                {loading ? <CircularProgress size={20} /> : 'Save'}
                            </MyButton>
                            <MyButton
                                variant="outlined"
                                color="error"
                                onClick={() => {
                                    if (editingStatus) {
                                        setEditingStatus(null);
                                    } else {
                                        setIsAddingNewStatus(false);
                                        addFormik.resetForm();
                                    }
                                }}
                                disabled={loading}
                                startIcon={<CloseIcon />}
                            >
                                Cancel
                            </MyButton>
                        </Box>
                    </Box>
                )}
            </Box>

            {/* Status Table */}
            <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Status Name</TableCell>
                            <TableCell>Color</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableLoading ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : leadStatuses.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={3} align="center">
                                    No lead statuses found
                                </TableCell>
                            </TableRow>
                        ) : (
                            leadStatuses.map((status) => (
                                <TableRow key={status._id}>
                                    <TableCell>{status.statusName}</TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                backgroundColor: `#${status.color}`,
                                                border: '1px solid #ddd'
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => setEditingStatus(status)} color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                setStatusToDelete(status._id);
                                                setDeleteConfirmOpen(true);
                                            }}
                                            color="error"
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to delete this status? This action cannot be undone.</DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteConfirmOpen(false)} disabled={loading}>
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteStatus} color="error" disabled={loading} startIcon={loading ? <CircularProgress size={20} /> : <DeleteIcon />}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for showing messages */}
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default LeadsStatus;
