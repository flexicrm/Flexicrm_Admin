// 'use client';
// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { Box, Card, Typography, Divider, Paper, Avatar, ListItem, Chip, Stack, Button, Grid, Tabs, Tab, IconButton, Badge } from '@mui/material';
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
// import { MyButton } from '../../../../../Component/Buttons/Buttons';

// // import FollowUpForm from './FollowUpForm';
// // import NoteForm from './NoteForm';

// // Interfaces
// interface User {
//     firstname?: string;
//     lastname?: string;
//     profileImage?: string;
// }

// interface ActivityItem {
//     userId?: User;
//     actionType?: string;
//     description?: string;
//     createdAt?: string;
//     timestamp?: string;
// }

// interface Address {
//     street?: string;
//     city?: string;
//     state?: string;
//     country?: string;
//     zipCode?: string;
// }

// interface ManualData {
//     email?: string;
//     mobileNo?: string;
//     company?: string;
//     address?: Address;
//     website?: string;
//     name?: string;
// }

// interface FollowUp {
//     id?: string;
//     title?: string;
//     notes: string;
//     followUpDate: string;
//     status?: 'completed' | 'pending' | 'overdue';
//     priority?: 'high' | 'medium' | 'low';
//     assignedTo?: string;
//     type?: 'call' | 'meeting' | 'email' | 'whatsapp' | 'visit' | 'other';
//     reminderSet?: boolean;
//     reminderDate?: string;
//     outcome?: string;
// }

// // interface Note {
// //     // id?: string;
// //     // content: string;
// //     // createdAt?: string;
// // }

// interface Lead {
//     LeadId?: string;
//     manualData?: ManualData;
//     leadStatus?: string;
//     leadsource?: string;
//     description?: string;
//     followUps?: FollowUp[];
//     notes?: any;
//     createdAt?: string;
//     potentialValue?: number;
//     owner?: string;
//     lastActivity?: string;
//     assignTo: any;
//     _id?: string;
// }

// interface LeadsActivityProps {
//     // leadId: string;
//     // currentLead: Lead;
//     // convertUnder: string;
//     id: any;
// }

// // Status Chip Component
// // const StatusChip: React.FC<{ status: string }> = ({ status }) => {
// //     const getStatusColor = () => {
// //         switch (status.toLowerCase()) {
// //             case 'completed':
// //                 return 'success';
// //             case 'pending':
// //                 return 'warning';
// //             case 'overdue':
// //                 return 'error';
// //             default:
// //                 return 'primary';
// //         }
// //     };

// //     return <Chip label={status} color={getStatusColor()} size="small" sx={{ textTransform: 'capitalize' }} />;
// // };

// // // Priority Chip Component
// // const PriorityChip: React.FC<{ priority: string }> = ({ priority }) => {
// //     const getPriorityColor = () => {
// //         switch (priority.toLowerCase()) {
// //             case 'high':
// //                 return 'error';
// //             case 'medium':
// //                 return 'warning';
// //             case 'low':
// //                 return 'success';
// //             default:
// //                 return 'default';
// //         }
// //     };

// //     return <Chip label={priority} color={getPriorityColor()} size="small" sx={{ textTransform: 'capitalize' }} />;
// // };

// // Sub-components
// const ContactInfoCard: React.FC<{ currentLead?: Lead }> = ({ currentLead }) => {
//     const address = currentLead?.manualData?.address;
//     const addressString = address ? `${address.city || ''}, ${address.state || ''}, ${address.country || ''}` : '';

//     return (
//         <Card variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 2 }}>
//             <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 400 }}>
//                 Contact Information
//             </Typography>

//             <Grid container spacing={2}>
//                 <Grid size={{ xs: 12, sm: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Full Name
//                     </Typography>
//                     <Typography variant="body1">{currentLead?.manualData?.name || 'Not provided'}</Typography>
//                 </Grid>

