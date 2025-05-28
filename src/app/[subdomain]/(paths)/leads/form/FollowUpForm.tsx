// // import React, { useState, useEffect, useMemo } from 'react';
// // import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Grid, Box } from '@mui/material';
// // import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// // import { MyButton } from '../../../../Component/Buttons/Buttons';
// // import { createFollowupdata, GetFollowupStatus, GetStatus, UpdateFollowupdata } from '../../../../../../api/Leads';
// // import Cookies from 'js-cookie';
// // import { propTypes } from 'react-bootstrap/esm/Image';
// // // import { useToast } from '@/hooks/use-toast';

// // interface FollowUp {
// //     // followUps: [
// //     // {
// //     id?: string;
// //     title?: string;
// //     notes: string;
// //     dueDate: any;
// //     followUpDate?: any;
// //     status?: 'completed' | 'pending' | 'overdue' | 'scheduled';
// //     priority?: 'high' | 'medium' | 'low';
// //     assignTo?: string;
// //     type?: 'call' | 'meeting' | 'email' | 'whatsapp' | 'visit' | 'other';
// //     isSetTimer?: boolean;
// //     dateTime?: string;
// //     outcome?: string;
// //     leadId?: any;
// //     createdAt?: any;
// //     // }
// //     // ];
// // }

// // interface FollowUpFormProps {
// //     open: boolean;
// //     onOpenChange: (open: boolean) => void;
// //     leadId: any;
// //     followUp?: any;
// //     UsersOptions: any;
// // }

// // interface LeadStatus {
// //     _id: string;
// //     StatusName: string;
// //     color: string;
// // }
// // const defaultFollowUp: Partial<FollowUp> = {
// //     title: '',
// //     type: 'call',
// //     notes: '',
// //     priority: 'medium',
// //     status: 'scheduled'
// // };

// // const FollowUpForm = ({ open, onOpenChange, leadId, followUp, UsersOptions }: FollowUpFormProps) => {
// //     // const { toast } = useToast();
// //     console.log(followUp, 'followUp');
// //     const lastFollowUp = Array.isArray(followUp) ? followUp[followUp.length - 1] : followUp;
// //     const [formData, setFormData] = useState<Partial<FollowUp>>({
// //         ...defaultFollowUp
// //     });
// //     const [dueDate, setDueDate] = useState<any | null>(null);
// //     const [reminderDate, setReminderDate] = useState<any | null>(null);
// //     const [statuses, setStatuses] = useState<LeadStatus[]>([]);
// //     const [isSubmitting, setIsSubmitting] = useState(false);
// //     const [types, setTypes] = useState([]);
// //     const [reminderEnabled, setReminderEnabled] = useState(false);
// //     const subdomain = Cookies.get('subdomain');
// //     const isEditMode = !!followUp?.id;

// //     useEffect(() => {
// //         if (followUp) {
// //             setFormData({
// //                 title: lastFollowUp?.title || '',
// //                 type: lastFollowUp?.type?._id || 'call',
// //                 notes: lastFollowUp?.notes || '',
// //                 priority: lastFollowUp?.priority || 'medium',
// //                 status: lastFollowUp?.status.StatusName._id || 'scheduled',
// //                 assignTo: lastFollowUp?.assignTo?._id || ''
// //             });
// //             setDueDate(lastFollowUp?.dueDate ? new Date(lastFollowUp.dueDate) : null);
// //             setReminderEnabled(!!lastFollowUp?.isSettimer);
// //             setReminderDate(lastFollowUp?.followUpDate ? new Date(lastFollowUp.followUpDate) : null);
// //         } else {
// //             setFormData({ ...defaultFollowUp, leadId });
// //             setDueDate(null);
// //             setReminderEnabled(false);
// //             setReminderDate(null);
// //         }
// //     }, [followUp, leadId]);

// //     const fetchData = async () => {
// //         const response = await GetFollowupStatus(subdomain);
// //         console.log(response.data, 'response ');
// //         setTypes(response.data);
// //     };

// //     const fetchStatuses = async () => {
// //         // setLoading(true);
// //         try {
// //             const res = await GetStatus(subdomain);
// //             setStatuses(res.data);
// //         } catch (err) {
// //             console.error(err);
// //             // showSnackbar('Failed to fetch statuses', 'error');
// //         } finally {
// //             // setLoading(false);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchStatuses();
// //     }, []);

// //     const statusesOptions = useMemo(
// //         () =>
// //             statuses?.map((lead) => ({
// //                 label: lead.StatusName,
// //                 value: lead._id,
// //                 color: lead.color
// //             })),
// //         [statuses]
// //     );

