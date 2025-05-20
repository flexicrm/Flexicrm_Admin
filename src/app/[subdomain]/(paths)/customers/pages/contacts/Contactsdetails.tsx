// "use client"

// import React, { useContext, useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import { API_BASE_URL } from '../../../../../utils';
// import Cookies from 'js-cookie';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import '../../../../../styles/ContactsDetails.scss';
// import { InputText } from 'primereact/inputtext';
// import { Col, Dropdown, Row } from 'react-bootstrap';
// import { Button } from 'primereact/button';
// import { InputSwitch } from 'primereact/inputswitch';
// import Popups from './contactpopup';
// import Swal from 'sweetalert2';
// import EditContact from './Editcontact';
// import { Toast } from 'primereact/toast';
// import Link from 'next/link';
// import '../../../../../styles/newcustracts.scss';
// import userContext from '../../../../../UseContext/UseContext';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import * as XLSX from 'xlsx';
// import { CiExport } from 'react-icons/ci';
// import { TieredMenu } from 'primereact/tieredmenu';

// // Custom CSS for InputSwitch
// const customInputSwitchStyles = `
//   .custom-inputswitch .p-inputswitch-slider {
//     background-color: #133460;
//   }
//   .custom-inputswitch .p-inputswitch-slider:before {
//     background-color: #ffffff;
//   }
//   .custom-inputswitch .p-inputswitch-checked .p-inputswitch-slider {
//     background-color: #133460;
//   }
// `;

// // Inject the custom CSS into the document head
// if (typeof window !== 'undefined') {
//     const styleSheet = document.createElement('style');
//     styleSheet.type = 'text/css';
//     styleSheet.innerText = customInputSwitchStyles;
//     document.head.appendChild(styleSheet);
// }

// export default function ContactsDetails({ slug, fetchDatas }) {
//     const [visible, setVisible] = useState(false);
//     const { singledata } = useContext(userContext);
//     const contactsdata = singledata.contacts;
//     const [contacts, setContacts] = useState([]);
//     const [filteredContacts, setFilteredContacts] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedContactId, setSelectedContactId] = useState(null);
//     const [selectedContacts, setSelectedContacts] = useState([]);
//     const subdomain = Cookies.get('subdomain');
//     const accessToken = Cookies.get('accessToken');
//     const toast = useRef(null);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [filterValue, setFilterValue] = useState(null);
//     const [filterItems, setFilterItems] = useState([
//         {
//             label: 'Position',
//             items: [
//                 { label: 'Manager', command: () => filterByPosition('Manager') },
//                 { label: 'Developer', command: () => filterByPosition('Developer') },
//                 { label: 'Designer', command: () => filterByPosition('Designer') }
//             ]
//         },
//         {
//             label: 'Company',
//             items: [
//                 { label: 'Company A', command: () => filterByCompany('Company A') },
//                 { label: 'Company B', command: () => filterByCompany('Company B') },
//                 { label: 'Company C', command: () => filterByCompany('Company C') }
//             ]
//         }
//     ]);
//     const [loading, setLoading] = useState(true);

//     const handleExportExcel = () => {
//         const modifiedContacts = filteredContacts.map((contact) => ({
//             ...contact,
//             customerProfile: typeof contact.customerProfile === 'string' ? contact.customerProfile : '',
//             fullname: `${contact.firstName} ${contact.lastName}`,
//             createdAt: new Date(contact.createdAt).toLocaleString(),
//             status: contact.status === 1 ? 'Active' : 'Inactive'
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(modifiedContacts);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');
//         XLSX.writeFile(workbook, 'contacts.xlsx');
//     };

//     const handleExportPDF = () => {
//         const doc = new jsPDF();
//         doc.autoTable({
//             head: [['Fullname', 'Email', 'Position', 'Mobile', 'Status', 'Created At']],
//             body: filteredContacts.map((contact) => [`${contact.firstName} ${contact.lastName}`, contact.email, contact.position, contact.mobileNo, contact.status === 1 ? 'Active' : 'Inactive', new Date(contact.createdAt).toLocaleString()])
//         });
//         doc.save('contacts.pdf');
//     };

