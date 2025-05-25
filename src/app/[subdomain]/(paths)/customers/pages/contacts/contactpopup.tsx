// // // 'use client';
// // // import React, { useContext, useEffect, useRef, useState } from 'react';
// // // import axios from 'axios';
// // // import { API_BASE_URL } from '../../../../../utils';
// // // import Cookies from 'js-cookie';
// // // import { Col, Row } from 'react-bootstrap';
// // // import { Formik, Form, Field } from 'formik';
// // // import * as Yup from 'yup';
// // // import Swal from 'sweetalert2';
// // // import Contactsdetails from './Contactsdetails';
// // // import { InputText } from 'primereact/inputtext';
// // // import { InputSwitch } from 'primereact/inputswitch';
// // // import { Toast } from 'primereact/toast';
// // // import { Button } from 'primereact/button';
// // // import { useParams } from 'next/navigation';
// // // import userContext from '../../../../../UseContext/UseContext';
// // // import '../../../../../styles/popup.scss'; // Import the CSS file

// // // const validationSchema = Yup.object().shape({
// // //     firstName: Yup.string().required('First name is required'),
// // //     email: Yup.string().email('Invalid email').required('Email is required'),
// // //     mobileNo: Yup.string().required('Mobile number is required'),
// // //     position: Yup.string().required('Position is required')
// // // });

// // // export default function Popups({ fetchcontact, visible, setVisible }) {
// // //     const { singledata } = useContext(userContext);
// // //     const customerids = singledata._id;
// // //     const subdomain = Cookies.get('subdomain');
// // //     const accessToken = Cookies.get('accessToken');
// // //     const toast = useRef(null);
// // //     const [loading, setLoading] = useState(true);

// // //     useEffect(() => {
// // //         // Simulate a data fetching operation
// // //         setTimeout(() => {
// // //             setLoading(false);
// // //         }, 2000); // Simulate a 2-second loading time
// // //     }, []);

// // //     if (loading) {
// // //         return <div>Loading...............</div>;
// // //     }

// // //     const handleSubmit = async (values, { resetForm }) => {
// // //         const headers = { Authorization: `Bearer ${accessToken}` };

// // //         try {
// // //             await axios.post(`${API_BASE_URL}/contact/${subdomain}`, values, {
// // //                 headers
// // //             });
// // //             toast.current.show({
// // //                 severity: 'success',
// // //                 summary: 'Success!',
// // //                 detail: 'Your data has been submitted successfully.'
// // //             });
// // //             resetForm();
// // //             setVisible(false);
// // //             fetchcontact();
// // //         } catch (error) {
// // //             console.error('Error submitting form:', error);
// // //             toast.current.show({
// // //                 severity: 'error',
// // //                 summary: 'Error!',
// // //                 detail: 'There was an error submitting your data.'
// // //             });
// // //         }
// // //     };

// // //     return (
// // //         <div className="">
// // //             <Toast ref={toast} />
// // //             <div className=''>
// // //                 <Button className="btn1"  onClick={() => setVisible(true)}>
// // //                     <i className="pi pi-user-plus"></i>New Contact
// // //                 </Button>
// // //             </div>

// // //             {visible && (
// // //                 <div className="dialog-overlay">
// // //                     <div className="dialog-content">
// // //                         <span className="dialog-close" onClick={() => setVisible(false)}>
// // //                             &times;
// // //                         </span>

// // //                         <div>
// // //                             {' '}
// // //                             <h5>Contact Form</h5>
// // //                         </div>

