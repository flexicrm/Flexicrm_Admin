// "use client";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { InputText } from "primereact/inputtext";
// import { InputNumber } from "primereact/inputnumber";
// import { InputTextarea } from "primereact/inputtextarea";
// import { Dropdown } from "primereact/dropdown";
// import { Calendar } from "primereact/calendar";
// import { Chips } from "primereact/chips";
// import { Col, Row } from "react-bootstrap";

// const currencies = [
//     { label: "USD", value: "USD" },
//     { label: "EUR", value: "EUR" },
//     { label: "GBP", value: "GBP" },
// ];

// const estimateStatuses = [
//     { label: "Draft", value: "Draft" },
//     { label: "Sent", value: "Sent" },
//     { label: "Accepted", value: "Accepted" },
//     { label: "Rejected", value: "Rejected" },
// ];

// const EstimateForm = ({ onSubmit, customers, projects }) => {
//     console.log(customers, "customer")
//     const formik = useFormik({
//         initialValues: {
//             customer: "", // Ensure there's a fallback
//             project: "",
//             billingTo: {
//                 street: "",
//                 city: "",
//                 state: "",
//                 zipcode: "",
//                 country: "",
//             },
//             shippingTo: {
//                 street: "",
//                 city: "",
//                 state: "",
//                 zipcode: "",
//                 country: "",
//             },
//             description: "",
//             estimateDate: null,
//             expireDate: null,
//             total: 0,
//             currency: "",
//             estimateStatus: "Draft",
//             adjustment: 0,
//             discount: 0,
//             termsAndConditions: "",
//             estimateFile: null,
//             tags: [],
//         },

//         onSubmit: (values) => {
//             const formData = new FormData();

//             // Append other form fields
//             const formattedValues = {
//                 ...values,
//                 estimateDate: values.estimateDate ? values.estimateDate.toISOString() : null,
//                 expireDate: values.expireDate ? values.expireDate.toISOString() : null,
//             };

//             Object.keys(formattedValues).forEach((key) => {
//                 if (typeof formattedValues[key] === "object" && formattedValues[key] !== null) {
//                     Object.keys(formattedValues[key]).forEach((subKey) => {
//                         formData.append(`${key}[${subKey}]`, formattedValues[key][subKey]);
//                     });
//                 } else {
//                     formData.append(key, formattedValues[key]);
//                 }
//             });

//             if (values.estimateFile) {
//                 formData.append("estimateFile", values.estimateFile);
//             }

//             for (let pair of formData.entries()) {
//                 console.log(pair[0] + ': ' + pair[1]);
//             }

//             onSubmit(formData);
//         },

//     });
//     console.log(formik, "formik")
//     return (
//         <form onSubmit={formik.handleSubmit}>
//             <div>
//                 <label>Tags</label><br />
//                 <Chips
//                     name="tags"
//                     value={formik.values.tags}
//                     onChange={(e) => formik.setFieldValue("tags", e.value)}
//                 />
//             </div>

//             {/* Project Dropdown */}
//             <div>
//                 <label htmlFor="project">Project</label><br />
//                 <Dropdown
//                     id="project"
//                     name="project"
//                     options={projects}
//                     onChange={(e) => formik.setFieldValue("project", e.value)}
//                     value={formik.values.project}
//                     placeholder="Select a Project"
//                 />
//                 {formik.touched.project && formik.errors.project && (
//                     <div className="error">{formik.errors.project}</div>
//                 )}
//             </div>
//             <div>
//                 <label htmlFor="project">customer</label><br />
//                 <Dropdown
//                     id="customer"
//                     name="customer"
//                     options={customers}
//                     onChange={(e) => formik.setFieldValue("customer", e.value)}
//                     value={formik.values.customer}
//                     placeholder="Select a Project"
//                 />
//                 {formik.touched.customer && formik.errors.customer && (
//                     <div className="error">{formik.errors.customer}</div>
//                 )}
//             </div>

//             {/* Description Input */}
//             <div>
//                 <label htmlFor="description">Description</label><br />
//                 <InputTextarea
//                     id="description"
//                     name="description"
//                     onChange={formik.handleChange}
//                     value={formik.values.description}
//                 />
//                 {formik.touched.description && formik.errors.description && (
//                     <div className="error">{formik.errors.description}</div>
//                 )}
//             </div>

