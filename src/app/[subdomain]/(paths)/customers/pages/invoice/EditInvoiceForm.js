
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
// // import { Col, Row } from "react-bootstrap";
// // import { useMemo, useState } from "react";
// // import { MultiSelect } from "primereact/multiselect";
// // import Itempage from "../estimate/itempage";

// // const EditInvoiceForm = ({ invoice, onSubmit, customers,item }) => {
// //   const { subtotals, finalTotals, discounts } = useContext(userContext);
// //   const formatDate = (date) => {
// //     return new Date(date);
// //   };
// //   const itemOptions = useMemo(() => {
// //     return Array.isArray(item) ? item.map(i => ({ label: i.itemName, value: i._id })) : [];
// //   }, [item]);

// //   const [selectedItem, setSelectedItem] = useState([]);
// //   const formik = useFormik({
// //     initialValues: {
// //       invoiceNumber: invoice.invoiceNumber || "",
// //       customerId: invoice.customerId || null,
// //       dueDate: invoice.dueDate ? formatDate(invoice.dueDate) : null,
// //       issuedDate: invoice.issuedDate ? formatDate(invoice.issuedDate) : null,
// //       subtotal: invoice.subtotal || "",
// //       total: invoice.total || "",
// //       paymentStatus: invoice.paymentStatus || "unpaid",
// //       paymentMethod: invoice.paymentMethod || "",
// //       tags: invoice.tags || [],
// //       notes: invoice.notes || "",
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
// //   const options = [
// //     { label: 'Unpaid', value: 'unpaid' },
// //     { label: 'Paid', value: 'paid' },
// //     { label: 'Partial', value: 'partial' },
// //   ];

// //   return (
// //     <form onSubmit={formik.handleSubmit}>
// //       <div>
// //         <label>Invoice Number</label> <br />
// //         <InputText
// //           name="invoiceNumber"
// //           className="w-100"
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
// //           className="w-100"
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
// //           className="w-100"
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
// //           className="w-100"
// //           onValueChange={(e) => formik.setFieldValue("subtotal", e.value)}
// //           value={formik.values.subtotal}
// //         />
// //       </div>

// //       <div>
// //         <label>Total</label><br />
// //         <InputNumber
// //           name="total"
// //           className="w-100"
// //           onValueChange={(e) => formik.setFieldValue("total", e.value)}
// //           value={formik.values.total}
// //         />
// //       </div>

// //       <div>
// //         <label>Payment Status</label><br />
// //         <Dropdown
// //           value={formik.values.paymentStatus}
// //           options={options}
// //           onChange={formik.handleChange}
// //           className="w-100"
// //           name="paymentStatus"
// //           placeholder="Select a Payment Status"
// //         />
// //       </div>

// //       <div>
// //         <label>Payment Method</label><br />
// //         <InputText
// //           name="paymentMethod"
// //            className="w-100"
// //           onChange={formik.handleChange}
// //           value={formik.values.paymentMethod}
// //         />
// //       </div>

// //       <div>
// //         <label>Tags</label><br />
// //         <Chips
// //           name="tags"
// //            className="w-100"
// //           onChange={(e) => formik.setFieldValue("tags", e.value)}
// //           value={formik.values.tags}
// //         />
// //       </div>

// //       <div>
// //         <label>Notes</label><br />
// //         <InputTextarea
// //          className="w-100"
// //           name="notes"
// //           onChange={formik.handleChange}
// //           value={formik.values.notes}
// //         />
// //       </div>
// //       <Col>
// //           <div>
// //             <label htmlFor="items">Select Items:</label><br />
// //             <MultiSelect
// //               id="items"
// //               name="items"
// //               className="w-100"
// //               options={itemOptions}
// //               value={selectedItem}
// //               onChange={(e) => {
// //                 setSelectedItem(e.value);
// //                 formik.setFieldValue("items", e.value);
// //               }}
// //               placeholder="Select Items"
// //             />
// //           </div>
// //         </Col>
// //         <Row>
        
// //         <Col>
// //           {selectedItem.length > 0 && <Itempage selectedItem={selectedItem} />}
// //         </Col>
// //       </Row>
// //       <Button type="submit">Submit</Button>
// //     </form>
// //   );
// // };

// // export default EditInvoiceForm;
// "use client";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { InputText } from "primereact/inputtext";
// import { Dropdown } from "primereact/dropdown";
// import { Chips } from "primereact/chips";
// import { Button } from "primereact/button";
// import { Calendar } from "primereact/calendar";
// import { Col, Row } from "react-bootstrap";
// import Itempage from "../estimate/itempage"; // Ensure this is properly imported
// import { useContext, useMemo, useState } from "react";
// import { MultiSelect } from "primereact/multiselect";
// import userContext from "../../../../../UseContext/UseContext";

// const InvoiceForm = ({ onSubmit, customers, item, invoice }) => {
//   const { subtotals, finalTotals, discounts } = useContext(userContext);

//   const itemOptions = useMemo(() => {
//     return Array.isArray(item) ? item.map(i => ({ label: i.itemName, value: i._id })) : [];
//   }, [item]);

