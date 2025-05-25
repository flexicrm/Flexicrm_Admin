// // components/CustomForm.js
// import { useRef, useState } from 'react';
// import { Button } from 'primereact/button'; // Adjust import if necessary
// import { InputText } from 'primereact/inputtext';
// import { Toast } from 'primereact/toast';

// const CustomerFieldsForm = () => {
//   const [fields, setFields] = useState([{ label: '', value: '' }]);
//   const [message, setMessage] = useState(null);
//   const toastRef = useRef(null);

//   const addField = () => {
//     setFields([...fields, { label: '', value: '' }]);
//   };

//   const handleChange = (index, e) => {
//     const newFields = [...fields];
//     newFields[index][e.target.name] = e.target.value;
//     setFields(newFields);
//   };

//   const handleSubmit = () => {
//     toastRef.current.show({ severity: 'success', summary: 'Form Submitted', detail: JSON.stringify(fields) });
//   };

//   return (
//     <div className='Custome-Fields-2'>
//       <Toast ref={toastRef} />
//       {fields.map((field, index) => (
//         <div key={index}>
//           <label htmlFor="Name">Company:</label> <br />
//           <InputText
//           id="Name"
//             name="label"
//             placeholder="Field Label"
//             value={field.label}
//             onChange={(e) => handleChange(index, e)}
//             className='w-50 mb-4'
//           />
//           <InputText
//             name="value"
//             placeholder="Field Value"
//             value={field.value}
//             onChange={(e) => handleChange(index, e)}
//           />
//         </div>
//       ))}
//       <Button label="Add Field" onClick={addField} className='btn'/>
//       <Button label="Submit" onClick={handleSubmit} className='ms-2 btn1'/>
//     </div>
//   );
// };

// export default CustomerFieldsForm;
import React from 'react'

export default function Page() {
  return (
    <div>P</div>
  )
}
