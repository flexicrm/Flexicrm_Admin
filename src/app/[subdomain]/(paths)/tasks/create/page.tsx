'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Checkbox, FormControlLabel, Button, Grid, MenuItem, Select, InputLabel, FormControl, Chip, OutlinedInput, Box, Autocomplete } from '@mui/material';
import { TaskManagement } from '../../../../../../api/page';
import Cookies from 'js-cookie';
// You may need to install @mui/x-date-pickers for DatePicker
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Swal from 'sweetalert2';
import axios from 'axios';

const TaskForm: React.FC = () => {
    // Dummy state for users, projects, tags, error
    const [users, setUsersList] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [tagsOptions, setTagsOptions] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Replace with your actual accessToken, subdomain, API_BASE_URL, dispatch, setCustomber
    const accessToken = ''; // get from context or props
    const subdomain = Cookies.get('subdomain') || '';
    const API_BASE_URL = ''; // set your API base URL

    const fetchUsers = useCallback(async () => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            const response = await axios.get(`${API_BASE_URL}/user/${subdomain}`, { headers });
            setUsersList(response?.data?.data?.users || []);
        } catch (error) {
            setError('Error fetching users. Please try again.');
        }
    }, [accessToken, subdomain]);

    const fetchProjects = useCallback(async () => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            const response = await axios.get(`${API_BASE_URL}/project/${subdomain}`, { headers });
            setProjects(response?.data?.data?.projects || []);
        } catch (error) {
            setError('Error fetching projects. Please try again.');
        }
    }, [accessToken, subdomain]);

    useEffect(() => {
        fetchUsers();
        fetchProjects();
        // Dummy tags
        setTagsOptions(['Frontend', 'Backend', 'Bug', 'Feature']);
    }, [fetchUsers, fetchProjects]);

    const usersOptions = users.map((user) => ({
        firstname: user.firstname,
        id: user._id
    }));

    const projectsOptions = useMemo(
        () =>
            projects.map((project) => ({
                label: project.projectName,
                value: project._id
            })),
        [projects]
    );

    const priorityOptions = [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' }
    ];
    const repeatOptions = [
        { label: 'daily', value: 'daily' },
        { label: 'weekly', value: 'weekly' },
        { label: 'monthly', value: 'monthly' },
        { label: 'yearly', value: 'yearly' },
        { label: 'none', value: 'none' }
    ];

    const formik = useFormik({
        initialValues: {
            subject: '',
            milestone: '',
            billable: false,
            public: false,
            startDate: null as Date | null,
            dueDate: null as Date | null,
            priority: '',
            repeatEvery: '',
            tags: [] as string[],
            description: '',
            assignedTo: [] as string[],
            project: '',
            followers: [] as string[]
        },
        validationSchema: Yup.object({
            subject: Yup.string().required('Subject is required'),
            milestone: Yup.string().required('Milestone is required'),
            billable: Yup.boolean().required('Billable is required'),
            public: Yup.boolean().required('Public is required'),
            startDate: Yup.date().required('Start date is required').nullable(),
            dueDate: Yup.date().required('Due date is required').nullable(),
            priority: Yup.string().required('Priority is required'),
            repeatEvery: Yup.string().required('Repeat every is required'),
            tags: Yup.array().of(Yup.string()).required('Tags are required'),
            description: Yup.string().required('Description is required'),
            assignedTo: Yup.array().of(Yup.string()).required('Assigned to is required'),
            project: Yup.string().required('Project is required'),
            followers: Yup.array().of(Yup.string()).required('Followers are required')
        }),
        onSubmit: async (values) => {
            try {
                await TaskManagement(values, subdomain);
                Swal.fire('Created!', 'Task has been created.', 'success');
            } catch (error) {
                Swal.fire('Error', 'Failed to create task.', 'error');
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Subject"
                        id="subject"
                        name="subject"
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.subject && Boolean(formik.errors.subject)}
                        helperText={formik.touched.subject && formik.errors.subject}
                        margin="normal"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                        fullWidth
                        label="Milestone"
                        id="milestone"
                        name="milestone"
                        value={formik.values.milestone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.milestone && Boolean(formik.errors.milestone)}
                        helperText={formik.touched.milestone && formik.errors.milestone}
                        margin="normal"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <FormControlLabel control={<Checkbox id="billable" name="billable" checked={formik.values.billable} onChange={formik.handleChange} />} label="Billable" />
                    {formik.touched.billable && formik.errors.billable && <div style={{ color: 'red', fontSize: 12 }}>{formik.errors.billable}</div>}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <FormControlLabel control={<Checkbox id="public" name="public" checked={formik.values.public} onChange={formik.handleChange} />} label="Public" />
                    {formik.touched.public && formik.errors.public && <div style={{ color: 'red', fontSize: 12 }}>{formik.errors.public}</div>}
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <DatePicker
                        label="Start Date"
                        value={formik.values.startDate}
                        onChange={(value) => formik.setFieldValue('startDate', value)}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                label: 'Start Date',
                                error: formik.touched.startDate && Boolean(formik.errors.startDate),
                                helperText: formik.touched.startDate && typeof formik.errors.startDate ? 'string' : undefined
                            }
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <DatePicker
                        label="Due Date"
                        value={formik.values.dueDate}
                        onChange={(value) => formik.setFieldValue('dueDate', value)}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                margin: 'normal',
                                error: formik.touched.dueDate && Boolean(formik.errors.dueDate),
                                helperText: formik.touched.dueDate && typeof formik.errors.dueDate ? 'string' : undefined
                            }
                        }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="priority-label">Priority</InputLabel>
                        <Select labelId="priority-label" id="priority" name="priority" value={formik.values.priority} label="Priority" onChange={formik.handleChange} error={formik.touched.priority && Boolean(formik.errors.priority)}>
                            {priorityOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.priority && formik.errors.priority && <div style={{ color: 'red', fontSize: 12 }}>{formik.errors.priority}</div>}
                    </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="repeatEvery-label">Repeat Every</InputLabel>
                        <Select
                            labelId="repeatEvery-label"
                            id="repeatEvery"
                            name="repeatEvery"
                            value={formik.values.repeatEvery}
                            label="Repeat Every"
                            onChange={formik.handleChange}
                            error={formik.touched.repeatEvery && Boolean(formik.errors.repeatEvery)}
                        >
                            {repeatOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                        {formik.touched.repeatEvery && formik.errors.repeatEvery && <div style={{ color: 'red', fontSize: 12 }}>{formik.errors.repeatEvery}</div>}
                    </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Autocomplete
                        multiple
                        id="tags"
                        options={tagsOptions}
                        value={formik.values.tags}
                        onChange={(_, value) => formik.setFieldValue('tags', value)}
                        renderTags={(value: string[], getTagProps) => value.map((option: string, index: number) => <Chip variant="outlined" label={option} {...getTagProps({ index })} key={option} />)}
                        renderInput={(params) => <TextField {...params} label="Tags" margin="normal" error={formik.touched.tags && Boolean(formik.errors.tags)} helperText={formik.touched.tags && formik.errors.tags} />}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Autocomplete
                        multiple
                        id="assignedTo"
                        options={usersOptions}
                        getOptionLabel={(option) => option.firstname}
                        value={usersOptions.filter((u) => formik.values.assignedTo.includes(u.id))}
                        onChange={(_, value) =>
                            formik.setFieldValue(
                                'assignedTo',
                                value.map((v) => v.id)
                            )
                        }
                        renderTags={(value: any[], getTagProps) => value.map((option, index) => <Chip variant="outlined" label={option.firstname} {...getTagProps({ index })} key={option.id} />)}
                        renderInput={(params) => <TextField {...params} label="Assigned To" margin="normal" error={formik.touched.assignedTo && Boolean(formik.errors.assignedTo)} helperText={formik.touched.assignedTo && formik.errors.assignedTo} />}
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
                        {formik.touched.project && formik.errors.project && <div style={{ color: 'red', fontSize: 12 }}>{formik.errors.project}</div>}
                    </FormControl>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Autocomplete
                        multiple
                        id="followers"
                        options={usersOptions}
                        getOptionLabel={(option) => option.firstname}
                        value={usersOptions.filter((u) => formik.values.followers.includes(u.id))}
                        onChange={(_, value) =>
                            formik.setFieldValue(
                                'followers',
                                value.map((v) => v.id)
                            )
                        }
                        renderTags={(value: any[], getTagProps) => value.map((option, index) => <Chip variant="outlined" label={option.firstname} {...getTagProps({ index })} key={option.id} />)}
                        renderInput={(params) => <TextField {...params} label="Followers" margin="normal" error={formik.touched.followers && Boolean(formik.errors.followers)} helperText={formik.touched.followers && formik.errors.followers} />}
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <TextField
                        fullWidth
                        multiline
                        minRows={4}
                        label="Description"
                        id="description"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        margin="normal"
                    />
                </Grid>
                <Grid size={{ xs: 12 }}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Grid>
            </Grid>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    );
};

export default TaskForm;
