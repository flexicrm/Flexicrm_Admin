// // // 'use client';
// // // import React, { useState, useEffect, useContext } from 'react';
// // // import { DataTable } from 'primereact/datatable';
// // // import { Column } from 'primereact/column';
// // // import { Button } from 'primereact/button';
// // // import { InputSwitch } from 'primereact/inputswitch';
// // // import axios from 'axios';
// // // import Cookies from 'js-cookie';
// // // import { API_BASE_URL } from '../../../utils';
// // // import { CiExport } from 'react-icons/ci';
// // // import jsPDF from 'jspdf';
// // // import 'jspdf-autotable';
// // // import * as XLSX from 'xlsx';
// // // import userContext from '../../../UseContext/UseContext';
// // // // import { API_BASE_URL } from '@/app/utils';

// // // const TaskTable = ({ tasks, onEdit, onDelete }) => {
// // //     // console.log(tasks,"tasks")
// // //     const { data } = useContext(userContext);
// // //     const [statuses, setStatuses] = useState([]);
// // //     const accessToken = Cookies.get('accessToken');
// // //     const subdomain = Cookies.get('subdomain');
// // //     const [userPermissions, setUserPermissions] = useState({});
// // //     // console.log(userPermissions, 'userssssss');
// // //     const [dropdownOpen, setDropdownOpen] = useState(false);
// // //     useEffect(() => {
// // //         // Set permissions only when user data changes
// // //         if (data?.permissions) {
// // //             setUserPermissions(data.permissions);
// // //         }
// // //     }, [data?.permissions]);
// // //     useEffect(() => {
// // //         setStatuses(tasks.map((tasks) => ({ _id: tasks._id, status: tasks.status })));
// // //     }, [tasks]);

// // //     const handleStatusChange = async (id, status) => {
// // //         try {
// // //             const headers = { Authorization: `Bearer ${accessToken}` };
// // //             await axios.patch(`${API_BASE_URL}/expense/${subdomain}/${id}`, { status }, { headers });

// // //             setStatuses((prevStatuses) => prevStatuses.map((expense) => (expense._id === id ? { ...expense, status } : expense)));
// // //         } catch (error) {
// // //             console.error('Error updating status:', error);
// // //         }
// // //     };

// // //     const totalExpenses = statuses.length;
// // //     const activeExpenses = statuses.filter((expense) => expense.status === 1).length;
// // //     const inactiveExpenses = statuses.filter((expense) => expense.status === 0).length;
// // //     const handleExportExcel = () => {
// // //         const modifiedProposals = selectedProposals.map((proposal) => ({
// // //             subject: proposal.subject,
// // //             customer: proposal.customer.Companyname,
// // //             projectName: proposal.createdBy.firstname,
// // //             date: formatDate(proposal.date),
// // //             openTill: formatDate(proposal.deadline),
// // //             discount: proposal.discount,
// // //             subtotal: proposal.subtotal,
// // //             total: proposal.total,
// // //             status: proposal.status === 1 ? 'Active' : 'Inactive'
// // //         }));

// // //         const worksheet = XLSX.utils.json_to_sheet(modifiedProposals);
// // //         const workbook = XLSX.utils.book_new();
// // //         XLSX.utils.book_append_sheet(workbook, worksheet, 'Proposals');
// // //         XLSX.writeFile(workbook, 'proposals.xlsx');
// // //     };

// // //     const handleExportPDF = () => {
// // //         const doc = new jsPDF();
// // //         doc.autoTable({
// // //             head: [['Subject', 'Customer', 'Project Name', 'Date', 'Open Till', 'Discount', 'Subtotal', 'Total', 'Status']],
// // //             body: selectedProposals.map((proposal) => [
// // //                 proposal.subject,
// // //                 proposal.customer.Companyname,
// // //                 proposal.createdBy.firstname,
// // //                 formatDate(proposal.date),
// // //                 formatDate(proposal.deadline),
// // //                 proposal.discount,
// // //                 proposal.subtotal,
// // //                 proposal.total,
// // //                 proposal.status === 1 ? 'Active' : 'Inactive'
// // //             ])
// // //         });
// // //         doc.save('proposals.pdf');
// // //     };

// // //     const toggleDropdown = () => {
// // //         setDropdownOpen(!dropdownOpen);
// // //     };

