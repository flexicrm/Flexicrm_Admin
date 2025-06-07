// // "use client";
// // import { useContext, useEffect, useRef, useState } from "react";
// // import { API_BASE_URL } from "@/app/utils";
// // import axios from "axios";
// // import { Menu } from "primereact/menu";
// // import { Button } from "primereact/button";
// // import { useRouter } from "next/navigation";
// // import Cookies from "js-cookie";
// // import Link from "next/link";
// // import { FiMenu, FiX } from "react-icons/fi";
// // import "../navbar/navbar.css";
// // import userContext from "@/app/UseContext/UseContext";
// // import { Badge } from "primereact/badge";

// // export default function Navbar({ isOpen, toggleSidebar, data }) {
// //   const menuLeft = useRef(null);
// //   const router = useRouter();
// //   const [showSearch, setShowSearch] = useState(false);
// //   const [datas, setData] = useState([]);
// //   const [notifications, setNotifications] = useState([]);
// //   const [showNotifications, setShowNotifications] = useState(false);
// //   const accessToken = Cookies.get("accessToken");
// //   const subdomain = Cookies.get("subdomain");
// //   const { singledata } = useContext(userContext);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const headers = { Authorization: `Bearer ${accessToken}` };
// //         // const response = await axios.get(`${API_BASE_URL}/activity/${subdomain}`, { headers });
// //         const response = await axios.get(
// //           `${API_BASE_URL}/activity/own/activity/${subdomain}`,
// //           { headers }
// //         );
// //         console.log(response);
// //         setData(response.data.data.activities);
// //         setNotifications(response.data.data.activities || []);
// //       } catch (error) {
// //         console.error("Error fetching data:", error);
// //       }
// //     };

// //     fetchData();
// //   }, [subdomain, accessToken]);

// //   const handleLogOff = () => {
// //     Cookies.remove("refreshToken");
// //     router.push(`/${subdomain}/login`);
// //   };

// //   const markNotificationAsRead = async (id) => {
// //     try {
// //       const headers = { Authorization: `Bearer ${accessToken}` };
// //       await axios.patch(
// //         `${API_BASE_URL}/activity/${subdomain}/markasread?id=${id}`,
// //         null,
// //         { headers }
// //       );
// //       setNotifications((prev) =>
// //         prev.filter((notification) => notification._id !== id)
// //       );
// //     } catch (error) {
// //       console.error("Error marking notification as read:", error);
// //     }
// //   };

// //   const markAllAsRead = async () => {
// //     try {
// //       const headers = { Authorization: `Bearer ${accessToken}` };
// //       await axios.patch(
// //         `${API_BASE_URL}/activity/${subdomain}/markasread`,
// //         null,
// //         { headers }
// //       );
// //       setNotifications([]);
// //     } catch (error) {
// //       console.error("Error marking all notifications as read:", error);
// //     }
// //   };

// //   const items = [
// //     {
// //       items: [
// //         {
// //           label: "Profile",
// //           template: () => (
// //             <div className="profile-menu-item ms-3" onClick={handleProfile}>
// //               <img
// //                 src={data.Profile}
// //                 alt="Profile"
// //                 width="24px"
// //                 style={{ borderRadius: "50%" }}
// //               />
// //               Profile
// //             </div>
// //           ),
// //         },
// //         {
// //           label: "Settings",
// //           icon: "pi pi-cog",
// //           command: () => router.push("settings"),
// //         },
// //         {
// //           label: "Messages",
// //           icon: "pi pi-bell",
// //           badge: notifications.filter((n) => !n.notificationRead).length,
// //         },
// //         {
// //           label: "Logout",
// //           icon: "pi pi-sign-out",
// //           command: handleLogOff,
// //         },
// //       ],
// //     },
// //   ];

// //   const handleProfile = () => {
// //     router.push(`profile`);
// //   };

// //   const toggleNotificationDropdown = () => {
// //     setShowNotifications((prev) => !prev);
// //   };

