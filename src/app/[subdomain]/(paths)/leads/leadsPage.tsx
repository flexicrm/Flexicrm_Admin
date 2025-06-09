'use client';
import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, CircularProgress, Typography, IconButton, Box, Tooltip, Grid, Paper, ToggleButton, ToggleButtonGroup, Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import {
    Close as CloseIcon,
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as ViewIcon,
    Refresh as RefreshIcon,
    TableChart as TableIcon,
    Dashboard as KanbanIcon,
    PersonAdd as ConvertIcon,
    Schedule as FollowUpIcon,
    CheckCircle as StatusIcon,
    Business as CompanyIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Person as AssigneeIcon,
    CalendarToday as CalendarIcon,
    Note as NotesIcon,
    CheckCircle,
    CalendarMonth,
    Visibility,
    Delete,
    People
} from '@mui/icons-material';
import Kanban from './kanban/kanbanleads';
import { API_BASE_URL } from '../../../utils';
import { MyTable } from '../../../ui-components/Table/Table';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { MySnackbar } from '../../../ui-components/Snackbar/Snackbar';
import ConvertCustomer from './form/convertcutomer';
import FollowUpForm from './form/FollowUpForm';
import { MyButton } from '../../../ui-components/Buttons/Buttons';
import DeleteDialog from '../../../ui-components/CustomiseComponent/DeleteDialog';
import { getLeads, GETLeadSource, GETLeadsStatus } from '../../../../../api/Leads';
import TaskManagement from './kanban/kanbanleads';
import Link from 'next/link';
import userContext from '../../../UseContext/UseContext';
import { usersSingleGET } from '../../../../../api/user';
// import TaskManagement from './kanban/TaskMagement';

interface Lead {
    _id: string;
    LeadId: string;
    manualData: {
        name: string;
        company: string;
        email?: string;
        mobileNo: string;
    };
    assignTo: {
        firstname: string;
        lastname: string;
        _id: string;
        Profile?: string;
    };
    followUps: Array<{ followUpDate: string; notes: string }>;
    leadsource: string;
    leadstatus: { _id: string; statusName: string; color: string };
    status: number;
}

type Severity = 'error' | 'warning' | 'info' | 'success';