//   const [selectedItem, setSelectedItem] = useState(invoice.items || []);
//   const formatDate = (date) => {
//     return new Date(date);
//   };
//   const formik = useFormik({
//     initialValues: {
//       customerId: invoice.customerId || customers._id,
//       dueDate: invoice.dueDate ? formatDate(invoice.dueDate) : null,
//       issuedDate:invoice.issuedDate ? formatDate(invoice.issuedDate) : null,
//       paymentStatus: invoice.paymentStatus || "unpaid",
//       paymentMethod: invoice.paymentMethod || "",
//       tags: invoice.tags || [],
//       items: invoice.items || [],
//       notes: invoice.notes || "",
//       subtotal: invoice.subtotal || 0,
//       total: invoice.total || 0,
//     },
//     validationSchema: Yup.object({
//       customerId: Yup.string().required("Customer is required"),
//       issuedDate: Yup.date().required("Issued date is required"),
//       dueDate: Yup.date().required("Due date is required"),
//       subtotal: Yup.number().required("Subtotal is required"),
//       total: Yup.number().required("Total is required"),
//     }),
//     onSubmit: (values) => {
//       const formData = new FormData();
//       const formattedValues = {
//         ...values,
//         discount: discounts,
//         total: finalTotals,
//         subTotal: subtotals,
//         items: selectedItem.map(itemId => itemId),
//       };

//       // Log the formatted values for debugging
//       console.log("Formatted Values Before Submission:", formattedValues);

//       Object.keys(formattedValues).forEach((key) => {
//         const value = formattedValues[key];
//         if (Array.isArray(value)) {
//           value.forEach((item, index) => {
//             formData.append(`${key}[${index}]`, item);
//           });
//         } else {
//           formData.append(key, value);
//         }
//       });

//       console.log("Form Data Submitted:", Array.from(formData.entries())); // Debugging log

//       // Call the onSubmit function with the formData
//       onSubmit(formData);
//     },
//   });

//   const options = [
//     { label: 'Unpaid', value: 'unpaid' },
//     { label: 'Paid', value: 'paid' },
//     { label: 'Partial', value: 'partial' },
//   ];

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <Row>
//         <Col>
//           <div>
//             <label>Issued Date</label><br />
//             <Calendar
//               name="issuedDate"
//               onChange={(e) => formik.setFieldValue("issuedDate", e.value)}
//               onBlur={formik.handleBlur}
//               value={formik.values.issuedDate}
//               showIcon
//               className="mb-4 w-100" 
//             />
//             {formik.touched.issuedDate && formik.errors.issuedDate ? (
//               <div className="error ">{formik.errors.issuedDate}</div>
//             ) : null}
//           </div>
//         </Col>
//         <Col>
//           <div>
//             <label>Payment Status</label><br />
//             <Dropdown
//               value={formik.values.paymentStatus}
//               options={options}
//               onChange={(e) => formik.setFieldValue("paymentStatus", e.value)}
//               className="w-100"
//               name="paymentStatus"
//               placeholder="Select a Payment Status"
//             />
//           </div>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <div>
//             <label>Due Date</label><br />
//             <Calendar
//               name="dueDate"
//               onChange={(e) => formik.setFieldValue("dueDate", e.value)}
//               onBlur={formik.handleBlur}
//               value={formik.values.dueDate}
//               showIcon
//               className="mb-4 w-100"
//             />
//             {formik.touched.dueDate && formik.errors.dueDate ? (
//               <div className="error">{formik.errors.dueDate}</div>
//             ) : null}
//           </div>
//         </Col>
//         <Col>
//           <div>
//             <label>Payment Method</label><br />
//             <InputText
//               name="paymentMethod"
//               className="w-100 mb-4"
//               onChange={formik.handleChange}
//               value={formik.values.paymentMethod}
              
//             />
//           </div>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <div>
//             <label>Notes</label><br />
//             <InputText
//               className="mb-4 w-100"
//               name="notes"
//               onChange={formik.handleChange}
//               value={formik.values.notes}
//             />
//           </div>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//           <div>
//             <label>Tags</label><br />
//             <Chips
//               name="tags"
//               className="mb-4 w-100"
//               onChange={(e) => formik.setFieldValue("tags", e.value)}
//               value={formik.values.tags}
//             />
//           </div>
//         </Col>
//         <Col>
//           <div>
//             <label htmlFor="items">Select Items:</label><br />
//             <MultiSelect
//               id="items"
//               name="items"
// className="mb-4 w-100"
//               options={itemOptions}
//               value={selectedItem}
//               onChange={(e) => {
//                 setSelectedItem(e.value);
//                 formik.setFieldValue("items", e.value);
//               }}
//               placeholder="Select Items"
//             />
//           </div>
//         </Col>
//       </Row>
//       <Row>
//         <Col>
//         {console.log(selectedItem,"slecteitem")}
//           {selectedItem.length > 0 && <Itempage selectedItem={selectedItem} />}
//         </Col>
//       </Row>
//       <Button type="submit" className="btn-all">Submit</Button>
//     </form>
//   );
// };

// export default InvoiceForm;
import React from 'react'

export default function Page() {
  return (
    <div>P</div>
  )
}
