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

// const ProposalForm = ({ onSubmit, customers, project, item }) => {
//     const itemOptions = useMemo(() => {
//         return Array.isArray(item) ? item.map((i) => ({ label: i.itemName, value: i._id })) : [];
//     }, [item]);

//     const [selectedItem, setSelectedItem] = useState([]);
//     const [singleData, setSingleData] = useState([]);
//     const toast = useRef(null);
// const [loading , setLoading]=useState(false)
// useEffect(()=>{
//     setLoading(true)
// },[])
//     const initialValues = {
//         subject: '',
//         date: null,
//         openTill: null,
//         customer: '',
//         project: '',
//         address: '',
//         proposalFile: null,
//         tags: [],
//         description: '',
//         items: [],
//         sendEmail: false,
//         discount: 0,
//         subtotal: '',
//         total: ''
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

//         <>
//         {
//             loading && (
//                 <Formik initialValues={initialValues} onSubmit={handleSubmit}>
//                 {({ setFieldValue, values }) => {
//                     const subtotal = calculateSubtotal(singleData);
//                     const totalAfterDiscount = values.discount > 0 ? calculateTotalAfterDiscount(subtotal, values.discount) : subtotal; // If no discount, use subtotal directly.
    
//                     const discountAmount = values.discount > 0 ? (subtotal * (values.discount / 100)).toFixed(2) : '0.00'; // Display discount amount or '0.00'
    
//                     const { gst, cgst, gstRate, cgstRate } = calculateGSTandCGST(totalAfterDiscount);
//                     const finalTotal = totalAfterDiscount + gst + cgst;
    
//                     return (
//                         <Form>
//                             <Toast ref={toast} />
//                             <div>
//                                 <label htmlFor="proposalFile">Proposal File:</label>
//                                 <br />
//                                 <Field className='btn-all mb-3' name="proposalFile">{({ field }) => <FileUpload id="proposalFile" mode="basic" accept="application/pdf" maxFileSize={1000000} onUpload={(e) => setFieldValue('proposalFile', e.files[0])} />}</Field>
//                             </div>
    
//                             <Row>
//                                 <Col>
//                                     {' '}
//                                     <div>
//                                         <label htmlFor="customer">Customer:</label>
//                                         <br />
//                                         <Dropdown options={customers} value={values.customer} onChange={(e) => setFieldValue('customer', e.value)} className="w-100 mb-3" />
//                                     </div>
//                                 </Col>
//                                 <Col>
//                                     {' '}
//                                     <div>
//                                         <label htmlFor="project">Project:</label>
//                                         <br />
//                                         <Dropdown options={project} className="w-100 mb-3" value={values.project} onChange={(e) => setFieldValue('project', e.value)} />
//                                     </div>
//                                 </Col>
//                             </Row>
//                             <Row>
//                                 <Col>
//                                     <div>
//                                         <label htmlFor="subject">Subject:</label>
//                                         <br />
//                                         <InputText id="subject" value={values.subject} onChange={(e) => setFieldValue('subject', e.target.value)} className="w-100 mb-3" />
//                                     </div>
//                                 </Col>
//                                 <Col>
//                                     {' '}
//                                     <div>
//                                         <label htmlFor="date">Date:</label>
//                                         <br />
//                                         <Calendar value={values.date} onChange={(e) => setFieldValue('date', e.value)} className="w-100 mb-3" />
//                                     </div>
//                                 </Col>
//                             </Row>
    
//                             <Row>
//                                 <Col>
//                                     {' '}
//                                     <div>
//                                         <label htmlFor="openTill">Open Till:</label>
//                                         <br />
//                                         <Calendar value={values.openTill} onChange={(e) => setFieldValue('openTill', e.value)} className="w-100 mb-3" />
//                                     </div>
//                                 </Col>
//                                 <Col>
//                                     {' '}
//                                     <div className="propsal-add">
//                                         <label htmlFor="address">Address:</label>
//                                         <br />
//                                         <InputTextarea value={values.address} className="w-100 mb-3" onChange={(e) => setFieldValue('address', e.target.value)} />
//                                     </div>
                                    
//                                 </Col>
//                             </Row>
    
                           
    
//                             <Row>
//                                 <Col>
//                                     {' '}
//                                     <div>
//                                         <label htmlFor="tags">Tags:</label>
//                                         <br />
//                                         <Chips value={values.tags} onChange={(e) => setFieldValue('tags', e.value)} className="w-100 mb-3" />
//                                     </div>
//                                 </Col>
//                             </Row>
//                             <Row>
//                                 <Col>
//                                     {' '}
//                                     <div>
//                                         <label htmlFor="description">Description:</label>
//                                         <br />
//                                         <Editor className="w-100 mb-3" value={values.description} onChange={(e) => setFieldValue('description', e.target.value)} />
//                                     </div>
//                                 </Col>
//                             </Row>
    
//                             <div>
//                                 <label htmlFor="items">Select Items:</label>
//                                 <br />
//                                 <MultiSelect className="w-100 mb-3" value={selectedItem} options={itemOptions} onChange={(e) => setSelectedItem(e.value)} placeholder="Select items" />
//                             </div>

//                             {console.log(singleData,"fetchProposalsfetchProposalsfetchProposalsfetchProposalsfetchProposals")}
//                             {singleData.length > 0 && <Itempage selectedItem={singleData.map((item)=> item._id)} />}
                          
    
//                             <Button type="submit" className="btn-all">
//                                 Submit
//                             </Button>
//                         </Form>
//                     );
//                 }}
//             </Formik>
//             )
//         }
//         </>
       
//     );
// };

// export default ProposalForm;
import React from 'react'

export default function proposalForm() {
  return (
    <div>proposalForm</div>
  )
}
