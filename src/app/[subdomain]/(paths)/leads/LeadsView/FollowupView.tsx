// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import { format } from 'date-fns';
// import {
//     Phone as CallIcon,
//     Email as EmailIcon,
//     Groups as MeetingIcon,
//     WhatsApp as WhatsAppIcon,
//     Home as VisitIcon,
//     MoreHoriz as OtherIcon,
//     CheckCircle as CompletedIcon,
//     Schedule as ScheduledIcon,
//     Warning as MissedIcon,
//     ArrowUpward as HighPriorityIcon,
//     ArrowDownward as LowPriorityIcon,
//     Remove as MediumPriorityIcon
// } from '@mui/icons-material';
// import { Avatar, Box, Button, Card, Chip, CircularProgress, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
// import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';

// import FollowUpForm from '../form/FollowUpForm';
// import { MyButton } from '../../../../ui-components/Buttons/Buttons';
// import { CustomChip } from '../../../../ui-components/Chip/Chip';
// import { MySnackbar } from '../../../../ui-components/Snackbar/Snackbar';
// import useFollowupStatusOptions from '../Dropdownapi/FollowupstatusDropdown';

// type Severity = 'error' | 'warning' | 'info' | 'success';

// interface FollowUp {
//     id?: string;
//     leadStatus?: any;
//     notes: string;
//     dueDate: Date | null;
//     followUpDate?: Date | null;
//     status: 'completed' | 'pending' | 'overdue' | 'scheduled';
//     priority: 'high' | 'medium' | 'low';
//     assignedTo?: string;
//     type: 'call' | 'meeting' | 'email' | 'whatsapp' | 'visit' | 'other';
//     reminderSet?: boolean;
//     reminderDate?: Date | null;
//     outcome?: string;
//     leadId: string;
//     createdAt?: Date;
// }

// const PriorityChip = ({ priority }: { priority: 'high' | 'medium' | 'low' }) => {
//     const priorityMap = {
//         high: { color: 'error', icon: <HighPriorityIcon fontSize="small" /> },
//         medium: { color: 'warning', icon: <MediumPriorityIcon fontSize="small" /> },
//         low: { color: 'success', icon: <LowPriorityIcon fontSize="small" /> }
//     };

//     return <Chip size="small" label={priority} color={priorityMap[priority].color as any} variant="outlined" />;
// };

// const StatusChip = ({ status }) => {
//     const statusMap = {
//         completed: { color: 'success', icon: <CompletedIcon fontSize="small" />, label: 'Completed' },
//         scheduled: { color: 'info', icon: <ScheduledIcon fontSize="small" />, label: 'Scheduled' },
//         pending: { color: 'warning', icon: <ScheduledIcon fontSize="small" />, label: 'Pending' },
//         overdue: { color: 'error', icon: <MissedIcon fontSize="small" />, label: 'Overdue' }
//     };

//     return (
//         <CustomChip
//             status={{
//                 hexcolor: statusMap[status]?.color as any,
//                 statusName: status?.StatusName || '-'
//             }}
//         />
//     );
// };

// const TypeIcon = ({ type }: { type: FollowUp['type'] }) => {
//     const iconMap = {
//         call: <CallIcon fontSize="small" />,
//         email: <EmailIcon fontSize="small" />,
//         meeting: <MeetingIcon fontSize="small" />,
//         whatsapp: <WhatsAppIcon fontSize="small" />,
//         visit: <VisitIcon fontSize="small" />,
//         other: <OtherIcon fontSize="small" />
//     };

//     return iconMap[type];
// };

// export const FollowUpSection = ({ currentLead, UsersOptions, leadId, setLeadData }: any) => {
//     const [followups, setFollowups] = useState<FollowUp[]>(currentLead?.followUps || []);
//     const [openFollowUpForm, setOpenFollowUpForm] = useState(false);
//     const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>('success');
//     const [visibleFollowUps, setVisibleFollowUps] = useState(5);
//     const [loading, setLoading] = useState(false);
//     const observer = useRef<IntersectionObserver | null>(null);
//     const FollowupsData = useFollowupStatusOptions();
//     const followUpStatusOptions = FollowupsData;
//     useEffect(() => {
//         setFollowups(currentLead?.followUps);
//     }, [currentLead]);
//     const handleAddFollowUp = () => {
//         setSelectedFollowUp(null);
//         setOpenFollowUpForm(true);
//     };

