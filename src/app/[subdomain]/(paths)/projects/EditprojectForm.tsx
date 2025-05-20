// 'use client';

// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { InputText } from 'primereact/inputtext';
// import { InputNumber } from 'primereact/inputnumber';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { Dropdown } from 'primereact/dropdown';
// import { MultiSelect } from 'primereact/multiselect';
// import { InputSwitch } from 'primereact/inputswitch';
// import { Calendar } from 'primereact/calendar';
// import { Editor } from 'primereact/editor';
// import { Checkbox } from 'primereact/checkbox';
// import { Button } from 'primereact/button';
// import { Chips } from 'primereact/chips';
// import { Col, Row } from 'react-bootstrap';

// const formatDate = (date) => {
//     return new Date(date);
// };

// const EditProjectForm = ({ onSubmit, customers, users, project, loading }) => {
//     const formik = useFormik({
//         initialValues: {
//             projectName: project?.projectName || '',
//             customer: project?.customer?._id || null,
//             projectStatus: project?.projectStatus || 'IN_PROGRESS',
//             totalRate: project?.totalRate || '',
//             members: project?.members.map((member) => member._id) || [],
//             status: project?.status || 'ACTIVE',
//             startDate: project?.startDate ? formatDate(project.startDate) : null,
//             deadline: project?.deadline ? formatDate(project.deadline) : null,
//             description: project?.description || '',
//             sendEmail: project?.sendEmail || false,
//             tags: project?.tags || []
//         },
//         onSubmit,
//         validationSchema: Yup.object({
//             projectName: Yup.string().required('Project name is required'),
//             customer: Yup.string().required('Customer is required'),
//             projectStatus: Yup.string().required('Project status is required'),
//             totalRate: Yup.number().required('Total rate is required').positive(),
//             members: Yup.array().min(1, 'At least one member is required'),
//             status: Yup.string().required('Status is required'),
//             startDate: Yup.date().nullable(),
//             deadline: Yup.date().nullable(),
//             description: Yup.string(),
//             sendEmail: Yup.boolean(),
//             tags: Yup.array()
//         })
//     });

//     const projectStatusOptions = [
//         { label: 'Not Started', value: 'NOT_STARTED' },
//         { label: 'In Progress', value: 'IN_PROGRESS' },
//         { label: 'On Hold', value: 'ON_HOLD' },
//         { label: 'Cancelled', value: 'CANCELLED' },
//         { label: 'Finished', value: 'FINISHED' }
//     ];

//     return (
//         <div className="p-fluid project-form">
//             <div className="form-grid">
//                 <Row>
//                     <Col>
//                         <div className="p-field col-12 md:col-6">
//                             <label htmlFor="projectName">Project Name</label>
//                             <br />
//                             <InputText id="projectName" name="projectName" value={formik.values.projectName} onChange={formik.handleChange} onBlur={formik.handleBlur} className="mb-4" />
//                             {formik.touched.projectName && formik.errors.projectName && <small className="p-error">{formik.errors.projectName}</small>}
//                         </div>
//                     </Col>
//                     <Col>
//                         <div className="p-field col-12 md:col-6">
//                             <label htmlFor="projectStatus">Project Status</label>
//                             <br />
//                             <Dropdown
//                                 id="projectStatus"
//                                 name="projectStatus"
//                                 value={formik.values.projectStatus}
//                                 options={projectStatusOptions}
//                                 onChange={(e) => formik.setFieldValue('projectStatus', e.value)}
//                                 onBlur={formik.handleBlur}
//                                 placeholder="Select Status"
//                                 className="mb-4"
//                             />
//                             {formik.touched.projectStatus && formik.errors.projectStatus && <small className="p-error">{formik.errors.projectStatus}</small>}
//                         </div>
//                     </Col>
//                 </Row>

//                 <Row>
//                     <Col>
//                         <div className="p-field col-12 md:col-6">
//                             <label htmlFor="customer">Customer</label>
//                             <br />
//                             <Dropdown
//                                 id="customer"
//                                 name="customer"
//                                 value={formik.values.customer}
//                                 options={customers}
//                                 optionLabel="Companyname" // Ensure the field you want to display is correct
//                                 optionValue="_id" // Assuming _id is the identifier
//                                 onChange={(e) => formik.setFieldValue('customer', e.value)}
//                                 onBlur={formik.handleBlur}
//                                 placeholder="Select a Customer"
//                                 filter={true}
//                                 filterBy="Companyname"
//                                 disabled={loading}
//                                 className="w-100 mb-3"
//                             />
//                             {formik.touched.customer && formik.errors.customer && <small className="p-error">{formik.errors.customer}</small>}
//                         </div>
//                     </Col>

