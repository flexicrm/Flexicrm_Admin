// "use client";

// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { useContext, useEffect } from "react";
// import userContext from "@/app/UseContext/UseContext";
// import { Dropdown } from "primereact/dropdown";
// import { InputText } from "primereact/inputtext";
// import { InputNumber } from "primereact/inputnumber";
// import { InputTextarea } from "primereact/inputtextarea";
// import { API_BASE_URL } from "@/app/utils";

// const InvoiceForm = () => {
//   const subdomain = Cookies.get("subdomain");
//   const accessToken = Cookies.get("accessToken");
//   const customberData = useContext(userContext);
//   const { Customber } = customberData;

//   const formik = useFormik({
//     initialValues: {
//       invoiceNumber: "",
//       customerId: null,
//       dueDate: "",
//       issuedDate: "",
//       invoiceFile: "",
//       subtotal: "",
//       discount: 0,
//       gst: "",
//       igst: "",
//       total: "",
//       status: 1,
//       createdBy: "",
//       paymentStatus: "unpaid",
//       paymentMethod: "",
//       tags: "",
//       notes: "",
//     },

//     onSubmit: async (values) => {

//       try {
//         const headers = {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         };
//         const response = await axios.post(
//           `${API_BASE_URL}/invoice/${subdomain}`,
//           values ,{headers}
//         );

//         if (response.status === 200) {
//           console.log("Invoice created successfully");
//         } else {
//           console.error("Failed to create invoice");
//         }
//       } catch (error) {
//         console.error("An error occurred:", error);
//       }
//     },
//   });
//   console.log(formik)
//   console.log(Customber);
//   const usersOptions = Customber.map((user) => ({
//     label: user.Companyname,
//     value: user._id
//     ,
//   }));
//   const fetchCustomers = async () => {
//     const headers = { Authorization: `Bearer ${accessToken}` };
//     try {
//       const res = await axios.get(`${API_BASE_URL}/customer/${subdomain}`, {
//         headers,
//       });
//       const fetchedCustomers = res?.data?.data?.customers || [];

//       customberData.setCustomber(fetchedCustomers)
//       if (fetchedCustomers.length > 0) {
//         setSelectedCustomer(fetchedCustomers[0]);
//       }
//     } catch (error) {
//       console.error("Error fetching customer data:", error);
//     }
//   };
//   useEffect(()=>{
//     fetchCustomers()
//   },[])
//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <div>
//         <label>Invoice Number</label>
//         <InputText
//           name="invoiceNumber"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.invoiceNumber}
//         />
//         {formik.touched.invoiceNumber && formik.errors.invoiceNumber ? (
//           <div>{formik.errors.invoiceNumber}</div>
//         ) : null}
//       </div>

//       <div>
//         <label>Customer</label>
//         <Dropdown
//           options={usersOptions}
//           onChange={(e) => formik.setFieldValue("customerId", e.value)}
//           value={formik.values.customerId}
//           placeholder="Select a customer"
//         />
//         {formik.touched.customerId && formik.errors.customerId ? (
//           <div>{formik.errors.customerId}</div>
//         ) : null}
//       </div>

//       <div>
//         <label>Issued Date</label>
//         <InputText
//           type="date"
//           name="issuedDate"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.issuedDate}
//         />
//       </div>

//       <div>
//         <label>Due Date</label>
//         <InputText
//           type="date"
//           name="dueDate"
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           value={formik.values.dueDate}
//         />
//         {formik.touched.dueDate && formik.errors.dueDate ? (
//           <div>{formik.errors.dueDate}</div>
//         ) : null}
//       </div>

//       <div>
//         <label>Subtotal</label>
//         <InputNumber
//           name="subtotal"
//           onValueChange={(e) => formik.setFieldValue("subtotal", e.value)}
//           value={formik.values.subtotal}
//         />
//         {formik.touched.subtotal && formik.errors.subtotal ? (
//           <div>{formik.errors.subtotal}</div>
//         ) : null}
//       </div>

//       <div>
//         <label>Discount</label>
//         <InputNumber
//           name="discount"
//           onValueChange={(e) => formik.setFieldValue("discount", e.value)}
//           value={formik.values.discount}
//         />
//       </div>

//       <div>
//         <label>GST</label>
//         <InputNumber
//           name="gst"
//           onValueChange={(e) => formik.setFieldValue("gst", e.value)}
//           value={formik.values.gst}
//         />
//         {formik.touched.gst && formik.errors.gst ? (
//           <div>{formik.errors.gst}</div>
//         ) : null}
//       </div>

//       <div>
//         <label>IGST</label>
//         <InputNumber
//           name="igst"
//           onValueChange={(e) => formik.setFieldValue("igst", e.value)}
//           value={formik.values.igst}
//         />
//         {formik.touched.igst && formik.errors.igst ? (
//           <div>{formik.errors.igst}</div>
//         ) : null}
//       </div>

//       <div>
//         <label>Total</label>
//         <InputNumber
//           name="total"
//           onValueChange={(e) => formik.setFieldValue("total", e.value)}
//           value={formik.values.total}
//         />
//         {formik.touched.total && formik.errors.total ? (
//           <div>{formik.errors.total}</div>
//         ) : null}
//       </div>

//       <div>
//         <label>Payment Status</label>
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
//         <label>Payment Method</label>
//         <InputText
//           name="paymentMethod"
//           onChange={formik.handleChange}
//           value={formik.values.paymentMethod}
//         />
//       </div>

//       <div>
//         <label>Tags (comma separated)</label>
//         <InputText
//           name="tags"
//           onChange={formik.handleChange}
//           value={formik.values.tags}
//         />
//       </div>

//       <div>
//         <label>Notes</label>
//         <InputTextarea
//           name="notes"
//           onChange={formik.handleChange}
//           value={formik.values.notes}
//         />
//       </div>

//       <button type="submit">Create Invoice</button>
//     </form>
//   );
// };

// export default InvoiceForm;
import React from 'react';
import InvoicesPage from './InvoicesPage';

export default function page({ fetchData }: any) {
    // const invoicedata =data?.invoices

    // console.log(slug, 'data  =====================');
    return (
        <div>
            <InvoicesPage fetchData={fetchData} />
        </div>
    );
}
