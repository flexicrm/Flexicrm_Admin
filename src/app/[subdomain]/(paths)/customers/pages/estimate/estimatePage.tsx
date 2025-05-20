// "use client"
// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import { Dialog } from 'primereact/dialog';
// import EstimateForm from "./estimateForm"
// import EditEstimateForm from "./EditestimateForm"
// import EstimateTable from "./estimateTable"
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { API_BASE_URL } from '@/app/utils';

// const EstimatePage = () => {
//     const [estimates, setEstimates] = useState([]);
//     const [isFormVisible, setIsFormVisible] = useState(false);
//     const [editingEstimate, setEditingEstimate] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const accessToken = Cookies.get("accessToken");
//     const subdomain = Cookies.get("subdomain");
//     const [customers, setCustomers] = useState([]);
//     const [projects, setProjects] = useState([]);

//     const fetchEstimates = useCallback(async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/estimate/${subdomain}`, { headers });
//             console.log(response.data.data);
//             setEstimates(response?.data?.data.estimates || []);
//         } catch (error) {
//             setError("Error fetching estimates. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     }, [accessToken, subdomain]);

//     useEffect(() => {
//         fetchEstimates();
//     }, [fetchEstimates]);

//     const fetchEstimateById = async (estimationNo) => {
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/estimate/${subdomain}/${estimationNo}`, { headers });
//             console.log(response.data.data, "estimateeee");
//             setEditingEstimate(response.data.data.estimates);
//             setIsFormVisible(true);
//         } catch (error) {
//             setError("Error fetching estimate details. Please try again.");
//         }
//     };

//     const handleEdit = (estimationNo) => {
//         fetchEstimateById(estimationNo);
//     };

//     const handleDelete = async (estimationNo) => {
//         const result = await Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!",
//         });
//         if (result.isConfirmed) {
//             try {
//                 const headers = { Authorization: `Bearer ${accessToken}` };
//                 await axios.delete(`${API_BASE_URL}/estimate/${subdomain}/${estimationNo}`, { headers });
//                 setEstimates(estimates.filter((estimate) => estimate.estimationNo !== estimationNo));
//                 Swal.fire('Deleted!', 'Estimate has been deleted.', 'success');
//             } catch (error) {
//                 setError("Error deleting estimate. Please try again.");
//                 Swal.fire('Error!', 'Error deleting estimate. Please try again.', 'error');
//             }
//         }
//     };

//     const handleSubmit = async (values) => {
//         console.log(values)
//         const headers = {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//         };

//         try {
//             let response;
//             if (editingEstimate) {
//                 response = await axios.patch(
//                     `${API_BASE_URL}/estimate/${subdomain}/${editingEstimate.estimationNo}`,
//                     values,
//                     { headers }
//                 );
//                 Swal.fire('Updated!', 'Estimate has been updated.', 'success');
//             } else {
//                 response = await axios.post(
//                     `${API_BASE_URL}/estimate/${subdomain}`,
//                     values,
//                     { headers }
//                 );
//                 Swal.fire('Created!', 'Estimate has been created.', 'success');
//             }

//             setEstimates((prevEstimates) => {
//                 if (editingEstimate) {
//                     return prevEstimates.map((est) =>
//                         est.estimationNo === editingEstimate.estimationNo ? response.data : est
//                     );
//                 } else {
//                     return [...prevEstimates, response.data];
//                 }
//             });
//             setIsFormVisible(false);
//             setEditingEstimate(null);
//         } catch (error) {
//             setError("An error occurred while saving the estimate. Please try again.");
//             Swal.fire('Error!', 'An error occurred while saving the estimate. Please try again.', 'error');
//         }
//     };

//     const fetchCustomers = useCallback(async () => {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         try {
//             const response = await axios.get(`${API_BASE_URL}/customer/${subdomain}`, { headers });
//             setCustomers(response.data.data.customers || []);
//         } catch (error) {
//             setError("Error fetching customers. Please try again.");
//         }
//     }, [accessToken, subdomain]);

//     const fetchProjects = useCallback(async () => {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         try {
//             const response = await axios.get(`${API_BASE_URL}/project/${subdomain}`, { headers });
//             setProjects(response.data.data.projects || []);
//         } catch (error) {
//             setError("Error fetching projects. Please try again.");
//         }
//     }, [accessToken, subdomain]);

//     useEffect(() => {
//         fetchCustomers();
//         fetchProjects();
//     }, [fetchCustomers, fetchProjects]);

//     const customersOptions = useMemo(() =>
//         customers.map((customer) => ({
//             label: customer.Companyname,
//             value: customer._id,
//         })), [customers]);

//     const projectsOptions = useMemo(() =>
//         projects.map((project) => ({
//             label: project.projectName,
//             value: project._id,
//         })), [projects]);

//     return (
//         <div>
//             {error && <p className="error">{error}</p>}
//             {loading ? <p>Loading...</p> : (
//                 <>
//                     <button onClick={() => setIsFormVisible(true)}>New Estimate</button>
//                     <EstimateTable estimates={estimates} onEdit={handleEdit} onDelete={handleDelete} />
//                     <Dialog
//                         header={editingEstimate? "Estimate Form":" Edit Estimate Form"}
//                         visible={isFormVisible}
//                         onHide={() => setIsFormVisible(false)}
//                         aria-hidden={!isFormVisible}
//                     >
//                         {editingEstimate ? (
//                             <EditEstimateForm
//                                 estimate={editingEstimate}
//                                 onSubmit={handleSubmit}
//                                 customers={customersOptions}
//                             />
//                         ) : (
//                             <EstimateForm
//                                 onSubmit={handleSubmit}
//                                 initialValues={{}}
//                                 customers={customersOptions}
//                                 projectsOptions={projectsOptions}
//                             />
//                         )}
//                     </Dialog>
//                 </>
//             )}
//         </div>
//     );
// };

// export default EstimatePage;
// "use client";
// import React, { useState, useEffect, useMemo, useCallback, useContext } from 'react';
// import { Dialog } from 'primereact/dialog';
// import EstimateForm from "./EstimateForm";
// import EditEstimateForm from "./EditEstimateForm";
// import EstimateTable from "./EstimateTable";
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { API_BASE_URL } from '@/app/utils';
// import { Button } from 'primereact/button';
// import userContext from '@/app/UseContext/UseContext';

// const EstimatePage = (fetchData) => {
//     const { singledata } = useContext(userContext);
//     console.log(singledata,"estiamtes")
//     const estimatedatasingle = singledata.estimates
//     ;
//     const [estimates, setEstimates] = useState([]);
//     const [isFormVisible, setIsFormVisible] = useState(false);
//     const [editingEstimate, setEditingEstimate] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const accessToken = Cookies.get("accessToken");
//     const subdomain = Cookies.get("subdomain");
//     const [customers, setCustomers] = useState([]);
//     const [projects, setProjects] = useState([]);

//     const fetchEstimates = useCallback(async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/estimate/${subdomain}`, { headers });
//             setEstimates(response?.data?.data.estimates || []);
//             // fetchData()
//         } catch (error) {
//             setError("Error fetching estimates. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     }, [accessToken, subdomain]);

