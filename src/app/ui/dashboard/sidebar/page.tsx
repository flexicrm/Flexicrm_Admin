// 'use client';
// import { useState, useEffect, useContext } from 'react';
// import '../sidebar/sidebar.scss';
// import Link from 'next/link';
// import cookies from 'js-cookie';
// import userContext from '../../../UseContext/UseContext';

// export default function Sidebar({ isOpen }: any) {
//     // const { data } = useContext(userContext);
//     const contextValue = useContext(userContext);
//     console.log('Context Value:', contextValue);
//     const { data } = contextValue || { data: {} };
//     const [permissions, setPermissions] = useState({});
//     const [loading, setLoading] = useState(false);
//     useEffect(() => {
//         setLoading(true);
//         // Set permissions only when user data changes
//         if (data?.permissions) {
//             setPermissions(data.permissions);
//         }
//     }, [data?.permissions]);

//     const subdomain = cookies.get('subdomain');

//     // Define menu items with their permissions and actions
//     const menuItems = [
//         { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: 'dashboard', permission: 'Dashboard' },
//         // { label: 'Users', icon: 'pi pi-user-edit', to: 'users', permission: 'User', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         // { label: 'Sales', icon: 'pi pi-fw pi-th-large', to: 'sales', permission: 'Sales', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         // { label: 'Projects', icon: 'pi pi-fw pi-lock', to: 'projects', permission: 'Project', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         { label: 'Customers', icon: 'pi pi-fw pi-users', to: 'customers', permission: 'Customer', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         // { label: 'Subscriptions', icon: 'pi pi-fw pi-wallet', to: 'subscriptions', permission: 'subscriptions', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         // { label: 'Expenses', icon: 'pi pi-fw pi-file', to: 'expenses', permission: 'Expenses', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         { label: 'Leads', icon: 'pi pi-fw pi-star', to: 'leads', permission: 'Leads', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         // { label: 'Reports', icon: 'pi pi-fw pi-chart-line', to: 'reports', permission: 'Report', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         // { label: 'Setup', icon: 'pi pi-fw pi-cog', to: 'setup', permission: 'Setup', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         // { label: 'Tasks', icon: 'pi pi-fw pi-check-square', to: 'tasks', permission: 'Task', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         { label: 'Utilities', icon: 'pi pi-fw pi-hammer', to: 'utilities', permission: 'Utilities', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         { label: 'Roles & Permissions', icon: 'pi pi-fw pi-lock', to: '/roles', permission: 'RolesPermissions', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] }
//     ];

//     // Check if the user has the required permission and actions
//     const hasPermission = (permissionKey, actions = []) => {
//         const permission = permissions[permissionKey];

//         if (!permission) {
//             return false; // If permission doesn't exist, return false
//         }

//         return actions.every((action) => permission[action] === true);
//     };

//     return (
//         <>
//             {loading && (
//                 <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
//                     <ul className="layout-menu list-inline">
//                         {menuItems.map((item, index) => {
//                             const allowed = hasPermission(item.permission, item.actions);

//                             return allowed ? (
//                                 <li key={index} className="layout-root-menuitem">
//                                     <Link href={`/${subdomain}/${item.to}`} className="link-sidebar">
//                                         <i className={item.icon}></i>
//                                         <span className="sidebar-label">{item.label}</span>
//                                     </Link>
//                                 </li>
//                             ) : null;
//                         })}
//                     </ul>
//                 </div>
//             )}
//         </>
//     );
// }
// 'use client';
// import { useState, useEffect, useContext } from 'react';
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

// // Map PrimeIcons to MUI icons
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
//     'pi pi-fw pi-hammer': UtilitiesIcon,
//     // 'pi pi-fw pi-lock': RolesIcon
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
//     // backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//     transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen
//     }),
//     overflow: 'hidden',
//     display: 'flex',
//     flexDirection: 'column',
//     ':hover':{
//         width: 250,
//         backgroundColor: theme.palette.primary.main,
//         color: theme.palette.primary.contrastText
//     }
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