// //   const unreadNotifications = notifications.filter((n) => !n.notificationRead);
// //   const unreadCount = unreadNotifications.length;

// //   return (
// //     <div className="navbar-main-nav">
// //       <nav className="navbar">
// //         <div className="d-flex">
// //           <Link href="profile">
// //             <img
// //               src={data.Profile}
// //               alt="Company Logo"
// //               width="50px"
// //               style={{ borderRadius: "50%" }}
// //             />
// //           </Link>
// //           <span className="m-3 fw-bold">
// //             {data?.company?.companyName || "null"}
// //           </span>
// //         </div>
// //         <div className="navbar-topbar d-flex">
// //           <div className="topbar-search d-flex">
// //             {showSearch && (
// //               <div className="search-input-wrapper">
// //                 <span className="p-input-icon-right">
// //                   <input
// //                     className="p-inputtext p-component searchInput"
// //                     placeholder="Search"
// //                     type="text"
// //                   />
// //                   <i className="pi pi-search"></i>
// //                 </span>
// //               </div>
// //             )}
// //           </div>

// //           <div
// //             style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
// //             id="sidebar-slide"
// //           >
// //             <button
// //               onClick={toggleSidebar}
// //               aria-label="Toggle Sidebar"
// //               className="sidebar-toggle"
// //             >
// //               {isOpen ? <FiX className="fs-4" /> : <FiMenu className="fs-4" />}
// //             </button>
// //           </div>

// //           <div className="profile-navbar me-4">
// //             <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />{" "}
// //             <i
// //               className="pi pi-bell p-overlay-badge me-4"
// //               style={{ fontSize: "1.3rem" }}
// //               onClick={toggleNotificationDropdown}
// //             >
// //               {unreadCount > 0 && <Badge value={unreadCount}></Badge>}
// //             </i>
// //             <Button
// //               icon="pi pi-align-left"
// //               style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
// //               onClick={(event) => menuLeft.current.toggle(event)}
// //               aria-controls="popup_menu_left"
// //               aria-haspopup
// //             />
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Notification Dropdown */}
// //       {showNotifications && (
// //         <div className="notification-dropdown" id="notification_dropdown">
// //           {unreadNotifications.length > 0 ? (
// //             <>
// //               <Button
// //                 icon="pi pi-check"
// //                 className="mark-all-read"
// //                 label="Mark All as Read"
// //                 onClick={markAllAsRead}
// //                 aria-label="Mark All as Read"
// //               />
// //               {/* {unreadNotifications.map((notification) => (
// //                 <div key={notification._id} className="notification-item">
// //                   <p>{notification.description}</p>
// //                   <small>
// //                     {new Date(notification.timestamp).toLocaleString()}
// //                   </small>
// //                   <small>{notification.entityType}</small>
// //                   <Button
// //                     icon="pi pi-check"
// //                     className="text-end"
// //                     style={{ width: "20px", height: "20px" }}
// //                     onClick={() => markNotificationAsRead(notification._id)}
// //                     aria-label="Mark as Read"
// //                   />
// //                 </div>
// //               ))} */}
// //               {unreadNotifications.map((notification) => (
// //                 <div
// //                   key={notification._id}
// //                   className={`notification-item ${
// //                     notification.notificationRead ? "visited" : "unvisited"
// //                   }`}
// //                 >
// //                   <p>{notification.description}</p>
// //                   <small>
// //                     {new Date(notification.timestamp).toLocaleString()}
// //                   </small>
// //                   <Button
// //                     icon="pi pi-check"
// //                     className="text-end"
// //                     style={{ width: "20px", height: "20px" }}
// //                     onClick={() => markNotificationAsRead(notification._id)}
// //                     aria-label="Mark as Read"
// //                   />
// //                 </div>
// //               ))}
// //             </>
// //           ) : (
// //             <p>No notifications</p>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }
// "use client";
// import { useContext, useEffect, useRef, useState } from "react";
// // import { API_BASE_URL } from "@/app/utils";
// import axios from "axios";
// import { Menu } from "primereact/menu";
// import { Button } from "primereact/button";
// import { useRouter } from "next/navigation";
// import Cookies from "js-cookie";
// import Link from "next/link";
// import { FiMenu, FiX } from "react-icons/fi";
// import "../navbar/navbar.css";
// // import userContext from "@/app/UseContext/UseContext";
// import { Badge } from "primereact/badge";
// import { API_BASE_URL } from "../../../utils";
// import userContext from "../../../UseContext/UseContext";

