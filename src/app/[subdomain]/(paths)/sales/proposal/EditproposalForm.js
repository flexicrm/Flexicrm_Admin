// // // "use client";

// // // import { useFormik } from "formik";
// // // import * as Yup from "yup";
// // // import { InputText } from "primereact/inputtext";
// // // import { InputNumber } from "primereact/inputnumber";
// // // import { InputTextarea } from "primereact/inputtextarea";
// // // import { Dropdown } from "primereact/dropdown";
// // // import { Calendar } from "primereact/calendar";
// // // import { Chips } from "primereact/chips";
// // // const formatDate = (invoice) => {
// // //   return new Date(invoice).toLocaleDateString();
// // // };
// // // const EditInvoiceForm = ({ invoice, onSubmit, customers }) => {
// // //   const formik = useFormik({
// // //     initialValues: {
// // //       invoiceNumber: invoice.invoiceNumber || "",
// // //       customerId: invoice.customerId || null,
// // //       dueDate: formatDate(invoice.dueDate) || "",
// // //       issuedDate: formatDate(invoice.issuedDate) || "",
// // //       subtotal: invoice.subtotal || "",
// // //       total: invoice.total || "",
// // //       paymentStatus: invoice.paymentStatus || "unpaid",
// // //       paymentMethod: invoice.paymentMethod || "",
// // //       tags: invoice.tags || "",
// // //       notes: invoice.notes || "",
// // //     },
// // //     validationSchema: Yup.object({
// // //       invoiceNumber: Yup.string().required("Invoice number is required"),
// // //       customerId: Yup.string().required("Customer is required"),
// // //       issuedDate: Yup.date().required("Issued date is required"),
// // //       dueDate: Yup.date().required("Due date is required"),
// // //       subtotal: Yup.number().required("Subtotal is required"),
// // //       total: Yup.number().required("Total is required"),
// // //     }),
// // //     onSubmit,
// // //   });
// // // console.log(formik)
// // //   return (
// // //     <form onSubmit={formik.handleSubmit}>
// // //       <div>
// // //         <label>Invoice Number</label> <br />
// // //         <InputText
// // //           name="invoiceNumber"
// // //           onChange={formik.handleChange}
// // //           onBlur={formik.handleBlur}
// // //           value={formik.values.invoiceNumber}
// // //         />
// // //         {formik.touched.invoiceNumber && formik.errors.invoiceNumber && (
// // //           <div>{formik.errors.invoiceNumber}</div>
// // //         )}
// // //       </div>
// // //       {/* 
// // //       <div>
// // //         <label>Customer</label>
// // //         <Dropdown
// // //           name="customerId"
// // //           options={customers}
// // //           onChange={(e) => formik.setFieldValue("customerId", e.value)}
// // //           value={formik.values.customerId}
// // //           placeholder="Select a Customer"
// // //         />
// // //         {formik.touched.customerId && formik.errors.customerId && (
// // //           <div>{formik.errors.customerId}</div>
// // //         )}
// // //       </div> */}

// // //       <div>
// // //         <label>Issued Date</label><br />
// // //         <Calendar
// // //           type="date"
// // //           name="issuedDate"
// // //           onChange={formik.handleChange}
// // //           onBlur={formik.handleBlur}
// // //           value={formik.values.issuedDate}
// // //           showIcon
// // //         />
// // //       </div>

// // //       <div>
// // //         <label>Due Date</label><br />
// // //         <Calendar
// // //           type="date"
// // //           name="dueDate"
// // //           onChange={formik.handleChange}
// // //           onBlur={formik.handleBlur}
// // //           value={formik.values.dueDate}
// // //           showIcon
// // //         />
// // //       </div>

// // //       <div>
// // //         <label>Subtotal</label><br />
// // //         <InputNumber
// // //           name="subtotal"
// // //           onValueChange={(e) => formik.setFieldValue("subtotal", e.value)}
// // //           value={formik.values.subtotal}
// // //         />
// // //       </div>

// // //       <div>
// // //         <label>Total</label><br />
// // //         <InputNumber
// // //           name="total"
// // //           onValueChange={(e) => formik.setFieldValue("total", e.value)}
// // //           value={formik.values.total}
// // //         />
// // //       </div>

// // //       <div>
// // //         <label>Payment Status</label><br />
// // //         <select
// // //           name="paymentStatus"
// // //           onChange={formik.handleChange}
// // //           value={formik.values.paymentStatus}
// // //         >
// // //           <option value="unpaid">Unpaid</option>
// // //           <option value="paid">Paid</option>
// // //           <option value="partial">Partial</option>
// // //         </select>
// // //       </div>