const LeadsPage: React.FC = () => {
    const { leadscon, setLeadsCon } = useContext<any>(userContext);
    console.log(leadscon, 'leadscon');
    const [leads, setLeads] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState([]);
    const [leadSources, setLeadSources] = useState([]);
    const [leadstatus, setLeadstatus] = useState([]);
    const [leadType, setLeadType] = useState(null);
    // const [kanbanView, setKanbanView] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>('success');
    const [isFollowUpFormVisible, setFollowUpFormVisible] = useState(false);
    const [isConvertFormVisible, setConvertFormVisible] = useState(false);
    const [currentLead, setCurrentLead] = useState<Lead | null>(null);
    const [actionDialogOpen, setActionDialogOpen] = useState(false);
    // const [convertId, setConvertId] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
    // const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'kanban' | 'Table'>('Table');
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const accessToken = Cookies.get('crmaccess');
    const subdomain = Cookies.get('subdomain');

    const handleEdit = useCallback((event: React.MouseEvent<HTMLElement>, lead: Lead) => {
        setCurrentLead(lead);
        setAnchorEl(event.currentTarget);
    }, []);

    const handleMenuClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleViewModeChange = (event: React.MouseEvent<HTMLElement>, newViewMode: 'kanban' | 'Table') => {
        if (newViewMode !== null) {
            setViewMode(newViewMode);
        }
    };

    const fetchUsers = async () => {
        const response = await usersSingleGET(subdomain);
        console.log();
        if (response) {
            setUsers(response.data.users || []);
        }
    };

    const fetchLeadstatus = async () => {
        try {
            const response = await GETLeadsStatus(subdomain);
            if (response) {
                setLeadstatus(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };
    const fetchLeadSources = async () => {
        try {
            const response = await GETLeadSource(subdomain);
            if (response) {
                setLeadSources(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchLeads = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getLeads(subdomain);
            setLeadsCon(response?.data?.leads);
            setLeads(response?.data?.leads.reverse() || []);
            setLeadType(response?.data);
        } finally {
            setLoading(false);
        }
    }, [subdomain]);
    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);
    useEffect(() => {
        fetchLeadSources();
        fetchLeadstatus();
        fetchUsers();
    }, []);

    const UsersOptions = useMemo(
        () =>
            users.map((user) => ({
                label: user?.firstname,
                value: user?._id
            })),
        [users]
    );

    const handleViewActions = useCallback((lead: Lead) => {
        setCurrentLead(lead);
        setActionDialogOpen(true);
    }, []);

    const handleDelete = useCallback((leadId: string) => {
        setLeadToDelete(leadId);
        setDeleteDialogOpen(true);
    }, []);

    const confirmDelete = useCallback(async () => {
        if (!leadToDelete) return;
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axios.delete(`${API_BASE_URL}/lead/${subdomain}/${leadToDelete}`, { headers });

            if (response) {
                setLeads((prevLeads) => prevLeads.filter((lead) => lead.LeadId !== leadToDelete));
                setSnackbarMessage('Lead deleted successfully');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            } else {
                setSnackbarMessage('Failed to delete lead');
                setSnackbarSeverity('error');
            }
        } catch (error) {
            setError('Error deleting lead. Please try again.');
        } finally {
            setDeleteDialogOpen(false);
            setLeadToDelete(null);
        }
    }, [accessToken, leadToDelete, subdomain]);

    const handleStatusChange = useCallback(
        async (lead: Lead) => {
            const status = lead.status === 1 ? 0 : 1;
            const headers = { Authorization: `Bearer ${accessToken}` };

            try {
                const response = await axios.patch(`${API_BASE_URL}/lead/${subdomain}/${lead.LeadId}`, { status }, { headers });
                if (response) {
                    setSnackbarMessage(response?.data?.data?.message || 'Status updated successfully');
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                    setLeads((prevLeads) => prevLeads.map((l) => (l.LeadId === lead.LeadId ? { ...l, status } : l)));
                } else {
                    setSnackbarMessage('Failed to update status');
                    setSnackbarSeverity('error');
                }
            } catch (error) {
                setError('Failed to update status');
            }
        },
        [accessToken, subdomain]
    );
    const leadsArray = Array.isArray(leads) ? leads : [];

    const rowData = leadsArray?.map((item) => ({
        ...item,
        LeadId: item?.LeadId,
        Name: item?.formData ? item?.formData?.name : item?.manualData?.name,
        Company: !item?.manualData ? item?.formData?.company : item?.manualData?.company,
        Email: item?.formData ? item?.formData?.email : item?.manualData?.email,
        Phone: item?.formData ? item?.formData?.mobile : item?.manualData?.mobileNo,
        'Follow-Up':
            item?.followUps?.length > 0
                ? `Date: ${new Date(item?.followUps.slice(-1)[0]?.dateTime)?.toDateString()},
               Notes: ${item?.followUps.slice(-1)[0]?.notes}`
                : 'No follow-ups',
        Assigned: `${item?.assignTo?.firstname || ''} ${item?.assignTo?.lastname || 'Not Assign'}`,
        active: item?.status,
        leadstatus: item?.leadstatus,
        leadsource: item?.leadsource
    }));

    const columns = [
        {
            id: 'LeadId',
            label: 'Lead ID',
            align: 'center',
            render: (value) => (
                <Tooltip title="View lead details">
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {value}
                    </Typography>
                </Tooltip>
            )
        },
        {
            id: 'Name',
            label: 'Name',
            align: 'center',
            render: (value) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {value}
                    </Typography>
                </Box>
            )
        },
        {
            id: 'Email',
            label: 'Email',
            align: 'center',
            render: (value) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ ml: 1 }}>
                        {value}
                    </Typography>
                </Box>
            )
        },
        {
            id: 'Company',
            label: 'Company',
            align: 'center',
            render: (value) => (
                <Tooltip title="Company">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CompanyIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
                        <Typography variant="body2">{value}</Typography>
                    </Box>
                </Tooltip>
            )
        },
        {
            id: 'Phone',
            label: 'Phone',
            align: 'center',
            render: (value) => (
                <Tooltip title="Phone number">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
                        <Typography variant="body2">{value}</Typography>
                    </Box>
                </Tooltip>
            )
        },
        {
            id: 'Follow-Up',
            label: 'Follow-Up',
            align: 'center',
            render: (value) => (
                <Tooltip title={value.includes('No follow-ups') ? 'No follow-ups scheduled' : value}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
                        <Typography variant="body2" noWrap>
                            {value.split(',')[0]}
                        </Typography>
                    </Box>
                </Tooltip>
            )
        },
        {
            id: 'Assigned',
            label: 'Assigned To',
            align: 'center',
            render: (value) => (
                <Tooltip title="Assigned team member">
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AssigneeIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
                        <Typography variant="body2">{value}</Typography>
                    </Box>
                </Tooltip>
            )
        },
        {
            id: 'leadsource',
            label: 'Source',
            align: 'center',
            render: (value) => (
                <Tooltip title={`Source: ${value || 'Unknown'}`}>
                    <Typography variant="body2">{value}</Typography>
                </Tooltip>
            )
        }
    ];

    return (
        <Box sx={{ p: 2 }}>
            {/* <Paper elevation={0} > */}
            <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="h5" color="primary" component="h1" sx={{ fontWeight: 600 }}>
                        Leads{' '}
                        <Tooltip title="Refresh data">
                            <IconButton onClick={fetchLeads} color="primary">
                                <RefreshIcon />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Box sx={{ margin: '5px' }}>
                            <ToggleButtonGroup color="primary" value={viewMode} exclusive onChange={handleViewModeChange} size="small">
                                <Tooltip title="Kanban">
                                    <ToggleButton value="kanban" color="primary">
                                        <TableIcon sx={{ fontSize: '18px' }} />
                                    </ToggleButton>
                                </Tooltip>
                                <Tooltip title="Tabel">
                                    <ToggleButton value="Tabel" color="primary">
                                        <KanbanIcon sx={{ fontSize: '18px' }} />
                                    </ToggleButton>
                                </Tooltip>
                            </ToggleButtonGroup>
                        </Box>
                        <Box>
                            {/* <Tooltip title="Create new lead"> */}
                            <Link href={`/${subdomain}/leads/create`}>
                                <MyButton variant="contained" color="primary" startIcon={<AddIcon />}>
                                    Lead
                                </MyButton>
                            </Link>
                            {/* </Tooltip> */}
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* {error && (
                <Typography color="error" sx={{ mt: 2, mb: 2 }}>
                    {error}
                </Typography>
            )} */}

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {viewMode == 'kanban' ? (
                        <TaskManagement leads={leadType} leadStatus={leadstatus} setLeads={setLeads} />
                    ) : (
                        <MyTable
                            data={rowData}
                            columns={columns}
                            setDeleteDialogOpen={setDeleteDialogOpen}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            snackbarMessage={snackbarMessage}
                            setSnackbarMessage={setSnackbarMessage}
                            subdomain={subdomain}
                            onToggle={handleStatusChange}
                            leadstatus={leadstatus}
                            fetchLeads={setLeads}
                        />
                    )}
                    {currentLead && (
                        <FollowUpForm
                            leadId={currentLead.LeadId}
                            UsersOptions={UsersOptions}
                            open={isFollowUpFormVisible}
                            onOpenChange={setFollowUpFormVisible}
                            followUp={null}
                            setLeads={setLeads}
                            setSnackbarOpen={setSnackbarOpen}
                            setSnackbarSeverity={setSnackbarSeverity}
                            setSnackbarMessage={setSnackbarMessage}
                            handleMenuClose={handleMenuClose}
                        />
                    )}
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right'
                        }}
                    >
                        <Link href={`/${subdomain}/leads/edit/${currentLead?.LeadId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <MenuItem>
                                <ListItemIcon>
                                    <ModeEditIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Edit lead</ListItemText>
                            </MenuItem>
                        </Link>
                        <MenuItem onClick={() => setFollowUpFormVisible(true)}>
                            <ListItemIcon>
                                <CalendarMonth fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Add Follow-Up</ListItemText>
                        </MenuItem>
                        <Link href={`/${subdomain}/leads/${currentLead?.LeadId}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                            <MenuItem>
                                <ListItemIcon>
                                    <Visibility fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>View Lead</ListItemText>
                            </MenuItem>
                        </Link>
                        <Divider />
                        <MenuItem onClick={() => setConvertFormVisible(true)}>
                            <ListItemIcon>
                                <People fontSize="small" />
                            </ListItemIcon>
                            <ListItemText>Convert Customer</ListItemText>
                        </MenuItem>
                    </Menu>
                    <Dialog open={isConvertFormVisible} onClose={() => setConvertFormVisible(false)} maxWidth="sm" fullWidth>
                        <DialogTitle>Convert Customer</DialogTitle>
                        <DialogContent>
                            <ConvertCustomer currentLead={currentLead} convertid={currentLead?.LeadId} setConvertFormVisible={setConvertFormVisible} leadStatus={currentLead?.leadstatus} />
                        </DialogContent>
                    </Dialog>
                    <DeleteDialog deleteDialogOpen={deleteDialogOpen} cancelDelete={() => setDeleteDialogOpen(false)} confirmDelete={confirmDelete} data="Lead" />
                    {console.log(snackbarOpen, 'snackbarOpen')}
                    <MySnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} position={{ vertical: 'top', horizontal: 'right' }} onClose={() => setSnackbarOpen(false)} />
                </>
            )}
            {/* </Paper> */}
        </Box>
    );
};

export default LeadsPage;
