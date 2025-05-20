// 'use client';
// import React, { useState, useEffect, useContext } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import { InputSwitch } from 'primereact/inputswitch';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { API_BASE_URL } from '../../../utils';
// import Link from 'next/link';
// // import { API_BASE_URL } from '@/app/utils';
// import '../../../styles/newcustracts.scss';
// import userContext from '../../../UseContext/UseContext';

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

// const ExpenseTable = ({ expenses, onEdit, onDelete, setIsFormVisible }) => {
//     const { data } = useContext(userContext);
//     const [statuses, setStatuses] = useState([]);
//     const accessToken = Cookies.get('accessToken');
//     const subdomain = Cookies.get('subdomain');
//     const [userPermissions, setUserPermissions] = useState({});
//     console.log(userPermissions, 'userssssss');

//     useEffect(() => {
//         // Set permissions only when user data changes
//         if (data?.permissions) {
//             setUserPermissions(data.permissions);
//         }
//     }, [data?.permissions]);
//     useEffect(() => {
//         setStatuses(expenses.map((expense) => ({ _id: expense._id, status: expense.status })));
//     }, [expenses]);

//     const handleStatusChange = async (id, status) => {
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             await axios.patch(`${API_BASE_URL}/expense/${subdomain}/${id}`, { status }, { headers });

//             setStatuses((prevStatuses) => prevStatuses.map((expense) => (expense._id === id ? { ...expense, status } : expense)));
//         } catch (error) {
//             console.error('Error updating status:', error);
//         }
//     };

//     const totalExpenses = statuses.length;
//     const activeExpenses = statuses.filter((expense) => expense.status === 1).length;
//     const inactiveExpenses = statuses.filter((expense) => expense.status === 0).length;

//     return (
//         <div>
//             <div className="d-flex justify-content-between">
//                 <div className="d-flex flex-column flex-md-row btn-item p-jc-between p-ai-center">
//                     {/* <Button label="Select Date" className="m-2" onClick={handleExportExcel} />
//           <Button label="Filters" className="m-2" onClick={handleExportExcel} /> */}
//                     <div className="mb-2 mt-2">
//                         {/* <Dropdown >
//                             <Dropdown.Toggle className="btn1" variant="success" id="dropdown-basic">
//                                 Select Date
//                             </Dropdown.Toggle>

//                             <Dropdown.Menu>
//                                 <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//                                 <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//                                 <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//                             </Dropdown.Menu>
//                         </Dropdown> */}
//                     </div>
//                     <div className="mb-2 ">
//                         {/* <Dropdown >
//                             <Dropdown.Toggle className="btn1" variant="success" id="dropdown-basic">
//                                 Filters
//                             </Dropdown.Toggle>

//                             <Dropdown.Menu>
//                                 <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//                                 <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//                                 <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//                             </Dropdown.Menu>
//                         </Dropdown> */}
//                     </div>
//                 </div>

//                 <div className="btn-item">
//                     <ul className="d-flex flex-column flex-md-row list-inline">
//                         <li>
//                             {' '}
//                             {userPermissions?.Expenses?.canCreate && (
//                                 <Button className="btn1" onClick={() => setIsFormVisible(true)}>
//                                     New Expense
//                                 </Button>
//                             )}
//                         </li>
//                         <li>
//                             {userPermissions?.Expenses?.canDelete && (
//                                 <Button className="ms-2 me-2 mb-2 btn1">
//                                     <i className="pi pi-trash"></i>
//                                     Delete
//                                 </Button>
//                             )}
//                         </li>
//                         <li>
//                             {userPermissions?.Expenses?.canCreate && (
//                                 <Button className="ms-2 me-2 mb-2 btn1">
//                                     <i className="pi pi-download"></i>
//                                     Import
//                                 </Button>
//                             )}
//                         </li>
//                         <li>
//                             <Button className="ms-2 me-2 mb-2 btn1">
//                                 <i className="pi pi-upload"></i>
//                                 Export
//                             </Button>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//             {userPermissions?.Expenses?.canRead && (
//                 <DataTable value={expenses} className="customer-tbl">
//                     <Column field="expenseId" header="Expense ID" headerStyle={stylesofborderleft} />
//                     <Column field="createdBy.email" header="Email" headerStyle={Headerstyles} />
//                     <Column field="createdBy.firstname" header="First Name" headerStyle={Headerstyles} />
//                     {/* <Column field="userRole" header="User Role" /> */}
//                     <Column header="Status" headerStyle={Headerstyles} body={(rowData) => <InputSwitch checked={rowData.status === 1} onChange={(e) => handleStatusChange(rowData._id, e.value ? 1 : 0)} />} />
//                     <Column field="paymentStatus" header="Payment Status" headerStyle={Headerstyles} />
//                     <Column
//                         headerStyle={stylesofborderright}
//                         body={(rowData) => (
//                             <>
//                                 {/* <Button label="Edit" onClick={() => onEdit(rowData._id)} />
//                         <Button label="Delete" onClick={() => onDelete(rowData._id)} /> */}
//                                 <div className="d-flex justify-content-between icon-iteam">
//                                     {/* <i className="align-self-center pi pi-eye"></i> */}

