// import React from 'react';
// import { InputText } from 'primereact/inputtext';
// import { useFormik } from 'formik';
// import { Col, Row } from 'react-bootstrap';
// import { Button } from 'primereact/button';
// import Link from 'next/link';
// import '../../../../../styles/cutombersedit.scss'
// const BillingShippingForm = () => {
//   const formik = useFormik({
//     initialValues: {
//       billigAddress: {
//         street: "",
//         city: "",
//         state: "",
//         zipcode: "",
//         country: ""
//       },
//       shippingAddress: {
//         street: "",
//         city: "",
//         state: "",
//         zipcode: "",
//         country: ""
//       }
//     },
//     onSubmit: (values) => {
//       // console.log(values);
     
//     }
//   });
//   // console.log("formik:", formik)
//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     formik.setFieldValue(`Adress.${name}`, value);
//   };
//   return (


//     <form onSubmit={formik.handleSubmit}>
//       <Row >
//         <Col>
//           <Row className='billing-form3'>
//             <h6 className='dskdskdsds'> Billig Form</h6>
//             <Col>
//               <label htmlFor='street'>Address:</label><br />
//               <InputText type="text" id='street' name="street" value={formik.values.billigAddress.street} onChange={handleAddressChange} className='w-100 mb-4' />
//             </Col>
//             <Col>
//               <label htmlFor='city'>City:</label><br />
//               <InputText type="text" id='city' name="city" value={formik.values.billigAddress.city} onChange={handleAddressChange} className='w-100 mb-4' />
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <label htmlFor='state'>State:</label><br />
//               <InputText type="text" id='state' name="state" value={formik.values.billigAddress.state} onChange={handleAddressChange} className='w-100 mb-4' />
//             </Col>
//             <Col>
//               <label htmlFor='zipcode'>Zipcode:</label><br />
//               <InputText type="text" id='zipcode' name="zipcode" value={formik.values.billigAddress.zipcode} onChange={handleAddressChange} className='w-100 mb-4' />
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <label htmlFor='country'>Country:</label><br />
//               <InputText type="text" id='country' name="country" value={formik.values.billigAddress.country} onChange={handleAddressChange} className='w-100 mb-4' />
//             </Col>
//             {/* <Col>
//           <label htmlFor='Website'>Website:</label><br />
//           <InputText type="text" id='Website' name="Website" value={formik.values.Website} onChange={formik.handleChange} />
//         </Col> */}
//           </Row></Col>
//         <Col>
//           <h6>Shipping Form</h6>
//           <Row>
//             <Col>
//               <label htmlFor='street'>Address:</label><br />
//               <InputText type="text" id='street' name="street" value={formik.values.shippingAddress.street} onChange={handleAddressChange} className='w-100 mb-4' />
//             </Col>
//             <Col>
//               <label htmlFor='city'>City:</label><br />
//               <InputText type="text" id='city' name="city" value={formik.values.shippingAddress.city} onChange={handleAddressChange} className='w-100 mb-4' />
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <label htmlFor='state'>State:</label><br />
//               <InputText type="text" id='state' name="state" value={formik.values.shippingAddress.state} onChange={handleAddressChange} className='w-100 mb-4' />
//             </Col>
//             <Col>
//               <label htmlFor='zipcode'>Zipcode:</label><br />
//               <InputText type="text" id='zipcode' name="zipcode" value={formik.values.shippingAddress.zipcode} onChange={handleAddressChange} className='w-100 mb-4' />
//             </Col>
//           </Row>
//           <Row>
//             <Col>
//               <label htmlFor='country'>Country:</label><br />
//               <InputText type="text" id='country' name="country" value={formik.values.shippingAddress.country} onChange={handleAddressChange} className='w-100 mb-4' />
//             </Col>

//           </Row></Col>
//       </Row>



//       <Col>
//         <div className='mt-4 text-center'>
//           <Button type="submit">Submit</Button>
//           <Button type="" className='ms-2' >
//           Contiune Contact
//            </Button>
//         </div>
//       </Col>
//     </form>


//   );
// };

// export default BillingShippingForm;
import React from 'react'

export default function Page() {
  return (
    <div>P</div>
  )
}
