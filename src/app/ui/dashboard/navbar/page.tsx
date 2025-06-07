// // // "use client";
// // // import { useContext, useEffect, useRef, useState } from "react";
// // // import { API_BASE_URL } from "@/app/utils";
// // // import axios from "axios";
// // // import { Menu } from "primereact/menu";
// // // import { Button } from "primereact/button";
// // // import { useRouter } from "next/navigation";
// // // import Cookies from "js-cookie";
// // // import Link from "next/link";
// // // import { FiMenu, FiX } from "react-icons/fi";
// // // import "../navbar/navbar.css";
// // // import userContext from "@/app/UseContext/UseContext";
// // // import { Badge } from "primereact/badge";

// // // export default function Navbar({ isOpen, toggleSidebar, data }) {
// // //   const menuLeft = useRef(null);
// // //   const router = useRouter();
// // //   const [showSearch, setShowSearch] = useState(false);
// // //   const [datas, setData] = useState([]);
// // //   const [notifications, setNotifications] = useState([]);
// // //   const [showNotifications, setShowNotifications] = useState(false);
// // //   const accessToken = Cookies.get("accessToken");
// // //   const subdomain = Cookies.get("subdomain");
// // //   const { singledata } = useContext(userContext);

// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         const headers = { Authorization: `Bearer ${accessToken}` };
// // //         // const response = await axios.get(`${API_BASE_URL}/activity/${subdomain}`, { headers });
// // //         const response = await axios.get(
// // //           `${API_BASE_URL}/activity/own/activity/${subdomain}`,
// // //           { headers }
// // //         );
// // //         console.log(response);
// // //         setData(response.data.data.activities);
// // //         setNotifications(response.data.data.activities || []);
// // //       } catch (error) {
// // //         console.error("Error fetching data:", error);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, [subdomain, accessToken]);

// // //   const handleLogOff = () => {
// // //     Cookies.remove("refreshToken");
// // //     router.push(`/${subdomain}/login`);
// // //   };

// // //   const markNotificationAsRead = async (id) => {
// // //     try {
// // //       const headers = { Authorization: `Bearer ${accessToken}` };
// // //       await axios.patch(
// // //         `${API_BASE_URL}/activity/${subdomain}/markasread?id=${id}`,
// // //         null,
// // //         { headers }
// // //       );
// // //       setNotifications((prev) =>
// // //         prev.filter((notification) => notification._id !== id)
// // //       );
// // //     } catch (error) {
// // //       console.error("Error marking notification as read:", error);
// // //     }
// // //   };

// // //   const markAllAsRead = async () => {
// // //     try {
// // //       const headers = { Authorization: `Bearer ${accessToken}` };
// // //       await axios.patch(
// // //         `${API_BASE_URL}/activity/${subdomain}/markasread`,
// // //         null,
// // //         { headers }
// // //       );
// // //       setNotifications([]);
// // //     } catch (error) {
// // //       console.error("Error marking all notifications as read:", error);
// // //     }
// // //   };

// // //   const items = [
// // //     {
// // //       items: [
// // //         {
// // //           label: "Profile",
// // //           template: () => (
// // //             <div className="profile-menu-item ms-3" onClick={handleProfile}>
// // //               <img
// // //                 src={data.Profile}
// // //                 alt="Profile"
// // //                 width="24px"
// // //                 style={{ borderRadius: "50%" }}
// // //               />
// // //               Profile
// // //             </div>
// // //           ),
// // //         },
// // //         {
// // //           label: "Settings",
// // //           icon: "pi pi-cog",
// // //           command: () => router.push("settings"),
// // //         },
// // //         {
// // //           label: "Messages",
// // //           icon: "pi pi-bell",
// // //           badge: notifications.filter((n) => !n.notificationRead).length,
// // //         },
// // //         {
// // //           label: "Logout",
// // //           icon: "pi pi-sign-out",
// // //           command: handleLogOff,
// // //         },
// // //       ],
// // //     },
// // //   ];

// // //   const handleProfile = () => {
// // //     router.push(`profile`);
// // //   };

// // //   const toggleNotificationDropdown = () => {
// // //     setShowNotifications((prev) => !prev);
// // //   };

// // //   const unreadNotifications = notifications.filter((n) => !n.notificationRead);
// // //   const unreadCount = unreadNotifications.length;