//     const exportOptions = [
//         { label: 'Download as Excelsheet', command: handleExportExcel },
//         { label: 'Download as pdf', command: handleExportPDF }
//     ];

//     useEffect(() => {
//         const fetchContacts = async () => {
//             try {
//                 const headers = { Authorization: `Bearer ${accessToken}` };
//                 const res = await axios.get(`${API_BASE_URL}/contact/${subdomain}`, { headers });
//                 const contactData = res?.data?.data.customers || [];
//                 setContacts(contactData);
//                 setFilteredContacts(contactData);
//                 setLoading(false); // Set loading to false after data is fetched
//             } catch (error) {
//                 console.error('Error fetching contacts:', error);
//                 setLoading(false); // Set loading to false even if there's an error
//             }
//         };
//         fetchContacts();
//     }, [subdomain, accessToken]);

//     if (loading) {
//         return (
//             <div>
//                 Loading...............
//             </div>
//         );
//     }

//     // const handleSearch = (event) => {
//     //     setSearchTerm(event.target.value);
//     //     const filtered = contacts.filter((contact) => `${contact.firstname} ${contact.lastname}`.toLowerCase().includes(event.target.value.toLowerCase()) || contact.email.toLowerCase().includes(event.target.value.toLowerCase()));
//     //     setFilteredContacts(filtered);
//     // };

//     const handleStatusChange = async (LeadId, status) => {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         try {
//             await axios.patch(`${API_BASE_URL}/contact/${subdomain}/${LeadId}`, { status }, { headers });
//             toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Lead status has been updated.', life: 3000 });
//             fetchDatas();
//         } catch (error) {
//             console.error('Error updating status:', error);
//             toast.current.show({ severity: 'error', summary: 'Error', detail: 'Message Content', life: 3000 });
//         }
//     };

//     const deleteContact = async (contactId) => {
//         const result = await Swal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, delete it!'
//         });

//         if (result.isConfirmed) {
//             try {
//                 const headers = { Authorization: `Bearer ${accessToken}` };
//                 await axios.delete(`${API_BASE_URL}/contact/${subdomain}/${contactId}`, { headers });
//                 setContacts(contacts.filter((contact) => contact._id !== contactId));
//                 setFilteredContacts(filteredContacts.filter((contact) => contact._id !== contactId));
//                 fetchDatas();
//             } catch (error) {
//                 console.error('Error deleting contact:', error);
//             }
//         }
//     };

//     const actionTemplate = (rowData) => (
//         <div className="d-flex justify-content-evenly icon-iteam">
//             <i className="align-self-center pi pi-pencil" onClick={() => setSelectedContactId(rowData._id)}></i>
//             <i className="align-self-center pi pi-trash" onClick={() => deleteContact(rowData._id)}></i>
//         </div>
//     );

//     const stylesofborderleft = {
//         borderTopLeftRadius: '12px',
//         borderBottomLeftRadius: '12px',
//         backgroundColor: ' rgba(10, 45, 90, 0.966)',
//         color: 'white'
//     };
//     const stylesofborderright = {
//         borderTopRightRadius: '12px',
//         borderBottomRightRadius: '12px',
//         backgroundColor: ' rgba(10, 45, 90, 0.966)',
//         color: 'white'
//     };
//     const Headerstyles = {
//         backgroundColor: ' rgba(10, 45, 90, 0.966)',
//         color: 'white'
//     };

//     const toggleDropdown = () => {
//         setDropdownOpen(!dropdownOpen);
//     };

//     const filterByPosition = (position) => {
//         const filtered = contacts.filter((contact) => contact.position === position);
//         setFilteredContacts(filtered);
//     };

//     const filterByCompany = (company) => {
//         const filtered = contacts.filter((contact) => contact.company === company);
//         setFilteredContacts(filtered);
//     };

//     const handleCheckboxChange = (contactId) => {
//         setSelectedContacts((prevSelected) => {
//             if (prevSelected.includes(contactId)) {
//                 return prevSelected.filter((id) => id !== contactId);
//             } else {
//                 return [...prevSelected, contactId];
//             }
//         });
//     };

