// // import React, { useContext, useEffect } from 'react';
// // import { Formik, Form, FieldArray, Field } from 'formik';
// // import axios from 'axios';
// // import { InputNumber } from 'primereact/inputnumber';
// // import { Button } from 'primereact/button';
// // import Cookies from 'js-cookie';
// // import { API_BASE_URL } from '@/app/utils';
// // import userContext from '@/app/UseContext/UseContext';

// // export default function Itempage({ selectedItem }) {
// //   const { singleitem, setSingleitem, setDiscount, setSubtotal, setFinalTotal } = useContext(userContext);

// //   useEffect(() => {
// //     const fetchItems = async () => {
// //       const subdomain = Cookies.get("subdomain");
// //       const accessToken = Cookies.get("accessToken");
// //       if (!subdomain || !accessToken || selectedItem.length === 0) return;

// //       try {
// //         const headers = { Authorization: `Bearer ${accessToken}` };
// //         const response = await axios.get(
// //           `${API_BASE_URL}/item/${subdomain}/items?itemIds=${selectedItem.join(",")}`,
// //           { headers }
// //         );
// //         setSingleitem(response.data.data.items || []);
// //       } catch (error) {
// //         console.error("Error fetching items:", error);
// //       }
// //     };

// //     fetchItems();
// //   }, [selectedItem, setSingleitem]);

// //   return (
// //     <Formik
// //       initialValues={{
// //         items: singleitem,
// //         discount: 0,
// //       }}
// //       enableReinitialize
// //       onSubmit={(values) => {
// //         const itemsToSubmit = values.items.map(item => ({
// //           _id: item._id,
// //           quantity: item.quantity,
// //         }));

// //         // Send `itemsToSubmit` to your API or handle as needed
// //         console.log("Submitting items:", itemsToSubmit);
// //       }}
// //     >
// //       {({ values, setFieldValue }) => {
// //         const subtotal = values.items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
// //         const totalAfterDiscount = values.discount > 0
// //           ? subtotal - (subtotal * (values.discount / 100))
// //           : subtotal;

// //         const gstRate = 5; // Adjust as necessary
// //         const gst = (totalAfterDiscount * (gstRate / 100));
// //         const cgst = gst; // Assuming GST is equally divided into CGST and SGST
// //         const finalTotal = totalAfterDiscount + gst + cgst;

// //         // Update context with the new values
// //         useEffect(() => {
// //           setSingleitem(values.items);
// //           setDiscount(values.discount);
// //           setSubtotal(subtotal);
// //           setFinalTotal(finalTotal);
// //         }, [values.items, values.discount, subtotal, finalTotal, setSingleitem, setDiscount, setSubtotal, setFinalTotal]);

// //         return (
// //           <Form>
// //             {values.items.length > 0 && (
// //               <FieldArray name="items">
// //                 {({ remove }) => (
// //                   <table className="table w-50">
// //                     <thead>
// //                       <tr>
// //                         <th>Item Name</th>
// //                         <th>Quantity</th>
// //                         <th>Price</th>
// //                         <th>Action</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {values.items.map((item, index) => (
// //                         <tr key={item._id}>
// //                           <td>{item.itemName}</td>
// //                           <td>
// //                             <Field name={`items.${index}.quantity`}>
// //                               {({ field }) => (
// //                                 <InputNumber
// //                                   {...field}
// //                                   value={item.quantity || 0}
// //                                   onValueChange={(e) => {
// //                                     setFieldValue(`items.${index}.quantity`, e.value);
// //                                   }}
// //                                 />
// //                               )}
// //                             </Field>
// //                           </td>
// //                           <td>{item.price}</td>
// //                           <td>
// //                             <Button type="button" onClick={() => remove(index)}>
// //                               Remove
// //                             </Button>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 )}
// //               </FieldArray>
// //             )}
// //             <div>
// //               <label>Discount (%):</label>
// //               <Field name="discount">
// //                 {({ field }) => (
// //                   <InputNumber
// //                     {...field}
// //                     value={values.discount}
// //                     onValueChange={(e) => setFieldValue("discount", e.value)}
// //                   />
// //                 )}
// //               </Field>
// //             </div>
// //             <div>
// //               <p>Subtotal: {subtotal.toFixed(2)}</p>
// //               <p><strong>GST:</strong> {gst.toFixed(2)} (Rate: {gstRate}%)</p>
// //               <p><strong>CGST:</strong> {cgst.toFixed(2)} (Rate: {gstRate}%)</p>
// //               <p><strong>Final Total:</strong> {finalTotal.toFixed(2)}</p>
// //             </div>
// //             {/* <Button type="submit">Submit</Button> */}
// //           </Form>
// //         );
// //       }}
// //     </Formik>
// //   );
// // }

// // import React, { useContext, useEffect } from 'react';
// // import { Formik, Form, FieldArray, Field } from 'formik';
// // import axios from 'axios';
// // import { InputNumber } from 'primereact/inputnumber';
// // import { Button } from 'primereact/button';
// // import Cookies from 'js-cookie';
// // import { API_BASE_URL } from '@/app/utils';
// // import userContext from '@/app/UseContext/UseContext';

// // export default function Itempage({ selectedItem }) {
// //   const { singleitem, setSingleitem, setDiscount, setSubtotal, setFinalTotal } = useContext(userContext);

// //   useEffect(() => {
// //     const fetchItems = async () => {
// //       const subdomain = Cookies.get("subdomain");
// //       const accessToken = Cookies.get("accessToken");
// //       if (!subdomain || !accessToken || selectedItem.length === 0) return;

// //       try {
// //         const headers = { Authorization: `Bearer ${accessToken}` };
// //         const response = await axios.get(
// //           `${API_BASE_URL}/item/${subdomain}/items?itemIds=${selectedItem.join(",")}`,
// //           { headers }
// //         );
// //         setSingleitem(response.data.data.items || []);
// //       } catch (error) {
// //         console.error("Error fetching items:", error);
// //       }
// //     };

// //     fetchItems();
// //   }, [selectedItem, setSingleitem]);

// //   return (
// //     <Formik
// //       initialValues={{
// //         items: singleitem.map(item => ({
// //           ...item,
// //           quantity: item.quantity || 0,
// //         })),
// //         discount: 0,
// //       }}
// //       enableReinitialize
// //       onSubmit={(values) => {
// //         const itemsToSubmit = values.items.map(item => ({
// //           _id: item._id,
// //           quantity: item.quantity,
// //         }));

// //         console.log("Submitting items:", itemsToSubmit);
// //       }}
// //     >
// //       {({ values, setFieldValue }) => {
// //         const subtotal = values.items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
// //         const totalAfterDiscount = values.discount > 0
// //           ? subtotal - (subtotal * (values.discount / 100))
// //           : subtotal;

// //         const gstRate = 5; // Adjust as necessary
// //         const gst = (totalAfterDiscount * (gstRate / 100));
// //         const cgst = gst; // Assuming GST is equally divided into CGST and SGST
// //         const finalTotal = totalAfterDiscount + gst + cgst;

