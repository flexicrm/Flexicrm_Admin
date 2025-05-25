// // // 'use client';
// // // import React, { useEffect, useState } from 'react';
// // // import { Box, Card, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Paper, Avatar, ListItem, ListItemAvatar } from '@mui/material';
// // // import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot, TimelineOppositeContent } from '@mui/lab';
// // // import { FaUser, FaPhone, FaClipboardList } from 'react-icons/fa';
// // // import Cookies from 'js-cookie';
// // // import axios from 'axios';
// // // import { useParams } from 'next/navigation';

// // // // Interfaces
// // // interface User {
// // //     firstname?: string;
// // // }

// // // interface ActivityItem {
// // //     userId?: User;
// // //     actionType?: string;
// // //     description?: string;
// // // }

// // // interface Address {
// // //     street?: string;
// // //     city?: string;
// // //     state?: string;
// // //     country?: string;
// // //     zipCode?: string;
// // // }

// // // interface ManualData {
// // //     email?: string;
// // //     mobileNo?: string;
// // //     company?: string;
// // //     address?: Address;
// // // }

// // // interface FollowUp {
// // //     notes: string;
// // //     followUpDate: string;
// // // }

// // // interface Lead {
// // //     LeadId?: string;
// // //     manualData?: ManualData;
// // //     leadStatus?: string;
// // //     leadsource?: string;
// // //     description?: string;
// // //     followUps?: FollowUp[];
// // // }

// // // interface LeadsActivityProps {
// // //     leadId: string;
// // //     currentLead: Lead;
// // //     convertUnder: string;
// // // }

// // // // Sub-components
// // // const BasicContent: React.FC<{ currentLead?: Lead }> = ({ currentLead }) => {
// // //     const address = currentLead?.manualData?.address;
// // //     const addressString = address ? [address.street, address.city, address.state, address.country, address.zipCode].filter(Boolean).join(', ') : '';

// // //     return (
// // //         <Paper
// // //             elevation={3}
// // //             sx={{
// // //                 p: 3,
// // //                 maxWidth: 600,
// // //                 margin: '20px auto',
// // //                 borderRadius: 2,
// // //                 backgroundColor: '#fff'
// // //             }}
// // //         >
// // //             <Typography variant="subtitle2" color="text.secondary" align="center" gutterBottom>
// // //                 Lead ID: <strong>{currentLead?.LeadId}</strong>
// // //             </Typography>
// // //             <List>
// // //                 <ListItem>
// // //                     <ListItemText primary="Email" secondary={currentLead?.manualData?.email || '-'} />
// // //                 </ListItem>
// // //                 <ListItem>
// // //                     <ListItemText primary="Phone" secondary={currentLead?.manualData?.mobileNo || '-'} />
// // //                 </ListItem>
// // //                 <ListItem>
// // //                     <ListItemText primary="Company" secondary={currentLead?.manualData?.company || '-'} />
// // //                 </ListItem>
// // //                 <ListItem>
// // //                     <ListItemText primary="Status" secondary={currentLead?.leadStatus || '-'} />
// // //                 </ListItem>
// // //                 <ListItem>
// // //                     <ListItemText primary="Lead Source" secondary={currentLead?.leadsource || '-'} />
// // //                 </ListItem>
// // //                 <ListItem>
// // //                     <ListItemText primary="Description" secondary={currentLead?.description || '-'} />
// // //                 </ListItem>
// // //                 <ListItem>
// // //                     <ListItemText primary="Address" secondary={addressString || '-'} />
// // //                 </ListItem>
// // //             </List>
// // //         </Paper>
// // //     );
// // // };

// // // const FollowContent: React.FC<{ currentLead: Lead }> = ({ currentLead }) => {
// // //     const followups = currentLead.followUps || [];

// // //     return (
// // //         <Box sx={{ p: 3 }}>
// // //             <Typography variant="h5" sx={{ color: '#083A50', mb: 3 }}>
// // //                 Follow-Up Timeline
// // //             </Typography>
// // //             <Timeline position="alternate">
// // //                 {followups.map((followup, idx) => (
// // //                     <TimelineItem key={idx}>
// // //                         <TimelineOppositeContent color="text.secondary" sx={{ flex: 0.2 }}>
// // //                             {new Date(followup.followUpDate).toLocaleString()}
// // //                         </TimelineOppositeContent>
// // //                         <TimelineSeparator>
// // //                             <TimelineDot color="secondary" />
// // //                             {idx < followups.length - 1 && <TimelineConnector />}
// // //                         </TimelineSeparator>
// // //                         <TimelineContent>
// // //                             <Paper elevation={3} sx={{ p: 2, backgroundColor: '#f5f5f5' }}>
// // //                                 <Typography>{followup.notes}</Typography>
// // //                             </Paper>
// // //                         </TimelineContent>
// // //                     </TimelineItem>
// // //                 ))}
// // //             </Timeline>
// // //         </Box>
// // //     );
// // // };

