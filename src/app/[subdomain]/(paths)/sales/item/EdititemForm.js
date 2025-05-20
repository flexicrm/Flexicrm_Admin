// // import { useFormik } from "formik";
// // import * as Yup from "yup";
// // import { InputText } from "primereact/inputtext";
// // import { InputNumber } from "primereact/inputnumber";
// // import { InputTextarea } from "primereact/inputtextarea";
// // import { Dropdown } from "primereact/dropdown";

// // const ExpenseForm = ({ onSubmit, expenses, customers, projectsOptions }) => {
// //     const formik = useFormik({
// //         initialValues: {
// //             expenseId: expenses.expenseId,

// //             customer: expenses.customer,
// //             expenseSubject: expenses.expenseSubject,
// //             description: expenses.description,
// //             expenseBillUpload: expenses.expenseBillUpload, // File upload
// //             Amount: expenses.Amount,
// //             paymentStatus: expenses.paymentStatus, // Default payment status
// //             paymentMethod: expenses.paymentMethod,
// //             tags: expenses.tags,
// //             date: expenses.date, // Date field
// //             project: expenses.project, // Project field
// //         },
// //         validationSchema: Yup.object({
// //             // customerId: Yup.string().required("Customer is required"),
// //             expenseSubject: Yup.string().required("Expense subject is required"),
// //             description: Yup.string().required("Description is required"),
// //             Amount: Yup.number().required("Amount is required").positive("Amount must be positive"),
// //             paymentMethod: Yup.string().required("Payment method is required"),
// //             date: Yup.date().required("Date is required").nullable(),
// //             project: Yup.string().required("Project is required"),
// //         }),
// //         onSubmit: (values) => {
// //             const formData = new FormData();
// //             Object.keys(values).forEach((key) => {
// //                 formData.append(key, values[key]);
// //             });
// //             onSubmit(formData);
// //         },
// //     });

// //     return (
// //         <form onSubmit={formik.handleSubmit}>
// //             <div>
// //                 <label htmlFor="customer">Customer</label><br />
// //                 <Dropdown
// //                     id="customer"
// //                     name="customer"
// //                     options={customers}
// //                     onChange={(e) => formik.setFieldValue("customer", e.value)}
// //                     value={formik.values.customer}
// //                     placeholder="Select a Customer"
// //                 />
// //                 {formik.touched.customer && formik.errors.customer && (
// //                     <div className="error">{formik.errors.customer}</div>
// //                 )}
// //             </div>

// //             <div>
// //                 <label htmlFor="expenseSubject">Expense Subject</label><br />
// //                 <InputText
// //                     id="expenseSubject"
// //                     name="expenseSubject"
// //                     onChange={formik.handleChange}
// //                     onBlur={formik.handleBlur}
// //                     value={formik.values.expenseSubject}
// //                 />
// //                 {formik.touched.expenseSubject && formik.errors.expenseSubject && (
// //                     <div className="error">{formik.errors.expenseSubject}</div>
// //                 )}
// //             </div>

// //             <div>
// //                 <label htmlFor="description">Description</label><br />
// //                 <InputTextarea
// //                     id="description"
// //                     name="description"
// //                     onChange={formik.handleChange}
// //                     value={formik.values.description}
// //                 />
// //                 {formik.touched.description && formik.errors.description && (
// //                     <div className="error">{formik.errors.description}</div>
// //                 )}
// //             </div>

// //             <div>
// //                 <label htmlFor="Amount">Amount</label><br />
// //                 <InputNumber
// //                     id="Amount"
// //                     name="Amount"
// //                     onValueChange={(e) => formik.setFieldValue("Amount", e.value)}
// //                     value={formik.values.Amount}
// //                 />
// //                 {formik.touched.Amount && formik.errors.Amount && (
// //                     <div className="error">{formik.errors.Amount}</div>
// //                 )}
// //             </div>

// //             <div>
// //                 <label htmlFor="expenseBillUpload">Expense Bill Upload</label><br />
// //                 <input
// //                     type="file"
// //                     name="expenseBillUpload"
// //                     onChange={(event) => {
// //                         formik.setFieldValue("expenseBillUpload", event.currentTarget.files[0]);
// //                     }}
// //                 />
// //                 {formik.touched.expenseBillUpload && formik.errors.expenseBillUpload && (
// //                     <div className="error">{formik.errors.expenseBillUpload}</div>
// //                 )}
// //             </div>

