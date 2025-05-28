// // // // // 'use client';
// // // // // import { useFormik } from 'formik';
// // // // // import * as Yup from 'yup';
// // // // // import { useContext, useEffect, useState } from 'react';
// // // // // import { Box, Button, Grid, TextField, MenuItem, Typography, Tabs, Tab, Paper } from '@mui/material';
// // // // // import LeadStatus from '../leadstatus';
// // // // // import LeadSource from '../leadsource';
// // // // // import Cookies from 'js-cookie';
// // // // // // import CustomizedleadPage from '../customizedPage';
// // // // // import userContext from '../../../../UseContext/UseContext';
// // // // // // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // // // // // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // // // // // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // // // // // import { Editor } from 'primereact/editor';
// // // // // import { MyButton } from '../../../../Component/Buttons/Buttons';

// // // // // const LeadForm = ({ onSubmit, UsersOptions, customers, lead }: { onSubmit: (data: any) => void; UsersOptions: any[]; customers: any; lead: any }) => {
// // // // //     const [leadStatus, setLeadStatus] = useState(lead?.leadstatus?._id || '');
// // // // //     const [leadSource, setLeadSource] = useState(lead?.leadsource || '');
// // // // //     const [leadsData, setLeadsData] = useState(null);
// // // // //     const { valuesdataleads } = useContext(userContext);
// // // // //     const subdomain = Cookies.get('subdomain');
// // // // //     console.log(lead, 'editingLead>>>>>>>>>>>???????????');
// // // // //     // console.log(leadStatus, 'editingLead<<<<<<<<<<<<');
// // // // //     // console.log(leadSource, 'leadStatus>>>>>>>>>>>>>>');
// // // // //     // console.log(leadsData, 'leadsData>>>>>>./>>>>>>>>');

// // // // //     useEffect(() => {
// // // // //         if (lead) {
// // // // //             setLeadsData({
// // // // //                 ...lead,
// // // // //                 followUp: lead.followUps || []
// // // // //             });
// // // // //             setLeadStatus(lead || '');
// // // // //             setLeadSource(lead?.leadsource || '');

// // // // //             // Set Formik values directly for editing
// // // // //             formik.setValues({
// // // // //                 manualData: {
// // // // //                     name: lead.Name || '',
// // // // //                     email: lead?.Email || '',
// // // // //                     mobileNo: lead?.Phone || '',
// // // // //                     company: lead?.Company || '',
// // // // //                     address: {
// // // // //                         street: lead?.Address?.street || '',
// // // // //                         city: lead?.Address?.city || '',
// // // // //                         state: lead?.Address?.state || '',
// // // // //                         zipCode: lead?.Address?.zipCode || '',
// // // // //                         country: lead?.Address?.country || ''
// // // // //                     }
// // // // //                 },
// // // // //                 description: lead.description || '',
// // // // //                 assignTo: lead.assignTo || '',
// // // // //                 followUp: lead.followUps || []
// // // // //             });
// // // // //         }
// // // // //     }, [lead]);
// // // // //     const formik = useFormik({
// // // // //         initialValues: {
// // // // //             manualData: {
// // // // //                 name: leadsData?.manualData?.name || '',
// // // // //                 email: leadsData?.manualData?.email || '',
// // // // //                 mobileNo: leadsData?.manualData?.mobileNo || '',
// // // // //                 company: leadsData?.manualData?.company || '',
// // // // //                 address: {
// // // // //                     street: leadsData?.manualData?.address?.street || '',
// // // // //                     city: leadsData?.manualData?.address?.city || '',
// // // // //                     state: leadsData?.manualData?.address?.state || '',
// // // // //                     zipCode: leadsData?.manualData?.address?.zipCode || '',
// // // // //                     country: leadsData?.manualData?.address?.country || ''
// // // // //                 }
// // // // //             },
// // // // //             description: leadsData?.description || '',
// // // // //             assignTo: leadsData?.assignTo?._id || '',
// // // // //             followUp: []
// // // // //         },
// // // // //         validationSchema: Yup.object({
// // // // //             manualData: Yup.object().shape({
// // // // //                 name: Yup.string().required('Required'),
// // // // //                 email: Yup.string().email('Invalid email format').required('Required'),
// // // // //                 company: Yup.string().required('Required'),
// // // // //                 mobileNo: Yup.string()
// // // // //                     .matches(/^\+\d{2}-\d{10}$/, 'Mobile number must be in format +xx-xxxxxxxxxx')
// // // // //                     .required('Required'),
// // // // //                 address: Yup.object().shape({
// // // // //                     street: Yup.string().required('Required'),
// // // // //                     city: Yup.string().required('Required'),
// // // // //                     state: Yup.string().required('Required'),
// // // // //                     zipCode: Yup.string().required('Required'),
// // // // //                     country: Yup.string().required('Required')
// // // // //                 })
// // // // //             }),
// // // // //             assignTo: Yup.string().required('Required')
// // // // //             // followUp: Yup.array().of(
// // // // //             //   Yup.object().shape({
// // // // //             //     followUpDate: Yup.date().required("Required"),
// // // // //             //     notes: Yup.string().required("Required"),
// // // // //             //   })
// // // // //             // ),
// // // // //         }),
// // // // //         onSubmit: (values) => {
// // // // //             const formData = {
// // // // //                 leadsource: leadSource,
// // // // //                 leadstatus: leadStatus,
// // // // //                 manualData: values.manualData,
// // // // //                 assignTo: values.assignTo,
// // // // //                 customFields: valuesdataleads,
// // // // //                 description: values.description,
// // // // //                 followUp: values.followUp
// // // // //             };
// // // // //             onSubmit(formData);
// // // // //         }
// // // // //     });

// // // // //     console.log(formik.initialValues, 'formik');

// // // // //     const renderError = (field: string) => {
// // // // //         const error = formik.errors as any;
// // // // //         const touched = formik.touched as any;
// // // // //         return touched?.[field] && error?.[field] ? (
// // // // //             <Typography variant="caption" color="error">
// // // // //                 {error[field]}
// // // // //             </Typography>
// // // // //         ) : null;
// // // // //     };

// // // // //     return (
// // // // //         <>
// // // // //             <Paper elevation={0} sx={{ boxShadow: 'none' }}>
// // // // //                 {/* <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
// // // // //                 <Tab label="Lead" /> */}
// // // // //                 {/* <Tab label="Custom Fields" /> */}
// // // // //                 {/* </Tabs> */}
// // // // //                 {/* {tab === 0 && ( */}
// // // // //                 <MyButton children="Back" onClick={() => (window.location.href = `/${subdomain}/leads`)} color="inherit" variant="contained" disabled={false} />

// // // // //                 {/* </Mybutton> */}
// // // // //                 <form onSubmit={formik.handleSubmit} autoComplete="off">
// // // // //                     <Grid container spacing={2}>
// // // // //                         <Grid size={{ xs: 12, sm: 6 }}>
// // // // //                             <Grid container spacing={2}>
// // // // //                                 <Grid size={{ xs: 12, sm: 6 }}>
// // // // //                                     <TextField
// // // // //                                         fullWidth
// // // // //                                         label="Name"
// // // // //                                         size="small"
// // // // //                                         name="manualData.name"
// // // // //                                         value={formik.values.manualData.name}
// // // // //                                         onChange={formik.handleChange}
// // // // //                                         onBlur={formik.handleBlur}
// // // // //                                         error={!!(formik.touched.manualData?.name && formik.errors.manualData?.name)}
// // // // //                                         helperText={formik.touched.manualData?.name && (formik.errors.manualData as any)?.name}
// // // // //                                         margin="normal"
// // // // //                                     />
// // // // //                                 </Grid>
// // // // //                                 <Grid size={{ xs: 12, sm: 6 }}>
// // // // //                                     <TextField
// // // // //                                         fullWidth
// // // // //                                         label="Email"
// // // // //                                         size="small"
// // // // //                                         name="manualData.email"
// // // // //                                         value={formik.values.manualData.email}
// // // // //                                         onChange={formik.handleChange}
// // // // //                                         onBlur={formik.handleBlur}
// // // // //                                         error={!!(formik.touched.manualData?.email && formik.errors.manualData?.email)}
// // // // //                                         helperText={formik.touched.manualData?.email && (formik.errors.manualData as any)?.email}
// // // // //                                         margin="normal"
// // // // //                                     />
// // // // //                                 </Grid>
// // // // //                                 <Grid size={{ xs: 12, sm: 6 }}>
// // // // //                                     <TextField
// // // // //                                         fullWidth
// // // // //                                         size="small"
// // // // //                                         label="Mobile Number"
// // // // //                                         name="manualData.mobileNo"
// // // // //                                         value={formik.values.manualData.mobileNo}
// // // // //                                         onChange={formik.handleChange}
// // // // //                                         onBlur={formik.handleBlur}
// // // // //                                         error={!!(formik.touched.manualData?.mobileNo && formik.errors.manualData?.mobileNo)}
// // // // //                                         helperText={formik.touched.manualData?.mobileNo && (formik.errors.manualData as any)?.mobileNo}
// // // // //                                         margin="normal"
// // // // //                                         placeholder="+91-1234567890"
// // // // //                                     />
// // // // //                                 </Grid>
// // // // //                                 {/* <Grid size={{ xs: 12, sm: 6 }}>
// // // // //                             <TextField
// // // // //                                 fullWidth
// // // // //                                 label="Street"
// // // // //                                 name="manualData.address.street"
// // // // //                                 value={formik.values.manualData.address.street}
// // // // //                                 onChange={formik.handleChange}
// // // // //                                 onBlur={formik.handleBlur}
// // // // //                                 error={!!(formik.touched.manualData?.address?.street && formik.errors.manualData?.address?.street)}
// // // // //                                 helperText={formik.touched.manualData?.address?.street && (formik.errors.manualData?.address as any)?.street}
// // // // //                                 margin="normal"
// // // // //                             />
// // // // //                         </Grid> */}
// // // // //                                 {/* <Grid size={{ xs: 12, sm: 6 }}>
// // // // //                             <TextField
// // // // //                                 fullWidth
// // // // //                                 label="City"
// // // // //                                 name="manualData.address.city"
// // // // //                                 value={formik.values.manualData.address.city}
// // // // //                                 onChange={formik.handleChange}
// // // // //                                 onBlur={formik.handleBlur}
// // // // //                                 error={!!(formik.touched.manualData?.address?.city && formik.errors.manualData?.address?.city)}
// // // // //                                 helperText={formik.touched.manualData?.address?.city && (formik.errors.manualData?.address as any)?.city}
// // // // //                                 margin="normal"
// // // // //                             />
// // // // //                         </Grid> */}
// // // // //                                 {/* <Grid size={{ xs: 12, sm: 6 }}>
// // // // //                             <TextField
// // // // //                                 fullWidth
// // // // //                                 label="State"
// // // // //                                 name="manualData.address.state"
// // // // //                                 value={formik.values.manualData.address.state}
// // // // //                                 onChange={formik.handleChange}
// // // // //                                 onBlur={formik.handleBlur}
// // // // //                                 error={!!(formik.touched.manualData?.address?.state && formik.errors.manualData?.address?.state)}
// // // // //                                 helperText={formik.touched.manualData?.address?.state && (formik.errors.manualData?.address as any)?.state}
// // // // //                                 margin="normal"
// // // // //                             />
// // // // //                         </Grid> */}
// // // // //                                 {/* <Grid size={{ xs: 12, sm: 6 }}>
// // // // //                             <TextField
// // // // //                                 fullWidth
// // // // //                                 label="Zip Code"
// // // // //                                 name="manualData.address.zipCode"
// // // // //                                 value={formik.values.manualData.address.zipCode}
// // // // //                                 onChange={formik.handleChange}
// // // // //                                 onBlur={formik.handleBlur}
// // // // //                                 error={!!(formik.touched.manualData?.address?.zipCode && formik.errors.manualData?.address?.zipCode)}
// // // // //                                 helperText={formik.touched.manualData?.address?.zipCode && (formik.errors.manualData?.address as any)?.zipCode}
// // // // //                                 margin="normal"
// // // // //                             />
// // // // //                         </Grid> */}
// // // // //                                 {/* <Grid size={{ xs: 12, sm: 6 }}>
// // // // //                             <TextField
// // // // //                                 fullWidth
// // // // //                                 label="Country"
// // // // //                                 name="manualData.address.country"
// // // // //                                 value={formik.values.manualData.address.country}
// // // // //                                 onChange={formik.handleChange}
// // // // //                                 onBlur={formik.handleBlur}
// // // // //                                 error={!!(formik.touched.manualData?.address?.country && formik.errors.manualData?.address?.country)}
// // // // //                                 helperText={formik.touched.manualData?.address?.country && (formik.errors.manualData?.address as any)?.country}
// // // // //                                 margin="normal"
// // // // //                             />
// // // // //                         </Grid> */}
// // // // //                                 <Grid size={{ xs: 12, sm: 6 }}>
// // // // //                                     <TextField
// // // // //                                         fullWidth
// // // // //                                         size="small"
// // // // //                                         label="Company"
// // // // //                                         name="manualData.company"
// // // // //                                         value={formik.values.manualData.company}
// // // // //                                         onChange={formik.handleChange}
// // // // //                                         onBlur={formik.handleBlur}
// // // // //                                         error={!!(formik.touched.manualData?.company && formik.errors.manualData?.company)}
// // // // //                                         helperText={formik.touched.manualData?.company && (formik.errors.manualData as any)?.company}
// // // // //                                         margin="normal"
// // // // //                                     />
// // // // //                                 </Grid>
// // // // //                                 <Grid size={{ xs: 12, sm: 6 }}>
// // // // //                                     <Typography>
// // // // //                                         <LeadStatus leadStatus={leadStatus} onSelect={setLeadStatus} />
// // // // //                                     </Typography>
// // // // //                                 </Grid>
// // // // //                                 <Grid size={{ xs: 12, sm: 6 }}>
// // // // //                                     <LeadSource onSelect={setLeadSource} leadSource={leadSource} />
// // // // //                                 </Grid>
// // // // //                                 <Grid size={{ xs: 12, sm: 6 }}>
// // // // //                                     <TextField
// // // // //                                         select
// // // // //                                         fullWidth
// // // // //                                         size="small"
// // // // //                                         label="Assign To"
// // // // //                                         // sx={{ mt: 2 }}
// // // // //                                         name="assignTo"
// // // // //                                         value={formik.values.assignTo}
// // // // //                                         onChange={formik.handleChange}
// // // // //                                         onBlur={formik.handleBlur}
// // // // //                                         error={!!(formik.touched.assignTo && formik.errors.assignTo)}
// // // // //                                         helperText={formik.touched.assignTo && typeof formik.errors.assignTo === 'string' ? formik.errors.assignTo : ''}
// // // // //                                         margin="normal"
// // // // //                                     >
// // // // //                                         {UsersOptions?.map((option) => (
// // // // //                                             <MenuItem key={option.value || option.id} value={option.value || option.id}>
// // // // //                                                 {option.label || option.name}
// // // // //                                             </MenuItem>
// // // // //                                         ))}
// // // // //                                     </TextField>
// // // // //                                 </Grid>
// // // // //                                 {/* <Grid size={{ xs: 12, sm: 12 }}>
// // // // //                             <Typography variant="subtitle2" sx={{ mb: 1 }}>
// // // // //                                 Description
// // // // //                             </Typography>
// // // // //                             <Editor id="description" name="description" value={formik.values.description} onTextChange={(e) => formik.setFieldValue('description', e.htmlValue)} style={{ height: 120 }} />
// // // // //                         </Grid> */}
// // // // //                                 {/* You can add followUp fields here if needed */}
// // // // //                                 <Grid size={{ xs: 12, sm: 12 }}>
// // // // //                                     <Box mt={2}>
// // // // //                                         <Button type="submit" variant="contained" color="primary">
// // // // //                                             Submit
// // // // //                                         </Button>
// // // // //                                     </Box>
// // // // //                                 </Grid>
// // // // //                             </Grid>
// // // // //                         </Grid>
// // // // //                         <Grid size={{ xs: 12, sm: 6 }}></Grid>
// // // // //                     </Grid>
// // // // //                 </form>
// // // // //                 {/* )} */}
// // // // //                 {/* {tab === 1 && <CustomizedleadPage />} */}
// // // // //             </Paper>
// // // // //         </>
// // // // //     );
// // // // // };