// // //                         <Formik
// // //                             initialValues={{
// // //                                 position: '',
// // //                                 email: '',
// // //                                 mobileNo: '',
// // //                                 firstName: '',
// // //                                 lastName: '',
// // //                                 companyId: customerids,
// // //                                 description: '',
// // //                                 primaryContact: false,
// // //                                 notifications: {
// // //                                     email: {
// // //                                         invoice: false,
// // //                                         estimate: false,
// // //                                         project: false,
// // //                                         contract: false
// // //                                     }
// // //                                 }
// // //                             }}
// // //                             validationSchema={validationSchema}
// // //                             onSubmit={handleSubmit}
// // //                         >
// // //                             {({ setFieldValue }) => (
// // //                                 <Form>
// // //                                     <Row className="">
// // //                                         <Col md={6} className="mb-3">
// // //                                             <label htmlFor="firstName">First Name</label>
// // //                                             <br />
// // //                                             <Field name="firstName">{({ field, meta }) => <InputText {...field} required className={`${meta.touched && meta.error ? 'p-invalid' : ''} w-100`} />}</Field>
// // //                                         </Col>
// // //                                         <Col className="mb-3">
// // //                                             <label htmlFor="lastName">Last Name</label>
// // //                                             <br />
// // //                                             <Field name="lastName">{({ field }) => <InputText {...field} className="w-100" />}</Field>
// // //                                         </Col>
// // //                                     </Row>
// // //                                     <Row>
// // //                                         <Col className="mb-3">
// // //                                             <label htmlFor="email">Email</label>
// // //                                             <br />
// // //                                             <Field name="email">{({ field, meta }) => <InputText type="email" {...field} required className={`${meta.touched && meta.error ? 'p-invalid' : ''} w-100`} />}</Field>
// // //                                         </Col>
// // //                                         <Col className="mb-3">
// // //                                             <label htmlFor="mobileNo">Mobile No</label>
// // //                                             <br />
// // //                                             <Field name="mobileNo">{({ field, meta }) => <InputText {...field} required className={`${meta.touched && meta.error ? 'p-invalid' : ''} w-100`} />}</Field>
// // //                                         </Col>
// // //                                     </Row>
// // //                                     <Row>
// // //                                         <Col className="mb-3">
// // //                                             <label htmlFor="position">Position</label>
// // //                                             <br />
// // //                                             <Field name="position">{({ field, meta }) => <InputText {...field} required className={`${meta.touched && meta.error ? 'p-invalid' : ''} w-100`} />}</Field>
// // //                                         </Col>
// // //                                         <Col className="mb-3">
// // //                                             <label htmlFor="description">Description</label>
// // //                                             <br />
// // //                                             <Field name="description">{({ field }) => <InputText {...field} className="w-100" />}</Field>
// // //                                         </Col>
// // //                                     </Row>
// // //                                     <Row>
// // //                                         <Col>
// // //                                             <label>Notifications:</label>
// // //                                             <div className="d-flex flex-column flex-md-row justify-content-between">
// // //                                                 {['invoice', 'estimate', 'project', 'contract'].map((type) => (
// // //                                                     <div key={type} className="d-flex mt-2 align-items-center">
// // //                                                         <label className="p-2">{type.charAt(0).toUpperCase() + type.slice(1)}:</label>
// // //                                                         <Field name={`notifications.email.${type}`}>
// // //                                                             {({ field }) => <InputSwitch inputId={type} className="p-2" checked={field.value} onChange={() => setFieldValue(`notifications.email.${type}`, !field.value)} />}
// // //                                                         </Field>
// // //                                                     </div>
// // //                                                 ))}
// // //                                             </div>
// // //                                         </Col>
// // //                                     </Row>
// // //                                     <Col>
// // //                                         <Button type="submit" className="btn-all">
// // //                                             Submit
// // //                                         </Button>
// // //                                     </Col>
// // //                                 </Form>
// // //                             )}
// // //                         </Formik>
// // //                     </div>
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // }

// // 'use client';
// // import React, { useContext, useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { API_BASE_URL } from '../../../../../utils';
// // import Cookies from 'js-cookie';
// // import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, Grid, IconButton, Switch, TextField, Typography } from '@mui/material';
// // import { Formik, Form, Field, useFormik } from 'formik';
// // import * as Yup from 'yup';
// // import Swal from 'sweetalert2';
// // import { Close, PersonAdd } from '@mui/icons-material';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import userContext from '../../../../../UseContext/UseContext';
// // import '../../../../../styles/popup.scss';