//     const handleSelectAllChange = (event) => {
//         if (event.target.checked) {
//             setSelectedContacts(filteredContacts.map((contact) => contact._id));
//         } else {
//             setSelectedContacts([]);
//         }
//     };

//     const checkboxTemplate = (rowData) => <input type="checkbox" checked={selectedContacts.includes(rowData._id)} onChange={() => handleCheckboxChange(rowData._id)} />;

//     const headerCheckboxTemplate = () => <input type="checkbox" checked={selectedContacts.length === filteredContacts.length && selectedContacts.length > 0} onChange={handleSelectAllChange} />;
//     const filteredEstimates = contacts.filter((contacts) => {
//         // console.log(expenses, 'projectssssssssss');
//         const projectName = contacts?.position?.toLowerCase() || '';
//         const companyName = contacts?.firstName?.toLowerCase() || '';
//         return projectName.includes(searchTerm.toLowerCase()) || companyName.includes(searchTerm.toLowerCase());
//     });
//     return (
//         <div>
//             <Toast ref={toast} />
//             <div className="">
//                 <div className="d-flex justify-content-between">
//                     <div className="d-flex flex-column flex-md-row btn-item p-jc-between p-ai-center">
//                     <div className="mb-2 propose-search m-2">
//                         <span className="p-input-icon-left">
//                             <i className="pi pi-search ms-2 " />
//                             <InputText
//                                 type="search"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 placeholder="Search....."
//                                 // className="m-2"
//                                 style={{ textIndent: '2rem' }}
//                             />
//                         </span>
//                     </div>
//                         <div className="mb-2 ">
//                             {/* <Dropdown>
//                                 <Dropdown.Toggle className="btn1" variant="success" id="dropdown-basic">
//                                     Filter
//                                 </Dropdown.Toggle>
//                                 <Dropdown.Menu>
//                                     {filterItems.map((item, index) => (
//                                         <Dropdown.Item key={index} as="button" onClick={() => item.command()}>
//                                             {item.label}
//                                         </Dropdown.Item>
//                                     ))}
//                                 </Dropdown.Menu>
//                             </Dropdown> */}
//                         </div>
//                     </div>
//                     <div className="btn-item">
//                         <ul className="d-flex flex-column flex-md-row list-inline">
//                             <li>
//                                 {/* <Button className=" mb-2" > */}
//                                     <Popups slug={slug} fetchcontact={fetchDatas} visible={visible} setVisible={setVisible} />
//                                 {/* </Button> */}
//                             </li>
//                             <li>
//                                 <Button className="ms-2 me-2 mb-2 btn1">
//                                     <i className="pi pi-trash"></i>
//                                     Delete
//                                 </Button>
//                             </li>
//                             <li>
//                                 <Button className="ms-2 me-2 mb-2 btn1">
//                                     <i className="pi pi-download"></i>
//                                     Import
//                                 </Button>
//                             </li>
//                             <li>
//                                 <div className="dropdown-container">
//                                     <div className="dropdown-btn user-export btn1" onClick={toggleDropdown}>
//                                         <span className="iconssss">
//                                             <CiExport />
//                                         </span>
//                                         <span> Export </span>
//                                     </div>
//                                     <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''} me-2 p-2`} style={{ position: 'absolute', margin: '12px -57px', fontSize: '12px' }}>
//                                         {exportOptions.map((option, idx) => (
//                                             <Button key={idx} style={{ all: 'unset', fontSize: '12px', fontWeight: '200' }} label={option.label} icon={option.icon} onClick={option.command} className="export-button fw-1 " />
//                                         ))}
//                                     </div>
//                                 </div>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//             <DataTable value={filteredEstimates} paginator rows={10} className="customer-tbl">
//                 <Column field="checkbox" header={headerCheckboxTemplate} headerStyle={stylesofborderleft} body={checkboxTemplate} />
//                 <Column
//                     field="fullname"
//                     header="Fullname"
//                     headerStyle={Headerstyles}
//                     body={(rowData) => (
//                         <div>
//                             <img src={rowData.contactProfile} alt="" width={'35'} style={{ borderRadius: '50%' }} />
//                             <span>
//                                 {rowData.firstName} {rowData.lastName}
//                             </span>
//                         </div>
//                     )}
//                 />
//                 <Column field="email" header="Email" headerStyle={Headerstyles} />
//                 <Column field="position" header="Position" headerStyle={Headerstyles} />
//                 <Column field="mobileNo" header="Mobile" headerStyle={Headerstyles} />
//                 <Column header="Status" headerStyle={Headerstyles} body={(rowData) => <InputSwitch className="custom-inputswitch" checked={rowData.status === 1} onChange={(e) => handleStatusChange(rowData._id, e.value ? 1 : 0)} />} />
//                 <Column headerStyle={Headerstyles} header="Created At" body={(rowData) => new Date(rowData.createdAt).toLocaleString()} />
//                 <Column header="Actions" body={actionTemplate} headerStyle={stylesofborderright} />
//             </DataTable>
//             {selectedContactId && (
//                 <div className="contactsidebar">
//                     <EditContact fetchData={fetchDatas} contactId={selectedContactId} onClose={() => setSelectedContactId(null)} />
//                 </div>
//             )}
//         </div>
//     );
// }
// 'use client';

