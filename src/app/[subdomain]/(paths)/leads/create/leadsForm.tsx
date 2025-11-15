'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Grid, TextField, MenuItem, Typography, InputAdornment, Divider, Chip, SelectProps } from '@mui/material';
import {
    Email as EmailIcon,
    Phone as PhoneIcon,
    MeetingRoom as MeetingIcon,
    Person as PersonIcon,
    Business as BusinessIcon,
    Language as WebsiteIcon,
    Work as JobTitleIcon,
    AttachMoney as MoneyIcon,
    Videocam as OnlineIcon,
    Business as OfficeIcon,
    ArrowBackIos as ArrowBackIosIcon
} from '@mui/icons-material';
import LeadStatus from '../leadstatus';
import LeadSource from '../leadsource';
import Cookies from 'js-cookie';
import userContext from '../../../../UseContext/UseContext';
import { MyButton } from '../../../../ui-components/Buttons/Buttons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { LeadPost, UpdateLeadsByID } from '../../../../../../api/Leads';
import { MySnackbar } from '../../../../ui-components/Snackbar/Snackbar';
import { useRouter } from 'next/navigation';
import Notepad from '../../../../ui-components/Notepad/Notepad';

const COUNTRY_POTENTIAL_VALUES: Record<string, number> = {
    us: 10000,
    ca: 8000,
    gb: 9000,
    au: 8500,
    in: 0,
    default: 0
};

type Severity = 'error' | 'warning' | 'info' | 'success';

