// // import React, { useEffect, useRef, useState } from "react";
// // import axios from "axios";
// // import Cookies from "js-cookie";
// // import { Toast } from "primereact/toast";
// // import { Button } from "primereact/button";
// // import { InputText } from "primereact/inputtext";
// // import { InputNumber } from "primereact/inputnumber";
// // import { API_BASE_URL } from "@/app/utils";

// // const SingleItem = ({ selectedItem, onSubmit }) => {
// //   const subdomain = Cookies.get("subdomain");
// //   const accessToken = Cookies.get("accessToken");
// //   const [singleData, setSingleData] = useState([]);
// //   const toast = useRef(null);

// //   const fetchItems = async () => {
// //     try {
// //       const headers = { Authorization: `Bearer ${accessToken}` };
// //       const response = await axios.get(
// //         `${API_BASE_URL}/item/${subdomain}/items?itemIds=${selectedItem}`,
// //         { headers }
// //       );
// //       setSingleData(response.data.data.items || []);
// //     } catch (error) {
// //       console.error("Error fetching items:", error);
// //       toast.current.show({
// //         severity: "error",
// //         summary: "Error",
// //         detail: "Could not fetch item details.",
// //       });
// //     }
// //   };

// //   useEffect(() => {
// //     if (selectedItem) {
// //       fetchItems();
// //     }
// //   }, [selectedItem]);

// //   const handleInputChange = (index, field, value) => {
// //     const updatedData = [...singleData];
// //     updatedData[index][field] = value;
// //     setSingleData(updatedData);
// //   };

// //   const handleSubmit = () => {
// //     if (onSubmit) {
// //       onSubmit(singleData);
// //     }
// //   };

// //   return (
// //     <>
// //       <Toast ref={toast} />
// //       <table className="table w-50" >
// //         <thead className=" w-50">
// //           <tr>
// //             <th>Item Name</th>
// //             <th>Description</th>
// //             <th>Price</th>
// //             <th>Quantity</th>
// //             <th>Total Amount</th>
// //             {/* <th>Custom Fields</th> */}
// //           </tr>
// //         </thead>
// //         <tbody className=" w-50">
// //           {singleData.map((item, index) => (
// //             <tr key={index}>
// //               <td>
// //                 <InputText
// //                   value={item.itemName || ''}
// //                   onChange={(e) => handleInputChange(index, "itemName", e.target.value)}
// //                   required
// //                 />
// //               </td>
// //               <td>
// //                 <InputText
// //                   value={item.description || ''}
// //                   onChange={(e) => handleInputChange(index, "description", e.target.value)}
// //                   required
// //                 />
// //               </td>
// //               <td>
// //                 <InputNumber
// //                   value={item.price || null}
// //                   onValueChange={(e) => handleInputChange(index, "price", e.value)}
// //                   required
// //                 />
// //               </td>
// //               <td>
// //                 <InputNumber
// //                   value={item.quantity || null}
// //                   onValueChange={(e) => handleInputChange(index, "quantity", e.value)}
// //                   required
// //                 />
// //               </td>
// //               <td>
// //                 {((item.price || 0) * (item.quantity || 0)).toFixed(2)}
// //               </td>
// //               <td>
// //                 {item.customFields && item.customFields.map((field, i) => (
// //                   <div key={i}>
// //                     <InputText
// //                       value={field.fieldName}
// //                       onChange={(e) => {
// //                         const updatedFields = [...item.customFields];
// //                         updatedFields[i].fieldName = e.target.value;
// //                         handleInputChange(index, "customFields", updatedFields);
// //                       }}
// //                     />
// //                     <InputText
// //                       value={field.fieldValue}
// //                       onChange={(e) => {
// //                         const updatedFields = [...item.customFields];
// //                         updatedFields[i].fieldValue = e.target.value;
// //                         handleInputChange(index, "customFields", updatedFields);
// //                       }}
// //                     />
// //                   </div>
// //                 ))}
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       <Button label="Submit" onClick={handleSubmit} />
// //     </>
// //   );
// // };

// // export default SingleItem;
// // "use client"
// // import React, { useEffect, useRef, useState } from "react";
// // import axios from "axios";
// // import Cookies from "js-cookie";
// // import { Toast } from "primereact/toast";
// // import { Button } from "primereact/button";
// // import { InputText } from "primereact/inputtext";
// // import { InputNumber } from "primereact/inputnumber";
// // import { API_BASE_URL } from "@/app/utils";

// // const SingleItem = ({ selectedItem, onSubmit }) => {
// //   const subdomain = Cookies.get("subdomain");
// //   const accessToken = Cookies.get("accessToken");
// //   const [singleData, setSingleData] = useState([]);
// //   const [discount, setDiscount] = useState(0);
// //   const toast = useRef(null);

// //   const fetchItems = async () => {
// //     try {
// //       const headers = { Authorization: `Bearer ${accessToken}` };
// //       const response = await axios.get(
// //         `${API_BASE_URL}/item/${subdomain}/items?itemIds=${selectedItem}`,
// //         { headers }
// //       );
// //       setSingleData(response.data.data.items || []);
// //     } catch (error) {
// //       console.error("Error fetching items:", error);
// //       toast.current.show({
// //         severity: "error",
// //         summary: "Error",
// //         detail: "Could not fetch item details.",
// //       });
// //     }
// //   };

// //   useEffect(() => {
// //     if (selectedItem) {
// //       fetchItems();
// //     }
// //   }, [selectedItem]);

// //   const handleInputChange = (index, field, value) => {
// //     const updatedData = [...singleData];
// //     updatedData[index][field] = value;
// //     setSingleData(updatedData);
// //   };

// //   const handleSubmit = () => {
// //     if (onSubmit) {
// //       onSubmit(singleData);
// //     }
// //   };

// //   const calculateSubtotal = () => {
// //     return singleData.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
// //   };

// //   const calculateTotalAfterDiscount = (subtotal) => {
// //     return subtotal - (subtotal * (discount / 100));
// //   };

// //   const calculateGSTandCGST = (total) => {
// //     const gst = total * 0.18; // Assuming GST is 18%
// //     return {
// //       gst,
// //       cgst: gst / 2, // Half of GST for CGST
// //     };
// //   };

// //   const subtotal = calculateSubtotal();
// //   const totalAfterDiscount = calculateTotalAfterDiscount(subtotal);
// //   const { gst, cgst } = calculateGSTandCGST(totalAfterDiscount);
// //   const finalTotal = totalAfterDiscount + gst + cgst;

