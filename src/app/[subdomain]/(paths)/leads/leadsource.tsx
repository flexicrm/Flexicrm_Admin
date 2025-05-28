// // "use client";
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { InputText } from 'primereact/inputtext';
// // import { Button } from 'primereact/button';
// // import { Dropdown } from 'primereact/dropdown';
// // import { useFormik } from 'formik';
// // import Cookies from 'js-cookie';
// // import { API_BASE_URL } from '@/app/utils';

// // const LeadSource = () => {
// //     const [leadSources, setLeadSources] = useState([]);
// //     const [isAddingNewSource, setIsAddingNewSource] = useState(false);
// //     const [error, setError] = useState('');
// //     const [loading, setLoading] = useState(false);
// //     const accessToken = Cookies.get("accessToken");
// //     const subdomain = Cookies.get("subdomain");

// //     const formik = useFormik({
// //         initialValues: { sourceName: "" },
// //         onSubmit: async (values, { resetForm }) => {
// //             const newLeadSource = { sourceName: [values.sourceName] };
// //             const headers = { Authorization: `Bearer ${accessToken}` };

// //             try {
// //                 setLoading(true);
// //                 const response = await axios.post(`${API_BASE_URL}/leadsource/${subdomain}`, newLeadSource, { headers });

// //                 setLeadSources(prevSources => [...prevSources, response.data.data]);
// //                 resetForm();
// //                 setIsAddingNewSource(false);
// //                 setError('');
// //             } catch (error) {
// //                 setError(error.response?.data?.message || "Error adding new lead source. Please try again.");
// //                 console.error("Error adding new lead source:", error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         },
// //     });

// //     useEffect(() => {
// //         const fetchLeadSources = async () => {
// //             setError('');
// //             const headers = { Authorization: `Bearer ${accessToken}` };

// //             try {
// //                 setLoading(true);
// //                 const response = await axios.get(`${API_BASE_URL}/leadsource/${subdomain}`, { headers });
// //                 console.log(response, "respinse")

// //                 setLeadSources(response.data.data.leadSource);

// //             } catch (error) {
// //                 setLeadSources([]);
// //                 setError("Error fetching lead sources.");
// //                 console.error("Error fetching lead sources:", error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         if (subdomain && accessToken) {
// //             fetchLeadSources();
// //         }
// //     }, []);

// //     return (
// //         <>
// //             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
// //                 {!isAddingNewSource && (
// //                     <Dropdown
// //                         options={[
// //                             ...leadSources.map(source => ({
// //                                 label: source?.sourceName,
// //                                 value: source?._id,
// //                             })),
// //                             { label: 'Add New Source', value: 'addNew' },
// //                         ]}
// //                         onChange={(e) => {
// //                             if (e.value === 'addNew') {
// //                                 setIsAddingNewSource(true);
// //                             }
// //                         }}
// //                         placeholder="Select a Lead Source"
// //                         style={{ width: '200px', marginRight: '8px' }}
// //                     />
// //                 )}
// //                 <Button
// //                     label="Add New Source"
// //                     onClick={() => setIsAddingNewSource(true)}
// //                     style={{ marginLeft: '8px' }}
// //                 />
// //                 {isAddingNewSource && (
// //                     <form style={{ display: 'flex', alignItems: 'center' }} onSubmit={formik.handleSubmit}>
// //                         <InputText
// //                             name="sourceName"
// //                             id="sourceName"
// //                             placeholder="New Source Name"
// //                             value={formik.values.sourceName}
// //                             onChange={formik.handleChange}
// //                             required
// //                             style={{ marginLeft: '8px' }}
// //                         />
// //                         <Button
// //                             label="✓"
// //                             type="submit"
// //                             style={{ marginLeft: '8px' }}
// //                             disabled={loading}
// //                         />
// //                     </form>
// //                 )}
// //             </div>
// //             {loading && <div>Loading...</div>}
// //             {error && <div style={{ color: 'red' }}>{error}</div>}
// //         </>
// //     );
// // };

// // export default LeadSource;
// // "use client";
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { InputText } from 'primereact/inputtext';
// // import { Button } from 'primereact/button';
// // import { Dropdown } from 'primereact/dropdown';
// // import { useFormik } from 'formik';
// // import Cookies from 'js-cookie';
// // import { API_BASE_URL } from '@/app/utils';

