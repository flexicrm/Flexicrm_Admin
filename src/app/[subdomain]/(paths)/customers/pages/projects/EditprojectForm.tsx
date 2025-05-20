import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem, Select, FormControl, InputLabel, Checkbox, FormControlLabel, Button, Chip, Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Editor } from 'primereact/editor';
import type { Customer, User, Project, FormValues } from '../../../../../type/customer-project';

interface EditProjectFormProps {
    onSubmit: (values: FormValues) => void;
    customers: Customer[];
    users: User[];
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
    console.log(project, 'project');

    const formik = useFormik<FormValues>({
        initialValues: {
            projectName: project?.projectName || '',
            customer: project?.customer?._id || null,
            projectStatus: project?.projectStatus || 'IN_PROGRESS',
            totalRate: project?.totalRate || '',
            members: project?.members.map((member: any) => member._id) || [],
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
                            error: formik.touched.startDate && Boolean(formik.errors.startDate),
                            helperText: formik.touched.startDate && typeof formik.errors.startDate === 'string',
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
                            error: formik.touched.deadline && Boolean(formik.errors.deadline),
                            helperText: formik.touched.deadline && typeof formik.errors.deadline === 'string',
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
                helperText={formik.touched.totalRate && typeof formik.errors.totalRate === 'string'}
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