// // // // // export default LeadForm;
// // // // 'use client';
// // // // import { useFormik } from 'formik';
// // // // import * as Yup from 'yup';
// // // // import { useContext, useEffect, useState } from 'react';
// // // // import { Box, Button, Grid, TextField, MenuItem, Typography, Paper, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
// // // // import LeadStatus from '../leadstatus';
// // // // import LeadSource from '../leadsource';
// // // // import Cookies from 'js-cookie';
// // // // import userContext from '../../../../UseContext/UseContext';
// // // // import { MyButton } from '../../../../Component/Buttons/Buttons';
// // // // import PhoneInput from 'react-phone-input-2';
// // // // import 'react-phone-input-2/lib/style.css';

// // // // const INTEGRATION_TYPES = [
// // // //     { value: 'email', label: 'Email' },
// // // //     { value: 'phone', label: 'Phone Call' },
// // // //     { value: 'meeting', label: 'Meeting' }
// // // // ];

// // // // const LeadForm = ({ onSubmit, UsersOptions, lead }: { onSubmit: (data: any) => void; UsersOptions: any[]; lead: any }) => {
// // // //     const [leadStatus, setLeadStatus] = useState(lead?.leadstatus?._id || '');
// // // //     const [leadSource, setLeadSource] = useState(lead?.leadsource || '');
// // // //     const [integrationType, setIntegrationType] = useState(lead?.integrationType || '');
// // // //     const [phoneNumber, setPhoneNumber] = useState(lead?.manualData?.mobileNo || '');
// // // //     const { valuesdataleads } = useContext(userContext);
// // // //     const subdomain = Cookies.get('subdomain');

// // // //     useEffect(() => {
// // // //         if (lead) {
// // // //             setLeadStatus(lead.leadstatus?._id || '');
// // // //             setLeadSource(lead.leadsource || '');
// // // //             setIntegrationType(lead.integrationType || '');
// // // //             setPhoneNumber(lead.manualData?.mobileNo || '');

// // // //             formik.setValues({
// // // //                 manualData: {
// // // //                     name: lead.Name || '',
// // // //                     email: lead?.Email || '',
// // // //                     mobileNo: lead?.Phone || '',
// // // //                     company: lead?.Company || ''
// // // //                 },
// // // //                 description: lead.description || '',
// // // //                 assignTo: lead.assignTo || '',
// // // //                 integrationType: lead.integrationType || '',
// // // //                 integrationDetails: lead.integrationDetails || {}
// // // //             });
// // // //         }
// // // //     }, [lead]);

// // // //     const handlePhoneChange = (value: string) => {
// // // //         setPhoneNumber(value);
// // // //         formik.setFieldValue('manualData.mobileNo', value);
// // // //     };

// // // //     const formik = useFormik({
// // // //         initialValues: {
// // // //             manualData: {
// // // //                 name: lead?.Name || '',
// // // //                 email: lead?.Email || '',
// // // //                 mobileNo: lead?.Phone || '',
// // // //                 company: lead?.Company || ''
// // // //             },
// // // //             description: lead?.description || '',
// // // //             assignTo: lead?.assignTo?._id || '',
// // // //             integrationType: lead?.integrationType || '',
// // // //             integrationDetails: lead?.integrationDetails || {}
// // // //         },
// // // //         validationSchema: Yup.object({
// // // //             manualData: Yup.object().shape({
// // // //                 name: Yup.string().required('Required'),
// // // //                 email: Yup.string().email('Invalid email').required('Required'),
// // // //                 company: Yup.string().required('Required'),
// // // //                 mobileNo: Yup.string().required('Required')
// // // //             }),
// // // //             assignTo: Yup.string().required('Required'),
// // // //             integrationType: Yup.string().required('Required'),
// // // //             integrationDetails: Yup.object().when('integrationType', {
// // // //                 is: (type: string) => !!type,
// // // //                 then: Yup.object().shape({
// // // //                     subject: Yup.string().when('integrationType', {
// // // //                         is: 'email',
// // // //                         then: Yup.string().required('Email subject required')
// // // //                     }),
// // // //                     date: Yup.string().when('integrationType', {
// // // //                         is: 'meeting',
// // // //                         then: Yup.string().required('Meeting date required')
// // // //                     }),
// // // //                     notes: Yup.string().when('integrationType', {
// // // //                         is: 'phone',
// // // //                         then: Yup.string().required('Call notes required')
// // // //                     })
// // // //                 })
// // // //             })
// // // //         }),
// // // //         onSubmit: (values) => {
// // // //             const formData = {
// // // //                 leadsource: leadSource,
// // // //                 leadstatus: leadStatus,
// // // //                 integrationType: integrationType,
// // // //                 manualData: {
// // // //                     ...values.manualData,
// // // //                     mobileNo: phoneNumber
// // // //                 },
// // // //                 assignTo: values.assignTo,
// // // //                 customFields: valuesdataleads,
// // // //                 description: values.description,
// // // //                 integrationDetails: values.integrationDetails
// // // //             };
// // // //             onSubmit(formData);
// // // //         }
// // // //     });

// // // //     const renderIntegrationFields = () => {
// // // //         switch (integrationType) {
// // // //             case 'email':
// // // //                 return (
// // // //                     <Grid container spacing={2}>
// // // //                         <Grid size={{ xs: 12, sm: 6 }}>
// // // //                             <TextField
// // // //                                 fullWidth
// // // //                                 size="small"
// // // //                                 label="Email Subject"
// // // //                                 name="integrationDetails.subject"
// // // //                                 value={formik.values.integrationDetails?.subject || ''}
// // // //                                 onChange={formik.handleChange}
// // // //                                 onBlur={formik.handleBlur}
// // // //                                 // error={!!(formik.touched.integrationDetails?.subject && formik.errors.integrationDetails?.subject)}
// // // //                                 // helperText={formik.touched.integrationDetails?.subject && (formik.errors.integrationDetails as any)?.subject}
// // // //                             />
// // // //                         </Grid>
// // // //                         <Grid size={{ xs: 12, sm: 6 }}>
// // // //                             <TextField fullWidth size="small" label="Priority" name="integrationDetails.priority" value={formik.values.integrationDetails?.priority || ''} onChange={formik.handleChange} select>
// // // //                                 <MenuItem value="low">Low</MenuItem>
// // // //                                 <MenuItem value="medium">Medium</MenuItem>
// // // //                                 <MenuItem value="high">High</MenuItem>
// // // //                             </TextField>
// // // //                         </Grid>
// // // //                     </Grid>
// // // //                 );
// // // //             case 'phone':
// // // //                 return (
// // // //                     <Grid container spacing={2}>
// // // //                         <Grid size={{ xs: 12 }}>
// // // //                             <TextField
// // // //                                 fullWidth
// // // //                                 size="small"
// // // //                                 multiline
// // // //                                 rows={3}
// // // //                                 label="Call Notes"
// // // //                                 name="integrationDetails.notes"
// // // //                                 value={formik.values.integrationDetails?.notes || ''}
// // // //                                 onChange={formik.handleChange}
// // // //                                 onBlur={formik.handleBlur}
// // // //                                 // error={!!(formik.touched.integrationDetails?.notes && formik.errors.integrationDetails?.notes)}
// // // //                                 // helperText={formik.touched.integrationDetails?.notes && (formik.errors.integrationDetails as any)?.notes}
// // // //                             />
// // // //                         </Grid>
// // // //                     </Grid>
// // // //                 );
// // // //             case 'meeting':
// // // //                 return (
// // // //                     <Grid container spacing={2}>
// // // //                         <Grid size={{ xs: 12, sm: 6 }}>
// // // //                             <TextField
// // // //                                 fullWidth
// // // //                                 size="small"
// // // //                                 label="Meeting Date"
// // // //                                 type="datetime-local"
// // // //                                 name="integrationDetails.date"
// // // //                                 value={formik.values.integrationDetails?.date || ''}
// // // //                                 onChange={formik.handleChange}
// // // //                                 onBlur={formik.handleBlur}
// // // //                                 // error={!!(formik.touched.integrationDetails?.date && formik.errors.integrationDetails?.date)}
// // // //                                 // helperText={formik.touched.integrationDetails?.date && (formik.errors.integrationDetails as any)?.date}
// // // //                                 InputLabelProps={{ shrink: true }}
// // // //                             />
// // // //                         </Grid>
// // // //                         <Grid size={{ xs: 12, sm: 6 }}>
// // // //                             <TextField fullWidth size="small" label="Location" name="integrationDetails.location" value={formik.values.integrationDetails?.location || ''} onChange={formik.handleChange} />
// // // //                         </Grid>
// // // //                     </Grid>
// // // //                 );
// // // //             default:
// // // //                 return null;
// // // //         }
// // // //     };

