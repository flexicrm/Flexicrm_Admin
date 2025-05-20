// // "use client"
// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import './TaskManagement.scss';
// // import Cookies from "js-cookie";
// // // import { API_BASE_URL } from '@/app/utils';
// // import { Row, Col } from 'react-bootstrap'; // Import Row and Col
// // import { API_BASE_URL } from '../../../../utils';

// // const TaskManagement = ({ leads, leadStatus,fetchDatas }) => {
// //     const leadsdrop = leadStatus;
// //     const [leadData, setLeadData] = useState(leads?.leads || []);
// //     const [selectedLead, setSelectedLead] = useState(null);
// //     const accessToken = Cookies.get("accessToken");
// //     const subdomain = Cookies.get("subdomain");

// //     const updateLeadStatus = async (leadId, newStatusId, leadIdValue) => {
// //         try {
// //             const headers = {
// //                 "Content-Type": "application/json",
// //                 Authorization: `Bearer ${accessToken}`,
// //             };
// //             await axios.patch(
// //                 `${API_BASE_URL}/lead/update-lead-status/${subdomain}/${leadIdValue}`,
// //                 { leadstatusid: newStatusId },
// //                 { headers }

// //             ).then(res=>{
// //                 fetchDatas();
// //             })
// //         } catch (error) {
// //             console.error('Error updating lead status:', error);
// //         }
// //     };

// //     const handleDrop = async (e, newStatusId) => {
// //         e.preventDefault();
// //         const leadId = e.dataTransfer.getData("leadId");
// //         const leadToUpdate = leadData.find(lead => lead._id === leadId);
// //         const leadIdValue = leadToUpdate?.LeadId;

// //         if (leadToUpdate && leadToUpdate.leadstatus._id !== newStatusId) {
// //             setLeadData(prevData =>
// //                 prevData.map(lead =>
// //                     lead._id === leadId ? { ...lead, leadstatus: { ...lead.leadstatus, _id: newStatusId } } : lead
// //                 )
// //             );

// //             await updateLeadStatus(leadId, newStatusId, leadIdValue);
// //         }
// //     };

// //     const handleDragStart = (e, leadId) => {
// //         e.dataTransfer.setData("leadId", leadId);
// //     };

// //     const handleLeadClick = (lead) => {
// //         setSelectedLead(lead);
// //     };

// //     const renderLeadStatusCount = () => {
// //         return Object.keys(leadStatus).map(status => (
// //             <Col key={status}  className=" shadow-sm me-1 p-1">
// //                 <div
// //                     className="shadow-sm  bg-light radius1  "
// //                     onDrop={(e) => handleDrop(e, leadStatus[status]._id)}
// //                     onDragOver={(e) => e.preventDefault()}
// //                     id={status.toLowerCase()}
// //                     style={{width: "15rem" ,height:"20rem",gap:"5",overflow:"auto"}}
// //                 >
// //                     {/* <h5>{status.toUpperCase()} ({leadStatus[status]?.count || 0})</h5> */}
// //                     <div className='lead-status radius ' style={{ color: `#${leadStatus[status]?.color || '000000'}`,background:`#${leadStatus[status]?.color || '000000'}` }}>
// //                        <p className='text-white text-center p-2'>{leadStatus[status]?.statusName || 'Unknown'} </p>
// //                     </div>
// //                     <div className='p-4'>
// //                         {leadData.filter(lead => lead.leadstatus._id === leadStatus[status]._id).map(lead => (
// //                             <div
// //                                 key={lead._id}
// //                                 draggable
// //                                 onDragStart={(e) => handleDragStart(e, lead._id)}
// //                                 className="lead-card"
// //                                 onClick={() => handleLeadClick(lead)}
// //                             >
// //                                 <div className="lead-status" style={{ color: `#${lead.leadstatus.color || '000000'}` }}>
// //                                     {lead.leadstatus.statusName.toUpperCase()}
// //                                 </div>
// //                                 <div>{lead.LeadId}</div>
// //                                 <div>{lead.manualData.company}</div>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>
// //             </Col>
// //         ));
// //     };

// //     const renderLeadDetails = () => {
// //         if (!selectedLead) return null;

// //         const { LeadId, assignTo, createdAt, description, manualData, leadsource } = selectedLead;

// //         return (
// //             <div className="lead-details mt-4">
// //                 <h5>Lead Details</h5>
// //                 <p><strong>Lead ID:</strong> {LeadId}</p>
// //                 <p><strong>Assigned To:</strong> {assignTo.firstname} {assignTo.lastname}</p>
// //                 <p><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</p>
// //                 <p><strong>Description:</strong> {description}</p>
// //                 <p><strong>Lead Source:</strong> {leadsource}</p>
// //                 <p><strong>Address:</strong> {manualData?.address?.street}, {manualData?.address?.city}, {manualData?.address?.state}, {manualData?.address?.zipCode}, {manualData?.address?.country}</p>
// //             </div>
// //         );
// //     };

// //     return (
// //         <section className="mt-3">
// //             <h5 className="text-center">Task Management (Drag and Drop)</h5>
// //             <div className="  my-lg-5">
// //                 <Row className=" lead-drop d-flex">
// //                     {renderLeadStatusCount()}
// //                 </Row>
// //                 {renderLeadDetails()}
// //             </div>
// //         </section>
// //     );
// // };

// // export default TaskManagement;
// // 'use client';
// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import Cookies from 'js-cookie';
// // import { Box, Grid, Paper, Typography, Card, CardContent, TextField, IconButton, CircularProgress } from '@mui/material';
// // import CheckIcon from '@mui/icons-material/Check';
// // import CloseIcon from '@mui/icons-material/Close';
// // import { useFormik } from 'formik';
// // import { API_BASE_URL } from '../../../../utils';

// // interface LeadStatus {
// //     _id: string;
// //     statusName: string;
// //     color?: string;
// //     [key: string]: any;
// // }

// // interface Lead {
// //     _id: string;
// //     LeadId: string;
// //     assignTo: { firstname: string; lastname: string };
// //     createdAt: string;
// //     description: string;
// //     manualData: {
// //         company: string;
// //         address?: {
// //             street?: string;
// //             city?: string;
// //             state?: string;
// //             zipCode?: string;
// //             country?: string;
// //         };
// //     };
// //     leadsource: string;
// //     leadstatus: LeadStatus;
// //     [key: string]: any;
// // }

// // interface TaskManagementProps {
// //     leads: { leads: Lead[] };
// //     leadStatus: { [key: string]: LeadStatus };
// //     fetchDatas: () => void;
// // }