// export default function Navbar({ isOpen, toggleSidebar,  }) {
//   const menuLeft = useRef(null);
//   const router = useRouter();
//   const [showSearch, setShowSearch] = useState(false);
//   const [datas, setData] = useState([]);
//   const [notifications, setNotifications] = useState([]);
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [countVisible, setCountVisible] = useState(true);
//   const accessToken = Cookies.get("accessToken");
//   const subdomain = Cookies.get("subdomain");
//   const { data } = useContext(userContext);
//   // console.log(data,"data")

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const headers = { Authorization: `Bearer ${accessToken}` };
//         const response = await axios.get(
//           `${API_BASE_URL}/activity/own/activity/${subdomain}`,
//           { headers }
//         );
//         // console.log(response);
//         setData(response.data.data.activities);
//         setNotifications(response?.data?.data?.activities || []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [subdomain, accessToken]);

//   const handleLogOff = () => {
//     Cookies.remove("refreshToken");
//     router.push(`/${subdomain}/login`);
//   };

//   const markNotificationAsRead = async (_id) => {

//     try {
//       const headers = { Authorization: `Bearer ${accessToken}` };
//       await axios.patch(
//         `${API_BASE_URL}/activity/${subdomain}/markasread?id=${_id}`,
//         null,
//         { headers }
//       );
//       // setNotifications((prev) =>
//       //   prev.filter((notification) => notification._id !== id)
//       // );
//     } catch (error) {
//       console.error("Error marking notification as read:", error);
//     }
//   };

//   const markAllAsRead = async () => {
//     try {
//       const headers = { Authorization: `Bearer ${accessToken}` };
//       await axios.patch(
//         `${API_BASE_URL}/activity/${subdomain}/markasread`,
//         null,
//         { headers }
//       );
//       setNotifications([]);
//     } catch (error) {
//       console.error("Error marking all notifications as read:", error);
//     }
//   };

//   const items = [
//     {
//       items: [
//         {
//           label: "Profile",
//           template: () => (
//             <div className="profile-menu-item ms-3" onClick={handleProfile}>
//               <img
//                 src={data?.Profile}
//                 alt="Profile"
//                 width="24px"
//                 style={{ borderRadius: "50%" }}
//               />
//               Profile
//             </div>
//           ),
//         },
//         {
//           label: "Settings",
//           icon: "pi pi-cog",
//           command: () => router?.push("settings"),
//         },
//         {
//           label: "Messages",
//           icon: "pi pi-bell",
//           badge: notifications?.filter((n) => !n?.notificationRead).length,
//         },
//         {
//           label: "Logout",
//           icon: "pi pi-sign-out",
//           command: handleLogOff,
//         },
//       ],
//     },
//   ];

//   const handleProfile = () => {
//     router.push(`/${subdomain}/profile`);
//   };

//   const toggleNotificationDropdown = () => {
//     setShowNotifications((prev) => {
//       if (!prev) {
//         setCountVisible(false); // Hide the count when notifications are viewed
//       }
//       return !prev;
//     });
//   };

//   const unreadNotifications = notifications?.filter((n) => !n?.notificationRead);
//   const unreadCount = unreadNotifications?.length;

