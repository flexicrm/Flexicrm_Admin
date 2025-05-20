// "use client";

// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { InputText } from "primereact/inputtext";
// import { InputNumber } from "primereact/inputnumber";
// import { InputTextarea } from "primereact/inputtextarea";
// import { Dropdown } from "primereact/dropdown";
// import { Chips } from "primereact/chips";
// import { Button } from "primereact/button";
// import { Calendar } from "primereact/calendar";
// import userContext from "@/app/UseContext/UseContext";
// import { useContext, useMemo, useState } from "react";
// import { Col, Row } from "react-bootstrap";
// import { MultiSelect } from "primereact/multiselect";
// import ItemPage from "../../customers/pages/estimate/itempage"
// const InvoiceForm = ({ onSubmit, customers, sulg,item }) => {
//   const { singleitem, subtotals, finalTotals, discounts } = useContext(userContext);
//   const itemOptions = useMemo(() => {
//       return Array.isArray(item) ? item.map(i => ({ label: i.itemName, value: i._id })) : [];
//   }, [item]);

//   const [selectedItem, setSelectedItem] = useState([]);
//   const formik = useFormik({
//     initialValues: {
//       customerId: "",
//       dueDate: "",
//       issuedDate: "",
//       subtotal: "",
//       total: "",
//       paymentStatus: "unpaid",
//       paymentMethod: "",
//       tags: "",
//       notes: "",
//     },
//     validationSchema: Yup.object({
//       // invoiceNumber: Yup.string().required("Invoice number is required"),
//       customerId: Yup.string().required("Customer is required"),
//       issuedDate: Yup.date().required("Issued date is required"),
//       dueDate: Yup.date().required("Due date is required"),
//       subtotal: Yup.number().required("Subtotal is required"),
//       total: Yup.number().required("Total is required"),
//     }),
//     onSubmit: (values) => {
//       const formData = new FormData();
//       const formattedValues = {
//           ...values,
//           estimateDate: values.estimateDate ? values.estimateDate.toISOString() : null,
//           expireDate: values.expireDate ? values.expireDate.toISOString() : null,
//           discount: discounts, // Directly assign discounts from context
//           total: finalTotals,
//           subTotal: subtotals,  // Directly assign total from context
//           items: selectedItem.map(itemId => itemId), // Send only IDs
//       };

//       Object.keys(formattedValues).forEach((key) => {
//           if (typeof formattedValues[key] === "object" && formattedValues[key] !== null) {
//               Object.keys(formattedValues[key]).forEach((subKey) => {
//                   formData.append(`${key}[${subKey}]`, formattedValues[key][subKey]);
//               });
//           } else {
//               formData.append(key, formattedValues[key]);
//           }
//       });

//       if (values.estimateFile) {
//           formData.append("estimateFile", values.estimateFile);
//       }

//       onSubmit(formData);
//   },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>

//       <div>
//         <label htmlFor="project">customer</label><br />
//         <Dropdown
//           id="customer"
//           name="customer"
//           options={customers}
//           onChange={(e) => formik.setFieldValue("customerId", e.value)}
//           value={formik.values.customerId}
//           placeholder="Select a Project"
//         />
//         {formik.touched.customerId && formik.errors.customerId && (
//           <div className="error">{formik.errors.customerId}</div>
//         )}
//       </div>

//       <div>
//         <label>Issued Date</label><br />
//         <Calendar
//           type="date"
//           name="issuedDate"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.issuedDate}
//           showIcon
//         />
//       </div>

//       <div>
//         <label>Due Date</label><br />
//         <Calendar
//           type="date"
//           name="dueDate"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.dueDate}
//           showIcon
//         />
//       </div>

//       <div>
//         <label>Subtotal</label><br />
//         <InputNumber
//           name="subtotal"
//           onValueChange={(e) => formik.setFieldValue("subtotal", e.value)}
//           value={formik.values.subtotal}
//         />
//       </div>

//       <div>
//         <label>Total</label><br />
//         <InputNumber
//           name="total"
//           onValueChange={(e) => formik.setFieldValue("total", e.value)}
//           value={formik.values.total}
//         />
//       </div>

//       <div>
//         <label>Payment Status</label><br />
//         <select
//           name="paymentStatus"
//           onChange={formik.handleChange}
//           value={formik.values.paymentStatus}
//         >
//           <option value="unpaid">Unpaid</option>
//           <option value="paid">Paid</option>
//           <option value="partial">Partial</option>
//         </select>
//       </div>