// //     useEffect(() => {
// //         fetchData();
// //     }, []);
// //     const usersType = useMemo(
// //         () =>
// //             types?.map((type) => ({
// //                 label: type.typeName,
// //                 value: type._id
// //             })),
// //         [types]
// //     );

// //     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //         const { name, value } = e.target;
// //         setFormData((prev) => ({ ...prev, [name]: value }));
// //     };

// //     const handleSelectChange = (name: string, value: string) => {
// //         setFormData((prev) => ({ ...prev, [name]: value }));
// //     };

// //     const handleSubmit = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         setIsSubmitting(true);

// //         // Validate form
// //         // if (!formData.title || !dueDate) {
// //         //     // toast({
// //         //     //     title: 'Missing required fields',
// //         //     //     description: 'Please fill in all required fields',
// //         //     //     variant: 'destructive'
// //         //     // });
// //         //     setIsSubmitting(false);
// //         //     return;
// //         // }

// //         // Prepare data for submission
// //         // id: followUp?.id || String(Date.now()),
// //         // leadId,
// //         const followUpData = {
// //             followUp? ( {
// //                     title: formData.title!,
// //                     type: formData.type as FollowUp['type'],
// //                     notes: formData.notes,
// //                     dueDate: dueDate?.toISOString(),
// //                     priority: formData.priority as FollowUp['priority'],
// //                     status: formData.status as FollowUp['status'],
// //                     // createdAt: followUp?.createdAt || new Date().toISOString(),
// //                     assignTo: formData.assignTo,
// //                     outcome: formData.outcome,
// //                     isSetTimer: reminderEnabled,
// //                     dateTime: reminderEnabled && reminderDate ? reminderDate.toISOString() : undefined
// //                 }):(
// //                     followUps: [
// //                         {
// //                             title: formData.title!,
// //                             type: formData.type as FollowUp['type'],
// //                             notes: formData.notes,
// //                             dueDate: dueDate?.toISOString(),
// //                             priority: formData.priority as FollowUp['priority'],
// //                             status: formData.status as FollowUp['status'],
// //                             // createdAt: followUp?.createdAt || new Date().toISOString(),
// //                             assignTo: formData.assignTo,
// //                             outcome: formData.outcome,
// //                             isSetTimer: reminderEnabled,
// //                             dateTime: reminderEnabled && reminderDate ? reminderDate.toISOString() : undefined
// //                         }
// //                     ]
// //                 )
// //         };

// //         if (followUp) {
// //             const response = await UpdateFollowupdata(subdomain, leadId, followUpData, followUp._id);
// //             if (response) {
// //                 console.log(response, 'response');
// //             }
// //         } else {
// //             const response = await createFollowupdata(subdomain, leadId, followUpData);
// //             if (response) {
// //                 console.log(response, 'response');
// //             }
// //         }
// //         // const handleFollowup = async () => {

// //         // };
// //         // console.log(followUpData);

// //         // Simulate API request
// //         setTimeout(() => {
// //             // toast({
// //             //     title: isEditMode ? 'Follow-up updated' : 'Follow-up created',
// //             //     description: isEditMode ? 'Your follow-up has been updated successfully.' : 'Your follow-up has been scheduled successfully.'
// //             // });
// //             setIsSubmitting(false);
// //             onOpenChange(false);
// //         }, 800);
// //     };

// //     const handleCancel = () => {
// //         onOpenChange(false);
// //     };

