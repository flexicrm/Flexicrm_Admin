// // 'use client';

// // import '../../globals.css';
// // // import NotFound from '../../ui/dashboard/notfound/page';
// // import { useRouter } from 'next/navigation';
// // import React, { useContext, useEffect, useState, ReactNode } from 'react';
// // import Cookies from 'js-cookie';
// // import axios from 'axios';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { setSlugname } from '../../store/slice/slug';
// // import { setChangeColor } from '../../store/slice/colorslice';
// // import { API_BASE_URL } from '../../utils';
// // import Sidebar from '../../ui/dashboard/sidebar/page';
// // import userContext from '../../UseContext/UseContext';
// // import Navbar from '../../ui/dashboard/navbar/page';
// // import { CssBaseline } from '@mui/material';
// // import { styled } from '@mui/material/styles';

// // // Global styles
// // const GlobalStyles = styled('div')({
// //     body: {
// //         textDecoration: 'none !important',
// //         fontFamily: '"Titillium Web", serif !important'
// //     },
// //     a: {
// //         textDecoration: 'none !important'
// //     },
// //     '.p-component': {
// //         fontFamily: '"Titillium Web", serif !important'
// //     }
// // });

// // // Container styles
// // const ContainerNavbar = styled('div')({
// //     display: 'flex',
// //     backgroundColor: 'rgba(10, 45, 90, 0.966)',
// //     height: '100vh',
// //     position: 'fixed',
// //     zIndex: 1000
// // });

// // const ContainerSidebar = styled('div')({
// //     position: 'fixed',
// //     marginTop: '15px',
// //     zIndex: 1000
// // });

// // const LayoutContainer = styled('div')({
// //     marginTop: '5rem',
// //     backgroundColor: 'rgba(10, 45, 90, 0.966)'
// // });

// // const LayoutSidebar = styled('div')({
// //     zIndex: 999,
// //     position: 'fixed',
// //     top: '4rem'
// // });

// // const LayoutContainers = styled('div')({
// //     flex: '0 1 1',
// //     height: '80%',
// //     marginLeft: '5%'
// // });

// // const LayoutContent = styled('div')({
// //     marginTop: '12px',
// //     paddingTop: '5rem',
// //     backgroundColor: 'white',
// //     padding: '2rem',
// //     height: 'calc(100vh - 5rem)',
// //     boxShadow: 'inset 0 3px 4px rgba(0, 0, 0, .1)',
// //     borderTop: '1px solid var(--surface-border)',
// //     overflow: 'auto',
// //     borderTopLeftRadius: '30px'
// // });

// // interface LayoutProps {
// //     children: ReactNode;
// // }

// // interface RootState {
// //     auth: {
// //         accessToken: string;
// //     };
// // }

// // export default function Layout({ children }: LayoutProps) {
// //     const router = useRouter();
// //     const [isOpen, setIsOpen] = useState<boolean>(false);
// //     const [isLoading, setIsLoading] = useState<boolean>(true);
// //     const subdomain = Cookies.get('subdomain') as string;
// //     const dispatch = useDispatch();
// //     const [data, setData] = useState<any>([]);
// //     const toggleSidebar = () => setIsOpen(!isOpen);
// //     const [cutomber, setCustomerId] = useState<any[]>([]);
// //     const [Customber, setCustomber] = useState<any[]>([]);
// //     const [singledata, setSingledata] = useState<any>({});
// //     const [refreshdata, setrefreshdata] = useState<boolean>(false);
// //     const [singleitem, setSingleitem] = useState<any[]>([]);
// //     const [finalTotals, setFinalTotal] = useState<any[]>([]);
// //     const [subtotals, setSubtotal] = useState<any[]>([]);
// //     const [discounts, setDiscount] = useState<any[]>([]);
// //     const [valuesdataleads, setValues] = useState<any[]>([]);
// //     const [report, setReport] = useState<any[]>([]);

// //     const accessToken = useSelector((state: RootState) => state.auth.accessToken);

// //     useEffect(() => {
// //         if (accessToken) {
// //             dispatch(setSlugname({ slugname: subdomain }));
// //             const headers = {
// //                 Authorization: `Bearer ${accessToken}`
// //             };
// //             axios.get(`${API_BASE_URL}/user/${subdomain}/me`, { headers }).then((response) => {
// //                 setData(response.data.data);
// //             });
// //         }
// //     }, [accessToken, dispatch, subdomain]);

// //     useEffect(() => {
// //         if (!accessToken) {
// //             router.push(`/${subdomain}/login`);
// //         } else {
// //             setIsLoading(false);
// //         }
// //     }, [accessToken, router, subdomain]);