// import React, { useContext, useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import { API_BASE_URL } from '../../../../../utils';
// import Cookies from 'js-cookie';
// import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
// import { styled } from '@mui/material/styles';
// import '../../../../../styles/ContactsDetails.scss';
// import { TextField, Switch, Button, IconButton, Menu, MenuItem, Checkbox, Box, CircularProgress, Tooltip } from '@mui/material';
// import Swal from 'sweetalert2';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Link from 'next/link';
// import '../../../../../styles/newcustracts.scss';
// import userContext from '../../../../../UseContext/UseContext';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import * as XLSX from 'xlsx';
// import { CiExport } from 'react-icons/ci';
// import { Add, Delete, Download, Edit, Search } from '@mui/icons-material';
// import Popups from './contactpopup';
// import ContactForm from './contactpopup';

// interface Contact {
//     _id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     position: string;
//     mobileNo: string;
//     status: number;
//     createdAt: string;
//     contactProfile?: string;
//     company?: string;
// }

// const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
//     '& .MuiDataGrid-columnHeaders': {
//         backgroundColor: 'rgba(10, 45, 90, 0.966)',
//         // color: 'black',
//         borderRadius: '0'
//     },
//     '& .MuiDataGrid-columnHeader:first-of-type': {
//         borderTopLeftRadius: '12px',
//         borderBottomLeftRadius: '12px'
//     },
//     '& .MuiDataGrid-columnHeader:last-child': {
//         borderTopRightRadius: '12px',
//         borderBottomRightRadius: '12px'
//     }
// }));

// const ContactsDetails = ({ slug, fetchDatas }: { slug: string; fetchDatas: () => void }) => {
//     const [visible, setVisible] = useState(false);
//     const [visibleedit, setVisibleEdit] = useState(false);
//     const { singledata } = useContext(userContext);
//     const contactsdata = singledata.contacts;
//     const [contacts, setContacts] = useState<Contact[]>([]);
//     const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
//     const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
//     const subdomain = Cookies.get('subdomain') || '';
//     const accessToken = Cookies.get('accessToken') || '';
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//     const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//     };

//     const handleExportExcel = () => {
//         const modifiedContacts = filteredContacts.map((contact) => ({
//             ...contact,
//             customerProfile: typeof contact.contactProfile === 'string' ? contact.contactProfile : '',
//             fullname: `${contact.firstName} ${contact.lastName}`,
//             createdAt: new Date(contact.createdAt).toLocaleString(),
//             status: contact.status === 1 ? 'Active' : 'Inactive'
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(modifiedContacts);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');
//         XLSX.writeFile(workbook, 'contacts.xlsx');
//         handleMenuClose();
//     };

//     const handleExportPDF = () => {
//         const doc = new jsPDF();
//         doc.autoTable({
//             head: [['Fullname', 'Email', 'Position', 'Mobile', 'Status', 'Created At']],
//             body: filteredContacts.map((contact) => [`${contact.firstName} ${contact.lastName}`, contact.email, contact.position, contact.mobileNo, contact.status === 1 ? 'Active' : 'Inactive', new Date(contact.createdAt).toLocaleString()])
//         });
//         doc.save('contacts.pdf');
//         handleMenuClose();
//     };

