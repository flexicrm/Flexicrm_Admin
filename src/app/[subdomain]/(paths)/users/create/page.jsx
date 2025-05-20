'use client';
import { useState, useEffect, useRef, useContext } from 'react';
import * as yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { Card, Col, Row } from 'react-bootstrap';
import { Button } from 'primereact/button';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import { Checkbox } from 'primereact/checkbox';
import { InputMask } from 'primereact/inputmask';
import { useFormik } from 'formik';
import { Toast } from 'primereact/toast';
import { useSelector } from 'react-redux';
import '../users.scss';
import { InputSwitch } from 'primereact/inputswitch';
import { useRouter } from 'next/navigation';
// import { API_BASE_URL } from '../../../../utils';
import userContext from '../../../../UseContext/UseContext';
import axiosInstance from "../../../../../../axiosConfig"

const PermissionSection = ({ section, permissionData, updatePermissions }) => (
    <Col md={3}>
        <strong className="m-2">{section}</strong>
        {Object.entries(permissionData).map(([permission, value]) => (
            <div key={permission} className="d-flex align-items-center mt-2">
                <InputSwitch
                    id={`${section}_${permission}`}
                    checked={value}
                    onChange={(e) => updatePermissions(section, permission, e.value)}
                    style={{
                        color: value ? 'rgba(10, 45, 90, 0.966)' : 'white',
                        // border: '1px solid rgba(10, 45, 90, 0.966)',
                    }}
                />
                <label htmlFor={`${section}_${permission}`} className="ms-2">
                    {permission.charAt(0).toUpperCase() + permission.slice(1)}
                </label>
            </div>
        ))}
    </Col>
);