//   return (
//     <div className="navbar-main-nav">
//       <nav className="navbar">
//         <div className="d-flex">
//           <Link href="profile">
//             <img
//               src={data?.Profile}
//               alt="Company Logo"
//               width="50px"
//               style={{ borderRadius: "50%" }}
//             />
//           </Link>
//           <span className="m-3 fw-bold text-white">
//             {data?.company?.companyName || "null"}
//           </span>
//         </div>
//         <div className="navbar-topbar d-flex">
//           <div className="topbar-search d-flex">
//             {showSearch && (
//               <div className="search-input-wrapper">
//                 <span className="p-input-icon-right">
//                   <input
//                     className="p-inputtext p-component searchInput"
//                     placeholder="Search"
//                     type="text"
//                   />
//                   <i className="pi pi-search"></i>
//                 </span>
//               </div>
//             )}
//           </div>

//           <div
//             style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
//             id="sidebar-slide"
//           >
//             <button
//               onClick={toggleSidebar}
//               aria-label="Toggle Sidebar"
//               className="sidebar-toggle"
//             >
//               {isOpen ? <FiX className="fs-4" /> : <FiMenu className="fs-4" />}
//             </button>
//           </div>

//           <div className="profile-navbar me-4">
//             <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />
//             <i
//               className="pi pi-bell p-overlay-badge me-4 text-white"
//               style={{ fontSize: "1.3rem" }}
//               onClick={toggleNotificationDropdown}
//             >
//               {countVisible && unreadCount > 0 && (
//                 <Badge value={unreadCount}></Badge>
//               )}
//             </i>

//             <Button

//               icon="pi pi-align-left"
//               style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
//               onClick={(event) => menuLeft.current.toggle(event)}
//               aria-controls="popup_menu_left"
//               aria-haspopup
//             />
//           </div>
//         </div>
//       </nav>

//       {/* Notification Dropdown */}
//       {showNotifications && (
//         <div className="notification-dropdown" id="notification_dropdown">
//           {unreadNotifications?.length > 0 ? (
//             <>
//               <Button
//                 icon="pi pi-check"
//                 className="mark-all-read"
//                 label="Mark All as Read"
//                 onClick={markAllAsRead}
//                 aria-label="Mark All as Read"
//               />
//               {unreadNotifications?.map((notification) => (
//                 <div
//                   key={notification._id}
//                   className={`notification-item ${notification?.notificationRead ? 'visited' : 'unvisited'}`}
//                 >
//                   <p>{notification?.description}</p>
//                   <small>{new Date(notification?.timestamp).toLocaleString()}</small>
//                   <Button
//                     icon="pi pi-check"
//                     className="text-end"
//                     style={{ width: "20px", height: "20px" }}
//                     // onClick={() => markNotificationAsRead( alert("no data"))}
//                     onClick={() => markNotificationAsRead(notification?._id)}
//                     aria-label="Mark as Read"
//                   />
//                 </div>
//               ))}
//             </>
//           ) : (
//             <p>No notifications</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }
// 'use client';
// import { useContext, useEffect, useRef, useState } from 'react';
// import axios from 'axios';
// import { Menu } from 'primereact/menu';
// import { Button } from 'primereact/button';
// import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie';
// import Link from 'next/link';
// import { FiMenu, FiX } from 'react-icons/fi';
// import '../navbar/navbar.css';

// import { API_BASE_URL } from '../../../utils';
// import userContext from '../../../UseContext/UseContext';
// import { ThemeSwitcher } from '../../../Theme/ThemeSwitcher';
// import { Box } from '@mui/material';

// export default function Navbar({ isOpen, toggleSidebar }: any) {
//     const menuLeft = useRef(null);
//     const menuNotifications = useRef(null);
//     const router = useRouter();
//     const [showSearch, setShowSearch] = useState(false);
//     const [datas, setData] = useState([]);
//     const [notifications, setNotifications] = useState([]);
//     const [showNotifications, setShowNotifications] = useState(false);
//     const [countVisible, setCountVisible] = useState(true);
//     const accessToken = Cookies.get('accessToken');
//     const subdomain = Cookies.get('subdomain');
//     const contextValue = useContext(userContext);
//     console.log('Context Value:', contextValue);
//     const { data } = contextValue || { data: {} };