// // // const ActivityContent: React.FC<{ activities: ActivityItem[] }> = ({ activities }) => {
// // //     return (
// // //         <Box sx={{ p: 3 }}>
// // //             <Typography variant="h5" sx={{ color: '#083A50', mb: 3 }}>
// // //                 Lead Activity
// // //             </Typography>
// // //             {Array.isArray(activities) && activities.length > 0 ? (
// // //                 activities.map((item, i) => (
// // //                     <Box key={i} mb={3}>
// // //                         <Paper elevation={2} sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
// // //                             <ListItem>
// // //                                 <ListItemAvatar>
// // //                                     <Avatar sx={{ bgcolor: '#083A50' }}>{item?.userId?.firstname?.charAt(0) || 'U'}</Avatar>
// // //                                 </ListItemAvatar>
// // //                                 <ListItemText primary={item?.userId?.firstname || 'Unknown'} secondary={new Date().toLocaleDateString()} />
// // //                             </ListItem>
// // //                             <Box sx={{ ml: 7, mt: 1 }}>
// // //                                 <Typography variant="body2" color="text.secondary">
// // //                                     <strong>Action:</strong> {item?.actionType}
// // //                                 </Typography>
// // //                                 <Typography variant="body2" sx={{ mt: 1 }}>
// // //                                     {item?.description}
// // //                                 </Typography>
// // //                             </Box>
// // //                         </Paper>
// // //                         {i < activities.length - 1 && <Divider sx={{ my: 2 }} />}
// // //                     </Box>
// // //                 ))
// // //             ) : (
// // //                 <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
// // //                     No lead activity available.
// // //                 </Typography>
// // //             )}
// // //         </Box>
// // //     );
// // // };

// // // // Main Component
// // // const LeadsActivity: React.FC<LeadsActivityProps> = ({ currentLead, convertUnder }) => {
// // //     const { id } = useParams();
// // //     const leadId = id;
// // //     const [selectedTab, setSelectedTab] = useState(0);
// // //     const [leadData, setLeadData] = useState<Lead>(currentLead);
// // //     const [activities, setActivities] = useState<ActivityItem[]>([]);
// // //     const accessToken = Cookies.get('accessToken');
// // //     const subdomain = Cookies.get('subdomain');
// // //     const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// // //     const menuItems = [
// // //         { name: 'Basic', icon: <FaUser /> },
// // //         { name: 'Follow Up', icon: <FaPhone /> },
// // //         { name: 'Activity', icon: <FaClipboardList /> }
// // //     ];

// // // const fetchLeadData = async () => {
// // //     try {
// // //         const headers = { Authorization: `Bearer ${accessToken}` };
// // //         const response = await axios.get(`${API_BASE_URL}/lead/${subdomain}/${leadId}`, { headers });
// // //         setLeadData(response.data.data.lead);
// // //     } catch (error) {
// // //         console.error('Error fetching lead data:', error);
// // //     }
// // // };

// // // const fetchActivities = async () => {
// // //     try {
// // //         const headers = { Authorization: `Bearer ${accessToken}` };
// // //         const response = await axios.get(`${API_BASE_URL}/activity/${subdomain}/${convertUnder}`, { headers });
// // //         setActivities(response.data.data.activities);
// // //     } catch (error) {
// // //         console.error('Error fetching activities:', error);
// // //     }
// // // };

// // // useEffect(() => {
// // //     fetchLeadData();
// // //     fetchActivities();
// // // }, [leadId, convertUnder]);

// // //     const renderContent = () => {
// // //         switch (selectedTab) {
// // //             case 0:
// // //                 return <BasicContent currentLead={leadData} />;
// // //             case 1:
// // //                 return <FollowContent currentLead={leadData} />;
// // //             case 2:
// // //                 return <ActivityContent activities={activities} />;
// // //             default:
// // //                 return null;
// // //         }
// // //     };

// // //     return (
// // //         <Box sx={{ display: 'flex', minHeight: '100vh' }}>
// // //             <Card
// // //                 sx={{
// // //                     width: 250,
// // //                     minHeight: '100%',
// // //                     borderRight: '1px solid #e0e0e0',
// // //                     borderRadius: 0,
// // //                     boxShadow: 'none'
// // //                 }}
// // //             >
// // //                 <List>
// // //                     {menuItems.map((item, idx) => (
// // //                         <ListItemButton
// // //                             key={item.name}
// // //                             selected={selectedTab === idx}
// // //                             onClick={() => setSelectedTab(idx)}
// // //                             sx={{
// // //                                 '&.Mui-selected': {
// // //                                     backgroundColor: '#083A50',
// // //                                     color: 'white',
// // //                                     '& .MuiListItemIcon-root': {
// // //                                         color: 'white'
// // //                                     }
// // //                                 },
// // //                                 '&.Mui-selected:hover': {
// // //                                     backgroundColor: '#083A50'
// // //                                 },
// // //                                 py: 2,
// // //                                 px: 3
// // //                             }}
// // //                         >
// // //                             <ListItemIcon sx={{ color: selectedTab === idx ? 'white' : 'inherit' }}>{item.icon}</ListItemIcon>
// // //                             <ListItemText primary={item.name} primaryTypographyProps={{ fontWeight: 'medium' }} />
// // //                         </ListItemButton>
// // //                     ))}
// // //                 </List>
// // //             </Card>

// // //             <Box sx={{ flexGrow: 1, p: 4, backgroundColor: '#f5f7fa' }}>{renderContent()}</Box>
// // //         </Box>
// // //     );
// // // };

// // // export default LeadsActivity;
// // 'use client';
// // import React, { useEffect, useState } from 'react';
// // import { Box, Card, List, ListItemButton, ListItemIcon, ListItemText, Typography, Divider, Paper, Avatar, ListItem, Chip, Stack, Skeleton, ButtonGroup, Button, Tooltip, IconButton, Grid } from '@mui/material';
// // import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
// // import { Person as PersonIcon, Phone as PhoneIcon, History as HistoryIcon, Email as EmailIcon, Business as BusinessIcon, LocationOn as LocationIcon, Notes as NotesIcon, Event as EventIcon } from '@mui/icons-material';
// // import Cookies from 'js-cookie';
// // import axios from 'axios';
// // import { format } from 'date-fns';
// // import { useParams } from 'next/navigation';