// // interface FormValues {
// //     position: string;
// //     email: string;
// //     mobileNo: string;
// //     firstName: string;
// //     lastName: string;
// //     companyId: string;
// //     description: string;
// //     primaryContact: boolean;
// //     notifications: {
// //         email: {
// //             invoice: boolean;
// //             estimate: boolean;
// //             project: boolean;
// //             contract: boolean;
// //         };
// //     };
// // }

// // interface PopupsProps {
// //     fetchcontact: () => void;
// //     visible: boolean;
// //     setVisible: (visible: boolean) => void;
// // }

// // const validationSchema = Yup.object().shape({
// //     firstName: Yup.string().required('First name is required'),
// //     email: Yup.string().email('Invalid email').required('Email is required'),
// //     mobileNo: Yup.string().required('Mobile number is required'),
// //     position: Yup.string().required('Position is required')
// // });

// // const Popups: React.FC<PopupsProps> = ({ fetchcontact, visible, setVisible }) => {
// //     const { singledata } = useContext(userContext);
// //     const customerids = singledata._id;
// //     const subdomain = Cookies.get('subdomain') || '';
// //     const accessToken = Cookies.get('accessToken') || '';
// //     const [loading, setLoading] = useState(true);

// //     useEffect(() => {
// //         setTimeout(() => {
// //             setLoading(false);
// //         }, 2000);
// //     }, []);

// //     const initialValues: FormValues = {
// //         position: '',
// //         email: '',
// //         mobileNo: '',
// //         firstName: '',
// //         lastName: '',
// //         companyId: customerids,
// //         description: '',
// //         primaryContact: false,
// //         notifications: {
// //             email: {
// //                 invoice: false,
// //                 estimate: false,
// //                 project: false,
// //                 contract: false
// //             }
// //         }
// //     };

// //     const handleSubmit = async (values: FormValues, { resetForm }: { resetForm: () => void }) => {
// //         const headers = { Authorization: `Bearer ${accessToken}` };

// //         try {
// //             await axios.post(`${API_BASE_URL}/contact/${subdomain}`, values, { headers });
// //             toast.success('Your data has been submitted successfully.');
// //             resetForm();
// //             setVisible(false);
// //             fetchcontact();
// //         } catch (error) {
// //             console.error('Error submitting form:', error);
// //             toast.error('There was an error submitting your data.');
// //         }
// //     };

// //     if (loading) {
// //         return (
// //             <Box display="flex" justifyContent="center" alignItems="center" height="100px">
// //                 <Typography>Loading...</Typography>
// //             </Box>
// //         );
// //     }

// //     return (
// //         <Box>
// //             <ToastContainer position="top-right" autoClose={3000} />

// //             <Button variant="contained" startIcon={<PersonAdd />} onClick={() => setVisible(true)} sx={{ mb: 2 }}>
// //                 New Contact
// //             </Button>

// //             <Dialog
// //                 open={visible}
// //                 onClose={() => setVisible(false)}
// //                 maxWidth="md"
// //                 fullWidth
// //                 PaperProps={{
// //                     sx: {
// //                         borderRadius: '12px',
// //                         padding: '20px'
// //                     }
// //                 }}
// //             >
// //                 <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
// //                     <Typography variant="h6">Contact Form</Typography>
// //                     <IconButton onClick={() => setVisible(false)}>
// //                         <Close />
// //                     </IconButton>
// //                 </DialogTitle>

