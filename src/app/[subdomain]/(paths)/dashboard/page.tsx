// // // "use client"
// // // import React, { useEffect } from 'react';
// // // import '../../../styles/dashboard.scss';
// // // import { createSwapy } from 'swapy';
// // // import Cookies from "js-cookie";
// // // const DEFAULT_ITEMS = {
// // //   '1': 'a',
// // //   '2': null,
// // //   '3': 'c',
// // //   '4': 'd'
// // // };

// // // function A() {
// // //   return (
// // //     <div className="item a" data-swapy-item="a">
// // //       <div className="handle" data-swapy-handle></div>
// // //       <div>A</div>
// // //     </div>
// // //   );
// // // }

// // // function C() {
// // //   return (
// // //     <div className="item c" data-swapy-item="c">
// // //       <div >C</div>
// // //     </div>
// // //   );
// // // }

// // // function D() {
// // //   return (
// // //     <div className="item d" data-swapy-item="d">
// // //       <div>D</div>
// // //     </div>
// // //   );
// // // }

// // // function getItemById(itemId) {
// // //   switch (itemId) {
// // //     case 'a':
// // //       return <A />;
// // //     case 'c':
// // //       return <C />;
// // //     case 'd':
// // //       return <D />;
// // //     default:
// // //       return null;
// // //   }
// // // }

// // // function Dashboard() {
// // //   const savedItems = Cookies.get('slotItem');
// // //   const slotItems = savedItems ? JSON.parse(savedItems) : DEFAULT_ITEMS;

// // //   useEffect(() => {
// // //     const container = document.querySelector('.container');
// // //     const swapy = createSwapy(container, { swapMode: 'hover' });

// // //     swapy.onSwap(({ data }) => {
// // //       Cookies.get('slotItem', JSON.stringify(data.object));
// // //     });

// // //     swapy.onSwapEnd(({ data }) => {
// // //       // console.log('Swap ended:', data);
// // //     });

// // //     swapy.onSwapStart(() => {
// // //       // console.log('Swap started');
// // //     });

// // //     return () => {
// // //       swapy.destroy();
// // //     };
// // //   }, []);

// // //   return (
// // //     <div className="container ">
// // //       <div className='d-flex'>

// // //       <div className="slot a" data-swapy-slot="1">
// // //         {getItemById(slotItems['1'])}
// // //       </div>
// // //       <div className="second-row">
// // //         <div className="slot b" data-swapy-slot="2">
// // //           {getItemById(slotItems['2'])}
// // //         </div>
// // //         <div className="slot c" data-swapy-slot="3">
// // //           {getItemById(slotItems['3'])}
// // //         </div>
// // //       </div>
// // //       <div className="slot d" data-swapy-slot="4">
// // //         {getItemById(slotItems['4'])}
// // //       </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default Dashboard;
// // // src/components/Dashboard/Dashboard.tsx
// // 'use client';
// // import React, { useEffect, useState } from 'react';
// // import Cookies from 'js-cookie';
// // import { Container, Grid, Card, CardContent, Typography, Box, List, ListItem, ListItemText, Divider, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Alert } from '@mui/material';
// // import { TrendingUp, TrendingDown, Schedule } from '@mui/icons-material';
// // import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// // import { GETactivity } from '../../../../../api/dashboardApi';

// // const SummaryCard = ({ title, value, change }: { title: any; value: any; change: any }) => {
// //     const isPositive = change >= 0;

// //     return (
// //         <Card>
// //             <CardContent>
// //                 <Typography color="textSecondary" gutterBottom>
// //                     {title}
// //                 </Typography>
// //                 <Typography variant="h5" component="h2">
// //                     {value}
// //                 </Typography>
// //                 <Typography color={isPositive ? 'success.main' : 'error.main'} variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
// //                     {isPositive ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
// //                     {Math.abs(change)}% from last month
// //                 </Typography>
// //             </CardContent>
// //         </Card>
// //     );
// // };

// // const Dashboard = () => {
// //     // const { data, isLoading, error } = useQuery('dashboardData', );
// //     const [data, setData] = useState(null);
// //     const [isLoading, setLoading] = useState(false);
// //     const [error, setError] = useState(false);
// //     const subdomain = Cookies.get('subdomain');

// //     const fetchData = async () => {
// //         setLoading(true);
// //         const response = await GETactivity(subdomain);
// //         if (response) {
// //             setData(response);
// //             console.log(response.data, 'response');
// //         } else {
// //             setError(response.data.error);
// //         }
// //     };
// //     useEffect(() => {
// //         fetchData();
// //     }, []);

// //     if (isLoading) {
// //         return (
// //             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
// //                 <CircularProgress />
// //             </Box>
// //         );
// //     }

// //     if (error) {
// //         return (
// //             <Box sx={{ p: 3 }}>
// //                 <Alert severity="error">Error loading dashboard data</Alert>
// //             </Box>
// //         );
// //     }

// //     // Transform data for charts and components
// //     const monthlyAcquisitionData = data?.acquisition?.monthly?.labels?.map((label, index) => ({
// //         name: label,
// //         value: data.acquisition.monthly.data[index]
// //     }));

// //     const recentLeads = data?.recentLeads.map((lead) => ({
// //         name: lead.manualData.name,
// //         company: lead.manualData.company,
// //         value: lead.potentialValue,
// //         status: lead.leadstatus.statusName || 'New'
// //     }));

// //     const highValueOpportunities = recentLeads
// //         ?.sort((a, b) => b.value - a.value)
// //         .slice(0, 5)
// //         .map((lead) => ({
// //             name: lead.name,
// //             company: lead.company,
// //             value: `$${lead.value.toLocaleString()}`
// //         }));

// //     return (
// //         <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
// //             {/* Summary Section */}
// //             <Grid container spacing={3}>
// //                 <Grid size={{ xs: 12, md: 3 }}>
// //                     <SummaryCard title="Total Leads" value={data?.summary?.totalLeads || 0} change={8.7} />
// //                 </Grid>
// //                 <Grid size={{ xs: 12, md: 3 }}>
// //                     <SummaryCard title="Active Opportunities" value={data?.summary?.activeLeads || 0} change={12.3} />
// //                 </Grid>
// //                 <Grid size={{ xs: 12, md: 3 }}>{/* <SummaryCard title="Potential Value" value={`$${data?.recentLeads?.reduce((sum, lead) => sum + (lead.potentialValue || 0), 0) || 0}`} change={3.2} /> */}</Grid>
// //                 <Grid size={{ xs: 12, md: 3 }}>
// //                     <SummaryCard title="conversionRate" value={data?.summary?.conversionRate} change={2.5} />
// //                 </Grid>
// //             </Grid>

