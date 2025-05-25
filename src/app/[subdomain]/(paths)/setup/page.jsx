// 'use client';
// // import { API_BASE_URL } from "@/app/utils";
// import axios from 'axios';
// import { InputText } from 'primereact/inputtext';
// import React, { useState } from 'react';
// import { Card, Col, Row } from 'react-bootstrap';
// import AlldataUsers from './setUp';
// import { Checkbox } from 'primereact/checkbox';
// import { Button } from 'primereact/button';
// import { API_BASE_URL } from '../../../utils';
// import  Cookies  from "js-cookie"
// const userRoles = ['Marketing Manager', 'Employee', 'Manager'];

// export default function Customers() {
//     const [show, setShow] = useState(false);
//     const [firstname, setFirstname] = useState('');
//     const [lastname, setLastname] = useState('');
//     const [mobile, setMobile] = useState('');
//     const [email, setEmail] = useState('');
//     const [userRole, setUserRole] = useState(userRoles[0]);
//     const [password, setPassword] = useState('');
//     const [address, setAddress] = useState({
//         street: '',
//         city: '',
//         state: '',
//         zipCode: '',
//         country: ''
//     });
//     const [salaryPerMonth, setSalaryPerMonth] = useState('');
//     const [permissions, setPermissions] = useState({
//         Sales: {
//             canCreate: false,
//             canRead: false,
//             canUpdate: false,
//             canDelete: false
//         },
//         User: {
//             canCreate: false,
//             canRead: false,
//             canUpdate: false,
//             canDelete: false
//         },
//         Leads: {
//             canCreate: false,
//             canRead: false,
//             canUpdate: false,
//             canDelete: false
//         },
//         Order: {
//             canCreate: false,
//             canRead: false,
//             canUpdate: false,
//             canDelete: false
//         },
//         Report: {
//             canCreate: false,
//             canRead: false,
//             canUpdate: false,
//             canDelete: false
//         },
//         Customer: {
//             canCreate: false,
//             canRead: false,
//             canUpdate: false,
//             canDelete: false
//         },
//         Subscriptions: { canRead: false, canUpdate: false, canDelete: false },
//         Expenses: {
//             canCreate: false,
//             canRead: false,
//             canUpdate: false,
//             canDelete: false
//         },
//         Task: {
//             canCreate: false,
//             canRead: false,
//             canUpdate: false,
//             canDelete: false
//         },
//         Setup: {
//             canCreate: false,
//             canRead: false,
//             canUpdate: false,
//             canDelete: false
//         },
//         Utilities: {
//             canCreate: false,
//             canRead: false,
//             canUpdate: false,
//             canDelete: false
//         }
//     });

//     const accessToken = Cookies.get('accessToken');

//     const handleShow = () => {
//         setShow(!show);
//     };

//     const handleSubmit = () => {
//         const headers = {
//             Authorization: `Bearer ${accessToken}`
//         };

//         // Prepare filtered permissions for submission
//         const filteredPermissions = {};
//         Object.entries(permissions).forEach(([section, permissionData]) => {
//             const activePermissions = {};
//             Object.entries(permissionData).forEach(([permission, value]) => {
//                 if (value) {
//                     activePermissions[permission] = true; // Only include true values
//                 }
//             });
//             if (Object.keys(activePermissions).length > 0) {
//                 filteredPermissions[section] = activePermissions;
//             }
//         });

//         const userData = {
//             firstname,
//             lastname,
//             mobile,
//             email,
//             userRole,
//             password,
//             address,
//             salaryPerMonth,
//             permissions: filteredPermissions
//         };

//         // console.log("User Data being sent:", userData); // Log user data for debugging

//         axios
//             .post(`${API_BASE_URL}/user`, userData, { headers })
//             .then((response) => {
//                 // console.log("User added:", response.data);
//                 handleShow(); // Hide form after submission
//                 resetForm();
//             })
//             .catch((error) => {
//                 // console.error("Error adding user:", error);
//             });
//     };

//     const resetForm = () => {
//         setFirstname('');
//         setLastname('');
//         setMobile('');
//         setEmail('');
//         setUserRole(userRoles[0]);
//         setPassword('');
//         setAddress({
//             street: '',
//             city: '',
//             state: '',
//             zipCode: '',
//             country: ''
//         });
//         setSalaryPerMonth('');
//         setPermissions({
//             Sales: {
//                 canCreate: false,
//                 canRead: false,
//                 canUpdate: false,
//                 canDelete: false
//             },
//             User: {
//                 canCreate: false,
//                 canRead: false,
//                 canUpdate: false,
//                 canDelete: false
//             },
//             Leads: {
//                 canCreate: false,
//                 canRead: false,
//                 canUpdate: false,
//                 canDelete: false
//             },
//             Order: {
//                 canCreate: false,
//                 canRead: false,
//                 canUpdate: false,
//                 canDelete: false
//             },
//             Report: {
//                 canCreate: false,
//                 canRead: false,
//                 canUpdate: false,
//                 canDelete: false
//             },
//             Customer: {
//                 canCreate: false,
//                 canRead: false,
//                 canUpdate: false,
//                 canDelete: false
//             },
//             Subscriptions: { canRead: false, canUpdate: false, canDelete: false },
//             Expenses: {
//                 canCreate: false,
//                 canRead: false,
//                 canUpdate: false,
//                 canDelete: false
//             },
//             Task: {
//                 canCreate: false,
//                 canRead: false,
//                 canUpdate: false,
//                 canDelete: false
//             },
//             Setup: {
//                 canCreate: false,
//                 canRead: false,
//                 canUpdate: false,
//                 canDelete: false
//             },
//             Utilities: {
//                 canCreate: false,
//                 canRead: false,
//                 canUpdate: false,
//                 canDelete: false
//             }
//         });
//     };
//     // console.log(permissions);
//     return (
//         <div>
//             <div className="text-end">
//                 <Button onClick={handleShow}>Add Customers</Button>
//             </div>

