// 'use client';
// import React, { useEffect, useMemo, useState } from 'react';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import Cookies from 'js-cookie';
// import { API_BASE_URL } from '../../../utils';
// import { TextField, Button, MenuItem, Select, InputLabel, FormControl, CircularProgress, Box, Typography, IconButton } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';
// import { CustomChip } from '../../../Component/Chip/Chip';

// interface LeadStatusType {
//     _id: string;
//     statusName?: string;
//     color: string;
// }

// interface LeadStatusProps {
//     onSelect: (id: string) => void;
//     leadStatus: any;
//     // error: any;
// }

// const LeadStatus: React.FC<LeadStatusProps> = ({ onSelect, leadStatus }) => {
//     const [leadstatus, setLeadStatus] = useState<LeadStatusType[]>([]);
//     const [isAddingNewSource, setIsAddingNewSource] = useState(false);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const accessToken = Cookies.get('accessToken');
//     const subdomain = Cookies.get('subdomain');
//     console.log(onSelect, 'onSelect');
//     // Set default values if leadStatus is provided
//     console.log(leadStatus, 'leadStatusWWWWWWWWWWWWWWWWWW');

//     useEffect(() => {
//         if (leadStatus) {
//             formik.setFieldValue('StatusName', leadStatus._id || '');
//             formik.setFieldValue('color', `#${leadStatus.color || '000000'}`);
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [leadStatus]);
//     console.log(leadStatus, 'leadStatus>>>>>>>>>>>>>>>>>>>>>>>');

//     const formik = useFormik({
//         initialValues: { StatusName: leadStatus || '', color: '#000000' },
//         onSubmit: async (values, { resetForm }) => {
//             const newLeadSource = values.StatusName;
//             const colors = values.color;

//             const headers = { Authorization: `Bearer ${accessToken}` };

//             try {
//                 setLoading(true);
//                 await axios.post(`${API_BASE_URL}/leadstatus/${subdomain}`, { statusName: newLeadSource, color: colors.replace('#', '') }, { headers });
//                 resetForm();
//                 setIsAddingNewSource(false);
//                 setError('');
//                 fetchLeadSources();
//             } catch (error) {
//                 setError('Error adding new lead source. Please try again.');
//                 console.error('Error adding new lead source:', error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     });

//     const fetchLeadSources = async () => {
//         setError('');
//         const headers = { Authorization: `Bearer ${accessToken}` };

//         try {
//             setLoading(true);
//             const response = await axios.get(`${API_BASE_URL}/leadstatus/${subdomain}`, { headers });
//             console.log(response, 'response ');
//             setLeadStatus(response?.data?.data || []);
//         } catch (error) {
//             setLeadStatus([]);
//             setError('Error fetching lead sources.');
//             console.error('Error fetching lead sources:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (subdomain && accessToken) {
//             fetchLeadSources();
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [subdomain, accessToken]);

//     const UsersOptions = useMemo(
//         () =>
//             leadstatus.map((lead) => ({
//                 label: lead?.statusName,
//                 value: lead._id,
//                 color: lead.color
//             })),
//         [leadstatus]
//     );

