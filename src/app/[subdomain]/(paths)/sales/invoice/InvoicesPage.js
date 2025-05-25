// "use client"
// import React, { useState, useEffect, useMemo, useContext, useRef } from 'react';
// import { Dialog } from 'primereact/dialog';
// import InvoiceTable from './InvoiceTable';
// import InvoiceForm from './InvoiceForm';
// import EditInvoiceForm from "./EditInvoiceForm";
// import Cookies from 'js-cookie';
// import axios from 'axios';
// // import { API_BASE_URL } from '@/app/utils';
// import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';
// // import userContext from '@/app/UseContext/UseContext';
// import Swal from 'sweetalert2';
// import { API_BASE_URL } from '../../../../utils';

// const InvoicesPage = ( ) => {
    
//     const [invoices, setInvoices] = useState([]);
//     const [isFormVisible, setIsFormVisible] = useState(false);
//     const [editingInvoice, setEditingInvoice] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const accessToken = Cookies.get("accessToken");
//     const subdomain = Cookies.get("subdomain");
//     const [customers, setCustomers] = useState([]);
//     const toastRef = useRef(null);
//     const [item, setItem] = useState([])
//     const fetchInvoices = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/invoice/${subdomain}`, { headers });
//             setInvoices(response.data.data.invoices || []);
//         } catch (error) {
//             setError("Error fetching invoices. Please try again.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchInvoices();
//     }, [accessToken, subdomain]);

//     const fetchInvoiceById = async (_id) => {
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/invoice/${subdomain}/${_id}`, { headers });
//             setEditingInvoice(response.data.data);
//             setIsFormVisible(true);
//         } catch (error) {
//             setError("Error fetching invoice details. Please try again.");
//         }
//     };

//     const handleEdit = (_id) => {
//         fetchInvoiceById(_id);
//     };

//     const handleDelete = async (_id) => {
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
//                 await axios.delete(`${API_BASE_URL}/invoice/${subdomain}/${_id}`, { headers });
//                 setInvoices(invoices.filter((invoice) => invoice.id !== _id));
//                 toastRef.current.show({ severity: 'success', summary: 'Deleted!', detail: 'Invoice has been deleted.', life: 3000 });
//                 fetchInvoices(); // Notify parent to refetch data
//             } catch (error) {
//                 setError("Error deleting invoice. Please try again.");
//                 toastRef.current.show({ severity: 'error', summary: 'Error!', detail: 'Error deleting invoice. Please try again.', life: 3000 });
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
//             if (editingInvoice) {
//                 response = await axios.patch(
//                     `${API_BASE_URL}/invoice/${subdomain}/${editingInvoice._id}`,
//                     values,
//                     { headers }
//                 );
//                 toastRef.current.show({ severity: 'success', summary: 'Updated!', detail: 'Invoice has been updated.', life: 3000 });
//                 fetchInvoices()
//             } else {
//                 response = await axios.post(
//                     `${API_BASE_URL}/invoice/${subdomain}`,
//                     values,
//                     { headers }
//                 );
//                 toastRef.current.show({ severity: 'success', summary: 'Created!', detail: 'Invoice has been created.', life: 3000 });
//                 fetchInvoices()
//             }

//             setInvoices((prevInvoices) => {
//                 if (editingInvoice) {
//                     return prevInvoices.map((inv) =>
//                         inv._id === editingInvoice._id ? response.data : inv
//                     );
//                 } else {
//                     return [...prevInvoices, response.data];
//                 }
//             });
//             setIsFormVisible(false);

//         } catch (error) {
//             setError("An error occurred while saving the invoice. Please try again.");
//             toastRef.current.show({ severity: 'error', summary: 'Error!', detail: 'An error occurred while saving the invoice. Please try again.', life: 3000 });
//         }
//     };

//     useEffect(() => {
//         const fetchCustomers = async () => {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             try {
//                 const response = await axios.get(`${API_BASE_URL}/customer/${subdomain}`, { headers });
//                 setCustomers(response.data.data.customers || []);
//             } catch (error) {
//                 setError("Error fetching customers. Please try again.");
//             }
//         };

//         fetchCustomers();
//     }, [accessToken, subdomain]);

//     const usersOptions = useMemo(() =>
//         customers.map((customer) => ({
//             label: customer.Companyname,
//             value: customer._id,
//         })), [customers]);
//         const fetchItem = async () => {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             try {
//                 const response = await axios.get(`${API_BASE_URL}/item/${subdomain}`, { headers });
//                 // console.log(response.data.data.items, "item")
//                 setItem(response.data.data.items || []);
    
//             } catch (error) {
//                 setError("Error fetching customers. Please try again.");
//             }
//         };
//         useEffect(() => {
//             fetchItem()
//         }, [])

//     return (
//         <div>
//             <Toast ref={toastRef} />
//             {error && <p className="error">{error}</p>}
//             {loading ? <p>Loading...</p> : (
//                 <>
                  
//                     <InvoiceTable invoices={invoices} onEdit={handleEdit} onDelete={handleDelete}  setIsFormVisible ={setIsFormVisible}setEditingInvoice={setEditingInvoice} />
//                     {/* <Dialog header="Invoice Form" visible={isFormVisible} onHide={() => setIsFormVisible(false)}> */}
//                     {isFormVisible && (
//                         <div className="dialog-overlay ">
//                             <div className="dialog-content p-5 ">
//                                 <span className="dialog-close" onClick={() => setIsFormVisible(false)}>
//                                     &times;
//                                 </span>

//                                 <h5> {editingInvoice ? "Edit Invoice ":" Invoice"}</h5>
//                         {editingInvoice ? (
//                             <EditInvoiceForm
//                                 invoice={editingInvoice}
//                                 onSubmit={handleSubmit}
//                                 customers={usersOptions}
//                                 item={item}
//                             />
//                         ) : (
//                             <InvoiceForm
//                                 onSubmit={handleSubmit}
//                                 initialValues={{}}
//                                 customers={usersOptions}
//                                 item={item}
//                             />
//                         )}
//                         </div>
//                         </div>
//             )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default InvoicesPage;
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}