// // const LeadSource = ({ onSelect }) => {
// //     const [leadSources, setLeadSources] = useState([]);
// //     const [isAddingNewSource, setIsAddingNewSource] = useState(false);
// //     const [error, setError] = useState('');
// //     const [loading, setLoading] = useState(false);
// //     const accessToken = Cookies.get("accessToken");
// //     const subdomain = Cookies.get("subdomain");

// //     const formik = useFormik({
// //         initialValues: { sourceName: "" },
// //         onSubmit: async (values, { resetForm }) => {
// //             const newLeadSource = values.sourceName;

// //             const headers = { Authorization: `Bearer ${accessToken}` };

// //             try {
// //                 setLoading(true);
// //                 const response = await axios.post(`${API_BASE_URL}/leadsource/${subdomain}`, newLeadSource, { headers });
// //                 resetForm();
// //                 setIsAddingNewSource(false);
// //                 setError('');
// //                 fetchLeadSources(); // Refresh the list after adding
// //             } catch (error) {
// //                 setError("Error adding new lead source. Please try again.");
// //                 console.error("Error adding new lead source:", error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         },
// //     });

// //     useEffect(() => {
// //         const fetchLeadSources = async () => {
// //             setError('');
// //             const headers = { Authorization: `Bearer ${accessToken}` };

// //             try {
// //                 setLoading(true);
// //                 const response = await axios.get(`${API_BASE_URL}/leadsource/${subdomain}`, { headers });
// //                 console.log(response,"leadspource");

// //                 setLeadSources(response?.data);
// //             } catch (error) {
// //                 setLeadSources([]);
// //                 setError("Error fetching lead sources.");
// //                 console.error("Error fetching lead sources:", error);
// //             } finally {
// //                 setLoading(false);
// //             }
// //         };

// //         if (subdomain && accessToken) {
// //             fetchLeadSources();
// //         }
// //     }, []);

// //     return (
// //         <>
// //             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
// //             {!isAddingNewSource  && (
// //                 <></>
// //                     // <Dropdown
// //                     //     options={[
// //                     //         { label: sourceName.sourceName, value: sourceName.sourceName },
// //                     //         { label: 'Add New Status', value: 'addNew' },
// //                     //     ]}
// //                     //     onChange={(e) => {
// //                     //         if (e.value === 'addNew') {
// //                     //             setIsAddingNewSource(true);
// //                     //         } else {
// //                     //             onSelect(e.value); // Send the selected lead status back to LeadForm
// //                     //         }
// //                     //     }}
// //                     //     placeholder="Select a Lead Status"
// //                     //     style={{ width: '200px', marginRight: '8px' }}
// //                     // />
// //                 )}
// //                 <Button
// //                     label="Add New Source"
// //                     onClick={() => setIsAddingNewSource(true)}
// //                     style={{ marginLeft: '8px' }}
// //                 />
// //                 {isAddingNewSource && (
// //                     <form style={{ display: 'flex', alignItems: 'center' }}  onSubmit={formik.handleSubmit}>
// //                         <InputText
// //                             name="sourceName"
// //                             id="sourceName"
// //                             placeholder="New Source Name"
// //                             value={formik.values.sourceName}
// //                             onChange={formik.handleChange}
// //                             required
// //                             style={{ marginLeft: '8px' }}
// //                         />
// //                         <Button
// //                             label="✓"
// //                             type="submit"
// //                             style={{ marginLeft: '8px' }}
// //                             disabled={loading}

// //                         />
// //                     </form>
// //                 )}
// //             </div>
// //             {loading && <div>Loading...</div>}
// //             {error && <div style={{ color: 'red' }}>{error}</div>}
// //         </>
// //     );
// // };

// // export default LeadSource;
// "use client";
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { useFormik } from 'formik';
// import Cookies from 'js-cookie';
// import { API_BASE_URL } from '@/app/utils';

// const LeadSource = ({ onSelect }) => {
//     const [leadSources, setLeadSources] = useState([]);
//     const [isAddingNewSource, setIsAddingNewSource] = useState(false);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const accessToken = Cookies.get("accessToken");
//     const subdomain = Cookies.get("subdomain");

//     const formik = useFormik({
//         initialValues: { sourceName: "" },
//         onSubmit: async (values, { resetForm }) => {
//             const newLeadSource = values.sourceName;
//             const headers = { Authorization: `Bearer ${accessToken}` };

