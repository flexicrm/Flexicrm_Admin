'use client';
import { useState, useEffect, useContext } from 'react';
import '../sidebar/sidebar.scss';
import Link from 'next/link';
import cookies from 'js-cookie';
import userContext from '../../../UseContext/UseContext';

export default function Sidebar({ isOpen }: any) {
    // const { data } = useContext(userContext);
    const contextValue = useContext(userContext);
    console.log('Context Value:', contextValue);
    const { data } = contextValue || { data: {} };
    const [permissions, setPermissions] = useState({});
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        // Set permissions only when user data changes
        if (data?.permissions) {
            setPermissions(data.permissions);
        }
    }, [data?.permissions]);

    const subdomain = cookies.get('subdomain');

    // Define menu items with their permissions and actions
    const menuItems = [
        { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: 'dashboard', permission: 'Dashboard' },
        // { label: 'Users', icon: 'pi pi-user-edit', to: 'users', permission: 'User', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
        // { label: 'Sales', icon: 'pi pi-fw pi-th-large', to: 'sales', permission: 'Sales', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
        // { label: 'Projects', icon: 'pi pi-fw pi-lock', to: 'projects', permission: 'Project', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
        { label: 'Customers', icon: 'pi pi-fw pi-users', to: 'customers', permission: 'Customer', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
        // { label: 'Subscriptions', icon: 'pi pi-fw pi-wallet', to: 'subscriptions', permission: 'subscriptions', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
        // { label: 'Expenses', icon: 'pi pi-fw pi-file', to: 'expenses', permission: 'Expenses', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
        { label: 'Leads', icon: 'pi pi-fw pi-star', to: 'leads', permission: 'Leads', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
        // { label: 'Reports', icon: 'pi pi-fw pi-chart-line', to: 'reports', permission: 'Report', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
        // { label: 'Setup', icon: 'pi pi-fw pi-cog', to: 'setup', permission: 'Setup', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
        // { label: 'Tasks', icon: 'pi pi-fw pi-check-square', to: 'tasks', permission: 'Task', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
        { label: 'Utilities', icon: 'pi pi-fw pi-hammer', to: 'utilities', permission: 'Utilities', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] }
        // { label: 'Roles & Permissions', icon: 'pi pi-fw pi-lock', to: '/roles', permission: 'RolesPermissions', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] }
    ];

    // Check if the user has the required permission and actions
    const hasPermission = (permissionKey, actions = []) => {
        const permission = permissions[permissionKey];

        if (!permission) {
            return false; // If permission doesn't exist, return false
        }

        return actions.every((action) => permission[action] === true);
    };

    return (
        <>
            {loading && (
                <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
                    <ul className="layout-menu list-inline">
                        {menuItems.map((item, index) => {
                            const allowed = hasPermission(item.permission, item.actions);

                            return allowed ? (
                                <li key={index} className="layout-root-menuitem">
                                    <Link href={`/${subdomain}/${item.to}`} className="link-sidebar">
                                        <i className={item.icon}></i>
                                        <span className="sidebar-label">{item.label}</span>
                                    </Link>
                                </li>
                            ) : null;
                        })}
                    </ul>
                </div>
            )}
        </>
    );
}
// 'use client';
// import { useState, useEffect, useContext } from 'react';
// import Link from 'next/link';
// import cookies from 'js-cookie';
// import userContext from '../../../UseContext/UseContext';
// import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Tooltip, IconButton, Collapse, styled, css } from '@mui/material';
// import {
//     Dashboard as DashboardIcon,
//     People as PeopleIcon,
//     ShoppingCart as SalesIcon,
//     Folder as ProjectsIcon,
//     Group as CustomersIcon,
//     CreditCard as SubscriptionsIcon,
//     Receipt as ExpensesIcon,
//     Star as LeadsIcon,
//     BarChart as ReportsIcon,
//     Settings as SettingsIcon,
//     Task as TasksIcon,
//     Build as UtilitiesIcon,
//     Lock as RolesIcon,
//     ChevronLeft,
//     ChevronRight,
//     ExpandLess,
//     ExpandMore
// } from '@mui/icons-material';

// const drawerWidth = 440;

