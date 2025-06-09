// import React, { useCallback, useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import {
//     Container,
//     Grid,
//     Card,
//     Typography,
//     Box,
//     List,
//     ListItem,
//     ListItemText,
//     Divider,
//     Chip,
//     Skeleton,
//     Button,
//     useTheme,
//     Badge,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem,
//     CircularProgress,
//     Alert,
//     TableContainer,
//     Table,
//     TableHead,
//     TableCell,
//     TableBody,
//     TableRow,
//     CardContent,
//     alpha
// } from '@mui/material';
// import { Schedule, Refresh, ArrowForward, Email, Phone, Business, Person } from '@mui/icons-material';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { GETactivity } from '../../../../../api/dashboardApi';
// import { TrendingUp, TrendingDown, Users, MessageSquare, PiggyBank, Calendar } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Link from 'next/link';

// const SummaryCard = ({ title, value, loading, onClick, icon }) => {
//     const theme = useTheme();
//     // const isPositive = value >= 0;
//     return (
//         <motion.div transition={{ duration: 0.2 }}>
//             <Card
//                 sx={{
//                     borderRadius: 2,
//                     padding: 2,
//                     boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)',
//                     transition: 'all 0.3s',
//                     '&:hover': {
//                         boxShadow: 6
//                     },
//                     border: '1px solid #e5e7eb'
//                 }}
//             >
//                 <CardContent sx={{ paddingBottom: '16px !important' }}>
//                     <Box display="flex" justifyContent="space-between" alignItems="flex-start">
//                         {/* Left section: Title, Value, Change */}
//                         <Box flexGrow={1}>
//                             {loading ? (
//                                 <>
//                                     <Skeleton variant="text" width="60%" />
//                                     <Skeleton variant="rectangular" height={30} sx={{ my: 1 }} />
//                                     <Skeleton variant="text" width="80%" />
//                                 </>
//                             ) : (
//                                 <>
//                                     <Typography variant="h3" color="text.secondary" sx={{ color: '#878a99' }}>
//                                         {title}
//                                     </Typography>
//                                     <Typography variant="h5" fontWeight={600}>
//                                         {value}
//                                     </Typography>
//                                     {/* {change !== undefined && (
//                                         <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
//                                             {isPositive ? <TrendingUp fontSize="small" sx={{ color: 'success.main' }} /> : <TrendingDown fontSize="small" sx={{ color: 'error.main' }} />}
//                                             <Typography variant="caption" fontWeight={500} color={isPositive ? 'success.main' : 'error.main'}>
//                                                 {Math.abs(change)}% from last month
//                                             </Typography>
//                                         </Box>
//                                     )} */}
//                                 </>
//                             )}
//                         </Box>

//                         {/* Right section: Icon */}
//                         {!loading && (
//                             <Box
//                                 sx={{
//                                     p: 1.2,
//                                     ml: 2,
//                                     borderRadius: 2,
//                                     // bgcolor: `rgb(10 45 90/20%) `,
//                                     bgcolor: `rgb(10 45 90/5%) `,
//                                     // color: 'primary.main',
//                                     color: '#00439a',
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center'
//                                 }}
//                             >
//                                 {icon}
//                             </Box>
//                         )}
//                     </Box>
//                 </CardContent>
//             </Card>
//         </motion.div>
//     );
// };

// const Dashboard = () => {
//     const [data, setData] = useState(null);
//     const [isLoading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [refreshing, setRefreshing] = useState(false);
//     const [timeframe, setTimeframe] = useState('monthly');
//     const subdomain = Cookies.get('subdomain');
//     const theme = useTheme();

//     const fetchData = useCallback(async () => {
//         try {
//             setLoading(true);
//             setRefreshing(true);
//             const response = await GETactivity(subdomain);
//             if (response) {
//                 setData(response.data);
//                 setError(null);
//             } else {
//                 setError('Failed to fetch data');
//             }
//         } catch (err) {
//             setError('An error occurred while fetching data');
//         } finally {
//             setLoading(false);
//             setRefreshing(false);
//         }
//     }, [subdomain]);

//     useEffect(() => {
//         fetchData();
//     }, [fetchData]);

//     const monthlyAcquisitionData = data?.acquisition?.monthly?.labels?.map((label, index) => ({
//         name: label,
//         value: data.acquisition.monthly.data[index] || 0
//     }));

//     const recentLeads = data?.recentLeads?.map((lead) => ({
//         id: lead._id,
//         name: lead.manualData?.name || 'Unknown',
//         company: lead.manualData?.company || 'Unknown',
//         value: lead.potentialValue || 0,
//         status: lead.leadstatus?.statusName || 'New',
//         email: lead.manualData?.email,
//         phone: lead.manualData?.mobileNo,
//         LeadId: lead?.LeadId,
//         lastContact: lead.lastContact ? new Date(lead.lastContact).toLocaleDateString() : 'Never'
//     }));

