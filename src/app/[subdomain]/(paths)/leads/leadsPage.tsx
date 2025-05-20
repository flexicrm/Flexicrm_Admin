// 'use client';
// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// import LeadTable from './leadsTable';
// import LeadForm from './leadsForm';
// import EditLeadForm from './EditleadsForm';
// import { API_BASE_URL } from '../../../utils';

// import { Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Typography, IconButton, Box } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';

// const LeadsPage: React.FC = () => {
//     const [leads, setLeads] = useState<any>([]);
//     const [isFormVisible, setIsFormVisible] = useState(false);
//     const [editingLead, setEditingLead] = useState<any | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [customers, setCustomers] = useState<any[]>([]);
//     const [users, setUsers] = useState<any[]>([]);
//     const [leadSources, setLeadSources] = useState<any[]>([]);
//     const [leadstatus, setLeadstatus] = useState<any[]>([]);
//     const [leadType, setLeadType] = useState<any>(null);

//     const accessToken = Cookies.get('accessToken');
//     const subdomain = Cookies.get('subdomain');

//     const fetchLeads = useCallback(async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/lead/${subdomain}`, { headers });
//             setLeads(response?.data?.data.leads || []);
//             setLeadType(response.data.data);
//         } catch (error) {
//             setError('Error fetching leads. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     }, [accessToken, subdomain]);

//     useEffect(() => {
//         fetchLeads();
//     }, [fetchLeads]);

//     const fetchLeadById = async (leadsid: string) => {
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/lead/${subdomain}/${leadsid}`, { headers });
//             setEditingLead(response?.data?.data);
//             setIsFormVisible(true);
//         } catch (error) {
//             setError('Error fetching lead details. Please try again.');
//         }
//     };

//     const handleEdit = (leadsid: string) => {
//         console.log(leadsid, 'leadsid');
//         setEditingLead(leadsid);
//         // fetchLeadById(leadsid?.LeadId);
//     };

//     const handleDelete = async (LeadId: string) => {
//         const result = await Swal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, delete it!'
//         });
//         if (result.isConfirmed) {
//             try {
//                 const headers = { Authorization: `Bearer ${accessToken}` };
//                 await axios.delete(`${API_BASE_URL}/lead/${subdomain}/${LeadId}`, { headers });
//                 setLeads(leads.filter((lead) => lead.LeadId !== LeadId));
//                 Swal.fire('Deleted!', 'Lead has been deleted.', 'success');
//                 fetchLeads();
//             } catch (error) {
//                 setError('Error deleting lead. Please try again.');
//                 Swal.fire('Error!', 'Error deleting lead. Please try again.', 'error');
//             }
//         }
//     };

//     const handleSubmit = async (values: any) => {
//         const headers = {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`
//         };

//         try {
//             let response;
//             if (editingLead) {
//                 response = await axios.patch(`${API_BASE_URL}/lead/${subdomain}/${editingLead.LeadId}`, values, { headers });
//                 Swal.fire('Updated!', 'Lead has been updated.', 'success');
//                 fetchLeads();
//             } else {
//                 response = await axios.post(`${API_BASE_URL}/lead/offline/${subdomain}/addlead`, values, { headers });
//                 Swal.fire('Created!', 'Lead has been created.', 'success');
//                 fetchLeads();
//             }

//             setLeads((prevLeads) => {
//                 if (editingLead) {
//                     return prevLeads.map((lead) => (lead._id === editingLead._id ? response.data : lead));
//                 } else {
//                     return [...prevLeads, response.data];
//                 }
//             });
//             setIsFormVisible(false);
//             setEditingLead(null);
//         } catch (error) {
//             setError('An error occurred while saving the lead. Please try again.');
//             Swal.fire('Error!', 'An error occurred while saving the lead. Please try again.', 'error');
//         }
//     };