// // // //     return (
// // // //         <Paper elevation={0} sx={{ p: 3 }}>
// // // //             <MyButton children="Back" onClick={() => (window.location.href = `/${subdomain}/leads`)} color="inherit" variant="contained" sx={{ mb: 3 }} />

// // // //             <form onSubmit={formik.handleSubmit}>
// // // //                 <Grid container spacing={3}>
// // // //                     {/* Left Column - Lead Info */}
// // // //                     <Grid size={{ xs: 12, sm: 6 }}>
// // // //                         <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
// // // //                             Lead Details
// // // //                         </Typography>

// // // //                         <Grid container spacing={2}>
// // // //                             <Grid size={{ xs: 12, sm: 6 }}>
// // // //                                 <TextField
// // // //                                     fullWidth
// // // //                                     size="small"
// // // //                                     label="Name"
// // // //                                     name="manualData.name"
// // // //                                     value={formik.values.manualData.name}
// // // //                                     onChange={formik.handleChange}
// // // //                                     onBlur={formik.handleBlur}
// // // //                                     error={!!(formik.touched.manualData?.name && formik.errors.manualData?.name)}
// // // //                                     helperText={formik.touched.manualData?.name && (formik.errors.manualData as any)?.name}
// // // //                                 />
// // // //                             </Grid>

// // // //                             <Grid size={{ xs: 12, sm: 6 }}>
// // // //                                 <TextField
// // // //                                     fullWidth
// // // //                                     size="small"
// // // //                                     label="Company"
// // // //                                     name="manualData.company"
// // // //                                     value={formik.values.manualData.company}
// // // //                                     onChange={formik.handleChange}
// // // //                                     onBlur={formik.handleBlur}
// // // //                                     error={!!(formik.touched.manualData?.company && formik.errors.manualData?.company)}
// // // //                                     helperText={formik.touched.manualData?.company && (formik.errors.manualData as any)?.company}
// // // //                                 />
// // // //                             </Grid>

// // // //                             <Grid size={{ xs: 12, sm: 6 }}>
// // // //                                 <TextField
// // // //                                     fullWidth
// // // //                                     size="small"
// // // //                                     label="Email"
// // // //                                     name="manualData.email"
// // // //                                     value={formik.values.manualData.email}
// // // //                                     onChange={formik.handleChange}
// // // //                                     onBlur={formik.handleBlur}
// // // //                                     error={!!(formik.touched.manualData?.email && formik.errors.manualData?.email)}
// // // //                                     helperText={formik.touched.manualData?.email && (formik.errors.manualData as any)?.email}
// // // //                                 />
// // // //                             </Grid>

// // // //                             <Grid size={{ xs: 12, sm: 6 }}>
// // // //                                 <Box sx={{ mt: -1 }}>
// // // //                                     <Typography variant="caption" display="block" gutterBottom>
// // // //                                         Phone Number
// // // //                                     </Typography>
// // // //                                     <PhoneInput
// // // //                                         country={'us'}
// // // //                                         value={phoneNumber}
// // // //                                         onChange={handlePhoneChange}
// // // //                                         inputStyle={{ width: '100%' }}
// // // //                                         inputProps={{
// // // //                                             name: 'manualData.mobileNo',
// // // //                                             onBlur: formik.handleBlur
// // // //                                         }}
// // // //                                     />
// // // //                                     {formik.touched.manualData?.mobileNo && formik.errors.manualData?.mobileNo && (
// // // //                                         <Typography variant="caption" color="error" display="block">
// // // //                                             {(formik.errors.manualData as any)?.mobileNo}
// // // //                                         </Typography>
// // // //                                     )}
// // // //                                 </Box>
// // // //                             </Grid>

// // // //                             <Grid size={{ xs: 12, sm: 6 }}>
// // // //                                 <LeadStatus leadStatus={leadStatus} onSelect={setLeadStatus} error={!leadStatus && formik.submitCount > 0} />
// // // //                             </Grid>

// // // //                             <Grid size={{ xs: 12, sm: 6 }}>
// // // //                                 <LeadSource onSelect={setLeadSource} leadSource={leadSource} error={!leadSource && formik.submitCount > 0} />
// // // //                             </Grid>
// // // //                         </Grid>
// // // //                     </Grid>

// // // //                     {/* Right Column - Integration & Assignment */}
// // // //                     <Grid size={{ xs: 12, sm: 6 }}>
// // // //                         <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
// // // //                             Interaction Details
// // // //                         </Typography>

// // // //                         <Grid container spacing={2}>
// // // //                             <Grid size={{ xs: 12 }}>
// // // //                                 <FormControl fullWidth size="small" error={!!(formik.touched.integrationType && formik.errors.integrationType)}>
// // // //                                     <InputLabel>Interaction Type</InputLabel>
// // // //                                     <Select
// // // //                                         label="Interaction Type"
// // // //                                         name="integrationType"
// // // //                                         value={integrationType}
// // // //                                         onChange={(e) => {
// // // //                                             setIntegrationType(e.target.value);
// // // //                                             formik.setFieldValue('integrationType', e.target.value);
// // // //                                         }}
// // // //                                         onBlur={formik.handleBlur}
// // // //                                     >
// // // //                                         {INTEGRATION_TYPES.map((type) => (
// // // //                                             <MenuItem key={type.value} value={type.value}>
// // // //                                                 {type.label}
// // // //                                             </MenuItem>
// // // //                                         ))}
// // // //                                     </Select>
// // // //                                     {/* {formik.touched.integrationType && formik.errors.integrationType && <FormHelperText>{formik.errors.integrationType}</FormHelperText>} */}
// // // //                                 </FormControl>
// // // //                             </Grid>

// // // //                             {integrationType && <Grid size={{ xs: 12 }}>{renderIntegrationFields()}</Grid>}

// // // //                             <Grid size={{ xs: 12 }}>
// // // //                                 <TextField
// // // //                                     select
// // // //                                     fullWidth
// // // //                                     size="small"
// // // //                                     label="Assign To"
// // // //                                     name="assignTo"
// // // //                                     value={formik.values.assignTo}
// // // //                                     onChange={formik.handleChange}
// // // //                                     onBlur={formik.handleBlur}
// // // //                                     error={!!(formik.touched.assignTo && formik.errors.assignTo)}
// // // //                                     // helperText={formik.touched.assignTo && formik.errors.assignTo}
// // // //                                 >
// // // //                                     {UsersOptions?.map((option) => (
// // // //                                         <MenuItem key={option.value || option.id} value={option.value || option.id}>
// // // //                                             {option.label || option.name}
// // // //                                         </MenuItem>
// // // //                                     ))}
// // // //                                 </TextField>
// // // //                             </Grid>

// // // //                             <Grid size={{ xs: 12 }}>
// // // //                                 <TextField fullWidth size="small" multiline rows={3} label="Description" name="description" value={formik.values.description} onChange={formik.handleChange} />
// // // //                             </Grid>
// // // //                         </Grid>

// // // //                         <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
// // // //                             <Button type="submit" variant="contained" color="primary" size="large" sx={{ minWidth: 120 }}>
// // // //                                 {lead ? 'Update' : 'Create'}
// // // //                             </Button>
// // // //                         </Box>
// // // //                     </Grid>
// // // //                 </Grid>
// // // //             </form>
// // // //         </Paper>
// // // //     );
// // // // };

// // // // export default LeadForm;
// // // 'use client';
// // // import { useFormik } from 'formik';
// // // import * as Yup from 'yup';
// // // import { useContext, useEffect, useState } from 'react';
// // // import { Box, Button, Grid, TextField, MenuItem, Typography, Paper, FormControl, InputLabel, Select, FormHelperText, IconButton, Tooltip, ButtonGroup } from '@mui/material';
// // // import { Email as EmailIcon, Phone as PhoneIcon, MeetingRoom as MeetingIcon } from '@mui/icons-material';
// // // import LeadStatus from '../leadstatus';
// // // import LeadSource from '../leadsource';
// // // import Cookies from 'js-cookie';
// // // import userContext from '../../../../UseContext/UseContext';
// // // import { MyButton } from '../../../../Component/Buttons/Buttons';
// // // import PhoneInput from 'react-phone-input-2';
// // // import 'react-phone-input-2/lib/style.css';

// // // const INTEGRATION_TYPES = [
// // //     { value: 'email', label: 'Email', icon: <EmailIcon /> },
// // //     { value: 'phone', label: 'Phone Call', icon: <PhoneIcon /> },
// // //     { value: 'meeting', label: 'Meeting', icon: <MeetingIcon /> }
// // //     // { value: 'others', label: 'Others', icon: <MeetingIcon /> }
// // // ];

// // // const LeadForm = ({ onSubmit, UsersOptions, lead }: { onSubmit: (data: any) => void; UsersOptions: any[]; lead: any }) => {
// // //     const [leadStatus, setLeadStatus] = useState(lead?.leadstatus?._id || '');
// // //     const [leadSource, setLeadSource] = useState(lead?.leadsource || '');
// // //     const [integrationType, setIntegrationType] = useState(lead?.integrationType || '');
// // //     const [phoneNumber, setPhoneNumber] = useState(lead?.manualData?.mobileNo || '');
// // //     const { valuesdataleads } = useContext(userContext);
// // //     const subdomain = Cookies.get('subdomain');

// // //     useEffect(() => {
// // //         if (lead) {
// // //             setLeadStatus(lead.leadstatus?._id || '');
// // //             setLeadSource(lead.leadsource || '');
// // //             setIntegrationType(lead.integrationType || '');
// // //             setPhoneNumber(lead.manualData?.mobileNo || '');

// // //             formik.setValues({
// // //                 manualData: {
// // //                     name: lead.Name || '',
// // //                     email: lead?.Email || '',
// // //                     mobileNo: lead?.Phone || '',
// // //                     company: lead?.Company || ''
// // //                 },
// // //                 description: lead.description || '',
// // //                 assignTo: lead.assignTo || '',
// // //                 integrationType: lead.integrationType || '',
// // //                 integrationDetails: lead.integrationDetails || {}
// // //             });
// // //         }
// // //     }, [lead]);

// // //     const handlePhoneChange = (value: string) => {
// // //         setPhoneNumber(value);
// // //         formik.setFieldValue('manualData.mobileNo', value);
// // //     };

// // //     const formik = useFormik({
// // //         initialValues: {
// // //             manualData: {
// // //                 name: lead?.Name || '',
// // //                 email: lead?.Email || '',
// // //                 mobileNo: lead?.Phone || '',
// // //                 company: lead?.Company || ''
// // //             },
// // //             description: lead?.description || '',
// // //             assignTo: lead?.assignTo?._id || '',
// // //             integrationType: lead?.integrationType || '',
// // //             integrationDetails: lead?.integrationDetails || {}
// // //         },
// // //         validationSchema: Yup.object({
// // //             manualData: Yup.object().shape({
// // //                 name: Yup.string().required('Required'),
// // //                 email: Yup.string().email('Invalid email').required('Required'),
// // //                 company: Yup.string().required('Required'),
// // //                 mobileNo: Yup.string().required('Required')
// // //             })
// // //             // assignTo: Yup.string().required('Required'),
// // //             // integrationType: Yup.string().required('Required'),
// // //             // integrationDetails: Yup.lazy((obj) => {
// // //             //     if (!formik.values.integrationType) return Yup.object();