//                     <Col>
//                         <div className="p-field col-12 md:col-6">
//                             <label htmlFor="members">Members</label>
//                             <br />
//                             <MultiSelect
//                                 id="members"
//                                 name="members"
//                                 value={formik.values.members}
//                                 options={users}
//                                 optionLabel="firstname" // Ensure this is the correct key
//                                 optionValue="id" // Assuming _id is the identifier for members
//                                 onChange={(e) => formik.setFieldValue('members', e.value)}
//                                 onBlur={formik.handleBlur}
//                                 placeholder="Select Members"
//                                 className="mb-4"
//                             />
//                             {formik.touched.members && formik.errors.members && <small className="p-error">{formik.errors.members}</small>}
//                         </div>
//                     </Col>
//                 </Row>

//                 <Row>
//                     <Col>
//                         <div className="p-field col-12 md:col-6">
//                             <label htmlFor="startDate">Start Date</label>
//                             <br />
//                             <Calendar id="startDate" name="startDate" value={formik.values.startDate} onChange={(e) => formik.setFieldValue('startDate', e.value)} onBlur={formik.handleBlur} showIcon className="mb-4" />
//                             {formik.touched.startDate && formik.errors.startDate && <small className="p-error">{formik.errors.startDate}</small>}
//                         </div>
//                     </Col>
//                     <Col>
//                         <div className="p-field col-12 md:col-6">
//                             <label htmlFor="deadline">Deadline</label>
//                             <br />
//                             <Calendar id="deadline" name="deadline" value={formik.values.deadline} onChange={(e) => formik.setFieldValue('deadline', e.value)} onBlur={formik.handleBlur} showIcon className="mb-4" />
//                             {formik.touched.deadline && formik.errors.deadline && <small className="p-error">{formik.errors.deadline}</small>}
//                         </div>
//                     </Col>
//                 </Row>

//                 <Row>
//                     <Col>
//                         <div className="p-field col-12 md:col-6">
//                             <label htmlFor="totalRate">Total Rate</label>
//                             <br />
//                             <InputText id="totalRate" name="totalRate" value={formik.values.totalRate} onChange={formik.handleChange} onBlur={formik.handleBlur} className="mb-4" />
//                             {formik.touched.totalRate && formik.errors.totalRate && <small className="p-error">{formik.errors.totalRate}</small>}
//                         </div>
//                     </Col>
//                     <Col>
//                     <div>
//                     <label htmlFor="totalRate">Total Rate</label>
//                         <Chips name="tags" value={formik.values.tags} onChange={(e) => formik.setFieldValue('tags', e.value)} />
//                     </div>
//                     </Col>
//                 </Row>
//                 <div className="p-field col-12">
//                     <label htmlFor="description">Description</label>
//                     <br />
//                     <Editor id="description" name="description" value={formik.values.description} onTextChange={(e) => formik.setFieldValue('description', e.htmlValue)} className="mb-4" />
//                 </div>

//                 <div className="d-flex">
//                     <Checkbox inputId="sendEmail" name="sendEmail" checked={formik.values.sendEmail} onChange={formik.handleChange} className="mb-4" />
//                     <label htmlFor="sendEmail" className='ms-2'>Send Email</label>
//                     <br />
//                 </div>
//                 <div className="p-field col-sm-12 col-md-2">
//                     <Button label="Submit" icon="pi pi-check" onClick={formik.handleSubmit} className="btn-all" />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default EditProjectForm;
// EditProjectForm.tsx
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem, Select, FormControl, InputLabel, Checkbox, FormControlLabel, Button, Chip, Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Editor } from 'primereact/editor';
import { FormValues, Customer, User, Project } from '../../../type/customer-project';
// import { Customer, User, Project, FormValues } from '../../../../';

interface EditProjectFormProps {
    onSubmit: (values: FormValues) => void;
    customers: Customer[];
    users: any;
    project: Project;
    loading: boolean;
}

