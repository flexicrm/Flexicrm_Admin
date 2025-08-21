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
    console.log(followUpStatusOptions, 'followUpStatusOptions');
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
                            <CustomChip status={{ hexcolor: `${option.color}`, statusName: option.label || '-' }} />
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

                                                        <CustomChip
                                                            status={{
                                                                hexcolor: `${followup?.status?.color}`,
                                                                statusName: followup?.status?.StatusName || '-'
                                                            }}
                                                        />
                                                        {/* <StatusChip status={followup.status} /> */}
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
                                                            {/* 🕒 Created: {followup.createdAt ? new Date(followup.createdAt).toLocaleDateString() : '—'} */}
                                                        </Typography>

                                                        {followup.assignTo && (
                                                            <Typography variant="caption" color="text.secondary">
                                                                Assigned to : {`${followup?.assignTo?.map((item) => `${item.firstname || '-'} ${item.lastname}`)} `}
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