// // //     const exportOptions = [
// // //         { label: 'Download as Excelsheet', command: handleExportExcel },
// // //         { label: 'Download as pdf', command: handleExportPDF }
// // //     ];
// // //     return (
// // //         <>
// // //             <div className="btn-item">
// // //                 <ul className="d-flex flex-column flex-md-row list-inline">
// // //                     <li>
// // //                         {' '}
// // //                         {userPermissions?.Proposals?.canCreate && (
// // //                             <Button
// // //                                 className="btn"
// // //                                 onClick={() => {
// // //                                     setEditingProposal(null);
// // //                                     setIsFormVisible(true);
// // //                                 }}
// // //                             >
// // //                                 New Proposal
// // //                             </Button>
// // //                         )}
// // //                     </li>
// // //                     <li>
// // //                         {userPermissions?.Proposals?.canDelete && (
// // //                             <Button className="ms-2 me-2 mb-2 btn1" onClick={() => onDelete(selectedProposals.map((proposal) => proposal._id))}>
// // //                                 <i className="pi pi-trash"></i>
// // //                                 Delete
// // //                             </Button>
// // //                         )}
// // //                     </li>
// // //                     <li>
// // //                         {userPermissions?.Proposals?.canCreate && (
// // //                             <Button className="ms-2 me-2 mb-2 btn1">
// // //                                 <i className="pi pi-download"></i>
// // //                                 Import
// // //                             </Button>
// // //                         )}
// // //                     </li>
// // //                     <li>
// // //                         <div className="dropdown-container">
// // //                             <div className="dropdown-btn user-export btn1" onClick={toggleDropdown}>
// // //                                 <span className="iconssss">
// // //                                     <CiExport />
// // //                                 </span>
// // //                                 <span> Export </span>
// // //                             </div>
// // //                             <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''} me-2 p-2`} style={{ position: 'absolute', margin: '12px -57px', fontSize: '12px' }}>
// // //                                 {exportOptions.map((option, idx) => (
// // //                                     <Button key={idx} style={{ all: 'unset', fontSize: '12px', fontWeight: '200' }} label={option.label} icon={option.icon} onClick={option.command} className="export-button fw-1" />
// // //                                 ))}
// // //                             </div>
// // //                         </div>
// // //                     </li>
// // //                 </ul>
// // //             </div>
// // //             <DataTable value={tasks}>
// // //                 <Column field="expenseId" header="Expense ID" />
// // //                 <Column field="createdBy.email" header="Email" />
// // //                 <Column field="createdBy.firstname" header="First Name" />
// // //                 {/* <Column field="userRole" header="User Role" /> */}
// // //                 <Column header="Status" body={(rowData) => <InputSwitch checked={rowData.status === 1} onChange={(e) => handleStatusChange(rowData._id, e.value ? 1 : 0)} />} />
// // //                 <Column field="paymentStatus" header="Payment Status" />
// // //                 <Column
// // //                     body={(rowData) => (
// // //                         <>
// // //                             <Button label="Edit" onClick={() => onEdit(rowData._id)} />
// // //                             <Button label="Delete" onClick={() => onDelete(rowData._id)} />
// // //                         </>
// // //                     )}
// // //                 />
// // //             </DataTable>
// // //         </>
// // //     );
// // // };

// // // export default TaskTable;
// // 'use client';
// // import React, { useState, useEffect, useContext } from 'react';
// // import { DataTable } from 'primereact/datatable';
// // import { Column } from 'primereact/column';
// // import { Button } from 'primereact/button';
// // import { InputSwitch } from 'primereact/inputswitch';
// // import axios from 'axios';
// // import Cookies from 'js-cookie';
// // import { API_BASE_URL } from '../../../utils';
// // import { CiExport } from 'react-icons/ci';
// // import jsPDF from 'jspdf';
// // import 'jspdf-autotable';
// // import * as XLSX from 'xlsx';
// // import userContext from '../../../UseContext/UseContext';

// // const TaskTable = ({ tasks, onEdit, onDelete }) => {
// //     const { data } = useContext(userContext);
// //     const [statuses, setStatuses] = useState([]);
// //     const accessToken = Cookies.get('accessToken');
// //     const subdomain = Cookies.get('subdomain');
// //     const [userPermissions, setUserPermissions] = useState({});
// //     const [dropdownOpen, setDropdownOpen] = useState(false);

// //     useEffect(() => {
// //         if (data?.permissions) {
// //             setUserPermissions(data.permissions);
// //         }
// //     }, [data?.permissions]);

// //     useEffect(() => {
// //         setStatuses(tasks.map((task) => ({ _id: task._id, status: task.status })));
// //     }, [tasks]);

// //     const handleStatusChange = async (id, status) => {
// //         try {
// //             const headers = { Authorization: `Bearer ${accessToken}` };
// //             await axios.patch(`${API_BASE_URL}/task/${subdomain}/${id}`, { status }, { headers });
// //             setStatuses((prevStatuses) => prevStatuses.map((task) => (task._id === id ? { ...task, status } : task)));
// //         } catch (error) {
// //             console.error('Error updating status:', error);
// //         }
// //     };

// //     const totalTasks = statuses.length;
// //     const activeTasks = statuses.filter((task) => task.status === 1).length;
// //     const inactiveTasks = statuses.filter((task) => task.status === 0).length;

