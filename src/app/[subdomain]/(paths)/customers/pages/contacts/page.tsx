// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { API_BASE_URL } from "../../../../../utils";
// import Cookies from "js-cookie";
// import { Col, Row } from "react-bootstrap";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import Swal from "sweetalert2";
// import Contactsdetails from "./Contactsdetails"
// import { InputText } from "primereact/inputtext";
// import { InputSwitch } from "primereact/inputswitch";
// import { Toast } from "primereact/toast";
// import { Dialog } from "primereact/dialog";
// import { Button } from "primereact/button";
// import { useParams } from "next/navigation";

// const validationSchema = Yup.object().shape({
//   firstName: Yup.string().required("First name is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   mobileNo: Yup.string().required("Mobile number is required"),
//   position: Yup.string().required("Position is required"),
// });

// export default function Popups(slug) {

//   console.log(slug,"slug")
//   const subdomain = Cookies.get("subdomain");
//   const accessToken = Cookies.get("accessToken");
//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [visible, setVisible] = useState(false); // Sidebar visibility state
//   const toast = React.useRef(null);

//   const fetchCustomers = async () => {
//     const headers = { Authorization: `Bearer ${accessToken}` };
//     try {
//       const res = await axios.get(`${API_BASE_URL}/customer/${subdomain}`, {
//         headers,
//       });
//       const fetchedCustomers = res?.data?.data?.customers || [];
//       setCustomers(fetchedCustomers);
//       if (fetchedCustomers.length > 0) {
//         setSelectedCustomer(fetchedCustomers[0]);
//       }
//     } catch (error) {
//       console.error("Error fetching customer data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCustomers();
//   }, [accessToken, subdomain]);

//   const handleSubmit = async (values, { resetForm }) => {
//     const headers = { Authorization: `Bearer ${accessToken}` };

