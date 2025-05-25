// // "use client";
// // import { useFormik } from "formik";
// // import * as Yup from "yup";
// // import { InputText } from "primereact/inputtext";
// // import { InputNumber } from "primereact/inputnumber";
// // import { InputTextarea } from "primereact/inputtextarea";
// // import { Dropdown } from "primereact/dropdown";
// // import { Calendar } from "primereact/calendar";
// // import { Chips } from "primereact/chips";
// // import userContext from '@/app/UseContext/UseContext';
// // import { MultiSelect } from "primereact/multiselect";
// // import { useContext, useMemo, useState } from "react";
// // import Itempage from "./itempage"

// // const currencies = [
// //     { label: "USD", value: "USD" },
// //     { label: "EUR", value: "EUR" },
// //     { label: "GBP", value: "GBP" },
// // ];

// // const estimateStatuses = [
// //     { label: "Draft", value: "Draft" },
// //     { label: "Sent", value: "Sent" },
// //     { label: "Accepted", value: "Accepted" },
// //     { label: "Rejected", value: "Rejected" },
// // ];

// // const EstimateForm = ({ onSubmit, customers, projects, item }) => {
// //     const { singleitem ,finalTotals,subtotals,discounts} =useContext(userContext)
// //     console.log(singleitem,"singleitem")
// //     console.log(subtotals,"subtotal")
// //     console.log(finalTotals,"finalTotal")
// //     console.log(discounts,"discount")

// //     const itemOptions = useMemo(() => {
// //         return Array.isArray(item) ? item.map(i => ({ label: i.itemName, value: i._id })) : [];
// //     }, [item]);
// //     const [selectedItem, setSelectedItem] = useState([]);
// //     const formik = useFormik({
// //         initialValues: {
// //             customer: customers._id || "", // Ensure there's a fallback
// //             project: "",
// //             billingTo: {
// //                 street: "",
// //                 city: "",
// //                 state: "",
// //                 zipcode: "",
// //                 country: "",
// //             },
// //             shippingTo: {
// //                 street: "",
// //                 city: "",
// //                 state: "",
// //                 zipcode: "",
// //                 country: "",
// //             },
// //             description: "",
// //             estimateDate: null,
// //             expireDate: null,
// //             total: finalTotals,
// //             currency: "",
// //             estimateStatus: "Draft",
// //             adjustment: 0,
// //             discount: discounts,
// //             termsAndConditions: "",
// //             estimateFile: null,
// //             tags: [],
// //             items:singleitem,
// //         },
// //         validationSchema: Yup.object({
// //             project: Yup.string().required("Project is required"),
// //             description: Yup.string().required("Description is required"),
// //             estimateDate: Yup.date().required("Estimate date is required").nullable(),
// //             expireDate: Yup.date().required("Expire date is required").nullable(),
// //             total: Yup.number().required("Total is required").positive("Total must be positive"),
// //             currency: Yup.string().required("Currency is required"),
// //             estimateStatus: Yup.string().required("Estimate status is required"),
// //         }),

// //         onSubmit: (values) => {
// //             const formData = new FormData();
// //             const formattedValues = {
// //                 ...values,
// //                 estimateDate: values.estimateDate ? values.estimateDate.toISOString() : null,
// //                 expireDate: values.expireDate ? values.expireDate.toISOString() : null,
// //             };

// //             Object.keys(formattedValues).forEach((key) => {
// //                 if (typeof formattedValues[key] === "object" && formattedValues[key] !== null) {
// //                     Object.keys(formattedValues[key]).forEach((subKey) => {
// //                         formData.append(`${key}[${subKey}]`, formattedValues[key][subKey]);
// //                     });
// //                 } else {
// //                     formData.append(key, formattedValues[key]);
// //                 }
// //             });

// //             if (values.estimateFile) {
// //                 formData.append("estimateFile", values.estimateFile);
// //             }

// //             onSubmit(formData);
// //         },