// //     const handleExportExcel = () => {
// //         const modifiedTasks = tasks.map((task) => ({
// //             subject: task.subject,
// //             description: task.description,
// //             dueDate: task.dueDate,
// //             status: task.status === 1 ? 'Active' : 'Inactive',
// //             project: task.project.projectName,
// //             createdBy: `${task.createdBy.firstname} ${task.createdBy.lastname}`,
// //             assignedTo: task.assignedTo.map(user => `${user.firstname} ${user.lastname}`).join(', '),
// //             priority: task.priority,
// //             milestone: task.milestone,
// //             tags: task.tags.join(', '),
// //         }));

// //         const worksheet = XLSX.utils.json_to_sheet(modifiedTasks);
// //         const workbook = XLSX.utils.book_new();
// //         XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
// //         XLSX.writeFile(workbook, 'tasks.xlsx');
// //     };

// //     const handleExportPDF = () => {
// //         const doc = new jsPDF();
// //         doc.autoTable({
// //             head: [['Subject', 'Description', 'Due Date', 'Status', 'Project', 'Created By', 'Assigned To', 'Priority', 'Milestone', 'Tags']],
// //             body: tasks.map((task) => [
// //                 task.subject,
// //                 task.description,
// //                 task.dueDate,
// //                 task.status === 1 ? 'Active' : 'Inactive',
// //                 task.project.projectName,
// //                 `${task.createdBy.firstname} ${task.createdBy.lastname}`,
// //                 task.assignedTo.map(user => `${user.firstname} ${user.lastname}`).join(', '),
// //                 task.priority,
// //                 task.milestone,
// //                 task.tags.join(', '),
// //             ])
// //         });
// //         doc.save('tasks.pdf');
// //     };

// //     const toggleDropdown = () => {
// //         setDropdownOpen(!dropdownOpen);
// //     };

// //     const exportOptions = [
// //         { label: 'Download as Excelsheet', command: handleExportExcel },
// //         { label: 'Download as pdf', command: handleExportPDF }
// //     ];

// //     return (
// //         <>
// //             <div className="btn-item">
// //                 <ul className="d-flex flex-column flex-md-row list-inline">
// //                     <li>
// //                         {userPermissions?.Tasks?.canCreate && (
// //                             <Button
// //                                 className="btn"
// //                                 onClick={() => {
// //                                     setEditingTask(null);
// //                                     setIsFormVisible(true);
// //                                 }}
// //                             >
// //                                 New Task
// //                             </Button>
// //                         )}
// //                     </li>
// //                     <li>
// //                         {userPermissions?.Tasks?.canDelete && (
// //                             <Button className="ms-2 me-2 mb-2 btn1" onClick={() => onDelete(tasks.map((task) => task._id))}>
// //                                 <i className="pi pi-trash"></i>
// //                                 Delete
// //                             </Button>
// //                         )}
// //                     </li>
// //                     <li>
// //                         {userPermissions?.Tasks?.canCreate && (
// //                             <Button className="ms-2 me-2 mb-2 btn1">
// //                                 <i className="pi pi-download"></i>
// //                                 Import
// //                             </Button>
// //                         )}
// //                     </li>
// //                     <li>
// //                         <div className="dropdown-container">
// //                             <div className="dropdown-btn user-export btn1" onClick={toggleDropdown}>
// //                                 <span className="iconssss">
// //                                     <CiExport />
// //                                 </span>
// //                                 <span> Export </span>
// //                             </div>
// //                             <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''} me-2 p-2`} style={{ position: 'absolute', margin: '12px -57px', fontSize: '12px' }}>
// //                                 {exportOptions.map((option, idx) => (
// //                                     <Button key={idx} style={{ all: 'unset', fontSize: '12px', fontWeight: '200' }} label={option.label} icon={option.icon} onClick={option.command} className="export-button fw-1" />
// //                                 ))}
// //                             </div>
// //                         </div>
// //                     </li>
// //                 </ul>
// //             </div>
// //             <DataTable value={tasks}>
// //                 <Column field="subject" header="Subject" />
// //                 <Column field="description" header="Description" />
// //                 <Column field="dueDate" header="Due Date" />
// //                 <Column header="Status" body={(rowData) => <InputSwitch checked={rowData.status === 1} onChange={(e) => handleStatusChange(rowData._id, e.value ? 1 : 0)} />} />
// //                 <Column field="project.projectName" header="Project" />
// //                 <Column field="createdBy.firstname" header="Created By First Name" />
// //                 <Column field="createdBy.lastname" header="Created By Last Name" />
// //                 <Column field="assignedTo" header="Assigned To" body={(rowData) => rowData.assignedTo.map(user => `${user.firstname} ${user.lastname}`).join(', ')} />
// //                 <Column field="priority" header="Priority" />
// //                 <Column field="milestone" header="Milestone" />
// //                 <Column field="tags" header="Tags" body={(rowData) => rowData.tags.join(', ')} />
// //                 <Column
// //                     body={(rowData) => (
// //                         <>
// //                             <Button label="Edit" onClick={() => onEdit(rowData._id)} />
// //                             <Button label="Delete" onClick={() => onDelete(rowData._id)} />
// //                         </>
// //                     )}
// //                 />
// //             </DataTable>
// //         </>
// //     );
// // };