//     const highValueOpportunities = recentLeads
//         ?.sort((a, b) => b.value - a.value)
//         .slice(0, 5)
//         .map((lead) => ({
//             ...lead,
//             valueFormatted: `₹ ${lead.value.toLocaleString()}`
//         }));

//     const totalPotentialValue = recentLeads?.reduce((sum, lead) => sum + (lead.value || 0), 0) || 0;

//     const handleRefresh = () => {
//         fetchData();
//     };

//     const handleSummaryClick = (type) => {
//         console.log(`View all ${type}`);
//     };

//     const handleTimeframeChange = (event) => {
//         const value = event.target.value;
//         setTimeframe(value);
//         setLoading(true);
//         setTimeout(() => {
//             // setData(value === 'monthly' ? generateMonthlyData() : generateWeeklyData());
//             setLoading(false);
//         }, 500);
//     };

//     if (isLoading && !data) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//                 <CircularProgress size={60} />
//             </Box>
//         );
//     }

//     if (error) {
//         return (
//             <Box sx={{ p: 2 }}>
//                 <Alert
//                     severity="error"
//                     action={
//                         <Button color="error" size="small" onClick={fetchData} endIcon={<Refresh />}>
//                             Retry
//                         </Button>
//                     }
//                 >
//                     {error}
//                 </Alert>
//             </Box>
//         );
//     }

//     return (
//         <Container maxWidth="xl">
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//                 <Typography variant="h5" component="h2" fontWeight={600}>
//                     Dashboard
//                 </Typography>
//                 {/* <Button variant="outlined" color="primary" startIcon={<Refresh />} onClick={handleRefresh} disabled={refreshing} style={{ all: 'unset' }} /> */}
//             </Box>

//             <Grid container spacing={2}>
//                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                     <SummaryCard title="Total Leads" value={data?.summary?.totalLeads || 0} loading={isLoading} onClick={() => handleSummaryClick('leads')} icon={<Users className="h-5 w-5" />} />
//                 </Grid>
//                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                     <SummaryCard title="Active Opportunities" value={data?.summary?.activeLeads || 0} loading={isLoading} onClick={() => handleSummaryClick('opportunities')} icon={<MessageSquare className="h-5 w-5" />} />
//                 </Grid>
//                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                     <SummaryCard title="Potential Value" value={`₹ ${totalPotentialValue.toLocaleString()}`} loading={isLoading} onClick={() => handleSummaryClick('high value leads')} icon={<PiggyBank className="h-5 w-5" />} />
//                 </Grid>
//                 <Grid size={{ xs: 12, sm: 6, md: 3 }}>
//                     <SummaryCard title="Conversion Rate" value={`${data?.summary?.conversionRate || 0}%`} loading={isLoading} onClick={() => handleSummaryClick('conversions')} icon={<Calendar className="h-5 w-5" />} />
//                 </Grid>
//             </Grid>