// //   return (
// //     <>
// //       <Toast ref={toast} />
// //       <table className="table w-50">
// //         <thead className="w-50">
// //           <tr>
// //             <th>Item Name</th>
// //             <th>Description</th>
// //             <th>Price</th>
// //             <th>Quantity</th>
// //             <th>Total Amount</th>
// //           </tr>
// //         </thead>
// //         <tbody className="w-50">
// //           {singleData.map((item, index) => (
// //             <tr key={index}>
// //               <td>
// //                 <InputText
// //                   value={item.itemName || ''}
// //                   onChange={(e) => handleInputChange(index, "itemName", e.target.value)}
// //                   required
// //                 />
// //               </td>
// //               <td>
// //                 <InputText
// //                   value={item.description || ''}
// //                   onChange={(e) => handleInputChange(index, "description", e.target.value)}
// //                   required
// //                 />
// //               </td>
// //               <td>
// //                 <InputNumber
// //                   value={item.price || null}
// //                   onValueChange={(e) => handleInputChange(index, "price", e.value)}
// //                   required
// //                 />
// //               </td>
// //               <td>
// //                 <InputNumber
// //                   value={item.quantity || null}
// //                   onValueChange={(e) => handleInputChange(index, "quantity", e.value)}
// //                   required
// //                 />
// //               </td>
// //               <td>
// //                 {item.customFields && item.customFields.map((field, i) => (
// //                   <div key={i}>
// //                     <InputText
// //                       value={field.fieldName}
// //                       onChange={(e) => {
// //                         const updatedFields = [...item.customFields];
// //                         updatedFields[i].fieldName = e.target.value;
// //                         handleInputChange(index, "customFields", updatedFields);
// //                       }}
// //                     />
// //                     <InputText
// //                       value={field.fieldValue}
// //                       onChange={(e) => {
// //                         const updatedFields = [...item.customFields];
// //                         updatedFields[i].fieldValue = e.target.value;
// //                         handleInputChange(index, "customFields", updatedFields);
// //                       }}
// //                     />
// //                   </div>
// //                 ))}
// //               </td>
// //               <td>
// //                 {((item.price || 0) * (item.quantity || 0)).toFixed(2)}
// //               </td>

// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       <div className="mt-3">
// //         <label htmlFor="discount">Discount (%):</label>
// //         <InputNumber
// //           id="discount"
// //           value={discount}
// //           onValueChange={(e) => setDiscount(e.value)}
// //         />
// //       </div>

// //       <div className="mt-3">
// //         <strong>Subtotal: </strong>{subtotal.toFixed(2)}<br />
// //         <strong>Total after Discount: </strong>{totalAfterDiscount.toFixed(2)}<br />
// //         <strong>GST: </strong>{gst.toFixed(2)}<br />
// //         <strong>CGST: </strong>{cgst.toFixed(2)}<br />
// //         <strong>Final Total: </strong>{finalTotal.toFixed(2)}
// //       </div>

// //       <Button label="Submit" onClick={handleSubmit} />
// //     </>
// //   );
// // };

// // export default SingleItem;
// // import React, { useEffect, useRef, useState } from "react";
// // import axios from "axios";
// // import Cookies from "js-cookie";
// // import { Toast } from "primereact/toast";
// // import { Button } from "primereact/button";
// // import { InputText } from "primereact/inputtext";
// // import { InputNumber } from "primereact/inputnumber";
// // import { API_BASE_URL } from "@/app/utils";

// // const SingleItem = ({ selectedItem, onSubmit }) => {
// //   const subdomain = Cookies.get("subdomain");
// //   const accessToken = Cookies.get("accessToken");
// //   const [singleData, setSingleData] = useState([]);
// //   const [discount, setDiscount] = useState(0);
// //   const toast = useRef(null);

// //   const fetchItems = async () => {
// //     try {
// //       const headers = { Authorization: `Bearer ${accessToken}` };
// //       const response = await axios.get(
// //         `${API_BASE_URL}/item/${subdomain}/items?itemIds=${selectedItem}`,
// //         { headers }
// //       );
// //       setSingleData(response.data.data.items || []);
// //     } catch (error) {
// //       console.error("Error fetching items:", error);
// //       toast.current.show({
// //         severity: "error",
// //         summary: "Error",
// //         detail: "Could not fetch item details.",
// //       });
// //     }
// //   };

// //   useEffect(() => {
// //     if (selectedItem) {
// //       fetchItems();
// //     }
// //   }, [selectedItem]);

// //   const handleInputChange = (index, field, value) => {
// //     const updatedData = [...singleData];
// //     updatedData[index][field] = value;
// //     setSingleData(updatedData);
// //   };

// //   const handleSubmit = () => {
// //     if (onSubmit) {
// //       onSubmit(singleData);
// //     }
// //   };

// //   const calculateSubtotal = () => {
// //     return singleData.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
// //   };

// //   const calculateTotalAfterDiscount = (subtotal) => {
// //     return subtotal - (subtotal * (discount / 100));
// //   };

// //   const calculateGSTandCGST = (total) => {
// //     let gstRate = 0;
// //     let cgstRate = 0;

// //     singleData.forEach(item => {
// //       if (item.customFields) {
// //         item.customFields.forEach(field => {
// //           if (field.fieldName.toLowerCase() === 'gst') {
// //             gstRate = parseFloat(field.fieldValue) || 0;
// //           }
// //           if (field.fieldName.toLowerCase() === 'cgst') {
// //             cgstRate = parseFloat(field.fieldValue) || 0;
// //           }
// //         });
// //       }
// //     });

// //     const gst = (total * (gstRate / 100));
// //     const cgst = (total * (cgstRate / 100));

// //     return { gst, cgst };
// //   };

// //   const subtotal = calculateSubtotal();
// //   const totalAfterDiscount = calculateTotalAfterDiscount(subtotal);
// //   const { gst, cgst } = calculateGSTandCGST(totalAfterDiscount);
// //   const finalTotal = totalAfterDiscount + gst + cgst;