// //     return (
// //         <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
// //             <DialogTitle>{isEditMode ? 'Edit Follow-Up' : 'Add New Follow-Up'}</DialogTitle>
// //             <DialogContent>
// //                 <form onSubmit={handleSubmit}>
// //                     <Grid container spacing={2} sx={{ mt: 4 }}>
// //                         <Grid size={{ xs: 12, sm: 6 }}>
// //                             <TextField fullWidth label="Title" size="small" name="title" value={formData.title} onChange={handleInputChange} required />
// //                         </Grid>
// //                         <Grid size={{ xs: 12, sm: 6 }}>
// //                             <FormControl fullWidth size="small">
// //                                 {/* <InputLabel>Type</InputLabel> */}
// //                                 {/* <Select value={formData.type} onChange={(e) => handleSelectChange('type', e.target.value)} label="Type">
// //                                     <MenuItem value="call">Call</MenuItem>
// //                                     <MenuItem value="meeting">Meeting</MenuItem>
// //                                     <MenuItem value="email">Email</MenuItem>
// //                                     <MenuItem value="whatsapp">WhatsApp</MenuItem>
// //                                     <MenuItem value="visit">Visit</MenuItem>
// //                                     <MenuItem value="other">Other</MenuItem>
// //                                 </Select> */}
// //                                 <TextField
// //                                     select
// //                                     fullWidth
// //                                     size="small"
// //                                     label="Type"
// //                                     name="type"
// //                                     value={formData.type}
// //                                     onChange={(e) => handleSelectChange('type', e.target.value)}
// //                                     // onBlur={formik.handleBlur}
// //                                     // error={!!(formik.touched.assignTo && formik.errors.assignTo)}
// //                                     // helperText={formik.touched.assignTo && formik.errors.assignTo}
// //                                 >
// //                                     {usersType?.map((option) => (
// //                                         <MenuItem key={option.value} value={option.value}>
// //                                             {option.label}
// //                                         </MenuItem>
// //                                     ))}
// //                                 </TextField>
// //                             </FormControl>
// //                         </Grid>
// //                         <Grid size={{ xs: 12, sm: 6 }}>
// //                             <LocalizationProvider dateAdapter={AdapterDateFns}>
// //                                 {/* <DatePicker label="Due Date" value={dueDate} onChange={(newValue) => setDueDate(newValue)} renderInput={(params) => <TextField size="small" {...params} fullWidth required />} /> */}
// //                                 <DatePicker
// //                                     label="Due Date"
// //                                     value={dueDate}
// //                                     onChange={(newValue) => setDueDate(newValue)}
// //                                     enableAccessibleFieldDOMStructure={false}
// //                                     slots={{ textField: TextField }}
// //                                     slotProps={{ textField: { size: 'small', fullWidth: true, required: true } }}
// //                                 />
// //                             </LocalizationProvider>
// //                         </Grid>
// // <Grid size={{ xs: 12, sm: 6 }}>
// //     <FormControl fullWidth size="small">
// //         <InputLabel>Priority</InputLabel>
// //         <Select value={formData.priority} onChange={(e) => handleSelectChange('priority', e.target.value)} label="Priority">
// //             <MenuItem value="low">Low</MenuItem>
// //             <MenuItem value="medium">Medium</MenuItem>
// //             <MenuItem value="high">High</MenuItem>
// //         </Select>
// //     </FormControl>
// // </Grid>
// //                         <Grid size={{ xs: 12, sm: 6 }}>
// //                             <FormControl fullWidth size="small">
// //                                 {/* <InputLabel>Status</InputLabel>
// //                                 <Select value={formData.status} onChange={(e) => handleSelectChange('status', e.target.value)} label="Status">
// //                                     <MenuItem value="scheduled">Scheduled</MenuItem>
// //                                     <MenuItem value="completed">Completed</MenuItem>
// //                                     <MenuItem value="missed">Missed</MenuItem>
// //                                 </Select> */}
// //                                 <TextField
// //                                     select
// //                                     fullWidth
// //                                     size="small"
// //                                     label="Status"
// //                                     name="status"
// //                                     value={formData.status}
// //                                     onChange={(e) => handleSelectChange('status', e.target.value)}
// //                                     // onBlur={formik.handleBlur}
// //                                     // error={!!(formik.touched.assignTo && formik.errors.assignTo)}
// //                                     // helperText={formik.touched.assignTo && formik.errors.assignTo}
// //                                 >
// //                                     {statusesOptions.map((option) => (
// //                                         <MenuItem key={option.value} value={option.value}>
// //                                             <Box display="flex" alignItems="center">
// //                                                 <Box
// //                                                     sx={{
// //                                                         width: 16,
// //                                                         height: 16,
// //                                                         // borderRadius: '15px',
// //                                                         bgcolor: `#${option.color}`,
// //                                                         mr: 1
// //                                                     }}
// //                                                 />
// //                                                 {option.label}
// //                                             </Box>
// //                                         </MenuItem>
// //                                     ))}
// //                                 </TextField>
// //                             </FormControl>
// //                         </Grid>
// //                         <Grid size={{ xs: 12, sm: 6 }}>
// //                             {/* <TextField size="small" fullWidth label="Assigned To" name="assignedTo" value={formData.assignedTo || ''} onChange={handleInputChange} /> */}
// //                             <TextField
// //                                 select
// //                                 fullWidth
// //                                 size="small"
// //                                 label="Assign To"
// //                                 name="assignTo"
// //                                 value={formData.assignTo}
// //                                 onChange={handleInputChange}
// //                                 // onBlur={formik.handleBlur}
// //                                 // error={!!(formik.touched.assignTo && formik.errors.assignTo)}
// //                                 // helperText={formik.touched.assignTo && formik.errors.assignTo}
// //                             >
// //                                 {UsersOptions?.map((option) => (
// //                                     <MenuItem key={option.value || option.id} value={option.value || option.id}>
// //                                         {option.label || option.name}
// //                                     </MenuItem>
// //                                 ))}
// //                             </TextField>
// //                         </Grid>
// //                         <Grid size={{ xs: 12, sm: 12 }}>
// //                             <FormControlLabel control={<Checkbox size="small" checked={reminderEnabled} onChange={(e) => setReminderEnabled(e.target.checked)} />} label="Set reminder" />
// //                         </Grid>
// //                         {reminderEnabled && (
// //                             <Grid size={{ xs: 12, sm: 12 }}>
// //                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
// //                                     <DatePicker
// //                                         label="Reminder Date"
// //                                         value={reminderDate}
// //                                         onChange={(newValue) => setReminderDate(newValue)}
// //                                         enableAccessibleFieldDOMStructure={false}
// //                                         slots={{ textField: TextField }}
// //                                         slotProps={{ textField: { size: 'small', fullWidth: true, required: true } }}
// //                                     />
// //                                 </LocalizationProvider>
// //                             </Grid>
// //                         )}
// //                         {formData.status === 'completed' && (
// //                             <Grid size={{ xs: 12, sm: 12 }}>
// //                                 <TextField size="small" fullWidth label="Outcome" name="outcome" value={formData.outcome || ''} onChange={handleInputChange} multiline rows={3} />
// //                             </Grid>
// //                         )}
// //                         <Grid size={{ xs: 12, sm: 12 }}>
// //                             <TextField size="small" fullWidth label="Notes" name="notes" value={formData.notes || ''} onChange={handleInputChange} multiline rows={3} />
// //                         </Grid>
// //                     </Grid>
// //                     <DialogActions>
// //                         <MyButton variant="text" onClick={handleCancel} color="primary">
// //                             Cancel
// //                         </MyButton>
// //                         <MyButton color="primary" disabled={isSubmitting} type="submit">
// //                             {isSubmitting ? 'Saving...' : isEditMode ? 'Update Follow-Up' : 'Create Follow-Up'}
// //                         </MyButton>
// //                     </DialogActions>
// //                 </form>
// //             </DialogContent>
// //         </Dialog>
// //     );
// // };