//             try {
//                 setLoading(true);
//                 const response = await axios.post(`${API_BASE_URL}/leadsource/${subdomain}`, { sourceName: newLeadSource }, { headers });
//                 resetForm();
//                 setIsAddingNewSource(false);
//                 setError('');
//                 fetchLeadSources(); // Refresh the list after adding
//             } catch (error) {
//                 setError("Error adding new lead source. Please try again.");
//                 console.error("Error adding new lead source:", error);
//             } finally {
//                 setLoading(false);
//             }
//         },
//     });

//     const fetchLeadSources = async () => {
//         setError('');
//         const headers = { Authorization: `Bearer ${accessToken}` };

//         try {
//             setLoading(true);
//             const response = await axios.get(`${API_BASE_URL}/leadsource/${subdomain}`, { headers });
//             setLeadSources(response?.data);
//         } catch (error) {
//             setLeadSources([]);
//             setError("Error fetching lead sources.");
//             console.error("Error fetching lead sources:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (subdomain && accessToken) {
//             fetchLeadSources();
//         }
//     }, [subdomain, accessToken]);

//     return (
//         <>
//             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
//                 {!isAddingNewSource && (
//                     <Button
//                         label="Add New Source"
//                         onClick={() => setIsAddingNewSource(true)}
//                         style={{ marginLeft: '8px' }}
//                     />
//                 )}
//                 {isAddingNewSource && (
//                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                         <InputText
//                             name="sourceName"
//                             id="sourceName"
//                             placeholder="New Source Name"
//                             value={formik.values.sourceName}
//                             onChange={formik.handleChange}
//                             required
//                             style={{ marginLeft: '8px' }}
//                         />
//                         <Button
//                             label="✓"
//                             type="button"
//                             onClick={formik.handleSubmit} // Use onClick to call Formik's submit handler
//                             style={{ marginLeft: '8px' }}
//                             disabled={loading}
//                         />
//                     </div>
//                 )}
//             </div>
//             {loading && <div>Loading...</div>}
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//         </>
//     );
// };

// export default LeadSource;
// "use client";
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { useFormik } from 'formik';
// import Cookies from 'js-cookie';
// import { API_BASE_URL } from '@/app/utils';
// import { Dropdown } from 'primereact/dropdown';

// const LeadSource = ({ onSelect }) => {
//     const [leadSources, setLeadSources] = useState([]);
//     const [isAddingNewSource, setIsAddingNewSource] = useState(false);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const accessToken = Cookies.get("accessToken");
//     const subdomain = Cookies.get("subdomain");

//     const formik = useFormik({
//         initialValues: { sourceName: "" },
//         onSubmit: async (values, { resetForm }) => {
//             const newLeadSource = values.sourceName;
//             const headers = { Authorization: `Bearer ${accessToken}` };

//             try {
//                 setLoading(true);
//                 const response = await axios.post(`${API_BASE_URL}/leadsource/${subdomain}`, { sourceName: newLeadSource }, { headers });
//                 resetForm();
//                 setIsAddingNewSource(false);
//                 setError('');
//                 fetchLeadSources(); // Refresh the list after adding
//             } catch (error) {
//                 setError("Error adding new lead source. Please try again.");
//                 console.error("Error adding new lead source:", error);
//             } finally {
//                 setLoading(false);
//             }
//         },
//     });

//     const fetchLeadSources = async () => {
//         setError('');
//         const headers = { Authorization: `Bearer ${accessToken}` };

//         try {
//             setLoading(true);
//             const response = await axios.get(`${API_BASE_URL}/leadsource/${subdomain}`, { headers });
//             console.log(response,"sresponse")
//             console.log(response,"response");

//             setLeadSources(response?.data.data);
//         } catch (error) {
//             setLeadSources([]);
//             setError("Error fetching lead sources.");
//             console.error("Error fetching lead sources:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (subdomain && accessToken) {
//             fetchLeadSources();
//         }
//     }, [subdomain, accessToken]);

//     const handleSubmit = (event) => {
//         event.preventDefault(); // Prevent default form submission behavior
//         formik.handleSubmit();  // Call Formik's submit handler
//     };

