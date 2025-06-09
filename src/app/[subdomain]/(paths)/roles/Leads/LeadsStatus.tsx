// // 'use client';
// // import React, { useEffect, useMemo, useState } from 'react';
// // import axios from 'axios';
// // import { useFormik } from 'formik';
// // import Cookies from 'js-cookie';
// // import {
// //     TextField,
// //     Button,
// //     MenuItem,
// //     Select,
// //     InputLabel,
// //     FormControl,
// //     CircularProgress,
// //     Box,
// //     Typography,
// //     IconButton,
// //     Table,
// //     TableBody,
// //     TableCell,
// //     TableContainer,
// //     TableHead,
// //     TableRow,
// //     Paper,
// //     Dialog,
// //     DialogTitle,
// //     DialogContent,
// //     DialogActions,
// //     Snackbar,
// //     Alert
// // } from '@mui/material';
// // import AddIcon from '@mui/icons-material/Add';
// // import CheckIcon from '@mui/icons-material/Check';
// // import CloseIcon from '@mui/icons-material/Close';
// // import EditIcon from '@mui/icons-material/Edit';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import { MyButton } from '../../../../Component/Buttons/Buttons';

// // interface LeadStatusType {
// //     _id: string;
// //     statusName: string;
// //     color: string;
// // }

// // const LeadsStatus = () => {
// //     const [leadStatuses, setLeadStatuses] = useState<LeadStatusType[]>([]);
// //     const [isAddingNewStatus, setIsAddingNewStatus] = useState(false);
// //     const [editingStatus, setEditingStatus] = useState<LeadStatusType | null>(null);
// //     const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
// //     const [statusToDelete, setStatusToDelete] = useState<string | null>(null);
// //     const [error, setError] = useState('');
// //     const [loading, setLoading] = useState(false);
// //     const [tableLoading, setTableLoading] = useState(false);
// //     const [snackbarOpen, setSnackbarOpen] = useState(false);
// //     const [snackbarMessage, setSnackbarMessage] = useState('');
// //     const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
// //     const accessToken = Cookies.get('accessToken');
// //     const subdomain = Cookies.get('subdomain');
// //     const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// //     // Form for adding new status
// //     const addFormik = useFormik({
// //         initialValues: { statusName: '', color: '#000000' },
// //         onSubmit: async (values, { resetForm }) => {
// //             const newLeadStatus = values.statusName;
// //             const color = values.color;

// //             const headers = { Authorization: `Bearer ${accessToken}` };

// //             try {
// //                 setLoading(true);
// //                 const response = await axios.post(`${API_BASE_URL}/leadstatus/${subdomain}`, { statusName: newLeadStatus, color: color.replace('#', '') }, { headers });
// //                 if (response.status !== 200) {
// //                     showSnackbar('Failed to add new lead status. Please try again.', 'error');
// //                     resetForm();
// //                     setIsAddingNewStatus(false);
// //                     fetchLeadStatuses();
// //                 } else {
// //                     showSnackbar('Lead status added successfully!', 'success');
// //                     resetForm();
// //                     setIsAddingNewStatus(false);
// //                     fetchLeadStatuses();
// //                 }
// //             } catch (error) {
// //                 showSnackbar('Error adding new lead status. Please try again.', 'error');
// //                 console.error('Error adding new lead status:', error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         }
// //     });

// //     // Form for editing status
// //     const editFormik = useFormik({
// //         initialValues: { statusName: '', color: '#000000' },
// //         onSubmit: async (values) => {
// //             if (!editingStatus) return;

// //             const headers = { Authorization: `Bearer ${accessToken}` };

// //             try {
// //                 setLoading(true);
// //                 await axios.patch(
// //                     `${API_BASE_URL}/leadstatus/${subdomain}/${editingStatus._id}`,
// //                     {
// //                         statusName: values.statusName,
// //                         color: values.color.replace('#', '')
// //                     },
// //                     { headers }
// //                 );
// //                 setEditingStatus(null);
// //                 showSnackbar('Lead status updated successfully!', 'success');
// //                 fetchLeadStatuses();
// //             } catch (error) {
// //                 showSnackbar('Error updating lead status. Please try again.', 'error');
// //                 console.error('Error updating lead status:', error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         }
// //     });

// //     // Fetch all lead statuses
// //     const fetchLeadStatuses = async () => {
// //         setError('');
// //         const headers = { Authorization: `Bearer ${accessToken}` };

// //         try {
// //             setTableLoading(true);
// //             const response = await axios.get(`${API_BASE_URL}/leadstatus/${subdomain}`, { headers });
// //             setLeadStatuses(response?.data?.data || []);
// //         } catch (error) {
// //             setLeadStatuses([]);
// //             showSnackbar('Error fetching lead statuses.', 'error');
// //             console.error('Error fetching lead statuses:', error);
// //         } finally {
// //             setTableLoading(false);
// //         }
// //     };