const LeadForm = ({ UsersOptions, lead }: { UsersOptions: any[]; lead: any }) => {
    const [leadStatus, setLeadStatus] = useState(lead?.leadstatus || '');
    const [leadSource, setLeadSource] = useState(lead?.leadsource || '');
    const [integrationType, setIntegrationType] = useState(lead?.integrationType?.type || '');
    const [phoneNumber, setPhoneNumber] = useState(lead?.manualData?.mobileNo || '');
    const [countryCode, setCountryCode] = useState('in');
    const [meetingType, setMeetingType] = useState(lead?.integrationDetails?.meetingType || 'office');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState<Severity>('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { valuesdataleads } = useContext(userContext);
    const subdomain = Cookies.get('subdomain');
    const router = useRouter();

    useEffect(() => {
        if (lead) {
            setLeadStatus(lead.leadstatus || '');
            setLeadSource(lead?.leadsource || '');
            setIntegrationType(lead?.interactionType?.type || '');
            setPhoneNumber(lead.manualData?.mobileNo || '');
            setMeetingType(lead.integrationDetails?.meetingType || 'office');

            const valuesInInteractionType =
                lead?.interactionType?.type === 'email'
                    ? { subject: lead?.interactionType?.subject, priority: lead?.interactionType?.priority }
                    : lead?.interactionType?.type === 'phone'
                    ? { notes: lead?.integrationType?.notes }
                    : lead?.interactionType?.type === 'meeting'
                    ? { date: lead?.interactionType?.date, platform: lead?.interactionType?.meetingType }
                    : lead?.interactionType?.type === 'others'
                    ? { details: lead?.interactionType?.details }
                    : {};

            const assignToArray = lead.assignTo ? (Array.isArray(lead.assignTo) ? lead.assignTo.map((u: any) => u._id) : [lead.assignTo._id]) : [];

            formik.setValues({
                manualData: {
                    name: lead.formData ? lead?.formData?.name : lead?.manualData?.name || '',
                    email: lead.formData ? lead?.formData?.email : lead?.manualData?.email || '',
                    mobileNo: lead.formData ? lead?.formData?.mobile : lead?.manualData?.mobileNo || '',
                    company: lead?.manualData?.company || '',
                    jobTitle: lead?.manualData?.jobTitle || '',
                    website: lead?.manualData?.website || ''
                },
                description: lead?.note?.slice(-1)[0] || '',
                assignTo: assignToArray, // <-- array
                integrationType: lead.integrationType || '',
                integrationDetails: valuesInInteractionType || {},
                potentialValue: lead?.potentialValue || COUNTRY_POTENTIAL_VALUES[countryCode] || COUNTRY_POTENTIAL_VALUES.default
            });
        } else {
            formik.setFieldValue('potentialValue', COUNTRY_POTENTIAL_VALUES[countryCode] || COUNTRY_POTENTIAL_VALUES.default);
        }
    }, [lead, countryCode]);

    const handlePhoneChange = (value: string, country: any) => {
        setPhoneNumber(value);
        setCountryCode(country.countryCode.toLowerCase());
        formik.setFieldValue('manualData.mobileNo', value);

        const newPotentialValue = COUNTRY_POTENTIAL_VALUES[country.countryCode.toLowerCase()] || COUNTRY_POTENTIAL_VALUES.default;
        formik.setFieldValue('potentialValue', newPotentialValue);
    };

    const handleSnackbarClose = () => setSnackbarOpen(false);

    const formik = useFormik({
        initialValues: {
            manualData: {
                name: lead?.Name || '',
                email: lead?.Email || '',
                mobileNo: lead?.Phone || '',
                company: lead?.Company || '',
                jobTitle: lead?.manualData?.jobTitle || '',
                website: lead?.manualData?.website || ''
            },
            description: lead?.note || '',
            assignTo: lead?.assignTo ? (Array.isArray(lead.assignTo) ? lead.assignTo.map((u: any) => u._id) : [lead.assignTo._id]) : [], // <-- empty array for create mode
            integrationType: lead?.integrationType || '',
            integrationDetails: lead?.integrationType || {
                meetingType: 'offline',
                location: ''
            },
            potentialValue: lead?.potentialValue || COUNTRY_POTENTIAL_VALUES[countryCode] || COUNTRY_POTENTIAL_VALUES.default
        },
        validationSchema: Yup.object({
            manualData: Yup.object().shape({
                name: Yup.string().required('Full name is required'),
                mobileNo: Yup.string().required('Phone number is required')
            }),
            assignTo: Yup.array().of(Yup.string()).min(1, 'Select at least one assignee')
        }),
        onSubmit: async (values) => {
            setIsSubmitting(true);
            setSubmitError('');

            const valuesInInteractionType =
                integrationType === 'email'
                    ? { subject: values.integrationDetails.subject, priority: values.integrationDetails.priority }
                    : integrationType === 'phone'
                    ? { notes: values.integrationDetails.notes }
                    : integrationType === 'meeting'
                    ? { date: values.integrationDetails.date, platform: values.integrationDetails.meetingType }
                    : integrationType === 'others'
                    ? { details: values.integrationDetails.details }
                    : {};

            const interactionType = {
                type: integrationType,
                ...valuesInInteractionType
            };

            try {
                const formData = {
                    ...(leadSource && { leadsource: leadSource }),
                    ...(leadStatus && { leadstatus: leadStatus }),

                    ...(values.manualData && Object.keys(values.manualData).length > 0
                        ? {
                              manualData: {
                                  ...values.manualData,
                                  ...(phoneNumber && { mobileNo: phoneNumber })
                              }
                          }
                        : phoneNumber
                        ? { manualData: { mobileNo: phoneNumber } }
                        : {}),

                    ...(values.assignTo.length > 0 && { assignTo: values.assignTo }),
                    ...(valuesdataleads &&
                        Object.keys(valuesdataleads).length > 0 && {
                            customFields: valuesdataleads
                        }),
                    ...(values.description && { notes: values.description }),
                    ...(interactionType?.type && { interactionType }),
                    ...(values.potentialValue && { potentialValue: values.potentialValue })
                };

                let response;
                if (!lead) {
                    response = await LeadPost(subdomain, formData);
                } else {
                    response = await UpdateLeadsByID(subdomain, lead.LeadId, formData);
                }

                if (response.success) {
                    setSnackbarMessage(response.data.message);
                    setSnackbarSeverity('success');
                    setSnackbarOpen(true);
                    router.push(`/${subdomain}/leads`);
                } else {
                    setSnackbarMessage(response.data.errors);
                    setSnackbarSeverity('error');
                    setSnackbarOpen(true);
                }
            } catch (error) {
                console.error('Submission error:', error);
                setSubmitError('Failed to submit lead. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    return (
        <Box>
            <MyButton variant="text" startIcon={<ArrowBackIosIcon />} onClick={() => history.back()}>
                Back to Leads
            </MyButton>

            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: '400', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PersonIcon /> Contact Information
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Full Name *"
                                    name="manualData.name"
                                    value={formik.values.manualData.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.manualData?.name && formik.errors.manualData?.name)}
                                    helperText={formik.touched.manualData?.name && (formik.errors.manualData as any)?.name}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon fontSize="small" />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Email"
                                    name="manualData.email"
                                    value={formik.values.manualData.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.manualData?.email && formik.errors.manualData?.email)}
                                    helperText={formik.touched.manualData?.email && (formik.errors.manualData as any)?.email}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon fontSize="small" />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <Box>
                                    <PhoneInput
                                        country={'in'}
                                        value={phoneNumber}
                                        onChange={handlePhoneChange}
                                        inputStyle={{ width: '100%' }}
                                        inputProps={{
                                            name: 'manualData.mobileNo',
                                            onBlur: formik.handleBlur
                                        }}
                                    />
                                    {formik.touched.manualData?.mobileNo && formik.errors.manualData?.mobileNo && (
                                        <Typography variant="caption" color="error" display="block" sx={{ mt: 0.5, ml: 1.5 }}>
                                            {(formik.errors.manualData as any)?.mobileNo}
                                        </Typography>
                                    )}
                                </Box>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Job Title"
                                    name="manualData.jobTitle"
                                    value={formik.values.manualData.jobTitle}
                                    onChange={formik.handleChange}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <JobTitleIcon fontSize="small" />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>

                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Website"
                                    name="manualData.website"
                                    value={formik.values.manualData.website}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.manualData?.website && formik.errors.manualData?.website)}
                                    helperText={formik.touched.manualData?.website && (formik.errors.manualData as any)?.website}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <WebsiteIcon fontSize="small" />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label="Company Name"
                                    name="manualData.company"
                                    value={formik.values.manualData.company}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.manualData?.company && formik.errors.manualData?.company)}
                                    helperText={formik.touched.manualData?.company && (formik.errors.manualData as any)?.company}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <BusinessIcon fontSize="small" />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 1 }} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: '400' }}>
                            Lead Details
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <LeadStatus leadStatus={leadStatus} onSelect={setLeadStatus} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <LeadSource onSelect={setLeadSource} leadSource={leadSource} />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label={`Potential Value ${countryCode.toUpperCase()}`}
                                    name="potentialValue"
                                    type="number"
                                    value={formik.values.potentialValue}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.potentialValue && formik.errors.potentialValue)}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">{countryCode.toUpperCase()}</InputAdornment>,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Typography variant="caption" color="textSecondary">
                                                    {countryCode.toUpperCase()}
                                                </Typography>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 6 }}>
                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    label="Assign To"
                                    name="assignTo"
                                    value={formik.values.assignTo}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.assignTo && formik.errors.assignTo)}
                                    SelectProps={
                                        {
                                            multiple: true,
                                            renderValue: (selected) => (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {(selected as string[]).map((id) => {
                                                        const option = UsersOptions.find((o) => (o.value || o.id) === id);
                                                        return <Chip key={id} label={option?.label || option?.name || id} size="small" color="primary" variant="outlined" />;
                                                    })}
                                                </Box>
                                            )
                                        } as SelectProps
                                    }
                                >
                                    {UsersOptions?.map((option) => (
                                        <MenuItem key={option.value || option.id} value={option.value || option.id}>
                                            {option.label || option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Notepad
                                    formData={formik.values.description}
                                    name="description"
                                    handleInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const { name, value } = e.target;
                                        formik.setFieldValue(name, value);
                                    }}
                                    setDropdownActive={false}
                                />
                            </Grid>
                        </Grid>

                        {submitError && (
                            <Typography color="error" sx={{ mt: 2 }}>
                                {submitError}
                            </Typography>
                        )}

                        <Box sx={{ mt: 18, display: 'flex', justifyContent: 'flex-end' }}>
                            <MyButton variant="contained" color="primary" size="large" type="submit" disabled={!formik.isValid || isSubmitting}>
                                {isSubmitting ? 'Submitting...' : lead ? 'Update Lead' : 'Create Lead'}
                            </MyButton>
                        </Box>
                    </Grid>
                </Grid>
            </form>

            <MySnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} position={{ vertical: 'top', horizontal: 'right' }} onClose={handleSnackbarClose} />
        </Box>
    );
};

export default LeadForm;
