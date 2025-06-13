'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Button,
    Grid,
    TextField,
    MenuItem,
    Typography,
    Paper,
    FormControl,
    InputLabel,
    Select,
    FormHelperText,
    IconButton,
    Tooltip,
    ButtonGroup,
    InputAdornment,
    Divider,
    RadioGroup,
    FormControlLabel,
    Radio,
    Snackbar,
    Alert
} from '@mui/material';
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
import WifiOffIcon from '@mui/icons-material/WifiOff';
import LeadStatus from '../leadstatus';
import LeadSource from '../leadsource';
import Cookies from 'js-cookie';
import userContext from '../../../../UseContext/UseContext';
import { MyButton } from '../../../../ui-components/Buttons/Buttons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { LeadPost, UpdateLeadsByID } from '../../../../../../api/Leads';
import { MySnackbar } from '../../../../ui-components/Snackbar/Snackbar';
import { useRouter } from 'next/navigation';

// Country-based potential values (example values)
const COUNTRY_POTENTIAL_VALUES: Record<string, number> = {
    us: 10000, // United States
    ca: 8000, // Canada
    gb: 9000, // United Kingdom
    au: 8500, // Australia
    in: 0, // India
    // Add more countries as needed
    default: 0 // Default value
};
type Severity = 'error' | 'warning' | 'info' | 'success';

// const INTEGRATION_TYPES = [
//     { value: 'email', label: 'Email', icon: <EmailIcon /> },
//     { value: 'phone', label: 'Phone Call', icon: <PhoneIcon /> },
//     { value: 'meeting', label: 'Meeting', icon: <MeetingIcon /> },
//     { value: 'other', label: 'Other', icon: <MoreHorizOutlinedIcon /> }
// ];