//                 <Grid size={{ xs: 12, sm: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Phone
//                     </Typography>
//                     <Typography variant="body1">{currentLead?.manualData?.mobileNo || 'Not provided'}</Typography>
//                 </Grid>

//                 <Grid size={{ xs: 12, sm: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Website
//                     </Typography>
//                     <Typography variant="body1">{currentLead?.manualData?.website || 'Not provided'}</Typography>
//                 </Grid>

//                 <Grid size={{ xs: 12, sm: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Email
//                     </Typography>
//                     <Typography variant="body1">{currentLead?.manualData?.email || 'Not provided'}</Typography>
//                 </Grid>

//                 <Grid size={{ xs: 12, sm: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Company
//                     </Typography>
//                     <Typography variant="body1">{currentLead?.manualData?.company || 'Not provided'}</Typography>
//                 </Grid>

//                 <Grid size={{ xs: 12, sm: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Location
//                     </Typography>
//                     <Typography variant="body1">{addressString || 'Not provided'}</Typography>
//                 </Grid>
//             </Grid>
//         </Card>
//     );
// };

// export const LeadStatusCard: React.FC<{ currentLead?: Lead }> = ({ currentLead }) => {
//     console.log(currentLead, 'currentLead');

//     return (
//         <Card variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 2 }}>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 400 }}>
//                 Lead Status
//             </Typography>

//             <Grid container spacing={2}>
//                 <Grid size={{ xs: 12, sm: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Current Status
//                     </Typography>
//                     <Typography variant="body1">
//                         <Chip label={currentLead?.leadStatus || 'New'} color="primary" />
//                     </Typography>
//                 </Grid>

//                 <Grid size={{ xs: 12, sm: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Potential Value
//                     </Typography>
//                     <Typography variant="body1">${currentLead?.potentialValue?.toLocaleString() || '0'}</Typography>
//                 </Grid>

//                 <Grid size={{ xs: 12, sm: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Created Date
//                     </Typography>
//                     <Typography variant="body1">{currentLead?.createdAt ? format(new Date(currentLead.createdAt), 'MMM d, yyyy') : 'N/A'}</Typography>
//                 </Grid>

//                 <Grid size={{ xs: 12, sm: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Last Activity
//                     </Typography>
//                     <Typography variant="body1">{currentLead?.lastActivity || 'Today'}</Typography>
//                 </Grid>

//                 <Grid size={{ xs: 12, sm: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Owner
//                     </Typography>
//                     <Typography variant="body1">{`${currentLead?.assignTo?.firstname} ${currentLead?.assignTo?.lastname}` || 'Unassigned'}</Typography>
//                 </Grid>
//             </Grid>

//             {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
//                 <Button
//                     variant="contained"
//                     size="small"
//                     sx={{
//                         height: '12px',
//                         // width: '12px',
//                         borderRadius: '8px',
//                         margin: '0px',
//                         marginTop: '5px',
//                         marginLeft: '5px',
//                         // padding: '0px',
//                         fontSize: '12px',
//                         minHeight: '35px',
//                         // minWidth: '80px',
//                         transition: 'all 0.3s ease',
//                         '&.Mui-selected': {
//                             bgcolor: 'primary.main',
//                             color: 'primary.contrastText',
//                             boxShadow: 1
//                         },
//                         '&:hover': {
//                             bgcolor: 'action.hover'
//                         },
//                         '&.Mui-selected:hover': {
//                             bgcolor: 'primary.dark'
//                         }
//                     }}
//                 >
//                     Update Status
//                 </Button>
//                 <Button
//                     // startIcon={<ScheduleIcon />}
//                     variant="outlined"
//                     size="small"
//                     sx={{
//                         height: '12px',
//                         width: '12px',
//                         borderRadius: '8px',
//                         margin: '0px',
//                         marginTop: '5px',
//                         marginLeft: '5px',
//                         padding: '0px',
//                         fontSize: '12px',
//                         minHeight: '35px',
//                         minWidth: '80px',
//                         transition: 'all 0.3s ease',
//                         '&.Mui-selected': {
//                             bgcolor: 'primary.main',
//                             color: 'primary.contrastText',
//                             boxShadow: 1
//                         },
//                         '&:hover': {
//                             bgcolor: 'action.hover'
//                         },
//                         '&.Mui-selected:hover': {
//                             bgcolor: 'primary.dark'
//                         }
//                     }}
//                 >
//                     Add Task
//                 </Button>
//             </Box> */}
//         </Card>
//     );
// };

