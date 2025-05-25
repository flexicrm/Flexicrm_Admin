// // "use client"
// // import React, { useEffect } from 'react';
// // import '../../../styles/dashboard.scss';
// // import { createSwapy } from 'swapy';
// // import Cookies from "js-cookie";
// // const DEFAULT_ITEMS = {
// //   '1': 'a',
// //   '2': null,
// //   '3': 'c',
// //   '4': 'd'
// // };

// // function A() {
// //   return (
// //     <div className="item a" data-swapy-item="a">
// //       <div className="handle" data-swapy-handle></div>
// //       <div>A</div>
// //     </div>
// //   );
// // }

// // function C() {
// //   return (
// //     <div className="item c" data-swapy-item="c">
// //       <div >C</div>
// //     </div>
// //   );
// // }

// // function D() {
// //   return (
// //     <div className="item d" data-swapy-item="d">
// //       <div>D</div>
// //     </div>
// //   );
// // }

// // function getItemById(itemId) {
// //   switch (itemId) {
// //     case 'a':
// //       return <A />;
// //     case 'c':
// //       return <C />;
// //     case 'd':
// //       return <D />;
// //     default:
// //       return null;
// //   }
// // }

// // function Dashboard() {
// //   const savedItems = Cookies.get('slotItem');
// //   const slotItems = savedItems ? JSON.parse(savedItems) : DEFAULT_ITEMS;

// //   useEffect(() => {
// //     const container = document.querySelector('.container');
// //     const swapy = createSwapy(container, { swapMode: 'hover' });

// //     swapy.onSwap(({ data }) => {
// //       Cookies.get('slotItem', JSON.stringify(data.object));
// //     });

// //     swapy.onSwapEnd(({ data }) => {
// //       // console.log('Swap ended:', data);
// //     });

// //     swapy.onSwapStart(() => {
// //       // console.log('Swap started');
// //     });

// //     return () => {
// //       swapy.destroy();
// //     };
// //   }, []);

// //   return (
// //     <div className="container ">
// //       <div className='d-flex'>

// //       <div className="slot a" data-swapy-slot="1">
// //         {getItemById(slotItems['1'])}
// //       </div>
// //       <div className="second-row">
// //         <div className="slot b" data-swapy-slot="2">
// //           {getItemById(slotItems['2'])}
// //         </div>
// //         <div className="slot c" data-swapy-slot="3">
// //           {getItemById(slotItems['3'])}
// //         </div>
// //       </div>
// //       <div className="slot d" data-swapy-slot="4">
// //         {getItemById(slotItems['4'])}
// //       </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Dashboard;
// // src/components/Dashboard/Dashboard.tsx
// 'use client';
// import React, { useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import { Container, Grid, Card, CardContent, Typography, Box, List, ListItem, ListItemText, Divider, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress, Alert } from '@mui/material';
// import { TrendingUp, TrendingDown, Schedule } from '@mui/icons-material';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { GETactivity } from '../../../../../api/dashboardApi';

// const SummaryCard = ({ title, value, change }: { title: any; value: any; change: any }) => {
//     const isPositive = change >= 0;

//     return (
//         <Card>
//             <CardContent>
//                 <Typography color="textSecondary" gutterBottom>
//                     {title}
//                 </Typography>
//                 <Typography variant="h5" component="h2">
//                     {value}
//                 </Typography>
//                 <Typography color={isPositive ? 'success.main' : 'error.main'} variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
//                     {isPositive ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
//                     {Math.abs(change)}% from last month
//                 </Typography>
//             </CardContent>
//         </Card>
//     );
// };

// const Dashboard = () => {
//     // const { data, isLoading, error } = useQuery('dashboardData', );
//     const [data, setData] = useState(null);
//     const [isLoading, setLoading] = useState(false);
//     const [error, setError] = useState(false);
//     const subdomain = Cookies.get('subdomain');

//     const fetchData = async () => {
//         setLoading(true);
//         const response = await GETactivity(subdomain);
//         if (response) {
//             setData(response);
//             console.log(response.data, 'response');
//         } else {
//             setError(response.data.error);
//         }
//     };
//     useEffect(() => {
//         fetchData();
//     }, []);

//     if (isLoading) {
//         return (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     if (error) {
//         return (
//             <Box sx={{ p: 3 }}>
//                 <Alert severity="error">Error loading dashboard data</Alert>
//             </Box>
//         );
//     }

//     // Transform data for charts and components
//     const monthlyAcquisitionData = data?.acquisition?.monthly?.labels?.map((label, index) => ({
//         name: label,
//         value: data.acquisition.monthly.data[index]
//     }));