// const MEETING_TYPES = [
//     { value: 'offline', label: 'Offline', icon: <WifiOffIcon /> },
//     { value: 'online', label: 'Online', icon: <OnlineIcon /> }
//     // { value: 'other', label: 'Other', icon: <MeetingIcon /> }
// ];

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
    console.log(lead, 'lead');
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
                assignTo: lead.assignTo?._id || '',
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

    // const handleMeetingTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const value = event.target.value;
    //     setMeetingType(value);
    //     formik.setFieldValue('integrationDetails.meetingType', value);
    // };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

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
            assignTo: lead?.assignTo?._id || '',
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
                // email: Yup.string().email('Invalid email').required('Email is required'),
                mobileNo: Yup.string().required('Phone number is required')
            })
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
                    leadsource: leadSource,
                    leadstatus: leadStatus,
                    manualData: {
                        ...values.manualData,
                        mobileNo: phoneNumber
                    },
                    assignTo: values.assignTo,
                    customFields: valuesdataleads,
                    notes: values.description,
                    ...(interactionType.type && { interactionType: interactionType }),
                    potentialValue: values.potentialValue
                };

                if (!lead) {
                    const response = await LeadPost(subdomain, formData);
                    if (response.success) {
                        setSnackbarMessage(response.data.message);
                        setSnackbarOpen(true);
                        setSnackbarSeverity('success');
                        router.push(`/${subdomain}/leads`);
                        // window.location.href = `/${subdomain}/leads`;
                    } else {
                        setSnackbarMessage(response.data.errors);
                        setSnackbarOpen(true);
                        setSnackbarSeverity('error');
                    }
                } else {
                    const response = await UpdateLeadsByID(subdomain, lead.LeadId, formData);
                    if (response.success) {
                        setSnackbarMessage(response.data.message);
                        setSnackbarOpen(true);
                        setSnackbarSeverity('success');
                        // window.location.href = `/${subdomain}/leads`;
                        router.push(`/${subdomain}/leads`);
                    } else {
                        setSnackbarMessage(response.data.errors);
                        setSnackbarOpen(true);
                        setSnackbarSeverity('error');
                    }
                }
            } catch (error) {
                console.error('Submission error:', error);
                setSubmitError('Failed to submit lead. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
        }
    });

    // const renderIntegrationFields = () => {
    //     switch (integrationType) {
    //         case 'email':
    //             return (
    //                 <Grid container spacing={2}>
    //                     <Grid size={{ xs: 12, sm: 6 }}>
    //                         <TextField fullWidth size="small" label="Email Subject" name="integrationDetails.subject" value={formik.values.integrationDetails?.subject || ''} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    //                     </Grid>
    //                     <Grid size={{ xs: 12, sm: 6 }}>
    //                         <TextField fullWidth size="small" label="Priority" name="integrationDetails.priority" value={formik.values.integrationDetails?.priority || ''} onChange={formik.handleChange} select>
    //                             <MenuItem value="low">Low</MenuItem>
    //                             <MenuItem value="medium">Medium</MenuItem>
    //                             <MenuItem value="high">High</MenuItem>
    //                         </TextField>
    //                     </Grid>
    //                 </Grid>
    //             );
    //         case 'phone':
    //             return (
    //                 <Grid container spacing={2}>
    //                     <Grid size={{ xs: 12, sm: 6 }}>
    //                         <TextField fullWidth size="small" multiline rows={3} label="Call Notes" name="integrationDetails.notes" value={formik.values.integrationDetails?.notes || ''} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    //                     </Grid>
    //                 </Grid>
    //             );
    //         case 'meeting':
    //             return (
    //                 <Grid container spacing={2}>
    //                     <Grid size={{ xs: 12, sm: 8 }}>
    //                         <TextField
    //                             fullWidth
    //                             size="small"
    //                             label="Meeting Date "
    //                             type="datetime-local"
    //                             name="integrationDetails.date"
    //                             value={formik.values.integrationDetails?.date || ''}
    //                             onChange={formik.handleChange}
    //                             onBlur={formik.handleBlur}
    //                             InputLabelProps={{ shrink: true }}
    //                         />
    //                     </Grid>
    //                     <Grid size={{ xs: 12, sm: 4 }}>
    //                         <FormControl component="fieldset" sx={{ mt: 1 }}>
    //                             <Typography variant="subtitle2" sx={{ mb: 1 }}>
    //                                 Meeting Type
    //                             </Typography>
    //                             <RadioGroup row name="integrationDetails.meetingType" value={meetingType} onChange={handleMeetingTypeChange}>
    //                                 {MEETING_TYPES.map((type) => (
    //                                     <FormControlLabel
    //                                         key={type.value}
    //                                         value={type.value}
    //                                         control={<Radio />}
    //                                         label={
    //                                             <Box display="flex" alignItems="center">
    //                                                 {type.icon}
    //                                                 <Box ml={1}>{type.label}</Box>
    //                                             </Box>
    //                                         }
    //                                     />
    //                                 ))}
    //                             </RadioGroup>
    //                         </FormControl>
    //                     </Grid>
    //                     {(meetingType === 'office' || meetingType === 'other') && (
    //                         <Grid size={{ xs: 12, sm: 12 }}>
    //                             <TextField
    //                                 fullWidth
    //                                 size="small"
    //                                 label={meetingType === 'office' ? 'Office Location ' : 'Location Details '}
    //                                 name="integrationDetails.location"
    //                                 value={formik.values.integrationDetails?.location || ''}
    //                                 onChange={formik.handleChange}
    //                                 onBlur={formik.handleBlur}
    //                             />
    //                         </Grid>
    //                     )}
    //                 </Grid>
    //             );
    //         case 'other':
    //             return (
    //                 <Grid container spacing={2}>
    //                     <Grid size={{ xs: 12, sm: 12 }}>
    //                         <TextField fullWidth size="small" multiline rows={3} label="Details " name="integrationDetails.details" value={formik.values.integrationDetails?.details || ''} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    //                     </Grid>
    //                 </Grid>
    //             );
    //         default:
    //             return null;
    //     }
    // };

    return (
        <Box>
            <MyButton variant="text" startIcon={<ArrowBackIosIcon />} onClick={() => history.back()}>
                Back to Leads
            </MyButton>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    {/* Left Column - Contact Information */}
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
                                    label="Company Name "
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

                    {/* Right Column - Interaction & Assignment */}
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
                                    label="Assign To "
                                    name="assignTo"
                                    value={formik.values.assignTo}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.assignTo && formik.errors.assignTo)}
                                >
                                    {UsersOptions?.map((option) => (
                                        <MenuItem key={option.value || option.id} value={option.value || option.id}>
                                            {option.label || option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>

                            <Grid size={{ xs: 12, sm: 12 }}>
                                <TextField fullWidth size="small" multiline rows={3} label="Notes" name="description" value={formik.values.description} onChange={formik.handleChange} />
                            </Grid>
                        </Grid>
                        {/* <Typography variant="h6" gutterBottom sx={{ fontWeight: '400', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <MeetingIcon /> Interaction Details
                        </Typography> */}

                        {/* <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    Interaction Type
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <ButtonGroup>
                                    {INTEGRATION_TYPES.map((type) => (
                                        <Tooltip key={type.value} title={type.label}>
                                            <Button
                                                size="small"
                                                variant={integrationType === type.value ? 'contained' : 'outlined'}
                                                startIcon={type.icon}
                                                onClick={() => {
                                                    setIntegrationType(type.value);
                                                    formik.setFieldValue('integrationType', type.value);
                                                }}
                                                sx={{ p: 1, textAlign: 'center', pl: 2 }}
                                            />
                                            {type?.label || integrationType}
                                            </Button>
                                        </Tooltip>
                                    ))}
                                </ButtonGroup>
                                {formik.touched.integrationType && formik.errors.integrationType && <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}></Typography>}
                            </Grid>

                            {integrationType && <Grid size={{ xs: 12, sm: 6 }}>{renderIntegrationFields()}</Grid>}

                            <Grid size={{ xs: 12, sm: 12 }}>
                                <TextField
                                    select
                                    fullWidth
                                    size="small"
                                    label="Assign To "
                                    name="assignTo"
                                    value={formik.values.assignTo}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={!!(formik.touched.assignTo && formik.errors.assignTo)}
                                >
                                    {UsersOptions?.map((option) => (
                                        <MenuItem key={option.value || option.id} value={option.value || option.id}>
                                            {option.label || option.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid> */}

                        {submitError && (
                            <Typography color="error" sx={{ mt: 2 }}>
                                {submitError}
                            </Typography>
                        )}

                        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                            <MyButton variant="contained" color="primary" size="large" type="submit" disabled={!formik.isValid || isSubmitting}>
                                {isSubmitting ? 'Submitting...' : lead ? 'Update Lead' : 'Create Lead'}
                            </MyButton>
                        </Box>
                    </Grid>
                    {/* <Grid size={{ xs: 12, sm: 6 }}>
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

                            <Grid size={{ xs: 12, sm: 12 }}>
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

                            <Grid size={{ xs: 12, sm: 12 }}>
                                <TextField fullWidth size="small" multiline rows={3} label="Notes" name="description" value={formik.values.description} onChange={formik.handleChange} />
                            </Grid>
                        </Grid>
                    </Grid> */}
                </Grid>
            </form>
            {/* <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar> */}
            <MySnackbar open={snackbarOpen} message={snackbarMessage} severity={snackbarSeverity} position={{ vertical: 'top', horizontal: 'right' }} onClose={handleSnackbarClose} />
        </Box>
    );
};

export default LeadForm;