// // //       <div>
// // //         <label>Payment Method</label><br />
// // //         <InputText
// // //           name="paymentMethod"
// // //           onChange={formik.handleChange}
// // //           value={formik.values.paymentMethod}
// // //         />
// // //       </div>

// // //       <div>
// // //         <label>Tags </label><br />
// // //         <Chips
// // //           name="tags"
// // //           onChange={formik.handleChange}
// // //           value={formik.values.tags}
// // //         />
// // //       </div>

// // //       <div>
// // //         <label>Notes</label><br />
// // //         <InputTextarea
// // //           name="notes"
// // //           onChange={formik.handleChange}
// // //           value={formik.values.notes}
// // //         />
// // //       </div>

// // //       <button type="submit">Submit</button>
// // //     </form>
// // //   );
// // // };

// // // export default EditInvoiceForm;
// // "use client";

// // import { useFormik } from "formik";
// // import * as Yup from "yup";
// // import { InputText } from "primereact/inputtext";
// // import { InputNumber } from "primereact/inputnumber";
// // import { InputTextarea } from "primereact/inputtextarea";
// // import { Dropdown } from "primereact/dropdown";
// // import { Calendar } from "primereact/calendar";
// // import { Chips } from "primereact/chips";
// // import { Button } from "primereact/button";

// // const  EditProposalForm = ({ invoice, onSubmit, customers }) => {
// //   const formatDate = (date) => {
// //     return new Date(date);
// //   };

// //   const formik = useFormik({
// //     initialValues: {
// //       invoiceNumber: invoice?.invoiceNumber || "",
// //       customerId: invoice?.customerId || null,
// //       dueDate: invoice?.dueDate ? formatDate(invoice.dueDate) : null,
// //       issuedDate: invoice?.issuedDate ? formatDate(invoice.issuedDate) : null,
// //       subtotal: invoice?.subtotal || "",
// //       total: invoice?.total || "",
// //       paymentStatus: invoice?.paymentStatus || "unpaid",
// //       paymentMethod: invoice?.paymentMethod || "",
// //       tags: invoice?.tags || [],
// //       notes: invoice?.notes || "",
// //     },
// //     validationSchema: Yup.object({
// //       invoiceNumber: Yup.string().required("Invoice number is required"),
  
// //       issuedDate: Yup.date().required("Issued date is required"),
// //       dueDate: Yup.date().required("Due date is required"),
// //       subtotal: Yup.number().required("Subtotal is required"),
// //       total: Yup.number().required("Total is required"),
// //     }),
// //     onSubmit,
// //   });

// //   return (
// //     <form onSubmit={formik.handleSubmit}>
// //       <div>
// //         <label>Invoice Number</label> <br />
// //         <InputText
// //           name="invoiceNumber"
// //           onChange={formik.handleChange}
// //           onBlur={formik.handleBlur}
// //           value={formik.values.invoiceNumber}
// //         />
// //         {formik.touched.invoiceNumber && formik.errors.invoiceNumber && (
// //           <div>{formik.errors.invoiceNumber}</div>
// //         )}
// //       </div>

// //       <div>
// //         <label>Issued Date</label><br />
// //         <Calendar
// //           name="issuedDate"
// //           onChange={(e) => formik.setFieldValue("issuedDate", e.value)}
// //           onBlur={formik.handleBlur}
// //           value={formik.values.issuedDate}
// //           showIcon
// //         />
// //         {formik.touched.issuedDate && formik.errors.issuedDate && (
// //           <div>{formik.errors.issuedDate}</div>
// //         )}
// //       </div>

// //       <div>
// //         <label>Due Date</label><br />
// //         <Calendar
// //           name="dueDate"
// //           onChange={(e) => formik.setFieldValue("dueDate", e.value)}
// //           onBlur={formik.handleBlur}
// //           value={formik.values.dueDate}
// //           showIcon
// //         />
// //         {formik.touched.dueDate && formik.errors.dueDate && (
// //           <div>{formik.errors.dueDate}</div>
// //         )}
// //       </div>

// //       <div>
// //         <label>Subtotal</label><br />
// //         <InputNumber
// //           name="subtotal"
// //           onValueChange={(e) => formik.setFieldValue("subtotal", e.value)}
// //           value={formik.values.subtotal}
// //         />
// //       </div>

// //       <div>
// //         <label>Total</label><br />
// //         <InputNumber
// //           name="total"
// //           onValueChange={(e) => formik.setFieldValue("total", e.value)}
// //           value={formik.values.total}
// //         />
// //       </div>

