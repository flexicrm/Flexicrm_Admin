// // // import { useFormik } from "formik";
// // // import * as Yup from "yup";
// // // import { InputText } from "primereact/inputtext";
// // // import { InputNumber } from "primereact/inputnumber";
// // // import { InputTextarea } from "primereact/inputtextarea";
// // // import { Dropdown } from "primereact/dropdown";

// // // const ExpenseForm = ({ onSubmit, expenses, customers, projectsOptions }) => {
// // //     const formik = useFormik({
// // //         initialValues: {
// // //             expenseId: expenses.expenseId,

// // //             customer: expenses.customer,
// // //             expenseSubject: expenses.expenseSubject,
// // //             description: expenses.description,
// // //             expenseBillUpload: expenses.expenseBillUpload, // File upload
// // //             Amount: expenses.Amount,
// // //             paymentStatus: expenses.paymentStatus, // Default payment status
// // //             paymentMethod: expenses.paymentMethod,
// // //             tags: expenses.tags,
// // //             date: expenses.date, // Date field
// // //             project: expenses.project, // Project field
// // //         },
// // //         validationSchema: Yup.object({
// // //             // customerId: Yup.string().required("Customer is required"),
// // //             expenseSubject: Yup.string().required("Expense subject is required"),
// // //             description: Yup.string().required("Description is required"),
// // //             Amount: Yup.number().required("Amount is required").positive("Amount must be positive"),
// // //             paymentMethod: Yup.string().required("Payment method is required"),
// // //             date: Yup.date().required("Date is required").nullable(),
// // //             project: Yup.string().required("Project is required"),
// // //         }),
// // //         onSubmit: (values) => {
// // //             const formData = new FormData();
// // //             Object.keys(values).forEach((key) => {
// // //                 formData.append(key, values[key]);
// // //             });
// // //             onSubmit(formData);
// // //         },
// // //     });

// // //     return (
// // //         <form onSubmit={formik.handleSubmit}>
// // //             <div>
// // //                 <label htmlFor="customer">Customer</label><br />
// // //                 <Dropdown
// // //                     id="customer"
// // //                     name="customer"
// // //                     options={customers}
// // //                     onChange={(e) => formik.setFieldValue("customer", e.value)}
// // //                     value={formik.values.customer}
// // //                     placeholder="Select a Customer"
// // //                 />
// // //                 {formik.touched.customer && formik.errors.customer && (
// // //                     <div className="error">{formik.errors.customer}</div>
// // //                 )}
// // //             </div>

// // //             <div>
// // //                 <label htmlFor="expenseSubject">Expense Subject</label><br />
// // //                 <InputText
// // //                     id="expenseSubject"
// // //                     name="expenseSubject"
// // //                     onChange={formik.handleChange}
// // //                     onBlur={formik.handleBlur}
// // //                     value={formik.values.expenseSubject}
// // //                 />
// // //                 {formik.touched.expenseSubject && formik.errors.expenseSubject && (
// // //                     <div className="error">{formik.errors.expenseSubject}</div>
// // //                 )}
// // //             </div>

// // //             <div>
// // //                 <label htmlFor="description">Description</label><br />
// // //                 <InputTextarea
// // //                     id="description"
// // //                     name="description"
// // //                     onChange={formik.handleChange}
// // //                     value={formik.values.description}
// // //                 />
// // //                 {formik.touched.description && formik.errors.description && (
// // //                     <div className="error">{formik.errors.description}</div>
// // //                 )}
// // //             </div>

// // //             <div>
// // //                 <label htmlFor="Amount">Amount</label><br />
// // //                 <InputNumber
// // //                     id="Amount"
// // //                     name="Amount"
// // //                     onValueChange={(e) => formik.setFieldValue("Amount", e.value)}
// // //                     value={formik.values.Amount}
// // //                 />
// // //                 {formik.touched.Amount && formik.errors.Amount && (
// // //                     <div className="error">{formik.errors.Amount}</div>
// // //                 )}
// // //             </div>