//     const fetchCustomers = useCallback(async () => {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         try {
//             const response = await axios.get(`${API_BASE_URL}/customer/${subdomain}`, { headers });
//             setCustomers(response.data.data.customers || []);
//         } catch (error) {
//             setError('Error fetching customers. Please try again.');
//         }
//     }, [accessToken, subdomain]);

//     const fetchProjects = useCallback(async () => {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         try {
//             const response = await axios.get(`${API_BASE_URL}/user/${subdomain}`, { headers });
//             setUsers(response?.data?.data.users || []);
//         } catch (error) {
//             setError('Error fetching projects. Please try again.');
//         }
//     }, [accessToken, subdomain]);

//     useEffect(() => {
//         fetchCustomers();
//         fetchProjects();
//     }, [fetchCustomers, fetchProjects]);

//     const customerOptions = useMemo(
//         () =>
//             customers.map((customer) => ({
//                 label: customer.Companyname,
//                 value: customer._id
//             })),
//         [customers]
//     );

//     const UsersOptions = useMemo(
//         () =>
//             users.map((user) => ({
//                 label: user?.firstname,
//                 value: user?._id
//             })),
//         [users]
//     );

//     const handleStatusChange = async (LeadId: string, status: string) => {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         try {
//             await axios.patch(`${API_BASE_URL}/lead/${subdomain}/${LeadId}`, { status }, { headers });
//             setLeads((prevLeads) => prevLeads.map((lead) => (lead._id === LeadId ? { ...lead, status } : lead)));
//             fetchLeads();
//         } catch (error) {
//             Swal.fire('Error!', 'Failed to update lead status. Please try again.', 'error');
//         }
//     };

//     const fetchLeadstatus = async () => {
//         setError('');
//         const headers = { Authorization: `Bearer ${accessToken}` };

//         try {
//             setLoading(true);
//             const response = await axios.get(`${API_BASE_URL}/leadstatus/${subdomain}`, { headers });
//             setLeadstatus(response?.data?.data || []);
//         } catch (error) {
//             setLeadSources([]);
//             setError('Error fetching lead sources.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (subdomain && accessToken) {
//             fetchLeadstatus();
//         }
//     }, [subdomain, accessToken]);

//     const fetchLeadSources = async () => {
//         setError('');
//         const headers = { Authorization: `Bearer ${accessToken}` };

//         try {
//             setLoading(true);
//             const response = await axios.get(`${API_BASE_URL}/leadsource/${subdomain}`, { headers });
//             setLeadSources(response?.data?.data || []);
//         } catch (error) {
//             setLeadSources([]);
//             setError('Error fetching lead sources.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (subdomain && accessToken) {
//             fetchLeadSources();
//         }
//     }, [subdomain, accessToken]);

//     return (
//         <>
//             <Box sx={{ p: 2 }}>
//                 {/* <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={() => {
//                     setEditingLead(null);
//                     setIsFormVisible(true);
//                 }}
//             >
//                 New Lead
//             </Button> */}
//                 {error && (
//                     <Typography color="error" sx={{ mt: 2 }}>
//                         {error}
//                     </Typography>
//                 )}
//                 {loading ? (
//                     <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
//                         <CircularProgress />
//                     </Box>
//                 ) : (
//                     <>
//                         <LeadTable
//                             leads={leads}
//                             leadSources={leadSources}
//                             leadStatus={leadstatus}
//                             setEditingLead={setEditingLead}
//                             onDelete={handleDelete}
//                             handleStatusChange={handleStatusChange}
//                             setIsFormVisible={setIsFormVisible}
//                             onSubmit={handleSubmit}
//                             leadType={leadType}
//                             fetchDatas={fetchLeads}
//                         />
//                         <Dialog open={isFormVisible} onClose={() => setIsFormVisible(false)} maxWidth="md" fullWidth>
//                             <DialogTitle sx={{ m: 0, p: 2 }}>
//                                 {editingLead ? 'Edit Lead' : 'New Lead'}
//                                 <IconButton
//                                     aria-label="close"
//                                     onClick={() => setIsFormVisible(false)}
//                                     sx={{
//                                         position: 'absolute',
//                                         right: 8,
//                                         top: 8,
//                                         color: (theme) => theme.palette.grey[500]
//                                     }}
//                                 >
//                                     <CloseIcon />
//                                 </IconButton>
//                             </DialogTitle>
//                             <DialogContent dividers>
//                                 {editingLead ? (
//                                     <LeadForm lead={editingLead} onSubmit={handleSubmit} customers={customerOptions} UsersOptions={UsersOptions} />
//                                 ) : (
//                                     <LeadForm lead={null} onSubmit={handleSubmit} customers={customerOptions} UsersOptions={UsersOptions} />
//                                 )}
//                             </DialogContent>
//                         </Dialog>
//                     </>
//                 )}
//             </Box>
//         </>
//     );
// };