// // const TaskManagement: React.FC<TaskManagementProps> = ({ leads, leadStatus, fetchDatas }) => {
// //     const [leadData, setLeadData] = useState<Lead[]>(leads?.leads || []);
// //     const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
// //     const [isAddingNewSource, setIsAddingNewSource] = useState(false);
// //     const [loading, setLoading] = useState(false);
// //     const [error, setError] = useState('');
// //     const [leadStatuses, setLeadStatuses] = useState<{ [key: string]: LeadStatus }>(leadStatus);

// //     const accessToken = Cookies.get('accessToken');
// //     const subdomain = Cookies.get('subdomain');

// //     const fetchLeadSources = async () => {
// //         try {
// //             const headers = { Authorization: `Bearer ${accessToken}` };
// //             const res = await axios.get(`${API_BASE_URL}/leadstatus/${subdomain}`, { headers });
// //             // Assuming the API returns an array of statuses
// //             const statuses: LeadStatus[] = res.data?.data || [];
// //             const statusObj: { [key: string]: LeadStatus } = {};
// //             statuses.forEach((s) => {
// //                 statusObj[s.statusName] = s;
// //             });
// //             setLeadStatuses(statusObj);
// //             fetchDatas();
// //         } catch (err) {
// //             // handle error if needed
// //         }
// //     };

// //     const formik = useFormik({
// //         initialValues: { statusName: '', color: '#000000' },
// //         onSubmit: async (values, { resetForm }) => {
// //             const newLeadSource = values.statusName;
// //             const colors = values.color;

// //             const headers = { Authorization: `Bearer ${accessToken}` };

// //             try {
// //                 setLoading(true);
// //                 await axios.post(`${API_BASE_URL}/leadstatus/${subdomain}`, { statusName: newLeadSource, color: colors.replace('#', '') }, { headers });
// //                 resetForm();
// //                 setIsAddingNewSource(false);
// //                 setError('');
// //                 fetchLeadSources();
// //             } catch (error) {
// //                 setError('Error adding new lead status. Please try again.');
// //                 console.error('Error adding new lead status:', error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         }
// //     });

// //     const updateLeadStatus = async (leadId: string, newStatusId: string, leadIdValue: string) => {
// //         try {
// //             const headers = {
// //                 'Content-Type': 'application/json',
// //                 Authorization: `Bearer ${accessToken}`
// //             };
// //             await axios.patch(`${API_BASE_URL}/lead/update-lead-status/${subdomain}/${leadIdValue}`, { leadstatusid: newStatusId }, { headers }).then(() => {
// //                 fetchDatas();
// //             });
// //         } catch (error) {
// //             console.error('Error updating lead status:', error);
// //         }
// //     };

// //     const handleDrop = async (e: React.DragEvent<HTMLDivElement>, newStatusId: string) => {
// //         e.preventDefault();
// //         const leadId = e.dataTransfer.getData('leadId');
// //         const leadToUpdate = leadData.find((lead) => lead._id === leadId);
// //         const leadIdValue = leadToUpdate?.LeadId;

// //         if (leadToUpdate && leadToUpdate.leadstatus._id !== newStatusId) {
// //             setLeadData((prevData) =>
// //                 prevData.map((lead) =>
// //                     lead._id === leadId
// //                         ? {
// //                               ...lead,
// //                               leadstatus: { ...lead.leadstatus, _id: newStatusId }
// //                           }
// //                         : lead
// //                 )
// //             );

// //             await updateLeadStatus(leadId, newStatusId, leadIdValue!);
// //         }
// //     };

// //     const handleDragStart = (e: React.DragEvent<HTMLDivElement>, leadId: string) => {
// //         e.dataTransfer.setData('leadId', leadId);
// //     };

// //     const handleLeadClick = (lead: Lead) => {
// //         setSelectedLead(lead);
// //     };

// //     const renderLeadStatusCount = () => {
// //         return Object.keys(leadStatuses).map((status) => (
// //             <Grid item md={3} key={status}>
// //                 <Paper
// //                     elevation={3}
// //                     sx={{
// //                         p: 1,
// //                         m: 1,
// //                         minHeight: 320,
// //                         maxHeight: 400,
// //                         overflowY: 'auto',
// //                         bgcolor: '#f5f5f5'
// //                     }}
// //                     onDrop={(e) => handleDrop(e, leadStatuses[status]._id)}
// //                     onDragOver={(e) => e.preventDefault()}
// //                 >
// //                     <Box
// //                         sx={{
// //                             bgcolor: `#${leadStatuses[status]?.color || '1976d2'}`,
// //                             color: '#fff',
// //                             borderRadius: 1,
// //                             mb: 2,
// //                             p: 1,
// //                             textAlign: 'center'
// //                         }}
// //                     >
// //                         <Typography variant="subtitle1" fontWeight="bold">
// //                             {leadStatuses[status]?.statusName || 'Unknown'}
// //                         </Typography>
// //                     </Box>
// //                     <Box>
// //                         {leadData
// //                             .filter((lead) => lead.leadstatus._id === leadStatuses[status]._id)
// //                             .map((lead) => (
// //                                 <Card
// //                                     key={lead._id}
// //                                     draggable
// //                                     onDragStart={(e) => handleDragStart(e, lead._id)}
// //                                     onClick={() => handleLeadClick(lead)}
// //                                     sx={{
// //                                         mb: 2,
// //                                         cursor: 'pointer',
// //                                         borderLeft: `4px solid #${lead.leadstatus.color || '1976d2'}`,
// //                                         '&:hover': { boxShadow: 6 }
// //                                     }}
// //                                 >
// //                                     <CardContent sx={{ p: 1 }}>
// //                                         <Typography
// //                                             variant="caption"
// //                                             sx={{
// //                                                 color: `#${lead.leadstatus.color || '1976d2'}`,
// //                                                 fontWeight: 'bold'
// //                                             }}
// //                                         >
// //                                             {lead.leadstatus.statusName.toUpperCase()}
// //                                         </Typography>
// //                                         <Typography variant="body2">{lead.LeadId}</Typography>
// //                                         <Typography variant="body2" color="text.secondary">
// //                                             {lead.manualData.company}
// //                                         </Typography>
// //                                     </CardContent>
// //                                 </Card>
// //                             ))}
// //                     </Box>
// //                 </Paper>
// //             </Grid>
// //         ));
// //     };

// //     const renderLeadDetails = () => {
// //         if (!selectedLead) return null;

// //         const { LeadId, assignTo, createdAt, description, manualData, leadsource } = selectedLead;