// //             {/* Charts and Tasks */}
// //             <Grid container spacing={3} sx={{ mt: 2 }}>
// //                 <Grid size={{ xs: 12, md: 8 }}>
// //                     <Box sx={{ p: 2, height: 300, bgcolor: 'background.paper', borderRadius: 1 }}>
// //                         <Typography variant="h6" gutterBottom>
// //                             Lead Acquisition
// //                         </Typography>
// //                         <ResponsiveContainer width="100%" height="80%">
// //                             <BarChart data={monthlyAcquisitionData}>
// //                                 <CartesianGrid strokeDasharray="3 3" />
// //                                 <XAxis dataKey="name" />
// //                                 <YAxis />
// //                                 <Tooltip />
// //                                 <Bar dataKey="value" fill="#8884d8" />
// //                             </BarChart>
// //                         </ResponsiveContainer>
// //                     </Box>
// //                 </Grid>
// //                 <Grid size={{ xs: 12, md: 4 }}>
// //                     <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
// //                         <Typography variant="h6" gutterBottom>
// //                             Upcoming Tasks
// //                         </Typography>
// //                         <Typography variant="subtitle2" color="textSecondary" gutterBottom>
// //                             Your scheduled tasks for today
// //                         </Typography>
// //                         <List>
// //                             <Divider />
// //                             <ListItem>
// //                                 <Schedule color="action" sx={{ mr: 2 }} />
// //                                 <ListItemText primary="Follow up with Sara Miller" secondary="Today, 11:30 AM" />
// //                             </ListItem>
// //                             <Divider />
// //                             <ListItem>
// //                                 <Schedule color="action" sx={{ mr: 2 }} />
// //                                 <ListItemText primary="Send proposal to Acme Corp" secondary="Today, 2:00 PM" />
// //                             </ListItem>
// //                             <Divider />
// //                         </List>
// //                     </Box>
// //                 </Grid>
// //             </Grid>

// //             {/* Recent Leads and Opportunities */}
// //             <Grid container spacing={3} sx={{ mt: 2 }}>
// //                 <Grid size={{ xs: 12, md: 6 }}>
// //                     <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
// //                         <Typography variant="h6" gutterBottom>
// //                             Recent Leads
// //                         </Typography>
// //                         <TableContainer component={Paper}>
// //                             <Table>
// //                                 <TableHead>
// //                                     <TableRow>
// //                                         <TableCell>Name</TableCell>
// //                                         <TableCell>Company</TableCell>
// //                                         <TableCell>Status</TableCell>
// //                                     </TableRow>
// //                                 </TableHead>
// //                                 <TableBody>
// //                                     {recentLeads?.slice(0, 5).map((lead, index) => (
// //                                         <TableRow key={index}>
// //                                             <TableCell>
// //                                                 <strong>{lead.name}</strong>
// //                                             </TableCell>
// //                                             <TableCell>{lead.company}</TableCell>
// //                                             <TableCell>{lead.status}</TableCell>
// //                                         </TableRow>
// //                                     ))}
// //                                 </TableBody>
// //                             </Table>
// //                         </TableContainer>
// //                     </Box>
// //                 </Grid>
// //                 <Grid size={{ xs: 12, md: 6 }}>
// //                     <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
// //                         <Typography variant="h6" gutterBottom>
// //                             High Value Opportunities
// //                         </Typography>
// //                         <List>
// //                             {highValueOpportunities?.map((opp, index) => (
// //                                 <div key={index}>
// //                                     <ListItem>
// //                                         <ListItemText
// //                                             primary={
// //                                                 <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
// //                                                     <Typography variant="subtitle1">
// //                                                         <strong>{opp.name}</strong> - {opp.company}
// //                                                     </Typography>
// //                                                     <Chip label={opp.value} color="success" />
// //                                                 </Box>
// //                                             }
// //                                         />
// //                                     </ListItem>
// //                                     {index < highValueOpportunities.length - 1 && <Divider />}
// //                                 </div>
// //                             ))}
// //                         </List>
// //                     </Box>
// //                 </Grid>
// //             </Grid>
// //         </Container>
// //     );
// // };

// // export default Dashboard;

// 'use client';
// import React, { useCallback, useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import {
//     Container,
//     Grid,
//     Card,
//     CardContent,
//     Typography,
//     Box,
//     List,
//     ListItem,
//     ListItemText,
//     Divider,
//     Chip,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     CircularProgress,
//     Alert,
//     Skeleton,
//     Grow,
//     Fade,
//     Slide
// } from '@mui/material';
// import { TrendingUp, TrendingDown, Schedule } from '@mui/icons-material';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { GETactivity } from '../../../../../api/dashboardApi';
// import { motion } from 'framer-motion';
// import Link from 'next/link';

// const SummaryCard = ({ title, value, change, loading }: { title: string; value: any; change: number; loading?: boolean }) => {
//     const isPositive = change >= 0;

//     return (
//         <Grow in={true} timeout={1000}>
//             <Card sx={{ height: '100%', minHeight: 150 }} variant="outlined">
//                 <CardContent>
//                     {loading ? (
//                         <>
//                             <Skeleton variant="text" width="60%" />
//                             <Skeleton variant="rectangular" height={30} sx={{ my: 1 }} />
//                             <Skeleton variant="text" width="80%" />
//                         </>
//                     ) : (
//                         <>
//                             <Typography color="textSecondary" gutterBottom>
//                                 {title}
//                             </Typography>
//                             <Typography variant="h5" component="h2">
//                                 {value}
//                             </Typography>
//                             <Typography color={isPositive ? 'success.main' : 'error.main'} variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
//                                 {isPositive ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
//                                 {Math.abs(change)}% from last month
//                             </Typography>
//                         </>
//                     )}
//                 </CardContent>
//             </Card>
//         </Grow>
//     );
// };

// const Dashboard = () => {
//     const [data, setData] = useState<any>(null);
//     const [isLoading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const subdomain = Cookies.get('subdomain');

//     const fetchData = useCallback(async () => {
//         try {
//             setLoading(true);
//             const response = await GETactivity(subdomain);
//             if (response) {
//                 setData(response.data);
//             } else {
//                 setError('Failed to fetch data');
//             }
//         } catch (err) {
//             setError('An error occurred while fetching data');
//         } finally {
//             setLoading(false);
//         }
//     }, [subdomain]); // Include any dependencies here

//     useEffect(() => {
//         fetchData();
//     }, [fetchData]); // Include fetchData in the dependency array

//     // Transform data for charts and components
//     const monthlyAcquisitionData = data?.acquisition?.monthly?.labels?.map((label: string, index: number) => ({
//         name: label,
//         value: data.acquisition.monthly.data[index] || 0
//     }));

//     const recentLeads = data?.recentLeads?.map((lead: any) => ({
//         id: lead._id,
//         name: lead.manualData?.name || 'Unknown',
//         company: lead.manualData?.company || 'Unknown',
//         value: lead.potentialValue || 0,
//         status: lead.leadstatus?.statusName || 'New',
//         email: lead.manualData?.email,
//         phone: lead.manualData?.mobileNo,
//         LeadId: lead?.LeadId
//     }));

//     const highValueOpportunities = recentLeads
//         ?.sort((a: any, b: any) => b.value - a.value)
//         .slice(0, 5)
//         .map((lead: any) => ({
//             id: lead.id,
//             name: lead.name,
//             company: lead.company,
//             value: `$${lead.value.toLocaleString()}`,
//             email: lead.email,
//             phone: lead.phone,
//             LeadId: lead?.LeadId
//         }));

//     const totalPotentialValue = recentLeads?.reduce((sum: number, lead: any) => sum + (lead.value || 0), 0) || 0;