// //   return (
// //     <>
// //       <Toast ref={toast} />
// //       <table className="table w-50">
// //         <thead className="w-50">
// //           <tr>
// //             <th>Item Name</th>
// //             <th>Description</th>
// //             <th>Price</th>
// //             <th>Quantity</th>
// //             <th>Total Amount</th>
// //             <th>Custom Fields</th>
// //           </tr>
// //         </thead>
// //         <tbody className="w-50">
// //           {singleData.map((item, index) => (
// //             <tr key={index}>
// //               <td>
// //                 <InputText
// //                   value={item.itemName || ''}
// //                   onChange={(e) => handleInputChange(index, "itemName", e.target.value)}
// //                   required
// //                 />
// //               </td>
// //               <td>
// //                 <InputText
// //                   value={item.description || ''}
// //                   onChange={(e) => handleInputChange(index, "description", e.target.value)}
// //                   required
// //                 />
// //               </td>
// //               <td>
// //                 <InputNumber
// //                   value={item.price || null}
// //                   onValueChange={(e) => handleInputChange(index, "price", e.value)}
// //                   required
// //                 />
// //               </td>
// //               <td>
// //                 <InputNumber
// //                   value={item.quantity || null}
// //                   onValueChange={(e) => handleInputChange(index, "quantity", e.value)}
// //                   required
// //                 />
// //               </td>
// //               <td>
// //                 {((item.price || 0) * (item.quantity || 0)).toFixed(2)}
// //               </td>
// //               <td>
// //                 {item.customFields && item.customFields.map((field, i) => (
// //                   <div key={i}>
// //                     <InputText
// //                       value={field.fieldName}
// //                       onChange={(e) => {
// //                         const updatedFields = [...item.customFields];
// //                         updatedFields[i].fieldName = e.target.value;
// //                         handleInputChange(index, "customFields", updatedFields);
// //                       }}
// //                     />
// //                     <InputText
// //                       value={field.fieldValue}
// //                       onChange={(e) => {
// //                         const updatedFields = [...item.customFields];
// //                         updatedFields[i].fieldValue = e.target.value;
// //                         handleInputChange(index, "customFields", updatedFields);
// //                       }}
// //                     />
// //                   </div>
// //                 ))}
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>

// //       <div className="mt-3">
// //         <label htmlFor="discount">Discount (%):</label>
// //         <InputNumber
// //           id="discount"
// //           value={discount}
// //           onValueChange={(e) => setDiscount(e.value)}
// //         />
// //       </div>

// //       <div className="mt-3">
// //         <strong>Subtotal: </strong>{subtotal.toFixed(2)}<br />
// //         <strong>Total after Discount: </strong>{totalAfterDiscount.toFixed(2)}<br />
// //         <strong>GST: </strong>{gst.toFixed(2)}<br />
// //         <strong>CGST: </strong>{cgst.toFixed(2)}<br />
// //         <strong>Final Total: </strong>{finalTotal.toFixed(2)}
// //       </div>

// //       <Button label="Submit" onClick={handleSubmit} />
// //     </>
// //   );
// // };

// // export default SingleItem;
// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { Toast } from "primereact/toast";
// import { Button } from "primereact/button";
// import { InputText } from "primereact/inputtext";
// import { InputNumber } from "primereact/inputnumber";
// import { API_BASE_URL } from "@/app/utils";

// const SingleItem = ({ selectedItem, onSubmit }) => {
//   const subdomain = Cookies.get("subdomain");
//   const accessToken = Cookies.get("accessToken");
//   const [singleData, setSingleData] = useState([]);
//   const [discount, setDiscount] = useState(0);
//   const toast = useRef(null);

//   const fetchItems = async () => {
//     try {
//       const headers = { Authorization: `Bearer ${accessToken}` };
//       const response = await axios.get(
//         `${API_BASE_URL}/item/${subdomain}/items?itemIds=${selectedItem}`,
//         { headers }
//       );
//       setSingleData(response.data.data.items || []);
//     } catch (error) {
//       console.error("Error fetching items:", error);
//       toast.current.show({
//         severity: "error",
//         summary: "Error",
//         detail: "Could not fetch item details.",
//       });
//     }
//   };

//   useEffect(() => {
//     if (selectedItem) {
//       fetchItems();
//     }
//   }, [selectedItem]);

//   const handleInputChange = (index, field, value) => {
//     const updatedData = [...singleData];
//     updatedData[index][field] = value;
//     setSingleData(updatedData);
//   };

//   const handleSubmit = () => {
//     if (onSubmit) {
//       onSubmit(singleData);
//     }
//   };

//   const calculateSubtotal = () => {
//     return singleData.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
//   };

//   const calculateTotalAfterDiscount = (subtotal) => {
//     return subtotal - (subtotal * (discount / 100));
//   };

//   const calculateGSTandCGST = (total) => {
//     let gstRate = 0;
//     let cgstRate = 0;

//     singleData.forEach(item => {
//       if (item.customFields) {
//         item.customFields.forEach(field => {
//           if (field.fieldName.toLowerCase() === 'gst') {
//             gstRate = parseFloat(field.fieldValue) || 0;
//           }
//           if (field.fieldName.toLowerCase() === 'cgst') {
//             cgstRate = parseFloat(field.fieldValue) || 0;
//           }
//         });
//       }
//     });

//     const gst = (total * (gstRate / 100));
//     const cgst = (total * (cgstRate / 100));

//     return { gst, cgst, gstRate, cgstRate };
//   };

//   const subtotal = calculateSubtotal();
//   const totalAfterDiscount = calculateTotalAfterDiscount(subtotal);
//   const { gst, cgst, gstRate, cgstRate } = calculateGSTandCGST(totalAfterDiscount);
//   const finalTotal = totalAfterDiscount + gst + cgst;

//   return (
//     <>
//       <Toast ref={toast} />
//       <table className="table w-50">
//         <thead className="w-50">
//           <tr>
//             <th>Item Name</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Total Amount</th>
//             <th>Custom Fields</th>
//           </tr>
//         </thead>
//         <tbody className="w-50">
//           {singleData.map((item, index) => (
//             <tr key={index}>
//               <td>
//                 <InputText
//                   value={item.itemName || ''}
//                   onChange={(e) => handleInputChange(index, "itemName", e.target.value)}
//                   required
//                 />
//               </td>
//               <td>
//                 <InputText
//                   value={item.description || ''}
//                   onChange={(e) => handleInputChange(index, "description", e.target.value)}
//                   required
//                 />
//               </td>
//               <td>
//                 <InputNumber
//                   value={item.price || null}
//                   onValueChange={(e) => handleInputChange(index, "price", e.value)}
//                   required
//                 />
//               </td>
//               <td>
//                 <InputNumber
//                   value={item.quantity || null}
//                   onValueChange={(e) => handleInputChange(index, "quantity", e.value)}
//                   required
//                 />
//               </td>
//               <td>
//                 {((item.price || 0) * (item.quantity || 0)).toFixed(2)}
//               </td>
//               <td>
//                 {item.customFields && item.customFields.map((field, i) => (
//                   <div key={i}>
//                     <InputText
//                       value={field.fieldName}
//                       onChange={(e) => {
//                         const updatedFields = [...item.customFields];
//                         updatedFields[i].fieldName = e.target.value;
//                         handleInputChange(index, "customFields", updatedFields);
//                       }}
//                     />
//                     <InputText
//                       value={field.fieldValue}
//                       onChange={(e) => {
//                         const updatedFields = [...item.customFields];
//                         updatedFields[i].fieldValue = e.target.value;
//                         handleInputChange(index, "customFields", updatedFields);
//                       }}
//                     />
//                   </div>
//                 ))}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="mt-3">
//         <label htmlFor="discount">Discount (%):</label>
//         <InputNumber
//           id="discount"
//           value={discount}
//           onValueChange={(e) => setDiscount(e.value)}
//         />
//       </div>

