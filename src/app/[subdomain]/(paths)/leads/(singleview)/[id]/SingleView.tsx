'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Typography, Divider, Chip, Stack, Button, Grid, Tabs, Tab, CircularProgress } from '@mui/material';
import { ArrowBackIos as ArrowBackIosIcon, Apartment as ApartmentIcon } from '@mui/icons-material';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import FollowUpForm from '../../form/FollowUpForm';
import NoteForm from '../../form/NoteForm';
import { FollowUpSection } from '../../LeadsView/FollowupView';
import { GETactivity } from '../../../../../../../api/Leads';
import { MyButton } from '../../../../../ui-components/Buttons/Buttons';
import { MySnackbar } from '../../../../../ui-components/Snackbar/Snackbar';

import { ActivityItem, Lead, LeadsActivityProps, Severity } from '../../../../../type/SingleviewLeads';
import { LeadStatusCard } from '../LeadstatusCard';
import { ContactInfoCard } from '../ContactInfoCard';
import { ActivityContent } from '../ActivityContent';
import { CustomChip } from '../../../../../ui-components/Chip/otherChip';


const LeadsActivity: React.FC<LeadsActivityProps> = ({ id }) => {
    const leadId = id;
    const [selectedTab, setSelectedTab] = useState('overview');
    const [leadData, setLeadData] = useState<Lead | null>(null);
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [openFollowUpForm, setOpenFollowUpForm] = useState(false);
    const [openNoteForm, setOpenNoteForm] = useState(false);
    const [users, setUsers] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>('success');

    const accessToken = Cookies.get('crmaccess');
    const subdomain = Cookies.get('subdomain');
    const router = useRouter();
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const fetchLeadData = useCallback(async () => {
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axios.get(`${API_BASE_URL}/lead/${subdomain}/${leadId}`, { headers });
            setLeadData(response.data.data.lead);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching lead data:', error);
            setLoading(false);
        }
    }, [accessToken, API_BASE_URL, subdomain, leadId]);

    const fetchActivities = useCallback(async () => {
        if (leadData?._id) {
            try {
                const response = await GETactivity(subdomain, leadData._id);
                setActivities(response.data.activities);
            } catch (error) {
                console.error('Error fetching activities:', error);
            }
        }
    }, [subdomain, leadData?._id]);

    useEffect(() => {
        fetchLeadData();
    }, [fetchLeadData]);

    useEffect(() => {
        fetchActivities();
    }, [leadData?._id, fetchActivities]);

    const fetchData = useCallback(
        async (url, setData) => {
            try {
                const headers = { Authorization: `Bearer ${accessToken}` };
                const response = await axios.get(`${API_BASE_URL}${url}`, { headers });
                setData(response.data.data);
            } catch (error) {
                console.error(`Error fetching data from ${url}`);
            }
        },
        [accessToken, API_BASE_URL]
    );

    const fetchUsers = useCallback(async () => {
        await fetchData(`/user/${subdomain}`, (data) => setUsers(data.users || []));
    }, [fetchData, subdomain]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const UsersOptions = useMemo(
        () =>
            users.map((user) => ({
                label: user?.firstname,
                value: user?._id
            })),
        [users]
    );

    const renderContent = () => {
        switch (selectedTab) {
            case 'overview':
                return <ContactInfoCard currentLead={leadData} />;
            case 'followups':
                return <FollowUpSection setOpenFollowUpForm={setOpenFollowUpForm} setLeadData={setLeadData} currentLead={leadData} UsersOptions={UsersOptions} leadId={leadId} />;
            case 'activity':
                return <ActivityContent initialActivities={activities} />;
            default:
                return null;
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Link href={`/${subdomain}/leads`} passHref>
                <Button variant="text" startIcon={<ArrowBackIosIcon />} sx={{ textTransform: 'none' }}>
                    Back to Leads
                </Button>
            </Link>

            <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Typography variant="h5" sx={{ fontWeight: 500 }}>
                        {leadData?.manualData?.name || 'Lead Details'}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ApartmentIcon sx={{ mr: 1 }} />
                            {leadData?.manualData?.company || 'Company'}
                        </Box>
                        <Divider orientation="vertical" flexItem />
                        <CustomChip
                            status={{
                                hexcolor: leadData?.leadstatus?.color as any,
                                statusName: leadData?.leadstatus?.statusName || '-'
                            }}
                        />
                        {/* <Chip label={leadData?.leadStatus || 'New'} color="primary" /> */}
                    </Stack>
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Box alignItems="center" flexDirection={{ xs: 'column', sm: 'row', md: 'row' }} display="flex" justifyContent="space-between">
                        <Tabs
                            value={selectedTab}
                            onChange={(e, newValue) => setSelectedTab(newValue)}
                            sx={{
                                bgcolor: 'rgba(20, 53, 96, 0.12)',
                                borderRadius: '5px',
                                pr: 1,
                                width: 'fit-content',
                                '& .MuiTabs-indicator': {
                                    display: 'none'
                                }
                            }}
                        >
                            {['overview', 'followups', 'activity'].map((tab) => (
                                <Tab
                                    key={tab}
                                    label={tab.charAt(0).toUpperCase() + tab.slice(1)}
                                    value={tab}
                                    sx={{
                                        height: '12px',
                                        width: '12px',
                                        borderRadius: '8px',
                                        margin: '0px',
                                        marginTop: '5px',
                                        marginLeft: '5px',
                                        padding: '0px',
                                        fontSize: '12px',
                                        minHeight: '35px',
                                        minWidth: '80px',
                                        transition: 'all 0.3s ease',
                                        '&.Mui-selected': {
                                            bgcolor: 'primary.main',
                                            color: 'primary.contrastText',
                                            boxShadow: 1
                                        },
                                        '&:hover': {
                                            bgcolor: 'action.hover'
                                        },
                                        '&.Mui-selected:hover': {
                                            bgcolor: 'primary.dark'
                                        }
                                    }}
                                />
                            ))}
                        </Tabs>

                        <Stack>
                            <Box sx={{ display: 'flex' }}>
                                <MyButton onClick={() => router.push(`/${subdomain}/leads/edit/${leadId}`)} variant="outlined" size="small">
                                    Edit Lead
                                </MyButton>
                                <MyButton variant="contained" size="small" onClick={() => setOpenFollowUpForm(true)}>
                                    Schedule Follow-Up
                                </MyButton>
                            </Box>
                        </Stack>
                    </Box>

                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
                            <CircularProgress size={24} />
                            <Typography sx={{ ml: 1 }}>Loading lead details...</Typography>
                        </Box>
                    ) : (
                        <Box sx={{ mt: 2 }}>{renderContent()}</Box>
                    )}
                </Grid>

                {!loading && (
                    <Grid size={{ xs: 12, md: 4 }}>
                        <LeadStatusCard currentLead={leadData} />
                    </Grid>
                )}
            </Grid>

            <FollowUpForm
                open={openFollowUpForm}
                UsersOptions={UsersOptions}
                onOpenChange={setOpenFollowUpForm}
                leadId={leadId}
                setSnackbarOpen={setSnackbarOpen}
                setLeads={setLeadData}
                setSnackbarSeverity={setSnackbarSeverity}
                setSnackbarMessage={setSnackbarMessage}
                handleMenuClose={() => setOpenFollowUpForm(false)}
            />

            <NoteForm open={openNoteForm} onOpenChange={setOpenNoteForm} leadId={leadData} />

            <MySnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} position={{ vertical: 'top', horizontal: 'right' }} onClose={() => setSnackbarOpen(false)} />
        </Box>
    );
};

export default LeadsActivity;