// // // Interfaces
// // interface User {
// //     firstname?: string;
// //     lastname?: string;
// //     profileImage?: string;
// // }

// // interface ActivityItem {
// //     userId?: User;
// //     actionType?: string;
// //     description?: string;
// //     createdAt?: string;
// // }

// // interface Address {
// //     street?: string;
// //     city?: string;
// //     state?: string;
// //     country?: string;
// //     zipCode?: string;
// // }

// // interface ManualData {
// //     email?: string;
// //     mobileNo?: string;
// //     company?: string;
// //     address?: Address;
// // }

// // interface FollowUp {
// //     notes: string;
// //     followUpDate: string;
// //     status?: 'completed' | 'pending' | 'overdue';
// // }

// // interface Lead {
// //     LeadId?: string;
// //     manualData?: ManualData;
// //     leadStatus?: string;
// //     leadsource?: string;
// //     description?: string;
// //     followUps?: FollowUp[];
// //     createdAt?: string;
// // }

// // interface LeadsActivityProps {
// //     leadId: string;
// //     currentLead: Lead;
// //     convertUnder: string;
// // }

// // // Status Chip Component
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

// // // Sub-components
// // const BasicContent: React.FC<{ currentLead?: Lead; loading?: boolean }> = ({ currentLead, loading }) => {
// //     const address = currentLead?.manualData?.address;
// //     const addressString = address ? `${address.street || ''}, ${address.city || ''}, ${address.state || ''}, ${address.country || ''} ${address.zipCode || ''}` : '';

// //     console.log(currentLead, 'currentLead');

// //     // if (loading) {
// //     //     return (
// //     //         <Box sx={{ p: 3 }}>
// //     //             {[...Array(6)].map((_, i) => (
// //     //                 <Skeleton key={i} height={60} sx={{ mb: 1 }} />
// //     //             ))}
// //     //         </Box>
// //     //     );
// //     // }

// //     return (
// //         <Box sx={{ p: 0 }}>
// //             <Typography variant="h6" gutterBottom sx={{ mb: 3, color: 'text.primary', display: 'flex', alignItems: 'center' }}>
// //                 <PersonIcon sx={{ mr: 1 }} /> Lead Information <Chip sx={{ ml: 1 }} label={`Status: ${currentLead?.leadStatus || 'Unknown'}`} color="primary" />
// //             </Typography>
// //             <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
// //                 <Chip label={`Source: ${currentLead?.leadsource || 'Unknown'}`} variant="outlined" />
// //             </Box>
// //             <Grid container>
// //                 <Grid size={{ sm: 6 }}>
// //                     <Card sx={{ p: 3, mb: 3 }}>
// //                         <Stack spacing={1}>
// //                             <ListItem disablePadding>
// //                                 <ListItemIcon sx={{ minWidth: 36 }}>
// //                                     <EmailIcon color="primary" />
// //                                 </ListItemIcon>
// //                                 <ListItemText primary="Email" secondary={currentLead?.manualData?.email || 'Not provided'} secondaryTypographyProps={{ color: 'text.secondary' }} />
// //                             </ListItem>

// //                             <Divider variant="inset" />

// //                             <ListItem disablePadding>
// //                                 <ListItemIcon sx={{ minWidth: 36 }}>
// //                                     <PhoneIcon color="primary" />
// //                                 </ListItemIcon>
// //                                 <ListItemText primary="Phone" secondary={currentLead?.manualData?.mobileNo || 'Not provided'} secondaryTypographyProps={{ color: 'text.secondary' }} />
// //                             </ListItem>

// //                             <Divider variant="inset" />

// //                             <ListItem disablePadding>
// //                                 <ListItemIcon sx={{ minWidth: 36 }}>
// //                                     <BusinessIcon color="primary" />
// //                                 </ListItemIcon>
// //                                 <ListItemText primary="Company" secondary={currentLead?.manualData?.company || 'Not provided'} secondaryTypographyProps={{ color: 'text.secondary' }} />
// //                             </ListItem>

// //                             <Divider variant="inset" />

// //                             <ListItem disablePadding>
// //                                 <ListItemIcon sx={{ minWidth: 36 }}>
// //                                     <LocationIcon color="primary" />
// //                                 </ListItemIcon>
// //                                 <ListItemText primary="Address" secondary={addressString || 'Not provided'} secondaryTypographyProps={{ color: 'text.secondary' }} />
// //                             </ListItem>

// //                             <Divider variant="inset" />

// //                             <ListItem disablePadding>
// //                                 <ListItemIcon sx={{ minWidth: 36 }}>
// //                                     <NotesIcon color="primary" />
// //                                 </ListItemIcon>
// //                                 <ListItemText primary="Description" secondary={currentLead?.description || 'Not provided'} secondaryTypographyProps={{ color: 'text.secondary' }} />
// //                             </ListItem>
// //                         </Stack>
// //                     </Card>
// //                 </Grid>
// //                 <Grid size={{ sm: 6 }}></Grid>
// //             </Grid>
// //         </Box>
// //     );
// // };

// // const FollowContent: React.FC<{ currentLead: Lead; loading?: boolean }> = ({ currentLead, loading }) => {
// //     const followups = currentLead?.followUps || [];

// //     // if (loading) {
// //     //     return (
// //     //         <Box sx={{ p: 3 }}>
// //     //             {[...Array(3)].map((_, i) => (
// //     //                 <Skeleton key={i} height={100} sx={{ mb: 2 }} />
// //     //             ))}
// //     //         </Box>
// //     //     );
// //     // }