// // //             //     switch (formik.values.integrationType) {
// // //             //         case 'email':
// // //             //             return Yup.object().shape({
// // //             //                 subject: Yup.string().required('Email subject required')
// // //             //             });
// // //             //         case 'phone':
// // //             //             return Yup.object().shape({
// // //             //                 notes: Yup.string().required('Call notes required')
// // //             //             });
// // //             //         case 'meeting':
// // //             //             return Yup.object().shape({
// // //             //                 date: Yup.string().required('Meeting date required'),
// // //             //                 location: Yup.string().required('Location required')
// // //             //             });
// // //             //         default:
// // //             //             return Yup.object();
// // //             //     }
// // //             // })
// // //         }),
// // //         onSubmit: (values) => {
// // //             const formData = {
// // //                 leadsource: leadSource,
// // //                 leadstatus: leadStatus,
// // //                 integrationType: integrationType,
// // //                 manualData: {
// // //                     ...values.manualData,
// // //                     mobileNo: phoneNumber
// // //                 },
// // //                 assignTo: values.assignTo,
// // //                 customFields: valuesdataleads,
// // //                 description: values.description,
// // //                 integrationDetails: values.integrationDetails
// // //             };
// // //             onSubmit(formData);
// // //         }
// // //     });

// // //     const renderIntegrationFields = () => {
// // //         switch (integrationType) {
// // //             case 'email':
// // //                 return (
// // //                     <Grid container spacing={2}>
// // //                         <Grid size={{ xs: 12, sm: 6 }}>
// // //                             <TextField
// // //                                 fullWidth
// // //                                 size="small"
// // //                                 label="Email Subject"
// // //                                 name="integrationDetails.subject"
// // //                                 value={formik.values.integrationDetails?.subject || ''}
// // //                                 onChange={formik.handleChange}
// // //                                 onBlur={formik.handleBlur}
// // //                                 // error={!!(formik.touched.integrationD/etails?.subject && formik.errors.integrationDetails?.subject)}
// // //                                 // helperText={formik.touched.integrationDetails?.subject && (formik.errors.integrationDetails as any)?.subject}
// // //                             />
// // //                         </Grid>
// // //                         <Grid size={{ xs: 12, sm: 6 }}>
// // //                             <TextField fullWidth size="small" label="Priority" name="integrationDetails.priority" value={formik.values.integrationDetails?.priority || ''} onChange={formik.handleChange} select>
// // //                                 <MenuItem value="low">Low</MenuItem>
// // //                                 <MenuItem value="medium">Medium</MenuItem>
// // //                                 <MenuItem value="high">High</MenuItem>
// // //                             </TextField>
// // //                         </Grid>
// // //                     </Grid>
// // //                 );
// // //             case 'phone':
// // //                 return (
// // //                     <Grid container spacing={2}>
// // //                         <Grid size={{ xs: 12, sm: 12 }}>
// // //                             <TextField
// // //                                 fullWidth
// // //                                 size="small"
// // //                                 multiline
// // //                                 rows={3}
// // //                                 label="Call Notes"
// // //                                 name="integrationDetails.notes"
// // //                                 value={formik.values.integrationDetails?.notes || ''}
// // //                                 onChange={formik.handleChange}
// // //                                 onBlur={formik.handleBlur}
// // //                                 // error={!!(formik.touched.integrationDetails?.notes && formik.errors.integrationDetails?.notes)}
// // //                                 // helperText={formik.touched.integrationDetails?.notes && (formik.errors.integrationDetails as any)?.notes}
// // //                             />
// // //                         </Grid>
// // //                     </Grid>
// // //                 );
// // //             case 'meeting':
// // //                 return (
// // //                     <Grid container spacing={2}>
// // //                         <Grid size={{ xs: 12, sm: 6 }}>
// // //                             <TextField
// // //                                 fullWidth
// // //                                 size="small"
// // //                                 label="Meeting Date"
// // //                                 type="datetime-local"
// // //                                 name="integrationDetails.date"
// // //                                 value={formik.values.integrationDetails?.date || ''}
// // //                                 onChange={formik.handleChange}
// // //                                 onBlur={formik.handleBlur}
// // //                                 // error={!!(formik.touched.integrationDetails?.date && formik.errors.integrationDetails?.date)}
// // //                                 // helperText={formik.touched.integrationDetails?.date && (formik.errors.integrationDetails as any)?.date}
// // //                                 InputLabelProps={{ shrink: true }}
// // //                             />
// // //                         </Grid>
// // //                         <Grid size={{ xs: 12, sm: 6 }}>
// // //                             <TextField
// // //                                 fullWidth
// // //                                 size="small"
// // //                                 label="Location"
// // //                                 name="integrationDetails.location"
// // //                                 value={formik.values.integrationDetails?.location || ''}
// // //                                 onChange={formik.handleChange}
// // //                                 onBlur={formik.handleBlur}
// // //                                 // error={!!(formik.touched.integrationDetails?.location && formik.errors.integrationDetails?.location)}
// // //                                 // helperText={formik.touched.integrationDetails?.location && (formik.errors.integrationDetails as any)?.location}
// // //                             />
// // //                         </Grid>
// // //                     </Grid>
// // //                 );
// // //             default:
// // //                 return null;
// // //         }
// // //     };

// // //     return (
// // //         <Paper elevation={0} sx={{ p: 3, boxShadow: 'none' }}>
// // //             <MyButton children="Back" onClick={() => (window.location.href = `/${subdomain}/leads`)} color="inherit" variant="contained" size="small" />

// // //             <form onSubmit={formik.handleSubmit}>
// // //                 <Grid container spacing={3}>
// // //                     {/* Left Column - Lead Info */}
// // //                     <Grid size={{ xs: 12, sm: 6 }}>
// // //                         <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
// // //                             Lead Details
// // //                         </Typography>

// // //                         <Grid container spacing={2}>
// // //                             <Grid size={{ xs: 12, sm: 6 }}>
// // //                                 <TextField
// // //                                     fullWidth
// // //                                     size="small"
// // //                                     label="Name"
// // //                                     name="manualData.name"
// // //                                     value={formik.values.manualData.name}
// // //                                     onChange={formik.handleChange}
// // //                                     onBlur={formik.handleBlur}
// // //                                     error={!!(formik.touched.manualData?.name && formik.errors.manualData?.name)}
// // //                                     helperText={formik.touched.manualData?.name && (formik.errors.manualData as any)?.name}
// // //                                 />
// // //                             </Grid>

// // //                             <Grid size={{ xs: 12, sm: 6 }}>
// // //                                 <TextField
// // //                                     fullWidth
// // //                                     size="small"
// // //                                     label="Company"
// // //                                     name="manualData.company"
// // //                                     value={formik.values.manualData.company}
// // //                                     onChange={formik.handleChange}
// // //                                     onBlur={formik.handleBlur}
// // //                                     error={!!(formik.touched.manualData?.company && formik.errors.manualData?.company)}
// // //                                     helperText={formik.touched.manualData?.company && (formik.errors.manualData as any)?.company}
// // //                                 />
// // //                             </Grid>

// // //                             <Grid size={{ xs: 12, sm: 6 }}>
// // //                                 <TextField
// // //                                     fullWidth
// // //                                     size="small"
// // //                                     label="Email"
// // //                                     name="manualData.email"
// // //                                     value={formik.values.manualData.email}
// // //                                     onChange={formik.handleChange}
// // //                                     onBlur={formik.handleBlur}
// // //                                     error={!!(formik.touched.manualData?.email && formik.errors.manualData?.email)}
// // //                                     helperText={formik.touched.manualData?.email && (formik.errors.manualData as any)?.email}
// // //                                 />
// // //                             </Grid>

// // //                             <Grid size={{ xs: 12, sm: 6 }}>
// // //                                 <Box>
// // //                                     {/* <Typography variant="caption" display="block" gutterBottom>
// // //                                         Phone Number
// // //                                     </Typography> */}
// // //                                     <PhoneInput
// // //                                         country={'us'}
// // //                                         value={phoneNumber}
// // //                                         onChange={handlePhoneChange}
// // //                                         inputStyle={{ width: '100%' }}
// // //                                         inputProps={{
// // //                                             name: 'manualData.mobileNo',
// // //                                             onBlur: formik.handleBlur
// // //                                         }}
// // //                                     />
// // //                                     {formik.touched.manualData?.mobileNo && formik.errors.manualData?.mobileNo && (
// // //                                         <Typography variant="caption" color="error" display="block">
// // //                                             {(formik.errors.manualData as any)?.mobileNo}
// // //                                         </Typography>
// // //                                     )}
// // //                                 </Box>
// // //                             </Grid>

// // //                             <Grid size={{ xs: 12, sm: 6 }}>
// // //                                 <LeadStatus leadStatus={leadStatus} onSelect={setLeadStatus} />
// // //                             </Grid>

// // //                             <Grid size={{ xs: 12, sm: 6 }}>
// // //                                 <LeadSource onSelect={setLeadSource} leadSource={leadSource} />
// // //                             </Grid>
// // //                         </Grid>
// // //                     </Grid>

// // //                     {/* Right Column - Integration & Assignment */}
// // //                     <Grid size={{ xs: 12, sm: 6 }}>
// // //                         <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
// // //                             Interaction Details
// // //                         </Typography>

// // //                         <Grid container spacing={2}>
// // //                             <Grid size={{ xs: 12, sm: 6 }}>
// // //                                 <ButtonGroup sx={{ p: 0 }}>
// // //                                     {INTEGRATION_TYPES.map((type) => (
// // //                                         <Button key={type.value} size="small" sx={{ p: 0, border: '0.5px solid' }} variant="outlined">
// // //                                             {/* <Box> */}
// // //                                             <Tooltip title={type.label}>
// // //                                                 <IconButton
// // //                                                     size="small"
// // //                                                     onClick={() => {
// // //                                                         setIntegrationType(type.value);
// // //                                                         formik.setFieldValue('integrationType', type.value);
// // //                                                     }}
// // //                                                     // color={integrationType === type.value ? 'primary' : 'default'}
// // //                                                 >
// // //                                                     {type.icon}
// // //                                                 </IconButton>
// // //                                             </Tooltip>
// // //                                             {/* </Box> */}
// // //                                         </Button>
// // //                                     ))}
// // //                                 </ButtonGroup>

// // //                                 {formik.touched.integrationType && formik.errors.integrationType && (
// // //                                     <Typography variant="caption" color="error">
// // //                                         {/* {formik.errors.integrationType} */}
// // //                                     </Typography>
// // //                                 )}
// // //                             </Grid>

// // //                             {integrationType && <Grid size={{ xs: 12, sm: 12 }}>{renderIntegrationFields()}</Grid>}

// // //                             <Grid size={{ xs: 12, sm: 12 }}>
// // //                                 <TextField
// // //                                     select
// // //                                     fullWidth
// // //                                     size="small"
// // //                                     label="Assign To"
// // //                                     name="assignTo"
// // //                                     value={formik.values.assignTo}
// // //                                     onChange={formik.handleChange}
// // //                                     onBlur={formik.handleBlur}
// // //                                     error={!!(formik.touched.assignTo && formik.errors.assignTo)}
// // //                                     // helperText={formik.touched.assignTo && formik.errors.assignTo}
// // //                                 >
// // //                                     {UsersOptions?.map((option) => (
// // //                                         <MenuItem key={option.value || option.id} value={option.value || option.id}>
// // //                                             {option.label || option.name}
// // //                                         </MenuItem>
// // //                                     ))}
// // //                                 </TextField>
// // //                             </Grid>

