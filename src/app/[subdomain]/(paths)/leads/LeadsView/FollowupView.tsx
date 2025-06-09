// 'use client';
// import React, { useEffect, useState } from 'react';
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
// import { Avatar, Box, Button, Card, Chip, Stack, Typography } from '@mui/material';
// import FollowUpForm from '../form/FollowUpForm'; // Adjust the import path as needed
// import { MyButton } from '../../../../Component/Buttons/Buttons'; // Adjust the import path as needed
// import { CustomChip } from '../../../../Component/Chip/Chip';
// import { MySnackbar } from '../../../../Component/Snackbar/Snackbar';
// type Severity = 'error' | 'warning' | 'info' | 'success';
// interface FollowUp {
//     id?: string;
//     title: string;
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

//     return <Chip size="small" icon={priorityMap[priority]?.icon} label={priority} color={priorityMap[priority]?.color as any} variant="outlined" sx={{ ml: 1 }} />;
// };

// const StatusChip = ({ status }) => {
//     console.log(status, 'status');

//     const statusMap = {
//         completed: { color: status.color, icon: <CompletedIcon fontSize="small" />, label: status.StatusName },
//         scheduled: { color: 'info', icon: <ScheduledIcon fontSize="small" />, label: 'Scheduled' },
//         pending: { color: 'warning', icon: <ScheduledIcon fontSize="small" />, label: 'Pending' },
//         overdue: { color: 'error', icon: <MissedIcon fontSize="small" />, label: 'Overdue' }
//     };

//     return (
//         <CustomChip
//             status={{
//                 hexColor: statusMap[status]?.color as any,
//                 statusName: status.StatusName || 'null'
//             }}
//         />
//     );
// };

// const TypeIcon = ({ type }: { type: 'call' | 'meeting' | 'email' | 'whatsapp' | 'visit' | 'other' }) => {
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

// export const FollowUpSection = ({ currentLead, UsersOptions, leadId, fetchLeadData }) => {
//     const [followups, setFollowups] = useState<FollowUp[]>(currentLead?.currentLead?.followUps || currentLead?.followUps || []);
//     const [openFollowUpForm, setOpenFollowUpForm] = useState(false);
//     const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>('success');
//     console.log(followups, 'followups');

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
//             // Update existing
//             setFollowups(followups.map((f) => (f.id === followUp.id ? followUp : f)));
//         } else {
//             // Add new
//             setFollowups([...followups, { ...followUp, id: Date.now().toString() }]);
//         }
//         setOpenFollowUpForm(false);
//     };
//     useEffect(() => {
//         // if (snackbarSeverity === 'success' && snackbarMessage) {
//         // alert('demo');
//         fetchLeadData();
//         // }
//     }, [snackbarMessage]);

//     return (
//         <Box sx={{ p: 0 }}>
//             <Card variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 2 }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//                     <Typography variant="h6" sx={{ fontWeight: 400 }}>
//                         Follow-Ups
//                     </Typography>
//                     <MyButton variant="contained" size="small" onClick={handleAddFollowUp}>
//                         Add Follow-Up
//                     </MyButton>
//                 </Box>

//                 <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
//                     Manage scheduled follow-ups with this lead
//                 </Typography>

//                 {followups.length > 0 ? (
//                     <Stack spacing={2}>
//                         {[...followups].reverse().map((followup, index) => (
//                             <Card
//                                 key={index}
//                                 sx={{
//                                     p: 2,
//                                     borderRadius: 2,
//                                     cursor: 'pointer',
//                                     '&:hover': {
//                                         boxShadow: 2,
//                                         borderColor: 'primary.main'
//                                     }
//                                 }}
//                                 onClick={() => handleEditFollowUp(followup)}
//                             >
//                                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                         <TypeIcon type={followup.type} />
//                                         <Typography variant="subtitle1" sx={{ fontWeight: 600, ml: 1 }}>
//                                             {followup.title}
//                                         </Typography>
//                                     </Box>
//                                     <Box sx={{ gap: 2, display: 'flex' }}>
//                                         <Box>{followup.priority && <PriorityChip priority={followup.priority} />}</Box>
//                                         <Box>{followup.status && <StatusChip status={followup.status} />}</Box>
//                                     </Box>
//                                 </Box>