//             <Grid container spacing={2} sx={{ mt: 2 }}>
//                 <Grid size={{ xs: 12, md: 9 }}>
//                     <Card sx={{ height: 350, borderRadius: 2, border: '1px solid #e5e7eb', position: 'relative', p: 2, boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)' }}>
//                         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                             <Typography variant="h5" fontWeight={600}>
//                                 Lead Acquisition
//                             </Typography>
//                             <FormControl size="small" sx={{ minWidth: 140 }}>
//                                 <InputLabel id="timeframe-label">Timeframe</InputLabel>
//                                 <Select labelId="timeframe-label" value={timeframe} label="Timeframe" onChange={handleTimeframeChange}>
//                                     <MenuItem value="monthly">Monthly</MenuItem>
//                                     <MenuItem value="weekly">Weekly</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Box>
//                         {isLoading ? (
//                             <Skeleton variant="rectangular" height={320} />
//                         ) : (
//                             <ResponsiveContainer width="100%" height="85%">
//                                 <AreaChart data={monthlyAcquisitionData} margin={{ top: 0, right: 0, left: -40, bottom: 0 }}>
//                                     <defs>
//                                         <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
//                                             {/* <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3} /> */}
//                                             <stop offset="5%" stopColor={'#0281FF'} stopOpacity={0.3} />
//                                             {/* <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} /> */}
//                                             <stop offset="95%" stopColor={'#0281FF'} stopOpacity={0} />
//                                         </linearGradient>
//                                     </defs>
//                                     <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
//                                     <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} stroke={theme.palette.text.secondary} />
//                                     <YAxis fontSize={12} tickLine={false} axisLine={false} stroke={theme.palette.text.secondary} />
//                                     {/* <Tooltip content={<CustomTooltip />} /> */}
//                                     <Area type="monotone" dataKey="value" stroke={theme.palette.primary.main} fill="url(#colorValue)" strokeWidth={2} />
//                                 </AreaChart>
//                             </ResponsiveContainer>
//                         )}
//                     </Card>
//                 </Grid>
//                 <Grid size={{ xs: 12, md: 3 }}>
//                     <Card sx={{ height: 350, borderRadius: 2, border: '1px solid #e5e7eb', boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)', padding: '16px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
//                         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                             <Typography variant="h5" component="h2" fontWeight={600}>
//                                 Upcoming Follow-ups
//                             </Typography>
//                             <Badge badgeContent={data?.upcomingFollowups?.length || 0} color="primary" max={99} />
//                         </Box>
//                         {isLoading ? (
//                             <>
//                                 {[...Array(3)].map((_, i) => (
//                                     <Box key={i} mb={2}>
//                                         <Skeleton variant="rectangular" height={60} />
//                                     </Box>
//                                 ))}
//                             </>
//                         ) : data?.upcomingFollowups?.length > 0 ? (
//                             <List sx={{ flex: 1, overflow: 'auto' }}>
//                                 {data.upcomingFollowups[0].followUps.map((followup, index) => (
//                                     <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
//                                         <ListItem sx={{ mb: 1, borderRadius: 1, bgcolor: index === 0 ? theme.palette.action.selected : 'transparent', transition: 'background-color 0.3s', '&:hover': { bgcolor: theme.palette.action.hover } }}>
//                                             <Schedule color={index === 0 ? 'primary' : 'action'} sx={{ mr: 2 }} />
//                                             <ListItemText
//                                                 primary={<Typography fontWeight={index === 0 ? 600 : 400}>{followup.title}</Typography>}
//                                                 secondary={
//                                                     <>
//                                                         {new Date(followup.date).toLocaleDateString()}
//                                                         <Box component="span" mx={1}>
//                                                             •
//                                                         </Box>
//                                                         {`${followup.assignTo.firstname} ${followup.assignTo.lastname}`}
//                                                     </>
//                                                 }
//                                             />
//                                         </ListItem>
//                                         {index < data.upcomingFollowups.length - 1 && <Divider />}
//                                     </motion.div>
//                                 ))}
//                             </List>
//                         ) : (
//                             <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" flex={1} textAlign="center">
//                                 <Schedule sx={{ fontSize: 60, color: theme.palette.text.disabled, mb: 2 }} />
//                                 <Typography variant="body1" sx={{ fontSize: '16px', color: '#878a99' }}>
//                                     No upcoming follow-ups scheduled
//                                 </Typography>
//                             </Box>
//                         )}
//                     </Card>
//                 </Grid>
//             </Grid>