// //     });
// //     console.log(formik, "formik")
// //     return (
// //         <>
// //         <form onSubmit={formik.handleSubmit}>
// //             <div>
// //                 <label>Tags</label><br />
// //                 <Chips
// //                     name="tags"
// //                     value={formik.values.tags}
// //                     onChange={(e) => formik.setFieldValue("tags", e.value)}
// //                 />
// //             </div>

// //             {/* Project Dropdown */}
// //             <div>
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
// //             </div>

// //             {/* Estimate Date Input */}
// //             <div>
// //                 <label htmlFor="estimateDate">Estimate Date</label><br />
// //                 <Calendar
// //                     id="estimateDate"
// //                     type="date"
// //                     name="estimateDate"
// //                     onChange={(e) => formik.setFieldValue("estimateDate", e.value)}
// //                     onBlur={formik.handleBlur}
// //                     value={formik.values.estimateDate}
// //                     showIcon
// //                 />
// //                 {formik.touched.estimateDate && formik.errors.estimateDate && (
// //                     <div className="error">{formik.errors.estimateDate}</div>
// //                 )}
// //             </div>

// //             {/* Expire Date Input */}
// //             <div>
// //                 <label htmlFor="expireDate">Expire Date</label><br />
// //                 <Calendar
// //                     id="expireDate"
// //                     type="date"
// //                     name="expireDate"
// //                     onChange={(e) => formik.setFieldValue("expireDate", e.value)}
// //                     onBlur={formik.handleBlur}
// //                     value={formik.values.expireDate}
// //                     showIcon
// //                 />
// //                 {formik.touched.expireDate && formik.errors.expireDate && (
// //                     <div className="error">{formik.errors.expireDate}</div>
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
// //                 <h4>Billing Address</h4>
// //                 <div>

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
// //                 <h4>Shipping Address</h4>
// //                 <div>

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
// //             <div>
// //                 <label htmlFor="items">Select Items:</label><br />
// //                 <MultiSelect
// //                     value={selectedItem}
// //                     options={itemOptions}
// //                     onChange={(e) => setSelectedItem(e.value)}
// //                     placeholder="Select items"
// //                 />
// //             </div>
// //             {console.log(selectedItem,"selectedItem")}
// //             {selectedItem &&(

// //             <Itempage selectedItem={selectedItem}></Itempage>
// //             )}
// //             <button type="submit">Submit</button>
// //         </form>
// //         </>
// //     );
// // };

// // export default EstimateForm;
// // "use client";
// // import { useFormik } from "formik";
// // import * as Yup from "yup";
// // import { InputText } from "primereact/inputtext";
// // import { InputNumber } from "primereact/inputnumber";
// // import { InputTextarea } from "primereact/inputtextarea";
// // import { Dropdown } from "primereact/dropdown";
// // import { Calendar } from "primereact/calendar";
// // import { Chips } from "primereact/chips";
// // import { MultiSelect } from "primereact/multiselect";
// // import userContext from '@/app/UseContext/UseContext';
// // import { useContext, useMemo, useState } from "react";
// // import Itempage from "./itempage";
// // import { Button } from "primereact/button";

// // const currencies = [
// //     { label: "USD", value: "USD" },
// //     { label: "EUR", value: "EUR" },
// //     { label: "GBP", value: "GBP" },
// // ];

// // const estimateStatuses = [
// //     { label: "Draft", value: "Draft" },
// //     { label: "Sent", value: "Sent" },
// //     { label: "Accepted", value: "Accepted" },
// //     { label: "Rejected", value: "Rejected" },
// // ];

// // const EstimateForm = ({ onSubmit, customers, projects, item }) => {
// //     const { singleitem, finalTotals, discounts } = useContext(userContext);
// //     console.log(singleitem,"singleitem")
// //     console.log(finalTotals,"singleitem")
// //     console.log(discounts,"discounts")
// //     const itemOptions = useMemo(() => {
// //         return Array.isArray(item) ? item.map(i => ({ label: i.itemName, value: i._id })) : [];
// //     }, [item]);

// //     const [selectedItem, setSelectedItem] = useState([]);