// // //                             <Grid size={{ xs: 12, sm: 12 }}>
// // //                                 <TextField fullWidth size="small" multiline rows={3} label="Description" name="description" value={formik.values.description} onChange={formik.handleChange} />
// // //                             </Grid>
// // //                         </Grid>

// // //                         <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
// // //                             <Button type="submit" variant="contained" color="primary" size="small" sx={{ minWidth: 120 }}>
// // //                                 {lead ? 'Update' : 'Create'}
// // //                             </Button>
// // //                         </Box>
// // //                     </Grid>
// // //                 </Grid>
// // //             </form>
// // //         </Paper>
// // //     );
// // // };

// // // export default LeadForm;
// // 'use client';
// // import { useFormik } from 'formik';
// // import * as Yup from 'yup';
// // import { useContext, useEffect, useState } from 'react';
// // import { Box, Button, Grid, TextField, MenuItem, Typography, Paper, FormControl, InputLabel, Select, FormHelperText, IconButton, Tooltip, ButtonGroup, InputAdornment, Divider } from '@mui/material';
// // import { Email as EmailIcon, Phone as PhoneIcon, MeetingRoom as MeetingIcon, Person as PersonIcon, Business as BusinessIcon, Language as WebsiteIcon, Work as JobTitleIcon, AttachMoney as MoneyIcon } from '@mui/icons-material';
// // import LeadStatus from '../leadstatus';
// // import LeadSource from '../leadsource';
// // import Cookies from 'js-cookie';
// // import userContext from '../../../../UseContext/UseContext';
// // import { MyButton } from '../../../../Component/Buttons/Buttons';
// // import PhoneInput from 'react-phone-input-2';
// // import 'react-phone-input-2/lib/style.css';
// // import { LeadPost } from '../../../../../../api/Leads';

// // const INTEGRATION_TYPES = [
// //     { value: 'email', label: 'Email', icon: <EmailIcon /> },
// //     { value: 'phone', label: 'Phone Call', icon: <PhoneIcon /> },
// //     { value: 'meeting', label: 'Meeting', icon: <MeetingIcon /> }
// // ];

// // const LeadForm = ({ UsersOptions, lead }: { UsersOptions: any[]; lead: any }) => {
// //     const [leadStatus, setLeadStatus] = useState(lead?.leadstatus?._id || '');
// //     const [leadSource, setLeadSource] = useState(lead?.leadsource || '');
// //     const [integrationType, setIntegrationType] = useState(lead?.integrationType || '');
// //     const [phoneNumber, setPhoneNumber] = useState(lead?.manualData?.mobileNo || '');
// //     const { valuesdataleads } = useContext(userContext);
// //     const subdomain = Cookies.get('subdomain');

// //     useEffect(() => {
// //         if (lead) {
// //             setLeadStatus(lead.leadstatus?._id || '');
// //             setLeadSource(lead.leadsource || '');
// //             setIntegrationType(lead.integrationType || '');
// //             setPhoneNumber(lead.manualData?.mobileNo || '');

// //             formik.setValues({
// //                 manualData: {
// //                     name: lead.Name || '',
// //                     email: lead?.Email || '',
// //                     mobileNo: lead?.Phone || '',
// //                     company: lead?.Company || '',
// //                     jobTitle: lead?.manualData?.jobTitle || '',
// //                     website: lead?.manualData?.website || ''
// //                 },
// //                 description: lead.description || '',
// //                 assignTo: lead.assignTo || '',
// //                 integrationType: lead.integrationType || '',
// //                 integrationDetails: lead.integrationDetails || {},
// //                 potentialValue: lead?.potentialValue || ''
// //             });
// //         }
// //     }, [lead]);

// //     const handlePhoneChange = (value: string) => {
// //         setPhoneNumber(value);
// //         formik.setFieldValue('manualData.mobileNo', value);
// //     };

// //     const formik = useFormik({
// //         initialValues: {
// //             manualData: {
// //                 name: lead?.Name || '',
// //                 email: lead?.Email || '',
// //                 mobileNo: lead?.Phone || '',
// //                 company: lead?.Company || '',
// //                 jobTitle: lead?.manualData?.jobTitle || '',
// //                 website: lead?.manualData?.website || ''
// //             },
// //             description: lead?.description || '',
// //             assignTo: lead?.assignTo?._id || '',
// //             integrationType: lead?.integrationType || '',
// //             integrationDetails: lead?.integrationDetails || {},
// //             potentialValue: lead?.potentialValue || ''
// //         },
// //         validationSchema: Yup.object({
// //             manualData: Yup.object().shape({
// //                 name: Yup.string().required('Full name is required'),
// //                 email: Yup.string().email('Invalid email').required('Email is required'),
// //                 company: Yup.string().required('Company name is required'),
// //                 mobileNo: Yup.string().required('Phone number is required'),
// //                 jobTitle: Yup.string(),
// //                 website: Yup.string().url('Invalid URL format')
// //             }),
// //             potentialValue: Yup.number().typeError('Must be a number').positive('Must be positive').nullable(),
// //             assignTo: Yup.string().required('Assignee is required'),
// //             integrationType: Yup.string().required('Interaction type is required'),
// //             integrationDetails: Yup.lazy((obj) => {
// //                 if (!formik.values.integrationType) return Yup.object();

// //                 switch (formik.values.integrationType) {
// //                     case 'email':
// //                         return Yup.object().shape({
// //                             subject: Yup.string().required('Email subject required')
// //                         });
// //                     case 'phone':
// //                         return Yup.object().shape({
// //                             notes: Yup.string().required('Call notes required')
// //                         });
// //                     case 'meeting':
// //                         return Yup.object().shape({
// //                             date: Yup.string().required('Meeting date required'),
// //                             location: Yup.string().required('Location required')
// //                         });
// //                     default:
// //                         return Yup.object();
// //                 }
// //             })
// //         }),
// //         onSubmit: (values) => {
// //             const formData = {
// //                 leadsource: leadSource,
// //                 leadstatus: leadStatus,
// //                 integrationType: integrationType,
// //                 manualData: {
// //                     ...values.manualData,
// //                     mobileNo: phoneNumber
// //                 },
// //                 assignTo: values.assignTo,
// //                 customFields: valuesdataleads,
// //                 description: values.description,
// //                 integrationDetails: values.integrationDetails,
// //                 potentialValue: values.potentialValue
// //             };

// //             const response = LeadPost(subdomain, formData);
// //             // onSubmition(formData);
// //         }
// //     });

// //     const renderIntegrationFields = () => {
// //         switch (integrationType) {
// //             case 'email':
// //                 return (
// //                     <Grid container spacing={2}>
// //                         <Grid size={{ xs: 12, sm: 6 }}>
// //                             <TextField
// //                                 fullWidth
// //                                 size="small"
// //                                 label="Email Subject"
// //                                 name="integrationDetails.subject"
// //                                 value={formik.values.integrationDetails?.subject || ''}
// //                                 onChange={formik.handleChange}
// //                                 onBlur={formik.handleBlur}
// //                                 // error={!!(formik.touched.integrationDetails?.subject && (formik.errors.integrationDetails as any)?.subject)}
// //                                 // helperText={formik.touched.integrationDetails?.subject && (formik.errors.integrationDetails as any)?.subject}
// //                             />
// //                         </Grid>
// //                         <Grid size={{ xs: 12, sm: 6 }}>
// //                             <TextField fullWidth size="small" label="Priority" name="integrationDetails.priority" value={formik.values.integrationDetails?.priority || ''} onChange={formik.handleChange} select>
// //                                 <MenuItem value="low">Low</MenuItem>
// //                                 <MenuItem value="medium">Medium</MenuItem>
// //                                 <MenuItem value="high">High</MenuItem>
// //                             </TextField>
// //                         </Grid>
// //                     </Grid>
// //                 );
// //             case 'phone':
// //                 return (
// //                     <Grid container spacing={2}>
// //                         <Grid size={{ xs: 12, sm: 12 }}>
// //                             <TextField
// //                                 fullWidth
// //                                 size="small"
// //                                 multiline
// //                                 rows={3}
// //                                 label="Call Notes"
// //                                 name="integrationDetails.notes"
// //                                 value={formik.values.integrationDetails?.notes || ''}
// //                                 onChange={formik.handleChange}
// //                                 onBlur={formik.handleBlur}
// //                                 // error={!!(formik.touched.integrationDetails?.notes && (formik.errors.integrationDetails as any)?.notes)}
// //                                 // helperText={formik.touched.integrationDetails?.notes && (formik.errors.integrationDetails as any)?.notes}
// //                             />
// //                         </Grid>
// //                     </Grid>
// //                 );
// //             case 'meeting':
// //                 return (
// //                     <Grid container spacing={2}>
// //                         <Grid size={{ xs: 12, sm: 6 }}>
// //                             <TextField
// //                                 fullWidth
// //                                 size="small"
// //                                 label="Meeting Date"
// //                                 type="datetime-local"
// //                                 name="integrationDetails.date"
// //                                 value={formik.values.integrationDetails?.date || ''}
// //                                 onChange={formik.handleChange}
// //                                 onBlur={formik.handleBlur}
// //                                 // error={!!(formik.touched.integrationDetails?.date && (formik.errors.integrationDetails as any)?.date)}
// //                                 // helperText={formik.touched.integrationDetails?.date && (formik.errors.integrationDetails as any)?.date}
// //                                 InputLabelProps={{ shrink: true }}
// //                             />
// //                         </Grid>
// //                         <Grid size={{ xs: 12, sm: 6 }}>
// //                             <TextField
// //                                 fullWidth
// //                                 size="small"
// //                                 label="Location"
// //                                 name="integrationDetails.location"
// //                                 value={formik.values.integrationDetails?.location || ''}
// //                                 onChange={formik.handleChange}
// //                                 onBlur={formik.handleBlur}
// //                                 // error={!!(formik.touched.integrationDetails?.location && (formik.errors.integrationDetails as any)?.location)}
// //                                 // helperText={formik.touched.integrationDetails?.location && (formik.errors.integrationDetails as any)?.location}
// //                             />
// //                         </Grid>
// //                     </Grid>
// //                 );
// //             default:
// //                 return null;
// //         }
// //     };

// //     return (
// //         <Paper elevation={0} sx={{ p: 0, boxShadow: 'none' }}>
// //             {/* <MyButton children="Back" onClick={() => (window.location.href = `/${subdomain}/leads`)} color="inherit" variant="contained" size="small" /> */}

// //             <form onSubmit={formik.handleSubmit}>
// //                 <Grid container spacing={3}>
// //                     {/* Left Column - Contact Information */}
// //                     <Grid size={{ xs: 12, sm: 6 }}>
// //                         <Typography variant="h6" gutterBottom sx={{ fontWeight: '400', display: 'flex', alignItems: 'center', gap: 1 }}>
// //                             <PersonIcon /> Contact Information
// //                         </Typography>

// //                         <Grid container spacing={2}>
// //                             <Grid size={{ xs: 12, sm: 12 }}>
// //                                 <TextField
// //                                     fullWidth
// //                                     size="small"
// //                                     label="Full Name *"
// //                                     name="manualData.name"
// //                                     value={formik.values.manualData.name}
// //                                     onChange={formik.handleChange}
// //                                     onBlur={formik.handleBlur}
// //                                     error={!!(formik.touched.manualData?.name && formik.errors.manualData?.name)}
// //                                     helperText={formik.touched.manualData?.name && (formik.errors.manualData as any)?.name}
// //                                     InputProps={{
// //                                         startAdornment: (
// //                                             <InputAdornment position="start">
// //                                                 <PersonIcon fontSize="small" />
// //                                             </InputAdornment>
// //                                         )
// //                                     }}
// //                                 />
// //                             </Grid>

// //                             <Grid size={{ xs: 12, sm: 6 }}>
// //                                 <TextField
// //                                     fullWidth
// //                                     size="small"
// //                                     label="Email *"
// //                                     name="manualData.email"
// //                                     value={formik.values.manualData.email}
// //                                     onChange={formik.handleChange}
// //                                     onBlur={formik.handleBlur}
// //                                     error={!!(formik.touched.manualData?.email && formik.errors.manualData?.email)}
// //                                     helperText={formik.touched.manualData?.email && (formik.errors.manualData as any)?.email}
// //                                     InputProps={{
// //                                         startAdornment: (
// //                                             <InputAdornment position="start">
// //                                                 <EmailIcon fontSize="small" />
// //                                             </InputAdornment>
// //                                         )
// //                                     }}
// //                                 />
// //                             </Grid>

