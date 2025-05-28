'use client';
import React from 'react';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import { FiX } from 'react-icons/fi';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';
import { styled } from '@mui/material/styles';
import { Menu } from 'primereact/menu';
// import { useTheme } from '@emotion/react';

export const NotificationDropdown = styled(Box)(({ theme }) => ({
    position: 'absolute',
    right: '10px',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    boxShadow: theme.shadows[2],
    width: '300px',
    zIndex: 1000,
    padding: '10px',
    maxHeight: '300px',
    overflowY: 'auto'
}));

export const NotificationItem = styled(Box)<{ unread?: boolean }>(({ unread, theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    backgroundColor: unread ? theme.palette.action.selected : 'transparent',
    borderLeft: unread ? `3px solid ${theme.palette.primary.main}` : 'none',
    '&:hover': {
        backgroundColor: theme.palette.action.hover
    }
}));

export const NotificationBadge = styled(Box)(({ theme }) => ({
    position: 'absolute',
    right: '65px',
    width: '12px',
    height: '12px',
    backgroundColor: theme.palette.error.main,
    borderRadius: '50%',
    display: 'inline-block',
    zIndex: 999
}));

export const MarkAllReadButton = styled(Button)(({ theme }) => ({
    width: '100%',
    marginBottom: '10px',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    },
    '&:focus': {
        outline: 'none',
        boxShadow: `0 0 5px rgba(0, 123, 255, 0.5)`
    }
}));

export const NotificationHeader = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem'
});

export const NotificationContent = styled(Box)({
    flex: 1,
    overflowY: 'auto'
});

export const NotificationFooter = styled(Box)(({ theme }) => ({
    padding: '0.5rem',
    borderTop: `1px solid ${theme.palette.divider}`
}));

interface NotificationDropdownProps {
    notifications: any[];
    unreadCount: number;
    markAllAsRead: () => void;
    markNotificationAsRead: (id: string) => void;
    subdomain: string;
}

export const NotificationDropdownComponent: React.FC<NotificationDropdownProps> = ({ notifications, unreadCount, markAllAsRead, markNotificationAsRead, subdomain }) => {
    const router = useRouter();

    return (
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
    );
};

interface NotificationIconProps {
    menuRef: React.RefObject<Menu>;
    unreadCount: number;
    countVisible: boolean;
    toggleNotificationDropdown: (event: React.MouseEvent) => void;
    notificationItems: any[];
}

export const NotificationIcon: React.FC<NotificationIconProps> = ({ menuRef, unreadCount, countVisible, toggleNotificationDropdown, notificationItems }) => {
    // const theme = useTheme();

    return (
        <Box>
            <i className="pi pi-bell p-overlay-badge me-4" style={{ fontSize: '1.3rem' }} onClick={toggleNotificationDropdown}>
                {countVisible && unreadCount > 0 && <NotificationBadge />}
            </i>
            <Menu model={notificationItems} popup ref={menuRef} />
        </Box>
    );
};