// // //             <div>
// // //                 <label htmlFor="expenseBillUpload">Expense Bill Upload</label><br />
// // //                 <input
// // //                     type="file"
// // //                     name="expenseBillUpload"
// // //                     onChange={(event) => {
// // //                         formik.setFieldValue("expenseBillUpload", event.currentTarget.files[0]);
// // //                     }}
// // //                 />
// // //                 {formik.touched.expenseBillUpload && formik.errors.expenseBillUpload && (
// // //                     <div className="error">{formik.errors.expenseBillUpload}</div>
// // //                 )}
// // //             </div>

// // //             <div>
// // //                 <label htmlFor="paymentMethod">Payment Method</label><br />
// // //                 <InputText
// // //                     id="paymentMethod"
// // //                     name="paymentMethod"
// // //                     onChange={formik.handleChange}
// // //                     value={formik.values.paymentMethod}
// // //                 />
// // //                 {formik.touched.paymentMethod && formik.errors.paymentMethod && (
// // //                     <div className="error">{formik.errors.paymentMethod}</div>
// // //                 )}
// // //             </div>

// // //             <div>
// // //                 <label htmlFor="paymentStatus">Payment Status</label><br />
// // //                 <select
// // //                     id="paymentStatus"
// // //                     name="paymentStatus"
// // //                     onChange={formik.handleChange}
// // //                     value={formik.values.paymentStatus}
// // //                 >
// // //                     <option value="Pending">Pending</option>
// // //                     <option value="Paid">Paid</option>
// // //                     <option value="Partial">Partial</option>
// // //                 </select>
// // //             </div>

// // //             <div>
// // //                 <label htmlFor="date">Date</label><br />
// // //                 <InputText
// // //                     id="date"
// // //                     type="date"
// // //                     name="date"
// // //                     onChange={formik.handleChange}
// // //                     onBlur={formik.handleBlur}
// // //                     value={formik.values.date}
// // //                 />
// // //                 {formik.touched.date && formik.errors.date && (
// // //                     <div className="error">{formik.errors.date}</div>
// // //                 )}
// // //             </div>

// // //             <div>
// // //                 <label htmlFor="project">Project</label><br />
// // //                 <Dropdown
// // //                     id="project"
// // //                     name="project"
// // //                     options={projectsOptions}
// // //                     onChange={(e) => formik.setFieldValue("project", e.value)}
// // //                     value={formik.values.project}
// // //                     placeholder="Select a Project"
// // //                 />
// // //                 {formik.touched.project && formik.errors.project && (
// // //                     <div className="error">{formik.errors.project}</div>
// // //                 )}
// // //             </div>

// // //             <button type="submit">Submit</button>
// // //         </form>
// // //     );
// // // };

// // // export default ExpenseForm;;
// // import { useFormik } from "formik";
// // import * as Yup from "yup";
// // import { InputText } from "primereact/inputtext";
// // import { InputNumber } from "primereact/inputnumber";
// // import { InputTextarea } from "primereact/inputtextarea";
// // import { Dropdown } from "primereact/dropdown";
// // import { Chips } from "primereact/chips";
// // import { Calendar } from "primereact/calendar";
// // import { Button } from "primereact/button";

// // const EditEstimateForm = ({ onSubmit, estimate, customers, projects }) => {
// //     console.log(estimate, "estimate===========>")
// //     console.log(projects, "projectsOptions")

// //     const formatDate = (date) => {
// //         return new Date(date);
// //     };
// //     const currencies = [
// //         { label: "USD", value: "USD" },
// //         { label: "EUR", value: "EUR" },
// //         { label: "GBP", value: "GBP" },
// //     ];

