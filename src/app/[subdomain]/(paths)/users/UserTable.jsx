// 'use client';
// import { useRouter } from 'next/navigation';
// import { Button } from 'primereact/button';
// import { Column } from 'primereact/column';
// import { DataTable } from 'primereact/datatable';
// import React, { useEffect, useRef, useState } from 'react';
// import Cookies from 'js-cookie';
// import axiosInstance from '../../../../../axiosConfig';
// import { Toast } from 'primereact/toast';
// import Swal from 'sweetalert2';
// import Link from 'next/link';
// export default function UserTable(filteredUsers) {
//     console.log(filteredUsers, 'filteredUsers');
//     const filtervalue = filteredUsers?.filteredUsers;
//     const filterView = filteredUsers?.view;
//     const router = useRouter();
//     const toast = useRef(null);
//     const [loading, setLoading] = useState(false);
//     const subdomain = Cookies.get('subdomain');
//     const [selectedUsers, setSelectedUsers] = useState([]);
//     const headerStyleleft = {
//         backgroundColor: ' rgba(10, 45, 90, 0.966)',
//         color: 'white',
//         border: 'none',
//         width: '3rem',
//         borderTopLeftRadius: '10px',
//         borderBottomLeftRadius: '10px'
//     };
//     const headerStyle = {
//         backgroundColor: ' rgba(10, 45, 90, 0.966)',
//         color: 'white',
//         border: 'none'
//     };
//     const headerStyleright = {
//         backgroundColor: ' rgba(10, 45, 90, 0.966)',
//         color: 'white',
//         border: 'none',
//         borderTopRightRadius: '10px',
//         borderBottomRightRadius: '10px'
//     };
//     useEffect(() => {
//         setLoading(true);
//     }, []);
//     const verifiedBodyTemplate = (rowData) => {
//         return new Date(rowData?.createdAt).toLocaleDateString();
//     };

//     const filterDate = (value, filter) => {
//         if (filter && filter.value) {
//             const startDate = new Date(filter.value.start);
//             const endDate = new Date(filter.value.end);
//             const date = new Date(value);
//             return date >= startDate && date <= endDate;
//         }
//         return true;
//     };

//     const actionBodyTemplate = (rowData) => {
//         return (
//             <div className="user-action-button">
//                 <Button icon="pi pi-pencil" style={{ all: 'unset', color: '#0884FF' }} className="p-button-rounded p-button-success mr-2" onClick={() => handleEdit(rowData._id, rowData)} />
//                 <Button icon="pi pi-trash" style={{ all: 'unset', color: '#F81D1D' }} className="p-button-rounded p-button-warning" onClick={() => handleDelete(rowData._id)} />
//             </div>
//         );
//     };

//     const NameTemplate = (rowData) => {
//         return (
//             <div>
//                 <Link href={`/${subdomain}/users/userviewpage/${rowData._id}`}>
//                     <span> {rowData.firstname} </span>
//                     <span>{rowData.lastname}</span>
//                 </Link>
//             </div>
//         );
//     };
//     const textEditor = (options) => <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;

//     const mobileEditor = (options) => <InputMask mask="+51-9999999999" type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;

//     const roleEditor = (options) => (
//         <Dropdown
//             value={options.value}
//             options={userRoles}
//             onChange={(e) => {
//                 options.editorCallback(e.value);
//                 handleRoleChange(e.value, options.rowIndex);
//             }}
//             optionLabel="name"
//         />
//     );

//     const handleEdit = (userId) => {
//         // setEditUser(userDetails);
//         router.push(`/${subdomain}/users/edit/${userId}`);
//         // setShowModal(true);
//     };
//     const handleRowEditComplete = async ({ newData, index }) => {
//         setLoading(true);
//         const userId = userData[index]?._id;

//         if (!userId) {
//             console.error('User ID is null or undefined');
//             setLoading(false);
//             return;
//         }

//         try {
//             await axiosInstance.put(`/user/${subdomain}/me`, { ...newData, id: userId, permissions });

