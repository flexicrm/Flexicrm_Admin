// import React, { useState, useEffect } from 'react';
// // import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Button, Checkbox, FormControlLabel, Grid, Box, Typography, Card, CardContent, Stack, Chip, Avatar } from '@mui/material';
// // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
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
// import FollowUpForm from '../form/FollowUpForm';
// import { MyButton } from '../../../../Component/Buttons/Buttons';

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

//     return <Chip size="small" icon={priorityMap[priority].icon} label={priority} color={priorityMap[priority].color as any} variant="outlined" sx={{ ml: 1 }} />;
// };

// const StatusChip = ({ status }: { status: 'completed' | 'pending' | 'overdue' | 'scheduled' }) => {
//     const statusMap = {
//         completed: { color: 'success', icon: <CompletedIcon fontSize="small" />, label: 'Completed' },
//         scheduled: { color: 'info', icon: <ScheduledIcon fontSize="small" />, label: 'Scheduled' },
//         pending: { color: 'warning', icon: <ScheduledIcon fontSize="small" />, label: 'Pending' },
//         overdue: { color: 'error', icon: <MissedIcon fontSize="small" />, label: 'Overdue' }
//     };

//     return <Chip size="small" icon={statusMap[status].icon} label={statusMap[status].label} color={statusMap[status].color as any} variant="outlined" sx={{ ml: 1 }} />;
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

// // Sample follow-up data
// const sampleFollowUps: FollowUp[] = [
//     {
//         id: '1',
//         title: 'Initial client call',
//         notes: 'Discuss project requirements and timeline',
//         dueDate: new Date(Date.now() + 86400000), // Tomorrow
//         status: 'scheduled',
//         priority: 'high',
//         type: 'call',
//         assignedTo: 'John Doe',
//         leadId: 'lead-123',
//         reminderSet: true,
//         reminderDate: new Date(Date.now() + 43200000) // 12 hours from now
//     },
//     {
//         id: '2',
//         title: 'Send proposal',
//         notes: 'Email the proposal document with pricing',
//         dueDate: new Date(Date.now() + 172800000), // 2 days from now
//         status: 'pending',
//         priority: 'medium',
//         type: 'email',
//         leadId: 'lead-123'
//     },
//     {
//         id: '3',
//         title: 'On-site meeting',
//         notes: 'Visit client office to finalize details',
//         dueDate: new Date(Date.now() + 604800000), // 7 days from now
//         status: 'scheduled',
//         priority: 'low',
//         type: 'visit',
//         assignedTo: 'Jane Smith',
//         leadId: 'lead-123'
//     }
// ];

// export const FollowUpSection = (currentLead, UsersOptions): any => {
//     console.log(currentLead.currentLead.followUps, 'currentLead?.followUps');

//     const [followups, setFollowups] = useState<FollowUp[]>(currentLead?.currentLead?.followUps);
//     const [openFollowUpForm, setOpenFollowUpForm] = useState(false);
//     const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null);

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
//                         {followups.map((followup) => (
//                             <Card
//                                 key={followup.id}
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
//                                     <Box>
//                                         {followup.priority && <PriorityChip priority={followup.priority} />}
//                                         {followup.status && <StatusChip status={followup.status} />}
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

//             <FollowUpForm UsersOptions={UsersOptions} open={openFollowUpForm} onOpenChange={setOpenFollowUpForm} leadId="lead-123" followUp={selectedFollowUp} />
//         </Box>
//     );
// };
'use client';
import React, { useState } from 'react';
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
import { Avatar, Box, Button, Card, Chip, Stack, Typography } from '@mui/material';
import FollowUpForm from '../form/FollowUpForm'; // Adjust the import path as needed
import { MyButton } from '../../../../Component/Buttons/Buttons'; // Adjust the import path as needed
import { CustomChip } from '../../../../Component/Chip/Chip';

interface FollowUp {
    id?: string;
    title: string;
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

    return <Chip size="small" icon={priorityMap[priority]?.icon} label={priority} color={priorityMap[priority]?.color as any} variant="outlined" sx={{ ml: 1 }} />;
};

const StatusChip = ({ status }) => {
    console.log(status, 'status');

    const statusMap = {
        completed: { color: status.color, icon: <CompletedIcon fontSize="small" />, label: status.StatusName },
        scheduled: { color: 'info', icon: <ScheduledIcon fontSize="small" />, label: 'Scheduled' },
        pending: { color: 'warning', icon: <ScheduledIcon fontSize="small" />, label: 'Pending' },
        overdue: { color: 'error', icon: <MissedIcon fontSize="small" />, label: 'Overdue' }
    };

    return (
        <CustomChip
            status={{
                hexColor: statusMap[status]?.color as any,
                statusName: status.StatusName || 'null'
            }}
        />
    );
};

const TypeIcon = ({ type }: { type: 'call' | 'meeting' | 'email' | 'whatsapp' | 'visit' | 'other' }) => {
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

export const FollowUpSection = ({ currentLead, UsersOptions, leadId }) => {
    const [followups, setFollowups] = useState<FollowUp[]>(currentLead?.currentLead?.followUps || currentLead?.followUps || []);
    const [openFollowUpForm, setOpenFollowUpForm] = useState(false);
    const [selectedFollowUp, setSelectedFollowUp] = useState<FollowUp | null>(null);
    console.log(followups, 'followups');

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
            // Update existing
            setFollowups(followups.map((f) => (f.id === followUp.id ? followUp : f)));
        } else {
            // Add new
            setFollowups([...followups, { ...followUp, id: Date.now().toString() }]);
        }
        setOpenFollowUpForm(false);
    };

    return (
        <Box sx={{ p: 0 }}>
            <Card variant="outlined" sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 400 }}>
                        Follow-Ups
                    </Typography>
                    <MyButton variant="contained" size="small" onClick={handleAddFollowUp}>
                        Add Follow-Up
                    </MyButton>
                </Box>

                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
                    Manage scheduled follow-ups with this lead
                </Typography>

                {followups.length > 0 ? (
                    <Stack spacing={2}>
                        {[...followups].reverse().map((followup, index) => (
                            <Card
                                key={index}
                                sx={{
                                    p: 2,
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        boxShadow: 2,
                                        borderColor: 'primary.main'
                                    }
                                }}
                                onClick={() => handleEditFollowUp(followup)}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <TypeIcon type={followup.type} />
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600, ml: 1 }}>
                                            {followup.title}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ gap: 2, display: 'flex' }}>
                                        <Box>{followup.priority && <PriorityChip priority={followup.priority} />}</Box>
                                        <Box>{followup.status && <StatusChip status={followup.status} />}</Box>
                                    </Box>
                                </Box>

                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    Due: {followup.dueDate ? format(followup.dueDate, 'MMM dd, yyyy hh:mm a') : 'Not set'}
                                </Typography>

                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    {followup.notes}
                                </Typography>

                                {followup.assignedTo && (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Avatar sx={{ width: 24, height: 24, mr: 1, fontSize: '0.75rem' }}>
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
                        ))}
                    </Stack>
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

            <FollowUpForm UsersOptions={UsersOptions} open={openFollowUpForm} onOpenChange={setOpenFollowUpForm} leadId={leadId} followUp={selectedFollowUp} />
        </Box>
    );
};