//     return (
//         <>
//             <Box display="flex" alignItems="center" mb={2}>
//                 {!isAddingNewSource && (
//                     <>
//                         <FormControl sx={{ minWidth: 200 }} fullWidth size="small">
//                             <InputLabel id="lead-status-label">Select Lead Status</InputLabel>
//                             <Select
//                                 labelId="lead-status-label"
//                                 value={formik.values.StatusName}
//                                 label="Select Lead Status"
//                                 onChange={(e) => {
//                                     const selectedValue = e.target.value;
//                                     if (selectedValue === 'addNew') {
//                                         setIsAddingNewSource(true);
//                                         formik.setFieldValue('StatusName', '');
//                                     } else {
//                                         onSelect(selectedValue as string);
//                                         formik.setFieldValue('StatusName', selectedValue);
//                                     }
//                                 }}
//                                 renderValue={(selected) => {
//                                     const option = UsersOptions?.find((opt) => opt.value === selected);
//                                     return option ? (
//                                         <CustomChip
//                                             status={{
//                                                 hexColor: option?.color,
//                                                 statusName: option?.label || 'null'
//                                             }}
//                                         />
//                                     ) : (
//                                         <span>Select Lead Status</span>
//                                     );
//                                 }}
//                             >
//                                 {UsersOptions.map((option) => (
//                                     <MenuItem key={option.value} value={option.value}>
//                                         {/* <Box> */}
//                                         {/* <Box
//                                                 sx={{
//                                                     width: 16,
//                                                     height: 16,
//                                                     // borderRadius: '15px',
//                                                     bgcolor: `#${option.color}`,
//                                                     mr: 1
//                                                 }}
//                                             />
//                                             {option.label} */}
//                                         <CustomChip
//                                             status={{
//                                                 hexColor: option?.color,
//                                                 statusName: option?.label || 'null'
//                                             }}
//                                         />
//                                         {/* </Box> */}
//                                     </MenuItem>
//                                 ))}
//                                 <MenuItem value="addNew">
//                                     <Box display="flex" alignItems="center">
//                                         <AddIcon fontSize="small" sx={{ mr: 1 }} />
//                                         Add New Status
//                                     </Box>
//                                 </MenuItem>
//                             </Select>
//                         </FormControl>
//                     </>
//                 )}
//                 {isAddingNewSource && (
//                     <Box display="flex" alignItems="center">
//                         <TextField name="StatusName" id="StatusName" size="small" placeholder="New status Name" value={formik.values.StatusName} onChange={formik.handleChange} required sx={{ ml: 1 }} />
//                         <input type="color" id="color" name="color" value={formik.values.color} onChange={formik.handleChange} style={{ marginLeft: 8, width: 40, border: 'none', background: 'none' }} />
//                         <IconButton color="primary" onClick={formik.handleSubmit as any} disabled={loading} sx={{ ml: 1 }}>
//                             <CheckIcon />
//                         </IconButton>
//                         <IconButton color="error" onClick={() => setIsAddingNewSource(false)} disabled={loading}>
//                             <CloseIcon />
//                         </IconButton>
//                     </Box>
//                 )}
//             </Box>
//             {formik.touched.StatusName && formik.errors.StatusName && typeof formik.errors.StatusName === 'string' && <Typography color="error">{formik.errors.StatusName}</Typography>}
//             {loading && (
//                 <Box display="flex" alignItems="center">
//                     <CircularProgress size={20} sx={{ mr: 1 }} />
//                     <Typography>Loading...</Typography>
//                 </Box>
//             )}
//             {error && <Typography color="error">{error}</Typography>}
//         </>
//     );
// };

// export default LeadStatus;
// import React, { useEffect, useMemo, useState } from 'react';
// import axios from 'axios';
// import { useFormik } from 'formik';
// import Cookies from 'js-cookie';
// import { API_BASE_URL } from '../../../utils';
// import { TextField, Button, MenuItem, Select, InputLabel, FormControl, CircularProgress, Box, Typography, IconButton } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import CheckIcon from '@mui/icons-material/Check';
// import CloseIcon from '@mui/icons-material/Close';
// import { CustomChip } from '../../../Component/Chip/Chip';

// interface LeadStatusType {
//     _id: string;
//     statusName?: string;
//     color: string;
// }

// interface LeadStatusProps {
//     onSelect: (id: string) => void;
//     leadStatus: any;
// }

// const LeadStatus: React.FC<LeadStatusProps> = ({ onSelect, leadStatus }) => {
//     const [leadstatus, setLeadStatus] = useState<LeadStatusType[]>([]);
//     const [isAddingNewSource, setIsAddingNewSource] = useState(false);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const accessToken = Cookies.get('accessToken');
//     const subdomain = Cookies.get('subdomain');

//     useEffect(() => {
//         if (leadStatus) {
//             formik.setFieldValue('StatusName', leadStatus._id || '');
//             formik.setFieldValue('color', `#${leadStatus.color || '000000'}`);
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [leadStatus]);

//     const formik = useFormik({
//         initialValues: { StatusName: leadStatus || '', color: '#000000' },
//         onSubmit: async (values, { resetForm }) => {
//             const newLeadSource = values.StatusName;
//             const colors = values.color;

//             const headers = { Authorization: `Bearer ${accessToken}` };

//             try {
//                 setLoading(true);
//                 await axios.post(`${API_BASE_URL}/leadstatus/${subdomain}`, { statusName: newLeadSource, color: colors.replace('#', '') }, { headers });
//                 resetForm();
//                 setIsAddingNewSource(false);
//                 setError('');
//                 fetchLeadSources();
//             } catch (error) {
//                 setError('Error adding new lead source. Please try again.');
//                 console.error('Error adding new lead source:', error);
//             } finally {
//                 setLoading(false);
//             }
//         }
//     });
//     console.log(formik.initialValues, 'initalvaluess');
//     const fetchLeadSources = async () => {
//         setError('');
//         const headers = { Authorization: `Bearer ${accessToken}` };