//     const handleEditFollowUp = (followUp: FollowUp) => {
//         setSelectedFollowUp(followUp);
//         setOpenFollowUpForm(true);
//     };

//     const handleSaveFollowUp = (followUp: FollowUp) => {
//         if (selectedFollowUp) {
//             setFollowups(followups.map((f) => (f.id === followUp.id ? followUp : f)));
//         } else {
//             setFollowups([...followups, { ...followUp, id: Date.now().toString() }]);
//         }
//         setOpenFollowUpForm(false);
//     };

//     const handleLoadMore = useCallback(() => {
//         if (loading) return;
//         setLoading(true);
//         setTimeout(() => {
//             setVisibleFollowUps((prev) => prev + 5);
//             setLoading(false);
//         }, 1000);
//     }, [loading]);

//     const lastFollowUpElementRef = useCallback(
//         (node: HTMLDivElement) => {
//             if (loading) return;
//             if (observer.current) observer.current.disconnect();
//             observer.current = new IntersectionObserver((entries) => {
//                 if (entries[0].isIntersecting && visibleFollowUps < followups.length) {
//                     handleLoadMore();
//                 }
//             });
//             if (node) observer.current.observe(node);
//         },
//         [loading, visibleFollowUps, followups.length, handleLoadMore]
//     );

//     return (
//         <Box>
//             <Card sx={{ p: 2, mb: 2, borderRadius: 2, boxShadow: 2, height: '300px', overflow: 'auto' }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//                     <Typography variant="h5" fontWeight={600}>
//                         Follow-Ups
//                     </Typography>
//                     <MyButton variant="contained" size="small" onClick={handleAddFollowUp}>
//                         Add Follow-Up
//                     </MyButton>
//                 </Box>

//                 <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
//                     View and manage follow-up activity
//                 </Typography>
//                 <FormControl size="small" sx={{ minWidth: 180 }}>
//                     <InputLabel>Follow up Status</InputLabel>
//                     <Select
//                         value={followUpStatusFilter}
//                         onChange={(e) => setFollowUpStatusFilter(e.target.value)}
//                         label="Follow up Status"
//                         sx={{ borderRadius: 1, border: '1px solid rgba(224, 227, 232, 0.71)' }}
//                     >
//                         <MenuItem value="">All Statuses</MenuItem>
//                         {followUpStatusOptions?.map((option) => (
//                             <MenuItem key={option.value} value={option.value}>
//                                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                     <Box
//                                         sx={{
//                                             width: 10,
//                                             height: 10,
//                                             borderRadius: '50%',
//                                             backgroundColor: option.color,
//                                             mr: 1
//                                         }}
//                                     />
//                                     {option.label}
//                                 </Box>
//                             </MenuItem>
//                         ))}
//                     </Select>
//                 </FormControl>