// //             <div>
// //                 <label htmlFor="paymentMethod">Payment Method</label><br />
// //                 <InputText
// //                     id="paymentMethod"
// //                     name="paymentMethod"
// //                     onChange={formik.handleChange}
// //                     value={formik.values.paymentMethod}
// //                 />
// //                 {formik.touched.paymentMethod && formik.errors.paymentMethod && (
// //                     <div className="error">{formik.errors.paymentMethod}</div>
// //                 )}
// //             </div>

// //             <div>
// //                 <label htmlFor="paymentStatus">Payment Status</label><br />
// //                 <select
// //                     id="paymentStatus"
// //                     name="paymentStatus"
// //                     onChange={formik.handleChange}
// //                     value={formik.values.paymentStatus}
// //                 >
// //                     <option value="Pending">Pending</option>
// //                     <option value="Paid">Paid</option>
// //                     <option value="Partial">Partial</option>
// //                 </select>
// //             </div>

// //             <div>
// //                 <label htmlFor="date">Date</label><br />
// //                 <InputText
// //                     id="date"
// //                     type="date"
// //                     name="date"
// //                     onChange={formik.handleChange}
// //                     onBlur={formik.handleBlur}
// //                     value={formik.values.date}
// //                 />
// //                 {formik.touched.date && formik.errors.date && (
// //                     <div className="error">{formik.errors.date}</div>
// //                 )}
// //             </div>

// //             <div>
// //                 <label htmlFor="project">Project</label><br />
// //                 <Dropdown
// //                     id="project"
// //                     name="project"
// //                     options={projectsOptions}
// //                     onChange={(e) => formik.setFieldValue("project", e.value)}
// //                     value={formik.values.project}
// //                     placeholder="Select a Project"
// //                 />
// //                 {formik.touched.project && formik.errors.project && (
// //                     <div className="error">{formik.errors.project}</div>
// //                 )}
// //             </div>

// //             <button type="submit">Submit</button>
// //         </form>
// //     );
// // };

// // export default ExpenseForm;;
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { InputText } from "primereact/inputtext";
// import { InputNumber } from "primereact/inputnumber";
// import { InputTextarea } from "primereact/inputtextarea";
// import { Dropdown } from "primereact/dropdown";
// import { Chips } from "primereact/chips";
// import { Calendar } from "primereact/calendar";
// import { Editor } from "primereact/editor";
// import { useEffect, useState } from "react";


// const EditItemForm = ({ onSubmit, estimate, customers, projects,item }) => {
//     console.log(item,"item,item,item,item,item,item,")
//     // console.log(estimate, "estimate===========>")
//     // console.log(projects, "projectsOptions")
//      const [loading , setLoading] =useState(false)

//      useEffect(()=>{
//         setLoading(true)
//      },[])
//     const formatDate = (date) => {
//         return new Date(date);
//       };
//     const currencies = [
//         { label: "USD", value: "USD" },
//         { label: "EUR", value: "EUR" },
//         { label: "GBP", value: "GBP" },
//     ];

