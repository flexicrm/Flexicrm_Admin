// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { InputText } from "primereact/inputtext";
// import { InputNumber } from "primereact/inputnumber";
// import { InputTextarea } from "primereact/inputtextarea";
// import { Dropdown } from "primereact/dropdown";

// const ExpenseForm = ({ onSubmit, customers, projectsOptions }) => {
//    console.log(customers._id,"id")
//     const formik = useFormik({
//         initialValues: {
//             customer: customers?._id ,
//             expenseSubject: "",
//             description: "",
//             expenseBillUpload: null, // File upload
//             Amount: "",
//             paymentStatus: "Pending", // Default payment status
//             paymentMethod: "",
//             tags: "",
//             date: "", // Date field
//             project: null, // Project field
//         },
//         validationSchema: Yup.object({
//             // customerId: Yup.string().required("Customer is required"),
//             expenseSubject: Yup.string().required("Expense subject is required"),
//             description: Yup.string().required("Description is required"),
//             Amount: Yup.number().required("Amount is required").positive("Amount must be positive"),
//             paymentMethod: Yup.string().required("Payment method is required"),
//             date: Yup.date().required("Date is required").nullable(),
//             project: Yup.string().required("Project is required"),
//         }),
//         onSubmit: (values) => {
//             const formData = new FormData();
//             Object.keys(values).forEach((key) => {
//                 formData.append(key, values[key]);
//             });

//             // Append the file correctly
//             if (values.expenseBillUpload) {
//                 formData.append("expenseBillUpload", values.expenseBillUpload);
//             }

//             // You might want to format the date before sending
//             if (values.date) {
//                 formData.append("date", new Date(values.date).toISOString()); // Adjust format as needed
//             }

//             onSubmit(formData);
//         },
//     });

//     return (
//         <form onSubmit={formik.handleSubmit}>

//             <div>
//                 <label htmlFor="expenseSubject">Expense Subject</label><br />
//                 <InputText
//                     id="expenseSubject"
//                     name="expenseSubject"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.expenseSubject}
//                 />
//                 {formik.touched.expenseSubject && formik.errors.expenseSubject && (
//                     <div className="error">{formik.errors.expenseSubject}</div>
//                 )}
//             </div>

//             <div>
//                 <label htmlFor="description">Description</label><br />
//                 <InputTextarea
//                     id="description"
//                     name="description"
//                     onChange={formik.handleChange}
//                     value={formik.values.description}
//                 />
//                 {formik.touched.description && formik.errors.description && (
//                     <div className="error">{formik.errors.description}</div>
//                 )}
//             </div>

//             <div>
//                 <label htmlFor="Amount">Amount</label><br />
//                 <InputNumber
//                     id="Amount"
//                     name="Amount"
//                     onValueChange={(e) => formik.setFieldValue("Amount", e.value)}
//                     value={formik.values.Amount}
//                 />
//                 {formik.touched.Amount && formik.errors.Amount && (
//                     <div className="error">{formik.errors.Amount}</div>
//                 )}
//             </div>

//             <div>
//                 <label htmlFor="expenseBillUpload">Expense Bill Upload</label><br />
//                 <input
//                     type="file"
//                     name="expenseBillUpload"
//                     onChange={(event) => {
//                         formik.setFieldValue("expenseBillUpload", event.currentTarget.files[0]);
//                     }}
//                 />
//                 {formik.touched.expenseBillUpload && formik.errors.expenseBillUpload && (
//                     <div className="error">{formik.errors.expenseBillUpload}</div>
//                 )}
//             </div>

//             <div>
//                 <label htmlFor="paymentMethod">Payment Method</label><br />
//                 <InputText
//                     id="paymentMethod"
//                     name="paymentMethod"
//                     onChange={formik.handleChange}
//                     value={formik.values.paymentMethod}
//                 />
//                 {formik.touched.paymentMethod && formik.errors.paymentMethod && (
//                     <div className="error">{formik.errors.paymentMethod}</div>
//                 )}
//             </div>

//             <div>
//                 <label htmlFor="paymentStatus">Payment Status</label><br />
//                 <select
//                     id="paymentStatus"
//                     name="paymentStatus"
//                     onChange={formik.handleChange}
//                     value={formik.values.paymentStatus}
//                 >
//                     <option value="Pending">Pending</option>
//                     <option value="Paid">Paid</option>
//                     <option value="Partial">Partial</option>
//                 </select>
//             </div>