// //         useEffect(() => {
// //           setSingleitem(values.items);
// //           setDiscount(values.discount);
// //           setSubtotal(subtotal);
// //           setFinalTotal(finalTotal);
// //         }, [values.items, values.discount, subtotal, finalTotal, setSingleitem, setDiscount, setSubtotal, setFinalTotal]);

// //         return (
// //           <Form>
// //             {values.items.length > 0 && (
// //               <FieldArray name="items">
// //                 {({ remove }) => (
// //                   <table className="table w-50">
// //                     <thead>
// //                       <tr>
// //                         <th>Item Name</th>
// //                         <th>Quantity</th>
// //                         <th>Price</th>
// //                         <th>Action</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {values.items.map((item, index) => (
// //                         <tr key={item._id}>
// //                           <td>{item.itemName}</td>
// //                           <td>
// //                             <Field name={`items.${index}.quantity`}>
// //                               {({ field }) => (
// //                                 <InputNumber
// //                                   value={field.value || 0} // Set default to 0
// //                                   onValueChange={(e) => {
// //                                     // Set the value with a fallback
// //                                     setFieldValue(`items.${index}.quantity`, e.value || 0);
// //                                   }}
// //                                   mode="decimal" // Ensure correct mode
// //                                 />
// //                               )}
// //                             </Field>
// //                           </td>
// //                           <td>{item.price}</td>
// //                           <td>
// //                             <Button type="button" onClick={() => remove(index)}>
// //                               Remove
// //                             </Button>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 )}
// //               </FieldArray>
// //             )}
// //             <div>
// //               <label>Discount (%):</label>
// //               <Field name="discount">
// //                 {({ field }) => (
// //                   <InputNumber
// //                     {...field}
// //                     value={field.value || 0} // Set default to 0
// //                     onValueChange={(e) => setFieldValue("discount", e.value || 0)}
// //                   />
// //                 )}
// //               </Field>
// //             </div>
// //             <div>
// //               <p>Subtotal: {subtotal.toFixed(2)}</p>
// //               <p><strong>GST:</strong> {gst.toFixed(2)} (Rate: {gstRate}%)</p>
// //               <p><strong>CGST:</strong> {cgst.toFixed(2)} (Rate: {gstRate}%)</p>
// //               <p><strong>Final Total:</strong> {finalTotal.toFixed(2)}</p>
// //             </div>
// //             {/* Uncomment the line below to enable form submission */}
// //             {/* <Button type="submit">Submit</Button> */}
// //           </Form>
// //         );
// //       }}
// //     </Formik>
// //   );
// // }
// // "use client"
// // import React, { useContext, useEffect } from "react";
// // import { Formik, Form, FieldArray, Field } from "formik";
// // import axios from "axios";
// // import { InputNumber } from "primereact/inputnumber";
// // import { Button } from "primereact/button";
// // import Cookies from "js-cookie";
// // // import { API_BASE_URL } from "@/app/utils";
// // // import userContext from "@/app/UseContext/UseContext";
// // import { API_BASE_URL } from "../../../../../utils";
// // import userContext from "../../../../../UseContext/UseContext";

// // export default function Itempage({ selectedItem }) {
// //   const { singleitem, setSingleitem, setDiscount, setSubtotal, setFinalTotal } =
// //     useContext(userContext);

// //   useEffect(() => {
// //     const fetchItems = async () => {
// //       const subdomain = Cookies.get("subdomain");
// //       const accessToken = Cookies.get("accessToken");
// //       if (!subdomain || !accessToken || selectedItem.length === 0) return;

// //       try {
// //         const headers = { Authorization: `Bearer ${accessToken}` };
// //         const response = await axios.get(
// //           `${API_BASE_URL}/item/${subdomain}/items?itemIds=${selectedItem.join(
// //             ","
// //           )}`,
// //           { headers }
// //         );
// //         setSingleitem(response.data.data.items || []);
// //       } catch (error) {
// //         console.error("Error fetching items:", error);
// //       }
// //     };

// //     fetchItems();
// //   }, [selectedItem, setSingleitem]);

// //   return (
// //     <Formik
// //       initialValues={{
// //         items: singleitem.map((item) => ({
// //           ...item,
// //           quantity: item.quantity || 0,
// //         })),
// //         discount: 0,
// //       }}
// //       enableReinitialize
// //       onSubmit={(values) => {
// //         const itemsToSubmit = values.items.map((item) => ({
// //           _id: item._id,
// //           quantity: item.quantity,
// //         }));

// //         console.log("Submitting items:", itemsToSubmit);
// //       }}
// //     >
// //       {({ values, setFieldValue }) => {
// //         const subtotal = values.items.reduce(
// //           (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
// //           0
// //         );
// //         const totalAfterDiscount =
// //           values.discount > 0
// //             ? subtotal - subtotal * (values.discount / 100)
// //             : subtotal;

// //         const gstRate = 5; // Adjust as necessary
// //         const gst = totalAfterDiscount * (gstRate / 100);
// //         const cgst = gst; // Assuming GST is equally divided into CGST and SGST
// //         const finalTotal = totalAfterDiscount + gst + cgst;

// //         useEffect(() => {
// //           setSingleitem(values.items);
// //           setDiscount(values.discount);
// //           setSubtotal(subtotal);
// //           setFinalTotal(finalTotal);
// //         }, [
// //           values.items,
// //           values.discount,
// //           subtotal,
// //           finalTotal,
// //           setSingleitem,
// //           setDiscount,
// //           setSubtotal,
// //           setFinalTotal,
// //         ]);

// //         return (
// //           <Form>
// //             {values.items.length > 0 && (
// //               <FieldArray name="items">
// //                 {({ remove }) => (
// //                   <table className="table w-100">
// //                     <thead>
// //                       <tr>
// //                         <th>ITEM Name</th>
// //                         <th>Quantity</th>
// //                         <th>Price</th>
// //                         <th>Action</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {values.items.map((item, index) => (
// //                         <tr key={item._id}>
// //                           <td>{item.itemName}</td>
// //                           <td>
// //                             <Field name={`items.${index}.quantity`}>
// //                               {({ field }) => (
// //                                 <InputNumber
// //                                   value={field.value || 0} // Fallback to 0
// //                                   onValueChange={(e) => {
// //                                     setFieldValue(
// //                                       `items.${index}.quantity`,
// //                                       e.value || 0
// //                                     ); // Ensure value is defined
// //                                   }}
// //                                 />
// //                               )}
// //                             </Field>
// //                           </td>
// //                           <td>{item.price}</td>
// //                           <td>
// //                             <Button type="button" onClick={() => remove(index)}>
// //                               Remove
// //                             </Button>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 )}
// //               </FieldArray>
// //             )}
// //             <Field name="discount">
// //               {({ field }) => (
// //                 <InputNumber
// //                 placeholder="Discount"
// //                   value={field.value !== undefined ? field.value : 0} // Ensure a defined value
// //                   onValueChange={(e) => {
// //                     // Check if e.value is defined
// //                     const value = e.value !== undefined ? e.value : 0;
// //                     setFieldValue("discount", value);
// //                   }}
// //                 />
// //               )}
// //             </Field>

