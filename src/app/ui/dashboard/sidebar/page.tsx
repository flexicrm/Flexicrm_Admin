// 'use client';
// import React, { useState, useEffect, useContext } from 'react';
// import Link from 'next/link';
// import cookies from 'js-cookie';
// import userContext from '../../../UseContext/UseContext';
// import { Tooltip, styled, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton, useTheme, Theme } from '@mui/material';
// import {
//     ArrowForwardIos as ArrowForwardIosIcon,
//     Home as HomeIcon,
//     People as PeopleIcon,
//     ShoppingCart as SalesIcon,
//     Lock as ProjectsIcon,
//     Group as CustomersIcon,
//     AccountBalanceWallet as SubscriptionsIcon,
//     Receipt as ExpensesIcon,
//     Star as LeadsIcon,
//     BarChart as ReportsIcon,
//     Settings as SetupIcon,
//     CheckBox as TasksIcon,
//     Build as UtilitiesIcon,
//     Lock as RolesIcon
// } from '@mui/icons-material';
// import LogoutIcon from '@mui/icons-material/Logout';
// import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie';

// const iconComponents: Record<string, React.ComponentType> = {
//     'pi pi-fw pi-home': HomeIcon,
//     'pi pi-user-edit': PeopleIcon,
//     'pi pi-fw pi-th-large': SalesIcon,
//     'pi pi-fw pi-lock': ProjectsIcon,
//     'pi pi-fw pi-users': CustomersIcon,
//     'pi pi-fw pi-wallet': SubscriptionsIcon,
//     'pi pi-fw pi-file': ExpensesIcon,
//     'pi pi-fw pi-star': LeadsIcon,
//     'pi pi-fw pi-chart-line': ReportsIcon,
//     'pi pi-fw pi-cog': SetupIcon,
//     'pi pi-fw pi-check-square': TasksIcon,
//     'pi pi-fw pi-hammer': UtilitiesIcon
// };

// const CustomTooltip = styled(Tooltip)(({ theme }: { theme: Theme }) => ({
//     tooltip: {
//         backgroundColor: theme.palette.background.paper,
//         color: theme.palette.text.primary,
//         boxShadow: theme.shadows[3],
//         fontSize: 14,
//         fontWeight: 500,
//         padding: theme.spacing(1, 1.5),
//         borderRadius: theme.shape.borderRadius
//     },
//     arrow: {
//         color: theme.palette.background.paper
//     }
// }));

// const SidebarContainer = styled(Box)(({ theme }) => ({
//     width: '100%',
//     height: '100vh',
//     color: theme.palette.primary.contrastText,
//     transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen
//     }),
//     overflow: 'hidden',
//     display: 'flex',
//     flexDirection: 'column'
// }));

// const MenuList = styled(List)({
//     flexGrow: 1,
//     overflowY: 'auto',
//     '&::-webkit-scrollbar': {
//         display: 'none'
//     }
// });

// interface SidebarProps {
//     isOpen: boolean;
//     toggleSidebar?: () => void;
// }

// export default function Sidebar({ isOpen, toggleSidebar }: any) {
//     const theme = useTheme();
//     const contextValue = useContext(userContext);
//     const { data } = contextValue || { data: {} };
//     const [permissions, setPermissions] = useState<Record<string, any>>({});
//     const [loading, setLoading] = useState(false);
//     const [pathactive, setPathActive] = useState('');
//     const router = useRouter();
//     useEffect(() => {
//         setLoading(true);
//         if (data?.permissions) {
//             setPermissions(data.permissions);
//             setLoading(false);
//         }
//         if (typeof window !== 'undefined') {
//             const location = window.location.pathname.split('/')[2];
//             setPathActive(location);
//         }
//     }, [data?.permissions, pathactive]);

//     const subdomain = cookies.get('subdomain');

//     const menuItems = [
//         { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: 'dashboard', permission: 'Dashboard' },
//         { label: 'Customers', icon: 'pi pi-fw pi-users', to: 'customers', permission: 'Customer', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         { label: 'Leads', icon: 'pi pi-fw pi-star', to: 'leads', permission: 'Leads', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         { label: 'Utilities', icon: 'pi pi-fw pi-hammer', to: 'utilities', permission: 'Utilities', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         { label: 'Roles & Permissions', icon: 'pi pi-fw pi-lock', to: '/roles', permission: 'RolesPermissions', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] }
//     ];

//     const hasPermission = (permissionKey: string, actions: string[] = []) => {
//         const permission = permissions[permissionKey];
//         if (!permission) return false;
//         if (actions.length === 0) return true;
//         return actions.every((action) => permission[action] === true);
//     };
//     const handleLogOff = () => {
//         Cookies.remove('crmaccess');
//         router.push(`/${subdomain}/login`);
//     };