// // export default FollowUpForm;
// 'use client';
// import React, { useState, useEffect, useMemo } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Grid, Box } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { MyButton } from '../../../../Component/Buttons/Buttons';
// import { createFollowupdata, GetFollowupStatus, GetStatus, UpdateFollowupdata } from '../../../../../../api/Leads';
// import Cookies from 'js-cookie';
// // import { useSnackbar } from 'notistack';

// interface FollowUp {
//     id?: string;
//     title?: string;
//     notes: string;
//     dueDate: any;
//     followUpDate?: any;
//     status?: 'completed' | 'pending' | 'overdue' | 'scheduled';
//     priority?: 'high' | 'medium' | 'low';
//     assignTo?: string;
//     type?: 'call' | 'meeting' | 'email' | 'whatsapp' | 'visit' | 'other';
//     isSetTimer?: boolean;
//     dateTime?: string;
//     outcome?: string;
//     leadId?: any;
//     createdAt?: any;
// }

// interface FollowUpFormProps {
//     open: boolean;
//     onOpenChange: (open: boolean) => void;
//     leadId: any;
//     followUp?: any;
//     UsersOptions: any;
// }

// interface LeadStatus {
//     _id: string;
//     StatusName: string;
//     color: string;
// }

// const defaultFollowUp: Partial<FollowUp> = {
//     title: '',
//     type: 'call',
//     notes: '',
//     priority: 'medium',
//     status: 'scheduled'
// };

// const FollowUpForm = ({ open, onOpenChange, leadId, followUp, UsersOptions }: FollowUpFormProps) => {
//     // const { enqueueSnackbar } = useSnackbar();
//     const lastFollowUp = Array.isArray(followUp) ? followUp[followUp.length - 1] : followUp;
//     console.log(lastFollowUp, 'followUp');

//     const [formData, setFormData] = useState<Partial<FollowUp>>({
//         ...defaultFollowUp
//     });
//     const [dueDate, setDueDate] = useState<any | null>(null);
//     const [reminderDate, setReminderDate] = useState<any | null>(null);
//     const [statuses, setStatuses] = useState<LeadStatus[]>([]);
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [types, setTypes] = useState([]);
//     const [reminderEnabled, setReminderEnabled] = useState(false);
//     const subdomain = Cookies.get('subdomain');
//     const isEditMode = !!followUp?.id;

