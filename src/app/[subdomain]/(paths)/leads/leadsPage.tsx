// 'use client';
// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import { Dialog, DialogTitle, DialogContent, CircularProgress, Typography, IconButton, Box, Tooltip, Grid, Paper, ToggleButton, ToggleButtonGroup, Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
// import {
//     Close as CloseIcon,
//     Add as AddIcon,
//     Edit as EditIcon,
//     Delete as DeleteIcon,
//     Visibility as ViewIcon,
//     Refresh as RefreshIcon,
//     TableChart as TableIcon,
//     Dashboard as KanbanIcon,
//     PersonAdd as ConvertIcon,
//     Schedule as FollowUpIcon,
//     CheckCircle as StatusIcon,
//     Business as CompanyIcon,
//     Email as EmailIcon,
//     Phone as PhoneIcon,
//     Person as AssigneeIcon,
//     CalendarToday as CalendarIcon,
//     Note as NotesIcon,
//     CheckCircle,
//     CalendarMonth,
//     Visibility,
//     Delete
// } from '@mui/icons-material';
// import Kanban from './kanban/kanbanleads';
// import { API_BASE_URL } from '../../../utils';
// import { MyTable } from '../../../Component/Table/Table';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
// // import { validateEmail, validatePhone, validateRequired } from '../../../Component/Table/Validation';
// import { MySnackbar } from '../../../Component/Snackbar/Snackbar';
// import ConvertCustomer from './form/convertcutomer';
// import FollowUpForm from './form/FollowUpForm';
// import { MyButton } from '../../../Component/Buttons/Buttons';
// import DeleteDialog from '../../../Component/CustomiseComponent/DeleteDialog';
// import { getLeads } from '../../../../../api/Leads';
// import TaskManagement from './kanban/kanbanleads';

// interface Lead {
//     _id: string;
//     LeadId: string;
//     manualData: {
//         name: string;
//         company: string;
//         email?: string;
//         mobileNo: string;
//     };
//     assignTo: {
//         firstname: string;
//         lastname: string;
//         _id: string;
//         Profile?: string;
//     };
//     followUps: Array<{ followUpDate: string; notes: string }>;
//     leadsource: string;
//     leadstatus: { _id: string; statusName: string; color: string };
//     status: number;
// }

// const LeadsPage: React.FC = () => {
//     const [leads, setLeads] = useState<any>([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [customers, setCustomers] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [leadSources, setLeadSources] = useState([]);
//     const [leadstatus, setLeadstatus] = useState([]);
//     // const [users, setUsers] = useState([]);
//     const [leadType, setLeadType] = useState(null);
//     const [kanbanView, setKanbanView] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [isFollowUpFormVisible, setFollowUpFormVisible] = useState(false);
//     const [isConvertFormVisible, setConvertFormVisible] = useState(false);
//     const [currentLead, setCurrentLead] = useState<Lead | null>(null);
//     const [actionDialogOpen, setActionDialogOpen] = useState(false);
//     const [convertId, setConvertId] = useState<string | null>(null);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//     const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
//     const [editDialogOpen, setEditDialogOpen] = useState(false);
//     const [viewMode, setViewMode] = useState<'kanban' | 'Table'>('Table');
//     // const [isFollowUpFormVisible, setFollowUpFormVisible] = useState(false);
//     // const [isConvertFormVisible, setConvertFormVisible] = useState(false);
//     // const [currentLead, setCurrentLead] = useState<Lead | null>(null);
//     const [isConfirmationDialogVisible, setConfirmationDialogVisible] = useState(false);
//     // const [convertId, setConvertId] = useState<string | null>(null);
//     // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
//     // const [currentLead, setCurrentLead] = React.useState<Lead | null>(null);

//     const handleEdit = useCallback((event: React.MouseEvent<HTMLElement>, lead: Lead) => {
//         setCurrentLead(lead);
//         setAnchorEl(event.currentTarget);
//     }, []);

//     const handleMenuClose = useCallback(() => {
//         setAnchorEl(null);
//     }, []);
//     const handleViewModeChange = (event: React.MouseEvent<HTMLElement>, newViewMode: 'kanban' | 'Table') => {
//         if (newViewMode !== null) {
//             setViewMode(newViewMode);
//         }
//     };
//     const accessToken = Cookies.get('accessToken');
//     const subdomain = Cookies.get('subdomain');