//     useEffect(() => {
//         const fetchContacts = async () => {
//             try {
//                 const headers = { Authorization: `Bearer ${accessToken}` };
//                 const res = await axios.get(`${API_BASE_URL}/contact/${subdomain}`, { headers });
//                 console.log(res, 'contactssssss');

//                 const contactData = res?.data?.data.contacts || [];
//                 setContacts(contactData);
//                 setFilteredContacts(contactData);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching contacts:', error);
//                 setLoading(false);
//                 toast.error('Error fetching contacts');
//             }
//         };
//         fetchContacts();
//     }, [subdomain, accessToken, fetchDatas]);

//     const handleStatusChange = async (contactId: string, status: number) => {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         try {
//             await axios.patch(`${API_BASE_URL}/contact/${subdomain}/${contactId}`, { status }, { headers });
//             toast.success('Contact status updated successfully');
//             fetchDatas();
//         } catch (error) {
//             console.error('Error updating status:', error);
//             toast.error('Error updating contact status');
//         }
//     };

//     const deleteContact = async (contactId: string) => {
//         const result = await Swal.fire({
//             title: 'Are you sure?',
//             text: "You won't be able to revert this!",
//             icon: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes, delete it!'
//         });

//         if (result.isConfirmed) {
//             try {
//                 const headers = { Authorization: `Bearer ${accessToken}` };
//                 await axios.delete(`${API_BASE_URL}/contact/${subdomain}/${contactId}`, { headers });
//                 setContacts(contacts.filter((contact) => contact._id !== contactId));
//                 setFilteredContacts(filteredContacts.filter((contact) => contact._id !== contactId));
//                 fetchDatas();
//                 toast.success('Contact deleted successfully');
//             } catch (error) {
//                 console.error('Error deleting contact:', error);
//                 toast.error('Error deleting contact');
//             }
//         }
//     };

//     const handleCheckboxChange = (contactId: string) => {
//         setSelectedContacts((prevSelected) => (prevSelected.includes(contactId) ? prevSelected.filter((id) => id !== contactId) : [...prevSelected, contactId]));
//     };

//     const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.checked) {
//             setSelectedContacts(filteredContacts.map((contact) => contact._id));
//         } else {
//             setSelectedContacts([]);
//         }
//     };

//     const filteredEstimates = contacts.filter((contact) => {
//         const position = contact?.position?.toLowerCase() || '';
//         const firstName = contact?.firstName?.toLowerCase() || '';
//         const lastName = contact?.lastName?.toLowerCase() || '';
//         const email = contact?.email?.toLowerCase() || '';
//         const search = searchTerm.toLowerCase();

//         return position.includes(search) || firstName.includes(search) || lastName.includes(search) || email.includes(search);
//     });