//       <div>
//         <label>Payment Method</label><br />
//         <InputText
//           name="paymentMethod"
//           onChange={formik.handleChange}
//           value={formik.values.paymentMethod}
//         />
//       </div>

//       <div>
//         <label>Tags </label><br />
//         <Chips
//           name="tags"
//           onChange={formik.handleChange}
//           value={formik.values.tags}
//         />
//       </div>

//       <div>
//         <label>Notes</label><br />
//         <InputTextarea
//           name="notes"
//           onChange={formik.handleChange}
//           value={formik.values.notes}
//         />
//       </div>
//       <Row>
//                     <Col> <div>
//                         <label htmlFor="items">Select Items:</label><br />
//                         <MultiSelect
//                             id="items"
//                             name="items"
//                             options={itemOptions}
//                             value={selectedItem}
//                             onChange={(e) => {
//                                 setSelectedItem(e.value);
//                                 formik.setFieldValue("items", e.value); // Store only IDs in Formik
//                             }}
//                             placeholder="Select Items"
//                         />
//                     </div></Col>
//                     <Col> {selectedItem.length > 0 && <ItemPage selectedItem={selectedItem} />}</Col>
//                 </Row>
//       <Button type="submit">Submit</Button>
//     </form>
//   );
// };

// export default InvoiceForm;
// "use client";

// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { InputText } from "primereact/inputtext";
// import { InputNumber } from "primereact/inputnumber";
// import { InputTextarea } from "primereact/inputtextarea";
// import { Dropdown } from "primereact/dropdown";
// import { Chips } from "primereact/chips";
// import { Button } from "primereact/button";
// import { Calendar } from "primereact/calendar";
// import userContext from "@/app/UseContext/UseContext";
// import { useContext, useMemo, useState } from "react";
// import { Col, Row } from "react-bootstrap";
// import { MultiSelect } from "primereact/multiselect";
// import ItemPage from "../../customers/pages/estimate/itempage";

// const InvoiceForm = ({ onSubmit, customers, sulg, item }) => {
//   const { singleitem, subtotals, finalTotals, discounts } = useContext(userContext);
//   const itemOptions = useMemo(() => {
//     return Array.isArray(item) ? item.map(i => ({ label: i.itemName, value: i._id })) : [];
//   }, [item]);

//   const [selectedItem, setSelectedItem] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const formik = useFormik({
//     initialValues: {
//       customerId: "",
//       // issuedDate: "",
//       // dueDate: "",
//       // subtotal: "",
//       // total: "",
//       paymentStatus: "unpaid",
//       paymentMethod: "",
//       tags: [],
//       notes: "",
//     },
//     validationSchema: Yup.object({
//       customerId: Yup.string().required("Customer is required"),
//       issuedDate: Yup.date().required("Issued date is required"),
//       dueDate: Yup.date().required("Due date is required"),
//       subtotal: Yup.number().required("Subtotal is required"),
//       total: Yup.number().required("Total is required"),
//       paymentMethod: Yup.string().required("Payment method is required"),
//     }),
//     onSubmit: async (values) => {
//       setIsSubmitting(true);
//       const formData = new FormData();
//       const formattedValues = {
//         ...values,
//         issuedDate: values.issuedDate ? values.issuedDate.toISOString() : null,
//         dueDate: values.dueDate ? values.dueDate.toISOString() : null,
//         discount: discounts,
//         total: finalTotals,
//         subTotal: subtotals,
//         items: selectedItem.map(itemId => itemId),
//       };

//       Object.keys(formattedValues).forEach((key) => {
//         if (typeof formattedValues[key] === "object" && formattedValues[key] !== null) {
//           Object.keys(formattedValues[key]).forEach((subKey) => {
//             formData.append(`${key}[${subKey}]`, formattedValues[key][subKey]);
//           });
//         } else {
//           formData.append(key, formattedValues[key]);
//         }
//       });

//       if (values.estimateFile) {
//         formData.append("estimateFile", values.estimateFile);
//       }
//       onSubmit(formData);

//     },
//   });

//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <div>
//         <label htmlFor="customer">Customer</label><br />
//         <Dropdown
//           id="customer"
//           name="customerId"
//           options={customers}
//           onChange={(e) => formik.setFieldValue("customerId", e.value)}
//           value={formik.values.customerId}
//           placeholder="Select a Customer"
//         />
//         {formik.touched.customerId && formik.errors.customerId && (
//           <div className="error">{formik.errors.customerId}</div>
//         )}
//       </div>