//     // Fetch data functions remain the same...
//     const fetchData = useCallback(
//         async (url, setData) => {
//             try {
//                 const headers = { Authorization: `Bearer ${accessToken}` };
//                 const response = await axios.get(`${API_BASE_URL}${url}`, { headers });
//                 setData(response.data.data);
//             } catch (error) {
//                 setError(`Error fetching data from ${url}. Please try again.`);
//             }
//         },
//         [accessToken]
//     );
//     const fetchProjects = useCallback(async () => {
//         await fetchData(`/user/${subdomain}`, (data) => setUsers(data.users || []));
//     }, [fetchData, subdomain]);

//     const fetchLeadstatus = useCallback(async () => {
//         await fetchData(`/leadstatus/${subdomain}`, setLeadstatus);
//     }, [fetchData, subdomain]);

//     const fetchLeadSources = useCallback(async () => {
//         await fetchData(`/leadsource/${subdomain}`, setLeadSources);
//     }, [fetchData, subdomain]);
//     const fetchLeads = useCallback(async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const response = await getLeads(subdomain);
//             // await fetchData(`/lead/${subdomain}`, (data) => {
//             console.log(response, 'response');

//             setLeads(response?.data?.leads || []);
//             setLeadType(response?.data);
//             // });
//         } finally {
//             setLoading(false);
//         }
//     }, []);
//     useEffect(() => {
//         fetchLeads();
//         fetchLeadSources();
//         fetchLeadstatus();
//         fetchProjects();
//     }, []);
//     const UsersOptions = useMemo(
//         () =>
//             users.map((user) => ({
//                 label: user?.firstname,
//                 value: user?._id
//             })),
//         [users]
//     );

//     // Other fetch functions remain the same...

//     // const handleEdit = useCallback((event: React.MouseEvent<HTMLElement>, lead: Lead) => {
//     //     setCurrentLead(lead);
//     //     setAnchorEl(event.currentTarget);
//     //     // setEditDialogOpen(true);
//     // }, []);

//     const handleViewActions = useCallback((lead: Lead) => {
//         setCurrentLead(lead);
//         setActionDialogOpen(true);
//     }, []);

//     const handleDelete = useCallback((leadId: string) => {
//         setLeadToDelete(leadId);
//         setDeleteDialogOpen(true);
//     }, []);

//     const confirmDelete = useCallback(async () => {
//         if (deleteDialogOpen) return;
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             await axios.delete(`${API_BASE_URL}/lead/${subdomain}/${leadToDelete}`, { headers });
//             setLeads((prevLeads) => prevLeads.filter((lead) => lead.LeadId !== leadToDelete));
//             setSnackbarMessage('Lead deleted successfully');
//             setSnackbarOpen(true);
//         } catch (error) {
//             setError('Error deleting lead. Please try again.');
//         } finally {
//             setDeleteDialogOpen(false);
//             setLeadToDelete(null);
//         }
//     }, [accessToken, subdomain, leadToDelete]);

//     const handleStatusChange = useCallback(
//         async (lead: Lead) => {
//             const status = lead.status === 1 ? 0 : 1;
//             const headers = { Authorization: `Bearer ${accessToken}` };

//             try {
//                 const response = await axios.patch(`${API_BASE_URL}/lead/${subdomain}/${lead.LeadId}`, { status }, { headers });

//                 setSnackbarMessage(response?.data?.data?.message || 'Status updated successfully');
//                 setSnackbarOpen(true);
//                 setLeads((prevLeads) => prevLeads.map((l) => (l.LeadId === lead.LeadId ? { ...l, status } : l)));
//             } catch (error) {
//                 setError('Failed to update status');
//             }
//         },
//         [accessToken, subdomain]
//     );