// // //   return (
// // //     <div className="navbar-main-nav">
// // //       <nav className="navbar">
// // //         <div className="d-flex">
// // //           <Link href="profile">
// // //             <img
// // //               src={data.Profile}
// // //               alt="Company Logo"
// // //               width="50px"
// // //               style={{ borderRadius: "50%" }}
// // //             />
// // //           </Link>
// // //           <span className="m-3 fw-bold">
// // //             {data?.company?.companyName || "null"}
// // //           </span>
// // //         </div>
// // //         <div className="navbar-topbar d-flex">
// // //           <div className="topbar-search d-flex">
// // //             {showSearch && (
// // //               <div className="search-input-wrapper">
// // //                 <span className="p-input-icon-right">
// // //                   <input
// // //                     className="p-inputtext p-component searchInput"
// // //                     placeholder="Search"
// // //                     type="text"
// // //                   />
// // //                   <i className="pi pi-search"></i>
// // //                 </span>
// // //               </div>
// // //             )}
// // //           </div>

// // //           <div
// // //             style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
// // //             id="sidebar-slide"
// // //           >
// // //             <button
// // //               onClick={toggleSidebar}
// // //               aria-label="Toggle Sidebar"
// // //               className="sidebar-toggle"
// // //             >
// // //               {isOpen ? <FiX className="fs-4" /> : <FiMenu className="fs-4" />}
// // //             </button>
// // //           </div>

// // //           <div className="profile-navbar me-4">
// // //             <Menu model={items} popup ref={menuLeft} id="popup_menu_left" />{" "}
// // //             <i
// // //               className="pi pi-bell p-overlay-badge me-4"
// // //               style={{ fontSize: "1.3rem" }}
// // //               onClick={toggleNotificationDropdown}
// // //             >
// // //               {unreadCount > 0 && <Badge value={unreadCount}></Badge>}
// // //             </i>
// // //             <Button
// // //               icon="pi pi-align-left"
// // //               style={{ width: "2rem", height: "2rem", borderRadius: "50%" }}
// // //               onClick={(event) => menuLeft.current.toggle(event)}
// // //               aria-controls="popup_menu_left"
// // //               aria-haspopup
// // //             />
// // //           </div>
// // //         </div>
// // //       </nav>

// // //       {/* Notification Dropdown */}
// // //       {showNotifications && (
// // //         <div className="notification-dropdown" id="notification_dropdown">
// // //           {unreadNotifications.length > 0 ? (
// // //             <>
// // //               <Button
// // //                 icon="pi pi-check"
// // //                 className="mark-all-read"
// // //                 label="Mark All as Read"
// // //                 onClick={markAllAsRead}
// // //                 aria-label="Mark All as Read"
// // //               />
// // //               {/* {unreadNotifications.map((notification) => (
// // //                 <div key={notification._id} className="notification-item">
// // //                   <p>{notification.description}</p>
// // //                   <small>
// // //                     {new Date(notification.timestamp).toLocaleString()}
// // //                   </small>
// // //                   <small>{notification.entityType}</small>
// // //                   <Button
// // //                     icon="pi pi-check"
// // //                     className="text-end"
// // //                     style={{ width: "20px", height: "20px" }}
// // //                     onClick={() => markNotificationAsRead(notification._id)}
// // //                     aria-label="Mark as Read"
// // //                   />
// // //                 </div>
// // //               ))} */}
// // //               {unreadNotifications.map((notification) => (
// // //                 <div
// // //                   key={notification._id}
// // //                   className={`notification-item ${
// // //                     notification.notificationRead ? "visited" : "unvisited"
// // //                   }`}
// // //                 >
// // //                   <p>{notification.description}</p>
// // //                   <small>
// // //                     {new Date(notification.timestamp).toLocaleString()}
// // //                   </small>
// // //                   <Button
// // //                     icon="pi pi-check"
// // //                     className="text-end"
// // //                     style={{ width: "20px", height: "20px" }}
// // //                     onClick={() => markNotificationAsRead(notification._id)}
// // //                     aria-label="Mark as Read"
// // //                   />
// // //                 </div>
// // //               ))}
// // //             </>
// // //           ) : (
// // //             <p>No notifications</p>
// // //           )}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// 'use client';
// import React, { useContext } from 'react';
// import Link from 'next/link';
// import { Box } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import Cookies from 'js-cookie';