//       <div className="mt-3">
//         <strong>Subtotal: </strong>{subtotal.toFixed(2)}<br />
//         <strong>Total after Discount: </strong>{totalAfterDiscount.toFixed(2)}<br />
//         <strong>GST ({gstRate.toFixed(2)}%): </strong>{gst.toFixed(2)}<br />
//         <strong>CGST ({cgstRate.toFixed(2)}%): </strong>{cgst.toFixed(2)}<br />
//         <strong>Final Total: </strong>{finalTotal.toFixed(2)}
//       </div>

//       <Button label="Submit" onClick={handleSubmit} />
//     </>
//   );
// };

// export default SingleItem;
// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { Toast } from "primereact/toast";
// import { InputText } from "primereact/inputtext";
// import { InputNumber } from "primereact/inputnumber";
// import { InputSwitch } from "primereact/inputswitch";
// import { API_BASE_URL } from "@/app/utils";

// const SingleItem = ({ selectedItem, onDataChange }) => {
//   const subdomain = Cookies.get("subdomain");
//   const accessToken = Cookies.get("accessToken");
//   const [singleData, setSingleData] = useState([]);
//   const [discount, setDiscount] = useState(0);
//   const [isDiscountBeforeGST, setIsDiscountBeforeGST] = useState(true);
//   const toast = useRef(null);

//   const fetchItems = async () => {
//     try {
//       const headers = { Authorization: `Bearer ${accessToken}` };
//       const response = await axios.get(
//         `${API_BASE_URL}/item/${subdomain}/items?itemIds=${selectedItem}`,
//         { headers }
//       );
//       setSingleData(response.data.data.items || []);
//     } catch (error) {
//       console.error("Error fetching items:", error);
//       toast.current.show({
//         severity: "error",
//         summary: "Error",
//         detail: "Could not fetch item details.",
//       });
//     }
//   };

//   useEffect(() => {
//     if (selectedItem) {
//       fetchItems();
//     }
//   }, [selectedItem]);

//   const handleInputChange = (index, field, value) => {
//     const updatedData = [...singleData];
//     updatedData[index][field] = value;
//     setSingleData(updatedData);
//     onDataChange(updatedData, discount, isDiscountBeforeGST); // Notify parent of changes
//   };

//   const handleDiscountChange = (value) => {
//     setDiscount(value);
//     onDataChange(singleData, value, isDiscountBeforeGST); // Notify parent of discount change
//   };

//   const calculateSubtotal = () => {
//     return singleData.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
//   };

//   const calculateTotalAfterDiscount = (subtotal) => {
//     const discountAmount = isDiscountBeforeGST
//       ? (subtotal * (discount / 100))
//       : (subtotal * (discount / 100));
//     return subtotal - discountAmount;
//   };

//   const calculateGSTandCGST = (total) => {
//     let gstRate = 0;
//     let cgstRate = 0;

//     singleData.forEach(item => {
//       if (item.customFields) {
//         item.customFields.forEach(field => {
//           if (field.fieldName.toLowerCase() === 'gst') {
//             gstRate = parseFloat(field.fieldValue) || 0;
//           }
//           if (field.fieldName.toLowerCase() === 'cgst') {
//             cgstRate = parseFloat(field.fieldValue) || 0;
//           }
//         });
//       }
//     });

//     const gst = (total * (gstRate / 100));
//     const cgst = (total * (cgstRate / 100));

//     return { gst, cgst, gstRate, cgstRate };
//   };

//   const subtotal = calculateSubtotal();
//   const totalAfterDiscount = calculateTotalAfterDiscount(subtotal);
//   const { gst, cgst, gstRate, cgstRate } = calculateGSTandCGST(totalAfterDiscount);
//   const finalTotal = totalAfterDiscount + gst + cgst;

//   return (
//     <>
//       <Toast ref={toast} />
//       <table className="table w-50">
//         <thead>
//           <tr>
//             <th>Item Name</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Total Amount</th>
//             <th>Custom Fields</th>
//           </tr>
//         </thead>
//         <tbody>
//           {singleData.map((item, index) => (
//             <tr key={index}>
//               <td>
//                 <InputText
//                   value={item.itemName || ''}
//                   onChange={(e) => handleInputChange(index, "itemName", e.target.value)}
//                   required
//                 />
//               </td>
//               <td>
//                 <InputText
//                   value={item.description || ''}
//                   onChange={(e) => handleInputChange(index, "description", e.target.value)}
//                   required
//                 />
//               </td>
//               <td>
//                 <InputNumber
//                   value={item.price || null}
//                   onValueChange={(e) => handleInputChange(index, "price", e.value)}
//                   required
//                 />
//               </td>
//               <td>
//                 <InputNumber
//                   value={item.quantity || null}
//                   onValueChange={(e) => handleInputChange(index, "quantity", e.value)}
//                   required
//                 />
//               </td>
//               <td>
//                 {((item.price || 0) * (item.quantity || 0)).toFixed(2)}
//               </td>
//               <td>
//                 {item.customFields && item.customFields.map((field, i) => (
//                   <div key={i}>
//                     <InputText
//                       value={field.fieldName}
//                       onChange={(e) => {
//                         const updatedFields = [...item.customFields];
//                         updatedFields[i].fieldName = e.target.value;
//                         handleInputChange(index, "customFields", updatedFields);
//                       }}
//                     />
//                     <InputText
//                       value={field.fieldValue}
//                       onChange={(e) => {
//                         const updatedFields = [...item.customFields];
//                         updatedFields[i].fieldValue = e.target.value;
//                         handleInputChange(index, "customFields", updatedFields);
//                       }}
//                     />
//                   </div>
//                 ))}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="mt-3">
//         <label htmlFor="discount">Discount (%):</label>
//         <InputNumber
//           id="discount"
//           value={discount}
//           onValueChange={(e) => handleDiscountChange(e.value)}
//         />
//       </div>