//     const [loading, serLoading] = useState(false);

//     useEffect(() => {
//         serLoading(true);
//         const fetchData = async () => {
//             try {
//                 const headers = { Authorization: `Bearer ${accessToken}` };
//                 const response = await axios.get(`${API_BASE_URL}/activity/own/activity/${subdomain}`, { headers });
//                 setData(response.data.data.activities);
//                 setNotifications(response?.data?.data?.activities || []);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchData();
//     }, [subdomain, accessToken]);

//     const handleLogOff = () => {
//         Cookies.remove('refreshToken');
//         router.push(`/${subdomain}/login`);
//     };

//     const markNotificationAsRead = async (_id) => {
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             await axios.patch(`${API_BASE_URL}/activity/${subdomain}/markasread?id=${_id}`, null, { headers });
//         } catch (error) {
//             console.error('Error marking notification as read:', error);
//         }
//     };

//     const markAllAsRead = async () => {
//         try {
//             const headers = { Authorization: `Bearer ${accessToken}` };
//             await axios.patch(`${API_BASE_URL}/activity/${subdomain}/markasread`, null, { headers });
//             setNotifications([]);
//         } catch (error) {
//             console.error('Error marking all notifications as read:', error);
//         }
//     };

//     const items = [
//         {
//             items: [
//                 {
//                     label: 'Profile',
//                     template: () => (
//                         <div className="profile-menu-item ms-3" onClick={handleProfile}>
//                             <img src={data?.Profile} alt="Profile" width="24px" style={{ borderRadius: '50%' }} />
//                             Profile
//                         </div>
//                     )
//                 },
//                 {
//                     label: 'Settings',
//                     icon: 'pi pi-cog',
//                     command: () => router?.push('settings')
//                 },
//                 {
//                     label: 'Messages',
//                     icon: 'pi pi-bell',
//                     badge: notifications?.filter((n) => !n?.notificationRead).length
//                 },
//                 {
//                     label: 'Logout',
//                     icon: 'pi pi-sign-out',
//                     command: handleLogOff
//                 }
//             ]
//         }
//     ];

//     const notificationItems = [
//         {
//             items: [
//                 {
//                     label: 'Mark All as Read',
//                     icon: 'pi pi-check',
//                     command: markAllAsRead
//                 },
//                 ...notifications.map((notification) => ({
//                     label: notification.description,
//                     template: () => (
//                         <div className="notification-item">
//                             <p>{notification.description}</p>
//                             <small>{new Date(notification.timestamp).toLocaleString()}</small>
//                             <Button
//                                 icon="pi pi-check"
//                                 className="text-end"
//                                 style={{ width: '20px', height: '20px', background: 'white', border: 'none', color: 'black' }}
//                                 onClick={() => markNotificationAsRead(notification._id)}
//                                 aria-label="Mark as Read"
//                             />
//                         </div>
//                     )
//                 }))
//             ]
//         }
//     ];

//     const handleProfile = () => {
//         router.push(`/${subdomain}/profile`);
//     };

//     const toggleNotificationDropdown = (event) => {
//         menuNotifications.current.toggle(event);
//         setCountVisible(false); // Hide the count when notifications are viewed
//     };

//     const unreadNotifications = notifications?.filter((n) => !n?.notificationRead);
//     const unreadCount = unreadNotifications?.length;

//     return (
//         <>
//             {loading && (
//                 <div className="navbar-main-nav">
//                     <nav className="navbar">
//                         <div className="d-flex">
//                             <Link href="profile">
//                                 <img src={data?.Profile} alt="Company Logo" width="50px" style={{ borderRadius: '50%' }} />
//                             </Link>
//                             <span className="m-3 fw-bold text-white">{data?.company?.companyName || 'null'}</span>
//                         </div>
//                         <div className="navbar-topbar d-flex">
//                             <div className="topbar-search d-flex">
//                                 {showSearch && (
//                                     <div className="search-input-wrapper">
//                                         <span className="p-input-icon-right">
//                                             <input className="p-inputtext p-component searchInput" placeholder="Search" type="text" />
//                                             <i className="pi pi-search"></i>
//                                         </span>
//                                     </div>
//                                 )}
//                             </div>