//     // useEffect(() => {
//     //     if (followUp) {
//     //         setFormData({
//     //             title: lastFollowUp?.title || '',
//     //             type: lastFollowUp?.type?._id || 'call',
//     //             notes: lastFollowUp?.notes || '',
//     //             priority: lastFollowUp?.priority || 'medium',
//     //             status: lastFollowUp?.status?._id || 'scheduled',
//     //             assignTo: lastFollowUp?.assignTo?._id || ''
//     //         });
//     //         setDueDate(lastFollowUp?.dueDate ? new Date(lastFollowUp.dueDate) : null);
//     //         setReminderEnabled(!!lastFollowUp?.isSettimer);
//     //         setReminderDate(lastFollowUp?.dateTime ? new Date(lastFollowUp.dateTime) : null);
//     //     } else {
//     //         setFormData({ ...defaultFollowUp, leadId });
//     //         setDueDate(null);
//     //         setReminderEnabled(false);
//     //         setReminderDate(null);
//     //     }
//     // }, [followUp, leadId]);

//     useEffect(() => {
//         if (followUp) {
//             setFormData({
//                 title: lastFollowUp?.title || '',
//                 type: lastFollowUp?.type?._id || 'call',
//                 notes: lastFollowUp?.notes || '',
//                 priority: lastFollowUp?.priority || 'medium',
//                 status: lastFollowUp?.status?._id || 'scheduled',
//                 assignTo: lastFollowUp?.assignTo?._id || ''
//             });
//             setDueDate(lastFollowUp?.dueDate ? new Date(lastFollowUp.dueDate) : null);
//             setReminderEnabled(!!lastFollowUp?.isSettimer);
//             setReminderDate(lastFollowUp?.dateTime ? new Date(lastFollowUp.dateTime) : null);
//         } else {
//             setFormData({ ...defaultFollowUp, leadId });
//             setDueDate(null);
//             setReminderEnabled(false);
//             setReminderDate(null);
//         }
//     }, [followUp, leadId, lastFollowUp?.assignTo?._id, lastFollowUp?.dateTime, lastFollowUp?.dueDate, lastFollowUp?.isSettimer, lastFollowUp?.notes, lastFollowUp?.priority, lastFollowUp?.status?._id, lastFollowUp?.title, lastFollowUp?.type?._id]);

//     const fetchData = async () => {
//         const response = await GetFollowupStatus(subdomain);
//         setTypes(response.data);
//     };

//     const fetchStatuses = async () => {
//         try {
//             const res = await GetStatus(subdomain);
//             setStatuses(res.data);
//         } catch (err) {
//             console.error(err);
//             // enqueueSnackbar('Failed to fetch statuses', { variant: 'error' });
//         }
//     };

//     useEffect(() => {
//         fetchStatuses();
//     }, [fetchStatuses]);

//     const statusesOptions = useMemo(
//         () =>
//             statuses?.map((lead) => ({
//                 label: lead.StatusName,
//                 value: lead._id,
//                 color: lead.color
//             })),
//         [statuses]
//     );

//     useEffect(() => {
//         fetchData();
//     }, [fetchData]);