// //     return (
// //         <Box sx={{ p: 0 }}>
// //             <Typography variant="h6" gutterBottom sx={{ mb: 3, color: 'text.primary', display: 'flex', alignItems: 'center' }}>
// //                 <EventIcon sx={{ mr: 1 }} /> Follow-Up Timeline
// //             </Typography>

// //             <Grid container>
// //                 <Grid size={{ sm: 6 }}>
// //                     {followups.length > 0 ? (
// //                         <Timeline position="alternate" sx={{ p: 0 }}>
// //                             {followups.map((followup, idx) => (
// //                                 <TimelineItem key={idx}>
// //                                     <TimelineSeparator>
// //                                         <TimelineDot color="primary">
// //                                             <EventIcon fontSize="small" />
// //                                         </TimelineDot>
// //                                         {idx < followups.length - 1 && <TimelineConnector />}
// //                                     </TimelineSeparator>
// //                                     <TimelineContent sx={{ py: '12px', px: 2 }}>
// //                                         <Paper elevation={0} sx={{ p: 2, backgroundColor: 'background.paper' }}>
// //                                             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
// //                                                 <Typography variant="subtitle2">{format(new Date(followup.followUpDate), 'PPPp')}</Typography>
// //                                                 {followup.status && <StatusChip status={followup.status} />}
// //                                             </Box>
// //                                             <Typography variant="body2" color="text.secondary">
// //                                                 {followup.notes}
// //                                             </Typography>
// //                                         </Paper>
// //                                     </TimelineContent>
// //                                 </TimelineItem>
// //                             ))}
// //                         </Timeline>
// //                     ) : (
// //                         <Box sx={{ textAlign: 'center', py: 4 }}>
// //                             <Typography variant="body1" color="text.secondary">
// //                                 No follow-ups scheduled yet
// //                             </Typography>
// //                         </Box>
// //                     )}
// //                 </Grid>
// //                 <Grid size={{ sm: 6 }}></Grid>
// //             </Grid>
// //         </Box>
// //     );
// // };

// // const ActivityContent: React.FC<{ activities: ActivityItem[]; loading?: boolean }> = ({ activities, loading }) => {
// //     if (loading) {
// //         return (
// //             <Box sx={{ p: 3 }}>
// //                 {[...Array(4)].map((_, i) => (
// //                     <Skeleton key={i} height={80} sx={{ mb: 2 }} />
// //                 ))}
// //             </Box>
// //         );
// //     }

// //     return (
// //         <Box sx={{ p: 3 }}>
// //             <Typography variant="h6" gutterBottom sx={{ mb: 3, color: 'text.primary', display: 'flex', alignItems: 'center' }}>
// //                 <HistoryIcon sx={{ mr: 1 }} /> Activity Log
// //             </Typography>

// //             {activities.length > 0 ? (
// //                 <Stack spacing={2}>
// //                     {activities.map((item, i) => (
// //                         <Card key={i} sx={{ p: 2 }}>
// //                             <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
// //                                 <Avatar src={item?.userId?.profileImage} sx={{ width: 40, height: 40, mr: 2 }}>
// //                                     {item?.userId?.firstname?.charAt(0) || 'U'}
// //                                 </Avatar>
// //                                 <Box>
// //                                     <Typography variant="subtitle2">
// //                                         {item?.userId?.firstname} {item?.userId?.lastname}
// //                                     </Typography>
// //                                     <Typography variant="caption" color="text.secondary">
// //                                         {item.createdAt ? format(new Date(item.createdAt), 'PPPp') : 'Unknown date'}
// //                                     </Typography>
// //                                 </Box>
// //                             </Box>

// //                             <Box sx={{ ml: 6 }}>
// //                                 <Chip label={item?.actionType} size="small" color="secondary" sx={{ mb: 1, textTransform: 'capitalize' }} />
// //                                 <Typography variant="body2">{item?.description}</Typography>
// //                             </Box>
// //                         </Card>
// //                     ))}
// //                 </Stack>
// //             ) : (
// //                 <Box sx={{ textAlign: 'center', py: 4 }}>
// //                     <Typography variant="body1" color="text.secondary">
// //                         No activities recorded yet
// //                     </Typography>
// //                 </Box>
// //             )}
// //         </Box>
// //     );
// // };

// // // Main Component
// // const LeadsActivity: React.FC<LeadsActivityProps> = ({ currentLead, convertUnder }) => {
// //     const { id } = useParams();
// //     const leadId = id;
// //     const [selectedTab, setSelectedTab] = useState(0);
// //     const [leadData, setLeadData] = useState<Lead>(null);
// //     const [activities, setActivities] = useState<ActivityItem[]>([]);
// //     const [loading, setLoading] = useState(true);
// //     const accessToken = Cookies.get('accessToken');
// //     const subdomain = Cookies.get('subdomain');
// //     const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// //     console.log(leadData, 'leadData');

// //     const menuItems = [
// //         { name: 'Basic', icon: <PersonIcon /> },
// //         { name: 'Follow Up', icon: <EventIcon /> },
// //         { name: 'Activity', icon: <HistoryIcon /> }
// //     ];

// //     const fetchLeadData = async () => {
// //         try {
// //             const headers = { Authorization: `Bearer ${accessToken}` };
// //             const response = await axios.get(`${API_BASE_URL}/lead/${subdomain}/${leadId}`, { headers });
// //             console.log(response, 'response');

// //             setLeadData(response.data.data.lead);
// //         } catch (error) {
// //             console.error('Error fetching lead data:', error);
// //         }
// //     };