export default function Users() {
    const formik = useFormik({
        initialValues: {
            firstname: '',
            lastname: '',
            mobile: '',
            email: '',
            userRole: '',
            salaryPerMonth: '',
            address: {
                street: '',
                city: '',
                state: '',
                zipCode: '',
                country: ''
            }
        },
        validationSchema: yup.object({
            firstname: yup.string().required('Firstname is required'),
            lastname: yup.string().required('Lastname is required'),
            mobile: yup.string().required('Mobile must be in the format +91 followed by 10 digits'),
            // .matches(/^\+91\d{10}$/, ''),
            email: yup.string().email('Invalid email').required('Email is required'),
            userRole: yup.string().required('User role is required'),
            salaryPerMonth: yup.string().required('Salary per month is required'),
            address: yup.object({
                street: yup.string().required('Street is required'),
                city: yup.string().required('City is required'),
                state: yup.string().required('State is required'),
                zipCode: yup.string().required('Zip code is required'),
                country: yup.string().required('Country is required')
            })
        }),
        onSubmit: (values) => {
            handleSubmit(values);
        }
    });
    const a = useSelector((state) => console.log(state, 'state>>>>>>>>>>>>>>>>>'));
    const [subdomain, setSubdomain] = useState(null);
    const [show, setShow] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [userRoles, setUserRoles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [permissionsShow, setPermissionShow] = useState(false);
    const [permissions, setPermissions] = useState({});
    const [usersList, setUsersList] = useState([]);
    const [plancount, setPlancount] = useState([]);
    const [loading, setLoading] = useState(false);
    const [usersfetch, setUserfetch] = useState([]);
    const accessToken = Cookies.get('accessToken');
    const { data } = useContext(userContext);
    const [usertop, setUsertop] = useState([]);
    // console.log(plancount,"data")
    const planconts = data?.company?.plan.number_of_users;
    // console.log(planconts,"planconts")
    const router = useRouter()
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
            // const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axiosInstance.get(`/user/${cookieSubdomain2}`);
            setUsersList(response.data.data.users);
            setPlancount(response?.data?.data?.totalUsers);
            setUsertop(response?.data?.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleShow = () => {
        if (planconts === totalUsers) {
            return; // Do not show the modal if plan count is reached
        }
        setShow(!show);
    };

    const handleSubmit = async (values) => {
        setUploading(true);
        // const headers = { Authorization: `Bearer ${accessToken}` };

        const userData = {
            firstname: values.firstname,
            lastname: values.lastname,
            mobile: values.mobile,
            email: values.email,
            userRole: values.userRole,
            address: values.address,
            salaryPerMonth: values.salaryPerMonth,
            permissions: Object.entries(permissions).reduce((acc, [section, permissionData]) => {
                const filteredPermissions = Object.entries(permissionData).reduce((permAcc, [permission, value]) => {
                    if (value) {
                        permAcc[permission] = value;
                    }
                    return permAcc;
                }, {});

                if (Object.keys(filteredPermissions).length > 0) {
                    acc[section] = filteredPermissions;
                }

                return acc;
            }, {})
        };

        try {
            const response = await axiosInstance.post(`/user/${subdomain}/adduser`, userData, );
            // console.log("User added:", response.data);
            console.log(response);
            setUserfetch(response);
            toast.current.show({
                severity: 'success',
                summary: 'success',
                detail: 'User added successfully.'
            });

            handleShow();
            // await fetchUsers();
            router.push(`/${subdomain}/users`)
        } catch (error) {
            console.error('Error adding user:', error);
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'Message Content',
                life: 3000
            });
        } finally {
            setUploading(false);
        }
    };

    const fetchRoles = async () => {
        const cookieSubdomain2 = Cookies.get('subdomain');
        try {
            // const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axiosInstance.get(`/roleandpermission/${cookieSubdomain2}/all-roles`, );
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
            // const headers = { Authorization: `Bearer ${accessToken}` };
            const response = await axiosInstance.get(`/roleandpermission/${cookieSubdomain2}/getpermission?role=${role}`, );

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
    // const headerStyle = {
    //   backgroundColor: " rgba(10, 45, 90, 0.966)",
    //   color: "white",
    //   border:"none",
    //   borderRadius:"10px",

    // };


    return (
        <>
            <Toast ref={toast} />
            {loading && (


                <div className="mt-4">




                    <Row className="p-5">
                        <span className="d-flex">
                            <h5>Basic Details *</h5>
                            {/* <i className="pi pi-times ms-auto" style={{ fontSize: '1.5rem' }} onClick={handleShow}></i> */}
                        </span>

                        <Col md={4}>
                            <div>
                                <InputText
                                    value={formik.values.firstname}
                                    placeholder="First Name"
                                    className="w-100 mb-3"
                                    id="firstname"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} // Mark as touched on blur
                                />
                                {formik.touched.firstname && formik.errors.firstname && <div className="error-message">{formik.errors.firstname}</div>}
                            </div>
                        </Col>
                        <Col md={4}>
                            <div>
                                <InputText
                                    placeholder="Last Name"
                                    value={formik.values.lastname}
                                    className="w-100 mb-3"
                                    id="lastname"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} // Mark as touched on blur
                                />
                                {formik.touched.lastname && formik.errors.lastname && <div className="error-message">{formik.errors.lastname}</div>}
                            </div>
                        </Col>
                        <Col md={4}>
                            <div>
                                <InputMask
                                    className="mb-3 w-100"
                                    mask="+91-9999999999" // Input mask format
                                    placeholder="Mobile No."
                                    value={formik.values.mobile}
                                    id="mobile"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} // Mark as touched on blur
                                />
                                {formik.touched.mobile && formik.errors.mobile && <div className="error-message">{formik.errors.mobile}</div>}
                            </div>
                        </Col>
                        <Col md={4}>
                            <div>
                                <InputText
                                    className="w-100 mb-3"
                                    placeholder="Email"
                                    type="email"
                                    value={formik.values.email}
                                    id="email"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} // Mark as touched on blur
                                />
                                {formik.touched.email && formik.errors.email && <div className="error-message">{formik.errors.email}</div>}
                            </div>
                        </Col>

                        <Col md={4}>
                            <div>
                                <select
                                    // id="userRole"
                                    placeholder="User Role"
                                    className="p-inputtext p-component w-100 mb-3"
                                    value={formik.values.userRole}
                                    onChange={(e) => {
                                        formik.setFieldValue('userRole', e.target.value);
                                        setUserRole(e.target.value);
                                    }}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="" disabled>
                                        Select a role
                                    </option>
                                    {userRoles.map((role) => (
                                        <option key={role} value={role}>
                                            {role}
                                        </option>
                                    ))}
                                </select>
                                {formik.touched.userRole && formik.errors.userRole && <div className="error-message">{formik.errors.userRole}</div>}
                            </div>
                        </Col>

                        {Object.entries(formik.values.address).map(([key, value]) => (
                            <Col md={4} key={key}>
                                <div>
                                    <InputText
                                        className="w-100 mb-3"
                                        placeholder={`address.${key}`}
                                        value={formik.values.address[key]}
                                        id={`address.${key}`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} // Mark as touched on blur
                                    />
                                    {formik.touched.address?.[key] && formik.errors.address?.[key] && <div className="error-message">{formik.errors.address[key]}</div>}
                                </div>
                            </Col>
                        ))}

                        <Col md={4}>
                            <div>
                                <InputText
                                    className="w-100 mb-3"
                                    placeholder="Salary Per Month"
                                    value={formik.values.salaryPerMonth}
                                    id="salaryPerMonth"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur} // Mark as touched on blur
                                />
                                {formik.touched.salaryPerMonth && formik.errors.salaryPerMonth && <div className="error-message">{formik.errors.salaryPerMonth}</div>}
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Row className="p-5">
                            <h5>Permissions *</h5>
                            {permissions && Object.entries(permissions).length > 0 ? (
                                Object.entries(permissions).map(([section, permissionData]) => (
                                    <PermissionSection
                                        key={section}
                                        section={section}
                                        permissionData={permissionData}
                                        updatePermissions={(sec, perm, value) => {
                                            setPermissions((prev) => ({
                                                ...prev,
                                                [sec]: {
                                                    ...prev[sec],
                                                    [perm]: value
                                                }
                                            }));
                                        }}
                                    />
                                ))
                            ) : (
                                <p>No permissions available for the selected role.</p>
                            )}
                        </Row>
                        <Col className="mt-4 text-center">
                            <Button onClick={formik.handleSubmit} loading={uploading} className="btn-all">
                                Submit
                            </Button>
                        </Col>
                    </Row>


                </div>
            )}

        </>
    );
}