//     if (isLoading && !data) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//                 <CircularProgress size={60} />
//             </Box>
//         );
//     }

//     if (error) {
//         return (
//             <Box sx={{ p: 3 }}>
//                 <Alert severity="error" action={<Chip label="Retry" onClick={fetchData} color="error" variant="outlined" clickable />}>
//                     {error}
//                 </Alert>
//             </Box>
//         );
//     }

//     return (
//         <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
//             {/* Summary Section */}
//             <Grid container spacing={3}>
//                 <Grid size={{ xs: 12, md: 3 }}>
//                     <SummaryCard title="Total Leads" value={data?.summary?.totalLeads || 0} change={8.7} loading={isLoading} />
//                 </Grid>
//                 <Grid size={{ xs: 12, md: 3 }}>
//                     <SummaryCard title="Active Opportunities" value={data?.summary?.activeLeads || 0} change={12.3} loading={isLoading} />
//                 </Grid>
//                 <Grid size={{ md: 3, xs: 12 }}>
//                     <SummaryCard title="Potential Value" value={`$${totalPotentialValue.toLocaleString()}`} change={3.2} loading={isLoading} />
//                 </Grid>
//                 <Grid size={{ md: 3, xs: 12 }}>
//                     <SummaryCard title="Conversion Rate" value={`${data?.summary?.conversionRate || 0}%`} change={2.5} loading={isLoading} />
//                 </Grid>
//             </Grid>

//             <Grid container spacing={3} sx={{ mt: 2 }}>
//                 <Grid size={{ md: 8, xs: 12 }}>
//                     <Slide direction="up" in={!isLoading} mountOnEnter unmountOnExit>
//                         <Box
//                             sx={{
//                                 p: 2,
//                                 height: 300,
//                                 bgcolor: 'background.paper',
//                                 borderRadius: 1,
//                                 boxShadow: 1
//                             }}
//                         >
//                             <Typography variant="h6" gutterBottom>
//                                 Lead Acquisition
//                             </Typography>
//                             {isLoading ? (
//                                 <Skeleton variant="rectangular" height={200} />
//                             ) : (
//                                 <ResponsiveContainer width="100%" height="80%">
//                                     <BarChart data={monthlyAcquisitionData}>
//                                         <CartesianGrid strokeDasharray="3 3" />
//                                         <XAxis dataKey="name" />
//                                         <YAxis />
//                                         <Tooltip />
//                                         <Bar dataKey="value" fill="#8884d8" animationDuration={1500} animationEasing="ease-in-out">
//                                             {monthlyAcquisitionData?.map((entry: any, index: any) => (
//                                                 <motion.g key={`cell-${index}`}>
//                                                     {/* <rect fill="#8884d8" x={index * 30} y={0} width={20} height={entry.value * 10} initial={{ height: 0 }} animate={{ height: entry.value * 10 }} transition={{ duration: 0.5, delay: index * 0.1 }} /> */}
//                                                 </motion.g>
//                                             ))}
//                                         </Bar>
//                                     </BarChart>
//                                 </ResponsiveContainer>
//                             )}
//                         </Box>
//                     </Slide>
//                 </Grid>
//                 <Grid size={{ md: 4, xs: 12 }}>
//                     <Fade in={!isLoading} timeout={1000}>
//                         <Box
//                             sx={{
//                                 p: 2,
//                                 bgcolor: 'background.paper',
//                                 borderRadius: 1,
//                                 boxShadow: 1,
//                                 height: '100%',
//                                 minHeight: 300
//                             }}
//                         >
//                             <Typography variant="h6" gutterBottom>
//                                 Upcoming Follow-ups
//                             </Typography>
//                             {isLoading ? (
//                                 <>
//                                     <Skeleton variant="text" width="60%" />
//                                     <Skeleton variant="rectangular" height={60} sx={{ my: 1 }} />
//                                     <Skeleton variant="rectangular" height={60} sx={{ my: 1 }} />
//                                 </>
//                             ) : data?.upcomingFollowups?.length > 0 ? (
//                                 <List>
//                                     {data.upcomingFollowups.map((followup: any, index: number) => (
//                                         <div key={index}>
//                                             <Divider />
//                                             <ListItem>
//                                                 <Schedule color="action" sx={{ mr: 2 }} />
//                                                 <ListItemText primary={followup.title} secondary={`${new Date(followup.date).toLocaleDateString()}, ${followup.assignee}`} />
//                                             </ListItem>
//                                         </div>
//                                     ))}
//                                     <Divider />
//                                 </List>
//                             ) : (
//                                 <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
//                                     No upcoming follow-ups scheduled
//                                 </Typography>
//                             )}
//                         </Box>
//                     </Fade>
//                 </Grid>
//             </Grid>

//             <Grid container spacing={3} sx={{ mt: 2 }}>
//                 <Grid size={{ md: 6, xs: 12 }}>
//                     <Grow in={!isLoading} timeout={1500}>
//                         <Box
//                             sx={{
//                                 p: 2,
//                                 bgcolor: 'background.paper',
//                                 borderRadius: 1,
//                                 boxShadow: 1
//                             }}
//                         >
//                             <Typography variant="h6" gutterBottom>
//                                 Recent Leads
//                             </Typography>
//                             {isLoading ? (
//                                 <Skeleton variant="rectangular" height={300} />
//                             ) : (
//                                 <TableContainer component={Paper}>
//                                     <Table>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell>Name</TableCell>
//                                                 <TableCell>Contact</TableCell>
//                                                 <TableCell>Status</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {recentLeads?.slice(0, 5).map((lead: any, index: number) => (
//                                                 <motion.tr key={lead.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
//                                                     <TableCell>
//                                                         <strong>{lead.name}</strong>

//                                                         <Typography variant="body2" color="textSecondary">
//                                                             <Link href={`/${subdomain}/leads/${lead.LeadId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                                                                 {lead.company}
//                                                             </Link>
//                                                         </Typography>
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         <Typography variant="body2">{lead.email}</Typography>
//                                                         <Typography variant="body2">{lead.phone}</Typography>
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         <Chip label={lead.status} color={lead.status === 'New' ? 'primary' : lead.status === 'Contacted' ? 'secondary' : 'default'} size="small" />
//                                                     </TableCell>
//                                                 </motion.tr>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             )}
//                         </Box>
//                     </Grow>
//                 </Grid>
//                 <Grid size={{ md: 6, xs: 12 }}>
//                     <Grow in={!isLoading} timeout={1500}>
//                         <Box
//                             sx={{
//                                 p: 2,
//                                 bgcolor: 'background.paper',
//                                 borderRadius: 1,
//                                 boxShadow: 1
//                             }}
//                         >
//                             <Typography variant="h6" gutterBottom>
//                                 High Value Opportunities
//                             </Typography>
//                             {isLoading ? (
//                                 <Skeleton variant="rectangular" height={300} />
//                             ) : (
//                                 <List>
//                                     {highValueOpportunities?.length > 0 ? (
//                                         highValueOpportunities.map((opp: any, index: number) => (
//                                             <motion.div key={opp.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
//                                                 <ListItem>
//                                                     <Link href={`/${subdomain}/leads/${opp.LeadId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
//                                                         <ListItemText
//                                                             primary={
//                                                                 <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                                                                     <Box>
//                                                                         <Typography variant="subtitle1">
//                                                                             <strong>{opp.name}</strong>
//                                                                         </Typography>
//                                                                         <Typography variant="body2" color="textSecondary">
//                                                                             {opp.company}
//                                                                         </Typography>
//                                                                     </Box>
//                                                                     <Chip label={opp.value} color="success" variant="outlined" />
//                                                                 </Box>
//                                                             }
//                                                             secondary={
//                                                                 <Box sx={{ mt: 1 }}>
//                                                                     <Typography variant="body2">{opp.email}</Typography>
//                                                                     <Typography variant="body2">{opp.phone}</Typography>
//                                                                 </Box>
//                                                             }
//                                                         />
//                                                     </Link>
//                                                 </ListItem>
//                                                 {index < highValueOpportunities.length - 1 && <Divider />}
//                                             </motion.div>
//                                         ))
//                                     ) : (
//                                         <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
//                                             No high value opportunities found
//                                         </Typography>
//                                     )}
//                                 </List>
//                             )}
//                         </Box>
//                     </Grow>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };

// export default Dashboard;
'use client';
// import React, { useCallback, useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import {
//     Container,
//     Grid,
//     Card,
//     CardContent,
//     Typography,
//     Box,
//     List,
//     ListItem,
//     ListItemText,
//     Divider,
//     Chip,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow,
//     CircularProgress,
//     Alert,
//     Skeleton,
//     Grow,
//     Fade,
//     Slide,
//     Button,
//     IconButton,
//     useTheme,
//     Badge,
//     FormControl,
//     InputLabel,
//     Select,
//     MenuItem
// } from '@mui/material';
// import { TrendingUp, TrendingDown, Schedule, Refresh, ArrowForward, Email, Phone, Business, Person } from '@mui/icons-material';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
// import { GETactivity } from '../../../../../api/dashboardApi';
// import { motion } from 'framer-motion';
// import Link from 'next/link';

// const SummaryCard = ({ title, value, change, loading, onClick }: { title: string; value: any; change: number; loading?: boolean; onClick?: () => void }) => {
//     const isPositive = change >= 0;
//     const theme = useTheme();

//     return (
//         <motion.div transition={{ duration: 0.2 }}>
//             <Card
//                 // variant="outlined"
//                 onClick={onClick}
//                 style={{ boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)', border: '0px', padding: 16 }}
//             >
//                 {/* <CardContent> */}
//                 {loading ? (
//                     <>
//                         <Skeleton variant="text" width="60%" />
//                         <Skeleton variant="rectangular" height={30} sx={{ my: 1 }} />
//                         <Skeleton variant="text" width="80%" />
//                     </>
//                 ) : (
//                     <>
//                         <Typography gutterBottom sx={{ fontsize: '16px', color: '#878a99' }}>
//                             {title}
//                         </Typography>
//                         <Typography variant="h5" component="h2" fontWeight={600}>
//                             {value}
//                         </Typography>
//                         {/* <Box display="flex" alignItems="center" sx={{ marginTop: '2px' }}>
//                             <Chip icon={isPositive ? <TrendingUp /> : <TrendingDown />} label={`${Math.abs(change)}%`} color={isPositive ? 'success' : 'error'} variant="outlined" size="small" sx={{ border: 'none' }} />
//                             <Typography variant="caption" color="text.secondary">
//                                 vs last month
//                             </Typography>
//                         </Box> */}
//                     </>
//                 )}
//                 {/* </CardContent> */}
//             </Card>
//         </motion.div>
//     );
// };

// const Dashboard = () => {
//     const [data, setData] = useState<any>(null);
//     const [isLoading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [refreshing, setRefreshing] = useState(false);
//     const subdomain = Cookies.get('subdomain');
//     const [timeframe, setTimeframe] = useState<'monthly' | 'weekly'>('monthly');
//     const theme = useTheme();
//     const [isTimeframeLoading, setIsTimeframeLoading] = useState(false);

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

//     // Transform data for charts and components
//     const monthlyAcquisitionData = data?.acquisition?.monthly?.labels?.map((label: string, index: number) => ({
//         name: label,
//         value: data.acquisition.monthly.data[index] || 0
//     }));
//     {
//         console.log(data?.recentLeads, 'recentLeads');
//     }
//     const recentLeads = data?.recentLeads?.map((lead: any) => ({
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
//         ?.sort((a: any, b: any) => b.value - a.value)
//         .slice(0, 5)
//         .map((lead: any) => ({
//             ...lead,
//             valueFormatted: `₹ ${lead.value.toLocaleString()}`
//         }));

//     const totalPotentialValue = recentLeads?.reduce((sum: number, lead: any) => sum + (lead.value || 0), 0) || 0;

//     const handleRefresh = () => {
//         fetchData();
//     };

//     const handleSummaryClick = (type: string) => {
//         // You can add navigation or filtering logic here
//         console.log(`View all ${type}`);
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
//     const CustomTooltip = ({ active, payload, label }: any) => {
//         if (active && payload && payload.length) {
//             return (
//                 <Box
//                     sx={{
//                         backgroundColor: theme.palette.background.paper,
//                         p: 2,
//                         borderRadius: 2,
//                         boxShadow: 3
//                     }}
//                 >
//                     <Typography variant="subtitle2">{label}</Typography>
//                     <Typography color="primary">{`Leads: ${payload[0].value}`}</Typography>
//                 </Box>
//             );
//         }
//         return null;
//     };
//     const handleTimeframeChange = (event: any) => {
//         const value = event.target.value;
//         setTimeframe(value);
//         setIsLoading(true);
//         setTimeout(() => {
//             setData(value === 'monthly' ? generateMonthlyData() : generateWeeklyData());
//             setIsLoading(false);
//         }, 500); // simulate API delay
//     };
//     return (
//         <Container maxWidth="xl">
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//                 <Typography variant="h5" component="h2" fontWeight={600}>
//                     Dashboard
//                 </Typography>
//                 <Button variant="outlined" color="primary" startIcon={<Refresh />} onClick={handleRefresh} disabled={refreshing} style={{ all: 'unset' }}></Button>
//             </Box>

//             {/* Summary Section */}
//             <Grid container spacing={2}>
//                 <Grid size={{ xs: 12, md: 3 }}>
//                     <SummaryCard title="Total Leads" value={data?.summary?.totalLeads || 0} change={8.7} loading={isLoading} onClick={() => handleSummaryClick('leads')} />
//                 </Grid>
//                 <Grid size={{ xs: 12, md: 3 }}>
//                     <SummaryCard title="Active Opportunities" value={data?.summary?.activeLeads || 0} change={12.3} loading={isLoading} onClick={() => handleSummaryClick('opportunities')} />
//                 </Grid>
//                 <Grid size={{ xs: 12, md: 3 }}>
//                     <SummaryCard title="Potential Value" value={`₹ ${totalPotentialValue.toLocaleString()}`} change={3.2} loading={isLoading} onClick={() => handleSummaryClick('high value leads')} />
//                 </Grid>
//                 <Grid size={{ xs: 12, md: 3 }}>
//                     <SummaryCard title="Conversion Rate" value={`${data?.summary?.conversionRate || 0}%`} change={2.5} loading={isLoading} onClick={() => handleSummaryClick('conversions')} />
//                 </Grid>
//             </Grid>