// //             <div>
// //               <p>Subtotal: {subtotal.toFixed(2)}</p>
// //               <p>
// //                 <strong>GST:</strong> {gst.toFixed(2)} (Rate: {gstRate}%)
// //               </p>
// //               <p>
// //                 <strong>CGST:</strong> {cgst.toFixed(2)} (Rate: {gstRate}%)
// //               </p>
// //               <p>
// //                 <strong>Final Total:</strong> {finalTotal.toFixed(2)}
// //               </p>
// //             </div>
// //             {/* Uncomment the line below to enable form submission */}
// //             {/* <Button type="submit">Submit</Button> */}
// //           </Form>
// //         );
// //       }}
// //     </Formik>
// //   );
// // }
// // "use client";
// // import React, { useContext, useEffect, useState } from "react";
// // import { Formik, Form, FieldArray, Field } from "formik";
// // import axios from "axios";
// // import { InputNumber } from "primereact/inputnumber";
// // import { Button } from "primereact/button";
// // import Cookies from "js-cookie";
// // import { API_BASE_URL } from "../../../../../utils";
// // import userContext from "../../../../../UseContext/UseContext";

// // export default function Itempage({ selectedItem }) {
// //   const { singleitem, setSingleitem, setDiscount, setSubtotal, setFinalTotal } =
// //     useContext(userContext);

// //   const [initialValues, setInitialValues] = useState({
// //     items: [],
// //     discount: 0,
// //   });

// //   // Fetch items data
// //   useEffect(() => {
// //     const fetchItems = async () => {
// //       const subdomain = Cookies.get("subdomain");
// //       const accessToken = Cookies.get("accessToken");
// //       if (!subdomain || !accessToken || selectedItem.length === 0) return;

// //       try {
// //         const headers = { Authorization: `Bearer ${accessToken}` };
// //         const response = await axios.get(
// //           `${API_BASE_URL}/item/${subdomain}/items?itemIds=${selectedItem.join(",")}`,
// //           { headers }
// //         );
// //         setSingleitem(response.data.data.items || []);
// //       } catch (error) {
// //         console.error("Error fetching items:", error);
// //       }
// //     };

// //     fetchItems();
// //   }, [selectedItem, setSingleitem]);

// //   // Update initial form values when items are fetched
// //   useEffect(() => {
// //     setInitialValues({
// //       items: singleitem.map((item) => ({
// //         ...item,
// //         quantity: item.quantity || 0,
// //       })),
// //       discount: 0,
// //     });
// //   }, [singleitem]);

// //   return (
// //     <Formik
// //       initialValues={initialValues}
// //       enableReinitialize
// //       onSubmit={(values) => {
// //         const itemsToSubmit = values.items.map((item) => ({
// //           _id: item._id,
// //           quantity: item.quantity,
// //         }));

// //         // console.log("Submitting items:", itemsToSubmit);
// //       }}
// //     >
// //       {({ values, setFieldValue }) => {
// //         const subtotal = values.items.reduce(
// //           (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
// //           0
// //         );
// //         const totalAfterDiscount =
// //           values.discount > 0
// //             ? subtotal - subtotal * (values.discount / 100)
// //             : subtotal;

// //         const gstRate = 5; // Adjust as necessary
// //         const gst = totalAfterDiscount * (gstRate / 100);
// //         const cgst = gst; // Assuming GST is equally divided into CGST and SGST
// //         const finalTotal = totalAfterDiscount + gst + cgst;

// //         // Update global context or state only once, outside of useEffect
// //         setSingleitem(values?.items);
// //         setDiscount(values?.discount);
// //         setSubtotal(subtotal);
// //         setFinalTotal(finalTotal);

// //         return (
// //           <Form>
// //             {values.items.length > 0 && (
// //               <FieldArray name="items">
// //                 {({ remove }) => (
// //                   <table className="table w-50">
// //                     <thead>
// //                       <tr>
// //                         <th>Item Name</th>
// //                         <th>Quantity</th>
// //                         <th>Price</th>
// //                         <th>Action</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {values.items.map((item, index) => (
// //                         <tr key={item._id}>
// //                           <td>{item.itemName}</td>
// //                           <td>
// //                             <Field name={`items.${index}.quantity`}>
// //                               {({ field }) => (
// //                                 <InputNumber
// //                                   value={field.value || 0} // Fallback to 0
// //                                   onValueChange={(e) => {
// //                                     setFieldValue(
// //                                       `items.${index}.quantity`,
// //                                       e.value || 0
// //                                     ); // Ensure value is defined
// //                                   }}
// //                                 />
// //                               )}
// //                             </Field>
// //                           </td>
// //                           <td>{item.price}</td>
// //                           <td>
// //                             <Button type="button" onClick={() => remove(index)}>
// //                               Remove
// //                             </Button>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 )}
// //               </FieldArray>
// //             )}
// //             <Field name="discount">
// //               {({ field }) => (
// //                 <InputNumber
// //                   value={field.value !== undefined ? field.value : 0} // Ensure a defined value
// //                   onValueChange={(e) => {
// //                     // Check if e.value is defined
// //                     const value = e.value !== undefined ? e.value : 0;
// //                     setFieldValue("discount", value);
// //                   }}
// //                 />
// //               )}
// //             </Field>

// //             <div>
// //               <p>Subtotal: {subtotal.toFixed(2)}</p>
// //               <p>
// //                 <strong>GST:</strong> {gst.toFixed(2)} (Rate: {gstRate}%)
// //               </p>
// //               <p>
// //                 <strong>CGST:</strong> {cgst.toFixed(2)} (Rate: {gstRate}%)
// //               </p>
// //               <p>
// //                 <strong>Final Total:</strong> {finalTotal.toFixed(2)}
// //               </p>
// //             </div>
// //             {/* Uncomment the line below to enable form submission */}
// //             {/* <Button type="submit">Submit</Button> */}
// //           </Form>
// //         );
// //       }}
// //     </Formik>
// //   );
// // }
// // 'use client';
// // import React, { useContext, useEffect } from 'react';
// // import { Formik, Form, FieldArray, Field } from 'formik';
// // import axios from 'axios';
// // import { InputNumber } from 'primereact/inputnumber';
// // import { Button } from 'primereact/button';
// // import Cookies from 'js-cookie';
// // import { API_BASE_URL } from '../../../../../utils';
// // import userContext from '../../../../../UseContext/UseContext';

// // export default function Itempage({ selectedItem }) {
// //     const { singleitem, setSingleitem, setDiscount, setSubtotal, setFinalTotal } = useContext(userContext);

