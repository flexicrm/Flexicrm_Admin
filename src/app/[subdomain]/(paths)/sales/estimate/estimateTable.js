// "use client";
// import React, { useState, useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import { InputSwitch } from 'primereact/inputswitch';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import Link from 'next/link';
// // import { API_BASE_URL } from '@/app/utils';
// import '../../../../styles/newcustracts.scss'
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import * as XLSX from 'xlsx';
// import { CiExport } from "react-icons/ci";

// const stylesofborderleft = {
//     borderTopLeftRadius: "12px",
//     borderBottomLeftRadius: "12px",
//     backgroundColor: " rgba(10, 45, 90, 0.966)",
//     color: "white",
// };
// const stylesofborderright = {
//     borderTopRightRadius: "12px",
//     borderBottomRightRadius: "12px",
//     backgroundColor: " rgba(10, 45, 90, 0.966)",
//     color: "white",
// };
// const Headerstyles = {
//     // borderTopRightRadius: "12px",
//     // borderBottomRightRadius: "12px",
//     backgroundColor: " rgba(10, 45, 90, 0.966)",
//     color: "white",
// };


// const EstimateTable = ({ estimates, onEdit, onDelete, handleStatusChange ,setIsFormVisible}) => {
//     // console.log(estimates,"estimates")
//     const [statuses, setStatuses] = useState([]);
//     const accessToken = Cookies.get("accessToken");
//     const subdomain = Cookies.get("subdomain");
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     useEffect(() => {
//         setStatuses(estimates.map(estimates => ({ estimationNo: estimates.estimationNo, status: estimates.status })));
//     }, [estimates]);



//     const totalExpenses = statuses.length;
//     const activeExpenses = statuses.filter(expense => expense.status === 1).length;
//     const inactiveExpenses = statuses.filter(expense => expense.status === 0).length;
//     const formatDate = (date) => {
//         return new Date(date).toLocaleDateString(); // Example date formatting
//     };
//     const handleExportExcel = () => {
//         const modifiedEstimates = estimates.map((estimate) => ({
//             EstimationNo: estimate.estimationNo,
//             Company: estimate.customer?.Companyname || '',
//             Project: estimate.project?.projectName || '',
//             Email: estimate.createdBy?.email || '',
//             FirstName: estimate.createdBy?.firstname || '',
//             EstimateStatus: estimate.estimateStatus,
//             Total: estimate.total,
//             Currency: estimate.currency,
//             Status: estimate.status === 1 ? 'Active' : 'Inactive',
//             EstimateDate: formatDate(estimate.estimateDate),
//             ExpireDate: formatDate(estimate.expireDate)
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(modifiedEstimates);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Estimates');
//         XLSX.writeFile(workbook, 'estimates.xlsx');
//     };

//     const handleExportPDF = () => {
//         const doc = new jsPDF();
//         doc.autoTable({
//             head: [['Estimation No', 'Company', 'Project', 'Email', 'First Name', 'Estimate Status', 'Total', 'Currency', 'Status', 'Estimate Date', 'Expire Date']],
//             body: estimates.map((estimate) => [
//                 estimate.estimationNo,
//                 estimate.customer?.Companyname || '',
//                 estimate.project?.projectName || '',
//                 estimate.createdBy?.email || '',
//                 estimate.createdBy?.firstname || '',
//                 estimate.estimateStatus,
//                 estimate.total,
//                 estimate.currency,
//                 estimate.status === 1 ? 'Active' : 'Inactive',
//                 formatDate(estimate.estimateDate),
//                 formatDate(estimate.expireDate)
//             ])
//         });
//         doc.save('estimates.pdf');
//     };

//     const exportOptions = [
//         { label: 'Download as Excel', command: handleExportExcel },
//         { label: 'Download as PDF', command: handleExportPDF }
//     ];

//     const toggleDropdown = () => {
//         setDropdownOpen(!dropdownOpen);
//     };
//     return (
//         <div>

//             <div className="">
//                 <div className="d-flex justify-content-between mt-3">
//                     <div className="d-flex flex-column flex-md-row btn-item p-jc-between p-ai-center">
//                         {/* <Button label="Select Date" className="m-2" onClick={handleExportExcel} />
//           <Button label="Filters" className="m-2" onClick={handleExportExcel} /> */}
//                         <div className="mb-2">
//                             {/* <Dropdown >
//                 <Dropdown.Toggle className="btn1" variant="success" id="dropdown-basic">
//                   Select Date
//                 </Dropdown.Toggle>

//                 <Dropdown.Menu>
//                   <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//                   <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//                   <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown> */}
//                         </div>
//                         <div className="mb-2 ">
//                             {/* <Dropdown >
//                 <Dropdown.Toggle className="btn1" variant="success" id="dropdown-basic">
//                   Filters
//                 </Dropdown.Toggle>

//                 <Dropdown.Menu>
//                   <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//                   <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//                   <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown> */}
//                         </div>
//                     </div>

//                     <div className="btn-item">
//                         <ul className="d-flex flex-column flex-md-row list-inline">
//                             <li>
//                                 {" "}
//                                 <Button className='btn' onClick={() => setIsFormVisible(true)}>New Estimate</Button>
//                             </li>
//                             <li>
//                                 <Button className="ms-2 me-2 mb-2 btn1">
//                                     <i className="pi pi-trash"></i>
//                                     Delete</Button>
//                             </li>
//                             <li >
//                                 <Button className="ms-2 me-2 mb-2 btn1">
//                                     <i className="pi pi-download"></i>

//                                     Importaaaa</Button>
//                             </li>
//                             <li >
//                             <div className="dropdown-container">
//                                     <div className="dropdown-btn user-export btn1" onClick={toggleDropdown}>
//                                         <span className="iconssss">
//                                             <CiExport />
//                                         </span>
//                                         <span> Export </span>
//                                     </div>
//                                     <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''} me-2 p-2`} style={{ position: 'absolute', margin: '12px -57px', fontSize: '12px' }}>
//                                         {exportOptions.map((option, idx) => (
//                                             <Button key={idx} style={{ all: 'unset', fontSize: '12px', fontWeight: '200' }} label={option.label} icon={option.icon} onClick={option.command} className="export-button fw-1" />
//                                         ))}
//                                     </div>
//                                 </div>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>


//             <DataTable value={estimates} className='customer-tbl'>
//                 <Column field="estimationNo" header="estimationNo" headerStyle={stylesofborderleft} />
//                 <Column field="customer.Companyname" header="Company" headerStyle={Headerstyles} />
//                 <Column field="project.projectName" header="project" headerStyle={Headerstyles} />
//                 <Column field="createdBy.email" header="Email" headerStyle={Headerstyles} />
//                 <Column field="createdBy.firstname" header="First Name" headerStyle={Headerstyles} />
//                 <Column field="estimateStatus" header="estimateStatus" headerStyle={Headerstyles} />
//                 <Column field="total" header="total" headerStyle={Headerstyles} />
//                 <Column field="currency" header="currency" headerStyle={Headerstyles} />
//                 <Column headerStyle={Headerstyles}
//                     header="Status"
//                     body={rowData => (
//                         <InputSwitch
//                             checked={rowData.status === 1}
//                             onChange={e => handleStatusChange(rowData.estimationNo, e.value ? 1 : 0)}
//                         />
//                     )}
//                 />
//                 <Column field="estimateDate" header="estimateDate" body={(rowData) => formatDate(rowData.estimateDate)} headerStyle={Headerstyles} />
//                 <Column field="expireDate" header="expireDate" body={(rowData) => formatDate(rowData.expireDate
//                 )} headerStyle={Headerstyles} />
//                 <Column
//                 headerStyle={stylesofborderright}
//                     body={rowData => (
//                         <>
//                             {/* <Button label="Edit" onClick={() => onEdit(rowData.estimationNo)} />
//                             <Button label="Delete" onClick={() => onDelete(rowData.estimationNo)} /> */}
//                             <div className="d-flex justify-content-evenly icon-iteam">
//                                 {/* <i className="align-self-center pi pi-eye"></i> */}
//                                 <i className="align-self-center pi pi-pencil" onClick={() => onEdit(rowData.contractId)} ></i>
//                                 <i className="align-self-center pi pi-trash" onClick={() => onDelete(rowData.contractId)} ></i>
//                             </div>
//                         </>
//                     )}
//                 />
//             </DataTable>
//         </div>
//     );
// };

// export default EstimateTable;













"use client";
import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import axios from 'axios';
import Cookies from 'js-cookie';
import Link from 'next/link';
import '../../../../styles/newcustracts.scss';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { CiExport } from "react-icons/ci";
import userContext from "../../../../UseContext/UseContext"
import { InputText } from 'primereact/inputtext';
const stylesofborderleft = {
    borderTopLeftRadius: "12px",
    borderBottomLeftRadius: "12px",
    backgroundColor: " rgba(10, 45, 90, 0.966)",
    color: "white",
};
const stylesofborderright = {
    borderTopRightRadius: "12px",
    borderBottomRightRadius: "12px",
    backgroundColor: " rgba(10, 45, 90, 0.966)",
    color: "white",
};
const Headerstyles = {
    backgroundColor: " rgba(10, 45, 90, 0.966)",
    color: "white",
};

const EstimateTable = ({ estimates, onEdit, onDelete, handleStatusChange, setIsFormVisible }) => {
    const [statuses, setStatuses] = useState([]);
    const [selectedEstimates, setSelectedEstimates] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const accessToken = Cookies.get("crmaccess");
    const subdomain = Cookies.get("subdomain");
    const { data } = useContext(userContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [userPermissions, setUserPermissions] = useState({});
    console.log(userPermissions, 'userssssss');
    
    useEffect(() => {
        // Set permissions only when user data changes
        if (data?.permissions) {
            setUserPermissions(data.permissions);
        }
    }, [data?.permissions]);
    useEffect(() => {
        setStatuses(estimates.map(estimate => ({ estimationNo: estimate.estimationNo, status: estimate.status })));
    }, [estimates]);

    const totalExpenses = statuses.length;
    const activeExpenses = statuses.filter(expense => expense.status === 1).length;
    const inactiveExpenses = statuses.filter(expense => expense.status === 0).length;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString(); // Example date formatting
    };

    const handleExportExcel = () => {
        const modifiedEstimates = selectedEstimates.map((estimate) => ({
            EstimationNo: estimate.estimationNo,
            Company: estimate.customer?.Companyname || '',
            Project: estimate.project?.projectName || '',
            Email: estimate.createdBy?.email || '',
            FirstName: estimate.createdBy?.firstname || '',
            EstimateStatus: estimate.estimateStatus,
            Total: estimate.total,
            Currency: estimate.currency,
            Status: estimate.status === 1 ? 'Active' : 'Inactive',
            EstimateDate: formatDate(estimate.estimateDate),
            ExpireDate: formatDate(estimate.expireDate)
        }));

        const worksheet = XLSX.utils.json_to_sheet(modifiedEstimates);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Estimates');
        XLSX.writeFile(workbook, 'estimates.xlsx');
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Estimation No', 'Company', 'Project', 'Email', 'First Name', 'Estimate Status', 'Total', 'Currency', 'Status', 'Estimate Date', 'Expire Date']],
            body: selectedEstimates.map((estimate) => [
                estimate.estimationNo,
                estimate.customer?.Companyname || '',
                estimate.project?.projectName || '',
                estimate.createdBy?.email || '',
                estimate.createdBy?.firstname || '',
                estimate.estimateStatus,
                estimate.total,
                estimate.currency,
                estimate.status === 1 ? 'Active' : 'Inactive',
                formatDate(estimate.estimateDate),
                formatDate(estimate.expireDate)
            ])
        });
        doc.save('estimates.pdf');
    };

    const exportOptions = [
        { label: 'Download as Excel', command: handleExportExcel },
        { label: 'Download as PDF', command: handleExportPDF }
    ];

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };
    const filteredEstimates = estimates.filter((estimate) => {
        const projectName = estimate.project?.projectName?.toLowerCase() || '';
        const companyName = estimate.customer?.Companyname?.toLowerCase() || '';
        return (
            projectName.includes(searchTerm.toLowerCase()) ||
            companyName.includes(searchTerm.toLowerCase())
        );
    });

    // console.log(filteredProposals,"datads")
    return (
        <div>
            <div className="">
               
                  <div className="">
                <div className="d-flex justify-content-between mt-3">
                    <div className="d-flex flex-column flex-md-row btn-item p-jc-between p-ai-center">
                        <div className="mb-2 propose-search">
                            <span className="p-input-icon-left">
                                <i className="pi pi-search ms-2 " />
                                <InputText
                                    type="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search....."
                                    // className="m-2"
                                    style={{ textIndent: '2rem' }}
                                />
                            </span>
                        </div>
                        <div className="mb-2">{/* Placeholder for future dropdowns */}</div>
                    </div>

                    <div className="btn-item">
                        <ul className="d-flex flex-column flex-md-row list-inline">
                            <li>
                                {userPermissions?.Estimates?.canCreate && (
                                    <Button className="btn" onClick={() => setIsFormVisible(true)}>
                                        New Estimate
                                    </Button>
                                )}
                            </li>
                            <li>
                                {userPermissions?.Estimates?.canDelete && (
                                    <Button className="ms-2 me-2 mb-2 btn1" onClick={() => onDelete(selectedEstimates.map((estimate) => estimate.estimationNo))}>
                                        <i className="pi pi-trash"></i>
                                        Delete
                                    </Button>
                                )}
                            </li>
                            <li>
                                <Button className="ms-2 me-2 mb-2 btn1">
                                    <i className="pi pi-download"></i>
                                    Import
                                </Button>
                            </li>
                            <li>
                                <div className="dropdown-container propos-exp">
                                    <div className="dropdown-btn user-export btn1 " onClick={toggleDropdown}>
                                        <span className="iconssss">
                                            <CiExport />
                                        </span>
                                        <span> Export </span>
                                    </div>
                                    <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''} me-2 p-3`} style={{ position: 'absolute', margin: '12px -57px', fontSize: '12px' }}>
                                        {exportOptions.map((option, idx) => (
                                            <Button key={idx} style={{ all: 'unset', fontSize: '12px', fontWeight: '200' }} label={option.label} icon={option.icon} onClick={option.command} className="export-button fw-1" />
                                        ))}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            </div>
            {userPermissions?.Estimates?.canRead && (
            <div className="estimate-tbl" style={{overflowX:"auto"}}>
            <DataTable value={filteredEstimates} selection={selectedEstimates} onSelectionChange={(e) => setSelectedEstimates(e.value)} className='customer-tbl' tableStyle={{ minWidth: '10rem' }}>
                <Column selectionMode="multiple" headerStyle={stylesofborderleft} />
                <Column field="estimationNo" header="Estimation No" headerStyle={Headerstyles} />
                <Column field="customer.Companyname" header="Company" headerStyle={Headerstyles} />
                <Column field="project.projectName" header="Project" headerStyle={Headerstyles} />
                <Column field="createdBy.email" header="Email" headerStyle={Headerstyles} />
                <Column field="createdBy.firstname" header="First Name" headerStyle={Headerstyles} />
                <Column field="estimateStatus" header="Estimate Status" headerStyle={Headerstyles} />
                <Column field="total" header="Total" headerStyle={Headerstyles} />
                <Column field="currency" header="Currency" headerStyle={Headerstyles} />
                <Column headerStyle={Headerstyles}
                    header="Status"
                    body={rowData => (
                        <InputSwitch
                            checked={rowData.status === 1}
                            onChange={e => handleStatusChange(rowData.estimationNo, e.value ? 1 : 0)}
                        />
                    )}
                />
                <Column field="estimateDate" header="Estimate Date" body={(rowData) => formatDate(rowData.estimateDate)} headerStyle={Headerstyles} />
                <Column field="expireDate" header="Expire Date" body={(rowData) => formatDate(rowData.expireDate)} headerStyle={Headerstyles} />
                <Column
                    headerStyle={stylesofborderright}
                    body={rowData => (
                        <div className="d-flex justify-content-evenly icon-iteam">
                        {console.log(rowData, 'RowDate')}
                        {userPermissions?.Estimates?.canUpdate && <Button className="align-self-center " icon="pi pi-pencil" style={{ all: 'unset' }} onClick={() => onEdit(rowData.estimationNo)} />}
                        {userPermissions?.Estimates?.canDelete && <Button className="align-self-center  ms-2" icon=" pi pi-trash" style={{ all: 'unset' }} onClick={() => onDelete(rowData.estimationNo)} />}{' '}
                        </div>
                    )}
                />
            </DataTable>
            </div>
            )}
        </div>
    );
};

export default EstimateTable;


