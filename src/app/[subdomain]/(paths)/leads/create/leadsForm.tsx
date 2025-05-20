// // "use client";
// // import { useFormik } from "formik";
// // import * as Yup from "yup";
// // import { InputText } from "primereact/inputtext";
// // import { InputTextarea } from "primereact/inputtextarea";
// // import { Button } from "primereact/button";
// // import LeadStatus from "./LeadStatus";
// // import LeadSource from "./LeadSource";
// // import { Dropdown } from "primereact/dropdown";
// // import { InputMask } from 'primereact/inputmask';
// // import { useContext, useState } from "react";
// // import { Col, Row } from "react-bootstrap";
// // import { TabPanel, TabView } from "primereact/tabview";
// // import CustomizedleadPage from "./customizedPage"
// // import { Editor } from "primereact/editor";
// // import userContext from "@/app/UseContext/UseContext";
// // import { Calendar } from "primereact/calendar";
// // const LeadForm = ({ onSubmit, UsersOptions }) => {
// //     const [leadStatus, setLeadStatus] = useState("");
// //     const [leadSource, setLeadSource] = useState("");
// //     const { valuesdataleads } = useContext(userContext)

// //     const formik = useFormik({
// //         initialValues: {
// //             manualData: {
// //                 name: "",
// //                 email: "",
// //                 mobileNo: "",
// //                 company: "",
// //                 address: {
// //                     street: "",
// //                     city: "",
// //                     state: "",
// //                     zipCode: "",
// //                     country: "",
// //                 },
// //             },
// //             description: "",
// //             assignTo: null,

// //             followUp: [{
// //                 followUpDate: "",
// //                 notes: ""
// //               }
// //             ]

// //         },
// //         validationSchema: Yup.object({
// //             manualData: Yup.object().shape({
// //                 name: Yup.string().required("Required"),
// //                 email: Yup.string().email("Invalid email format").required("Required"),
// //                 company: Yup.string().required("Required"),
// //                 mobileNo: Yup.string()
// //                     .matches(/^\+\d{2}-\d{10}$/, "Mobile number must be in format +xx-xxxxxxxxxx")
// //                     .required("Required"),
// //                 address: Yup.object().shape({
// //                     street: Yup.string().required("Required"),
// //                     city: Yup.string().required("Required"),
// //                     state: Yup.string().required("Required"),
// //                     zipCode: Yup.string().required("Required"),
// //                     country: Yup.string().required("Required"),
// //                 }),
// //             }),

// //             assignTo: Yup.string().required("Required"),
// //         }),
// //         onSubmit: (values) => {
// //             const formData = {
// //                 leadsource: leadSource,
// //                 leadstatus: leadStatus,
// //                 manualData: values.manualData,
// //                 assignTo: values.assignTo,
// //                 customFields: valuesdataleads,
// //                 description: values.description,
// //             };
// //             onSubmit(formData);
// //         },
// //     });

// //     return (
// //         <>

// //             <TabView>
// //                 <TabPanel header="Lead">
// //                     <p className="m-0">
// //                         <form onSubmit={formik.handleSubmit} >

// //                             <Row >

// //                                 <Col className="">
// //                                     <label htmlFor="assignTo">LeadStatus</label>
// //                                     <LeadStatus onSelect={setLeadStatus} />
// //                                 </Col>
// //                                 <Col className="ms-2 ">
// //                                     <label htmlFor="assignTo">LeadSource</label>
// //                                     <LeadSource onSelect={setLeadSource} />
// //                                 </Col>

// //                                 <Col className="ms-2" >
// //                                     <label htmlFor="assignTo">Assign To </label><br />
// //                                     <Dropdown
// //                                         id="assignTo"
// //                                         options={UsersOptions}
// //                                         value={formik.values.assignTo}
// //                                         onChange={(e) => formik.setFieldValue("assignTo", e.value)}
// //                                         placeholder="Assign To"
// //                                         className={formik.touched.assignTo && formik.errors.assignTo ? 'p-invalid' : ''}
// //                                     />
// //                                     {formik.touched.assignTo && formik.errors.assignTo && (
// //                                         <small className="p-error">{formik.errors.assignTo}</small>
// //                                     )}
// //                                 </Col>
// //                             </Row>
// //                             <div>