//     const estimateStatuses = [
//         { label: "Draft", value: "Draft" },
//         { label: "Sent", value: "Sent" },
//         { label: "Accepted", value: "Accepted" },
//         { label: "Rejected", value: "Rejected" },
//     ];
//     // const formik = useFormik({
//     //     initialValues: {
//     //         customer: estimate?.customer?._id || null,
//     //         project: estimate.project || null,
//     //         billingTo: {
//     //             street: estimate.billingTo?.street || '',
//     //             city: estimate.billingTo?.city || '',
//     //             state: estimate.billingTo?.state || '',
//     //             zipcode: estimate.billingTo?.zipcode || '',
//     //             country: estimate.billingTo?.country || '',
//     //         },
//     //         shippingTo: {
//     //             street: estimate.shippingTo?.street || '',
//     //             city: estimate.shippingTo?.city || '',
//     //             state: estimate.shippingTo?.state || '',
//     //             zipcode: estimate.shippingTo?.zipcode || '',
//     //             country: estimate.shippingTo?.country || '',
//     //         },
//     //         estimationNo: estimate.estimationNo || '',
//     //         description: estimate.description || '',
//     //         estimateDate: estimate.estimateDate ? formatDate(estimate.estimateDate) : null,
//     //         expireDate:  estimate.expireDate ? formatDate(estimate.expireDate) : null,
//     //         total: estimate.total || 0,
//     //         currency: estimate.currency || '',
//     //         estimateStatus: estimate.estimateStatus || '',
//     //         adjustment: 0,
//     //         discount: 0,
//     //         termsAndConditions: "",
//     //         estimateFile: null,
//     //         tags:[]
//     //     },
//     //     validationSchema: Yup.object({
//     //         // customer: Yup.string().required("Customer is required"),
//     //         project: Yup.string().required("Project is required"),
//     //         description: Yup.string().required("Description is required"),
//     //         estimateDate: Yup.date().required("Estimate date is required").nullable(),
//     //         total: Yup.number().required("Total is required").positive("Total must be positive"),
//     //         currency: Yup.string().required("Currency is required"),
//     //         estimateStatus: Yup.string().required("Estimate status is required"),
//     //         // estimateFile: Yup.mixed().required("Estimate file is required"), // Updated line
//     //     }),
//     //     onSubmit: (values) => {
//     //         // console.log('Form Values:', values); // Debugging line
//     //         const formData = new FormData();
//     //         Object.keys(values).forEach((key) => {
//     //             if (typeof values[key] === "object" && values[key] !== null) {
//     //                 Object.keys(values[key]).forEach((subKey) => {
//     //                     formData.append(`${key}[${subKey}]`, values[key][subKey]);
//     //                 });
//     //             } else {
//     //                 formData.append(key, values[key]);
//     //             }
//     //         });
//     //         // console.log('FormData:', formData); // Debugging line
//     //         onSubmit(formData);
//     //     },
        
//     // });

//     // Example of using setValues method
//     const handleReset = () => {
//         formik.setValues({
//             expenseId: '',
//             customer: null,
//             expenseSubject: '',
//             description: '',
//             expenseBillUpload: null,
//             Amount: '',
//             paymentStatus: 'Pending',
//             paymentMethod: '',
//             tags: [],
//             date: null,
//             project: null,
//             tags:[]
//         });
//     };

//     return (
//         <>
//         {
//             loading && (
//                 <>
//                 </>

//                 // <form onSubmit={formik.handleSubmit}>
//                 //     <div>
//                 //        <label> Tags</label> <br/>
//                 //       <Chips
//                 //         name="tags"
//                 //         value={formik.values.tags}
//                 //         onChange={formik.handleChange} />
//                 //     </div>
                   
        
//                 //     {/* Project Dropdown */}
//                 //     <div>
//                 //         <label htmlFor="project">Project</label><br />
//                 //         <Dropdown
//                 //             id="project"
//                 //             name="project"
//                 //             options={projects}
//                 //             onChange={(e) => formik.setFieldValue("project", e.value)}
//                 //             value={formik.values.project}
//                 //             placeholder="Select a Project"
//                 //             className='mb-3 w-100'
//                 //         />
//                 //         {formik.touched.project && formik.errors.project && (
//                 //             <div className="error">{formik.errors.project}</div>
//                 //         )}
//                 //     </div>
        
//                 //     {/* Estimation Number Input */}
//                 //     <div className="p-field">
//                 //         <label htmlFor="estimationNo">Estimation Number</label>
//                 //         <InputText
//                 //             id="estimationNo"
//                 //             name="estimationNo"
//                 //             value={formik.values.estimationNo}
//                 //             onChange={formik.handleChange}
//                 //             className='mb-3 w-100'
//                 //         />
//                 //         {formik.touched.estimationNo && formik.errors.estimationNo && (
//                 //             <div className="error">{formik.errors.estimationNo}</div>
//                 //         )}
//                 //     </div>
        
//                 //     {/* Description Input */}
//                 //     <div>
//                 //         <label htmlFor="description">Description</label><br />
//                 //         <Editor
//                 //             id="description"
//                 //             name="description"
//                 //             onChange={formik.handleChange}
//                 //             value={formik.values.description}
//                 //             className='mb-3 w-100'
//                 //         />
//                 //         {formik.touched.description && formik.errors.description && (
//                 //             <div className="error">{formik.errors.description}</div>
//                 //         )}
//                 //     </div>
        
