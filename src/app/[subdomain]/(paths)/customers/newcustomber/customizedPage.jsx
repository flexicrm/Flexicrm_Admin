
// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import { Button } from "primereact/button";
// import { Dialog } from "primereact/dialog";
// import { InputText } from "primereact/inputtext";
// import { Dropdown } from "primereact/dropdown";
// import { Checkbox } from "primereact/checkbox";
// import { Toast } from "primereact/toast";
// import axios from "axios";
// // import { API_BASE_URL } from "@/app/utils";
// import Cookies from "js-cookie";
// import { useParams } from "next/navigation";
// import '../../../../styles/cutombersedit.scss'
// import { API_BASE_URL } from "../../../../utils";

// const fieldTypes = [
//   { name: "Text", code: "text" },
//   { name: "Calendar", code: "calendar" },
//   { name: "Number", code: "number" },
//   { name: "Telephone", code: "telephone" },
//   { name: "Password", code: "password" },
// ];

// const Home = () => {
  
//   const [dialogVisible, setDialogVisible] = useState(false);
//   const [fieldName, setFieldName] = useState("");
//   const [fieldType, setFieldType] = useState(null);
//   const [required, setRequired] = useState(false);
//   const [fields, setFields] = useState({});
//   const [data, setData]=useState([])
//   const toast = useRef(null);
//   const subdomain = Cookies.get("subdomain");
//   const accessToken = Cookies.get("accessToken");

//   const handleSubmit = () => {
//     if (!fieldName || !fieldType) {
//       toast.current.show({
//         severity: "error",
//         summary: "Error",
//         detail: "Field Name and Type are required!",
//         life: 3000,
//       });
//       return;
//     }

//     const newField = {
//       fieldName,
//       fieldType: fieldType.code,
//       required,
//       value: "" // Initialize value for the new field
//     };

//     // Add the new field to the fields object
//     setFields((prevFields) => ({
//       ...prevFields,
//       [fieldName]: newField
//     }));

//     // Reset the form
//     setFieldName("");
//     setFieldType(null);
//     setRequired(false);
//     setDialogVisible(false);
//   };

//   const handleFieldChange = (fieldName, value) => {
//     setFields((prevFields) => ({
//       ...prevFields,
//       [fieldName]: {
//         ...prevFields[fieldName],
//         value
//       }
//     }));
//   };

//   const handleFinalSubmit = async () => {
//     const headers = { Authorization: `Bearer ${accessToken}` };

//     try {
//       // Iterate over the fields and send each one individually
//       for (const field of Object.values(fields)) {
//         const formattedField = {
//           fieldName: field.fieldName,
//           fieldType: field.fieldType,
//           required: field.required,
//           schemaName: "Customer",
//         };

//         await axios.post(`${API_BASE_URL}/customefield/${subdomain}`, formattedField, { headers });
//         console.log("Field submitted:", formattedField);
//       }

//       toast.current.show({
//         severity: "success",
//         summary: "Success",
//         detail: "All fields submitted!",
//         life: 3000,
//       });
//       fetchData()
//     } catch (error) {
//       console.error("Submission error:", error);
//       toast.current.show({
//         severity: "error",
//         summary: "Error",
//         detail: "Failed to submit fields!",
//         life: 3000,
//       });
//     }
//   };

//   const fetchData = async () => {
//     const headers = { Authorization: `Bearer ${accessToken}` };
//     try {
//       const response = await axios.get(`${API_BASE_URL}/customefield/${subdomain}/customer`, { headers });
     
//       setData(response.data.data.custmefields
//       )
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       toast.current.show({
//         severity: "error",
//         summary: "Error",
//         detail: "Failed to fetch data!",
//         life: 3000,
//       });
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <div style={{ padding: "20px" }}>
//       <Button label="Add Custom Field" onClick={() => setDialogVisible(true)} className="btn-all mb-3" />
//       <Dialog
//         header="Add Custom Field"
//         visible={dialogVisible}
//         onHide={() => setDialogVisible(false)}
//         className="btn-all mb-3"
//       >
//         <div>
//           <div>

//           <label htmlFor="newFieldName">Field Name</label> <br />
//           <InputText
//             id="newFieldName"
//             value={fieldName}
//             onChange={(e) => setFieldName(e.target.value)}
//           />
//           </div>
// <div>

//           <label htmlFor="newFieldType">Field Type</label> <br></br>
//           <Dropdown
//             id="newFieldType"
//             className="w-100"
//             value={fieldType}
//             options={fieldTypes}
//             onChange={(e) => setFieldType(e.value)}
//             optionLabel="name"
//             placeholder="Select a Type"
//           />
// </div>

//           <div style={{ margin: "10px 0" }}>
//             <Checkbox
//               checked={required}
//               onChange={(e) => setRequired(e.checked)}
//               inputId="requiredCheckbox"
//             />
//             <label htmlFor="requiredCheckbox" style={{ marginLeft: "8px" }}>Required</label>
//           </div>
// <div className="d-flex">

//           <Button label="Add Field" onClick={handleSubmit} />
//           <div className="ms-auto">
      
//           </div>
// </div>
//         </div>
//       </Dialog>

//       <div>
//         {data.map((field, index) => (
//           <div key={index}>
//             <label htmlFor={`field_${index}`} className="fw-bold">{field.fieldName}</label> <br />
//             <InputText
//               type={field.fieldType}
//               id={`field_${index}`}
//               name={field.fieldName}
//               value={field.value || ""}
//               onChange={(e) => handleFieldChange(field.fieldName, e.target.value)}
//               required={field.required}
//             />
//             {field.required && <span style={{ color: "red" }}> (Required)</span>}
//           </div>
//         ))}
//       </div>

      
//       <Button label="✔" className="ms-auto"onClick={handleFinalSubmit} />
//       <Toast ref={toast} />
//     </div>
//   );
// };

// export default Home;
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
}