//             <Grid container spacing={2} sx={{ mt: 2 }}>
//                 <Grid size={{ xs: 12, md: 6 }}>
//                     {/* <Slide direction="up" in={!isLoading} mountOnEnter unmountOnExit>
//                         <Card
//                             sx={{
//                                 // p: 1,
//                                 height: 400,
//                                 // borderRadius: 2,

//                                 position: 'relative',
//                                 boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)',
//                                 border: '0px',
//                                 padding: '16px'
//                             }}

//                         >
//                             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                                 <Typography variant="h5" component="h2" fontWeight={600}>
//                                     Lead Acquisition
//                                 </Typography>

//                             </Box>
//                             {isLoading ? (
//                                 <Skeleton variant="rectangular" height={320} />
//                             ) : (
//                                 <ResponsiveContainer width="90%" height="85%">
//                                     <BarChart data={monthlyAcquisitionData}>
//                                         <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
//                                         <XAxis dataKey="name" tick={{ fill: theme.palette.text.secondary }} />
//                                         <YAxis tick={{ fill: theme.palette.text.secondary }} />
//                                         <Tooltip
//                                             contentStyle={{
//                                                 borderRadius: theme.shape.borderRadius,
//                                                 boxShadow: theme.shadows[3],
//                                                 border: 'none'
//                                             }}
//                                         />
//                                         <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={1500}>
//                                             {monthlyAcquisitionData?.map((entry: any, index: any) => (
//                                                 <Cell key={`cell-${index}`} fill={theme.palette.primary.main} />
//                                             ))}
//                                         </Bar>
//                                     </BarChart>
//                                 </ResponsiveContainer>
//                             )}
//                         </Card>
//                     </Slide> */}
//                     <Slide direction="up" in={!isLoading} mountOnEnter unmountOnExit>
//                         <Card
//                             sx={{
//                                 height: 400,
//                                 position: 'relative',
//                                 p: 2,
//                                 boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)'
//                             }}
//                         >
//                             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                                 <Typography variant="h5" fontWeight={600}>
//                                     Lead Acquisition
//                                 </Typography>
//                                 <FormControl size="small" sx={{ minWidth: 140 }}>
//                                     <InputLabel id="timeframe-label">Timeframe</InputLabel>
//                                     <Select labelId="timeframe-label" value={timeframe} label="Timeframe" onChange={handleTimeframeChange}>
//                                         <MenuItem value="monthly">Monthly</MenuItem>
//                                         <MenuItem value="weekly">Weekly</MenuItem>
//                                     </Select>
//                                 </FormControl>
//                             </Box>
//                             {isLoading ? (
//                                 <Skeleton variant="rectangular" height={320} />
//                             ) : (
//                                 <ResponsiveContainer width="100%" height="85%">
//                                     <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
//                                         <defs>
//                                             <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
//                                                 <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3} />
//                                                 <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} />
//                                             </linearGradient>
//                                         </defs>
//                                         <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
//                                         <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} stroke={theme.palette.text.secondary} />
//                                         <YAxis fontSize={12} tickLine={false} axisLine={false} stroke={theme.palette.text.secondary} />
//                                         <Tooltip content={<CustomTooltip />} />
//                                         <Area type="monotone" dataKey="value" stroke={theme.palette.primary.main} fill="url(#colorValue)" strokeWidth={2} />
//                                     </AreaChart>
//                                 </ResponsiveContainer>
//                             )}
//                         </Card>
//                     </Slide>
//                 </Grid>
//                 <Grid size={{ xs: 12, md: 6 }}>
//                     <Fade in={!isLoading} timeout={1000}>
//                         <Card
//                             sx={{
//                                 // p: 3,
//                                 height: 400,
//                                 boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)',
//                                 border: '0px',
//                                 padding: '16px',
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 overflowY: 'auto'
//                             }}
//                             // variant="outlined"
//                         >
//                             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                                 <Typography variant="h5" component="h2" fontWeight={600}>
//                                     Upcoming Follow-ups
//                                 </Typography>
//                                 <Badge badgeContent={data?.upcomingFollowups?.length || 0} color="primary" max={99} />
//                             </Box>
//                             {isLoading ? (
//                                 <>
//                                     {[...Array(3)].map((_, i) => (
//                                         <Box key={i} mb={2}>
//                                             <Skeleton variant="rectangular" height={60} />
//                                         </Box>
//                                     ))}
//                                 </>
//                             ) : data?.upcomingFollowups?.length > 0 ? (
//                                 <List sx={{ flex: 1, overflow: 'auto' }}>
//                                     {console.log(data.upcomingFollowups, 'data.upcomingFollowups')}
//                                     {data.upcomingFollowups[0].followUps.map((followup: any, index: number) => (
//                                         <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
//                                             <ListItem
//                                                 sx={{
//                                                     mb: 1,
//                                                     borderRadius: 1,
//                                                     bgcolor: index === 0 ? theme.palette.action.selected : 'transparent',
//                                                     transition: 'background-color 0.3s',
//                                                     '&:hover': {
//                                                         bgcolor: theme.palette.action.hover
//                                                     }
//                                                 }}
//                                             >
//                                                 <Schedule color={index === 0 ? 'primary' : 'action'} sx={{ mr: 2 }} />
//                                                 <ListItemText
//                                                     primary={<Typography fontWeight={index === 0 ? 600 : 400}>{followup.title}</Typography>}
//                                                     secondary={
//                                                         <>
//                                                             {new Date(followup.date).toLocaleDateString()}
//                                                             <Box component="span" mx={1}>
//                                                                 •
//                                                             </Box>
//                                                             {`${followup.assignTo.firstname} ${followup.assignTo.lastname}`}
//                                                         </>
//                                                     }
//                                                 />
//                                                 {/* {console.log(followup, 'followup')} */}
//                                                 {/* <Link href={`/${subdomain}/leads/${followup.leadsId}`}> */}
//                                                 {/* <IconButton edge="end" size="small">
//                                                     <ArrowForward fontSize="small" />
//                                                 </IconButton> */}
//                                                 {/* </Link> */}
//                                             </ListItem>
//                                             {index < data.upcomingFollowups.length - 1 && <Divider />}
//                                         </motion.div>
//                                     ))}
//                                 </List>
//                             ) : (
//                                 <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" flex={1} textAlign="center">
//                                     <Schedule sx={{ fontSize: 60, color: theme.palette.text.disabled, mb: 2 }} />
//                                     <Typography variant="body1" sx={{ fontsize: '16px', color: '#878a99' }}>
//                                         No upcoming follow-ups scheduled
//                                     </Typography>
//                                     {/* <Button variant="outlined" size="small" sx={{ mt: 2 }}>
//                                         Schedule Follow-up
//                                     </Button> */}
//                                 </Box>
//                             )}
//                         </Card>
//                     </Fade>
//                 </Grid>
//             </Grid>