// //                                 <Row>
// //                                     <Col><div className="p-field">
// //                                         <label htmlFor="name">Name</label> <br />
// //                                         <InputText
// //                                             id="name"
// //                                             name="manualData.name"
// //                                             value={formik.values.manualData.name}
// //                                             onChange={formik.handleChange}
// //                                             onBlur={formik.handleBlur}
// //                                         />
// //                                         {formik.touched.manualData?.name && formik.errors.manualData?.name && (
// //                                             <small className="p-error">{formik.errors.manualData.name}</small>
// //                                         )}
// //                                     </div></Col>
// //                                     <Col>
// //                                         <div className="p-field">
// //                                             <label htmlFor="email">Email</label><br />
// //                                             <InputText
// //                                                 id="email"
// //                                                 name="manualData.email"
// //                                                 value={formik.values.manualData.email}
// //                                                 onChange={formik.handleChange}
// //                                                 onBlur={formik.handleBlur}
// //                                             />
// //                                             {formik.touched.manualData?.email && formik.errors.manualData?.email && (
// //                                                 <small className="p-error">{formik.errors.manualData.email}</small>
// //                                             )}
// //                                         </div>
// //                                     </Col>

// //                                 </Row>
// //                                 <Row>
// //                                     <Col>  <div className="p-field">
// //                                         <label htmlFor="mobileNo">Mobile Number</label> <br />
// //                                         <InputMask
// //                                             id="mobileNo"
// //                                             name="manualData.mobileNo"
// //                                             value={formik.values.manualData.mobileNo}
// //                                             onChange={formik.handleChange}
// //                                             onBlur={formik.handleBlur}
// //                                             mask="+99-9999999999"
// //                                         />
// //                                         {formik.touched.manualData?.mobileNo && formik.errors.manualData?.mobileNo && (
// //                                             <small className="p-error">{formik.errors.manualData.mobileNo}</small>
// //                                         )}
// //                                     </div></Col>
// //                                     <Col> <div className="p-field">
// //                                         <label htmlFor="address.street">Street</label> <br />
// //                                         <InputText
// //                                             id="address.street"
// //                                             name="manualData.address.street"
// //                                             value={formik.values.manualData.address.street}
// //                                             onChange={formik.handleChange}
// //                                             onBlur={formik.handleBlur}
// //                                         />
// //                                         {formik.touched.manualData?.address?.street && formik.errors.manualData?.address?.street && (
// //                                             <small className="p-error">{formik.errors.manualData.address.street}</small>
// //                                         )}
// //                                     </div>
// //                                     </Col>
// //                                 </Row>
// //                                 <Row>

// //                                     <Col>
// //                                         <div className="p-field">
// //                                             <label htmlFor="address.city">City</label> <br />
// //                                             <InputText
// //                                                 id="address.city"
// //                                                 name="manualData.address.city"
// //                                                 value={formik.values.manualData.address.city}
// //                                                 onChange={formik.handleChange}
// //                                                 onBlur={formik.handleBlur}
// //                                             />
// //                                             {formik.touched.manualData?.address?.city && formik.errors.manualData?.address?.city && (
// //                                                 <small className="p-error">{formik.errors.manualData.address.city}</small>
// //                                             )}
// //                                         </div></Col>
// //                                     <Col> <div className="p-field">
// //                                         <label htmlFor="address.state">State</label> <br />
// //                                         <InputText
// //                                             id="address.state"
// //                                             name="manualData.address.state"
// //                                             value={formik.values.manualData.address.state}
// //                                             onChange={formik.handleChange}
// //                                             onBlur={formik.handleBlur}
// //                                         />
// //                                         {formik.touched.manualData?.address?.state && formik.errors.manualData?.address?.state && (
// //                                             <small className="p-error">{formik.errors.manualData.address.state}</small>
// //                                         )}
// //                                     </div></Col>
// //                                 </Row>
// //                                 <Row>
// //                                     <Col><div className="p-field">
// //                                         <label htmlFor="address.zipCode">Zip Code</label> <br />
// //                                         <InputText
// //                                             id="address.zipCode"
// //                                             name="manualData.address.zipCode"
// //                                             value={formik.values.manualData.address.zipCode}
// //                                             onChange={formik.handleChange}
// //                                             onBlur={formik.handleBlur}
// //                                         />
// //                                         {formik.touched.manualData?.address?.zipCode && formik.errors.manualData?.address?.zipCode && (
// //                                             <small className="p-error">{formik.errors.manualData.address.zipCode}</small>
// //                                         )}
// //                                     </div>
// //                                     </Col>
// //                                     <Col> <div className="p-field">
// //                                         <label htmlFor="address.country">Country</label><br />
// //                                         <InputText
// //                                             id="address.country"
// //                                             name="manualData.address.country"
// //                                             value={formik.values.manualData.address.country}
// //                                             onChange={formik.handleChange}
// //                                             onBlur={formik.handleBlur}
// //                                         />
// //                                         {formik.touched.manualData?.address?.country && formik.errors.manualData?.address?.country && (
// //                                             <small className="p-error">{formik.errors.manualData.address.country}</small>
// //                                         )}
// //                                     </div>
// //                                     </Col>
// //                                 </Row>
// //                                 <Row>
// //                                     <Col> <div className="p-field">
// //                                         <label htmlFor="company">Company</label> <br />
// //                                         <InputText
// //                                             id="company"
// //                                             name="manualData.company"
// //                                             value={formik.values.manualData.company}
// //                                             onChange={formik.handleChange}
// //                                             onBlur={formik.handleBlur}
// //                                         />
// //                                         {formik.touched.company && formik.errors.company && (
// //                                             <small className="p-error">{formik.errors.company}</small>
// //                                         )}
// //                                     </div>
// //                                     </Col>

