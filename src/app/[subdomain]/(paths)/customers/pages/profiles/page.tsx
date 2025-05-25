// 'use client';
// import React, { useState, useEffect, useContext, useRef } from 'react';
// import { TabView, TabPanel } from 'primereact/tabview';
// import { useFormik } from 'formik';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { Row, Col } from 'react-bootstrap';
// import CustomerFieldsForm from './CustomerFieldsForm.js';
// import { API_BASE_URL } from '../../../../../utils/index.jsx';
// import Swal from 'sweetalert2';
// // import userContext from "@/app/UseContext/UseContext";
// import { Toast } from 'primereact/toast';
// import '../../../../../styles/cutombersedit.scss';
// import userContext from '../../../../../UseContext/UseContext';

// export default function Profiles({ slug, fetchData }: any) {
//     const subdomain = Cookies.get('subdomain');
//     const { singledata } = useContext(userContext);

//     const customerData = singledata;
//     const accessToken = Cookies.get('accessToken');
//     const [activeIndex, setActiveIndex] = useState(0);
//     const toast = useRef(null);

//     const formik = useFormik({
//         initialValues: {
//             Companyname: customerData?.Companyname || '',
//             GSTno: customerData?.GSTno || '',
//             phone: customerData?.phone || '',
//             Website: customerData?.Website || '',
//             email: customerData?.email || '',
//             currency: customerData?.currency || '',
//             address: {
//                 street: customerData?.address?.street || '',
//                 city: customerData?.address?.city || '',
//                 state: customerData?.address?.state || '',
//                 zipcode: customerData?.address?.zipCode || '',
//                 country: customerData?.address?.country || ''
//             },
//             billigAddress: {
//                 street: customerData?.billigAddress?.street || '',
//                 city: customerData?.billigAddress?.city || '',
//                 state: customerData?.billigAddress?.state || '',
//                 zipcode: customerData?.billigAddress?.zipcode || '',
//                 country: customerData?.billigAddress?.country || ''
//             },
//             shippingAddress: {
//                 street: customerData?.shippingAddress?.street || '',
//                 city: customerData?.shippingAddress?.city || '',
//                 state: customerData?.shippingAddress?.state || '',
//                 zipcode: customerData?.shippingAddress?.zipcode || '',
//                 country: customerData?.shippingAddress?.country || ''
//             }
//         },
//         enableReinitialize: true, // Enable reinitialization
//         onSubmit: (values) => {
//             console.log('Formik values on submit:', values);
//             handleSubmit(values);
//         }
//     });

//     const handleAddressChange = (e, addressType) => {
//         const { name, value } = e.target;
//         formik.setFieldValue(`${addressType}.${name}`, value);
//     };

//     const handleSubmit = async (values) => {
//         console.log('Submitting values:', values);
//         const headers = { Authorization: `Bearer ${accessToken}` };

//         try {
//             const response = await axios.patch(`${API_BASE_URL}/customer/${subdomain}/${slug}`, values, { headers });

//             const newCustomerId = response?.data?.data?.newcustomer;
//             console.log('New Customer ID:', newCustomerId);
//             // CustomerIddata.setCustomerId(newCustomerId);

//             // if (newCustomerId) {
//             toast.current.show({
//                 severity: 'success',
//                 summary: 'Success',
//                 detail: 'Your data has been submitted successfully.',
//                 life: 3000
//             });
//             // onContinue();
//             fetchData();
//             // }
//         } catch (error) {
//             console.error('Error submitting form:', error);
//             toast.current.show({
//                 severity: 'error',
//                 summary: 'Error',
//                 detail: 'There was an error submitting your data.',
//                 life: 3000
//             });
//         }
//     };

//     const handleSaveAndContinue = () => {
//         setActiveIndex(2);
//     };

//     const handleContinue = () => {
//         // handleSubmit(formik.values);
//         // onContinue();
//     };

//     const renderAddressFields = (addressType) => (
//         <div className="billing-form3">
//             <Row>
//                 <Col>
//                     <label htmlFor={`${addressType}.street`}>Address:</label> <br />
//                     <InputText type="text" id={`${addressType}.street`} name={`${addressType}.street`} value={formik.values[addressType].street} onChange={(e) => handleAddressChange(e, addressType)} className="w-100 mb-4" />
//                 </Col>
//             </Row>
//             <Row>
//                 <Col>
//                     <label htmlFor={`${addressType}.city`}>City:</label> <br />
//                     <InputText type="text" id={`${addressType}.city`} name={`${addressType}.city`} value={formik.values[addressType].city} onChange={(e) => handleAddressChange(e, addressType)} className="w-100 mb-4" />
//                 </Col>
//             </Row>
//             <Row>
//                 <Col>
//                     <label htmlFor={`${addressType}.state`}>State:</label> <br />
//                     <InputText type="text" id={`${addressType}.state`} name={`${addressType}.state`} value={formik.values[addressType].state} onChange={(e) => handleAddressChange(e, addressType)} className="w-100 mb-4" />
//                 </Col>
//             </Row>
//             <Row>
//                 <Col>
//                     <label htmlFor={`${addressType}.zipcode`}>Zipcode:</label> <br />
//                     <InputText type="text" id={`${addressType}.zipcode`} name={`${addressType}.zipcode`} value={formik.values[addressType].zipcode} onChange={(e) => handleAddressChange(e, addressType)} className="w-100 mb-4" />
//                 </Col>
//             </Row>
//             <Row>
//                 <Col>
//                     <label htmlFor={`${addressType}.country`}>Country:</label> <br />
//                     <InputText type="text" id={`${addressType}.country`} name={`${addressType}.country`} value={formik.values[addressType].country} onChange={(e) => handleAddressChange(e, addressType)} className="w-100 mb-4" />
//                 </Col>
//             </Row>
//         </div>
//     );

