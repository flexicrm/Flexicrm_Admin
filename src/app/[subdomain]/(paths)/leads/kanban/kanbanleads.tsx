'use client';
import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
    Box,
    Typography,
    Card,
    CardContent,
    IconButton,
    Chip,
    Avatar,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextareaAutosize,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Fade,
    Stack,
    Button,
    AvatarGroup,
    Tooltip,
    InputAdornment,
    TextField,
    Select,
    FormControl,
    InputLabel,
    ToggleButtonGroup,
    ToggleButton,
    keyframes,
    Link
} from '@mui/material';
import {
    DragIndicator,
    CalendarToday,
    MoreVert,
    CheckCircle,
    CalendarMonth,
    Visibility,
    Delete,
    Add as AddIcon,
    Close,
    Celebration,
    SentimentVeryDissatisfied,
    EmojiEvents,
    Source,
    People,
    FilterList,
    Search,
    ArrowDropDown,
    ArrowDropUp
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import confetti from 'canvas-confetti';
import { MyButton } from '../../../../ui-components/Buttons/Buttons';
import { API_BASE_URL } from '../../../../utils';
import { CustomChip } from '../../../../ui-components/Chip/Chip';
import FollowUpForm from '../form/FollowUpForm';
import ConvertCustomer from '../form/convertcutomer';
import { MySnackbar } from '../../../../ui-components/Snackbar/Snackbar';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import userContext from '../../../../UseContext/UseContext';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

interface LeadStatus {
    _id: string;
    statusName: string;
    color?: string;
    [key: string]: any;
}

interface Lead {
    _id: string;
    LeadId: string;
    assignTo: { firstname: string; lastname: string; email?: string; Profile?: string };
    createdAt: string;
    description: string;
    manualData: any;
    leadsource: string;
    followUps: any[];
    leadstatus: LeadStatus;
    [key: string]: any;
}

interface TaskManagementProps {
    leads: { leads: Lead[] };
    setLeads: any;
    leadStatus: any;
}

type Severity = 'error' | 'warning' | 'info' | 'success';
const COLUMN_WIDTH = 250;

const priorityOptions = [
    { value: 'high', label: 'High', color: '#d50000' },
    { value: 'medium', label: 'Medium', color: '#ff9800' },
    { value: 'low', label: 'Low', color: '#33691e' }
];

const followUpStatusOptions = [
    { value: 'scheduled', label: 'Scheduled', color: '#4285F4' },
    { value: 'completed', label: 'Completed', color: '#0F9D58' },
    { value: 'pending', label: 'Pending', color: '#DB4437' },
    { value: 'rescheduled', label: 'Rescheduled', color: '#FF6D00' }
];

const motivationalMessages = ['Better luck next time!', "Every 'no' brings you closer to 'yes'", 'This setback is just setup for a comeback', 'The comeback is always stronger than the setback', 'Learn from this and come back stronger'];

const TaskManagement: React.FC<TaskManagementProps> = ({ leads, leadStatus, setLeads }) => {
    const { leadscon } = useContext<any>(userContext);
    const [leadData, setLeadData] = useState<Lead[]>(leads?.leads || []);
    const [filteredLeadData, setFilteredLeadData] = useState<Lead[]>(leads?.leads || []);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [loading, setLoading] = useState(false);
    const [openFollowUpForm, setOpenFollowUpForm] = useState(false);
    const [error, setError] = useState('');
    const [leadStatuses, setLeadStatuses] = useState<{ [key: string]: LeadStatus }>({});
    const [noteDialogOpen, setNoteDialogOpen] = useState(false);
    const [note, setNote] = useState('');
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedLeadId, setSelectedLeadId] = useState<any | null>(null);
    const [showWonAnimation, setShowWonAnimation] = useState(false);
    const [showLostAnimation, setShowLostAnimation] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>('success');
    const [currentMessage, setCurrentMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [isConvertFormVisible, setConvertFormVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [priorityFilter, setPriorityFilter] = useState<string>('');
    const [followUpStatusFilter, setFollowUpStatusFilter] = useState<string>('');
    const [showFilters, setShowFilters] = useState(false);
    const [animateBell, setAnimateBell] = useState(true);

    const accessToken = Cookies.get('crmaccess');
    const subdomain = Cookies.get('subdomain');
    const handlePriorityChange = (event, newPriority) => {
        if (newPriority !== null) {
            setPriorityFilter(newPriority);
        }
    };
    // Apply filters whenever they change
    useEffect(() => {
        let filtered = leadData;

        if (searchTerm) {
            filtered = filtered.filter(
                (lead) =>
                    lead.manualData?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    lead.manualData?.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    lead.manualData?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    lead.LeadId?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (priorityFilter) {
            filtered = filtered.filter((lead) => lead.followUps?.slice(-1)[0]?.priority === priorityFilter);
        }

        if (followUpStatusFilter) {
            filtered = filtered.filter((lead) => lead.followUps?.slice(-1)[0]?.status?.StatusName?.toLowerCase() === followUpStatusFilter);
        }

        setFilteredLeadData(filtered);
    }, [leadData, searchTerm, priorityFilter, followUpStatusFilter]);

    const runConfetti = () => {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            spread: 100,
            startVelocity: 55
        };

        function fire(particleRatio: number, opts: confetti.Options) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
            angle: 60,
            decay: 0.9,
            scalar: 1.2
        });
        fire(0.2, {
            spread: 60,
            angle: 120,
            decay: 0.9,
            scalar: 1.2
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.3
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
            scalar: 1.4
        });
    };

    const fetchData = useCallback(
        async (url, setData) => {
            try {
                const headers = { Authorization: `Bearer ${accessToken}` };
                const response = await axios.get(`${API_BASE_URL}${url}`, { headers });
                setData(response.data.data);
            } catch (error) {
                console.error(`Error fetching data from ${url}. Please try again.`, error);
            }
        },
        [accessToken]
    );

    const fetchProjects = useCallback(async () => {
        await fetchData(`/user/${subdomain}`, (data) => setUsers(data.users || []));
    }, [fetchData, subdomain]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const UsersOptions = useMemo(
        () =>
            users.map((user) => ({
                label: user?.firstname,
                value: user?._id
            })),
        [users]
    );

    useEffect(() => {
        if (showWonAnimation) {
            runConfetti();
            const timer = setTimeout(() => {
                setShowWonAnimation(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showWonAnimation]);

    useEffect(() => {
        if (showLostAnimation) {
            setCurrentMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
            const timer = setTimeout(() => {
                setShowLostAnimation(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showLostAnimation]);

    useEffect(() => {
        if (leads?.leads) {
            setLeadData(leads.leads);
            setFilteredLeadData(leads.leads);
        }
    }, [leads]);

    useEffect(() => {
        if (leadStatus) {
            const statusObj: { [key: string]: LeadStatus } = {};
            Object.values(leadStatus).forEach((s: any) => {
                statusObj[s._id] = s;
            });
            setLeadStatuses(statusObj);
        }
    }, [leadStatus]);

    const updateLeadStatus = async (leadId: string, newStatusId: string, leadIdValue: string) => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            };
            const response = await axios.patch(`${API_BASE_URL}/lead/update-lead-status/${subdomain}/${leadIdValue}`, { leadstatusid: newStatusId }, { headers });
            if (response.data.success) {
                const LeadsId = response?.data?.data?.leadId;
                const leadExists = leadscon.some((lead) => lead.LeadId === LeadsId);
                const updatedLeads = leadExists ? leadscon.map((lead) => (lead.LeadId === LeadsId ? LeadsId : lead)) : [...leadscon, LeadsId];
                setLeads(updatedLeads);
            }
        } catch (error) {
            console.error('Error updating lead status:', error);
        }
    };

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const { source, destination, draggableId } = result;

        const startColumn = leadStatuses[source.droppableId];
        const finishColumn = leadStatuses[destination.droppableId];

        if (!startColumn || !finishColumn) return;

        const isWon = finishColumn.statusName.toLowerCase().includes('won');
        const isLost = finishColumn.statusName.toLowerCase().includes('lost');

        if (startColumn._id === finishColumn._id) {
            return;
        }

        const updatedLeadData = leadData.map((lead) => {
            if (lead._id === draggableId) {
                return {
                    ...lead,
                    leadstatus: finishColumn
                };
            }
            return lead;
        });

        setLeadData(updatedLeadData);
        setFilteredLeadData(updatedLeadData);
        setSelectedLead(updatedLeadData.find((lead) => lead._id === draggableId));
        setNoteDialogOpen(true);
        await updateLeadStatus(draggableId, destination.droppableId, updatedLeadData.find((lead) => lead._id === draggableId).LeadId);

        if (isWon) {
            setShowWonAnimation(true);
        } else if (isLost) {
            setShowLostAnimation(true);
        }
    };

    const handleNoteSubmit = () => {
        setNoteDialogOpen(false);
        setNote('');
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, leadId: any) => {
        setAnchorEl(event.currentTarget);
        setSelectedLeadId(leadId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedLeadId(null);
    };

    const handleLeadClick = (lead: Lead) => {
        setSelectedLead(lead);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setPriorityFilter('');
        setFollowUpStatusFilter('');
        setFilteredLeadData(leadData);
    };

    // Optimized bell animation
    const ringAnimation = keyframes`
      0% { transform: rotate(0); }
      10% { transform: rotate(10deg); }
      20% { transform: rotate(-10deg); }
      30% { transform: rotate(10deg); }
      40% { transform: rotate(-10deg); }
      50% { transform: rotate(5deg); }
      60% { transform: rotate(-5deg); }
      70% { transform: rotate(2deg); }
      80% { transform: rotate(-2deg); }
      90% { transform: rotate(1deg); }
      100% { transform: rotate(0); }
    `;

    // Scroll animation
    const scrollIn = keyframes`
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    const renderLeadStatusColumn = (status: LeadStatus) => {
        const leadsInStatus = filteredLeadData.filter((lead) => lead?.leadstatus?._id === status?._id);

        return (
            <Box
                key={status._id}
                sx={{
                    minWidth: COLUMN_WIDTH,
                    maxWidth: COLUMN_WIDTH,
                    flex: '0 0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: '#fffff',
                    borderRadius: 2,
                    border: '1px solid #e0e3e8',
                    boxShadow: 1,
                    position: 'relative',
                    // mt: ,
                    background: 'white'
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        px: 2,
                        py: 1.5,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8
                    }}
                >
                    <CustomChip
                        status={{
                            hexcolor: status?.color,
                            statusName: status?.statusName || 'null'
                        }}
                    />
                    <Chip
                        label={leadsInStatus.length}
                        size="small"
                        sx={{
                            ml: 'auto',
                            bgcolor: 'gray.200',
                            color: '#1967d2',
                            height: 25,
                            width: 25,
                            fontWeight: 600,
                            borderRadius: '50%'
                        }}
                    />
                </Box>

                <Droppable droppableId={status._id}>
                    {(provided, snapshot) => (
                        <Box
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            sx={{
                                flex: 1,
                                overflowY: 'auto',
                                p: 2,
                                minHeight: 120,
                                bgcolor: snapshot.isDraggingOver ? '#f0f0f0' : 'transparent',
                                transition: 'background-color 0.2s ease'
                            }}
                        >
                            <Stack spacing={2}>
                                {leadsInStatus.map((lead, index) => (
                                    <Draggable key={lead._id} draggableId={lead._id} index={index}>
                                        {(provided, snapshot) => (
                                            <Card
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                onClick={() => handleLeadClick(lead)}
                                                sx={{
                                                    height: 158,
                                                    cursor: 'pointer',
                                                    border: '1px solid #eaeef2',
                                                    borderRadius: '8px',
                                                    background: '#ffffff',
                                                    boxShadow: 'none',
                                                    transition: 'all 0.2s ease',
                                                    position: 'relative',
                                                    '&:hover': {
                                                        borderColor: '#c2c8d0',
                                                        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                                                        transform: 'translateY(-1px)'
                                                    },
                                                    ...(snapshot.isDragging && {
                                                        borderColor: '#4a90e2',
                                                        boxShadow: '0 4px 12px rgba(74,144,226,0.2)',
                                                        transform: 'rotate(1deg)'
                                                    })
                                                }}
                                            >
                                                <CardContent
                                                    sx={{
                                                        p: '10px 12px',
                                                        height: '100%',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        '&:last-child': { pb: '10px' }
                                                    }}
                                                >
                                                    {/* Header - Name and Menu */}
                                                    <Box display="flex" alignItems="center" mb="6px">
                                                        <DragIndicator
                                                            sx={{
                                                                color: '#d5d9e0',
                                                                fontSize: '18px',
                                                                mr: '8px'
                                                            }}
                                                        />
                                                        <Typography
                                                            variant="h3"
                                                            fontWeight="600"
                                                            sx={{
                                                                flex: 1,
                                                                whiteSpace: 'nowrap',
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                color: '#2d3748'
                                                            }}
                                                        >
                                                            {lead?.manualData?.name || 'New Lead'}
                                                        </Typography>
                                                        {lead?.followUps?.slice(-1)[0]?.dateTime && (
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, position: 'absolute', right: '40px', top: '10px' }}>
                                                                <Tooltip title={new Date(lead?.followUps?.slice(-1)[0]?.dateTime).toLocaleString()}>
                                                                    <NotificationsActiveIcon
                                                                        fontSize="small"
                                                                        sx={{
                                                                            color: '#f57c00',
                                                                            animation: animateBell ? `${ringAnimation} 0.5s ease-in-out 2` : 'none',
                                                                            transformOrigin: 'top center'
                                                                        }}
                                                                    />
                                                                </Tooltip>
                                                            </Box>
                                                        )}

                                                        <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                                                            <IconButton
                                                                size="small"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleMenuOpen(e, lead);
                                                                }}
                                                                sx={{
                                                                    ml: 'auto',
                                                                    p: '4px',
                                                                    color: '#a0aec0',
                                                                    backgroundColor: '#abb4c245',
                                                                    '&:hover': {
                                                                        color: '#718096',
                                                                        background: 'transparent'
                                                                    }
                                                                }}
                                                                // sx={{ backgroundColor: '#abb4c245', '&:hover': { backgroundColor: 'transparent' } }}
                                                            >
                                                                <MoreVert fontSize="small" />
                                                            </IconButton>
                                                        </Box>
                                                    </Box>

                                                    {/* Status Indicators */}

                                                    {/* Contact Info */}
                                                    <Box mb="8px">
                                                        <Box display="flex" alignItems="center" mb="4px">
                                                            <ApartmentIcon
                                                                sx={{
                                                                    fontSize: '16px',
                                                                    color: '#a0aec0',
                                                                    mr: '8px',
                                                                    flexShrink: 0
                                                                }}
                                                            />
                                                            <Typography
                                                                variant="h3"
                                                                sx={{
                                                                    whiteSpace: 'nowrap',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    // fontSize: '0.75rem',
                                                                    color: '#4a5568'
                                                                }}
                                                            >
                                                                {lead?.manualData?.company || 'No company'} <Chip label={lead.leadsource} size="small" sx={{ fontSize: '10px' }} />
                                                            </Typography>
                                                        </Box>
                                                        <Box display="flex" alignItems="center">
                                                            <EmailIcon
                                                                sx={{
                                                                    fontSize: '16px',
                                                                    color: '#a0aec0',
                                                                    mr: '8px',
                                                                    flexShrink: 0
                                                                }}
                                                            />
                                                            <Typography
                                                                component={Link}
                                                                href={`mailto:${lead?.manualData?.email}`}
                                                                variant="body2"
                                                                sx={{
                                                                    whiteSpace: 'nowrap',
                                                                    overflow: 'hidden',
                                                                    textOverflow: 'ellipsis',
                                                                    fontSize: '0.75rem',
                                                                    color: '#4a5568'
                                                                }}
                                                            >
                                                                {lead?.manualData?.email || 'No email'}
                                                            </Typography>
                                                        </Box>
                                                    </Box>

                                                    {/* Footer */}
                                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                                        <Box display="flex" alignItems="center">
                                                            <CalendarToday
                                                                sx={{
                                                                    fontSize: '14px',
                                                                    color: '#cbd5e0',
                                                                    mr: '6px'
                                                                }}
                                                            />
                                                            <Typography
                                                                component={Link}
                                                                href={`tel:${lead?.manualData?.mobileNo}`}
                                                                variant="caption"
                                                                sx={{
                                                                    fontSize: '0.7rem',
                                                                    color: '#718096',
                                                                    '&hover': {
                                                                        // textDecoration: 'underline',
                                                                        color: 'primary.main'
                                                                    }
                                                                }}
                                                            >
                                                                {console.log(lead, 'lead')}
                                                                {lead?.manualData?.mobileNo || '-'}
                                                            </Typography>
                                                        </Box>

                                                        <Tooltip title={lead?.assignTo?.firstname ? `${lead.assignTo.firstname} ${lead.assignTo.lastname || ''}` : 'Unassigned'}>
                                                            <Avatar
                                                                sx={{
                                                                    width: 24,
                                                                    height: 24,
                                                                    fontSize: '0.7rem',
                                                                    bgcolor: lead?.assignTo?.Profile ? 'transparent' : '#e2e8f0',
                                                                    color: '#4a5568'
                                                                }}
                                                                src={lead?.assignTo?.Profile}
                                                            >
                                                                {lead?.assignTo?.firstname?.charAt(0)}
                                                                {lead?.assignTo?.lastname?.charAt(0)}
                                                            </Avatar>
                                                        </Tooltip>
                                                    </Box>
                                                    <Box display="flex" gap="6px" mb="8px">
                                                        {lead?.followUps?.slice(-1)[0]?.status?.StatusName && (
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <Box
                                                                    sx={{
                                                                        width: 8,
                                                                        height: 8,
                                                                        borderRadius: '50%',
                                                                        backgroundColor: `${lead?.followUps?.slice(-1)[0]?.status?.color || '#4285F4'}`
                                                                    }}
                                                                />
                                                                <Typography
                                                                    variant="body2"
                                                                    sx={{
                                                                        textTransform: 'capitalize',
                                                                        color: `${lead?.followUps?.slice(-1)[0]?.status?.color || '#4285F4'}`
                                                                    }}
                                                                >
                                                                    {lead?.followUps?.slice(-1)[0]?.status?.StatusName || 'Not Followed'}
                                                                </Typography>
                                                            </Box>
                                                        )}

                                                        {/* Priority */}
                                                        {lead?.followUps?.slice(-1)[0]?.priority && (
                                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                                <Box
                                                                    sx={{
                                                                        width: 8,
                                                                        height: 8,
                                                                        borderRadius: '50%',
                                                                        backgroundColor:
                                                                            lead?.followUps?.slice(-1)[0]?.priority === 'medium'
                                                                                ? '#ff9800'
                                                                                : lead?.followUps?.slice(-1)[0]?.priority === 'high'
                                                                                ? '#d50000'
                                                                                : lead?.followUps?.slice(-1)[0]?.priority === 'low'
                                                                                ? '#33691e'
                                                                                : '#4caf50'
                                                                    }}
                                                                />
                                                                <Typography
                                                                    variant="body2"
                                                                    style={{
                                                                        color:
                                                                            lead?.followUps?.slice(-1)[0]?.priority === 'medium'
                                                                                ? '#ff9800'
                                                                                : lead?.followUps?.slice(-1)[0]?.priority === 'high'
                                                                                ? '#d50000'
                                                                                : lead?.followUps?.slice(-1)[0]?.priority === 'low'
                                                                                ? '#33691e'
                                                                                : '#4caf50',
                                                                        textTransform: 'capitalize'
                                                                    }}
                                                                >
                                                                    {lead?.followUps?.slice(-1)[0]?.priority || 'Not Followed'}
                                                                </Typography>
                                                            </Box>
                                                        )}
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                {leadsInStatus.length === 0 && (
                                    <>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: 80,
                                                color: '#b6b9be',
                                                border: '1px dashed #e0e3e8',
                                                borderRadius: 1
                                            }}
                                        >
                                            <Typography variant="caption">Drop leads here</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <MyButton variant="contained" size="small" startIcon={<AddIcon />} onClick={() => (window.location.href = `/${subdomain}/leads/create`)}>
                                                New
                                            </MyButton>
                                        </Box>
                                    </>
                                )}
                            </Stack>
                        </Box>
                    )}
                </Droppable>
            </Box>
        );
    };

    const renderLeadDetails = () => {
        if (!selectedLead) return null;

        const { LeadId, assignTo, createdAt, description, manualData, leadsource, leadstatus } = selectedLead;

        return (
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    width: 400,
                    height: '100vh',
                    bgcolor: '#fff',
                    boxShadow: '-4px 0 24px 0 rgba(60,64,67,0.15)',
                    zIndex: 1200,
                    p: 3,
                    overflowY: 'auto'
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight={500}>
                        Lead Details
                    </Typography>
                    <IconButton onClick={() => setSelectedLead(null)}>
                        <Close />
                    </IconButton>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={2}>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Lead ID
                        </Typography>
                        <Chip
                            label={LeadId}
                            sx={{
                                bgcolor: '#f1f3f4',
                                color: '#3c4043',
                                fontWeight: 500,
                                mt: 0.5
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Status
                        </Typography>
                        <Chip
                            label={leadstatus.statusName}
                            sx={{
                                bgcolor: `#${leadstatus.color || '4285F4'}22`,
                                color: `#${leadstatus.color || '4285F4'}`,
                                fontWeight: 500,
                                mt: 0.5
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Company
                        </Typography>
                        <Typography variant="body2">{manualData.company}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Assigned To
                        </Typography>
                        <Typography variant="body2">
                            {assignTo?.firstname} {assignTo?.lastname}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Created At
                        </Typography>
                        <Typography variant="body2">{new Date(createdAt).toLocaleDateString()}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Lead Source
                        </Typography>
                        <Typography variant="body2">{leadsource}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Address
                        </Typography>
                        <Typography variant="body2">
                            {manualData?.address ? `${manualData.address.street || ''}, ${manualData.address.city || ''}, ${manualData.address.state || ''}, ${manualData.address.zipCode || ''}, ${manualData.address.country || ''}` : 'N/A'}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Description
                        </Typography>
                        <Typography variant="body2" dangerouslySetInnerHTML={{ __html: description || 'N/A' }} />
                    </Box>
                </Stack>
            </Box>
        );
    };

    return (
        <Box sx={{ p: 0, bgcolor: '', minHeight: '100vh', position: 'relative' }}>
            {showWonAnimation && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                        pointerEvents: 'none'
                    }}
                >
                    <Fade in={showWonAnimation} timeout={500}>
                        <Box textAlign="center">
                            <EmojiEvents sx={{ fontSize: 120, color: 'gold', mb: 2 }} />
                            <Typography variant="h4" sx={{ color: 'gold', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                                CONGRATULATIONS!
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'white', mt: 1, textShadow: '0 0 5px rgba(0,0,0,0.8)' }}>
                                Deal Closed Successfully!
                            </Typography>
                        </Box>
                    </Fade>
                </Box>
            )}

            {showLostAnimation && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                        pointerEvents: 'none',
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    }}
                >
                    <Fade in={showLostAnimation} timeout={500}>
                        <Box textAlign="center">
                            <SentimentVeryDissatisfied sx={{ fontSize: 120, color: 'white', mb: 2 }} />
                            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                                OPPORTUNITY LOST
                            </Typography>
                            <Typography variant="h5" sx={{ color: 'white', mt: 2, maxWidth: '80%', mx: 'auto' }}>
                                {currentMessage}
                            </Typography>
                        </Box>
                    </Fade>
                </Box>
            )}

            {/* Header with search and filters */}
            <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Filter panel */}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                    {/* <FormControl size="small" sx={{ minWidth: 180 }}>
                        <InputLabel>Priority</InputLabel>
                        <Select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} label="Priority" sx={{ borderRadius: 1 }}>
                            <MenuItem value="">All Priorities</MenuItem>
                            {priorityOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box
                                            sx={{
                                                width: 10,
                                                height: 10,
                                                borderRadius: '50%',
                                                backgroundColor: option.color,
                                                mr: 1
                                            }}
                                        />
                                        {option.label}
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                            Priority
                        </Typography>
                        <Box sx={{ border: '1px solid #e0e3e8', borderRadius: 1, display: 'flex', alignItems: 'center', padding: '2px 4px' }}>
                            <ToggleButtonGroup
                                value={priorityFilter}
                                onChange={handlePriorityChange}
                                exclusive
                                aria-label="Priority filter"
                                sx={{
                                    '& .MuiToggleButton-root': {
                                        textTransform: 'none',
                                        border: 'none',
                                        '&.Mui-selected': {
                                            backgroundColor: 'primary.main',
                                            color: 'white',
                                            borderRadius: 1
                                        }
                                    }
                                }}
                            >
                                {priorityOptions.map((option) => (
                                    <ToggleButton size="small" key={option.value} value={option.value} aria-label={option.label} sx={{ border: 'none' }}>
                                        {/* {option.value && option.color && (
                                        <Box
                                            component="span"
                                            sx={{
                                                width: 10,
                                                height: 10,
                                                borderRadius: '50%',
                                                backgroundColor: option.color,
                                                mr: 1
                                            }}
                                        />
                                    )} */}
                                        {option.label}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </Box>
                    </Box>
                    <FormControl size="small" sx={{ minWidth: 180 }}>
                        <InputLabel>Follow-up Status</InputLabel>
                        <Select value={followUpStatusFilter} onChange={(e) => setFollowUpStatusFilter(e.target.value)} label="Follow-up Status" sx={{ borderRadius: 1 }}>
                            <MenuItem value="">All Statuses</MenuItem>
                            {followUpStatusOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box
                                            sx={{
                                                width: 10,
                                                height: 10,
                                                borderRadius: '50%',
                                                backgroundColor: option.color,
                                                mr: 1
                                            }}
                                        />
                                        {option.label}
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button variant="text" onClick={clearFilters} sx={{ ml: 'auto' }}>
                        Clear Filters
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TextField
                        placeholder="Search leads..."
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: 2, width: 250 }
                        }}
                    />
                </Box>
            </Box>

            <DragDropContext onDragEnd={handleDragEnd}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        overflowX: 'auto',
                        gap: 2,
                        height: 'calc(100vh - 120px)',
                        p: 2,
                        '&::-webkit-scrollbar': {
                            height: 8
                        },
                        '&::-webkit-scrollbar-track': {
                            background: '#f1f1f1',
                            borderRadius: 4
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: '#888',
                            borderRadius: 4
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#555'
                        }
                    }}
                >
                    {Object.values(leadStatuses).map((status) => renderLeadStatusColumn(status))}
                </Box>
            </DragDropContext>

            {selectedLead && renderLeadDetails()}

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
                PaperProps={{
                    sx: {
                        boxShadow: 3,
                        borderRadius: 2,
                        minWidth: 200
                    }
                }}
            >
                <MenuItem onClick={() => setOpenFollowUpForm(true)}>
                    <ListItemIcon>
                        <CheckCircle fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Add Follow-Up" />
                </MenuItem>
                <MenuItem onClick={() => (window.location.href = `/${subdomain}/leads/${selectedLeadId?.LeadId}`)}>
                    <ListItemIcon>
                        <Visibility fontSize="small" color="info" />
                    </ListItemIcon>
                    <ListItemText primary="View Lead" />
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => setConvertFormVisible(true)}>
                    <ListItemIcon>
                        <People fontSize="small" color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Convert Customer" />
                </MenuItem>
            </Menu>

            <Dialog open={isConvertFormVisible} onClose={() => setConvertFormVisible(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Convert Customer</DialogTitle>
                <DialogContent>
                    <ConvertCustomer currentLead={selectedLeadId} convertid={selectedLeadId} setConvertFormVisible={setConvertFormVisible} leadStatus={selectedLeadId?.leadstatus} />
                </DialogContent>
            </Dialog>

            <FollowUpForm
                open={openFollowUpForm}
                UsersOptions={UsersOptions}
                onOpenChange={setOpenFollowUpForm}
                leadId={selectedLeadId?.LeadId}
                setSnackbarOpen={setSnackbarOpen}
                setLeads={''}
                followUp={''}
                setSnackbarSeverity={setSnackbarSeverity}
                setSnackbarMessage={setSnackbarMessage}
                handleMenuClose={() => setOpenFollowUpForm(false)}
            />

            <MySnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} position={{ vertical: 'top', horizontal: 'right' }} onClose={() => setSnackbarOpen(false)} />
        </Box>
    );
};

export default TaskManagement;