// // export default TaskTable;
// // 'use client';
// // import React, { useState, useEffect, useContext } from 'react';
// // import { DataTable } from 'primereact/datatable';
// // import { Column } from 'primereact/column';
// // import { Button } from 'primereact/button';
// // import { InputSwitch } from 'primereact/inputswitch';
// // import axios from 'axios';
// // import Cookies from 'js-cookie';
// // import { API_BASE_URL } from '../../../utils';
// // import { CiExport } from 'react-icons/ci';
// // import jsPDF from 'jspdf';
// // import 'jspdf-autotable';
// // import * as XLSX from 'xlsx';
// // import userContext from '../../../UseContext/UseContext';

// // const TaskTable = ({ tasks, onEdit, onDelete,setIsFormVisible}) => {
// //     const { data } = useContext(userContext);
// //     const [statuses, setStatuses] = useState([]);
// //     const accessToken = Cookies.get('accessToken');
// //     const subdomain = Cookies.get('subdomain');
// //     const [userPermissions, setUserPermissions] = useState({});
// //     const [dropdownOpen, setDropdownOpen] = useState(false);
// //     console.log(userPermissions);
// //     useEffect(() => {
// //         if (data?.permissions) {
// //             setUserPermissions(data.permissions);
// //         }
// //     }, [data?.permissions]);

// //     useEffect(() => {
// //         setStatuses(tasks.map((task) => ({ _id: task._id, status: task.status })));
// //     }, [tasks]);

// //     const handleStatusChange = async (id, status) => {
// //         try {
// //             const headers = { Authorization: `Bearer ${accessToken}` };
// //             await axios.patch(`${API_BASE_URL}/task/${subdomain}/${id}`, { status }, { headers });
// //             setStatuses((prevStatuses) => prevStatuses.map((task) => (task._id === id ? { ...task, status } : task)));
// //         } catch (error) {
// //             console.error('Error updating status:', error);
// //         }
// //     };

// //     const totalTasks = statuses.length;
// //     const activeTasks = statuses.filter((task) => task.status === 1).length;
// //     const inactiveTasks = statuses.filter((task) => task.status === 0).length;

// //     const handleExportExcel = () => {
// //         const modifiedTasks = tasks.map((task) => ({
// //             subject: task.subject,
// //             description: task.description,
// //             dueDate: task.dueDate,
// //             status: task.status === 1 ? 'Active' : 'Inactive',
// //             project: task.project.projectName,
// //             createdBy: `${task.createdBy.firstname} ${task.createdBy.lastname}`,
// //             assignedTo: task.assignedTo.map((user) => `${user.firstname} ${user.lastname}`).join(', '),
// //             priority: task.priority,
// //             milestone: task.milestone,
// //             tags: task.tags.join(', ')
// //         }));

// //         const worksheet = XLSX.utils.json_to_sheet(modifiedTasks);
// //         const workbook = XLSX.utils.book_new();
// //         XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
// //         XLSX.writeFile(workbook, 'tasks.xlsx');
// //     };

// //     const handleExportPDF = () => {
// //         const doc = new jsPDF();
// //         doc.autoTable({
// //             head: [['Subject', 'Description', 'Due Date', 'Status', 'Project', 'Created By', 'Assigned To', 'Priority', 'Milestone', 'Tags']],
// //             body: tasks.map((task) => [
// //                 task.subject,
// //                 task.description,
// //                 task.dueDate,
// //                 task.status === 1 ? 'Active' : 'Inactive',
// //                 task.project.projectName,
// //                 `${task.createdBy.firstname} ${task.createdBy.lastname}`,
// //                 task.assignedTo.map((user) => `${user.firstname} ${user.lastname}`).join(', '),
// //                 task.priority,
// //                 task.milestone,
// //                 task.tags.join(', ')
// //             ])
// //         });
// //         doc.save('tasks.pdf');
// //     };

// //     const toggleDropdown = () => {
// //         setDropdownOpen(!dropdownOpen);
// //     };

// //     const exportOptions = [
// //         { label: 'Download as Excelsheet', command: handleExportExcel },
// //         { label: 'Download as pdf', command: handleExportPDF }
// //     ];

