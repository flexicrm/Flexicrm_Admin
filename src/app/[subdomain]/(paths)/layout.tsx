// 'use client';
// import '../../globals.css';
// import React, { useEffect, useState, ReactNode, useContext } from 'react';
// import { useRouter } from 'next/navigation';
// import Cookies from 'js-cookie';
// import { useSelector } from 'react-redux';
// import Sidebar from '../../ui/dashboard/sidebar/page';
// import Navbar from '../../ui/dashboard/navbar/page';
// import { CssBaseline, Box, styled } from '@mui/material';
// import userContext from '../../UseContext/UseContext';
// import ClientWrapper from '../../Components/wrappers/useSubdomainCheck';
// import { UsersMe } from '../../../../api/user';
// import { LayoutContainer, LayoutContainers, LayoutContent, LayoutSidebar } from '../../ReuseableStyle/ReusableStyleCom';

// interface LayoutProps {
//     children: ReactNode;
// }
// interface RootState {
//     auth: {
//         accessToken: string;
//     };
// }
// export default function Layout({ children }: LayoutProps) {
//     const [isOpen, setIsOpen] = useState(false);
//     const { setData, data } = useContext(userContext);
//     console.log(data, 'data');
//     const subdomain = Cookies.get('subdomain') as string;
//     const crmaccess = Cookies.get('crmaccess');
//     const accessToken = useSelector((state: RootState) => state.auth.accessToken);
//     const toggleSidebar = () => setIsOpen(!isOpen);
//     const fetcHusers = async () => {
//         try {
//             if (crmaccess) {
//                 const response = await UsersMe(subdomain);

//                 setData(response.data);
//             } else {
//             }
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//         }
//     };

//     useEffect(() => {
//         fetcHusers();
//     }, [accessToken, subdomain]);

//     return (
//         <>
//             <CssBaseline />
//             <ClientWrapper>
//                 <LayoutContainer>
//                     <Box
//                         sx={{
//                             display: 'flex',
//                             backgroundColor: 'rgba(10, 45, 90, 0.966)',
//                             height: '100vh',
//                             position: 'fixed',
//                             zIndex: 1000
//                         }}
//                     >
//                         <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
//                     </Box>

//                     <LayoutSidebar>
//                         <Box
//                             sx={{
//                                 position: 'fixed',
//                                 marginTop: '0px',
//                                 zIndex: 1000
//                             }}
//                         >
//                             <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
//                         </Box>
//                     </LayoutSidebar>

//                     <LayoutContainers isOpen={isOpen}>
//                         <LayoutContent>{children}</LayoutContent>
//                     </LayoutContainers>
//                 </LayoutContainer>
//             </ClientWrapper>
//         </>
//     );
// }
'use client';

import '../../globals.css';
import React, { useEffect, useState, ReactNode, useContext, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { CssBaseline, Box } from '@mui/material';
import Sidebar from '../../ui/dashboard/sidebar/page';
import Navbar from '../../ui/dashboard/navbar/page';
import userContext from '../../UseContext/UseContext';
import ClientWrapper from '../../Components/wrappers/useSubdomainCheck';
import { UsersMe } from '../../../../api/user';
import { LayoutContainer, LayoutContainers, LayoutContent, LayoutSidebar } from '../../ReuseableStyle/ReusableStyleCom';

interface LayoutProps {
    children: ReactNode;
}

interface RootState {
    auth: {
        accessToken: string;
    };
}

export default function Layout({ children }: LayoutProps) {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const { setData } = useContext(userContext);

    const subdomain = Cookies.get('subdomain') || '';
    const crmaccess = Cookies.get('crmaccess');
    const accessToken = useSelector((state: RootState) => state.auth.accessToken);

    const toggleSidebar = () => setIsOpen((prev) => !prev);

    const handleClickOutside = (event: MouseEvent) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const fetchUserDetails = async () => {
        if (!crmaccess || !subdomain) return;
        try {
            const response = await UsersMe(subdomain);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, [accessToken, subdomain]);

    return (
        <>
            <CssBaseline />
            <ClientWrapper>
                <LayoutContainer>
                    {/* Top Navbar */}
                    <Box
                        sx={{
                            display: 'flex',
                            backgroundColor: 'rgba(10, 45, 90, 0.966)',
                            height: '100vh',
                            position: 'fixed',
                            zIndex: 1000
                        }}
                    >
                        <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
                    </Box>

                    {/* Sidebar with click detection */}
                    <LayoutSidebar>
                        <Box
                            ref={sidebarRef}
                            sx={{
                                position: 'fixed',
                                marginTop: 0,
                                zIndex: 1000
                            }}
                        >
                            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
                        </Box>
                    </LayoutSidebar>

                    {/* Main Content */}
                    <LayoutContainers isOpen={isOpen}>
                        <LayoutContent>{children}</LayoutContent>
                    </LayoutContainers>
                </LayoutContainer>
            </ClientWrapper>
        </>
    );
}
