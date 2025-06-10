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
                                    <TimelineItem key={followup.id || index} sx={{ cursor: 'pointer' }}>
                                        <div ref={isLast ? lastFollowUpElementRef : null} onClick={() => handleEditFollowUp(followup)}>
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
                                        </div>
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