// //     useEffect(() => {
// //         const interval = setInterval(() => {
// //             Cookies.remove('accessToken');
// //             Cookies.remove('refreshToken');
// //             Cookies.remove('isFirstlogin');
// //             router.push(`/${subdomain}/login`);
// //         }, 3600000);
// //         return () => clearInterval(interval);
// //     }, [router, subdomain]);

// //     if (isLoading) {
// //         return null;
// //     }

// //     const defaultvalues = {
// //         singleitem,
// //         setSingleitem,
// //         cutomber,
// //         setCustomerId,
// //         setCustomber,
// //         Customber,
// //         setSingledata,
// //         singledata,
// //         refreshdata,
// //         setrefreshdata,
// //         setFinalTotal,
// //         setSubtotal,
// //         setDiscount,
// //         discounts,
// //         subtotals,
// //         finalTotals,
// //         setValues,
// //         valuesdataleads,
// //         data,
// //         setData,
// //         report,
// //         setReport
// //     };

// //     return (
// //         <>
// //             <CssBaseline />
// //             <GlobalStyles />
// //             <userContext.Provider value={defaultvalues}>
// //                 <LayoutContainer>
// //                     <ContainerNavbar>
// //                         <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
// //                     </ContainerNavbar>
// //                     <LayoutSidebar>
// //                         <ContainerSidebar>
// //                             <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
// //                         </ContainerSidebar>
// //                     </LayoutSidebar>
// //                     <LayoutContainers>
// //                         <LayoutContent>{children}</LayoutContent>
// //                     </LayoutContainers>
// //                 </LayoutContainer>
// //             </userContext.Provider>
// //         </>
// //     );
// // }
// 'use client';

// import { useRouter } from 'next/navigation';
// import React, { useContext, useEffect, useState, ReactNode } from 'react';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// import '../../globals.css';
// import { useSelector, useDispatch } from 'react-redux';
// import { setSlugname } from '../../store/slice/slug';
// import { setChangeColor } from '../../store/slice/colorslice';
// import { API_BASE_URL } from '../../utils';
// import Sidebar from '../../ui/dashboard/sidebar/page';
// import userContext from '../../UseContext/UseContext';
// import Navbar from '../../ui/dashboard/navbar/page';
// import { CssBaseline, styled, Box, createTheme, Theme, useTheme } from '@mui/material';
// import { ThemeProvider } from '../../Theme/ThemeContext';

// // Styled components using theme
// const GlobalContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
//     display: 'flex',
//     flexDirection: 'column',
//     minHeight: '100vh',
//     backgroundColor: theme.palette.background.default
// }));

// const NavbarContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: '2rem',
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//     zIndex: theme.zIndex.drawer + 1,
//     display: 'flex',
//     alignItems: 'center'
// }));

// const SidebarContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
//     position: 'fixed',
//     top: '4rem',
//     left: 0,
//     bottom: 0,
//     zIndex: theme.zIndex.drawer,
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//     transition: theme.transitions.create('width', {
//         easing: theme.transitions.easing.sharp,
//         duration: theme.transitions.duration.leavingScreen
//     })
// }));

// const MainContent = styled(Box)(({ theme }: { theme: Theme }) => ({
//     // marginTop: '4rem',
//     // // marginLeft: '5%',
//     // padding: theme.spacing(3),
//     // flexGrow: 1,
//     // // backgroundColor: theme.palette.primary.main,
//     // minHeight: 'calc(100vh - 4rem)',
//     // borderTopLeftRadius: '30px',
//     // boxShadow: 'inset 0 3px 4px rgba(0, 0, 0, .1)',
//     // borderTop: `1px solid ${theme.palette.divider}`,
//     // overflow: 'auto'
//     marginTop: '12px',
//     paddingTop: '5rem',
//     backgroundColor: 'white',
//     padding: '2rem',
//     height: 'calc(100vh - 5rem)',
//     boxShadow: 'inset 0 3px 4px rgba(0, 0, 0, .1)',
//     borderTop: '1px solid var(--surface-border)',
//     overflow: 'auto',
//     borderTopLeftRadius: '30px'
// }));

// const ButtonPrimary = styled('button')(({ theme }: { theme: Theme }) => ({
//     background: `${theme.palette.secondary.main} `,
//     borderRadius: '10px ',
//     color: `${theme.palette.secondary.contrastText} `,
//     border: '1px solid transparent ',
//     padding: '10px !important',
//     fontFamily: theme.typography.fontFamily,
//     '&:hover': {
//         background: `${theme.palette.background.paper} `,
//         borderRadius: '10px !important',
//         color: `${theme.palette.secondary.main} `,
//         border: `1px solid ${theme.palette.divider} `,
//         boxShadow: theme.shadows[2]
//     }
// }));