// //     const formik = useFormik({
// //         initialValues: {
// //             customer: customers._id || "",
// //             project: "",
// //             billingTo: {
// //                 street: "",
// //                 city: "",
// //                 state: "",
// //                 zipcode: "",
// //                 country: "",
// //             },
// //             shippingTo: {
// //                 street: "",
// //                 city: "",
// //                 state: "",
// //                 zipcode: "",
// //                 country: "",
// //             },
// //             description: "",
// //             estimateDate: null,
// //             expireDate: null,
// //             total: finalTotals,
// //             discount: discounts,
// //             currency: "",
// //             estimateStatus: "Draft",
// //             adjustment: 0,
// //             termsAndConditions: "",
// //             estimateFile: null,
// //             tags: [],
// //             items: singleitem,
// //         },
// //         validationSchema: Yup.object({
// //             // project: Yup.string().required("Project is required"),
// //             // description: Yup.string().required("Description is required"),
// //             // estimateDate: Yup.date().required("Estimate date is required").nullable(),
// //             // expireDate: Yup.date().required("Expire date is required").nullable(),
// //             // total: Yup.number().required("Total is required").positive("Total must be positive"),
// //             // discount: Yup.number().nullable().positive("Discount must be positive"),
// //             // currency: Yup.string().required("Currency is required"),
// //             // estimateStatus: Yup.string().required("Estimate status is required"),
// //         }),
// //         onSubmit: (values) => {
// //             const formData = new FormData();
// //             const formattedValues = {
// //                 ...values,
// //                 estimateDate: values.estimateDate ? values.estimateDate.toISOString() : null,
// //                 expireDate: values.expireDate ? values.expireDate.toISOString() : null,
// //             };

// //             Object.keys(formattedValues).forEach((key) => {
// //                 if (typeof formattedValues[key] === "object" && formattedValues[key] !== null) {
// //                     Object.keys(formattedValues[key]).forEach((subKey) => {
// //                         formData.append(`${key}[${subKey}]`, formattedValues[key][subKey]);
// //                     });
// //                 } else {
// //                     formData.append(key, formattedValues[key]);
// //                 }
// //             });

// //             if (values.estimateFile) {
// //                 formData.append("estimateFile", values.estimateFile);
// //             }

// //             // Call the onSubmit prop passed from parent component
// //             onSubmit(formData);
// //         },
// //     });

// //     return (
// //         <div>
// //             <form >
// //                 <div>
// //                     <label>Tags</label>
// //                     <Chips
// //                         name="tags"
// //                         value={formik.values.tags}
// //                         onChange={(e) => formik.setFieldValue("tags", e.value)}
// //                     />
// //                 </div>

// //                 <div>
// //                     <label htmlFor="project">Project</label>
// //                     <Dropdown
// //                         id="project"
// //                         name="project"
// //                         options={projects}
// //                         onChange={(e) => formik.setFieldValue("project", e.value)}
// //                         value={formik.values.project}
// //                         placeholder="Select a Project"
// //                     />
// //                     {formik.touched.project && formik.errors.project && (
// //                         <div className="error">{formik.errors.project}</div>
// //                     )}
// //                 </div>

// //                 <div>
// //                     <label htmlFor="estimateDate">Estimate Date</label>
// //                     <Calendar
// //                         id="estimateDate"
// //                         type="date"
// //                         name="estimateDate"
// //                         onChange={(e) => formik.setFieldValue("estimateDate", e.value)}
// //                         onBlur={formik.handleBlur}
// //                         value={formik.values.estimateDate}
// //                         showIcon
// //                     />
// //                     {formik.touched.estimateDate && formik.errors.estimateDate && (
// //                         <div className="error">{formik.errors.estimateDate}</div>
// //                     )}
// //                 </div>

