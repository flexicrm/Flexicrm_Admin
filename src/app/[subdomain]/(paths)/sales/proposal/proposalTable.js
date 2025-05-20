// import React, { useContext, useState } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import { InputSwitch } from 'primereact/inputswitch';
// import userContext from '../../../../UseContext/UseContext';
// import Link from 'next/link';
// // import userContext from '@/app/UseContext/UseContext';/
// import '../../../../styles/newcustracts.scss';
// import "../../../../styles/popup.scss"
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import * as XLSX from 'xlsx';
// import { CiExport } from "react-icons/ci";
// const stylesofborderleft = {
//     borderTopLeftRadius: '12px',
//     borderBottomLeftRadius: '12px',
//     backgroundColor: ' rgba(10, 45, 90, 0.966)',
//     color: 'white'
// };
// const stylesofborderright = {
//     borderTopRightRadius: '12px',
//     borderBottomRightRadius: '12px',
//     backgroundColor: ' rgba(10, 45, 90, 0.966)',
//     color: 'white'
// };
// const Headerstyles = {
//     // borderTopRightRadius: "12px",
//     // borderBottomRightRadius: "12px",
//     backgroundColor: ' rgba(10, 45, 90, 0.966)',
//     color: 'white'
// };

// const ProposalTable = ({ proposals, onEdit, onDelete, handleStatusChange, setEditingProposal, setIsFormVisible }) => {
//     // console.log(proposals, "invoices")
//     const { items } = useContext(userContext);
//     // console.log(items,"setSingledatasetSingledata")
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const formatDate = (rowData) => {
//         return new Date(rowData).toLocaleDateString();
//     };
//     const handleExportExcel = () => {
//       const modifiedInvoices = invoices.map((invoice) => ({
//           invoiceNumber: invoice.invoiceNumber,
//           issuedDate: formatDate(invoice.issuedDate),
//           total: invoice.total,
//           paymentMethod: invoice.paymentMethod,
//           paymentStatus: invoice.paymentStatus
//       }));

//       const worksheet = XLSX.utils.json_to_sheet(modifiedInvoices);
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoices');
//       XLSX.writeFile(workbook, 'invoices.xlsx');
//   };

//   const handleExportPDF = () => {
//       const doc = new jsPDF();
//       doc.autoTable({
//           head: [['Invoice Number', 'Issued Date', 'Total', 'Payment Method', 'Payment Status']],
//           body: invoices.map((invoice) => [
//               invoice.invoiceNumber,
//               formatDate(invoice.issuedDate),
//               invoice.total,
//               invoice.paymentMethod,
//               invoice.paymentStatus
//           ])
//       });
//       doc.save('invoices.pdf');
//   };

//   const toggleDropdown = () => {
//       setDropdownOpen(!dropdownOpen);
//   };

//   const exportOptions = [
//       { label: 'Download as Excelsheet', command: handleExportExcel },
//       { label: 'Download as pdf', command: handleExportPDF }
//   ];

//     return (
//         <div className="mt-2">
//             <div className="">
//                 <div className="d-flex justify-content-between">
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
//                                 {' '}
//                                 <Button
//                                     className="btn"
//                                     onClick={() => {
//                                         setEditingProposal(null);
//                                         setIsFormVisible(true);
//                                     }}
//                                 >
//                                     New Proposal
//                                 </Button>
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

//             <DataTable value={proposals} paginator rows={10} className="mt-3 customer-tbl">
//                 {/* <Column field="projectName" header="Project Name" /> */}
//                 <Column field="subject" header="subject" headerStyle={stylesofborderleft} />
//                 <Column field="customer.Companyname" header="customer" headerStyle={Headerstyles} />
//                 <Column field="createdBy.firstname" header="Project Name" headerStyle={Headerstyles} />
//                 {/* <Column field="customer.Companyname" header="Customer" /> */}
//                 <Column headerStyle={Headerstyles} field="date" header="Date" body={(rowData) => formatDate(rowData.date)} />
//                 <Column headerStyle={Headerstyles} field="openTill" header="openTill" body={(rowData) => formatDate(rowData.deadline)} />

//                 <Column field="discount" header="discount" headerStyle={Headerstyles} />
//                 <Column field="subtotal" header="subtotal" headerStyle={Headerstyles} />
//                 <Column field="total" header="total" headerStyle={Headerstyles} />
//                 <Column header="Status" headerStyle={Headerstyles} body={(rowData) => <InputSwitch checked={rowData.status === 1} onChange={(e) => handleStatusChange(rowData._id, e.value ? 1 : 0)} />} />
//                 <Column
//                     header="Actions"
//                     headerStyle={stylesofborderright}
//                     body={(rowData) => (
//                         <div>
//                             <Button icon="pi pi-pencil" onClick={() => onEdit(rowData._id)} className="mr-2" tooltip="Edit" />
//                             <Button icon="pi pi-trash" onClick={() => onDelete(rowData._id)} className="p-button-danger" tooltip="Delete" />
//                         </div>
//                     )}
//                 />
//             </DataTable>
//         </div>
//     );
// };

// export default ProposalTable;
"use client"
import React, { useContext, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import userContext from '../../../../UseContext/UseContext';
import Link from 'next/link';
import '../../../../styles/newcustracts.scss';
import "../../../../styles/popup.scss";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { CiExport } from "react-icons/ci";
import { InputText } from 'primereact/inputtext';
import Cookies from "js-cookie"
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
    backgroundColor: ' rgba(10, 45, 90, 0.966)',
    color: 'white'
};

const ProposalTable = ({ proposals, onEdit, onDelete, handleStatusChange, setEditingProposal, setIsFormVisible }) => {
    const { items } = useContext(userContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedProposals, setSelectedProposals] = useState([]);
    const { data } = useContext(userContext);
    const subdomain = Cookies.get("subdomain")
    const [userPermissions, setUserPermissions] = useState({});
    const formatDate = (rowData) => {
        return new Date(rowData).toLocaleDateString();
    };
    useEffect(() => {
        // Set permissions only when user data changes
        if (data?.permissions) {
            setUserPermissions(data.permissions);
        }
    }, [data?.permissions]);
    const handleExportExcel = () => {
        const modifiedProposals = selectedProposals.map((proposal) => ({
            subject: proposal.subject,
            customer: proposal.customer.Companyname,
            projectName: proposal.createdBy.firstname,
            date: formatDate(proposal.date),
            openTill: formatDate(proposal.deadline),
            discount: proposal.discount,
            subtotal: proposal.subtotal,
            total: proposal.total,
            status: proposal.status === 1 ? 'Active' : 'Inactive'
        }));

        const worksheet = XLSX.utils.json_to_sheet(modifiedProposals);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Proposals');
        XLSX.writeFile(workbook, 'proposals.xlsx');
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Subject', 'Customer', 'Project Name', 'Date', 'Open Till', 'Discount', 'Subtotal', 'Total', 'Status']],
            body: selectedProposals.map((proposal) => [
                proposal.subject,
                proposal.customer.Companyname,
                proposal.createdBy.firstname,
                formatDate(proposal.date),
                formatDate(proposal.deadline),
                proposal.discount,
                proposal.subtotal,
                proposal.total,
                proposal.status === 1 ? 'Active' : 'Inactive'
            ])
        });
        doc.save('proposals.pdf');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const exportOptions = [
        { label: 'Download as Excelsheet', command: handleExportExcel },
        { label: 'Download as pdf', command: handleExportPDF }
    ]; const filteredProposals = proposals.filter((proposal) =>
        proposal.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.customer.Companyname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="mt-2">
            <div className="">
                <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column flex-md-row btn-item p-jc-between p-ai-center">
                        {/* <Button label="Select Date" className="m-2" onClick={handleExportExcel} />
          <Button label="Filters" className="m-2" onClick={handleExportExcel} /> */}
                        <div className="mb-2 propose-search">
                            <span className="p-input-icon-left">
                                <i className="pi pi-search ms-2 " />
                                <InputText
                                    type="search"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search....."
                                    // className="m-2"
                                    style={{ textIndent: "2rem" }}

                                />
                            </span>
                        </div>
                        <div className="mb-2 ">
                            {/* <Dropdown >
                <Dropdown.Toggle className="btn1" variant="success" id="dropdown-basic">
                  Filters
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
                        </div>
                    </div>

                    <div className="btn-item">
                        <ul className="d-flex flex-column flex-md-row list-inline">
                            <li>
                                {' '}
                                {userPermissions?.Proposals?.canCreate && (
                                    <Link href={`/${subdomain}/sales/proposal/create`}>
                                        <Button
                                            className="btn"

                                        >
                                            New Proposal
                                        </Button>
                                    </Link>
                                )}
                            </li>
                            <li>
                                {userPermissions?.Proposals?.canDelete && (
                                    <Button className="ms-2 me-2 mb-2 btn1" onClick={() => onDelete(selectedProposals.map(proposal => proposal._id))}>
                                        <i className="pi pi-trash"></i>
                                        Delete
                                    </Button>
                                )}
                            </li>
                            <li>
                                {userPermissions?.Proposals?.canCreate && (
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
                </div>
            </div>
            {userPermissions?.Proposals?.canRead && (
                <DataTable value={filteredProposals} paginator rows={10} className="mt-3 customer-tbl" selection={selectedProposals} onSelectionChange={(e) => setSelectedProposals(e.value)}>
                    <Column selectionMode="multiple" headerStyle={stylesofborderleft} />
                    <Column field="subject" header="Subject" headerStyle={Headerstyles} />
                    <Column field="customer.Companyname" header="Customer" headerStyle={Headerstyles} />
                    <Column field="createdBy.firstname" header="Project Name" headerStyle={Headerstyles} />
                    <Column headerStyle={Headerstyles} field="date" header="Date" body={(rowData) => formatDate(rowData.date)} />
                    <Column headerStyle={Headerstyles} field="openTill" header="Open Till" body={(rowData) => formatDate(rowData.deadline)} />
                    <Column field="discount" header="Discount" headerStyle={Headerstyles} />
                    <Column field="subtotal" header="Subtotal" headerStyle={Headerstyles} />
                    <Column field="total" header="Total" headerStyle={Headerstyles} />
                    <Column header="Status" headerStyle={Headerstyles} body={(rowData) => <InputSwitch checked={rowData.status === 1} onChange={(e) => handleStatusChange(rowData._id, e.value ? 1 : 0)} />} />
                    <Column
                        header="Actions"
                        headerStyle={stylesofborderright}
                        body={(rowData) => (
                            <div>
                                {userPermissions?.Proposals?.canUpdate && <Button icon="pi pi-pencil" onClick={() => onEdit(rowData._id)} style={{ all: "unset" }} className="mr-2 text-primary" tooltip="Edit" />}
                                {userPermissions?.Proposals?.canDelete && <Button icon="pi pi-trash" onClick={() => onDelete(rowData._id)} style={{ all: "unset" }} className="text-danger" tooltip="Delete" />}
                            </div>
                        )}
                    />
                </DataTable>
            )}
        </div>
    );
};

export default ProposalTable;
