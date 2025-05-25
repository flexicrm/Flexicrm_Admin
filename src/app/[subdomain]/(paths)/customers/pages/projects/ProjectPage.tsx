// // "use client"
// // import React, { useState, useEffect, useMemo, useContext, useRef } from 'react';
// // import { Dialog } from 'primereact/dialog';
// // import Cookies from 'js-cookie';
// // import axios from 'axios';
// // import Swal from 'sweetalert2';
// // import { Button } from 'primereact/button';
// // import ProjectTable from './projectTable';
// // import EditProjectForm from './EditprojectForm';
// // import ProjectForm from './ProjectForm';
// // import { Toast } from 'primereact/toast';
// // import userContext from '../../../../../UseContext/UseContext';
// // import { API_BASE_URL } from '../../../../../utils';

// // const ProjectPage = ({ slug, fetchData }) => {
// //     const { singledata } = useContext(userContext);
// //     console.log(singledata,"singleData")
// //     const projectalldata = singledata?.projects;
// //     console.log(singledata, 'Project data');
// //     const toast = useRef(null);
// //     const [projects, setProjects] = useState([]);
// //     const [isFormVisible, setIsFormVisible] = useState(false);
// //     const [editingProject, setEditingProject] = useState(null);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);
// //     const accessToken = Cookies.get('accessToken');
// //     const subdomain = Cookies.get('subdomain');
// //     const [customers, setCustomers] = useState([]);
// //     const [users, setUsersList] = useState([]);

// //     const fetchUsers = async () => {
// //         try {
// //             const headers = { Authorization: `Bearer ${accessToken}` };
// //             const response = await axios.get(`${API_BASE_URL}/user/${subdomain}`, { headers });
// //             setUsersList(response?.data?.data?.users);
// //             fetchData();
// //         } catch (error) {
// //             console.error('Error fetching users:', error);
// //         }
// //     };

// //     useEffect(() => {
// //         fetchUsers();
// //     }, [accessToken]);

// //     useEffect(() => {
// //         const fetchProjects = async () => {
// //             setLoading(true);
// //             setError(null);
// //             try {
// //                 const headers = { Authorization: `Bearer ${accessToken}` };
// //                 const response = await axios.get(`${API_BASE_URL}/project/${subdomain}`, { headers });
// //                 setProjects(response.data.data.projects || []);
// //             } catch {
// //                 setError('Error fetching projects. Please try again.');
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         fetchProjects();
// //     }, [accessToken, subdomain]);

// //     useEffect(() => {
// //         const fetchCustomers = async () => {
// //             const headers = { Authorization: `Bearer ${accessToken}` };
// //             try {
// //                 const response = await axios.get(`${API_BASE_URL}/customer/${subdomain}`, { headers });
// //                 setCustomers(response.data.data.customers || []);
// //             } catch {
// //                 setError('Error fetching customers. Please try again.');
// //             }
// //         };

// //         fetchCustomers();
// //     }, [accessToken, subdomain]);

// //     const customersOptions = useMemo(
// //         () =>
// //             customers.map((customer) => ({
// //                 label: customer.Companyname,
// //                 value: customer._id
// //             })),
// //         [customers]
// //     );

// //     const usersOptions = users.map((user) => ({
// //         firstname: user.firstname,
// //         id: user._id
// //     }));

// //     console.log(customersOptions, 'customersOptions');
// //     console.log(usersOptions, 'usersOptions');

// //     const handleEdit = async (_id) => {
// //         const headers = { Authorization: `Bearer ${accessToken}` };
// //         try {
// //             const response = await axios.get(`${API_BASE_URL}/project/${subdomain}/${_id}`, { headers });
// //             console.log(response, 'responsedata===');
// //             setEditingProject(response.data.data.project);
// //             setIsFormVisible(true);
// //         } catch {
// //             setError('Error fetching project details. Please try again.');
// //         }
// //     };

// //     const handleDelete = async (_id) => {
// //         const result = await Swal.fire({
// //             title: 'Are you sure?',
// //             text: "You won't be able to revert this!",
// //             icon: 'warning',
// //             showCancelButton: true,
// //             confirmButtonColor: '#3085d6',
// //             cancelButtonColor: '#d33',
// //             confirmButtonText: 'Yes, delete it!'
// //         });

