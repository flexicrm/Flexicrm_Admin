'use client';
import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Grid, Box, Fade, Typography, useMediaQuery, useTheme } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MyButton } from '../../../../Component/Buttons/Buttons';
import { createFollowupdata, GetFollowupStatus, GetStatus, UpdateFollowupdata } from '../../../../../../api/Leads';
import Cookies from 'js-cookie';
import { DateTimePicker } from '@mui/x-date-pickers';
import confetti from 'canvas-confetti';
import LeadStatus from '../leadstatus';
import { EmojiEvents, SentimentVeryDissatisfied } from '@mui/icons-material';
import userContext from '../../../../UseContext/UseContext';

interface FollowUp {
    id?: string;
    leadStatus?: any;
    notes: string;
    dueDate: any;
    followUpDate?: any;
    status?: 'completed' | 'pending' | 'overdue' | 'scheduled';
    priority?: 'high' | 'medium' | 'low';
    assignTo?: string;
    type?: 'call' | 'meeting' | 'email' | 'whatsapp' | 'visit' | 'other';
    isSetTimer?: boolean;
    dateTime?: string;
    outcome?: string;
    leadId?: any;
    createdAt?: any;
}

interface FollowUpFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    leadId: any;
    followUp?: any;
    UsersOptions: any;
    setLeads: any;
    setSnackbarMessage: any;
    setSnackbarSeverity: any;
    setSnackbarOpen: any;
    handleMenuClose: any;
}

interface LeadStatus {
    _id: string;
    StatusName: string;
    color: string;
}

const defaultFollowUp: Partial<FollowUp> = {
    leadStatus: '',
    type: 'call',
    notes: '',
    priority: 'medium',
    status: 'scheduled'
};
const motivationalMessages = ['Better luck next time!', "Every 'no' brings you closer to 'yes'", 'This setback is just setup for a comeback', 'The comeback is always stronger than the setback', 'Learn from this and come back stronger'];

