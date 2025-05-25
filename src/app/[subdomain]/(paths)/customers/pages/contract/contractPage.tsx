// 'use client';
// import React, { useState, useContext } from 'react';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import { Button, Dialog, DialogTitle, DialogContent, IconButton, Snackbar, Alert, Box } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import ContractTable from './contractTable';
// import EditContractForm from './EditcontractForm';
// import ContractForm from './contractForm';
// import { API_BASE_URL } from '../../../../../utils';
// import userContext from '../../../../../UseContext/UseContext';

// interface Contract {
//     _id: string;
//     // Add other contract fields as needed
// }

// // interface ContractPageProps {
// //     fetchData: () => void;
// // }

// const ContractPage: React.FC<any> = ({ fetchData }) => {
//     const { singledata } = useContext(userContext);
//     const contractalldata = singledata.contracts;
//     const [isFormVisible, setIsFormVisible] = useState(false);
//     const [editingContract, setEditingContract] = useState<Contract | null>(null);
//     const [error, setError] = useState<string | null>(null);
//     const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
//         open: false,
//         message: '',
//         severity: 'success'
//     });

//     const accessToken = Cookies.get('accessToken');
//     const subdomain = Cookies.get('subdomain');

//     const handleEdit = async (_id: string) => {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         try {
//             const response = await axios.get(`${API_BASE_URL}/contract/${subdomain}/${_id}`, { headers });
//             setEditingContract(response.data.data.contract);
//             setIsFormVisible(true);
//         } catch {
//             setError('Error fetching contract details. Please try again.');
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
//                 await axios.delete(`${API_BASE_URL}/contract/${subdomain}/${_id}`, { headers });
//                 setSnackbar({ open: true, message: 'Contract has been deleted.', severity: 'success' });
//                 fetchData();
//             } catch {
//                 setError('Error deleting contract. Please try again.');
//             }
//         }
//     };

//     const handleSubmit = async (values: any) => {
//         const headers = {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`
//         };

//         try {
//             if (editingContract) {
//                 await axios.patch(`${API_BASE_URL}/contract/${subdomain}/${editingContract._id}`, values, { headers });
//                 setSnackbar({ open: true, message: 'Contract has been updated.', severity: 'success' });
//                 fetchData();
//             } else {
//                 await axios.post(`${API_BASE_URL}/contract/${subdomain}`, values, { headers });
//                 setSnackbar({ open: true, message: 'Contract has been created.', severity: 'success' });
//                 fetchData();
//             }
//             setIsFormVisible(false);
//             setEditingContract(null);
//         } catch {
//             setError('An error occurred while saving the contract. Please try again.');
//             setSnackbar({ open: true, message: 'An error occurred while saving the contract. Please try again.', severity: 'error' });
//         }
//     };

//     const handleStatusChange = async (contractId: string, status: string) => {
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             await axios.patch(`${API_BASE_URL}/contract/${subdomain}/${contractId}`, { status }, { headers });
//             fetchData();
//             setSnackbar({ open: true, message: 'Contract has been updated.', severity: 'success' });
//         } catch (error) {
//             setError('Error updating status.');
//         }
//     };

//     const handleCloseSnackbar = () => {
//         setSnackbar({ ...snackbar, open: false });
//     };

//     return (
//         <Box>
//             {error && (
//                 <Alert severity="error" sx={{ mb: 2 }}>
//                     {error}
//                 </Alert>
//             )}

//             <ContractTable contractData={contractalldata} onEdit={handleEdit} setIsFormVisible={setIsFormVisible} setEditingContract={setEditingContract} onDelete={handleDelete} handleStatusChange={handleStatusChange} />

//             <Dialog open={isFormVisible} onClose={() => setIsFormVisible(false)} maxWidth="sm" fullWidth>
//                 <DialogTitle>
//                     {editingContract ? 'Edit Contract Form' : 'Contract Form'}
//                     <IconButton
//                         aria-label="close"
//                         onClick={() => setIsFormVisible(false)}
//                         sx={{
//                             position: 'absolute',
//                             right: 8,
//                             top: 8,
//                             color: (theme) => theme.palette.grey[500]
//                         }}
//                         size="large"
//                     >
//                         <CloseIcon />
//                     </IconButton>
//                 </DialogTitle>
//                 <DialogContent>{editingContract ? <ContractForm contract={editingContract} customers={singledata} onSubmit={handleSubmit} /> : <ContractForm contract={null} onSubmit={handleSubmit} customers={singledata} />}</DialogContent>
//             </Dialog>

//             <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
//                 <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };

// export default ContractPage;
import React from 'react'

export default function contractPage() {
  return (
    <div>contractPage</div>
  )
}