//     const columns: GridColDef[] = [
//         {
//             field: 'checkbox',
//             headerName: '',
//             width: 50,
//             renderHeader: () => (
//                 <Checkbox
//                     checked={selectedContacts.length === filteredContacts.length && selectedContacts.length > 0}
//                     onChange={handleSelectAllChange}
//                     indeterminate={selectedContacts.length > 0 && selectedContacts.length < filteredContacts.length}
//                 />
//             ),
//             renderCell: (params) => <Checkbox checked={selectedContacts.includes(params.row._id)} onChange={() => handleCheckboxChange(params.row._id)} />
//         },
//         {
//             field: 'fullname',
//             headerName: 'Fullname',
//             width: 200,
//             renderCell: (params) => (
//                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
//                     <img src={params.row.contactProfile || '/default-avatar.png'} alt="Profile" width={35} height={35} style={{ borderRadius: '50%' }} />
//                     <span>
//                         {params.row.firstName} {params.row.lastName}
//                     </span>
//                 </div>
//             )
//         },
//         { field: 'email', headerName: 'Email', width: 250 },
//         { field: 'position', headerName: 'Position', width: 150 },
//         { field: 'mobileNo', headerName: 'Mobile', width: 150 },
//         {
//             field: 'status',
//             headerName: 'Status',
//             width: 120,
//             renderCell: (params) => <Switch checked={params.row.status === 1} onChange={(e) => handleStatusChange(params.row._id, e.target.checked ? 1 : 0)} color="primary" />
//         },
//         {
//             field: 'createdAt',
//             headerName: 'Created At',
//             width: 200,
//             valueGetter: (params: any) => new Date(params).toLocaleString()
//         },
//         {
//             field: 'actions',
//             headerName: 'Actions',
//             width: 120,
//             renderCell: (params) => (
//                 <div>
//                     <Tooltip title="Edit">
//                         <IconButton
//                             onClick={() => {
//                                 setSelectedContactId(params.row);
//                                 setVisibleEdit(true);
//                             }}
//                         >
//                             <Edit fontSize="small" />
//                         </IconButton>
//                     </Tooltip>
//                     <Tooltip title="Delete">
//                         <IconButton onClick={() => deleteContact(params.row._id)} color="error">
//                             <Delete fontSize="small" />
//                         </IconButton>
//                     </Tooltip>
//                 </div>
//             )
//         }
//     ];

//     if (loading) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" height="200px">
//                 <CircularProgress />
//             </Box>
//         );
//     }

//     return (
//         <div>
//             <ToastContainer position="top-right" autoClose={3000} />
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//                 <Box display="flex" alignItems="center" gap={2}>
//                     <TextField
//                         variant="outlined"
//                         size="small"
//                         placeholder="Search..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         InputProps={{
//                             startAdornment: <Search fontSize="small" sx={{ mr: 1 }} />,
//                             sx: { borderRadius: '4px' }
//                         }}
//                     />
//                 </Box>
//                 <Box display="flex" alignItems="center" gap={2}>
//                     {selectedContactId ? (
//                         <div className="">
//                             <ContactForm fetchData={fetchDatas} selectedContactId={selectedContactId} open={visibleedit} onClose={() => setVisibleEdit(false)} />
//                         </div>
//                     ) : (
//                         <ContactForm fetchData={fetchDatas} open={visible} onClose={() => setVisible(false)} />
//                     )}

//                     <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setVisible(true)}>
//                         Add Contact
//                     </Button>
//                     <Button
//                         variant="contained"
//                         color="error"
//                         startIcon={<Delete />}
//                         disabled={selectedContacts.length === 0}
//                         onClick={() => {
//                             selectedContacts.forEach((id) => deleteContact(id));
//                             setSelectedContacts([]);
//                         }}
//                     >
//                         Delete
//                     </Button>

//                     <Button variant="contained" startIcon={<Download />} onClick={() => {}}>
//                         Import
//                     </Button>

//                     <Button variant="contained" startIcon={<CiExport />} onClick={handleMenuClick}>
//                         Export
//                     </Button>

//                     <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//                         <MenuItem onClick={handleExportExcel}>Download as Excel</MenuItem>
//                         <MenuItem onClick={handleExportPDF}>Download as PDF</MenuItem>
//                     </Menu>
//                 </Box>
//             </Box>

//             {/* <div style={{ height: 600, width: '100%' }}> */}
//             <div>
//                 <StyledDataGrid
//                     rows={filteredEstimates}
//                     columns={columns}
//                     initialState={{
//                         pagination: { paginationModel: { pageSize: 10 } }
//                     }}
//                     pageSizeOptions={[10, 25, 50]}
//                     checkboxSelection={false}
//                     disableRowSelectionOnClick
//                     getRowId={(row) => row._id}
//                     // components={{
//                     //     Toolbar: GridToolbar
//                     // }}
//                 />
//             </div>
//         </div>
//     );
// };

// export default ContactsDetails;
'use client';

