'use client';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Link from 'next/link';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn, staggerContainer, slideIn, zoomIn } from '../../../utils/motion';

// Add this declaration to let TypeScript know about autoTable
// declare module 'jspdf' {
//     interface jsPDF {
//         autoTable: (...args: any[]) => jsPDF;
//     }
// }

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
import { MyButton } from '../../../ui-components/Buttons/Buttons';

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
    color: string;
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

const SummaryCard: React.FC<SummaryCardProps> = ({ title, value, icon, color }) => {
    return (
        <motion.div initial="hidden" animate="show" variants={fadeIn('up', 'spring', 0.2, 0.75)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Card
                sx={{
                    minWidth: 220,
                    backgroundColor: 'background.paper',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        boxShadow: `0 4px 5px ${color}`,
                        background: `${color}24`
                    },
                    borderBottom: `5px solid ${color}`
                }}
            >
                <Box sx={{ padding: '16px' }}>
                    <Box display="flex" alignItems="left">
                        <motion.div whileHover={{ rotate: 10 }}>
                            <Box
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '50%',
                                    bgcolor: color,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    // boxShadow: `0 4px 10px ${color}`,
                                    border: `1px solid ${color}`
                                }}
                            >
                                {React.cloneElement(icon as React.ReactElement, {
                                    sx: { color: `white`, fontSize: 28 }
                                })}
                            </Box>
                        </motion.div>

                        <Box sx={{ ml: 2 }}>
                            <Typography variant="subtitle2" sx={{ fontSize: '16px', color: '#878a99' }}>
                                {title}
                            </Typography>
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Typography variant="h5" fontWeight={700}>
                                    {value}
                                </Typography>
                            </motion.div>
                        </Box>
                    </Box>
                </Box>
            </Card>
        </motion.div>
    );
};