//       <div className="mt-3">
//         <label htmlFor="discountBeforeGST">Apply Discount Before GST:</label>
//         <InputSwitch
//           id="discountBeforeGST"
//           checked={isDiscountBeforeGST}
//           onChange={(e) => {
//             setIsDiscountBeforeGST(e.checked);
//             onDataChange(singleData, discount, e.checked); // Notify parent on switch change
//           }}
//         />
//       </div>

//       <div className="mt-3">
//         <strong>Subtotal: </strong>{subtotal.toFixed(2)}<br />
//         <strong>Total after Discount: </strong>{totalAfterDiscount.toFixed(2)}<br />
//         <strong>GST ({gstRate.toFixed(2)}%): </strong>{gst.toFixed(2)}<br />
//         <strong>CGST ({cgstRate.toFixed(2)}%): </strong>{cgst.toFixed(2)}<br />
//         <strong>Final Total: </strong>{finalTotal.toFixed(2)}
//       </div>
//     </>
//   );
// };

// export default SingleItem;
// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { Toast } from "primereact/toast";
// import { InputText } from "primereact/inputtext";
// import { InputNumber } from "primereact/inputnumber";
// import { InputSwitch } from "primereact/inputswitch";
// import { API_BASE_URL } from "@/app/utils";

// const SingleItem = ({ selectedItem, onSubmit }) => {
//   const subdomain = Cookies.get("subdomain");
//   const accessToken = Cookies.get("accessToken");
//   const [singleData, setSingleData] = useState([]);
//   const [discount, setDiscount] = useState(0);
//   const [isDiscountBeforeGST, setIsDiscountBeforeGST] = useState(true);
//   const toast = useRef(null);

//   const fetchItems = async () => {
//     try {
//       const headers = { Authorization: `Bearer ${accessToken}` };
//       const response = await axios.get(
//         `${API_BASE_URL}/item/${subdomain}/items?itemIds=${selectedItem}`,
//         { headers }
//       );
//       setSingleData(response.data.data.items || []);
//     } catch (error) {
//       console.error("Error fetching items:", error);
//       toast.current.show({
//         severity: "error",
//         summary: "Error",
//         detail: "Could not fetch item details.",
//       });
//     }
//   };

//   useEffect(() => {
//     if (selectedItem) {
//       fetchItems();
//     }
//   }, [selectedItem]);

//   const handleInputChange = (index, field, value) => {
//     const updatedData = [...singleData];
//     updatedData[index][field] = value;
//     setSingleData(updatedData);
//     onSubmit(updatedData); // Notify parent of changes
//     // console.log(updatedData,"updatedData")
//   };
//   const handleDiscountChange = (value) => {
//     setDiscount(value);
//     onSubmit(singleData);
//   };

//   const calculateSubtotal = () => {
//     return singleData.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
//   };

//   const calculateTotalAfterDiscount = (subtotal) => {
//     const discountAmount = (subtotal * (discount / 100));
//     return subtotal - discountAmount;
//   };

//   const calculateGSTandCGST = (total) => {
//     let gstRate = 0;
//     let cgstRate = 0;

//     singleData.forEach(item => {
//       if (item.customFields) {
//         item.customFields.forEach(field => {
//           if (field.fieldName.toLowerCase() === 'gst') {
//             gstRate = parseFloat(field.fieldValue) || 0;
//           }
//           if (field.fieldName.toLowerCase() === 'cgst') {
//             cgstRate = parseFloat(field.fieldValue) || 0;
//           }
//         });
//       }
//     });

//     const gst = (total * (gstRate / 100));
//     const cgst = (total * (cgstRate / 100));

//     return { gst, cgst, gstRate, cgstRate };
//   };

//   const subtotal = calculateSubtotal();
//   const totalAfterDiscount = calculateTotalAfterDiscount(subtotal);
//   const { gst, cgst, gstRate, cgstRate } = calculateGSTandCGST(totalAfterDiscount);
//   const finalTotal = totalAfterDiscount + gst + cgst;

//   return (
//     <>
//       <Toast ref={toast} />
//       <table className="table w-50">
//         <thead>
//           <tr>
//             <th>Item Name</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Total Amount</th>
//             <th>Custom Fields</th>
//           </tr>
//         </thead>
//         <tbody>
//           {singleData.map((item, index) => (
//             <tr key={index}>
//               <td>
//                 <InputText
//                   value={item.itemName || ''}
//                   onChange={(e) => handleInputChange(index, "itemName", e.target.value)}
//                   required
//                 />
//               </td>
//               <td>
//                 <InputText
//                   value={item.description || ''}
//                   onChange={(e) => handleInputChange(index, "description", e.target.value)}
//                   required
//                 />
//               </td>
//               <td>
//                 <InputNumber
//                   value={item.price || null}
//                   onValueChange={(e) => handleInputChange(index, "price", e.value)}
//                   required
//                 />
//               </td>
//               <td>
//                 <InputNumber
//                   value={item.quantity || null}
//                   onValueChange={(e) => handleInputChange(index, "quantity", e.value)}
//                   required
//                 />
//               </td>
//               <td>
//                 {((item.price || 0) * (item.quantity || 0)).toFixed(2)}
//               </td>
//               <td>
//                 {item.customFields && item.customFields.map((field, i) => (
//                   <div key={i}>
//                     <InputText
//                       value={field.fieldName}
//                       onChange={(e) => {
//                         const updatedFields = [...item.customFields];
//                         updatedFields[i].fieldName = e.target.value;
//                         handleInputChange(index, "customFields", updatedFields);
//                       }}
//                     />
//                     <InputText
//                       value={field.fieldValue}
//                       onChange={(e) => {
//                         const updatedFields = [...item.customFields];
//                         updatedFields[i].fieldValue = e.target.value;
//                         handleInputChange(index, "customFields", updatedFields);
//                       }}
//                     />
//                   </div>
//                 ))}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="mt-3">
//         <label htmlFor="discount">Discount (%):</label>
//         <InputNumber
//           id="discount"
//           value={discount}
//           onValueChange={(e) => handleDiscountChange(e.value)}
//         />
//       </div>

//       <div className="mt-3">
//         <label htmlFor="discountBeforeGST">Apply Discount Before GST:</label>
//         <InputSwitch
//           id="discountBeforeGST"
//           checked={isDiscountBeforeGST}
//           onChange={(e) => {
//             setIsDiscountBeforeGST(e.checked);
//             onSubmit(singleData); // Notify parent on switch change
//           }}
//         />
//       </div>

