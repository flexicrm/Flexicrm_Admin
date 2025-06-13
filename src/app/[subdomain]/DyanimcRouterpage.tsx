// // 'use client';
// // import { usePathname, useRouter } from 'next/navigation';

// // import React, { useEffect } from 'react';
// // import Cookies from 'js-cookie';
// // import { SubdmoainChekers } from '../../../api/SubdomainCheker';

// // export default function DyanimcRouterpage() {
// //     const location = usePathname();
// //     const subdomain = Cookies.get('subdomain');
// //     const crmaccess = Cookies.get('crmaccess');
// //     const router = useRouter();

// //     const fetchData = async () => {
// //         const pathSegments = location.split('/').filter(Boolean);
// //         const [location1, location2] = pathSegments;
// //         if (location1 == undefined) {
// //             // alert("demo")
// //             throw new Error('Resource not found');
// //             //    isError: true, data: 'Resource not found' };
// //         }

// //         try {
// //             if (location1 != 'not-found') {
// //                 const response = await SubdmoainChekers(location1);
// //                 console.log(response, 'response');
// //                 if (response?.success) {
// //                     alert('dyanimic');
// //                     Cookies.set('subdomain', response.data.urlPath);
// //                     // setFlexilogo(response.data);
// //                 }

// //                 if (response?.success && !crmaccess) {
// //                     Cookies.set('subdomain', response.data.urlPath);
// //                     router.push(`/${subdomain}/login`);
// //                 }
// //             }
// //             // const response = await axios.get(`${API_BASE_URL}/user/check-subdomain/${location1}`);
// //         } catch (error) {
// //             if (error.status == 404) {
// //                 // router.push(`/`);
// //             }
// //             throw new Error('Simulated client-side error!');

// //             console.log(error, 'error');
// //         }
// //     };
// //     useEffect(() => {
// //         fetchData();
// //     }, []);

// //     return <div></div>;
// // }
// 'use client';

// import { useEffect } from 'react';
// import { usePathname, useRouter } from 'next/navigation';
// import Cookies from 'js-cookie';

// export const DyanimcRouterpage = () => {
//     const pathname = usePathname();
//     const router = useRouter();

//     const subdomainCookie = Cookies.get('subdomain');
//     const crmaccess = Cookies.get('crmaccess');

//     const pathSegments = pathname?.split('/').filter(Boolean);
//     const location0 = pathSegments?.[0]; // subdomain
//     const location1 = pathSegments?.[1]; // login, forgot-password, reset-password

//     const publicPaths = ['login', 'forgot-password', 'reset-password'];

//     const isCorrectSubdomain = location0 === subdomainCookie;
//     const isPublicPath = isCorrectSubdomain && publicPaths.includes(location1);

//     useEffect(() => {
//         if (!subdomainCookie) return; // Can't redirect reliably without subdomain

//         const loginPath = `/${subdomainCookie}/login`;
//         const dashboardPath = `/${subdomainCookie}/dashboard`;

//         // ✅ Case 1: Not logged in
//         if (!crmaccess) {
//             // Allow only public pages within correct subdomain
//             if (!isPublicPath) {
//                 router.push(loginPath);
//             }
//             return;
//         }

//         // ✅ Case 2: Logged in
//         if (crmaccess) {
//             // Block access to login/forgot/reset pages
//             if (isPublicPath) {
//                 router.push(dashboardPath);
//             }
//         }
//     }, [crmaccess, subdomainCookie, pathname, isPublicPath, router]);
// };