// //     useEffect(() => {
// //         const fetchItems = async () => {
// //             const subdomain = Cookies.get('subdomain');
// //             const accessToken = Cookies.get('accessToken');
// //             if (!subdomain || !accessToken || selectedItem.length === 0) return;

// //             try {
// //                 const headers = { Authorization: `Bearer ${accessToken}` };
// //                 const response = await axios.get(`${API_BASE_URL}/item/${subdomain}/items?itemIds=${selectedItem.join(',')}`, { headers });
// //                 setSingleitem(response.data.data.items || []);
// //             } catch (error) {
// //                 console.error('Error fetching items:', error);
// //             }
// //         };

// //         fetchItems();
// //     }, [selectedItem, setSingleitem]);

// //     return (
// //         <Formik
// //             initialValues={{
// //                 items: singleitem.map((item) => ({
// //                     ...item,
// //                     quantity: item.quantity || 0
// //                 })),
// //                 discount: 0
// //             }}
// //             enableReinitialize
// //             onSubmit={(values) => {
// //                 const itemsToSubmit = values.items.map((item) => ({
// //                     _id: item._id,
// //                     quantity: item.quantity
// //                 }));

// //                 console.log('Submitting items:', itemsToSubmit);
// //             }}
// //         >
// //             {({ values, setFieldValue }) => {
// //                 const subtotal = values.items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
// //                 const totalAfterDiscount = values.discount > 0 ? subtotal - subtotal * (values.discount / 100) : subtotal;

// //                 const gstRate = 5; // Adjust as necessary
// //                 const gst = totalAfterDiscount * (gstRate / 100);
// //                 const cgst = gst; // Assuming GST is equally divided into CGST and SGST
// //                 const finalTotal = totalAfterDiscount + gst + cgst;

// //                 useEffect(() => {
// //                     setSingleitem(values.items);
// //                     setDiscount(values.discount);
// //                     setSubtotal(subtotal);
// //                     setFinalTotal(finalTotal);
// //                 }, [values.items, values.discount, subtotal, finalTotal, setSingleitem, setDiscount, setSubtotal, setFinalTotal]);

// //                 return (
// //                     <>
// //                         {values.items.length > 0 && (
// //                             <FieldArray name="items">
// //                                 {({ remove }) => (
// //                                     <table className="table ">
// //                                         <thead>
// //                                             <tr style={{ background: '#F1F7FF' }}>
// //                                                 <th>Item Name</th>
// //                                                 <th>Quantity</th>
// //                                                 <th>Price</th>
// //                                                 <th>Discount</th>
// //                                                 <th>Action</th>
// //                                             </tr>
// //                                         </thead>
// //                                         <tbody>
// //                                             {values.items.map((item, index) => (
// //                                                 <tr key={item._id}>
// //                                                     <td>{item.itemName}</td>
// //                                                     <td>
// //                                                         <div style={{ display: 'flex', alignItems: 'center' }}>
// //                                                             <Button
// //                                                                 style={{ all: 'unset' }}
// //                                                                 type="button"
// //                                                                 icon="pi pi-minus"
// //                                                                 onClick={() => {
// //                                                                     const newQuantity = Math.max(0, item.quantity - 1);
// //                                                                     setFieldValue(`items.${index}.quantity`, newQuantity);
// //                                                                 }}
// //                                                                 // style={{ marginRight: "8px" }}
// //                                                             />
// //                                                             <Field name={`items.${index}.quantity`}>
// //                                                                 {({ field }) => (
// //                                                                     <InputNumber
// //                                                                         style={{ all: 'unset', border: 'none', margin: 'auto' }}
// //                                                                         // className="w-50"
// //                                                                         value={field.value || 0} // Fallback to 0
// //                                                                         onValueChange={(e) => {
// //                                                                             setFieldValue(`items.${index}.quantity`, e.value || 0); // Ensure value is defined
// //                                                                         }}
// //                                                                     />
// //                                                                 )}
// //                                                             </Field>
// //                                                             <Button
// //                                                                 style={{ all: 'unset' }}
// //                                                                 type="button"
// //                                                                 icon="pi pi-plus"
// //                                                                 onClick={() => {
// //                                                                     const newQuantity = item.quantity + 1;
// //                                                                     setFieldValue(`items.${index}.quantity`, newQuantity);
// //                                                                 }}
// //                                                                 // style={{ marginLeft: "8px" }}
// //                                                             />
// //                                                         </div>
// //                                                     </td>
// //                                                     <td>{item.price}</td>
// //                                                     <td>{values.discount}%</td>
// //                                                     <td>
// //                                                         <Button type="button" className="btn1" onClick={() => remove(index)}>
// //                                                             Remove
// //                                                         </Button>
// //                                                     </td>
// //                                                 </tr>
// //                                             ))}
// //                                         </tbody>
// //                                     </table>
// //                                 )}
// //                             </FieldArray>
// //                         )}
// //                         <Field name="discount">
// //                             {({ field }) => (
// //                                 <InputNumber
// //                                     placeholder="Discount"
// //                                     value={field.value !== undefined ? field.value : 0} // Ensure a defined value
// //                                     onValueChange={(e) => {
// //                                         // Check if e.value is defined
// //                                         const value = e.value !== undefined ? e.value : 0;
// //                                         setFieldValue('discount', value);
// //                                     }}
// //                                 />
// //                             )}
// //                         </Field>

// //                         <div className="p-2 ">
// //                             <div>Subtotal: {subtotal.toFixed(2)}</div>
// //                             <div style={{ justifyContent: 'space-between' }}>
// //                                 <strong>GST:</strong>{' '}
// //                                 <span className="ms-auto">
// //                                     {' '}
// //                                     {gst.toFixed(2)} (Rate: {gstRate}%){' '}
// //                                 </span>
// //                             </div>
// //                             <div>
// //                                 <strong>CGST:</strong>{' '}
// //                                 <span className="ms-auto">
// //                                     {' '}
// //                                     {cgst.toFixed(2)} (Rate: {gstRate}%){' '}
// //                                 </span>
// //                             </div>
// //                             <div>
// //                                 <strong>Final Total:</strong> <span className="ms-auto"> {finalTotal.toFixed(2)}</span>
// //                             </div>
// //                         </div>
// //                         {/* Uncomment the line below to enable form submission */}
// //                         {/* <Button type="submit">Submit</Button> */}
// //                     </>
// //                 );
// //             }}
// //         </Formik>
// //     );
// // }
// // "use client"
// // import React, { useContext, useEffect } from "react";
// // import { Formik, Form, FieldArray, Field } from "formik";
// // import axios from "axios";
// // import { InputNumber } from "primereact/inputnumber";
// // import { Button } from "primereact/button";
// // import Cookies from "js-cookie";
// // import { API_BASE_URL } from "../../../../../utils";
// // import userContext from "../../../../../UseContext/UseContext";
// // import '../../../../../styles/Itempage.scss'; // Import the SCSS file

// // export default function Itempage({ selectedItem }) {
// //   const { singleitem, setSingleitem, setDiscount, setSubtotal, setFinalTotal } =
// //     useContext(userContext);