//                 {followups.length > 0 ? (
//                     <Timeline position="alternate">
//                         {[...followups]
//                             .reverse()
//                             .slice(0, visibleFollowUps)
//                             .map((followup, index) => {
//                                 const isLast = index + 1 === visibleFollowUps;
//                                 const timelineItem = (
//                                     <TimelineItem key={followup.id || index} sx={{ cursor: 'pointer' }}>
//                                         <div ref={isLast ? lastFollowUpElementRef : null} onClick={() => handleEditFollowUp(followup)}>
//                                             <TimelineSeparator>
//                                                 <TimelineDot color="primary">
//                                                     <TypeIcon type={followup.type} />
//                                                 </TimelineDot>
//                                                 {index < visibleFollowUps - 1 && <TimelineConnector />}
//                                             </TimelineSeparator>
//                                             <TimelineContent>
//                                                 <Card sx={{ p: 2, borderRadius: 2 }}>
//                                                     <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                                                         <Typography variant="subtitle1" fontWeight={600} sx={{ mr: 2 }}>
//                                                             {followup.leadStatus?.statusName}
//                                                         </Typography>
//                                                         <Stack direction="row" spacing={1}>
//                                                             <PriorityChip priority={followup.priority} />
//                                                             <StatusChip status={followup.status} />
//                                                         </Stack>
//                                                     </Box>
//                                                     <Typography variant="body2" color="text.secondary">
//                                                         Due: {followup.dueDate ? format(new Date(followup.dueDate), 'MMM dd, yyyy hh:mm a') : 'Not set'}
//                                                     </Typography>
//                                                     <Typography variant="body2" sx={{ mt: 1 }}>
//                                                         {followup.notes}
//                                                     </Typography>
//                                                     {followup.assignedTo && (
//                                                         <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
//                                                             <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
//                                                                 {followup.assignedTo
//                                                                     .split(' ')
//                                                                     .map((n) => n[0])
//                                                                     .join('')}
//                                                             </Avatar>
//                                                             <Typography variant="caption" color="text.secondary">
//                                                                 Assigned to: {followup.assignedTo}
//                                                             </Typography>
//                                                         </Box>
//                                                     )}
//                                                 </Card>
//                                             </TimelineContent>
//                                         </div>
//                                     </TimelineItem>
//                                 );

//                                 return timelineItem;
//                             })}
//                         {loading && (
//                             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//                                 <CircularProgress />
//                             </Box>
//                         )}
//                     </Timeline>
//                 ) : (
//                     <Box sx={{ textAlign: 'center', py: 4 }}>
//                         <Typography variant="body1" color="text.secondary">
//                             No follow-ups scheduled yet
//                         </Typography>
//                         <MyButton variant="outlined" size="small" onClick={handleAddFollowUp}>
//                             Schedule First Follow-Up
//                         </MyButton>
//                     </Box>
//                 )}
//             </Card>

//             <FollowUpForm
//                 UsersOptions={UsersOptions}
//                 open={openFollowUpForm}
//                 onOpenChange={setOpenFollowUpForm}
//                 leadId={leadId}
//                 followUp={selectedFollowUp}
//                 setSnackbarOpen={setSnackbarOpen}
//                 setLeads={setLeadData}
//                 handleMenuClose={() => setOpenFollowUpForm(false)}
//                 setSnackbarSeverity={setSnackbarSeverity}
//                 setSnackbarMessage={setSnackbarMessage}
//             />