// const StyledDrawer = styled(Drawer, {
//     shouldForwardProp: (prop) => prop !== 'isOpen'
// })(({ theme, isOpen }) => ({
//     width: isOpen ? drawerWidth : 0,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.enteringScreen
//     }),
//     ...(!isOpen && {
//         transition: theme.transitions.create('width', {
//             easing: theme.transitions.easing.sharp,
//             duration: theme.transitions.duration.leavingScreen
//         }),
//         overflowX: 'hidden',
//         width: 0
//     }),
//     '& .MuiDrawer-paper': {
//         width: isOpen ? drawerWidth : 0,
//         backgroundColor: 'transparent',
//         borderRight: 'none',
//         transition: theme.transitions.create('width', {
//             easing: theme.transitions.easing.sharp,
//             duration: isOpen ? theme.transitions.duration.enteringScreen : theme.transitions.duration.leavingScreen
//         }),
//         overflowX: 'hidden'
//     }
// }));

// const DrawerHeader = styled('div')(({ theme }) => ({
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'flex-end',
//     // padding: theme.spacing(0, 1),
//     ...theme.mixins.toolbar
// }));

// const MenuContainer = styled('div')(({ theme }) => ({
//     backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent white
//     backdropFilter: 'blur(10px)',
//     height: '100%',
//     borderRadius: '0 16px 16px 0',
//     boxShadow: theme.shadows[4]
// }));

// export default function Sidebar({ isOpen, toggleSidebar }) {
//     const { data } = useContext(userContext);
//     const [permissions, setPermissions] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [openSubMenu, setOpenSubMenu] = useState({});

//     useEffect(() => {
//         setLoading(true);
//         if (data?.permissions) {
//             setPermissions(data.permissions);
//             setLoading(false);
//         }
//     }, [data?.permissions]);

//     const subdomain = cookies.get('subdomain');

//     const menuItems = [
//         { label: 'Dashboard', icon: <DashboardIcon />, to: 'dashboard', permission: 'Dashboard' },
//         {
//             label: 'Users',
//             icon: <PeopleIcon />,
//             to: 'users',
//             permission: 'User',
//             actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete']
//         }
//         // ... rest of your menu items
//     ];

//     const hasPermission = (permissionKey, actions = []) => {
//         const permission = permissions[permissionKey];
//         if (!permission) return false;
//         return actions.every((action) => permission[action] === true);
//     };

//     const handleSubMenuToggle = (label) => {
//         setOpenSubMenu((prev) => ({
//             ...prev,
//             [label]: !prev[label]
//         }));
//     };

//     return (
//         <StyledDrawer variant="permanent" isOpen={isOpen}>
//             <MenuContainer>
//                 <DrawerHeader>
//                     <IconButton onClick={toggleSidebar}>{isOpen ? <ChevronLeft /> : <ChevronRight />}</IconButton>
//                 </DrawerHeader>
//                 <Divider />
//                 {loading ? (
//                     <div>Loading...</div>
//                 ) : (
//                     <List>
//                         {menuItems.map((item) => {
//                             const allowed = hasPermission(item.permission, item.actions);
//                             if (!allowed) return null;

//                             return (
//                                 <Link href={`/${subdomain}/${item.to}`} key={item.label} passHref legacyBehavior>
//                                     <ListItem disablePadding>
//                                         <Tooltip title={!isOpen ? item.label : ''} placement="right">
//                                             <ListItemButton
//                                                 sx={{
//                                                     minHeight: 48,
//                                                     justifyContent: isOpen ? 'initial' : 'center',
//                                                     color: 'text.primary',
//                                                     px: 2.5,
//                                                     '&:hover': {
//                                                         backgroundColor: 'rgba(0, 0, 0, 0.04)'
//                                                     }
//                                                 }}
//                                             >
//                                                 <ListItemIcon
//                                                     sx={{
//                                                         minWidth: 0,
//                                                         mr: isOpen ? 3 : 'auto',
//                                                         justifyContent: 'center'
//                                                     }}
//                                                 >
//                                                     {item.icon}
//                                                 </ListItemIcon>
//                                                 <ListItemText primary={item.label} sx={{ opacity: isOpen ? 1 : 0 }} />
//                                             </ListItemButton>
//                                         </Tooltip>
//                                     </ListItem>
//                                 </Link>
//                             );
//                         })}
//                     </List>
//                 )}
//             </MenuContainer>
//         </StyledDrawer>
//     );
// }