// //   useEffect(() => {
// //     const fetchItems = async () => {
// //       const subdomain = Cookies.get("subdomain");
// //       const accessToken = Cookies.get("accessToken");
// //       if (!subdomain || !accessToken || selectedItem.length === 0) return;

// //       try {
// //         const headers = { Authorization: `Bearer ${accessToken}` };
// //         const response = await axios.get(
// //           `${API_BASE_URL}/item/${subdomain}/items?itemIds=${selectedItem.join(
// //             ","
// //           )}`,
// //           { headers }
// //         );
// //         setSingleitem(response.data.data.items || []);
// //       } catch (error) {
// //         console.error("Error fetching items:", error);
// //       }
// //     };

// //     fetchItems();
// //   }, [ ]);

// //   return (
// //     <Formik
// //       initialValues={{
// //         items: singleitem.map((item) => ({
// //           ...item,
// //           quantity: item.quantity || 0,
// //         })),
// //         discount: 0,
// //       }}
// //       enableReinitialize
// //       onSubmit={(values) => {
// //         const itemsToSubmit = values.items.map((item) => ({
// //           _id: item._id,
// //           quantity: item.quantity,
// //         }));

// //         console.log("Submitting items:", itemsToSubmit);
// //       }}
// //     >
// //       {({ values, setFieldValue }) => {
// //         const subtotal = values.items.reduce(
// //           (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
// //           0
// //         );
// //         const totalAfterDiscount =
// //           values.discount > 0
// //             ? subtotal - subtotal * (values.discount / 100)
// //             : subtotal;

// //         const gstRate = 5; // Adjust as necessary
// //         const gst = totalAfterDiscount * (gstRate / 100);
// //         const cgst = gst; // Assuming GST is equally divided into CGST and SGST
// //         const finalTotal = totalAfterDiscount + gst + cgst;

// //         useEffect(() => {
// //           setSingleitem(values.items);
// //           setDiscount(values.discount);
// //           setSubtotal(subtotal);
// //           setFinalTotal(finalTotal);
// //         }, [
// //           values.items,
// //           values.discount,
// //           subtotal,
// //           finalTotal,
// //           setSingleitem,
// //           setDiscount,
// //           setSubtotal,
// //           setFinalTotal,
// //         ]);

// //         return (
// //           <>
// //             {values.items.length > 0 && (
// //               <FieldArray name="items">
// //                 {({ remove }) => (
// //                   <table className="item-table mb-3">
// //                     <thead>
// //                       <tr>
// //                         <th>Item Name</th>
// //                         <th>Quantity</th>
// //                         <th>Price</th>
// //                         <th>Discount</th>
// //                         <th>Action</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {values.items.map((item, index) => (
// //                         <tr key={item._id}>
// //                           <td>{item.itemName}</td>
// //                           <td>
// //                             <div className="quantity-controls">
// //                               <Button
// //                               style={{all:"unset"}}
// //                                 type="button"
// //                                  className="mt-4"
// //                                 icon="pi pi-minus"
// //                                 onClick={() => {
// //                                   const newQuantity = Math.max(0, item.quantity - 1);
// //                                   setFieldValue(`items.${index}.quantity`, newQuantity);
// //                                 }}
// //                               />
// //                               <Field name={`items.${index}.quantity`} className='in-put w-50'>
// //                                 {({ field }) => (

// //                                   <InputNumber
// //                                     value={field.value || 0} // Fallback to 0
// //                                     onValueChange={(e) => {
// //                                       setFieldValue(
// //                                         `items.${index}.quantity`,
// //                                         e.value || 0
// //                                       ); // Ensure value is defined
// //                                     }}
// //                                   />
// //                                 )}
// //                               </Field>
// //                               <Button
// //                               style={{all:"unset"}}
// //                                 type="button"
// //                                 className="mt-4"
// //                                 icon="pi pi-plus"
// //                                 onClick={() => {
// //                                   const newQuantity = item.quantity + 1;
// //                                   setFieldValue(`items.${index}.quantity`, newQuantity);
// //                                 }}
// //                               />
// //                             </div>
// //                           </td>
// //                           <td>{item.price}</td>
// //                           <td>{values.discount}%</td>
// //                           <td>
// //                             <Button type="button" onClick={() => remove(index)}   className="btn1">
// //                               Remove
// //                             </Button>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 )}
// //               </FieldArray>
// //             )}

// //             <div className="totals mb-3">
// //               {/* <p>Subtotal: {subtotal.toFixed(2)}</p> */}

// //               <div className='d-flex justify-content-between'>
// //                 <div><strong>Subtotal:</strong></div>
// //                 <div>{subtotal.toFixed(2)}</div>
// //               </div>
// //               <div className='d-flex justify-content-between'>
// //                 <div><strong>GST:</strong></div>
// //                 <div> {gst.toFixed(2)} (Rate: {gstRate}%)</div>
// //               </div>
// //               <div className='d-flex justify-content-between'>
// //                 <div><strong>CGST:</strong></div>
// //                 <div> {cgst.toFixed(2)} (Rate: {gstRate}%)</div>
// //               </div>
// //               <div className='d-flex justify-content-between'>
// //                 <div><strong>Final Total:</strong></div>
// //                 <div> {finalTotal.toFixed(2)}</div>
// //               </div>

// //               {/* <p>
// //                 <strong>CGST:</strong> {cgst.toFixed(2)} (Rate: {gstRate}%)
// //               </p> */}
// //               {/* <p>
// //                 <strong>Final Total:</strong> {finalTotal.toFixed(2)}
// //               </p> */}
// //             </div>
// //             {/* Uncomment the line below to enable form submission */}
// //             {/* <Button type="submit">Submit</Button> */}

// // <label htmlFor="" className="">Discount</label>
// //             <Field name="discount" className="discount-input">
// //               {({ field }) => (
// //                 <InputNumber
// //                 className="w-100 mb-3"
// //                   placeholder="Discount"
// //                   value={field.value !== undefined ? field.value : 0} // Ensure a defined value
// //                   onValueChange={(e) => {
// //                     // Check if e.value is defined
// //                     const value = e.value !== undefined ? e.value : 0;
// //                     setFieldValue("discount", value);
// //                   }}
// //                 />
// //               )}
// //             </Field>
// //           </>
// //         );
// //       }}
// //     </Formik>
// //   );
// // }
// // "use client"
// // import React, { useContext, useEffect } from 'react';
// // import { Formik, Form, FieldArray, Field } from 'formik';
// // import axios from 'axios';
// // import { InputNumber } from 'primereact/inputnumber';
// // import { Button } from 'primereact/button';
// // import Cookies from 'js-cookie';
// // import { API_BASE_URL } from '../../../../../utils';
// // import userContext from '../../../../../UseContext/UseContext';
// // import '../../../../../styles/Itempage.scss'; // Import the SCSS file