// //                 <div>
// //                     <label htmlFor="expireDate">Expire Date</label>
// //                     <Calendar
// //                         id="expireDate"
// //                         type="date"
// //                         name="expireDate"
// //                         onChange={(e) => formik.setFieldValue("expireDate", e.value)}
// //                         onBlur={formik.handleBlur}
// //                         value={formik.values.expireDate}
// //                         showIcon
// //                     />
// //                     {formik.touched.expireDate && formik.errors.expireDate && (
// //                         <div className="error">{formik.errors.expireDate}</div>
// //                     )}
// //                 </div>

// //                 <div>
// //                     <label htmlFor="currency">Currency</label>
// //                     <Dropdown
// //                         id="currency"
// //                         name="currency"
// //                         options={currencies}
// //                         onChange={(e) => formik.setFieldValue("currency", e.value)}
// //                         value={formik.values.currency}
// //                         placeholder="Select a Currency"
// //                     />
// //                     {formik.touched.currency && formik.errors.currency && (
// //                         <div className="error">{formik.errors.currency}</div>
// //                     )}
// //                 </div>

// //                 <div>
// //                     <label htmlFor="discount">Discount</label>
// //                     <InputNumber
// //                         id="discount"
// //                         name="discount"
// //                         onValueChange={(e) => formik.setFieldValue("discount", e.value)}
// //                         value={formik.values.discount}
// //                     />
// //                     {formik.touched.discount && formik.errors.discount && (
// //                         <div className="error">{formik.errors.discount}</div>
// //                     )}
// //                 </div>

// //                 <div>
// //                     <label htmlFor="total">Total</label>
// //                     <InputNumber
// //                         id="total"
// //                         name="total"
// //                         onValueChange={(e) => formik.setFieldValue("total", e.value)}
// //                         value={singleitem}
// //                     />
// //                     {formik.touched.total && formik.errors.total && (
// //                         <div className="error">{formik.errors.total}</div>
// //                     )}
// //                 </div>

// //                 <div>
// //                     <h4>Billing Address</h4>
// //                     {["street", "city", "state", "zipcode", "country"].map((field) => (
// //                         <div key={field}>
// //                             <label htmlFor={`billing${field.charAt(0).toUpperCase() + field.slice(1)}`}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
// //                             <InputText
// //                                 id={`billing${field.charAt(0).toUpperCase() + field.slice(1)}`}
// //                                 name={`billingTo.${field}`}
// //                                 onChange={formik.handleChange}
// //                                 value={formik.values.billingTo[field]}
// //                             />
// //                         </div>
// //                     ))}
// //                 </div>

// //                 <div>
// //                     <h4>Shipping Address</h4>
// //                     {["street", "city", "state", "zipcode", "country"].map((field) => (
// //                         <div key={field}>
// //                             <label htmlFor={`shipping${field.charAt(0).toUpperCase() + field.slice(1)}`}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
// //                             <InputText
// //                                 id={`shipping${field.charAt(0).toUpperCase() + field.slice(1)}`}
// //                                 name={`shippingTo.${field}`}
// //                                 onChange={formik.handleChange}
// //                                 value={formik.values.shippingTo[field]}
// //                             />
// //                         </div>
// //                     ))}
// //                 </div>

// //                 <div>
// //                     <label htmlFor="estimateStatus">Estimate Status</label>
// //                     <Dropdown
// //                         id="estimateStatus"
// //                         name="estimateStatus"
// //                         options={estimateStatuses}
// //                         onChange={(e) => formik.setFieldValue("estimateStatus", e.value)}
// //                         value={formik.values.estimateStatus}
// //                         placeholder="Select Estimate Status"
// //                     />
// //                     {formik.touched.estimateStatus && formik.errors.estimateStatus && (
// //                         <div className="error">{formik.errors.estimateStatus}</div>
// //                     )}
// //                 </div>

// //                 <div>
// //                     <label htmlFor="adjustment">Adjustment</label>
// //                     <InputNumber
// //                         id="adjustment"
// //                         name="adjustment"
// //                         onValueChange={(e) => formik.setFieldValue("adjustment", e.value)}
// //                         value={formik.values.adjustment}
// //                     />
// //                 </div>