//                 //     {/* Estimate Date Input */}
//                 //     <div>
//                 //         <label htmlFor="estimateDate">Estimate Date</label><br />
//                 //         <Calendar
//                 //             id="estimateDate"
//                 //             type="date"
//                 //             name="estimateDate"
//                 //             onChange={formik.handleChange}
//                 //             onBlur={formik.handleBlur}
//                 //             value={formik.values.estimateDate}
//                 //             className='mb-3 w-100'
//                 //             showIcon
//                 //         />
//                 //         {formik.touched.estimateDate && formik.errors.estimateDate && (
//                 //             <div className="error">{formik.errors.estimateDate}</div>
//                 //         )}
//                 //     </div>
//                 //     <div>
//                 //         <label htmlFor="expireDate">Estimate Date</label><br />
//                 //         <Calendar
//                 //             id="expireDate"
//                 //             type="date"
//                 //             name="expireDate"
//                 //             onChange={formik.handleChange}
//                 //             onBlur={formik.handleBlur}
//                 //             value={formik.values.expireDate}
//                 //             className='mb-3 w-100'
//                 //             showIcon
//                 //         />
//                 //         {formik.touched.expireDate && formik.errors.expireDate && (
//                 //             <div className="error">{formik.errors.expireDate}</div>
//                 //         )}
//                 //     </div>
        
//                 //     {/* Total Input */}
//                 //     <div>
//                 //         <label htmlFor="total">Total</label><br />
//                 //         <InputNumber
//                 //             id="total"
//                 //             name="total"
//                 //             onValueChange={(e) => formik.setFieldValue("total", e.value)}
//                 //             value={formik.values.total}
//                 //             className='mb-3 w-100'
//                 //         />
//                 //         {formik.touched.total && formik.errors.total && (
//                 //             <div className="error">{formik.errors.total}</div>
//                 //         )}
//                 //     </div>
        
//                 //     {/* Currency Dropdown */}
//                 //     <div>
//                 //         <label htmlFor="currency">Currency</label><br />
//                 //         <Dropdown
//                 //             id="currency"
//                 //             name="currency"
//                 //             options={currencies}
//                 //             onChange={(e) => formik.setFieldValue("currency", e.value)}
//                 //             value={formik.values.currency}
//                 //             placeholder="Select a Currency"
//                 //             className='mb-3 w-100'
//                 //         />
//                 //         {formik.touched.currency && formik.errors.currency && (
//                 //             <div className="error">{formik.errors.currency}</div>
//                 //         )}
//                 //     </div>
        
//                 //     {/* Billing Address */}
//                 //     <div>
//                 //         <h4>Billing Address</h4>
//                 //         <label htmlFor="billingStreet">Street</label>
//                 //         <InputText
//                 //             id="billingStreet"
//                 //             name="billingTo.street"
//                 //             onChange={formik.handleChange}
//                 //             value={formik.values.billingTo.street}
//                 //             className='mb-3 w-100'
//                 //         />
        
//                 //         <label htmlFor="billingCity">City</label>
//                 //         <InputText
//                 //             id="billingCity"
//                 //             name="billingTo.city"
//                 //             onChange={formik.handleChange}
//                 //             value={formik.values.billingTo.city}
//                 //             className='mb-3 w-100'
//                 //         />
        
//                 //         <label htmlFor="billingState">State</label>
//                 //         <InputText
//                 //             id="billingState"
//                 //             name="billingTo.state"
//                 //             onChange={formik.handleChange}
//                 //             value={formik.values.billingTo.state}
//                 //             className='mb-3 w-100'
//                 //         />
        
//                 //         <label htmlFor="billingZipcode">Zipcode</label>
//                 //         <InputText
//                 //             id="billingZipcode"
//                 //             name="billingTo.zipcode"
//                 //             onChange={formik.handleChange}
//                 //             value={formik.values.billingTo.zipcode}
//                 //             className='mb-3 w-100'
//                 //         />
        
//                 //         <label htmlFor="billingCountry">Country</label>
//                 //         <InputText
//                 //             id="billingCountry"
//                 //             name="billingTo.country"
//                 //             onChange={formik.handleChange}
//                 //             value={formik.values.billingTo.country}
//                 //             className='mb-3 w-100'
//                 //         />
//                 //     </div>
        