//             <div>
//                 <label htmlFor="date">Date</label><br />
//                 <InputText
//                     id="date"
//                     type="date"
//                     name="date"
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.date}
//                 />
//                 {formik.touched.date && formik.errors.date && (
//                     <div className="error">{formik.errors.date}</div>
//                 )}
//             </div>

//             <div>
//                 <label htmlFor="project">Project</label><br />
//                 <Dropdown
//                     id="project"
//                     name="project"
//                     options={projectsOptions}
//                     onChange={(e) => formik.setFieldValue("project", e.value)}
//                     value={formik.values.project}
//                     placeholder="Select a Project"
//                 />
//                 {formik.touched.project && formik.errors.project && (
//                     <div className="error">{formik.errors.project}</div>
//                 )}
//             </div>

//             <button type="submit">Submit</button>
//         </form>
//     );
// };

// export default ExpenseForm;
// ExpenseForm.js
// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { InputText } from 'primereact/inputtext';
// import { InputNumber } from 'primereact/inputnumber';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { Dropdown } from 'primereact/dropdown';
// import { Chips } from 'primereact/chips';
// import { Calendar } from 'primereact/calendar';
// import { Button } from 'primereact/button';
// import { Editor } from 'primereact/editor';
// import { Col, Row } from 'react-bootstrap';

// const ExpenseForm = ({ onSubmit, customers, projectsOptions }) => {
//     console.log(customers?._id, 'customersid');
//     const formik = useFormik({
//         initialValues: {
//             customer: customers?._id,
//             expenseSubject: '',
//             description: '',
//             expenseBillUpload: null,
//             Amount: '',
//             paymentStatus: 'Pending',
//             paymentMethod: '',
//             tags: [],
//             date: '',
//             project: null
//         },
//         validationSchema: Yup.object({
//             expenseSubject: Yup.string().required('Expense subject is required'),
//             // description: Yup.string().required('Description is required'),
//             Amount: Yup.number().required('Amount is required').positive('Amount must be positive'),
//             paymentMethod: Yup.string().required('Payment method is required'),
//             date: Yup.date().required('Date is required').nullable(),
//             project: Yup.string().required('Project is required')
//         }),
//         onSubmit: (values) => {
//             const formData = new FormData();
//             Object.keys(values).forEach((key) => {
//                 if (key === 'expenseBillUpload' && values.expenseBillUpload) {
//                     formData.append('expenseBillUpload', values.expenseBillUpload);
//                 } else {
//                     formData.append(key, values[key]);
//                 }
//             });

//             // if (values.date) {
//             //     formData.append("date", new Date(values.date).toISOString());
//             // }

//             console.log('Form data before submit:', formData); // Debugging line
//             onSubmit(formData);
//         }
//     });
//     const options = [
//         { label: 'Unpaid', value: 'unpaid' },
//         { label: 'Paid', value: 'paid' },
//         { label: 'Partial', value: 'partial' }
//     ];

//     return (
//         <form onSubmit={formik.handleSubmit}>
//             <div className="form-input">
//                 <label htmlFor="expenseBillUpload">Expense Bill Upload</label>
//                 <br />
//                 <input
//                     type="file"
//                     id="expenseBillUpload"
//                     className="mb-3 w-100"
//                     name="expenseBillUpload"
//                     accept="image/*"
//                     onChange={(e) => {
//                         const file = e.target.files[0];
//                         setFieldValue('expenseBillUpload', file);
//                         const reader = new FileReader();
//                         reader.onload = () => {
//                             setImagePreview(reader.result);
//                         };
//                         reader.readAsDataURL(file);
//                     }}
//                 />

//                 {formik.touched.expenseBillUpload && formik.errors.expenseBillUpload && <div className="error">{formik.errors.expenseBillUpload}</div>}
//             </div>

//             <Row>
//                 <Col>
//                     {' '}
//                     <div>
//                         <label htmlFor="expenseSubject">Expense Subject</label>
//                         <br />
//                         <InputText id="expenseSubject" name="expenseSubject" className="mb-3 w-100" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.expenseSubject} />
//                         {formik.touched.expenseSubject && formik.errors.expenseSubject && <div className="error">{formik.errors.expenseSubject}</div>}
//                     </div>
//                 </Col>
//                 <Col>
//                     {' '}
//                     <div>
//                         <label htmlFor="project">Project</label>
//                         <br />
//                         <Dropdown id="project" name="project" className="mb-3 w-100" options={projectsOptions} onChange={(e) => formik.setFieldValue('project', e.value)} value={formik.values.project} placeholder="Select a Project" />
//                         {formik.touched.project && formik.errors.project && <div className="error">{formik.errors.project}</div>}
//                     </div>
//                 </Col>
//             </Row>