// // const NotesContent: React.FC<{ currentLead: Lead }> = ({ currentLead }) => {
// //     const notes = currentLead?.notes || [];
// //     console.log(currentLead, 'currentLead');

// //     return (
// //         <Box sx={{ p: 0 }}>
// //             <Card variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 2 }}>
// //                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
// //                     <Typography variant="h6" sx={{ fontWeight: 400 }}>
// //                         Notes
// //                     </Typography>
// //                     {/* <Button startIcon={<AddIcon />} variant="contained" size="small">
// //                         Add Note
// //                     </Button> */}
// //                 </Box>

// //                 <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
// //                     Important notes and reminders about this lead
// //                 </Typography>

// //                 {notes.length > 0 ? (
// //                     <Stack spacing={2}>
// //                         {notes.map((note, idx) => (
// //                             <Card key={idx} sx={{ p: 2, borderRadius: 2 }}>
// //                                 <Typography variant="body2" sx={{ mb: 1 }}>
// //                                     {note}
// //                                 </Typography>
// //                                 <Typography variant="caption" color="text.secondary">
// //                                     {/* Created: {format(new Date(note.createdAt), 'MMM d, yyyy')} */}
// //                                 </Typography>
// //                             </Card>
// //                         ))}
// //                     </Stack>
// //                 ) : (
// //                     <Box sx={{ textAlign: 'center', py: 4 }}>
// //                         <Typography variant="body1" color="text.secondary">
// //                             No notes added yet
// //                         </Typography>
// //                     </Box>
// //                 )}
// //             </Card>
// //         </Box>
// //     );
// // };

// const ActivityContent: React.FC<{ activities: ActivityItem[] }> = ({ activities }) => {
//     return (
//         <Box sx={{ p: 0 }}>
//             {/* <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//                     <Typography variant="h6" sx={{ fontWeight: 400 }}>
//                         Activity Timeline
//                     </Typography>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Recent interactions with this lead
//                     </Typography>
//                 </Box>

//                 <Grid container>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         {activities.length > 0 ? (
//                             <Stack spacing={2}>
//                                 {activities.map((item, i) => (
//                                     <Card key={i} sx={{ p: 2, borderRadius: 2 }}>
//                                         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                                             <Typography variant="subtitle2">{item.actionType || 'Activity'}</Typography>
//                                             <Typography variant="caption" color="text.secondary">
//                                                 {item.timestamp ? format(new Date(item.timestamp), 'MMM d, yyyy') : 'N/A'}
//                                             </Typography>
//                                         </Box>
//                                         <Typography variant="body2">{item.description || 'No description'}</Typography>
//                                     </Card>
//                                 ))}
//                             </Stack>
//                         ) : (
//                             <Box sx={{ textAlign: 'center', py: 4 }}>
//                                 <Typography variant="body1" color="text.secondary">
//                                     No activities recorded yet
//                                 </Typography>
//                             </Box>
//                         )}
//                     </Grid>
//                 </Grid>
//             </Card> */}
//             <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//                     <Typography variant="h6" sx={{ fontWeight: 400 }}>
//                         Activity Timeline
//                     </Typography>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Recent interactions with this lead
//                     </Typography>
//                 </Box>