// // export default function Itempage({ selectedItem }) {
// //     const { singleitem, setSingleitem, setDiscount, setSubtotal, setFinalTotal } = useContext(userContext);

// //     const fetchItems = async () => {
// //         const subdomain = Cookies.get('subdomain');
// //         const accessToken = Cookies.get('accessToken');
// //         if (!subdomain || !accessToken || selectedItem.length === 0) return;

// //         try {
// //             const headers = { Authorization: `Bearer ${accessToken}` };
// //             const response = await axios.get(`${API_BASE_URL}/item/${subdomain}/items?itemIds=${selectedItem.join(',')}`, { headers });
// //             setSingleitem(response.data.data.items || []);
// //         } catch (error) {
// //             console.error('Error fetching items:', error);
// //         }
// //     };
// //     // Effect to fetch items when selectedItem changes
// //     useEffect(() => {
// //         fetchItems();
// //     }, [selectedItem, setSingleitem]); // Include selectedItem as a dependency

// //     return (
// //         <Formik
// //             initialValues={{
// //                 items: singleitem.map((item) => ({
// //                     ...item,
// //                     quantity: item.quantity || 0
// //                 })),
// //                 discount: 0
// //             }}
// //             enableReinitialize
// //             onSubmit={(values) => {
// //                 const itemsToSubmit = values.items.map((item) => ({
// //                     _id: item._id,
// //                     quantity: item.quantity
// //                 }));

// //                 console.log('Submitting items:', itemsToSubmit);
// //             }}
// //         >
// //             {({ values, setFieldValue }) => {
// //                 const subtotal = values.items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
// //                 const totalAfterDiscount = values.discount > 0 ? subtotal - subtotal * (values.discount / 100) : subtotal;

// //                 const gstRate = 5; // Adjust as necessary
// //                 const gst = totalAfterDiscount * (gstRate / 100);
// //                 const cgst = gst; // Assuming GST is equally divided into CGST and SGST
// //                 const finalTotal = totalAfterDiscount + gst + cgst;

// //                 // Effect to update context values whenever the form values change
// //                 useEffect(() => {
// //                     setSingleitem(values.items);
// //                     setDiscount(values.discount);
// //                     setSubtotal(subtotal);
// //                     setFinalTotal(finalTotal);
// //                 }, [values.items, values.discount, subtotal, finalTotal, setSingleitem, setDiscount, setSubtotal, setFinalTotal]);

// //                 return (
// //                     <>
// //                         {values.items.length > 0 && (
// //                             <FieldArray name="items">
// //                                 {({ remove }) => (
// //                                     <table className="item-table mb-3">
// //                                         <thead>
// //                                             <tr>
// //                                                 <th>Item Name</th>
// //                                                 <th>Quantity</th>
// //                                                 <th>Price</th>
// //                                                 <th>Discount</th>
// //                                                 <th>Action</th>
// //                                             </tr>
// //                                         </thead>
// //                                         <tbody>
// //                                             {values.items.map((item, index) => (
// //                                                 <tr key={item._id}>
// //                                                     <td>{item.itemName}</td>
// //                                                     <td>
// //                                                         <div className="quantity-controls">
// //                                                             <Button
// //                                                                 style={{ all: 'unset' }}
// //                                                                 type="button"
// //                                                                 className="mt-4"
// //                                                                 icon="pi pi-minus"
// //                                                                 onClick={() => {
// //                                                                     const newQuantity = Math.max(0, item.quantity - 1);
// //                                                                     setFieldValue(`items.${index}.quantity`, newQuantity);
// //                                                                 }}
// //                                                             />
// //                                                             <Field name={`items.${index}.quantity`} className="in-put w-50">
// //                                                                 {({ field }) => (
// //                                                                     <InputNumber
// //                                                                         value={field.value || 0} // Fallback to 0
// //                                                                         onValueChange={(e) => {
// //                                                                             setFieldValue(`items.${index}.quantity`, e.value || 0); // Ensure value is defined
// //                                                                         }}
// //                                                                     />
// //                                                                 )}
// //                                                             </Field>
// //                                                             <Button
// //                                                                 style={{ all: 'unset' }}
// //                                                                 type="button"
// //                                                                 className="mt-4"
// //                                                                 icon="pi pi-plus"
// //                                                                 onClick={() => {
// //                                                                     const newQuantity = item.quantity + 1;
// //                                                                     setFieldValue(`items.${index}.quantity`, newQuantity);
// //                                                                 }}
// //                                                             />
// //                                                         </div>
// //                                                     </td>
// //                                                     <td>{item.price}</td>
// //                                                     <td>{values.discount}%</td>
// //                                                     <td>
// //                                                         <Button type="button" onClick={() => remove(index)} className="btn1">
// //                                                             Remove
// //                                                         </Button>
// //                                                     </td>
// //                                                 </tr>
// //                                             ))}
// //                                         </tbody>
// //                                     </table>
// //                                 )}
// //                             </FieldArray>
// //                         )}

// //                         <div className="totals mb-3">
// //                             <div className="d-flex justify-content-between">
// //                                 <div>
// //                                     <strong>Subtotal:</strong>
// //                                 </div>
// //                                 <div>{subtotal.toFixed(2)}</div>
// //                             </div>
// //                             <div className="d-flex justify-content-between">
// //                                 <div>
// //                                     <strong>GST:</strong>
// //                                 </div>
// //                                 <div>
// //                                     {gst.toFixed(2)} (Rate: {gstRate}%)
// //                                 </div>
// //                             </div>
// //                             <div className="d-flex justify-content-between">
// //                                 <div>
// //                                     <strong>CGST:</strong>
// //                                 </div>
// //                                 <div>
// //                                     {cgst.toFixed(2)} (Rate: {gstRate}%)
// //                                 </div>
// //                             </div>
// //                             <div className="d-flex justify-content-between">
// //                                 <div>
// //                                     <strong>Final Total:</strong>
// //                                 </div>
// //                                 <div>{finalTotal.toFixed(2)}</div>
// //                             </div>
// //                         </div>

// //                         <label htmlFor="" className="">
// //                             Discount
// //                         </label>
// //                         <Field name="discount" className="discount-input">
// //                             {({ field }) => (
// //                                 <InputNumber
// //                                     className="w-100 mb-3"
// //                                     placeholder="Discount"
// //                                     value={field.value !== undefined ? field.value : 0} // Ensure a defined value
// //                                     onValueChange={(e) => {
// //                                         const value = e.value !== undefined ? e.value : 0;
// //                                         setFieldValue('discount', value);
// //                                     }}
// //                                 />
// //                             )}
// //                         </Field>
// //                     </>
// //                 );
// //             }}
// //         </Formik>
// //     );
// // }
// // 'use client';
// // import React, { useContext, useEffect, useCallback, useState } from 'react';
// // import { Formik, Form, FieldArray, Field } from 'formik';
// // import axios from 'axios';
// // import { InputNumber } from 'primereact/inputnumber';
// // import { Button } from 'primereact/button';
// // import Cookies from 'js-cookie';
// // import { API_BASE_URL } from '../../../../../utils';
// // import userContext from '../../../../../UseContext/UseContext';
// // import '../../../../../styles/Itempage.scss'; // Import the SCSS file

