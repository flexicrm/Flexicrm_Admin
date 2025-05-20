// 'use client';

// import React from 'react';
// import { useFormik, FormikHelpers } from 'formik';
// import * as Yup from 'yup';
// import { TextField, MenuItem, Select, InputLabel, FormControl, FormHelperText, Checkbox, FormControlLabel, Switch, Button, Chip, OutlinedInput, Box, Grid, Typography } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { Editor } from 'primereact/editor'; // No direct MUI equivalent, keeping as is or replace with MUI Rich Text Editor if needed

// type User = {
//     id: string | number;
//     firstname: string;
// };

// type Customer = {
//     id: string | number;
//     Companyname: string;
//     customerProfile?: string;
// };

// type ProjectFormProps = {
//     onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void | Promise<any>;
//     users: User[];
//     customers: Customer[];
// };

// const projectStatusOptions = [
//     { label: 'Not Started', value: 'NOT_STARTED' },
//     { label: 'In Progress', value: 'IN_PROGRESS' },
//     { label: 'On Hold', value: 'ON_HOLD' },
//     { label: 'Cancelled', value: 'CANCELLED' },
//     { label: 'Finished', value: 'FINISHED' }
// ];

// const validationSchema = Yup.object({
//     projectName: Yup.string().required('Project Name is required'),
//     totalRate: Yup.number().required('Total Rate is required').typeError('Total Rate must be a number'),
//     members: Yup.array().min(1, 'At least one member is required'),
//     startDate: Yup.date().required('Start Date is required').nullable(),
//     deadline: Yup.date().required('Deadline is required').nullable(),
//     description: Yup.string()
// });

// const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, users, customers }) => {
//     const formik = useFormik({
//         initialValues: {
//             projectName: '',
//             customer: '',
//             projectStatus: 'IN_PROGRESS',
//             totalRate: '',
//             members: [] as (string | number)[],
//             status: 'ACTIVE',
//             startDate: null as Date | null,
//             deadline: null as Date | null,
//             description: '',
//             sendEmail: false,
//             tags: [] as string[]
//         },
//         validationSchema,
//         onSubmit
//     });