//     const usersType = useMemo(
//         () =>
//             types?.map((type) => ({
//                 label: type.typeName,
//                 value: type._id
//             })),
//         [types]
//     );

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSelectChange = (name: string, value: string) => {
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//         const followUpData = {
//             ...(!followUp || !followUp?._id
//                 ? {
//                       followUps: [
//                           {
//                               title: formData.title!,
//                               type: formData.type as FollowUp['type'],
//                               notes: formData.notes,
//                               dueDate: dueDate?.toISOString(),
//                               priority: formData.priority as FollowUp['priority'],
//                               status: formData.status as FollowUp['status'],
//                               assignTo: formData.assignTo,
//                               //   outcome: formData.outcome,
//                               isSetTimer: reminderEnabled,
//                               dateTime: reminderEnabled && reminderDate ? reminderDate.toISOString() : undefined
//                           }
//                       ]
//                   }
//                 : {
//                       title: formData.title!,
//                       type: formData.type as FollowUp['type'],
//                       notes: formData.notes,
//                       dueDate: dueDate?.toISOString(),
//                       priority: formData.priority as FollowUp['priority'],
//                       status: formData.status as FollowUp['status'],
//                       assignTo: formData.assignTo,
//                       //   outcome: formData.outcome,
//                       isSetTimer: reminderEnabled,
//                       dateTime: reminderEnabled && reminderDate ? reminderDate.toISOString() : undefined
//                   })
//         };
//         console.log(followUpData, 'followUpData');

//         try {
//             let response;
//             if (!followUp) {
//                 alert('alde');
//                 response = await createFollowupdata(subdomain, leadId, followUpData);
//             } else {
//                 response = await UpdateFollowupdata(subdomain, leadId, followUpData, followUp._id);
//             }

//             if (response) {
//                 // enqueueSnackbar(isEditMode ? 'Follow-up updated successfully' : 'Follow-up created successfully', { variant: 'success' });
//                 onOpenChange(false);
//             }
//         } catch (error) {
//             // enqueueSnackbar('Failed to save follow-up', { variant: 'error' });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const handleCancel = () => {
//         onOpenChange(false);
//     };

//     return (
//         <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
//             <DialogTitle>{isEditMode ? 'Edit Follow-Up' : 'Add New Follow-Up'}</DialogTitle>
//             <DialogContent>
//                 <form onSubmit={handleSubmit}>
//                     <Grid container spacing={2} sx={{ mt: 4 }}>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField fullWidth label="Title" size="small" name="title" value={formData.title} onChange={handleInputChange} required />
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <FormControl fullWidth size="small">
//                                 <TextField select fullWidth size="small" label="Type" name="type" value={formData.type} onChange={(e) => handleSelectChange('type', e.target.value)}>
//                                     {usersType?.map((option) => (
//                                         <MenuItem key={option.value} value={option.value}>
//                                             {option.label}
//                                         </MenuItem>
//                                     ))}
//                                 </TextField>
//                             </FormControl>
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <LocalizationProvider dateAdapter={AdapterDateFns}>
//                                 <DatePicker
//                                     label="Due Date"
//                                     value={dueDate}
//                                     onChange={(newValue) => setDueDate(newValue)}
//                                     enableAccessibleFieldDOMStructure={false}
//                                     slots={{ textField: TextField }}
//                                     slotProps={{ textField: { size: 'small', fullWidth: true, required: true } }}
//                                 />
//                             </LocalizationProvider>
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <FormControl fullWidth size="small">
//                                 <InputLabel>Priority</InputLabel>
//                                 <Select value={formData.priority} onChange={(e) => handleSelectChange('priority', e.target.value)} label="Priority">
//                                     <MenuItem value="low">Low</MenuItem>
//                                     <MenuItem value="medium">Medium</MenuItem>
//                                     <MenuItem value="high">High</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <FormControl fullWidth size="small">
//                                 <TextField select fullWidth size="small" label="Status" name="status" value={formData.status} onChange={(e) => handleSelectChange('status', e.target.value)}>
//                                     {statusesOptions.map((option) => (
//                                         <MenuItem key={option.value} value={option.value}>
//                                             <Box display="flex" alignItems="center">
//                                                 <Box
//                                                     sx={{
//                                                         width: 16,
//                                                         height: 16,
//                                                         bgcolor: `#${option.color}`,
//                                                         mr: 1
//                                                     }}
//                                                 />
//                                                 {option.label}
//                                             </Box>
//                                         </MenuItem>
//                                     ))}
//                                 </TextField>
//                             </FormControl>
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 6 }}>
//                             <TextField select fullWidth size="small" label="Assign To" name="assignTo" value={formData.assignTo} onChange={handleInputChange}>
//                                 {UsersOptions?.map((option) => (
//                                     <MenuItem key={option.value || option.id} value={option.value || option.id}>
//                                         {option.label || option.name}
//                                     </MenuItem>
//                                 ))}
//                             </TextField>
//                         </Grid>
//                         <Grid size={{ xs: 12, sm: 12 }}>
//                             <FormControlLabel control={<Checkbox size="small" checked={reminderEnabled} onChange={(e) => setReminderEnabled(e.target.checked)} />} label="Set reminder" />
//                         </Grid>
//                         {reminderEnabled && (
//                             <Grid size={{ xs: 12, sm: 12 }}>
//                                 <LocalizationProvider dateAdapter={AdapterDateFns}>
//                                     <DatePicker
//                                         label="Reminder Date"
//                                         value={reminderDate}
//                                         onChange={(newValue) => setReminderDate(newValue)}
//                                         enableAccessibleFieldDOMStructure={false}
//                                         slots={{ textField: TextField }}
//                                         slotProps={{ textField: { size: 'small', fullWidth: true, required: true } }}
//                                     />
//                                 </LocalizationProvider>
//                             </Grid>
//                         )}
//                         {formData.status === 'completed' && (
//                             <Grid size={{ xs: 12, sm: 12 }}>
//                                 <TextField size="small" fullWidth label="Outcome" name="outcome" value={formData.outcome || ''} onChange={handleInputChange} multiline rows={3} />
//                             </Grid>
//                         )}
//                         <Grid size={{ xs: 12, sm: 12 }}>
//                             <TextField size="small" fullWidth label="Notes" name="notes" value={formData.notes || ''} onChange={handleInputChange} multiline rows={3} />
//                         </Grid>
//                     </Grid>
//                     <DialogActions>
//                         <MyButton variant="text" onClick={handleCancel} color="primary">
//                             Cancel
//                         </MyButton>
//                         <MyButton color="primary" disabled={isSubmitting} type="submit">
//                             {isSubmitting ? 'Saving...' : isEditMode ? 'Update Follow-Up' : 'Create Follow-Up'}
//                         </MyButton>
//                     </DialogActions>
//                 </form>
//             </DialogContent>
//         </Dialog>
//     );
// };