//             {/* Estimate Date Input */}
//             <div>
//                 <label htmlFor="estimateDate">Estimate Date</label><br />
//                 <Calendar
//                     id="estimateDate"
//                     type="date"
//                     name="estimateDate"
//                     onChange={(e) => formik.setFieldValue("estimateDate", e.value)}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.estimateDate}
//                     showIcon
//                 />
//                 {formik.touched.estimateDate && formik.errors.estimateDate && (
//                     <div className="error">{formik.errors.estimateDate}</div>
//                 )}
//             </div>

//             {/* Expire Date Input */}
//             <div>
//                 <label htmlFor="expireDate">Expire Date</label><br />
//                 <Calendar
//                     id="expireDate"
//                     type="date"
//                     name="expireDate"
//                     onChange={(e) => formik.setFieldValue("expireDate", e.value)}
//                     onBlur={formik.handleBlur}
//                     value={formik.values.expireDate}
//                     showIcon
//                 />
//                 {formik.touched.expireDate && formik.errors.expireDate && (
//                     <div className="error">{formik.errors.expireDate}</div>
//                 )}
//             </div>

//             {/* Total Input */}
//             <div>
//                 <label htmlFor="total">Total</label><br />
//                 <InputNumber
//                     id="total"
//                     name="total"
//                     onValueChange={(e) => formik.setFieldValue("total", e.value)}
//                     value={formik.values.total}
//                 />
//                 {formik.touched.total && formik.errors.total && (
//                     <div className="error">{formik.errors.total}</div>
//                 )}
//             </div>

//             {/* Currency Dropdown */}
//             <div>
//                 <label htmlFor="currency">Currency</label><br />
//                 <Dropdown
//                     id="currency"
//                     name="currency"
//                     options={currencies}
//                     onChange={(e) => formik.setFieldValue("currency", e.value)}
//                     value={formik.values.currency}
//                     placeholder="Select a Currency"
//                 />
//                 {formik.touched.currency && formik.errors.currency && (
//                     <div className="error">{formik.errors.currency}</div>
//                 )}
//             </div>

//             {/* Billing Address */}

//             {/* Shipping Address */}
//             <Row>
//                 <Col><div>
//                     <h4>Billing Address</h4>
//                     <div>

//                         <label htmlFor="billingStreet">Street</label><br />
//                         <InputText
//                             id="billingStreet"
//                             name="billingTo.street"
//                             onChange={formik.handleChange}
//                             value={formik.values.billingTo.street}
//                         />
//                     </div>
//                     <div>

//                         <label htmlFor="billingCity">City</label><br />
//                         <InputText
//                             id="billingCity"
//                             name="billingTo.city"
//                             onChange={formik.handleChange}
//                             value={formik.values.billingTo.city}
//                         />
//                     </div>
//                     <div>

//                         <label htmlFor="billingState">State</label><br />
//                         <InputText
//                             id="billingState"
//                             name="billingTo.state"
//                             onChange={formik.handleChange}
//                             value={formik.values.billingTo.state}
//                         />
//                     </div>
//                     <div>

//                         <label htmlFor="billingZipcode">Zipcode</label><br />
//                         <InputText
//                             id="billingZipcode"
//                             name="billingTo.zipcode"
//                             onChange={formik.handleChange}
//                             value={formik.values.billingTo.zipcode}
//                         />
//                     </div>
//                     <div>

//                         <label htmlFor="billingCountry">Country</label><br />
//                         <InputText
//                             id="billingCountry"
//                             name="billingTo.country"
//                             onChange={formik.handleChange}
//                             value={formik.values.billingTo.country}
//                         />
//                     </div>
//                 </div>
//                 </Col>
//                 <Col> <div>
//                     <h4>Shipping Address</h4>
//                     <div>

//                         <label htmlFor="shippingStreet">Street</label><br />
//                         <InputText
//                             id="shippingStreet"
//                             name="shippingTo.street"
//                             onChange={formik.handleChange}
//                             value={formik.values.shippingTo.street}
//                         />
//                     </div>
//                     <div>

//                         <label htmlFor="shippingCity">City</label><br />
//                         <InputText
//                             id="shippingCity"
//                             name="shippingTo.city"
//                             onChange={formik.handleChange}
//                             value={formik.values.shippingTo.city}
//                         />
//                     </div>
//                     <div>