//     return (
//         <>
//             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
//                 {!isAddingNewSource && (
//                     <>
//                     <Dropdown
//                         options={[
//                             { label: leadSources.sourceName, value: leadSources.sourceName },
//                             { label: 'Add New Status', value: 'addNew' },
//                         ]}
//                         onChange={(e) => {
//                             if (e.value === 'addNew') {
//                                 setIsAddingNewSource(true);
//                             } else {
//                                 onSelect(e.value); // Send the selected lead status back to LeadForm
//                             }
//                         }}
//                         placeholder="Select a Lead Status"
//                         style={{ width: '200px', marginRight: '8px' }}
//                     />
//                     <Button
//                         label="Add New Source"
//                         onClick={() => setIsAddingNewSource(true)}
//                         style={{ marginLeft: '8px' }}
//                     />
//                     </>
//                 )}
//                 {isAddingNewSource && (
//                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                         <InputText
//                             name="sourceName"
//                             id="sourceName"
//                             placeholder="New Source Name"
//                             value={formik.values.sourceName}
//                             onChange={formik.handleChange}
//                             required
//                             style={{ marginLeft: '8px' }}
//                         />
//                         <Button
//                             label="✓"
//                             type="button" // Prevents default form submission
//                             onClick={handleSubmit} // Calls the submit handler
//                             style={{ marginLeft: '8px' }}
//                             disabled={loading}
//                         />
//                     </div>
//                 )}
//             </div>
//             {loading && <div>Loading...</div>}
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//         </>
//     );
// };

// export default LeadSource;
// "use client";
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { useFormik } from 'formik';
// import Cookies from 'js-cookie';
// import { API_BASE_URL } from '@/app/utils';
// import { Dropdown } from 'primereact/dropdown';

// const LeadSource = ({ onSelect }) => {
//     const [leadSources, setLeadSources] = useState([]);
//     const [isAddingNewSource, setIsAddingNewSource] = useState(false);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const accessToken = Cookies.get("accessToken");
//     const subdomain = Cookies.get("subdomain");

//     const formik = useFormik({
//         initialValues: { sourceName: "" },
//         onSubmit: async (values, { resetForm }) => {
//             const newLeadSource = values.sourceName;
//             const headers = { Authorization: `Bearer ${accessToken}` };

//             try {
//                 setLoading(true);
//                 await axios.post(`${API_BASE_URL}/leadsource/${subdomain}`, { sourceName: newLeadSource }, { headers });
//                 resetForm();
//                 setIsAddingNewSource(false);
//                 setError('');
//                 fetchLeadSources();
//             } catch (error) {
//                 setError("Error adding new lead source. Please try again.");
//                 console.error("Error adding new lead source:", error);
//             } finally {
//                 setLoading(false);
//             }
//         },
//     });

//     const fetchLeadSources = async () => {
//         setError('');
//         const headers = { Authorization: `Bearer ${accessToken}` };

//         try {
//             setLoading(true);
//             const response = await axios.get(`${API_BASE_URL}/leadsource/${subdomain}`, { headers });
//             console.log(response?.data?.data, "leadsource");

//             setLeadSources(response?.data?.data);
//         } catch (error) {
//             setLeadSources([]);
//             setError("Error fetching lead sources.");
//             console.error("Error fetching lead sources:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (subdomain && accessToken) {
//             fetchLeadSources();
//         }
//     }, [ ]);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         formik.handleSubmit();
//     };

//     console.log(leadSources, "leadSources=?>>>>>>>>>>>>>>>>>>")
//     const leadsourceOptions = (() =>
//         leadSources.map((user) => ({
//             label: user.sourceName
//             ,
//             value: user.sourceName,

//         })));
//     // const handleoption =[
//     //     {
//     //         label: leadSources.sourceName
//     //         ,
//     //         value: leadSources.sourceName
//     //     }
//     // ]

//     return (
//         <>
//             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
//                 {!isAddingNewSource && (
//                     <>

//                         <Dropdown
//                             options={leadsourceOptions}
//                             value={formik.sourceName}
//                             onChange={(e) => {
//                                 if (e.value === 'addNew') {
//                                     setIsAddingNewSource(true);
//                                 } else {
//                                     onSelect(e.value);
//                                 }
//                             }}
//                             placeholder="Select LeadSource"
//                             style={{ width: '200px' }}
//                         />
//                         {/* <Dropdown
//                             options={{ label: leadSources.sourceName, value: leadSources.sourceName }}
//                             value={formik.values.sourceName}
//                             onChange={(e) => {
//                                 if (e.value === 'addNew') {
//                                     setIsAddingNewSource(true);
//                                 } else {
//                                     onSelect(e.value);
//                                 }
//                             }}
//                             placeholder="Select a Lead Source"
//                             style={{ width: '200px' }}
//                         /> */}
//                         <Button
//                             label="+"
//                             onClick={() => setIsAddingNewSource(true)}