//                                 <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                                     Due: {followup.dueDate ? format(followup.dueDate, 'MMM dd, yyyy hh:mm a') : 'Not set'}
//                                 </Typography>

//                                 <Typography variant="body2" sx={{ mb: 2 }}>
//                                     {followup.notes}
//                                 </Typography>

//                                 {followup.assignedTo && (
//                                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                         <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem' }}>
//                                             {followup.assignedTo
//                                                 .split(' ')
//                                                 .map((n) => n[0])
//                                                 .join('')}
//                                         </Avatar>
//                                         <Typography variant="caption" color="text.secondary">
//                                             Assigned to: {followup.assignedTo}
//                                         </Typography>
//                                     </Box>
//                                 )}
//                             </Card>
//                         ))}
//                     </Stack>
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
//                 setLeads={fetchLeadData}
//                 // snackbarOpen={snackbarOpen}
//                 handleMenuClose={() => setOpenFollowUpForm(false)}
//                 setSnackbarSeverity={setSnackbarSeverity}
//                 setSnackbarMessage={setSnackbarMessage}
//             />

//             <MySnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} position={{ vertical: 'top', horizontal: 'right' }} onClose={() => setSnackbarOpen(false)} />
//         </Box>
//     );
// };

// ????????????????????????????????????????????????????????????????????????????
// ????????????????????????????Corectily working switch to timeline ????????????????????????????????????????????
// ????????????????????????????????????????????????????????????????????????????
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
// import { Avatar, Box, Button, Card, Chip, CircularProgress, Stack, Typography } from '@mui/material';
// import FollowUpForm from '../form/FollowUpForm'; // Adjust the import path as needed
// import { MyButton } from '../../../../Component/Buttons/Buttons'; // Adjust the import path as needed
// import { CustomChip } from '../../../../Component/Chip/Chip';
// import { MySnackbar } from '../../../../Component/Snackbar/Snackbar';

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

//     return <Chip size="small" label={priority} color={priorityMap[priority]?.color as any} variant="outlined" sx={{ ml: 1 }} />;
// };

// const StatusChip = ({ status }) => {
//     const statusMap = {
//         completed: { color: 'success', icon: <CompletedIcon fontSize="small" />, label: 'Completed' },
//         scheduled: { color: 'info', icon: <ScheduledIcon fontSize="small" />, label: 'Scheduled' },
//         pending: { color: 'warning', icon: <ScheduledIcon fontSize="small" />, label: 'Pending' },
//         overdue: { color: 'error', icon: <MissedIcon fontSize="small" />, label: 'Overdue' }
//     };
//     console.log(status, 'status');
//     return (
//         <CustomChip
//             status={{
//                 hexColor: statusMap[status]?.color as any,
//                 statusName: status.StatusName || '-'
//             }}
//         />
//     );
// };

// const TypeIcon = ({ type }: { type: 'call' | 'meeting' | 'email' | 'whatsapp' | 'visit' | 'other' }) => {
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

// export const FollowUpSection = ({ currentLead, UsersOptions, leadId, fetchLeadData }) => {
//     const [followups, setFollowups] = useState<FollowUp[]>(currentLead?.currentLead?.followUps || currentLead?.followUps || []);
//     const [openFollowUpForm, setOpenFollowUpForm] = useState(false);
//     const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState('');
//     const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>('success');
//     const [visibleFollowUps, setVisibleFollowUps] = useState(5); // Number of follow-ups to display initially
//     const [loading, setLoading] = useState(false);
//     const observer = useRef<IntersectionObserver | null>(null);

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
//             // Update existing
//             setFollowups(followups.map((f) => (f.id === followUp.id ? followUp : f)));
//         } else {
//             // Add new
//             setFollowups([...followups, { ...followUp, id: Date.now().toString() }]);
//         }
//         setOpenFollowUpForm(false);
//     };

//     const handleLoadMore = useCallback(() => {
//         if (loading) return;
//         setLoading(true);
//         setTimeout(() => {
//             setVisibleFollowUps((prev) => prev + 5); // Load 5 more follow-ups
//             setLoading(false);
//         }, 1000); // Simulate loading delay
//     }, [loading]);

