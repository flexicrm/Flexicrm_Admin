// 'use client';
// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { TextField, Button, Grid, InputLabel, FormHelperText, Box, Select, MenuItem, FormControl } from '@mui/material';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { Editor } from '@tinymce/tinymce-react';

// type Customer = {
//     _id: string;
//     name: string;
// };

// type Contract = {
//     contractId: string;
//     subject: string;
//     description: string;
//     contractStartDate: string | Date | null;
//     contractEndDate: string | Date | null;
//     contractValue: number;
//     attachment: File | null;
// };

// type ContractFormProps = {
//     onSubmit: (formData: FormData) => void;
//     customers: any;
//     contract: any;
// };

// const formatDate = (date: string | Date | null) => (date ? new Date(date) : null);

// const ContractForm: React.FC<ContractFormProps> = ({ onSubmit, customers, contract }) => {
//     const formik = useFormik({
//         initialValues: {
//             customer: contract?.customers || '',
//             contractId: contract.contractId || '',
//             subject: contract.subject || '',
//             description: contract.description || '',
//             contractStartDate: contract.contractStartDate ? formatDate(contract.contractStartDate) : null,
//             contractEndDate: contract.contractEndDate ? formatDate(contract.contractEndDate) : null,
//             contractValue: contract.contractValue || 0,
//             attachment: null as File | null
//         },
//         // validationSchema: Yup.object({ ... }),
//         onSubmit: (values) => {
//             const formData = new FormData();
//             Object.entries(values).forEach(([key, value]) => {
//                 if (value instanceof File) {
//                     formData.append(key, value);
//                 } else {
//                     formData.append(key, value as any);
//                 }
//             });
//             onSubmit(formData);
//         }
//     });

//     return (
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
//                 <Grid container spacing={2}>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <FormControl fullWidth margin="normal">
//                             <InputLabel id="customer-label">Customer</InputLabel>
//                             <Select
//                                 labelId="customer-label"
//                                 id="customer"
//                                 name="customer"
//                                 value={formik.values.customer}
//                                 label="Customer"
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 error={formik.touched.customer && Boolean(formik.errors.customer)}
//                             >
//                                 {customers.map((c) => (
//                                     <MenuItem key={c._id} value={c._id}>
//                                         {c.name}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                             {formik.touched.customer && typeof formik.errors.customer === 'string' && <FormHelperText error>{formik.errors.customer}</FormHelperText>}
//                         </FormControl>
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <TextField
//                             fullWidth
//                             id="contractId"
//                             name="contractId"
//                             label="Contract Id"
//                             value={formik.values.contractId}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             error={formik.touched.contractId && Boolean(formik.errors.contractId)}
//                             helperText={formik.touched.contractId && typeof formik.errors.contractId === 'string' ? formik.errors.contractId : undefined}
//                             margin="normal"
//                         />
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <TextField
//                             fullWidth
//                             id="subject"
//                             name="subject"
//                             label="Subject"
//                             value={formik.values.subject}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             error={formik.touched.subject && Boolean(formik.errors.subject)}
//                             helperText={formik.touched.subject && typeof formik.errors.subject === 'string' ? formik.errors.subject : undefined}
//                             margin="normal"
//                         />
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <DatePicker
//                             label="Contract Start Date"
//                             value={formik.values.contractStartDate}
//                             onChange={(value) => formik.setFieldValue('contractStartDate', value)}
//                             slotProps={{
//                                 textField: {
//                                     fullWidth: true,
//                                     margin: 'normal',
//                                     error: formik.touched.contractStartDate && Boolean(formik.errors.contractStartDate),
//                                     helperText: formik.touched.contractStartDate && typeof formik.errors.contractStartDate === 'string' ? formik.errors.contractStartDate : undefined
//                                 }
//                             }}
//                         />
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <DatePicker
//                             label="Contract End Date"
//                             value={formik.values.contractEndDate}
//                             onChange={(value) => formik.setFieldValue('contractEndDate', value)}
//                             slotProps={{
//                                 textField: {
//                                     fullWidth: true,
//                                     margin: 'normal',
//                                     error: formik.touched.contractEndDate && Boolean(formik.errors.contractEndDate),
//                                     helperText: formik.touched.contractEndDate && typeof formik.errors.contractEndDate === 'string' ? formik.errors.contractEndDate : undefined
//                                 }
//                             }}
//                         />
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <TextField
//                             fullWidth
//                             id="contractValue"
//                             name="contractValue"
//                             label="Contract Value"
//                             type="number"
//                             value={formik.values.contractValue}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             error={formik.touched.contractValue && Boolean(formik.errors.contractValue)}
//                             helperText={formik.touched.contractValue && typeof formik.errors.contractValue === 'string' ? formik.errors.contractValue : undefined}
//                             margin="normal"
//                             inputProps={{ min: 0 }}
//                         />
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <InputLabel htmlFor="attachment">Attachment</InputLabel>
//                         <input
//                             id="attachment"
//                             name="attachment"
//                             type="file"
//                             onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
//                                 if (event.currentTarget.files && event.currentTarget.files[0]) {
//                                     formik.setFieldValue('attachment', event.currentTarget.files[0]);
//                                 }
//                             }}
//                             onBlur={formik.handleBlur}
//                             style={{ marginTop: 8 }}
//                         />
//                         {formik.touched.attachment && formik.errors.attachment && typeof formik.errors.attachment === 'string' && <FormHelperText error>{formik.errors.attachment}</FormHelperText>}
//                     </Grid>
//                     <Grid size={{ xs: 12 }}>
//                         <InputLabel htmlFor="description">Description</InputLabel>
//                         <Box sx={{ border: 1, borderColor: 'grey.400', borderRadius: 1, p: 1, mt: 1 }}>
//                             {/* <Editor
//                                 id="description"
//                                 value={formik.values.description}
//                                 init={{
//                                     height: 200,
//                                     menubar: false,
//                                     plugins: ['advlist autolink lists link charmap print preview anchor', 'searchreplace visualblocks code fullscreen', 'insertdatetime media table paste code help wordcount'],
//                                     toolbar: 'undo redo | formatselect | bold italic backcolor | ' + 'alignleft aligncenter alignright alignjustify | ' + 'bullist numlist outdent indent | removeformat | help'
//                                 }}
//                                 onEditorChange={(content) => formik.setFieldValue('description', content)}
//                                 onBlur={formik.handleBlur}
//                             /> */}
//                         </Box>
//                         {formik.touched.description && typeof formik.errors.description === 'string' && <FormHelperText error>{formik.errors.description}</FormHelperText>}
//                     </Grid>
//                     <Grid size={{ xs: 12 }}>
//                         <Button color="primary" variant="contained" type="submit" sx={{ mt: 2 }}>
//                             Submit
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </form>
//         </LocalizationProvider>
//     );
// };

// export default ContractForm;
import React from 'react'

export default function EditcontractForm() {
  return (
    <div>EditcontractForm</div>
  )
}