//     const recentLeads = data?.recentLeads.map((lead) => ({
//         name: lead.manualData.name,
//         company: lead.manualData.company,
//         value: lead.potentialValue,
//         status: lead.leadstatus.statusName || 'New'
//     }));

//     const highValueOpportunities = recentLeads
//         ?.sort((a, b) => b.value - a.value)
//         .slice(0, 5)
//         .map((lead) => ({
//             name: lead.name,
//             company: lead.company,
//             value: `$${lead.value.toLocaleString()}`
//         }));

//     return (
//         <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
//             {/* Summary Section */}
//             <Grid container spacing={3}>
//                 <Grid size={{ xs: 12, md: 3 }}>
//                     <SummaryCard title="Total Leads" value={data?.summary?.totalLeads || 0} change={8.7} />
//                 </Grid>
//                 <Grid size={{ xs: 12, md: 3 }}>
//                     <SummaryCard title="Active Opportunities" value={data?.summary?.activeLeads || 0} change={12.3} />
//                 </Grid>
//                 <Grid size={{ xs: 12, md: 3 }}>{/* <SummaryCard title="Potential Value" value={`$${data?.recentLeads?.reduce((sum, lead) => sum + (lead.potentialValue || 0), 0) || 0}`} change={3.2} /> */}</Grid>
//                 <Grid size={{ xs: 12, md: 3 }}>
//                     <SummaryCard title="conversionRate" value={data?.summary?.conversionRate} change={2.5} />
//                 </Grid>
//             </Grid>

//             {/* Charts and Tasks */}
//             <Grid container spacing={3} sx={{ mt: 2 }}>
//                 <Grid size={{ xs: 12, md: 8 }}>
//                     <Box sx={{ p: 2, height: 300, bgcolor: 'background.paper', borderRadius: 1 }}>
//                         <Typography variant="h6" gutterBottom>
//                             Lead Acquisition
//                         </Typography>
//                         <ResponsiveContainer width="100%" height="80%">
//                             <BarChart data={monthlyAcquisitionData}>
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis dataKey="name" />
//                                 <YAxis />
//                                 <Tooltip />
//                                 <Bar dataKey="value" fill="#8884d8" />
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </Box>
//                 </Grid>
//                 <Grid size={{ xs: 12, md: 4 }}>
//                     <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
//                         <Typography variant="h6" gutterBottom>
//                             Upcoming Tasks
//                         </Typography>
//                         <Typography variant="subtitle2" color="textSecondary" gutterBottom>
//                             Your scheduled tasks for today
//                         </Typography>
//                         <List>
//                             <Divider />
//                             <ListItem>
//                                 <Schedule color="action" sx={{ mr: 2 }} />
//                                 <ListItemText primary="Follow up with Sara Miller" secondary="Today, 11:30 AM" />
//                             </ListItem>
//                             <Divider />
//                             <ListItem>
//                                 <Schedule color="action" sx={{ mr: 2 }} />
//                                 <ListItemText primary="Send proposal to Acme Corp" secondary="Today, 2:00 PM" />
//                             </ListItem>
//                             <Divider />
//                         </List>
//                     </Box>
//                 </Grid>
//             </Grid>

//             {/* Recent Leads and Opportunities */}
//             <Grid container spacing={3} sx={{ mt: 2 }}>
//                 <Grid size={{ xs: 12, md: 6 }}>
//                     <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
//                         <Typography variant="h6" gutterBottom>
//                             Recent Leads
//                         </Typography>
//                         <TableContainer component={Paper}>
//                             <Table>
//                                 <TableHead>
//                                     <TableRow>
//                                         <TableCell>Name</TableCell>
//                                         <TableCell>Company</TableCell>
//                                         <TableCell>Status</TableCell>
//                                     </TableRow>
//                                 </TableHead>
//                                 <TableBody>
//                                     {recentLeads?.slice(0, 5).map((lead, index) => (
//                                         <TableRow key={index}>
//                                             <TableCell>
//                                                 <strong>{lead.name}</strong>
//                                             </TableCell>
//                                             <TableCell>{lead.company}</TableCell>
//                                             <TableCell>{lead.status}</TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                     </Box>
//                 </Grid>
//                 <Grid size={{ xs: 12, md: 6 }}>
//                     <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
//                         <Typography variant="h6" gutterBottom>
//                             High Value Opportunities
//                         </Typography>
//                         <List>
//                             {highValueOpportunities?.map((opp, index) => (
//                                 <div key={index}>
//                                     <ListItem>
//                                         <ListItemText
//                                             primary={
//                                                 <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
//                                                     <Typography variant="subtitle1">
//                                                         <strong>{opp.name}</strong> - {opp.company}
//                                                     </Typography>
//                                                     <Chip label={opp.value} color="success" />
//                                                 </Box>
//                                             }
//                                         />
//                                     </ListItem>
//                                     {index < highValueOpportunities.length - 1 && <Divider />}
//                                 </div>
//                             ))}
//                         </List>
//                     </Box>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };

// export default Dashboard;

'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider,
    Chip,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Alert,
    Skeleton,
    Grow,
    Fade,
    Slide
} from '@mui/material';
import { TrendingUp, TrendingDown, Schedule } from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GETactivity } from '../../../../../api/dashboardApi';
import { motion } from 'framer-motion';

const SummaryCard = ({ title, value, change, loading }: { title: string; value: any; change: number; loading?: boolean }) => {
    const isPositive = change >= 0;

    return (
        <Grow in={true} timeout={1000}>
            <Card sx={{ height: '100%', minHeight: 150 }} variant="outlined">
                <CardContent>
                    {loading ? (
                        <>
                            <Skeleton variant="text" width="60%" />
                            <Skeleton variant="rectangular" height={30} sx={{ my: 1 }} />
                            <Skeleton variant="text" width="80%" />
                        </>
                    ) : (
                        <>
                            <Typography color="textSecondary" gutterBottom>
                                {title}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {value}
                            </Typography>
                            <Typography color={isPositive ? 'success.main' : 'error.main'} variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                                {isPositive ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
                                {Math.abs(change)}% from last month
                            </Typography>
                        </>
                    )}
                </CardContent>
            </Card>
        </Grow>
    );
};

const Dashboard = () => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const subdomain = Cookies.get('subdomain');

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await GETactivity(subdomain);
            if (response) {
                setData(response.data);
            } else {
                setError('Failed to fetch data');
            }
        } catch (err) {
            setError('An error occurred while fetching data');
        } finally {
            setLoading(false);
        }
    }, [subdomain]); // Include any dependencies here

    useEffect(() => {
        fetchData();
    }, [fetchData]); // Include fetchData in the dependency array

    // Transform data for charts and components
    const monthlyAcquisitionData = data?.acquisition?.monthly?.labels?.map((label: string, index: number) => ({
        name: label,
        value: data.acquisition.monthly.data[index] || 0
    }));

    const recentLeads = data?.recentLeads?.map((lead: any) => ({
        id: lead._id,
        name: lead.manualData?.name || 'Unknown',
        company: lead.manualData?.company || 'Unknown',
        value: lead.potentialValue || 0,
        status: lead.leadstatus?.statusName || 'New',
        email: lead.manualData?.email,
        phone: lead.manualData?.mobileNo
    }));

    const highValueOpportunities = recentLeads
        ?.sort((a: any, b: any) => b.value - a.value)
        .slice(0, 5)
        .map((lead: any) => ({
            id: lead.id,
            name: lead.name,
            company: lead.company,
            value: `$${lead.value.toLocaleString()}`,
            email: lead.email,
            phone: lead.phone
        }));

    const totalPotentialValue = recentLeads?.reduce((sum: number, lead: any) => sum + (lead.value || 0), 0) || 0;

    if (isLoading && !data) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error" action={<Chip label="Retry" onClick={fetchData} color="error" variant="outlined" clickable />}>
                    {error}
                </Alert>
            </Box>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            {/* Summary Section */}
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <SummaryCard title="Total Leads" value={data?.summary?.totalLeads || 0} change={8.7} loading={isLoading} />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <SummaryCard title="Active Opportunities" value={data?.summary?.activeLeads || 0} change={12.3} loading={isLoading} />
                </Grid>
                <Grid size={{ md: 3, xs: 12 }}>
                    <SummaryCard title="Potential Value" value={`$${totalPotentialValue.toLocaleString()}`} change={3.2} loading={isLoading} />
                </Grid>
                <Grid size={{ md: 3, xs: 12 }}>
                    <SummaryCard title="Conversion Rate" value={`${data?.summary?.conversionRate || 0}%`} change={2.5} loading={isLoading} />
                </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid size={{ md: 8, xs: 12 }}>
                    <Slide direction="up" in={!isLoading} mountOnEnter unmountOnExit>
                        <Box
                            sx={{
                                p: 2,
                                height: 300,
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                                boxShadow: 1
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Lead Acquisition
                            </Typography>
                            {isLoading ? (
                                <Skeleton variant="rectangular" height={200} />
                            ) : (
                                <ResponsiveContainer width="100%" height="80%">
                                    <BarChart data={monthlyAcquisitionData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Bar dataKey="value" fill="#8884d8" animationDuration={1500} animationEasing="ease-in-out">
                                            {monthlyAcquisitionData?.map((entry: any, index: any) => (
                                                <motion.g key={`cell-${index}`}>
                                                    {/* <rect fill="#8884d8" x={index * 30} y={0} width={20} height={entry.value * 10} initial={{ height: 0 }} animate={{ height: entry.value * 10 }} transition={{ duration: 0.5, delay: index * 0.1 }} /> */}
                                                </motion.g>
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </Box>
                    </Slide>
                </Grid>
                <Grid size={{ md: 4, xs: 12 }}>
                    <Fade in={!isLoading} timeout={1000}>
                        <Box
                            sx={{
                                p: 2,
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                                boxShadow: 1,
                                height: '100%',
                                minHeight: 300
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Upcoming Follow-ups
                            </Typography>
                            {isLoading ? (
                                <>
                                    <Skeleton variant="text" width="60%" />
                                    <Skeleton variant="rectangular" height={60} sx={{ my: 1 }} />
                                    <Skeleton variant="rectangular" height={60} sx={{ my: 1 }} />
                                </>
                            ) : data?.upcomingFollowups?.length > 0 ? (
                                <List>
                                    {data.upcomingFollowups.map((followup: any, index: number) => (
                                        <div key={index}>
                                            <Divider />
                                            <ListItem>
                                                <Schedule color="action" sx={{ mr: 2 }} />
                                                <ListItemText primary={followup.title} secondary={`${new Date(followup.date).toLocaleDateString()}, ${followup.assignee}`} />
                                            </ListItem>
                                        </div>
                                    ))}
                                    <Divider />
                                </List>
                            ) : (
                                <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                                    No upcoming follow-ups scheduled
                                </Typography>
                            )}
                        </Box>
                    </Fade>
                </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid size={{ md: 6, xs: 12 }}>
                    <Grow in={!isLoading} timeout={1500}>
                        <Box
                            sx={{
                                p: 2,
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                                boxShadow: 1
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Recent Leads
                            </Typography>
                            {isLoading ? (
                                <Skeleton variant="rectangular" height={300} />
                            ) : (
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Contact</TableCell>
                                                <TableCell>Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {recentLeads?.slice(0, 5).map((lead: any, index: number) => (
                                                <motion.tr key={lead.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                                                    <TableCell>
                                                        <strong>{lead.name}</strong>
                                                        <Typography variant="body2" color="textSecondary">
                                                            {lead.company}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="body2">{lead.email}</Typography>
                                                        <Typography variant="body2">{lead.phone}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip label={lead.status} color={lead.status === 'New' ? 'primary' : lead.status === 'Contacted' ? 'secondary' : 'default'} size="small" />
                                                    </TableCell>
                                                </motion.tr>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </Box>
                    </Grow>
                </Grid>
                <Grid size={{ md: 6, xs: 12 }}>
                    <Grow in={!isLoading} timeout={1500}>
                        <Box
                            sx={{
                                p: 2,
                                bgcolor: 'background.paper',
                                borderRadius: 1,
                                boxShadow: 1
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                High Value Opportunities
                            </Typography>
                            {isLoading ? (
                                <Skeleton variant="rectangular" height={300} />
                            ) : (
                                <List>
                                    {highValueOpportunities?.length > 0 ? (
                                        highValueOpportunities.map((opp: any, index: number) => (
                                            <motion.div key={opp.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={
                                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <Box>
                                                                    <Typography variant="subtitle1">
                                                                        <strong>{opp.name}</strong>
                                                                    </Typography>
                                                                    <Typography variant="body2" color="textSecondary">
                                                                        {opp.company}
                                                                    </Typography>
                                                                </Box>
                                                                <Chip label={opp.value} color="success" variant="outlined" />
                                                            </Box>
                                                        }
                                                        secondary={
                                                            <Box sx={{ mt: 1 }}>
                                                                <Typography variant="body2">{opp.email}</Typography>
                                                                <Typography variant="body2">{opp.phone}</Typography>
                                                            </Box>
                                                        }
                                                    />
                                                </ListItem>
                                                {index < highValueOpportunities.length - 1 && <Divider />}
                                            </motion.div>
                                        ))
                                    ) : (
                                        <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
                                            No high value opportunities found
                                        </Typography>
                                    )}
                                </List>
                            )}
                        </Box>
                    </Grow>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