//             <Grid container spacing={2} sx={{ mt: 2 }}>
//                 <Grid size={{ xs: 12, md: 6 }}>
//                     <Card sx={{ boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)', border: '1px solid #e5e7eb', borderRadius: 2, padding: '16px', height: '530px' }}>
//                         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                             <Typography variant="h5" component="h2" fontWeight={600}>
//                                 Recent Leads
//                             </Typography>
//                             <Button component={Link} href={`/${subdomain}/leads`} size="small" endIcon={<ArrowForward />}>
//                                 View All
//                             </Button>
//                         </Box>
//                         {isLoading ? (
//                             <Skeleton variant="rectangular" height={300} />
//                         ) : (
//                             <TableContainer>
//                                 <Table>
//                                     <TableHead>
//                                         <TableRow>
//                                             <TableCell>Lead</TableCell>
//                                             <TableCell>Contact</TableCell>
//                                             <TableCell>Status</TableCell>
//                                             <TableCell>Last Contact</TableCell>
//                                         </TableRow>
//                                     </TableHead>
//                                     <TableBody>
//                                         {recentLeads?.slice(0, 5).map((lead, index) => (
//                                             <motion.tr key={lead.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
//                                                 <TableCell>
//                                                     <Box display="flex" alignItems="center">
//                                                         <Person sx={{ mr: 1, color: theme.palette.text.secondary }} />
//                                                         <Box>
//                                                             <Typography fontWeight={500}>
//                                                                 <Link href={`/${subdomain}/leads/${lead.LeadId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                                                                     {lead.name}
//                                                                 </Link>
//                                                             </Typography>
//                                                             <Typography variant="body2" color="text.secondary">
//                                                                 <Business fontSize="inherit" sx={{ mr: 0.5 }} />
//                                                                 {lead.company}
//                                                             </Typography>
//                                                         </Box>
//                                                     </Box>
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <Box display="flex" alignItems="center" component={Link} href={`mailto:${lead?.email}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
//                                                         <Email fontSize="small" sx={{ mr: 1, color: theme.palette.text.secondary }} />
//                                                         <Typography variant="body2">{lead.email || 'N/A'}</Typography>
//                                                     </Box>
//                                                     <Box display="flex" alignItems="center" mt={0.5} component={Link} href={`tel:${lead?.phone}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
//                                                         <Phone fontSize="small" sx={{ mr: 1, color: theme.palette.text.secondary }} />
//                                                         <Typography variant="body2">{lead.phone || 'N/A'}</Typography>
//                                                     </Box>
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <Chip label={lead.status} color={lead.status === 'New' ? 'primary' : lead.status === 'Contacted' ? 'secondary' : 'default'} size="small" variant="outlined" />
//                                                 </TableCell>
//                                                 <TableCell>
//                                                     <Typography variant="body2">{lead.lastContact}</Typography>
//                                                 </TableCell>
//                                             </motion.tr>
//                                         ))}
//                                     </TableBody>
//                                 </Table>
//                             </TableContainer>
//                         )}
//                     </Card>
//                 </Grid>
//                 <Grid size={{ xs: 12, md: 6 }}>
//                     <Card sx={{ boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)', border: '1px solid #e5e7eb', borderRadius: 2, padding: '16px', height: '530px' }}>
//                         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                             <Typography variant="h5" component="h2" fontWeight={600}>
//                                 High Value Opportunities
//                             </Typography>
//                             <Button component={Link} href={`/${subdomain}/leads`} size="small" endIcon={<ArrowForward />}>
//                                 View All
//                             </Button>
//                         </Box>
//                         {isLoading ? (
//                             <Skeleton variant="rectangular" height={300} />
//                         ) : (
//                             <List disablePadding>
//                                 {highValueOpportunities?.length > 0 ? (
//                                     highValueOpportunities.map((opp, index) => (
//                                         <motion.div key={opp.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
//                                             <ListItem sx={{ display: 'block', mb: 0, transition: 'all 0.3s ease', '&:hover': { backgroundColor: theme.palette.action.hover, transform: 'translateX(5px)' }, textDecoration: 'none', color: 'inherit' }}>
//                                                 <Box display="flex" justifyContent="space-between" alignItems="center">
//                                                     <Box>
//                                                         <Typography variant="subtitle1" fontWeight={600} component={Link} href={`/${subdomain}/leads/${opp.LeadId}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
//                                                             {opp.name}
//                                                         </Typography>
//                                                         <Typography variant="body2" color="text.secondary">
//                                                             <Business fontSize="inherit" sx={{ mr: 0.5 }} />
//                                                             {opp.company}
//                                                         </Typography>
//                                                     </Box>
//                                                     {opp.valueFormatted > 0 && <Chip label={opp.valueFormatted} color="success" variant="filled" sx={{ fontWeight: 600 }} />}
//                                                 </Box>
//                                                 <Box display="flex">
//                                                     <Box flex={1}>
//                                                         <Typography variant="caption" display="flex" alignItems="center" component={Link} href={`mailto:${opp?.email}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
//                                                             <Email fontSize="inherit" sx={{ mr: 0.5 }} />
//                                                             {opp?.email || '-'}
//                                                         </Typography>
//                                                     </Box>
//                                                     <Box>
//                                                         <Typography variant="caption" display="flex" alignItems="center" component={Link} href={`tel:${opp?.phone}`} sx={{ textDecoration: 'none' }}>
//                                                             <Phone fontSize="inherit" sx={{ mr: 0.5 }} />
//                                                             {opp?.phone || '-'}
//                                                         </Typography>
//                                                     </Box>
//                                                 </Box>
//                                             </ListItem>
//                                             {index < highValueOpportunities.length - 1 && <Divider />}
//                                         </motion.div>
//                                     ))
//                                 ) : (
//                                     <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height={200} textAlign="center">
//                                         <TrendingUp />
//                                         <Typography variant="body1" color="text.secondary">
//                                             No high value opportunities found
//                                         </Typography>
//                                         <Button variant="outlined" size="small" sx={{ mt: 2 }} component={Link} href={`/${subdomain}/leads/create`}>
//                                             Create New Opportunity
//                                         </Button>
//                                     </Box>
//                                 )}
//                             </List>
//                         )}
//                     </Card>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };

// export default Dashboard;
import React from 'react';
import Dashboard from './Dashboard';

export default function page() {
    return (
        <div>
            <Dashboard />
        </div>
    );
}