const ContactTable: React.FC<ContactTableProps> = ({ slug }) => {
    // State
    const [contacts, setContacts] = useState<Customer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [filteredContacts, setFilteredContacts] = useState<Customer[]>([]);
    const [selectedContacts, setSelectedContacts] = useState<Customer[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [page, setPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [userPermissions, setUserPermissions] = useState<UserPermissions>({});

    // Menu states
    const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(null);
    const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);

    const exportMenuOpen = Boolean(exportAnchorEl);
    const filterMenuOpen = Boolean(filterAnchorEl);

    const accessToken = Cookies.get('crmaccess') || '';
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

    const fetchContacts = useCallback(async () => {
        setLoading(true);
        try {
            const response = await CustomerSingleGET(subdomain);
            setContacts(response.data.customers);
            setFilteredContacts(response.data.customers);
        } catch (error) {
            setError('Error fetching contacts');
            console.error('Error fetching contacts:', error);
        } finally {
            setLoading(false);
        }
    }, [subdomain]);

    useEffect(() => {
        fetchContacts();
    }, [accessToken, subdomain, fetchContacts]);

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
    }, [contacts, searchTerm, statusFilter]);

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
            'Company Name': contact.Companyname || '-',
            'Customer ID': contact.customerId || '-',
            Phone: contact.phone || '-',
            Email: contact.email || '-',
            'GST No': contact.GSTno || '-',
            Status: contact.status === 1 ? 'Active' : 'Inactive',
            'Created At': formatDate(contact.createdAt)
        }));

        const worksheet = XLSX.utils.json_to_sheet(modifiedContacts);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');
        XLSX.writeFile(workbook, 'contacts.xlsx');
        setExportAnchorEl(null);
    };

    const handleStatusChange = async (contactId: string, status: number) => {
        try {
            const response = await CustomerPatch(subdomain, contactId, { status });
            if (response.scuccess) {
                setContacts((prevContacts) => prevContacts.map((contact) => (contact._id === contactId ? { ...contact, status } : contact)));
            } else {
                Swal.fire('Error!', response.data, 'error');
            }
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
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}>
                    <CircularProgress size={60} />
                </motion.div>
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px" flexDirection="column">
                <motion.div variants={fadeIn('up', 'spring', 0.2, 0.75)} initial="hidden" animate="show">
                    <Typography color="error" variant="h6" gutterBottom>
                        {error}
                    </Typography>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <MyButton variant="outlined" color="primary" startIcon={<RefreshIcon />} onClick={fetchContacts}>
                        Retry
                    </MyButton>
                </motion.div>
            </Box>
        );
    }

    return (
        <motion.div variants={staggerContainer()} initial="hidden" animate="show" viewport={{ once: false, amount: 0.25 }}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="Total Customers" value={totalCustomers} icon={<PeopleIcon />} color="#0367CA" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="Active Customers" value={activeCustomers} icon={<ActiveIcon />} color="#00A65A" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="Inactive Customers" value={inactiveCustomers} icon={<InactiveIcon />} color="#DD4B39" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="New This Month" value={newThisMonth} icon={<CalendarIcon />} color="#605CA8" />
                </Grid>
            </Grid>
            <motion.div variants={fadeIn('up', 'spring', 0.4, 0.75)}>
                <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Chip
                            label="All"
                            onClick={() => setStatusFilter('all')}
                            color={statusFilter === 'all' ? 'primary' : 'default'}
                            variant={statusFilter === 'all' ? 'filled' : 'outlined'}
                            size="small"
                            sx={{
                                borderRadius: 1,
                                borderColor: 'divider',
                                transition: 'all 0.2s ease'
                            }}
                        />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }}>
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
                                transition: 'all 0.2s ease'
                            }}
                        />
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }}>
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
                                transition: 'all 0.2s ease'
                            }}
                        />
                    </motion.div>
                    {searchTerm && (
                        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                            <Chip
                                label={`Search: "${searchTerm}"`}
                                onDelete={() => setSearchTerm('')}
                                color="info"
                                variant="outlined"
                                size="small"
                                sx={{
                                    borderRadius: 1,
                                    borderColor: 'divider',
                                    transition: 'all 0.2s ease'
                                }}
                            />
                        </motion.div>
                    )}
                </Box>
            </motion.div>
            <motion.div variants={fadeIn('up', 'spring', 0.5, 0.75)}>
                <Card
                    sx={{
                        borderColor: 'divider',
                        overflow: 'hidden'
                    }}
                >
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ bgcolor: 'background.paper', overflow: 'hidden' }}>
                                <TableRow>
                                    <TableCell padding="checkbox" sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                                        <Checkbox
                                            indeterminate={selectedContacts?.length > 0 && selectedContacts?.length < paginatedContacts?.length}
                                            checked={paginatedContacts?.length > 0 && selectedContacts?.length === paginatedContacts?.length}
                                            onChange={handleSelectAllClick}
                                            sx={{ color: 'text.secondary' }}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>Profile</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>Company</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>Customer ID</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>Contact</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>GST No</TableCell>
                                    <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', fontWeight: 'bold' }}>Created</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {paginatedContacts?.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center" sx={{ py: 6 }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                                                <motion.div animate={{ y: [-5, 5, -5] }} transition={{ duration: 2, repeat: Infinity }}>
                                                    <SearchIcon sx={{ fontSize: 48, color: 'text.disabled', opacity: 0.5 }} />
                                                </motion.div>
                                                <Typography variant="h6" color="text.secondary">
                                                    No customers found
                                                </Typography>
                                                {searchTerm && (
                                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                                        <MyButton variant="text" color="primary" onClick={() => setSearchTerm('')}>
                                                            Clear search
                                                        </MyButton>
                                                    </motion.div>
                                                )}
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    <AnimatePresence>
                                        {paginatedContacts?.map((contact, index) => {
                                            const isItemSelected = isSelected(contact._id);
                                            return (
                                                <motion.tr key={contact._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}>
                                                    <TableCell padding="checkbox">
                                                        <Checkbox size="small" checked={isItemSelected} onChange={(event) => handleCheckboxClick(event, contact)} sx={{ color: 'text.secondary' }} />
                                                    </TableCell>
                                                    <TableCell>
                                                        <motion.div whileHover={{ scale: 1.1 }}>
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
                                                        </motion.div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography fontWeight="medium">{contact.Companyname || 'N/A'}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <motion.div whileHover={{ scale: 1.05 }}>
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
                                                        </motion.div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box>
                                                            <Box display="flex" alignItems="center" gap={1}>
                                                                <PhoneIcon color="action" fontSize="small" />
                                                                <Typography variant="body2">{contact.phone || '-'}</Typography>
                                                            </Box>
                                                            <Box display="flex" alignItems="center" gap={1}>
                                                                <EmailIcon color="action" fontSize="small" />
                                                                <Typography variant="body2" color="text.secondary">
                                                                    {contact.email || '-'}
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2">{contact.GSTno || '-'}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box display="flex" alignItems="center" gap={1}>
                                                            <CalendarIcon color="action" fontSize="small" />
                                                            <Typography variant="body2">{formatDate(contact.createdAt)}</Typography>
                                                        </Box>
                                                    </TableCell>
                                                </motion.tr>
                                            );
                                        })}
                                    </AnimatePresence>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Card>
            </motion.div>
            {/* )} */}

            {/* Pagination */}
            {filteredContacts?.length > 0 && (
                <motion.div variants={fadeIn('up', 'spring', 0.6, 0.75)}>
                    <Box
                        sx={{
                            mt: 3,
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 2,
                            // borderRadius: 2,
                            bgcolor: 'background.paper',
                            // border: '1px solid',
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
                            // shape="rounded"
                            size="small"
                            showFirstButton
                            showLastButton
                            siblingCount={1}
                            boundaryCount={1}
                            sx={{
                                '& .MuiPaginationItem-root': {
                                    // borderRadius: 1,
                                    minWidth: 32,
                                    height: 32
                                }
                            }}
                        />
                    </Box>
                </motion.div>
            )}
        </motion.div>
    );
};

export default ContactTable;