//             <Grid container spacing={2} sx={{ mt: 2 }}>
//                 <Grid size={{ xs: 12, md: 6 }} sx={{ background: 'white', width: '100%' }}>
//                     <Grow in={!isLoading} timeout={1500}>
//                         <Card
//                             sx={{
//                                 // p: 3,
//                                 // borderRadius: 2
//                                 boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)',
//                                 border: '0px',
//                                 padding: '16px',
//                                 height: '530px'
//                             }}
//                             // elevation={3}
//                             // variant="outlined"
//                         >
//                             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                                 <Typography variant="h5" component="h2" fontWeight={600}>
//                                     Recent Leads
//                                 </Typography>
//                                 <Button component={Link} href={`/${subdomain}/leads`} size="small" endIcon={<ArrowForward />}>
//                                     View All
//                                 </Button>
//                             </Box>
//                             {isLoading ? (
//                                 <Skeleton variant="rectangular" height={300} />
//                             ) : (
//                                 <TableContainer>
//                                     <Table>
//                                         <TableHead>
//                                             <TableRow>
//                                                 <TableCell>Lead</TableCell>
//                                                 <TableCell>Contact</TableCell>
//                                                 <TableCell>Status</TableCell>
//                                                 <TableCell>Last Contact</TableCell>
//                                             </TableRow>
//                                         </TableHead>
//                                         <TableBody>
//                                             {recentLeads?.slice(0, 5).map((lead: any, index: number) => (
//                                                 <motion.tr
//                                                     key={lead.id}
//                                                     initial={{ opacity: 0, y: 20 }}
//                                                     animate={{ opacity: 1, y: 0 }}
//                                                     transition={{ delay: index * 0.1 }}
//                                                     // hove/r
//                                                     // sx={{
//                                                     //     cursor: 'pointer',
//                                                     //     '&:hover': {
//                                                     //         backgroundColor: theme.palette.action.hover
//                                                     //     }
//                                                     // }}
//                                                 >
//                                                     <TableCell>
//                                                         <Box display="flex" alignItems="center">
//                                                             <Person sx={{ mr: 1, color: theme.palette.text.secondary }} />