//             toast.current.show({
//                 severity: 'success',
//                 summary: 'User Updated',
//                 detail: 'The user has been updated.'
//             });
//             setUserData((prev) => prev.map((user, i) => (i === index ? newData : user)));
//         } catch (error) {
//             toast.current.show({
//                 severity: 'error',
//                 summary: 'Error',
//                 detail: error.response?.data?.message || 'Failed to update user.'
//             });
//         } finally {
//             setLoading(false);
//         }
//     };
//     const handleDelete = async (userId) => {
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
//             setLoading(true);
//             try {
//                 await axiosInstance.delete(`/user/${subdomain}/${userId}`);
//                 toast.current.show({
//                     severity: 'success',
//                     summary: 'Deleted',
//                     detail: 'The user has been deleted.'
//                 });
//                 setUserData((prev) => prev.filter((user) => user._id !== userId));
//                 setSelectedUsers((prev) => prev.filter((id) => id !== userId));
//             } catch (error) {
//                 toast.current.show({
//                     severity: 'error',
//                     summary: 'Error',
//                     detail: error.message || 'There was a problem deleting the user.'
//                 });
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

//     return (
//         <>
//             <Toast ref={toast} />
//             {/* {loading ? (
//                 <h2>Loading...</h2>
//             ) :  */}
//             {filtervalue.length ? (
//                 filterView === 'table' ? (
//                     <DataTable className="p-mt-2 " value={filtervalue} stripedRows onRowEditComplete={handleRowEditComplete} selection={selectedUsers} onSelectionChange={(e) => setSelectedUsers(e.value)}>
//                         <Column selectionMode="multiple" headerStyle={headerStyleleft} />
//                         <Column header="Date" body={verifiedBodyTemplate} filterField="createdAt" headerStyle={headerStyle} filterFunction={filterDate} filterPlaceholder="Search by date" />
//                         <Column header=" Name" editor={textEditor} headerStyle={headerStyle} body={NameTemplate} filterPlaceholder="Search by first name" />
//                         {/* <Column field="lastname" header="Last Name" editor={textEditor} headerStyle={headerStyle} filterPlaceholder="Search by last name" /> */}
//                         <Column field="email" header="Email" editor={textEditor} headerStyle={headerStyle} filterPlaceholder="Search by email" />
//                         <Column field="mobile" header="Mobile" editor={mobileEditor} headerStyle={headerStyle} filterPlaceholder="Search by mobile" />
//                         <Column field="userRole" header="User Role" editor={roleEditor} headerStyle={headerStyle} filterPlaceholder="Search by user role" />
//                         <Column body={actionBodyTemplate} header="Actions" headerStyle={headerStyleright} bodyStyle={{ textAlign: 'center' }} />
//                     </DataTable>
//                 ) : (
//                     <div className="row">
//                         {filtervalue.map(({ _id, firstname, lastname, userRole, email, mobile, Profile, status }) => (
//                             <div className="col-md-3" key={_id}>
//                                 <div className="grid-item card grid-viewsssss ">
//                                     <div className="d-flex">
//                                         <div className="d-flex">
//                                             <img src={Profile} alt="" width={'70px'} style={{ borderRadius: '50%' }} />
//                                         </div>
//                                         <div>
//                                             <h5>
//                                                 <span> {firstname} </span> <span>{lastname}</span>
//                                             </h5>
//                                             <div>
//                                                 <span>
//                                                     {userRole}
//                                                     <span className="fs-6" style={{ color: status == 1 ? 'green' : 'red' }}>
//                                                         {status == 1 ? ' active' : 'de-active'}
//                                                     </span>
//                                                 </span>
//                                             </div>
//                                             <div className="ms-4">
//                                                 <i className="pi pi-envelope"> {email}</i>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <ul className="list-inline"></ul>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 )
//             ) : (
//                 <h2>No data available</h2>
//             )}
//         </>
//     );
// }
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}