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
        router.push(`/${subdomain}/profile`);
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
                    {/* <ProfileImage src={flexilogo?.logo || data?.Profile || '/image/Exclude.png'} alt="Profile" width="30px" /> */}
                    {/* </Link> */}
                    <span style={{ color: theme.palette.primary.contrastText }} className=" fw-bold">
                        {data?.company?.companyName || ''}
                    </span>
                </Box>

                {/* Right side - Notification and Profile */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {/* Profile Icon with Dropdown */}
                    <NotificationMenu notifications={notifications} unreadCount={unreadCount} onMarkRead={markAsRead} onMarkAllRead={markAllAsRead} subdomain={subdomain} />
                    <IconButton onClick={handleProfileClick} size="small" aria-controls={profileMenuOpen ? 'profile-menu' : undefined} aria-haspopup="true" aria-expanded={profileMenuOpen ? 'true' : undefined}>
                        <ProfileImage sx={{ marginRight: '0px' }} src={data?.Profile || '/image/Exclude.png'} alt="Profile" width="30px" />
                    </IconButton>
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
