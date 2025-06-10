// 'use client';
// import { usePathname, useRouter } from 'next/navigation';

// import React, { useEffect } from 'react';
// import Cookies from 'js-cookie';
// import { SubdmoainChekers } from '../../../api/SubdomainCheker';

// export default function DyanimcRouterpage() {
//     const location = usePathname();
//     const subdomain = Cookies.get('subdomain');
//     const crmaccess = Cookies.get('crmaccess');
//     const router = useRouter();

//     const fetchData = async () => {
//         const pathSegments = location.split('/').filter(Boolean);
//         const [location1, location2] = pathSegments;
//         try {
//             // const response = await axios.get(`${API_BASE_URL}/user/check-subdomain/${location1}`);
//             const response = await SubdmoainChekers(location1);
//             console.log(response, 'response');
//             if (response?.success) {
//                 alert('dyanimic');
//                 Cookies.set('subdomain', response.data.urlPath);
//                 // setFlexilogo(response.data);
//             }

//             if (response?.success && !crmaccess) {
//                 Cookies.set('subdomain', response.data.urlPath);
//                 router.push(`/${subdomain}/login`);
//             }
//         } catch (error) {
//             if (error.status == 404) {
//                 router.push(`/`);
//             }
//             throw new Error('Simulated client-side error!');

//             console.log(error, 'error');
//         }
//     };
//     useEffect(() => {
//         fetchData();
//     }, []);

//     return <div></div>;
// }
