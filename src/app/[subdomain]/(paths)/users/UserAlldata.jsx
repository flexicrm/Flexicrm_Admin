// "use client"
// import React, { useState, useEffect, useRef, useContext } from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import { InputText } from 'primereact/inputtext';
// import { Dropdown } from 'primereact/dropdown';
// import { InputMask } from 'primereact/inputmask';
// import { Toast } from 'primereact/toast';
// import { Col, Modal, Row } from 'react-bootstrap';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import { CiImport, CiExport } from 'react-icons/ci';
// import './users.scss';
// import CategoryFilter from '../Filters/CatgoryFilter';
// import { API_BASE_URL } from '../../../utils/index';
// import { IoFilterSharp } from 'react-icons/io5';
// import userContext from '../../../UseContext/UseContext';
// import { Calendar } from 'primereact/calendar';
// import "../../../styles/newcustracts.scss"
// import { useRouter } from 'next/navigation';
// import UserTable from './UserTable';

// const EditableUsers = ({ users, accessToken, usertop, userRoles, permissionsShow, setPermissionShow, planconts, plancount }) => {
//     //    console.log(users,"usersusers")
//     const [userData, setUserData] = useState(users);
//     const [view, setView] = useState('table');
//     const { data } = useContext(userContext);
//     const [loading, setLoading] = useState(false);
//     const [permissions, setPermissions] = useState({});
//     const [editUser, setEditUser] = useState(null);
//     const [showModal, setShowModal] = useState(false);

//     const toast = useRef(null);
//     const subdomain = Cookies.get('subdomain');
//     // const [rowClick, setRowClick] = useState(true);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [userPermissions, setUserPermissions] = useState({});
//     // const [categoryFilter, setCategoryFilter] = useState(null);
//     const [dateFilterOption, setDateFilterOption] = useState(null);
//     const [customDateRange, setCustomDateRange] = useState({ start: null, end: null });
//     const router = useRouter()


//     useEffect(() => {
//         if (data?.permissions) {
//             setUserPermissions(data.permissions);
//         }
//     }, [data?.permissions]);

//     useEffect(() => {
//         const parsedUsers = users.map((user) => ({
//             ...user,
//             createdAt: new Date(user.createdAt)
//         }));
//         setUserData(parsedUsers);
//     }, [users]);

//     const exportToExcel = () => {
//         const worksheet = XLSX.utils.json_to_sheet(
//             userData.map(({ firstname, lastname, email, mobile, userRole }) => ({
//                 name: `${firstname} ${lastname}`,
//                 email,
//                 mobile,
//                 userRole
//             }))
//         );
//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
//         XLSX.writeFile(workbook, 'UserData.xlsx');
//     };

//     const exportToPDF = () => {
//         const doc = new jsPDF();
//         doc.text('User Data', 20, 20);
//         const tableColumn = ['Name', 'Email', 'Mobile', 'User Role'];
//         const tableRows = userData.map(({ firstname, lastname, email, mobile, userRole }) => [`${firstname} ${lastname}`, email, mobile, userRole]);
//         doc.autoTable({ head: [tableColumn], body: tableRows, startY: 30 });
//         doc.save('UserData.pdf');
//     };

//     const handleImport = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onload = async (e) => {
//                 const data = e.target.result;
//                 const workbook = XLSX.read(data, { type: 'binary' });
//                 const sheetName = workbook.SheetNames[0];
//                 const worksheet = workbook.Sheets[sheetName];
//                 const jsonData = XLSX.utils.sheet_to_json(worksheet);
//                 setUserData(jsonData);
//             };
//             reader.readAsBinaryString(file);
//         }
//     };

//     const fetchPermissions = async (role) => {
//         const cookieSubdomain2 = Cookies.get('subdomain');
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             const response = await axios.get(`${API_BASE_URL}/roleandpermission/${cookieSubdomain2}/getpermission?role=${role}`, { headers });
//             if (response.data.data) {
//                 setPermissions(response.data.data);
//             } else {
//                 setPermissions({});
//             }
//         } catch (error) {
//             console.error('Error fetching permissions:', error.message);
//             Swal.fire('Error!', 'Failed to fetch permissions.', 'error');
//         }
//     };

//     const handleRoleChange = async (newRole, index) => {
//         await fetchPermissions(newRole);
//         setUserData((prev) => prev.map((user, i) => (i === index ? { ...user, userRole: newRole } : user)));
//     };

