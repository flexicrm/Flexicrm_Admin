'use client';
import React, { useState, useEffect } from 'react';
import {
    Box, Grid, Card, Typography, Avatar, Checkbox, Select, MenuItem,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions,
    Pagination
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer } from '../../../utils/motion';
import {
    People as PeopleIcon, CalendarToday as CalendarIcon, CheckCircle as ActiveIcon,
    Cancel as InactiveIcon, Edit as EditIcon, Delete as DeleteIcon, Close as CloseIcon
} from '@mui/icons-material';
import Cookies from 'js-cookie';
import axios from 'axios';
import { API_BASE_URL } from '../../../utils';
import { SummaryCard } from '../../../ui-components/user/SummaryCart';
import { MyButton } from "../../../ui-components/Buttons/Buttons";
import AddUserForm from './addUserForm';
import { MySnackbar } from '../../../ui-components/Snackbar/Snackbar';

const ContactTable = () => {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [selectedContacts, setSelectedContacts] = useState([]);
    const [statusFilter, setStatusFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState('');
    const [subdomain, setSubdomain] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const totalPages = Math.ceil(filteredContacts.length / rowsPerPage);
    const paginatedContacts = filteredContacts.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    useEffect(() => {
        const sub = Cookies.get('subdomain');
        const token = Cookies.get('crmaccess');
        if (sub && token) {
            setSubdomain(sub);
            setAccessToken(token);
        }
    }, []);

    useEffect(() => {
        if (subdomain && accessToken) fetchCustomers(subdomain, accessToken);
    }, [subdomain, accessToken]);

    const fetchCustomers = async (sub, token) => {
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const res = await axios.get(`${API_BASE_URL}/user/${sub}`, { headers });
            setContacts(res.data?.data?.users || []);
            setFilteredContacts(res.data?.data?.users || []);
        } catch (err) {
            console.error('Error fetching customers:', err);
        }
    };

    useEffect(() => {
        let result = contacts;

        if (statusFilter !== 'all') {
            const statusValue = statusFilter === 'active' ? 1 : 0;
            result = result.filter(c => c.status === statusValue);
        }

        if (search.trim() !== '') {
            const lower = search.toLowerCase();
            result = result.filter(c =>
                c.firstname?.toLowerCase().includes(lower) ||
                c.lastname?.toLowerCase().includes(lower) ||
                c.email?.toLowerCase().includes(lower) ||
                c.mobile?.toLowerCase().includes(lower)
            );
        }

        setFilteredContacts(result);
        setPage(1);
    }, [contacts, statusFilter, search]);

    const handleSelectAllClick = (event) => {
        if (event.target.checked) setSelectedContacts(paginatedContacts);
        else setSelectedContacts([]);
    };

    const handleCheckboxClick = (event, contact) => {
        const selectedIndex = selectedContacts.findIndex(c => c._id === contact._id);
        const newSelected = [...selectedContacts];
        if (selectedIndex === -1) newSelected.push(contact);
        else newSelected.splice(selectedIndex, 1);
        setSelectedContacts(newSelected);
    };

    const isSelected = (id) => selectedContacts.some(c => c._id === id);
    const formatDate = (date) => new Date(date).toLocaleDateString('en-US');
    const handleEdit = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            await axios.delete(`${API_BASE_URL}/user/${subdomain}?userIds=${id}`, { headers });
            setSnackbar({ open: true, message: 'User deleted successfully!', severity: 'success' });
            fetchCustomers(subdomain, accessToken);
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to delete user.', severity: 'error' });
        }
    };

    const handleBulkDelete = async () => {
        if (selectedContacts.length === 0) return;
        if (!window.confirm(`Delete ${selectedContacts.length} user(s)?`)) return;

        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            await Promise.all(
                selectedContacts.map(u => axios.delete(`${API_BASE_URL}/user/${subdomain}/${u._id}`, { headers }))
            );
            setSnackbar({ open: true, message: 'Users deleted successfully!', severity: 'success' });
            setSelectedContacts([]);
            fetchCustomers(subdomain, accessToken);
        } catch (err) {
            setSnackbar({ open: true, message: 'Failed to delete some users.', severity: 'error' });
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingUser(null);
    };

    const handleUserSaved = () => {
        fetchCustomers(subdomain, accessToken);
        handleCloseForm();
    };

    const totalCustomers = filteredContacts.length;
    const activeCustomers = filteredContacts.filter(c => c.status === 1).length;
    const inactiveCustomers = filteredContacts.filter(c => c.status === 0).length;
    const newThisMonth = filteredContacts.filter(c => {
        const d = new Date(c.createdAt);
        const now = new Date();
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    return (
        <Box sx={{ px: 2, py: 2 }}>
            <motion.div variants={staggerContainer()} initial="hidden" animate="show">
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    {!showForm && (
                        <>
                            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} size="small" sx={{ width: 150 }}>
                                <MenuItem value="all">All Users</MenuItem>
                                <MenuItem value="active">Active</MenuItem>
                                <MenuItem value="inactive">Inactive</MenuItem>
                            </Select>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <TextField
                                    size="small"
                                    placeholder="Search by name, email or phone"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    sx={{ width: 300 }}
                                />
                                {selectedContacts?.length > 0 && (
                                    <MyButton color="error" onClick={handleBulkDelete}>
                                        Delete Selected ({selectedContacts.length})
                                    </MyButton>
                                )}
                                <MyButton onClick={() => setShowForm(true)}>Add New User</MyButton>
                            </Box>
                        </>
                    )}

                    {showForm && (
                        <MyButton onClick={handleCloseForm} startIcon={<CloseIcon />}>Close</MyButton>
                    )}
                </Box>

                <AnimatePresence mode="wait">
                    {showForm ? (
                        <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                            <Card sx={{ mt: 4, p: { xs: 2, sm: 3, md: 4 }, maxWidth: 1100, mx: 'auto', boxShadow: 'none' }}>
                                <AddUserForm
                                    user={editingUser}
                                    onUserSaved={handleUserSaved}
                                    onClose={handleCloseForm}
                                />
                            </Card>
                        </motion.div>
                    ) : (
                        <motion.div key="table" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>
                            <Grid container spacing={2} mt={2} sx={{ display: "flex", justifyContent: "space-between" }}>
                                <Grid item xs={12} sm={6} md={3}><SummaryCard title="Total Users" value={totalCustomers} icon={<PeopleIcon />} color="#1d5755" /></Grid>
                                <Grid item xs={12} sm={6} md={3}><SummaryCard title="Active Users" value={activeCustomers} icon={<ActiveIcon />} color="#4caf50" /></Grid>
                                <Grid item xs={12} sm={6} md={3}><SummaryCard title="Inactive Users" value={inactiveCustomers} icon={<InactiveIcon />} color="#f44336" /></Grid>
                                <Grid item xs={12} sm={6} md={3}><SummaryCard title="New This Month" value={newThisMonth} icon={<CalendarIcon />} color="#ff9800" /></Grid>
                            </Grid>

                            <Card sx={{ borderColor: 'divider', overflow: 'hidden', mt: 4 }}>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        indeterminate={selectedContacts.length > 0 && selectedContacts.length < paginatedContacts.length}
                                                        checked={paginatedContacts.length > 0 && selectedContacts.length === paginatedContacts.length}
                                                        onChange={handleSelectAllClick}
                                                        size="small"
                                                    />
                                                </TableCell>
                                                <TableCell>Profile</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Contact</TableCell>
                                                <TableCell>Role</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell>Created</TableCell>
                                                <TableCell align="center">Actions</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <AnimatePresence>
                                                {paginatedContacts?.map((contact) => {
                                                    const isItemSelected = isSelected(contact._id);
                                                    return (
                                                        <motion.tr key={contact._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                                                            <TableCell padding="checkbox">
                                                                <Checkbox size="small" checked={isItemSelected} onChange={(e) => handleCheckboxClick(e, contact)} />
                                                            </TableCell>
                                                            <TableCell>
                                                                <Avatar src={contact.Profile} alt={contact.firstname} sx={{ width: 40, height: 40 }}>
                                                                    {contact.firstname?.charAt(0) || 'U'}
                                                                </Avatar>
                                                            </TableCell>
                                                            <TableCell>{`${contact.firstname || ''} ${contact.lastname || ''}`.trim() || '—'}</TableCell>
                                                            <TableCell>{contact.email || '—'}</TableCell>
                                                            <TableCell>{contact.mobile || '—'}</TableCell>
                                                            <TableCell>{contact.userRole || '—'}</TableCell>
                                                            <TableCell>
                                                                {contact.status === 1 ? (
                                                                    <Box display="flex" alignItems="center" gap={1}><ActiveIcon color="success" fontSize="small" /> Active</Box>
                                                                ) : (
                                                                    <Box display="flex" alignItems="center" gap={1}><InactiveIcon color="error" fontSize="small" /> Inactive</Box>
                                                                )}
                                                            </TableCell>
                                                            <TableCell>{formatDate(contact.createdAt)}</TableCell>
                                                            <TableCell align="center">
                                                                <IconButton size="small" onClick={() => handleEdit(contact)}><EditIcon fontSize="small" /></IconButton>
                                                                <IconButton size="small" color="error" onClick={() => handleDelete(contact._id)}><DeleteIcon fontSize="small" /></IconButton>
                                                            </TableCell>
                                                        </motion.tr>
                                                    );
                                                })}
                                            </AnimatePresence>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Card>

                            {totalPages > 1 && (
                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                                    <Pagination count={totalPages} page={page} onChange={(_, p) => setPage(p)} color="primary" />
                                </Box>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            <MySnackbar
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            />
        </Box>
    );
};

export default ContactTable;