//                 <Grid container>
//                     <Grid size={{ xs: 12, sm: 12 }}>
//                         {activities.length > 0 ? (
//                             <Timeline position="alternate">
//                                 {activities.reverse().map((item, i) => (
//                                     <TimelineItem key={i}>
//                                         <TimelineSeparator>
//                                             <TimelineDot />
//                                             {i < activities.length - 1 && <TimelineConnector />}
//                                         </TimelineSeparator>
//                                         <TimelineContent>
//                                             <Card sx={{ p: 2, borderRadius: 2 }}>
//                                                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                                                     <Typography variant="subtitle2">{item.actionType || 'Activity'}</Typography>
//                                                     <Typography variant="caption" color="text.secondary">
//                                                         {item.timestamp ? format(new Date(item.timestamp), 'MMM d, yyyy') : 'N/A'}
//                                                     </Typography>
//                                                 </Box>
//                                                 <Typography variant="body2">{item.description || 'No description'}</Typography>
//                                             </Card>
//                                         </TimelineContent>
//                                     </TimelineItem>
//                                 ))}
//                             </Timeline>
//                         ) : (
//                             <Box sx={{ textAlign: 'center', py: 4 }}>
//                                 <Typography variant="body1" color="text.secondary">
//                                     No activities recorded yet
//                                 </Typography>
//                             </Box>
//                         )}
//                     </Grid>
//                 </Grid>
//             </Card>
//         </Box>
//     );
// };

// // Main Component
// const LeadsActivity: React.FC<LeadsActivityProps> = ({ id }) => {
//     const leadId = id;
//     const [selectedTab, setSelectedTab] = useState('overview');
//     const [leadData, setLeadData] = useState<Lead | null>(null);
//     const [activities, setActivities] = useState<ActivityItem[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [openFollowUpForm, setOpenFollowUpForm] = useState(false);
//     const [openNoteForm, setOpenNoteForm] = useState(false);
//     const [users, setUsers] = useState([]);
//     const accessToken = Cookies.get('accessToken');
//     const subdomain = Cookies.get('subdomain');
//     const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