// //     return (
// //         <>
// //             <div className="btn-item" >
// //                 <ul className="d-flex flex-column flex-md-row list-inline" style={{justifyContent:"end"}}>
// //                     <li>
// //                         {userPermissions?.Task?.canCreate && (
// //                             <Button
// //                                 className="btn1"
// //                                 onClick={() => {
// //                                     // setEditingTask(null);
// //                                     setIsFormVisible(true);
// //                                 }}
// //                             >
// //                                 New Task
// //                             </Button>
// //                         )}
// //                     </li>
// //                     <li>
// //                         {userPermissions?.Task?.canDelete && (
// //                             <Button className="ms-2 me-2 mb-2 btn1" onClick={() => onDelete(tasks.map((task) => task._id))}>
// //                                 <i className="pi pi-trash"></i>
// //                                 Delete
// //                             </Button>
// //                         )}
// //                     </li>
// //                     <li>
// //                         {userPermissions?.Task?.canCreate && (
// //                             <Button className="ms-2 me-2 mb-2 btn1">
// //                                 <i className="pi pi-download"></i>
// //                                 Import
// //                             </Button>
// //                         )}
// //                     </li>
// //                     <li>
// //                         <div className="dropdown-container">
// //                             <div className="dropdown-btn user-export btn1" onClick={toggleDropdown}>
// //                                 <span className="iconssss">
// //                                     <CiExport />
// //                                 </span>
// //                                 <span> Export </span>
// //                             </div>
// //                             <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''} me-2 p-2`} style={{ position: 'absolute', margin: '12px -57px', fontSize: '12px' }}>
// //                                 {exportOptions.map((option, idx) => (
// //                                     <Button key={idx} style={{ all: 'unset', fontSize: '12px', fontWeight: '200' }} label={option.label} icon={option.icon} onClick={option.command} className="export-button fw-1" />
// //                                 ))}
// //                             </div>
// //                         </div>
// //                     </li>
// //                 </ul>
// //             </div>
// //             <DataTable value={tasks}>
// //                 <Column field="subject" header="Subject" />
// //                 <Column field="description" header="Description" />
// //                 <Column field="dueDate" header="Due Date"   body={(rowData)=> new Date( rowData.dueDate).toLocaleDateString} />
// //                 <Column header="Status" body={(rowData) => <InputSwitch checked={rowData.status === 1} onChange={(e) => handleStatusChange(rowData._id, e.value ? 1 : 0)} />} />
// //                 <Column field="project.projectName" header="Project" />
// //                 <Column field="createdBy.firstname" header="Created By First Name" />
// //                 <Column field="createdBy.lastname" header="Created By Last Name" />
// //                 <Column field="assignedTo" header="Assigned To" body={(rowData) => rowData.assignedTo.map((user) => `${user.firstname} ${user.lastname}`).join(', ')} />
// //                 <Column field="priority" header="Priority" />
// //                 <Column field="milestone" header="Milestone" />
// //                 <Column field="tags" header="Tags" body={(rowData) => rowData.tags.join(', ')} />
// //                 <Column
// //                     body={(rowData) => (
// //                         <>
// //                             {userPermissions?.Task?.canUpdate && <Button label="Edit" onClick={() => onEdit(rowData._id)} />}
// //                             {userPermissions?.Task?.canDelete && <Button label="Delete" onClick={() => onDelete(rowData._id)} />}
// //                         </>
// //                     )}
// //                 />
// //             </DataTable>
// //         </>
// //     );
// // };

// // export default TaskTable;
// 'use client';
// import React, { useState, useEffect, useContext } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import { InputSwitch } from 'primereact/inputswitch';
// import { Checkbox } from 'primereact/checkbox';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { API_BASE_URL } from '../../../utils';
// import { CiExport } from 'react-icons/ci';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import * as XLSX from 'xlsx';
// import userContext from '../../../UseContext/UseContext';

// const TaskTable = ({ tasks, onEdit, onDelete, setIsFormVisible }) => {
//     const { data } = useContext(userContext);
//     const [statuses, setStatuses] = useState([]);
//     const [selectedTasks, setSelectedTasks] = useState([]);
//     const accessToken = Cookies.get('accessToken');
//     const subdomain = Cookies.get('subdomain');
//     const [userPermissions, setUserPermissions] = useState({});
//     const [dropdownOpen, setDropdownOpen] = useState(false);

//     useEffect(() => {
//         if (data?.permissions) {
//             setUserPermissions(data.permissions);
//         }
//     }, [data?.permissions]);

//     useEffect(() => {
//         setStatuses(tasks.map((task) => ({ _id: task._id, status: task.status })));
//     }, [tasks]);

//     const handleStatusChange = async (id, status) => {
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             await axios.patch(`${API_BASE_URL}/task/${subdomain}/${id}`, { status }, { headers });
//             setStatuses((prevStatuses) => prevStatuses.map((task) => (task._id === id ? { ...task, status } : task)));
//         } catch (error) {
//             console.error('Error updating status:', error);
//         }
//     };

