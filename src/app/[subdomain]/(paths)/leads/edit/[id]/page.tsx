// 'use client';
// import React, { useCallback, useEffect, useMemo, useState } from 'react';

// import Cookies from 'js-cookie';
// import { CustomerSingleGET } from '../../../../../../../api/Customer';
// import { usersSingleGET } from '../../../../../../../api/user';
// import LeadForm from '../../create/leadsForm';
// import { getLeadsByID } from '../../../../../../../api/Leads';
// import { useParams } from 'next/navigation';
// // import { CustomerSingleGET } from '../../../../../../api/Customer';
// // import { usersSingleGET } from '../../../../../../api/user';
// // import { LeadPost } from '../../../../../../api/Leads';

// export default function LeadsCreate() {
//     const { id } = useParams();
//     const [leads, setLeads] = useState([]);
//     const [users, setUsers] = useState([]);
//     const subdomain = Cookies.get('subdomain');
//     const fetchCustomers = useCallback(async () => {
//         // await fetchData(`/customer/${subdomain}`,
//         const response = await getLeadsByID(subdomain, id);
//         console.log(response, 'response');

//         // (data) =>
//         setLeads(response.data.lead || []);
//     }, [subdomain]);

//     const fetchProjects = useCallback(async () => {
//         // await fetchData(`/user/${subdomain}`,
//         const response = await usersSingleGET(subdomain);

//         setUsers(response.data.users || []);
//     }, [subdomain]);

//     // const customerOptions = useMemo(
//     //     () =>
//     //         customers.map((customer) => ({
//     //             label: customer.Companyname,
//     //             value: customer._id
//     //         })),
//     //     [customers]
//     // );

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
//             // const response = await LeadPost(subdomain, values);
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
//             <LeadForm lead={leads} UsersOptions={UsersOptions} />
//         </div>
//     );
// }
'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Cookies from 'js-cookie';
import { CustomerSingleGET } from '../../../../../../../api/Customer';
import { usersSingleGET } from '../../../../../../../api/user';
import LeadForm from '../../create/leadsForm';
import { getLeadsByID } from '../../../../../../../api/Leads';
import { useParams } from 'next/navigation';

export default function LeadsCreate() {
    const { id } = useParams();
    const [leads, setLeads] = useState([]);
    const [users, setUsers] = useState([]);
    const subdomain = Cookies.get('subdomain');

    const fetchCustomers = useCallback(async () => {
        const response = await getLeadsByID(subdomain, id);
        console.log(response, 'response');
        setLeads(response.data.lead || []);
    }, [subdomain, id]); // Added id to dependencies

    const fetchProjects = useCallback(async () => {
        const response = await usersSingleGET(subdomain);
        setUsers(response.data.users || []);
    }, [subdomain]);

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
            // Your submit logic here
        } catch (error) {
            // Error handling
        }
    };

    useEffect(() => {
        fetchProjects();
        fetchCustomers();
    }, [fetchCustomers, fetchProjects]); // Added missing dependencies

    return (
        <div>
            <LeadForm lead={leads} UsersOptions={UsersOptions} />
        </div>
    );
}
