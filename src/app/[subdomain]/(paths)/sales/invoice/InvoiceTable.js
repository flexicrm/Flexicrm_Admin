// import React, { useState } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import '../../../../styles/newcustracts.scss';
// import Link from 'next/link';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import * as XLSX from 'xlsx';
// import { CiExport } from 'react-icons/ci';
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

// const InvoiceTable = ({ invoices, onEdit, onDelete, setIsFormVisible, setEditingInvoice }) => {
//     // console.log(invoices, "invoices")
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const formatDate = (rowData) => {
//         return new Date(rowData).toLocaleDateString();
//     };

//     const handleExportExcel = () => {
//         const modifiedInvoices = invoices.map((invoice) => ({
//             invoiceNumber: invoice.invoiceNumber,
//             issuedDate: formatDate(invoice.issuedDate),
//             total: invoice.total,
//             paymentMethod: invoice.paymentMethod,
//             paymentStatus: invoice.paymentStatus
//         }));

//         const worksheet = XLSX.utils.json_to_sheet(modifiedInvoices);
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoices');
//         XLSX.writeFile(workbook, 'invoices.xlsx');
//     };

//     const handleExportPDF = () => {
//         const doc = new jsPDF();
//         doc.autoTable({
//             head: [['Invoice Number', 'Issued Date', 'Total', 'Payment Method', 'Payment Status']],
//             body: invoices.map((invoice) => [invoice.invoiceNumber, formatDate(invoice.issuedDate), invoice.total, invoice.paymentMethod, invoice.paymentStatus])
//         });
//         doc.save('invoices.pdf');
//     };

//     const toggleDropdown = () => {
//         setDropdownOpen(!dropdownOpen);
//     };

//     const exportOptions = [
//         { label: 'Download as Excelsheet', command: handleExportExcel },
//         { label: 'Download as pdf', command: handleExportPDF }
//     ];
//     return (
//         <div>
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
//                                         setEditingInvoice(null);
//                                         setIsFormVisible(true);
//                                     }}
//                                 >
//                                     New Invoice
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

//             <DataTable value={invoices} className="customer-tbl">
//                 <Column field="invoiceNumber" header="Invoice Number" headerStyle={stylesofborderleft} />
//                 {/* <Column field="customer.Companyname" header="Customer" /> */}
//                 <Column field="issuedDate" header="Issued Date" body={(rowData) => formatDate(rowData.issuedDate)} headerStyle={Headerstyles} />
//                 <Column field="total" header="Total" headerStyle={Headerstyles} />
//                 <Column field="paymentMethod" header="paymentMethod" headerStyle={Headerstyles} />
//                 <Column field="paymentStatus" header="paymentStatus" headerStyle={Headerstyles} />
//                 <Column
//                     headerStyle={stylesofborderright}
//                     body={(rowData) => (
//                         <>
//                             {/* <Button label="Edit" onClick={() => onEdit(rowData._id)} />
//                         <Button label="Delete" onClick={() => onDelete(rowData._id)} /> */}

//                             <div className="d-flex justify-content-evenly icon-iteam">
//                                 {/* <i className="align-self-center pi pi-eye"></i> */}
//                                 <i className="align-self-center pi pi-pencil" onClick={() => onEdit(rowData._id)}></i>
//                                 <i className="align-self-center pi pi-trash" onClick={() => onDelete(rowData._id)}></i>
//                             </div>
//                         </>
//                     )}
//                 />
//             </DataTable>
//         </div>
//     );
// };

// export default InvoiceTable;
"use client"
import React, { useContext, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import '../../../../styles/newcustracts.scss';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { CiExport } from 'react-icons/ci';
import userContext from "../../../../UseContext/UseContext"
import { InputText } from 'primereact/inputtext';
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

const InvoiceTable = ({ invoices, onEdit, onDelete, setIsFormVisible, setEditingInvoice }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedInvoices, setSelectedInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userPermissions, setUserPermissions] = useState({});
    console.log(userPermissions, 'userssssss');
    const [searchTerm, setSearchTerm] = useState('');
    const { data } = useContext(userContext);
    useEffect(() => {
        // Set permissions only when user data changes
        if (data?.permissions) {
            setUserPermissions(data.permissions);
        }
    }, [data?.permissions]);
    useEffect(() => {
        setLoading(true);
    }, []);
    const formatDate = (rowData) => {
        return new Date(rowData).toLocaleDateString();
    };

    const handleExportExcel = () => {
        const modifiedInvoices = selectedInvoices.map((invoice) => ({
            invoiceNumber: invoice.invoiceNumber,
            issuedDate: formatDate(invoice.issuedDate),
            total: invoice.total,
            paymentMethod: invoice.paymentMethod,
            paymentStatus: invoice.paymentStatus
        }));

        const worksheet = XLSX.utils.json_to_sheet(modifiedInvoices);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Invoices');
        XLSX.writeFile(workbook, 'invoices.xlsx');
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Invoice Number', 'Issued Date', 'Total', 'Payment Method', 'Payment Status']],
            body: selectedInvoices.map((invoice) => [invoice.invoiceNumber, formatDate(invoice.issuedDate), invoice.total, invoice.paymentMethod, invoice.paymentStatus])
        });
        doc.save('invoices.pdf');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const exportOptions = [
        { label: 'Download as Excelsheet', command: handleExportExcel },
        { label: 'Download as pdf', command: handleExportPDF }
    ];
    const filteredProposals = invoices.filter((invoices) =>
        invoices?.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) 
    // invoices.customer?.Companyname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <>
            {loading && (
                <div>
                    <div className="">
                        <div className="d-flex justify-content-between">
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
                                <div className="mb-2 ">{/* Dropdowns or other components can be added here */}</div>
                            </div>

                            <div className="btn-item">
                                <ul className="d-flex flex-column flex-md-row list-inline">
                                    <li>
                                        {userPermissions?.Invoice?.canCreate && (
                                            <Button
                                                className="btn"
                                                onClick={() => {
                                                    setEditingInvoice(null);
                                                    setIsFormVisible(true);
                                                }}
                                            >
                                                New Invoice
                                            </Button>
                                        )}
                                    </li>
                                    <li>
                                        {userPermissions?.Invoice?.canDelete && (
                                            <Button className="ms-2 me-2 mb-2 btn1" onClick={() => onDelete(selectedInvoices.map((invoice) => invoice._id))}>
                                                <i className="pi pi-trash"></i>
                                                Delete
                                            </Button>
                                        )}
                                    </li>
                                    <li>
                                        {userPermissions?.Invoice?.canCreate && (
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
                                                    <Button key={idx} style={{ all: 'unset', fontSize: '12px', fontWeight: '200' }} label={option.label} icon={option.icon} onClick={option.command} className="export-button fw-1 " />
                                                ))}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {userPermissions?.Invoice?.canRead && (
                        // <DataTable value={invoices} selection={selectedInvoices} onSelectionChange={(e) => setSelectedInvoices(e.value)} selectionMode="checkbox" className="customer-tbl">
                        <DataTable value={filteredProposals} selection={selectedInvoices} onSelectionChange={(e) => setSelectedInvoices(e.value)} selectionMode="checkbox" className="customer-tbl">
                            <Column selectionMode="multiple" headerStyle={stylesofborderleft}></Column>
                            <Column field="invoiceNumber" header="Invoice Number" headerStyle={Headerstyles} />
                            <Column field="issuedDate" header="Issued Date" body={(rowData) => formatDate(rowData.issuedDate)} headerStyle={Headerstyles} />
                            <Column field="total" header="Total" headerStyle={Headerstyles} />
                            <Column field="paymentMethod" header="paymentMethod" headerStyle={Headerstyles} />
                            <Column field="paymentStatus" header="paymentStatus" headerStyle={Headerstyles} />
                            <Column
                                headerStyle={stylesofborderright}
                                body={(rowData) => (
                                    <div className="d-flex justify-content-evenly icon-iteam">
                                        {userPermissions?.Invoice?.canUpdate && <Button className="align-self-center " icon="pi pi-pencil" style={{ all: 'unset' }} onClick={() => onEdit(rowData._id)} />}
                                        {userPermissions?.Invoice?.canDelete && <Button className="align-self-center " icon="pi pi-trash" style={{ all: 'unset' }} onClick={() => onDelete(rowData._id)} />}{' '}
                                    </div>
                                )}
                            />
                        </DataTable>
                    )}
                </div>
            )}
        </>
    );
};

export default InvoiceTable;