// //                 <div>
// //                     <label htmlFor="termsAndConditions">Terms and Conditions</label>
// //                     <InputTextarea
// //                         id="termsAndConditions"
// //                         name="termsAndConditions"
// //                         onChange={formik.handleChange}
// //                         value={formik.values.termsAndConditions}
// //                     />
// //                 </div>

// //                 <div>
// //                     <label htmlFor="estimateFile">Upload Estimate File</label>
// //                     <input
// //                         id="estimateFile"
// //                         name="estimateFile"
// //                         type="file"
// //                         onChange={(event) => {
// //                             formik.setFieldValue("estimateFile", event.currentTarget.files[0]);
// //                         }}
// //                     />
// //                     {formik.touched.estimateFile && formik.errors.estimateFile && (
// //                         <div className="error">{formik.errors.estimateFile}</div>
// //                     )}
// //                 </div>

// //                 <div>
// //                     <label htmlFor="description">Description</label>
// //                     <InputTextarea
// //                         id="description"
// //                         name="description"
// //                         onChange={formik.handleChange}
// //                         value={formik.values.description}
// //                     />
// //                     {formik.touched.description && formik.errors.description && (
// //                         <div className="error">{formik.errors.description}</div>
// //                     )}
// //                 </div>

// //                 <div>
// //                     <label htmlFor="items">Select Items:</label>
// //                     <MultiSelect
// //                         id="items"
// //                         name="items"
// //                         options={itemOptions}
// //                         value={selectedItem}
// //                         onChange={(e) => {
// //                             setSelectedItem(e.value);
// //                             formik.setFieldValue("items", e.value);
// //                         }}
// //                         placeholder="Select Items"
// //                     />
// //                 </div>
// //                 {selectedItem && <Itempage selectedItem={selectedItem} />}

// //                 <Button type="submit" onSubmit={formik.handleSubmit}>Submit</Button>
// //             </form>
// //         </div>
// //     );
// // };

// // export default EstimateForm;
// 'use client';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import Chip from '@mui/material/Chip';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Box from '@mui/material/Box';
// import { useContext, useMemo, useState, ChangeEvent } from 'react';
// import Itempage from './itempage';
// import userContext from '../../../../../UseContext/UseContext';
// import { Editor } from 'primereact/editor';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// const currencies = [
//     { label: 'USD', value: 'USD' },
//     { label: 'EUR', value: 'EUR' },
//     { label: 'GBP', value: 'GBP' }
// ];

// const estimateStatuses = [
//     { label: 'Draft', value: 'Draft' },
//     { label: 'Sent', value: 'Sent' },
//     { label: 'Accepted', value: 'Accepted' },
//     { label: 'Rejected', value: 'Rejected' }
// ];

// interface EstimateFormProps {
//     onSubmit: (formData: FormData) => void;
//     customers: any;
//     projects: { label: string; value: string }[];
//     item: any[];
//     initialValues: any;
// }

// const EstimateForm: React.FC<EstimateFormProps> = ({ onSubmit, customers, projects, item, initialValues }) => {
//     const { singleitem, subtotals, finalTotals, discounts } = useContext(userContext);
//     const itemOptions = useMemo(() => (Array.isArray(item) ? item.map((i) => ({ label: i.itemName, value: i._id })) : []), [item]);

//     const [selectedItem, setSelectedItem] = useState<string[]>([]);
//     const [estimateFile, setEstimateFile] = useState<File | null>(null);