// // export default function Itempage({ selectedItem }) {
// //     const { singleitem, setSingleitem, setDiscount, setSubtotal, setFinalTotal } = useContext(userContext);
// // const [loading ,setloading] =useState(false)
// //     const fetchItems = useCallback(async () => {
// //         const subdomain = Cookies.get('subdomain');
// //         const accessToken = Cookies.get('accessToken');
// //         if (!subdomain || !accessToken || selectedItem.length === 0) return;

// //         try {
// //             const headers = { Authorization: `Bearer ${accessToken}` };
// //             const response = await axios.get(`${API_BASE_URL}/item/${subdomain}/items?itemIds=${selectedItem.join(',')}`, { headers });
// //             setSingleitem(response.data.data.items || []);
// //         } catch (error) {
// //             console.error('Error fetching items:', error);
// //         }
// //     }, [selectedItem, setSingleitem]);

// //     // Effect to fetch items when selectedItem changes
// //     useEffect(() => {
// //         setloading(true)
// //         fetchItems();
// //     }, [fetchItems]);
// //     // useEffect(() => {}, [values.items, values.discount, subtotal, finalTotal]);
// //     return (
// //         <>
// //         {loading && (

// //         <Formik
// //             initialValues={{
// //                 items: singleitem.map((item) => ({
// //                     ...item,
// //                     quantity: item.quantity || 0
// //                 })),
// //                 discount: 0
// //             }}
// //             enableReinitialize
// //             onSubmit={(values) => {
// //                 const itemsToSubmit = values.items.map((item) => ({
// //                     _id: item._id,
// //                     quantity: item.quantity
// //                 }));

// //                 console.log('Submitting items:', itemsToSubmit);
// //             }}
// //         >
// //             {({ values, setFieldValue }) => {
// //                 const subtotal = values.items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
// //                 const totalAfterDiscount = values.discount > 0 ? subtotal - subtotal * (values.discount / 100) : subtotal;

// //                 const gstRate = 5; // Adjust as necessary
// //                 const gst = totalAfterDiscount * (gstRate / 100);
// //                 const cgst = gst; // Assuming GST is equally divided into CGST and SGST
// //                 const finalTotal = totalAfterDiscount + gst + cgst;

// //                 // Effect to update context values whenever the form values change
// //                 setSingleitem(values.items);
// //                 setDiscount(values.discount);
// //                 setSubtotal(subtotal);
// //                 setFinalTotal(finalTotal);

// //                 return (
// //                     <>
// //                         {values.items.length > 0 && (
// //                             <FieldArray name="items">
// //                                 {({ remove }) => (
// //                                     <table className="item-table mb-3">
// //                                         <thead>
// //                                             <tr>
// //                                                 <th>Item Name</th>
// //                                                 <th>Quantity</th>
// //                                                 <th>Price</th>
// //                                                 <th>Discount</th>
// //                                                 <th>Action</th>
// //                                             </tr>
// //                                         </thead>
// //                                         <tbody>
// //                                             {values.items.map((item, index) => (
// //                                                 <tr key={item._id}>
// //                                                     <td>{item.itemName}</td>
// //                                                     <td>
// //                                                         <div className="quantity-controls">
// //                                                             <Button
// //                                                                 style={{ all: 'unset' }}
// //                                                                 type="button"
// //                                                                 className="mt-4"
// //                                                                 icon="pi pi-minus"
// //                                                                 onClick={() => {
// //                                                                     const newQuantity = Math.max(0, item.quantity - 1);
// //                                                                     setFieldValue(`items.${index}.quantity`, newQuantity);
// //                                                                 }}
// //                                                             />
// //                                                             <Field name={`items.${index}.quantity`} className="in-put w-50">
// //                                                                 {({ field }) => (
// //                                                                     <InputNumber
// //                                                                         value={field.value || 0} // Fallback to 0
// //                                                                         onValueChange={(e) => {
// //                                                                             setFieldValue(`items.${index}.quantity`, e.value || 0); // Ensure value is defined
// //                                                                         }}
// //                                                                     />
// //                                                                 )}
// //                                                             </Field>
// //                                                             <Button
// //                                                                 style={{ all: 'unset' }}
// //                                                                 type="button"
// //                                                                 className="mt-4"
// //                                                                 icon="pi pi-plus"
// //                                                                 onClick={() => {
// //                                                                     const newQuantity = item.quantity + 1;
// //                                                                     setFieldValue(`items.${index}.quantity`, newQuantity);
// //                                                                 }}
// //                                                             />
// //                                                         </div>
// //                                                     </td>
// //                                                     <td>{item.price}</td>
// //                                                     <td>{values.discount}%</td>
// //                                                     <td>
// //                                                         <Button type="button" onClick={() => remove(index)} className="btn1">
// //                                                             Remove
// //                                                         </Button>
// //                                                     </td>
// //                                                 </tr>
// //                                             ))}
// //                                         </tbody>
// //                                     </table>
// //                                 )}
// //                             </FieldArray>
// //                         )}

// //                         <div className="totals mb-3">
// //                             <div className="d-flex justify-content-between">
// //                                 <div>
// //                                     <strong>Subtotal:</strong>
// //                                 </div>
// //                                 <div>{subtotal.toFixed(2)}</div>
// //                             </div>
// //                             <div className="d-flex justify-content-between">
// //                                 <div>
// //                                     <strong>GST:</strong>
// //                                 </div>
// //                                 <div>
// //                                     {gst.toFixed(2)} (Rate: {gstRate}%)
// //                                 </div>
// //                             </div>
// //                             <div className="d-flex justify-content-between">
// //                                 <div>
// //                                     <strong>CGST:</strong>
// //                                 </div>
// //                                 <div>
// //                                     {cgst.toFixed(2)} (Rate: {gstRate}%)
// //                                 </div>
// //                             </div>
// //                             <div className="d-flex justify-content-between">
// //                                 <div>
// //                                     <strong>Final Total:</strong>
// //                                 </div>
// //                                 <div>{finalTotal.toFixed(2)}</div>
// //                             </div>
// //                         </div>

// //                         <label htmlFor="" className="">
// //                             Discount
// //                         </label>
// //                         <Field name="discount" className="discount-input">
// //                             {({ field }) => (
// //                                 <InputNumber
// //                                     className="w-100 mb-3"
// //                                     placeholder="Discount"
// //                                     value={field.value !== undefined ? field.value : 0} // Ensure a defined value
// //                                     onValueChange={(e) => {
// //                                         const value = e.value !== undefined ? e.value : 0;
// //                                         setFieldValue('discount', value);
// //                                     }}
// //                                 />
// //                             )}
// //                         </Field>
// //                     </>
// //                 );
// //             }}
// //         </Formik>
// //         )}
// //         </>
// //     );
// // }
// 'use client';
// import React, { useContext, useEffect, useCallback, useState } from 'react';
// import { Formik, Form, FieldArray, Field } from 'formik';
// import axios from 'axios';
// import { InputNumber } from 'primereact/inputnumber';
// import { Button } from 'primereact/button';
// import Cookies from 'js-cookie';
// import { API_BASE_URL } from '../../../../../utils';
// import userContext from '../../../../../UseContext/UseContext';
// import '../../../../../styles/Itempage.scss'; // Import the SCSS file