// //                                 </Row>
// //                                 <Row>
// //                                     <div>Follow Up</div>

// //                                     <Col> <div className="p-field">
// //                                         <label htmlFor="followUpDate">follow Up Date</label> <br />
// //                                         <Calendar
// //                                             id="followUp.followUpDate"
// //                                             name="followUp.followUpDate"
// //                                             value={formik.values.followUp.followUpDate}
// //                                             onChange={formik.handleChange}
// //                                             onBlur={formik.handleBlur}
// //                                         />

// //                                     </div>
// //                                     </Col>
// //                                     <Col> <div className="p-field">
// //                                         <label htmlFor="notes">Notes</label> <br />
// //                                         <InputText
// //                                             id="followUp.notes"
// //                                             name="followUp.notes"
// //                                             value={formik.values.followUp.notes}
// //                                             onChange={formik.handleChange}
// //                                             onBlur={formik.handleBlur}
// //                                         />

// //                                     </div>
// //                                     </Col>
// //                                 </Row>
// //                                 <Row>
// //                                     <Col>
// //                                         <div className="p-field">
// //                                             <label htmlFor="description">Description</label> <br />
// //                                             <Editor
// //                                                 id="description"
// //                                                 name="description"
// //                                                 className="h-50"
// //                                                 value={formik.values.description}
// //                                                 onChange={formik.handleChange}
// //                                                 onBlur={formik.handleBlur}
// //                                                 rows={3}
// //                                             />

// //                                         </div></Col>
// //                                 </Row>

// //                             </div>
// //                             <Button type="submit" label="Submit" />
// //                         </form>
// //                     </p>
// //                 </TabPanel>
// //                 <TabPanel header="Custom Filds">
// //                     <CustomizedleadPage />
// //                 </TabPanel>

// //             </TabView>

// //         </>

// //     );
// // };

// // export default LeadForm;
// "use client";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { InputText } from "primereact/inputtext";
// import { InputTextarea } from "primereact/inputtextarea";
// import { Button } from "primereact/button";
// import LeadStatus from "./LeadStatus";
// import LeadSource from "./LeadSource";
// import { Dropdown } from "primereact/dropdown";
// import { InputMask } from 'primereact/inputmask';
// import { useContext, useState } from "react";
// import { Col, Row } from "react-bootstrap";
// import { TabPanel, TabView } from "primereact/tabview";
// import CustomizedleadPage from "./customizedPage";
// import { Editor } from "primereact/editor";
// import userContext from "@/app/UseContext/UseContext";
// import { Calendar } from "primereact/calendar";

// const LeadForm = ({ onSubmit, UsersOptions }) => {
//     const [leadStatus, setLeadStatus] = useState("");
//     const [leadSource, setLeadSource] = useState("");
//     const { valuesdataleads } = useContext(userContext);