//     const formik = useFormik({
//         initialValues: {
//             customer: customers._id || '',
//             project: initialValues?.project || '',
//             billingTo: {
//                 street: initialValues?.billingTo?.street || '',
//                 city: initialValues?.billingTo?.city || '',
//                 state: initialValues?.billingTo?.state || '',
//                 zipcode: initialValues?.billingTo?.zipcode || '',
//                 country: initialValues?.billingTo?.country || ''
//             },
//             shippingTo: {
//                 street: initialValues?.billingTo?.street || '',
//                 city: initialValues?.billingTo?.city || '',
//                 state: initialValues?.billingTo?.state || '',
//                 zipcode: initialValues?.billingTo?.zipcode || '',
//                 country: initialValues?.billingTo?.country || ''
//             },
//             description: initialValues?.description || '',
//             estimateDate: initialValues?.estimateDate || (null as Date | null),
//             expireDate: initialValues?.expireDate || (null as Date | null),
//             currency: initialValues?.currency || '',
//             estimateStatus: initialValues?.estimateStatus || 'Draft',
//             adjustment: initialValues?.adjustment || 0,
//             termsAndConditions: initialValues?.termsAndConditions || '',
//             tags: initialValues?.tags || ([] as string[]),
//             items: initialValues?.items || ([] as string[])
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
//                 items: selectedItem
//             };

//             Object.keys(formattedValues).forEach((key) => {
//                 if (typeof formattedValues[key] === 'object' && formattedValues[key] !== null && !Array.isArray(formattedValues[key])) {
//                     Object.keys(formattedValues[key]).forEach((subKey) => {
//                         formData.append(`${key}[${subKey}]`, formattedValues[key][subKey]);
//                     });
//                 } else if (Array.isArray(formattedValues[key])) {
//                     (formattedValues[key] as string[]).forEach((val, idx) => {
//                         formData.append(`${key}[${idx}]`, val);
//                     });
//                 } else {
//                     formData.append(key, formattedValues[key]);
//                 }
//             });

//             if (estimateFile) {
//                 formData.append('estimateFile', estimateFile);
//             }

//             onSubmit(formData);
//         }
//     });

//     const handleTagAdd = (event: React.KeyboardEvent<HTMLInputElement>) => {
//         if (event.key === 'Enter' && event.currentTarget.value) {
//             formik.setFieldValue('tags', [...formik.values.tags, event.currentTarget.value]);
//             event.currentTarget.value = '';
//         }
//     };

//     const handleTagDelete = (tagToDelete: string) => {
//         formik.setFieldValue(
//             'tags',
//             formik.values.tags.filter((tag) => tag !== tagToDelete)
//         );
//     };