// //     const estimateStatuses = [
// //         { label: "Draft", value: "Draft" },
// //         { label: "Sent", value: "Sent" },
// //         { label: "Accepted", value: "Accepted" },
// //         { label: "Rejected", value: "Rejected" },
// //     ];
// //     const formik = useFormik({
// //         initialValues: {
// //             customer: estimate?.customer?._id || null,
// //             project: estimate.project._id || null,
// //             billingTo: {
// //                 street: estimate.billingTo?.street || '',
// //                 city: estimate.billingTo?.city || '',
// //                 state: estimate.billingTo?.state || '',
// //                 zipcode: estimate.billingTo?.zipcode || '',
// //                 country: estimate.billingTo?.country || '',
// //             },
// //             shippingTo: {
// //                 street: estimate.shippingTo?.street || '',
// //                 city: estimate.shippingTo?.city || '',
// //                 state: estimate.shippingTo?.state || '',
// //                 zipcode: estimate.shippingTo?.zipcode || '',
// //                 country: estimate.shippingTo?.country || '',
// //             },
// //             estimationNo: estimate.estimationNo || '',
// //             description: estimate.description || '',
// //             estimateDate: estimate.estimateDate ? formatDate(estimate.estimateDate) : null,
// //             expireDate: estimate.expireDate ? formatDate(estimate.expireDate) : null,
// //             total: estimate.total || 0,
// //             currency: estimate.currency || '',
// //             estimateStatus: estimate.estimateStatus || '',
// //             adjustment: 0,
// //             discount: 0,
// //             termsAndConditions: "",
// //             estimateFile: null,
// //             tags: []
// //         },
// //         validationSchema: Yup.object({
// //             // customer: Yup.string().required("Customer is required"),
// //             project: Yup.string().required("Project is required"),
// //             description: Yup.string().required("Description is required"),
// //             estimateDate: Yup.date().required("Estimate date is required").nullable(),
// //             total: Yup.number().required("Total is required").positive("Total must be positive"),
// //             currency: Yup.string().required("Currency is required"),
// //             estimateStatus: Yup.string().required("Estimate status is required"),
// //             // estimateFile: Yup.mixed().required("Estimate file is required"), // Updated line
// //         }),
// //         onSubmit: (values) => {
// //             console.log('Form Values:', values); // Debugging line
// //             const formData = new FormData();
// //             Object.keys(values).forEach((key) => {
// //                 if (typeof values[key] === "object" && values[key] !== null) {
// //                     Object.keys(values[key]).forEach((subKey) => {
// //                         formData.append(`${key}[${subKey}]`, values[key][subKey]);
// //                     });
// //                 } else {
// //                     formData.append(key, values[key]);
// //                 }
// //             });
// //             console.log('FormData:', formData); // Debugging line
// //             onSubmit(formData);
// //         },

// //     });

// //     // Example of using setValues method
// //     const handleReset = () => {
// //         formik.setValues({
// //             expenseId: '',
// //             customer: null,
// //             expenseSubject: '',
// //             description: '',
// //             expenseBillUpload: null,
// //             Amount: '',
// //             paymentStatus: 'Pending',
// //             paymentMethod: '',
// //             tags: [],
// //             date: null,
// //             project: null,
// //             tags: []
// //         });
// //     };

// //     return (
// //         <form onSubmit={formik.handleSubmit}>
// //             <div>
// //                 <label> Tags</label> <br />
// //                 <Chips
// //                     name="tags"
// //                     value={formik.values.tags}
// //                     onChange={formik.handleChange} />
// //             </div>

