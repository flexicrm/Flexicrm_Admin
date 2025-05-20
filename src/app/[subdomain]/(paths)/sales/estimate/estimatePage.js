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
// "use client";
// import React, { useState, useEffect, useMemo, useCallback, useContext, useRef } from 'react';
// import { Dialog } from 'primereact/dialog';
// import EstimateForm from "./EstimateForm";
// import EditEstimateForm from "./EditEstimateForm";
// import EstimateTable from "./EstimateTable";
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import { API_BASE_URL } from '@/app/utils';
// import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';
// import userContext from '@/app/UseContext/UseContext';

// const EstimatePage = ( ) => {

//     const [estimates, setEstimates] = useState([]);
//     const [isFormVisible, setIsFormVisible] = useState(false);
//     const [editingEstimate, setEditingEstimate] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const accessToken = Cookies.get("accessToken");
//     const subdomain = Cookies.get("subdomain");
//     const [customers, setCustomers] = useState([]);
//     const [projects, setProjects] = useState([]);
//     const toastRef = useRef(null); // Reference for the Toast component

//     const fetchEstimates = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/estimate/${subdomain}`, { headers });
//             console.log(response,"response")
//             setEstimates(response?.data?.data.estimates || []);
//         } catch (error) {
//             setError("Error fetching estimates. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     }, [accessToken, subdomain];

//     useEffect(() => {
//         fetchEstimates();
//     }, [fetchEstimates]);

//     const fetchEstimateById = async (estimationNo) => {
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/estimate/${subdomain}/${estimationNo}`, { headers });
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
//         const confirmed = window.confirm("Are you sure you want to delete this estimate? This action cannot be undone.");
//         if (confirmed) {
//             try {
//                 const headers = { Authorization: `Bearer ${accessToken}` };
//                 await axios.delete(`${API_BASE_URL}/estimate/${subdomain}/${estimationNo}`, { headers });
//                 setEstimates(estimates.filter((estimate) => estimate.estimationNo !== estimationNo));
//                 toastRef.current.show({ severity: 'success', summary: 'Deleted!', detail: 'Estimate has been deleted.' });
//                 fetchData();
//             } catch (error) {
//                 setError("Error deleting estimate. Please try again.");
//                 toastRef.current.show({ severity: 'error', summary: 'Error!', detail: 'Error deleting estimate. Please try again.' });
//             }
//         }
//     };

//     const handleSubmit = async (values) => {
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
//                 toastRef.current.show({ severity: 'success', summary: 'Updated!', detail: 'Estimate has been updated.' });
//             } else {
//                 response = await axios.post(
//                     `${API_BASE_URL}/estimate/${subdomain}`,
//                     values,
//                     { headers }
//                 );
//                 toastRef.current.show({ severity: 'success', summary: 'Created!', detail: 'Estimate has been created.' });
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
//             fetchData();
//         } catch (error) {
//             setError("An error occurred while saving the estimate. Please try again.");
//             toastRef.current.show({ severity: 'error', summary: 'Error!', detail: 'An error occurred while saving the estimate. Please try again.' });
//         }
//     };

//     const fetchProjects = useCallback(async () => {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         try {
//             const response = await axios.get(`${API_BASE_URL}/project/${subdomain}`, { headers });
//             setProjects(response?.data?.data.projects || []);
//         } catch (error) {
//             setError("Error fetching projects. Please try again.");
//         }
//     }, [accessToken, subdomain]);
//     const fetchCustomers = useCallback(async () => {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         try {
//           const response = await axios.get(`${API_BASE_URL}/customer/${subdomain}`, { headers });
//           setCustomers(response.data.data.customers || []);
//         } catch (error) {
//           setError("Error fetching customers. Please try again.");
//         }
//       }, [accessToken, subdomain]);

//     // useEffect(() => {
//     //     fetchCustomers()  ;
//     //     fetchProjects();
//     // }, [ fetchProjects,fetchCustomers]);

//     const projectsOptions = useMemo(() =>
//         projects.map((project) => ({
//             label: project?.projectName,
//             value: project?._id,
//         })), [projects]);
//         const usersOptions = useMemo(() =>
//             customers.map((customer) => ({
//               label: customer.name,
//               value: customer._id,
//             })), [customers]);
//         const handleStatusChange = async (id, status) => {
//             try {
//                 const headers = { Authorization: `Bearer ${accessToken}` };
//                 await axios.patch(
//                     `${API_BASE_URL}/estimate/${subdomain}/${id}`,
//                     { status },
//                     { headers }
//                 );

//                 setStatuses(prevStatuses =>
//                     prevStatuses.map(expense =>
//                         expense._id === id ? { ...expense, status } : expense
//                     )
//                 );
//                 fetchData();
//             } catch (error) {
//                 console.error("Error updating status:", error);
//             }
//         };
//     return (
//         <div>
//             <Toast ref={toastRef} /> {/* Toast Component */}
//             {error && <p className="error">{error}</p>}
//             {loading ? <p>Loading...</p> : (
//                 <>
//                     <Button onClick={() => setIsFormVisible(true)}>New Estimate</Button>
//                     {/* <EstimateTable estimates={estimates} onEdit={handleEdit} onDelete={handleDelete} handleStatusChange={handleStatusChange} /> */}

//                     <Dialog
//                         header={editingEstimate ? "Edit Estimate Form" : "Estimate Form"}
//                         visible={isFormVisible}
//                         onHide={() => setIsFormVisible(false)}
//                         aria-hidden={!isFormVisible}
//                     >
//                         {editingEstimate ? (
//                             <EditEstimateForm
//                                 estimate={editingEstimate}
//                                 onSubmit={handleSubmit}
//                                 customers={usersOptions}
//                                 projects={projectsOptions}
//                             />
//                         ) : (
//                             <EstimateForm
//                                 onSubmit={handleSubmit}
//                                 initialValues={{}}
//                                 customers={usersOptions}
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
// "use client";
// import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
// import { Dialog } from 'primereact/dialog';
// import EstimateForm from "./EstimateForm";
// import EditEstimateForm from "./EditEstimateForm";
// import EstimateTable from "./EstimateTable";
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import { API_BASE_URL } from '@/app/utils';
// import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';
// import userContext from '@/app/UseContext/UseContext';

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
//     const toastRef = useRef(null); // Reference for the Toast component

//     const fetchEstimates = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/estimate/${subdomain}`, { headers });
//             console.log(response, "response");
//             setEstimates(response?.data?.data.estimates || []);
//         } catch (error) {
//             setError("Error fetching estimates. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     }; // Fixed closing parenthesis here