//     return (
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//             <form onSubmit={formik.handleSubmit}>
//                 <Grid container spacing={2}>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <Button variant="contained" component="label" fullWidth>
//                             Upload Estimate File
//                             <input
//                                 type="file"
//                                 hidden
//                                 onChange={(event: ChangeEvent<HTMLInputElement>) => {
//                                     if (event.target.files && event.target.files[0]) {
//                                         setEstimateFile(event.target.files[0]);
//                                     }
//                                 }}
//                             />
//                         </Button>
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <FormControl fullWidth>
//                             <InputLabel id="currency-label">Currency</InputLabel>
//                             <Select labelId="currency-label" id="currency" name="currency" value={formik.values.currency} label="Currency" onChange={formik.handleChange}>
//                                 {currencies.map((option) => (
//                                     <MenuItem key={option.value} value={option.value}>
//                                         {option.label}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <FormControl fullWidth>
//                             <InputLabel id="project-label">Project</InputLabel>
//                             <Select labelId="project-label" id="project" name="project" value={formik.values.project} label="Project" onChange={formik.handleChange}>
//                                 {projects.map((option) => (
//                                     <MenuItem key={option.value} value={option.value}>
//                                         {option.label}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <DatePicker label="Estimate Date" value={formik.values.estimateDate} onChange={(date) => formik.setFieldValue('estimateDate', date)} slotProps={{ textField: { fullWidth: true } }} />
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <DatePicker label="Expire Date" value={formik.values.expireDate} onChange={(date) => formik.setFieldValue('expireDate', date)} slotProps={{ textField: { fullWidth: true } }} />
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <TextField label="Adjustment" name="adjustment" type="number" fullWidth value={formik.values.adjustment} onChange={formik.handleChange} />
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <FormControl fullWidth>
//                             <InputLabel id="estimateStatus-label">Estimate Status</InputLabel>
//                             <Select labelId="estimateStatus-label" id="estimateStatus" name="estimateStatus" value={formik.values.estimateStatus} label="Estimate Status" onChange={formik.handleChange}>
//                                 {estimateStatuses.map((option) => (
//                                     <MenuItem key={option.value} value={option.value}>
//                                         {option.label}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     {/* Billing Address */}
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <Box mb={1}>
//                             <strong>Billing Address</strong>
//                         </Box>
//                         {['street', 'city', 'state', 'zipcode', 'country'].map((field) => (
//                             <TextField key={field} label={field.charAt(0).toUpperCase() + field.slice(1)} name={`billingTo.${field}`} fullWidth margin="dense" value={formik.values.billingTo[field]} onChange={formik.handleChange} />
//                         ))}
//                     </Grid>
//                     {/* Shipping Address */}
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <Box mb={1}>
//                             <strong>Shipping Address</strong>
//                         </Box>
//                         {['street', 'city', 'state', 'zipcode', 'country'].map((field) => (
//                             <TextField key={field} label={field.charAt(0).toUpperCase() + field.slice(1)} name={`shippingTo.${field}`} fullWidth margin="dense" value={formik.values.shippingTo[field]} onChange={formik.handleChange} />
//                         ))}
//                     </Grid>
//                     {/* Tags */}
//                     <Grid size={{ xs: 12 }}>
//                         <FormControl fullWidth>
//                             <InputLabel shrink>Tags</InputLabel>
//                             <OutlinedInput
//                                 placeholder="Add tag and press Enter"
//                                 onKeyDown={handleTagAdd}
//                                 endAdornment={
//                                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                                         {formik.values.tags.map((tag) => (
//                                             <Chip key={tag} label={tag} onDelete={() => handleTagDelete(tag)} />
//                                         ))}
//                                     </Box>
//                                 }
//                             />
//                         </FormControl>
//                     </Grid>
//                     {/* Description */}
//                     <Grid size={{ xs: 12 }}>
//                         <InputLabel>Description</InputLabel>
//                         <Editor id="description" name="description" value={formik.values.description} onTextChange={(e) => formik.setFieldValue('description', e.htmlValue)} style={{ height: 150 }} />
//                     </Grid>
//                     {/* Terms and Conditions */}
//                     <Grid size={{ xs: 12 }}>
//                         <TextField label="Terms and Conditions" name="termsAndConditions" fullWidth multiline minRows={3} value={formik.values.termsAndConditions} onChange={formik.handleChange} />
//                     </Grid>
//                     {/* Items MultiSelect */}
//                     <Grid size={{ xs: 12, sm: 6 }}>
//                         <FormControl fullWidth>
//                             <InputLabel id="items-label">Select Items</InputLabel>
//                             <Select
//                                 labelId="items-label"
//                                 id="items"
//                                 name="items"
//                                 multiple
//                                 value={selectedItem}
//                                 onChange={(e) => {
//                                     const value = typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value;
//                                     setSelectedItem(value as string[]);
//                                     formik.setFieldValue('items', value);
//                                 }}
//                                 input={<OutlinedInput label="Select Items" />}
//                                 renderValue={(selected) => (
//                                     <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
//                                         {(selected as string[]).map((value) => {
//                                             const label = itemOptions.find((opt) => opt.value === value)?.label || value;
//                                             return <Chip key={value} label={label} />;
//                                         })}
//                                     </Box>
//                                 )}
//                             >
//                                 {itemOptions.map((option) => (
//                                     <MenuItem key={option.value} value={option.value}>
//                                         {option.label}
//                                     </MenuItem>
//                                 ))}
//                             </Select>
//                         </FormControl>
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 6 }}>{selectedItem.length > 0 && <Itempage selectedItem={selectedItem} />}</Grid>
//                     <Grid size={{ xs: 12 }}>
//                         <Button type="submit" variant="contained" color="primary" fullWidth>
//                             Submit
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </form>
//         </LocalizationProvider>
//     );
// };

// export default EstimateForm;
import React from 'react'

export default function estimateForm() {
  return (
    <div>estimateForm</div>
  )
}
