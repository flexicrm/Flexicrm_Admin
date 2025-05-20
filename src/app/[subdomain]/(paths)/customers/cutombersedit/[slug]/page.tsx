// "use client";
// import React, { useState, useEffect, useContext } from "react";
// import { Card, Col, Row } from "react-bootstrap";
// // import "../../../styles/customer.scss"
// import Profiles from "../../pages/profiles/page";
// import Contacts from "../../pages/contacts/page";
// import Notes from "../../pages/notes/page";
// import Invoice from "../../pages/invoice/page";
// import Payments from "../../pages/payments/page";
// import Estimate from "../../pages/estimate/page";
// import Expense from "../../pages/expense/page";
// // import Payments from "./pages/payments/page"
// import Contract from "../../pages/contract/page";
// import { useParams } from "next/navigation";

// import Projects from "../../pages/projects/page";

// import Cookies from "js-cookie";
// import Swal from "sweetalert2";
// // import { API_BASE_URL } from "@/app/utils";
// import axios from "axios";
// import userContext from "../../../../../UseContext/UseContext";
// import { API_BASE_URL } from "../../../../../utils";
// // import userContext from "@/app/UseContext/UseContext";

// export default function Customer() {
//   const { slug } = useParams();
//   const {setrefreshdata}=useContext(userContext)
//   const {setSingledata}= useContext(userContext)
//   console.log(slug, "slug");
//   const subdomain = Cookies.get("subdomain");
//   const [data, setData] = useState([]);
//   const accessToken = Cookies.get("accessToken");
//   const [selectedMenu, setSelectedMenu] = useState("Profile");
//   const [animate, setAnimate] = useState(false);

//   console.log(data,"id")
//   useEffect(() => {

//     setrefreshdata(fetchData)
//     fetchData();
//   }, [slug, subdomain, accessToken]);
//   const fetchData = async () => {
//     const headers = { Authorization: `Bearer ${accessToken}` };
//     try {
//       const response = await axios.get(
//         `${API_BASE_URL}/customer/${subdomain}/${slug}`,
//         { headers }
//       );

//     console.log(response,"response")
//       const customerData = response.data.data.customer;
//       setData(customerData);
//       setSingledata(customerData)
//     } catch (error) {
//       console.error("Error fetching customer data:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "There was an error fetching customer data.",
//       });
//     }
//   };
//   const menus = [
//     { name: "Profile", icon: "pi pi-user" },
//     { name: "Contacts", icon: "pi pi-address-book" },
//     { name: "Notes", icon: "pi pi-clipboard" },
//     { name: "Projects", icon: "pi pi-folder" },
//     { name: "Invoices", icon: "pi pi-receipt" },
//     { name: "Expenses", icon: "pi pi-money-bill" },
//     { name: "Estimates", icon: "pi pi-file" },
//     { name: "Payments", icon: "pi pi-wallet" },
//     { name: "Contracts", icon: "pi pi-file-text" },
//   ];

//   const renderComponent = () => {
//     switch (selectedMenu) {
//       case "Profile":
//         return (
//           <Profiles
//             onContinue={() => setSelectedMenu("Contacts")}
//             slug={slug}
//             fetchData={fetchData}
//           />
//         );
//       case "Contacts":
//         return (
//           <Contacts onContinue={() => setSelectedMenu("Notes")} slug={data} fetchData={fetchData}  />
//         );
//       case "Notes":
//         return (
//           <Notes onContinue={() => setSelectedMenu("Invoices")} slug={slug}  fetchData={fetchData} />
//         );
//       case "Invoices":
//         return (
//           <Invoice onContinue={() => setSelectedMenu("Payments")} slug={data} fetchData={fetchData} />
//         );
//       case "Payments":
//       // return <Payments  onContinue={() => setSelectedMenu("Estimates")}  >;
//       case "Estimates":
//         return (
//           <Estimate
//             onContinue={() => setSelectedMenu("Expenses")}
//             slug={slug}
//             fetchData={fetchData}

//           />
//         );
//       case "Expenses":
//         return (
//           <Expense
//             onContinue={() => setSelectedMenu("Contracts")}
//             slug={slug}