// export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
//     const theme = useTheme();
//     const contextValue = useContext(userContext);
//     const { data } = contextValue || { data: {} };
//     const [permissions, setPermissions] = useState<Record<string, any>>({});
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         setLoading(true);
//         if (data?.permissions) {
//             setPermissions(data.permissions);
//             setLoading(false);
//         }
//     }, [data?.permissions]);

//     const subdomain = cookies.get('subdomain');

//     const menuItems = [
//         { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: 'dashboard', permission: 'Dashboard' },
//         // { label: 'Users', icon: 'pi pi-user-edit', to: 'users', permission: 'User', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         // { label: 'Sales', icon: 'pi pi-fw pi-th-large', to: 'sales', permission: 'Sales', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         // { label: 'Projects', icon: 'pi pi-fw pi-lock', to: 'projects', permission: 'Project', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         { label: 'Customers', icon: 'pi pi-fw pi-users', to: 'customers', permission: 'Customer', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         // { label: 'Subscriptions', icon: 'pi pi-fw pi-wallet', to: 'subscriptions', permission: 'subscriptions', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         // { label: 'Expenses', icon: 'pi pi-fw pi-file', to: 'expenses', permission: 'Expenses', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         { label: 'Leads', icon: 'pi pi-fw pi-star', to: 'leads', permission: 'Leads', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         // { label: 'Reports', icon: 'pi pi-fw pi-chart-line', to: 'reports', permission: 'Report', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         // { label: 'Setup', icon: 'pi pi-fw pi-cog', to: 'setup', permission: 'Setup', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         // { label: 'Tasks', icon: 'pi pi-fw pi-check-square', to: 'tasks', permission: 'Task', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         { label: 'Utilities', icon: 'pi pi-fw pi-hammer', to: 'utilities', permission: 'Utilities', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
//         { label: 'Roles & Permissions', icon: 'pi pi-fw pi-lock', to: '/roles', permission: 'RolesPermissions', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] }
//     ];

//     const hasPermission = (permissionKey: string, actions: string[] = []) => {
//         const permission = permissions[permissionKey];
//         if (!permission) return false;
//         if (actions.length === 0) return true;
//         return actions.every((action) => permission[action] === true);
//     };

//     return (
//         <SidebarContainer sx={{ width: isOpen ? 250 : 70, background:isOpen ? theme.palette.primary.main : 'transparent', color: isOpen ? theme.palette.primary.contrastText : 'inherit' }}>
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
//                 <IconButton onClick={toggleSidebar} sx={{ color: 'inherit' }}>
//                     <ArrowForwardIosIcon
//                         sx={{
//                             fontSize: 16,
// transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
// transition: theme.transitions.create('transform', {
//     duration: theme.transitions.duration.shortest
// })
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
//                 <MenuList>
//                     {menuItems.map((item, index) => {
//                         const allowed = hasPermission(item.permission, item.actions || []);
//                         const IconComponent = iconComponents[item.icon] || HomeIcon;

//                         return allowed ? (
//                             <ListItem key={index} disablePadding>
//                                 <Link href={`/${subdomain}/${item.to}`} passHref style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
//                                     <ListItemButton
//                                         sx={{
//                                             minHeight: 48,
//                                             justifyContent: isOpen ? 'initial' : 'center',
//                                             px: 2.5,
//                                             '&:hover': {
//                                                 backgroundColor: theme.palette.common.white,
//                                                 color: theme.palette.text.primary
//                                             },
//                                             borderRadius: 1,
//                                             mx: 1,
//                                             my: 0.5
//                                         }}
//                                     >
//                                         <CustomTooltip title={item.label} placement="right" arrow disableHoverListener={isOpen}>
//                                             <ListItemIcon
//                                                 sx={{
//                                                     minWidth: 0,
//                                                     mr: isOpen ? 3 : 'auto',
//                                                     justifyContent: 'center',
//                                                     color: 'inherit'
//                                                 }}
//                                             >
//                                                 <IconComponent />
//                                             </ListItemIcon>
//                                         </CustomTooltip>
//                                         <ListItemText
//                                             primary={item.label}
//                                             sx={{
//                                                 opacity: isOpen ? 1 : 0,
//                                                 whiteSpace: 'nowrap'
//                                             }}
//                                         />
//                                     </ListItemButton>
//                                 </Link>
//                             </ListItem>
//                         ) : null;
//                     })}
//                 </MenuList>
//             )}
//         </SidebarContainer>
//     );
// }
// 'use client';
// import { useState, useEffect, useContext } from 'react';
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