//                         <label htmlFor="shippingState">State</label><br />
//                         <InputText
//                             id="shippingState"
//                             name="shippingTo.state"
//                             onChange={formik.handleChange}
//                             value={formik.values.shippingTo.state}
//                         />
//                     </div>
//                     <div>

//                         <label htmlFor="shippingZipcode">Zipcode</label><br />
//                         <InputText
//                             id="shippingZipcode"
//                             name="shippingTo.zipcode"
//                             onChange={formik.handleChange}
//                             value={formik.values.shippingTo.zipcode}
//                         />
//                     </div>
//                     <div>

//                         <label htmlFor="shippingCountry">Country</label><br />
//                         <InputText
//                             id="shippingCountry"
//                             name="shippingTo.country"
//                             onChange={formik.handleChange}
//                             value={formik.values.shippingTo.country}
//                         />
//                     </div>
//                 </div>
//                 </Col>
//             </Row>

//             {/* Estimate Status Dropdown */}
//             <div>
//                 <label htmlFor="estimateStatus">Estimate Status</label><br />
//                 <Dropdown
//                     id="estimateStatus"
//                     name="estimateStatus"
//                     options={estimateStatuses}
//                     onChange={(e) => formik.setFieldValue("estimateStatus", e.value)}
//                     value={formik.values.estimateStatus}
//                     placeholder="Select Estimate Status"
//                 />
//                 {formik.touched.estimateStatus && formik.errors.estimateStatus && (
//                     <div className="error">{formik.errors.estimateStatus}</div>
//                 )}
//             </div>

//             {/* Adjustment Input */}
//             <div>
//                 <label htmlFor="adjustment">Adjustment</label><br />
//                 <InputNumber
//                     id="adjustment"
//                     name="adjustment"
//                     onValueChange={(e) => formik.setFieldValue("adjustment", e.value)}
//                     value={formik.values.adjustment}
//                 />
//             </div>

//             {/* Discount Input */}
//             <div>
//                 <label htmlFor="discount">Discount</label><br />
//                 <InputNumber
//                     id="discount"
//                     name="discount"
//                     onValueChange={(e) => formik.setFieldValue("discount", e.value)}
//                     value={formik.values.discount}
//                 />
//             </div>

//             {/* Terms and Conditions Input */}
//             <div>
//                 <label htmlFor="termsAndConditions">Terms and Conditions</label><br />
//                 <InputTextarea
//                     id="termsAndConditions"
//                     name="termsAndConditions"
//                     onChange={formik.handleChange}
//                     value={formik.values.termsAndConditions}
//                 />
//             </div>

//             {/* Estimate File Upload */}
//             <div>
//                 <label htmlFor="estimateFile">Estimate File Upload</label><br />
//                 <input
//                     type="file"
//                     name="estimateFile"
//                     accept=".pdf, .doc, .docx, .rtf, .txt, .odt, .pages"
//                     id="estimateFile"
//                     onChange={(event) => {
//                         formik.setFieldValue("estimateFile", event.currentTarget.files[0]);
//                     }}
//                 />
//                 {formik.touched.estimateFile && formik.errors.estimateFile && (
//                     <div className="error">{formik.errors.estimateFile}</div>
//                 )}
//             </div>

//             <button type="submit">Submit</button>
//         </form>
//     );
// };

// export default EstimateForm;
'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Chips } from 'primereact/chips';
import { MultiSelect } from 'primereact/multiselect';
// import userContext from '@/app/UseContext/UseContext';
import { useContext, useEffect, useMemo, useState } from 'react';
import Itempage from '../../customers/pages/estimate/itempage';
import { Button } from 'primereact/button';
import { Col, Row } from 'react-bootstrap';
import userContext from '../../../../UseContext/UseContext';
import { Editor } from 'primereact/editor';

const currencies = [
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'GBP', value: 'GBP' }
];

const estimateStatuses = [
    { label: 'Draft', value: 'Draft' },
    { label: 'Sent', value: 'Sent' },
    { label: 'Accepted', value: 'Accepted' },
    { label: 'Rejected', value: 'Rejected' }
];