// //                             <Grid size={{ xs: 12, sm: 6 }}>
// //                                 <Box>
// //                                     <PhoneInput
// //                                         country={'us'}
// //                                         value={phoneNumber}
// //                                         onChange={handlePhoneChange}
// //                                         inputStyle={{ width: '100%' }}
// //                                         inputProps={{
// //                                             name: 'manualData.mobileNo',
// //                                             onBlur: formik.handleBlur
// //                                         }}
// //                                         // containerStyle={{
// //                                         //     '& .form-control': {
// //                                         //         height: '40px',
// //                                         //         paddingLeft: '50px'
// //                                         //     }
// //                                         // }}
// //                                     />
// //                                     {formik.touched.manualData?.mobileNo && formik.errors.manualData?.mobileNo && (
// //                                         <Typography variant="caption" color="error" display="block" sx={{ mt: 0.5, ml: 1.5 }}>
// //                                             {(formik.errors.manualData as any)?.mobileNo}
// //                                         </Typography>
// //                                     )}
// //                                 </Box>
// //                             </Grid>

// //                             <Grid size={{ xs: 12, sm: 6 }}>
// //                                 <TextField
// //                                     fullWidth
// //                                     size="small"
// //                                     label="Job Title"
// //                                     name="manualData.jobTitle"
// //                                     value={formik.values.manualData.jobTitle}
// //                                     onChange={formik.handleChange}
// //                                     InputProps={{
// //                                         startAdornment: (
// //                                             <InputAdornment position="start">
// //                                                 <JobTitleIcon fontSize="small" />
// //                                             </InputAdornment>
// //                                         )
// //                                     }}
// //                                 />
// //                             </Grid>

// //                             <Grid size={{ xs: 12, sm: 6 }}>
// //                                 <TextField
// //                                     fullWidth
// //                                     size="small"
// //                                     label="Website"
// //                                     name="manualData.website"
// //                                     value={formik.values.manualData.website}
// //                                     onChange={formik.handleChange}
// //                                     onBlur={formik.handleBlur}
// //                                     error={!!(formik.touched.manualData?.website && formik.errors.manualData?.website)}
// //                                     helperText={formik.touched.manualData?.website && (formik.errors.manualData as any)?.website}
// //                                     InputProps={{
// //                                         startAdornment: (
// //                                             <InputAdornment position="start">
// //                                                 <WebsiteIcon fontSize="small" />
// //                                             </InputAdornment>
// //                                         )
// //                                     }}
// //                                 />
// //                             </Grid>

// //                             <Grid size={{ xs: 12, sm: 12 }}>
// //                                 <TextField
// //                                     fullWidth
// //                                     size="small"
// //                                     label="Company Name *"
// //                                     name="manualData.company"
// //                                     value={formik.values.manualData.company}
// //                                     onChange={formik.handleChange}
// //                                     onBlur={formik.handleBlur}
// //                                     error={!!(formik.touched.manualData?.company && formik.errors.manualData?.company)}
// //                                     helperText={formik.touched.manualData?.company && (formik.errors.manualData as any)?.company}
// //                                     InputProps={{
// //                                         startAdornment: (
// //                                             <InputAdornment position="start">
// //                                                 <BusinessIcon fontSize="small" />
// //                                             </InputAdornment>
// //                                         )
// //                                     }}
// //                                 />
// //                             </Grid>
// //                         </Grid>

// //                         <Divider sx={{ my: 3 }} />

// //                         <Typography variant="h6" gutterBottom sx={{ fontWeight: '400' }}>
// //                             Lead Details
// //                         </Typography>

// //                         <Grid container spacing={2}>
// //                             <Grid size={{ xs: 12, sm: 6 }}>
// //                                 <LeadStatus leadStatus={leadStatus} onSelect={setLeadStatus} />
// //                             </Grid>

// //                             <Grid size={{ xs: 12, sm: 6 }}>
// //                                 <LeadSource onSelect={setLeadSource} leadSource={leadSource} />
// //                             </Grid>

// //                             <Grid size={{ xs: 12, sm: 6 }}>
// //                                 <TextField
// //                                     fullWidth
// //                                     size="small"
// //                                     label="Potential Value ($)"
// //                                     name="potentialValue"
// //                                     type="number"
// //                                     value={formik.values.potentialValue}
// //                                     onChange={formik.handleChange}
// //                                     onBlur={formik.handleBlur}
// //                                     error={!!(formik.touched.potentialValue && formik.errors.potentialValue)}
// //                                     // helperText={formik.touched.potentialValue && formik.errors.potentialValue}
// //                                     InputProps={{
// //                                         startAdornment: <InputAdornment position="start">$</InputAdornment>
// //                                     }}
// //                                 />
// //                             </Grid>

// //                             <Grid size={{ xs: 12, sm: 6 }}>
// //                                 <TextField fullWidth size="small" multiline rows={3} label="Notes" name="description" value={formik.values.description} onChange={formik.handleChange} />
// //                             </Grid>
// //                         </Grid>
// //                     </Grid>

// //                     {/* Right Column - Interaction & Assignment */}
// //                     <Grid size={{ xs: 12, sm: 6 }}>
// //                         <Typography variant="h6" gutterBottom sx={{ fontWeight: '400', display: 'flex', alignItems: 'center', gap: 1 }}>
// //                             <MeetingIcon /> Interaction Details
// //                         </Typography>

// //                         <Grid container spacing={2}>
// //                             <Grid size={{ xs: 12, sm: 12 }}>
// //                                 <Typography variant="subtitle2" sx={{ mb: 1 }}>
// //                                     Interaction Type *
// //                                 </Typography>
// //                                 <ButtonGroup>
// //                                     {INTEGRATION_TYPES.map((type) => (
// //                                         <Tooltip key={type.value} title={type.label}>
// //                                             <MyButton
// //                                                 size="small"
// //                                                 variant={integrationType === type.value ? 'contained' : 'outlined'}
// //                                                 startIcon={type.icon}
// //                                                 onClick={() => {
// //                                                     setIntegrationType(type.value);
// //                                                     formik.setFieldValue('integrationType', type.value);
// //                                                 }}
// //                                                 // sx={{
// //                                                 //     textTransform: 'none',
// //                                                 //     border: integrationType === type.value ? '1px solid transparent' : '1px solid'
// //                                                 // }}
// //                                             >
// //                                                 {type.label}
// //                                             </MyButton>
// //                                         </Tooltip>
// //                                     ))}
// //                                 </ButtonGroup>
// //                                 {formik.touched.integrationType && formik.errors.integrationType && (
// //                                     <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
// //                                         {/* {formik.errors.integrationType} */}
// //                                     </Typography>
// //                                 )}
// //                             </Grid>

// //                             {integrationType && <Grid size={{ xs: 12, sm: 12 }}>{renderIntegrationFields()}</Grid>}

// //                             <Grid size={{ xs: 12, sm: 12 }}>
// //                                 <TextField
// //                                     select
// //                                     fullWidth
// //                                     size="small"
// //                                     label="Assign To *"
// //                                     name="assignTo"
// //                                     value={formik.values.assignTo}
// //                                     onChange={formik.handleChange}
// //                                     onBlur={formik.handleBlur}
// //                                     error={!!(formik.touched.assignTo && formik.errors.assignTo)}
// //                                     // helperText={formik.touched.assignTo && formik.errors.assignTo}
// //                                 >
// //                                     {UsersOptions?.map((option) => (
// //                                         <MenuItem key={option.value || option.id} value={option.value || option.id}>
// //                                             {option.label || option.name}
// //                                         </MenuItem>
// //                                     ))}
// //                                 </TextField>
// //                             </Grid>
// //                         </Grid>
// //                         <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
// //                             <MyButton variant="contained" color="primary" size="large" disabled={!formik.isValid || formik.isSubmitting}>
// //                                 {lead ? 'Update Lead' : 'Create Lead'}
// //                             </MyButton>
// //                         </Box>
// //                     </Grid>
// //                 </Grid>
// //             </form>
// //         </Paper>
// //     );
// // };

// // export default LeadForm;
// 'use client';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useContext, useEffect, useState } from 'react';
// import { Box, Button, Grid, TextField, MenuItem, Typography, Paper, FormControl, InputLabel, Select, FormHelperText, IconButton, Tooltip, ButtonGroup, InputAdornment, Divider, RadioGroup, FormControlLabel, Radio } from '@mui/material';
// import {
//     Email as EmailIcon,
//     Phone as PhoneIcon,
//     MeetingRoom as MeetingIcon,
//     Person as PersonIcon,
//     Business as BusinessIcon,
//     Language as WebsiteIcon,
//     Work as JobTitleIcon,
//     AttachMoney as MoneyIcon,
//     Videocam as OnlineIcon,
//     Business as OfficeIcon,
//     ArrowBackIos as ArrowBackIosIcon
// } from '@mui/icons-material';
// import WifiOffIcon from '@mui/icons-material/WifiOff';
// import LeadStatus from '../leadstatus';
// import LeadSource from '../leadsource';
// import Cookies from 'js-cookie';
// import userContext from '../../../../UseContext/UseContext';
// import { MyButton } from '../../../../Component/Buttons/Buttons';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import { LeadPost, UpdateLeadsByID } from '../../../../../../api/Leads';

// // Country-based potential values (example values)
// const COUNTRY_POTENTIAL_VALUES: Record<string, number> = {
//     us: 10000, // United States
//     ca: 8000, // Canada
//     gb: 9000, // United Kingdom
//     au: 8500, // Australia
//     in: 5000, // India
//     // Add more countries as needed
//     default: 6000 // Default value
// };

// const INTEGRATION_TYPES = [
//     { value: 'email', label: 'Email', icon: <EmailIcon /> },
//     { value: 'phone', label: 'Phone Call', icon: <PhoneIcon /> },
//     { value: 'meeting', label: 'Meeting', icon: <MeetingIcon /> }
//     // { value: 'other', label: 'Other', icon: <MeetingIcon /> }
// ];

// const MEETING_TYPES = [
//     { value: 'offline', label: 'Offline', icon: <WifiOffIcon /> },
//     { value: 'online', label: 'Online', icon: <OnlineIcon /> },
//     { value: 'other', label: 'Other', icon: <MeetingIcon /> }
// ];

// const LeadForm = ({ UsersOptions, lead }: { UsersOptions: any[]; lead: any }) => {
//     const [leadStatus, setLeadStatus] = useState(lead?.leadstatus || '');
//     const [leadSource, setLeadSource] = useState(lead?.leadsource || '');
//     const [integrationType, setIntegrationType] = useState(lead?.integrationType?.type || '');
//     const [phoneNumber, setPhoneNumber] = useState(lead?.manualData?.mobileNo || '');
//     const [countryCode, setCountryCode] = useState('in');
//     const [meetingType, setMeetingType] = useState(lead?.integrationDetails?.meetingType || 'office');
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [submitError, setSubmitError] = useState('');
//     const { valuesdataleads } = useContext(userContext);
//     const subdomain = Cookies.get('subdomain');
//     console.log(lead, 'lead');
//     console.log(leadStatus, 'leadStatus');

//     useEffect(() => {
//         if (lead) {
//             setLeadStatus(lead.leadstatus || '');
//             setLeadSource(lead?.leadsource || '');
//             setIntegrationType(lead?.interactionType?.type || '');
//             setPhoneNumber(lead.manualData?.mobileNo || '');
//             setMeetingType(lead.integrationDetails?.meetingType || 'office');
//             const valuesInInteractionType =
//                 lead?.interactionType?.type === 'email'
//                     ? { subject: lead?.interactionType?.subject, priority: lead?.interactionType?.priority }
//                     : lead?.interactionType?.type === 'phone'
//                       ? { notes: lead?.integrationType?.notes }
//                       : lead?.interactionType?.type === 'meeting'
//                         ? { date: lead?.interactionType?.date, platform: lead?.interactionType?.meetingType }
//                         : lead?.interactionType?.type === 'others'
//                           ? { details: lead?.interactionType?.details }
//                           : {};
//             console.log(lead?.interactionType?.type, 'valuesInInteractionType');