// //         return (
// //             <Paper elevation={4} sx={{ mt: 4, p: 2 }}>
// //                 <Typography variant="h6" gutterBottom>
// //                     Lead Details
// //                 </Typography>
// //                 <Typography>
// //                     <strong>Lead ID:</strong> {LeadId}
// //                 </Typography>
// //                 <Typography>
// //                     <strong>Assigned To:</strong> {assignTo?.firstname} {assignTo?.lastname}
// //                 </Typography>
// //                 <Typography>
// //                     <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
// //                 </Typography>
// //                 <Typography>
// //                     <strong>Description:</strong> {description}
// //                 </Typography>
// //                 <Typography>
// //                     <strong>Lead Source:</strong> {leadsource}
// //                 </Typography>
// //                 <Typography>
// //                     <strong>Address:</strong> {manualData?.address?.street}, {manualData?.address?.city}, {manualData?.address?.state}, {manualData?.address?.zipCode}, {manualData?.address?.country}
// //                 </Typography>
// //             </Paper>
// //         );
// //     };

// //     return (
// //         <Box sx={{ mt: 3 }}>
// //             <Typography variant="h5" align="center" gutterBottom>
// //                 Task Management (Drag and Drop)
// //             </Typography>
// //             <Box sx={{ my: 5 }}>
// //                 <Box mb={2}>
// //                     {isAddingNewSource ? (
// //                         <Box display="flex" alignItems="center">
// //                             <TextField name="statusName" id="statusName" placeholder="New status Name" value={formik.values.statusName} onChange={formik.handleChange} required size="small" sx={{ ml: 1 }} />
// //                             <input type="color" id="color" name="color" value={formik.values.color} onChange={formik.handleChange} style={{ marginLeft: 8, width: 40, height: 40, border: 'none', background: 'none' }} />
// //                             <IconButton color="primary" onClick={formik.handleSubmit as any} disabled={loading} sx={{ ml: 1 }}>
// //                                 {loading ? <CircularProgress size={20} /> : <CheckIcon />}
// //                             </IconButton>
// //                             <IconButton color="error" onClick={() => setIsAddingNewSource(false)} disabled={loading}>
// //                                 <CloseIcon />
// //                             </IconButton>
// //                         </Box>
// //                     ) : (
// //                         <Box display="flex" alignItems="center">
// //                             <IconButton color="primary" onClick={() => setIsAddingNewSource(true)}>
// //                                 <CheckIcon />
// //                             </IconButton>
// //                             <Typography variant="body2" sx={{ ml: 1 }}>
// //                                 Add New Status
// //                             </Typography>
// //                         </Box>
// //                     )}
// //                     {error && (
// //                         <Typography color="error" variant="body2" sx={{ mt: 1 }}>
// //                             {error}
// //                         </Typography>
// //                     )}
// //                 </Box>
// //                 <Grid container spacing={2} wrap="nowrap" sx={{ overflowX: 'auto' }}>
// //                     {renderLeadStatusCount()}
// //                 </Grid>
// //                 {renderLeadDetails()}
// //             </Box>
// //         </Box>
// //     );
// // };

// // export default TaskManagement;
'use client';
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Box, Typography, Card, CardContent, TextField, IconButton, CircularProgress, Chip, Avatar, Tooltip, Button, Stack, Divider } from '@mui/material';
import { Check, Close, Add, DragIndicator, Business, Place, Person, Description, CalendarToday, Source } from '@mui/icons-material';
import { useFormik } from 'formik';
import { API_BASE_URL } from '../../../../utils';

interface LeadStatus {
    _id: string;
    statusName: string;
    color?: string;
    [key: string]: any;
}

interface Lead {
    _id: string;
    LeadId: string;
    assignTo: { firstname: string; lastname: string; email?: string };
    createdAt: string;
    description: string;
    manualData: {
        company: string;
        address?: {
            street?: string;
            city?: string;
            state?: string;
            zipCode?: string;
            country?: string;
        };
    };
    leadsource: string;
    leadstatus: LeadStatus;
    [key: string]: any;
}

interface TaskManagementProps {
    leads: { leads: Lead[] };
    // leadStatus: { [key: string]: LeadStatus };
    setLeads: any;
    leadStatus: any;
}

// Helper for pipedrive-style column width
const COLUMN_WIDTH = 340;