import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../../../../utils';
import Cookies from 'js-cookie';
import { DataGrid, GridColDef, GridToolbar } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import '../../../../../styles/ContactsDetails.scss';
import { TextField, Switch, Button, IconButton, Menu, MenuItem, Checkbox, Box, CircularProgress, Tooltip } from '@mui/material';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import '../../../../../styles/newcustracts.scss';
import userContext from '../../../../../UseContext/UseContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { CiExport } from 'react-icons/ci';
import { Add, Delete, Download, Edit, Search } from '@mui/icons-material';
import Popups from './contactpopup';
import ContactForm from './contactpopup';

interface Contact {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    position: string;
    mobileNo: string;
    status: number;
    createdAt: string;
    contactProfile?: string;
    company?: string;
}

interface ContactsDetailsProps {
    // slug: string;
    fetchDatas: () => void;
}

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .MuiDataGrid-columnHeaders': {
        backgroundColor: 'rgba(10, 45, 90, 0.966)',
        borderRadius: '0'
    },
    '& .MuiDataGrid-columnHeader:first-of-type': {
        borderTopLeftRadius: '12px',
        borderBottomLeftRadius: '12px'
    },
    '& .MuiDataGrid-columnHeader:last-child': {
        borderTopRightRadius: '12px',
        borderBottomRightRadius: '12px'
    }
}));