//     const formik = useFormik({
//         initialValues: {
//             manualData: {
//                 name: "",
//                 email: "",
//                 mobileNo: "",
//                 company: "",
//                 address: {
//                     street: "",
//                     city: "",
//                     state: "",
//                     zipCode: "",
//                     country: "",
//                 },
//             },
//             description: "",
//             assignTo: null,

//         },
//         validationSchema: Yup.object({
//             manualData: Yup.object().shape({
//                 name: Yup.string().required("Required"),
//                 email: Yup.string().email("Invalid email format").required("Required"),
//                 company: Yup.string().required("Required"),
//                 mobileNo: Yup.string()
//                     .matches(/^\+\d{2}-\d{10}$/, "Mobile number must be in format +xx-xxxxxxxxxx")
//                     .required("Required"),
//                 address: Yup.object().shape({
//                     street: Yup.string().required("Required"),
//                     city: Yup.string().required("Required"),
//                     state: Yup.string().required("Required"),
//                     zipCode: Yup.string().required("Required"),
//                     country: Yup.string().required("Required"),
//                 }),
//             }),
//             assignTo: Yup.string().required("Required"),
//             followUp: Yup.array().of(
//                 Yup.object().shape({
//                     followUpDate: Yup.date().required("Required"),
//                     notes: Yup.string().required("Required"),
//                 })
//             ),
//         }),
//         onSubmit: (values) => {
//             const formData = {
//                 leadsource: leadSource,
//                 leadstatus: leadStatus,
//                 manualData: values.manualData,
//                 assignTo: values.assignTo,
//                 customFields: valuesdataleads,
//                 description: values.description,
//                 followUp: values.followUp,
//             };
//             onSubmit(formData);
//         },
//     });

//     const addFollowUp = () => {
//         formik.setFieldValue("followUp", [...formik.values.followUp, { followUpDate: "", notes: "" }]);
//     };

//     const removeFollowUp = (index) => {
//         const updatedFollowUp = formik.values.followUp.filter((_, i) => i !== index);
//         formik.setFieldValue("followUp", updatedFollowUp);
//     };

//     const renderError = (field) => {
//         return formik.touched[field] && formik.errors[field] ? (
//             <small className="p-error">{formik.errors[field]}</small>
//         ) : null;
//     };

