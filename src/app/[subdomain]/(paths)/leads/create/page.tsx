// 'use client';
// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import LeadForm from './leadsForm';
// import Cookies from 'js-cookie';
// import { CustomerSingleGET } from '../../../../../../api/Customer';
// import { usersSingleGET } from '../../../../../../api/user';
// import { LeadPost } from '../../../../../../api/Leads';

// export default function LeadsCreate() {
//     const [customers, setCustomers] = useState([]);
//     const [users, setUsers] = useState([]);
//     const subdomain = Cookies.get('subdomain');
//     const fetchCustomers = useCallback(async () => {
//         // await fetchData(`/customer/${subdomain}`,
//         const response = await CustomerSingleGET(subdomain);

//         // (data) =>
//         setCustomers(response.data.customers || []);
//     }, [subdomain]);

//     const fetchProjects = useCallback(async () => {
//         // await fetchData(`/user/${subdomain}`,
//         const response = await usersSingleGET(subdomain);

//         setUsers(response.data.users || []);
//     }, [subdomain]);

//     const customerOptions = useMemo(
//         () =>
//             customers.map((customer) => ({
//                 label: customer.Companyname,
//                 value: customer._id
//             })),
//         [customers]
//     );

//     const UsersOptions = useMemo(
//         () =>
//             users.map((user) => ({
//                 label: user?.firstname,
//                 value: user?._id
//             })),
//         [users]
//     );
//     // const handleSubmit = useCallback(
//     //     async (values) => {

//     //     },
//     //     [subdomain]
//     // );

//     const handleSubmit = async (values) => {
//         try {
//             console.log(values, 'values>>>>>>>>>>>>>>>>>>>>>>>>');

//             // let response/;
//             // if (editingLead) {
//             //     response = await axios.patch(`${API_BASE_URL}/lead/${subdomain}/${editingLead.LeadId}`, values, { headers });
//             // } else {
//             // response = await axios.post(`${API_BASE_URL}/lead/offline/${subdomain}/addlead`, values, { headers });
//             const response = await LeadPost(subdomain, values);
//             // }

//             // setLeads((prevLeads) => {
//             //     if (editingLead) {
//             //         return prevLeads.map((lead) => (lead._id === editingLead._id ? response.data : lead));
//             //     } else {
//             //         return [...prevLeads, response.data];
//             //     }
//             // });
//             // setIsFormVisible(false);
//             // setEditingLead(null);
//             // fetchLeads();
//         } catch (error) {
//             // setError('An error occurred while saving the lead. Please try again.');
//         }
//     };
//     useEffect(() => {
//         fetchProjects();
//         fetchCustomers();
//     }, []);
//     return (
//         <div>
//             <LeadForm lead={null}  UsersOptions={UsersOptions} />
//         </div>
//     );
// }
"use client"
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import LeadForm from './leadsForm';
import Cookies from 'js-cookie';
import { CustomerSingleGET } from '../../../../../../api/Customer';
import { usersSingleGET } from '../../../../../../api/user';
import { LeadPost } from '../../../../../../api/Leads';

export default function LeadsCreate() {
    const [customers, setCustomers] = useState([]);
    const [users, setUsers] = useState([]);
    const subdomain = Cookies.get('subdomain');

    const fetchCustomers = useCallback(async () => {
        const response = await CustomerSingleGET(subdomain);
        setCustomers(response.data.customers || []);
    }, [subdomain]);

    const fetchProjects = useCallback(async () => {
        const response = await usersSingleGET(subdomain);
        setUsers(response.data.users || []);
    }, [subdomain]);

    const customerOptions = useMemo(
        () =>
            customers.map((customer) => ({
                label: customer.Companyname,
                value: customer._id
            })),
        [customers]
    );

    const UsersOptions = useMemo(
        () =>
            users.map((user) => ({
                label: user?.firstname,
                value: user?._id
            })),
        [users]
    );

    const handleSubmit = async (values) => {
        try {
            console.log(values, 'values>>>>>>>>>>>>>>>>>>>>>>>>');
            const response = await LeadPost(subdomain, values);
        } catch (error) {
            // Handle error
        }
    };

    useEffect(() => {
        fetchProjects();
        fetchCustomers();
    }, [fetchProjects, fetchCustomers]); // Include fetchProjects and fetchCustomers in the dependency array

    return (
        <div>
            <LeadForm lead={null} UsersOptions={UsersOptions} />
        </div>
    );
}