//             formik.setValues({
//                 manualData: {
//                     name: lead?.manualData?.name || '',
//                     email: lead?.manualData?.email || '',
//                     mobileNo: lead?.manualData?.mobileNo || '',
//                     company: lead?.manualData?.company || '',
//                     jobTitle: lead?.manualData?.jobTitle || '',
//                     website: lead?.manualData?.website || ''
//                 },
//                 description: lead.description || '',
//                 assignTo: lead.assignTo?._id || '',
//                 integrationType: lead.integrationType || '',
//                 integrationDetails: valuesInInteractionType || {},
//                 potentialValue: lead?.potentialValue || COUNTRY_POTENTIAL_VALUES[countryCode] || COUNTRY_POTENTIAL_VALUES.default
//             });
//         } else {
//             // Set default potential value based on country
//             formik.setFieldValue('potentialValue', COUNTRY_POTENTIAL_VALUES[countryCode] || COUNTRY_POTENTIAL_VALUES.default);
//         }
//     }, [lead, countryCode]);

//     const handlePhoneChange = (value: string, country: any) => {
//         setPhoneNumber(value);
//         setCountryCode(country.countryCode.toLowerCase());
//         formik.setFieldValue('manualData.mobileNo', value);

//         // Update potential value based on country
//         const newPotentialValue = COUNTRY_POTENTIAL_VALUES[country.countryCode.toLowerCase()] || COUNTRY_POTENTIAL_VALUES.default;
//         formik.setFieldValue('potentialValue', newPotentialValue);
//     };

//     const handleMeetingTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const value = event.target.value;
//         setMeetingType(value);
//         formik.setFieldValue('integrationDetails.meetingType', value);
//     };

//     const formik = useFormik({
//         initialValues: {
//             manualData: {
//                 name: lead?.Name || '',
//                 email: lead?.Email || '',
//                 mobileNo: lead?.Phone || '',
//                 company: lead?.Company || '',
//                 jobTitle: lead?.manualData?.jobTitle || '',
//                 website: lead?.manualData?.website || ''
//             },
//             description: lead?.description || '',
//             assignTo: lead?.assignTo?._id || '',
//             integrationType: lead?.integrationType || '',
//             integrationDetails: lead?.integrationType || {
//                 meetingType: 'offline',
//                 location: ''
//             },
//             potentialValue: lead?.potentialValue || COUNTRY_POTENTIAL_VALUES[countryCode] || COUNTRY_POTENTIAL_VALUES.default
//         },
//         validationSchema: Yup.object({
//             manualData: Yup.object().shape({
//                 name: Yup.string().required('Full name is required'),
//                 email: Yup.string().email('Invalid email').required('Email is required'),

//                 mobileNo: Yup.string().required('Phone number is required')
//             })
//         }),
//         onSubmit: async (values) => {
//             setIsSubmitting(true);
//             setSubmitError('');
//             console.log(values.integrationDetails, '????????????integrationType');

//             const valuesInInteractionType =
//                 integrationType === 'email'
//                     ? { subject: values.integrationDetails.subject, priority: values.integrationDetails.priority }
//                     : integrationType === 'phone'
//                       ? { notes: values.integrationDetails.notes }
//                       : integrationType === 'meeting'
//                         ? { date: values.integrationDetails.date, platform: values.integrationDetails.meetingType }
//                         : integrationType === 'others'
//                           ? { details: values.integrationDetails.details }
//                           : {};

//             const interactionType = {
//                 type: integrationType,
//                 ...valuesInInteractionType
//             };
//             console.log(interactionType, 'cvalrnd nadkankflaknjlnfkla');

//             try {
//                 const formData = {
//                     leadsource: leadSource,
//                     leadstatus: leadStatus,
//                     // integrationType: integrationType,
//                     manualData: {
//                         ...values.manualData,
//                         mobileNo: phoneNumber
//                     },
//                     assignTo: values.assignTo,
//                     customFields: valuesdataleads,
//                     notes: values.description,
//                     interactionType: interactionType,
//                     potentialValue: values.potentialValue
//                 };

//                 if (!lead) {
//                     const response = await LeadPost(subdomain, formData);
//                     if (response) {
//                         window.location.href = `/${subdomain}/leads`;
//                     }
//                 } else {
//                     const response = await UpdateLeadsByID(subdomain, lead.LeadId, formData);
//                     console.log(response,"response")
//                     if (response) {
//                         // window.location.href = `/${subdomain}/leads`;
//                     }
//                 }
//             } catch (error) {
//                 console.error('Submission error:', error);
//                 setSubmitError('Failed to submit lead. Please try again.');
//             } finally {
//                 setIsSubmitting(false);
//             }
//         }
//     });

//     const renderIntegrationFields = () => {
//         switch (integrationType) {
//             case 'email':
//                 return (
//                     <Grid container spacing={2}>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField
//                                 fullWidth
//                                 size="small"
//                                 label="Email Subject *"
//                                 name="integrationDetails.subject"
//                                 value={formik.values.integrationDetails?.subject || ''}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 // error={!!(formik.touched.integrationDetails?.subject && (formik.errors.integrationDetails as any)?.subject)}
//                                 // helperText={formik.touched.integrationDetails?.subject && (formik.errors.integrationDetails as any)?.subject}
//                             />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField fullWidth size="small" label="Priority" name="integrationDetails.priority" value={formik.values.integrationDetails?.priority || ''} onChange={formik.handleChange} select>
//                                 <MenuItem value="low">Low</MenuItem>
//                                 <MenuItem value="medium">Medium</MenuItem>
//                                 <MenuItem value="high">High</MenuItem>
//                             </TextField>
//                         </Grid>
//                     </Grid>
//                 );
//             case 'phone':
//                 return (
//                     <Grid container spacing={2}>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField
//                                 fullWidth
//                                 size="small"
//                                 multiline
//                                 rows={3}
//                                 label="Call Notes *"
//                                 name="integrationDetails.notes"
//                                 value={formik.values.integrationDetails?.notes || ''}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 // error={!!(formik.touched.integrationDetails?.notes && (formik.errors.integrationDetails as any)?.notes)}
//                                 // helperText={formik.touched.integrationDetails?.notes && (formik.errors.integrationDetails as any)?.notes}
//                             />
//                         </Grid>
//                     </Grid>
//                 );
//             case 'meeting':
//                 return (
//                     <Grid container spacing={2}>
//                         <Grid size={{ xs: 12, sm: 4 }}>
//                             <TextField
//                                 fullWidth
//                                 size="small"
//                                 label="Meeting Date *"
//                                 type="datetime-local"
//                                 name="integrationDetails.date"
//                                 value={formik.values.integrationDetails?.date || ''}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 // error={!!(formik.touched.integrationDetails?.date && (formik.errors.integrationDetails as any)?.date)}
//                                 // helperText={formik.touched.integrationDetails?.date && (formik.errors.integrationDetails as any)?.date}
//                                 InputLabelProps={{ shrink: true }}
//                             />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 8 }}>
//                             <FormControl component="fieldset" sx={{ mt: 1 }}>
//                                 <Typography variant="subtitle2" sx={{ mb: 1 }}>
//                                     Meeting Type *
//                                 </Typography>
//                                 <RadioGroup row name="integrationDetails.meetingType" value={meetingType} onChange={handleMeetingTypeChange}>
//                                     {MEETING_TYPES.map((type) => (
//                                         <FormControlLabel
//                                             key={type.value}
//                                             value={type.value}
//                                             control={<Radio />}
//                                             label={
//                                                 <Box display="flex" alignItems="center">
//                                                     {type.icon}
//                                                     <Box ml={1}>{type.label}</Box>
//                                                 </Box>
//                                             }
//                                         />
//                                     ))}
//                                 </RadioGroup>
//                             </FormControl>
//                         </Grid>
//                         {(meetingType === 'office' || meetingType === 'other') && (
//                             <Grid size={{ xs: 12, sm: 12 }}>
//                                 <TextField
//                                     fullWidth
//                                     size="small"
//                                     label={meetingType === 'office' ? 'Office Location *' : 'Location Details *'}
//                                     name="integrationDetails.location"
//                                     value={formik.values.integrationDetails?.location || ''}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     // error={!!(formik.touched.integrationDetails?.location && (formik.errors.integrationDetails as any)?.location)}
//                                     // helperText={formik.touched.integrationDetails?.location && (formik.errors.integrationDetails as any)?.location}
//                                 />
//                             </Grid>
//                         )}
//                     </Grid>
//                 );
//             case 'other':
//                 return (
//                     <Grid container spacing={2}>
//                         <Grid size={{ xs: 12, sm: 12 }}>
//                             <TextField
//                                 fullWidth
//                                 size="small"
//                                 multiline
//                                 rows={3}
//                                 label="Details *"
//                                 name="integrationDetails.details"
//                                 value={formik.values.integrationDetails?.details || ''}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 // error={!!(formik.touched.integrationDetails?.details && (formik.errors.integrationDetails as any)?.details)}
//                                 // helperText={formik.touched.integrationDetails?.details && (formik.errors.integrationDetails as any)?.details}
//                             />
//                         </Grid>
//                     </Grid>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <Paper elevation={0} sx={{ p: 0, boxShadow: 'none' }}>
//             <MyButton variant="text" startIcon={<ArrowBackIosIcon />} onClick={() => history.back()}>
//                 Back to Leads
//             </MyButton>
//             <form onSubmit={formik.handleSubmit}>
//                 <Grid container spacing={3}>
//                     {/* Left Column - Contact Information */}
//                     <Grid size={{ xs: 12, sm: 12 }}>
//                         <Typography variant="h6" gutterBottom sx={{ fontWeight: '400', display: 'flex', alignItems: 'center', gap: 1 }}>
//                             <PersonIcon /> Contact Information
//                         </Typography>

//                         <Grid container spacing={2}>
//                             <Grid size={{ xs: 12, sm: 2 }}>
//                                 <TextField
//                                     fullWidth
//                                     size="small"
//                                     label="Full Name *"
//                                     name="manualData.name"
//                                     value={formik.values.manualData.name}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     error={!!(formik.touched.manualData?.name && formik.errors.manualData?.name)}
//                                     helperText={formik.touched.manualData?.name && (formik.errors.manualData as any)?.name}
//                                     InputProps={{
//                                         startAdornment: (
//                                             <InputAdornment position="start">
//                                                 <PersonIcon fontSize="small" />
//                                             </InputAdornment>
//                                         )
//                                     }}
//                                 />
//                             </Grid>

//                             <Grid size={{ xs: 12, sm: 2 }}>
//                                 <TextField
//                                     fullWidth
//                                     size="small"
//                                     label="Email *"
//                                     name="manualData.email"
//                                     value={formik.values.manualData.email}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     error={!!(formik.touched.manualData?.email && formik.errors.manualData?.email)}
//                                     helperText={formik.touched.manualData?.email && (formik.errors.manualData as any)?.email}
//                                     InputProps={{
//                                         startAdornment: (
//                                             <InputAdornment position="start">
//                                                 <EmailIcon fontSize="small" />
//                                             </InputAdornment>
//                                         )
//                                     }}
//                                 />
//                             </Grid>

//                             <Grid size={{ xs: 12, sm: 2 }}>
//                                 <Box>
//                                     <PhoneInput
//                                         country={'us'}
//                                         value={phoneNumber}
//                                         onChange={handlePhoneChange}
//                                         inputStyle={{ width: '100%' }}
//                                         inputProps={{
//                                             name: 'manualData.mobileNo',
//                                             onBlur: formik.handleBlur
//                                         }}
//                                     />
//                                     {formik.touched.manualData?.mobileNo && formik.errors.manualData?.mobileNo && (
//                                         <Typography variant="caption" color="error" display="block" sx={{ mt: 0.5, ml: 1.5 }}>
//                                             {(formik.errors.manualData as any)?.mobileNo}
//                                         </Typography>
//                                     )}
//                                 </Box>
//                             </Grid>