//     useEffect(() => {
//         fetchEstimates();
//     }, [fetchEstimates]);

//     const fetchEstimateById = async (estimationNo) => {
//         console.log(estimationNo, "estimationNo")
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/estimate/${subdomain}/${estimationNo}`, { headers });

//             console.log(response.data.data, "response.data.data")
//             setEditingEstimate(response.data.data.estimate);
//             setIsFormVisible(true);
//         } catch (error) {
//             setError("Error fetching estimate details. Please try again.");
//         }
//     };

//     const handleEdit = (estimationNo) => {
//         fetchEstimateById(estimationNo);
//     };

//     const handleDelete = async (estimationNo) => {
//         const result = await Swal.fire({
//             title: "Are you sure?",
//             text: "You won't be able to revert this!",
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonColor: "#3085d6",
//             cancelButtonColor: "#d33",
//             confirmButtonText: "Yes, delete it!",
//         });
//         if (result.isConfirmed) {
//             try {
//                 const headers = { Authorization: `Bearer ${accessToken}` };
//                 await axios.delete(`${API_BASE_URL}/estimate/${subdomain}/${estimationNo}`, { headers });
//                 setEstimates(estimates.filter((estimate) => estimate.estimationNo !== estimationNo));
//                 Swal.fire('Deleted!', 'Estimate has been deleted.', 'success');
//                 fetchData()
//             } catch (error) {
//                 setError("Error deleting estimate. Please try again.");
//                 Swal.fire('Error!', 'Error deleting estimate. Please try again.', 'error');
//             }
//         }
//     };

//     const handleSubmit = async (values) => {
//         console.log(values,"valuesssssssssssss")
//         const headers = {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${accessToken}`,
//         };