const projectStatusOptions = [
    { label: 'Not Started', value: 'NOT_STARTED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'On Hold', value: 'ON_HOLD' },
    { label: 'Cancelled', value: 'CANCELLED' },
    { label: 'Finished', value: 'FINISHED' }
];

const EditProjectForm: React.FC<EditProjectFormProps> = ({ onSubmit, customers, users, project, loading }) => {
    const formik = useFormik<FormValues>({
        initialValues: {
            projectName: project?.projectName || '',
            customer: project?.customer?._id || null,
            projectStatus: project?.projectStatus || 'IN_PROGRESS',
            totalRate: project?.totalRate || '',
            members: project?.members.map((member) => member._id) || [],
            status: project?.status || 'ACTIVE',
            startDate: project?.startDate || null,
            deadline: project?.deadline || null,
            description: project?.description || '',
            sendEmail: project?.sendEmail || false,
            tags: project?.tags || []
        },
        onSubmit,
        validationSchema: Yup.object({
            projectName: Yup.string().required('Project name is required'),
            customer: Yup.string().required('Customer is required'),
            projectStatus: Yup.string().required('Project status is required'),
            totalRate: Yup.number().required('Total rate is required').positive(),
            members: Yup.array().min(1, 'At least one member is required'),
            status: Yup.string().required('Status is required'),
            startDate: Yup.date().nullable(),
            deadline: Yup.date().nullable(),
            description: Yup.string(),
            sendEmail: Yup.boolean(),
            tags: Yup.array()
        })
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField
                label="Project Name"
                name="projectName"
                value={formik.values.projectName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.projectName && Boolean(formik.errors.projectName)}
                helperText={formik.touched.projectName && formik.errors.projectName}
                fullWidth
                margin="normal"
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Project Status</InputLabel>
                <Select
                    name="projectStatus"
                    value={formik.values.projectStatus}
                    onChange={(e) => formik.setFieldValue('projectStatus', e.target.value)}
                    onBlur={formik.handleBlur}
                    error={formik.touched.projectStatus && Boolean(formik.errors.projectStatus)}
                >
                    {projectStatusOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Customer</InputLabel>
                <Select
                    name="customer"
                    value={formik.values.customer}
                    onChange={(e) => formik.setFieldValue('customer', e.target.value)}
                    onBlur={formik.handleBlur}
                    error={formik.touched.customer && Boolean(formik.errors.customer)}
                    disabled={loading}
                >
                    {customers.map((customer) => (
                        <MenuItem key={customer._id} value={customer._id}>
                            {customer.Companyname}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <Autocomplete
                    multiple
                    options={users}
                    getOptionLabel={(option) => option.firstname}
                    value={users.filter((user) => formik.values.members.includes(user._id))}
                    onChange={(_, newValue) =>
                        formik.setFieldValue(
                            'members',
                            newValue.map((user) => user._id)
                        )
                    }
                    onBlur={formik.handleBlur}
                    renderInput={(params) => <TextField {...params} label="Members" error={formik.touched.members && Boolean(formik.errors.members)} helperText={formik.touched.members && formik.errors.members} />}
                />
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Start Date"
                    value={formik.values.startDate}
                    onChange={(date) => formik.setFieldValue('startDate', date)}
                    slotProps={{
                        textField: {
                            onBlur: formik.handleBlur,
                            name: 'startDate',
                            error: formik.touched.startDate && Boolean(formik.errors.startDate),
                            helperText: formik.touched.startDate && typeof formik.errors.startDate === 'string' ? formik.errors.startDate : undefined,
                            fullWidth: true,
                            margin: 'normal'
                        }
                    }}
                />
                <DatePicker
                    label="Deadline"
                    value={formik.values.deadline}
                    onChange={(date) => formik.setFieldValue('deadline', date)}
                    slotProps={{
                        textField: {
                            onBlur: formik.handleBlur,
                            name: 'deadline',
                            error: formik.touched.deadline && Boolean(formik.errors.deadline),
                            helperText: formik.touched.deadline && typeof formik.errors.deadline === 'string' ? formik.errors.deadline : undefined,
                            fullWidth: true,
                            margin: 'normal'
                        }
                    }}
                />
            </LocalizationProvider>
            <TextField
                label="Total Rate"
                name="totalRate"
                value={formik.values.totalRate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.totalRate && Boolean(formik.errors.totalRate)}
                helperText={formik.touched.totalRate && typeof formik.errors.totalRate === 'string' ? formik.errors.totalRate : undefined}
                fullWidth
                margin="normal"
            />
            <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formik.values.tags}
                onChange={(_, newValue) => formik.setFieldValue('tags', newValue)}
                renderTags={(value, getTagProps) => value.map((option, index) => <Chip label={option} {...getTagProps({ index })} />)}
                renderInput={(params) => <TextField {...params} label="Tags" placeholder="Add tags" />}
            />
            <Editor value={formik.values.description} onTextChange={(e) => formik.setFieldValue('description', e.htmlValue)} style={{ height: '320px' }} />
            <FormControlLabel control={<Checkbox name="sendEmail" checked={formik.values.sendEmail} onChange={formik.handleChange} />} label="Send Email" />
            <Button type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </form>
    );
};

export default EditProjectForm;
