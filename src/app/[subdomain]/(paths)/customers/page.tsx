// 'use client';
// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { useRouter } from 'next/navigation';
// import Swal from 'sweetalert2';
// import Link from 'next/link';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import { CiExport } from 'react-icons/ci';
// import userContext from '../../../UseContext/UseContext';
// import { API_BASE_URL } from '../../../utils';

// // Material UI Components
// import {
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     Paper,
//     Checkbox,
//     Switch,
//     TextField,
//     Button,
//     IconButton,
//     Menu,
//     MenuItem,
//     Avatar,
//     Typography,
//     Box,
//     Card,
//     CardContent,
//     Grid,
//     InputAdornment,
//     Tooltip,
//     Chip,
//     Divider,
//     CircularProgress,
//     Badge
// } from '@mui/material';
// import {
//     Add as AddIcon,
//     Delete as DeleteIcon,
//     Edit as EditIcon,
//     FileUpload as FileUploadIcon,
//     PictureAsPdf as PictureAsPdfIcon,
//     GridOn as GridOnIcon,
//     Search as SearchIcon,
//     FilterList as FilterListIcon,
//     DateRange as DateRangeIcon,
//     MoreVert as MoreVertIcon,
//     Refresh as RefreshIcon,
//     Visibility as VisibilityIcon,
//     People as PeopleIcon,
//     CheckCircle as ActiveIcon,
//     Cancel as InactiveIcon,
//     Business as CompanyIcon,
//     Email as EmailIcon,
//     Phone as PhoneIcon,
//     CalendarToday as CalendarIcon
// } from '@mui/icons-material';

// // Custom styled components
// const SummaryCard = ({ title, value, icon, color }) => (
//     <Card
//         sx={{
//             minWidth: 180,
//             borderRadius: 3,
//             boxShadow: 0,
//             border: '1px solid',
//             borderColor: 'divider',
//             background: 'transparent'
//         }}
//     >
//         <CardContent sx={{ p: 2 }}>
//             <Box display="flex" alignItems="center" justifyContent="space-between">
//                 <Box>
//                     <Typography variant="h6" fontWeight="bold" color={color}>
//                         {value}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                         {title}
//                     </Typography>
//                 </Box>
//                 <Box
//                     sx={{
//                         width: 48,
//                         height: 48,
//                         borderRadius: '50%',
//                         bgcolor: `${color}.light`,
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center'
//                     }}
//                 >
//                     {React.cloneElement(icon, {
//                         fontSize: 'medium',
//                         sx: { color: `${color}.main` }
//                     })}
//                 </Box>
//             </Box>
//         </CardContent>
//     </Card>
// );

// export default function ContactTable({ slug }) {
//     // ... (keep all your existing state and functions)
//     const [contacts, setContacts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [filteredContacts, setFilteredContacts] = useState([]);
//     const [selectedContacts, setSelectedContacts] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [statusFilter, setStatusFilter] = useState('all');
//     const [dateFilter, setDateFilter] = useState(null);
//     const accessToken = Cookies.get('accessToken');
//     const subdomain = Cookies.get('subdomain');
//     const router = useRouter();
//     const { data } = useContext(userContext);
//     const [userPermissions, setUserPermissions] = useState({});

//     // Menu states
//     const [exportAnchorEl, setExportAnchorEl] = useState(null);
//     const [filterAnchorEl, setFilterAnchorEl] = useState(null);
//     const [dateAnchorEl, setDateAnchorEl] = useState(null);

//     const exportMenuOpen = Boolean(exportAnchorEl);
//     const filterMenuOpen = Boolean(filterAnchorEl);
//     const dateMenuOpen = Boolean(dateAnchorEl);

//     useEffect(() => {
//         if (data?.permissions) {
//             setUserPermissions(data.permissions);
//         }
//     }, [data?.permissions]);

