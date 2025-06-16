'use client';
import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, CircularProgress, Typography, Box, Tooltip, Grid, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Add as AddIcon, TableChart as TableIcon, Dashboard as KanbanIcon } from '@mui/icons-material';
import { API_BASE_URL } from '../../../utils';
import { MyTable } from '../../../ui-components/Table/Table';
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
import { columns } from '../../../ui-components/Table/LeadsTabelRequirement/Colums';
import LeadsData from '../../../ui-components/Table/LeadsTabelRequirement/LeadsData';
import { Lead, Severity } from '../../../type/kanban';
import Menus from '../../../ui-components/Menu/menu';
import useUsersOptions from './Dropdownapi/UsersDropdown';
import LeadstatusOptions from './Dropdownapi/LeadsStatusDropdown';

const LeadsPage: React.FC = () => {
    const { leadscon, setLeadsCon } = useContext<any>(userContext);
    const [leads, setLeads] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [leadType, setLeadType] = useState(null);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>('success');
    const [isFollowUpFormVisible, setFollowUpFormVisible] = useState(false);
    const [isConvertFormVisible, setConvertFormVisible] = useState(false);
    const [currentLead, setCurrentLead] = useState<Lead | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [leadToDelete, setLeadToDelete] = useState<string | null>(null);
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
    const leadstatus = LeadstatusOptions();
    console.log('leadStatus>>>>>>>>>>>>>>>>>>>>>>:', leadstatus);

    const fetchLeads = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getLeads(subdomain);
            setLeadsCon(response?.data?.leads);
            setLeads(response?.data?.leads.reverse() || []);
            setLeadType(response?.data);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            setLoading(false);
        }
    }, [subdomain]);
    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    const UsersOptions = useUsersOptions();
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
    const rowData = LeadsData(leadsArray);

    return (
        <Box>
            <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, sm: 6 }} sx={{ margin: 'auto' }}>
                    <Typography variant="h5" color="primary" component="h1" sx={{ fontWeight: 600 }}>
                        Leads{' '}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Box sx={{ margin: '5px', display: { xs: 'none', md: 'block', lg: 'block' } }}>
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
                        <Box sx={{ marginBottom: { xs: 2 } }}>
                            <Link href={`/${subdomain}/leads/create`}>
                                <MyButton variant="contained" color="primary" startIcon={<AddIcon />}>
                                    Lead
                                </MyButton>
                            </Link>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

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
                    <Menus anchorEl={anchorEl} handleMenuClose={handleMenuClose} subdomain={subdomain} currentLead={currentLead} setConvertFormVisible={setConvertFormVisible} setFollowUpFormVisible={setFollowUpFormVisible} />
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
        </Box>
    );
};

export default LeadsPage;