// // Map PrimeIcons to MUI icons
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
//     // 'pi pi-fw pi-lock': RolesIcon
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
//     // backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//     transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen
//     }),
//     overflow: 'hidden',
//     display: 'flex',
//     flexDirection: 'column'
//     // ':hover': {
//     //     width: 250,
//     //     backgroundColor: theme.palette.primary.main,
//     //     color: theme.palette.primary.contrastText
//     // }
// }));

// const MenuList = styled(List)({
//     flexGrow: 1,
//     overflowY: 'auto',
//     '&::-webkit-scrollbar': {
//         display: 'none'
//     }
// });

// interface SidebarProps {
//     isOpen: any;
//     toggleSidebar?: () => void;
// }

// export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
//     const theme = useTheme();
//     const contextValue = useContext(userContext);
//     const { data } = contextValue || { data: {} };
//     const [permissions, setPermissions] = useState<Record<string, any>>({});
//     const [loading, setLoading] = useState(false);
//     const location = window.location.pathname.split('/')[2];
//     const [pathactive, setPathActive] = useState('');
//     console.log(location, 'location');

//     useEffect(() => {
//         setLoading(true);
//         if (data?.permissions) {
//             setPermissions(data.permissions);
//             setLoading(false);
//         }
//         setPathActive(location);
//     }, [data?.permissions, location]);

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

//     return (
//         <SidebarContainer sx={{ width: isOpen ? 250 : '48px', background: isOpen ? theme.palette.primary.main : 'transparent', color: isOpen ? theme.palette.primary.contrastText : 'inherit' }}>
//             <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
//                 <IconButton onClick={() => toggleSidebar()} sx={{ color: 'white' }}>
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
//                 <MenuList>
//                     {menuItems.map((item, index) => {
//                         const allowed = hasPermission(item.permission, item.actions || []);
//                         const IconComponent = iconComponents[item.icon] || HomeIcon;
//                         const isActive = pathactive === item.to.replace('/', '').toLowerCase();

//                         return allowed ? (
//                             <ListItem key={index} disablePadding>
//                                 {/* <Link href={`/${subdomain}/${item.to}`} passHref style={{ textDecoration: 'none', color: 'white', width: '100%' }}> */}
//                                 <CustomTooltip title={item.label} placement="right" arrow disableHoverListener={isOpen}>
//                                     <ListItemButton
//                                         onClick={() => (window.location.href = `/${subdomain}/${item.to}`)}
//                                         // sx={{
//                                         //     minHeight: 48,
//                                         //     justifyContent: isOpen ? 'initial' : 'center',
//                                         //     // px: 2.5,
//                                         //     '&:hover': {
//                                         //         backgroundColor: theme.palette.common.white,
//                                         //         color: theme.palette.text.primary
//                                         //     },
//                                         //     ":active":{
//                                         //        { location ?theme.palette.common.white:"yellow"}
//                                         //     }
//                                         //     ,
//                                         //     borderRadius: 1,
//                                         //     mx: 1,
//                                         //     my: 0.5
//                                         // }}
//                                         sx={{
//                                             // minHeight: 48,