// export default FollowUpForm;
'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel, Grid, Box } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { MyButton } from '../../../../Component/Buttons/Buttons';
import { createFollowupdata, GetFollowupStatus, GetStatus, UpdateFollowupdata } from '../../../../../../api/Leads';
import Cookies from 'js-cookie';
// import { useSnackbar } from 'notistack';

interface FollowUp {
    id?: string;
    title?: string;
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
    // snackbarOpen: boolean;
    handleMenuClose: any;
}

interface LeadStatus {
    _id: string;
    StatusName: string;
    color: string;
}

const defaultFollowUp: Partial<FollowUp> = {
    title: '',
    type: 'call',
    notes: '',
    priority: 'medium',
    status: 'scheduled'
};

const FollowUpForm = ({ open, onOpenChange, leadId, followUp, UsersOptions, setLeads, setSnackbarOpen, setSnackbarSeverity, setSnackbarMessage, handleMenuClose }: FollowUpFormProps) => {
    // const { enqueueSnackbar } = useSnackbar();
    const lastFollowUp = Array.isArray(followUp) ? followUp[followUp.length - 1] : followUp;
    // console.log(snackbarOpen, 'snackbarOpen');

    const [formData, setFormData] = useState<Partial<FollowUp>>({
        ...defaultFollowUp
    });
    const [dueDate, setDueDate] = useState<any | null>(null);
    const [reminderDate, setReminderDate] = useState<any | null>(null);
    const [statuses, setStatuses] = useState<LeadStatus[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [types, setTypes] = useState([]);
    const [reminderEnabled, setReminderEnabled] = useState(false);
    const subdomain = Cookies.get('subdomain');
    const isEditMode = !!followUp?.id;

    const fetchStatuses = useCallback(async () => {
        try {
            const res = await GetStatus(subdomain);
            setStatuses(res.data);
        } catch (err) {
            console.error(err);
            // enqueueSnackbar('Failed to fetch statuses', { variant: 'error' });
        }
    }, [subdomain]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetFollowupStatus(subdomain);
                setTypes(response.data);
            } catch (err) {
                console.error(err);
                // enqueueSnackbar('Failed to fetch follow-up types', { variant: 'error' });
            }
        };
        fetchData();
    }, [subdomain]);

    useEffect(() => {
        fetchStatuses();
    }, [fetchStatuses]);

    useEffect(() => {
        if (followUp) {
            setFormData({
                title: lastFollowUp?.title || '',
                type: lastFollowUp?.type?._id || 'call',
                notes: lastFollowUp?.notes || '',
                priority: lastFollowUp?.priority || 'medium',
                status: lastFollowUp?.status?._id || 'scheduled',
                assignTo: lastFollowUp?.assignTo?._id || ''
            });
            setDueDate(lastFollowUp?.dueDate ? new Date(lastFollowUp.dueDate) : null);
            setReminderEnabled(!!lastFollowUp?.isSettimer);
            setReminderDate(lastFollowUp?.dateTime ? new Date(lastFollowUp.dateTime) : null);
        } else {
            setFormData({ ...defaultFollowUp, leadId });
            setDueDate(null);
            setReminderEnabled(false);
            setReminderDate(null);
        }
    }, [followUp, leadId, lastFollowUp?.assignTo?._id, lastFollowUp?.dateTime, lastFollowUp?.dueDate, lastFollowUp?.isSettimer, lastFollowUp?.notes, lastFollowUp?.priority, lastFollowUp?.status?._id, lastFollowUp?.title, lastFollowUp?.type?._id]);

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
                              title: formData.title!,
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
                      title: formData.title!,
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
        console.log(followUpData, 'followUpData');

        try {
            setIsSubmitting(true);

            if (!followUp) {
                const response = await createFollowupdata(subdomain, leadId, followUpData);
                if (response.success) {
                    // enqueueSnackbar(isEditMode ? 'Follow-up updated successfully' : 'Follow-up created successfully', { variant: 'success' });
                    handleMenuClose();
                    setSnackbarOpen(true);
                    setLeads();
                    setSnackbarSeverity('success');
                    setSnackbarMessage(response?.data?.message);
                    onOpenChange(false);
                } else {
                    handleMenuClose();
                    setSnackbarOpen(true);
                    setSnackbarSeverity('error');
                    setSnackbarMessage(response.data.errors);
                }
            } else {
                const response = await UpdateFollowupdata(subdomain, leadId, followUpData, followUp._id);
                if (response.success) {
                    handleMenuClose();
                    setSnackbarOpen(true);
                    // alert('hellow');
                    // enqueueSnackbar(isEditMode ? 'Follow-up updated successfully' : 'Follow-up created successfully', { variant: 'success' });
                    handleCancel();
                    setSnackbarMessage(response?.data?.message);
                    setSnackbarSeverity('success');
                    setLeads();
                } else {
                    handleMenuClose();
                    setSnackbarOpen(true);
                    setSnackbarSeverity('success');
                    setSnackbarMessage(response.data.errors);
                    handleCancel();
                }
            }
            // console.log(response, 'setLeads');

            // if (response.success) {
            //     // enqueueSnackbar(isEditMode ? 'Follow-up updated successfully' : 'Follow-up created successfully', { variant: 'success' });
            //     setSnackbarOpen(true);
            //     setLeads((prev) => {
            //         // Update the state as needed, for example:
            //         return [...prev, response.data]; // Assuming you want to add the new response data to the leads array
            //     });
            //     setSnackbarSeverity('success');
            //     setSnackbarMessage(response?.data?.message);
            //     onOpenChange(false);
            // } else {
            //     setSnackbarOpen(true);
            //     setSnackbarSeverity('success');
            //     setSnackbarMessage(response.data.errors);
            // }
        } catch (error) {
            // enqueueSnackbar('Failed to save follow-up', { variant: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onClose={handleCancel} fullWidth maxWidth="sm">
            <DialogTitle>{followUp?._id ? 'Edit Follow-Up' : 'Add New Follow-Up'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} sx={{ mt: 4 }}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField fullWidth label="Title" size="small" name="title" value={formData.title} onChange={handleInputChange} required />
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
                                <DatePicker
                                    label="Due Date"
                                    value={dueDate}
                                    onChange={(newValue) => setDueDate(newValue)}
                                    enableAccessibleFieldDOMStructure={false}
                                    slots={{ textField: TextField }}
                                    slotProps={{ textField: { size: 'small', fullWidth: true, required: true } }}
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
                                            <Box display="flex" alignItems="center">
                                                <Box
                                                    sx={{
                                                        width: 16,
                                                        height: 16,
                                                        bgcolor: `#${option.color}`,
                                                        mr: 1
                                                    }}
                                                />
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
                        <Grid size={{ xs: 12, sm: 12 }}>
                            <FormControlLabel control={<Checkbox size="small" checked={reminderEnabled} onChange={(e) => setReminderEnabled(e.target.checked)} />} label="Set reminder" />
                        </Grid>
                        {reminderEnabled && (
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        label="Reminder Date"
                                        value={reminderDate}
                                        onChange={(newValue) => setReminderDate(newValue)}
                                        enableAccessibleFieldDOMStructure={false}
                                        slots={{ textField: TextField }}
                                        slotProps={{ textField: { size: 'small', fullWidth: true, required: true } }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                        )}
                        {formData.status === 'completed' && (
                            <Grid size={{ xs: 12, sm: 12 }}>
                                <TextField size="small" fullWidth label="Outcome" name="outcome" value={formData.outcome || ''} onChange={handleInputChange} multiline rows={3} />
                            </Grid>
                        )}
                        <Grid size={{ xs: 12, sm: 12 }}>
                            <TextField size="small" fullWidth label="Notes" name="notes" value={formData.notes || ''} onChange={handleInputChange} multiline rows={3} />
                        </Grid>
                    </Grid>
                    <DialogActions>
                        <MyButton variant="text" onClick={handleCancel} color="primary">
                            Cancel
                        </MyButton>
                        <MyButton color="primary" disabled={isSubmitting} type="submit">
                            {isSubmitting ? 'Saving...' : isEditMode ? 'Update Follow-Up' : 'Create Follow-Up'}
                        </MyButton>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default FollowUpForm;