//     try {
//       await axios.post(`${API_BASE_URL}/contact/${subdomain}`, values, {
//         headers,
//       });
//       toast.current.show({
//         severity: "success",
//         summary: "Success!",
//         detail: "Your data has been submitted successfully.",
//       });
//       resetForm();
//       fetchCustomers();
//       setVisible()
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       toast.current.show({
//         severity: "error",
//         summary: "Error!",
//         detail: "There was an error submitting your data.",
//       });
//     }
//   };

//   return (
//     <div className="p-4">
//       <Toast ref={toast} />
//       <div>
//         <Button
//           label="New Contact"
//           className="mb-3"
//           onClick={() => setVisible(true)}
//         />
//       </div>

//       <Dialog
//         header="Customer Popup Form"
//         visible={visible}
//         style={{ width: "50vw" }}
//         position="right"
//         onHide={() => setVisible(false)}
//         breakpoints={{ "960px": "75vw", "640px": "100vw" }} // Responsive widths
//       >
//         <Formik
//           initialValues={{
//             position: "",
//             email: "",
//             mobileNo: "",
//             firstName: "",
//             lastName: "",
//             companyId: selectedCustomer ? selectedCustomer._id : "",
//             description: "",
//             primaryContact: false,
//             notifications: {
//               email: {
//                 invoice: false,
//                 estimate: false,
//                 project: false,
//                 contract: false,
//               },
//             },
//           }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ setFieldValue }) => (
//             <Form>
//               <Row>
//                 <Col>
//                   <label htmlFor="companyId">Customer</label>
//                   <br />
//                   <Field name="companyId">
//                     {({ field }) => (
//                       <select
//                         {...field}
//                         onChange={(e) => {
//                           const customer = customers.find(
//                             (c) => c._id === e.target.value
//                           );
//                           setSelectedCustomer(customer);
//                           setFieldValue("companyId", customer?._id);
//                         }}
//                       >
//                         <option value="" label="Select a customer" />
//                         {customers.map((customer) => (
//                           <option key={customer._id} value={customer._id}>
//                             {customer.Companyname || "Unnamed"}
//                           </option>
//                         ))}
//                       </select>
//                     )}
//                   </Field>
//                 </Col>
//               </Row>
//               <Row className="mt-4">
//                 <Col md={6}>
//                   <label htmlFor="firstName">First Name:</label>
//                   <br />
//                   <Field name="firstName">
//                     {({ field, meta }) => (
//                       <InputText
//                         {...field}
//                         required
//                         className={meta.touched && meta.error ? "p-invalid" : ""}
//                       />
//                     )}
//                   </Field>
//                 </Col>
//                 <Col>
//                   <label htmlFor="lastName">Last Name:</label>
//                   <br />
//                   <Field name="lastName">
//                     {({ field }) => <InputText {...field} />}
//                   </Field>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>
//                   <label htmlFor="email">Email:</label>
//                   <br />
//                   <Field name="email">
//                     {({ field, meta }) => (
//                       <InputText
//                         type="email"
//                         {...field}
//                         required
//                         className={meta.touched && meta.error ? "p-invalid" : ""}
//                       />
//                     )}
//                   </Field>
//                 </Col>
//                 <Col>
//                   <label htmlFor="mobileNo">Mobile No:</label>
//                   <br />
//                   <Field name="mobileNo">
//                     {({ field, meta }) => (
//                       <InputText
//                         {...field}
//                         required
//                         className={meta.touched && meta.error ? "p-invalid" : ""}
//                       />
//                     )}
//                   </Field>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>
//                   <label htmlFor="position">Position:</label>
//                   <br />
//                   <Field name="position">
//                     {({ field, meta }) => (
//                       <InputText
//                         {...field}
//                         required
//                         className={meta.touched && meta.error ? "p-invalid" : ""}
//                       />
//                     )}
//                   </Field>
//                 </Col>
//                 <Col>
//                   <label htmlFor="description">Description:</label>
//                   <br />
//                   <Field name="description">
//                     {({ field }) => <InputText {...field} />}
//                   </Field>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>
//                   <Field name="primaryContact">
//                     {({ field }) => (
//                       <InputSwitch inputId="primaryContact" {...field} />
//                     )}
//                   </Field>
//                   <label htmlFor="primaryContact">Primary Contact</label>
//                   <br />
//                 </Col>
//                 <Col>
//                   <label>Notifications:</label>
//                   <div>
//                     {["invoice", "estimate", "project", "contract"].map(
//                       (type) => (
//                         <div
//                           key={type}
//                           className="d-flex mt-2 align-items-center"
//                         >
//                           <label>
//                             {type.charAt(0).toUpperCase() + type.slice(1)}:
//                           </label>
//                           <Field name={`notifications.email.${type}`}>
//                             {({ field }) => (
//                               <InputSwitch
//                                 inputId={type}
//                                 checked={field.value}
//                                 onChange={() =>
//                                   setFieldValue(
//                                     `notifications.email.${type}`,
//                                     !field.value
//                                   )
//                                 }
//                               />
//                             )}
//                           </Field>
//                         </div>
//                       )
//                     )}
//                   </div>
//                 </Col>
//               </Row>
//               <Col>
//                 <div className="mt-4 text-center">
//                   <Button type="submit">Submit</Button>
//                 </div>
//               </Col>
//             </Form>
//           )}
//         </Formik>
//       </Dialog>

//       <Contactsdetails slug={slug}/>
//     </div>
//   );
// }
// import React from 'react';
// import Contactsdetails from './Contactsdetails';

// export default function page({ fetchData, slug }: { fetchData: () => void; slug: string }) {
//     // console.log(contactdata,"contactdata")
//     return (
//         <div>
//             <Contactsdetails slug={slug} fetchDatas={fetchData} />
//         </div>
//     );
// }

import React from 'react';
import ContactsDetails from './Contactsdetails';

// interface PageProps {
//     fetchData: () => void;

// }

const Page: React.FC<any> = ({ fetchData }) => {

    
    return (
        <div>
            <ContactsDetails fetchDatas={fetchData} />
        </div>
    );
};

export default Page;