// //                 <DialogContent>
// //                     <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
// //                         {({ values, errors, touched, handleChange, setFieldValue }) => (
// //                             <Form>
// //                                 <Grid container spacing={2}>
// //                                     <Grid size={{ xs: 12, md: 6 }}>
// //                                         <FormControl fullWidth margin="normal">
// //                                             <TextField
// //                                                 name="firstName"
// //                                                 label="First Name"
// //                                                 value={values.firstName}
// //                                                 onChange={handleChange}
// //                                                 error={touched.firstName && Boolean(errors.firstName)}
// //                                                 helperText={touched.firstName && errors.firstName}
// //                                                 required
// //                                                 fullWidth
// //                                             />
// //                                         </FormControl>
// //                                     </Grid>
// //                                     <Grid size={{ xs: 12, md: 6 }}>
// //                                         <FormControl fullWidth margin="normal">
// //                                             <TextField name="lastName" label="Last Name" value={values.lastName} onChange={handleChange} fullWidth />
// //                                         </FormControl>
// //                                     </Grid>
// //                                     <Grid size={{ xs: 12, md: 6 }}>
// //                                         <FormControl fullWidth margin="normal">
// //                                             <TextField
// //                                                 name="email"
// //                                                 label="Email"
// //                                                 type="email"
// //                                                 value={values.email}
// //                                                 onChange={handleChange}
// //                                                 error={touched.email && Boolean(errors.email)}
// //                                                 helperText={touched.email && errors.email}
// //                                                 required
// //                                                 fullWidth
// //                                             />
// //                                         </FormControl>
// //                                     </Grid>
// //                                     <Grid size={{ xs: 12, md: 6 }}>
// //                                         <FormControl fullWidth margin="normal">
// //                                             <TextField
// //                                                 name="mobileNo"
// //                                                 label="Mobile No"
// //                                                 value={values.mobileNo}
// //                                                 onChange={handleChange}
// //                                                 error={touched.mobileNo && Boolean(errors.mobileNo)}
// //                                                 helperText={touched.mobileNo && errors.mobileNo}
// //                                                 required
// //                                                 fullWidth
// //                                             />
// //                                         </FormControl>
// //                                     </Grid>
// //                                     <Grid size={{ xs: 12, md: 6 }}>
// //                                         <FormControl fullWidth margin="normal">
// //                                             <TextField
// //                                                 name="position"
// //                                                 label="Position"
// //                                                 value={values.position}
// //                                                 onChange={handleChange}
// //                                                 error={touched.position && Boolean(errors.position)}
// //                                                 helperText={touched.position && errors.position}
// //                                                 required
// //                                                 fullWidth
// //                                             />
// //                                         </FormControl>
// //                                     </Grid>
// //                                     <Grid size={{ xs: 12, md: 6 }}>
// //                                         <FormControl fullWidth margin="normal">
// //                                             <TextField name="description" label="Description" value={values.description} onChange={handleChange} fullWidth />
// //                                         </FormControl>
// //                                     </Grid>
// //                                     <Grid size={{ xs: 12, md: 6 }}>
// //                                         <Typography variant="subtitle1" gutterBottom>
// //                                             Notifications:
// //                                         </Typography>
// //                                         <Grid container spacing={2}>
// //                                             {['invoice', 'estimate', 'project', 'contract'].map((type) => (
// //                                                 <Grid size={{ xs: 12, md: 6 }} key={type}>
// //                                                     <Box display="flex" alignItems="center">
// //                                                         <Typography variant="body2" sx={{ mr: 1 }}>
// //                                                             {type.charAt(0).toUpperCase() + type.slice(1)}:
// //                                                         </Typography>
// //                                                         <Switch
// //                                                             checked={values.notifications.email[type as keyof typeof values.notifications.email]}
// //                                                             onChange={() => setFieldValue(`notifications.email.${type}`, !values.notifications.email[type as keyof typeof values.notifications.email])}
// //                                                             color="primary"
// //                                                         />
// //                                                     </Box>
// //                                                 </Grid>
// //                                             ))}
// //                                         </Grid>
// //                                     </Grid>
// //                                     <Grid size={{ xs: 12, md: 6 }}>
// //                                         <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
// //                                             Submit
// //                                         </Button>
// //                                     </Grid>
// //                                 </Grid>
// //                             </Form>
// //                         )}
// //                     </Formik>
// //                 </DialogContent>
// //             </Dialog>
// //         </Box>
// //     );
// // };

// // export default Popups;
// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { API_BASE_URL } from '../../../../../utils';
// import Cookies from 'js-cookie';
// import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Switch, FormControlLabel, Typography, Avatar, IconButton, CircularProgress } from '@mui/material';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Close, CloudUpload } from '@mui/icons-material';

