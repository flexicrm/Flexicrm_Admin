'use client';
import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Box, Dialog, DialogContent, DialogTitle, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { DragDropContext } from '@hello-pangea/dnd';
import { API_BASE_URL } from '../../../../utils';

import userContext from '../../../../UseContext/UseContext';

import FollowUpForm from '../form/FollowUpForm';
import ConvertCustomer from '../form/convertcutomer';
import { People, Visibility } from '@mui/icons-material';
import { CheckCircle } from 'lucide-react';
import ConfettiAnimation from './ConfettiAnimation';
import Filters from './Filters';
import StatusColumn from './StatusColumn';
import LeadDetails from './LeadDetails';
import LostAnimation from './LostAnimation';
import { usersSingleGET } from '../../../../../../api/user';
import { MySnackbar } from '../../../../ui-components/Snackbar/Snackbar';
import { useRouter } from 'next/navigation';

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

const TaskManagement: React.FC<TaskManagementProps> = ({ leads, leadStatus, setLeads }) => {
    const { leadscon } = useContext<any>(userContext);
    const [leadData, setLeadData] = useState<Lead[]>(leads?.leads || []);
    const [filteredLeadData, setFilteredLeadData] = useState<Lead[]>(leads?.leads || []);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [leadStatuses, setLeadStatuses] = useState<{ [key: string]: LeadStatus }>({});
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedLeadId, setSelectedLeadId] = useState<any | null>(null);
    const [showWonAnimation, setShowWonAnimation] = useState(false);
    const [showLostAnimation, setShowLostAnimation] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'error' | 'warning' | 'info' | 'success'>('success');
    const [currentMessage, setCurrentMessage] = useState('');
    const [isConvertFormVisible, setConvertFormVisible] = useState(false);
    const [openFollowUpForm, setOpenFollowUpForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [priorityFilter, setPriorityFilter] = useState<string>('');
    const [followUpStatusFilter, setFollowUpStatusFilter] = useState<string>('');
    const [users, setUsers] = useState<any>();
    const router = useRouter();
    const accessToken = Cookies.get('crmaccess');
    const subdomain = Cookies.get('subdomain');

    // Initialize lead statuses
    useEffect(() => {
        if (leadStatus) {
            const statusObj: { [key: string]: LeadStatus } = {};
            Object.values(leadStatus).forEach((s: any) => {
                statusObj[s._id] = s;
            });
            setLeadStatuses(statusObj);
        }
    }, [leadStatus]);

    const fetchProjects = async () => {
        const response = await usersSingleGET(subdomain);
        setUsers(response.data.users || []);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const UsersOptions = useMemo(
        () =>
            users?.map((user) => ({
                label: user?.firstname,
                value: user?._id
            })),
        [users]
    );
    // Update lead data when props change
    useEffect(() => {
        if (leads?.leads) {
            setLeadData(leads.leads);
            setFilteredLeadData(leads.leads);
        }
    }, [leads]);

    // Filter leads based on search and filters
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

        if (!startColumn || !finishColumn || startColumn._id === finishColumn._id) return;

        const isWon = finishColumn.statusName.toLowerCase().includes('won');
        const isLost = finishColumn.statusName.toLowerCase().includes('lost');

        const updatedLeadData = leadData.map((lead) => {
            if (lead._id === draggableId) {
                return { ...lead, leadstatus: finishColumn };
            }
            return lead;
        });

        setLeadData(updatedLeadData);
        setFilteredLeadData(updatedLeadData);
        setSelectedLead(updatedLeadData.find((lead) => lead._id === draggableId));
        await updateLeadStatus(draggableId, destination.droppableId, updatedLeadData.find((lead) => lead._id === draggableId).LeadId);

        if (isWon) setShowWonAnimation(true);
        if (isLost) setShowLostAnimation(true);
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, lead: any) => {
        setAnchorEl(event.currentTarget);
        setSelectedLeadId(lead);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedLeadId(null);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setPriorityFilter('');
        setFollowUpStatusFilter('');
    };

    return (
        <Box sx={{ p: 0, bgcolor: '#f4f6fa', minHeight: '100vh', position: 'relative' }}>
            {/* Animation Components */}
            <ConfettiAnimation show={showWonAnimation} />
            <LostAnimation show={showLostAnimation} message={currentMessage} setMessage={setCurrentMessage} />

            {/* Filters */}
            <Filters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                priorityFilter={priorityFilter}
                setPriorityFilter={setPriorityFilter}
                followUpStatusFilter={followUpStatusFilter}
                setFollowUpStatusFilter={setFollowUpStatusFilter}
                clearFilters={clearFilters}
            />

            {/* Drag and Drop Board */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        overflowX: 'auto',
                        gap: 2,
                        height: 'calc(100vh - 120px)',
                        p: 2,
                        scrollbarWidth: 'thin',
                        '&::-webkit-scrollbar': { height: 8 },
                        '&::-webkit-scrollbar-track': { background: '#f1f1f1', borderRadius: 4 },
                        '&::-webkit-scrollbar-thumb': { background: '#888', borderRadius: 4 },
                        '&::-webkit-scrollbar-thumb:hover': { background: '#555' }
                    }}
                >
                    {Object.values(leadStatuses).map((status) => (
                        <StatusColumn key={status._id} status={status} leads={filteredLeadData.filter((lead) => lead?.leadstatus?._id === status?._id)} onLeadClick={setSelectedLead} onMenuOpen={handleMenuOpen} subdomain={subdomain} />
                    ))}
                </Box>
            </DragDropContext>

            {/* Lead Details Panel */}
            {selectedLead && <LeadDetails lead={selectedLead} onClose={() => setSelectedLead(null)} />}

            {/* Context Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{ sx: { boxShadow: 3, borderRadius: 2, minWidth: 200 } }}
            >
                <MenuItem onClick={() => setOpenFollowUpForm(true)}>
                    <ListItemIcon>
                        <CheckCircle fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText primary="Add Follow-Up" />
                </MenuItem>
                <MenuItem onClick={() => router.push(`/${subdomain}/leads/${selectedLeadId?.LeadId}`)}>
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

            {/* Modals */}
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