//                             <div style={{ width: '2rem', height: '2rem', borderRadius: '50%' }} id="sidebar-slide">
//                                 <button onClick={toggleSidebar} aria-label="Toggle Sidebar" className="sidebar-toggle">
//                                     {isOpen ? <FiX className="fs-4" /> : <FiMenu className="fs-4" />}
//                                 </button>
//                             </div>
//                             <Box sx={{ display: 'flex ' }}>
//                                 <div className="profile-navbar me-4">
//                                     {/* <Menu model={items} popup ref={menuLeft} id="popup_menu_left" /> */}
//                                     {/* <i className="pi pi-bell p-overlay-badge me-4 text-white" style={{ fontSize: '1.3rem' }} onClick={toggleNotificationDropdown}>
//                                         {countVisible && unreadCount > 0 && <Badge value={unreadCount}></Badge>}
//                                     </i> */}
//                                     <Menu model={notificationItems} popup ref={menuNotifications} id="popup_menu_notifications" className="menu-hgfdjbfghdfdf" style={{ height: '80vh', width: '20%', overflowY: 'auto', paddingLeft: '0px' }} />
//                                     <Button icon="pi pi-align-left" style={{ width: '2rem', height: '2rem', borderRadius: '50%' }} onClick={(event) => menuLeft.current.toggle(event)} aria-controls="popup_menu_left" aria-haspopup />
//                                 </div>
//                                 <ThemeSwitcher />
//                             </Box>
//                         </div>
//                     </nav>
//                 </div>
//             )}
//         </>
//     );
// }
// Navbar.tsx
'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

import { API_BASE_URL } from '../../../utils';
import userContext from '../../../UseContext/UseContext';
import { ThemeSwitcher } from '../../../Theme/ThemeSwitcher';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
    NavbarMainNav,
    Navbars,
    NavbarButton,
    ProfileImage,
    SearchInputWrapper,
    SearchInput,
    NotificationItem,
    NotificationBadge,
    MarkAllReadButton,
    NotificationDropdown,
    NotificationHeader,
    NotificationContent,
    NotificationFooter
} from './StyledComponents';

