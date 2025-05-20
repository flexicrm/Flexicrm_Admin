'use client';
import { useState, useEffect, useRef, useContext } from 'react';
import * as yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { Card, Col, Row } from 'react-bootstrap';
import { Button } from 'primereact/button';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import Permissions from './Permissions';
import AlldataUsers from './UserAlldata';
import { Checkbox } from 'primereact/checkbox';
import { InputMask } from 'primereact/inputmask';
import { useFormik } from 'formik';
// import { API_BASE_URL } from "@/app/utils";
import { Toast } from 'primereact/toast';
// import userContext from "@/app/UseContext/UseContext";
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../../../utils';
import userContext from '../../../UseContext/UseContext';
import './users.scss';

const PermissionSection = ({ section, permissionData, updatePermissions }) => (
    <Col md={3}>
        <strong className="m-2">{section}</strong>
        {Object.entries(permissionData).map(([permission, value]) => (
            <div key={permission}>
                <Checkbox className="mt-2" inputId={`${section}_${permission}`} checked={value} onChange={(e) => updatePermissions(section, permission, e.checked)} />
                <label htmlFor={`${section}_${permission}`} className="ms-2">
                    {permission.charAt(0).toUpperCase() + permission.slice(1)}
                </label>
            </div>
        ))}
    </Col>
);

export default function Users() {
   
    // const a = useSelector((state) => console.log(state, 'state>>>>>>>>>>>>>>>>>'));
    const [subdomain, setSubdomain] = useState(null);
 
    const [userRole, setUserRole] = useState('');
    const [userRoles, setUserRoles] = useState([]);
   
    const [permissionsShow, setPermissionShow] = useState(false);
    const [permissions, setPermissions] = useState({});
    const [usersList, setUsersList] = useState([]);
    const [plancount, setPlancount] = useState([]);
    const [loading, setLoading] = useState(false);
    const [usersfetch, setUserfetch] = useState([]);
    const accessToken = Cookies.get('accessToken');
    const { data } = useContext(userContext);
    const [usertop, setUsertop] = useState([]);
    // console.log(usertop,"data========================>")
    const planconts = data?.company?.plan.number_of_users;
    // console.log(planconts,"planconts")

    const toast = useRef(null);

    useEffect(() => {
        setLoading(true);
        const cookieSubdomain = Cookies.get('subdomain');
        setSubdomain(cookieSubdomain);
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const cookieSubdomain2 = Cookies.get('subdomain');
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axios.get(`${API_BASE_URL}/user/${cookieSubdomain2}`, { headers });
            setUsersList(response.data.data.users);
            setPlancount(response?.data?.data?.totalUsers);
            setUsertop(response?.data?.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleShow = () => {
        if (planconts === usertop?.totalUsers) {
            return; // Do not show the modal if plan count is reached
        }
        // setShow(!show);
    };

    

    const fetchRoles = async () => {
        const cookieSubdomain2 = Cookies.get('subdomain');
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axios.get(`${API_BASE_URL}/roleandpermission/${cookieSubdomain2}/all-roles`, { headers });
            setUserRoles(Array.isArray(response.data.data) ? response.data.data : []);
        } catch (error) {
            console.error(error.message);
        }
    };
    useEffect(() => {
        fetchRoles();
    }, [accessToken]);

    const fetchPermissions = async (role) => {
        const cookieSubdomain2 = Cookies.get('subdomain');
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axios.get(`${API_BASE_URL}/roleandpermission/${cookieSubdomain2}/getpermission?role=${role}`, { headers });

            if (response.data.data) {
                setPermissions(response.data.data);
            } else {
                setPermissions({});
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        if (userRole) {
            fetchPermissions(userRole);
        }
    }, [userRole]);
    
    return (
        <>
            <Toast ref={toast} />
    

            <AlldataUsers
                usertop={usertop}
                usersfetch={usersfetch}
                handleShow={handleShow}
                users={usersList}
                subdomain={subdomain}
                accessToken={accessToken}
                plancount={plancount}
                planconts={planconts}
                permissionsShow={permissionsShow}
                setPermissionShow={setPermissionShow}
                fetchUsers={fetchUsers}
                userRoles={userRoles}
            />
            <Permissions permissionsShow={permissionsShow} fetchRoles={fetchRoles} permissionsShows={() => setPermissionShow(!permissionsShow)} />
        </>
    );
}