//         try {
//             setLoading(true);
//             const response = await axios.get(`${API_BASE_URL}/leadstatus/${subdomain}`, { headers });
//             setLeadStatus(response?.data?.data || []);
//         } catch (error) {
//             setLeadStatus([]);
//             setError('Error fetching lead sources.');
//             console.error('Error fetching lead sources:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (subdomain && accessToken) {
//             fetchLeadSources();
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [subdomain, accessToken]);

//     const UsersOptions = useMemo(
//         () =>
//             leadstatus.map((lead) => ({
//                 label: lead?.statusName,
//                 value: lead._id,
//                 color: lead.color
//             })),
//         [leadstatus]
//     );

//     const handleSelectChange = (e) => {
//         const selectedValue = e.target.value;

//         if (selectedValue === 'addNew') {
//             setIsAddingNewSource(true);
//             formik.setFieldValue('StatusName', '');
//         } else {
//             console.log(selectedValue, 'selectedValue');
//             formik.setFieldValue('StatusName', selectedValue);
//             onSelect(selectedValue as string);
//         }
//     };

//     return (
//         <>
//             <Box display="flex" alignItems="center">
//                 {!isAddingNewSource && (
//                     <>
//                         <FormControl sx={{ minWidth: 200 }} fullWidth size="small">
//                             <InputLabel id="lead-status-label">Double Tap Lead Status</InputLabel>
//                             <Select
//                                 labelId="lead-status-label"
//                                 value={formik.values.StatusName}
//                                 label="Double Tap Lead Status"
//                                 onChange={handleSelectChange}
//                                 renderValue={(selected) => {
//                                     const option = UsersOptions?.find((opt) => opt.value == selected);
//                                     console.log(option, 'option');
//                                     return option ? <div style={{ backgroundColor: `#${option.color}`, padding: '8px' }}>{option.label || 'null'}</div> : <span>Select Lead Status</span>;
//                                 }}
//                             >
//                                 {UsersOptions.map((option) => (
//                                     <MenuItem key={option.value} value={option.value} sx={{ width: '100%' }}>
//                                         <CustomChip
//                                             status={{
//                                                 hexcolor: option?.color,
//                                                 statusName: option?.label || 'null'
//                                             }}
//                                         />
//                                     </MenuItem>
//                                 ))}
//                                 <MenuItem value="addNew">
//                                     <Box display="flex" alignItems="center">
//                                         <AddIcon fontSize="small" sx={{ mr: 1 }} />
//                                         Add New Status
//                                     </Box>
//                                 </MenuItem>
//                             </Select>
//                         </FormControl>
//                     </>
//                 )}
//                 {isAddingNewSource && (
//                     <Box display="flex" alignItems="center">
//                         <TextField name="StatusName" id="StatusName" size="small" placeholder="New status Name" value={formik.values.StatusName} onChange={formik.handleChange} required sx={{ ml: 1 }} />
//                         <input type="color" id="color" name="color" value={formik.values.color} onChange={formik.handleChange} style={{ marginLeft: 8, width: 40, border: 'none', background: 'none' }} />
//                         <IconButton color="primary" onClick={formik.handleSubmit as any} disabled={loading} sx={{ ml: 1 }}>
//                             <CheckIcon />
//                         </IconButton>
//                         <IconButton color="error" onClick={() => setIsAddingNewSource(false)} disabled={loading}>
//                             <CloseIcon />
//                         </IconButton>
//                     </Box>
//                 )}
//             </Box>
//             {formik.touched.StatusName && formik.errors.StatusName && typeof formik.errors.StatusName === 'string' && <Typography color="error">{formik.errors.StatusName}</Typography>}
//             {loading && (
//                 <Box display="flex" alignItems="center">
//                     <CircularProgress size={20} sx={{ mr: 1 }} />
//                     <Typography>Loading...</Typography>
//                 </Box>
//             )}
//             {error && <Typography color="error">{error}</Typography>}
//         </>
//     );
// };

// export default LeadStatus;
import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../utils';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, CircularProgress, Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { CustomChip } from '../../../ui-components/Chip/Chip';

interface LeadStatusType {
    _id: string;
    statusName?: string;
    color: string;
}

interface LeadStatusProps {
    onSelect: (id: string) => void;
    leadStatus: LeadStatusType | null;
}