//     const rowData = leads.map((item) => ({
//         ...item,
//         LeadId: item?.LeadId,
//         Name: item?.manualData?.name,
//         Company: item?.manualData?.company,
//         Email: item?.manualData?.email,
//         Phone: item?.manualData?.mobileNo,
//         'Follow-Up':
//             item?.followUps?.length > 0
//                 ? `Date: ${new Date(item?.followUps[item?.followUps?.length - 1]?.followUpDate)?.toDateString()},
//                Notes: ${item?.followUps[item?.followUps?.length - 1]?.notes}`
//                 : 'No follow-ups',
//         Assigned: `${item?.assignTo?.firstname} ${item?.assignTo?.lastname}`,
//         active: item?.status,
//         leadstatus: item?.leadstatus,
//         leadsource: item?.leadsource
//     }));

//     const columns = [
//         {
//             id: 'LeadId',
//             label: 'Lead ID',
//             align: 'center',
//             render: (value) => (
//                 <Tooltip title="View lead details">
//                     <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                         {value}
//                     </Typography>
//                 </Tooltip>
//             )
//         },
//         {
//             id: 'Name',
//             label: 'Name',
//             align: 'center',
//             render: (value) => (
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Typography variant="body2" sx={{ ml: 1 }}>
//                         {value}
//                     </Typography>
//                 </Box>
//             )
//         },
//         {
//             id: 'Company',
//             label: 'Company',
//             align: 'center',
//             render: (value) => (
//                 <Tooltip title="Company">
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <CompanyIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
//                         <Typography variant="body2">{value}</Typography>
//                     </Box>
//                 </Tooltip>
//             )
//         },
//         {
//             id: 'Phone',
//             label: 'Phone',
//             align: 'center',
//             render: (value) => (
//                 <Tooltip title="Phone number">
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
//                         <Typography variant="body2">{value}</Typography>
//                     </Box>
//                 </Tooltip>
//             )
//         },
//         {
//             id: 'Follow-Up',
//             label: 'Follow-Up',
//             align: 'center',
//             render: (value) => (
//                 <Tooltip title={value.includes('No follow-ups') ? 'No follow-ups scheduled' : value}>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <CalendarIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
//                         <Typography variant="body2" noWrap>
//                             {value.split(',')[0]}
//                         </Typography>
//                     </Box>
//                 </Tooltip>
//             )
//         },
//         {
//             id: 'Assigned',
//             label: 'Assigned To',
//             align: 'center',
//             render: (value) => (
//                 <Tooltip title="Assigned team member">
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <AssigneeIcon fontSize="small" sx={{ mr: 1, color: 'action.active' }} />
//                         <Typography variant="body2">{value}</Typography>
//                     </Box>
//                 </Tooltip>
//             )
//         },
//         {
//             id: 'leadstatus',
//             label: 'Status',
//             align: 'center',
//             render: (value) => (
//                 <Tooltip title={`Status: ${value?.statusName || 'Unknown'}`}>
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Box
//                             sx={{
//                                 width: 12,
//                                 height: 12,
//                                 borderRadius: '50%',
//                                 bgcolor: value?.color ? `#${value.color}` : 'gray',
//                                 mr: 1
//                             }}
//                         />
//                         <Typography variant="subtitle2" fontWeight={600}>
//                             {value?.statusName || 'Unknown'}
//                         </Typography>
//                     </Box>
//                 </Tooltip>
//             )
//         },
//         {
//             id: 'leadsource',
//             label: 'Source',
//             align: 'center',
//             render: (value) => (
//                 <Tooltip title={`Source: ${value || 'Unknown'}`}>
//                     <Typography variant="body2">{value}</Typography>
//                 </Tooltip>
//             )
//         }
//     ];

//     // const actionButtons = [
//     //     {
//     //         icon: <EditIcon />,
//     //         tooltip: 'Edit lead',
//     //         onClick: (row) => handleEdit(row)
//     //     },
//     //     {
//     //         icon: <DeleteIcon />,
//     //         tooltip: 'Delete lead',
//     //         onClick: (row) => handleDelete(row.LeadId)
//     //     },
//     //     {
//     //         icon: <StatusIcon />,
//     //         tooltip: 'Toggle status',
//     //         onClick: (row) => handleStatusChange(row)
//     //     },
//     //     {
//     //         icon: <ViewIcon />,
//     //         tooltip: 'View actions',
//     //         onClick: (row) => handleViewActions(row)
//     //     }
//     // ];
//     console.log(currentLead, 'currentLead');