//             fetchData={fetchData}
//           />
//         );
//       case "Contracts":
//         return (
//           <Contract
//             onContinue={() => setSelectedMenu("Projects")}
//             slug={slug}
//             fetchData={fetchData}

//           />
//         );
//       case "Projects":
//         return <Projects  slug={data}  fetchData={fetchData}  />
//       default:
//         return <Profiles />;
//     }
//   };

//   useEffect(() => {
//     setAnimate(true);
//     const timer = setTimeout(() => setAnimate(false), 500);
//     return () => clearTimeout(timer);
//   }, [selectedMenu]);
// // console.log(data.contacts,"contactdata")
//   return (
//     <div>
//       <div className="page-header">
//         <h5 className="page-title text-white  ">{data.Companyname}</h5>
//       </div>
//       <Row className="meun-left">
//         <Col md={3} className="">
//           <Card>
//             <ul className="list-inline mt-2">
//               {menus.map((menu) => (
//                 <li
//                   key={menu.name}
//                   className={`ms-2 p-1 active-li ${
//                     selectedMenu === menu.name ? "active" : ""
//                   }`}
//                   onClick={() => setSelectedMenu(menu.name)}
//                 >
//                   <div className="btn-items">
//                   <i className={menu.icon}></i> {menu.name}
//                   {/* <hr /> */}
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </Card>
//         </Col>
//         <Col md={9}>
//           <Card className={animate ? "slide-in" : ""}>{renderComponent()}</Card>
//         </Col>
//       </Row>
//     </div>
//   );
// }
'use client';
import React, { useState, useEffect, useContext } from 'react';
import { Box, Card, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, styled, useTheme, Paper, Avatar, Divider, Chip } from '@mui/material';
import {
    Person as PersonIcon,
    Contacts as ContactsIcon,
    Notes as NotesIcon,
    Folder as FolderIcon,
    Receipt as ReceiptIcon,
    AttachMoney as AttachMoneyIcon,
    Description as DescriptionIcon,
    AccountBalanceWallet as WalletIcon,
    Article as ArticleIcon,
    Business as BusinessIcon
} from '@mui/icons-material';
import Profiles from '../../pages/profiles/page';
import Contacts from '../../pages/contacts/page';
import Notes from '../../pages/notes/page';
import Invoice from '../../pages/invoice/page';
import Payments from '../../pages/payments/page';
import Estimate from '../../pages/estimate/page';
import Expense from '../../pages/expense/page';
import Contract from '../../pages/contract/page';
import Projects from '../../pages/projects/page';
import { useParams } from 'next/navigation';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import axios from 'axios';
import userContext from '../../../../../UseContext/UseContext';
import { API_BASE_URL } from '../../../../../utils';

const SidebarCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[2],
    height: '100%',
    overflow: 'hidden'
}));

const ContentCard = styled(Card)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    minHeight: 'calc(100vh - 200px)',
    transition: 'all 0.3s ease',
    '&.slide-in': {
        animation: '$slideIn 0.3s ease-out'
    },
    '@keyframes slideIn': {
        '0%': {
            opacity: 0,
            transform: 'translateX(20px)'
        },
        '100%': {
            opacity: 1,
            transform: 'translateX(0)'
        }
    }
}));

const ActiveMenuItem = styled(ListItemButton)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    margin: theme.spacing(0.5),
    '&.Mui-selected': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        '& .MuiListItemIcon-root': {
            color: theme.palette.common.white
        },
        '&:hover': {
            backgroundColor: theme.palette.primary.light
        }
    },
    '&:hover': {
        backgroundColor: theme.palette.action.hover
    }
}));

const HeaderPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.shape.borderRadius
}));

interface MenuItem {
    name: string;
    icon: JSX.Element;
}