//             {show && (
//                 <Card style={{ width: '100%' }}>
//                     <Row className="p-5">
//                         <span className="d-flex">
//                             <h5>Basic Details *</h5>
//                             <i className="pi pi-times ms-auto" style={{ fontSize: '1.5rem' }} onClick={handleShow}></i>
//                         </span>
//                         <Col md={3}>
//                             <div>
//                                 <label>First Name</label>
//                                 <InputText value={firstname} onChange={(e) => setFirstname(e.target.value)} />
//                             </div>
//                         </Col>
//                         <Col md={3}>
//                             <div>
//                                 <label>Last Name</label>
//                                 <InputText value={lastname} onChange={(e) => setLastname(e.target.value)} />
//                             </div>
//                         </Col>
//                         <Col md={3}>
//                             <div>
//                                 <label>Mobile</label>
//                                 <InputText value={mobile} onChange={(e) => setMobile(e.target.value)} />
//                             </div>
//                         </Col>
//                         <Col md={3}>
//                             <div>
//                                 <label>Email</label>
//                                 <InputText value={email} onChange={(e) => setEmail(e.target.value)} />
//                             </div>
//                         </Col>
//                         <Col md={3}>
//                             <div>
//                                 <label>User Role</label>
//                                 <select className="p-inputtext p-component w-100" value={userRole} onChange={(e) => setUserRole(e.target.value)}>
//                                     {userRoles.map((role) => (
//                                         <option key={role} value={role}>
//                                             {role}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                         </Col>
//                         <Col md={3}>
//                             <div>
//                                 <label>Password</label>
//                                 <InputText type="password" value={password} onChange={(e) => setPassword(e.target.value)} toggleMask />
//                             </div>
//                         </Col>
//                         <Col md={3}>
//                             <div>
//                                 <label>Street</label>
//                                 <InputText value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
//                             </div>
//                         </Col>
//                         <Col md={3}>
//                             <div>
//                                 <label>City</label>
//                                 <InputText value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
//                             </div>
//                         </Col>
//                         <Col md={3}>
//                             <div>
//                                 <label>State</label>
//                                 <InputText value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
//                             </div>
//                         </Col>
//                         <Col md={3}>
//                             <div>
//                                 <label>Zip Code</label>
//                                 <InputText value={address.zipCode} onChange={(e) => setAddress({ ...address, zipCode: e.target.value })} />
//                             </div>
//                         </Col>
//                         <Col md={3}>
//                             <div>
//                                 <label>Country</label>
//                                 <InputText value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} />
//                             </div>
//                         </Col>
//                         <Col md={3}>
//                             <div>
//                                 <label>Salary Per Month</label>
//                                 <InputText value={salaryPerMonth} onChange={(e) => setSalaryPerMonth(e.target.value)} />
//                             </div>
//                         </Col>
//                     </Row>
//                     <Row>
//                         <Row className="p-5">
//                             <h5>Permissions *</h5>
//                             {Object.entries(permissions).map(([section, permissionData]) => (
//                                 <Col md={3} key={permissionData}>
//                                     <div key={section}>
//                                         <strong className="m-2">{section}</strong>
//                                         {/* <Card style={{ overflow: "auto", height: "90px" }}> */}
//                                         {Object.entries(permissionData).map(([permission]) => (
//                                             <div key={permission}>
//                                                 <Checkbox
//                                                     className="mt-2"
//                                                     inputId={`${section}_${permission}`}
//                                                     checked={permissions[section][permission]}
//                                                     onChange={(e) => {
//                                                         setPermissions((prevPermissions) => ({
//                                                             ...prevPermissions,
//                                                             [section]: {
//                                                                 ...prevPermissions[section],
//                                                                 [permission]: e.checked
//                                                             }
//                                                         }));
//                                                     }}
//                                                 />
//                                                 <label htmlFor={`${section}_${permission}`} className="ms-2">
//                                                     {permission.charAt(0).toUpperCase() + permission.slice(1)}
//                                                 </label>
//                                             </div>
//                                         ))}
//                                         {/* </Card> */}
//                                     </div>
//                                 </Col>
//                             ))}
//                         </Row>

//                         <Col className="mt-4 text-center">
//                             <Button onClick={handleSubmit}>Submit</Button>
//                         </Col>
//                     </Row>
//                 </Card>
//             )}

//             <AlldataUsers />
//         </div>
//     );
// }
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}