//     useEffect(() => {
//         fetchLeadData();
//     }, [snackbarMessage]);

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
//         <Box sx={{ p: 0 }}>
//             <Card sx={{ p: 2, mb: 2, borderRadius: 2, boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)', border: '0px' }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//                     <Typography variant="h5" component="h2" fontWeight={600} mb={1}>
//                         Follow-Ups
//                     </Typography>
//                     <MyButton variant="contained" size="small" onClick={handleAddFollowUp}>
//                         Add Follow-Up
//                     </MyButton>
//                 </Box>

//                 <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
//                     Manage scheduled follow-ups with this lead
//                 </Typography>

//                 {followups.length > 0 ? (
//                     <Stack spacing={2}>
//                         {[...followups]
//                             .reverse()
//                             .slice(0, visibleFollowUps)
//                             .map((followup, index) => {
//                                 if (index + 1 === visibleFollowUps) {
//                                     return (
//                                         <div key={index} ref={lastFollowUpElementRef}>
//                                             <Card
//                                                 sx={{
//                                                     p: 2,
//                                                     borderRadius: 2,
//                                                     cursor: 'pointer',
//                                                     boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)',
//                                                     border: '0px',
//                                                     '&:hover': {
//                                                         boxShadow: 2,
//                                                         borderColor: 'primary.main'
//                                                     }
//                                                 }}
//                                                 onClick={() => handleEditFollowUp(followup)}
//                                             >
//                                                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                                                     <Box sx={{ display: 'flex', alignItems: 'start' }}>
//                                                         <TypeIcon type={followup.type} />
//                                                         <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
//                                                             {followup.leadStatus.statusName}
//                                                         </Typography>
//                                                     </Box>
//                                                     <Box sx={{ gap: 2, display: 'flex' }}>
//                                                         <Box>{followup.priority && <PriorityChip priority={followup.priority} />}</Box>
//                                                         <Box>{followup.status && <StatusChip status={followup.status} />}</Box>
//                                                     </Box>
//                                                 </Box>

//                                                 <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                                                     Due: {followup.dueDate ? format(followup.dueDate, 'MMM dd, yyyy hh:mm a') : 'Not set'}
//                                                 </Typography>

//                                                 <Typography variant="body2" sx={{ mb: 2 }}>
//                                                     {followup.notes}
//                                                 </Typography>

//                                                 {followup.assignedTo && (
//                                                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                                         <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem' }}>
//                                                             {followup.assignedTo
//                                                                 .split(' ')
//                                                                 .map((n) => n[0])
//                                                                 .join('')}
//                                                         </Avatar>
//                                                         <Typography variant="caption" color="text.secondary">
//                                                             Assigned to: {followup.assignedTo}
//                                                         </Typography>
//                                                     </Box>
//                                                 )}
//                                             </Card>
//                                         </div>
//                                     );
//                                 } else {
//                                     return (
//                                         <Card
//                                             key={index}
//                                             sx={{
//                                                 p: 2,
//                                                 borderRadius: 2,
//                                                 cursor: 'pointer',
//                                                 '&:hover': {
//                                                     boxShadow: 2,
//                                                     borderColor: 'primary.main'
//                                                 }
//                                             }}
//                                             onClick={() => handleEditFollowUp(followup)}
//                                         >
//                                             <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
//                                                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                                     <TypeIcon type={followup.type} />
//                                                     <Typography variant="subtitle1" sx={{ fontWeight: 600, ml: 1 }}>
//                                                         {followup.leadStatus.statusName}
//                                                     </Typography>
//                                                 </Box>
//                                                 <Box sx={{ gap: 2, display: 'flex' }}>
//                                                     <Box>{followup.priority && <PriorityChip priority={followup.priority} />}</Box>
//                                                     <Box>{followup.status && <StatusChip status={followup.status} />}</Box>
//                                                 </Box>
//                                             </Box>

//                                             <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
//                                                 Due: {followup.dueDate ? format(followup.dueDate, 'MMM dd, yyyy hh:mm a') : 'Not set'}
//                                             </Typography>

//                                             <Typography variant="body2" sx={{ mb: 2 }}>
//                                                 {followup.notes}
//                                             </Typography>