//     const totalTasks = statuses.length;
//     const activeTasks = statuses.filter((task) => task.status === 1).length;
//     const inactiveTasks = statuses.filter((task) => task.status === 0).length;

//     const handleExportExcel = () => {
//         const modifiedTasks = tasks.map((task) => ({
//             subject: task.subject,
//             description: task.description,
//             dueDate: task.dueDate,
//             status: task.status === 1 ? 'Active' : 'Inactive',
//             project: task.project.projectName,
//             createdBy: `${task.createdBy.firstname} ${task.createdBy.lastname}`,
//             assignedTo: task.assignedTo.map((user) => `${user.firstname} ${user.lastname}`).join(', '),
//             priority: task.priority,
//             milestone: task.milestone,
//             tags: task.tags.join(', ')
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(modifiedTasks);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
//         XLSX.writeFile(workbook, 'tasks.xlsx');
//     };

//     const handleExportPDF = () => {
//         const doc = new jsPDF();
//         doc.autoTable({
//             head: [['Subject', 'Description', 'Due Date', 'Status', 'Project', 'Created By', 'Assigned To', 'Priority', 'Milestone', 'Tags']],
//             body: tasks.map((task) => [
//                 task.subject,
//                 task.description,
//                 task.dueDate,
//                 task.status === 1 ? 'Active' : 'Inactive',
//                 task.project.projectName,
//                 `${task.createdBy.firstname} ${task.createdBy.lastname}`,
//                 task.assignedTo.map((user) => `${user.firstname} ${user.lastname}`).join(', '),
//                 task.priority,
//                 task.milestone,
//                 task.tags.join(', ')
//             ])
//         });
//         doc.save('tasks.pdf');
//     };

//     const toggleDropdown = () => {
//         setDropdownOpen(!dropdownOpen);
//     };

//     const exportOptions = [
//         { label: 'Download as Excelsheet', command: handleExportExcel },
//         { label: 'Download as pdf', command: handleExportPDF }
//     ];

//     const handleCheckboxChange = (e, taskId) => {
//         const selected = e.checked;
//         console.log(`Checkbox for task ${taskId} is ${selected ? 'checked' : 'unchecked'}`);
//         setSelectedTasks((prevSelectedTasks) => {
//             if (selected) {
//                 return [...prevSelectedTasks, taskId];
//             } else {
//                 return prevSelectedTasks.filter((id) => id !== taskId);
//             }
//         });
//         console.log('Selected Tasks:', selectedTasks);
//     };

//     return (
//         <>
//             <div className="btn-item">
//                 <ul className="d-flex flex-column flex-md-row list-inline" style={{ justifyContent: "end" }}>
//                     <li>
//                         {userPermissions?.Task?.canCreate && (
//                             <Button
//                                 className="btn1"
//                                 onClick={() => {
//                                     setIsFormVisible(true);
//                                 }}
//                             >
//                                 New Task
//                             </Button>
//                         )}
//                     </li>
//                     <li>
//                         {userPermissions?.Task?.canDelete && (
//                             <Button className="ms-2 me-2 mb-2 btn1" onClick={() => onDelete(selectedTasks)}>
//                                 <i className="pi pi-trash"></i>
//                                 Delete
//                             </Button>
//                         )}
//                     </li>
//                     <li>
//                         {userPermissions?.Task?.canCreate && (
//                             <Button className="ms-2 me-2 mb-2 btn1">
//                                 <i className="pi pi-download"></i>
//                                 Import
//                             </Button>
//                         )}
//                     </li>
//                     <li>
//                         <div className="dropdown-container">
//                             <div className="dropdown-btn user-export btn1" onClick={toggleDropdown}>
//                                 <span className="iconssss">
//                                     <CiExport />
//                                 </span>
//                                 <span> Export </span>
//                             </div>
//                             <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''} me-2 p-2`} style={{ position: 'absolute', margin: '12px -57px', fontSize: '12px' }}>
//                                 {exportOptions.map((option, idx) => (
//                                     <Button key={idx} style={{ all: 'unset', fontSize: '12px', fontWeight: '200' }} label={option.label} icon={option.icon} onClick={option.command} className="export-button fw-1" />
//                                 ))}
//                             </div>
//                         </div>
//                     </li>
//                 </ul>
//             </div>
//             <DataTable value={tasks}>
//                 <Column
//                     selectionMode="multiple"
//                     headerStyle={{ width: '3rem' }}
//                     body={(rowData) => (
//                         <Checkbox
//                             onChange={(e) => handleCheckboxChange(e, rowData._id)}
//                             checked={selectedTasks.includes(rowData._id)}
//                         />
//                     )}
//                 />
//                 <Column field="subject" header="Subject" />
//                 <Column field="description" header="Description" />
//                 <Column field="dueDate" header="Due Date" body={(rowData) => new Date(rowData.dueDate).toLocaleDateString()} />
//                 <Column header="Status" body={(rowData) => <InputSwitch checked={rowData.status === 1} onChange={(e) => handleStatusChange(rowData._id, e.value ? 1 : 0)} />} />
//                 <Column field="project.projectName" header="Project" />
//                 <Column field="createdBy.firstname" header="Created By First Name" />
//                 <Column field="createdBy.lastname" header="Created By Last Name" />
//                 <Column field="assignedTo" header="Assigned To" body={(rowData) => rowData.assignedTo.map((user) => `${user.firstname} ${user.lastname}`).join(', ')} />
//                 <Column field="priority" header="Priority" />
//                 <Column field="milestone" header="Milestone" />
//                 <Column field="tags" header="Tags" body={(rowData) => rowData.tags.join(', ')} />
//                 <Column
//                     body={(rowData) => (
//                         <>
//                             {userPermissions?.Task?.canUpdate && <Button label="Edit" onClick={() => onEdit(rowData._id)} />}
//                             {userPermissions?.Task?.canDelete && <Button label="Delete" onClick={() => onDelete(rowData._id)} />}
//                         </>
//                     )}
//                 />
//             </DataTable>
//         </>
//     );
// };