// //     // Delete a lead status
// //     const handleDeleteStatus = async () => {
// //         if (!statusToDelete) return;

// //         const headers = { Authorization: `Bearer ${accessToken}` };

// //         try {
// //             setLoading(true);
// //             await axios.delete(`${API_BASE_URL}/leadstatus/${subdomain}/${statusToDelete}`, { headers });
// //             setStatusToDelete(null);
// //             setDeleteConfirmOpen(false);
// //             showSnackbar('Lead status deleted successfully!', 'success');
// //             fetchLeadStatuses();
// //         } catch (error) {
// //             showSnackbar('Error deleting lead status. Please try again.', 'error');
// //             console.error('Error deleting lead status:', error);
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const showSnackbar = (message: string, severity: 'success' | 'error') => {
// //         setSnackbarMessage(message);
// //         setSnackbarSeverity(severity);
// //         setSnackbarOpen(true);
// //     };

// //     const handleCloseSnackbar = () => {
// //         setSnackbarOpen(false);
// //     };

// //     useEffect(() => {
// //         if (subdomain && accessToken) {
// //             fetchLeadStatuses();
// //         }
// //         // eslint-disable-next-line react-hooks/exhaustive-deps
// //     }, [subdomain, accessToken]);

// //     // Set edit form values when editing a status
// //     useEffect(() => {
// //         if (editingStatus) {
// //             editFormik.setValues({
// //                 statusName: editingStatus.statusName,
// //                 color: `#${editingStatus.color}`
// //             });
// //         }
// //         // eslint-disable-next-line react-hooks/exhaustive-deps
// //     }, [editingStatus]);

// //     return (
// //         <Box sx={{ p: 0 }}>
// //             {/* Add New Status Section */}
// //             <Box sx={{ mb: 3 }}>
// //                 {!isAddingNewStatus && !editingStatus ? (
// //                     <Box sx={{ display: 'flex', justifyContent: 'end' }}>
// //                         <MyButton variant="contained" startIcon={<AddIcon />} onClick={() => setIsAddingNewStatus(true)}>
// //                             Status
// //                         </MyButton>
// //                     </Box>
// //                 ) : (
// //                     <Box
// //                         component="form"
// //                         onSubmit={editingStatus ? editFormik.handleSubmit : addFormik.handleSubmit}
// //                         sx={{
// //                             display: 'flex',
// //                             alignItems: 'center',
// //                             gap: 2,
// //                             p: 2,
// //                             backgroundColor: '#f5f5f5',
// //                             borderRadius: 1
// //                         }}
// //                     >
// //                         <TextField
// //                             name="statusName"
// //                             label="Status Name"
// //                             size="small"
// //                             value={editingStatus ? editFormik.values.statusName : addFormik.values.statusName}
// //                             onChange={editingStatus ? editFormik.handleChange : addFormik.handleChange}
// //                             required
// //                         />
// //                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                             <input
// //                                 type="color"
// //                                 id="color"
// //                                 name="color"
// //                                 value={editingStatus ? editFormik.values.color : addFormik.values.color}
// //                                 onChange={editingStatus ? editFormik.handleChange : addFormik.handleChange}
// //                                 style={{
// //                                     width: 40,
// //                                     height: 40,
// //                                     border: 'none',
// //                                     borderRadius: 4,
// //                                     cursor: 'pointer'
// //                                 }}
// //                             />
// //                         </Box>
// //                         <Box sx={{ display: 'flex', gap: 1 }}>
// //                             <MyButton type="submit" variant="contained" color="primary" disabled={loading} startIcon={<CheckIcon />}>
// //                                 {loading ? <CircularProgress size={20} /> : 'Save'}
// //                             </MyButton>
// //                             <MyButton
// //                                 variant="outlined"
// //                                 color="error"
// //                                 onClick={() => {
// //                                     if (editingStatus) {
// //                                         setEditingStatus(null);
// //                                     } else {
// //                                         setIsAddingNewStatus(false);
// //                                         addFormik.resetForm();
// //                                     }
// //                                 }}
// //                                 disabled={loading}
// //                                 startIcon={<CloseIcon />}
// //                             >
// //                                 Cancel
// //                             </MyButton>
// //                         </Box>
// //                     </Box>
// //                 )}
// //             </Box>

// //             {/* Status Table */}
// //             <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
// //                 <Table>
// //                     <TableHead>
// //                         <TableRow>
// //                             <TableCell>Status Name</TableCell>
// //                             <TableCell>Color</TableCell>
// //                             <TableCell>Actions</TableCell>
// //                         </TableRow>
// //                     </TableHead>
// //                     <TableBody>
// //                         {tableLoading ? (
// //                             <TableRow>
// //                                 <TableCell colSpan={3} align="center">
// //                                     <CircularProgress />
// //                                 </TableCell>
// //                             </TableRow>
// //                         ) : leadStatuses.length === 0 ? (
// //                             <TableRow>
// //                                 <TableCell colSpan={3} align="center">
// //                                     No lead statuses found
// //                                 </TableCell>
// //                             </TableRow>
// //                         ) : (
// //                             leadStatuses.map((status) => (
// //                                 <TableRow key={status._id}>
// //                                     <TableCell>{status.statusName}</TableCell>
// //                                     <TableCell>
// //                                         <Box
// //                                             sx={{
// //                                                 width: 24,
// //                                                 height: 24,
// //                                                 backgroundColor: `#${status.color}`,
// //                                                 border: '1px solid #ddd'
// //                                             }}
// //                                         />
// //                                     </TableCell>
// //                                     <TableCell>
// //                                         <IconButton onClick={() => setEditingStatus(status)} color="primary">
// //                                             <EditIcon />
// //                                         </IconButton>
// //                                         <IconButton
// //                                             onClick={() => {
// //                                                 setStatusToDelete(status._id);
// //                                                 setDeleteConfirmOpen(true);
// //                                             }}
// //                                             color="error"
// //                                         >
// //                                             <DeleteIcon />
// //                                         </IconButton>
// //                                     </TableCell>
// //                                 </TableRow>
// //                             ))
// //                         )}
// //                     </TableBody>
// //                 </Table>
// //             </TableContainer>

// //             {/* Delete Confirmation Dialog */}
// //             <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
// //                 <DialogTitle>Confirm Delete</DialogTitle>
// //                 <DialogContent>Are you sure you want to delete this status? This action cannot be undone.</DialogContent>
// //                 <DialogActions>
// //                     <Button onClick={() => setDeleteConfirmOpen(false)} disabled={loading}>
// //                         Cancel
// //                     </Button>
// //                     <Button onClick={handleDeleteStatus} color="error" disabled={loading} startIcon={loading ? <CircularProgress size={20} /> : <DeleteIcon />}>
// //                         Delete
// //                     </Button>
// //                 </DialogActions>
// //             </Dialog>

// //             {/* Snackbar for showing messages */}
// //             <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
// //                 <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
// //                     {snackbarMessage}
// //                 </Alert>
// //             </Snackbar>
// //         </Box>
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
//     DialogActions,
//     Snackbar,
//     Alert,
//     TablePagination
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
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page
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
//                     showSnackbar('Failed to add new lead status. Please try again.', 'error');
//                     resetForm();
//                     setIsAddingNewStatus(false);
//                     fetchLeadStatuses();
//                 } else {
//                     showSnackbar('Lead status added successfully!', 'success');
//                     resetForm();
//                     setIsAddingNewStatus(false);
//                     fetchLeadStatuses();
//                 }
//             } catch (error) {
//                 showSnackbar('Error adding new lead status. Please try again.', 'error');
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
//                 showSnackbar('Lead status updated successfully!', 'success');
//                 fetchLeadStatuses();
//             } catch (error) {
//                 showSnackbar('Error updating lead status. Please try again.', 'error');
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
//             showSnackbar('Error fetching lead statuses.', 'error');
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
//             showSnackbar('Lead status deleted successfully!', 'success');
//             fetchLeadStatuses();
//         } catch (error) {
//             showSnackbar('Error deleting lead status. Please try again.', 'error');
//             console.error('Error deleting lead status:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const showSnackbar = (message: string, severity: 'success' | 'error') => {
//         setSnackbarMessage(message);
//         setSnackbarSeverity(severity);
//         setSnackbarOpen(true);
//     };

//     const handleCloseSnackbar = () => {
//         setSnackbarOpen(false);
//     };

//     const handleChangePage = (event: unknown, newPage: number) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
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
//                             Status
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

//             {/* Status Table */}
//             <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
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
//                             leadStatuses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((status) => (
//                                 <TableRow key={status._id}>
//                                     <TableCell>{status.statusName}</TableCell>
//                                     <TableCell>
//                                         <Box
//                                             sx={{
//                                                 width: 24,
//                                                 height: 24,
//                                                 backgroundColor: `#${status.color}`,
//                                                 border: '1px solid #ddd',
//                                                 borderRadius: '50%'
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
//                 <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={leadStatuses.length} rowsPerPage={rowsPerPage} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
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

//             {/* Snackbar for showing messages */}
//             <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
//                 <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
//                     {snackbarMessage}
//                 </Alert>
//             </Snackbar>
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
    Alert,
    TablePagination
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
                    <MyButton type="submit" variant="contained" disabled={loading} startIcon={<Check />}>
                        {loading ? <CircularProgress size={20} /> : 'Save'}
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
                    >
                        Cancel
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