//     const fetchLeadData = async () => {
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/lead/${subdomain}/${leadId}`, { headers });
//             setLeadData(response.data.data.lead);

//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching lead data:', error);
//             setLoading(false);
//         }
//     };
//     console.log(leadData?._id, 'leadData???????????????');

//     const fetchActivities = async () => {
//         try {
//             if (leadData?._id) {
//                 // const headers = { Authorization: `Bearer ${accessToken}` };
//                 const response = await GETactivity(subdomain, leadData?._id);
//                 //  await axios.get(`${API_BASE_URL}/activity/${subdomain}/${leadData?._id}`, { headers });
//                 console.log(response, 'response,');
//                 setActivities(response.data.activities);
//             }
//         } catch (error) {
//             console.error('Error fetching activities:', error);
//         }
//     };

//     useEffect(() => {
//         fetchLeadData();
//         fetchActivities();
//     }, [leadId, leadData?._id]);

//     // Fetch data functions remain the same...
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
//         [accessToken]
//     );
//     const fetchProjects = useCallback(async () => {
//         await fetchData(`/user/${subdomain}`, (data) => setUsers(data.users || []));
//     }, [fetchData, subdomain]);

//     useEffect(() => {
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
//     console.log(leadData, 'leadData????leadData');

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
//                     // <Grid size={{ xs: 12, sm: 11 }}>
//                     <Box sx={{ pr: 2 }}>
//                         <FollowUpSection currentLead={leadData} UsersOptions={UsersOptions} leadId={leadId} />
//                     </Box>
//                     // </Grid>
//                 );
//             case 'activity':
//                 return (
//                     // <Grid size={{ xs: 12, sm: 11 }}>
//                     <Box sx={{ pr: 2 }}>
//                         <ActivityContent activities={activities} />
//                     </Box>
//                     // </Grid>
//                 );
//             // case 'notes':
//             //     return (
//             //         <Grid container spacing={3}>
//             //             <Grid size={{ xs: 12, sm: 11 }}>
//             //                 <NotesContent currentLead={leadData} />
//             //             </Grid>
//             //         </Grid>
//             //     );

//             default:
//                 return null;
//         }
//     };

//     return (
//         <Box sx={{ flexGrow: 1 }}>
//             {/* Header */}
//             {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}> */}

//             {/* </Box> */}
//             <Box>
//                 <Button variant="text" startIcon={<ArrowBackIosIcon />} sx={{ textTransform: 'none' }} onClick={() => history.back()}>
//                     Back to Leads
//                 </Button>
//                 <Typography variant="h5" sx={{ fontWeight: 400, mt: 1, fontSize: '15px' }}>
//                     {leadData?.manualData?.name || 'Lead Details'}
//                 </Typography>
//                 <Typography variant="subtitle1" color="text.secondary" sx={{ display: 'flex', fontWeight: '400', justifyContent: 'space-between' }}>
//                     <Typography variant="subtitle1" sx={{ display: 'flex' }}>
//                         <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
//                             {' '}
//                             <ApartmentIcon />
//                             {leadData?.manualData?.company || 'Company'}
//                         </Typography>
//                         <Divider sx={{ ml: 2 }} orientation="vertical" variant="middle" flexItem />
//                         <Chip label={leadData?.leadStatus || 'New'} color="primary" sx={{ ml: 2 }} />
//                     </Typography>
//                     <Typography variant="subtitle1">
//                         <Typography sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
//                             <MyButton onClick={() => (window.location.href = `/${subdomain}/leads/edit/${leadId}`)} variant="outlined" size="small">
//                                 Edit Lead
//                             </MyButton>
//                             <MyButton variant="contained" size="small" onClick={() => setOpenFollowUpForm(true)}>
//                                 Schedule Follow-Up
//                             </MyButton>
//                             {/* <Button
//                                 // startIcon={<AddIcon />}
//                                 variant="contained"
//                                 size="small"
//                                 sx={{
//                                     height: '12px',
//                                     width: '12px',
//                                     borderRadius: '5px',
//                                     margin: '0px',
//                                     marginTop: '5px',
//                                     marginLeft: '5px',
//                                     padding: '0px',
//                                     fontSize: '12px',
//                                     minHeight: '35px',
//                                     minWidth: '80px',
//                                     transition: 'all 0.3s ease',
//                                     '&.Mui-selected': {
//                                         bgcolor: 'primary.main',
//                                         color: 'primary.contrastText',
//                                         boxShadow: 1
//                                     },
//                                     '&:hover': {
//                                         bgcolor: 'action.hover'
//                                     },
//                                     '&.Mui-selected:hover': {
//                                         bgcolor: 'primary.dark'
//                                     }
//                                 }}
//                                 onClick={() => setOpenNoteForm(true)}
//                             >
//                                 Add Note
//                             </Button> */}
//                         </Typography>
//                     </Typography>
//                 </Typography>
//             </Box>

//             <Grid container>
//                 <Grid size={{ xs: 12, sm: 7 }}>
//                     {/* <Grid container> */}
//                     {/* <Grid size={{ xs: 12, sm: 5 }}> */}
//                     <Box sx={{ mt: 2, mb: 2 }}>
//                         <Tabs
//                             value={selectedTab}
//                             onChange={(e, newValue) => setSelectedTab(newValue)}
//                             // variant="scrollable"
//                             scrollButtons="auto"
//                             sx={{
//                                 bgcolor: 'rgba(20, 53, 96, 0.12)',
//                                 borderRadius: '5px',
//                                 pr: 1,
//                                 width: 'fit-content',

//                                 '& .MuiTabs-indicator': {
//                                     display: 'none'
//                                 }
//                             }}
//                         >
//                             {['overview', 'followups', 'activity'].map((tab) => (
//                                 <Tab
//                                     key={tab}
//                                     label={tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
//                                     value={tab}
//                                     sx={{
//                                         height: '12px',
//                                         width: '12px',
//                                         borderRadius: '8px',
//                                         margin: '0px',
//                                         marginTop: '5px',
//                                         marginLeft: '5px',
//                                         padding: '0px',
//                                         fontSize: '12px',
//                                         minHeight: '35px',
//                                         minWidth: '80px',
//                                         transition: 'all 0.3s ease',
//                                         '&.Mui-selected': {
//                                             bgcolor: 'primary.main',
//                                             color: 'primary.contrastText',
//                                             boxShadow: 1
//                                         },
//                                         '&:hover': {
//                                             bgcolor: 'action.hover'
//                                         },
//                                         '&.Mui-selected:hover': {
//                                             bgcolor: 'primary.dark'
//                                         }
//                                     }}
//                                 />
//                             ))}
//                         </Tabs>
//                     </Box>
//                     {/* </Grid> */}
//                     {/* </Grid> */}
//                     {loading ? (
//                         <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
//                             <Typography>Loading lead details...</Typography>
//                         </Box>
//                     ) : (
//                         <>
//                             {/* <Grid container spacing={3}> */}
//                             {renderContent()}
//                             {/* </Grid> */}
//                         </>
//                     )}
//                 </Grid>
//                 <Grid size={{ xs: 12, sm: 5 }}>
//                     <Box sx={{ mt: 2, mb: 2 }}>
//                         <LeadStatusCard currentLead={leadData} />
//                     </Box>
//                 </Grid>
//             </Grid>
//             <FollowUpForm open={openFollowUpForm} UsersOptions={UsersOptions} onOpenChange={setOpenFollowUpForm} leadId={leadId} />
//             <NoteForm open={openNoteForm} onOpenChange={setOpenNoteForm} leadId={leadData} />
//         </Box>
//     );
// };

// export default LeadsActivity;
'use client';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Card, Typography, Divider, Paper, Avatar, ListItem, Chip, Stack, Button, Grid, Tabs, Tab, IconButton, Badge } from '@mui/material';
import {
    Person as PersonIcon,
    Phone as PhoneIcon,
    Email as EmailIcon,
    Business as BusinessIcon,
    LocationOn as LocationIcon,
    Public as WebsiteIcon,
    Notes as NotesIcon,
    Event as EventIcon,
    History as HistoryIcon,
    Edit as EditIcon,
    Schedule as ScheduleIcon,
    AttachFile as AttachFileIcon,
    Add as AddIcon,
    Search as SearchIcon,
    ArrowBackIos as ArrowBackIosIcon,
    Apartment as ApartmentIcon
} from '@mui/icons-material';
import Cookies from 'js-cookie';
import axios from 'axios';
import { format } from 'date-fns';
import FollowUpForm from '../../form/FollowUpForm';
import NoteForm from '../../form/NoteForm';
import { FollowUpSection } from '../../LeadsView/FollowupView';
import { GETactivity } from '../../../../../../../api/Leads';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { MyButton } from '../../../../../Component/Buttons/Buttons';

// Interfaces
interface User {
    firstname?: string;
    lastname?: string;
    profileImage?: string;
}

interface ActivityItem {
    userId?: User;
    actionType?: string;
    description?: string;
    createdAt?: string;
    timestamp?: string;
}

interface Address {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
}

interface ManualData {
    email?: string;
    mobileNo?: string;
    company?: string;
    address?: Address;
    website?: string;
    name?: string;
}

interface FollowUp {
    id?: string;
    title?: string;
    notes: string;
    followUpDate: string;
    status?: 'completed' | 'pending' | 'overdue';
    priority?: 'high' | 'medium' | 'low';
    assignedTo?: string;
    type?: 'call' | 'meeting' | 'email' | 'whatsapp' | 'visit' | 'other';
    reminderSet?: boolean;
    reminderDate?: string;
    outcome?: string;
}

interface Lead {
    LeadId?: string;
    manualData?: ManualData;
    leadStatus?: string;
    leadsource?: string;
    description?: string;
    followUps?: FollowUp[];
    notes?: any;
    createdAt?: string;
    potentialValue?: number;
    owner?: string;
    lastActivity?: string;
    assignTo: any;
    _id?: string;
}

interface LeadsActivityProps {
    id: any;
}

// Sub-components
const ContactInfoCard: React.FC<{ currentLead?: Lead }> = ({ currentLead }) => {
    const address = currentLead?.manualData?.address;
    const addressString = address ? `${address.city || ''}, ${address.state || ''}, ${address.country || ''}` : '';

    return (
        <Card variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 400 }}>
                Contact Information
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Full Name
                    </Typography>
                    <Typography variant="body1">{currentLead?.manualData?.name || 'Not provided'}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Phone
                    </Typography>
                    <Typography variant="body1">{currentLead?.manualData?.mobileNo || 'Not provided'}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Website
                    </Typography>
                    <Typography variant="body1">{currentLead?.manualData?.website || 'Not provided'}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Email
                    </Typography>
                    <Typography variant="body1">{currentLead?.manualData?.email || 'Not provided'}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Company
                    </Typography>
                    <Typography variant="body1">{currentLead?.manualData?.company || 'Not provided'}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Location
                    </Typography>
                    <Typography variant="body1">{addressString || 'Not provided'}</Typography>
                </Grid>
            </Grid>
        </Card>
    );
};

export const LeadStatusCard: React.FC<{ currentLead?: Lead }> = ({ currentLead }) => {
    return (
        <Card variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 400 }}>
                Lead Status
            </Typography>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Current Status
                    </Typography>
                    <Typography variant="body1">
                        <Chip label={currentLead?.leadStatus || 'New'} color="primary" />
                    </Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Potential Value
                    </Typography>
                    <Typography variant="body1">${currentLead?.potentialValue?.toLocaleString() || '0'}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Created Date
                    </Typography>
                    <Typography variant="body1">{currentLead?.createdAt ? format(new Date(currentLead.createdAt), 'MMM d, yyyy') : 'N/A'}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Last Activity
                    </Typography>
                    <Typography variant="body1">{currentLead?.lastActivity || 'Today'}</Typography>
                </Grid>

                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                        Owner
                    </Typography>
                    <Typography variant="body1">{`${currentLead?.assignTo?.firstname} ${currentLead?.assignTo?.lastname}` || 'Unassigned'}</Typography>
                </Grid>
            </Grid>
        </Card>
    );
};

const ActivityContent: React.FC<{ activities: ActivityItem[] }> = ({ activities }) => {
    return (
        <Box sx={{ p: 0 }}>
            <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 400 }}>
                        Activity Timeline
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        Recent interactions with this lead
                    </Typography>
                </Box>

                <Grid container>
                    <Grid size={{ xs: 12, sm: 12 }}>
                        {activities.length > 0 ? (
                            <Timeline position="alternate">
                                {activities.reverse().map((item, i) => (
                                    <TimelineItem key={i}>
                                        <TimelineSeparator>
                                            <TimelineDot />
                                            {i < activities.length - 1 && <TimelineConnector />}
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Card sx={{ p: 2, borderRadius: 2 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                    <Typography variant="subtitle2">{item.actionType || 'Activity'}</Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        {item.timestamp ? format(new Date(item.timestamp), 'MMM d, yyyy') : 'N/A'}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2">{item.description || 'No description'}</Typography>
                                            </Card>
                                        </TimelineContent>
                                    </TimelineItem>
                                ))}
                            </Timeline>
                        ) : (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <Typography variant="body1" color="text.secondary">
                                    No activities recorded yet
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
};

// Main Component
const LeadsActivity: React.FC<LeadsActivityProps> = ({ id }) => {
    const leadId = id;
    const [selectedTab, setSelectedTab] = useState('overview');
    const [leadData, setLeadData] = useState<Lead | null>(null);
    const [activities, setActivities] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [openFollowUpForm, setOpenFollowUpForm] = useState(false);
    const [openNoteForm, setOpenNoteForm] = useState(false);
    const [users, setUsers] = useState([]);
    const accessToken = Cookies.get('accessToken');
    const subdomain = Cookies.get('subdomain');
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
        try {
            if (leadData?._id) {
                const response = await GETactivity(subdomain, leadData?._id);
                setActivities(response.data.activities);
            }
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    }, [subdomain, leadData?._id]);

    useEffect(() => {
        fetchLeadData();
        fetchActivities();
    }, [leadId, leadData?._id, fetchActivities, fetchLeadData]);

    const fetchData = useCallback(
        async (url, setData) => {
            try {
                const headers = { Authorization: `Bearer ${accessToken}` };
                const response = await axios.get(`${API_BASE_URL}${url}`, { headers });
                setData(response.data.data);
            } catch (error) {
                // setError(`Error fetching data from ${url}. Please try again.`);
            }
        },
        [accessToken, API_BASE_URL]
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

    const renderContent = () => {
        switch (selectedTab) {
            case 'overview':
                return (
                    <Box sx={{ pr: 2 }}>
                        <ContactInfoCard currentLead={leadData} />
                    </Box>
                );
            case 'followups':
                return (
                    <Box sx={{ pr: 2 }}>
                        <FollowUpSection currentLead={leadData} UsersOptions={UsersOptions} leadId={leadId} />
                    </Box>
                );
            case 'activity':
                return (
                    <Box sx={{ pr: 2 }}>
                        <ActivityContent activities={activities} />
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box>
                <Button variant="text" startIcon={<ArrowBackIosIcon />} sx={{ textTransform: 'none' }} onClick={() => history.back()}>
                    Back to Leads
                </Button>
                <Typography variant="h5" sx={{ fontWeight: 400, mt: 1, fontSize: '15px' }}>
                    {leadData?.manualData?.name || 'Lead Details'}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ display: 'flex', fontWeight: '400', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" sx={{ display: 'flex' }}>
                        <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                            {' '}
                            <ApartmentIcon />
                            {leadData?.manualData?.company || 'Company'}
                        </Typography>
                        <Divider sx={{ ml: 2 }} orientation="vertical" variant="middle" flexItem />
                        <Chip label={leadData?.leadStatus || 'New'} color="primary" sx={{ ml: 2 }} />
                    </Typography>
                    <Typography variant="subtitle1">
                        <Typography sx={{ display: 'flex', justifyContent: 'space-between', gap: 0 }}>
                            <MyButton onClick={() => (window.location.href = `/${subdomain}/leads/edit/${leadId}`)} variant="outlined" size="small">
                                Edit Lead
                            </MyButton>
                            <MyButton variant="contained" size="small" onClick={() => setOpenFollowUpForm(true)}>
                                Schedule Follow-Up
                            </MyButton>
                        </Typography>
                    </Typography>
                </Typography>
            </Box>

            <Grid container>
                <Grid size={{ xs: 12, sm: 7 }}>
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <Tabs
                            value={selectedTab}
                            onChange={(e, newValue) => setSelectedTab(newValue)}
                            scrollButtons="auto"
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
                                    label={tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
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
                    </Box>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
                            <Typography>Loading lead details...</Typography>
                        </Box>
                    ) : (
                        renderContent()
                    )}
                </Grid>
                <Grid size={{ xs: 12, sm: 5 }}>
                    <Box sx={{ mt: 2, mb: 2 }}>
                        <LeadStatusCard currentLead={leadData} />
                    </Box>
                </Grid>
            </Grid>
            <FollowUpForm open={openFollowUpForm} UsersOptions={UsersOptions} onOpenChange={setOpenFollowUpForm} leadId={leadId} />
            <NoteForm open={openNoteForm} onOpenChange={setOpenNoteForm} leadId={leadData} />
        </Box>
    );
};

export default LeadsActivity;