//                                             justifyContent: isOpen ? 'initial' : 'center',
//                                             '&:hover': {
//                                                 backgroundColor: theme.palette.common.white,
//                                                 color: theme.palette.text.primary
//                                             },
//                                             backgroundColor: isActive ? theme.palette.common.white : 'transparent', // Apply background color if active
//                                             color: isActive ? theme.palette.text.primary : theme.palette.common.white, // Apply text color if active
//                                             // borderRadius: 1,
//                                             // mx: 1,
//                                             my: 0.5
//                                         }}
//                                     >
//                                         <ListItemIcon
//                                             sx={{
//                                                 minWidth: 0,
//                                                 mr: isOpen ? 3 : 'auto',
//                                                 justifyContent: 'center',
//                                                 color: 'inherit',
//                                                 fontSize: 12
//                                             }}
//                                         >
//                                             <IconComponent />
//                                         </ListItemIcon>

//                                         <ListItemText
//                                             primary={item.label}
//                                             sx={{
//                                                 opacity: isOpen ? 1 : 0,
//                                                 whiteSpace: 'nowrap'
//                                             }}
//                                         />
//                                     </ListItemButton>
//                                 </CustomTooltip>
//                                 {/* </Link> */}
//                             </ListItem>
//                         ) : null;
//                     })}
//                 </MenuList>
//             )}
//         </SidebarContainer>
//     );
// }
// 'use client';
// import { useState, useEffect, useContext } from 'react';
// import Link from 'next/link';
// import cookies from 'js-cookie';
// import './sidebar.scss';
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

// // Map PrimeIcons to MUI icons
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
//     // 'pi pi-fw pi-lock': RolesIcon
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
//     isOpen: any; // Changed from `any` to `boolean`
//     toggleSidebar?: () => void;
// }

// export default function Sidebar({ isOpen, toggleSidebar }: any) {
//     const theme = useTheme();
//     const contextValue = useContext(userContext);
//     const { data } = contextValue || { data: {} };
//     const [permissions, setPermissions] = useState<Record<string, any>>({});
//     const [loading, setLoading] = useState(false);
//     // const location = window.location.pathname.split('/')[2];
//     const [pathactive, setPathActive] = useState('');
//     // console.log(location, 'location');
//     useEffect(() => {
//         setLoading(true);
//         if (data?.permissions) {
//             setPermissions(data.permissions);
//             setLoading(false);
//         }
//         // Only run this code on the client side
//         if (typeof window !== 'undefined') {
//             const location = window.location.pathname.split('/')[2];
//             setPathActive(location);
//         }
//     }, [data?.permissions, location]);
//     // useEffect(() => {

//     //     setPathActive(location);
//     // }, [data?.permissions, location]);

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
//                 <MenuList>
//                     {menuItems.map((item, index) => {
//                         const allowed = hasPermission(item.permission, item.actions || []);
//                         const IconComponent = iconComponents[item.icon] || HomeIcon;
//                         const isActive = pathactive === item.to.replace('/', '').toLowerCase();

//                         return allowed ? (
//                             <ListItem key={index} disablePadding className={`${isActive ? 'active' : null}`}>
//                                 <CustomTooltip title={item.label} placement="right" arrow disableHoverListener={isOpen}>
//                                     <ListItemButton
//                                         onClick={() => (window.location.href = `/${subdomain}/${item.to}`)}
//                                         sx={{
//                                             justifyContent: isOpen ? 'initial' : 'center',
//                                             '&:hover': {
//                                                 backgroundColor: theme.palette.common.white,
//                                                 color: theme.palette.text.primary
//                                             },
//                                             // backgroundColor: isActive ? theme.palette.common.white : 'transparent',
//                                             color: isActive ? theme.palette.text.primary : theme.palette.common.white
//                                             // my: 0.5,
//                                         }}
//                                     >
//                                         <ListItemIcon
//                                             sx={{
//                                                 minWidth: 0,
//                                                 mr: isOpen ? 3 : 'auto',
//                                                 justifyContent: 'center',
//                                                 color: 'inherit',
//                                                 fontSize: 12
//                                             }}
//                                         >
//                                             <IconComponent />
//                                         </ListItemIcon>