// interface ContactFormValues {
//     position: string;
//     email: string;
//     mobileNo: string;
//     firstName: string;
//     lastName: string;
//     companyId: string;
//     description: string;
//     primaryContact: boolean;
//     contactProfile?: File | string | null;
//     notifications: {
//         email: {
//             invoice: boolean;
//             estimate: boolean;
//             project: boolean;
//             contract: boolean;
//         };
//     };
// }

// interface ContactFormProps {
//     open: boolean;
//     onClose: () => void;
//     fetchData: () => void;
//     contactId?: string | null;
//     selectedContactId?: string;
// }

// const validationSchema = Yup.object().shape({
//     firstName: Yup.string().required('First name is required'),
//     lastName: Yup.string().required('Last name is required'),
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     mobileNo: Yup.string().required('Mobile number is required'),
//     position: Yup.string().required('Position is required'),
//     // companyId: Yup.string().required('Company ID is required')
// });

// const ContactForm: React.FC<any> = ({ open, onClose, fetchData, contactId, selectedContactId }) => {
//     const subdomain = Cookies.get('subdomain') || '';
//     const accessToken = Cookies.get('accessToken') || '';
//     const [imagePreview, setImagePreview] = useState<string | null>(null);
//     const [isLoading, setIsLoading] = useState(false);

//     const initialValues: ContactFormValues = {
//         position: selectedContactId?.position || '',
//         email: selectedContactId?.email || '',
//         mobileNo: selectedContactId?.mobileNo || '',
//         firstName: selectedContactId?.firstName || '',
//         // firstName: '',
//         lastName: selectedContactId?.lastName || '',
//         companyId: selectedContactId?._id || '',
//         description: selectedContactId?.description || '',
//         primaryContact: selectedContactId?.primaryContact || false,
//         contactProfile: selectedContactId?.contactProfile || null,
//         notifications: {
//             email: {
//                 invoice: false,
//                 estimate: false,
//                 project: false,
//                 contract: false
//             }
//         }
//     };
//     useEffect(() => {
//         if (selectedContactId) {
//             formik.setValues({
//                 ...initialValues,
//                 companyId: selectedContactId._id,
//                 notifications: {
//                     email: {
//                         invoice: selectedContactId.notifications?.email?.invoice || false,
//                         estimate: selectedContactId.notifications?.email?.estimate || false,
//                         project: selectedContactId.notifications?.email?.project || false,
//                         contract: selectedContactId.notifications?.email?.contract || false
//                     }
//                 }
//             });
//         }
//     }, [selectedContactId]);
//     const formik = useFormik({
//         initialValues,
//         validationSchema,
//         onSubmit: async (values) => {
//             setIsLoading(true);
//             const formData = new FormData();

//             // Append all form values
//             Object.keys(values).forEach((key) => {
//                 if (key === 'notifications') {
//                     formData.append(key, JSON.stringify(values[key]));
//                 } else if (key === 'contactProfile' && values[key] instanceof File) {
//                     formData.append(key, values[key] as File);
//                 } else if (key !== 'contactProfile') {
//                     formData.append(key, values[key] as string);
//                 }
//             });

//             try {
//                 const headers = {
//                     Authorization: `Bearer ${accessToken}`
//                 };

//                 if (selectedContactId) {
//                     // Update existing contact
//                     await axios.patch(`${API_BASE_URL}/contact/${subdomain}/${selectedContactId._id}`, formData, { headers });
//                     toast.success('Contact updated successfully');
//                 } else {
//                     // Create new contact
//                     await axios.post(`${API_BASE_URL}/contact/${subdomain}`, formData, { headers });
//                     toast.success('Contact created successfully');
//                 }

//                 fetchData();
//                 onClose();
//             } catch (error) {
//                 console.error('Error submitting form:', error);
//                 toast.error(`Failed to ${selectedContactId._id ? 'update' : 'create'} contact`);
//             } finally {
//                 setIsLoading(false);
//             }
//         }
//     });