// import { NavbarMainNav, Navbars, ProfileImage } from './StyledComponents';
// import userContext from '../../../UseContext/UseContext';
// import useNotifications from './useNotifications';
// import NotificationMenu from './NotificationComponents';

// export default function Navbar({ isOpen, toggleSidebar }: any) {
//     const theme = useTheme();
//     const subdomain = Cookies.get('subdomain') || '';
//     const { data, flexilogo } = useContext(userContext) || { data: {} };

//     const {
//         notifications,
//         markAsRead,
//         markAllAsRead,
//         unreadCount
//         // countVisible, setCountVisible // not needed for MUI menu
//     } = useNotifications(subdomain);

//     return (
//         <NavbarMainNav>
//             <Navbars sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//                 <Box>
//                     <Link href="/profile">
//                         <ProfileImage src={flexilogo?.logo || data?.Profile || '/image/Exclude.png'} alt="Profile" width="30px" />
//                     </Link>
// <span style={{ color: theme.palette.primary.contrastText }} className="m-3 fw-bold">
//     {data?.company?.companyName || ''}
// </span>
//                 </Box>
//                 <Box className="navbar-topbar d-flex" sx={{ display: 'flex', alignItems: 'center' }}>
//                     {/* Replace PrimeReact bell and menu with MUI NotificationMenu */}
//                     <NotificationMenu notifications={notifications} unreadCount={unreadCount} onMarkRead={markAsRead} onMarkAllRead={markAllAsRead} subdomain={subdomain} />
//                     {/* You can keep other Navbar buttons or sidebar toggles here */}
//                 </Box>
//             </Navbars>
//         </NavbarMainNav>
//     );
// }
'use client';
import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { Box, Menu, MenuItem, Typography, IconButton, Avatar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { NavbarMainNav, Navbars, ProfileImage } from './StyledComponents';
import userContext from '../../../UseContext/UseContext';
import useNotifications from './useNotifications';
import NotificationMenu from './NotificationComponents';

export default function Navbar({ isOpen, toggleSidebar }: any) {
    const theme = useTheme();
    const router = useRouter();
    const subdomain = Cookies.get('subdomain') || '';
    const { data, flexilogo } = useContext(userContext) || { data: {} };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const profileMenuOpen = Boolean(anchorEl);

    const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications(subdomain);

    const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProfileNavigation = () => {
        handleProfileMenuClose();
        router.push('/profile');
    };

    const handleLogout = () => {
        handleProfileMenuClose();
    

        Cookies.remove('crmaccess');
        router.push(`/${subdomain}/login`);
    };

    return (
        <NavbarMainNav>
            <Navbars
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 17px'
                }}
            >
                {/* Left side - Company Logo */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* <Link href="/"> */}
                    <ProfileImage src={flexilogo?.logo || data?.Profile || '/image/Exclude.png'} alt="Profile" width="30px" />
                    {/* </Link> */}
                    <span style={{ color: theme.palette.primary.contrastText }} className=" fw-bold">
                        {data?.company?.companyName || ''}
                    </span>
                </Box>

                {/* Right side - Notification and Profile */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Profile Icon with Dropdown */}
                    <IconButton onClick={handleProfileClick} sx={{ marginLeft: '22px' }} size="small" aria-controls={profileMenuOpen ? 'profile-menu' : undefined} aria-haspopup="true" aria-expanded={profileMenuOpen ? 'true' : undefined}>
                        <ProfileImage sx={{ marginRight: '0px' }} src={data?.Profile || '/image/Exclude.png'} alt="Profile" width="30px" />
                    </IconButton>
                    <NotificationMenu notifications={notifications} unreadCount={unreadCount} onMarkRead={markAsRead} onMarkAllRead={markAllAsRead} subdomain={subdomain} />
                </Box>

                {/* Profile Dropdown Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={profileMenuOpen}
                    onClose={handleProfileMenuClose}
                    onClick={handleProfileMenuClose}
                    PaperProps={{
                        elevation: 3,
                        sx: {
                            minWidth: 180,
                            borderRadius: 1,
                            overflow: 'visible',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: 1,
                                mr: 1
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0
                            }
                        }
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleProfileNavigation}>
                        <Typography variant="body2">My Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <Typography variant="body2" color="error">
                            Logout
                        </Typography>
                    </MenuItem>
                </Menu>
            </Navbars>
        </NavbarMainNav>
    );
}