//     const fetchContacts = async () => {
//         setLoading(true);
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/customer/${subdomain}`, { headers });
//             setContacts(response.data.data.customers);
//             setFilteredContacts(response.data.data.customers);
//         } catch (error) {
//             setError('Error fetching contacts');
//             console.error('Error fetching contacts:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchContacts();
//     }, [accessToken, subdomain]);

//     // Apply filters whenever search term, status filter, or date filter changes
//     useEffect(() => {
//         let result = contacts;

//         // Apply search filter
//         if (searchTerm) {
//             result = result.filter(
//                 (contact) =>
//                     contact.Companyname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                     contact.customerId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                     contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                     contact.phone?.toLowerCase().includes(searchTerm.toLowerCase())
//             );
//         }

//         // Apply status filter
//         if (statusFilter !== 'all') {
//             const statusValue = statusFilter === 'active' ? 1 : 0;
//             result = result.filter((contact) => contact.status === statusValue);
//         }

//         setFilteredContacts(result);
//     }, [contacts, searchTerm, statusFilter, dateFilter]);

//     const handleEdit = (contact) => {
//         router.push(`customers/cutombersedit/${contact.customerId}`);
//     };

//     const handleView = (contact) => {
//         router.push(`customers/view/${contact.customerId}`);
//     };

//     const handleDelete = async (contactId) => {
//         const result = await Swal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, delete it!'
//         });

//         if (result.isConfirmed) {
//             try {
//                 const headers = { Authorization: `Bearer ${accessToken}` };
//                 await axios.delete(`${API_BASE_URL}/customer/${subdomain}/${contactId}`, { headers });

//                 setContacts(contacts.filter((contact) => contact._id !== contactId));
//                 setFilteredContacts(filteredContacts.filter((contact) => contact._id !== contactId));

//                 Swal.fire('Deleted!', 'The contact has been deleted.', 'success');
//             } catch (error) {
//                 console.error('Error deleting contact:', error);
//                 Swal.fire('Error!', 'There was an error deleting the contact.', 'error');
//             }
//         }
//     };

//     const handleBulkDelete = () => {
//         if (selectedContacts.length === 0) {
//             Swal.fire('No selection', 'Please select contacts to delete', 'info');
//             return;
//         }

//         Swal.fire({
//             title: `Delete ${selectedContacts.length} contacts?`,
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, delete them!'
//         }).then((result) => {
//             if (result.isConfirmed) {
//                 const deletePromises = selectedContacts.map((contact) =>
//                     axios.delete(`${API_BASE_URL}/customer/${subdomain}/${contact.customerId}`, {
//                         headers: { Authorization: `Bearer ${accessToken}` }
//                     })
//                 );

//                 Promise.all(deletePromises)
//                     .then(() => {
//                         const remainingContacts = contacts.filter((contact) => !selectedContacts.some((selected) => selected._id === contact._id));

//                         setContacts(remainingContacts);
//                         setFilteredContacts(remainingContacts);
//                         setSelectedContacts([]);

//                         Swal.fire('Deleted!', 'The selected contacts have been deleted.', 'success');
//                     })
//                     .catch((error) => {
//                         console.error('Error deleting contacts:', error);
//                         Swal.fire('Error!', 'There was an error deleting the contacts.', 'error');
//                     });
//             }
//         });
//     };

//     const handleExportExcel = () => {
//         const modifiedContacts = filteredContacts.map((contact) => ({
//             'Company Name': contact.Companyname || 'N/A',
//             'Customer ID': contact.customerId || 'N/A',
//             Phone: contact.phone || 'N/A',
//             Email: contact.email || 'N/A',
//             'GST No': contact.GSTno || 'N/A',
//             Status: contact.status === 1 ? 'Active' : 'Inactive',
//             'Created At': formatDate(contact.createdAt)
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(modifiedContacts);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');
//         XLSX.writeFile(workbook, 'contacts.xlsx');
//         setExportAnchorEl(null);
//     };

//     const handleExportPDF = () => {
//         const doc = new jsPDF();
//         doc.setFontSize(18);
//         doc.setTextColor(40, 53, 147);
//         doc.text('Customer Contacts Report', 14, 22);

//         doc.setFontSize(11);
//         doc.setTextColor(100, 100, 100);
//         doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

//         doc.autoTable({
//             startY: 40,
//             head: [['Company', 'Customer ID', 'Phone', 'Email', 'GST No', 'Status', 'Created At']],
//             body: filteredContacts.map((contact) => [
//                 contact.Companyname || 'N/A',
//                 contact.customerId || 'N/A',
//                 contact.phone || 'N/A',
//                 contact.email || 'N/A',
//                 contact.GSTno || 'N/A',
//                 contact.status === 1 ? 'Active' : 'Inactive',
//                 formatDate(contact.createdAt)
//             ]),
//             styles: {
//                 fontSize: 9,
//                 cellPadding: 3,
//                 overflow: 'linebreak'
//             },
//             headStyles: {
//                 fillColor: [40, 53, 147],
//                 textColor: 255,
//                 fontStyle: 'bold'
//             },
//             alternateRowStyles: {
//                 fillColor: [240, 240, 240]
//             },
//             margin: { top: 10 }
//         });

//         doc.save('contacts.pdf');
//         setExportAnchorEl(null);
//     };

//     const handleStatusChange = async (contactId, status) => {
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             await axios.patch(`${API_BASE_URL}/customer/${contactId}`, { status }, { headers });

//             setContacts((prevContacts) => prevContacts.map((contact) => (contact._id === contactId ? { ...contact, status } : contact)));
//         } catch (error) {
//             console.error('Error updating status:', error);
//             Swal.fire('Error!', 'Failed to update contact status', 'error');
//         }
//     };

//     const formatDate = (dateString) => {
//         if (!dateString) return 'N/A';
//         const date = new Date(dateString);
//         return date.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'short',
//             day: 'numeric'
//         });
//     };

//     const handleSelectAllClick = (event) => {
//         if (event.target.checked) {
//             setSelectedContacts(filteredContacts);
//             return;
//         }
//         setSelectedContacts([]);
//     };

//     const handleCheckboxClick = (event, contact) => {
//         const selectedIndex = selectedContacts.findIndex((c) => c._id === contact._id);
//         let newSelected = [];

//         if (selectedIndex === -1) {
//             newSelected = newSelected.concat(selectedContacts, contact);
//         } else if (selectedIndex === 0) {
//             newSelected = newSelected.concat(selectedContacts.slice(1));
//         } else if (selectedIndex === selectedContacts.length - 1) {
//             newSelected = newSelected.concat(selectedContacts.slice(0, -1));
//         } else if (selectedIndex > 0) {
//             newSelected = newSelected.concat(selectedContacts.slice(0, selectedIndex), selectedContacts.slice(selectedIndex + 1));
//         }

//         setSelectedContacts(newSelected);
//     };

//     const isSelected = (id) => selectedContacts.some((contact) => contact._id === id);

//     // Calculate customer summary
//     const totalCustomers = filteredContacts.length;
//     const activeCustomers = filteredContacts.filter((contact) => contact.status === 1).length;
//     const inactiveCustomers = filteredContacts.filter((contact) => contact.status === 0).length;

//     if (loading && contacts.length === 0) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
//                 <CircularProgress size={60} />
//             </Box>
//         );
//     }

//     if (error) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//                 <Typography color="error" variant="h6">
//                     {error}
//                 </Typography>
//                 <Button variant="outlined" color="primary" startIcon={<RefreshIcon />} onClick={fetchContacts} sx={{ ml: 2 }}>
//                     Retry
//                 </Button>
//             </Box>
//         );
//     }

//     return (
//         <Box sx={{ p: { xs: 2, sm: 3 } }}>
//             {/* Summary Cards - Redesigned */}
//             <Grid container spacing={2} sx={{ mb: 3 }}>
//                 <Grid item xs={12} sm={6} md={3}>
//                     <SummaryCard title="Total Customers" value={totalCustomers} icon={<PeopleIcon />} color="primary" />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                     <SummaryCard title="Active Customers" value={activeCustomers} icon={<ActiveIcon />} color="success" />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                     <SummaryCard title="Inactive Customers" value={inactiveCustomers} icon={<InactiveIcon />} color="error" />
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={3}>
//                     <SummaryCard title="New This Month" value={inactiveCustomers} icon={<CalendarIcon />} color="warning" />
//                 </Grid>
//             </Grid>

//             {/* Toolbar - Redesigned */}
//             <Card
//                 sx={{
//                     mb: 3,
//                     p: 2,
//                     borderRadius: 3,
//                     boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//                     border: '1px solid',
//                     borderColor: 'divider'
//                 }}
//             >
//                 <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" gap={2}>
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             flexDirection: { xs: 'column', sm: 'row' },
//                             alignItems: 'center',
//                             gap: 2,
//                             width: { xs: '100%', sm: 'auto' }
//                         }}
//                     >
//                         <TextField
//                             variant="outlined"
//                             size="small"
//                             placeholder="Search customers..."
//                             value={searchTerm}
//                             onChange={(e) => setSearchTerm(e.target.value)}
//                             InputProps={{
//                                 startAdornment: (
//                                     <InputAdornment position="start">
//                                         <SearchIcon color="action" />
//                                     </InputAdornment>
//                                 ),
//                                 sx: {
//                                     borderRadius: 3,
//                                     bgcolor: 'background.paper',
//                                     width: { xs: '100%', sm: 280 }
//                                 }
//                             }}
//                         />

//                         <Box display="flex" gap={1}>
//                             <Tooltip title="Filter">
//                                 <Button
//                                     variant={statusFilter !== 'all' ? 'contained' : 'outlined'}
//                                     color={statusFilter !== 'all' ? 'primary' : 'inherit'}
//                                     startIcon={<FilterListIcon />}
//                                     onClick={(e) => setFilterAnchorEl(e.currentTarget)}
//                                     sx={{
//                                         borderRadius: 3,
//                                         textTransform: 'none',
//                                         borderColor: 'divider'
//                                     }}
//                                 >
//                                     Filter
//                                 </Button>
//                             </Tooltip>

//                             <Menu anchorEl={filterAnchorEl} open={filterMenuOpen} onClose={() => setFilterAnchorEl(null)}>
//                                 <MenuItem
//                                     selected={statusFilter === 'all'}
//                                     onClick={() => {
//                                         setStatusFilter('all');
//                                         setFilterAnchorEl(null);
//                                     }}
//                                 >
//                                     All Statuses
//                                 </MenuItem>
//                                 <MenuItem
//                                     selected={statusFilter === 'active'}
//                                     onClick={() => {
//                                         setStatusFilter('active');
//                                         setFilterAnchorEl(null);
//                                     }}
//                                 >
//                                     Active Only
//                                 </MenuItem>
//                                 <MenuItem
//                                     selected={statusFilter === 'inactive'}
//                                     onClick={() => {
//                                         setStatusFilter('inactive');
//                                         setFilterAnchorEl(null);
//                                     }}
//                                 >
//                                     Inactive Only
//                                 </MenuItem>
//                             </Menu>
//                         </Box>
//                     </Box>

//                     <Box display="flex" flexWrap="wrap" gap={1}>
//                         {userPermissions?.Customer?.canCreate && (
//                             <Link href={`/${subdomain}/customers/newcustomber`} passHref>
//                                 <Button
//                                     variant="contained"
//                                     color="primary"
//                                     startIcon={<AddIcon />}
//                                     sx={{
//                                         borderRadius: 3,
//                                         textTransform: 'none',
//                                         boxShadow: 'none',
//                                         '&:hover': { boxShadow: 'none' }
//                                     }}
//                                 >
//                                     New Customer
//                                 </Button>
//                             </Link>
//                         )}

//                         {userPermissions?.Customer?.canDelete && (
//                             <Button
//                                 variant="outlined"
//                                 color="error"
//                                 startIcon={<DeleteIcon />}
//                                 onClick={handleBulkDelete}
//                                 disabled={selectedContacts.length === 0}
//                                 sx={{
//                                     borderRadius: 3,
//                                     textTransform: 'none',
//                                     borderColor: selectedContacts.length > 0 ? 'error.main' : 'divider'
//                                 }}
//                             >
//                                 Delete ({selectedContacts.length})
//                             </Button>
//                         )}

//                         <Button
//                             variant="outlined"
//                             color="inherit"
//                             startIcon={<CiExport style={{ fontSize: '1.2rem' }} />}
//                             onClick={(e) => setExportAnchorEl(e.currentTarget)}
//                             sx={{
//                                 borderRadius: 3,
//                                 textTransform: 'none',
//                                 borderColor: 'divider'
//                             }}
//                         >
//                             Export
//                         </Button>

//                         <Menu anchorEl={exportAnchorEl} open={exportMenuOpen} onClose={() => setExportAnchorEl(null)}>
//                             <MenuItem onClick={handleExportExcel}>
//                                 <GridOnIcon sx={{ mr: 1, color: 'success.main' }} />
//                                 <Typography>Export as Excel</Typography>
//                             </MenuItem>
//                             <MenuItem onClick={handleExportPDF}>
//                                 <PictureAsPdfIcon sx={{ mr: 1, color: 'error.main' }} />
//                                 <Typography>Export as PDF</Typography>
//                             </MenuItem>
//                         </Menu>
//                     </Box>
//                 </Box>
//             </Card>

//             {/* Status Filter Chips - Enhanced */}
//             <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
//                 <Chip
//                     label="All"
//                     onClick={() => setStatusFilter('all')}
//                     color={statusFilter === 'all' ? 'primary' : 'default'}
//                     variant={statusFilter === 'all' ? 'filled' : 'outlined'}
//                     size="small"
//                     sx={{
//                         borderRadius: 1,
//                         borderColor: 'divider'
//                     }}
//                 />
//                 <Chip
//                     label="Active"
//                     onClick={() => setStatusFilter('active')}
//                     color={statusFilter === 'active' ? 'success' : 'default'}
//                     variant={statusFilter === 'active' ? 'filled' : 'outlined'}
//                     size="small"
//                     icon={<ActiveIcon fontSize="small" />}
//                     sx={{
//                         borderRadius: 1,
//                         borderColor: 'divider'
//                     }}
//                 />
//                 <Chip
//                     label="Inactive"
//                     onClick={() => setStatusFilter('inactive')}
//                     color={statusFilter === 'inactive' ? 'error' : 'default'}
//                     variant={statusFilter === 'inactive' ? 'filled' : 'outlined'}
//                     size="small"
//                     icon={<InactiveIcon fontSize="small" />}
//                     sx={{
//                         borderRadius: 1,
//                         borderColor: 'divider'
//                     }}
//                 />
//                 {searchTerm && (
//                     <Chip
//                         label={`Search: "${searchTerm}"`}
//                         onDelete={() => setSearchTerm('')}
//                         color="info"
//                         variant="outlined"
//                         size="small"
//                         sx={{
//                             borderRadius: 1,
//                             borderColor: 'divider'
//                         }}
//                     />
//                 )}
//             </Box>

//             {/* Table - Enhanced */}
//             {userPermissions?.Customer?.canRead && (
//                 <Card
//                     sx={{
//                         borderRadius: 3,
//                         boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
//                         border: '1px solid',
//                         borderColor: 'divider',
//                         overflow: 'hidden'
//                     }}
//                 >
//                     <TableContainer>
//                         <Table>
//                             <TableHead sx={{ bgcolor: 'background.default' }}>
//                                 <TableRow>
//                                     <TableCell padding="checkbox" sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
//                                         <Checkbox
//                                             indeterminate={selectedContacts.length > 0 && selectedContacts.length < filteredContacts.length}
//                                             checked={filteredContacts.length > 0 && selectedContacts.length === filteredContacts.length}
//                                             onChange={handleSelectAllClick}
//                                             sx={{ color: 'text.secondary' }}
//                                         />
//                                     </TableCell>
//                                     <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>Profile</TableCell>
//                                     <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>Company</TableCell>
//                                     <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>Customer ID</TableCell>
//                                     <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>Contact</TableCell>
//                                     <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>GST No</TableCell>
//                                     <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>Created</TableCell>
//                                     <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>Status</TableCell>
//                                     <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>Actions</TableCell>
//                                 </TableRow>
//                             </TableHead>
//                             <TableBody>
//                                 {filteredContacts.length === 0 ? (
//                                     <TableRow>
//                                         <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
//                                             <Box
//                                                 sx={{
//                                                     display: 'flex',
//                                                     flexDirection: 'column',
//                                                     alignItems: 'center',
//                                                     gap: 1
//                                                 }}
//                                             >
//                                                 <SearchIcon sx={{ fontSize: 48, color: 'text.disabled' }} />
//                                                 <Typography variant="h6" color="text.secondary">
//                                                     No customers found
//                                                 </Typography>
//                                                 {searchTerm && (
//                                                     <Button variant="text" color="primary" onClick={() => setSearchTerm('')} sx={{ mt: 1 }}>
//                                                         Clear search
//                                                     </Button>
//                                                 )}
//                                             </Box>
//                                         </TableCell>
//                                     </TableRow>
//                                 ) : (
//                                     filteredContacts.map((contact) => {
//                                         const isItemSelected = isSelected(contact._id);

//                                         return (
//                                             <TableRow
//                                                 key={contact._id}
//                                                 hover
//                                                 selected={isItemSelected}
//                                                 sx={{
//                                                     '&:last-child td': { borderBottom: 0 },
//                                                     '&:hover': {
//                                                         backgroundColor: 'action.hover'
//                                                     }
//                                                 }}
//                                             >
//                                                 <TableCell padding="checkbox">
//                                                     <Checkbox checked={isItemSelected} onChange={(event) => handleCheckboxClick(event, contact)} sx={{ color: 'text.secondary' }} />
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <Avatar
//                                                         src={typeof contact.customerProfile === 'string' ? contact.customerProfile : ''}
//                                                         alt={contact.Companyname}
//                                                         sx={{
//                                                             width: 40,
//                                                             height: 40,
//                                                             bgcolor: 'primary.light',
//                                                             color: 'primary.main'
//                                                         }}
//                                                     >
//                                                         {contact.Companyname?.charAt(0) || 'C'}
//                                                     </Avatar>
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <Typography fontWeight="medium">{contact.Companyname || 'N/A'}</Typography>
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <Chip
//                                                         label={contact.customerId || 'N/A'}
//                                                         size="small"
//                                                         variant="outlined"
//                                                         sx={{
//                                                             borderRadius: 1,
//                                                             borderColor: 'divider',
//                                                             bgcolor: 'background.default'
//                                                         }}
//                                                     />
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <Box>
//                                                         <Box display="flex" alignItems="center" gap={1}>
//                                                             <PhoneIcon color="action" fontSize="small" />
//                                                             <Typography variant="body2">{contact.phone || 'N/A'}</Typography>
//                                                         </Box>
//                                                         <Box display="flex" alignItems="center" gap={1}>
//                                                             <EmailIcon color="action" fontSize="small" />
//                                                             <Typography variant="body2" color="text.secondary">
//                                                                 {contact.email || 'N/A'}
//                                                             </Typography>
//                                                         </Box>
//                                                     </Box>
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <Typography variant="body2">{contact.GSTno || 'N/A'}</Typography>
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <Box display="flex" alignItems="center" gap={1}>
//                                                         <CalendarIcon color="action" fontSize="small" />
//                                                         <Typography variant="body2">{formatDate(contact.createdAt)}</Typography>
//                                                     </Box>
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <Chip
//                                                         label={contact.status === 1 ? 'Active' : 'Inactive'}
//                                                         size="small"
//                                                         color={contact.status === 1 ? 'success' : 'error'}
//                                                         icon={contact.status === 1 ? <ActiveIcon fontSize="small" /> : <InactiveIcon fontSize="small" />}
//                                                         sx={{
//                                                             borderRadius: 1,
//                                                             fontWeight: 'medium'
//                                                         }}
//                                                     />
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <Box display="flex" gap={1}>
//                                                         <Tooltip title="View">
//                                                             <IconButton
//                                                                 onClick={() => handleView(contact)}
//                                                                 size="small"
//                                                                 sx={{
//                                                                     color: 'text.secondary',
//                                                                     '&:hover': {
//                                                                         color: 'primary.main',
//                                                                         bgcolor: 'primary.light'
//                                                                     }
//                                                                 }}
//                                                             >
//                                                                 <VisibilityIcon fontSize="small" />
//                                                             </IconButton>
//                                                         </Tooltip>
//                                                         {userPermissions?.Customer?.canUpdate && (
//                                                             <Tooltip title="Edit">
//                                                                 <IconButton
//                                                                     onClick={() => handleEdit(contact)}
//                                                                     size="small"
//                                                                     sx={{
//                                                                         color: 'text.secondary',
//                                                                         '&:hover': {
//                                                                             color: 'success.main',
//                                                                             bgcolor: 'success.light'
//                                                                         }
//                                                                     }}
//                                                                 >
//                                                                     <EditIcon fontSize="small" />
//                                                                 </IconButton>
//                                                             </Tooltip>
//                                                         )}
//                                                         {userPermissions?.Customer?.canDelete && (
//                                                             <Tooltip title="Delete">
//                                                                 <IconButton
//                                                                     onClick={() => handleDelete(contact.customerId)}
//                                                                     size="small"
//                                                                     sx={{
//                                                                         color: 'text.secondary',
//                                                                         '&:hover': {
//                                                                             color: 'error.main',
//                                                                             bgcolor: 'error.light'
//                                                                         }
//                                                                     }}
//                                                                 >
//                                                                     <DeleteIcon fontSize="small" />
//                                                                 </IconButton>
//                                                             </Tooltip>
//                                                         )}
//                                                     </Box>
//                                                 </TableCell>
//                                             </TableRow>
//                                         );
//                                     })
//                                 )}
//                             </TableBody>
//                         </Table>
//                     </TableContainer>
//                 </Card>
//             )}

//             {/* Pagination would go here */}
//             {filteredContacts.length > 0 && (
//                 <Box
//                     sx={{
//                         mt: 3,
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center',
//                         p: 2,
//                         borderRadius: 2,
//                         bgcolor: 'background.default',
//                         border: '1px solid',
//                         borderColor: 'divider'
//                     }}
//                 >
//                     <Typography variant="body2" color="text.secondary">
//                         Showing {filteredContacts.length} of {contacts.length} customers
//                     </Typography>
//                     <Box display="flex" gap={1}>
//                         <Button variant="outlined" size="small" disabled>
//                             Previous
//                         </Button>
//                         <Button variant="contained" size="small">
//                             1
//                         </Button>
//                         <Button variant="outlined" size="small">
//                             2
//                         </Button>
//                         <Button variant="outlined" size="small">
//                             Next
//                         </Button>
//                     </Box>
//                 </Box>
//             )}
//         </Box>
//     );
// }
'use client';
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Link from 'next/link';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
// If using TypeScript, install types: npm install --save-dev @types/jspdf-autotable

// Add this declaration to let TypeScript know about autoTable
declare module 'jspdf' {
    interface jsPDF {
        autoTable: (...args: any[]) => jsPDF;
    }
}
// import { CiExport } from 'react-icons/ci';
import userContext from '../../../UseContext/UseContext';
import { API_BASE_URL } from '../../../utils';

// Material UI Components
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Checkbox,
    Switch,
    TextField,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Typography,
    Box,
    Card,
    CardContent,
    InputAdornment,
    Tooltip,
    Chip,
    Divider,
    CircularProgress,
    Badge,
    Pagination,
    Select,
    FormControl,
    InputLabel,
    Grid
} from '@mui/material';
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    FileUpload as FileUploadIcon,
    PictureAsPdf as PictureAsPdfIcon,
    GridOn as GridOnIcon,
    Search as SearchIcon,
    FilterList as FilterListIcon,
    DateRange as DateRangeIcon,
    MoreVert as MoreVertIcon,
    Refresh as RefreshIcon,
    Visibility as VisibilityIcon,
    People as PeopleIcon,
    CheckCircle as ActiveIcon,
    Cancel as InactiveIcon,
    Business as CompanyIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    CalendarToday as CalendarIcon,
    ArrowDropDown as ArrowDropDownIcon
} from '@mui/icons-material';
import { CustomerDELETe, CustomerPatch, CustomerSingleGET } from '../../../../../api/Customer';
import { MyButton } from '../../../Component/Buttons/Buttons';

// Types
interface Customer {
    _id: string;
    customerId: string;
    Companyname?: string;
    phone?: string;
    email?: string;
    GSTno?: string;
    status: number;
    createdAt: string;
    customerProfile?: string;
}

interface SummaryCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color: 'primary' | 'success' | 'error' | 'warning' | 'info';
}

interface ContactTableProps {
    slug?: string;
}

interface UserPermissions {
    Customer?: {
        canCreate?: boolean;
        canRead?: boolean;
        canUpdate?: boolean;
        canDelete?: boolean;
    };
}

// Custom styled components
const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, color }) => (
    <Card
        sx={{
            minWidth: 180,
            borderRadius: 3,
            boxShadow: 0,
            border: '1px solid',
            borderColor: 'divider',
            background: 'transparent',
            transition: 'all 0.3s ease',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 2
            }
        }}
    >
        <CardContent sx={{ p: 2 }}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box>
                    <Typography variant="h6" fontWeight="bold" color={`${color}.main`}>
                        {value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {title}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        bgcolor: `${color}.light`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {React.cloneElement(icon as React.ReactElement, {
                        fontSize: 'medium',
                        sx: { color: 'white' }
                    })}
                </Box>
            </Box>
        </CardContent>
    </Card>
);

const ContactTable: React.FC<ContactTableProps> = ({ slug }) => {
    // State
    const [contacts, setContacts] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [filteredContacts, setFilteredContacts] = useState<Customer[]>([]);
    const [selectedContacts, setSelectedContacts] = useState<Customer[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [dateFilter, setDateFilter] = useState<Date | null>(null);
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [userPermissions, setUserPermissions] = useState<UserPermissions>({});

    // Menu states
    const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(null);
    const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
    const [dateAnchorEl, setDateAnchorEl] = useState<null | HTMLElement>(null);

    const exportMenuOpen = Boolean(exportAnchorEl);
    const filterMenuOpen = Boolean(filterAnchorEl);
    const dateMenuOpen = Boolean(dateAnchorEl);

    const accessToken = Cookies.get('accessToken') || '';
    const subdomain = Cookies.get('subdomain') || '';
    const router = useRouter();
    const { data } = useContext(userContext);

    // Calculate pagination
    const totalPages = Math.ceil(filteredContacts?.length / rowsPerPage);
    const paginatedContacts = filteredContacts?.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    useEffect(() => {
        if (data?.permissions) {
            setUserPermissions(data.permissions);
        }
    }, [data?.permissions]);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            // const headers = { Authorization: `Bearer ${accessToken}` };
            // const response = await axios.get(`${API_BASE_URL}/customer/${subdomain}`, { headers });
            const response = await CustomerSingleGET(subdomain);
            setContacts(response.data.customers);
            setFilteredContacts(response.data.customers);
        } catch (error) {
            setError('Error fetching contacts');
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, [accessToken, subdomain]);

    // Apply filters
    useEffect(() => {
        let result = contacts;

        // Apply search filter
        if (searchTerm) {
            result = result.filter(
                (contact) =>
                    contact.Companyname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    contact.customerId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    contact.phone?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply status filter
        if (statusFilter !== 'all') {
            const statusValue = statusFilter === 'active' ? 1 : 0;
            result = result.filter((contact) => contact.status === statusValue);
        }

        setFilteredContacts(result);
        setPage(1); // Reset to first page when filters change
    }, [contacts, searchTerm, statusFilter, dateFilter]);

    const handleEdit = (contact: Customer) => {
        router.push(`customers/cutombersedit/${contact.customerId}`);
    };

    const handleView = (contact: Customer) => {
        router.push(`customers/view/${contact.customerId}`);
    };

    const handleDelete = async (contactId: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                // const headers = { Authorization: `Bearer ${accessToken}` };
                // await axios.delete(`${API_BASE_URL}/customer/${subdomain}/${contactId}`, { headers });
                const response = await CustomerDELETe(subdomain, contactId);

                setContacts(contacts.filter((contact) => contact._id !== contactId));
                setFilteredContacts(filteredContacts.filter((contact) => contact._id !== contactId));

                Swal.fire('Deleted!', 'The contact has been deleted.', 'success');
            } catch (error) {
                console.error('Error deleting contact:', error);
                Swal.fire('Error!', 'There was an error deleting the contact.', 'error');
            }
        }
    };

    const handleBulkDelete = () => {
        if (selectedContacts.length === 0) {
            Swal.fire('No selection', 'Please select contacts to delete', 'info');
            return;
        }

        Swal.fire({
            title: `Delete ${selectedContacts.length} contacts?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete them!'
        }).then((result) => {
            if (result.isConfirmed) {
                const deletePromises = selectedContacts.map((contact) =>
                    axios.delete(`${API_BASE_URL}/customer/${subdomain}/${contact.customerId}`, {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    })
                );

                Promise.all(deletePromises)
                    .then(() => {
                        const remainingContacts = contacts.filter((contact) => !selectedContacts.some((selected) => selected._id === contact._id));

                        setContacts(remainingContacts);
                        setFilteredContacts(remainingContacts);
                        setSelectedContacts([]);

                        Swal.fire('Deleted!', 'The selected contacts have been deleted.', 'success');
                    })
                    .catch((error) => {
                        console.error('Error deleting contacts:', error);
                        Swal.fire('Error!', 'There was an error deleting the contacts.', 'error');
                    });
            }
        });
    };

    const handleExportExcel = () => {
        const modifiedContacts = filteredContacts.map((contact) => ({
            'Company Name': contact.Companyname || 'N/A',
            'Customer ID': contact.customerId || 'N/A',
            Phone: contact.phone || 'N/A',
            Email: contact.email || 'N/A',
            'GST No': contact.GSTno || 'N/A',
            Status: contact.status === 1 ? 'Active' : 'Inactive',
            'Created At': formatDate(contact.createdAt)
        }));

        const worksheet = XLSX.utils.json_to_sheet(modifiedContacts);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');
        XLSX.writeFile(workbook, 'contacts.xlsx');
        setExportAnchorEl(null);
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.setTextColor(40, 53, 147);
        doc.text('Customer Contacts Report', 14, 22);

        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

        doc.autoTable({
            startY: 40,
            head: [['Company', 'Customer ID', 'Phone', 'Email', 'GST No', 'Status', 'Created At']],
            body: filteredContacts.map((contact) => [
                contact.Companyname || 'N/A',
                contact.customerId || 'N/A',
                contact.phone || 'N/A',
                contact.email || 'N/A',
                contact.GSTno || 'N/A',
                contact.status === 1 ? 'Active' : 'Inactive',
                formatDate(contact.createdAt)
            ]),
            styles: {
                fontSize: 9,
                cellPadding: 3,
                overflow: 'linebreak'
            },
            headStyles: {
                fillColor: [40, 53, 147],
                textColor: 255,
                fontStyle: 'bold'
            },
            alternateRowStyles: {
                fillColor: [240, 240, 240]
            },
            margin: { top: 10 }
        });

        doc.save('contacts.pdf');
        setExportAnchorEl(null);
    };

    const handleStatusChange = async (contactId: string, status: number) => {
        try {
            // const headers = { Authorization: `Bearer ${accessToken}` };
            // await axios.patch(`${API_BASE_URL}/customer/${contactId}`, { status }, { headers });
            const response = await CustomerPatch(subdomain, contactId, { status });
            if (response.scuccess) {
                setContacts((prevContacts) => prevContacts.map((contact) => (contact._id === contactId ? { ...contact, status } : contact)));
            } else {
                Swal.fire('Error!', response.data, 'error');
            }
            console.log(response, 'response>>>>>>>>>');
        } catch (error) {
            console.error('Error updating status:', error);
            Swal.fire('Error!', 'Failed to update contact status', 'error');
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedContacts(paginatedContacts);
            return;
        }
        setSelectedContacts([]);
    };

    const handleCheckboxClick = (event: any, contact: Customer) => {
        const selectedIndex = selectedContacts.findIndex((c) => c._id === contact._id);
        let newSelected: Customer[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedContacts, contact);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedContacts.slice(1));
        } else if (selectedIndex === selectedContacts.length - 1) {
            newSelected = newSelected.concat(selectedContacts.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selectedContacts.slice(0, selectedIndex), selectedContacts.slice(selectedIndex + 1));
        }

        setSelectedContacts(newSelected);
    };

    const isSelected = (id: string) => selectedContacts.some((contact) => contact._id === id);

    // Calculate customer summary
    const totalCustomers = filteredContacts?.length;
    const activeCustomers = filteredContacts?.filter((contact) => contact.status === 1).length;
    const inactiveCustomers = filteredContacts?.filter((contact) => contact.status === 0).length;
    const newThisMonth = filteredContacts?.filter((contact) => {
        const contactDate = new Date(contact.createdAt);
        const now = new Date();
        return contactDate.getMonth() === now.getMonth() && contactDate.getFullYear() === now.getFullYear();
    }).length;

    if (loading && contacts.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <Typography color="error" variant="h6">
                    {error}
                </Typography>
                <MyButton variant="outlined" color="primary" startIcon={<RefreshIcon />} onClick={fetchContacts} >
                    Retry
                </MyButton>
            </Box>
        );
    }

    return (
        <Box>
            {/* Summary Cards - Enhanced with animation */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                {/* <Grid item size={{ xs: 12, sm: 6, md: 3 }} > */}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="Total Customers" value={totalCustomers} icon={<PeopleIcon />} color="primary" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="Active Customers" value={activeCustomers} icon={<ActiveIcon />} color="success" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="Inactive Customers" value={inactiveCustomers} icon={<InactiveIcon />} color="error" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="New This Month" value={newThisMonth} icon={<CalendarIcon />} color="warning" />
                </Grid>
            </Grid>

            {/* Toolbar - Enhanced with better responsive behavior */}
            {/* <Card
                sx={{
                    mb: 3,
                    p: 2,
                    borderRadius: 3,
                    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                    border: '1px solid',
                    borderColor: 'divider',
                    background: 'linear-gradient(to right, #f9f9f9, #ffffff)'
                }}
            >
                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" gap={2}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: 'center',
                            gap: 2,
                            width: { xs: '100%', sm: 'auto' }
                        }}
                    >
                        <TextField
                            variant="outlined"
                            size="small"
                            placeholder="Search customers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: 3,
                                    bgcolor: 'background.paper',
                                    width: { xs: '100%', sm: 280 }
                                }
                            }}
                        />

                        <Box display="flex" gap={1}>
                            <Tooltip title="Filter">
                                <MyButton
                                    variant={statusFilter !== 'all' ? 'contained' : 'outlined'}
                                    color={statusFilter !== 'all' ? 'primary' : 'inherit'}
                                    startIcon={<FilterListIcon />}
                                    onClick={(e) => setFilterAnchorEl(e.currentTarget)}
                                    // sx={{
                                    //     borderRadius: 3,
                                    //     textTransform: 'none',
                                    //     borderColor: 'divider'
                                    // }}
                                >
                                    Filter
                                </MyButton>
                            </Tooltip>

                            <Menu
                                anchorEl={filterAnchorEl}
                                open={filterMenuOpen}
                                onClose={() => setFilterAnchorEl(null)}
                                PaperProps={{
                                    sx: {
                                        mt: 1,
                                        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                                        borderRadius: 2
                                    }
                                }}
                            >
                                <MenuItem
                                    selected={statusFilter === 'all'}
                                    onClick={() => {
                                        setStatusFilter('all');
                                        setFilterAnchorEl(null);
                                    }}
                                    sx={{
                                        '&.Mui-selected': {
                                            bgcolor: 'primary.light',
                                            '&:hover': { bgcolor: 'primary.light' }
                                        }
                                    }}
                                >
                                    All Statuses
                                </MenuItem>
                                <MenuItem
                                    selected={statusFilter === 'active'}
                                    onClick={() => {
                                        setStatusFilter('active');
                                        setFilterAnchorEl(null);
                                    }}
                                    sx={{
                                        '&.Mui-selected': {
                                            bgcolor: 'success.light',
                                            '&:hover': { bgcolor: 'success.light' }
                                        }
                                    }}
                                >
                                    Active Only
                                </MenuItem>
                                <MenuItem
                                    selected={statusFilter === 'inactive'}
                                    onClick={() => {
                                        setStatusFilter('inactive');
                                        setFilterAnchorEl(null);
                                    }}
                                    sx={{
                                        '&.Mui-selected': {
                                            bgcolor: 'error.light',
                                            '&:hover': { bgcolor: 'error.light' }
                                        }
                                    }}
                                >
                                    Inactive Only
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>

                    <Box display="flex" flexWrap="wrap" gap={1}>
                        {userPermissions?.Customer?.canCreate && (
                            <Link href={`/${subdomain}/customers/newcustomber`} passHref>
                                <MyButton
                                    variant="contained"
                                    color="primary"
                                    startIcon={<AddIcon />}
                                    // sx={{
                                    //     borderRadius: 3,
                                    //     textTransform: 'none',
                                    //     boxShadow: 'none',
                                    //     '&:hover': {
                                    //         boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
                                    //     }
                                    // }}
                                >
                                    New Customer
                                </MyButton>
                            </Link>
                        )}

                        {userPermissions?.Customer?.canDelete && (
                            <MyButton
                                variant="outlined"
                                color="error"
                                startIcon={<DeleteIcon />}
                                onClick={handleBulkDelete}
                                disabled={selectedContacts.length === 0}
                                // sx={{
                                //     borderRadius: 3,
                                //     textTransform: 'none',
                                //     borderColor: selectedContacts.length > 0 ? 'error.main' : 'divider',
                                //     '&:hover': {
                                //         borderColor: 'error.main',
                                //         bgcolor: 'error.light'
                                //     }
                                // }}
                            >
                                Delete ({selectedContacts.length})
                            </MyButton>
                        )}

                        <MyButton
                            variant="outlined"
                            color="inherit"
                            startIcon={<CiExport style={{ fontSize: '1.2rem' }} />}
                            onClick={(e) => setExportAnchorEl(e.currentTarget)}
                            // sx={{
                            //     borderRadius: 3,
                            //     textTransform: 'none',
                            //     borderColor: 'divider',
                            //     '&:hover': {
                            //         borderColor: 'primary.main',
                            //         bgcolor: 'primary.light'
                            //     }
                            // }}
                        >
                            Export
                        </MyButton>

                        <Menu
                            anchorEl={exportAnchorEl}
                            open={exportMenuOpen}
                            onClose={() => setExportAnchorEl(null)}
                            PaperProps={{
                                sx: {
                                    mt: 1,
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                                    borderRadius: 2
                                }
                            }}
                        >
                            <MenuItem
                                onClick={handleExportExcel}
                                sx={{
                                    '&:hover': { bgcolor: 'success.light' }
                                }}
                            >
                                <GridOnIcon sx={{ mr: 1, color: 'success.main' }} />
                                <Typography>Export as Excel</Typography>
                            </MenuItem>
                            <MenuItem
                                onClick={handleExportPDF}
                                sx={{
                                    '&:hover': { bgcolor: 'error.light' }
                                }}
                            >
                                <PictureAsPdfIcon sx={{ mr: 1, color: 'error.main' }} />
                                <Typography>Export as PDF</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </Card> */}

            {/* Status Filter Chips - Enhanced with better visual feedback */}
            <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                    label="All"
                    onClick={() => setStatusFilter('all')}
                    color={statusFilter === 'all' ? 'primary' : 'default'}
                    variant={statusFilter === 'all' ? 'filled' : 'outlined'}
                    size="small"
                    sx={{
                        borderRadius: 1,
                        borderColor: 'divider',
                        transition: 'all 0.2s ease',
                        '&:hover': { transform: 'scale(1.05)' }
                    }}
                />
                <Chip
                    label="Active"
                    onClick={() => setStatusFilter('active')}
                    color={statusFilter === 'active' ? 'success' : 'default'}
                    variant={statusFilter === 'active' ? 'filled' : 'outlined'}
                    size="small"
                    icon={<ActiveIcon fontSize="small" />}
                    sx={{
                        borderRadius: 1,
                        borderColor: 'divider',
                        transition: 'all 0.2s ease',
                        '&:hover': { transform: 'scale(1.05)' }
                    }}
                />
                <Chip
                    label="Inactive"
                    onClick={() => setStatusFilter('inactive')}
                    color={statusFilter === 'inactive' ? 'error' : 'default'}
                    variant={statusFilter === 'inactive' ? 'filled' : 'outlined'}
                    size="small"
                    icon={<InactiveIcon fontSize="small" />}
                    sx={{
                        borderRadius: 1,
                        borderColor: 'divider',
                        transition: 'all 0.2s ease',
                        '&:hover': { transform: 'scale(1.05)' }
                    }}
                />
                {searchTerm && (
                    <Chip
                        label={`Search: "${searchTerm}"`}
                        onDelete={() => setSearchTerm('')}
                        color="info"
                        variant="outlined"
                        size="small"
                        sx={{
                            borderRadius: 1,
                            borderColor: 'divider',
                            transition: 'all 0.2s ease',
                            '&:hover': { transform: 'scale(1.05)' }
                        }}
                    />
                )}
            </Box>

            {/* Table - Enhanced with better hover effects and visual hierarchy */}
            {userPermissions?.Customer?.canRead && (
                <Card
                    sx={{
                        borderRadius: 3,
                        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                        border: '1px solid',
                        borderColor: 'divider',
                        overflow: 'hidden',
                        background: 'linear-gradient(to bottom, #f9f9f9, #ffffff)'
                    }}
                >
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ bgcolor: 'background.paper' }}>
                                <TableRow>
                                    <TableCell padding="checkbox" sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                                        <Checkbox
                                            indeterminate={selectedContacts?.length > 0 && selectedContacts?.length < paginatedContacts?.length}
                                            checked={paginatedContacts?.length > 0 && selectedContacts?.length === paginatedContacts?.length}
                                            onChange={handleSelectAllClick}
                                            sx={{ color: 'text.secondary' }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>Profile</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>Company</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>Customer ID</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>Contact</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>GST No</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>Created</TableCell>
                                    {/* <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>Status</TableCell> */}
                                    {/* <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>Actions</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedContacts?.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={9} align="center" sx={{ py: 6 }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    gap: 1
                                                }}
                                            >
                                                <SearchIcon sx={{ fontSize: 48, color: 'text.disabled', opacity: 0.5 }} />
                                                <Typography variant="h6" color="text.secondary">
                                                    No customers found
                                                </Typography>
                                                {searchTerm && (
                                                    <MyButton variant="text" color="primary" onClick={() => setSearchTerm('')} >
                                                        Clear search
                                                    </MyButton>
                                                )}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginatedContacts?.map((contact) => {
                                        const isItemSelected = isSelected(contact._id);

                                        return (
                                            <TableRow
                                                key={contact._id}
                                                hover
                                                selected={isItemSelected}
                                                sx={{
                                                    '&:last-child td': { borderBottom: 0 },
                                                    '&:hover': {
                                                        backgroundColor: 'action.hover',
                                                        transform: 'scale(1.002)',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                                    },
                                                    transition: 'all 0.2s ease'
                                                }}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox checked={isItemSelected} onChange={(event) => handleCheckboxClick(event, contact)} sx={{ color: 'text.secondary' }} />
                                                </TableCell>
                                                <TableCell>
                                                    <Avatar
                                                        src={typeof contact.customerProfile === 'string' ? contact.customerProfile : ''}
                                                        alt={contact.Companyname}
                                                        sx={{
                                                            width: 40,
                                                            height: 40,
                                                            bgcolor: 'primary.light',
                                                            color: 'primary.main',
                                                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                        }}
                                                    >
                                                        {contact.Companyname?.charAt(0) || 'C'}
                                                    </Avatar>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography fontWeight="medium">{contact.Companyname || 'N/A'}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        label={contact.customerId || 'N/A'}
                                                        size="small"
                                                        variant="outlined"
                                                        sx={{
                                                            borderRadius: 1,
                                                            borderColor: 'divider',
                                                            bgcolor: 'background.default'
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Box>
                                                        <Box display="flex" alignItems="center" gap={1}>
                                                            <PhoneIcon color="action" fontSize="small" />
                                                            <Typography variant="body2">{contact.phone || 'N/A'}</Typography>
                                                        </Box>
                                                        <Box display="flex" alignItems="center" gap={1}>
                                                            <EmailIcon color="action" fontSize="small" />
                                                            <Typography variant="body2" color="text.secondary">
                                                                {contact.email || 'N/A'}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2">{contact.GSTno || 'N/A'}</Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Box display="flex" alignItems="center" gap={1}>
                                                        <CalendarIcon color="action" fontSize="small" />
                                                        <Typography variant="body2">{formatDate(contact.createdAt)}</Typography>
                                                    </Box>
                                                </TableCell>
                                                {/* <TableCell>
                                                    <Tooltip title={contact.status === 1 ? 'Active' : 'Inactive'}>
                                                        <Switch checked={contact.status === 1} onChange={() => handleStatusChange(contact._id, contact.status === 1 ? 0 : 1)} color="success" size="small" />
                                                    </Tooltip>
                                                </TableCell> */}
                                                {/* <TableCell>
                                                    <Box display="flex" gap={1}>
                                                        <Tooltip title="View">
                                                            <IconButton
                                                                onClick={() => handleView(contact)}
                                                                size="small"
                                                                sx={{
                                                                    color: 'text.secondary',
                                                                    '&:hover': {
                                                                        color: 'primary.main',
                                                                        bgcolor: 'primary.light'
                                                                    }
                                                                }}
                                                            >
                                                                <VisibilityIcon fontSize="small" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        {userPermissions?.Customer?.canUpdate && (
                                                            <Tooltip title="Edit">
                                                                <IconButton
                                                                    onClick={() => handleEdit(contact)}
                                                                    size="small"
                                                                    sx={{
                                                                        color: 'text.secondary',
                                                                        '&:hover': {
                                                                            color: 'success.main',
                                                                            bgcolor: 'success.light'
                                                                        }
                                                                    }}
                                                                >
                                                                    <EditIcon fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        )}
                                                        {userPermissions?.Customer?.canDelete && (
                                                            <Tooltip title="Delete">
                                                                <IconButton
                                                                    onClick={() => handleDelete(contact.customerId)}
                                                                    size="small"
                                                                    sx={{
                                                                        color: 'text.secondary',
                                                                        '&:hover': {
                                                                            color: 'error.main',
                                                                            bgcolor: 'error.light'
                                                                        }
                                                                    }}
                                                                >
                                                                    <DeleteIcon fontSize="small" />
                                                                </IconButton>
                                                            </Tooltip>
                                                        )}
                                                    </Box>
                                                </TableCell> */}
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            )}

            {/* Enhanced Pagination */}
            {filteredContacts?.length > 0 && (
                <Box
                    sx={{
                        mt: 3,
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                        borderRadius: 2,
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        gap: 2
                    }}
                >
                    <Box display="flex" alignItems="center" gap={1}>
                        <Typography variant="body2" color="text.secondary">
                            Rows per page:
                        </Typography>
                        <Select
                            value={rowsPerPage}
                            onChange={(e) => {
                                setRowsPerPage(Number(e.target.value));
                                setPage(1);
                            }}
                            size="small"
                            sx={{
                                borderRadius: 1,
                                '& .MuiSelect-select': { py: 0.5, px: 1 }
                            }}
                            IconComponent={ArrowDropDownIcon}
                        >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                        Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, filteredContacts.length)} of {filteredContacts.length} customers
                    </Typography>

                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(_, value) => setPage(value)}
                        color="primary"
                        shape="rounded"
                        size="small"
                        showFirstButton
                        showLastButton
                        siblingCount={1}
                        boundaryCount={1}
                        sx={{
                            '& .MuiPaginationItem-root': {
                                borderRadius: 1,
                                minWidth: 32,
                                height: 32
                            }
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default ContactTable;
