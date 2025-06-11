// 'use client';
// import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
// import { Box, Card, Typography, Divider, Paper, Avatar, ListItem, Chip, Stack, Button, Grid, Tabs, Tab, IconButton, Badge, CircularProgress, Tooltip } from '@mui/material';
// import {
//     Person as PersonIcon,
//     Phone as PhoneIcon,
//     Email as EmailIcon,
//     Business as BusinessIcon,
//     LocationOn as LocationIcon,
//     Public as WebsiteIcon,
//     Notes as NotesIcon,
//     Event as EventIcon,
//     History as HistoryIcon,
//     Edit as EditIcon,
//     Schedule as ScheduleIcon,
//     AttachFile as AttachFileIcon,
//     Add as AddIcon,
//     Search as SearchIcon,
//     ArrowBackIos as ArrowBackIosIcon,
//     Apartment as ApartmentIcon
// } from '@mui/icons-material';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import { format } from 'date-fns';
// import FollowUpForm from '../../form/FollowUpForm';
// import NoteForm from '../../form/NoteForm';
// import { FollowUpSection } from '../../LeadsView/FollowupView';
// import { GETactivity } from '../../../../../../../api/Leads';
// import Timeline from '@mui/lab/Timeline';
// import TimelineItem from '@mui/lab/TimelineItem';
// import TimelineSeparator from '@mui/lab/TimelineSeparator';
// import TimelineConnector from '@mui/lab/TimelineConnector';
// import TimelineContent from '@mui/lab/TimelineContent';
// import TimelineDot from '@mui/lab/TimelineDot';
// import { MyButton } from '../../../../../ui-components/Buttons/Buttons';
// import { MySnackbar } from '../../../../../ui-components/Snackbar/Snackbar';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { ActivityItem, Lead, LeadsActivityProps, Severity } from '../../../../../type/SingleviewLeads';
// import { LeadStatusCard } from '../LeadstatusCard';
// import { ContactInfoCard } from '../ContactInfoCard';
// import { ActivityContent } from '../ActivityContent';

