<!-- 'use client';
import { useFormik } from 'formik';
import \* as Yup from 'yup';
import { useContext, useEffect, useState } from 'react';
import { Box, Button, Grid, TextField, MenuItem, Typography, Tabs, Tab, Paper } from '@mui/material';
import LeadStatus from '../leadstatus';
import LeadSource from '../leadsource';
import Cookies from 'js-cookie';
// import CustomizedleadPage from '../customizedPage';
import userContext from '../../../../UseContext/UseContext';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { Editor } from 'primereact/editor';
import { MyButton } from '../../../../Component/Buttons/Buttons';

const LeadForm = ({ onSubmit, UsersOptions, customers, lead }: { onSubmit: (data: any) => void; UsersOptions: any[]; customers: any; lead: any }) => {
const [leadStatus, setLeadStatus] = useState(lead?.leadstatus?.\_id || '');
const [leadSource, setLeadSource] = useState(lead?.leadsource || '');
const [leadsData, setLeadsData] = useState(null);
const { valuesdataleads } = useContext(userContext);
const subdomain = Cookies.get('subdomain');
console.log(lead, 'editingLead>>>>>>>>>>>???????????');
// console.log(leadStatus, 'editingLead<<<<<<<<<<<<');
// console.log(leadSource, 'leadStatus>>>>>>>>>>>>>>');
// console.log(leadsData, 'leadsData>>>>>>./>>>>>>>>');

    useEffect(() => {
        if (lead) {
            setLeadsData({
                ...lead,
                followUp: lead.followUps || []
            });
            setLeadStatus(lead || '');
            setLeadSource(lead?.leadsource || '');

            // Set Formik values directly for editing
            formik.setValues({
                manualData: {
                    name: lead.Name || '',
                    email: lead?.Email || '',
                    mobileNo: lead?.Phone || '',
                    company: lead?.Company || '',
                    address: {
                        street: lead?.Address?.street || '',
                        city: lead?.Address?.city || '',
                        state: lead?.Address?.state || '',
                        zipCode: lead?.Address?.zipCode || '',
                        country: lead?.Address?.country || ''
                    }
                },
                description: lead.description || '',
                assignTo: lead.assignTo || '',
                followUp: lead.followUps || []
            });
        }
    }, [lead]);
    const formik = useFormik({
        initialValues: {
            manualData: {
                name: leadsData?.manualData?.name || '',
                email: leadsData?.manualData?.email || '',
                mobileNo: leadsData?.manualData?.mobileNo || '',
                company: leadsData?.manualData?.company || '',
                address: {
                    street: leadsData?.manualData?.address?.street || '',
                    city: leadsData?.manualData?.address?.city || '',
                    state: leadsData?.manualData?.address?.state || '',
                    zipCode: leadsData?.manualData?.address?.zipCode || '',
                    country: leadsData?.manualData?.address?.country || ''
                }
            },
            description: leadsData?.description || '',
            assignTo: leadsData?.assignTo?._id || '',
            followUp: []
        },
        validationSchema: Yup.object({
            manualData: Yup.object().shape({
                name: Yup.string().required('Required'),
                email: Yup.string().email('Invalid email format').required('Required'),
                company: Yup.string().required('Required'),
                mobileNo: Yup.string()
                    .matches(/^\+\d{2}-\d{10}$/, 'Mobile number must be in format +xx-xxxxxxxxxx')
                    .required('Required'),
                address: Yup.object().shape({
                    street: Yup.string().required('Required'),
                    city: Yup.string().required('Required'),
                    state: Yup.string().required('Required'),
                    zipCode: Yup.string().required('Required'),
                    country: Yup.string().required('Required')
                })
            }),
            assignTo: Yup.string().required('Required')
            // followUp: Yup.array().of(
            //   Yup.object().shape({
            //     followUpDate: Yup.date().required("Required"),
            //     notes: Yup.string().required("Required"),
            //   })
            // ),
        }),
        onSubmit: (values) => {
            const formData = {
                leadsource: leadSource,
                leadstatus: leadStatus,
                manualData: values.manualData,
                assignTo: values.assignTo,
                customFields: valuesdataleads,
                description: values.description,
                followUp: values.followUp
            };
            onSubmit(formData);
        }
    });

    console.log(formik.initialValues, 'formik');

    const renderError = (field: string) => {
        const error = formik.errors as any;
        const touched = formik.touched as any;
        return touched?.[field] && error?.[field] ? (
            <Typography variant="caption" color="error">
                {error[field]}
            </Typography>
        ) : null;
    };

    return (
        <>
            <Paper elevation={0} sx={{ boxShadow: 'none' }}>
                {/* <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
                <Tab label="Lead" /> */}
                {/* <Tab label="Custom Fields" /> */}
                {/* </Tabs> */}
                {/* {tab === 0 && ( */}
                <MyButton children="Back" onClick={() => (window.location.href = `/${subdomain}/leads`)} color="inherit" variant="contained" disabled={false} />

                {/* </Mybutton> */}
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Name"
                                        size="small"
                                        name="manualData.name"
                                        value={formik.values.manualData.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={!!(formik.touched.manualData?.name && formik.errors.manualData?.name)}
                                        helperText={formik.touched.manualData?.name && (formik.errors.manualData as any)?.name}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        size="small"
                                        name="manualData.email"
                                        value={formik.values.manualData.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={!!(formik.touched.manualData?.email && formik.errors.manualData?.email)}
                                        helperText={formik.touched.manualData?.email && (formik.errors.manualData as any)?.email}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Mobile Number"
                                        name="manualData.mobileNo"
                                        value={formik.values.manualData.mobileNo}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={!!(formik.touched.manualData?.mobileNo && formik.errors.manualData?.mobileNo)}
                                        helperText={formik.touched.manualData?.mobileNo && (formik.errors.manualData as any)?.mobileNo}
                                        margin="normal"
                                        placeholder="+91-1234567890"
                                    />
                                </Grid>
                                {/* <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Street"
                                name="manualData.address.street"
                                value={formik.values.manualData.address.street}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.manualData?.address?.street && formik.errors.manualData?.address?.street)}
                                helperText={formik.touched.manualData?.address?.street && (formik.errors.manualData?.address as any)?.street}
                                margin="normal"
                            />
                        </Grid> */}
                                {/* <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="City"
                                name="manualData.address.city"
                                value={formik.values.manualData.address.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.manualData?.address?.city && formik.errors.manualData?.address?.city)}
                                helperText={formik.touched.manualData?.address?.city && (formik.errors.manualData?.address as any)?.city}
                                margin="normal"
                            />
                        </Grid> */}
                                {/* <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="State"
                                name="manualData.address.state"
                                value={formik.values.manualData.address.state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.manualData?.address?.state && formik.errors.manualData?.address?.state)}
                                helperText={formik.touched.manualData?.address?.state && (formik.errors.manualData?.address as any)?.state}
                                margin="normal"
                            />
                        </Grid> */}
                                {/* <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Zip Code"
                                name="manualData.address.zipCode"
                                value={formik.values.manualData.address.zipCode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.manualData?.address?.zipCode && formik.errors.manualData?.address?.zipCode)}
                                helperText={formik.touched.manualData?.address?.zipCode && (formik.errors.manualData?.address as any)?.zipCode}
                                margin="normal"
                            />
                        </Grid> */}
                                {/* <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Country"
                                name="manualData.address.country"
                                value={formik.values.manualData.address.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.manualData?.address?.country && formik.errors.manualData?.address?.country)}
                                helperText={formik.touched.manualData?.address?.country && (formik.errors.manualData?.address as any)?.country}
                                margin="normal"
                            />
                        </Grid> */}
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        label="Company"
                                        name="manualData.company"
                                        value={formik.values.manualData.company}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={!!(formik.touched.manualData?.company && formik.errors.manualData?.company)}
                                        helperText={formik.touched.manualData?.company && (formik.errors.manualData as any)?.company}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography>
                                        <LeadStatus leadStatus={leadStatus} onSelect={setLeadStatus} />
                                    </Typography>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <LeadSource onSelect={setLeadSource} leadSource={leadSource} />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        select
                                        fullWidth
                                        size="small"
                                        label="Assign To"
                                        // sx={{ mt: 2 }}
                                        name="assignTo"
                                        value={formik.values.assignTo}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={!!(formik.touched.assignTo && formik.errors.assignTo)}
                                        helperText={formik.touched.assignTo && typeof formik.errors.assignTo === 'string' ? formik.errors.assignTo : ''}
                                        margin="normal"
                                    >
                                        {UsersOptions?.map((option) => (
                                            <MenuItem key={option.value || option.id} value={option.value || option.id}>
                                                {option.label || option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                {/* <Grid size={{ xs: 12, sm: 12 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                Description
                            </Typography>
                            <Editor id="description" name="description" value={formik.values.description} onTextChange={(e) => formik.setFieldValue('description', e.htmlValue)} style={{ height: 120 }} />
                        </Grid> */}
                                {/* You can add followUp fields here if needed */}
                                <Grid size={{ xs: 12, sm: 12 }}>
                                    <Box mt={2}>
                                        <Button type="submit" variant="contained" color="primary">
                                            Submit
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}></Grid>
                    </Grid>
                </form>
                {/* )} */}
                {/* {tab === 1 && <CustomizedleadPage />} */}
            </Paper>
        </>
    );

};

export default LeadForm; -->