//       <div className="mt-3">
//         <strong>Subtotal: </strong>{subtotal.toFixed(2)}<br />
//         <strong>Total after Discount: </strong>{totalAfterDiscount.toFixed(2)}<br />
//         <strong>GST ({gstRate.toFixed(2)}%): </strong>{gst.toFixed(2)}<br />
//         <strong>CGST ({cgstRate.toFixed(2)}%): </strong>{cgst.toFixed(2)}<br />
//         <strong>Final Total: </strong>{finalTotal.toFixed(2)}
//       </div>
//     </>
//   );
// };

// export default SingleItem;
// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { Toast } from "primereact/toast";
// import { InputText } from "primereact/inputtext";
// import { InputNumber } from "primereact/inputnumber";
// import { InputSwitch } from "primereact/inputswitch";
// import { Formik, Form, Field, FieldArray } from "formik";
// import { API_BASE_URL } from "@/app/utils";

// const SingleItem = ({ selectedItem, onSubmit }) => {
//   const subdomain = Cookies.get("subdomain");
//   const accessToken = Cookies.get("accessToken");
//   const [singleData, setSingleData] = useState([]);
//   const [discount, setDiscount] = useState(0);
//   const [isDiscountBeforeGST, setIsDiscountBeforeGST] = useState(true);
//   const toast = useRef(null);

//   const fetchItems = async () => {
//     try {
//       const headers = { Authorization: `Bearer ${accessToken}` };
//       const response = await axios.get(
//         `${API_BASE_URL}/item/${subdomain}/items?itemIds=${selectedItem}`,
//         { headers }
//       );
//       setSingleData(response.data.data.items || []);
//     } catch (error) {
//       console.error("Error fetching items:", error);
//       toast.current.show({
//         severity: "error",
//         summary: "Error",
//         detail: "Could not fetch item details.",
//       });
//     }
//   };

//   useEffect(() => {
//     if (selectedItem) {
//       fetchItems();
//     }
//   }, [selectedItem]);

//   const calculateSubtotal = (items) => {
//     return items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
//   };

//   const calculateTotalAfterDiscount = (subtotal) => {
//     const discountAmount = (subtotal * (discount / 100));
//     return subtotal - discountAmount;
//   };

//   const calculateGSTandCGST = (total, items) => {
//     let gstRate = 0;
//     let cgstRate = 0;

//     items.forEach(item => {
//       if (item.customFields) {
//         item.customFields.forEach(field => {
//           if (field.fieldName.toLowerCase() === 'gst') {
//             gstRate = parseFloat(field.fieldValue) || 0;
//           }
//           if (field.fieldName.toLowerCase() === 'cgst') {
//             cgstRate = parseFloat(field.fieldValue) || 0;
//           }
//         });
//       }
//     });

//     const gst = (total * (gstRate / 100));
//     const cgst = (total * (cgstRate / 100));

//     return { gst, cgst, gstRate, cgstRate };
//   };

//   return (
//     <Formik
//       initialValues={{
//         items: singleData,
//         discount: 0,
//         isDiscountBeforeGST: true,
//       }}
//       enableReinitialize
//       onSubmit={(values) => {
//           onSubmit(values.items);
//           {console.log(values.items,"values")}
//         }}
//         >
//       {({ values, setFieldValue }) => {
//         const subtotal = calculateSubtotal(values.items);
//         const totalAfterDiscount = calculateTotalAfterDiscount(subtotal);
//         const { gst, cgst, gstRate, cgstRate } = calculateGSTandCGST(totalAfterDiscount, values.items);
//         const finalTotal = totalAfterDiscount + gst + cgst;

//         return (
//           <>
//             <Toast ref={toast} />
//             <Form>
//               <FieldArray name="items">
//                 {({ remove, push }) => (
//                   <table className="table w-50">
//                     <thead>
//                       <tr>
//                         <th>Item Name</th>
//                         <th>Description</th>
//                         <th>Price</th>
//                         <th>Quantity</th>
//                         <th>Total Amount</th>
//                         <th>Custom Fields</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {values.items.map((item, index) => (
//                         <tr key={index}>
//                           <td>
//                             <Field
//                               name={`items.${index}.itemName`}
//                               render={({ field }) => (
//                                 <InputText {...field} required />
//                               )}
//                             />
//                           </td>
//                           <td>
//                             <Field
//                               name={`items.${index}.description`}
//                               render={({ field }) => (
//                                 <InputText {...field} required />
//                               )}
//                             />
//                           </td>
//                           <td>
//                             <Field
//                               name={`items.${index}.price`}
//                               render={({ field }) => (
//                                 <InputNumber
//                                   {...field}
//                                   value={item.price || null}
//                                   onValueChange={(e) => {
//                                     setFieldValue(`items.${index}.price`, e.value);
//                                   }}
//                                   required
//                                 />
//                               )}
//                             />
//                           </td>
//                           <td>
//                             <Field
//                               name={`items.${index}.quantity`}
//                               render={({ field }) => (
//                                 <InputNumber
//                                   {...field}
//                                   value={item.quantity || null}
//                                   onValueChange={(e) => {
//                                     setFieldValue(`items.${index}.quantity`, e.value);
//                                   }}
//                                   required
//                                 />
//                               )}
//                             />
//                           </td>
//                           <td>
//                             {((item.price || 0) * (item.quantity || 0)).toFixed(2)}
//                           </td>
//                           <td>
//                             {item.customFields && item.customFields.map((field, i) => (
//                               <div key={i}>
//                                 <Field
//                                   name={`items.${index}.customFields.${i}.fieldName`}
//                                   render={({ field }) => (
//                                     <InputText {...field} />
//                                   )}
//                                 />
//                                 <Field
//                                   name={`items.${index}.customFields.${i}.fieldValue`}
//                                   render={({ field }) => (
//                                     <InputText {...field} />
//                                   )}
//                                 />
//                               </div>
//                             ))}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 )}
//               </FieldArray>

//               <div className="mt-3">
//                 <label htmlFor="discount">Discount (%):</label>
//                 <InputNumber
//                   id="discount"
//                   value={values.discount}
//                   onValueChange={(e) => {
//                     setFieldValue("discount", e.value);
//                   }}
//                 />
//               </div>

//               <div className="mt-3">
//                 <label htmlFor="discountBeforeGST">Apply Discount Before GST:</label>
//                 <InputSwitch
//                   id="discountBeforeGST"
//                   checked={values.isDiscountBeforeGST}
//                   onChange={(e) => {
//                     setFieldValue("isDiscountBeforeGST", e.checked);
//                   }}
//                 />
//               </div>