const FollowUpForm = ({ open, onOpenChange, leadId, followUp, UsersOptions, setLeads, setSnackbarOpen, setSnackbarSeverity, setSnackbarMessage, handleMenuClose }: FollowUpFormProps) => {
    const lastFollowUp = Array.isArray(followUp) ? followUp[followUp.length - 1] : followUp;
    console.log(followUp, 'followUp');
    const { leadscon } = useContext<any>(userContext);
    const [formData, setFormData] = useState<Partial<FollowUp>>({ ...defaultFollowUp });
    const [dueDate, setDueDate] = useState<any | null>(null);
    const [reminderDate, setReminderDate] = useState<any | null>(null);
    const [statuses, setStatuses] = useState<LeadStatus[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [types, setTypes] = useState([]);
    const [leadStatus, setLeadStatus] = useState(null);
    const [reminderEnabled, setReminderEnabled] = useState(false);
    const [showWonAnimation, setShowWonAnimation] = useState(false);
    const [showLostAnimation, setShowLostAnimation] = useState(false);
    const [currentMessage, setCurrentMessage] = useState('');
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    const subdomain = Cookies.get('subdomain');
    const isEditMode = !!followUp?.id;
    const runConfetti = () => {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            spread: 100,
            startVelocity: 55
        };

        function fire(particleRatio: number, opts: confetti.Options) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
            angle: 60,
            decay: 0.9,
            scalar: 1.2
        });
        fire(0.2, {
            spread: 60,
            angle: 120,
            decay: 0.9,
            scalar: 1.2
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.3
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
            scalar: 1.4
        });
    };
    const fetchStatuses = useCallback(async () => {
        try {
            const res = await GetStatus(subdomain);
            setStatuses(res.data);
        } catch (err) {
            console.error(err);
        }
    }, [subdomain]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetFollowupStatus(subdomain);
                setTypes(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [subdomain]);

    useEffect(() => {
        fetchStatuses();
    }, [fetchStatuses]);

    console.log(lastFollowUp, 'lastFollowUp');
    useEffect(() => {
        if (followUp) {
            setFormData({
                leadStatus: lastFollowUp?.leadStatus?._id || '',
                type: lastFollowUp?.type?._id || 'call',
                notes: lastFollowUp?.notes || '',
                priority: lastFollowUp?.priority || 'medium',
                status: lastFollowUp?.status?._id || 'scheduled',
                assignTo: lastFollowUp?.assignTo?._id || ''
            });
            setLeadStatus(lastFollowUp?.leadStatus);
            setDueDate(lastFollowUp?.dueDate ? new Date(lastFollowUp.dueDate) : null);
            setReminderEnabled(!!lastFollowUp?.isSetTimer);
            setReminderDate(lastFollowUp?.dateTime ? new Date(lastFollowUp.dateTime) : null);
        } else {
            setFormData({ ...defaultFollowUp, leadId });
            setDueDate(null);
            setReminderEnabled(false);
            setReminderDate(null);
        }
    }, [followUp, leadId, lastFollowUp]);

    useEffect(() => {
        if (showWonAnimation) {
            runConfetti();
            const timer = setTimeout(() => {
                setShowWonAnimation(false);
                // setShowLostAnimation(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showWonAnimation]);

    useEffect(() => {
        if (showLostAnimation) {
            setCurrentMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
            const timer = setTimeout(() => {
                setShowLostAnimation(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showLostAnimation]);

    const statusesOptions = useMemo(
        () =>
            statuses?.map((lead) => ({
                label: lead.StatusName,
                value: lead._id,
                color: lead.color
            })),
        [statuses]
    );

    const usersType = useMemo(
        () =>
            types?.map((type) => ({
                label: type.typeName,
                value: type._id
            })),
        [types]
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const followUpData = {
            ...(!followUp || !followUp?._id
                ? {
                      followUps: [
                          {
                              leadStatus: leadStatus!,
                              type: formData.type as FollowUp['type'],
                              notes: formData.notes,
                              dueDate: dueDate?.toISOString(),
                              priority: formData.priority as FollowUp['priority'],
                              status: formData.status as FollowUp['status'],
                              assignTo: formData.assignTo,
                              isSetTimer: reminderEnabled,
                              dateTime: reminderEnabled && reminderDate ? reminderDate.toISOString() : undefined
                          }
                      ]
                  }
                : {
                      leadStatus: leadStatus!,
                      type: formData.type as FollowUp['type'],
                      notes: formData.notes,
                      dueDate: dueDate?.toISOString(),
                      priority: formData.priority as FollowUp['priority'],
                      status: formData.status as FollowUp['status'],
                      assignTo: formData.assignTo,
                      isSetTimer: reminderEnabled,
                      dateTime: reminderEnabled && reminderDate ? reminderDate.toISOString() : undefined
                  })
        };

        try {
            setIsSubmitting(true);

            if (!followUp) {
                const response = await createFollowupdata(subdomain, leadId, followUpData);
                console.log(response, 'response');
                if (response.success) {
                    setSnackbarOpen(true);

                    setSnackbarSeverity('success');
                    setSnackbarMessage(response?.data?.message);
                    onOpenChange(false);
                    handleMenuClose();
                    if (response?.data?.updatedLead?.leadstatus.statusName.toLowerCase() == 'won') {
                        setShowWonAnimation(true);
                        handleMenuClose();
                        onOpenChange(false);
                        // setLeads();
                        // setLeadsCon((prev) => !prev);
                    } else if (response?.data?.updatedLead?.leadstatus.statusName.toLowerCase() == 'lost') {
                        setShowLostAnimation(true);
                        setCurrentMessage(response.data.message || 'Opportunity lost.');
                        handleMenuClose();
                        // setLeads();
                        // setLeadsCon((prev) => !prev);
                    }
                    const updatedLead = response.data.updatedLead;
                    const leadExists = leadscon.some((lead) => lead.LeadId === updatedLead.LeadId);

                    const updatedLeads = leadExists ? leadscon.map((lead) => (lead.LeadId === updatedLead.LeadId ? updatedLead : lead)) : [...leadscon, updatedLead];

                    setLeads(updatedLeads);
                    // setLeads((prev) => console.log(prev));
                } else {
                    handleMenuClose();
                    setSnackbarOpen(true);
                    setSnackbarSeverity('error');
                    setSnackbarMessage(response.data.errors);
                }
            } else {
                const response = await UpdateFollowupdata(subdomain, leadId, followUpData, followUp._id);
                if (response.success) {
                    setSnackbarOpen(true);
                    // handleCancel();
                    console.log(response, 'response');

                    setSnackbarSeverity('success');
                    setSnackbarMessage(response?.data?.message);
                    // console.log(response?.data?.updatedLead.followUps.slice(-1)[0], 'response');
                    // setLeads();
                    // const updatedLead = response.data.updatedLead;

                    // // Ensure followUp is an object
                    // const followUpObject = typeof followUp === 'object' && followUp !== null ? followUp : {};

                    // // Check if the LeadId exists in the followUp object
                    // const leadExists = updatedLead.LeadId in followUpObject;

                    // // Update or add the lead to the followUp object
                    // const updatedLeads = {
                    //     ...followUpObject,
                    //     [updatedLead.LeadId]: leadExists ? { ...followUpObject[updatedLead.LeadId], ...updatedLead } : updatedLead
                    // };

                    // // If you need to convert the object back to an array or another format, do it here
                    // // For example, converting the object values to an array
                    // const updatedLeadsArray = Object.values(updatedLeads);
                    // console.log(updatedLeadsArray, 'updatedLeadsArray');
                    // // Set the state with the updated leads
                    // setLeads(updatedLeadsArray);

                    if (response?.data?.updatedLead?.leadstatus.statusName.toLowerCase() == 'won') {
                        setShowWonAnimation(true);
                        handleMenuClose();
                        onOpenChange(false);
                        // setLeads();
                        // setLeadsCon((prev) => !prev);
                    } else if (response?.data?.updatedLead?.leadstatus.statusName.toLowerCase() == 'lost') {
                        setShowLostAnimation(true);
                        setCurrentMessage(response.data.message || 'Opportunity lost.');
                        handleMenuClose();
                        // setLeads();
                        // setLeadsCon((prev) => !prev);
                    }

                    handleMenuClose();
                    // setLeadsCon((prev) => console.log(prev, 'aaaa'));
                } else {
                    handleMenuClose();
                    setSnackbarOpen(true);
                    setSnackbarSeverity('success');
                    setSnackbarMessage(response.data.errors);
                    handleCancel();
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        onOpenChange(false);
    };

    return (
        <>
            <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
                <DialogTitle>{followUp?._id ? 'Edit Follow-Up' : 'Add New Follow-Up'}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} sx={{ mt: 3 }}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <LeadStatus leadStatus={leadStatus} onSelect={setLeadStatus} />
                                {/* <TextField fullWidth label="Title" size="small" name="title" value={formData.title} onChange={handleInputChange} required /> */}
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <FormControl fullWidth size="small">
                                    <TextField select fullWidth size="small" label="Type" name="type" value={formData.type} onChange={(e) => handleSelectChange('type', e.target.value)}>
                                        {usersType?.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        label="Due Date"
                                        value={dueDate}
                                        onChange={(newValue) => setDueDate(newValue)}
                                        enableAccessibleFieldDOMStructure={false}
                                        slots={{ textField: TextField }}
                                        slotProps={{
                                            textField: {
                                                size: 'small',
                                                fullWidth: true,
                                                required: true
                                            },
                                            popper: {
                                                placement: 'top-start',
                                                modifiers: [
                                                    {
                                                        name: 'offset',
                                                        options: {
                                                            offset: [0, 10]
                                                        }
                                                    }
                                                ],
                                                sx: {
                                                    '& .MuiPaper-root': {
                                                        maxHeight: 300, // restrict calendar width
                                                        width: '100%',
                                                        fontSize: '0.85rem',
                                                        overflow: 'auto ' // scale down text inside calendar
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Priority</InputLabel>
                                    <Select value={formData.priority} onChange={(e) => handleSelectChange('priority', e.target.value)} label="Priority">
                                        <MenuItem value="low">Low</MenuItem>
                                        <MenuItem value="medium">Medium</MenuItem>
                                        <MenuItem value="high">High</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <FormControl fullWidth size="small">
                                    <TextField select fullWidth size="small" label="Status" name="status" value={formData.status} onChange={(e) => handleSelectChange('status', e.target.value)}>
                                        {statusesOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                <Box display="flex" alignItems="start">
                                                    {/* <Box
                                                        sx={{
                                                            width: 16,
                                                            height: 16,
                                                            bgcolor: `#${option.color}`
                                                            // mr: 1
                                                        }}
                                                    /> */}
                                                    {option.label}
                                                </Box>
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </FormControl>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField select fullWidth size="small" label="Assign To" name="assignTo" value={formData.assignTo} onChange={handleInputChange}>
                                    {UsersOptions?.map((option) => (
                                        <MenuItem key={option.value || option.id} value={option.value || option.id}>
                                            {option.label || option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <FormControlLabel control={<Checkbox size="small" checked={reminderEnabled} onChange={(e) => setReminderEnabled(e.target.checked)} />} label="Set reminder" />
                            </Grid>
                            {reminderEnabled && (
                                <Grid size={{ xs: 12 }}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            label="Reminder Date"
                                            value={reminderDate}
                                            onChange={(newValue) => setReminderDate(newValue)}
                                            enableAccessibleFieldDOMStructure={false}
                                            slots={{ textField: TextField }}
                                            slotProps={{
                                                textField: {
                                                    size: isSmall ? 'small' : 'small',
                                                    // fullWidth: true,
                                                    sx: {
                                                        fontSize: isSmall ? '0.8rem' : '0.8rem'
                                                    }
                                                },

                                                popper: {
                                                    placement: 'top-start',
                                                    modifiers: [
                                                        {
                                                            name: 'offset',
                                                            options: {
                                                                offset: [0, 10]
                                                            }
                                                        }
                                                    ],
                                                    sx: {
                                                        '& .MuiPaper-root': {
                                                            maxHeight: 300, // restrict calendar width
                                                            width: '100%',
                                                            fontSize: '0.85rem',
                                                            overflow: 'auto ' // scale down text inside calendar
                                                        }
                                                    }
                                                }
                                            }}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                            )}
                            {formData.status === 'completed' && (
                                <Grid size={{ xs: 12 }}>
                                    <TextField size="small" fullWidth label="Outcome" name="outcome" value={formData.outcome || ''} onChange={handleInputChange} multiline rows={3} />
                                </Grid>
                            )}
                            <Grid size={{ xs: 12 }}>
                                <TextField size="small" fullWidth label="Notes" name="notes" value={formData.notes || ''} onChange={handleInputChange} multiline rows={3} />
                            </Grid>
                        </Grid>
                        <DialogActions>
                            <MyButton variant="text" onClick={handleCancel} color="primary">
                                Cancel
                            </MyButton>
                            <MyButton color="primary" disabled={isSubmitting} type="submit">
                                {isSubmitting ? 'Saving...' : !followUp ? 'Create Follow-Up' : 'Update Follow-Up'}
                            </MyButton>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            {showWonAnimation && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                        pointerEvents: 'none'
                    }}
                >
                    <Fade in={showWonAnimation} timeout={500}>
                        <Box textAlign="center">
                            <EmojiEvents sx={{ fontSize: 120, color: 'gold', mb: 2 }} />
                            <Typography variant="h4" sx={{ color: 'gold', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                                CONGRATULATIONS!
                            </Typography>
                            <Typography variant="h6" sx={{ color: 'white', mt: 1, textShadow: '0 0 5px rgba(0,0,0,0.8)' }}>
                                Deal Closed Successfully!
                            </Typography>
                        </Box>
                    </Fade>
                </Box>
            )}

            {showLostAnimation && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                        pointerEvents: 'none',
                        backgroundColor: 'rgba(0,0,0,0.7)'
                    }}
                >
                    <Fade in={showLostAnimation} timeout={500}>
                        <Box textAlign="center">
                            <SentimentVeryDissatisfied sx={{ fontSize: 120, color: 'white', mb: 2 }} />
                            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold', textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                                OPPORTUNITY LOST
                            </Typography>
                            <Typography variant="h5" sx={{ color: 'white', mt: 2, maxWidth: '80%', mx: 'auto' }}>
                                {currentMessage}
                            </Typography>
                        </Box>
                    </Fade>
                </Box>
            )}
        </>
    );
};

export default FollowUpForm;
