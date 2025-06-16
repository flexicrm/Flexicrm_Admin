'use client';
import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Box, Typography, Dialog, DialogTitle, DialogContent, MenuItem, Button, InputAdornment, TextField, Select, FormControl, InputLabel, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import { DragDropContext } from '@hello-pangea/dnd';
import { API_BASE_URL } from '../../../../utils';
import FollowUpForm from '../form/FollowUpForm';
import ConvertCustomer from '../form/convertcutomer';
import { MySnackbar } from '../../../../ui-components/Snackbar/Snackbar';
import userContext from '../../../../UseContext/UseContext';
import { useRouter } from 'next/navigation';
import LeadDetails from './LeadDetails';
import ShowWonAnimation from '../../../../ui-components/RunConfetti/showWonAnimation';
import ShowLostAnimation from '../../../../ui-components/motivational/ShowLostAnimation';
import { Lead, LeadStatus, Severity, TaskManagementProps } from '../../../../type/kanban';
import { runConfetti } from '../../../../ui-components/RunConfetti/RunConfetti';
import { motivationalMessages } from '../../../../ui-components/motivational/motivationalMessages';
import Menus from '../../../../ui-components/Menu/menu';
import StatusColumn from './StatusColumn';
import useFollowupStatusOptions from '../Dropdownapi/FollowupstatusDropdown';

const COLUMN_WIDTH = 250;

const priorityOptions = [
    { value: 'high', label: 'High', color: '#d50000' },
    { value: 'medium', label: 'Medium', color: '#ff9800' },
    { value: 'low', label: 'Low', color: '#33691e' }
];

const TaskManagement: React.FC<TaskManagementProps> = ({ leads, leadStatus, setLeads }) => {
    const { leadscon } = useContext<any>(userContext);
    const [leadData, setLeadData] = useState<Lead[]>(leads?.leads || []);
    const [filteredLeadData, setFilteredLeadData] = useState<Lead[]>(leads?.leads || []);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [leadsDetails, setLeadsDetails] = useState<boolean>(false);
    const [openFollowUpForm, setOpenFollowUpForm] = useState(false);
    const [leadStatuses, setLeadStatuses] = useState<{ [key: string]: LeadStatus }>({});
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
    const [animateBell, setAnimateBell] = useState(true);
    const router = useRouter();
    const accessToken = Cookies.get('crmaccess');
    const subdomain = Cookies.get('subdomain');
    const handlePriorityChange = (event, newPriority) => {
        if (newPriority !== null) {
            setPriorityFilter(newPriority);
        }
    };
    const FollowupsData = useFollowupStatusOptions();
    const followUpStatusOptions = FollowupsData;
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

        setLeadsDetails(true);
        setSelectedLead(updatedLeadData.find((lead) => lead._id === draggableId));
        await updateLeadStatus(draggableId, destination.droppableId, updatedLeadData.find((lead) => lead._id === draggableId).LeadId);

        if (isWon) {
            setShowWonAnimation(true);
        } else if (isLost) {
            setShowLostAnimation(true);
        }
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

    return (
        <Box sx={{ p: 0, position: 'relative' }}>
            {showWonAnimation && <ShowWonAnimation showWonAnimation={showWonAnimation} />}

            {showLostAnimation && <ShowLostAnimation showLostAnimation={showLostAnimation} currentMessage={currentMessage} />}

            {/* Header with search and filters */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Filter panel */}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="h6" color="primary" sx={{ fontWeight: 500, fontSize: '1rem' }}>
                            Priority
                        </Typography>
                        <Box sx={{ border: '1px solid #e0e3e8', borderRadius: 1, display: 'flex', alignItems: 'center' }}>
                            <ToggleButtonGroup
                                value={priorityFilter}
                                onChange={handlePriorityChange}
                                exclusive
                                aria-label="Priority filter"
                                sx={{
                                    '& .MuiToggleButton-root': {
                                        textTransform: 'none',
                                        border: 'none',
                                        padding: '8px',
                                        margin: '3px',

                                        '&.Mui-selected': {
                                            backgroundColor: 'primary.main',
                                            color: 'white',
                                            borderRadius: 1
                                        }
                                    }
                                }}
                            >
                                {priorityOptions.map((option) => (
                                    <ToggleButton size="small" key={option.value} value={option.value} aria-label={option.label} sx={{ border: 'none', padding: 0, fontSize: '10px' }}>
                                        {option.label}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        </Box>
                    </Box>
                    <FormControl size="small" sx={{ minWidth: 180 }}>
                        <InputLabel>Follow up Status</InputLabel>
                        <Select value={followUpStatusFilter} onChange={(e) => setFollowUpStatusFilter(e.target.value)} label="Follow up Status" sx={{ borderRadius: 1, border: '1px solid rgba(224, 227, 232, 0.71)' }}>
                            <MenuItem value="">All Statuses</MenuItem>
                            {followUpStatusOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Box
                                            sx={{
                                                width: 10,
                                                height: 10,
                                                borderRadius: '50%',
                                                backgroundColor: option.color
                                                // mr: 1
                                            }}
                                        />
                                        {option.label}
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button variant="text" onClick={clearFilters}>
                        Clear Filters
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <TextField
                        placeholder="Search leads..."
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        // sx={{ border: '1px solid #e0e3e8' }}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                            sx: { borderRadius: 1, width: 250 }
                        }}
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    gap: 2,
                    mt: 1,

                    overflowY: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '6px'
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#888',
                        borderRadius: '3px'
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: '#555'
                    }
                }}
            >
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            overflowX: 'auto',
                            gap: 2,

                            // p: 2,
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
                            // height: 'calc(100vh - 200px)'
                        }}
                    >
                        {Object.values(leadStatuses).map((status) => (
                            <StatusColumn
                                key={status._id}
                                status={status}
                                filteredLeadData={filteredLeadData}
                                COLUMN_WIDTH={COLUMN_WIDTH}
                                handleLeadClick={handleLeadClick}
                                handleMenuOpen={handleMenuOpen}
                                animateBell={animateBell}
                                subdomain={subdomain}
                                router={router}
                            />
                        ))}
                    </Box>
                </DragDropContext>
            </Box>

            {leadsDetails && <LeadDetails selectedLead={selectedLead} setLeadsDetails={setLeadsDetails} />}

            <Menus anchorEl={anchorEl} handleMenuClose={handleMenuClose} currentLead={selectedLeadId} subdomain={subdomain} setFollowUpFormVisible={setOpenFollowUpForm} setConvertFormVisible={setConvertFormVisible}></Menus>

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
                setLeads={setLeadData}
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