//             <MySnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} position={{ vertical: 'top', horizontal: 'right' }} onClose={() => setSnackbarOpen(false)} />
//         </Box>
//     );
// };
'use client';
import React, { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { Box, Card, Typography, Chip, Stack, Grid, Avatar, CircularProgress, FormControl, InputLabel, MenuItem, Select, Divider } from '@mui/material';
import { Phone as CallIcon, Email as EmailIcon, Groups as MeetingIcon, WhatsApp as WhatsAppIcon, Home as VisitIcon, MoreHoriz as OtherIcon, CheckCircle, Schedule, Warning, ArrowUpward, ArrowDownward, Remove } from '@mui/icons-material';
import { motion } from 'framer-motion';

import FollowUpForm from '../form/FollowUpForm';
import { MyButton } from '../../../../ui-components/Buttons/Buttons';
import { MySnackbar } from '../../../../ui-components/Snackbar/Snackbar';

import useFollowupStatusOptions from '../Dropdownapi/FollowupstatusDropdown';
import { CustomChip } from '../../../../ui-components/Chip/otherChip';

type Severity = 'error' | 'warning' | 'info' | 'success';

interface FollowUp {
    id?: string;
    leadStatus?: any;
    notes: string;
    dueDate: Date | null;
    followUpDate?: Date | null;
    status?: any | 'completed' | 'pending' | 'overdue' | 'scheduled';
    priority: 'high' | 'medium' | 'low';
    assignTo?: any;
    type: 'call' | 'meeting' | 'email' | 'whatsapp' | 'visit' | 'other';
    leadId: string;
    createdAt?: Date;
}

const PriorityChip = ({ priority }: { priority: FollowUp['priority'] }) => {
    const map = {
        high: { color: 'error', icon: <ArrowUpward fontSize="small" /> },
        medium: { color: 'warning', icon: <Remove fontSize="small" /> },
        low: { color: 'success', icon: <ArrowDownward fontSize="small" /> }
    };
    return <Chip size="small" icon={map[priority]?.icon} label={priority} color={map[priority]?.color as any} variant="outlined" />;
};

const StatusChip = ({ status }: { status: FollowUp['status'] }) => {
    const map = {
        completed: { color: 'success', label: 'Completed', icon: <CheckCircle fontSize="small" /> },
        scheduled: { color: 'info', label: 'Scheduled', icon: <Schedule fontSize="small" /> },
        pending: { color: 'warning', label: 'Pending', icon: <Schedule fontSize="small" /> },
        overdue: { color: 'error', label: 'Overdue', icon: <Warning fontSize="small" /> }
    };
    return <CustomChip status={{ hexcolor: '#fcba03', statusName: status?.StatusName }} />;
};

const TypeIcon = ({ type }: { type: FollowUp['type'] }) => {
    const map = {
        call: <CallIcon fontSize="small" />,
        email: <EmailIcon fontSize="small" />,
        meeting: <MeetingIcon fontSize="small" />,
        whatsapp: <WhatsAppIcon fontSize="small" />,
        visit: <VisitIcon fontSize="small" />,
        other: <OtherIcon fontSize="small" />
    };
    return map[type];
};

export const FollowUpSection = ({ currentLead, UsersOptions, leadId, setLeadData }: any) => {
    const [followups, setFollowups] = useState<FollowUp[]>([]);
    const [openFollowUpForm, setOpenFollowUpForm] = useState(false);
    const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>('success');
    const [visibleFollowUps, setVisibleFollowUps] = useState(6);
    const [followUpStatusFilter, setFollowUpStatusFilter] = useState('');
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const followUpStatusOptions = useFollowupStatusOptions();

    useEffect(() => {
        setFollowups(currentLead?.followUps || []);
    }, [currentLead]);

    const handleAddFollowUp = () => {
        setSelectedFollowUp(null);
        setOpenFollowUpForm(true);
    };

    const handleEditFollowUp = (followUp: FollowUp) => {
        setSelectedFollowUp(followUp);
        setOpenFollowUpForm(true);
    };

    const handleSaveFollowUp = (followUp: FollowUp) => {
        if (selectedFollowUp) {
            setFollowups((prev) => prev.map((f) => (f.id === followUp.id ? followUp : f)));
        } else {
            setFollowups((prev) => [...prev, { ...followUp, id: Date.now().toString() }]);
        }
        setOpenFollowUpForm(false);
    };

    const handleLoadMore = useCallback(() => {
        if (loading) return;
        setLoading(true);
        setTimeout(() => {
            setVisibleFollowUps((prev) => prev + 6);
            setLoading(false);
        }, 800);
    }, [loading]);

    const lastFollowUpRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    handleLoadMore();
                }
            });
            if (node) observer.current.observe(node);
        },
        [handleLoadMore, loading]
    );

    const filteredFollowUps = useMemo(() => {
        if (!followUpStatusFilter) return followups;

        return followups.filter((f) => f.status?._id === followUpStatusFilter);
    }, [followups, followUpStatusFilter]);

    return (
        <Card sx={{ p: 3, mb: 2, borderRadius: 2, boxShadow: 2 }}>
            <Box display="flex" justifyContent="space-between" mb={2} alignItems="center">
                <Typography variant="h5" fontWeight={600} sx={{ fontSize: { xs: '15px', md: '1.25rem' } }}>
                    Follow-Ups
                </Typography>
                <MyButton onClick={handleAddFollowUp} size="small">
                    Add Follow-Up
                </MyButton>
            </Box>

            <FormControl size="small" sx={{ minWidth: 200, mb: 2 }}>
                <InputLabel>Follow up Status</InputLabel>
                <Select label="Follow up Status" value={followUpStatusFilter} onChange={(e) => setFollowUpStatusFilter(e.target.value)}>
                    <MenuItem value="">All Statuses</MenuItem>
                    {followUpStatusOptions?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            <Box display="flex" alignItems="center">
                                <Box
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: '50%',
                                        backgroundColor: option.color,
                                        mr: 1
                                    }}
                                />
                                {option.label}
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {filteredFollowUps.length > 0 ? (
                <Grid container spacing={2}>
                    {[...filteredFollowUps]
                        .reverse()
                        .slice(0, visibleFollowUps)
                        .map((followup, index) => {
                            const isLast = index + 1 === visibleFollowUps;
                            return (
                                <Grid size={{ xs: 12, sm: 6, md: 12 }} key={followup.id || index}>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }} ref={isLast ? lastFollowUpRef : null} onClick={() => handleEditFollowUp(followup)}>
                                        <motion.div whileHover={{ scale: 1.03, transition: { duration: 0.2 } }} style={{ width: '100%' }}>
                                            <Card
                                                sx={{
                                                    p: 2,
                                                    borderRadius: 2,
                                                    boxShadow: 1,
                                                    cursor: 'pointer',
                                                    borderLeft: `4px solid ${followup.priority === 'high' ? '#f44336' : followup.priority === 'medium' ? '#ff9800' : '#4caf50'}`,
                                                    minHeight: 160,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'space-between',
                                                    '&:hover': {
                                                        borderColor: 'primary.main',
                                                        borderWidth: '1px',
                                                        borderStyle: 'solid',
                                                        borderLeft: '4px solid'
                                                    }
                                                }}
                                            >
                                                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                                                    <Stack direction="row" alignItems="center" spacing={1}>
                                                        <TypeIcon type={followup.type} />
                                                        <Typography fontWeight={600}>{followup.leadStatus?.statusName || 'No Title'}</Typography>
                                                    </Stack>
                                                    <Stack direction="row" spacing={1}>
                                                        <PriorityChip priority={followup.priority} />
                                                        <StatusChip status={followup.status} />
                                                    </Stack>
                                                </Stack>

                                                <Typography variant="body2" color="text.secondary">
                                                    Due: {followup.dueDate ? new Date(followup.dueDate).toLocaleDateString() : 'Not set'}
                                                </Typography>
                                                <Typography variant="body2">{followup.notes}</Typography>
                                                <Stack mt={2}>
                                                    <Divider />
                                                    <Box sx={{ display: 'flex', mt: 1, justifyContent: 'space-between' }}>
                                                        <Typography variant="caption" color="text.secondary">
                                                            🕒 Created: {followup.createdAt ? new Date(followup.createdAt).toLocaleDateString() : '—'}
                                                        </Typography>

                                                        {followup.assignTo && (
                                                            <Typography variant="caption" color="text.secondary">
                                                                Assigned to: {followup.assignTo.firstname}
                                                                {followup.assignTo.lastname}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </Stack>
                                            </Card>
                                        </motion.div>
                                    </motion.div>
                                </Grid>
                            );
                        })}
                </Grid>
            ) : (
                <Box textAlign="center" py={4}>
                    <Typography variant="body1" color="text.secondary">
                        No follow-ups scheduled
                    </Typography>
                    <MyButton variant="outlined" size="small" onClick={handleAddFollowUp}>
                        Schedule First Follow-Up
                    </MyButton>
                </Box>
            )}

            {loading && (
                <Box display="flex" justifyContent="center" mt={2}>
                    <CircularProgress size={20} />
                </Box>
            )}

            <FollowUpForm
                open={openFollowUpForm}
                onOpenChange={setOpenFollowUpForm}
                leadId={leadId}
                followUp={selectedFollowUp}
                UsersOptions={UsersOptions}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarSeverity={setSnackbarSeverity}
                setSnackbarMessage={setSnackbarMessage}
                handleMenuClose={() => setOpenFollowUpForm(false)}
                setLeads={setLeadData}
            />

            <MySnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} position={{ vertical: 'top', horizontal: 'right' }} onClose={() => setSnackbarOpen(false)} />
        </Card>
    );
};