//         try {
//             let response;
//             if (editingEstimate) {
//                 response = await axios.patch(
//                     `${API_BASE_URL}/estimate/${subdomain}/${editingEstimate.estimationNo}`,
//                     values,
//                     { headers }
//                 );
//                 Swal.fire('Updated!', 'Estimate has been updated.', 'success');

//             } else {
//                 response = await axios.post(
//                     `${API_BASE_URL}/estimate/${subdomain}`,
//                     values,
//                     { headers }
//                 );
//                 Swal.fire('Created!', 'Estimate has been created.', 'success');

//             }

//             setEstimates((prevEstimates) => {
//                 if (editingEstimate) {
//                     return prevEstimates.map((est) =>
//                         est.estimationNo === editingEstimate.estimationNo ? response.data : est
//                     );
//                 } else {
//                     return [...prevEstimates, response.data];
//                 }
//             });
//             setIsFormVisible(false);
//             setEditingEstimate(null);
//             fetchData()
//         } catch (error) {
//             setError("An error occurred while saving the estimate. Please try again.");
//             Swal.fire('Error!', 'An error occurred while saving the estimate. Please try again.', 'error');
//         }
//     };

//     const fetchProjects = useCallback(async () => {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         try {
//             const response = await axios.get(`${API_BASE_URL}/project/${subdomain}`, { headers });
//             console.log(response, "Saa")
//             setProjects(response?.data?.data.projects || []);
//         } catch (error) {
//             setError("Error fetching projects. Please try again.");
//         }
//     }, [accessToken, subdomain]);

//     useEffect(() => {
//         fetchCustomers();
//         fetchProjects();
//     }, [fetchCustomers, fetchProjects]);

//     const projectsOptions = useMemo(() =>
//         projects.map((projects) => ({
//             label: projects?.projectName,
//             value: projects?._id,
//         })), [projects]);
//         console.log(projectsOptions,"???????????????????????");

//     return (
//         <div>
//             {error && <p className="error">{error}</p>}
//             {loading ? <p>Loading...</p> : (
//                 <>
//                     <Button onClick={() => setIsFormVisible(true)}>New Estimate</Button>
//                     <EstimateTable estimates={estimatedatasingle} onEdit={handleEdit} onDelete={handleDelete} />
//                     {/* <Dialog
//                         header={editingEstimate.estimationNo ? "Edit Estimate Form" : "Estimate Form"}
//                         visible={isFormVisible}
//                         onHide={() => setIsFormVisible(false)}
//                         aria-hidden={!isFormVisible}
//                     >
//                         {editingEstimate ? (
//                             <EditEstimateForm
//                                 estimate={editingEstimate}
//                                 onSubmit={handleSubmit}
//                                 customers={customersOptions}
//                             />
//                         ) : (
//                             <EstimateForm
//                                 onSubmit={handleSubmit}
//                                 initialValues={{}}
//                                 customers={customersOptions}
//                                 projectsOptions={projectsOptions}
//                             />
//                         )}
//                     </Dialog> */}