//             <Row>
//                 <Col>
//                     {' '}
//                     <div>
//                         <label htmlFor="Amount">Amount</label>
//                         <br />
//                         <InputNumber id="Amount" name="Amount" className="mb-3 w-100" onValueChange={(e) => formik.setFieldValue('Amount', e.value)} value={formik.values.Amount} />
//                         {formik.touched.Amount && formik.errors.Amount && <div className="error">{formik.errors.Amount}</div>}
//                     </div>
//                 </Col>
//                 <Col>
//                     {' '}
//                     <div>
//                         <label htmlFor="paymentMethod">Payment Method</label>
//                         <br />
//                         <InputText id="paymentMethod" name="paymentMethod" className="mb-3 w-100" onChange={formik.handleChange} value={formik.values.paymentMethod} />
//                         {formik.touched.paymentMethod && formik.errors.paymentMethod && <div className="error">{formik.errors.paymentMethod}</div>}
//                     </div>
//                 </Col>
//             </Row>

//             {/* <div>
//                 <label htmlFor="expenseBillUpload">Expense Bill Upload</label><br/>
//                 <input
//                     type="file"
//                     name="expenseBillUpload"
//                     id="expenseBillUpload"
//                     onChange={(event) => {
//                         const file = event.currentTarget.files[0];
//                         formik.setFieldValue("expenseBillUpload", file);
//                     }}
//                 />
//                 {formik.touched.expenseBillUpload && formik.errors.expenseBillUpload && (
//                     <div className="error">{formik.errors.expenseBillUpload}</div>
//                 )}
//             </div> */}

//             <Row>
//                 <Col>
//                     {' '}
//                     <div>
//                         <label>Payment Status</label>
//                         <br />
//                         <Dropdown value={formik.values.paymentStatus} options={options} onChange={formik.handleChange} className="mb-3 w-100" name="paymentStatus" placeholder="Select a Payment Status" />
//                     </div>
//                 </Col>
//                 <Col>
//                     {' '}
//                     <div>
//                         <label htmlFor="date">Date</label>
//                         <br />
//                         <Calendar id="date" type="date" name="date" className="mb-3 w-100" onChange={(e) => formik.setFieldValue('date', e.target.value)} onBlur={formik.handleBlur} value={formik.values.date} showIcon />
//                         {formik.touched.date && formik.errors.date && <div className="error">{formik.errors.date}</div>}
//                     </div>
//                 </Col>
//             </Row>

//             <div>
//                 <label htmlFor="tags">Tags</label>
//                 <br />
//                 <Chips id="tags" name="tags" className="mb-3 w-100" value={formik.values.tags} onChange={(e) => formik.setFieldValue('tags', e.value)} />
//                 {formik.touched.tags && formik.errors.tags && <div className="error">{formik.errors.tags}</div>}
//             </div>
//             <div>
//                 <label htmlFor="description">Description</label>
//                 <br />
//                 <Editor id="description" name="description" className="mb-3 w-100" onChange={formik.handleChange} value={formik.values.description} />
//                 {/* {formik.touched.description && formik.errors.description && <div className="error">{formik.errors.description}</div>} */}
//             </div>
//             <Button type="submit" className="btn-all">
//                 Submit
//             </Button>
//         </form>
//     );
// };

// export default ExpenseForm;
'use client';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, MenuItem, Grid, InputLabel, Select, FormControl, Chip, OutlinedInput, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';

type ExpenseFormProps = {
    onSubmit: (formData: FormData) => void;
    customers: { _id: string };
    projectsOptions: { label: string; value: string }[];
    expense: any;
};