//     return (
//         <Box>
//             <Paper elevation={0} sx={{ p: 0, borderRadius: 2, boxShadow: 'none' }}>
//                 <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
//                             Leads{' '}
//                             <Tooltip title="Refresh data">
//                                 <IconButton onClick={fetchLeads} color="primary">
//                                     <RefreshIcon />
//                                 </IconButton>
//                             </Tooltip>
//                         </Typography>
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         {/* <Tooltip title={kanbanView ? 'Switch to table view' : 'Switch to kanban view'}> */}
//                         {/* <MyButton variant="outlined" onClick={() => setKanbanView(!kanbanView)} startIcon={kanbanView ? <TableIcon /> : <KanbanIcon />}>
//                                 {kanbanView ? 'Table View' : 'Kanban View'}
//                             </MyButton> */}
//                         <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
//                             <Box sx={{ margin: '5px' }}>
//                                 <ToggleButtonGroup value={viewMode} exclusive onChange={handleViewModeChange} size="small">
//                                     <Tooltip title="Kanban">
//                                         <ToggleButton value="kanban">
//                                             <TableIcon sx={{ fontSize: '18px' }} />
//                                         </ToggleButton>
//                                     </Tooltip>
//                                     <Tooltip title="Tabel">
//                                         <ToggleButton value="Tabel">
//                                             <KanbanIcon sx={{ fontSize: '18px' }} />
//                                         </ToggleButton>
//                                     </Tooltip>
//                                 </ToggleButtonGroup>
//                             </Box>
//                             {/* </Tooltip> */}
//                             <Box>
//                                 <Tooltip title="Create new lead">
//                                     <MyButton variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => (window.location.href = `/${subdomain}/leads/create`)}>
//                                         Lead
//                                     </MyButton>
//                                 </Tooltip>
//                             </Box>
//                         </Box>
//                     </Grid>
//                 </Grid>

//                 {error && (
//                     <Typography color="error" sx={{ mt: 2, mb: 2 }}>
//                         {error}
//                     </Typography>
//                 )}

//                 {loading ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//                         <CircularProgress />
//                     </Box>
//                 ) : (
//                     <>
//                         {viewMode == 'kanban' ? (
//                             <TaskManagement leads={leadType} leadStatus={leadstatus} setLeads={setLeads} />
//                         ) : (
//                             <MyTable
//                                 data={rowData}
//                                 columns={columns}
//                                 // actionButtons={actionButtons}
//                                 onEdit={handleEdit}
//                                 onDelete={handleDelete}
//                                 // onCreate={() => (window.location.href = `/${subdomain}/leads/create`)}
//                                 // onToggle={handleStatusChange}
//                                 snackbarMessage={snackbarMessage}
//                                 setSnackbarMessage={setSnackbarMessage}
//                                 subdomain={subdomain}
//                             />
//                         )}

//                         {/* Action Dialog */}
//                         {/* <Dialog open={actionDialogOpen} onClose={() => setActionDialogOpen(false)} maxWidth="xs" fullWidth>
//                             <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 Lead Actions
//                                 <IconButton onClick={() => setActionDialogOpen(false)}>
//                                     <CloseIcon />
//                                 </IconButton>
//                             </DialogTitle>
//                             <DialogContent dividers>
//                                 <Grid container spacing={2} sx={{ p: 2 }}>
//                                     <Grid size={{ xs: 12, sm: 12 }}>
//                                         <MyButton
//                                             // fullWidth
//                                             variant="contained"
//                                             startIcon={<FollowUpIcon />}
//                                             onClick={() => {
//                                                 setActionDialogOpen(false);
//                                                 setFollowUpFormVisible(true);
//                                             }}
//                                         >
//                                             Create Follow Up
//                                         </MyButton>
//                                     </Grid>
//                                     <Grid size={{ xs: 12 }}>
//                                         <MyButton
//                                             variant="contained"
//                                             startIcon={<ConvertIcon />}
//                                             onClick={() => {
//                                                 setActionDialogOpen(false);
//                                                 setConvertFormVisible(true);
//                                                 setConvertId(currentLead?.LeadId || '');
//                                             }}
//                                         >
//                                             Convert to Customer
//                                         </MyButton>
//                                     </Grid>
//                                     <Grid size={{ xs: 12, sm: 12 }}>
//                                         <MyButton
//                                             // fullWidth
//                                             variant="contained"
//                                             startIcon={<EditIcon />}
//                                             onClick={() => {
//                                                 setActionDialogOpen(false);
//                                                 setEditDialogOpen(true);
//                                             }}
//                                         >
//                                             Edit Lead
//                                         </MyButton>
//                                     </Grid>
//                                 </Grid>
//                             </DialogContent>
//                         </Dialog> */}