//               <div className="mt-3">
//                 <strong>Subtotal: </strong>{subtotal.toFixed(2)}<br />
//                 <strong>Total after Discount: </strong>{totalAfterDiscount.toFixed(2)}<br />
//                 <strong>GST ({gstRate.toFixed(2)}%): </strong>{gst.toFixed(2)}<br />
//                 <strong>CGST ({cgstRate.toFixed(2)}%): </strong>{cgst.toFixed(2)}<br />
//                 <strong>Final Total: </strong>{finalTotal.toFixed(2)}
//               </div>

//               <button type="submit">Submit</button>
//             </Form>
//           </>
//         );
//       }}
//     </Formik>
//   );
// };

// export default SingleItem;
// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import Cookies from "js-cookie";
// import { Toast } from "primereact/toast";
// import { InputText } from "primereact/inputtext";
// import { InputNumber } from "primereact/inputnumber";
// import { InputSwitch } from "primereact/inputswitch";
// import { Formik, Form, Field, FieldArray } from "formik";
// import { API_BASE_URL } from "@/app/utils";

// const SingleItem = ({ selectedItem, onSubmit }) => {
//   const subdomain = Cookies.get("subdomain");
//   const accessToken = Cookies.get("accessToken");
//   const [singleData, setSingleData] = useState([]);
//   const toast = useRef(null);

//   const fetchItems = async () => {
//     try {
//       const headers = { Authorization: `Bearer ${accessToken}` };
//       const response = await axios.get(
//         `${API_BASE_URL}/item/${subdomain}/items?itemIds=${selectedItem}`,
//         { headers }
//       );
//       setSingleData(response.data.data.items || []);
//     } catch (error) {
//       console.error("Error fetching items:", error);
//       toast.current.show({
//         severity: "error",
//         summary: "Error",
//         detail: "Could not fetch item details.",
//       });
//     }
//   };

//   useEffect(() => {
//     if (selectedItem) {
//       fetchItems();
//     }
//   }, [selectedItem]);

//   const calculateSubtotal = (items) => {
//     return items.reduce(
//       (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
//       0
//     );
//   };

//   const calculateTotalAfterDiscount = (subtotal, discount) => {
//     return subtotal - subtotal * (discount / 100);
//   };

//   const calculateGSTandCGST = (total, items) => {
//     let gstRate = 0;
//     let cgstRate = 0;

//     items.forEach((item) => {
//       if (item.customFields) {
//         item.customFields.forEach((field) => {
//           if (field.fieldName.toLowerCase() === "gst") {
//             gstRate = parseFloat(field.fieldValue) || 0;
//           }
//           if (field.fieldName.toLowerCase() === "cgst") {
//             cgstRate = parseFloat(field.fieldValue) || 0;
//           }
//         });
//       }
//     });

//     const gst = total * (gstRate / 100);
//     const cgst = total * (cgstRate / 100);

//     return { gst, cgst, gstRate, cgstRate };
//   };

//   return (
//     <Formik
//       initialValues={{
//         items: singleData,
//         discount: 0,
//         isDiscountBeforeGST: true,
//       }}
//       enableReinitialize
//       //       onSubmit={(values) => {
//       //         const subtotal = calculateSubtotal(values.items);
//       //         const totalAfterDiscount = calculateTotalAfterDiscount(subtotal, values.discount);
//       //         const { gst, cgst } = calculateGSTandCGST(totalAfterDiscount, values.items);
//       //         const finalTotal = totalAfterDiscount + gst + cgst;
//       // console.log(values,"onSubmitonSubmitonSubmitonSubmit")
//       //         onSubmit({
//       //           items: values.items._id,
//       //           discount: values.discount,
//       //           subtotal,
//       //           total: finalTotal,
//       //         });
//       //       }}
//       onSubmit={(values) => {
//         console.log("Form submitted with values:", values);

//         const subtotal = calculateSubtotal(values.items);
//         console.log("Subtotal:", subtotal);

//         const totalAfterDiscount = calculateTotalAfterDiscount(
//           subtotal,
//           values.discount
//         );
//         console.log("Total after discount:", totalAfterDiscount);

//         const { gst, cgst } = calculateGSTandCGST(
//           totalAfterDiscount,
//           values.items
//         );
//         const finalTotal = totalAfterDiscount + gst + cgst;

//         console.log("Final total:", finalTotal);

//         onSubmit({
//           items: values.items.map((item) => item._id), // Assuming you want to get IDs of all items
//           discount: values.discount,
//           subtotal,
//           total: finalTotal,
//         });
//       }}
//     >
//       {({ values, setFieldValue }) => {
//         const subtotal = calculateSubtotal(values.items);
//         const totalAfterDiscount = calculateTotalAfterDiscount(
//           subtotal,
//           values.discount
//         );
//         const { gst, cgst, gstRate, cgstRate } = calculateGSTandCGST(
//           totalAfterDiscount,
//           values.items
//         );
//         const finalTotal = totalAfterDiscount + gst + cgst;

//         return (
//           <>
//             <Toast ref={toast} />
//             <Form>
//               <FieldArray name="items">
//                 {({ remove, push }) => (
//                   <table className="table w-50">
//                     <thead>
//                       <tr>
//                         <th>Item Name</th>
//                         <th>Description</th>
//                         <th>Price</th>
//                         <th>Quantity</th>
//                         <th>Total Amount</th>
//                         <th>Custom Fields</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {values.items.map((item, index) => (
//                         <tr key={index}>
//                           <td>
//                             <Field
//                               name={`items.${index}.itemName`}
//                               render={({ field }) => (
//                                 <InputText {...field} required />
//                               )}
//                             />
//                           </td>
//                           <td>
//                             <Field
//                               name={`items.${index}.description`}
//                               render={({ field }) => (
//                                 <InputText {...field} required />
//                               )}
//                             />
//                           </td>
//                           <td>
//                             <Field
//                               name={`items.${index}.price`}
//                               render={({ field }) => (
//                                 <InputNumber
//                                   {...field}
//                                   value={item.price || null}
//                                   onValueChange={(e) => {
//                                     setFieldValue(
//                                       `items.${index}.price`,
//                                       e.value
//                                     );
//                                   }}
//                                   required
//                                 />
//                               )}
//                             />
//                           </td>
//                           <td>
//                             <Field
//                               name={`items.${index}.quantity`}
//                               render={({ field }) => (
//                                 <InputNumber
//                                   {...field}
//                                   value={item.quantity || null}
//                                   onValueChange={(e) => {
//                                     setFieldValue(
//                                       `items.${index}.quantity`,
//                                       e.value
//                                     );
//                                   }}
//                                   required
//                                 />
//                               )}
//                             />
//                           </td>
//                           <td>
//                             {((item.price || 0) * (item.quantity || 0)).toFixed(
//                               2
//                             )}
//                           </td>
//                           <td>
//                             {item.customFields &&
//                               item.customFields.map((field, i) => (
//                                 <div key={i}>
//                                   <Field
//                                     name={`items.${index}.customFields.${i}.fieldName`}
//                                     render={({ field }) => (
//                                       <InputText {...field} />
//                                     )}
//                                   />
//                                   <Field
//                                     name={`items.${index}.customFields.${i}.fieldValue`}
//                                     render={({ field }) => (
//                                       <InputText {...field} />
//                                     )}
//                                   />
//                                 </div>
//                               ))}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 )}
//               </FieldArray>