// //       <div>
// //         <label>Payment Status</label><br />
// //         <select
// //           name="paymentStatus"
// //           onChange={formik.handleChange}
// //           value={formik.values.paymentStatus}
// //         >
// //           <option value="unpaid">Unpaid</option>
// //           <option value="paid">Paid</option>
// //           <option value="partial">Partial</option>
// //         </select>
// //       </div>

// //       <div>
// //         <label>Payment Method</label><br />
// //         <InputText
// //           name="paymentMethod"
// //           onChange={formik.handleChange}
// //           value={formik.values.paymentMethod}
// //         />
// //       </div>

// //       <div>
// //         <label>Tags</label><br />
// //         <Chips
// //           name="tags"
// //           onChange={(e) => formik.setFieldValue("tags", e.value)}
// //           value={formik.values.tags}
// //         />
// //       </div>

// //       <div>
// //         <label>Notes</label><br />
// //         <InputTextarea
// //           name="notes"
// //           onChange={formik.handleChange}
// //           value={formik.values.notes}
// //         />
// //       </div>

// //       <Button type="submit">Submit</Button>
// //     </form>
// //   );
// // };

// // export default EditProposalForm;
// 'use client';
// import React, { useEffect, useRef, useState, useMemo } from 'react';
// import { Formik, Form, Field, FieldArray } from 'formik';
// import { InputText } from 'primereact/inputtext';
// import { Dropdown } from 'primereact/dropdown';
// import { InputNumber } from 'primereact/inputnumber';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { FileUpload } from 'primereact/fileupload';
// import { Chips } from 'primereact/chips';
// import { Button } from 'primereact/button';
// import { Calendar } from 'primereact/calendar';
// import { MultiSelect } from 'primereact/multiselect';
// import { Toast } from 'primereact/toast';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { API_BASE_URL } from '../../../../utils';
// import { Editor } from 'primereact/editor';
// import { Col, Row } from 'react-bootstrap';
// import Itempage from '../../customers/pages/estimate/itempage';
// // import { API_BASE_URL } from "@/app/utils";

// const ProposalForm = ({ onSubmit, customers, project, item ,proposal}) => {
//   const data =   proposal.proposal
//   console.log(data,"proposal")
  
  
//     const itemOptions = useMemo(() => {
//         return Array.isArray(item) ? item.map((i) => ({ label: i.itemName, value: i._id })) : [];
//     }, [item]);

//     const [selectedItem, setSelectedItem] = useState([]);
//     const [singleData, setSingleData] = useState([]);
//     const toast = useRef(null);

//     const initialValues = {
//         subject: data?.subject,
//         date: data?.date,
//         openTill: data?.openTill,
//         customer: data?.customer,
//         project: data?.project,
//         address: data.address,
//         proposalFile: data?.proposalFile,
//         tags: data?.tags,
//         description: data?.description,
//         items: data?.items,
//         sendEmail: data?.sendEmail,
//         discount: data?.discount,
//         subtotal: data?.subject,
//         total: data?.total
//     };