const paymentStatusOptions = [
    { label: 'Unpaid', value: 'unpaid' },
    { label: 'Paid', value: 'paid' },
    { label: 'Partial', value: 'partial' }
];

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit, customers, projectsOptions, expense }) => {
    const [file, setFile] = React.useState<File | null>(null);

    const formik = useFormik({
        initialValues: {
            customer: customers?._id || '',
            expenseSubject: expense?.expenseSubject || '',
            description: expense?.description || '',
            expenseBillUpload: expense?.expenseBillUpload || (null as File | null),
            Amount: expense?.Amount || '',
            paymentStatus: expense?.paymentStatus || 'unpaid',
            paymentMethod: expense?.paymentMethod || '',
            tags: expense?.tags || ([] as string[]),
            date: expense?.date || null,
            project: expense?.project || ''
        },
        validationSchema: Yup.object({
            expenseSubject: Yup.string().required('Expense subject is required'),
            Amount: Yup.number().typeError('Amount must be a number').required('Amount is required').positive('Amount must be positive'),
            paymentMethod: Yup.string().required('Payment method is required'),
            date: Yup.date().required('Date is required').nullable(),
            project: Yup.string().required('Project is required')
        }),
        onSubmit: (values) => {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]) => {
                if (key === 'expenseBillUpload' && value) {
                    formData.append('expenseBillUpload', value as File);
                } else if (key === 'tags') {
                    formData.append('tags', JSON.stringify(value));
                } else if (key === 'date' && value) {
                    formData.append('date', (value as Dayjs).toISOString());
                } else {
                    formData.append(key, value as string);
                }
            });
            onSubmit(formData);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Button variant="contained" component="label" fullWidth>
                        Upload Expense Bill
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.currentTarget.files?.[0] || null;
                                setFile(file);
                                formik.setFieldValue('expenseBillUpload', file);
                            }}
                        />
                    </Button>
                    {file && (
                        <Box mt={1}>
                            <Chip label={file.name} />
                        </Box>
                    )}
                    {formik.touched.expenseBillUpload && typeof formik.errors.expenseBillUpload === 'string' && <div style={{ color: 'red' }}>{formik.errors.expenseBillUpload}</div>}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        id="expenseSubject"
                        name="expenseSubject"
                        label="Expense Subject"
                        value={formik.values.expenseSubject}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.expenseSubject && Boolean(formik.errors.expenseSubject)}
                        helperText={formik.touched.expenseSubject && typeof formik.errors.expenseSubject === 'string'}
                        margin="normal"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="project-label">Project</InputLabel>
                        <Select labelId="project-label" id="project" name="project" value={formik.values.project} label="Project" onChange={formik.handleChange} error={formik.touched.project && Boolean(formik.errors.project)}>
                            {projectsOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.project && typeof formik.errors.project === 'string' && <div style={{ color: 'red' }}>{formik.errors.project}</div>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        id="Amount"
                        name="Amount"
                        label="Amount"
                        type="number"
                        value={formik.values.Amount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Amount && Boolean(formik.errors.Amount)}
                        helperText={formik.touched.Amount && typeof formik.errors.Amount === 'string'}
                        margin="normal"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        id="paymentMethod"
                        name="paymentMethod"
                        label="Payment Method"
                        value={formik.values.paymentMethod}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.paymentMethod && Boolean(formik.errors.paymentMethod)}
                        helperText={formik.touched.paymentMethod && typeof formik.errors.paymentMethod === 'string'}
                        margin="normal"
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="paymentStatus-label">Payment Status</InputLabel>
                        <Select labelId="paymentStatus-label" id="paymentStatus" name="paymentStatus" value={formik.values.paymentStatus} label="Payment Status" onChange={formik.handleChange}>
                            {paymentStatusOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date"
                            value={formik.values.date}
                            onChange={(value) => formik.setFieldValue('date', value)}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    margin: 'normal',
                                    error: formik.touched.date && Boolean(formik.errors.date),
                                    helperText: formik.touched.date && typeof formik.errors.date === 'string'
                                }
                            }}
                        />
                    </LocalizationProvider>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="tags">Tags</InputLabel>
                        <Select
                            multiple
                            id="tags"
                            name="tags"
                            value={formik.values.tags}
                            onChange={formik.handleChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {(selected as string[]).map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                        >
                            {/* You can provide tag options here if needed */}
                        </Select>
                        {formik.touched.tags && typeof formik.errors.tags === 'string' && <div style={{ color: 'red' }}>{formik.errors.tags}</div>}
                    </FormControl>
                </Grid>

                <Grid size={{ xs: 12, md: 12 }}>
                    <TextField fullWidth id="description" name="description" label="Description" value={formik.values.description} onChange={formik.handleChange} multiline minRows={3} margin="normal" />
                </Grid>

                <Grid size={{ xs: 12, md: 12 }}>
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ExpenseForm;