//     useEffect(() => {
//         fetchEstimates();
//     }, [fetchEstimates]);

//     const fetchEstimateById = async (estimationNo) => {
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/estimate/${subdomain}/${estimationNo}`, { headers });
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
//         const confirmed = window.confirm("Are you sure you want to delete this estimate? This action cannot be undone.");
//         if (confirmed) {
//             try {
//                 const headers = { Authorization: `Bearer ${accessToken}` };
//                 await axios.delete(`${API_BASE_URL}/estimate/${subdomain}/${estimationNo}`, { headers });
//                 setEstimates(estimates.filter((estimate) => estimate.estimationNo !== estimationNo));
//                 toastRef.current.show({ severity: 'success', summary: 'Deleted!', detail: 'Estimate has been deleted.' });
//                 fetchEstimates(); // Changed from fetchData to fetchEstimates
//             } catch (error) {
//                 setError("Error deleting estimate. Please try again.");
//                 toastRef.current.show({ severity: 'error', summary: 'Error!', detail: 'Error deleting estimate. Please try again.' });
//             }
//         }
//     };

//     const handleSubmit = async (values) => {
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
//                 toastRef.current.show({ severity: 'success', summary: 'Updated!', detail: 'Estimate has been updated.' });
//             } else {
//                 response = await axios.post(
//                     `${API_BASE_URL}/estimate/${subdomain}`,
//                     values,
//                     { headers }
//                 );
//                 toastRef.current.show({ severity: 'success', summary: 'Created!', detail: 'Estimate has been created.' });
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
//             fetchEstimates(); // Changed from fetchData to fetchEstimates
//         } catch (error) {
//             setError("An error occurred while saving the estimate. Please try again.");
//             toastRef.current.show({ severity: 'error', summary: 'Error!', detail: 'An error occurred while saving the estimate. Please try again.' });
//         }
//     };

//     const fetchProjects = useCallback(async () => {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         try {
//             const response = await axios.get(`${API_BASE_URL}/project/${subdomain}`, { headers });
//             setProjects(response?.data?.data.projects || []);
//         } catch (error) {
//             setError("Error fetching projects. Please try again.");
//         }
//     }, [accessToken, subdomain]);

//     const fetchCustomers = useCallback(async () => {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         try {
//             const response = await axios.get(`${API_BASE_URL}/customer/${subdomain}`, { headers });
//             setCustomers(response.data.data.customers || []);
//         } catch (error) {
//             setError("Error fetching customers. Please try again.");
//         }
//     }, [accessToken, subdomain]);

//     const projectsOptions = useMemo(() =>
//         projects.map((project) => ({
//             label: project?.projectName,
//             value: project?._id,
//         })), [projects]);

//     const usersOptions = useMemo(() =>
//         customers.map((customer) => ({
//             label: customer.name,
//             value: customer._id,
//         })), [customers]);

//     const handleStatusChange = async (id, status) => {
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             await axios.patch(
//                 `${API_BASE_URL}/estimate/${subdomain}/${id}`,
//                 { status },
//                 { headers }
//             );

//             setEstimates(prevEstimates =>
//                 prevEstimates.map(estimate =>
//                     estimate._id === id ? { ...estimate, status } : estimate
//                 )
//             );
//             fetchEstimates(); // Changed from fetchData to fetchEstimates
//         } catch (error) {
//             console.error("Error updating status:", error);
//         }
//     };

//     return (
//         <div>
//             <Toast ref={toastRef} /> {/* Toast Component */}
//             {error && <p className="error">{error}</p>}
//             {loading ? <p>Loading...</p> : (
//                 <>
//                     <Button onClick={() => setIsFormVisible(true)}>New Estimate</Button>
//                     {/* <EstimateTable estimates={estimates} onEdit={handleEdit} onDelete={handleDelete} handleStatusChange={handleStatusChange} /> */}

//                     <Dialog
//                         header={editingEstimate ? "Edit Estimate Form" : "Estimate Form"}
//                         visible={isFormVisible}
//                         onHide={() => setIsFormVisible(false)}
//                         aria-hidden={!isFormVisible}
//                     >
//                         {editingEstimate ? (
//                             <EditEstimateForm
//                                 estimate={editingEstimate}
//                                 onSubmit={handleSubmit}
//                                 customers={usersOptions}
//                                 projects={projectsOptions}
//                             />
//                         ) : (
//                             <EstimateForm
//                                 onSubmit={handleSubmit}
//                                 initialValues={{}}
//                                 customers={usersOptions}
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
import { Dialog } from 'primereact/dialog';
import EstimateForm from './EstimateForm';
import EditEstimateForm from './EditEstimateForm';
import EstimateTable from './EstimateTable';
import Cookies from 'js-cookie';
import axios from 'axios';
// import { API_BASE_URL } from '@/app/utils';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
// import userContext from '@/app/UseContext/UseContext';
import { API_BASE_URL } from '../../../../utils';

const EstimatePage = () => {
    const [estimates, setEstimates] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editingEstimate, setEditingEstimate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const accessToken = Cookies.get('accessToken');
    const subdomain = Cookies.get('subdomain');
    const [customers, setCustomers] = useState([]);
    const [projects, setProjects] = useState([]);
    const toastRef = useRef(null); // Reference for the Toast component
    const [item, setItem] = useState([]);

    const fetchEstimates = async () => {
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
    };

    useEffect(() => {
        fetchEstimates();
    }, []);

    const fetchEstimateById = async (estimationNo) => {
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axios.get(`${API_BASE_URL}/estimate/${subdomain}/${estimationNo}`, { headers });
            setEditingEstimate(response.data.data.estimate);
            setIsFormVisible(true);
        } catch (error) {
            setError('Error fetching estimate details. Please try again.');
        }
    };

    const handleEdit = (estimationNo) => {
        fetchEstimateById(estimationNo);
    };

    const handleDelete = async (estimationNo) => {
        if (typeof window !== 'undefined') {
            const confirmed = window.confirm('Are you sure you want to delete this estimate? This action cannot be undone.');
            if (confirmed) {
                try {
                    const headers = { Authorization: `Bearer ${accessToken}` };
                    await axios.delete(`${API_BASE_URL}/estimate/${subdomain}/${estimationNo}`, { headers });
                    setEstimates(estimates.filter((estimate) => estimate.estimationNo !== estimationNo));
                    toastRef.current.show({ severity: 'success', summary: 'Deleted!', detail: 'Estimate has been deleted.' });
                    fetchEstimates();
                } catch (error) {
                    setError('Error deleting estimate. Please try again.');
                    toastRef.current.show({ severity: 'error', summary: 'Error!', detail: 'Error deleting estimate. Please try again.' });
                }
            }
        }
    };

    const handleSubmit = async (values) => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        };

        try {
            let response;
            if (editingEstimate) {
                response = await axios.patch(`${API_BASE_URL}/estimate/${subdomain}/${editingEstimate.estimationNo}`, values, { headers });
                toastRef.current.show({ severity: 'success', summary: 'Updated!', detail: 'Estimate has been updated.' });
            } else {
                response = await axios.post(`${API_BASE_URL}/estimate/${subdomain}`, values, { headers });
                toastRef.current.show({ severity: 'success', summary: 'Created!', detail: 'Estimate has been created.' });
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
            fetchEstimates();
        } catch (error) {
            setError('An error occurred while saving the estimate. Please try again.');
            toastRef.current.show({ severity: 'error', summary: 'Error!', detail: 'An error occurred while saving the estimate. Please try again.' });
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
    const fetchCustomers = useCallback(async () => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            const response = await axios.get(`${API_BASE_URL}/customer/${subdomain}`, { headers });
            setCustomers(response.data.data.customers || []);
            //   console.log(response)
        } catch (error) {
            setError('Error fetching customers. Please try again.');
        }
    }, [accessToken, subdomain]);

    useEffect(() => {
        fetchCustomers();
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
    const handleStatusChange = async (id, status) => {
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            await axios.patch(`${API_BASE_URL}/estimate/${subdomain}/${id}`, { status }, { headers });

            setStatuses((prevStatuses) => prevStatuses.map((expense) => (expense._id === id ? { ...expense, status } : expense)));
            fetchEstimates();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };
    const usersOptions = useMemo(
        () =>
            customers.map((customer) => ({
                label: customer.Companyname,
                value: customer._id
            })),
        [customers]
    );
    const fetchItem = async () => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            const response = await axios.get(`${API_BASE_URL}/item/${subdomain}`, { headers });
            // console.log(response.data.data.items, "item")
            setItem(response.data.data.items || []);
        } catch (error) {
            setError('Error fetching customers. Please try again.');
        }
    };
    useEffect(() => {
        fetchItem();
    }, []);
    return (
        <div>
            <Toast ref={toastRef} /> {/* Toast Component */}
            {error && <p className="error">{error}</p>}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                   
                    <EstimateTable estimates={estimates} onEdit={handleEdit} onDelete={handleDelete} handleStatusChange={handleStatusChange} setIsFormVisible={setIsFormVisible} />

                    {/* <Dialog
                        header={editingEstimate ? "Edit Estimate Form" : "Estimate Form"}
                        visible={isFormVisible}
                        onHide={() => setIsFormVisible(false)}
                        aria-hidden={!isFormVisible}
                    > */}

                    {isFormVisible && (
                        <div className="dialog-overlay ">
                            <div className="dialog-content p-5 ">
                                <span className="dialog-close" onClick={() => setIsFormVisible(false)}>
                                    &times;
                                </span>

                                <h5> {editingEstimate ? "Edit Estimate " : "Estimate"} </h5>
                                {editingEstimate ? (
                                    <EditEstimateForm initialValues={editingEstimate} onSubmit={handleSubmit} customers={usersOptions} projects={projectsOptions} item={item} />
                                ) : (
                                    <EstimateForm onSubmit={handleSubmit} initialValues={{}} customers={usersOptions} projects={projectsOptions} item={item} />
                                )}
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default EstimatePage;