//                 //     {/* Shipping Address */}
//                 //     <div>
//                 //         <h4>Shipping Address</h4>
//                 //         <label htmlFor="shippingStreet">Street</label>
//                 //         <InputText
//                 //             id="shippingStreet"
//                 //             name="shippingTo.street"
//                 //             onChange={formik.handleChange}
//                 //             value={formik.values.shippingTo.street}
//                 //             className='mb-3 w-100'
//                 //         />
        
//                 //         <label htmlFor="shippingCity">City</label>
//                 //         <InputText
//                 //             id="shippingCity"
//                 //             name="shippingTo.city"
//                 //             onChange={formik.handleChange}
//                 //             value={formik.values.shippingTo.city}
//                 //             className='mb-3 w-100'
//                 //         />
        
//                 //         <label htmlFor="shippingState">State</label>
//                 //         <InputText
//                 //             id="shippingState"
//                 //             name="shippingTo.state"
//                 //             onChange={formik.handleChange}
//                 //             value={formik.values.shippingTo.state}
//                 //             className='mb-3 w-100'
//                 //         />
        
//                 //         <label htmlFor="shippingZipcode">Zipcode</label>
//                 //         <InputText
//                 //             id="shippingZipcode"
//                 //             name="shippingTo.zipcode"
//                 //             onChange={formik.handleChange}
//                 //             value={formik.values.shippingTo.zipcode}
//                 //             className='mb-3 w-100'
//                 //         />
        
//                 //         <label htmlFor="shippingCountry">Country</label>
//                 //         <InputText
//                 //             id="shippingCountry"
//                 //             name="shippingTo.country"
//                 //             onChange={formik.handleChange}
//                 //             value={formik.values.shippingTo.country}
//                 //             className='mb-3 w-100'
//                 //         />
//                 //     </div>
        
//                 //     {/* Estimate Status Dropdown */}
//                 //     <div>
//                 //         <label htmlFor="estimateStatus">Estimate Status</label><br />
//                 //         <Dropdown
//                 //             id="estimateStatus"
//                 //             name="estimateStatus"
//                 //             options={estimateStatuses}
//                 //             onChange={(e) => formik.setFieldValue("estimateStatus", e.value)}
//                 //             value={formik.values.estimateStatus}
//                 //             placeholder="Select Estimate Status"
//                 //             className='mb-3 w-100'
//                 //         />
//                 //         {formik.touched.estimateStatus && formik.errors.estimateStatus && (
//                 //             <div className="error">{formik.errors.estimateStatus}</div>
//                 //         )}
//                 //     </div>
        
//                 //     {/* Adjustment Input */}
//                 //     <div>
//                 //         <label htmlFor="adjustment">Adjustment</label><br />
//                 //         <InputNumber
//                 //             id="adjustment"
//                 //             name="adjustment"
//                 //             onValueChange={(e) => formik.setFieldValue("adjustment", e.value)}
//                 //             value={formik.values.adjustment}
//                 //             className='mb-3 w-100'
//                 //         />
//                 //     </div>
        
//                 //     {/* Discount Input */}
//                 //     <div>
//                 //         <label htmlFor="discount">Discount</label><br />
//                 //         <InputNumber
//                 //             id="discount"
//                 //             name="discount"
//                 //             onValueChange={(e) => formik.setFieldValue("discount", e.value)}
//                 //             value={formik.values.discount}
//                 //             className='mb-3 w-100'
//                 //         />
//                 //     </div>
        
//                 //     {/* Terms and Conditions Input */}
//                 //     <div>
//                 //         <label htmlFor="termsAndConditions">Terms and Conditions</label><br />
//                 //         <InputTextarea
//                 //             id="termsAndConditions"
//                 //             name="termsAndConditions"
//                 //             onChange={formik.handleChange}
//                 //             value={formik.values.termsAndConditions}
//                 //             className='mb-3 w-100'
//                 //         />
//                 //     </div>
        
//                 //     {/* Estimate File Upload */}
//                 //     <div>
//                 //         <label htmlFor="estimateFile">Estimate File Upload</label><br />
//                 //         <input
//                 //             type="file"
//                 //             name="estimateFile"
//                 //             accept=".pdf, .doc, .docx, .rtf, .txt, .odt, .pages"
//                 //             id="estimateFile"
//                 //             onChange={(event) => {
//                 //                 formik.setFieldValue("estimateFile", event.currentTarget.files[0]);
//                 //             }}
//                 //             className='mb-3 w-100'
//                 //         />
//                 //         {formik.touched.estimateFile && formik.errors.estimateFile && (
//                 //             <div className="error">{formik.errors.estimateFile}</div>
//                 //         )}
//                 //     </div>
        