//                         {/* Follow Up Form */}
//

//                         {/* Convert Customer Dialog */}
//                         <Dialog open={isConvertFormVisible} onClose={() => setConvertFormVisible(false)} maxWidth="md" fullWidth>
//                             <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                                 Convert Lead to Customer
//                                 <IconButton onClick={() => setConvertFormVisible(false)}>
//                                     <CloseIcon />
//                                 </IconButton>
//                             </DialogTitle>
//                             <DialogContent dividers>{currentLead && <ConvertCustomer currentLead={currentLead} convertid={convertId} setConvertFormVisible={setConvertFormVisible} leadStatus={leadstatus} />}</DialogContent>
//                         </Dialog>

//                         <Menu
//                             anchorEl={anchorEl}
//                             open={Boolean(anchorEl)}
//                             onClose={handleMenuClose}
//                             anchorOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'right'
//                             }}
//                             transformOrigin={{
//                                 vertical: 'top',
//                                 horizontal: 'right'
//                             }}
//                         >
//                             <MenuItem onClick={() => (window.location.href = `/${subdomain}/leads/edit/${currentLead?.LeadId}`)}>
//                                 <ListItemIcon>
//                                     <ModeEditIcon fontSize="small" />
//                                 </ListItemIcon>
//                                 <ListItemText>Edit lead</ListItemText>
//                             </MenuItem>
//                             <MenuItem onClick={() => setFollowUpFormVisible(true)}>
//                                 <ListItemIcon>
//                                     <CalendarMonth fontSize="small" />
//                                 </ListItemIcon>
//                                 <ListItemText>Add Follow-Up</ListItemText>
//                             </MenuItem>
//                             <MenuItem onClick={() => (window.location.href = `/${subdomain}/leads/${currentLead?.LeadId}`)}>
//                                 <ListItemIcon>
//                                     <Visibility fontSize="small" />
//                                 </ListItemIcon>
//                                 <ListItemText>View Lead</ListItemText>
//                             </MenuItem>
//                             <Divider />
//                             <MenuItem onClick={() => console.log(`Delete lead ${currentLead?.LeadId}`)} sx={{ color: 'error.main' }}>
//                                 <ListItemIcon>
//                                     <Delete fontSize="small" color="error" />
//                                 </ListItemIcon>
//                                 <ListItemText>Delete Lead</ListItemText>
//                             </MenuItem>
//                         </Menu>
//                         {/* </Dialog> */}

//                         {/* Delete Confirmation Dialog */}
//                         {/* <DeleteDialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)} onConfirm={confirmDelete} title="Delete Lead" content="Are you sure you want to delete this lead? This action cannot be undone." /> */}

//                         {/* Snackbar for notifications */}
//                         <MySnackbar open={snackbarOpen} message={snackbarMessage} severity="success" position={{ vertical: 'top', horizontal: 'right' }} onClose={() => setSnackbarOpen(false)} />
//                         {/* <FollowUpForm> */}
//                     </>
//                 )}
//             </Paper>
//         </Box>
//     );
// };