//                             <Grid size={{ xs: 12, sm: 2 }}>
//                                 <TextField
//                                     fullWidth
//                                     size="small"
//                                     label="Job Title"
//                                     name="manualData.jobTitle"
//                                     value={formik.values.manualData.jobTitle}
//                                     onChange={formik.handleChange}
//                                     InputProps={{
//                                         startAdornment: (
//                                             <InputAdornment position="start">
//                                                 <JobTitleIcon fontSize="small" />
//                                             </InputAdornment>
//                                         )
//                                     }}
//                                 />
//                             </Grid>

//                             <Grid size={{ xs: 12, sm: 2 }}>
//                                 <TextField
//                                     fullWidth
//                                     size="small"
//                                     label="Website"
//                                     name="manualData.website"
//                                     value={formik.values.manualData.website}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     error={!!(formik.touched.manualData?.website && formik.errors.manualData?.website)}
//                                     helperText={formik.touched.manualData?.website && (formik.errors.manualData as any)?.website}
//                                     InputProps={{
//                                         startAdornment: (
//                                             <InputAdornment position="start">
//                                                 <WebsiteIcon fontSize="small" />
//                                             </InputAdornment>
//                                         )
//                                     }}
//                                 />
//                             </Grid>

//                             <Grid size={{ xs: 12, sm: 2 }}>
//                                 <TextField
//                                     fullWidth
//                                     size="small"
//                                     label="Company Name *"
//                                     name="manualData.company"
//                                     value={formik.values.manualData.company}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     error={!!(formik.touched.manualData?.company && formik.errors.manualData?.company)}
//                                     helperText={formik.touched.manualData?.company && (formik.errors.manualData as any)?.company}
//                                     InputProps={{
//                                         startAdornment: (
//                                             <InputAdornment position="start">
//                                                 <BusinessIcon fontSize="small" />
//                                             </InputAdornment>
//                                         )
//                                     }}
//                                 />
//                             </Grid>
//                         </Grid>

//                         <Divider sx={{ my: 1 }} />
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 12 }}>
//                         <Typography variant="h6" gutterBottom sx={{ fontWeight: '400' }}>
//                             Lead Details
//                         </Typography>

//                         <Grid container spacing={2}>
//                             <Grid size={{ xs: 12, sm: 2 }}>
//                                 <LeadStatus leadStatus={leadStatus} onSelect={setLeadStatus} />
//                             </Grid>

//                             <Grid size={{ xs: 12, sm: 2 }}>
//                                 <LeadSource onSelect={setLeadSource} leadSource={leadSource} />
//                             </Grid>

//                             <Grid size={{ xs: 12, sm: 2 }}>
//                                 <TextField
//                                     fullWidth
//                                     size="small"
//                                     label={`Potential Value ${countryCode.toUpperCase()}`}
//                                     name="potentialValue"
//                                     type="number"
//                                     value={formik.values.potentialValue}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     error={!!(formik.touched.potentialValue && formik.errors.potentialValue)}
//                                     // helperText={formik.touched.potentialValue && formik.errors.potentialValue}
//                                     InputProps={{
//                                         startAdornment: <InputAdornment position="start">{countryCode.toUpperCase()}</InputAdornment>,
//                                         endAdornment: (
//                                             <InputAdornment position="end">
//                                                 <Typography variant="caption" color="textSecondary">
//                                                     {countryCode.toUpperCase()}
//                                                 </Typography>
//                                             </InputAdornment>
//                                         )
//                                     }}
//                                 />
//                             </Grid>

//                             <Grid size={{ xs: 12, sm: 2 }}>
//                                 <TextField fullWidth size="small" multiline rows={3} label="Notes" name="description" value={formik.values.description} onChange={formik.handleChange} />
//                             </Grid>
//                         </Grid>
//                     </Grid>

//                     {/* Right Column - Interaction & Assignment */}
//                     <Grid size={{ xs: 12, sm: 12 }}>
//                         <Typography variant="h6" gutterBottom sx={{ fontWeight: '400', display: 'flex', alignItems: 'center', gap: 1 }}>
//                             <MeetingIcon /> Interaction Details
//                         </Typography>

//                         <Grid container spacing={2}>
//                             <Grid size={{ xs: 12, sm: 12 }}>
//                                 <Typography variant="subtitle2" sx={{ mb: 1 }}>
//                                     Interaction Type *
//                                 </Typography>
//                             </Grid>
//                             <Grid size={{ xs: 12, sm: 12 }}>
//                                 <ButtonGroup>
//                                     {INTEGRATION_TYPES.map((type) => (
//                                         <Tooltip key={type.value} title={type.label}>
//                                             <MyButton
//                                                 size="small"
//                                                 variant={integrationType === type.value ? 'contained' : 'outlined'}
//                                                 startIcon={type.icon}
//                                                 onClick={() => {
//                                                     setIntegrationType(type.value);
//                                                     formik.setFieldValue('integrationType', type.value);
//                                                 }}
//                                             >
//                                                 {type?.label || integrationType}
//                                             </MyButton>
//                                         </Tooltip>
//                                     ))}
//                                 </ButtonGroup>
//                                 {formik.touched.integrationType && formik.errors.integrationType && (
//                                     <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
//                                         {/* {formik.errors.integrationType} */}
//                                     </Typography>
//                                 )}
//                             </Grid>

//                             {integrationType && <Grid size={{ xs: 12, sm: 6 }}>{renderIntegrationFields()}</Grid>}

//                             <Grid size={{ xs: 12, sm: 2}}>
//                                 <TextField
//                                     select
//                                     fullWidth
//                                     size="small"
//                                     label="Assign To *"
//                                     name="assignTo"
//                                     value={formik.values.assignTo}
//                                     onChange={formik.handleChange}
//                                     onBlur={formik.handleBlur}
//                                     error={!!(formik.touched.assignTo && formik.errors.assignTo)}
//                                     // helperText={formik.touched.assignTo && formik.errors.assignTo}
//                                 >
//                                     {UsersOptions?.map((option) => (
//                                         <MenuItem key={option.value || option.id} value={option.value || option.id}>
//                                             {option.label || option.name}
//                                         </MenuItem>
//                                     ))}
//                                 </TextField>
//                             </Grid>
//                         </Grid>

//                         {submitError && (
//                             <Typography color="error" sx={{ mt: 2 }}>
//                                 {submitError}
//                             </Typography>
//                         )}

//                         <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
//                             <MyButton variant="contained" color="primary" size="large" type="submit" disabled={!formik.isValid || isSubmitting}>
//                                 {isSubmitting ? 'Submitting...' : lead ? 'Update Lead' : 'Create Lead'}
//                             </MyButton>
//                         </Box>
//                     </Grid>
//                 </Grid>
//             </form>
//         </Paper>
//     );
// };

// export default LeadForm;
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
import { MyButton } from '../../../../Component/Buttons/Buttons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { LeadPost, UpdateLeadsByID } from '../../../../../../api/Leads';
import { MySnackbar } from '../../../../Component/Snackbar/Snackbar';

// Country-based potential values (example values)
const COUNTRY_POTENTIAL_VALUES: Record<string, number> = {
    us: 10000, // United States
    ca: 8000, // Canada
    gb: 9000, // United Kingdom
    au: 8500, // Australia
    in: 5000, // India
    // Add more countries as needed
    default: 6000 // Default value
};
type Severity = 'error' | 'warning' | 'info' | 'success';

const INTEGRATION_TYPES = [
    { value: 'email', label: 'Email', icon: <EmailIcon /> },
    { value: 'phone', label: 'Phone Call', icon: <PhoneIcon /> },
    { value: 'meeting', label: 'Meeting', icon: <MeetingIcon /> },
    { value: 'other', label: 'Other', icon: <MeetingIcon /> }
];

const MEETING_TYPES = [
    { value: 'offline', label: 'Offline', icon: <WifiOffIcon /> },
    { value: 'online', label: 'Online', icon: <OnlineIcon /> }
    // { value: 'other', label: 'Other', icon: <MeetingIcon /> }
];

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

    const handleMeetingTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setMeetingType(value);
        formik.setFieldValue('integrationDetails.meetingType', value);
    };

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
                email: Yup.string().email('Invalid email').required('Email is required'),
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
                    interactionType: interactionType,
                    potentialValue: values.potentialValue
                };

                if (!lead) {
                    const response = await LeadPost(subdomain, formData);
                    if (response.success) {
                        setSnackbarMessage(response.data.message);
                        setSnackbarOpen(true);
                        setSnackbarSeverity('success');
                        window.location.href = `/${subdomain}/leads`;
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
                        window.location.href = `/${subdomain}/leads`;
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

    const renderIntegrationFields = () => {
        switch (integrationType) {
            case 'email':
                return (
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField fullWidth size="small" label="Email Subject *" name="integrationDetails.subject" value={formik.values.integrationDetails?.subject || ''} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField fullWidth size="small" label="Priority" name="integrationDetails.priority" value={formik.values.integrationDetails?.priority || ''} onChange={formik.handleChange} select>
                                <MenuItem value="low">Low</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="high">High</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                );
            case 'phone':
                return (
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField fullWidth size="small" multiline rows={3} label="Call Notes *" name="integrationDetails.notes" value={formik.values.integrationDetails?.notes || ''} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        </Grid>
                    </Grid>
                );
            case 'meeting':
                return (
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 8 }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Meeting Date *"
                                type="datetime-local"
                                name="integrationDetails.date"
                                value={formik.values.integrationDetails?.date || ''}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <FormControl component="fieldset" sx={{ mt: 1 }}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    Meeting Type *
                                </Typography>
                                <RadioGroup row name="integrationDetails.meetingType" value={meetingType} onChange={handleMeetingTypeChange}>
                                    {MEETING_TYPES.map((type) => (
                                        <FormControlLabel
                                            key={type.value}
                                            value={type.value}
                                            control={<Radio />}
                                            label={
                                                <Box display="flex" alignItems="center">
                                                    {type.icon}
                                                    <Box ml={1}>{type.label}</Box>
                                                </Box>
                                            }
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        {(meetingType === 'office' || meetingType === 'other') && (
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    label={meetingType === 'office' ? 'Office Location *' : 'Location Details *'}
                                    name="integrationDetails.location"
                                    value={formik.values.integrationDetails?.location || ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </Grid>
                        )}
                    </Grid>
                );
            case 'other':
                return (
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 12 }}>
                            <TextField fullWidth size="small" multiline rows={3} label="Details *" name="integrationDetails.details" value={formik.values.integrationDetails?.details || ''} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        </Grid>
                    </Grid>
                );
            default:
                return null;
        }
    };

    return (
        <Paper elevation={0} sx={{ p: 0, boxShadow: 'none' }}>
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
                                    label="Email *"
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
                                    label="Company Name *"
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
                        </Grid>

                        <Divider sx={{ my: 1 }} />
                    </Grid>

                    {/* Right Column - Interaction & Assignment */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: '400', display: 'flex', alignItems: 'center', gap: 1 }}>
                            <MeetingIcon /> Interaction Details
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                    Interaction Type *
                                </Typography>
                            </Grid>
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <ButtonGroup>
                                    {INTEGRATION_TYPES.map((type) => (
                                        <Tooltip key={type.value} title={type.label}>
                                            <MyButton
                                                size="small"
                                                variant={integrationType === type.value ? 'contained' : 'outlined'}
                                                startIcon={type.icon}
                                                onClick={() => {
                                                    setIntegrationType(type.value);
                                                    formik.setFieldValue('integrationType', type.value);
                                                }}
                                            >
                                                {type?.label || integrationType}
                                            </MyButton>
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
                                    label="Assign To *"
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
                        </Grid>

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
        </Paper>
    );
};

export default LeadForm;