// export default function Itempage({ selectedItem }) {
//     const { singleitem, setSingleitem, setDiscount, setSubtotal, setFinalTotal } = useContext(userContext);
//     const [loading, setloading] = useState(false);

//     const fetchItems = useCallback(async () => {
//         const subdomain = Cookies.get('subdomain');
//         const accessToken = Cookies.get('accessToken');
//         if (!subdomain || !accessToken || selectedItem.length === 0) return;

//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/item/${subdomain}/items?itemIds=${selectedItem.join(',')}`, { headers });
//             setSingleitem(response.data.data.items || []);
//         } catch (error) {
//             console.error('Error fetching items:', error);
//         }
//     }, [selectedItem, setSingleitem]);

//     // Effect to fetch items when selectedItem changes
//     useEffect(() => {
//         setloading(true);
//         fetchItems();
//     }, [fetchItems]);

//     return (
//         <>
//             {loading && (
//                 <Formik
//                     initialValues={{
//                         items: singleitem.map((item) => ({
//                             ...item,
//                             quantity: item.quantity || 0
//                         })),
//                         discount: 0
//                     }}
//                     enableReinitialize
//                     onSubmit={(values) => {
//                         const itemsToSubmit = values.items.map((item) => ({
//                             _id: item._id,
//                             quantity: item.quantity
//                         }));

//                         console.log('Submitting items:', itemsToSubmit);
//                     }}
//                 >
//                     {({ values, setFieldValue }) => {
//                         const subtotal = values.items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
//                         const totalAfterDiscount = values.discount > 0 ? subtotal - subtotal * (values.discount / 100) : subtotal;

//                         const gstRate = 5; // Adjust as necessary
//                         const gst = totalAfterDiscount * (gstRate / 100);
//                         const cgst = gst; // Assuming GST is equally divided into CGST and SGST
//                         const finalTotal = totalAfterDiscount + gst + cgst;

//                         // Effect to update context values whenever the form values change
//                         useEffect(() => {
//                             setSingleitem(values.items);
//                             setDiscount(values.discount);
//                             setSubtotal(subtotal);
//                             setFinalTotal(finalTotal);
//                         }, [values.items, values.discount, subtotal, finalTotal, setSingleitem, setDiscount, setSubtotal, setFinalTotal]);

//                         return (
//                             <>
//                                 {values.items.length > 0 && (
//                                     <FieldArray name="items">
//                                         {({ remove }) => (
//                                             <table className="item-table mb-3">
//                                                 <thead>
//                                                     <tr>
//                                                         <th>Item Name</th>
//                                                         <th>Quantity</th>
//                                                         <th>Price</th>
//                                                         <th>Discount</th>
//                                                         <th>Action</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     {values.items.map((item, index) => (
//                                                         <tr key={item._id}>
//                                                             <td>{item.itemName}</td>
//                                                             <td>
//                                                                 <div className="quantity-controls">
//                                                                     <Button
//                                                                         style={{ all: 'unset' }}
//                                                                         type="button"
//                                                                         className="mt-4"
//                                                                         icon="pi pi-minus"
//                                                                         onClick={() => {
//                                                                             const newQuantity = Math.max(0, item.quantity - 1);
//                                                                             setFieldValue(`items.${index}.quantity`, newQuantity);
//                                                                         }}
//                                                                     />
//                                                                     <Field name={`items.${index}.quantity`} className="in-put w-50">
//                                                                         {({ field }) => (
//                                                                             <InputNumber
//                                                                                 value={field.value || 0} // Fallback to 0
//                                                                                 onValueChange={(e) => {
//                                                                                     setFieldValue(`items.${index}.quantity`, e.value || 0); // Ensure value is defined
//                                                                                 }}
//                                                                             />
//                                                                         )}
//                                                                     </Field>
//                                                                     <Button
//                                                                         style={{ all: 'unset' }}
//                                                                         type="button"
//                                                                         className="mt-4"
//                                                                         icon="pi pi-plus"
//                                                                         onClick={() => {
//                                                                             const newQuantity = item.quantity + 1;
//                                                                             setFieldValue(`items.${index}.quantity`, newQuantity);
//                                                                         }}
//                                                                     />
//                                                                 </div>
//                                                             </td>
//                                                             <td>{item.price}</td>
//                                                             <td>{values.discount}%</td>
//                                                             <td>
//                                                                 <Button type="button" onClick={() => remove(index)} className="btn1">
//                                                                     Remove
//                                                                 </Button>
//                                                             </td>
//                                                         </tr>
//                                                     ))}
//                                                 </tbody>
//                                             </table>
//                                         )}
//                                     </FieldArray>
//                                 )}

//                                 <div className="totals mb-3">
//                                     <div className="d-flex justify-content-between">
//                                         <div>
//                                             <strong>Subtotal:</strong>
//                                         </div>
//                                         <div>{subtotal.toFixed(2)}</div>
//                                     </div>
//                                     <div className="d-flex justify-content-between">
//                                         <div>
//                                             <strong>GST:</strong>
//                                         </div>
//                                         <div>
//                                             {gst.toFixed(2)} (Rate: {gstRate}%)
//                                         </div>
//                                     </div>
//                                     <div className="d-flex justify-content-between">
//                                         <div>
//                                             <strong>CGST:</strong>
//                                         </div>
//                                         <div>
//                                             {cgst.toFixed(2)} (Rate: {gstRate}%)
//                                         </div>
//                                     </div>
//                                     <div className="d-flex justify-content-between">
//                                         <div>
//                                             <strong>Final Total:</strong>
//                                         </div>
//                                         <div>{finalTotal.toFixed(2)}</div>
//                                     </div>
//                                 </div>

//                                 <label htmlFor="" className="">
//                                     Discount
//                                 </label>
//                                 <Field name="discount" className="discount-input">
//                                     {({ field }) => (
//                                         <InputNumber
//                                             className="w-100 mb-3"
//                                             placeholder="Discount"
//                                             value={field.value !== undefined ? field.value : 0} // Ensure a defined value
//                                             onValueChange={(e) => {
//                                                 const value = e.value !== undefined ? e.value : 0;
//                                                 setFieldValue('discount', value);
//                                             }}
//                                         />
//                                     )}
//                                 </Field>
//                             </>
//                         );
//                     }}
//                 </Formik>
//             )}
//         </>
//     );
// }
import React from 'react'

export default function itempage() {
  return (
    <div>itempage</div>
  )
}