const EstimateForm = ({ onSubmit, customers, projects, item }) => {
    const { singleitem, subtotals, finalTotals, discounts } = useContext(userContext);
    const itemOptions = useMemo(() => {
        return Array.isArray(item) ? item.map((i) => ({ label: i.itemName, value: i._id })) : [];
    }, [item]);

    const [selectedItem, setSelectedItem] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
    }, []);
    const formik = useFormik({
        initialValues: {
            customer: '',
            project: '',
            billingTo: {
                street: '',
                city: '',
                state: '',
                zipcode: '',
                country: ''
            },
            shippingTo: {
                street: '',
                city: '',
                state: '',
                zipcode: '',
                country: ''
            },
            description: '',
            estimateDate: null,
            expireDate: null,
            currency: '',
            estimateStatus: 'Draft',
            adjustment: 0,
            termsAndConditions: '',
            estimateFile: null,
            tags: [],
            items: []
        },
        validationSchema: Yup.object({
            // Add your validation rules here if needed
        }),
        onSubmit: (values) => {
            const formData = new FormData();
            const formattedValues = {
                ...values,
                estimateDate: values.estimateDate ? values.estimateDate.toISOString() : null,
                expireDate: values.expireDate ? values.expireDate.toISOString() : null,
                discount: discounts, // Directly assign discounts from context
                total: finalTotals,
                subTotal: subtotals, // Directly assign total from context
                items: selectedItem.map((itemId) => itemId) // Send only IDs
            };

            Object.keys(formattedValues).forEach((key) => {
                if (typeof formattedValues[key] === 'object' && formattedValues[key] !== null) {
                    Object.keys(formattedValues[key]).forEach((subKey) => {
                        formData.append(`${key}[${subKey}]`, formattedValues[key][subKey]);
                    });
                } else {
                    formData.append(key, formattedValues[key]);
                }
            });

            if (values.estimateFile) {
                formData.append('estimateFile', values.estimateFile);
            }

            onSubmit(formData);
        }
    });

    return (
        // <div>
        //     <form onSubmit={formik.handleSubmit}>
        //         <Row>
        //             <Col> <div>
        //                 <label htmlFor="estimateFile">Upload Estimate File</label><br />
        //                 <input
        //                     className="mb-3"
        //                     id="estimateFile"
        //                     name="estimateFile"
        //                     type="file"
        //                     onChange={(event) => {
        //                         formik.setFieldValue("estimateFile", event.currentTarget.files[0]);
        //                     }}
        //                 />
        //             </div>
        //             </Col>
        //             <div>
        //                 <label htmlFor="project">customer</label><br />
        //                 <Dropdown
        //                     id="customer"
        //                     name="customer"
        //                     options={customers}
        //                     onChange={(e) => formik.setFieldValue("customer", e.value)}
        //                     value={formik.values.customer}
        //                     placeholder="Select a Project"
        //                     className="w-100 mb-3"
        //                 />
        //                 {formik.touched.customer && formik.errors.customer && (
        //                     <div className="error">{formik.errors.customer}</div>
        //                 )}
        //             </div>

        //         </Row>
        //         <Row>
        //             <Col>     <div>
        //                 <label>Tags</label><br />
        //                 <Chips
        //                     className="w-100 mb-3"
        //                     name="tags"
        //                     value={formik.values.tags}
        //                     onChange={(e) => formik.setFieldValue("tags", e.value)}
        //                 />
        //             </div>
        //             </Col>
        //             <Col>
        //                 <div>
        //                     <label htmlFor="project">Project</label><br />
        //                     <Dropdown
        //                         className="w-100 mb-3"
        //                         id="project"
        //                         name="project"
        //                         options={projects}
        //                         onChange={(e) => formik.setFieldValue("project", e.value)}
        //                         value={formik.values.project}
        //                         placeholder="Select a Project"
        //                     />
        //                     {formik.touched.project && formik.errors.project && (
        //                         <div className="error">{formik.errors.project}</div>
        //                     )}
        //                 </div>
        //             </Col>
        //         </Row>

        //         <Row>
        //             <Col> <div>
        //                 <label htmlFor="estimateDate">Estimate Date</label><br />
        //                 <Calendar
        //                     className="w-100 mb-3"
        //                     id="estimateDate"
        //                     type="date"
        //                     name="estimateDate"
        //                     onChange={(e) => formik.setFieldValue("estimateDate", e.value)}
        //                     onBlur={formik.handleBlur}
        //                     value={formik.values.estimateDate}
        //                     showIcon
        //                 />
        //                 {formik.touched.estimateDate && formik.errors.estimateDate && (
        //                     <div className="error">{formik.errors.estimateDate}</div>
        //                 )}
        //             </div></Col>
        //             <Col> <div>
        //                 <label htmlFor="expireDate">Expire Date</label><br />
        //                 <Calendar
        //                     className="w-100 mb-3"
        //                     id="expireDate"
        //                     type="date"
        //                     name="expireDate"
        //                     onChange={(e) => formik.setFieldValue("expireDate", e.value)}
        //                     onBlur={formik.handleBlur}
        //                     value={formik.values.expireDate}
        //                     showIcon
        //                 />
        //                 {formik.touched.expireDate && formik.errors.expireDate && (
        //                     <div className="error">{formik.errors.expireDate}</div>
        //                 )}
        //             </div>
        //             </Col>
        //         </Row>

        //         <Row>
        //             <Col> <div>
        //                 <label htmlFor="currency">Currency</label><br />
        //                 <Dropdown
        //                     className="w-100 mb-3"
        //                     id="currency"
        //                     name="currency"
        //                     options={currencies}
        //                     onChange={(e) => formik.setFieldValue("currency", e.value)}
        //                     value={formik.values.currency}
        //                     placeholder="Select a Currency"
        //                 />
        //                 {formik.touched.currency && formik.errors.currency && (
        //                     <div className="error">{formik.errors.currency}</div>
        //                 )}
        //             </div>
        //             </Col>
        //             <Col> <div>
        //                 <label htmlFor="adjustment">Adjustment</label><br />
        //                 <InputNumber
        //                     className="w-100 mb-3"
        //                     id="adjustment"
        //                     name="adjustment"
        //                     onValueChange={(e) => formik.setFieldValue("adjustment", e.value)}
        //                     value={formik.values.adjustment}
        //                 />
        //             </div>
        //             </Col>
        //         </Row>

        //         {/* <Row>
        //             <Col>  <div>
        //                 <label htmlFor="termsAndConditions">Terms and Conditions</label><br />
        //                 <InputTextarea
        //                 className="w-100 mb-3"
        //                     id="termsAndConditions"
        //                     name="termsAndConditions"
        //                     onChange={formik.handleChange}
        //                     value={formik.values.termsAndConditions}
        //                 />
        //             </div></Col>
        //             <Col>  <div>
        //                 <label htmlFor="description">Description</label><br />
        //                 <Editor
        //                 className="w-100 mb-3"
        //                     id="description"
        //                     name="description"
        //                     onChange={formik.handleChange}
        //                     value={formik.values.description}
        //                 />
        //             </div></Col>

        //         </Row> */}

        //         <Row>
        //             <Col>                 <div>
        //                 <h4>Billing Address</h4><br />
        //                 {["street", "city", "state", "zipcode", "country"].map((field) => (
        //                     <div key={field}>
        //                         <label htmlFor={`billing${field.charAt(0).toUpperCase() + field.slice(1)}`}>{field.charAt(0).toUpperCase() + field.slice(1)}</label><br />
        //                         <InputText
        //                             className="w-100 mb-3"
        //                             id={`billing${field.charAt(0).toUpperCase() + field.slice(1)}`}
        //                             name={`billingTo.${field}`}
        //                             onChange={formik.handleChange}
        //                             value={formik.values.billingTo[field]}
        //                         />
        //                     </div>
        //                 ))}
        //             </div>
        //             </Col>
        //             <Col>              <div>
        //                 <h4>Shipping Address</h4> <br />
        //                 {["street", "city", "state", "zipcode", "country"].map((field) => (
        //                     <div key={field}>
        //                         <label htmlFor={`shipping${field.charAt(0).toUpperCase() + field.slice(1)}`}>{field.charAt(0).toUpperCase() + field.slice(1)}</label><br />
        //                         <InputText
        //                             className="w-100 mb-3"
        //                             id={`shipping${field.charAt(0).toUpperCase() + field.slice(1)}`}
        //                             name={`shippingTo.${field}`}
        //                             onChange={formik.handleChange}
        //                             value={formik.values.shippingTo[field]}
        //                         />
        //                     </div>
        //                 ))}
        //             </div>

        //             </Col>
        //         </Row>

        //         <Row>
        //             <Col> <div>
        //                 <label htmlFor="items">Select Items:</label><br />
        //                 <MultiSelect
        //                     id="items"
        //                     className="w-100 mb-3"
        //                     name="items"
        //                     options={itemOptions}
        //                     value={selectedItem}
        //                     onChange={(e) => {
        //                         setSelectedItem(e.value);
        //                         formik.setFieldValue("items", e.value); // Store only IDs in Formik
        //                     }}
        //                     placeholder="Select Items"
        //                 />
        //             </div></Col>
        //             <Col> {selectedItem.length > 0 && <Itempage selectedItem={selectedItem} />}</Col>
        //         </Row>
        //         <Row>
        //             <Col sm={12}>  <div>
        //                 <label htmlFor="termsAndConditions">Terms and Conditions</label><br />
        //                 <InputTextarea
        //                     className="w-100 mb-3"
        //                     id="termsAndConditions"
        //                     name="termsAndConditions"
        //                     onChange={formik.handleChange}
        //                     value={formik.values.termsAndConditions}
        //                 />
        //             </div>
        //             </Col>
        //             <Col sm={12}>
        //             <div>
        //                 <label htmlFor="description">Description</label><br />
        //                 <Editor
        //                     className="w-100 mb-3"
        //                     id="description"
        //                     name="description"
        //                     onChange={formik.handleChange}
        //                     value={formik.values.description}
        //                 />
        //             </div></Col>

        //         </Row>

        //         <Button type="submit" className="btn-all">Submit</Button>
        //     </form>
        // </div>
        <>
            {loading && (
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col>
                                {' '}
                                <div>
                                    <label htmlFor="estimateFile">Upload Estimate File</label>
                                    <br />
                                    <input
                                        className="mb-3"
                                        id="estimateFile"
                                        name="estimateFile"
                                        type="file"
                                        onChange={(event) => {
                                            formik.setFieldValue('estimateFile', event.currentTarget.files[0]);
                                        }}
                                    />
                                </div>
                            </Col>
                            <div>
                                <label htmlFor="project">customer</label>
                                <br />
                                <Dropdown id="customer" name="customer" options={customers} onChange={(e) => formik.setFieldValue('customer', e.value)} value={formik.values.customer} placeholder="Select a Project" className="w-100 mb-3" />
                                {formik.touched.customer && formik.errors.customer && <div className="error">{formik.errors.customer}</div>}
                            </div>
                        </Row>
                        <Row>
                            <Col>
                                {' '}
                                <div>
                                    <label>Tags</label>
                                    <br />
                                    <Chips className="w-100 mb-3" name="tags" value={formik.values.tags} onChange={(e) => formik.setFieldValue('tags', e.value)} />
                                </div>
                            </Col>
                            <Col>
                                <div>
                                    <label htmlFor="project">Project</label>
                                    <br />
                                    <Dropdown className="w-100 mb-3" id="project" name="project" options={projects} onChange={(e) => formik.setFieldValue('project', e.value)} value={formik.values.project} placeholder="Select a Project" />
                                    {formik.touched.project && formik.errors.project && <div className="error">{formik.errors.project}</div>}
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                {' '}
                                <div>
                                    <label htmlFor="estimateDate">Estimate Date</label>
                                    <br />
                                    <Calendar
                                        className="w-100 mb-3"
                                        id="estimateDate"
                                        type="date"
                                        name="estimateDate"
                                        onChange={(e) => formik.setFieldValue('estimateDate', e.value)}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.estimateDate}
                                        showIcon
                                    />
                                    {formik.touched.estimateDate && formik.errors.estimateDate && <div className="error">{formik.errors.estimateDate}</div>}
                                </div>
                            </Col>
                            <Col>
                                {' '}
                                <div>
                                    <label htmlFor="expireDate">Expire Date</label>
                                    <br />
                                    <Calendar className="w-100 mb-3" id="expireDate" type="date" name="expireDate" onChange={(e) => formik.setFieldValue('expireDate', e.value)} onBlur={formik.handleBlur} value={formik.values.expireDate} showIcon />
                                    {formik.touched.expireDate && formik.errors.expireDate && <div className="error">{formik.errors.expireDate}</div>}
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                {' '}
                                <div>
                                    <label htmlFor="currency">Currency</label>
                                    <br />
                                    <Dropdown className="w-100 mb-3" id="currency" name="currency" options={currencies} onChange={(e) => formik.setFieldValue('currency', e.value)} value={formik.values.currency} placeholder="Select a Currency" />
                                    {formik.touched.currency && formik.errors.currency && <div className="error">{formik.errors.currency}</div>}
                                </div>
                            </Col>
                            <Col>
                                {' '}
                                <div>
                                    <label htmlFor="adjustment">Adjustment</label>
                                    <br />
                                    <InputNumber className="w-100 mb-3" id="adjustment" name="adjustment" onValueChange={(e) => formik.setFieldValue('adjustment', e.value)} value={formik.values.adjustment} />
                                </div>
                            </Col>
                        </Row>

                        {/* <Row>
          <Col>  <div>
              <label htmlFor="termsAndConditions">Terms and Conditions</label><br />
              <InputTextarea
              className="w-100 mb-3"
                  id="termsAndConditions"
                  name="termsAndConditions"
                  onChange={formik.handleChange}
                  value={formik.values.termsAndConditions}
              />
          </div></Col>
          <Col>  <div>
              <label htmlFor="description">Description</label><br />
              <Editor
              className="w-100 mb-3"
                  id="description"
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
              />
          </div></Col>

      </Row> */}

                        <Row>
                            <Col>
                                {' '}
                                <div>
                                    <h4>Billing Address</h4>
                                    <br />
                                    {['street', 'city', 'state', 'zipcode', 'country'].map((field) => (
                                        <div key={field}>
                                            <label htmlFor={`billing${field.charAt(0).toUpperCase() + field.slice(1)}`}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                            <br />
                                            <InputText className="w-100 mb-3" id={`billing${field.charAt(0).toUpperCase() + field.slice(1)}`} name={`billingTo.${field}`} onChange={formik.handleChange} value={formik.values.billingTo[field]} />
                                        </div>
                                    ))}
                                </div>
                            </Col>
                            <Col>
                                {' '}
                                <div>
                                    <h4>Shipping Address</h4> <br />
                                    {['street', 'city', 'state', 'zipcode', 'country'].map((field) => (
                                        <div key={field}>
                                            <label htmlFor={`shipping${field.charAt(0).toUpperCase() + field.slice(1)}`}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                            <br />
                                            <InputText className="w-100 mb-3" id={`shipping${field.charAt(0).toUpperCase() + field.slice(1)}`} name={`shippingTo.${field}`} onChange={formik.handleChange} value={formik.values.shippingTo[field]} />
                                        </div>
                                    ))}
                                </div>
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                {' '}
                                <div>
                                    <label htmlFor="items">Select Items:</label>
                                    <br />
                                    <MultiSelect
                                        id="items"
                                        className="w-100 mb-3"
                                        name="items"
                                        options={itemOptions}
                                        value={selectedItem}
                                        onChange={(e) => {
                                            setSelectedItem(e.value);
                                            formik.setFieldValue('items', e.value); // Store only IDs in Formik
                                        }}
                                        placeholder="Select Items"
                                    />
                                </div>
                            </Col>
                            <Col> {selectedItem.length > 0 && <Itempage selectedItem={selectedItem} />}</Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                {' '}
                                <div>
                                    <label htmlFor="termsAndConditions">Terms and Conditions</label>
                                    <br />
                                    <InputTextarea className="w-100 mb-3" id="termsAndConditions" name="termsAndConditions" onChange={formik.handleChange} value={formik.values.termsAndConditions} />
                                </div>
                            </Col>
                            <Col sm={12}>
                                <div>
                                    <label htmlFor="description">Description</label>
                                    <br />
                                    <Editor className="w-100 mb-3" id="description" name="description" onChange={formik.handleChange} value={formik.values.description} />
                                </div>
                            </Col>
                        </Row>

                        <Button type="submit" className="btn-all">
                            Submit
                        </Button>
                    </form>
                </div>
            )}
        </>
    );
};

export default EstimateForm;