const LeadStatus: React.FC<LeadStatusProps> = ({ onSelect, leadStatus }) => {
    const [leadStatusList, setLeadStatusList] = useState<LeadStatusType[]>([]);
    const [isAddingNewSource, setIsAddingNewSource] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const accessToken = Cookies.get('crmaccess');
    const subdomain = Cookies.get('subdomain');
    const [leadsvalues, setLeadsStatus] = useState(null);
    const fetchLeadSources = async () => {
        setError('');
        const headers = { Authorization: `Bearer ${accessToken}` };

        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/leadstatus/${subdomain}`, { headers });
            console.log(response, 'leadStatusList???');
            setLeadStatusList(response?.data?.data || []);
        } catch (error) {
            setLeadStatusList([]);
            setError('Error fetching lead sources.');
            console.error('Error fetching lead sources:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // if (subdomain && accessToken) {
        fetchLeadSources();
        // }
    }, [subdomain, accessToken]);

    console.log(leadStatusList, 'leadStatusList');
    const UsersOptions = useMemo(
        () =>
            leadStatusList.map((lead) => ({
                label: lead?.statusName,
                value: lead._id,
                color: lead.color
            })),
        [leadStatusList]
    );
    const formik = useFormik({
        initialValues: {
            StatusName: leadStatus?._id || '',
            color: `#${leadStatus?.color || '000000'}`
        },
        onSubmit: async (values, { resetForm }) => {
            const newLeadSource = values.StatusName;
            const colors = values.color;

            const headers = { Authorization: `Bearer ${accessToken}` };

            try {
                setLoading(true);
                await axios.post(`${API_BASE_URL}/leadstatus/${subdomain}`, { statusName: newLeadSource, color: colors.replace('#', '') }, { headers });
                resetForm();
                setIsAddingNewSource(false);
                setError('');
                fetchLeadSources();
            } catch (error) {
                setError('Error adding new lead source. Please try again.');
                console.error('Error adding new lead source:', error);
            } finally {
                setLoading(false);
            }
        }
    });

    const Leadsdsds = UsersOptions.find((opt) => opt.value === leadsvalues);

    useEffect(() => {
        if (leadStatus) {
            formik.setFieldValue('StatusName', Leadsdsds?.value || leadStatus?._id || '');
            formik.setFieldValue('color', `#${Leadsdsds?.color || leadStatus?.color || '000000'}`);
        }
    }, [leadStatus]);

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value;

        if (selectedValue === 'addNew') {
            setIsAddingNewSource(true);
            formik.setFieldValue('StatusName', '');
        } else {
            setLeadsStatus(selectedValue);
            formik.setFieldValue('StatusName', selectedValue);
            onSelect(selectedValue);
        }
    };

    return (
        <>
            <Box display="flex" alignItems="center">
                {!isAddingNewSource ? (
                    <FormControl sx={{ minWidth: 200 }} fullWidth size="small">
                        <InputLabel id="lead-status-label">Lead Status</InputLabel>
                        <Select
                            labelId="lead-status-label"
                            value={formik.values.StatusName}
                            label="Lead Status"
                            onChange={handleSelectChange}
                            renderValue={(selected) => {
                                const option = UsersOptions.find((opt) => opt.value === selected);
                                return option ? (
                                    <CustomChip
                                        status={{
                                            hexcolor: option.color,
                                            statusName: option.label || 'null'
                                        }}
                                    />
                                ) : (
                                    <span>Select Lead Status</span>
                                );
                            }}
                        >
                            {UsersOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value} sx={{ width: '100%' }}>
                                    <CustomChip
                                        status={{
                                            hexcolor: option.color,
                                            statusName: option.label || 'null'
                                        }}
                                    />
                                </MenuItem>
                            ))}
                            <MenuItem value="addNew">
                                <Box display="flex" alignItems="center">
                                    <AddIcon fontSize="small" sx={{ mr: 1 }} />
                                    Add New Status
                                </Box>
                            </MenuItem>
                        </Select>
                    </FormControl>
                ) : (
                    <Box display="flex" alignItems="center">
                        <TextField name="StatusName" id="StatusName" size="small" placeholder="New status Name" value={formik.values.StatusName} onChange={formik.handleChange} required sx={{ ml: 1 }} />
                        <input type="color" id="color" name="color" value={formik.values.color} onChange={formik.handleChange} style={{ marginLeft: 8, width: 40, border: 'none', background: 'none' }} />
                        <IconButton color="primary" onClick={() => formik.handleSubmit()} disabled={loading} sx={{ ml: 1 }}>
                            <CheckIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => setIsAddingNewSource(false)} disabled={loading}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                )}
            </Box>
            {formik.touched.StatusName && formik.errors.StatusName && typeof formik.errors.StatusName === 'string' && <Typography color="error">{formik.errors.StatusName}</Typography>}
            {loading && (
                <Box display="flex" alignItems="center">
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    <Typography>Loading...</Typography>
                </Box>
            )}
            {error && <Typography color="error">{error}</Typography>}
        </>
    );
};

export default LeadStatus;