//     return (
//         <div className="tp-section">
//             <Toast ref={toast} />
//             <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} scrollable>
//                 <TabPanel header="Customer Details" className="tp-heading">
//                     <form onSubmit={formik.handleSubmit} className="Customer-Details-form">
//                         <Row>
//                             <Col className="">
//                                 <label htmlFor="Companyname">Company</label> <br />
//                                 <InputText type="text" id="Companyname" name="Companyname" value={formik.values.Companyname} onChange={formik.handleChange} className="w-100 mb-4" />
//                             </Col>
//                             <Col className="">
//                                 <label htmlFor="GSTno">GST:</label> <br />
//                                 <InputText type="text" id="GSTno" name="GSTno" value={formik.values.GSTno} onChange={formik.handleChange} className="w-100  mb-4" />
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col className="">
//                                 <label htmlFor="phone">Phone:</label> <br />
//                                 <InputText type="text" id="phone" name="phone" value={formik.values.phone} onChange={formik.handleChange} className="w-100  mb-4" />
//                             </Col>
//                             <Col className="">
//                                 <label htmlFor="email">Email:</label> <br />
//                                 <InputText type="text" id="email" name="email" value={formik.values.email} onChange={formik.handleChange} className="w-100 mb-4" />
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col className="">
//                                 <label htmlFor="currency">Currency:</label> <br />
//                                 <InputText type="text" id="currency" name="currency" value={formik.values.currency} onChange={formik.handleChange} className="w-100 mb-4" />
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col className="">
//                                 <label htmlFor="Website">Website:</label> <br />
//                                 <InputText type="text" id="Website" name="Website" value={formik.values.Website} onChange={formik.handleChange} className="w-100 mb-4" />
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col className="">
//                                 <label htmlFor="address.street">Street:</label> <br />
//                                 <InputText type="text" id="street" name="street" value={formik.values.address.street} onChange={(e) => handleAddressChange(e, 'address')} className="w-100 mb-4" />
//                             </Col>
//                             <Col className="">
//                                 <label htmlFor="address.city">City:</label> <br />
//                                 <InputText type="text" id="city" name="city" value={formik.values.address.city} onChange={(e) => handleAddressChange(e, 'address')} className="w-100 mb-4" />
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col className="">
//                                 <label htmlFor="address.state">State:</label> <br />
//                                 <InputText type="text" id="state" name="state" value={formik.values.address.state} onChange={(e) => handleAddressChange(e, 'address')} className="w-100 mb-4" />
//                             </Col>
//                             <Col className="">
//                                 <label htmlFor="address.zipcode">Zipcode:</label> <br />
//                                 <InputText type="text" id="zipcode" name="zipcode" value={formik.values.address.zipcode} onChange={(e) => handleAddressChange(e, 'address')} className="w-100 mb-4" />
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col className="">
//                                 <label htmlFor="address.country">Country:</label> <br />
//                                 <InputText type="text" id="country" name="country" value={formik.values.address.country} onChange={(e) => handleAddressChange(e, 'address')} className="w-100 mb-4" />
//                             </Col>
//                         </Row>
//                         <Col>
//                             <div className="mt-4">
//                                 <Button type="button" onClick={handleSaveAndContinue} className="btn">
//                                     Save and Continue
//                                 </Button>
//                                 <Button type="submit" className="ms-2 btn1">
//                                     Submit
//                                 </Button>
//                             </div>
//                         </Col>
//                     </form>
//                 </TabPanel>

//                 {/* <TabPanel header="Custome Fields">
//           <CustomerFieldsForm />
//         </TabPanel> */}

//                 <TabPanel header="Billing & Shipping" className="tp-headingt">
//                     <form onSubmit={formik.handleSubmit}>
//                         <Row>
//                             <Col>
//                                 <h6 className="data+">Billing Form</h6>
//                                 {renderAddressFields('billigAddress')}
//                             </Col>
//                             <Col>
//                                 <h6>Shipping Form</h6>
//                                 {renderAddressFields('shippingAddress')}
//                             </Col>
//                         </Row>
//                         <Col>
//                             <div className="mt-4 btn-edit">
//                                 <Button type="button" onClick={handleContinue} className="btn-all">
//                                     Continue Contact
//                                 </Button>
//                             </div>
//                         </Col>
//                     </form>
//                 </TabPanel>
//             </TabView>
//         </div>
//     );
// }
import React from 'react'

export default function Page() {
  return (
    <div>P</div>
  )
}