//     return (
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <Box component="form" noValidate autoComplete="off" sx={{ p: 2 }}>
//                 <Grid container spacing={2}>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <TextField
//                             fullWidth
//                             id="projectName"
//                             name="projectName"
//                             label="Project Name"
//                             value={formik.values.projectName}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             helperText={formik.touched.projectName && formik.errors.projectName}
//                             margin="normal"
//                         />
//                     </Grid>
//                     {/* {console.log(projectStatusOptions, 'projectStatusOptions')} */}
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <FormControl fullWidth margin="normal" error={formik.touched.projectStatus && Boolean(formik.errors.projectStatus)}>
//                             <InputLabel id="projectStatus-label">Project Status</InputLabel>
//                             <Select labelId="projectStatus-label" id="projectStatus" name="projectStatus" value={formik.values.projectStatus} label="Project Status" onChange={formik.handleChange} onBlur={formik.handleBlur}>
//                                 {projectStatusOptions.map((option) => (
//                                     <MenuItem key={option.value} value={option.value}>
//                                         {option.label}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                             <FormHelperText>{formik.touched.projectStatus && formik.errors.projectStatus}</FormHelperText>
//                         </FormControl>
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <TextField
//                             fullWidth
//                             id="totalRate"
//                             name="totalRate"
//                             label="Total Rate"
//                             value={formik.values.totalRate}
//                             onChange={formik.handleChange}
//                             onBlur={formik.handleBlur}
//                             error={formik.touched.totalRate && Boolean(formik.errors.totalRate)}
//                             helperText={formik.touched.totalRate && formik.errors.totalRate}
//                             margin="normal"
//                         />
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <FormControl fullWidth margin="normal" error={formik.touched.members && Boolean(formik.errors.members)}>
//                             <InputLabel id="members-label">Members</InputLabel>
//                             <Select
//                                 labelId="members-label"
//                                 id="members"
//                                 name="members"
//                                 multiple
//                                 value={formik.values.members}
//                                 onChange={formik.handleChange}
//                                 input={<OutlinedInput label="Members" />}
//                                 renderValue={(selected) => (
//                                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                                         {(selected as (string | number)[]).map((value) => {
//                                             const user = users.find((u) => u.id === value);
//                                             return <Chip key={value} label={user ? user.firstname : value} />;
//                                         })}
//                                     </Box>
//                                 )}
//                             >
//                                 {users.map((user) => (
//                                     <MenuItem key={user.id} value={user.id}>
//                                         <Checkbox checked={formik.values.members.indexOf(user.id) > -1} />
//                                         {user.firstname}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                             <FormHelperText>{formik.touched.members && formik.errors.members}</FormHelperText>
//                         </FormControl>
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <FormControl fullWidth margin="normal" error={formik.touched.customer && Boolean(formik.errors.customer)}>
//                             <InputLabel id="customer-label">Customer</InputLabel>
//                             <Select
//                                 labelId="customer-label"
//                                 id="customer"
//                                 name="customer"
//                                 value={formik.values.customer}
//                                 label="Customer"
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 renderValue={(selected) => {
//                                     const customer = customers.find((c) => c.id === selected);
//                                     return (
//                                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                             {customer?.customerProfile && <img src={customer.customerProfile} alt={customer.Companyname} style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }} />}
//                                             <span>{customer?.Companyname}</span>
//                                         </Box>
//                                     );
//                                 }}
//                             >
//                                 {customers.map((customer) => (
//                                     <MenuItem key={customer.id} value={customer.id}>
//                                         <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                             {customer.customerProfile && <img src={customer.customerProfile} alt={customer.Companyname} style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }} />}
//                                             <span>{customer.Companyname}</span>
//                                         </Box>
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                             <FormHelperText>{formik.touched.customer && formik.errors.customer}</FormHelperText>
//                         </FormControl>
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <FormControlLabel control={<Switch checked={formik.values.status === 'ACTIVE'} onChange={(e) => formik.setFieldValue('status', e.target.checked ? 'ACTIVE' : 'INACTIVE')} name="status" color="primary" />} label="Active" />
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <DatePicker
//                             label="Start Date"
//                             value={formik.values.startDate}
//                             onChange={(value) => formik.setFieldValue('startDate', value)}
//                             renderInput={(params) => <TextField {...params} fullWidth margin="normal" error={formik.touched.startDate && Boolean(formik.errors.startDate)} helperText={formik.touched.startDate && formik.errors.startDate} />}
//                         />
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <DatePicker
//                             label="Deadline"
//                             value={formik.values.deadline}
//                             onChange={(value) => formik.setFieldValue('deadline', value)}
//                             renderInput={(params) => <TextField {...params} fullWidth margin="normal" error={formik.touched.deadline && Boolean(formik.errors.deadline)} helperText={formik.touched.deadline && formik.errors.deadline} />}
//                         />
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <FormControlLabel control={<Switch checked={formik.values.sendEmail} onChange={formik.handleChange} name="sendEmail" color="primary" />} label="Send Email" />
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <FormControl fullWidth margin="normal">
//                             <InputLabel htmlFor="tags">Tags</InputLabel>
//                             <Select
//                                 multiple
//                                 value={formik.values.tags}
//                                 onChange={formik.handleChange}
//                                 input={<OutlinedInput id="tags" label="Tags" name="tags" />}
//                                 renderValue={(selected) => (
//                                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                                         {(selected as string[]).map((value) => (
//                                             <Chip key={value} label={value} />
//                                         ))}
//                                     </Box>
//                                 )}
//                                 name="tags"
//                             >
//                                 {/* Optionally, you can provide a list of tag suggestions here */}
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <Typography variant="subtitle1" gutterBottom>
//                             Description
//                         </Typography>
//                         {/* Replace with MUI Rich Text Editor if needed */}
//                         <Editor id="description" name="description" value={formik.values.description} onTextChange={(e) => formik.setFieldValue('description', e.htmlValue)} />
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <Button variant="contained" color="primary" onClick={() => formik.handleSubmit()} disabled={formik.isSubmitting} startIcon={<span className="material-icons">check</span>}>
//                             Submit
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </Box>
//         </LocalizationProvider>
//     );
// };

// export default ProjectForm;
'use client';

import React from 'react';
import { useFormik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem, Select, InputLabel, FormControl, FormHelperText, Checkbox, FormControlLabel, Switch, Button, Chip, OutlinedInput, Box, Grid, Typography, Autocomplete } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Editor } from 'primereact/editor';

type User = {
    id: string | number;
    firstname: string;
};

type Customer = {
    _id: string | number;
    Companyname: string;
    customerProfile?: string;
};

type ProjectFormProps = {
    onSubmit: (values: any, formikHelpers: FormikHelpers<any>) => void | Promise<any>;
    users: User[];
    customers: any;
    project: any;
};

const projectStatusOptions = [
    { label: 'Not Started', value: 'NOT_STARTED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'On Hold', value: 'ON_HOLD' },
    { label: 'Cancelled', value: 'CANCELLED' },
    { label: 'Finished', value: 'FINISHED' }
];

const validationSchema = Yup.object({
    projectName: Yup.string().required('Project Name is required'),
    customer: Yup.string().required('Customer is required'),
    totalRate: Yup.number().required('Total Rate is required').typeError('Total Rate must be a number'),
    members: Yup.array().min(1, 'At least one member is required'),
    startDate: Yup.date().required('Start Date is required').nullable(),
    deadline: Yup.date().required('Deadline is required').nullable(),
    description: Yup.string()
});

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, users, customers, project }) => {
    console.log(project, 'project');

    const formik = useFormik({
        initialValues: {
            projectName: project?.projectName || '',
            customer: project?.customer._id || '',
            projectStatus: project?.projectStatus || 'IN_PROGRESS',
            totalRate: project?.totalRate || '',
            members: project?.members.map((item) => item._id) || [],
            status: project?.status || 'ACTIVE',
            startDate: project?.startDate ? new Date(project.startDate) : null,
            deadline: project?.deadline ? new Date(project.deadline) : null,
            description: project?.description || '',
            sendEmail: project?.sendEmail || false,
            tags: project?.tags || []
        },
        validationSchema,
        onSubmit
    });
    console.log(formik.initialValues, 'customers');
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box component="form" onSubmit={formik.handleSubmit} noValidate autoComplete="off" sx={{ p: 2 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            id="projectName"
                            name="projectName"
                            label="Project Name"
                            value={formik.values.projectName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.projectName && Boolean(formik.errors.projectName)}
                            helperText={formik.touched.projectName && formik.errors.projectName === 'string' ? formik.errors.projectName : ''}
                            margin="normal"
                        />
                    </Grid>

                    {/* <Grid size={{ xs: 12, sm: 6 }}>
                        <FormControl fullWidth margin="normal" error={formik.touched.projectStatus && Boolean(formik.errors.projectStatus)}>
                            <InputLabel id="projectStatus">Project Status</InputLabel>
                            <Select labelId="projectStatus-label" id="projectStatus" name="projectStatus" value={formik.values.projectStatus} label="Project Status" onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                {projectStatusOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{formik.touched.projectStatus && typeof formik.errors.projectStatus === 'string' ? formik.errors.projectStatus : ''}</FormHelperText>
                        </FormControl>
                    </Grid> */}

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            id="totalRate"
                            name="totalRate"
                            label="Total Rate"
                            value={formik.values.totalRate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.totalRate && Boolean(formik.errors.totalRate)}
                            helperText={formik.touched.totalRate && formik.errors.totalRate === 'string' ? formik.errors.totalRate : ''}
                            margin="normal"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <FormControl fullWidth margin="normal" error={formik.touched.members && Boolean(formik.errors.members)}>
                            <InputLabel id="members-label">Members</InputLabel>
                            <Select
                                labelId="members-label"
                                id="members"
                                name="members"
                                multiple
                                value={formik.values.members}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                input={<OutlinedInput label="Members" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {(selected as (string | number)[]).map((value) => {
                                            const user = users.find((u) => u.id === value);
                                            return <Chip key={value} label={user ? user.firstname : value} />;
                                        })}
                                    </Box>
                                )}
                            >
                                {users.map((user) => (
                                    <MenuItem key={user.id} value={user.id}>
                                        <Checkbox checked={formik.values.members.indexOf(user.id) > -1} />
                                        {user.firstname}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{formik.touched.members && typeof formik.errors.members === 'string' ? formik.errors.members : ''}</FormHelperText>
                        </FormControl>
                    </Grid>

                    {/* <Grid size={{ xs: 12, sm: 6 }}>
                        <FormControl fullWidth margin="normal" error={formik.touched.customer && Boolean(formik.errors.customer)}>
                            <InputLabel id="customer-label">Customer</InputLabel>
                            <Select
                                labelId="customer-label"
                                id="customer"
                                name="customer"
                                value={formik.values.customer || ''}
                                label="Customer"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                displayEmpty // Ensures placeholder is shown when empty
                                renderValue={(selected) => {
                                    if (!selected) {
                                        return <em style={{ color: '#aaa' }}>Select a customer</em>;
                                    }
                                    const customer = customers.find((c) => String(c.id) === String(selected));
                                    return customer?.Companyname || selected; // Show only the name (no image)
                                }}
                            >
                                <MenuItem value="" disabled>
                                    <em>Select a customer</em>
                                </MenuItem>
                                {customers.map((customer) => (
                                    <MenuItem key={customer.id} value={customer.id}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {customer.customerProfile && <img src={customer.customerProfile} alt={customer.Companyname} style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 8 }} />}
                                            <span>{customer.Companyname}</span>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{formik.touched.customer && typeof formik.errors.customer === 'string' ? formik.errors.customer : ''}</FormHelperText>
                        </FormControl>
                    </Grid> */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <FormControl fullWidth margin="normal" error={formik.touched.customer && Boolean(formik.errors.customer)}>
                            <InputLabel id="customer-label">Customer</InputLabel>
                            <Select
                                labelId="customer-label"
                                id="customer"
                                name="customer"
                                value={formik.values.customer || ''}
                                label="Customer"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                displayEmpty
                                renderValue={(selected) => {
                                    console.log(selected, 'selected');
                                    if (!selected) {
                                        return <em style={{ color: '#aaa' }}>Select a customer</em>;
                                    }
                                    const customer = customers.find((c: Customer) => String(c._id) === String(selected));
                                    return customer?.Companyname || selected; // Only show company name here
                                }}
                            >
                                <MenuItem value="" disabled>
                                    <em>Select a customer</em>
                                </MenuItem>
                                {customers.map((customer: Customer) => (
                                    <MenuItem key={customer._id} value={customer._id}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {/* {console.log(customer, 'customer')} */}

                                            {customer.customerProfile && (
                                                <img
                                                    src={customer.customerProfile}
                                                    alt={customer.Companyname}
                                                    style={{
                                                        width: 30,
                                                        height: 30,
                                                        borderRadius: '50%',
                                                        marginRight: 8
                                                    }}
                                                />
                                            )}
                                            <span>{customer.Companyname}</span>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{formik.touched.customer && typeof formik.errors.customer === 'string' ? formik.errors.customer : ''}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <FormControl fullWidth margin="normal" error={formik.touched.projectStatus && Boolean(formik.errors.projectStatus)}>
                            <InputLabel id="projectStatus">Project Status</InputLabel>
                            <Select labelId="projectStatus-label" id="projectStatus" name="projectStatus" value={formik.values.projectStatus} label="Project Status" onChange={formik.handleChange} onBlur={formik.handleBlur}>
                                {projectStatusOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText>{formik.touched.projectStatus && typeof formik.errors.projectStatus === 'string' ? formik.errors.projectStatus : ''}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <DatePicker
                            label="Start Date"
                            // id="startDate"
                            value={formik.values.startDate}
                            onChange={(value) => formik.setFieldValue('startDate', value)}
                            name="startDate"
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    margin: 'normal',
                                    error: formik.touched.startDate && Boolean(formik.errors.startDate),
                                    helperText: formik.touched.startDate && formik.errors.startDate === 'string' ? formik.errors.startDate : undefined
                                }
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                        <DatePicker
                            label="Deadline"
                            value={formik.values.deadline}
                            onChange={(value) => formik.setFieldValue('deadline', value)}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    margin: 'normal',
                                    error: formik.touched.deadline && Boolean(formik.errors.deadline),
                                    helperText: formik.touched.deadline && typeof formik.errors.deadline === 'string' ? formik.errors.deadline : undefined
                                }
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }} style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                        <FormControlLabel control={<Switch checked={formik.values.status === 'ACTIVE'} onChange={(e) => formik.setFieldValue('status', e.target.checked ? 'ACTIVE' : 'INACTIVE')} name="status" color="primary" />} label="Active" />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 12 }}>
                        {/* <FormControl fullWidth margin="normal">
                            <InputLabel shrink htmlFor="tags">
                                Tags
                            </InputLabel>
                            <OutlinedInput
                                id="tags"
                                label="Tags"
                                name="tags"
                                placeholder="Type and press Enter"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && typeof e.currentTarget.value === 'string' && e.currentTarget.value.trim() !== '') {
                                        e.preventDefault();
                                        const value = e.currentTarget.value.trim();
                                        if (!formik.values.tags.includes(value)) {
                                            formik.setFieldValue('tags', [...formik.values.tags, value]);
                                        }
                                        setTimeout(() => {
                                            e.currentTarget.value = '';
                                        }, 0);
                                    }
                                }}
                                inputProps={{ 'data-testid': 'tags-input' }}
                                endAdornment={
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {formik.values.tags.map((tag: string) => (
                                            <Chip
                                                key={tag}
                                                label={tag}
                                                onDelete={() =>
                                                    formik.setFieldValue(
                                                        'tags',
                                                        formik.values.tags.filter((t: string) => t !== tag)
                                                    )
                                                }
                                                sx={{ m: 0.25 }}
                                            />
                                        ))}
                                    </Box>
                                }
                            />
                        </FormControl> */}
                        <Autocomplete
                            multiple
                            freeSolo
                            options={[]}
                            value={formik.values.tags}
                            onChange={(_, newValue) => formik.setFieldValue('tags', newValue)}
                            renderTags={(value, getTagProps) => value.map((option, index) => <Chip label={option} {...getTagProps({ index })} />)}
                            renderInput={(params) => <TextField {...params} label="Tags" placeholder="Add tags" />}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12 }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Description
                        </Typography>
                        <Editor id="description" name="description" value={formik.values.description} onTextChange={(e) => formik.setFieldValue('description', e.htmlValue)} style={{ height: '200px' }} />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <div>
                            <FormControlLabel control={<Switch checked={formik.values.sendEmail} onChange={formik.handleChange} name="sendEmail" color="primary" />} label="Send Email" />
                        </div>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 12 }}>
                        <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', justifyContent: 'end' }}>
                            <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
                                Submit
                            </Button>
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </LocalizationProvider>
    );
};

export default ProjectForm;