// //             {/* Project Dropdown */}
// //             {/* <div>
// //                 <label htmlFor="project">Project</label><br />
// //                 <Dropdown
// //                     id="project"
// //                     name="project"
// //                     options={projects}
// //                     onChange={(e) => formik.setFieldValue("project", e.value)}
// //                     value={formik.values.project}
// //                     placeholder="Select a Project"
// //                 />
// //                 {formik.touched.project && formik.errors.project && (
// //                     <div className="error">{formik.errors.project}</div>
// //                 )}
// //             </div> */}
// //             <div>
// //                 <label htmlFor="project">Project</label><br />
// //                 <Dropdown
// //                     id="project"
// //                     name="project"
// //                     optionLabel="label" // Adjust to match your data structure
// //                     optionValue="value"
// //                     options={projects}
// //                     onChange={(e) => formik.setFieldValue("project", e.value)}
// //                     value={formik.values.project}
// //                     placeholder="Select a Project"
// //                 />
// //                 {formik.touched.project && formik.errors.project && (
// //                     <div className="error">{formik.errors.project}</div>
// //                 )}
// //             </div>
// //             {/* Estimation Number Input */}
// //             <div className="p-field">
// //                 <label htmlFor="estimationNo">Estimation Number</label><br />
// //                 <InputText
// //                     id="estimationNo"
// //                     name="estimationNo"
// //                     value={formik.values.estimationNo}
// //                     onChange={formik.handleChange}
// //                 />
// //                 {formik.touched.estimationNo && formik.errors.estimationNo && (
// //                     <div className="error">{formik.errors.estimationNo}</div>
// //                 )}
// //             </div>

// //             {/* Estimate Date Input */}
// //             <div>
// //                 <label htmlFor="estimateDate">Estimate Date</label><br />
// //                 <Calendar
// //                     id="estimateDate"
// //                     type="date"
// //                     name="estimateDate"
// //                     onChange={formik.handleChange}
// //                     onBlur={formik.handleBlur}
// //                     value={formik.values.estimateDate}
// //                     showIcon
// //                 />
// //                 {formik.touched.estimateDate && formik.errors.estimateDate && (
// //                     <div className="error">{formik.errors.estimateDate}</div>
// //                 )}
// //             </div>
// //             <div>
// //                 <label htmlFor="expireDate">Estimate Date</label><br />
// //                 <Calendar
// //                     id="expireDate"
// //                     type="date"
// //                     name="expireDate"
// //                     onChange={formik.handleChange}
// //                     onBlur={formik.handleBlur}
// //                     value={formik.values.expireDate}
// //                     showIcon
// //                 />
// //                 {formik.touched.expireDate && formik.errors.expireDate && (
// //                     <div className="error">{formik.errors.expireDate}</div>
// //                 )}
// //             </div>

// //             {/* Total Input */}
// //             <div>
// //                 <label htmlFor="total">Total</label><br />
// //                 <InputNumber
// //                     id="total"
// //                     name="total"
// //                     onValueChange={(e) => formik.setFieldValue("total", e.value)}
// //                     value={formik.values.total}
// //                 />
// //                 {formik.touched.total && formik.errors.total && (
// //                     <div className="error">{formik.errors.total}</div>
// //                 )}
// //             </div>

// //             {/* Currency Dropdown */}
// //             <div>
// //                 <label htmlFor="currency">Currency</label><br />
// //                 <Dropdown
// //                     id="currency"
// //                     name="currency"
// //                     options={currencies}
// //                     onChange={(e) => formik.setFieldValue("currency", e.value)}
// //                     value={formik.values.currency}
// //                     placeholder="Select a Currency"
// //                 />
// //                 {formik.touched.currency && formik.errors.currency && (
// //                     <div className="error">{formik.errors.currency}</div>
// //                 )}
// //             </div>

// //             {/* Billing Address */}
// //             <div>
// //                 <div>

// //                     <h4>Billing Address</h4>
// //                     <label htmlFor="billingStreet">Street</label><br />
// //                     <InputText
// //                         id="billingStreet"
// //                         name="billingTo.street"
// //                         onChange={formik.handleChange}
// //                         value={formik.values.billingTo.street}
// //                     />
// //                 </div>
// //                 <div>

// //                     <label htmlFor="billingCity">City</label><br />
// //                     <InputText
// //                         id="billingCity"
// //                         name="billingTo.city"
// //                         onChange={formik.handleChange}
// //                         value={formik.values.billingTo.city}
// //                     />
// //                 </div>

