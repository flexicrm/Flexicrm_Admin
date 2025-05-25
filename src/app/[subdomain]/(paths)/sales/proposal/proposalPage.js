// 'use client';
// import React, { useState, useEffect, useMemo, useRef, useCallback, useContext } from 'react';
// import { Dialog } from 'primereact/dialog';
// import ProposalTable from './proposalTable';

// // import EditProposalForm from './EditproposalForm';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// // import { API_BASE_URL } from '@/app/utils';
// import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';
// import Swal from 'sweetalert2';
// // import userContext from '@/app/UseContext/UseContext';
// import { API_BASE_URL } from '../../../../utils';
// import './sale.scss'
// import ProposalForm from './proposalForm';

// const ProposalPage = () => {
//     const [proposals, setProposals] = useState([]);
//     const [projects, setProjects] = useState([]);
//     const [isFormVisible, setIsFormVisible] = useState(false);
//     const [editingProposal, setEditingProposal] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const accessToken = Cookies.get('accessToken');
//     const subdomain = Cookies.get('subdomain');
//     const [customers, setCustomers] = useState([]);
//     const [item, setItem] = useState([]);
//     const toastRef = useRef(null);

//     const fetchProposals = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/proposal/${subdomain}`, { headers });
//             // console.log(response,"response")
//             setProposals(response?.data?.data?.Proposals || []);
//         } catch (error) {
//             setError('Error fetching proposals. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProposals();
//     }, [accessToken, subdomain]);

//     const fetchProposalById = async (_id) => {
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/proposal/${subdomain}/${_id}`, { headers });
//             setEditingProposal(response.data.data);
//             setIsFormVisible(true);
//         } catch (error) {
//             setError('Error fetching proposal details. Please try again.');
//         }
//     };

//     const handleEdit = (_id) => {
//         fetchProposalById(_id);
//     };

//     const handleDelete = async (_id) => {
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
//                 await axios.delete(`${API_BASE_URL}/proposal/${subdomain}/${_id}`, { headers });
//                 setProposals(proposals.filter((proposal) => proposal.id !== _id));
//                 toastRef.current.show({ severity: 'success', summary: 'Deleted!', detail: 'Proposal has been deleted.', life: 3000 });
//                 fetchProposals(); // Notify parent to refetch data
//             } catch (error) {
//                 setError('Error deleting proposal. Please try again.');
//                 toastRef.current.show({ severity: 'error', summary: 'Error!', detail: 'Error deleting proposal. Please try again.', life: 3000 });
//             }
//         }
//     };

//     const handleSubmit = async (values) => {
//         const headers = {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`
//         };

//         try {
//             let response;
//             if (editingProposal) {
//                 response = await axios.patch(`${API_BASE_URL}/proposal/${subdomain}/${editingProposal._id}`, values, { headers });
//                 toastRef.current.show({ severity: 'success', summary: 'Updated!', detail: 'Proposal has been updated.', life: 3000 });
//                 fetchProposals()
//             } else {
//                 response = await axios.post(`${API_BASE_URL}/proposal/${subdomain}`, values, { headers });
//                 toastRef.current.show({ severity: 'success', summary: 'Created!', detail: 'Proposal has been created.', life: 3000 });
//                 fetchProposals()
//             }

//             setProposals((prevProposals) => {
//                 if (editingProposal) {
//                     return prevProposals.map((prop) => (prop._id === editingProposal._id ? response.data : prop));
//                 } else {
//                     return [...prevProposals, response.data];
//                 }
//             });
//             setIsFormVisible(false);

//         } catch (error) {
//             setError('An error occurred while saving the proposal. Please try again.');
//             toastRef.current.show({ severity: 'error', summary: 'Error!', detail: 'An error occurred while saving the proposal. Please try again.', life: 3000 });
//         }
//     };

//     // useEffect(() => {
//     const fetchItem = async () => {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         try {
//             const response = await axios.get(`${API_BASE_URL}/item/${subdomain}`, { headers });
//             // console.log(response.data.data.items                    ,"item")
//             setItem(response.data.data.items || []);
//         } catch (error) {
//             setError('Error fetching customers. Please try again.');
//         }
//     };

//     // fetchCustomers();
//     // }, [accessToken, subdomain]);

//     const usersOptions = useMemo(
//         () =>
//             customers.map((customer) => ({
//                 label: customer.Companyname,
//                 value: customer._id
//             })),
//         [customers]
//     );
//     const fetchProjects = useCallback(async () => {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         try {
//             const response = await axios.get(`${API_BASE_URL}/project/${subdomain}`, { headers });
//             setProjects(response?.data?.data.projects || []);
//         } catch (error) {
//             setError('Error fetching projects. Please try again.');
//         }
//     }, [accessToken, subdomain]);
//     const fetchCustomers = useCallback(async () => {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         try {
//             const response = await axios.get(`${API_BASE_URL}/customer/${subdomain}`, { headers });
//             setCustomers(response.data.data.customers || []);
//             //   console.log(response)
//         } catch (error) {
//             setError('Error fetching customers. Please try again.');
//         }
//     }, [accessToken, subdomain]);

//     useEffect(() => {
//         fetchProjects();
//         fetchCustomers();
//         fetchItem();
//     }, [accessToken, subdomain]);

//     const projectsOptions = useMemo(
//         () =>
//             projects.map((project) => ({
//                 label: project?.projectName,
//                 value: project?._id
//             })),
//         [projects]
//     );

//     const handleStatusChange = async (contractId, status) => {
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             await axios.patch(`${API_BASE_URL}/proposal/${subdomain}/${contractId}`, { status }, { headers });

//             // setStatuses(prevStatuses =>
//             //     prevStatuses.map(contract =>
//             //         contract.contractId === id ? { ...contract, status } : contract
//             //     )
//             // );
//             fetchProposals();
//         } catch (error) {
//             console.error('Error updating status:', error);
//             // Toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update status', life: 3000 });
//         }
//     };
//     return (
//         <div>
//             <Toast ref={toastRef} />
//             {error && <p className="error">{error}</p>}
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <>

//                     <ProposalTable proposals={proposals} onEdit={handleEdit} onDelete={handleDelete} handleStatusChange={handleStatusChange} setIsFormVisible={setIsFormVisible} setEditingProposal={setEditingProposal} />
//                     {/* <Dialog header="Proposal Form" position="right" visible={isFormVisible} onHide={() => setIsFormVisible(false)}> */}

//                     {/* {isFormVisible && ( */}


//                     {/* <h5 className='element-color'> {editingProposal ? 'Edit Proposal' : 'Proposal'} </h5> */}

//                     {/* {editingProposal ? ( */}
//                     {/* <EditProposalForm proposal={editingProposal} onSubmit={handleSubmit} customers={usersOptions} /> */}
//                     {/* )} */}


//                     <div style={{ display: "none" }}>


//                         <ProposalForm onSubmit={handleSubmit} initialValues={{}} customers={usersOptions} project={projectsOptions} item={item} accessToken={accessToken} subdomain={subdomain} />
//                     </div>





//                 </>
//             )}
//         </div>
//     );
// };

// export default ProposalPage;
import React from 'react'

export default function proposalPage() {
  return (
    <div>proposalPage</div>
  )
}