export default function Navbar({ isOpen, toggleSidebar }: any) {
    const menuLeft = useRef(null);
    const menuNotifications = useRef(null);
    const router = useRouter();
    // const [showSearch, setShowSearch] = useState(false);
    const [datas, setData] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [countVisible, setCountVisible] = useState(true);
    const accessToken = Cookies.get('crmaccess');
    const subdomain = Cookies.get('subdomain');
    const contextValue = useContext(userContext);
    console.log('Context Value:', contextValue);
    const { data } = contextValue || { data: {} };

    const [loading, setLoading] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                // const headers = { Authorization: `Bearer ${accessToken}` };
                // const response = await axios.get(`${API_BASE_URL}/activity/own/activity/${subdomain}`, { headers });
                // const response = '';
                // setData(response?.data?.data?.activities || '');
                // setNotifications(response?.data?.data?.activities || []);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [subdomain, accessToken]);

    const handleLogOff = () => {
        Cookies.remove('refreshToken');
        router.push(`/${subdomain}/login`);
    };

    const markNotificationAsRead = async (_id) => {
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            await axios.patch(`${API_BASE_URL}/activity/${subdomain}/markasread?id=${_id}`, null, { headers });
        } catch (error) {
            console.error('Error marking notification as read:', error);
        }
    };

    const markAllAsRead = async () => {
        try {
            const headers = { Authorization: `Bearer ${accessToken}` };
            await axios.patch(`${API_BASE_URL}/activity/${subdomain}/markasread`, null, { headers });
            setNotifications([]);
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    const notificationItems = [
        {
            items: [
                {
                    template: () => (
                        <NotificationDropdown>
                            <NotificationHeader>
                                <Typography variant="h6">Notifications</Typography>
                                {unreadCount > 0 && <MarkAllReadButton onClick={markAllAsRead}>Mark all as read</MarkAllReadButton>}
                            </NotificationHeader>
                            <Divider />
                            <NotificationContent>
                                {notifications.length === 0 ? (
                                    <Typography variant="body2" sx={{ p: 2, textAlign: 'center' }}>
                                        No notifications available
                                    </Typography>
                                ) : (
                                    notifications.map((notification) => (
                                        <NotificationItem key={notification._id} unread={!notification.notificationRead}>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant="body2">{notification.description}</Typography>
                                                <Typography variant="caption" color="textSecondary">
                                                    {new Date(notification.timestamp).toLocaleString()}
                                                </Typography>
                                            </Box>
                                            {!notification.notificationRead && (
                                                <IconButton size="small" onClick={() => markNotificationAsRead(notification._id)} aria-label="Mark as read">
                                                    <FiX size={14} />
                                                </IconButton>
                                            )}
                                        </NotificationItem>
                                    ))
                                )}
                            </NotificationContent>
                            <NotificationFooter>
                                <Button text label="View All Notifications" onClick={() => router.push(`/${subdomain}/notifications`)} />
                            </NotificationFooter>
                        </NotificationDropdown>
                    )
                }
            ]
        }
    ];

    const handleProfile = () => {
        router.push(`/${subdomain}/profile`);
    };

    const toggleNotificationDropdown = (event) => {
        menuNotifications.current.toggle(event);
        setCountVisible(false); // Hide the count when notifications are viewed
    };

    const unreadNotifications = notifications?.filter((n) => !n?.notificationRead);
    const unreadCount = unreadNotifications?.length;

    return (
        <>
            {loading && (
                <NavbarMainNav>
                    <Navbars sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            <Link href="profile">
                                <ProfileImage src={data?.Profile || '/image/Exclude.png'} alt="Company Logo" width="30px" />
                            </Link>
                            <span className="m-3 ms-1 fw-bold" style={{ color: theme.palette.primary.contrastText }}>
                                {data?.company?.companyName || ''}
                            </span>
                        </Box>
                        <div className="navbar-topbar d-flex">
                            {/* <SearchInputWrapper>
                                <SearchInput placeholder="Search" type="text" />
                            </SearchInputWrapper>
                            <div style={{ width: '2rem', height: '2rem', borderRadius: '50%' }} id="sidebar-slide">
                                <NavbarButton onClick={toggleSidebar} aria-label="Toggle Sidebar">
                                    {isOpen ? <FiX className="fs-4" /> : <FiMenu className="fs-4" />}
                                </NavbarButton>
                            </div> */}
                            <Box sx={{ display: 'flex' }}>
                                <div className="profile-navbar ">
                                    {/* <i className="pi pi-bell p-overlay-badge me-4" style={{ fontSize: '1.3rem', color: theme.palette.primary.contrastText }} onClick={toggleNotificationDropdown}>
                                        {countVisible && unreadCount > 0 && <NotificationBadge />}
                                    </i> */}
                                    {/* <Menu model={notificationItems} popup ref={menuNotifications} /> */}
                                    {/* <Button
                                        icon="pi pi-align-left"
                                        style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: theme.palette.primary.main, color: theme.palette.primary.contrastText }}
                                        onClick={(event) => menuLeft.current.toggle(event)}
                                        aria-controls="popup_menu_left"
                                        aria-haspopup
                                    /> */}
                                </div>
                                {/* <ThemeSwitcher /> */}
                            </Box>
                        </div>
                    </Navbars>
                </NavbarMainNav>
            )}
        </>
    );
}