//                                         <ListItemText
//                                             primary={item.label}
//                                             sx={{
//                                                 opacity: isOpen ? 1 : 0,
//                                                 whiteSpace: 'nowrap'
//                                             }}
//                                         />
//                                     </ListItemButton>
//                                 </CustomTooltip>
//                             </ListItem>
//                         ) : null;
//                     })}
//                     <ListItem>Log out</ListItem>
//                 </MenuList>
//             )}
//         </SidebarContainer>
//     );
// }
"use client"
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
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
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

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
    const [pathactive, setPathActive] = useState('');
    const router = useRouter();
    useEffect(() => {
        setLoading(true);
        if (data?.permissions) {
            setPermissions(data.permissions);
            setLoading(false);
        }
        if (typeof window !== 'undefined') {
            const location = window.location.pathname.split('/')[2];
            setPathActive(location);
        }
    }, [data?.permissions]);

    const subdomain = cookies.get('subdomain');

    const menuItems = [
        { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: 'dashboard', permission: 'Dashboard' },
        { label: 'Customers', icon: 'pi pi-fw pi-users', to: 'customers', permission: 'Customer', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
        { label: 'Leads', icon: 'pi pi-fw pi-star', to: 'leads', permission: 'Leads', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
        { label: 'Utilities', icon: 'pi pi-fw pi-hammer', to: 'utilities', permission: 'Utilities', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] },
        { label: 'Roles & Permissions', icon: 'pi pi-fw pi-lock', to: '/roles', permission: 'RolesPermissions', actions: ['canCreate', 'canRead', 'canUpdate', 'canDelete'] }
    ];

    const hasPermission = (permissionKey: string, actions: string[] = []) => {
        const permission = permissions[permissionKey];
        if (!permission) return false;
        if (actions.length === 0) return true;
        return actions.every((action) => permission[action] === true);
    };
    const handleLogOff = () => {
        Cookies.remove('crmaccess');
        router.push(`/${subdomain}/login`);
    };

    return (
        <SidebarContainer sx={{ width: isOpen ? 250 : '48px', background: isOpen ? 'rgb(10 45 90)' : 'transparent', color: isOpen ? theme.palette.primary.contrastText : 'inherit' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                <IconButton onClick={() => toggleSidebar && toggleSidebar()} sx={{ color: 'white' }}>
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
                <MenuList>
                    {menuItems.map((item, index) => {
                        const allowed = hasPermission(item.permission, item.actions || []);
                        const IconComponent = iconComponents[item.icon] || HomeIcon;
                        const isActive = pathactive === item.to.replace('/', '').toLowerCase();

                        return allowed ? (
                            <ListItem key={index} disablePadding className={`${isActive ? 'active' : null}`}>
                                <CustomTooltip title={item.label} placement="right" arrow disableHoverListener={isOpen}>
                                    <ListItemButton
                                        onClick={() => (window.location.href = `/${subdomain}/${item.to}`)}
                                        sx={{
                                            justifyContent: isOpen ? 'initial' : 'center',
                                            '&:hover': {
                                                backgroundColor: theme.palette.common.white,
                                                color: theme.palette.text.primary
                                            },
                                            backgroundColor: isActive ? theme.palette.common.white : 'transparent',
                                            color: isActive ? theme.palette.text.primary : theme.palette.common.white
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
                        ) : null;
                    })}

                    <ListItem disablePadding sx={{ marginTop: 'auto' }}>
                        <ListItemButton
                            onClick={() => handleLogOff()}
                            sx={{
                                '&:hover': {
                                    backgroundColor: theme.palette.common.white,
                                    color: theme.palette.text.primary
                                },
                                color: theme.palette.common.white
                            }}
                        >
                            {/* <CustomTooltip title="Log out" placement="right" arrow disableHoverListener={isOpen}> */}
                            {/* <LogoutButtonComponent /> */}
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
                            {/* </CustomTooltip> */}
                        </ListItemButton>
                    </ListItem>
                </MenuList>
            )}
        </SidebarContainer>
    );
}
