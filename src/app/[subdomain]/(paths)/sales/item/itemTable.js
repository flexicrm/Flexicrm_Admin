// 'use client';
// import React, { useState, useEffect } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import { InputSwitch } from 'primereact/inputswitch';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// // import { API_BASE_URL } from '@/app/utils';
// import '../../../../styles/newcustracts.scss';
// import Link from 'next/link';
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

// const ItemTable = ({ items, onEdit, onDelete, handleStatusChange, setIsFormVisible }) => {
//     // console.log(items,"estimates")
//     const [statuses, setStatuses] = useState([]);
//     const [dropdownOpen, setDropdownOpen] = useState(false);

//     useEffect(() => {
//         setStatuses(items.map((items) => ({ _id: items._id, status: items.status })));
//     }, [items]);

//     const totalExpenses = statuses.length;
//     const activeExpenses = statuses.filter((expense) => expense.status === 1).length;
//     const inactiveExpenses = statuses.filter((expense) => expense.status === 0).length;
//     const formatDate = (date) => {
//         return new Date(date).toLocaleDateString(); // Example date formatting
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
//             body: invoices.map((invoice) => [
//                 invoice.invoiceNumber,
//                 formatDate(invoice.issuedDate),
//                 invoice.total,
//                 invoice.paymentMethod,
//                 invoice.paymentStatus
//             ])
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
//                                 <Button  className="  btn"onClick={() => setIsFormVisible(true)}>New Item</Button>
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
//                             <div className="dropdown-container">
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
//                         </ul>
//                     </div>
//                 </div>
//             </div>

//             <DataTable value={items} className="customer-tbl">
//                 <Column field="itemName" header="itemName" headerStyle={stylesofborderleft} />
//                 <Column field="quantity" header="quantity" headerStyle={Headerstyles} />
//                 <Column field="price" header="price" headerStyle={Headerstyles} />
//                 <Column field="createdBy.email" header="Email" headerStyle={Headerstyles} />
//                 <Column field="createdBy.firstname" header="First Name" headerStyle={Headerstyles} />
//                 {/* <Column field="estimateStatus" header="estimateStatus" /> */}
//                 {/* <Column field="total" header="total" /> */}
//                 {/* <Column field="currency" header="currency" /> */}
//                 <Column headerStyle={Headerstyles} header="Status" body={(rowData) => <InputSwitch checked={rowData.status === 1} onChange={(e) => handleStatusChange(rowData._id, e.value ? 1 : 0)} />} />
//                 <Column field="createdAt" header="createdAt" body={(rowData) => formatDate(rowData.createdAt)} headerStyle={Headerstyles} />
//                 {/* <Column field="expireDate" header="expireDate" body={(rowData) => formatDate(rowData.expireDate
// )} /> */}
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

// export default ItemTable;
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { Checkbox } from 'primereact/checkbox';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { CiExport } from "react-icons/ci";
import '../../../../styles/newcustracts.scss';
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

const ItemTable = ({ items, onEdit, onDelete, handleStatusChange, setIsFormVisible }) => {
    console.log (items,"items????")
    const [statuses, setStatuses] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading , setLoading] =useState(false);
    const dt = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setLoading(true)
        setStatuses(items.map((items) => ({ _id: items._id, status: items.status })));
    }, [items]);

    const totalExpenses = statuses.length;
    const activeExpenses = statuses.filter((expense) => expense.status === 1).length;
    const inactiveExpenses = statuses.filter((expense) => expense.status === 0).length;

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    const handleExportExcel = () => {
        const modifiedItems = items.map((item) => ({
            itemName: item.itemName,
            quantity: item.quantity,
            price: item.price,
            email: item.createdBy.email,
            firstName: item.createdBy.firstname,
            status: item.status,
            createdAt: formatDate(item.createdAt)
        }));

        const worksheet = XLSX.utils.json_to_sheet(modifiedItems);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Items');
        XLSX.writeFile(workbook, 'items.xlsx');
    };

    const handleExportPDF = () => {
        const doc = new jsPDF();
        doc.autoTable({
            head: [['Item Name', 'Quantity', 'Price', 'Email', 'First Name', 'Status', 'Created At']],
            body: items.map((item) => [
                item.itemName,
                item.quantity,
                item.price,
                item.createdBy.email,
                item.createdBy.firstname,
                item.status,
                formatDate(item.createdAt)
            ])
        });
        doc.save('items.pdf');
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const exportOptions = [
        { label: 'Download as Excelsheet', command: handleExportExcel },
        { label: 'Download as pdf', command: handleExportPDF }
    ];
    const filteredProposals = items.filter((items) =>
        items?.itemName.toLowerCase().includes(searchTerm.toLowerCase()) 
    // estimates.customer?.Companyname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log(filteredProposals,"datads")
    return (
        <>
        {
            loading &&(
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
                        <div className="mb-2 ">
                            {/* Dropdown for Filters */}
                        </div>
                    </div>

                    <div className="btn-item">
                        <ul className="d-flex flex-column flex-md-row list-inline">
                            <li>
                                <Button className="btn" onClick={() => setIsFormVisible(true)}>New Item</Button>
                            </li>
                            <li>
                                <Button className="ms-2 me-2 mb-2 btn1" onClick={() => onDelete(selectedItems.map(item => item._id))}>
                                    <i className="pi pi-trash"></i>
                                    Delete
                                </Button>
                            </li>
                            <li>
                                <Button className="ms-2 me-2 mb-2 btn1">
                                    <i className="pi pi-download"></i>
                                    Import
                                </Button>
                            </li>
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
                        </ul>
                    </div>
                </div>
            </div>

            <DataTable ref={dt} value={filteredProposals} selection={selectedItems} onSelectionChange={e => setSelectedItems(e.value)} dataKey="_id" className="customer-tbl">
                <Column selectionMode="multiple" headerStyle={stylesofborderleft} />
                <Column field="itemName" header="Item Name" headerStyle={Headerstyles} />
                <Column field="quantity" header="Quantity" headerStyle={Headerstyles} />
                <Column field="price" header="Price" headerStyle={Headerstyles} />
                <Column field="createdBy.email" header="Email" headerStyle={Headerstyles} />
                <Column field="createdBy.firstname" header="First Name" headerStyle={Headerstyles} />
                <Column headerStyle={Headerstyles} header="Status" body={(rowData) => <InputSwitch checked={rowData.status === 1} onChange={(e) => handleStatusChange(rowData._id, e.value ? 1 : 0)} />} />
                <Column field="createdAt" header="Created At" body={(rowData) => formatDate(rowData.createdAt)} headerStyle={Headerstyles} />
                <Column
                    headerStyle={stylesofborderright}
                    body={(rowData) => (    
                        <div className="d-flex justify-content-evenly icon-iteam">
                           <Button onClick={() => onEdit(rowData._id)} icon="pi pi-pencil" style={{all:"unset"}}></Button> 
                           <Button onClick={() => onDelete(rowData._id)} icon ="pi pi-trash"style={{all:"unset"}}> </Button> 
                        </div>
                    )}
                />
            </DataTable>
        </div>
            )
        }
        </>
        
    );
};

export default ItemTable;