const ContactsDetails: React.FC<any> = ({ fetchDatas }) => {
    const [visible, setVisible] = useState(false);
    const [visibleedit, setVisibleEdit] = useState(false);
    const { singledata } = useContext(userContext);
    const contactsdata = singledata.contacts;
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedContactId, setSelectedContactId] = useState<Contact | null>(null);
    const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
    const subdomain = Cookies.get('subdomain') || '';
    const accessToken = Cookies.get('accessToken') || '';
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleExportExcel = () => {
        const modifiedContacts = filteredContacts.map((contact) => ({
            ...contact,
            customerProfile: typeof contact.contactProfile === 'string' ? contact.contactProfile : '',
            fullname: `${contact.firstName} ${contact.lastName}`,
            createdAt: new Date(contact.createdAt).toLocaleString(),
            status: contact.status === 1 ? 'Active' : 'Inactive'
        }));

        const worksheet = XLSX.utils.json_to_sheet(modifiedContacts);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');
        XLSX.writeFile(workbook, 'contacts.xlsx');
        handleMenuClose();
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Fullname', 'Email', 'Position', 'Mobile', 'Status', 'Created At']],
            body: filteredContacts.map((contact) => [`${contact.firstName} ${contact.lastName}`, contact.email, contact.position, contact.mobileNo, contact.status === 1 ? 'Active' : 'Inactive', new Date(contact.createdAt).toLocaleString()])
        });
        doc.save('contacts.pdf');
        handleMenuClose();
    };

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const headers = { Authorization: `Bearer ${accessToken}` };
                const res = await axios.get(`${API_BASE_URL}/contact/${subdomain}`, { headers });
                console.log(res, 'contactssssss');

                const contactData = res?.data?.data.contacts || [];
                setContacts(contactData);
                setFilteredContacts(contactData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching contacts:', error);
                setLoading(false);
                toast.error('Error fetching contacts');
            }
        };
        fetchContacts();
    }, [subdomain, accessToken, fetchDatas]);

    const handleStatusChange = async (contactId: string, status: number) => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            await axios.patch(`${API_BASE_URL}/contact/${subdomain}/${contactId}`, { status }, { headers });
            toast.success('Contact status updated successfully');
            const data = await fetchDatas();
            if (data) {
                console.log(data);
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Error updating contact status');
        }
    };

    const deleteContact = async (contactId: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const headers = { Authorization: `Bearer ${accessToken}` };
                await axios.delete(`${API_BASE_URL}/contact/${subdomain}/${contactId}`, { headers });
                setContacts(contacts.filter((contact) => contact._id !== contactId));
                setFilteredContacts(filteredContacts.filter((contact) => contact._id !== contactId));
                const data = await fetchDatas();
                if (data) {
                    console.log(data);
                }
                toast.success('Contact deleted successfully');
            } catch (error) {
                console.error('Error deleting contact:', error);
                toast.error('Error deleting contact');
            }
        }
    };

    const handleCheckboxChange = (contactId: string) => {
        setSelectedContacts((prevSelected) => (prevSelected.includes(contactId) ? prevSelected.filter((id) => id !== contactId) : [...prevSelected, contactId]));
    };

    const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSelectedContacts(filteredContacts.map((contact) => contact._id));
        } else {
            setSelectedContacts([]);
        }
    };

    const filteredEstimates = contacts.filter((contact) => {
        const position = contact?.position?.toLowerCase() || '';
        const firstName = contact?.firstName?.toLowerCase() || '';
        const lastName = contact?.lastName?.toLowerCase() || '';
        const email = contact?.email?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();

        return position.includes(search) || firstName.includes(search) || lastName.includes(search) || email.includes(search);
    });

    const columns: GridColDef[] = [
        {
            field: 'checkbox',
            headerName: '',
            width: 50,
            renderHeader: () => (
                <Checkbox
                    checked={selectedContacts.length === filteredContacts.length && selectedContacts.length > 0}
                    onChange={handleSelectAllChange}
                    indeterminate={selectedContacts.length > 0 && selectedContacts.length < filteredContacts.length}
                />
            ),
            renderCell: (params) => <Checkbox checked={selectedContacts.includes(params.row._id)} onChange={() => handleCheckboxChange(params.row._id)} />
        },
        {
            field: 'fullname',
            headerName: 'Fullname',
            width: 200,
            renderCell: (params) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={params.row.contactProfile || '/default-avatar.png'} alt="Profile" width={35} height={35} style={{ borderRadius: '50%' }} />
                    <span>
                        {params.row.firstName} {params.row.lastName}
                    </span>
                </div>
            )
        },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'position', headerName: 'Position', width: 150 },
        { field: 'mobileNo', headerName: 'Mobile', width: 150 },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => <Switch checked={params.row.status === 1} onChange={(e) => handleStatusChange(params.row._id, e.target.checked ? 1 : 0)} color="primary" />
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            width: 200,
            valueGetter: (params: any) => new Date(params).toLocaleString()
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 120,
            renderCell: (params) => (
                <div>
                    <Tooltip title="Edit">
                        <IconButton
                            onClick={() => {
                                setSelectedContactId(params.row);
                                setVisibleEdit(true);
                            }}
                        >
                            <Edit fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => deleteContact(params.row._id)} color="error">
                            <Delete fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </div>
            )
        }
    ];

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div>
            <ToastContainer position="top-right" autoClose={3000} />
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box display="flex" alignItems="center" gap={2}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: <Search fontSize="small" sx={{ mr: 1 }} />,
                            sx: { borderRadius: '4px' }
                        }}
                    />
                </Box>
                <Box display="flex" alignItems="center" gap={2}>
                    {selectedContactId ? (
                        <div className="">
                            <ContactForm fetchDatas={fetchDatas} selectedContactId={selectedContactId} open={visibleedit} onClose={() => setVisibleEdit(false)} />
                        </div>
                    ) : (
                        <ContactForm fetchDatas={fetchDatas} open={visible} onClose={() => setVisible(false)} />
                    )}

                    <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => setVisible(true)}>
                        Add Contact
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<Delete />}
                        disabled={selectedContacts.length === 0}
                        onClick={() => {
                            selectedContacts.forEach((id) => deleteContact(id));
                            setSelectedContacts([]);
                        }}
                    >
                        Delete
                    </Button>

                    <Button variant="contained" startIcon={<Download />} onClick={() => {}}>
                        Import
                    </Button>

                    <Button variant="contained" startIcon={<CiExport />} onClick={handleMenuClick}>
                        Export
                    </Button>

                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                        <MenuItem onClick={handleExportExcel}>Download as Excel</MenuItem>
                        <MenuItem onClick={handleExportPDF}>Download as PDF</MenuItem>
                    </Menu>
                </Box>
            </Box>

            <div>
                <StyledDataGrid
                    rows={filteredEstimates}
                    columns={columns}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 10 } }
                    }}
                    pageSizeOptions={[10, 25, 50]}
                    checkboxSelection={false}
                    disableRowSelectionOnClick
                    getRowId={(row) => row._id}
                />
            </div>
        </div>
    );
};

export default ContactsDetails;
