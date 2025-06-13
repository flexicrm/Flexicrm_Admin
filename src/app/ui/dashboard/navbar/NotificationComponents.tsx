// 'use client';
// import React from 'react';
// import { Box, Divider, IconButton, Typography } from '@mui/material';
// import { FiX } from 'react-icons/fi';
// import { Button } from 'primereact/button';
// import { useRouter } from 'next/navigation';
// import { styled } from '@mui/material/styles';
// import { Menu } from 'primereact/menu';
// // import { useTheme } from '@emotion/react';

// export const NotificationDropdown = styled(Box)(({ theme }) => ({
//     position: 'absolute',
//     right: '10px',
//     backgroundColor: theme.palette.background.paper,
//     border: `1px solid ${theme.palette.divider}`,
//     borderRadius: '5px',
//     boxShadow: theme.shadows[2],
//     width: '300px',
//     zIndex: 1000,
//     padding: '10px',
//     maxHeight: '300px',
//     overflowY: 'auto'
// }));

// export const NotificationItem = styled(Box)<{ unread?: boolean }>(({ unread, theme }) => ({
//     display: 'flex',
//     alignItems: 'flex-start',
//     padding: '0.75rem 1rem',
//     cursor: 'pointer',
//     backgroundColor: unread ? theme.palette.action.selected : 'transparent',
//     borderLeft: unread ? `3px solid ${theme.palette.primary.main}` : 'none',
//     '&:hover': {
//         backgroundColor: theme.palette.action.hover
//     }
// }));

// export const NotificationBadge = styled(Box)(({ theme }) => ({
//     position: 'absolute',
//     right: '65px',
//     width: '12px',
//     height: '12px',
//     backgroundColor: theme.palette.error.main,
//     borderRadius: '50%',
//     display: 'inline-block',
//     zIndex: 999
// }));

// export const MarkAllReadButton = styled(Button)(({ theme }) => ({
//     width: '100%',
//     marginBottom: '10px',
//     '&:hover': {
//         backgroundColor: theme.palette.primary.main,
//         color: theme.palette.primary.contrastText
//     },
//     '&:focus': {
//         outline: 'none',
//         boxShadow: `0 0 5px rgba(0, 123, 255, 0.5)`
//     }
// }));

// export const NotificationHeader = styled(Box)({
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: '1rem'
// });

// export const NotificationContent = styled(Box)({
//     flex: 1,
//     overflowY: 'auto'
// });

// export const NotificationFooter = styled(Box)(({ theme }) => ({
//     padding: '0.5rem',
//     borderTop: `1px solid ${theme.palette.divider}`
// }));

// interface NotificationDropdownProps {
//     notifications: any[];
//     unreadCount: number;
//     markAllAsRead: () => void;
//     markNotificationAsRead: (id: string) => void;
//     subdomain: string;
// }

// export const NotificationDropdownComponent: React.FC<NotificationDropdownProps> = ({ notifications, unreadCount, markAllAsRead, markNotificationAsRead, subdomain }) => {
//     const router = useRouter();

//     return (
//         <NotificationDropdown>
//             <NotificationHeader>
//                 <Typography variant="h6">Notifications</Typography>
//                 {unreadCount > 0 && <MarkAllReadButton onClick={markAllAsRead}>Mark all as read</MarkAllReadButton>}
//             </NotificationHeader>
//             <Divider />
//             <NotificationContent>
//                 {notifications.length === 0 ? (
//                     <Typography variant="body2" sx={{ p: 2, textAlign: 'center' }}>
//                         No notifications available
//                     </Typography>
//                 ) : (
//                     notifications.map((notification) => (
//                         <NotificationItem key={notification._id} unread={!notification.notificationRead}>
//                             <Box sx={{ flex: 1 }}>
//                                 <Typography variant="body2">{notification.description}</Typography>
//                                 <Typography variant="caption" color="textSecondary">
//                                     {new Date(notification.timestamp).toLocaleString()}
//                                 </Typography>
//                             </Box>
//                             {!notification.notificationRead && (
//                                 <IconButton size="small" onClick={() => markNotificationAsRead(notification._id)} aria-label="Mark as read">
//                                     <FiX size={14} />
//                                 </IconButton>
//                             )}
//                         </NotificationItem>
//                     ))
//                 )}
//             </NotificationContent>
//             <NotificationFooter>
//                 <Button text label="View All Notifications" onClick={() => router.push(`/${subdomain}/notifications`)} />
//             </NotificationFooter>
//         </NotificationDropdown>
//     );
// };