//                         />
//                     </>
//                 )}
//                 {isAddingNewSource && (
//                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                         <InputText
//                             name="sourceName"
//                             id="sourceName"
//                             placeholder="New Source Name"
//                             value={formik.values.sourceName}
//                             onChange={formik.handleChange}
//                             required

//                         />
//                         <Button
//                             label="✓"
//                             type="button" // Prevents default form submission
//                             onClick={handleSubmit} // Calls the submit handler

//                             disabled={loading}
//                         />
//                     </div>
//                 )}
//             </div>
//             {loading && <div>Loading...</div>}
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//         </>
//     );
// };

// export default LeadSource;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { InputText } from 'primereact/inputtext';
// import { Button } from 'primereact/button';
// import { useFormik } from 'formik';
// import Cookies from 'js-cookie';
// import { API_BASE_URL } from '@/app/utils';
// import { Dropdown } from 'primereact/dropdown';

// const LeadSource = ({ onSelect }) => {
//     const [leadSources, setLeadSources] = useState([]);
//     const [isAddingNewSource, setIsAddingNewSource] = useState(false);
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const accessToken = Cookies.get("accessToken");
//     const subdomain = Cookies.get("subdomain");

//     const formik = useFormik({
//         initialValues: { sourceName: "" },
//         onSubmit: async (values, { resetForm }) => {
//             const newLeadSource = values.sourceName;
//             const headers = { Authorization: `Bearer ${accessToken}` };

//             try {
//                 setLoading(true);
//                 await axios.post(`${API_BASE_URL}/leadsource/${subdomain}`, { sourceName: newLeadSource }, { headers });
//                 resetForm();
//                 setIsAddingNewSource(false);
//                 setError('');
//                 fetchLeadSources();
//             } catch (error) {
//                 setError("Error adding new lead source. Please try again.");
//                 console.error("Error adding new lead source:", error);
//             } finally {
//                 setLoading(false);
//             }
//         },
//     });

//     const fetchLeadSources = async () => {
//         setError('');
//         const headers = { Authorization: `Bearer ${accessToken}` };

//         try {
//             setLoading(true);
//             const response = await axios.get(`${API_BASE_URL}/leadsource/${subdomain}`, { headers });
//             // console.log(response?.data?.data, "leadsource");
//             setLeadSources(response?.data?.data || []); // Ensure it's an array
//         } catch (error) {
//             setLeadSources([]);
//             setError("Error fetching lead sources.");
//             console.error("Error fetching lead sources:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (subdomain && accessToken) {
//             fetchLeadSources();
//         }
//     }, [subdomain, accessToken]);

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         formik.handleSubmit();
//     };

//     // console.log(leadSources, "leadSources=?>>>>>>>>>>>>>>>>>>");

//     // const leadsourceOptions = leadSources.map((source) => ({
//     //     label: source.sourceName,
//     //     value: source.sourceName,
//     // })) || []; // Ensure it's an array

//     return (
//         <>
//             <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
//                 {!isAddingNewSource && (
//                     <>
//                         <Dropdown
//                             options={leadSources.sourceName}
//                             value={formik.values.sourceName}
//                             onChange={(e) => {
//                                 const selectedValue = e.value;
//                                 if (selectedValue === 'addNew') {
//                                     setIsAddingNewSource(true);
//                                     formik.setFieldValue('sourceName', ''); // Clear the input
//                                 } else {
//                                     onSelect(selectedValue);
//                                     formik.setFieldValue('sourceName', selectedValue); // Optional: Set selected value
//                                 }
//                             }}
//                             placeholder="Select Lead Source"
//                             style={{ width: '200px' }}
//                         />