// //     const fetchActivities = async () => {
// //         try {
// //             const headers = { Authorization: `Bearer ${accessToken}` };
// //             const response = await axios.get(`${API_BASE_URL}/activity/${subdomain}/${convertUnder}`, { headers });
// //             setActivities(response.data.data.activities);
// //         } catch (error) {
// //             console.error('Error fetching activities:', error);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchLeadData();
// //         fetchActivities();
// //     }, [leadId, convertUnder]);

// //     const renderContent = () => {
// //         switch (selectedTab) {
// //             case 0:
// //                 return <BasicContent currentLead={leadData} loading={loading} />;
// //             case 1:
// //                 return <FollowContent currentLead={leadData} loading={loading} />;
// //             case 2:
// //                 return <ActivityContent activities={activities} loading={loading} />;
// //             default:
// //                 return null;
// //         }
// //     };

// //     return (
// //         <Box
// //             sx={{
// //                 display: 'flex',
// //                 // minHeight: 'calc(50vh - 64px)',
// //                 backgroundColor: 'background.default'
// //             }}
// //         >
// //             {/* Sidebar Navigation */}
// //             <Card
// //                 sx={{
// //                     width: 240,
// //                     flexShrink: 0,
// //                     // borderRight: '1px solid',
// //                     // borderColor: 'divider',
// //                     borderRadius: 0,
// //                     boxShadow: 'none',
// //                     display: 'flex',
// //                     flexDirection: 'column'
// //                 }}
// //             >
// //                 <Box sx={{ p: 0 }}>
// //                     <Typography variant="h6" noWrap>
// //                         Lead #{leadId}
// //                     </Typography>
// //                     <Typography variant="caption" color="text.secondary">
// //                         {leadData?.createdAt ? format(new Date(leadData.createdAt), 'MMM dd, yyyy') : ''}
// //                     </Typography>
// //                 </Box>

// //                 {/* <List sx={{ display: 'flex', flexGrow: 1, p: 0 }}>
// //                     {menuItems.map((item, idx) => (
// //                         <Tooltip key={item.name} title={item.name}>
// //                             <ListItemButton
// //                                 selected={selectedTab === idx}
// //                                 onClick={() => setSelectedTab(idx)}
// //                                 sx={{
// //                                     '&.Mui-selected': {
// //                                         backgroundColor: 'primary.light',
// //                                         color: 'primary.main',
// //                                         '& .MuiListItemIcon-root': {
// //                                             color: 'primary.main'
// //                                         }
// //                                     },
// //                                     '&.Mui-selected:hover': {
// //                                         backgroundColor: 'primary.light'
// //                                     },
// //                                     py: 1.5,
// //                                     px: 3
// //                                 }}
// //                             >
// //                                 <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
// //                             </ListItemButton>
// //                         </Tooltip>
// //                     ))}
// //                 </List> */}
// //                 <Box>
// //                     {menuItems.map((item, idx) => (
// //                         <Tooltip key={item.name} title={item.name}>
// //                             <IconButton
// //                                 size="small"
// //                                 selected={selectedTab === idx}
// //                                 onClick={() => setSelectedTab(idx)}
// //                                 sx={{
// //                                     p: 1,
// //                                     mt: 0.5,
// //                                     // borderRadius: , // Added subtle rounded corners
// //                                     transition: 'all 0.2s ease', // Smooth transitions
// //                                     ...(selectedTab === idx && {
// //                                         backgroundColor: 'primary.light',
// //                                         color: 'primary.main',
// //                                         '&:hover': {
// //                                             backgroundColor: 'primary.light', // Consistent hover for selected
// //                                             opacity: 0.9 // Slight visual feedback
// //                                         },
// //                                         '&:active': {
// //                                             color: 'white',
// //                                             transform: 'scale(0.98)' // Subtle press effect
// //                                         }
// //                                     }),
// //                                     '&:hover': {
// //                                         backgroundColor: 'action.hover',
// //                                         transform: 'scale(1.05)' // Subtle grow effect
// //                                     },
// //                                     '&:active': {
// //                                         color: 'white',
// //                                         transform: 'scale(0.98)' // Subtle press effect
// //                                     },
// //                                     '&:focus-visible': {
// //                                         outline: '2px solid',
// //                                         outlineColor: 'primary.main',
// //                                         outlineOffset: 2
// //                                     }
// //                                 }}
// //                             >
// //                                 {item.icon}
// //                             </IconButton>
// //                         </Tooltip>
// //                     ))}
// //                 </Box>
// //             </Card>

// //             {/* Main Content Area */}
// //             <Box
// //                 sx={{
// //                     flexGrow: 1,
// //                     overflow: 'auto',
// //                     // p: { xs: 2, md: 3 },
// //                     backgroundColor: 'background.paper'
// //                 }}
// //             >
// //                 {renderContent()}
// //             </Box>
// //         </Box>
// //     );
// // };

// // export default LeadsActivity;

// 'use client';
// import React, { useEffect, useState } from 'react';
// import { Box, Card, Typography, Divider, Paper, Avatar, ListItem, Chip, Stack, Button, Grid, Tabs, Tab, TextField, IconButton, Badge } from '@mui/material';
// import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab';
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
//     Search as SearchIcon
// } from '@mui/icons-material';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ApartmentIcon from '@mui/icons-material/Apartment';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import { format } from 'date-fns';
// import { useParams } from 'next/navigation';

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
// }

// interface Lead {
//     LeadId?: string;
//     manualData?: ManualData;
//     leadStatus?: string;
//     leadsource?: string;
//     description?: string;
//     followUps?: FollowUp[];
//     createdAt?: string;
//     potentialValue?: number;
//     owner?: string;
//     lastActivity?: string;
// }

// interface LeadsActivityProps {
//     leadId: string;
//     currentLead: Lead;
//     convertUnder: string;
// }