// interface NotificationIconProps {
//     menuRef: React.RefObject<Menu>;
//     unreadCount: number;
//     countVisible: boolean;
//     toggleNotificationDropdown: (event: React.MouseEvent) => void;
//     notificationItems: any[];
// }

// export const NotificationIcon: React.FC<NotificationIconProps> = ({ menuRef, unreadCount, countVisible, toggleNotificationDropdown, notificationItems }) => {
//     // const theme = useTheme();

//     return (
//         <Box>
//             <i className="pi pi-bell p-overlay-badge me-4" style={{ fontSize: '1.3rem' }} onClick={toggleNotificationDropdown}>
//                 {countVisible && unreadCount > 0 && <NotificationBadge />}
//             </i>
//             <Menu model={notificationItems} popup ref={menuRef} />
//         </Box>
//     );
// };
// 'use client';

// import {
//   Badge,
//   Box,
//   Divider,
//   IconButton,
//   Menu,
//   MenuItem,
//   Typography,
//   Button,
// } from '@mui/material';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import CloseIcon from '@mui/icons-material/Close';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function NotificationMenu({
//   notifications = [],
//   unreadCount = 0,
//   onMarkRead,
//   onMarkAllRead,
//   subdomain = '',
// }) {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const router = useRouter();

//   const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleViewAll = () => {
//     handleClose();
//     router.push(`/${subdomain}/notifications`);
//   };

//   return (
//     <>
//       <IconButton onClick={handleOpen} color="inherit">
//         <Badge badgeContent={unreadCount} color="error">
//           <NotificationsIcon style={{color:"white"}} />
//         </Badge>
//       </IconButton>

//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//         PaperProps={{
//           sx: { width: 320, maxHeight: 400 },
//         }}
//       >
//         <Box px={2} py={1}>
//           <Typography variant="h6">Notifications</Typography>
//           {unreadCount > 0 && (
//             <Button
//               size="small"
//               onClick={() => {
//                 onMarkAllRead?.();
//                 handleClose();
//               }}
//               sx={{ float: 'right', textTransform: 'none' }}
//             >
//               Mark all as read
//             </Button>
//           )}
//         </Box>
//         <Divider />

//         {notifications.length === 0 ? (
//           <MenuItem disabled>
//             <Typography variant="body2" textAlign="center" width="100%">
//               No notifications
//             </Typography>
//           </MenuItem>
//         ) : (
//           notifications.map((notification) => (
//             <MenuItem
//               key={notification._id}
//               sx={{
//                 alignItems: 'flex-start',
//                 backgroundColor: !notification.notificationRead ? '#f5f5f5' : 'transparent',
//               }}
//               divider
//             >
//               <Box sx={{ flex: 1 }}>
//                 <Typography variant="body2">{notification.description}</Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   {new Date(notification.timestamp).toLocaleString()}
//                 </Typography>
//               </Box>
//               {!notification.notificationRead && (
//                 <IconButton
//                   size="small"
//                   onClick={() => {
//                     onMarkRead?.(notification._id);
//                   }}
//                 >
//                   <CloseIcon fontSize="small" />
//                 </IconButton>
//               )}
//             </MenuItem>
//           ))
//         )}

