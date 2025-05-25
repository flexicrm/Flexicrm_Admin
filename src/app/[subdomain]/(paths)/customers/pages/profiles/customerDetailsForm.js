// import React from 'react';
// import { InputText } from 'primereact/inputtext';
// import { useFormik } from 'formik';
// import { Col, Row } from 'react-bootstrap';
// import { Button } from 'primereact/button';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import { API_BASE_URL } from '../../../../../utils';
// // import { API_BASE_URL } from '@/app/utils';

// const CompanyDetailsForm = () => {
//   const subdomain = Cookies.get("subdomain")
//   const accessToken = Cookies.get("accessToken");

//   const formik = useFormik({
//     initialValues: {
//       Companyname: "",
//       GSTno: "",
//       phone: "",
//       Website: "",
//       email: "",
//       catgory: "",
//       currency: "",
//       Adress: {
//         street: "",
//         city: "",
//         state: "",
//         zipcode: "",
//         country: ""
//       }
//     },
//     onSubmit: (values) => {
//       handleSubmit(values)
//       // console.log(values);
//     }
//   });
//   // console.log("formik:", formik)
//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     formik.setFieldValue(`Adress.${name}`, value);
//   };

//   const handleSubmit = async (values) => {
//     // console.log('Submitting values:', values);
//     const headers = { Authorization: `Bearer ${accessToken}` };
//     try {
//       const response = await axios.post(`${API_BASE_URL}/customer/${subdomain}`, values,{headers});
//       // console.log('Response:', response.data);
//       // You can also reset the form or show a success message here
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('There was an error submitting the form. Please try again.');
//     }
//   };
  

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <Row>
//         <Col>
//           <label htmlFor='Companyname'>Company:</label> <br />
//           <InputText type="text" id='Companyname' name="Companyname" value={formik.values.Companyname} onChange={formik.handleChange} className='w-100 mb-3' />
//         </Col>
//         <Col>
//           <label htmlFor='GSTno'>GST:</label><br />
//           <InputText type="text" id='GSTno' name="GSTno" value={formik.values.GSTno} onChange={formik.handleChange} />
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <label htmlFor='phone'>Phone:</label><br />
//           <InputText type="text" id='phone' name="phone" value={formik.values.phone} onChange={formik.handleChange} />
//         </Col>
//         <Col>
//           <label htmlFor='email'>Email:</label><br />
//           <InputText type="text" id='email' name="email" value={formik.values.email} onChange={formik.handleChange} />
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <label htmlFor='catgory'>Category:</label><br />
//           <InputText type="text" id='catgory' name="catgory" value={formik.values.catgory} onChange={formik.handleChange} />
//         </Col>
//         <Col>
//           <label htmlFor='currency'>Currency:</label><br />
//           <InputText type="text" id='currency' name="currency" value={formik.values.currency} onChange={formik.handleChange} />
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <label htmlFor='street'>Address:</label><br />
//           <InputText type="text" id='street' name="street" value={formik.values.Adress.street} onChange={handleAddressChange} />
//         </Col>
//         <Col>
//           <label htmlFor='city'>City:</label><br />
//           <InputText type="text" id='city' name="city" value={formik.values.Adress.city} onChange={handleAddressChange} />
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <label htmlFor='state'>State:</label><br />
//           <InputText type="text" id='state' name="state" value={formik.values.Adress.state} onChange={handleAddressChange} />
//         </Col>
//         <Col>
//           <label htmlFor='zipcode'>Zipcode:</label><br />
//           <InputText type="text" id='zipcode' name="zipcode" value={formik.values.Adress.zipcode} onChange={handleAddressChange} />
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <label htmlFor='country'>Country:</label><br />
//           <InputText type="text" id='country' name="country" value={formik.values.Adress.country} onChange={handleAddressChange} />
//         </Col>
//         <Col>
//           <label htmlFor='Website'>Website:</label><br />
//           <InputText type="text" id='Website' name="Website" value={formik.values.Website} onChange={formik.handleChange} />
//         </Col>
//       </Row>
//       <Col>
//         <div className='mt-4 text-center'>
//           <Button type="submit" >Submit</Button>
//         </div>
//       </Col>
//     </form>
//   );
// };

// export default CompanyDetailsForm;
import React from 'react'

export default function Page() {
  return (
    <div>P</div>
  )
}