const TaskManagement: React.FC<TaskManagementProps> = ({ leads, leadStatus, setLeads }) => {
    const [leadData, setLeadData] = useState<Lead[]>(leads?.leads || []);
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
    const [isAddingNewSource, setIsAddingNewSource] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [leadStatuses, setLeadStatuses] = useState<{ [key: string]: LeadStatus }>(leadStatus);

    const accessToken = Cookies.get('accessToken');
    const subdomain = Cookies.get('subdomain');

    const fetchLeadSources = async () => {
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const res = await axios.get(`${API_BASE_URL}/leadstatus/${subdomain}`, { headers });
            const statuses: LeadStatus[] = res.data?.data || [];
            const statusObj: { [key: string]: LeadStatus } = {};
            statuses.forEach((s) => {
                statusObj[s.statusName] = s;
            });
            setLeadStatuses(statusObj);
        } catch (err) {
            console.error('Error fetching lead statuses:', err);
        }
    };

    const formik = useFormik({
        initialValues: { statusName: '', color: '#4285F4' },
        onSubmit: async (values, { resetForm }) => {
            const newLeadSource = values.statusName;
            const colors = values.color;

            const headers = { Authorization: `Bearer ${accessToken}` };

            try {
                setLoading(true);
                const response = await axios.post(
                    `${API_BASE_URL}/leadstatus/${subdomain}`,
                    {
                        statusName: newLeadSource,
                        color: colors.replace('#', '')
                    },
                    { headers }
                );
                if (response) {
                    resetForm();
                    setIsAddingNewSource(false);
                    setError('');
                }

                fetchLeadSources();
            } catch (error) {
                setError('Error adding new lead status. Please try again.');
                console.error('Error adding new lead status:', error);
            } finally {
                setLoading(false);
            }
        }
    });

    const updateLeadStatus = async (leadId: string, newStatusId: string, leadIdValue: string) => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            };
            const response = await axios.patch(`${API_BASE_URL}/lead/update-lead-status/${subdomain}/${leadIdValue}`, { leadstatusid: newStatusId }, { headers });
            if (response) {
                console.log(response.data.data, 'response');
                const LeadsId = response?.data?.data?.leadId;

                setLeads((prevLeads) => prevLeads.map((lead) => (lead.LeadId === LeadsId ? { ...lead } : lead)));
                // setLeads((prevLeads) => prevLeads.map((lead) => console.log(lead.LeadId === LeadsId ? 'commitement ' : null, 'LEADSTOMANAGE')));
            }
        } catch (error) {
            console.error('Error updating lead status:', error);
        }
    };

    const handleDrop = async (e: React.DragEvent<HTMLDivElement>, newStatusId: string) => {
        e.preventDefault();
        const leadId = e.dataTransfer.getData('leadId');
        const leadToUpdate = leadData.find((lead) => lead._id === leadId);
        const leadIdValue = leadToUpdate?.LeadId;

        if (leadToUpdate && leadToUpdate.leadstatus._id !== newStatusId) {
            setLeadData((prevData) =>
                prevData.map((lead) =>
                    lead._id === leadId
                        ? {
                              ...lead,
                              leadstatus: { ...lead.leadstatus, _id: newStatusId }
                          }
                        : lead
                )
            );

            await updateLeadStatus(leadId, newStatusId, leadIdValue!);
        }
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, leadId: string) => {
        e.dataTransfer.setData('leadId', leadId);
    };

    const handleLeadClick = (lead: Lead) => {
        setSelectedLead(lead);
    };

    // Pipedrive-style column
    const renderLeadStatusColumn = (status: LeadStatus) => {
        const leadsInStatus = leadData?.filter((lead) => lead?.leadstatus?._id === status?._id);

        return (
            <Box
                key={status._id}
                sx={{
                    minWidth: COLUMN_WIDTH,
                    maxWidth: COLUMN_WIDTH,
                    mx: 1,
                    flex: '0 0 auto',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: '#f4f6fa',
                    borderRadius: 2,
                    border: '1px solid #e0e3e8',
                    boxShadow: 1,
                    position: 'relative'
                }}
                onDrop={(e) => handleDrop(e, status._id)}
                onDragOver={(e) => e.preventDefault()}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        px: 2,
                        py: 1.5,
                        bgcolor: `#${status.color || '4285F4'}22`,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        borderBottom: '1px solid #e0e3e8'
                    }}
                >
                    <Box
                        sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: `#${status.color || '4285F4'}`,
                            mr: 1
                        }}
                    />
                    <Typography variant="subtitle2" fontWeight={600}>
                        {status.statusName}
                    </Typography>
                    <Chip
                        label={leadsInStatus.length}
                        size="small"
                        sx={{
                            ml: 'auto',
                            bgcolor: '#fff',
                            color: '#1967d2',
                            fontWeight: 600
                        }}
                    />
                </Box>
                <Box sx={{ flex: 1, overflowY: 'auto', p: 2, minHeight: 120 }}>
                    <Stack spacing={2}>
                        {leadsInStatus.map((lead) => (
                            <Card
                                key={lead._id}
                                draggable
                                onDragStart={(e) => handleDragStart(e, lead._id)}
                                onClick={() => handleLeadClick(lead)}
                                elevation={0}
                                sx={{
                                    cursor: 'pointer',
                                    border: '1px solid #e0e3e8',
                                    borderRadius: 2,
                                    background: '#fff',
                                    transition: 'box-shadow 0.2s',
                                    '&:hover': {
                                        boxShadow: 4,
                                        borderColor: '#b6b9be'
                                    }
                                }}
                            >
                                <CardContent sx={{ p: 2, pb: '8px!important' }}>
                                    <Box display="flex" alignItems="center" mb={1}>
                                        <DragIndicator
                                            fontSize="small"
                                            sx={{
                                                color: '#b6b9be',
                                                mr: 1,
                                                cursor: 'grab'
                                            }}
                                        />
                                        <Chip
                                            label={lead.LeadId}
                                            size="small"
                                            sx={{
                                                bgcolor: '#f1f3f4',
                                                color: '#3c4043',
                                                fontWeight: 500
                                            }}
                                        />
                                        <Box ml="auto">
                                            <Tooltip title="Company">
                                                <Business fontSize="small" sx={{ color: '#b6b9be', mr: 0.5 }} />
                                            </Tooltip>
                                            <Typography variant="caption" sx={{ color: '#5f6368' }}>
                                                {lead.manualData.company}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Divider sx={{ mb: 1 }} />
                                    <Box display="flex" alignItems="center" mb={0.5}>
                                        <Avatar
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                mr: 1,
                                                bgcolor: '#4285F4',
                                                fontSize: '0.75rem'
                                            }}
                                        >
                                            {lead.assignTo.firstname.charAt(0)}
                                            {lead.assignTo.lastname.charAt(0)}
                                        </Avatar>
                                        <Typography variant="caption">
                                            {lead.assignTo.firstname} {lead.assignTo.lastname}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" mb={0.5}>
                                        <Source fontSize="small" sx={{ color: '#b6b9be', mr: 0.5 }} />
                                        <Typography variant="caption" sx={{ color: '#5f6368' }}>
                                            {lead.leadsource}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center">
                                        <CalendarToday fontSize="small" sx={{ color: '#b6b9be', mr: 0.5 }} />
                                        <Typography variant="caption" sx={{ color: '#5f6368' }}>
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        ))}
                        {leadsInStatus.length === 0 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 80,
                                    color: '#b6b9be'
                                }}
                            >
                                <Typography variant="caption">No leads</Typography>
                            </Box>
                        )}
                    </Stack>
                </Box>
            </Box>
        );
    };

    const renderLeadDetails = () => {
        if (!selectedLead) return null;

        const { LeadId, assignTo, createdAt, description, manualData, leadsource, leadstatus } = selectedLead;

        return (
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    width: 400,
                    height: '100vh',
                    bgcolor: '#fff',
                    boxShadow: '-4px 0 24px 0 rgba(60,64,67,0.15)',
                    zIndex: 1200,
                    p: 3,
                    overflowY: 'auto'
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" fontWeight={500}>
                        Lead Details
                    </Typography>
                    <IconButton onClick={() => setSelectedLead(null)}>
                        <Close />
                    </IconButton>
                </Box>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={2}>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Lead ID
                        </Typography>
                        <Chip
                            label={LeadId}
                            sx={{
                                bgcolor: '#f1f3f4',
                                color: '#3c4043',
                                fontWeight: 500,
                                mt: 0.5
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Status
                        </Typography>
                        <Chip
                            label={leadstatus.statusName}
                            sx={{
                                bgcolor: `#${leadstatus.color || '4285F4'}22`,
                                color: `#${leadstatus.color || '4285F4'}`,
                                fontWeight: 500,
                                mt: 0.5
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Company
                        </Typography>
                        <Typography variant="body2">{manualData.company}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Assigned To
                        </Typography>
                        <Typography variant="body2">
                            {assignTo?.firstname} {assignTo?.lastname}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Created At
                        </Typography>
                        <Typography variant="body2">{new Date(createdAt).toLocaleString()}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Lead Source
                        </Typography>
                        <Typography variant="body2">{leadsource}</Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Address
                        </Typography>
                        <Typography variant="body2">
                            {manualData?.address ? `${manualData.address.street || ''}, ${manualData.address.city || ''}, ${manualData.address.state || ''}, ${manualData.address.zipCode || ''}, ${manualData.address.country || ''}` : 'N/A'}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" color="text.secondary">
                            Description
                        </Typography>
                        <Typography variant="body2" dangerouslySetInnerHTML={{ __html: description || 'N/A' }} />
                    </Box>
                </Stack>
            </Box>
        );
    };

    return (
        <Box sx={{ p: 0, bgcolor: '#f4f6fa', minHeight: '100vh', position: 'relative' }}>
            <Box
                sx={{
                    mb: 3,
                    p: 2,
                    bgcolor: 'white',
                    borderRadius: 2,
                    border: '1px solid #e0e3e8',
                    boxShadow: 1,
                    mx: 2,
                    mt: 2
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" fontWeight={600}>
                        Pipeline
                    </Typography>
                    {isAddingNewSource ? (
                        <Box display="flex" alignItems="center">
                            <TextField name="statusName" placeholder="New status name" value={formik.values.statusName} onChange={formik.handleChange} size="small" sx={{ mr: 1 }} />
                            <Tooltip title="Status color">
                                <input
                                    type="color"
                                    id="color"
                                    name="color"
                                    value={formik.values.color}
                                    onChange={formik.handleChange}
                                    style={{
                                        width: 30,
                                        height: 30,
                                        border: 'none',
                                        background: 'none',
                                        cursor: 'pointer'
                                    }}
                                />
                            </Tooltip>
                            <IconButton color="primary" onClick={formik.handleSubmit as any} disabled={loading} sx={{ ml: 1 }}>
                                {loading ? <CircularProgress size={20} /> : <Check />}
                            </IconButton>
                            <IconButton color="error" onClick={() => setIsAddingNewSource(false)} disabled={loading}>
                                <Close />
                            </IconButton>
                        </Box>
                    ) : (
                        <Button
                            variant="outlined"
                            startIcon={<Add />}
                            onClick={() => setIsAddingNewSource(true)}
                            sx={{
                                textTransform: 'none',
                                color: '#1967d2',
                                borderColor: '#e0e3e8',
                                '&:hover': {
                                    borderColor: '#1967d2',
                                    bgcolor: '#e8f0fe'
                                }
                            }}
                        >
                            Add Status
                        </Button>
                    )}
                </Box>
                {error && (
                    <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    overflowX: 'auto',
                    px: 2,
                    pb: 4,
                    gap: 2
                }}
            >
                {Object.values(leadStatuses).map((status) => renderLeadStatusColumn(status))}
            </Box>
            {selectedLead && renderLeadDetails()}
        </Box>
    );
};

export default TaskManagement;
// 'use client';
// import React, { useState } from 'react';
// import { Box, Grid, Paper, Typography, Card, CardContent, TextField, IconButton, Chip, Avatar, Tooltip, Button, Divider, Badge } from '@mui/material';
// import { Add, DragIndicator, Business, Person, MoreVert, FilterList } from '@mui/icons-material';

// interface PipelineStage {
//     id: string;
//     name: string;
//     color: string;
//     leads: Lead[];
// }

// interface Lead {
//     id: string;
//     title: string;
//     company: string;
//     value?: string;
//     assignedTo?: {
//         name: string;
//         avatar?: string;
//     };
//     lastContact?: string;
// }

// const PipelineView = () => {
//     // Sample pipeline data
//     const [pipeline, setPipeline] = useState<PipelineStage[]>([
//         {
//             id: '1',
//             name: 'New Leads',
//             color: '#4285F4',
//             leads: [
//                 {
//                     id: '101',
//                     title: 'Acme Corp Website',
//                     company: 'Acme Corporation',
//                     value: '$5,000',
//                     assignedTo: { name: 'John D' }
//                 }
//             ]
//         },
//         {
//             id: '2',
//             name: 'Contacted',
//             color: '#34A853',
//             leads: [
//                 {
//                     id: '102',
//                     title: 'Global Tech SEO',
//                     company: 'Global Tech',
//                     value: '$7,500',
//                     assignedTo: { name: 'Sarah M' }
//                 }
//             ]
//         },
//         {
//             id: '3',
//             name: 'Proposal Sent',
//             color: '#FBBC05',
//             leads: [
//                 {
//                     id: '103',
//                     title: 'City Bank App',
//                     company: 'City Bank',
//                     value: '$12,000',
//                     assignedTo: { name: 'Mike T' }
//                 }
//             ]
//         },
//         {
//             id: '4',
//             name: 'Negotiation',
//             color: '#EA4335',
//             leads: []
//         }
//     ]);

//     const [newStageName, setNewStageName] = useState('');
//     const [isAddingStage, setIsAddingStage] = useState(false);

//     const handleAddStage = () => {
//         if (newStageName.trim()) {
//             const newStage: PipelineStage = {
//                 id: Date.now().toString(),
//                 name: newStageName,
//                 color: '#80868B', // Default gray color
//                 leads: []
//             };
//             setPipeline([...pipeline, newStage]);
//             setNewStageName('');
//             setIsAddingStage(false);
//         }
//     };

//     return (
//         <Box
//             sx={{
//                 p: 3,
//                 bgcolor: '#f8f9fa',
//                 minHeight: '100vh',
//                 overflowX: 'auto'
//             }}
//         >
//             {/* Header */}
//             <Box
//                 sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     mb: 3,
//                     p: 2,
//                     bgcolor: 'white',
//                     borderRadius: 2,
//                     boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
//                 }}
//             >
//                 <Typography variant="h5" fontWeight={500}>
//                     Sales Pipeline
//                 </Typography>

//                 <Box>
//                     <Button startIcon={<FilterList />} sx={{ mr: 2, textTransform: 'none' }}>
//                         Filters
//                     </Button>
//                     <Button variant="contained" startIcon={<Add />} onClick={() => setIsAddingStage(true)} sx={{ textTransform: 'none' }}>
//                         Add Stage
//                     </Button>
//                 </Box>
//             </Box>

//             {/* Add Stage Input */}
//             {isAddingStage && (
//                 <Box
//                     sx={{
//                         mb: 3,
//                         p: 2,
//                         bgcolor: 'white',
//                         borderRadius: 2,
//                         boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
//                         display: 'flex',
//                         alignItems: 'center'
//                     }}
//                 >
//                     <TextField fullWidth variant="outlined" size="small" placeholder="Stage name" value={newStageName} onChange={(e) => setNewStageName(e.target.value)} sx={{ mr: 2 }} />
//                     <Button variant="contained" onClick={handleAddStage} disabled={!newStageName.trim()} sx={{ mr: 1 }}>
//                         Add
//                     </Button>
//                     <Button
//                         variant="outlined"
//                         onClick={() => {
//                             setIsAddingStage(false);
//                             setNewStageName('');
//                         }}
//                     >
//                         Cancel
//                     </Button>
//                 </Box>
//             )}

//             {/* Pipeline Board */}
//             <Box
//                 sx={{
//                     display: 'flex',
//                     gap: 2,
//                     minWidth: 'fit-content'
//                 }}
//             >
//                 {pipeline.map((stage) => (
//                     <PipelineColumn key={stage.id} stage={stage} onUpdatePipeline={setPipeline} />
//                 ))}
//             </Box>
//         </Box>
//     );
// };

// const PipelineColumn = ({ stage, onUpdatePipeline }: { stage: PipelineStage; onUpdatePipeline: (pipeline: PipelineStage[]) => void }) => {
//     const [isDragging, setIsDragging] = useState(false);

//     const handleDragStart = (e: React.DragEvent, leadId: string) => {
//         e.dataTransfer.setData('leadId', leadId);
//         e.dataTransfer.setData('sourceStageId', stage.id);
//         setIsDragging(true);
//     };

//     const handleDragEnd = () => {
//         setIsDragging(false);
//     };

//     const handleDrop = (e: React.DragEvent) => {
//         e.preventDefault();
//         const leadId = e.dataTransfer.getData('leadId');
//         const sourceStageId = e.dataTransfer.getData('sourceStageId');

//         if (sourceStageId !== stage.id) {
//             // Move lead between stages
//             onUpdatePipeline((prevPipeline) => {
//                 const newPipeline = [...prevPipeline];
//                 const sourceStageIndex = newPipeline.findIndex((s) => s.id === sourceStageId);
//                 const targetStageIndex = newPipeline.findIndex((s) => s.id === stage.id);

//                 if (sourceStageIndex !== -1 && targetStageIndex !== -1) {
//                     const leadIndex = newPipeline[sourceStageIndex].leads.findIndex((l) => l.id === leadId);
//                     if (leadIndex !== -1) {
//                         const [movedLead] = newPipeline[sourceStageIndex].leads.splice(leadIndex, 1);
//                         newPipeline[targetStageIndex].leads.push(movedLead);
//                     }
//                 }

//                 return newPipeline;
//             });
//         }
//     };

//     const handleDragOver = (e: React.DragEvent) => {
//         e.preventDefault();
//     };

//     return (
//         <Paper
//             sx={{
//                 width: 300,
//                 minWidth: 300,
//                 bgcolor: isDragging ? '#f0f0f0' : 'white',
//                 borderRadius: 2,
//                 boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 maxHeight: '80vh'
//             }}
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//         >
//             {/* Column Header */}
//             <Box
//                 sx={{
//                     p: 2,
//                     borderBottom: '1px solid #f0f0f0',
//                     display: 'flex',
//                     alignItems: 'center'
//                 }}
//             >
//                 <Box
//                     sx={{
//                         width: 12,
//                         height: 12,
//                         borderRadius: '50%',
//                         bgcolor: stage.color,
//                         mr: 1.5
//                     }}
//                 />
//                 <Typography variant="subtitle1" fontWeight={500} sx={{ flexGrow: 1 }}>
//                     {stage.name}
//                 </Typography>
//                 <Badge badgeContent={stage.leads.length} color="primary" sx={{ mr: 1 }} />
//                 <IconButton size="small">
//                     <MoreVert fontSize="small" />
//                 </IconButton>
//             </Box>

//             {/* Leads List */}
//             <Box
//                 sx={{
//                     p: 1,
//                     flexGrow: 1,
//                     overflowY: 'auto',
//                     minHeight: 100
//                 }}
//             >
//                 {stage.leads.map((lead) => (
//                     <Card
//                         key={lead.id}
//                         draggable
//                         onDragStart={(e) => handleDragStart(e, lead.id)}
//                         onDragEnd={handleDragEnd}
//                         sx={{
//                             mb: 1,
//                             cursor: 'grab',
//                             '&:active': {
//                                 cursor: 'grabbing'
//                             },
//                             '&:hover': {
//                                 boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//                             }
//                         }}
//                     >
//                         <CardContent sx={{ p: 2 }}>
//                             <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                                 <DragIndicator
//                                     fontSize="small"
//                                     sx={{
//                                         color: '#5f6368',
//                                         mr: 1,
//                                         cursor: 'grab'
//                                     }}
//                                 />
//                                 <Typography variant="body2" fontWeight={500} sx={{ flexGrow: 1 }}>
//                                     {lead.title}
//                                 </Typography>
//                             </Box>

//                             <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                                 {lead.company}
//                             </Typography>

//                             {lead.value && (
//                                 <Chip
//                                     label={lead.value}
//                                     size="small"
//                                     sx={{
//                                         bgcolor: '#e8f0fe',
//                                         color: '#1967d2',
//                                         fontWeight: 500,
//                                         mb: 1
//                                     }}
//                                 />
//                             )}

//                             {lead.assignedTo && (
//                                 <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                                     <Avatar
//                                         sx={{
//                                             width: 24,
//                                             height: 24,
//                                             mr: 1,
//                                             bgcolor: '#4285F4',
//                                             fontSize: '0.75rem'
//                                         }}
//                                     >
//                                         {lead.assignedTo.name
//                                             .split(' ')
//                                             .map((n) => n[0])
//                                             .join('')}
//                                     </Avatar>
//                                     <Typography variant="caption">{lead.assignedTo.name}</Typography>
//                                 </Box>
//                             )}
//                         </CardContent>
//                     </Card>
//                 ))}

//                 {stage.leads.length === 0 && (
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             height: 100,
//                             color: '#5f6368',
//                             border: '1px dashed #dadce0',
//                             borderRadius: 1
//                         }}
//                     >
//                         <Typography variant="caption">Drop leads here</Typography>
//                     </Box>
//                 )}
//             </Box>

//             {/* Add Lead Button */}
//             <Box sx={{ p: 1, borderTop: '1px solid #f0f0f0' }}>
//                 <Button
//                     fullWidth
//                     startIcon={<Add />}
//                     sx={{
//                         textTransform: 'none',
//                         justifyContent: 'flex-start'
//                     }}
//                 >
//                     Add lead
//                 </Button>
//             </Box>
//         </Paper>
//     );
// };

// export default PipelineView;
// 'use client';
// import React, { useState } from 'react';
// import { Box, Paper, Typography, Card, CardContent, IconButton, Chip, Avatar, Button, Badge, TextField } from '@mui/material';
// import { Add, DragIndicator, MoreVert, FilterList, Delete, CheckCircle, Cancel, MoveToInbox } from '@mui/icons-material';

// interface PipelineStage {
//     id: string;
//     name: string;
//     color: string;
//     leads: Lead[];
// }

// interface Lead {
//     id: string;
//     title: string;
//     company: string;
//     value?: string;
//     assignedTo?: {
//         name: string;
//         avatar?: string;
//     };
//     lastContact?: string;
// }

// const PipelineView = () => {
//     const [pipeline, setPipeline] = useState<PipelineStage[]>([
//         {
//             id: '1',
//             name: 'Qualified',
//             color: '#4285F4',
//             leads: [
//                 {
//                     id: '101',
//                     title: 'Benjamin Leon',
//                     company: 'Sample Company',
//                     value: 'Rs10,000',
//                     assignedTo: { name: 'John D' }
//                 }
//             ]
//         },
//         {
//             id: '2',
//             name: 'Contact Made',
//             color: '#34A853',
//             leads: [
//                 {
//                     id: '102',
//                     title: 'Tony Turner',
//                     company: 'Sample Company',
//                     value: 'Rs30,000',
//                     assignedTo: { name: 'Sarah M' }
//                 }
//             ]
//         },
//         {
//             id: '3',
//             name: 'Demo Scheduled',
//             color: '#FBBC05',
//             leads: [
//                 {
//                     id: '103',
//                     title: 'iTable',
//                     company: 'Sample Company',
//                     value: 'Rs7,000',
//                     assignedTo: { name: 'Mike T' }
//                 },
//                 {
//                     id: '104',
//                     title: 'Damone',
//                     company: 'Sample Company',
//                     value: 'Rs15,000',
//                     assignedTo: { name: 'Mike T' }
//                 }
//             ]
//         },
//         {
//             id: '4',
//             name: 'Proposal Made',
//             color: '#EA4335',
//             leads: []
//         },
//         {
//             id: '5',
//             name: 'Negotiations Started',
//             color: '#80868B',
//             leads: [
//                 {
//                     id: '105',
//                     title: 'Phyllis & Cie',
//                     company: 'Sample Company',
//                     value: 'Rs16,000',
//                     assignedTo: { name: 'Mike T' }
//                 }
//             ]
//         }
//     ]);

//     const [newStageName, setNewStageName] = useState('');
//     const [isAddingStage, setIsAddingStage] = useState(false);

//     const handleAddStage = () => {
//         if (newStageName.trim()) {
//             const newStage: PipelineStage = {
//                 id: Date.now().toString(),
//                 name: newStageName,
//                 color: '#80868B',
//                 leads: []
//             };
//             setPipeline([...pipeline, newStage]);
//             setNewStageName('');
//             setIsAddingStage(false);
//         }
//     };

//     const handleDropOnZone = (leadId: string, targetStageName: string) => {
//         setPipeline((prevPipeline) => {
//             const newPipeline = [...prevPipeline];
//             const sourceStageIndex = newPipeline.findIndex((s) => s.leads.some((l) => l.id === leadId));
//             const targetStageIndex = newPipeline.findIndex((s) => s.name === targetStageName);

//             if (sourceStageIndex !== -1 && targetStageIndex !== -1) {
//                 const leadIndex = newPipeline[sourceStageIndex].leads.findIndex((l) => l.id === leadId);
//                 if (leadIndex !== -1) {
//                     const [movedLead] = newPipeline[sourceStageIndex].leads.splice(leadIndex, 1);
//                     newPipeline[targetStageIndex].leads.push(movedLead);
//                 }
//             }

//             return newPipeline;
//         });
//     };

//     const handleDeleteLead = (leadId: string) => {
//         setPipeline((prevPipeline) => {
//             const newPipeline = [...prevPipeline];
//             const stageIndex = newPipeline.findIndex((s) => s.leads.some((l) => l.id === leadId));
//             if (stageIndex !== -1) {
//                 const leadIndex = newPipeline[stageIndex].leads.findIndex((l) => l.id === leadId);
//                 if (leadIndex !== -1) {
//                     newPipeline[stageIndex].leads.splice(leadIndex, 1);
//                 }
//             }
//             return newPipeline;
//         });
//     };

//     return (
//         <Box
//             sx={{
//                 p: 3,
//                 bgcolor: '#f8f9fa',
//                 minHeight: '100vh'
//                 // overflowX: 'auto'
//             }}
//         >
//             {/* Header */}
//             <Box
//                 sx={{
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     mb: 3,
//                     p: 2,
//                     bgcolor: 'white',
//                     borderRadius: 2,
//                     boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
//                 }}
//             >
//                 <Typography variant="h5" fontWeight={500}>
//                     Sales Pipeline
//                 </Typography>

//                 <Box>
//                     <Button startIcon={<FilterList />} sx={{ mr: 2, textTransform: 'none' }}>
//                         Filters
//                     </Button>
//                     <Button variant="contained" startIcon={<Add />} onClick={() => setIsAddingStage(true)} sx={{ textTransform: 'none' }}>
//                         Add Stage
//                     </Button>
//                 </Box>
//             </Box>

//             {/* Add Stage Input */}
//             {isAddingStage && (
//                 <Box
//                     sx={{
//                         mb: 3,
//                         p: 2,
//                         bgcolor: 'white',
//                         borderRadius: 2,
//                         boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
//                         display: 'flex',
//                         alignItems: 'center'
//                     }}
//                 >
//                     <TextField fullWidth variant="outlined" size="small" placeholder="Stage name" value={newStageName} onChange={(e) => setNewStageName(e.target.value)} sx={{ mr: 2 }} />
//                     <Button variant="contained" onClick={handleAddStage} disabled={!newStageName.trim()} sx={{ mr: 1 }}>
//                         Add
//                     </Button>
//                     <Button
//                         variant="outlined"
//                         onClick={() => {
//                             setIsAddingStage(false);
//                             setNewStageName('');
//                         }}
//                     >
//                         Cancel
//                     </Button>
//                 </Box>
//             )}

//             {/* Pipeline Board */}

//             <Box sx={{ maxWidth: '1200px', overflowX: 'auto' }}>
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         gap: 2,
//                         minWidth: 'fit-content'
//                     }}
//                 >
//                     {pipeline.map((stage) => (
//                         <PipelineColumn key={stage.id} stage={stage} onUpdatePipeline={setPipeline} />
//                     ))}
//                 </Box>
//             </Box>

//             {/* Action Zones */}
//             <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
//                 <DropZone name="DELETE" color="#EA4335" onDrop={(leadId) => handleDeleteLead(leadId)} icon={<Delete />} />
//                 <DropZone name="LOST" color="#FBBC05" onDrop={(leadId) => handleDropOnZone(leadId, 'Lost')} icon={<Cancel />} />
//                 <DropZone name="WON" color="#34A853" onDrop={(leadId) => handleDropOnZone(leadId, 'Won')} icon={<CheckCircle />} />
//                 {pipeline
//                     .filter((s) => s.name !== 'Won' && s.name !== 'Lost')
//                     .slice(0, 2)
//                     .map((stage) => (
//                         <DropZone key={stage.id} name={`MOVE TO ${stage.name}`} color={stage.color} onDrop={(leadId) => handleDropOnZone(leadId, stage.name)} icon={<MoveToInbox />} />
//                     ))}
//             </Box>
//         </Box>
//     );
// };

// const PipelineColumn = ({ stage, onUpdatePipeline }: { stage: PipelineStage; onUpdatePipeline: (pipeline: PipelineStage[]) => void }) => {
//     const [isDragging, setIsDragging] = useState(false);

//     const handleDragStart = (e: React.DragEvent, leadId: string) => {
//         e.dataTransfer.setData('leadId', leadId);
//         setIsDragging(true);
//     };

//     const handleDragEnd = () => {
//         setIsDragging(false);
//     };

//     const handleDrop = (e: React.DragEvent) => {
//         e.preventDefault();
//         const leadId = e.dataTransfer.getData('leadId');
//         const sourceStageId = e.dataTransfer.getData('sourceStageId');

//         if (sourceStageId !== stage.id) {
//             onUpdatePipeline((prevPipeline) => {
//                 const newPipeline = [...prevPipeline];
//                 const sourceStageIndex = newPipeline.findIndex((s) => s.id === sourceStageId);
//                 const targetStageIndex = newPipeline.findIndex((s) => s.id === stage.id);

//                 if (sourceStageIndex !== -1 && targetStageIndex !== -1) {
//                     const leadIndex = newPipeline[sourceStageIndex].leads.findIndex((l) => l.id === leadId);
//                     if (leadIndex !== -1) {
//                         const [movedLead] = newPipeline[sourceStageIndex].leads.splice(leadIndex, 1);
//                         newPipeline[targetStageIndex].leads.push(movedLead);
//                     }
//                 }

//                 return newPipeline;
//             });
//         }
//     };

//     const handleDragOver = (e: React.DragEvent) => {
//         e.preventDefault();
//     };

//     return (
//         <Paper
//             sx={{
//                 width: 300,
//                 minWidth: 300,
//                 bgcolor: isDragging ? '#f0f0f0' : 'white',
//                 borderRadius: 2,
//                 boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 maxHeight: '80vh',
//                 overflowX: 'auto'
//             }}
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//         >
//             {/* Column Header */}
//             <Box
//                 sx={{
//                     p: 2,
//                     borderBottom: '1px solid #f0f0f0',
//                     display: 'flex',
//                     alignItems: 'center'
//                 }}
//             >
//                 <Box
//                     sx={{
//                         width: 12,
//                         height: 12,
//                         borderRadius: '50%',
//                         bgcolor: stage.color,
//                         mr: 1.5
//                     }}
//                 />
//                 <Typography variant="subtitle1" fontWeight={500} sx={{ flexGrow: 1 }}>
//                     {stage.name}
//                 </Typography>
//                 <Badge badgeContent={stage.leads.length} color="primary" sx={{ mr: 1 }} />
//                 <IconButton size="small">
//                     <MoreVert fontSize="small" />
//                 </IconButton>
//             </Box>

//             {/* Leads List */}
//             <Box
//                 sx={{
//                     p: 1,
//                     flexGrow: 1,
//                     overflowY: 'auto',
//                     minHeight: 100
//                 }}
//             >
//                 {stage.leads.map((lead) => (
//                     <Card
//                         key={lead.id}
//                         draggable
//                         onDragStart={(e) => handleDragStart(e, lead.id)}
//                         onDragEnd={handleDragEnd}
//                         sx={{
//                             mb: 1,
//                             cursor: 'grab',
//                             '&:active': {
//                                 cursor: 'grabbing'
//                             },
//                             '&:hover': {
//                                 boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
//                             }
//                         }}
//                     >
//                         <CardContent sx={{ p: 2 }}>
//                             <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                                 <DragIndicator
//                                     fontSize="small"
//                                     sx={{
//                                         color: '#5f6368',
//                                         mr: 1,
//                                         cursor: 'grab'
//                                     }}
//                                 />
//                                 <Typography variant="body2" fontWeight={500} sx={{ flexGrow: 1 }}>
//                                     {lead.title}
//                                 </Typography>
//                             </Box>

//                             <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                                 {lead.company}
//                             </Typography>

//                             {lead.value && (
//                                 <Chip
//                                     label={lead.value}
//                                     size="small"
//                                     sx={{
//                                         bgcolor: '#e8f0fe',
//                                         color: '#1967d2',
//                                         fontWeight: 500,
//                                         mb: 1
//                                     }}
//                                 />
//                             )}

//                             {lead.assignedTo && (
//                                 <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                                     <Avatar
//                                         sx={{
//                                             width: 24,
//                                             height: 24,
//                                             mr: 1,
//                                             bgcolor: '#4285F4',
//                                             fontSize: '0.75rem'
//                                         }}
//                                     >
//                                         {lead.assignedTo.name
//                                             .split(' ')
//                                             .map((n) => n[0])
//                                             .join('')}
//                                     </Avatar>
//                                     <Typography variant="caption">{lead.assignedTo.name}</Typography>
//                                 </Box>
//                             )}
//                         </CardContent>
//                     </Card>
//                 ))}

//                 {stage.leads.length === 0 && (
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             height: 100,
//                             color: '#5f6368',
//                             border: '1px dashed #dadce0',
//                             borderRadius: 1
//                         }}
//                     >
//                         <Typography variant="caption">Drop leads here</Typography>
//                     </Box>
//                 )}
//             </Box>

//             {/* Add Lead Button */}
//             <Box sx={{ p: 1, borderTop: '1px solid #f0f0f0' }}>
//                 <Button
//                     fullWidth
//                     startIcon={<Add />}
//                     sx={{
//                         textTransform: 'none',
//                         justifyContent: 'flex-start'
//                     }}
//                 >
//                     Add lead
//                 </Button>
//             </Box>
//         </Paper>
//     );
// };

// const DropZone = ({ name, color, onDrop, icon }: { name: string; color: string; onDrop: (leadId: string) => void; icon: React.ReactNode }) => {
//     const handleDrop = (e: React.DragEvent) => {
//         e.preventDefault();
//         const leadId = e.dataTransfer.getData('leadId');
//         onDrop(leadId);
//     };

//     const handleDragOver = (e: React.DragEvent) => {
//         e.preventDefault();
//     };

//     return (
//         <Paper
//             sx={{
//                 width: 200,
//                 height: 100,
//                 bgcolor: 'white',
//                 borderRadius: 2,
//                 boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 flexDirection: 'column',
//                 border: `2px dashed ${color}`,
//                 cursor: 'pointer'
//             }}
//             onDrop={handleDrop}
//             onDragOver={handleDragOver}
//         >
//             {icon}
//             <Typography variant="subtitle1" fontWeight={500} color={color}>
//                 {name}
//             </Typography>
//             <Typography variant="caption">Drop here</Typography>
//         </Paper>
//     );
// };

// export default PipelineView;