// // Status Chip Component
// const StatusChip: React.FC<{ status: string }> = ({ status }) => {
//     const getStatusColor = () => {
//         switch (status.toLowerCase()) {
//             case 'completed':
//                 return 'success';
//             case 'pending':
//                 return 'warning';
//             case 'overdue':
//                 return 'error';
//             default:
//                 return 'primary';
//         }
//     };

//     return <Chip label={status} color={getStatusColor()} size="small" sx={{ textTransform: 'capitalize' }} />;
// };

// // Priority Chip Component
// const PriorityChip: React.FC<{ priority: string }> = ({ priority }) => {
//     const getPriorityColor = () => {
//         switch (priority.toLowerCase()) {
//             case 'high':
//                 return 'error';
//             case 'medium':
//                 return 'warning';
//             case 'low':
//                 return 'success';
//             default:
//                 return 'default';
//         }
//     };

//     return <Chip label={priority} color={getPriorityColor()} size="small" sx={{ textTransform: 'capitalize' }} />;
// };

// // Sub-components
// const ContactInfoCard: React.FC<{ currentLead?: Lead }> = ({ currentLead }) => {
//     const address = currentLead?.manualData?.address;
//     const addressString = address ? `${address.city || ''}, ${address.state || ''}, ${address.country || ''}` : '';

//     return (
//         <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
//             <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 400 }}>
//                 Contact Information
//             </Typography>

//             <Grid container spacing={2}>
//                 <Grid size={{ sm: 12, md: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Full Name
//                     </Typography>
//                     <Typography variant="body1" sx={{ mb: 2 }}>
//                         {currentLead?.manualData?.name || 'Not provided'}
//                     </Typography>
//                 </Grid>

//                 <Grid size={{ sm: 12, md: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Phone
//                     </Typography>
//                     <Typography variant="body1" sx={{ mb: 2 }}>
//                         {currentLead?.manualData?.mobileNo || 'Not provided'}
//                     </Typography>
//                 </Grid>

//                 <Grid size={{ sm: 12, md: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Website
//                     </Typography>
//                     <Typography variant="body1" sx={{ mb: 2 }}>
//                         {currentLead?.manualData?.website || 'Not provided'}
//                     </Typography>
//                 </Grid>

//                 <Grid size={{ sm: 12, md: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Email
//                     </Typography>
//                     <Typography variant="body1" sx={{ mb: 2 }}>
//                         {currentLead?.manualData?.email || 'Not provided'}
//                     </Typography>
//                 </Grid>

//                 <Grid size={{ sm: 12, md: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Company
//                     </Typography>
//                     <Typography variant="body1" sx={{ mb: 2 }}>
//                         {currentLead?.manualData?.company || 'Not provided'}
//                     </Typography>
//                 </Grid>

//                 <Grid size={{ sm: 12, md: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Location
//                     </Typography>
//                     <Typography variant="body1">{addressString || 'Not provided'}</Typography>
//                 </Grid>
//             </Grid>
//             {/*
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//                 <Button startIcon={<EditIcon />} variant="outlined" size="small">
//                     Edit Lead
//                 </Button>
//             </Box> */}
//         </Card>
//     );
// };

// export const LeadStatusCard: React.FC<{ currentLead?: Lead }> = ({ currentLead }) => {
//     return (
//         <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
//             <Typography variant="h6" gutterBottom sx={{ mb: 2, fontWeight: 400 }}>
//                 Lead Status
//             </Typography>

//             <Grid container spacing={2}>
//                 <Grid size={{ sm: 12, md: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Current Status
//                     </Typography>
//                     <Typography variant="body1" sx={{ mb: 2 }}>
//                         <Chip label={currentLead?.leadStatus || 'New'} color="primary" />
//                     </Typography>
//                 </Grid>

//                 <Grid size={{ sm: 12, md: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Potential Value
//                     </Typography>
//                     <Typography variant="body1" sx={{ mb: 2 }}>
//                         ${currentLead?.potentialValue?.toLocaleString() || '0'}
//                     </Typography>
//                 </Grid>

//                 <Grid size={{ sm: 12, md: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Created Date
//                     </Typography>
//                     <Typography variant="body1" sx={{ mb: 2 }}>
//                         {currentLead?.createdAt ? format(new Date(currentLead.createdAt), 'MMM d, yyyy') : 'N/A'}
//                     </Typography>
//                 </Grid>

//                 <Grid size={{ sm: 12, md: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Last Activity
//                     </Typography>
//                     <Typography variant="body1" sx={{ mb: 2 }}>
//                         {currentLead?.lastActivity || 'Today'}
//                     </Typography>
//                 </Grid>

//                 <Grid size={{ sm: 12, md: 6 }}>
//                     <Typography variant="subtitle2" color="text.secondary">
//                         Owner
//                     </Typography>
//                     <Typography variant="body1">{currentLead?.owner || 'Unassigned'}</Typography>
//                 </Grid>
//             </Grid>

//             <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
//                 <Button variant="contained" size="small">
//                     Update Status
//                 </Button>
//                 <Button startIcon={<ScheduleIcon />} variant="outlined" size="small">
//                     Add Task
//                 </Button>
//             </Box>
//         </Card>
//     );
// };

// const FollowUpsContent: React.FC<{ currentLead: Lead }> = ({ currentLead }) => {
//     const followups = currentLead?.followUps || [];

//     return (
//         <Box sx={{ p: 0 }}>
//             <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//                     <Typography variant="h6" sx={{ fontWeight: 400 }}>
//                         Follow-Ups
//                     </Typography>
//                     <Button startIcon={<AddIcon />} variant="contained" size="small">
//                         Add Follow-Up
//                     </Button>
//                 </Box>

