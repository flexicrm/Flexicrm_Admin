'use client';
import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, CircularProgress, Typography, Box, Tooltip, Grid, ToggleButton, ToggleButtonGroup, Button } from '@mui/material';
import { Add as AddIcon, TableChart as TableIcon, Dashboard as KanbanIcon } from '@mui/icons-material';
import { API_BASE_URL } from '../../../utils';
import { MyTable } from '../../../ui-components/Table/Table';
import { MySnackbar } from '../../../ui-components/Snackbar/Snackbar';
import ConvertCustomer from './form/convertcutomer';
import FollowUpForm from './form/FollowUpForm';
import { MyButton } from '../../../ui-components/Buttons/Buttons';
import DeleteDialog from '../../../ui-components/CustomiseComponent/DeleteDialog';
import { getLeads } from '../../../../../api/Leads';
import TaskManagement from './kanban/kanbanleads';
import Link from 'next/link';
import userContext from '../../../UseContext/UseContext';
import { columns } from '../../../ui-components/Table/LeadsTabelRequirement/Colums';
import LeadsData from '../../../ui-components/Table/LeadsTabelRequirement/LeadsData';
import { Lead, Severity } from '../../../type/kanban';
import Menus from '../../../ui-components/Menu/menu';
import useUsersOptions from './Dropdownapi/UsersDropdown';
import LeadstatusOptions from './Dropdownapi/LeadsStatusDropdown';
import { useTour } from '../../../Components/TourContext';
import { TOURFinsher } from '../../../../../api/tour';
import LeadsWelcomePage from '../../../ui-components/newpages/newpage';

const LeadsPage: React.FC = () => {
    const { leadscon, setLeadsCon, data, setData } = useContext<any>(userContext);
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
    const UsersOptions = useUsersOptions();
    const leadstatus = LeadstatusOptions();
    const { startTour, setSteps, tourvalues } = useTour();
    const tour = data?.isLeadTourCompleted;
    console.log(tour, 'tourvalues');

    // useEffect(() => {
    //     if (!tour) {
    //         setTimeout(() => {
    //             startTour();
    //         }, 300);
    //         console.log('checkint the leads tour untill the tour was ture conditoions------> inner function', tour);
    //         // Delay to ensure DOM is ready before starting the tour
    //     }
    //     console.log('checkint the leads tour untill the tour was ture conditoions------> outer function', tour);
    // }, []);

    // useEffect(() => {
    //     console.log('Useefect start key outer functions', tour);
    //     if (tour === false) {
    //         console.log('Tour is false. Starting tour...');
    //         setTimeout(() => {
    //             startTour();
    //         }, 300); // delay to let DOM elements render
    //     }
    //     console.log('Tour condition checked. Current value:', tour);
    // }, [tour, startTour]);
    useEffect(() => {
        if (tour === false) {
            console.log('Starting leads tour');
            // Give components time to render
            const timer = setTimeout(() => {
                startTour();
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [tour, startTour]);

    console.log(data, 'response------------> is');
    const updateTourStatus = async (status: { isDashboardTourCompleted?: boolean; isLeadTourCompleted?: boolean }) => {
        const paylod = JSON.stringify(status);

        console.log(data);
        try {
            const response = await TOURFinsher(subdomain, paylod);
            console.log(data, 'response------------> is');
            if (response) {
                // Only update if data is different
                console.log('Updating tour status with:', response?.data?.user);
                setData((prev) => (!prev?.isLeadTourCompleted === response?.data?.user?.isLeadTourCompleted ? console.log(data, 'inner new data') : console.log(response?.data?.user, 'old data')));
                setData((prev) => (!prev?.isLeadTourCompleted === response?.data?.user?.isLeadTourCompleted ? response?.data?.user : data));
            }
        } catch (error) {
            // Handle error if needed
            console.error('Failed to update tour status', error);
        }
    };

    useEffect(() => {
        if (tourvalues) {
            updateTourStatus(tourvalues);
        }
    }, [tourvalues]);

    useEffect(() => {
        console.log('useefect outer steps ', tour);
        if (tour === false || tour === undefined) {
            setSteps([
                {
                    element: '#leads-page-title',
                    intro: 'This is the Leads management section. You can view, create, or manage leads here.'
                },
                {
                    element: '#leads-view-toggle',
                    intro: 'Switch between Table and Kanban view.'
                },
                {
                    element: '#create-lead-btn',
                    intro: 'Click here to create a new lead.'
                }
                // {
                //     element: '#leads-search',
                //     intro: 'This is your Searchbar you can search the name , email , phone number , company also .'
                // },
                // {
                //     element: '#leads-filter',
                //     intro: 'This is your leads-Status Filter'
                // },
                // {
                //     element: '#leadstabel',
                //     intro: 'This is your table view showing all leads with action options.'
                // },
                // {
                //     element: '#leadsCard',
                //     intro: 'This is your Card view showing all leads with action options.'
                // },
                // {
                //     element: '#leads-BulkUpload',
                //     intro: 'This is your BulkUpload you can add with excel update the users details'
                // },
                // {
                //     element: '#leads-Export',
                //     intro: 'This is your export the Data excel or pdf.'
                // }
            ]);
        } else {
            // alert('demo');
            setSteps([]);
        }
    }, [setSteps, tour]);

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
    // const rowData = [];
    //
    // useEffect(() => {
    //     if (!tour) {
    //         startTour();
    //     }
    // }, [!tour, startTour]);

    return (
        <Box>
            <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, sm: 6 }} sx={{ margin: 'auto' }}>
                    <Typography variant="h5" color="primary" component="h1" sx={{ fontWeight: 600 }}>
                        Leads
                    </Typography>
                    {/* <Button variant="outlined" size="small" onClick={startTour} sx={{ mt: 1 }}>
                        Start Tour
                    </Button> */}
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                        <Box id="leads-view-toggle" sx={{ margin: '5px', display: { xs: 'none', md: 'block' } }}>
                            <ToggleButtonGroup color="primary" value={viewMode} exclusive onChange={handleViewModeChange} size="small">
                                <Tooltip title="Kanban">
                                    <ToggleButton value="kanban">
                                        <TableIcon sx={{ fontSize: '18px' }} />
                                    </ToggleButton>
                                </Tooltip>
                                <Tooltip title="Table">
                                    <ToggleButton value="Table">
                                        <KanbanIcon sx={{ fontSize: '18px' }} />
                                    </ToggleButton>
                                </Tooltip>
                            </ToggleButtonGroup>
                        </Box>
                        <Box  sx={{ marginBottom: { xs: 2 } }}>
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
                    {viewMode === 'kanban' ? (
                        <TaskManagement leads={leadType} leadStatus={leadstatus} setLeads={setLeads} />
                    ) : rowData.length > 0 ? (
                        <Box id="leads-table-container">
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
                        </Box>
                    ) : (
                        <Box>
                            <LeadsWelcomePage />
                        </Box>
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