//                         <Button
//                             label="+"
//                             onClick={() => setIsAddingNewSource(true)}
//                         />
//                     </>
//                 )}
//                 {isAddingNewSource && (
//                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                         <InputText
//                             name="sourceName"
//                             id="sourceName"
//                             placeholder="New Source Name"
//                             value={formik.values.sourceName}
//                             onChange={formik.handleChange}
//                             required
//                         />
//                         <Button
//                             label="✓"
//                             type="button" // Prevents default form submission
//                             onClick={handleSubmit}
//                             disabled={loading}
//                         />
//                     </div>
//                 )}
//             </div>
//             {loading && <div>Loading...</div>}
//             {error && <div style={{ color: 'red' }}>{error}</div>}
//         </>
//     );
// };

// export default LeadSource;
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, CircularProgress, Box, IconButton } from '@mui/material';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../utils';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
interface LeadSourceProps {
    onSelect: (value: string) => void;
    leadSource: any;
}

// interface LeadSourceItem {
//     _id: string;
//     sourceName: string;
// }

const LeadSource: React.FC<LeadSourceProps> = ({ onSelect, leadSource }) => {
    const [leadSources, setLeadSources] = useState<any>([]);
    const [isAddingNewSource, setIsAddingNewSource] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [sourceName, setSourceName] = useState('');
    const [selectedSource, setSelectedSource] = useState<any>(leadSource || '');
    console.log(leadSource, 'leadSourceMMMMMMMMMMMMMMMMMM');

    const accessToken = Cookies.get('accessToken');
    const subdomain = Cookies.get('subdomain');

    const fetchLeadSources = async () => {
        setError('');
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/leadsource/${subdomain}`, { headers });
            setLeadSources(response?.data?.data || []);
        } catch (error) {
            setLeadSources([]);
            setError('Error fetching lead sources.');
            // eslint-disable-next-line no-console
            console.error('Error fetching lead sources:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (subdomain && accessToken) {
            fetchLeadSources();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [subdomain, accessToken]);

    const handleAddSource = async () => {
        if (!sourceName.trim()) return;
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            setLoading(true);
            await axios.post(`${API_BASE_URL}/leadsource/${subdomain}`, { sourceName }, { headers });
            setSourceName('');
            setIsAddingNewSource(false);
            setError('');
            fetchLeadSources();
        } catch (error) {
            setError('Error adding new lead source. Please try again.');
            // eslint-disable-next-line no-console
            console.error('Error adding new lead source:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDropdownChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (value === 'addNew') {
            setIsAddingNewSource(true);
            setSourceName('');
        } else {
            setSelectedSource(value);
            onSelect(value);
        }
    };
    console.log(leadSources, 'leadSources');

    return (
        <>
            <Box display="flex" alignItems="center" mb={2}>
                {!isAddingNewSource && (
                    <>
                        <TextField select label="Select Lead Source" value={selectedSource || leadSource} onChange={handleDropdownChange} fullWidth size="small">
                            {Array.isArray(leadSources?.sourceName) &&
                                leadSources?.sourceName?.flatMap((source: any, index: number) => (
                                    <MenuItem key={index} value={source}>
                                        {source}
                                    </MenuItem>
                                ))}
                            <MenuItem value="addNew">Add New Source</MenuItem>
                        </TextField>
                        {/* <Button variant="contained" color="primary" onClick={() => setIsAddingNewSource(true)} sx={{ minWidth: 40, ml: 1 }}>
                            +
                        </Button> */}
                    </>
                )}
                {isAddingNewSource && (
                    <Box display="flex" alignItems="center" gap={1}>
                        <TextField name="sourceName" size="small" id="sourceName" placeholder="New Source Name" value={sourceName} onChange={(e) => setSourceName(e.target.value)} required />
                        <IconButton color="primary" onClick={handleAddSource} disabled={loading} sx={{ ml: 1 }}>
                            <CheckIcon />
                        </IconButton>

                        {/* <Button variant="contained" color="success" onClick={handleAddSource} disabled={loading}>
                            ✓
                        </Button> */}
                        <IconButton color="error" onClick={() => setIsAddingNewSource(false)} disabled={loading}>
                            <CloseIcon />
                        </IconButton>
                        {/* <Button variant="outlined" color="error" onClick={() => setIsAddingNewSource(false)} disabled={loading}>
                            X
                        </Button> */}
                    </Box>
                )}
            </Box>
            {loading && <CircularProgress size={24} />}
            {error && <Box color="error.main">{error}</Box>}
        </>
    );
};

export default LeadSource;