//     return (
//         <TabView>
//             <TabPanel header="Lead">
//                 <form onSubmit={formik.handleSubmit}>
//                     <Row>
//                         <Col>
//                             <label htmlFor="assignTo">Lead Status</label>
//                             <LeadStatus onSelect={setLeadStatus} />
//                         </Col>
//                         <Col className="ms-2">
//                             <label htmlFor="assignTo">Lead Source</label>
//                             <LeadSource onSelect={setLeadSource} />
//                         </Col>
//                         <Col className="ms-2">
//                             <label htmlFor="assignTo">Assign To</label><br />
//                             <Dropdown
//                                 id="assignTo"
//                                 options={UsersOptions}
//                                 value={formik.values.assignTo}
//                                 onChange={(e) => formik.setFieldValue("assignTo", e.value)}
//                                 placeholder="Assign To"
//                                 className={formik.touched.assignTo && formik.errors.assignTo ? 'p-invalid' : ''}
//                             />
//                             {renderError("assignTo")}
//                         </Col>
//                     </Row>
//                     <div>
//                         <Row>
//                             <Col>
//                                 <div className="p-field">
//                                     <label htmlFor="name">Name</label><br />
//                                     <InputText
//                                         id="name"
//                                         name="manualData.name"
//                                         value={formik.values.manualData.name}
//                                         onChange={formik.handleChange}
//                                         onBlur={formik.handleBlur}
//                                     />
//                                     {renderError("manualData.name")}
//                                 </div>
//                             </Col>
//                             <Col>
//                                 <div className="p-field">
//                                     <label htmlFor="email">Email</label><br />
//                                     <InputText
//                                         id="email"
//                                         name="manualData.email"
//                                         value={formik.values.manualData.email}
//                                         onChange={formik.handleChange}
//                                         onBlur={formik.handleBlur}
//                                     />
//                                     {renderError("manualData.email")}
//                                 </div>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col>
//                                 <div className="p-field">
//                                     <label htmlFor="mobileNo">Mobile Number</label><br />
//                                     <InputMask
//                                         id="mobileNo"
//                                         name="manualData.mobileNo"
//                                         value={formik.values.manualData.mobileNo}
//                                         onChange={formik.handleChange}
//                                         onBlur={formik.handleBlur}
//                                         mask="+99-9999999999"
//                                     />
//                                     {renderError("manualData.mobileNo")}
//                                 </div>
//                             </Col>
//                             <Col>
//                                 <div className="p-field">
//                                     <label htmlFor="address.street">Street</label><br />
//                                     <InputText
//                                         id="address.street"
//                                         name="manualData.address.street"
//                                         value={formik.values.manualData.address.street}
//                                         onChange={formik.handleChange}
//                                         onBlur={formik.handleBlur}
//                                     />
//                                     {renderError("manualData.address.street")}
//                                 </div>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col>
//                                 <div className="p-field">
//                                     <label htmlFor="address.city">City</label><br />
//                                     <InputText
//                                         id="address.city"
//                                         name="manualData.address.city"
//                                         value={formik.values.manualData.address.city}
//                                         onChange={formik.handleChange}
//                                         onBlur={formik.handleBlur}
//                                     />
//                                     {renderError("manualData.address.city")}
//                                 </div>
//                             </Col>
//                             <Col>
//                                 <div className="p-field">
//                                     <label htmlFor="address.state">State</label><br />
//                                     <InputText
//                                         id="address.state"
//                                         name="manualData.address.state"
//                                         value={formik.values.manualData.address.state}
//                                         onChange={formik.handleChange}
//                                         onBlur={formik.handleBlur}
//                                     />
//                                     {renderError("manualData.address.state")}
//                                 </div>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col>
//                                 <div className="p-field">
//                                     <label htmlFor="address.zipCode">Zip Code</label><br />
//                                     <InputText
//                                         id="address.zipCode"
//                                         name="manualData.address.zipCode"
//                                         value={formik.values.manualData.address.zipCode}
//                                         onChange={formik.handleChange}
//                                         onBlur={formik.handleBlur}
//                                     />
//                                     {renderError("manualData.address.zipCode")}
//                                 </div>
//                             </Col>
//                             <Col>
//                                 <div className="p-field">
//                                     <label htmlFor="address.country">Country</label><br />
//                                     <InputText
//                                         id="address.country"
//                                         name="manualData.address.country"
//                                         value={formik.values.manualData.address.country}
//                                         onChange={formik.handleChange}
//                                         onBlur={formik.handleBlur}
//                                     />
//                                     {renderError("manualData.address.country")}
//                                 </div>
//                             </Col>
//                         </Row>
//                         <Row>
//                             <Col>
//                                 <div className="p-field">
//                                     <label htmlFor="company">Company</label><br />
//                                     <InputText
//                                         id="company"
//                                         name="manualData.company"
//                                         value={formik.values.manualData.company}
//                                         onChange={formik.handleChange}
//                                         onBlur={formik.handleBlur}
//                                     />
//                                     {renderError("manualData.company")}
//                                 </div>
//                             </Col>
//                         </Row>

//                         <Row>
//                             <Col>
//                                 <div className="p-field">
//                                     <label htmlFor="description">Description</label><br />
//                                     <Editor
//                                         id="description"
//                                         name="description"
//                                         className="h-50"
//                                         value={formik.values.description}
//                                         onChange={formik.handleChange}
//                                         onBlur={formik.handleBlur}
//                                         rows={3}
//                                     />
//                                 </div>
//                             </Col>
//                         </Row>
//                     </div>
//                     <Button type="submit" label="Submit" />
//                 </form>
//             </TabPanel>
//             <TabPanel header="Custom Fields">
//                 <CustomizedleadPage />
//             </TabPanel>
//         </TabView>
//     );
// };

// export default LeadForm;

'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useEffect, useState } from 'react';
import { Box, Button, Grid, TextField, MenuItem, Typography, Tabs, Tab, Paper } from '@mui/material';
import LeadStatus from '../leadstatus';
import LeadSource from '../leadsource';
import CustomizedleadPage from '../customizedPage';
import userContext from '../../../../UseContext/UseContext';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Editor } from 'primereact/editor';