//       <div>
//         <label>Issued Date</label><br />
//         <Calendar
//           type="date"
//           name="issuedDate"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.issuedDate}
//           showIcon
//         />
//         {formik.touched.issuedDate && formik.errors.issuedDate && (
//           <div className="error">{formik.errors.issuedDate}</div>
//         )}
//       </div>

//       <div>
//         <label>Due Date</label><br />
//         <Calendar
//           type="date"
//           name="dueDate"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.dueDate}
//           showIcon
//         />
//         {formik.touched.dueDate && formik.errors.dueDate && (
//           <div className="error">{formik.errors.dueDate}</div>
//         )}
//       </div>

//       {/* <div>
//         <label>Subtotal</label><br />
//         <InputNumber
//           name="subtotal"
//           onValueChange={(e) => formik.setFieldValue("subtotal", e.value)}
//           value={formik.values.subtotal}
//         />
//         {formik.touched.subtotal && formik.errors.subtotal && (
//           <div className="error">{formik.errors.subtotal}</div>
//         )}
//       </div> */}

//       {/* <div>
//         <label>Total</label><br />
//         <InputNumber
//           name="total"
//           onValueChange={(e) => formik.setFieldValue("total", e.value)}
//           value={formik.values.total}
//         />
//         {formik.touched.total && formik.errors.total && (
//           <div className="error">{formik.errors.total}</div>
//         )}
//       </div> */}

//       <div>
//         <label>Payment Status</label><br />
//         <Dropdown
//           name="paymentStatus"
//           options={[
//             { label: "Unpaid", value: "unpaid" },
//             { label: "Paid", value: "paid" },
//             { label: "Partial", value: "partial" },
//           ]}
//           onChange={(e) => formik.setFieldValue("paymentStatus", e.value)}
//           value={formik.values.paymentStatus}
//           placeholder="Select Payment Status"
//         />
//       </div>

//       <div>
//         <label>Payment Method</label><br />
//         <InputText
//           name="paymentMethod"
//           onChange={formik.handleChange}
//           value={formik.values.paymentMethod}
//         />
//         {formik.touched.paymentMethod && formik.errors.paymentMethod && (
//           <div className="error">{formik.errors.paymentMethod}</div>
//         )}
//       </div>

//       <div>
//         <label>Tags</label><br />
//         <Chips
//           name="tags"
//           value={formik.values.tags}
//           onChange={(e) => formik.setFieldValue("tags", e.value)}
//         />
//       </div>

//       <div>
//         <label>Notes</label><br />
//         <InputTextarea
//           name="notes"
//           onChange={formik.handleChange}
//           value={formik.values.notes}
//         />
//       </div>

//       <Row>
//         <Col>
//           <div>
//             <label htmlFor="items">Select Items:</label><br />
//             <MultiSelect
//               id="items"
//               name="items"
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
//         <Col>
//           {selectedItem.length > 0 && <ItemPage selectedItem={selectedItem} />}
//         </Col>
//       </Row>

//       <Button type="submit" disabled={isSubmitting}>
//         {isSubmitting ? "Submitting..." : "Submit"}
//       </Button>
//     </form>
//   );
// };

// export default InvoiceForm;

