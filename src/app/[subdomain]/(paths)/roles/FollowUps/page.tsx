// // pages/lead-status.tsx
// import React, { useEffect, useState } from 'react';
// import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
// import Cookies from 'js-cookie';
// // import api from '../utils/axios';
// import { createFollowupStatus, DELETEFollowupStatus, GetFollowupStatus, UpdateFollowupStatus } from '../../../../../../api/Leads';
// import { MyButton } from '../../../../Component/Buttons/Buttons';

// interface LeadStatus {
//     _id: string;
//     typeName: string;
// }

// const LeadStatusPage: React.FC = () => {
//     // const accessToken = Cookies.get('accessToken');
//     const subdomain = Cookies.get('subdomain');
//     // const token = 'your-jwt-token';

//     const [statuses, setStatuses] = useState<LeadStatus[]>([]);
//     const [dialogOpen, setDialogOpen] = useState(false);
//     const [editId, setEditId] = useState<string | null>(null);
//     const [name, setName] = useState('');

//     const fetchStatuses = async () => {
//         try {
//             const res = await GetFollowupStatus(subdomain);
//             //  await api.get(`/${subdomain}/lead-status`, {
//             //     headers: { Authorization: `Bearer ${accessToken}` }
//             // });
//             console.log(res, 'res');

//             setStatuses(res.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     useEffect(() => {
//         fetchStatuses();
//     }, []);

//     const handleSave = async () => {
//         try {
//             if (editId) {
//                 await UpdateFollowupStatus(subdomain, editId, name);
//                 // api.patch(`/${subdomain}/lead-status/${editId}`, { name }, { headers: { Authorization: `Bearer ${token}` } });
//             } else {
//                 await createFollowupStatus(subdomain, name);
//                 //  api.post(`/${subdomain}/lead-status`, { name }, { headers: { Authorization: `Bearer ${token}` } });
//             }
//             setDialogOpen(false);
//             setName('');
//             setEditId(null);
//             fetchStatuses();
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const handleDelete = async (id: string) => {
//         try {
//             await DELETEFollowupStatus(subdomain, id);
//             // api.delete(`/${subdomain}/lead-status/${id}`, {
//             //     headers: { Authorization: `Bearer ${token}` }
//             // });
//             fetchStatuses();
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     const handleEdit = (status: LeadStatus) => {
//         setEditId(status._id);
//         setName(status.typeName);
//         setDialogOpen(true);
//     };

//     const openCreate = () => {
//         setEditId(null);
//         setName('');
//         setDialogOpen(true);
//     };

//     return (
//         <Box sx={{ p: 4 }}>
//             <Typography variant="h5" mb={2}>
//                 Lead Status Management
//             </Typography>
//             <Button variant="contained" onClick={openCreate} sx={{ mb: 2 }}>
//                 Add Status
//             </Button>

//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Name</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {statuses?.map((status) => (
//                             <TableRow key={status?._id}>
//                                 <TableCell>{status?.typeName}</TableCell>
//                                 <TableCell>
//                                     <IconButton onClick={() => handleEdit(status)}>
//                                         <Edit />
//                                     </IconButton>
//                                     <IconButton onClick={() => handleDelete(status._id)}>
//                                         <Delete />
//                                     </IconButton>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>

//             <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
//                 <DialogTitle sx={{ fontSize: '12px' }}>{editId ? 'Edit Status' : 'Add Status'}</DialogTitle>
//                 <DialogContent>
//                     <Box sx={{ p: 1 }}>
//                         <TextField size="small" fullWidth label="Status Name" value={name} onChange={(e) => setName(e.target.value)} margin="normal" />
//                     </Box>
//                 </DialogContent>
//                 <DialogActions>
//                     <MyButton variant="text" onClick={() => setDialogOpen(false)}>
//                         Cancel
//                     </MyButton>
//                     <MyButton variant="contained" onClick={handleSave}>
//                         Save
//                     </MyButton>
//                 </DialogActions>
//             </Dialog>
//         </Box>
//     );
// };

// export default LeadStatusPage;
'use client';
import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import LeadfollowPage from './pages/FollowupStatusPage';
import LeadStatusPage from './pages/LeadStatusPage';
import LeadsStatus from '../Leads/LeadsStatus';
// import LeadStatusPage from '../components/LeadStatusPage';
// import FollowupStatusPage from '../components/FollowupStatusPage'; // You can create this based on LeadStatusPage

const LeadManagement: React.FC = () => {
    const [tabIndex, setTabIndex] = useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Box sx={{ width: '100%', p: 1 }}>
            {/* <Typography variant="h5" mb={2}>
        Lead Configuration
      </Typography> */}
            <Tabs value={tabIndex} onChange={handleChange} aria-label="lead config tabs">
                <Tab label="Follow-up Status" />
                <Tab label="Follow-up Type" />
                <Tab label="Lead Status" />
                {/* Add more tabs as needed */}
            </Tabs>

            <Box>
                {tabIndex === 0 && <LeadStatusPage />}
                {tabIndex === 1 && <LeadfollowPage />}
                {tabIndex === 2 && <LeadsStatus />}
                {/* Render other tab pages conditionally */}
            </Box>
        </Box>
    );
};

export default LeadManagement;