//                 //     <button type="submit" className="btn-all">Submit</button>
//                 // </form>
//             )
//         }
//         </>
//     );
// };

// export default EditItemForm;
'use client';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Col, Row } from 'react-bootstrap';

const ItemForm = ({ item, onSubmit }) => {
    console.log(item,"items??????????")
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
    }, []);

    const initialValues = {
        itemName:item?.itemName || '',
        description:item?.description || '',
        price:  item.price || '',
        quantity:  item?.quantity|| '',
        customFields: item ? item.customFields : [{ fieldName: '', fieldValue: '' }]
    };

    const validationSchema = Yup.object().shape({
        itemName: Yup.string().required('Item Name is required'),
        description: Yup.string().required('Description is required'),
        price: Yup.number().required('Price is required').positive('Price must be positive'),
        quantity: Yup.number().required('Quantity is required').positive('Quantity must be positive').integer('Quantity must be an integer'),
        customFields: Yup.array().of(
            Yup.object().shape({
                fieldName: Yup.string().required('Field Name is required'),
                fieldValue: Yup.string().required('Field Value is required')
            })
        )
    });

    const handleSubmit = async (values) => {
        onSubmit(values);
    };

    const addCustomField = (setFieldValue) => {
        setFieldValue('customFields', [...initialValues.customFields, { fieldName: '', fieldValue: '' }]);
    };

    return (
        <>
            {loading && (
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ values, setFieldValue }) => (
                        <Form>
                            <Row>
                                <Col>
                                    <div>
                                        <label htmlFor="itemName">Item Name</label>
                                        <br />
                                        <Field id="itemName" name="itemName" className="mb-3 w-100">
                                            {({ field }) => <InputText {...field} placeholder="Item Name" className="mb-3 w-100" />}
                                        </Field>
                                        <ErrorMessage name="itemName" component="div" />
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <label htmlFor="description">Description</label>
                                        <br />
                                        <Field id="description" name="description">
                                            {({ field }) => <InputText {...field} placeholder="Description" className="mb-3 w-100" />}
                                        </Field>
                                        <ErrorMessage name="description" component="div" />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div>
                                        <label htmlFor="price">Price</label>
                                        <br />
                                        <Field id="price" name="price">
                                            {({ field }) => <InputText {...field} type="number" placeholder="Price" className="mb-3 w-100" />}
                                        </Field>
                                        <ErrorMessage name="price" component="div" />
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                        <label htmlFor="quantity">Quantity</label>
                                        <br />
                                        <Field id="quantity" name="quantity">
                                            {({ field }) => <InputText {...field} type="number" placeholder="Quantity" className="mb-1 w-100" />}
                                        </Field>
                                        <ErrorMessage name="quantity" component="div" />
                                    </div>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <div>
                                        <div className="d-flex">
                                            <label className="my-auto">Add Custom Field</label>
                                            <Button className="btn-all m-3" type="button" icon="pi pi-plus-circle" onClick={() => addCustomField(setFieldValue)} style={{ height: '19px', width: '23px', borderRadius: '50%' }} />
                                        </div>

                                        {values?.customFields?.map((field, index) => (
                                            <div key={index}>
                                                <InputText
                                                    className="mb-3 w-100"
                                                    name={`customFields[${index}].fieldName`}
                                                    value={field.fieldName}
                                                    onChange={(e) => setFieldValue(`customFields[${index}].fieldName`, e.target.value)}
                                                    placeholder="Field Name"
                                                />
                                                <InputText
                                                    className="mb-3 w-100"
                                                    name={`customFields[${index}].fieldValue`}
                                                    value={field.fieldValue}
                                                    onChange={(e) => setFieldValue(`customFields[${index}].fieldValue`, e.target.value)}
                                                    placeholder="Field Value"
                                                />
                                                <ErrorMessage name={`customFields[${index}].fieldName`} component="div" />
                                                <ErrorMessage name={`customFields[${index}].fieldValue`} component="div" />
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                            </Row>

                            <Button type="submit" label={item ? 'Update Item' : 'Create Item'} className="btn-all" />
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );
};

export default ItemForm;