// const ButtonSecondary = styled('button')(({ theme }: { theme: Theme }) => ({
//     background: `${theme.palette.background.paper} `,
//     borderRadius: '10px ',
//     color: `${theme.palette.secondary.main} `,
//     border: `1px solid ${theme.palette.divider} `,
//     padding: '10px ',
//     fontFamily: theme.typography.fontFamily,
//     boxShadow: theme.shadows[1]
// }));

// const CustomLabel = styled('label')(({ theme }: { theme: Theme }) => ({
//     color: theme.palette.text.primary,
//     fontFamily: theme.typography.fontFamily,
//     fontSize: '16px',
//     fontWeight: 700
// }));

// interface LayoutProps {
//     children: ReactNode;
// }

// interface RootState {
//     auth: {
//         accessToken: string;
//     };
// }

// export default function Layout({ children }: LayoutProps) {
//     const router = useRouter();
//     const [isOpen, setIsOpen] = useState<boolean>(false);
//     const [isLoading, setIsLoading] = useState<boolean>(true);
//     const subdomain = Cookies.get('subdomain') as string;
//     const dispatch = useDispatch();
//     const [data, setData] = useState<any>([]);
//     const toggleSidebar = () => setIsOpen(!isOpen);
//     const [cutomber, setCustomerId] = useState<any[]>([]);
//     const [Customber, setCustomber] = useState<any[]>([]);
//     const [singledata, setSingledata] = useState<any>({});
//     const [refreshdata, setrefreshdata] = useState<boolean>(false);
//     const [singleitem, setSingleitem] = useState<any[]>([]);
//     const [finalTotals, setFinalTotal] = useState<any[]>([]);
//     const [subtotals, setSubtotal] = useState<any[]>([]);
//     const [discounts, setDiscount] = useState<any[]>([]);
//     const [valuesdataleads, setValues] = useState<any[]>([]);
//     const [report, setReport] = useState<any[]>([]);

//     const accessToken = useSelector((state: RootState) => state.auth.accessToken);

//     useEffect(() => {
//         if (accessToken) {
//             dispatch(setSlugname({ slugname: subdomain }));
//             const headers = {
//                 Authorization: `Bearer ${accessToken}`
//             };
//             axios.get(`${API_BASE_URL}/user/${subdomain}/me`, { headers }).then((response) => {
//                 setData(response.data.data);
//             });
//         }
//     }, [accessToken, dispatch, subdomain]);

//     useEffect(() => {
//         if (!accessToken) {
//             router.push(`/${subdomain}/login`);
//         } else {
//             setIsLoading(false);
//         }
//     }, [accessToken, router, subdomain]);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             Cookies.remove('accessToken');
//             Cookies.remove('refreshToken');
//             Cookies.remove('isFirstlogin');
//             router.push(`/${subdomain}/login`);
//         }, 3600000);
//         return () => clearInterval(interval);
//     }, [router, subdomain]);

//     if (isLoading) {
//         return null;
//     }

//     const defaultvalues = {
//         singleitem,
//         setSingleitem,
//         cutomber,
//         setCustomerId,
//         setCustomber,
//         Customber,
//         setSingledata,
//         singledata,
//         refreshdata,
//         setrefreshdata,
//         setFinalTotal,
//         setSubtotal,
//         setDiscount,
//         discounts,
//         subtotals,
//         finalTotals,
//         setValues,
//         valuesdataleads,
//         data,
//         setData,
//         report,
//         setReport
//     };

//     return (
//         <ThemeProvider>
//             <CssBaseline />
//             <userContext.Provider value={defaultvalues}>
//                 <GlobalContainer>
//                     <NavbarContainer>
//                         <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
//                     </NavbarContainer>

//                     <SidebarContainer sx={{ width: isOpen ? 250 : 70 }}>
//                         <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
//                     </SidebarContainer>

//                     <MainContent
//                         sx={{
//                             marginLeft: {
//                                 xs: 0,
//                                 sm: isOpen ? 'calc(5% + 250px)' : 'calc(0% + 70px)'
//                             }
//                             // transition: theme.transitions.create('margin', {
//                             //     easing: theme.transitions.easing.sharp,
//                             //     duration: theme.transitions.duration.leavingScreen
//                             // })
//                         }}
//                     >
//                         {children}
//                     </MainContent>
//                 </GlobalContainer>
//             </userContext.Provider>
//         </ThemeProvider>
//     );
// }
'use client';

