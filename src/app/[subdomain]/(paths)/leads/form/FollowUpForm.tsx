'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { createFollowupdata, GetFollowupStatus, GetStatus, UpdateFollowupdata } from '../../../../../../api/Leads';
import Cookies from 'js-cookie';
import { runConfetti } from '../../../../ui-components/RunConfetti/RunConfetti';
import { defaultFollowUp, FollowUp, FollowUpFormProps, LeadStatuss } from '../../../../type/FollowupForm';
import { motivationalMessages } from '../../../../ui-components/motivational/motivationalMessages';
import ShowWonAnimation from '../../../../ui-components/RunConfetti/showWonAnimation';
import ShowLostAnimation from '../../../../ui-components/motivational/ShowLostAnimation';
import FollowUpDialog from './FollowUpDialog';
import useFollowupStatusOptions from '../Dropdownapi/FollowupstatusDropdown';
const FollowUpForm = ({ open, onOpenChange, leadId, followUp, UsersOptions, setLeads, setSnackbarOpen, setSnackbarSeverity, setSnackbarMessage, handleMenuClose }: FollowUpFormProps) => {
    const lastFollowUp = Array.isArray(followUp) ? followUp[followUp.length - 1] : followUp;
    const [formData, setFormData] = useState<Partial<FollowUp>>({ ...defaultFollowUp });
    const [dueDate, setDueDate] = useState<any | null>(null);
    const [reminderDate, setReminderDate] = useState<any | null>(null);
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

    const statusesOptions = useFollowupStatusOptions();

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
                    } else if (response?.data?.updatedLead?.leadstatus.statusName.toLowerCase() == 'lost') {
                        setShowLostAnimation(true);
                        setCurrentMessage(response.data.message || 'Opportunity lost.');
                        handleMenuClose();
                    }
                    // setLeads((prevLeads) => prevLeads.map((lead) => (lead._id === response.data.updatedLead._id ? response.data.updatedLead : lead)));
                    setLeads((prev) => {
                        const updated = response?.data?.updatedLead;

                        if (!updated) return prev; // guard clause
                        console.log(prev, 'updated????');
                        if (Array.isArray(prev)) {
                            return prev.map((lead) => (lead.LeadId === updated.LeadId ? updated : lead));
                        }
                        console.log(prev.LeadId === updated.LeadId, 'prev.LeadId === updated.LeadId');
                        // If prev is an object and its LeadId matches, return the updated one
                        if (typeof prev === 'object' && prev !== null && 'LeadId' in prev) {
                            return prev.LeadId === updated.LeadId ? updated : prev;
                        }

                        return prev;
                    });
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

                    setSnackbarSeverity('success');
                    setSnackbarMessage(response?.data?.message);

                    if (response?.data?.updatedLead?.leadstatus.statusName.toLowerCase() == 'won') {
                        setShowWonAnimation(true);
                        handleMenuClose();
                        onOpenChange(false);
                    } else if (response?.data?.updatedLead?.leadstatus.statusName.toLowerCase() == 'lost') {
                        setShowLostAnimation(true);
                        setCurrentMessage(response.data.message || 'Opportunity lost.');
                        handleMenuClose();
                    }
                    // setLeads((prev) => prev.map((lead) => (lead.LeadId === response.data.updatedLead.LeadId ? response.data.updatedLead : lead)));
                    setLeads((prev) => {
                        const updated = response?.data?.updatedLead;

                        if (!updated) return prev; // guard clause

                        if (Array.isArray(prev)) {
                            return prev.map((lead) => (lead.LeadId === updated.LeadId ? updated : lead));
                        }

                        // If prev is an object and its LeadId matches, return the updated one
                        if (typeof prev === 'object' && prev !== null && 'LeadId' in prev) {
                            return prev.LeadId === updated.LeadId ? updated : prev;
                        }

                        return prev;
                    });

                    handleMenuClose();
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
            <FollowUpDialog
                open={open}
                onClose={handleCancel}
                followUp={followUp}
                leadStatus={leadStatus}
                usersType={usersType}
                statusesOptions={statusesOptions}
                UsersOptions={UsersOptions}
                formData={formData}
                dueDate={dueDate}
                reminderEnabled={reminderEnabled}
                reminderDate={reminderDate}
                isSubmitting={isSubmitting}
                isSmall={isSmall}
                handleSubmit={handleSubmit}
                setLeadStatus={setLeadStatus}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                setDueDate={setDueDate}
                setReminderEnabled={setReminderEnabled}
                setReminderDate={setReminderDate}
            />

            {showWonAnimation && <ShowWonAnimation showWonAnimation={showWonAnimation} />}

            {showLostAnimation && <ShowLostAnimation currentMessage={currentMessage} showLostAnimation={showLostAnimation} />}
        </>
    );
};

export default FollowUpForm;