// //                 <div>

// //                     <label htmlFor="billingState">State</label><br />
// //                     <InputText
// //                         id="billingState"
// //                         name="billingTo.state"
// //                         onChange={formik.handleChange}
// //                         value={formik.values.billingTo.state}
// //                     />
// //                 </div>
// //                 <div>

// //                     <label htmlFor="billingZipcode">Zipcode</label><br />
// //                     <InputText
// //                         id="billingZipcode"
// //                         name="billingTo.zipcode"
// //                         onChange={formik.handleChange}
// //                         value={formik.values.billingTo.zipcode}
// //                     />
// //                 </div>
// //                 <div>

// //                     <label htmlFor="billingCountry">Country</label><br />
// //                     <InputText
// //                         id="billingCountry"
// //                         name="billingTo.country"
// //                         onChange={formik.handleChange}
// //                         value={formik.values.billingTo.country}
// //                     />
// //                 </div>
// //             </div>

// //             {/* Shipping Address */}
// //             <div>
// //                 <div>

// //                     <h4>Shipping Address</h4>
// //                     <label htmlFor="shippingStreet">Street</label><br />
// //                     <InputText
// //                         id="shippingStreet"
// //                         name="shippingTo.street"
// //                         onChange={formik.handleChange}
// //                         value={formik.values.shippingTo.street}
// //                     />
// //                 </div>
// //                 <div>

// //                     <label htmlFor="shippingCity">City</label><br />
// //                     <InputText
// //                         id="shippingCity"
// //                         name="shippingTo.city"
// //                         onChange={formik.handleChange}
// //                         value={formik.values.shippingTo.city}
// //                     />
// //                 </div>
// //                 <div>

// //                     <label htmlFor="shippingState">State</label><br />
// //                     <InputText
// //                         id="shippingState"
// //                         name="shippingTo.state"
// //                         onChange={formik.handleChange}
// //                         value={formik.values.shippingTo.state}
// //                     />
// //                 </div>
// //                 <div>

// //                     <label htmlFor="shippingZipcode">Zipcode</label><br />
// //                     <InputText
// //                         id="shippingZipcode"
// //                         name="shippingTo.zipcode"
// //                         onChange={formik.handleChange}
// //                         value={formik.values.shippingTo.zipcode}
// //                     />
// //                 </div>
// //                 <div>
// //                     <label htmlFor="shippingCountry">Country</label><br />
// //                     <InputText
// //                         id="shippingCountry"
// //                         name="shippingTo.country"
// //                         onChange={formik.handleChange}
// //                         value={formik.values.shippingTo.country}
// //                     />

// //                 </div>
// //             </div>

// //             {/* Estimate Status Dropdown */}
// //             <div>
// //                 <label htmlFor="estimateStatus">Estimate Status</label><br />
// //                 <Dropdown
// //                     id="estimateStatus"
// //                     name="estimateStatus"
// //                     options={estimateStatuses}
// //                     onChange={(e) => formik.setFieldValue("estimateStatus", e.value)}
// //                     value={formik.values.estimateStatus}
// //                     placeholder="Select Estimate Status"
// //                 />
// //                 {formik.touched.estimateStatus && formik.errors.estimateStatus && (
// //                     <div className="error">{formik.errors.estimateStatus}</div>
// //                 )}
// //             </div>

// //             {/* Adjustment Input */}
// //             <div>
// //                 <label htmlFor="adjustment">Adjustment</label><br />
// //                 <InputNumber
// //                     id="adjustment"
// //                     name="adjustment"
// //                     onValueChange={(e) => formik.setFieldValue("adjustment", e.value)}
// //                     value={formik.values.adjustment}
// //                 />
// //             </div>