//     // useEffect(() => {
//     //     const fetchContactData = async () => {
//     //         if (!contactId) {
//     //             // Reset form for new contact
//     //             formik.resetForm();
//     //             setImagePreview(null);
//     //             if (selectedContactId) {
//     //                 formik.setFieldValue('companyId', selectedContactId);
//     //             }
//     //             return;
//     //         }

//     //         setIsLoading(true);
//     //         try {
//     //             const headers = { Authorization: `Bearer ${accessToken}` };
//     //             const res = await axios.get(`${API_BASE_URL}/contact/${subdomain}/${contactId}`, { headers });
//     //             const contactData = res?.data?.data?.contact;

//     //             formik.setValues({
//     //                 position: contactData.position || '',
//     //                 email: contactData.email || '',
//     //                 mobileNo: contactData.mobileNo || '',
//     //                 firstName: contactData.firstName || '',
//     //                 lastName: contactData.lastName || '',
//     //                 companyId: contactData.companyId || selectedContactId || '',
//     //                 description: contactData.description || '',
//     //                 primaryContact: contactData.primaryContact || false,
//     //                 contactProfile: contactData.contactProfile || null,
//     //                 notifications: {
//     //                     email: {
//     //                         invoice: contactData.notifications?.email?.invoice || false,
//     //                         estimate: contactData.notifications?.email?.estimate || false,
//     //                         project: contactData.notifications?.email?.project || false,
//     //                         contract: contactData.notifications?.email?.contract || false
//     //                     }
//     //                 }
//     //             });

//     //             if (contactData.contactProfile) {
//     //                 setImagePreview(contactData.contactProfile);
//     //             }
//     //         } catch (error) {
//     //             console.error('Error fetching contact data:', error);
//     //             toast.error('Failed to load contact data');
//     //         } finally {
//     //             setIsLoading(false);
//     //         }
//     //     };

//     //     if (open) {
//     //         fetchContactData();
//     //     }
//     // }, []);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files[0]) {
//             const file = event.target.files[0];
//             formik.setFieldValue('contactProfile', file);

//             const reader = new FileReader();
//             reader.onload = () => {
//                 setImagePreview(reader.result as string);
//             };
//             reader.readAsDataURL(file);
//         }
//     };

//     const removeImage = () => {
//         formik.setFieldValue('contactProfile', null);
//         setImagePreview(null);
//     };
//     console.log(selectedContactId, 'initialCompanyId');

//     return (
//         <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
//             <DialogTitle>
//                 <Box display="flex" justifyContent="space-between" alignItems="center">
//                     <Typography variant="h6">{selectedContactId ? 'Edit Contact' : 'Create New Contact'}</Typography>
//                     <IconButton onClick={onClose}>
//                         <Close />
//                     </IconButton>
//                 </Box>
//             </DialogTitle>

//             <DialogContent dividers>
//                 {isLoading ? (
//                     <Box display="flex" justifyContent="center" my={4}>
//                         <CircularProgress />
//                     </Box>
//                 ) : (
//                     <form onSubmit={formik.handleSubmit}>
//                         <Box mb={3}>
//                             <Typography variant="subtitle1" gutterBottom>
//                                 Profile Picture
//                             </Typography>
//                             <Box display="flex" alignItems="center" gap={2}>
//                                 <Avatar src={imagePreview || undefined} sx={{ width: 80, height: 80 }} />
//                                 <Box>
//                                     <input accept="image/*" id="contactProfile" name="contactProfile" type="file" style={{ display: 'none' }} onChange={handleFileChange} />
//                                     <label htmlFor="contactProfile">
//                                         <Button variant="outlined" component="span" startIcon={<CloudUpload />}>
//                                             Upload
//                                         </Button>
//                                     </label>
//                                     {imagePreview && (
//                                         <Button color="error" onClick={removeImage} sx={{ ml: 1 }}>
//                                             Remove
//                                         </Button>
//                                     )}
//                                 </Box>
//                             </Box>
//                         </Box>