'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Chips } from 'primereact/chips';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Col, Row } from 'react-bootstrap';
import Itempage from '../../customers/pages/estimate/itempage'; // Ensure this is properly imported
import { useContext, useEffect, useMemo, useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import userContext from '../../../../UseContext/UseContext';
// import userContext from "@/app/UseContext/UseContext";
// import userContext from "../../../../../UseContext/UseContext";

const InvoiceForm = ({ onSubmit, customers, item }) => {
    const { subtotals, finalTotals, discounts } = useContext(userContext);

    const itemOptions = useMemo(() => {
        return Array.isArray(item) ? item.map((i) => ({ label: i.itemName, value: i._id })) : [];
    }, [item]);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState([]);
    useEffect(() => {
        setLoading(true);
    }, []);
    const formik = useFormik({
        initialValues: {
            customerId: '',
            dueDate: '',
            issuedDate: '',
            paymentStatus: 'unpaid',
            paymentMethod: '',
            tags: [],
            items: [],
            notes: '',
            subtotal: 0, // Add these
            total: 0 // Add these
        },
        validationSchema: Yup.object({
            customerId: Yup.string().required('Customer is required'),
            issuedDate: Yup.date().required('Issued date is required'),
            dueDate: Yup.date().required('Due date is required'),
            subtotal: Yup.number().required('Subtotal is required'),
            total: Yup.number().required('Total is required')
        }),
        onSubmit: (values) => {
            const formData = new FormData();
            const formattedValues = {
                ...values,
                dueDate: values.dueDate,
                issuedDate: values.issuedDate,
                discount: discounts,
                total: finalTotals,
                subTotal: subtotals,
                items: selectedItem.map((itemId) => itemId)
            };

            // Log the formatted values for debugging
            // console.log("Formatted Values Before Submission:", formattedValues);

            Object.keys(formattedValues).forEach((key) => {
                const value = formattedValues[key];
                if (Array.isArray(value)) {
                    value.forEach((item, index) => {
                        formData.append(`${key}[${index}]`, item);
                    });
                } else {
                    formData.append(key, value);
                }
            });

            // console.log("Form Data Submitted:", Array.from(formData.entries())); // Debugging log

            // Call the onSubmit function with the formData
            onSubmit(formData);
        }
    });

    const options = [
        { label: 'Unpaid', value: 'unpaid' },
        { label: 'Paid', value: 'paid' },
        { label: 'Partial', value: 'partial' }
    ];

    return (
        <>
            {loading && (
                <form onSubmit={formik.handleSubmit}>
                    <Row>
                        <Col>
                            <div>
                                {' '}
                                <label htmlFor="customer">Customer</label>
                                <br />
                                <Dropdown id="customer" name="customerId" options={customers} onChange={(e) => formik.setFieldValue('customerId', e.value)} value={formik.values.customerId} placeholder="Select a Customer" className="w-100 mb-3" />
                                {formik.touched.customerId && formik.errors.customerId && <div className="error">{formik.errors.customerId}</div>}
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <label>Issued Date</label>
                                <br />
                                <Calendar name="issuedDate" onChange={(e) => formik.setFieldValue('issuedDate', e.value)} onBlur={formik.handleBlur} value={formik.values.issuedDate} showIcon className="w-100 mb-3" />
                                {formik.touched.issuedDate && formik.errors.issuedDate ? <div className="error">{formik.errors.issuedDate}</div> : null}
                            </div>
                        </Col>
                        {/* <Col>
           <div>
             <label>Payment Status</label><br />
             <Dropdown
               value={formik.values.paymentStatus}
               options={options}
               onChange={(e) => formik.setFieldValue("paymentStatus", e.value)}
               className="w-100"
               name="paymentStatus"
               placeholder="Select a Payment Status"
             />
           </div>
         </Col> */}
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <label>Due Date</label>
                                <br />
                                <Calendar name="dueDate" onChange={(e) => formik.setFieldValue('dueDate', e.value)} onBlur={formik.handleBlur} value={formik.values.dueDate} showIcon className="w-100 mb-3" />
                                {formik.touched.dueDate && formik.errors.dueDate ? <div className="error">{formik.errors.dueDate}</div> : null}
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <label>Payment Status</label>
                                <br />
                                <Dropdown value={formik.values.paymentStatus} options={options} onChange={(e) => formik.setFieldValue('paymentStatus', e.value)} className="w-100 mb-3" name="paymentStatus" placeholder="Select a Payment Status" />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>
                                <label>Payment Method</label>
                                <br />
                                <InputText name="paymentMethod" className="w-100 mb-3" onChange={formik.handleChange} value={formik.values.paymentMethod} />
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <label>Notes</label>
                                <br />
                                <InputText className="w-100 mb-3" name="notes" onChange={formik.handleChange} value={formik.values.notes} />
                            </div>
                        </Col>
                    </Row>
                    <Row></Row>
                    <Row>
                        <Col>
                            <div>
                                <label>Tags</label>
                                <br />
                                <Chips name="tags" className="w-100 mb-3" onChange={(e) => formik.setFieldValue('tags', e.value)} value={formik.values.tags} />
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <label htmlFor="items">Select Items:</label>
                                <br />
                                <MultiSelect
                                    id="items"
                                    name="items"
                                    className="w-100 mb-3"
                                    options={itemOptions}
                                    value={selectedItem}
                                    onChange={(e) => {
                                        setSelectedItem(e.value);
                                        formik.setFieldValue('items', e.value);
                                    }}
                                    placeholder="Select Items"
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row></Row>
                    <Row>
                        <Col>{selectedItem.length > 0 && <Itempage selectedItem={selectedItem} />}</Col>
                    </Row>
                    <Button type="submit" className="btn-all">
                        Submit
                    </Button>
                </form>
            )}
        </>
        // <form onSubmit={formik.handleSubmit}>
        //   <Row>
        //     <Col>
        //     <div>         <label htmlFor="customer">Customer</label><br />
        //       <Dropdown
        //         id="customer"
        //         name="customerId"
        //         options={customers}
        //         onChange={(e) => formik.setFieldValue("customerId", e.value)}
        //         value={formik.values.customerId}
        //         placeholder="Select a Customer"
        //         className="w-100 mb-3"
        //       />
        //       {formik.touched.customerId && formik.errors.customerId && (
        //         <div className="error">{formik.errors.customerId}</div>
        //       )}
        //     </div>
        //     </Col>
        //     <Col>
        //       <div>
        //         <label>Issued Date</label><br />
        //         <Calendar
        //           name="issuedDate"
        //           onChange={(e) => formik.setFieldValue("issuedDate", e.value)}
        //           onBlur={formik.handleBlur}
        //           value={formik.values.issuedDate}
        //           showIcon
        //           className="w-100 mb-3"
        //         />
        //         {formik.touched.issuedDate && formik.errors.issuedDate ? (
        //           <div className="error">{formik.errors.issuedDate}</div>
        //         ) : null}
        //       </div>
        //     </Col>
        //     {/* <Col>
        //       <div>
        //         <label>Payment Status</label><br />
        //         <Dropdown
        //           value={formik.values.paymentStatus}
        //           options={options}
        //           onChange={(e) => formik.setFieldValue("paymentStatus", e.value)}
        //           className="w-100"
        //           name="paymentStatus"
        //           placeholder="Select a Payment Status"
        //         />
        //       </div>
        //     </Col> */}
        //   </Row>
        //   <Row>
        //     <Col>
        //       <div>
        //         <label>Due Date</label><br />
        //         <Calendar
        //           name="dueDate"
        //           onChange={(e) => formik.setFieldValue("dueDate", e.value)}
        //           onBlur={formik.handleBlur}
        //           value={formik.values.dueDate}
        //           showIcon
        //           className="w-100 mb-3"
        //         />
        //         {formik.touched.dueDate && formik.errors.dueDate ? (
        //           <div className="error">{formik.errors.dueDate}</div>
        //         ) : null}
        //       </div>
        //     </Col>
        //     <Col>
        //       <div>
        //         <label>Payment Status</label><br />
        //         <Dropdown
        //           value={formik.values.paymentStatus}
        //           options={options}
        //           onChange={(e) => formik.setFieldValue("paymentStatus", e.value)}
        //           className="w-100 mb-3"
        //           name="paymentStatus"
        //           placeholder="Select a Payment Status"

        //         />
        //       </div>
        //     </Col>
        //   </Row>
        //   <Row>

        //     <Col>
        //       <div>
        //         <label>Payment Method</label><br />
        //         <InputText

        //           name="paymentMethod"
        //           className="w-100 mb-3"
        //           onChange={formik.handleChange}
        //           value={formik.values.paymentMethod}
        //         />
        //       </div>
        //     </Col>
        //     <Col>
        //       <div>
        //         <label>Notes</label><br />
        //         <InputText
        //           className="w-100 mb-3"
        //           name="notes"
        //           onChange={formik.handleChange}
        //           value={formik.values.notes}
        //         />
        //       </div>
        //     </Col>
        //   </Row>
        //   <Row>

        //   </Row>
        //   <Row>
        //     <Col>
        //       <div>
        //         <label>Tags</label><br />
        //         <Chips
        //           name="tags"
        //           className="w-100 mb-3"
        //           onChange={(e) => formik.setFieldValue("tags", e.value)}
        //           value={formik.values.tags}
        //         />
        //       </div>
        //     </Col>
        //     <Col>
        //       <div>
        //         <label htmlFor="items">Select Items:</label><br />
        //         <MultiSelect
        //           id="items"
        //           name="items"
        //           className="w-100 mb-3"
        //           options={itemOptions}
        //           value={selectedItem}
        //           onChange={(e) => {
        //             setSelectedItem(e.value);
        //             formik.setFieldValue("items", e.value);
        //           }}
        //           placeholder="Select Items"
        //         />
        //       </div>
        //     </Col>
        //   </Row>
        //   <Row>

        //   </Row>
        //   <Row>

        //     <Col>
        //       {selectedItem.length > 0 && <Itempage selectedItem={selectedItem} />}
        //     </Col>
        //   </Row>
        //   <Button type="submit" className="btn-all">Submit</Button>
        // </form>
    );
};

export default InvoiceForm;