//                                             {followup.assignedTo && (
//                                                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                                     <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem' }}>
//                                                         {followup.assignedTo
//                                                             .split(' ')
//                                                             .map((n) => n[0])
//                                                             .join('')}
//                                                     </Avatar>
//                                                     <Typography variant="caption" color="text.secondary">
//                                                         Assigned to: {followup.assignedTo}
//                                                     </Typography>
//                                                 </Box>
//                                             )}
//                                         </Card>
//                                     );
//                                 }
//                             })}
//                         {loading && (
//                             <Typography sx={{ display: 'flex', justifyContent: 'center' }}>
//                                 <CircularProgress />
//                             </Typography>
//                         )}
//                     </Stack>
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
//                 setLeads={fetchLeadData}
//                 handleMenuClose={() => setOpenFollowUpForm(false)}
//                 setSnackbarSeverity={setSnackbarSeverity}
//                 setSnackbarMessage={setSnackbarMessage}
//             />

//             <MySnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} position={{ vertical: 'top', horizontal: 'right' }} onClose={() => setSnackbarOpen(false)} />
//         </Box>
//     );
// };

// ??????????????????????????????????????????????????????????????????
// ??????????????????????????????????????????????????????????????????
// ??????????????????????????????????????????????????????????????????

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { format } from 'date-fns';
import {
    Phone as CallIcon,
    Email as EmailIcon,
    Groups as MeetingIcon,
    WhatsApp as WhatsAppIcon,
    Home as VisitIcon,
    MoreHoriz as OtherIcon,
    CheckCircle as CompletedIcon,
    Schedule as ScheduledIcon,
    Warning as MissedIcon,
    ArrowUpward as HighPriorityIcon,
    ArrowDownward as LowPriorityIcon,
    Remove as MediumPriorityIcon
} from '@mui/icons-material';
import { Avatar, Box, Button, Card, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import { Timeline, TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent } from '@mui/lab';

import FollowUpForm from '../form/FollowUpForm';
import { MyButton } from '../../../../ui-components/Buttons/Buttons';
import { CustomChip } from '../../../../ui-components/Chip/Chip';
import { MySnackbar } from '../../../../ui-components/Snackbar/Snackbar';

type Severity = 'error' | 'warning' | 'info' | 'success';

interface FollowUp {
    id?: string;
    leadStatus?: any;
    notes: string;
    dueDate: Date | null;
    followUpDate?: Date | null;
    status: 'completed' | 'pending' | 'overdue' | 'scheduled';
    priority: 'high' | 'medium' | 'low';
    assignedTo?: string;
    type: 'call' | 'meeting' | 'email' | 'whatsapp' | 'visit' | 'other';
    reminderSet?: boolean;
    reminderDate?: Date | null;
    outcome?: string;
    leadId: string;
    createdAt?: Date;
}

const PriorityChip = ({ priority }: { priority: 'high' | 'medium' | 'low' }) => {
    const priorityMap = {
        high: { color: 'error', icon: <HighPriorityIcon fontSize="small" /> },
        medium: { color: 'warning', icon: <MediumPriorityIcon fontSize="small" /> },
        low: { color: 'success', icon: <LowPriorityIcon fontSize="small" /> }
    };

    return <Chip size="small" label={priority} color={priorityMap[priority].color as any} variant="outlined" />;
};

const StatusChip = ({ status }) => {
    const statusMap = {
        completed: { color: 'success', icon: <CompletedIcon fontSize="small" />, label: 'Completed' },
        scheduled: { color: 'info', icon: <ScheduledIcon fontSize="small" />, label: 'Scheduled' },
        pending: { color: 'warning', icon: <ScheduledIcon fontSize="small" />, label: 'Pending' },
        overdue: { color: 'error', icon: <MissedIcon fontSize="small" />, label: 'Overdue' }
    };

    return (
        <CustomChip
            status={{
                hexcolor: statusMap[status]?.color as any,
                statusName: status?.StatusName || '-'
            }}
        />
    );
};

const TypeIcon = ({ type }: { type: FollowUp['type'] }) => {
    const iconMap = {
        call: <CallIcon fontSize="small" />,
        email: <EmailIcon fontSize="small" />,
        meeting: <MeetingIcon fontSize="small" />,
        whatsapp: <WhatsAppIcon fontSize="small" />,
        visit: <VisitIcon fontSize="small" />,
        other: <OtherIcon fontSize="small" />
    };

    return iconMap[type];
};

export const FollowUpSection = ({ currentLead, UsersOptions, leadId, setLeadData }) => {
    const [followups, setFollowups] = useState<FollowUp[]>(currentLead?.followUps || []);
    const [openFollowUpForm, setOpenFollowUpForm] = useState(false);
    const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>('success');
    const [visibleFollowUps, setVisibleFollowUps] = useState(5);
    const [loading, setLoading] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);

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
            setFollowups(followups.map((f) => (f.id === followUp.id ? followUp : f)));
        } else {
            setFollowups([...followups, { ...followUp, id: Date.now().toString() }]);
        }
        setOpenFollowUpForm(false);
    };

    const handleLoadMore = useCallback(() => {
        if (loading) return;
        setLoading(true);
        setTimeout(() => {
            setVisibleFollowUps((prev) => prev + 5);
            setLoading(false);
        }, 1000);
    }, [loading]);

    const lastFollowUpElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && visibleFollowUps < followups.length) {
                    handleLoadMore();
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, visibleFollowUps, followups.length, handleLoadMore]
    );

    return (
        <Box>
            <Card sx={{ p: 2, mb: 2, borderRadius: 2, boxShadow: '0 6px 30px rgba(182, 186, 203, 0.3)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h5" fontWeight={600}>
                        Follow-Ups
                    </Typography>
                    <MyButton variant="contained" size="small" onClick={handleAddFollowUp}>
                        Add Follow-Up
                    </MyButton>
                </Box>

                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                    View and manage follow-up activity
                </Typography>

                {followups.length > 0 ? (
                    <Timeline position="alternate">
                        {[...followups]
                            .reverse()
                            .slice(0, visibleFollowUps)
                            .map((followup, index) => {
                                const isLast = index + 1 === visibleFollowUps;
                                const timelineItem = (
                                    <TimelineItem key={followup.id || index} ref={isLast ? lastFollowUpElementRef : undefined} onClick={() => handleEditFollowUp(followup)} sx={{ cursor: 'pointer' }}>
                                        <TimelineSeparator>
                                            <TimelineDot color="primary">
                                                <TypeIcon type={followup.type} />
                                            </TimelineDot>
                                            {index < visibleFollowUps - 1 && <TimelineConnector />}
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Card sx={{ p: 2, borderRadius: 2 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                    <Typography variant="subtitle1" fontWeight={600} sx={{ mr: 2 }}>
                                                        {followup.leadStatus?.statusName}
                                                    </Typography>
                                                    <Stack direction="row" spacing={1}>
                                                        <PriorityChip priority={followup.priority} />
                                                        <StatusChip status={followup.status} />
                                                    </Stack>
                                                </Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    Due: {followup.dueDate ? format(new Date(followup.dueDate), 'MMM dd, yyyy hh:mm a') : 'Not set'}
                                                </Typography>
                                                <Typography variant="body2" sx={{ mt: 1 }}>
                                                    {followup.notes}
                                                </Typography>
                                                {followup.assignedTo && (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                                        <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                                                            {followup.assignedTo
                                                                .split(' ')
                                                                .map((n) => n[0])
                                                                .join('')}
                                                        </Avatar>
                                                        <Typography variant="caption" color="text.secondary">
                                                            Assigned to: {followup.assignedTo}
                                                        </Typography>
                                                    </Box>
                                                )}
                                            </Card>
                                        </TimelineContent>
                                    </TimelineItem>
                                );

                                return timelineItem;
                            })}
                        {loading && (
                            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <CircularProgress />
                            </Box>
                        )}
                    </Timeline>
                ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                            No follow-ups scheduled yet
                        </Typography>
                        <MyButton variant="outlined" size="small" onClick={handleAddFollowUp}>
                            Schedule First Follow-Up
                        </MyButton>
                    </Box>
                )}
            </Card>

            <FollowUpForm
                UsersOptions={UsersOptions}
                open={openFollowUpForm}
                onOpenChange={setOpenFollowUpForm}
                leadId={leadId}
                followUp={selectedFollowUp}
                setSnackbarOpen={setSnackbarOpen}
                setLeads={setLeadData}
                handleMenuClose={() => setOpenFollowUpForm(false)}
                setSnackbarSeverity={setSnackbarSeverity}
                setSnackbarMessage={setSnackbarMessage}
            />

            <MySnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} position={{ vertical: 'top', horizontal: 'right' }} onClose={() => setSnackbarOpen(false)} />
        </Box>
    );
};
