// 'use client';
// import React, { useState, useEffect, useMemo, useCallback, useContext, useRef } from 'react';
// import { Dialog } from 'primereact/dialog';

// import Cookies from 'js-cookie';
// import axios from 'axios';
// // import { API_BASE_URL } from '@/app/utils';
// import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';
// // import userContext from '@/app/UseContext/UseContext';
// import ItemForm from './itemForm';
// import EditItemForm from './EdititemForm';
// import ItemTable from './itemTable';
// import { API_BASE_URL } from '../../../../utils';

// const ItemPage = () => {
//     const [items, setItems] = useState([]);
//     const [isFormVisible, setIsFormVisible] = useState(false);
//     const [editingItem, setEditingItem] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const accessToken = Cookies.get('accessToken');
//     const subdomain = Cookies.get('subdomain');
//     const [customers, setCustomers] = useState([]);
//     const [projects, setProjects] = useState([]);
//     const toastRef = useRef(null); // Reference for the Toast component

//     const fetchItems = async () => {
//         setLoading(true);
//         setError(null);
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/item/${subdomain}`, { headers });
//             setItems(response?.data?.data.items || []);
//         } catch (error) {
//             setError('Error fetching items. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchItems();
//     }, []);

//     const fetchItemById = async (_id) => {
//         alert("all")
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/item/${subdomain}/items?itemIds=${_id}`, { headers });
//             console.log(response,"response")
//             setEditingItem(response.data.data.items);
//             setIsFormVisible(true);
//         } catch (error) {
//             setError('Error fetching item details. Please try again.');
//         }
//     };

//     const handleEdit = (_id) => {
//         // console.log(_id,"http://localhost:8081/api/v1/item/:subdomain/:itemIdhttp://localhost:8081/api/v1/item/:subdomain/:itemId")
//         fetchItemById(_id);
//     };

//     const handleDelete = async (_id) => {
//         if (typeof window !== 'undefined') {
//             const confirmed = window.confirm('Are you sure you want to delete this item? This action cannot be undone.');
//             if (confirmed) {
//                 try {
//                     const headers = { Authorization: `Bearer ${accessToken}` };
//                     await axios.delete(`${API_BASE_URL}/item/${subdomain}/${_id}`, { headers });
//                     setItems(items.filter((item) => item.itemNo !== itemNo));
//                     toastRef.current.show({ severity: 'success', summary: 'Deleted!', detail: 'Item has been deleted.' });
//                     fetchItems();
//                 } catch (error) {
//                     setError('Error deleting item. Please try again.');
//                     toastRef.current.show({ severity: 'error', summary: 'Error!', detail: 'Error deleting item. Please try again.' });
//                 }
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
//             if (editingItem) {
//                 // console.log(editingItem,"http://localhost:8081/api/v1/item/:subdomain/:itemId")
//                 response = await axios.patch(`${API_BASE_URL}/item/${subdomain}/${editingItem._id}`, values, { headers });
//                 toastRef.current.show({ severity: 'success', summary: 'Updated!', detail: 'Item has been updated.' });
//             } else {
//                 response = await axios.post(`${API_BASE_URL}/item/${subdomain}`, values, { headers });
//                 toastRef.current.show({ severity: 'success', summary: 'Created!', detail: 'Item has been created.' });
//             }
//             setItems((prevItems) => {
//                 if (editingItem) {
//                     return prevItems.map((itm) => (itm.itemNo === editingItem.itemNo ? response.data : itm));
//                 } else {
//                     return [...prevItems, response.data];
//                 }
//             });
//             setIsFormVisible(false);
//             setEditingItem(null);
//             fetchItems();
//         } catch (error) {
//             setError('An error occurred while saving the item. Please try again.');
//             toastRef.current.show({ severity: 'error', summary: 'Error!', detail: 'An error occurred while saving the item. Please try again.' });
//         }
//     };

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
//             // console.log(response);
//         } catch (error) {
//             setError('Error fetching customers. Please try again.');
//         }
//     }, [accessToken, subdomain]);

//     useEffect(() => {
//         fetchCustomers();
//         fetchProjects();
//     }, [fetchProjects]);

//     const projectsOptions = useMemo(
//         () =>
//             projects.map((project) => ({
//                 label: project?.projectName,
//                 value: project?._id
//             })),
//         [projects]
//     );

//     const handleStatusChange = async (id, status) => {
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             await axios.patch(`${API_BASE_URL}/item/${subdomain}/${id}`, { status }, { headers });
//             // setStatuses(prevStatuses =>
//             //     prevStatuses.map(item =>
//             //         item._id === id ? { ...item, status } : item
//             //     )
//             // );
//             fetchItems();
//         } catch (error) {
//             console.error('Error updating status:', error);
//         }
//     };

//     const usersOptions = useMemo(
//         () =>
//             customers.map((customer) => ({
//                 label: customer.Companyname,
//                 value: customer._id
//             })),
//         [customers]
//     );

//     return (
//         <div>
//             <Toast ref={toastRef} /> {/* Toast Component */}
//             {error && <p className="error">{error}</p>}
//             {loading ? (
//                 <p>Loading...</p>
//             ) : (
//                 <>
                    
//                     <ItemTable items={items} onEdit={handleEdit} setIsFormVisible={setIsFormVisible} onDelete={handleDelete} handleStatusChange={handleStatusChange} />
//                     {/* <Dialog                         
//                         header={editingItem ? "Edit Item Form" : "Item Form"}                         
//                         visible={isFormVisible}                         
//                         onHide={() => setIsFormVisible(false)}                         
//                         aria-hidden={!isFormVisible}                     
//                     >                     */}
//                     {isFormVisible && (
//                         <div className="dialog-overlay ">
//                             <div className="dialog-content p-5 ">
//                                 <span className="dialog-close" onClick={() => setIsFormVisible(false)}>
//                                     &times;
//                                 </span>

//                                 <h5>{editingItem ? 'Edit Item Form' : 'Item Form'} </h5>
//                                 {editingItem ? (
//                                     <EditItemForm item={editingItem} onSubmit={handleSubmit} customers={usersOptions} projects={projectsOptions} />
//                                 ) : (
//                                     <ItemForm onSubmit={handleSubmit} initialValues={{}} customers={usersOptions} projects={projectsOptions} />
//                                 )}
//                             </div>
//                         </div>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default ItemPage;
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}