//                     <Dialog
//                         header={editingEstimate && editingEstimate.estimationNo ? "Edit Estimate Form" : "Estimate Form"}
//                         visible={isFormVisible}
//                         onHide={() => setIsFormVisible(false)}
//                         aria-hidden={!isFormVisible}
//                     >
//                         {editingEstimate && editingEstimate.estimationNo ? (
//                             <EditEstimateForm
//                                 estimate={editingEstimate}
//                                 onSubmit={handleSubmit}
//                                 customers={customersOptions}
//                                 projects={projectsOptions}
//                             />
//                         ) : (
//                             <EstimateForm
//                                 onSubmit={handleSubmit}
//                                 initialValues={{}}
//                                 customers={singledata}
//                                 projects={projectsOptions}

//                             />
//                         )}
//                     </Dialog>
//                 </>
//             )}
//         </div>
//     );
// };

// export default EstimatePage;
'use client';
import React, { useState, useEffect, useMemo, useCallback, useContext, useRef } from 'react';
import EstimateForm from './estimateForm';
import EditEstimateForm from './EditestimateForm';
import EstimateTable from './estimateTable';
import Cookies from 'js-cookie';
import axios from 'axios';
import { API_BASE_URL } from '../../../../../utils';
import userContext from '../../../../../UseContext/UseContext';

// Material UI imports
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Snackbar,
    Alert,
    CircularProgress,
    Box,
    Typography,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface EstimatePageProps {
    fetchData: () => void;
}