//               <div className="mt-3">
//                 <label htmlFor="discount">Discount (%):</label>
//                 <InputNumber
//                   id="discount"
//                   value={values.discount}
//                   onValueChange={(e) => setFieldValue("discount", e.value)}
//                 />
//               </div>

//               <div className="mt-3">
//                 <label htmlFor="discountBeforeGST">
//                   Apply Discount Before GST:
//                 </label>
//                 <InputSwitch
//                   id="discountBeforeGST"
//                   checked={values.isDiscountBeforeGST}
//                   onChange={(e) =>
//                     setFieldValue("isDiscountBeforeGST", e.checked)
//                   }
//                 />
//               </div>

//               <div className="mt-3">
//                 <strong>Subtotal: </strong>
//                 {subtotal.toFixed(2)}
//                 <br />
//                 <strong>Total after Discount: </strong>
//                 {totalAfterDiscount.toFixed(2)}
//                 <br />
//                 <strong>GST ({gstRate.toFixed(2)}%): </strong>
//                 {gst.toFixed(2)}
//                 <br />
//                 <strong>CGST ({cgstRate.toFixed(2)}%): </strong>
//                 {cgst.toFixed(2)}
//                 <br />
//                 <strong>Final Total: </strong>
//                 {finalTotal.toFixed(2)}
//               </div>

//               <button type="submit">Submit</button>
//             </Form>
//           </>
//         );
//       }}
//     </Formik>
//   );
// };

// export default SingleItem;
"use client"
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputSwitch } from "primereact/inputswitch";
import { Formik, Form, Field, FieldArray } from "formik";
// import { API_BASE_URL } from "@/app/utils";
import { Button } from "primereact/button";
import { API_BASE_URL } from "../../../../utils";

const SingleItem = ({ selectedItem, onSubmit }) => {
  const subdomain = Cookies.get("subdomain");
  const accessToken = Cookies.get("accessToken");
  const [singleData, setSingleData] = useState([]);
  const toast = useRef(null);

  const fetchItems = async () => {
    try {
      const headers = { Authorization: `Bearer ${accessToken}` };
      const response = await axios.get(
        `${API_BASE_URL}/item/${subdomain}/items?itemIds=${selectedItem}`,
        { headers }
      );
      setSingleData(response.data.data.items || []);
    } catch (error) {
      console.error("Error fetching items:", error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Could not fetch item details.",
      });
    }
  };

  useEffect(() => {
    if (selectedItem) {
      fetchItems();
    }
  }, [selectedItem]);

  const calculateSubtotal = (items) => {
    return items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 0), 0);
  };

  const calculateTotalAfterDiscount = (subtotal, discount) => {
    return subtotal - (subtotal * (discount / 100));
  };

  const calculateGSTandCGST = (total, items) => {
    let gstRate = 0;
    let cgstRate = 0;

    items.forEach(item => {
      if (item.customFields) {
        item.customFields.forEach(field => {
          if (field.fieldName.toLowerCase() === 'gst') {
            gstRate = parseFloat(field.fieldValue) || 0;
          }
          if (field.fieldName.toLowerCase() === 'cgst') {
            cgstRate = parseFloat(field.fieldValue) || 0;
          }
        });
      }
    });

    const gst = (total * (gstRate / 100));
    const cgst = (total * (cgstRate / 100));

    return { gst, cgst, gstRate, cgstRate };
  };

  return (
    <Formik
      initialValues={{
        items: singleData,
        discount: 0,
        isDiscountBeforeGST: true,
      }}
      enableReinitialize
      onSubmit={(values) => {
        const subtotal = calculateSubtotal(values.items);
        const totalAfterDiscount = calculateTotalAfterDiscount(subtotal, values.discount);
        const { gst, cgst } = calculateGSTandCGST(totalAfterDiscount, values.items);
        const finalTotal = totalAfterDiscount + gst + cgst;

        console.log("SingleItem Values on Submit:", {
          items: values.items.map(item => item._id), // Collecting item IDs for submission
          discount: values.discount,
          subtotal,
          total: finalTotal,
        });

        onSubmit({
          items: values.items.map(item => item._id),
          discount: values.discount,
          subtotal,
          total: finalTotal,
        });
      }}
    >
      {({ values, setFieldValue }) => {
        const subtotal = calculateSubtotal(values.items);
        const totalAfterDiscount = calculateTotalAfterDiscount(subtotal, values.discount);
        const { gst, cgst, gstRate, cgstRate } = calculateGSTandCGST(totalAfterDiscount, values.items);
        const finalTotal = totalAfterDiscount + gst + cgst;

        return (
          <>
            <Toast ref={toast} />
            <Form>
              <FieldArray name="items">
                {({ remove, push }) => (
                  <table className="table w-50">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {values.items.map((item, index) => (
                        <tr key={item._id}>
                          <td>{item.itemName}</td>
                          <td>
                            <Field name={`items[${index}].quantity`}>
                              {({ field }) => (
                                <InputNumber
                                  {...field}
                                  value={item.quantity}
                                  onValueChange={(e) => {
                                    setFieldValue(`items[${index}].quantity`, e.value);
                                  }}
                                />
                              )}
                            </Field>
                          </td>
                          <td>{item.price}</td>
                          <td>
                            <Button type="button" onClick={() => remove(index)}>Remove</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </FieldArray>

              <div>
                <label>Discount:</label>
                <Field name="discount">
                  {({ field }) => (
                    <InputNumber {...field} value={values.discount} onValueChange={(e) => setFieldValue("discount", e.value)} />
                  )}
                </Field>
              </div>

              <div>
                <p>Subtotal: {subtotal}</p>
                <p>Total After Discount: {totalAfterDiscount}</p>
                <p>GST: {gst} (Rate: {gstRate}%)</p>
                <p>CGST: {cgst} (Rate: {cgstRate}%)</p>
                <p>Final Total: {finalTotal}</p>
              </div>

            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default SingleItem;