//     const handleRowEditComplete = async ({ newData, index }) => {
//         setLoading(true);
//         const userId = userData[index]?._id;

//         if (!userId) {
//             console.error('User ID is null or undefined');
//             setLoading(false);
//             return;
//         }

//         try {
//             await axios.put(
//                 `${API_BASE_URL}/user/${subdomain}/me`,
//                 { ...newData, id: userId, permissions },
//                 {
//                     headers: { Authorization: `Bearer ${accessToken}` }
//                 }
//             );

//             toast.current.show({
//                 severity: 'success',
//                 summary: 'User Updated',
//                 detail: 'The user has been updated.'
//             });
//             setUserData((prev) => prev.map((user, i) => (i === index ? newData : user)));
//         } catch (error) {
//             toast.current.show({
//                 severity: 'error',
//                 summary: 'Error',
//                 detail: error.response?.data?.message || 'Failed to update user.'
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (userId) => {
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
//             setLoading(true);
//             try {
//                 await axios.delete(`${API_BASE_URL}/user/${subdomain}/${userId}`, {
//                     headers: { Authorization: `Bearer ${accessToken}` }
//                 });
//                 toast.current.show({
//                     severity: 'success',
//                     summary: 'Deleted',
//                     detail: 'The user has been deleted.'
//                 });
//                 setUserData((prev) => prev.filter((user) => user._id !== userId));
//                 setSelectedUsers((prev) => prev.filter((id) => id !== userId));
//             } catch (error) {
//                 toast.current.show({
//                     severity: 'error',
//                     summary: 'Error',
//                     detail: error.message || 'There was a problem deleting the user.'
//                 });
//             } finally {
//                 setLoading(false);
//             }
//         }
//     };

  

//     const handleModalSave = async () => {
//         if (!editUser) return;

//         setLoading(true);
//         const userId = editUser._id;

//         try {
//             await axios.put(
//                 `${API_BASE_URL}/user/${subdomain}/me`,
//                 { ...editUser, id: userId, permissions },
//                 {
//                     headers: { Authorization: `Bearer ${accessToken}` }
//                 }
//             );
//             toast.current.show({
//                 severity: 'success',
//                 summary: 'success',
//                 detail: 'User added successfully.'
//             });
//             setUserData((prev) => prev.map((user) => (user._id === userId ? editUser : user)));
//             setShowModal(false);
//         } catch (error) {
//             toast.current.show({
//                 severity: 'error',
//                 summary: 'Error',
//                 detail: error.response?.data?.message || 'Failed to update user.'
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     ;

//     const exportOptions = [
//         { label: 'Download as Excelsheet', command: exportToExcel },
//         { label: 'Download as pdf', command: exportToPDF }
//     ];

//     const toggleDropdown = () => {
//         setDropdownOpen(!dropdownOpen);
//     };


//     const dateFilterOptions = [
//         { name: 'Today', code: 'today' },
//         { name: 'Yesterday', code: 'yesterday' },
//         { name: 'Last Week', code: 'lastWeek' },
//         { name: 'Last Month', code: 'lastMonth' },
//         { name: 'Last 6 Months', code: 'lastSixMonths' },
//         { name: 'Last Year', code: 'lastYear' },
//         { name: 'Custom Date', code: 'custom' }
//     ];

//     const handleDateFilterOptionChange = (e) => {
//         setDateFilterOption(e.value);
//         if (e.value !== 'custom') {
//             setCustomDateRange({ start: null, end: null });
//         }
//     };

//     const handleCustomDateChange = (e, type) => {
//         setCustomDateRange(prev => ({
//             ...prev,
//             [type]: e.value
//         }));
//     };

//     const filteredUsers = userData.filter((user) => {
//         const createdAt = new Date(user.createdAt);
//         const localCreatedAt = new Date(createdAt.getTime() + createdAt.getTimezoneOffset() * 60000);

//         switch (dateFilterOption) {
//             case 'today':
//                 return localCreatedAt.toISOString().split('T')[0] === new Date().toISOString().split('T')[0];
//             case 'yesterday':
//                 const yesterday = new Date();
//                 yesterday.setDate(yesterday.getDate() - 1);
//                 return localCreatedAt.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0];
//             case 'lastWeek':
//                 const lastWeek = new Date();
//                 lastWeek.setDate(lastWeek.getDate() - 7);
//                 return localCreatedAt >= lastWeek && localCreatedAt <= new Date();
//             case 'lastMonth':
//                 const lastMonth = new Date();
//                 lastMonth.setMonth(lastMonth.getMonth() - 1);
//                 return localCreatedAt >= lastMonth && localCreatedAt <= new Date();
//             case 'lastSixMonths':
//                 const lastSixMonths = new Date();
//                 lastSixMonths.setMonth(lastSixMonths.getMonth() - 6);
//                 return localCreatedAt >= lastSixMonths && localCreatedAt <= new Date();
//             case 'lastYear':
//                 const lastYear = new Date();
//                 lastYear.setFullYear(lastYear.getFullYear() - 1);
//                 return localCreatedAt >= lastYear && localCreatedAt <= new Date();
//             case 'custom':
//                 if (customDateRange.start && customDateRange.end) {
//                     return localCreatedAt >= new Date(customDateRange.start) && localCreatedAt <= new Date(customDateRange.end);
//                 }
//                 return true;
//             default:
//                 return true;
//         }
//     });

//     const userCreateOpen = () => {
//         router.push(`/${subdomain}/users/create`)
//     }

//     return (
//         <div>
//             <Toast ref={toast} />
//             <div className="p-mt-2 p-p-2 p-shadow-2 p-border-round customer-counter mb-5">
//                 <Row >
//                     <Col lg={4} xs={12}>
//                         <div className="customer-body p-2 mb-2">
//                             <p className="p-3">
//                                 <span className="justify-content-center">{usertop.totalUsers}</span><br />
//                                 Total User:
//                             </p>
//                         </div>
//                     </Col>
//                     <Col lg={4} xs={12}>
//                         <div className="coustomer-body1 p-2 mb-2">
//                             <p className="p-3">
//                                 <span className="justify-content-center">{usertop.activeUserCount}</span><br />
//                                 Active User:
//                             </p>
//                         </div>
//                     </Col>
//                     <Col lg={4} xs={12}>
//                         <div className="coustomer-body2 p-2 mb-2">
//                             <p className="p-3">
//                                 <span className="justify-content-center">{usertop.inactiveUserCount}</span><br />
//                                 Inactive User:
//                             </p>
//                         </div>
//                     </Col>
              
//                 </Row>



//             </div>

//             <Row>
//                 <Col md={12}>
//                     <div className="view-buttons  d-flex" style={{justifyContent:"space-between"}}>
//                         {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}> */}



//                         {/* <CategoryFilter users={userData} onFilterChange={handleFilterChange} filters={filters} setFilters={setFilters} /> */}
                      
//                       <Row>

//                         <Col>
//                             <div className="card flex justify-content-center">
//                                 <Dropdown
//                                     value={dateFilterOption}
//                                     onChange={handleDateFilterOptionChange}
//                                     options={dateFilterOptions}
//                                     optionLabel="name"
//                                     placeholder="Select Date Filter"
//                                     className="w-full md:w-20rem"
//                                 />
//                             </div>
//                             {dateFilterOption === 'custom' && (
//                                 <div className="card flex justify-content-center">
//                                     <Calendar
//                                         value={customDateRange.start}
//                                         onChange={(e) => handleCustomDateChange(e, 'start')}
//                                         dateFormat="yy-mm-dd"
//                                         placeholder="Start Date"
//                                         className="w-full md:w-20rem"
//                                     />
//                                     <Calendar
//                                         value={customDateRange.end}
//                                         onChange={(e) => handleCustomDateChange(e, 'end')}
//                                         dateFormat="yy-mm-dd"
//                                         placeholder="End Date"
//                                         className="w-full md:w-20rem"
//                                     />
//                                 </div>
//                             )}
//                         </Col>
//                       </Row>
//                         {/* </div> */}
//                         <Row>

//                         <Col md={3}>
//                             <div className="user-topbtn">
//                                 {true && <Button onClick={userCreateOpen} label="Add Users" style={{ fontSize: '12px' }} className="user-users w-100" disabled={planconts === plancount} icon="pi pi-user-plus" />}
//                             </div>
//                         </Col>
//                         <Col md={3}>
//                             <div className="w-100"><Button onClick={() => setPermissionShow(!permissionsShow)} style={{ fontSize: '12px' }} label="Add Permission" className="permisson-user" icon="pi pi-user-plus" /></div>
//                         </Col>
//                         <Col md={2}>
//                             <div className="dropdown-container  ">
//                                 {userPermissions?.User?.canCreate && (
//                                     <Button className="permisson-user user-export  w-100" onClick={toggleDropdown}>
//                                         <span className="iconssss">
//                                             <CiExport />
//                                         </span>
//                                         <span> Export </span>
//                                     </Button>
//                                 )}
//                                 <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
//                                     {exportOptions.map((option, idx) => (
//                                         <Button key={idx} label={option.label} icon={option.icon} onClick={option.command} className="export-button fw-1" />
//                                     ))}
//                                 </div>
//                             </div>
//                         </Col>

                       
//                         <Col md={2}>
//                             <Button className="   permisson-user   user-export    w-100 " onClick={() => document.getElementById('importInput').click()}>
//                                 {' '}
//                                 <CiImport className="icon m-2" /> <span> Import</span>
//                             </Button>
//                             <input id="importInput" type="file" style={{ display: 'none' }} accept=".xlsx, .xls" onChange={handleImport} />
//                         </Col>
//                         <Col md={2}>
//                         <div className='d-flex'>
//                             <Button icon="pi pi-list" onClick={() => setView('table')} className={`view-button ${view === 'table' ? 'active' : ''}`} />
//                             <Button icon="pi pi-th-large" onClick={() => setView('grid')} className={`view-button ${view === 'grid' ? 'active' : ''}`} />
//                         </div>
//                         </Col>
                       
//                         </Row>


//                     </div>
//                 </Col>

//             </Row>
//             <UserTable filteredUsers={filteredUsers} loading={loading} view={view} />


//         </div>
//     );
// };

// export default EditableUsers;
import React, { useState, useEffect, useRef, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { Toast } from 'primereact/toast';
import { Col, Modal, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CiImport, CiExport } from 'react-icons/ci';
import './users.scss';
import CategoryFilter from '../Filters/CatgoryFilter';
import { API_BASE_URL } from '../../../utils/index';
import { IoFilterSharp } from 'react-icons/io5';
import userContext from '../../../UseContext/UseContext';
import { Calendar } from 'primereact/calendar';
import "../../../styles/newcustracts.scss"
import { useRouter } from 'next/navigation';
import UserTable from './UserTable';
import axiosInstance from '../../../../../axiosConfig';

const EditableUsers = ({ users, accessToken, usertop, userRoles, permissionsShow, setPermissionShow, planconts, plancount }) => {
    const [userData, setUserData] = useState(users);
    const [view, setView] = useState('table');
    const { data } = useContext(userContext);
    const [loading, setLoading] = useState(false);
    const [permissions, setPermissions] = useState({});
    const [editUser, setEditUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const toast = useRef(null);
    const subdomain = Cookies.get('subdomain');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userPermissions, setUserPermissions] = useState({});
    const [dateFilterOption, setDateFilterOption] = useState(null);
    const [customDateRange, setCustomDateRange] = useState({ start: null, end: null });
    const router = useRouter();

    useEffect(() => {
        if (data?.permissions) {
            setUserPermissions(data.permissions);
        }
    }, [data?.permissions]);

    useEffect(() => {
        const parsedUsers = users.map((user) => ({
            ...user,
            createdAt: new Date(user.createdAt)
        }));
        setUserData(parsedUsers);
    }, [users]);

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            userData.map(({ firstname, lastname, email, mobile, userRole }) => ({
                name: `${firstname} ${lastname}`,
                email,
                mobile,
                userRole
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
        XLSX.writeFile(workbook, 'UserData.xlsx');
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        doc.text('User Data', 20, 20);
        const tableColumn = ['Name', 'Email', 'Mobile', 'User Role'];
        const tableRows = userData.map(({ firstname, lastname, email, mobile, userRole }) => [`${firstname} ${lastname}`, email, mobile, userRole]);
        doc.autoTable({ head: [tableColumn], body: tableRows, startY: 30 });
        doc.save('UserData.pdf');
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (e) => {
                const data = e.target.result;
                const workbook = XLSX.read(data, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                setUserData(jsonData);
            };
            reader.readAsBinaryString(file);
        }
    };

    const fetchPermissions = async (role) => {
        const cookieSubdomain2 = Cookies.get('subdomain');
        try {
           
            const response = await axiosInstance.get(`/roleandpermission/${cookieSubdomain2}/getpermission?role=${role}`);
            if (response.data.data) {
                setPermissions(response.data.data);
            } else {
                setPermissions({});
            }
        } catch (error) {
            console.error('Error fetching permissions:', error.message);
            Swal.fire('Error!', 'Failed to fetch permissions.', 'error');
        }
    };

    const handleRoleChange = async (newRole, index) => {
        await fetchPermissions(newRole);
        setUserData((prev) => prev.map((user, i) => (i === index ? { ...user, userRole: newRole } : user)));
    };

    const handleRowEditComplete = async ({ newData, index }) => {
        setLoading(true);
        const userId = userData[index]?._id;

        if (!userId) {
            console.error('User ID is null or undefined');
            setLoading(false);
            return;
        }

        try {
            await axiosInstance.put(
                `/user/${subdomain}/me`,
                { ...newData, id: userId, permissions },
               
            );

            toast.current.show({
                severity: 'success',
                summary: 'User Updated',
                detail: 'The user has been updated.'
            });
            setUserData((prev) => prev.map((user, i) => (i === index ? newData : user)));
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: error.response?.data?.message || 'Failed to update user.'
            });
        } finally {
            setLoading(false);
        }
    };

    

    const handleModalSave = async () => {
        if (!editUser) return;

        setLoading(true);
        const userId = editUser._id;

        try {
            await axios.put(
                `${API_BASE_URL}/user/${subdomain}/me`,
                { ...editUser, id: userId, permissions },
                {
                    headers: { Authorization: `Bearer ${accessToken}` }
                }
            );
            toast.current.show({
                severity: 'success',
                summary: 'success',
                detail: 'User added successfully.'
            });
            setUserData((prev) => prev.map((user) => (user._id === userId ? editUser : user)));
            setShowModal(false);
        } catch (error) {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: error.response?.data?.message || 'Failed to update user.'
            });
        } finally {
            setLoading(false);
        }
    };

    const exportOptions = [
        { label: 'Download as Excelsheet', command: exportToExcel },
        { label: 'Download as pdf', command: exportToPDF }
    ];

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const dateFilterOptions = [
        { name: 'Today', code: 'today' },
        { name: 'Yesterday', code: 'yesterday' },
        { name: 'Last Week', code: 'lastWeek' },
        { name: 'Last Month', code: 'lastMonth' },
        { name: 'Last 6 Months', code: 'lastSixMonths' },
        { name: 'Last Year', code: 'lastYear' },
        { name: 'Custom Date', code: 'custom' }
    ];

    const handleDateFilterOptionChange = (e) => {
        setDateFilterOption(e.value);
        if (e.value !== 'custom') {
            setCustomDateRange({ start: null, end: null });
        }
    };

    const handleCustomDateChange = (e, type) => {
        setCustomDateRange(prev => ({
            ...prev,
            [type]: e.value
        }));
    };

    const filteredUsers = userData.filter((user) => {
        const createdAt = new Date(user.createdAt);
        const localCreatedAt = new Date(createdAt.getTime() + createdAt.getTimezoneOffset() * 60000);

        switch (dateFilterOption) {
            case 'today':
                return localCreatedAt.toISOString().split('T')[0] === new Date().toISOString().split('T')[0];
            case 'yesterday':
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                return localCreatedAt.toISOString().split('T')[0] === yesterday.toISOString().split('T')[0];
            case 'lastWeek':
                const lastWeek = new Date();
                lastWeek.setDate(lastWeek.getDate() - 7);
                return localCreatedAt >= lastWeek && localCreatedAt <= new Date();
            case 'lastMonth':
                const lastMonth = new Date();
                lastMonth.setMonth(lastMonth.getMonth() - 1);
                return localCreatedAt >= lastMonth && localCreatedAt <= new Date();
            case 'lastSixMonths':
                const lastSixMonths = new Date();
                lastSixMonths.setMonth(lastSixMonths.getMonth() - 6);
                return localCreatedAt >= lastSixMonths && localCreatedAt <= new Date();
            case 'lastYear':
                const lastYear = new Date();
                lastYear.setFullYear(lastYear.getFullYear() - 1);
                return localCreatedAt >= lastYear && localCreatedAt <= new Date();
            case 'custom':
                if (customDateRange.start && customDateRange.end) {
                    return localCreatedAt >= new Date(customDateRange.start) && localCreatedAt <= new Date(customDateRange.end);
                }
                return true;
            default:
                return true;
        }
    });

    const userCreateOpen = () => {
        router.push(`/${subdomain}/users/create`);
    };

    return (
        <div>
            <Toast ref={toast} />
            <div className="p-mt-2 p-p-2 p-shadow-2 p-border-round customer-counter mb-5">
                <Row>
                    <Col lg={4} xs={12}>
                        <div className="customer-body p-2 mb-2">
                            <p className="p-3">
                                <span className="justify-content-center">{usertop.totalUsers}</span><br />
                                Total User:
                            </p>
                        </div>
                    </Col>
                    <Col lg={4} xs={12}>
                        <div className="coustomer-body1 p-2 mb-2">
                            <p className="p-3">
                                <span className="justify-content-center">{usertop.activeUserCount}</span><br />
                                Active User:
                            </p>
                        </div>
                    </Col>
                    <Col lg={4} xs={12}>
                        <div className="coustomer-body2 p-2 mb-2">
                            <p className="p-3">
                                <span className="justify-content-center">{usertop.inactiveUserCount}</span><br />
                                Inactive User:
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>

            <Row>
                <Col md={12}>
                    <div className="view-buttons d-flex" style={{ justifyContent: "space-between" }}>
                        <Row>
                            <Col>
                                <div className="card flex justify-content-center">
                                    <Dropdown
                                        value={dateFilterOption}
                                        onChange={handleDateFilterOptionChange}
                                        options={dateFilterOptions}
                                        optionLabel="name"
                                        placeholder="Select Date Filter"
                                        className="w-full md:w-20rem"
                                    />
                                </div>
                                {dateFilterOption === 'custom' && (
                                    <div className="card flex justify-content-center">
                                        <Calendar
                                            value={customDateRange.start}
                                            onChange={(e) => handleCustomDateChange(e, 'start')}
                                            dateFormat="yy-mm-dd"
                                            placeholder="Start Date"
                                            className="w-full md:w-20rem"
                                        />
                                        <Calendar
                                            value={customDateRange.end}
                                            onChange={(e) => handleCustomDateChange(e, 'end')}
                                            dateFormat="yy-mm-dd"
                                            placeholder="End Date"
                                            className="w-full md:w-20rem"
                                        />
                                    </div>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}>
                                <div className="user-topbtn">
                                    {true && <Button onClick={userCreateOpen} label="Add Users" style={{ fontSize: '12px' }} className="user-users w-100" disabled={planconts === plancount} icon="pi pi-user-plus" />}
                                </div>
                            </Col>
                            <Col md={3}>
                                <div className="w-100"><Button onClick={() => setPermissionShow(!permissionsShow)} style={{ fontSize: '12px' }} label="Add Permission" className="permisson-user" icon="pi pi-user-plus" /></div>
                            </Col>
                            <Col md={2}>
                                <div className="dropdown-container">
                                    {userPermissions?.User?.canCreate && (
                                        <Button className="permisson-user user-export w-100" onClick={toggleDropdown}>
                                            <span className="iconssss">
                                                <CiExport />
                                            </span>
                                            <span> Export </span>
                                        </Button>
                                    )}
                                    <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
                                        {exportOptions.map((option, idx) => (
                                            <Button key={idx} label={option.label} icon={option.icon} onClick={option.command} className="export-button fw-1" />
                                        ))}
                                    </div>
                                </div>
                            </Col>
                            <Col md={2}>
                                <Button className="permisson-user user-export w-100" onClick={() => document.getElementById('importInput').click()}>
                                    <CiImport className="icon m-2" /> <span> Import</span>
                                </Button>
                                <input id="importInput" type="file" style={{ display: 'none' }} accept=".xlsx, .xls" onChange={handleImport} />
                            </Col>
                            <Col md={2}>
                                <div className='d-flex'>
                                    <Button icon="pi pi-list" onClick={() => setView('table')} className={`view-button ${view === 'table' ? 'active' : ''}`} />
                                    <Button icon="pi pi-th-large" onClick={() => setView('grid')} className={`view-button ${view === 'grid' ? 'active' : ''}`} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>

            <UserTable filteredUsers={filteredUsers} loading={loading} view={view}  />
        </div>
    );
};

export default EditableUsers;