import '../../globals.css';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setSlugname } from '../../store/slice/slug';
import { setChangeColor } from '../../store/slice/colorslice';
import { API_BASE_URL } from '../../utils';
import Sidebar from '../../ui/dashboard/sidebar/page';
import userContext from '../../UseContext/UseContext';
import Navbar from '../../ui/dashboard/navbar/page';
import { CssBaseline, Box, styled } from '@mui/material';

// Styled components using Material-UI
const LayoutContainer = styled(Box)({
    marginTop: '48px',
    backgroundColor: 'rgba(10, 45, 90)',
    height: 'calc(100% - 48px)',
    overflow: 'hidden',
    bottom: 0
});

const LayoutSidebar = styled(Box)({
    zIndex: 999,
    position: 'fixed'
    // top: '0rem'
});

const LayoutContainers = styled(Box)({
    flex: '0 1 1',
    height: '80%',
    marginLeft: '48px'
});

const LayoutContent = styled(Box)({
    // marginTop: '12px',
    // paddingTop: '5rem',
    backgroundColor: '#f8f8fb',
    padding: '18px',
    height: 'calc(100vh - 3rem)',
    boxShadow: 'inset 0 3px 4px rgba(0, 0, 0, 0.1)',
    borderTop: '1px solid var(--surface-border)',
    overflow: 'auto',
    borderTopLeftRadius: '30px'
});

interface LayoutProps {
    children: ReactNode;
}

interface RootState {
    auth: {
        accessToken: string;
    };
}

export default function Layout({ children }: LayoutProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const subdomain = Cookies.get('subdomain') as string;
    const dispatch = useDispatch();
    const [data, setData] = useState<any>([]);
    const toggleSidebar = () => setIsOpen(!isOpen);
    const [cutomber, setCustomerId] = useState<any[]>([]);
    const [Customber, setCustomber] = useState<any[]>([]);
    const [singledata, setSingledata] = useState<any>({});
    const [refreshdata, setrefreshdata] = useState<boolean>(false);
    const [singleitem, setSingleitem] = useState<any[]>([]);
    const [finalTotals, setFinalTotal] = useState<any[]>([]);
    const [subtotals, setSubtotal] = useState<any[]>([]);
    const [discounts, setDiscount] = useState<any[]>([]);
    const [valuesdataleads, setValues] = useState<any[]>([]);
    const [report, setReport] = useState<any[]>([]);

    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

    useEffect(() => {
        if (accessToken) {
            dispatch(setSlugname({ slugname: subdomain }));
            const headers = {
                Authorization: `Bearer ${accessToken}`
            };
            axios.get(`${API_BASE_URL}/user/${subdomain}/me`, { headers }).then((response) => {
                setData(response.data.data);
            });
        }
    }, [accessToken, dispatch, subdomain]);

    useEffect(() => {
        if (!accessToken) {
            router.push(`/${subdomain}/login`);
        } else {
            setIsLoading(false);
        }
    }, [accessToken, router, subdomain]);

    useEffect(() => {
        const interval = setInterval(() => {
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
            Cookies.remove('isFirstlogin');
            router.push(`/${subdomain}/login`);
        }, 3600000);
        return () => clearInterval(interval);
    }, [router, subdomain]);

    if (isLoading) {
        return null;
    }

    const defaultvalues = {
        singleitem,
        setSingleitem,
        cutomber,
        setCustomerId,
        setCustomber,
        Customber,
        setSingledata,
        singledata,
        refreshdata,
        setrefreshdata,
        setFinalTotal,
        setSubtotal,
        setDiscount,
        discounts,
        subtotals,
        finalTotals,
        setValues,
        valuesdataleads,
        data,
        setData,
        report,
        setReport
    };

    return (
        <>
            <CssBaseline />
            <userContext.Provider value={defaultvalues}>
                <LayoutContainer>
                    <Box sx={{ display: 'flex', backgroundColor: 'rgba(10, 45, 90, 0.966)', height: '100vh', position: 'fixed', zIndex: 1000 }}>
                        <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
                    </Box>
                    <LayoutSidebar>
                        <Box sx={{ position: 'fixed', marginTop: '0px', zIndex: 1000 }}>
                            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
                        </Box>
                    </LayoutSidebar>
                    <LayoutContainers>
                        <LayoutContent>{children}</LayoutContent>
                    </LayoutContainers>
                </LayoutContainer>
            </userContext.Provider>
        </>
    );
}