const LeadForm = ({ onSubmit, UsersOptions, customers, lead }: { onSubmit: (data: any) => void; UsersOptions: any[]; customers: any; lead: any }) => {
    const [leadStatus, setLeadStatus] = useState(lead?.leadstatus?._id || '');
    const [leadSource, setLeadSource] = useState(lead?.leadsource || '');
    const [leadsData, setLeadsData] = useState(null);
    const { valuesdataleads } = useContext(userContext);
    console.log(lead, 'editingLead>>>>>>>>>>>???????????');
    // console.log(leadStatus, 'editingLead<<<<<<<<<<<<');
    // console.log(leadSource, 'leadStatus>>>>>>>>>>>>>>');
    // console.log(leadsData, 'leadsData>>>>>>./>>>>>>>>');

    useEffect(() => {
        if (lead) {
            setLeadsData({
                ...lead,
                followUp: lead.followUps || []
            });
            setLeadStatus(lead || '');
            setLeadSource(lead?.leadsource || '');

            // Set Formik values directly for editing
            formik.setValues({
                manualData: {
                    name: lead.Name || '',
                    email: lead?.Email || '',
                    mobileNo: lead?.Phone || '',
                    company: lead?.Company || '',
                    address: {
                        street: lead?.Address?.street || '',
                        city: lead?.Address?.city || '',
                        state: lead?.Address?.state || '',
                        zipCode: lead?.Address?.zipCode || '',
                        country: lead?.Address?.country || ''
                    }
                },
                description: lead.description || '',
                assignTo: lead.assignTo || '',
                followUp: lead.followUps || []
            });
        }
    }, [lead]);
    const formik = useFormik({
        initialValues: {
            manualData: {
                name: leadsData?.manualData?.name || '',
                email: leadsData?.manualData?.email || '',
                mobileNo: leadsData?.manualData?.mobileNo || '',
                company: leadsData?.manualData?.company || '',
                address: {
                    street: leadsData?.manualData?.address?.street || '',
                    city: leadsData?.manualData?.address?.city || '',
                    state: leadsData?.manualData?.address?.state || '',
                    zipCode: leadsData?.manualData?.address?.zipCode || '',
                    country: leadsData?.manualData?.address?.country || ''
                }
            },
            description: leadsData?.description || '',
            assignTo: leadsData?.assignTo?._id || '',
            followUp: []
        },
        validationSchema: Yup.object({
            manualData: Yup.object().shape({
                name: Yup.string().required('Required'),
                email: Yup.string().email('Invalid email format').required('Required'),
                company: Yup.string().required('Required'),
                mobileNo: Yup.string()
                    .matches(/^\+\d{2}-\d{10}$/, 'Mobile number must be in format +xx-xxxxxxxxxx')
                    .required('Required'),
                address: Yup.object().shape({
                    street: Yup.string().required('Required'),
                    city: Yup.string().required('Required'),
                    state: Yup.string().required('Required'),
                    zipCode: Yup.string().required('Required'),
                    country: Yup.string().required('Required')
                })
            }),
            assignTo: Yup.string().required('Required')
            // followUp: Yup.array().of(
            //   Yup.object().shape({
            //     followUpDate: Yup.date().required("Required"),
            //     notes: Yup.string().required("Required"),
            //   })
            // ),
        }),
        onSubmit: (values) => {
            const formData = {
                leadsource: leadSource,
                leadstatus: leadStatus,
                manualData: values.manualData,
                assignTo: values.assignTo,
                customFields: valuesdataleads,
                description: values.description,
                followUp: values.followUp
            };
            onSubmit(formData);
        }
    });

    console.log(formik.initialValues, 'formik');

    const renderError = (field: string) => {
        const error = formik.errors as any;
        const touched = formik.touched as any;
        return touched?.[field] && error?.[field] ? (
            <Typography variant="caption" color="error">
                {error[field]}
            </Typography>
        ) : null;
    };

    return (
        <>
            <Paper elevation={0} sx={{ p: 2 }}>
                {/* <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}>
                <Tab label="Lead" /> */}
                {/* <Tab label="Custom Fields" /> */}
                {/* </Tabs> */}
                {/* {tab === 0 && ( */}
                <form onSubmit={formik.handleSubmit} autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <Typography sx={{ mb: 2 }}>
                                <Typography variant="subtitle2">Lead Status</Typography>
                            </Typography>
                            <Typography>
                                <LeadStatus leadStatus={leadStatus} onSelect={setLeadStatus} />
                            </Typography>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <Typography sx={{ mb: 2 }}>
                                <Typography variant="subtitle2">Lead Source</Typography>
                            </Typography>
                            <LeadSource onSelect={setLeadSource} leadSource={leadSource} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <Typography>
                                <Typography variant="subtitle2">Assign To</Typography>
                            </Typography>
                            <TextField
                                select
                                fullWidth
                                label="Assign To"
                                sx={{ mt: 2 }}
                                name="assignTo"
                                value={formik.values.assignTo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.assignTo && formik.errors.assignTo)}
                                helperText={formik.touched.assignTo && typeof formik.errors.assignTo === 'string' ? formik.errors.assignTo : ''}
                                margin="normal"
                            >
                                {UsersOptions?.map((option) => (
                                    <MenuItem key={option.value || option.id} value={option.value || option.id}>
                                        {option.label || option.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="manualData.name"
                                value={formik.values.manualData.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.manualData?.name && formik.errors.manualData?.name)}
                                helperText={formik.touched.manualData?.name && (formik.errors.manualData as any)?.name}
                                margin="normal"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="manualData.email"
                                value={formik.values.manualData.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.manualData?.email && formik.errors.manualData?.email)}
                                helperText={formik.touched.manualData?.email && (formik.errors.manualData as any)?.email}
                                margin="normal"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Mobile Number"
                                name="manualData.mobileNo"
                                value={formik.values.manualData.mobileNo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.manualData?.mobileNo && formik.errors.manualData?.mobileNo)}
                                helperText={formik.touched.manualData?.mobileNo && (formik.errors.manualData as any)?.mobileNo}
                                margin="normal"
                                placeholder="+91-1234567890"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Street"
                                name="manualData.address.street"
                                value={formik.values.manualData.address.street}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.manualData?.address?.street && formik.errors.manualData?.address?.street)}
                                helperText={formik.touched.manualData?.address?.street && (formik.errors.manualData?.address as any)?.street}
                                margin="normal"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="City"
                                name="manualData.address.city"
                                value={formik.values.manualData.address.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.manualData?.address?.city && formik.errors.manualData?.address?.city)}
                                helperText={formik.touched.manualData?.address?.city && (formik.errors.manualData?.address as any)?.city}
                                margin="normal"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="State"
                                name="manualData.address.state"
                                value={formik.values.manualData.address.state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.manualData?.address?.state && formik.errors.manualData?.address?.state)}
                                helperText={formik.touched.manualData?.address?.state && (formik.errors.manualData?.address as any)?.state}
                                margin="normal"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Zip Code"
                                name="manualData.address.zipCode"
                                value={formik.values.manualData.address.zipCode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.manualData?.address?.zipCode && formik.errors.manualData?.address?.zipCode)}
                                helperText={formik.touched.manualData?.address?.zipCode && (formik.errors.manualData?.address as any)?.zipCode}
                                margin="normal"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Country"
                                name="manualData.address.country"
                                value={formik.values.manualData.address.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.manualData?.address?.country && formik.errors.manualData?.address?.country)}
                                helperText={formik.touched.manualData?.address?.country && (formik.errors.manualData?.address as any)?.country}
                                margin="normal"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label="Company"
                                name="manualData.company"
                                value={formik.values.manualData.company}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={!!(formik.touched.manualData?.company && formik.errors.manualData?.company)}
                                helperText={formik.touched.manualData?.company && (formik.errors.manualData as any)?.company}
                                margin="normal"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                Description
                            </Typography>
                            <Editor id="description" name="description" value={formik.values.description} onTextChange={(e) => formik.setFieldValue('description', e.htmlValue)} style={{ height: 120 }} />
                        </Grid>
                        {/* You can add followUp fields here if needed */}
                        <Grid size={{ xs: 12, sm: 12 }}>
                            <Box mt={2}>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
                {/* )} */}
                {/* {tab === 1 && <CustomizedleadPage />} */}
            </Paper>
        </>
    );
};

export default LeadForm;