const EstimatePage: React.FC<EstimatePageProps> = ({ fetchData }) => {
    const { singledata } = useContext(userContext);
    const estimatedatasingle = singledata.estimates;
    const [estimates, setEstimates] = useState<any[]>([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingEstimate, setEditingEstimate] = useState<any | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const accessToken = Cookies.get('accessToken');
    const subdomain = Cookies.get('subdomain');
    const [customers, setCustomers] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [item, setItem] = useState<any[]>([]);
    const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
        open: false,
        message: '',
        severity: 'success'
    });

    const fetchEstimates = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axios.get(`${API_BASE_URL}/estimate/${subdomain}`, { headers });
            setEstimates(response?.data?.data.estimates || []);
        } catch (error) {
            setError('Error fetching estimates. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [accessToken, subdomain]);

    useEffect(() => {
        fetchEstimates();
    }, [fetchEstimates]);

    const fetchEstimateById = async (estimationNo: string) => {
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axios.get(`${API_BASE_URL}/estimate/${subdomain}/${estimationNo}`, { headers });
            setEditingEstimate(response.data.data.estimate);
            setIsFormVisible(true);
        } catch (error) {
            setError('Error fetching estimate details. Please try again.');
        }
    };

    const handleEdit = (estimationNo: string) => {
        fetchEstimateById(estimationNo);
    };

    const handleDelete = async (estimationNo: string) => {
        if (typeof window !== 'undefined') {
            const confirmed = window.confirm('Are you sure you want to delete this estimate? This action cannot be undone.');
            if (confirmed) {
                try {
                    const headers = { Authorization: `Bearer ${accessToken}` };
                    await axios.delete(`${API_BASE_URL}/estimate/${subdomain}/${estimationNo}`, { headers });
                    setEstimates(estimates.filter((estimate) => estimate.estimationNo !== estimationNo));
                    setSnackbar({ open: true, message: 'Estimate has been deleted.', severity: 'success' });
                    fetchData();
                } catch (error) {
                    setError('Error deleting estimate. Please try again.');
                    setSnackbar({ open: true, message: 'Error deleting estimate. Please try again.', severity: 'error' });
                }
            }
        }
    };

    const handleSubmit = async (values: any) => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        };

        try {
            let response;
            if (editingEstimate) {
                response = await axios.patch(`${API_BASE_URL}/estimate/${subdomain}/${editingEstimate.estimationNo}`, values, { headers });
                setSnackbar({ open: true, message: 'Estimate has been updated.', severity: 'success' });
                fetchData();
            } else {
                response = await axios.post(`${API_BASE_URL}/estimate/${subdomain}`, values, { headers });
                setSnackbar({ open: true, message: 'Estimate has been created.', severity: 'success' });
                fetchData();
            }

            setEstimates((prevEstimates) => {
                if (editingEstimate) {
                    return prevEstimates.map((est) => (est.estimationNo === editingEstimate.estimationNo ? response.data : est));
                } else {
                    return [...prevEstimates, response.data];
                }
            });
            setIsFormVisible(false);
            setEditingEstimate(null);
        } catch (error) {
            setError('An error occurred while saving the estimate. Please try again.');
            setSnackbar({ open: true, message: 'An error occurred while saving the estimate. Please try again.', severity: 'error' });
        }
    };

    const fetchProjects = useCallback(async () => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            const response = await axios.get(`${API_BASE_URL}/project/${subdomain}`, { headers });
            setProjects(response?.data?.data.projects || []);
        } catch (error) {
            setError('Error fetching projects. Please try again.');
        }
    }, [accessToken, subdomain]);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const projectsOptions = useMemo(
        () =>
            projects.map((project) => ({
                label: project?.projectName,
                value: project?._id
            })),
        [projects]
    );

    const handleStatusChange = async (id: string, status: string) => {
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            await axios.patch(`${API_BASE_URL}/estimate/${subdomain}/${id}`, { status }, { headers });

            setSnackbar({ open: true, message: 'Estimate has been updated.', severity: 'success' });
            fetchData();
            // setStatuses((prevStatuses) => prevStatuses.map((expense) => (expense._id === id ? { ...expense, status } : expense)));
        } catch (error) {
            setSnackbar({ open: true, message: 'Error updating status.', severity: 'error' });
        }
    };

    const fetchItem = async () => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            const response = await axios.get(`${API_BASE_URL}/item/${subdomain}`, { headers });
            setItem(response.data.data.items || []);
        } catch (error) {
            setError('Error fetching items. Please try again.');
        }
    };

    useEffect(() => {
        fetchItem();
    }, []);

    const handleDialogClose = () => {
        setIsFormVisible(false);
        setEditingEstimate(null);
    };

    return (
        <Box>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {/* <Box mb={2} display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="primary" onClick={() => { setIsFormVisible(true); setEditingEstimate(null); }}>
                            New Estimate
                        </Button>
                    </Box> */}
                    <EstimateTable
                        estimates={estimatedatasingle}
                        onEdit={handleEdit}
                        setIsFormVisible={setIsFormVisible}
                        onDelete={handleDelete}
                        handleStatusChange={handleStatusChange}
                    />

                    <Dialog
                        open={isFormVisible}
                        onClose={handleDialogClose}
                        fullWidth
                        maxWidth="md"
                        aria-labelledby="estimate-dialog-title"
                    >
                        <DialogTitle sx={{ m: 0, p: 2 }}>
                            <Typography variant="h6" component="div" align="center">
                                {editingEstimate ? 'Edit Estimate Form' : 'Estimate Form'}
                            </Typography>
                            <IconButton
                                aria-label="close"
                                onClick={handleDialogClose}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent dividers>
                            {editingEstimate ? (
                                <EstimateForm
                                    initialValues={editingEstimate}
                                    onSubmit={handleSubmit}
                                    customers={singledata}
                                    projects={projectsOptions}
                                    item={item}
                                />
                            ) : (
                                <EstimateForm
                                    onSubmit={handleSubmit}
                                    initialValues={{}}
                                    customers={singledata}
                                    projects={projectsOptions}
                                    item={item}
                                />
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDialogClose} color="secondary">
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            )}
        </Box>
    );
};

export default EstimatePage;