// const LeadsActivity: React.FC<LeadsActivityProps> = ({ id }) => {
//     const leadId = id;
//     const [selectedTab, setSelectedTab] = useState('overview');
//     const [leadData, setLeadData] = useState<Lead | null>(null);
//     const [activities, setActivities] = useState<ActivityItem[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [openFollowUpForm, setOpenFollowUpForm] = useState(false);
//     const [openNoteForm, setOpenNoteForm] = useState(false);
//     const [users, setUsers] = useState([]);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>('success');
//     const accessToken = Cookies.get('crmaccess');
//     const subdomain = Cookies.get('subdomain');
//     const router = useRouter();
//     const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
//     console.log(leadData, 'leadData');
//     const fetchLeadData = useCallback(async () => {
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/lead/${subdomain}/${leadId}`, { headers });
//             setLeadData(response.data.data.lead);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching lead data:', error);
//             setLoading(false);
//         }
//     }, [accessToken, API_BASE_URL, subdomain, leadId]);

//     const fetchActivities = useCallback(async () => {
//         try {
//             if (leadData?._id) {
//                 const response = await GETactivity(subdomain, leadData?._id);
//                 setActivities(response.data.activities);
//             }
//         } catch (error) {
//             console.error('Error fetching activities:', error);
//         }
//     }, [subdomain, leadData?._id]);

//     useEffect(() => {
//         fetchLeadData();
//         fetchActivities();
//     }, [leadId, leadData?._id, fetchActivities, fetchLeadData]);

//     const fetchData = useCallback(
//         async (url, setData) => {
//             try {
//                 const headers = { Authorization: `Bearer ${accessToken}` };
//                 const response = await axios.get(`${API_BASE_URL}${url}`, { headers });
//                 setData(response.data.data);
//             } catch (error) {
//                 // setError(`Error fetching data from ${url}. Please try again.`);
//             }
//         },
//         [accessToken, API_BASE_URL]
//     );

//     const fetchProjects = useCallback(async () => {
//         await fetchData(`/user/${subdomain}`, (data) => setUsers(data.users || []));
//     }, [fetchData, subdomain]);

//     useEffect(() => {
//         fetchProjects();
//     }, [fetchProjects]);

//     const UsersOptions = useMemo(
//         () =>
//             users.map((user) => ({
//                 label: user?.firstname,
//                 value: user?._id
//             })),
//         [users]
//     );

//     const renderContent = () => {
//         switch (selectedTab) {
//             case 'overview':
//                 return (
//                     <Box sx={{ pr: 2 }}>
//                         <ContactInfoCard currentLead={leadData} />
//                     </Box>
//                 );
//             case 'followups':
//                 return (
//                     <Box sx={{ pr: 2 }}>
//                         <FollowUpSection setOpenFollowUpForm={setOpenFollowUpForm} setLeadData={setLeadData} currentLead={leadData} UsersOptions={UsersOptions} leadId={leadId} />
//                     </Box>
//                 );
//             case 'activity':
//                 return (
//                     <Box sx={{ pr: 2 }}>
//                         <ActivityContent initialActivities={activities} />
//                     </Box>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <Box sx={{ flexGrow: 1 }}>
//             <Box>
//                 <Link href={`/${subdomain}/leads`}>
//                     <Button variant="text" startIcon={<ArrowBackIosIcon />} sx={{ textTransform: 'none' }}>
//                         Back to Leads
//                     </Button>
//                 </Link>
//                 <Grid container>
//                     <Grid size={{ xs: 12, sm: 12, md: 8 }}>
//                         <Typography variant="h5" sx={{ fontWeight: 500, mt: 1 }}>
//                             {leadData?.manualData?.name || 'Lead Details'}
//                         </Typography>
//                         <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center' }}>
//                             <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
//                                 <ApartmentIcon sx={{ mr: 1 }} />
//                                 {leadData?.manualData?.company || 'Company'}
//                             </Box>

//                             <Divider sx={{ ml: 2 }} orientation="vertical" variant="middle" flexItem />

//                             <Chip label={leadData?.leadStatus || 'New'} color="primary" sx={{ ml: 2 }} />
//                         </Typography>
//                     </Grid>
//                 </Grid>
//             </Box>

//             <Grid container>
//                 <Grid size={{ xs: 12, sm: 12 }}>
//                     <Box sx={{ mt: 2, mb: 2 }} display="flex" justifyContent="space-between">
//                         <Grid container>
//                             <Grid size={{ sm: 12, md: 6 }}>
//                                 <Tabs
//                                     value={selectedTab}
//                                     onChange={(e, newValue) => setSelectedTab(newValue)}
//                                     scrollButtons="auto"
// sx={{
//     bgcolor: 'rgba(20, 53, 96, 0.12)',
//     borderRadius: '5px',
//     pr: 1,
//     width: 'fit-content',
//     '& .MuiTabs-indicator': {
//         display: 'none'
//     }
// }}
//                                 >
//                                     {['overview', 'followups', 'activity'].map((tab) => (
//                                         <Tab
//                                             key={tab}
//                                             label={tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
//                                             value={tab}
// sx={{
//     height: '12px',
//     width: '12px',
//     borderRadius: '8px',
//     margin: '0px',
//     marginTop: '5px',
//     marginLeft: '5px',
//     padding: '0px',
//     fontSize: '12px',
//     minHeight: '35px',
//     minWidth: '80px',
//     transition: 'all 0.3s ease',
//     '&.Mui-selected': {
//         bgcolor: 'primary.main',
//         color: 'primary.contrastText',
//         boxShadow: 1
//     },
//     '&:hover': {
//         bgcolor: 'action.hover'
//     },
//     '&.Mui-selected:hover': {
//         bgcolor: 'primary.dark'
//     }
// }}
//                                         />
//                                     ))}
//                                 </Tabs>
//                             </Grid>
//                             <Grid size={{ sm: 12, md: 6 }}>
//                                 <Box display="flex">
//                                     <Typography variant="subtitle1" sx={{ display: 'flex', justifyContent: 'end' }}>
//                                         <MyButton onClick={() => router.push(`/${subdomain}/leads/edit/${leadId}`)} variant="outlined" size="small">
//                                             Edit Lead
//                                         </MyButton>
//                                     </Typography>
//                                     {/* </Grid> */}
//                                     {/* <Grid size={{ xs: 12, sm: 12, md: 2 }}> */}

//                                     <MyButton variant="contained" size="small" onClick={() => setOpenFollowUpForm(true)}>
//                                         Schedule Follow-Up
//                                     </MyButton>
//                                 </Box>
//                             </Grid>
//                         </Grid>
//                     </Box>
//                     {loading ? (
//                         <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
//                             <Typography>Loading lead details...</Typography>
//                         </Box>
//                     ) : (
//                         <Grid container>
//                             <Grid size={{ sm: 12, md: 6 }}>{renderContent()}</Grid>
//                             <Grid size={{ sm: 12, md: 5 }}>
//                                 <Box sx={{ pr: 2 }}>
//                                     <LeadStatusCard currentLead={leadData} />
//                                 </Box>
//                             </Grid>
//                         </Grid>
//                     )}
//                 </Grid>
//                 <Grid size={{ xs: 12, sm: 5 }}>
//                     <Box sx={{ mt: 2, mb: 2 }}></Box>
//                 </Grid>
//             </Grid>
//             <FollowUpForm
//                 open={openFollowUpForm}
//                 UsersOptions={UsersOptions}
//                 onOpenChange={setOpenFollowUpForm}
//                 leadId={leadId}
//                 setSnackbarOpen={setSnackbarOpen}
//                 setLeads={setLeadData}
//                 setSnackbarSeverity={setSnackbarSeverity}
//                 setSnackbarMessage={setSnackbarMessage}
//                 // setLeads={fetchLeadData}
//                 handleMenuClose={() => setOpenFollowUpForm(false)}
//             />
//             <NoteForm open={openNoteForm} onOpenChange={setOpenNoteForm} leadId={leadData} />

//             <MySnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} position={{ vertical: 'top', horizontal: 'right' }} onClose={() => ''} />
//         </Box>
//     );
// };

// export default LeadsActivity;
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
                        <Chip label={leadData?.leadStatus || 'New'} color="primary" />
                    </Stack>
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Box alignItems="center" display="flex" justifyContent="space-between">
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

                        <Stack direction="row" spacing={1}>
                            <MyButton onClick={() => router.push(`/${subdomain}/leads/edit/${leadId}`)} variant="outlined" size="small">
                                Edit Lead
                            </MyButton>
                            <MyButton variant="contained" size="small" onClick={() => setOpenFollowUpForm(true)}>
                                Schedule Follow-Up
                            </MyButton>
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