//                                     {userPermissions?.Expenses?.canUpdate && <Button className="align-self-center " icon="pi pi-pencil" onClick={() => onEdit(rowData._id)} style={{ all: 'unset' }} />}
//                                     {userPermissions?.Expenses?.canDelete && <Button className="align-self-center " icon="pi pi-trash" onClick={() => onDelete(rowData._id)} style={{ all: 'unset' }} />}
//                                 </div>
//                             </>
//                         )}
//                     />
//                 </DataTable>
//             )}
//         </div>
//     );
// };

// export default ExpenseTable;
'use client';
import React, { useState, useEffect, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../../../utils';
import Link from 'next/link';
import '../../../styles/newcustracts.scss';
import userContext from '../../../UseContext/UseContext';
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

const ExpenseTable = ({ expenses, onEdit, onDelete, setIsFormVisible }) => {
    const { data } = useContext(userContext);
    const [statuses, setStatuses] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const accessToken = Cookies.get('accessToken');
    const subdomain = Cookies.get('subdomain');
    const [userPermissions, setUserPermissions] = useState({});
    // console.log(userPermissions, 'userssssss');
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        if (data?.permissions) {
            setUserPermissions(data.permissions);
        }
    }, [data?.permissions]);

    useEffect(() => {
        setStatuses(expenses.map((expense) => ({ _id: expense._id, status: expense.status })));
    }, [expenses]);

    const handleStatusChange = async (id, status) => {
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            await axios.patch(`${API_BASE_URL}/expense/${subdomain}/${id}`, { status }, { headers });

            setStatuses((prevStatuses) => prevStatuses.map((expense) => (expense._id === id ? { ...expense, status } : expense)));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const totalExpenses = statuses.length;
    const activeExpenses = statuses.filter((expense) => expense.status === 1).length;
    const inactiveExpenses = statuses.filter((expense) => expense.status === 0).length;
    const filteredEstimates = expenses.filter((expenses) => {
        console.log(expenses, 'projectssssssssss');
        const projectName = expenses?.expenseId?.toLowerCase() || '';
        const companyName = expenses?.description?.toLowerCase() || '';
        return projectName.includes(searchTerm.toLowerCase()) || companyName.includes(searchTerm.toLowerCase());
    });

    return (
        <div>
            <div className="expenses-top    expense-top-bottom">
                <div className=" d-flex btn-item p-jc-between p-ai-center">
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
                    <div className="mb-2 "></div>
             

                <div className="btn-item">
                    <ul className="list-inline ms-auto">
                        <li>
                            {userPermissions?.Expenses?.canCreate && (
                                <Button className="btn1" onClick={() => setIsFormVisible(true)}>
                                    New Expense
                                </Button>
                            )}
                        </li>
                        <li>
                            {userPermissions?.Expenses?.canDelete && (
                                <Button className="ms-2 me-2 mb-2 btn1" onClick={() => onDelete(selectedRows.map((row) => row._id))}>
                                    <i className="pi pi-trash"></i>
                                    Delete
                                </Button>
                            )}
                        </li>
                        <li>
                            {userPermissions?.Expenses?.canCreate && (
                                <Button className="ms-2 me-2 mb-2 btn1">
                                    <i className="pi pi-download"></i>
                                    Import
                                </Button>
                            )}
                        </li>
                        <li>
                            <Button className="ms-2 me-2 mb-2 btn1">
                                <i className="pi pi-upload"></i>
                                Export
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
            {userPermissions?.Expenses?.canRead && (
                <DataTable value={filteredEstimates} selection={selectedRows} onSelectionChange={(e) => setSelectedRows(e.value)} className="customer-tbl">
                    <Column selectionMode="multiple" headerStyle={stylesofborderleft} />
                    <Column field="expenseId" header="Expense ID" headerStyle={Headerstyles} />
                    <Column field="createdBy.email" header="Email" headerStyle={Headerstyles} />
                    <Column field="createdBy.firstname" header="First Name" headerStyle={Headerstyles} />
                    <Column header="Status" headerStyle={Headerstyles} body={(rowData) => <InputSwitch checked={rowData.status === 1} onChange={(e) => handleStatusChange(rowData._id, e.value ? 1 : 0)} />} />
                    <Column field="paymentStatus" header="Payment Status" headerStyle={Headerstyles} />
                    <Column
                        header="Actions"
                        headerStyle={stylesofborderright}
                        body={(rowData) => (
                            <div className="d-flex icon-iteam">
                                {userPermissions?.Expenses?.canUpdate && <Button className="align-self-center " icon="pi pi-pencil" onClick={() => onEdit(rowData._id)} style={{ all: 'unset' }} />}
                                {userPermissions?.Expenses?.canDelete && <Button className="align-self-center " icon="pi pi-trash" onClick={() => onDelete(rowData._id)} style={{ all: 'unset' }} />}
                            </div>
                        )}
                    />
                </DataTable>
            )}
        </div>
    );
};

export default ExpenseTable;