// //         if (result.isConfirmed) {
// //             const headers = { Authorization: `Bearer ${accessToken}` };
// //             try {
// //                 await axios.delete(`${API_BASE_URL}/project/${subdomain}/${_id}`, { headers });
// //                 setProjects((prevProjects) => prevProjects.filter((project) => project._id !== _id));
// //                 Swal.fire('Deleted!', 'Project has been deleted.', 'success');
// //                 fetchData();
// //             } catch {
// //                 setError('Error deleting project. Please try again.');
// //             }
// //         }
// //     };

// //     const handleSubmit = async (values) => {
// //         const headers = {
// //             'Content-Type': 'application/json',
// //             Authorization: `Bearer ${accessToken}`
// //         };

// //         try {
// //             let response;
// //             if (editingProject) {
// //                 response = await axios.patch(`${API_BASE_URL}/project/${subdomain}/${editingProject._id}`, values, { headers });
// //                 setProjects((prevProjects) => prevProjects.map((proj) => (proj._id === editingProject._id ? response.data : proj)));
// //                 toast.current.show({ severity: 'success', summary: 'Updated!', detail: 'Project has been updated.', life: 3000 });
// //                 fetchData();
// //             } else {
// //                 response = await axios.post(`${API_BASE_URL}/project/${subdomain}`, values, { headers });
// //                 toast.current.show({ severity: 'success', summary: 'Created!', detail: 'Project has been created.', life: 3000 });
// //                 fetchData();
// //             }

// //             setProjects((prevProjects) => {
// //                 if (editingProject) {
// //                     return prevProjects.map((proj) => (proj._id === editingProject._id ? response.data : proj));
// //                 }
// //                 return [...prevProjects, response.data];
// //             });

// //             setIsFormVisible(false);
// //             setEditingProject(null);
// //         } catch {
// //             setError('An error occurred while saving the project. Please try again.');
// //             toast.current.show({ severity: 'error', summary: 'Error!', detail: 'An error occurred while saving the project. Please try again.', life: 3000 });
// //         }
// //     };

// //     return (
// //         <div>
// //             <Toast ref={toast} />
// //             {error && <p className="error">{error}</p>}
// //             {loading ? (
// //                 <p>Loading...</p>
// //             ) : (
// //                 <>
// //                     <ProjectTable projectData={projectalldata} onEdit={handleEdit} onDelete={handleDelete} setIsFormVisible={setIsFormVisible} setEditingProject={setEditingProject} />

// //                     {isFormVisible && (
// //                         <div className="dialog-overlay ">
// //                             <div className="dialog-content p-5 ">
// //                                 <span className="dialog-close" onClick={() => setIsFormVisible(false)}>
// //                                     &times;
// //                                 </span>
// //                                 {/* // <Dialog position="center" header={editingProject ? 'Edit Project Form' : 'Project Form'} visible={isFormVisible} onHide={() => setIsFormVisible(false)}> */}
// //                                 {editingProject ? (
// //                                     <EditProjectForm project={editingProject} onSubmit={handleSubmit} customers={customersOptions} users={usersOptions} />
// //                                 ) : (
// //                                     <ProjectForm onSubmit={handleSubmit} initialValues={{}} singledata1={singledata} users={usersOptions} />
// //                                 )}
// //                             </div>
// //                         </div>
// //                     )}
// //                 </>
// //             )}
// //         </div>
// //     );
// // };

// // export default ProjectPage;
// 'use client';
// import React, { useState, useEffect, useMemo, useRef } from 'react';
// import { Button, Toast } from 'primereact';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// // import ProjectTable from './ProjectTable';
// // import EditProjectForm from './EditProjectForm';
// import ProjectForm from './ProjectForm';
// // import { Project } from '';
// // import { Customer, User, Project, FormValues } from '../../../type/customer-project';
// import ProjectTable from './projectTable';
// import EditProjectForm from './EditprojectForm';
// import { Dialog, DialogContent, DialogTitle } from '@mui/material';
// import { API_BASE_URL } from '../../../../../utils';
// import { Customer, User, Project, FormValues } from '../../../../../type/customer-project';
// // import { API_BASE_URL } from './utils';
// type ProjectPageProps = {
//     fetchData: any;
// };
// const ProjectPage = ({ fetchData }: ProjectPageProps) => {
//     const toast = useRef<any>(null);
//     const [projects, setProjects] = useState<Project[]>([]);
//     const [isFormVisible, setIsFormVisible] = useState(false);
//     const [editingProject, setEditingProject] = useState<any | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const accessToken = Cookies.get('accessToken');
//     const subdomain = Cookies.get('subdomain');
//     const [customers, setCustomers] = useState<Customer[]>([]);
//     const [users, setUsersList] = useState<User[]>([]);