//     return (
//         <SidebarContainer sx={{ width: isOpen ? 250 : '48px', background: isOpen ? 'rgb(10 45 90)' : 'transparent', color: isOpen ? theme.palette.primary.contrastText : 'inherit' }}>
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
//                 <IconButton onClick={() => toggleSidebar && toggleSidebar()} sx={{ color: 'white' }}>
//                     <ArrowForwardIosIcon
//                         sx={{
//                             fontSize: 15,
//                             transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
//                             transition: theme.transitions.create('transform', {
//                                 duration: theme.transitions.duration.shortest
//                             })
//                         }}
//                     />
//                 </IconButton>
//             </Box>

//             <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />

//             {loading ? (
//                 <Box
//                     sx={{
//                         display: 'flex',
//                         justifyContent: 'center',
//                         alignItems: 'center',
//                         height: '100%',
//                         color: 'inherit'
//                     }}
//                 >
//                     Loading...
//                 </Box>
//             ) : (
//                 <MenuList className="sidebar">
//                     {menuItems.map((item, index) => {
//                         const allowed = hasPermission(item.permission, item.actions || []);
//                         const IconComponent = iconComponents[item.icon] || HomeIcon;
//                         const isActive = pathactive === item.to.replace('/', '').toLowerCase();

//                         return allowed ? (
//                             <Link
//                                 href={`/${subdomain}/${item.to}`}
//                                 className={`${isActive ? 'active' : null}`}
//                                 // style={{ backgroundColor: isActive ? theme.palette.common.white : 'transparent', color: isActive ? theme.palette.text.primary : theme.palette.common.white }}
//                             >
//                                 <ListItem
//                                     key={index}
//                                     disablePadding
//                                     // className={`${isActive ? 'active' : null}`}
//                                     sx={{
//                                         justifyContent: isOpen ? 'initial' : 'center',
//                                         '&:hover': {
//                                             backgroundColor: theme.palette.common.white,
//                                             color: theme.palette.text.primary
//                                         },
//                                         // backgroundColor: isActive ? theme.palette.common.white : 'transparent',
//                                         color: isActive ? theme.palette.text.primary : theme.palette.common.white
//                                     }}
//                                 >
//                                     <CustomTooltip title={item.label} placement="right" arrow disableHoverListener={isOpen}>
//                                         <ListItemButton>
//                                             <ListItemIcon
//                                                 sx={{
//                                                     minWidth: 0,
//                                                     mr: isOpen ? 3 : 'auto',
//                                                     justifyContent: 'center',
//                                                     color: 'inherit',
//                                                     fontSize: 12
//                                                 }}
//                                             >
//                                                 <IconComponent />
//                                             </ListItemIcon>

//                                             <ListItemText
//                                                 primary={item.label}
//                                                 sx={{
//                                                     opacity: isOpen ? 1 : 0,
//                                                     whiteSpace: 'nowrap'
//                                                 }}
//                                             />
//                                         </ListItemButton>
//                                     </CustomTooltip>
//                                 </ListItem>
//                             </Link>
//                         ) : null;
//                     })}