// //             {/* Discount Input */}
// //             <div>
// //                 <label htmlFor="discount">Discount</label><br />
// //                 <InputNumber
// //                     id="discount"
// //                     name="discount"
// //                     onValueChange={(e) => formik.setFieldValue("discount", e.value)}
// //                     value={formik.values.discount}
// //                 />
// //             </div>

// //             {/* Terms and Conditions Input */}
// //             <div>
// //                 <label htmlFor="termsAndConditions">Terms and Conditions</label><br />
// //                 <InputTextarea
// //                     id="termsAndConditions"
// //                     name="termsAndConditions"
// //                     onChange={formik.handleChange}
// //                     value={formik.values.termsAndConditions}
// //                 />
// //             </div>

// //             {/* Estimate File Upload */}
// //             <div>
// //                 <label htmlFor="estimateFile">Estimate File Upload</label><br />
// //                 <input
// //                     type="file"
// //                     name="estimateFile"
// //                     accept=".pdf, .doc, .docx, .rtf, .txt, .odt, .pages"
// //                     id="estimateFile"
// //                     onChange={(event) => {
// //                         formik.setFieldValue("estimateFile", event.currentTarget.files[0]);
// //                     }}
// //                 />
// //                 {formik.touched.estimateFile && formik.errors.estimateFile && (
// //                     <div className="error">{formik.errors.estimateFile}</div>
// //                 )}
// //             </div>
// //             {/* Description Input */}
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
// //             <Button type="submit">Submit</Button>
// //         </form>
// //     );
// // };

// // export default EditEstimateForm;
// 'use client';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { InputText } from 'primereact/inputtext';
// import { InputNumber } from 'primereact/inputnumber';
// import { InputTextarea } from 'primereact/inputtextarea';
// import { Dropdown } from 'primereact/dropdown';
// import { Calendar } from 'primereact/calendar';
// import { Chips } from 'primereact/chips';
// import { MultiSelect } from 'primereact/multiselect';
// // import userContext from '@/app/UseContext/UseContext';
// import { useContext, useMemo, useState } from 'react';
// import Itempage from './itempage';
// import { Button } from 'primereact/button';
// import { Col, Row } from 'react-bootstrap';
// import userContext from '../../../../../UseContext/UseContext';
// import { Editor } from 'primereact/editor';

// const currencies = [
//     { label: 'USD', value: 'USD' },
//     { label: 'EUR', value: 'EUR' },
//     { label: 'GBP', value: 'GBP' }
// ];

// const EstimateForm = ({ onSubmit, customers, projects, item, initialValues }) => {
//     const { subtotals, finalTotals, discounts } = useContext(userContext);
//     const itemOptions = useMemo(() => {
//         return Array.isArray(item) ? item.map((i) => ({ label: i.itemName, value: i._id })) : [];
//     }, [item]);

//     const [selectedItem, setSelectedItem] = useState(initialValues?.items || []);

//     const formik = useFormik({
//         initialValues: {
//             customer: initialValues.customer || customers._id || '',
//             project: initialValues?.project?._id || '',
//             billingTo: initialValues.billingTo || {
//                 street: '',
//                 city: '',
//                 state: '',
//                 zipcode: '',
//                 country: ''
//             },
//             shippingTo: initialValues.shippingTo || {
//                 street: '',
//                 city: '',
//                 state: '',
//                 zipcode: '',
//                 country: ''
//             },
//             description: initialValues.description || '',
//             estimateDate: initialValues.estimateDate ? new Date(initialValues.estimateDate) : null,
//             expireDate: initialValues.expireDate ? new Date(initialValues.expireDate) : null,
//             currency: initialValues.currency || '',
//             estimateStatus: initialValues.estimateStatus || 'Draft',
//             adjustment: initialValues.adjustment || 0,
//             termsAndConditions: initialValues.termsAndConditions || '',
//             estimateFile: null,
//             tags: initialValues.tags || [],
//             items: initialValues.items || []
//         },
//         validationSchema: Yup.object({
//             // Add your validation rules here if needed
//         }),
//         onSubmit: (values) => {
//             const formData = new FormData();
//             const formattedValues = {
//                 ...values,
//                 estimateDate: values.estimateDate ? values.estimateDate.toISOString() : null,
//                 expireDate: values.expireDate ? values.expireDate.toISOString() : null,
//                 discount: discounts,
//                 total: finalTotals,
//                 subTotal: subtotals,
//                 items: selectedItem.map((itemId) => itemId)
//             };