// export default TaskTable;
'use client';
import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../utils';
import { CiExport } from 'react-icons/ci';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import userContext from '../../../UseContext/UseContext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';

const stylesofborderleft = {
    borderTopLeftRadius: '12px',
    borderBottomLeftRadius: '12px',
    backgroundColor: ' rgba(10, 45, 90, 0.966)',
    color: 'white'
};
const stylesofborderright = {
    borderTopRightRadius: '12px',
    borderBottomRightRadius: '12px',
    backgroundColor: ' rgba(10, 45, 90, 0.966)',
    color: 'white'
};
const Headerstyles = {
    // borderTopRightRadius: "12px",
    // borderBottomRightRadius: "12px",
    backgroundColor: ' rgba(10, 45, 90, 0.966)',
    color: 'white'
};

const TaskTable = ({ tasks, onEdit, onDelete, setIsFormVisible }) => {
    const { data } = useContext(userContext);
    const [statuses, setStatuses] = useState([]);
    const [selectedTasks, setSelectedTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const accessToken = Cookies.get('crmaccess');
    const subdomain = Cookies.get('subdomain');
    const [userPermissions, setUserPermissions] = useState({});
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (data?.permissions) {
            setUserPermissions(data.permissions);
        }
    }, [data?.permissions]);

    useEffect(() => {
        setStatuses(tasks.map((task) => ({ _id: task._id, status: task.status })));
    }, [tasks]);

    const handleStatusChange = async (id, status) => {
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            await axios.patch(`${API_BASE_URL}/task/${subdomain}/${id}`, { status }, { headers });
            setStatuses((prevStatuses) => prevStatuses.map((task) => (task._id === id ? { ...task, status } : task)));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const totalTasks = statuses.length;
    const activeTasks = statuses.filter((task) => task.status === 1).length;
    const inactiveTasks = statuses.filter((task) => task.status === 0).length;

    const handleExportExcel = () => {
        const modifiedTasks = tasks.map((task) => ({
            subject: task.subject,
            description: task.description,
            dueDate: task.dueDate,
            status: task.status === 1 ? 'Active' : 'Inactive',
            project: task.project.projectName,
            createdBy: `${task.createdBy.firstname} ${task.createdBy.lastname}`,
            assignedTo: task.assignedTo.map((user) => `${user.firstname} ${user.lastname}`).join(', '),
            priority: task.priority,
            milestone: task.milestone,
            tags: task.tags.join(', ')
        }));

        const worksheet = XLSX.utils.json_to_sheet(modifiedTasks);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Tasks');
        XLSX.writeFile(workbook, 'tasks.xlsx');
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Subject', 'Description', 'Due Date', 'Status', 'Project', 'Created By', 'Assigned To', 'Priority', 'Milestone', 'Tags']],
            body: tasks.map((task) => [
                task.subject,
                task.description,
                task.dueDate,
                task.status === 1 ? 'Active' : 'Inactive',
                task.project.projectName,
                `${task.createdBy.firstname} ${task.createdBy.lastname}`,
                task.assignedTo.map((user) => `${user.firstname} ${user.lastname}`).join(', '),
                task.priority,
                task.milestone,
                task.tags.join(', ')
            ])
        });
        doc.save('tasks.pdf');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const exportOptions = [
        { label: 'Download as Excelsheet', command: handleExportExcel },
        { label: 'Download as pdf', command: handleExportPDF }
    ];

    const handleCheckboxChange = (e, taskId) => {
        const selected = e.checked;
        console.log(`Checkbox for task ${taskId} is ${selected ? 'checked' : 'unchecked'}`);
        setSelectedTasks((prevSelectedTasks) => {
            if (selected) {
                return [...prevSelectedTasks, taskId];
            } else {
                return prevSelectedTasks.filter((id) => id !== taskId);
            }
        });
        console.log('Selected Tasks:', selectedTasks);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredTasks = tasks.filter(
        (task) =>
            task.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.createdBy.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.createdBy.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.assignedTo.some((user) => user.firstname.toLowerCase().includes(searchTerm.toLowerCase()) || user.lastname.toLowerCase().includes(searchTerm.toLowerCase())) ||
            task.priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.milestone.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <>
            <div className="btn-item d-flex propose-search">
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search"> </InputIcon>
                    <InputText type="search" onInput={handleSearch} placeholder="Search..." />
                </IconField>
                {/* <div className="p-input-icon-left">
                    <i className="pi pi-search mb-4" />
                    
                </div> */}
                <ul className="d-flex flex-column flex-md-row list-inline ms-auto" style={{ justifyContent: 'end' }}>
                    <li>
                        {userPermissions?.Task?.canCreate && (
                            <Button
                                className="btn1"
                                onClick={() => {
                                    setIsFormVisible(true);
                                }}
                            >
                                New Task
                            </Button>
                        )}
                    </li>
                    <li>
                        {userPermissions?.Task?.canDelete && (
                            <Button className="ms-2 me-2 mb-2 btn1" onClick={() => onDelete(selectedTasks)}>
                                <i className="pi pi-trash"></i>
                                Delete
                            </Button>
                        )}
                    </li>
                    <li>
                        {userPermissions?.Task?.canCreate && (
                            <Button className="ms-2 me-2 mb-2 btn1">
                                <i className="pi pi-download"></i>
                                Import
                            </Button>
                        )}
                    </li>
                    <li>
                        <div className="dropdown-container propos-exp">
                            <div className="dropdown-btn user-export btn1" onClick={toggleDropdown}>
                                <span className="iconssss">
                                    <CiExport />
                                </span>
                                <span> Export </span>
                            </div>
                            <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''} me-2 p-2`} style={{ position: 'absolute', margin: '12px -57px', fontSize: '12px' }}>
                                {exportOptions.map((option, idx) => (
                                    <Button key={idx} style={{ all: 'unset', fontSize: '12px', fontWeight: '200' }} label={option.label} icon={option.icon} onClick={option.command} className="export-button fw-1" />
                                ))}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <DataTable value={filteredTasks}>
                <Column selectionMode="multiple" headerStyle={stylesofborderleft} body={(rowData) => <Checkbox onChange={(e) => handleCheckboxChange(e, rowData._id)} checked={selectedTasks.includes(rowData._id)} />} />
                <Column field="subject" header="Subject" headerStyle={Headerstyles} />
                <Column field="description" header="Description" headerStyle={Headerstyles} />
                <Column field="dueDate" header="Due Date" body={(rowData) => new Date(rowData.dueDate).toLocaleDateString()} headerStyle={Headerstyles} />
                <Column header="Status" body={(rowData) => <InputSwitch checked={rowData.status === 1} onChange={(e) => handleStatusChange(rowData._id, e.value ? 1 : 0)} />} headerStyle={Headerstyles} />
                <Column field="project.projectName" header="Project" headerStyle={Headerstyles} />
                {/* <Column field="createdBy.firstname" header="First Name" headerStyle={`${Headerstyles} width:"80px"` } /> */}
                <Column field="createdBy.firstname" header="First Name" headerStyle={{ ...Headerstyles, width: '110px' }} />

                <Column field="createdBy.lastname" header=" Last Name" headerStyle={{ ...Headerstyles, width: '110px' }} />
                <Column field="assignedTo" header="Assigned To" body={(rowData) => rowData.assignedTo.map((user) => `${user.firstname} ${user.lastname}`).join(', ')} headerStyle={{ ...Headerstyles, width: '130px' }} />
                <Column field="priority" header="Priority" headerStyle={Headerstyles} />
                <Column field="milestone" header="Milestone" headerStyle={Headerstyles} />
                <Column field="tags" header="Tags" body={(rowData) => rowData.tags.join(', ')} headerStyle={Headerstyles} />
                <Column
                    headerStyle={stylesofborderright}
                    body={(rowData) => (
                        <>
                            {/* {userPermissions?.Task?.canUpdate && <Button label="Edit" onClick={() => onEdit(rowData._id)} />}
                            {userPermissions?.Task?.canDelete && <Button label="Delete" onClick={() => onDelete(rowData._id)} />} */}
                            <i className="align-self-center pi pi-pencil ml-2" onClick={() => handleActionClick('followUp', rowData)}></i>
                            <i className="align-self-center pi pi-trash" onClick={() => onDelete(rowData.LeadId)}></i>
                        </>
                    )}
                />
            </DataTable>
        </>
    );
};

export default TaskTable;