//     const fetchUsers = async () => {
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/user/${subdomain}`, { headers });
//             console.log(response, 'response');
//             setUsersList(response?.data?.data?.users);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchProjects = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/project/${subdomain}`, { headers });
//             setProjects(response.data.data.projects || []);
//         } catch {
//             setError('Error fetching projects. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProjects();
//     }, []);

//     useEffect(() => {
//         const fetchCustomers = async () => {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             try {
//                 const response = await axios.get(`${API_BASE_URL}/customer/${subdomain}`, { headers });
//                 setCustomers(response.data.data.customers || []);
//             } catch {
//                 setError('Error fetching customers. Please try again.');
//             }
//         };

//         fetchCustomers();
//     }, []);

//     const customersOptions = useMemo(
//         () =>
//             customers?.map((customer) => ({
//                 label: customer?.Companyname,
//                 value: customer?._id
//             })),
//         [customers]
//     );

//     const usersOptions = users.map((user) => ({
//         firstname: user?.firstname,
//         id: user?._id
//     }));

//     const handleEdit = async (_id: string) => {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         try {
//             const response = await axios.get(`${API_BASE_URL}/project/${subdomain}/${_id}`, { headers });
//             setEditingProject(response.data.data.project);
//             setIsFormVisible(true);
//         } catch {
//             setError('Error fetching project details. Please try again.');
//         }
//     };

//     const handleDelete = async (_id: string) => {
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
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             try {
//                 await axios.delete(`${API_BASE_URL}/project/${subdomain}/${_id}`, { headers });
//                 setProjects((prevProjects) => prevProjects.filter((project) => project._id !== _id));
//                 Swal.fire('Deleted!', 'Project has been deleted.', 'success');
//                 fetchProjects();
//                 fetchData();
//             } catch {
//                 setError('Error deleting project. Please try again.');
//             }
//         }
//     };

//     const handleSubmit = async (values: FormValues) => {
//         const headers = {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`
//         };

//         try {
//             let response;
//             if (editingProject) {
//                 response = await axios.patch(`${API_BASE_URL}/project/${subdomain}/${editingProject._id}`, values, { headers });
//                 setProjects((prevProjects) => prevProjects.map((proj) => (proj._id === editingProject._id ? response.data : proj)));
//                 toast.current?.show({ severity: 'success', summary: 'Updated!', detail: 'Project has been updated.', life: 3000 });
//                 fetchProjects();
//             } else {
//                 response = await axios.post(`${API_BASE_URL}/project/${subdomain}`, values, { headers });
//                 toast.current?.show({ severity: 'success', summary: 'Created!', detail: 'Project has been created.', life: 3000 });
//                 fetchProjects();
//             }

//             setProjects((prevProjects) => {
//                 if (editingProject) {
//                     return prevProjects.map((proj) => (proj._id === editingProject._id ? response.data : proj));
//                 }
//                 return [...prevProjects, response.data];
//             });

//             setIsFormVisible(false);
//             setEditingProject(null);
//         } catch {
//             setError('An error occurred while saving the project. Please try again.');
//             toast.current?.show({ severity: 'error', summary: 'Error!', detail: 'An error occurred while saving the project. Please try again.', life: 3000 });
//         }
//     };

//     return (
//         <div>
//             <Toast ref={toast} />
//             {error && <p className="error">{error}</p>}
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <>
//                     <ProjectTable projectData={projects} onEdit={handleEdit} onDelete={handleDelete} setIsFormVisible={setIsFormVisible} setEditingProject={setEditingProject} />

//                     <Dialog open={isFormVisible} onClose={() => setIsFormVisible(false)} aria-labelledby="form-dialog-title" maxWidth="md" fullWidth>
//                         <DialogTitle id="form-dialog-title">{editingProject ? 'Edit Project Form' : 'Project Form'}</DialogTitle>
//                         <DialogContent dividers>
//                             {editingProject ? (
//                                 <ProjectForm project={editingProject} onSubmit={handleSubmit} customers={customers} users={usersOptions} />
//                             ) : (
//                                 <ProjectForm project={null} onSubmit={handleSubmit} customers={customers} users={usersOptions} />
//                             )}
//                         </DialogContent>
//                     </Dialog>
//                 </>
//             )}
//         </div>
//     );
// };

// export default ProjectPage;
import React from 'react'

export default function Page() {
  return (
    <div>P</div>
  )
}