//                         <Box display="grid" gridTemplateColumns="repeat(2, 1fr)" gap={3} mb={3}>
//                             <TextField
//                                 fullWidth
//                                 id="firstName"
//                                 name="firstName"
//                                 label="First Name"
//                                 value={formik.values.firstName}
//                                 onChange={formik.handleChange}
//                                 error={formik.touched.firstName && Boolean(formik.errors.firstName)}
//                                 helperText={formik.touched.firstName && formik.errors.firstName}
//                             />
//                             <TextField
//                                 fullWidth
//                                 id="lastName"
//                                 name="lastName"
//                                 label="Last Name"
//                                 value={formik.values.lastName}
//                                 onChange={formik.handleChange}
//                                 error={formik.touched.lastName && Boolean(formik.errors.lastName)}
//                                 helperText={formik.touched.lastName && formik.errors.lastName}
//                             />
//                             <TextField
//                                 fullWidth
//                                 id="email"
//                                 name="email"
//                                 label="Email"
//                                 type="email"
//                                 value={formik.values.email}
//                                 onChange={formik.handleChange}
//                                 error={formik.touched.email && Boolean(formik.errors.email)}
//                                 helperText={formik.touched.email && formik.errors.email}
//                             />
//                             <TextField
//                                 fullWidth
//                                 id="mobileNo"
//                                 name="mobileNo"
//                                 label="Mobile Number"
//                                 value={formik.values.mobileNo}
//                                 onChange={formik.handleChange}
//                                 error={formik.touched.mobileNo && Boolean(formik.errors.mobileNo)}
//                                 helperText={formik.touched.mobileNo && formik.errors.mobileNo}
//                             />
//                             <TextField
//                                 fullWidth
//                                 id="position"
//                                 name="position"
//                                 label="Position"
//                                 value={formik.values.position}
//                                 onChange={formik.handleChange}
//                                 error={formik.touched.position && Boolean(formik.errors.position)}
//                                 helperText={formik.touched.position && formik.errors.position}
//                             />
//                             {/* <TextField
//                                 fullWidth
//                                 id="companyId"
//                                 name="companyId"
//                                 label="Company ID"
//                                 value={formik.values.companyId}
//                                 onChange={formik.handleChange}
//                                 error={formik.touched.companyId && Boolean(formik.errors.companyId)}
//                                 helperText={formik.touched.companyId && formik.errors.companyId}
//                                 disabled={!!selectedContactId}
//                             /> */}
//                         </Box>

//                         <Box mb={3}>
//                             <TextField fullWidth id="description" name="description" label="Description" multiline rows={4} value={formik.values.description} onChange={formik.handleChange} />
//                         </Box>

//                         <Box mb={3}>
//                             <FormControlLabel control={<Switch checked={formik.values.primaryContact} onChange={(e) => formik.setFieldValue('primaryContact', e.target.checked)} color="primary" />} label="Primary Contact" />
//                         </Box>

//                         <Box mb={3}>
//                             <Typography variant="subtitle1" gutterBottom>
//                                 Email Notifications
//                             </Typography>
//                             <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" gap={2}>
//                                 {['invoice', 'estimate', 'project', 'contract'].map((type) => (
//                                     <FormControlLabel
//                                         key={type}
//                                         control={
//                                             <Switch
//                                                 checked={formik.values.notifications.email[type as keyof typeof formik.values.notifications.email]}
//                                                 onChange={(e) => formik.setFieldValue(`notifications.email.${type}`, e.target.checked)}
//                                                 color="primary"
//                                             />
//                                         }
//                                         label={type.charAt(0).toUpperCase() + type.slice(1)}
//                                     />
//                                 ))}
//                             </Box>
//                         </Box>
//                     </form>
//                 )}
//             </DialogContent>

//             <DialogActions>
//                 <Button onClick={onClose} color="secondary">
//                     Cancel
//                 </Button>
//                 <Button onClick={() => formik.handleSubmit()} color="primary" variant="contained" disabled={isLoading}>
//                     {isLoading ? <CircularProgress size={24} /> : contactId ? 'Update Contact' : 'Create Contact'}
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default ContactForm;
import React from 'react'

export default function contactpopup() {
  return (
    <div>contactpopup</div>
  )
}