//     const fetchItems = async () => {
//         const subdomain = Cookies.get('subdomain');
//         const accessToken = Cookies.get('accessToken');
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/item/${subdomain}/items?itemIds=${selectedItem.join(',')}`, { headers });
//             setSingleData(response.data.data.items || []);
//         } catch (error) {
//             console.error('Error fetching items:', error);
//             toast.current.show({
//                 severity: 'error',
//                 summary: 'Error',
//                 detail: 'Could not fetch item details.'
//             });
//         }
//     };

//     useEffect(() => {
//         if (selectedItem.length > 0) {
//             fetchItems();
//         } else {
//             setSingleData([]);
//         }
//     }, [selectedItem]);

//     const calculateSubtotal = (items) => {
//         return items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
//     };

//     const calculateTotalAfterDiscount = (subtotal, discount) => {
//         return subtotal - subtotal * (discount / 100);
//     };

//     const calculateGSTandCGST = (total) => {
//         const gstRate = 5;
//         const cgstRate = 5;
//         const gst = total * (gstRate / 100);
//         const cgst = total * (cgstRate / 100);
//         return { gst, cgst, gstRate, cgstRate };
//     };

//     const handleSubmit = (values) => {
//         const { discount, date, openTill } = values;
//         const subtotal = calculateSubtotal(singleData);
//         const totalAfterDiscount = discount > 0 ? calculateTotalAfterDiscount(subtotal, discount) : subtotal; // If no discount, use subtotal directly.

//         const { gst, cgst } = calculateGSTandCGST(totalAfterDiscount);
//         const finalTotal = totalAfterDiscount + gst + cgst;

//         const submissionData = {
//             ...values,
//             items: singleData.map((item) => item._id),
//             discount,
//             subtotal: subtotal.toString(),
//             total: finalTotal.toString(),
//             date: date ? new Date(date).toISOString() : null,
//             openTill: openTill ? new Date(openTill).toISOString() : null
//         };

//         // console.log("Form Values Submitted:", submissionData);
//         onSubmit(submissionData);
//     };

//     return (
//         <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//             {({ setFieldValue, values }) => {
//                 const subtotal = calculateSubtotal(singleData);
//                 const totalAfterDiscount = values.discount > 0 ? calculateTotalAfterDiscount(subtotal, values.discount) : subtotal; // If no discount, use subtotal directly.

//                 const discountAmount = values.discount > 0 ? (subtotal * (values.discount / 100)).toFixed(2) : '0.00'; // Display discount amount or '0.00'

//                 const { gst, cgst, gstRate, cgstRate } = calculateGSTandCGST(totalAfterDiscount);
//                 const finalTotal = totalAfterDiscount + gst + cgst;

//                 return (
//                     <Form>
//                         <Toast ref={toast} />
//                         <div>
//                             <label htmlFor="proposalFile">Proposal File:</label>
//                             <br />
//                             <Field className='btn-all mb-3' name="proposalFile">{({ field }) => <FileUpload id="proposalFile" mode="basic" accept="application/pdf" maxFileSize={1000000} onUpload={(e) => setFieldValue('proposalFile', e.files[0])} />}</Field>
//                         </div>

//                         <Row>
//                             <Col>
//                                 {' '}
//                                 <div>
//                                     <label htmlFor="customer">Customer:</label>
//                                     <br />
//                                     <Dropdown options={customers} value={values.customer} onChange={(e) => setFieldValue('customer', e.value)} className="w-100 mb-3" />
//                                 </div>
//                             </Col>
//                             <Col>
//                                 {' '}
//                                 <div>
//                                     <label htmlFor="project">Project:</label>
//                                     <br />
//                                     <Dropdown options={project} className="w-100 mb-3" value={values.project} onChange={(e) => setFieldValue('project', e.value)} />
//                                 </div>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col>
//                                 <div>
//                                     <label htmlFor="subject">Subject:</label>
//                                     <br />
//                                     <InputText id="subject" value={values.subject} onChange={(e) => setFieldValue('subject', e.target.value)} className="w-100 mb-3" />
//                                 </div>
//                             </Col>
//                             <Col>
//                                 {' '}
//                                 <div>
//                                     <label htmlFor="date">Date:</label>
//                                     <br />
//                                     <Calendar value={values.date} onChange={(e) => setFieldValue('date', e.value)} className="w-100 mb-3" />
//                                 </div>
//                             </Col>
//                         </Row>

//                         <Row>
//                             <Col>
//                                 {' '}
//                                 <div>
//                                     <label htmlFor="openTill">Open Till:</label>
//                                     <br />
//                                     <Calendar value={values.openTill} onChange={(e) => setFieldValue('openTill', e.value)} className="w-100 mb-3" />
//                                 </div>
//                             </Col>
//                             <Col>
//                                 {' '}
//                                 <div className='propsal-add'>
//                                     <label htmlFor="address">Address:</label>
//                                     <br />
//                                     <InputTextarea value={values.address} className="w-100 mb-3" onChange={(e) => setFieldValue('address', e.target.value)} />
//                                 </div>
                                
//                             </Col>
//                         </Row>

                       

//                         <Row>
//                             <Col>
//                                 {' '}
//                                 <div>
//                                     <label htmlFor="tags">Tags:</label>
//                                     <br />
//                                     <Chips value={values.tags} onChange={(e) => setFieldValue('tags', e.value)} className="w-100 mb-3" />
//                                 </div>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col>
//                                 {' '}
//                                 <div>
//                                     <label htmlFor="description">Description:</label>
//                                     <br />
//                                     <Editor className="w-100 mb-3" value={values.description} onChange={(e) => setFieldValue('description', e.target.value)} />
//                                 </div>
//                             </Col>
//                         </Row>

//                         <div>
//                             <label htmlFor="items">Select Items:</label>
//                             <br />
//                             <MultiSelect className="w-100 mb-3" value={selectedItem} options={itemOptions} onChange={(e) => setSelectedItem(e.value)} placeholder="Select items" />
//                         </div>
//                         {singleData.length > 0 && <Itempage selectedItem={singleData} />}
                      

//                         <Button type="submit" className="btn-all">
//                             Submit
//                         </Button>
//                     </Form>
//                 );
//             }}
//         </Formik>
//     );
// };

// export default ProposalForm;
import React from 'react'

export default function EditproposalForm() {
  return (
    <div>EditproposalForm</div>
  )
}