// export default LeadsPage;
'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
    Delete
} from '@mui/icons-material';
import Kanban from './kanban/kanbanleads';
import { API_BASE_URL } from '../../../utils';
import { MyTable } from '../../../Component/Table/Table';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import { validateEmail, validatePhone, validateRequired } from '../../../Component/Table/Validation';
import { MySnackbar } from '../../../Component/Snackbar/Snackbar';
import ConvertCustomer from './form/convertcutomer';
import FollowUpForm from './form/FollowUpForm';
import { MyButton } from '../../../Component/Buttons/Buttons';
import DeleteDialog from '../../../Component/CustomiseComponent/DeleteDialog';
import { getLeads } from '../../../../../api/Leads';
import TaskManagement from './kanban/kanbanleads';

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
// interface severity {
type Severity = 'error' | 'warning' | 'info' | 'success';
// }
const LeadsPage: React.FC = () => {
    const [leads, setLeads] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [customers, setCustomers] = useState([]);
    const [users, setUsers] = useState([]);
    const [leadSources, setLeadSources] = useState([]);
    const [leadstatus, setLeadstatus] = useState([]);
    const [leadType, setLeadType] = useState(null);
    const [kanbanView, setKanbanView] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>('success');
    const [isFollowUpFormVisible, setFollowUpFormVisible] = useState(false);
    const [isConvertFormVisible, setConvertFormVisible] = useState(false);
    const [currentLead, setCurrentLead] = useState<Lead | null>(null);
    const [actionDialogOpen, setActionDialogOpen] = useState(false);
    const [convertId, setConvertId] = useState<string | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'kanban' | 'Table'>('Table');
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

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

    const accessToken = Cookies.get('accessToken');
    const subdomain = Cookies.get('subdomain');

    const fetchData = useCallback(
        async (url, setData) => {
            try {
                const headers = { Authorization: `Bearer ${accessToken}` };
                const response = await axios.get(`${API_BASE_URL}${url}`, { headers });
                setData(response.data.data);
            } catch (error) {
                setError(`Error fetching data from ${url}. Please try again.`);
            }
        },
        [accessToken]
    );

    const fetchProjects = useCallback(async () => {
        await fetchData(`/user/${subdomain}`, (data) => setUsers(data.users || []));
    }, [fetchData, subdomain]);

    const fetchLeadstatus = useCallback(async () => {
        await fetchData(`/leadstatus/${subdomain}`, setLeadstatus);
    }, [fetchData, subdomain]);

    const fetchLeadSources = useCallback(async () => {
        await fetchData(`/leadsource/${subdomain}`, setLeadSources);
    }, [fetchData, subdomain]);

    const fetchLeads = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getLeads(subdomain);
            setLeads(response?.data?.leads || []);
            setLeadType(response?.data);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLeads();
        fetchLeadSources();
        fetchLeadstatus();
        fetchProjects();
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
    console.log(leadToDelete, 'leadToDelete');

    const confirmDelete = useCallback(async () => {
        // if (!leadToDelete) return;
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axios.delete(`${API_BASE_URL}/lead/${subdomain}/${leadToDelete}`, { headers });

            console.log(response, 'response,,');
            if (response) {
                setLeads((prevLeads) => prevLeads.filter((lead) => lead.LeadId !== leadToDelete));
                setSnackbarMessage('Lead deleted successfully');
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            } else {
                setSnackbarMessage('Lead deleted successfully');
                setSnackbarSeverity('error');
            }
        } catch (error) {
            setError('Error deleting lead. Please try again.');
        } finally {
            setDeleteDialogOpen(false);
            setLeadToDelete(null);
        }
    }, [accessToken, subdomain, leadToDelete]);

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
                    setSnackbarMessage(response?.data?.data?.message || 'Status updated successfully');
                    setSnackbarSeverity('error');
                }
            } catch (error) {
                setError('Failed to update status');
            }
        },
        [accessToken, subdomain]
    );

    const rowData = leads.map((item) => ({
        ...item,
        LeadId: item?.LeadId,
        Name: item?.formData ? item?.formData?.name : item?.manualData?.name,
        Company: !item?.manualData ? item?.formData?.company : item?.manualData?.company,
        Email: item?.formData ? item?.formData?.email : item?.manualData?.email,
        Phone: item?.formData ? item?.formData?.mobile : item?.manualData?.mobileNo,
        'Follow-Up':
            item?.followUps?.length > 0
                ? `Date: ${new Date(item?.followUps[item?.followUps?.length - 1]?.followUpDate)?.toDateString()},
               Notes: ${item?.followUps[item?.followUps?.length - 1]?.notes}`
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
        // {
        //     id: 'leadstatus',
        //     label: 'Status',
        //     align: 'center',
        //     render: (value) => (
        //         <Tooltip title={`Status: ${value?.statusName || 'Unknown'}`}>
        //             <Box sx={{ display: 'flex', alignItems: 'center' }}>
        //                 <Box
        //                     sx={{
        //                         width: 12,
        //                         height: 12,
        //                         borderRadius: '50%',
        //                         bgcolor: value?.color ? `#${value.color}` : 'gray',
        //                         mr: 1
        //                     }}
        //                 />
        //                 <Typography variant="subtitle2" fontWeight={600}>
        //                     {value?.statusName || 'Unknown'}
        //                 </Typography>
        //             </Box>
        //         </Tooltip>
        //     )
        // },
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

    // const actionButtons = [
    //     {
    //         icon: <EditIcon />,
    //         tooltip: 'Edit lead',
    //         onClick: (row) => handleEdit(row)
    //     },
    //     {
    //         icon: <DeleteIcon />,
    //         tooltip: 'Delete lead',
    //         onClick: (row) => handleDelete(row.LeadId)
    //     },
    //     {
    //         icon: <StatusIcon />,
    //         tooltip: 'Toggle status',
    //         onClick: (row) => handleStatusChange(row)
    //     },
    //     {
    //         icon: <ViewIcon />,
    //         tooltip: 'View actions',
    //         onClick: (row) => handleViewActions(row)
    //     }
    // ];

    return (
        <Box>
            <Paper elevation={0} sx={{ p: 0, borderRadius: 2, boxShadow: 'none' }}>
                <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
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
                                <ToggleButtonGroup value={viewMode} exclusive onChange={handleViewModeChange} size="small">
                                    <Tooltip title="Kanban">
                                        <ToggleButton value="kanban">
                                            <TableIcon sx={{ fontSize: '18px' }} />
                                        </ToggleButton>
                                    </Tooltip>
                                    <Tooltip title="Tabel">
                                        <ToggleButton value="Tabel">
                                            <KanbanIcon sx={{ fontSize: '18px' }} />
                                        </ToggleButton>
                                    </Tooltip>
                                </ToggleButtonGroup>
                            </Box>
                            <Box>
                                <Tooltip title="Create new lead">
                                    <MyButton variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => (window.location.href = `/${subdomain}/leads/create`)}>
                                        Lead
                                    </MyButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                {/* {console.log(currentLead, 'currentLead')} */}
                {error && (
                    <Typography color="error" sx={{ mt: 2, mb: 2 }}>
                        {error}
                    </Typography>
                )}

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
                            />
                        )}
                        {currentLead && <FollowUpForm leadId={currentLead.LeadId} UsersOptions={UsersOptions} open={isFollowUpFormVisible} onOpenChange={setFollowUpFormVisible} followUp={null} />}
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
                            <MenuItem onClick={() => (window.location.href = `/${subdomain}/leads/edit/${currentLead?.LeadId}`)}>
                                <ListItemIcon>
                                    <ModeEditIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Edit lead</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => setFollowUpFormVisible(true)}>
                                <ListItemIcon>
                                    <CalendarMonth fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>Add Follow-Up</ListItemText>
                            </MenuItem>
                            <MenuItem onClick={() => (window.location.href = `/${subdomain}/leads/${currentLead?.LeadId}`)}>
                                <ListItemIcon>
                                    <Visibility fontSize="small" />
                                </ListItemIcon>
                                <ListItemText>View Lead</ListItemText>
                            </MenuItem>
                            <Divider />
                            {/* <MenuItem onClick={() => (handleDelete(currentLead?.LeadId), setDeleteDialogOpen(true))} sx={{ color: 'error.main' }}>
                                <ListItemIcon>
                                    <Delete fontSize="small" color="error" />
                                </ListItemIcon>
                                <ListItemText>Delete Lead</ListItemText>
                            </MenuItem> */}
                            <MenuItem onClick={() => setConvertFormVisible(true)} sx={{ color: 'error.main' }}>
                                {/* <ListItemIcon>
                                    <Delete fontSize="small" color="error" />
                                </ListItemIcon> */}
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

                        <MySnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} position={{ vertical: 'top', horizontal: 'right' }} onClose={() => setSnackbarOpen(false)} />
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default LeadsPage;