//         <Divider />
//         <Box px={2} py={1}>
//           <Button
//             variant="text"
//             fullWidth
//             onClick={handleViewAll}
//             sx={{ textTransform: 'none' }}
//           >
//             View All Notifications
//           </Button>
//         </Box>
//       </Menu>
//     </>
//   );
// }
'use client';

import { Badge, Box, Divider, IconButton, Menu, MenuItem, Typography, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';

export default function NotificationMenu({ notifications = [], unreadCount = 0, onMarkRead, onMarkAllRead, subdomain = '' }) {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const router = useRouter();
    const subdmoain = Cookies.get('subdomain');

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleViewAll = () => {
        handleClose();
        router.push(`/${subdomain}/notifications`);
    };

    return (
        <>
            <IconButton
                onClick={handleOpen}
                color="inherit"
                sx={{
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                }}
            >
                <Badge
                    badgeContent={unreadCount}
                    color="error"
                    sx={{
                        '& .MuiBadge-badge': {
                            right: 5,
                            top: 5,
                            border: '2px solid #121212',
                            padding: '0 4px',
                            fontSize: '0.7rem'
                        }
                    }}
                >
                    <NotificationsIcon style={{ color: 'white' }} />
                </Badge>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: 360,
                        maxHeight: 500,
                        borderRadius: '12px',
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.15)',
                        mt: 1.5
                    }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Box px={2} py={1.5} sx={{ backgroundColor: 'background.paper' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h3" fontSize="1rem" fontWeight="500">
                            Notifications
                        </Typography>
                        {unreadCount > 0 && (
                            <Button
                                size="small"
                                onClick={() => {
                                    onMarkAllRead?.();
                                    handleClose();
                                }}
                                sx={{
                                    textTransform: 'none',
                                    color: 'primary.main',
                                    fontSize: '0.75rem',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        textDecoration: 'underline'
                                    }
                                }}
                            >
                                Mark all as read
                            </Button>
                        )}
                    </Box>
                </Box>

                <Divider sx={{ my: 0 }} />

                {notifications.length === 0 ? (
                    <MenuItem disabled sx={{ py: 2 }}>
                        <Typography variant="body2" textAlign="center" width="100%" color="text.secondary">
                            No new notifications
                        </Typography>
                    </MenuItem>
                ) : (
                    notifications.map((notification) => (
                        <MenuItem
                            key={notification._id}
                            sx={{
                                alignItems: 'flex-start',
                                backgroundColor: !notification.notificationRead ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
                                py: 1.5,
                                px: 2,
                                '&:hover': {
                                    backgroundColor: !notification.notificationRead ? 'rgba(25, 118, 210, 0.12)' : 'action.hover'
                                }
                            }}
                            divider
                        >
                            <Box sx={{ flex: 1 }}>
                                <Link href={`/${subdmoain}/leads/${notification.entityId.LeadId}`}>
                                    <Typography variant="body2" minWidth="200px" fontWeight={!notification.notificationRead ? '500' : '400'}>
                                        {notification.description}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                                        {new Date(notification.timestamp).toLocaleString()}
                                    </Typography>
                                </Link>
                            </Box>
                            {!notification.notificationRead && (
                                <IconButton
                                    size="small"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onMarkRead?.(notification._id);
                                    }}
                                    sx={{
                                        ml: 1,
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.05)'
                                        }
                                    }}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>
                            )}
                        </MenuItem>
                    ))
                )}

                {/* <Divider sx={{ my: 0 }} />
                <Box px={2} py={1} sx={{ backgroundColor: 'background.paper' }}>
                    <Button
                        variant="text"
                        fullWidth
                        onClick={handleViewAll}
                        sx={{
                            textTransform: 'none',
                            color: 'primary.main',
                            fontWeight: '500',
                            '&:hover': {
                                backgroundColor: 'transparent',
                                textDecoration: 'underline'
                            }
                        }}
                    >
                        View All Notifications
                    </Button>
                </Box> */}
            </Menu>
        </>
    );
}
