'use client';
import React, { useState, useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import userContext from '../../../UseContext/UseContext';
import { Tooltip, styled, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton, useTheme, Theme } from '@mui/material';
import {
    ArrowForwardIos as ArrowForwardIosIcon,
    Home as HomeIcon,
    Group as CustomersIcon,
    Star as LeadsIcon,
    Build as UtilitiesIcon,
    Settings as SettingsIcon,
    Lock as RolesIcon,
    ManageAccounts as UsersIcon,
    Logout as LogoutIcon
} from '@mui/icons-material';
import Link from 'next/link';

const iconComponents: Record<string, React.ElementType> = {
    home: HomeIcon,
    customers: CustomersIcon,
    leads: LeadsIcon,
    users: UsersIcon,
    utilities: UtilitiesIcon,
    settings: SettingsIcon,
    roles: RolesIcon
};

const CustomTooltip = styled(({ className, ...props }: any) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }: { theme: Theme }) => ({
    '& .MuiTooltip-tooltip': {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[3],
        fontSize: 14,
        fontWeight: 500,
        padding: theme.spacing(1, 1.5),
        borderRadius: theme.shape.borderRadius
    },
    '& .MuiTooltip-arrow': {
        color: theme.palette.background.paper
    }
}));

const SidebarContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100vh',
    color: theme.palette.primary.contrastText,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
}));

const MenuList = styled(List)({
    flexGrow: 1,
    overflowY: 'auto',
    '&::-webkit-scrollbar': { display: 'none' }
});

export default function Sidebar({ isOpen, toggleSidebar }: any) {
    const theme = useTheme();
    const contextValue = useContext(userContext);
    const { data } = contextValue || { data: {} };
    const [permissions, setPermissions] = useState<Record<string, any>>({});
    const pathname = usePathname();
    const router = useRouter();
    const subdomain = Cookies.get('subdomain');

    useEffect(() => {
        if (data?.permissions) setPermissions(data.permissions);
    }, [data?.permissions]);

    const menuItems = [
        { label: 'Dashboard', icon: 'home', to: 'dashboard', permission: 'Dashboard' },
        { label: 'Customers', icon: 'customers', to: 'customers', permission: 'Customer', actions: ['canRead'] },
        { label: 'All Users', icon: 'users', to: 'user', permission: 'User', actions: ['canRead'] },
        { label: 'Leads', icon: 'leads', to: 'leads', permission: 'Leads', actions: ['canRead'] },
        { label: 'Utilities', icon: 'utilities', to: 'utilities', permission: 'Utilities', actions: ['canRead'] },
        { label: 'Settings', icon: 'settings', to: 'roles', permission: 'RolesPermissions', actions: ['canRead'] },
        { label: 'Roles & Permissions', icon: 'roles', to: 'roles-permissions', permission: 'RolesPermissions', actions: ['canRead'] }
    ];

    const hasPermission = (permissionKey: string, actions: string[] = []) => {
        const permission = permissions[permissionKey];
        if (!permission) return false;
        if (actions.length === 0) return true;
        return actions.every((action) => permission[action] === true);
    };

    const isActive = (to: string) => {
        const currentPath = pathname.replace(`/${subdomain}/`, '').split('/')[0];
        return currentPath === to;
    };

    const handleLogOff = () => {
        Cookies.remove('crmaccess');
        router.push(`/${subdomain}/login`);
    };

    return (
        <SidebarContainer
            sx={{
                width: isOpen ? 250 : 60,
                background: 'rgb(10 45 90)',
                color: theme.palette.primary.contrastText
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                <IconButton onClick={toggleSidebar} sx={{ color: 'white' }}>
                    <ArrowForwardIosIcon
                        sx={{
                            fontSize: 15,
                            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: theme.transitions.create('transform', {
                                duration: theme.transitions.duration.shortest
                            })
                        }}
                    />
                </IconButton>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
            <MenuList>
                {menuItems?.map((item, index) => {
                    const allowed = hasPermission(item.permission, item.actions || []);
                    if (!allowed) return null;

                    const IconComponent = iconComponents[item.icon] || HomeIcon;
                    const active = isActive(item.to);

                    return (
                        <ListItem
                            key={index}
                            disablePadding
                            sx={{
                                justifyContent: isOpen ? 'initial' : 'center',
                                backgroundColor: active ? theme.palette.common.white : 'transparent',
                                color: active ? theme.palette.text.primary : theme.palette.common.white,
                                '&:hover': {
                                    backgroundColor: theme.palette.common.white,
                                    color: theme.palette.text.primary
                                }
                            }}
                        >
                            <CustomTooltip title={item.label} placement="right" arrow disableHoverListener={isOpen}>
                                <ListItemButton component={Link} href={`/${subdomain}/${item.to}`}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: isOpen ? 2 : 'auto',
                                            justifyContent: 'center',
                                            color: 'inherit'
                                        }}
                                    >
                                        <IconComponent />
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} sx={{ opacity: isOpen ? 1 : 0, whiteSpace: 'nowrap' }} />
                                </ListItemButton>
                            </CustomTooltip>
                        </ListItem>
                    );
                })}
            </MenuList>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
            <ListItemButton
                onClick={handleLogOff}
                sx={{
                    color: 'white',
                    justifyContent: isOpen ? 'initial' : 'center',
                    '&:hover': { backgroundColor: 'white', color: theme.palette.text.primary }
                }}
            >
                <ListItemIcon sx={{ color: 'inherit', justifyContent: 'center', mr: isOpen ? 2 : 0 }}>
                    <LogoutIcon />
                </ListItemIcon>
                {isOpen && <ListItemText primary="Logout" />}
            </ListItemButton>
        </SidebarContainer>
    );
}