//                 <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
//                     Manage scheduled follow-ups with this lead
//                 </Typography>
//                 <Grid container>
//                     <Grid size={{ sm: 12, md: 6 }}>
//                         {followups.length > 0 ? (
//                             <Stack spacing={2}>
//                                 {followups
//                                     .reverse()
//                                     .slice(0, 3)
//                                     .map((followup, idx) => (
//                                         <Card key={idx} sx={{ p: 2, borderRadius: 2 }}>
//                                             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                                                 <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//                                                     {followup.title || 'Follow-Up'}
//                                                 </Typography>
//                                                 <Box>
//                                                     {followup.priority && <PriorityChip priority={followup.priority} />}
//                                                     {followup.status && <StatusChip status={followup.status} />}
//                                                 </Box>
//                                             </Box>

//                                             <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                                                 Due: {format(new Date(followup.followUpDate), 'MM/dd/yyyy')}
//                                             </Typography>

//                                             <Typography variant="body2" sx={{ mb: 2 }}>
//                                                 {followup.notes}
//                                             </Typography>

//                                             {followup.assignedTo && (
//                                                 <Typography variant="caption" color="text.secondary">
//                                                     Assigned to: {followup.assignedTo}
//                                                 </Typography>
//                                             )}
//                                         </Card>
//                                     ))}
//                             </Stack>
//                         ) : (
//                             <Box sx={{ textAlign: 'center', py: 4 }}>
//                                 <Typography variant="body1" color="text.secondary">
//                                     No follow-ups scheduled yet
//                                 </Typography>
//                             </Box>
//                         )}
//                     </Grid>
//                     <Grid size={{ md: 6 }}></Grid>
//                 </Grid>
//             </Card>
//         </Box>
//     );
// };

// const NotesContent: React.FC<{ currentLead: Lead }> = ({ currentLead }) => {
//     const notes = [
//         {
//             id: 1,
//             content: 'Need to follow up with John Smith next week to discuss the proposal. They mentioned they need to consult with their IT team.',
//             createdAt: new Date()
//         },
//         {
//             id: 2,
//             content: 'Acme Corp has a maximum budget of $5,000. Consider offering the quarterly payment plan option to make it more manageable.',
//             createdAt: new Date()
//         }
//     ];

//     return (
//         <Box sx={{ p: 0 }}>
//             <Card sx={{ p: 3, mb: 3, borderRadius: 2 }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//                     <Typography variant="h6" sx={{ fontWeight: 600 }}>
//                         Notes
//                     </Typography>
//                     <Button startIcon={<AddIcon />} variant="contained" size="small">
//                         Add Note
//                     </Button>
//                 </Box>

//                 <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
//                     Important notes and reminders about this lead
//                 </Typography>

//                 {notes.length > 0 ? (
//                     <Stack spacing={2}>
//                         {notes.map((note, idx) => (
//                             <Card key={idx} sx={{ p: 2, borderRadius: 2 }}>
//                                 <Typography variant="body2" sx={{ mb: 1 }}>
//                                     {note.content}
//                                 </Typography>
//                                 <Typography variant="caption" color="text.secondary">
//                                     Created: {format(note.createdAt, 'MMM d, yyyy')}
//                                 </Typography>
//                             </Card>
//                         ))}
//                     </Stack>
//                 ) : (
//                     <Box sx={{ textAlign: 'center', py: 4 }}>
//                         <Typography variant="body1" color="text.secondary">
//                             No notes added yet
//                         </Typography>
//                     </Box>
//                 )}
//             </Card>
//         </Box>
//     );
// };

// const ActivityContent: React.FC<{ activities: ActivityItem[] }> = ({ activities }) => {
//     return (
//         <Box sx={{ p: 0 }}>
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
//                     <Grid size={{ sm: 12, md: 6 }}>
//                         {activities.length > 0 ? (
//                             <Timeline position="alternate" sx={{ p: 0 }}>
//                                 {activities.map((item, i) => (
//                                     <TimelineItem key={i}>
//                                         <TimelineSeparator>
//                                             <TimelineDot color="primary">
//                                                 <HistoryIcon fontSize="small" />
//                                             </TimelineDot>
//                                             {i < activities.length - 1 && <TimelineConnector />}
//                                         </TimelineSeparator>
//                                         <TimelineContent sx={{ py: '12px', px: 2 }}>
//                                             <Card sx={{ p: 2, borderRadius: 2 }}>
//                                                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                                                     <Typography variant="subtitle2">{item.actionType || 'Activity'}</Typography>
//                                                     <Typography variant="caption" color="text.secondary">
//                                                         {item.createdAt ? format(new Date(item.createdAt), 'MMM d, yyyy') : 'N/A'}
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
// const LeadsActivity: React.FC<LeadsActivityProps> = ({ currentLead, convertUnder }) => {
//     const { id } = useParams();
//     const leadId = id;
//     const [selectedTab, setSelectedTab] = useState('overview');
//     const [leadData, setLeadData] = useState<Lead>(null);
//     const [activities, setActivities] = useState<ActivityItem[]>([]);
//     const [loading, setLoading] = useState(true);
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