//                     <ListItem disablePadding sx={{ marginTop: 'auto' }}>
//                         <ListItemButton
//                             onClick={() => handleLogOff()}
//                             sx={{
//                                 '&:hover': {
//                                     backgroundColor: theme.palette.common.white,
//                                     color: theme.palette.text.primary
//                                 },
//                                 color: theme.palette.common.white
//                             }}
//                         >
//                             {/* <CustomTooltip title="Log out" placement="right" arrow disableHoverListener={isOpen}> */}
//                             {/* <LogoutButtonComponent /> */}
//                             <ListItemIcon
//                                 sx={{
//                                     minWidth: 0,
//                                     mr: isOpen ? 3 : 'auto',
//                                     justifyContent: 'center',
//                                     color: 'inherit',
//                                     fontSize: 12
//                                 }}
//                             >
//                                 <LogoutIcon />
//                             </ListItemIcon>
//                             <ListItemText
//                                 primary="Logout"
//                                 sx={{
//                                     opacity: isOpen ? 1 : 0,
//                                     whiteSpace: 'nowrap'
//                                 }}
//                             />
//                             {/* </CustomTooltip> */}
//                         </ListItemButton>
//                     </ListItem>
//                 </MenuList>
//             )}
//         </SidebarContainer>
//     );
// }
'use client';
import React, { useState, useContext, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import cookies from 'js-cookie';
import userContext from '../../../UseContext/UseContext';
import { Tooltip, styled, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, IconButton, useTheme, Theme } from '@mui/material';
import {
    ArrowForwardIos as ArrowForwardIosIcon,
    Home as HomeIcon,
    People as PeopleIcon,
    ShoppingCart as SalesIcon,
    Lock as ProjectsIcon,
    Group as CustomersIcon,
    AccountBalanceWallet as SubscriptionsIcon,
    Receipt as ExpensesIcon,
    Star as LeadsIcon,
    BarChart as ReportsIcon,
    Settings as SetupIcon,
    CheckBox as TasksIcon,
    Build as UtilitiesIcon,
    Lock as RolesIcon
} from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import Cookies from 'js-cookie';
import Link from 'next/link';

const iconComponents: Record<string, React.ComponentType> = {
    'pi pi-fw pi-home': HomeIcon,
    'pi pi-user-edit': PeopleIcon,
    'pi pi-fw pi-th-large': SalesIcon,
    'pi pi-fw pi-lock': ProjectsIcon,
    'pi pi-fw pi-users': CustomersIcon,
    'pi pi-fw pi-wallet': SubscriptionsIcon,
    'pi pi-fw pi-file': ExpensesIcon,
    'pi pi-fw pi-star': LeadsIcon,
    'pi pi-fw pi-chart-line': ReportsIcon,
    'pi pi-fw pi-cog': SetupIcon,
    'pi pi-fw pi-check-square': TasksIcon,
    'pi pi-fw pi-hammer': UtilitiesIcon
    // 'pi pi-fw pi-lock': RolesIcon
};

const CustomTooltip = styled(Tooltip)(({ theme }: { theme: Theme }) => ({
    tooltip: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[3],
        fontSize: 14,
        fontWeight: 500,
        padding: theme.spacing(1, 1.5),
        borderRadius: theme.shape.borderRadius
    },
    arrow: {
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
    '&::-webkit-scrollbar': {
        display: 'none'
    }
});

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar?: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: any) {
    const theme = useTheme();
    const contextValue = useContext(userContext);
    const { data } = contextValue || { data: {} };
    const [permissions, setPermissions] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const subdomain = cookies.get('subdomain');

    useEffect(() => {
        setLoading(true);
        if (data?.permissions) {
            setPermissions(data.permissions);
            setLoading(false);
        }
    }, [data?.permissions]);

    const menuItems = [
        { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: 'dashboard', permission: 'Dashboard' },
        { label: 'Customers', icon: 'pi pi-fw pi-users', to: 'customers', permission: 'Customer', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
        { label: 'Leads', icon: 'pi pi-fw pi-star', to: 'leads', permission: 'Leads', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
        { label: 'Utilities', icon: 'pi pi-fw pi-hammer', to: 'utilities', permission: 'Utilities', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
        { label: 'Roles & Permissions', icon: 'pi pi-fw pi-lock', to: 'roles', permission: 'RolesPermissions', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] }
    ];

    const hasPermission = (permissionKey: string, actions: string[] = []) => {
        const permission = permissions[permissionKey];
        if (!permission) return false;
        if (actions.length === 0) return true;
        return actions.every((action) => permission[action] === true);
    };

    const isActive = (to: string) => {
        const currentPath = pathname.replace(`/${subdomain}/`, '').split('/')[0];
        const targetPath = to.replace(/^\/|\/$/g, '');
        return currentPath === targetPath;
    };

    const handleLogOff = () => {
        Cookies.remove('crmaccess');
        router.push(`/${subdomain}/login`);
    };

    return (
        <SidebarContainer
            sx={{
                width: isOpen ? 250 : '48px',
                background: isOpen ? 'rgb(10 45 90)' : 'transparent',
                color: isOpen ? theme.palette.primary.contrastText : 'inherit'
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

            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                        color: 'inherit'
                    }}
                >
                    Loading...
                </Box>
            ) : (
                <MenuList className="sidebar">
                    {menuItems.map((item, index) => {
                        const allowed = hasPermission(item.permission, item.actions || []);
                        const IconComponent = iconComponents[item.icon] || HomeIcon;
                        const active = isActive(item.to);

                        return allowed ? (
                            <Link href={`/${subdomain}/${item.to}`} key={index} passHref legacyBehavior>
                                <ListItem
                                    disablePadding
                                    sx={{
                                        justifyContent: isOpen ? 'initial' : 'center',
                                        '&:hover': {
                                            backgroundColor: theme.palette.common.white,
                                            color: theme.palette.text.primary
                                        },
                                        backgroundColor: active ? theme.palette.common.white : 'transparent',
                                        color: active ? theme.palette.text.primary : theme.palette.common.white
                                    }}
                                >
                                    <CustomTooltip title={item.label} placement="right" arrow disableHoverListener={isOpen}>
                                        <ListItemButton >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: isOpen ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                    color: 'inherit',
                                                    fontSize: 12
                                                }}
                                            >
                                                <IconComponent />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={item.label}
                                                sx={{
                                                    opacity: isOpen ? 1 : 0,
                                                    whiteSpace: 'nowrap'
                                                }}
                                            />
                                        </ListItemButton>
                                    </CustomTooltip>
                                </ListItem>
                            </Link>
                        ) : null;
                    })}

                    <ListItem disablePadding sx={{ marginTop: 'auto' }}>
                        <ListItemButton
                            onClick={handleLogOff}
                            sx={{
                                '&:hover': {
                                    backgroundColor: theme.palette.common.white,
                                    color: theme.palette.text.primary
                                },
                                color: theme.palette.common.white
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: isOpen ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: 'inherit',
                                    fontSize: 12
                                }}
                            >
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary="Logout"
                                sx={{
                                    opacity: isOpen ? 1 : 0,
                                    whiteSpace: 'nowrap'
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </MenuList>
            )}
        </SidebarContainer>
    );
}