export default function Customer() {
    const { slug } = useParams<{ slug: string }>();
    const { setrefreshdata, setSingledata } = useContext(userContext);
    const theme = useTheme();

    const [data, setData] = useState<any>({});
    const [selectedMenu, setSelectedMenu] = useState<string>('Profile');
    const [animate, setAnimate] = useState<boolean>(false);

    const subdomain = Cookies.get('subdomain');
    const accessToken = Cookies.get('accessToken');

    useEffect(() => {
        fetchData();
    }, [slug, subdomain, accessToken]);

    const fetchData = async () => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        try {
            const response = await axios.get(`${API_BASE_URL}/customer/${subdomain}/${slug}`, { headers });

            const customerData = response.data.data.customer;
            setData(customerData);
            setSingledata(customerData);
        } catch (error) {
            console.error('Error fetching customer data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'There was an error fetching customer data.'
            });
        }
    };

    const menus: MenuItem[] = [
        { name: 'Profile', icon: <PersonIcon /> },
        { name: 'Contacts', icon: <ContactsIcon /> },
        { name: 'Notes', icon: <NotesIcon /> },
        { name: 'Projects', icon: <FolderIcon /> },
        { name: 'Invoices', icon: <ReceiptIcon /> },
        { name: 'Expenses', icon: <AttachMoneyIcon /> },
        { name: 'Estimates', icon: <DescriptionIcon /> },
        { name: 'Payments', icon: <WalletIcon /> },
        { name: 'Contracts', icon: <ArticleIcon /> }
    ];

    const renderComponent = () => {
        switch (selectedMenu) {
            case 'Profile':
                return <Profiles slug={slug} fetchData={fetchData} />;
            case 'Contacts':
                return <Contacts fetchData={fetchData} />;
            case 'Notes':
                return <Notes />;
            case 'Invoices':
                return <Invoice  fetchData={fetchData} />;
            case 'Payments':
                return <Payments />;
            case 'Estimates':
                return <Estimate  fetchData={fetchData} />;
            case 'Expenses':
                return <Expense fetchData={fetchData} />;
            case 'Contracts':
                return <Contract fetchData={fetchData} />;
            case 'Projects':
                return <Projects slug={data} fetchData={fetchData} />;
            default:
                return <Profiles slug={slug} fetchData={fetchData} />;
        }
    };

    useEffect(() => {
        setAnimate(true);
        const timer = setTimeout(() => setAnimate(false), 300);
        return () => clearTimeout(timer);
    }, [selectedMenu]);

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <HeaderPaper elevation={3}>
                <Box display="flex" alignItems="center" gap={3}>
                    <Avatar
                        sx={{
                            width: 64,
                            height: 64,
                            bgcolor: theme.palette.secondary.main
                        }}
                    >
                        <BusinessIcon fontSize="large" />
                    </Avatar>
                    <Box>
                        <Typography variant="h4" component="h1" fontWeight="bold">
                            {data.Companyname || 'Customer Profile'}
                        </Typography>
                        <Box display="flex" gap={2} mt={1}>
                            {data.email && (
                                <Chip
                                    label={data.email}
                                    size="small"
                                    sx={{
                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                        color: 'white'
                                    }}
                                />
                            )}
                            {data.phone && (
                                <Chip
                                    label={data.phone}
                                    size="small"
                                    sx={{
                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                        color: 'white'
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                </Box>
            </HeaderPaper>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <SidebarCard>
                        <List>
                            {menus.map((menu) => (
                                <ListItem key={menu.name} disablePadding>
                                    <ActiveMenuItem selected={selectedMenu === menu.name} onClick={() => setSelectedMenu(menu.name)}>
                                        <ListItemIcon sx={{ minWidth: 40 }}>{menu.icon}</ListItemIcon>
                                        <ListItemText primary={menu.name} primaryTypographyProps={{ fontWeight: 500 }} />
                                    </ActiveMenuItem>
                                </ListItem>
                            ))}
                        </List>
                    </SidebarCard>
                </Grid>

                <Grid size={{ xs: 12, md: 9 }}>
                    <ContentCard className={animate ? 'slide-in' : ''}>
                        <Box p={3}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                sx={{
                                    fontWeight: 600,
                                    // color: theme.palette.text.primary,
                                    mb: 3
                                }}
                            >
                                {selectedMenu}
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                            {renderComponent()}
                        </Box>
                    </ContentCard>
                </Grid>
            </Grid>
        </Box>
    );
}