//             Object.keys(formattedValues).forEach((key) => {
//                 if (typeof formattedValues[key] === 'object' && formattedValues[key] !== null) {
//                     Object.keys(formattedValues[key]).forEach((subKey) => {
//                         formData.append(`${key}[${subKey}]`, formattedValues[key][subKey]);
//                     });
//                 } else {
//                     formData.append(key, formattedValues[key]);
//                 }
//             });

//             if (values.estimateFile) {
//                 formData.append('estimateFile', values.estimateFile);
//             }

//             onSubmit(formData);
//         }
//     });

//     return (
//         <div>
//             <form onSubmit={formik.handleSubmit}>
//                 <Row>
//                     <Col>
//                         <div>
//                             <label htmlFor="estimateFile">Upload Estimate File</label>
//                             <br />
//                             <input
//                                 id="estimateFile"
//                                 name="estimateFile"
//                                 type="file"
//                                 className="w-100 mb-4"
//                                 onChange={(event) => {
//                                     formik.setFieldValue('estimateFile', event.currentTarget.files[0]);
//                                 }}
//                             />
//                         </div>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col>
//                         <div>
//                             <label>Tags</label>
//                             <br />
//                             <Chips name="tags" value={formik.values.tags} className="w-100 mb-4" onChange={(e) => formik.setFieldValue('tags', e.value)} />
//                         </div>
//                     </Col>
//                     <Col>
//                         {/* <div>
//                             <label htmlFor="project">Project</label><br />
//                             <Dropdown
//                                 id="project"
//                                 name="project"
//                                 options={projects}
//                                 onChange={(e) => formik.setFieldValue("project", e.value)}
//                                 value={formik.values.project}
//                                 placeholder="Select a Project"
//                             />
//                             {formik.touched.project && formik.errors.project && typeof formik.errors.project === "string" && (
//                                 <div className="error">{formik.errors.project}</div>
//                             )}
//                         </div> */}
//                         <div>
//                             <label htmlFor="project">Project</label>
//                             <br />
//                             <Dropdown
//                                 id="project"
//                                 name="project"
//                                 optionLabel="label" // Adjust to match your data structure
//                                 optionValue="value"
//                                 options={projects}
//                                 className="w-100 mb-4"
//                                 onChange={(e) => formik.setFieldValue('project', e.value)}
//                                 value={formik.values.project}
//                                 placeholder="Select a Project"
//                             />
//                             {formik.touched.project && formik.errors.project && typeof formik.errors.project === 'string' && <div className="error">{formik.errors.project}</div>}
//                         </div>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col>
//                         <div>
//                             <label htmlFor="estimateDate">Estimate Date</label>
//                             <br />
//                             <Calendar id="estimateDate" className="w-100 mb-4" name="estimateDate" onChange={(e) => formik.setFieldValue('estimateDate', e.value)} onBlur={formik.handleBlur} value={formik.values.estimateDate} showIcon />
//                             {formik.touched.estimateDate && typeof formik.errors.estimateDate === 'string' && <div className="error">{formik.errors.estimateDate}</div>}
//                         </div>
//                     </Col>
//                     <Col>
//                         <div>
//                             <label htmlFor="expireDate">Expire Date</label>
//                             <br />
//                             <Calendar id="expireDate" className="w-100 mb-4" name="expireDate" onChange={(e) => formik.setFieldValue('expireDate', e.value)} onBlur={formik.handleBlur} value={formik.values.expireDate} showIcon />
//                             {formik.touched.expireDate && typeof formik.errors.expireDate === 'string' && <div className="error">{formik.errors.expireDate}</div>}
//                         </div>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col>
//                         <div>
//                             <label htmlFor="currency">Currency</label>
//                             <br />
//                             <Dropdown id="currency" className="w-100 mb-4" name="currency" options={currencies} onChange={(e) => formik.setFieldValue('currency', e.value)} value={formik.values.currency} placeholder="Select a Currency" />
//                             {formik.touched.currency &&
//                                 typeof formik.errors.currency === 'string' &&
//                                 <div className="error">{formik.errors.currency}</div>
//                             }
//                         </div>
//                     </Col>
//                     <Col>
//                         <div>
//                             <label htmlFor="adjustment">Adjustment</label>
//                             <br />
//                             <InputNumber id="adjustment" className="w-100 mb-4" name="adjustment" onValueChange={(e) => formik.setFieldValue('adjustment', e.value)} value={formik.values.adjustment} />
//                         </div>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col>
//                         <div>
//                             <label htmlFor="termsAndConditions">Terms and Conditions</label>
//                             <br />
//                             <InputTextarea id="termsAndConditions" className="w-100 mb-4" name="termsAndConditions" onChange={formik.handleChange} value={formik.values.termsAndConditions} />
//                         </div>
//                     </Col>
//                     <Col>
//                         <div>
//                             <label htmlFor="description">Description</label>
//                             <br />
//                             <Editor id="description" className="w-100 mb-4" name="description" onChange={formik.handleChange} value={formik.values.description} />
//                         </div>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col>
//                         <div>
//                             <h4>Billing Address</h4>
//                             <br />
//                             {['street', 'city', 'state', 'zipcode', 'country'].map((field) => (
//                                 <div key={field}>
//                                     <label htmlFor={`billing${field.charAt(0).toUpperCase() + field.slice(1)}`}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
//                                     <br />
//                                     <InputText id={`billing${field.charAt(0).toUpperCase() + field.slice(1)}`} name={`billingTo.${field}`} onChange={formik.handleChange} value={formik.values.billingTo[field]} className="w-100 mb-4" />
//                                 </div>
//                             ))}
//                         </div>
//                     </Col>
//                     <Col>
//                         <div>
//                             <h4>Shipping Address</h4>
//                             <br />
//                             {['street', 'city', 'state', 'zipcode', 'country'].map((field) => (
//                                 <div key={field}>
//                                     <label htmlFor={`shipping${field.charAt(0).toUpperCase() + field.slice(1)}`}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
//                                     <br />
//                                     <InputText id={`shipping${field.charAt(0).toUpperCase() + field.slice(1)}`} name={`shippingTo.${field}`} onChange={formik.handleChange} value={formik.values.shippingTo[field]} className="w-100 mb-4" />
//                                 </div>
//                             ))}
//                         </div>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col>
//                         <div>
//                             <label htmlFor="items">Select Items:</label>
//                             <br />
//                             <MultiSelect
//                                 id="items"
//                                 name="items"
//                                 options={itemOptions}
//                                 value={selectedItem}
//                                 onChange={(e) => {
//                                     setSelectedItem(e.value);
//                                     formik.setFieldValue('items', e.value);
//                                 }}
//                                 placeholder="Select Items"
//                                 className="w-100 mb-4"
//                             />
//                         </div>
//                     </Col>
//                     <Col>{selectedItem.length > 0 && <Itempage selectedItem={selectedItem} />}</Col>
//                 </Row>
//                 <Button type="submit" className="btn-all mt-2">
//                     Submit
//                 </Button>
//             </form>
//         </div>
//     );
// };

// export default EstimateForm;
import React from 'react'

export default function EditestimateForm() {
  return (
    <div>EditestimateForm</div>
  )
}