//     const fetchActivities = async () => {
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/activity/${subdomain}/${convertUnder}`, { headers });
//             setActivities(response.data.data.activities);
//         } catch (error) {
//             console.error('Error fetching activities:', error);
//         }
//     };

//     useEffect(() => {
//         fetchLeadData();
//         fetchActivities();
//     }, [leadId, convertUnder]);

//     const renderContent = () => {
//         switch (selectedTab) {
//             case 'overview':
//                 return (
//                     <Grid container spacing={3}>
//                         <Grid size={{ xs: 12, md: 11 }}>
//                             <ContactInfoCard currentLead={leadData} />
//                             {/* <FollowUpsContent currentLead={leadData} /> */}
//                             {/* <NotesContent currentLead={leadData} /> */}
//                             {/* <ActivityContent activities={activities} /> */}
//                         </Grid>
//                     </Grid>
//                 );
//             case 'followups':
//                 return (
//                     <Grid container spacing={3}>
//                         <Grid size={{ xs: 12, md: 11 }}>
//                             <FollowUpsContent currentLead={leadData} />;
//                         </Grid>
//                     </Grid>
//                 );
//             case 'activity':
//                 return (
//                     <Grid container spacing={3}>
//                         <Grid size={{ xs: 12, md: 11 }}>
//                             <ActivityContent activities={activities} />
//                         </Grid>
//                     </Grid>
//                 );
//             case 'notes':
//                 return (
//                     <Grid container spacing={3}>
//                         <Grid size={{ xs: 12, md: 11 }}>
//                             <NotesContent currentLead={leadData} />;
//                         </Grid>
//                     </Grid>
//                 );

//             default:
//                 return null;
//         }
//     };

//     return (
//         <Box sx={{ flexGrow: 1 }}>
//             {/* Header */}
//             {/* Back button and search */}
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//                 <Button variant="text" startIcon={<ArrowBackIosIcon />} sx={{ textTransform: 'none' }}>
//                     Back to Leads
//                 </Button>
//                 {/* <TextField
//                     size="small"
//                     placeholder="Search..."
//                     InputProps={{
//                         startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />
//                     }}
//                     sx={{ width: 300 }}
//                 /> */}
//             </Box>
//             <Box>
//                 <Typography variant="h5" sx={{ fontWeight: 400, mt: 1 }}>
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
//                         <Typography sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                             <Button startIcon={<EditIcon />} variant="outlined" size="small">
//                                 Edit Lead
//                             </Button>
//                             <Button startIcon={<AddIcon />} variant="contained" size="small" sx={{ ml: 2 }}>
//                                 Shedule Follow-Up
//                             </Button>
//                         </Typography>
//                     </Typography>
//                 </Typography>
//             </Box>

//             <Grid container>
//                 <Grid size={{ sm: 6, md: 8 }}>
//                     <Grid container>
//                         <Grid size={{ sm: 12, md: 5 }}>
//                             {/* Tabs */}

//                             <Box sx={{ mt: 2, mb: 2 }}>
//                                 {/* <Tabs value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)} variant="scrollable" scrollButtons="auto" sx={{ border: '1px solid black', borderRadius: '12px' }}>
//                             <Tab label="Overview" value="overview" />
//                             <Tab label="Follow-Ups" value="followups" />
//                             <Tab label="Activity" value="activity" />
//                             <Tab label="Notes" value="notes" />
//                             <Tab label="Files" value="files" />
//                         </Tabs> */}
//                                 <Tabs
//                                     value={selectedTab}
//                                     onChange={(e, newValue) => setSelectedTab(newValue)}
//                                     variant="scrollable"
//                                     scrollButtons="auto"
//                                     sx={{
//                                         // border: '1px solid',
//                                         // borderColor: 'divider', // uses theme's divider color
//                                         borderRadius: '12px',
//                                         p: 0,
//                                         m: 0,
//                                         bgcolor: 'rgba(20, 53, 96, 0.12)', // uses theme's paper background
//                                         '& .MuiTabs-indicator': {
//                                             display: 'none' // hides the default indicator
//                                         }
//                                     }}
//                                 >
//                                     {['overview', 'followups', 'activity', 'notes'].map((tab) => (
//                                         <Tab
//                                             key={tab}
//                                             label={tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
//                                             value={tab}
//                                             sx={{
//                                                 height: '12px',
//                                                 width: '12px',
//                                                 borderRadius: '8px',
//                                                 margin: '0px',
//                                                 marginTop: '5px',
//                                                 marginLeft: '5px',
//                                                 padding: '0px',
//                                                 fontSize: '12px',
//                                                 minHeight: '35px',
//                                                 minWidth: '80px',
//                                                 transition: 'all 0.3s ease',
//                                                 '&.Mui-selected': {
//                                                     bgcolor: 'primary.main',
//                                                     color: 'primary.contrastText',
//                                                     boxShadow: 1
//                                                 },
//                                                 '&:hover': {
//                                                     bgcolor: 'action.hover' // subtle hover effect
//                                                 },
//                                                 '&.Mui-selected:hover': {
//                                                     bgcolor: 'primary.dark' // darker when active+hover
//                                                 }
//                                             }}
//                                         />
//                                     ))}
//                                 </Tabs>
//                             </Box>
//                         </Grid>
//                     </Grid>
//                     {/* Main Content */}
//                     {loading ? (
//                         <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
//                             {/* Loading spinner or skeleton */}
//                             <Typography>Loading lead details...</Typography>
//                         </Box>
//                     ) : (
//                         renderContent()
//                     )}
//                 </Grid>
//                 <Grid size={{ sm: 6, md: 4 }}>
//                     <Box sx={{ mt: 2, mb: 2 }}>
//                         <LeadStatusCard />
//                     </Box>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// };

// export default LeadsActivity;
"use client"
import React from 'react'
import { useParams } from 'next/navigation';
import LeadsActivity from './SingleView'

export default function Page() {
     const { id } = useParams();
  return (
    <div>
        <LeadsActivity id={id}/>
    </div>
  )
}