//                                                             <Box>
//                                                                 <Typography fontWeight={500}>
//                                                                     <Link
//                                                                         href={`/${subdomain}/leads/${lead.LeadId}`}
//                                                                         style={{
//                                                                             textDecoration: 'none',
//                                                                             color: 'inherit'
//                                                                             // '&:hover': {
//                                                                             //     textDecoration: 'underline'
//                                                                             // }
//                                                                         }}
//                                                                     >
//                                                                         {lead.name}
//                                                                     </Link>
//                                                                 </Typography>
//                                                                 <Typography variant="body2" color="text.secondary">
//                                                                     <Business fontSize="inherit" sx={{ mr: 0.5 }} />
//                                                                     {lead.company}
//                                                                 </Typography>
//                                                             </Box>
//                                                         </Box>
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         <Box display="flex" alignItems="center" component={Link} href={`mailto:${lead?.email}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
//                                                             <Email fontSize="small" sx={{ mr: 1, color: theme.palette.text.secondary }} />
//                                                             <Typography variant="body2">{lead.email || 'N/A'}</Typography>
//                                                         </Box>
//                                                         <Box display="flex" alignItems="center" mt={0.5} component={Link} href={`tel:${lead?.phone}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
//                                                             <Phone fontSize="small" sx={{ mr: 1, color: theme.palette.text.secondary }} />
//                                                             <Typography variant="body2">{lead.phone || 'N/A'}</Typography>
//                                                         </Box>
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         <Chip label={lead.status} color={lead.status === 'New' ? 'primary' : lead.status === 'Contacted' ? 'secondary' : 'default'} size="small" variant="outlined" />
//                                                     </TableCell>
//                                                     <TableCell>
//                                                         <Typography variant="body2">{lead.lastContact}</Typography>
//                                                     </TableCell>
//                                                 </motion.tr>
//                                             ))}
//                                         </TableBody>
//                                     </Table>
//                                 </TableContainer>
//                             )}
//                         </Card>
//                     </Grow>
//                 </Grid>
//                 <Grid size={{ xs: 12, md: 6 }}>
//                     <Grow in={!isLoading} timeout={1500}>
//                         <Card
//                             sx={{
//                                 boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)',
//                                 border: '0px',
//                                 padding: '16px',
//                                 height: '530px'
//                             }}
//                             // variant="outlined"
//                         >
//                             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                                 <Typography variant="h5" component="h2" fontWeight={600}>
//                                     High Value Opportunities
//                                 </Typography>
//                                 <Button component={Link} href={`/${subdomain}/leads`} size="small" endIcon={<ArrowForward />}>
//                                     View All
//                                 </Button>
//                             </Box>
//                             {isLoading ? (
//                                 <Skeleton variant="rectangular" height={300} />
//                             ) : (
//                                 <List disablePadding>
//                                     {highValueOpportunities?.length > 0 ? (
//                                         highValueOpportunities.map((opp: any, index: number) => (
//                                             <motion.div key={opp.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
//                                                 <ListItem
//                                                     sx={{
//                                                         display: 'block',
//                                                         // borderRadius: 1,
//                                                         mb: 0,
//                                                         transition: 'all 0.3s ease',
//                                                         '&:hover': {
//                                                             backgroundColor: theme.palette.action.hover,
//                                                             transform: 'translateX(5px)'
//                                                         },
//                                                         textDecoration: 'none',
//                                                         color: 'inherit'
//                                                     }}
//                                                 >
//                                                     <Box display="flex" justifyContent="space-between" alignItems="center">
//                                                         <Box>
//                                                             <Typography variant="subtitle1" fontWeight={600} component={Link} href={`/${subdomain}/leads/${opp.LeadId}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
//                                                                 {opp.name}
//                                                             </Typography>
//                                                             <Typography variant="body2" color="text.secondary">
//                                                                 <Business fontSize="inherit" sx={{ mr: 0.5 }} />
//                                                                 {opp.company}
//                                                             </Typography>
//                                                         </Box>
//                                                         <Chip label={opp.valueFormatted} color="success" variant="filled" sx={{ fontWeight: 600 }} />
//                                                     </Box>
//                                                     <Box display="flex">
//                                                         <Box flex={1}>
//                                                             <Typography variant="caption" display="flex" alignItems="center" component={Link} href={`mailto:${opp?.email}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
//                                                                 <Email fontSize="inherit" sx={{ mr: 0.5 }} />
//                                                                 {opp?.email || '-'}
//                                                             </Typography>
//                                                         </Box>
//                                                         <Box>
//                                                             <Typography variant="caption" display="flex" alignItems="center" component={Link} href={`tel:${opp?.phone}`} sx={{ textDecoration: 'none' }}>
//                                                                 <Phone fontSize="inherit" sx={{ mr: 0.5 }} />
//                                                                 {opp?.phone || '-'}
//                                                             </Typography>
//                                                         </Box>
//                                                     </Box>
//                                                 </ListItem>
//                                                 {index < highValueOpportunities.length - 1 && <Divider />}
//                                             </motion.div>
//                                         ))
//                                     ) : (
//                                         <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height={200} textAlign="center">
//                                             <TrendingUp sx={{ fontSize: 60, color: theme.palette.text.disabled, mb: 2 }} />
//                                             <Typography variant="body1" color="text.secondary">
//                                                 No high value opportunities found
//                                             </Typography>
//                                             <Button variant="outlined" size="small" sx={{ mt: 2 }} component={Link} href={`/${subdomain}/leads/create`}>
//                                                 Create New Opportunity
//                                             </Button>
//                                         </Box>
//                                     )}
//                                 </List>
//                             )}
//                         </Card>
//                     </Grow>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };

// export default Dashboard;
import React, { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
    Container,
    Grid,
    Card,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
    Chip,
    Skeleton,
    Button,
    useTheme,
    Badge,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    Alert,
    TableContainer,
    Table,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    CardContent,
    alpha
} from '@mui/material';
import { Schedule, Refresh, ArrowForward, Email, Phone, Business, Person } from '@mui/icons-material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GETactivity } from '../../../../../api/dashboardApi';
import { TrendingUp, TrendingDown, Users, MessageSquare, PiggyBank, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const SummaryCard = ({ title, value, loading, onClick, icon }) => {
    const theme = useTheme();
    // const isPositive = value >= 0;
    return (
        <motion.div transition={{ duration: 0.2 }}>
            <Card
                sx={{
                    borderRadius: 2,
                    padding: 2,
                    boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)',
                    transition: 'all 0.3s',
                    '&:hover': {
                        boxShadow: 6
                    },
                    border: '1px solid white'
                }}
            >
                <CardContent sx={{ paddingBottom: '16px !important' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                        {/* Left section: Title, Value, Change */}
                        <Box flexGrow={1}>
                            {loading ? (
                                <>
                                    <Skeleton variant="text" width="60%" />
                                    <Skeleton variant="rectangular" height={30} sx={{ my: 1 }} />
                                    <Skeleton variant="text" width="80%" />
                                </>
                            ) : (
                                <>
                                    <Typography variant="h3" color="text.secondary" sx={{ color: '#878a99' }}>
                                        {title}
                                    </Typography>
                                    <Typography variant="h5" fontWeight={600}>
                                        {value}
                                    </Typography>
                                    {/* {change !== undefined && (
                                        <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
                                            {isPositive ? <TrendingUp fontSize="small" sx={{ color: 'success.main' }} /> : <TrendingDown fontSize="small" sx={{ color: 'error.main' }} />}
                                            <Typography variant="caption" fontWeight={500} color={isPositive ? 'success.main' : 'error.main'}>
                                                {Math.abs(change)}% from last month
                                            </Typography>
                                        </Box>
                                    )} */}
                                </>
                            )}
                        </Box>

                        {/* Right section: Icon */}
                        {!loading && (
                            <Box
                                sx={{
                                    p: 1.2,
                                    ml: 2,
                                    borderRadius: 2,
                                    // bgcolor: `rgb(10 45 90/20%) `,
                                    bgcolor: `rgb(10 45 90/5%) `,
                                    // color: 'primary.main',
                                    color: '#00439a',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {icon}
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </motion.div>
    );
};

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [timeframe, setTimeframe] = useState('monthly');
    const subdomain = Cookies.get('subdomain');
    const theme = useTheme();

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setRefreshing(true);
            const response = await GETactivity(subdomain);
            if (response) {
                setData(response.data);
                setError(null);
            } else {
                setError('Failed to fetch data');
            }
        } catch (err) {
            setError('An error occurred while fetching data');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [subdomain]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const monthlyAcquisitionData = data?.acquisition?.monthly?.labels?.map((label, index) => ({
        name: label,
        value: data.acquisition.monthly.data[index] || 0
    }));

    const recentLeads = data?.recentLeads?.map((lead) => ({
        id: lead._id,
        name: lead.manualData?.name || 'Unknown',
        company: lead.manualData?.company || 'Unknown',
        value: lead.potentialValue || 0,
        status: lead.leadstatus?.statusName || 'New',
        email: lead.manualData?.email,
        phone: lead.manualData?.mobileNo,
        LeadId: lead?.LeadId,
        lastContact: lead.lastContact ? new Date(lead.lastContact).toLocaleDateString() : 'Never'
    }));

    const highValueOpportunities = recentLeads
        ?.sort((a, b) => b.value - a.value)
        .slice(0, 5)
        .map((lead) => ({
            ...lead,
            valueFormatted: `₹ ${lead.value.toLocaleString()}`
        }));

    const totalPotentialValue = recentLeads?.reduce((sum, lead) => sum + (lead.value || 0), 0) || 0;

    const handleRefresh = () => {
        fetchData();
    };

    const handleSummaryClick = (type) => {
        console.log(`View all ${type}`);
    };

    const handleTimeframeChange = (event) => {
        const value = event.target.value;
        setTimeframe(value);
        setLoading(true);
        setTimeout(() => {
            // setData(value === 'monthly' ? generateMonthlyData() : generateWeeklyData());
            setLoading(false);
        }, 500);
    };

    if (isLoading && !data) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 2 }}>
                <Alert
                    severity="error"
                    action={
                        <Button color="error" size="small" onClick={fetchData} endIcon={<Refresh />}>
                            Retry
                        </Button>
                    }
                >
                    {error}
                </Alert>
            </Box>
        );
    }

    return (
        <Container maxWidth="xl">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" component="h2" fontWeight={600}>
                    Dashboard
                </Typography>
                {/* <Button variant="outlined" color="primary" startIcon={<Refresh />} onClick={handleRefresh} disabled={refreshing} style={{ all: 'unset' }} /> */}
            </Box>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="Total Leads" value={data?.summary?.totalLeads || 0} loading={isLoading} onClick={() => handleSummaryClick('leads')} icon={<Users className="h-5 w-5" />} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="Active Opportunities" value={data?.summary?.activeLeads || 0} loading={isLoading} onClick={() => handleSummaryClick('opportunities')} icon={<MessageSquare className="h-5 w-5" />} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="Potential Value" value={`₹ ${totalPotentialValue.toLocaleString()}`} loading={isLoading} onClick={() => handleSummaryClick('high value leads')} icon={<PiggyBank className="h-5 w-5" />} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="Conversion Rate" value={`${data?.summary?.conversionRate || 0}%`} loading={isLoading} onClick={() => handleSummaryClick('conversions')} icon={<Calendar className="h-5 w-5" />} />
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, md: 9 }}>
                    <Card sx={{ height: 350, borderRadius: 2, position: 'relative', p: 2, boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)' }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h5" fontWeight={600}>
                                Lead Acquisition
                            </Typography>
                            <FormControl size="small" sx={{ minWidth: 140 }}>
                                <InputLabel id="timeframe-label">Timeframe</InputLabel>
                                <Select labelId="timeframe-label" value={timeframe} label="Timeframe" onChange={handleTimeframeChange}>
                                    <MenuItem value="monthly">Monthly</MenuItem>
                                    <MenuItem value="weekly">Weekly</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        {isLoading ? (
                            <Skeleton variant="rectangular" height={320} />
                        ) : (
                            <ResponsiveContainer width="100%" height="85%">
                                <AreaChart data={monthlyAcquisitionData} margin={{ top: 0, right: 0, left: -40, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                            {/* <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3} /> */}
                                            <stop offset="5%" stopColor={'#0281FF'} stopOpacity={0.3} />
                                            {/* <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0} /> */}
                                            <stop offset="95%" stopColor={'#0281FF'} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
                                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} stroke={theme.palette.text.secondary} />
                                    <YAxis fontSize={12} tickLine={false} axisLine={false} stroke={theme.palette.text.secondary} />
                                    {/* <Tooltip content={<CustomTooltip />} /> */}
                                    <Area type="monotone" dataKey="value" stroke={theme.palette.primary.main} fill="url(#colorValue)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Card sx={{ height: 350, borderRadius: 2, boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)', border: '0px', padding: '16px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h5" component="h2" fontWeight={600}>
                                Upcoming Follow-ups
                            </Typography>
                            <Badge badgeContent={data?.upcomingFollowups?.length || 0} color="primary" max={99} />
                        </Box>
                        {isLoading ? (
                            <>
                                {[...Array(3)].map((_, i) => (
                                    <Box key={i} mb={2}>
                                        <Skeleton variant="rectangular" height={60} />
                                    </Box>
                                ))}
                            </>
                        ) : data?.upcomingFollowups?.length > 0 ? (
                            <List sx={{ flex: 1, overflow: 'auto' }}>
                                {data.upcomingFollowups[0].followUps.map((followup, index) => (
                                    <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                                        <ListItem sx={{ mb: 1, borderRadius: 1, bgcolor: index === 0 ? theme.palette.action.selected : 'transparent', transition: 'background-color 0.3s', '&:hover': { bgcolor: theme.palette.action.hover } }}>
                                            <Schedule color={index === 0 ? 'primary' : 'action'} sx={{ mr: 2 }} />
                                            <ListItemText
                                                primary={<Typography fontWeight={index === 0 ? 600 : 400}>{followup.title}</Typography>}
                                                secondary={
                                                    <>
                                                        {new Date(followup.date).toLocaleDateString()}
                                                        <Box component="span" mx={1}>
                                                            •
                                                        </Box>
                                                        {`${followup.assignTo.firstname} ${followup.assignTo.lastname}`}
                                                    </>
                                                }
                                            />
                                        </ListItem>
                                        {index < data.upcomingFollowups.length - 1 && <Divider />}
                                    </motion.div>
                                ))}
                            </List>
                        ) : (
                            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" flex={1} textAlign="center">
                                <Schedule sx={{ fontSize: 60, color: theme.palette.text.disabled, mb: 2 }} />
                                <Typography variant="body1" sx={{ fontSize: '16px', color: '#878a99' }}>
                                    No upcoming follow-ups scheduled
                                </Typography>
                            </Box>
                        )}
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)', borderRadius: 2, padding: '16px', height: '530px' }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h5" component="h2" fontWeight={600}>
                                Recent Leads
                            </Typography>
                            <Button component={Link} href={`/${subdomain}/leads`} size="small" endIcon={<ArrowForward />}>
                                View All
                            </Button>
                        </Box>
                        {isLoading ? (
                            <Skeleton variant="rectangular" height={300} />
                        ) : (
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Lead</TableCell>
                                            <TableCell>Contact</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Last Contact</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recentLeads?.slice(0, 5).map((lead, index) => (
                                            <motion.tr key={lead.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                                                <TableCell>
                                                    <Box display="flex" alignItems="center">
                                                        <Person sx={{ mr: 1, color: theme.palette.text.secondary }} />
                                                        <Box>
                                                            <Typography fontWeight={500}>
                                                                <Link href={`/${subdomain}/leads/${lead.LeadId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                                    {lead.name}
                                                                </Link>
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                <Business fontSize="inherit" sx={{ mr: 0.5 }} />
                                                                {lead.company}
                                                            </Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Box display="flex" alignItems="center" component={Link} href={`mailto:${lead?.email}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                                                        <Email fontSize="small" sx={{ mr: 1, color: theme.palette.text.secondary }} />
                                                        <Typography variant="body2">{lead.email || 'N/A'}</Typography>
                                                    </Box>
                                                    <Box display="flex" alignItems="center" mt={0.5} component={Link} href={`tel:${lead?.phone}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                                                        <Phone fontSize="small" sx={{ mr: 1, color: theme.palette.text.secondary }} />
                                                        <Typography variant="body2">{lead.phone || 'N/A'}</Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip label={lead.status} color={lead.status === 'New' ? 'primary' : lead.status === 'Contacted' ? 'secondary' : 'default'} size="small" variant="outlined" />
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2">{lead.lastContact}</Typography>
                                                </TableCell>
                                            </motion.tr>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card sx={{ boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)', borderRadius: 2, padding: '16px', height: '530px' }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h5" component="h2" fontWeight={600}>
                                High Value Opportunities
                            </Typography>
                            <Button component={Link} href={`/${subdomain}/leads`} size="small" endIcon={<ArrowForward />}>
                                View All
                            </Button>
                        </Box>
                        {isLoading ? (
                            <Skeleton variant="rectangular" height={300} />
                        ) : (
                            <List disablePadding>
                                {highValueOpportunities?.length > 0 ? (
                                    highValueOpportunities.map((opp, index) => (
                                        <motion.div key={opp.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                                            <ListItem sx={{ display: 'block', mb: 0, transition: 'all 0.3s ease', '&:hover': { backgroundColor: theme.palette.action.hover, transform: 'translateX(5px)' }, textDecoration: 'none', color: 'inherit' }}>
                                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                                    <Box>
                                                        <Typography variant="subtitle1" fontWeight={600} component={Link} href={`/${subdomain}/leads/${opp.LeadId}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                                                            {opp.name}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            <Business fontSize="inherit" sx={{ mr: 0.5 }} />
                                                            {opp.company}
                                                        </Typography>
                                                    </Box>
                                                    {opp.valueFormatted > 0 && <Chip label={opp.valueFormatted} color="success" variant="filled" sx={{ fontWeight: 600 }} />}
                                                </Box>
                                                <Box display="flex">
                                                    <Box flex={1}>
                                                        <Typography variant="caption" display="flex" alignItems="center" component={Link} href={`mailto:${opp?.email}`} sx={{ textDecoration: 'none', color: 'inherit' }}>
                                                            <Email fontSize="inherit" sx={{ mr: 0.5 }} />
                                                            {opp?.email || '-'}
                                                        </Typography>
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="caption" display="flex" alignItems="center" component={Link} href={`tel:${opp?.phone}`} sx={{ textDecoration: 'none' }}>
                                                            <Phone fontSize="inherit" sx={{ mr: 0.5 }} />
                                                            {opp?.phone || '-'}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </ListItem>
                                            {index < highValueOpportunities.length - 1 && <Divider />}
                                        </motion.div>
                                    ))
                                ) : (
                                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height={200} textAlign="center">
                                        <TrendingUp />
                                        <Typography variant="body1" color="text.secondary">
                                            No high value opportunities found
                                        </Typography>
                                        <Button variant="outlined" size="small" sx={{ mt: 2 }} component={Link} href={`/${subdomain}/leads/create`}>
                                            Create New Opportunity
                                        </Button>
                                    </Box>
                                )}
                            </List>
                        )}
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