// export default LeadsPage;
'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import LeadTable from './leadsTable';
import LeadForm from './create/leadsForm';
import EditLeadForm from './EditleadsForm';
import { API_BASE_URL } from '../../../utils';
import Kanban from './kanban/kanbanleads';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Typography, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteDialog from '../../../Component/CustomiseComponent/DeleteDialog';
import { MyTable } from '../../../Component/Table/Table';
import { validateEmail, validatePhone, validateRequired } from '../../../Component/Table/Validation';
import { MySnackbar } from '../../../Component/Snackbar/Snackbar';

const LeadsPage: React.FC = () => {
    const [leads, setLeads] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingLead, setEditingLead] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [users, setUsers] = useState([]);
    const [leadSources, setLeadSources] = useState([]);
    const [leadstatus, setLeadstatus] = useState([]);
    const [leadType, setLeadType] = useState(null);
    const [kanbans, setKanban] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    // const [snackbarSeverity setSnackbarSeverity] = useState("success");
    const [snackbar, setSnackbar] = useState(false);
    // const [snackbarMessage,]
    // Delete confirmation popup state

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [leadToDelete, setLeadToDelete] = useState(null);

    const accessToken = Cookies.get('accessToken');
    const subdomain = Cookies.get('subdomain');

    const fetchData = useCallback(
        async (url, setData) => {
            try {
                const headers = { Authorization: `Bearer ${accessToken}` };
                const response = await axios.get(`${API_BASE_URL}${url}`, { headers });
                setData(response.data.data);
            } catch (error) {
                setError(`Error fetching data from ${url}. Please try again.`);
            }
        },
        [accessToken]
    );

    const fetchLeads = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            await fetchData(`/lead/${subdomain}`, (data) => {
                setLeads(data.leads || []);
                setLeadType(data);
            });
        } finally {
            setLoading(false);
        }
    }, [fetchData, subdomain]);

    const fetchCustomers = useCallback(async () => {
        await fetchData(`/customer/${subdomain}`, (data) => setCustomers(data.customers || []));
    }, [fetchData, subdomain]);

    const fetchProjects = useCallback(async () => {
        await fetchData(`/user/${subdomain}`, (data) => setUsers(data.users || []));
    }, [fetchData, subdomain]);

    const fetchLeadstatus = useCallback(async () => {
        await fetchData(`/leadstatus/${subdomain}`, setLeadstatus);
    }, [fetchData, subdomain]);

    const fetchLeadSources = useCallback(async () => {
        await fetchData(`/leadsource/${subdomain}`, setLeadSources);
    }, [fetchData, subdomain]);

    useEffect(() => {
        if (subdomain && accessToken) {
            fetchLeads();
            fetchCustomers();
            fetchProjects();
            fetchLeadstatus();
            fetchLeadSources();
        }
    }, [subdomain, accessToken, fetchLeads, fetchCustomers, fetchProjects, fetchLeadstatus, fetchLeadSources]);

    const handleEdit = useCallback((leadsid) => {
        setIsFormVisible(true);
        setEditingLead(leadsid);
    }, []);

    // Open delete confirmation popup
    const handleDelete = useCallback((LeadId) => {
        setLeadToDelete(LeadId);
        setDeleteDialogOpen(true);
    }, []);

    // Confirm delete action
    const confirmDelete = useCallback(async () => {
        if (!leadToDelete) return;
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            await axios.delete(`${API_BASE_URL}/lead/${subdomain}/${leadToDelete}`, { headers });
            setLeads((prevLeads) => prevLeads.filter((lead) => lead.LeadId !== leadToDelete));
            fetchLeads();
        } catch (error) {
            setError('Error deleting lead. Please try again.');
        } finally {
            setDeleteDialogOpen(false);
            setLeadToDelete(null);
        }
    }, [accessToken, subdomain, leadToDelete, fetchLeads]);

    // Cancel delete action
    const cancelDelete = useCallback(() => {
        setDeleteDialogOpen(false);
        setLeadToDelete(null);
    }, []);

    const handleSubmit = useCallback(
        async (values) => {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            };

            try {
                let response;
                if (editingLead) {
                    response = await axios.patch(`${API_BASE_URL}/lead/${subdomain}/${editingLead.LeadId}`, values, { headers });
                } else {
                    response = await axios.post(`${API_BASE_URL}/lead/offline/${subdomain}/addlead`, values, { headers });
                }

                setLeads((prevLeads) => {
                    if (editingLead) {
                        return prevLeads.map((lead) => (lead._id === editingLead._id ? response.data : lead));
                    } else {
                        return [...prevLeads, response.data];
                    }
                });
                setIsFormVisible(false);
                setEditingLead(null);
                fetchLeads();
            } catch (error) {
                setError('An error occurred while saving the lead. Please try again.');
            }
        },
        [accessToken, subdomain, editingLead, fetchLeads]
    );

    const handleStatusChange = useCallback(
        async (LeadId) => {
            // console.log(status, 'status');
            console.log(LeadId, 'status');
            const status = LeadId.active === 1 ? 0 : 1;

            const headers = { Authorization: `Bearer ${accessToken}` };
            try {
                const response = await axios.patch(`${API_BASE_URL}/lead/${subdomain}/${LeadId.LeadId}`, { status }, { headers });
                if (response.status === 200 || response.status === 204) {
                    // Update local leads list only if API call was successful
                    console.log();

                    setSnackbarMessage(response?.data?.data?.message);
                    setLeads((prevLeads) => prevLeads.map((lead) => (lead.LeadId === LeadId.LeadId ? { ...lead, status } : lead)));
                } else {
                    console.error('Failed to update status. Server responded with:', response.status);
                }
            } catch (error) {
                // Optionally show error
            }
        },
        [accessToken, subdomain]
    );

    const customerOptions = useMemo(
        () =>
            customers.map((customer) => ({
                label: customer.Companyname,
                value: customer._id
            })),
        [customers]
    );

    const UsersOptions = useMemo(
        () =>
            users.map((user) => ({
                label: user?.firstname,
                value: user?._id
            })),
        [users]
    );

    console.log(leads, 'leads,');

    // const rowData = leads.map((item) => ({
    //     LeadId: item.LeadId,
    //     Name: item.manualData.name,
    //     Company: item.manualData.company,
    //     Phone: item.manualData.mobileNo,
    //     'Follow-Up':
    //         item.followUps.length > 0
    //             ? `Date: ${new Date(item.followUps[item.followUps.length - 1].followUpDate).toDateString()},
    //        Notes: ${item.followUps[item.followUps.length - 1].notes}`
    //             : 'No follow-ups',
    //     Assigned: `${item.assignTo.firstname} ${item.assignTo.lastname}`,
    //     active: item.status,
    //     leadstatus: (
    //         <>
    //             <Box
    //                 sx={{
    //                     display: 'flex',
    //                     alignItems: 'center',
    //                     px: 2,
    //                     py: 1.5,
    //                     borderTopLeftRadius: 8,
    //                     borderTopRightRadius: 8
    //                 }}
    //             >
    //                 <Box
    //                     sx={{
    //                         width: 12,
    //                         height: 12,
    //                         borderRadius: '50%',
    //                         bgcolor: item.leadstatus?.color ? `#${item.leadstatus.color}` : undefined,
    //                         mr: 1
    //                     }}
    //                 />
    //                 {/* <Typography variant="subtitle2" fontWeight={600} onClick={() => handleEditClick(item, 'leadstatus')}> */}
    //                 <Typography variant="subtitle2" fontWeight={600}>
    //                     {item.leadstatus?.statusName}
    //                 </Typography>
    //             </Box>
    //         </>
    //     ),
    //     leadsource: item.leadsource
    // }));

    // const columns = [
    //     { id: 'LeadId', label: 'LeadId' },
    //     { id: 'Name', label: 'Name', align: 'right' },
    //     { id: 'Company', label: 'Company', align: 'right' },
    //     { id: 'Phone', label: 'Phone', align: 'right' },
    //     { id: 'Follow-Up', label: 'Follow-Up', align: 'right' },
    //     { id: 'Assigned', label: 'Assigned', align: 'right' },
    //     { id: 'leadstatus', label: 'Leadstatus', align: 'right' },
    //     { id: 'leadsource', label: 'Leadsource', align: 'right' }
    // ];
    // const rowData = leads.map((item) => ({
    //     LeadId: item.LeadId,
    //     Name: item.manualData.name,
    //     Company: item.manualData.company,
    //     Phone: item.manualData.mobileNo,
    //     'Follow-Up':
    //         item.followUps.length > 0
    //             ? `Date: ${new Date(item.followUps[item.followUps.length - 1].followUpDate).toDateString()},
    //        Notes: ${item.followUps[item.followUps.length - 1].notes}`
    //             : 'No follow-ups',
    //     Assigned: `${item.assignTo.firstname} ${item.assignTo.lastname}`,
    //     active: item.status,
    //     leadstatus: (
    //         <>
    //             <Box
    //                 sx={{
    //                     display: 'flex',
    //                     alignItems: 'center',
    //                     px: 2,
    //                     py: 1.5,
    //                     borderTopLeftRadius: 8,
    //                     borderTopRightRadius: 8
    //                 }}
    //             >
    //                 <Box
    //                     sx={{
    //                         width: 12,
    //                         height: 12,
    //                         borderRadius: '50%',
    //                         bgcolor: item.leadstatus?.color ? `#${item.leadstatus.color}` : undefined,
    //                         mr: 1
    //                     }}
    //                 />
    //                 <Typography variant="subtitle2" fontWeight={600}>
    //                     {item.leadstatus?.statusName}
    //                 </Typography>
    //             </Box>
    //         </>
    //     ),
    //     leadsource: item.leadsource
    // }));

    const rowData = leads.map((item) => ({
        LeadId: item?.LeadId,
        Name: item?.manualData?.name,
        Company: item?.manualData?.company,
        Email: item?.manualData?.email,
        Phone: item?.manualData?.mobileNo,
        'Follow-Up':
            item?.followUps?.length > 0
                ? `Date: ${new Date(item?.followUps[item?.followUps?.length - 1]?.followUpDate)?.toDateString()},
           Notes: ${item?.followUps[item?.followUps?.length - 1]?.notes}`
                : 'No follow-ups',
        Assigned: `${item?.assignTo?.firstname} ${item?.assignTo?.lastname}`,
        active: item?.status,
        leadstatus: item?.leadstatus,
        leadsource: item?.leadsource,
        Address: item?.manualData?.address,
        assignTo: item?.assignTo?._id,
        description: item?.description

        // leadsource: item?.leadsource
    }));
    const columns = [
        { id: 'LeadId', label: 'LeadId' },
        { id: 'Name', label: 'Name', align: 'center' },
        { id: 'Company', label: 'Company', align: 'center' },
        { id: 'Phone', label: 'Phone', align: 'center' },
        { id: 'Follow-Up', label: 'Follow-Up', align: 'center' },
        { id: 'Assigned', label: 'Assigned', align: 'center' },
        {
            id: 'leadstatus',
            label: 'Leadstatus',
            align: 'center',
            format: (value) => (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                        sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: value?.color ? `#${value.color}` : 'gray',
                            mr: 1
                        }}
                    />
                    <Typography variant="subtitle2" fontWeight={600}>
                        {value?.statusName ?? 'Update Status'}
                    </Typography>
                </Box>
            )
        },
        { id: 'leadsource', label: 'Leadsource', align: 'center' }
    ];

    // const formFields = [
    //     {
    //         id: 'name',
    //         name: 'name',
    //         label: 'Name',
    //         type: 'text',
    //         required: true,
    //         fullWidth: true,
    //         validation: validateRequired
    //     },
    //     {
    //         id: 'email',
    //         name: 'email',
    //         label: 'Email',
    //         type: 'email',
    //         required: true,
    //         fullWidth: true,
    //         validation: validateEmail
    //     },
    //     {
    //         id: 'mobileNo',
    //         name: 'mobileNo',
    //         label: 'Phone',
    //         type: 'number',
    //         required: true,
    //         fullWidth: true,
    //         validation: validatePhone
    //     },
    //     {
    //         id: 'company',
    //         name: 'company',
    //         label: 'Company',
    //         type: 'text',
    //         required: true,
    //         fullWidth: true,
    //         validation: validateRequired
    //     },
    //     {
    //         id: 'address',
    //         name: 'address',
    //         label: 'Address',
    //         type: 'text',
    //         required: true,
    //         fullWidth: true,
    //         validation: validateRequired
    //     },
    //     {
    //         id: 'status',
    //         name: 'status',
    //         label: 'active',
    //         type: 'switch',
    //         options: [
    //             { value: 'active', label: 'Active' },
    //             { value: 'inactive', label: 'Inactive' }
    //         ],
    //         required: true
    //     }
    // ];

    const formFields = [
        {
            id: 'manualData.name',
            name: 'manualData.name',
            label: 'Name',
            type: 'text',
            required: true,
            fullWidth: true,
            validation: validateRequired
        },
        {
            id: 'manualData.email',
            name: 'manualData.email',
            label: 'Email',
            type: 'email',
            required: true,
            fullWidth: true,
            validation: validateEmail
        },
        {
            id: 'manualData.mobileNo',
            name: 'manualData.mobileNo',
            label: 'Mobile No',
            type: 'number',
            required: true,
            fullWidth: true,
            validation: validatePhone
        },
        {
            id: 'manualData.company',
            name: 'manualData.company',
            label: 'Company',
            type: 'text',
            required: true,
            fullWidth: true,
            validation: validateRequired
        },
        {
            id: 'manualData.address.street',
            name: 'manualData.address.street',
            label: 'Street',
            type: 'text',
            required: true,
            fullWidth: true,
            validation: validateRequired
        },
        {
            id: 'manualData.address.city',
            name: 'manualData.address.city',
            label: 'City',
            type: 'text',
            required: true,
            fullWidth: true,
            validation: validateRequired
        },
        {
            id: 'manualData.address.state',
            name: 'manualData.address.state',
            label: 'State',
            type: 'text',
            required: true,
            fullWidth: true,
            validation: validateRequired
        },
        {
            id: 'manualData.address.zipCode',
            name: 'manualData.address.zipCode',
            label: 'Zip Code',
            type: 'text',
            required: true,
            fullWidth: true,
            validation: validateRequired
        },
        {
            id: 'manualData.address.country',
            name: 'manualData.address.country',
            label: 'Country',
            type: 'text',
            required: true,
            fullWidth: true,
            validation: validateRequired
        },
        {
            id: 'description',
            name: 'description',
            label: 'Description',
            type: 'textarea',
            required: false,
            fullWidth: true
        },
        {
            id: 'assignTo',
            name: 'assignTo',
            label: 'Assign To',
            type: 'select', // or 'autocomplete'
            required: true,
            fullWidth: true,
            options: [] // to be filled dynamically
        },
        {
            id: 'followUp',
            name: 'followUp',
            label: 'Follow Ups',
            type: 'array', // You can use a dynamic array of sub-forms
            required: false,
            fullWidth: true
        }
    ];

    return (
        <Box sx={{ p: 2 }}>
            {error && (
                <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                </Typography>
            )}
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {/* <LeadTable
                        leads={leads}
                        leadSources={leadSources}
                        leadStatus={leadstatus}
                        setEditingLead={setEditingLead}
                        onDelete={handleDelete}
                        handleStatusChange={handleStatusChange}
                        setIsFormVisible={setIsFormVisible}
                        leadType={leadType}
                        fetchDatas={fetchLeads}
                        handleEdit={handleEdit}
                        onEdit={handleEdit}
                        setLeadsid={setEditingLead}
                        isFormVisible={isFormVisible}
                    /> */}
                    {/* <AdvancedDataGrid initialData={rowData} columns={columns} formFields={formFields} onSave={handleEdit} onDelete={handleDelete} onCreate={handleSubmit} getRowId={(row) => row.LeadId} pageSize={5} pageSizeOptions={[5, 10, 25]} />; */}
                    {/* <AdvancedDataGrid initialData={rowDatas} columns={columnss} formFields={formFieldss} onSave={handleEdit} onDelete={handleDelete} onCreate={handleSubmit} getRowId={(row) => row.id} pageSize={10} pageSizeOptions={[5, 10, 25]} /> */}
                    {/* <MyTable data={rowData} onEdit={handleEdit} onDelete={handleDelete} columns={columns} onToggle={handleStatusChange} /> */}
                    <Box>
                        <Button variant="contained" onClick={() => setKanban(!kanbans)}>
                            {kanbans ? 'TableView' : 'Kanban View'}
                        </Button>
                    </Box>
                    {kanbans ? (
                        <Kanban leads={leadType} leadStatus={leadstatus} setLeads={setLeads} />
                    ) : (
                        <MyTable
                            data={rowData}
                            columns={columns}
                            formFields={formFields}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onCreate={() => setIsFormVisible(true)}
                            onToggle={handleStatusChange}
                            snackbarMessage={snackbarMessage}
                            setSnackbarMessage={setSnackbarMessage}
                            // setKanban={setKanban}
                            // kanbans={kanbans}
                        />
                    )}

                    <Dialog open={isFormVisible} onClose={() => setIsFormVisible(false)} maxWidth="md" fullWidth>
                        <DialogTitle sx={{ m: 0, p: 2 }}>
                            {editingLead ? 'Edit Lead' : 'New Lead'}
                            <IconButton
                                aria-label="close"
                                onClick={() => setIsFormVisible(false)}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500]
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent dividers>
                            <LeadForm lead={editingLead} onSubmit={handleSubmit} customers={customerOptions} UsersOptions={UsersOptions} />
                        </DialogContent>
                    </Dialog>
                    {/* Delete confirmation popup */}
                    <Dialog open={deleteDialogOpen} onClose={cancelDelete}>
                        <DialogTitle>Delete Lead</DialogTitle>
                        <DialogContent>
                            <Typography>Are you sure you want to remove this lead?</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={cancelDelete} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={confirmDelete} color="error" variant="contained">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <DeleteDialog deleteDialogOpen={deleteDialogOpen} cancelDelete={cancelDelete} data={'lead'} confirmDelete={confirmDelete} />
                </>
            )}
            <MySnackbar open={snackbar} message={snackbarMessage} severity={'success'} position={{ vertical: 'top', horizontal: 'right' }} onClose={() => setSnackbar(false)} />
        </Box>
    );
};

export default LeadsPage;
