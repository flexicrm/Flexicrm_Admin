'use client';

import '../../globals.css';
// import NotFound from '../../ui/dashboard/notfound/page';
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
import { CssBaseline } from '@mui/material';
import { styled } from '@mui/material/styles';

// Global styles
const GlobalStyles = styled('div')({
    body: {
        textDecoration: 'none !important',
        fontFamily: '"Titillium Web", serif !important'
    },
    a: {
        textDecoration: 'none !important'
    },
    '.p-component': {
        fontFamily: '"Titillium Web", serif !important'
    }
});

// Container styles
const ContainerNavbar = styled('div')({
    display: 'flex',
    backgroundColor: 'rgba(10, 45, 90, 0.966)',
    height: '100vh',
    position: 'fixed',
    zIndex: 1000
});

const ContainerSidebar = styled('div')({
    position: 'fixed',
    marginTop: '20px',
    zIndex: 1000
});

const LayoutContainer = styled('div')({
    marginTop: '5rem',
    backgroundColor: 'rgba(10, 45, 90, 0.966)'
});

const LayoutSidebar = styled('div')({
    zIndex: 999,
    position: 'fixed',
    top: '4rem'
});

const LayoutContainers = styled('div')({
    flex: '0 1 1',
    height: '80%',
    marginLeft: '5%'
});

const LayoutContent = styled('div')({
    marginTop: '12px',
    paddingTop: '5rem',
    backgroundColor: 'white',
    padding: '2rem',
    height: 'calc(100vh - 5rem)',
    boxShadow: 'inset 0 3px 4px rgba(0, 0, 0, .1)',
    borderTop: '1px solid var(--surface-border)',
    overflow: 'auto',
    borderTopLeftRadius: '30px'
});

const SubMenuItem = styled('div')({
    span: {
        display: 'none',
        position: 'absolute',
        backgroundColor: 'black',
        padding: '0.5rem',
        color: 'white',
        margin: 'auto',
        width: '7rem',
        textAlign: 'center'
        // backgroundColor: 'rgba(10, 45, 90, 0.966)'
    },
    '&:hover + span': {
        display: 'block'
    }
});

const ButtonAll = styled('button')({
    background: '#133460 !important',
    borderRadius: '10px !important',
    color: '#fff !important',
    border: '1px solid transparent !important',
    padding: '10px !important',
    '&:hover': {
        background: '#fff !important',
        borderRadius: '10px !important',
        color: '#133460 !important',
        border: '1px solid #aeaeae !important',
        boxShadow: '1px 1px 20px 0px rgba(0, 0, 0, 0.1019607843)'
    }
});

const ButtonAllCln = styled('button')({
    background: '#fff !important',
    borderRadius: '10px !important',
    color: '#133460 !important',
    border: '1px solid #aeaeae !important',
    padding: '10px !important',
    boxShadow: '1px 1px 20px 0px rgba(0, 0, 0, 0.1019607843)'
});

const Label = styled('label')({
    color: '#000000',
    fontFamily: 'Titillium Web, sans-serif',
    fontSize: '16px',
    fontWeight: 700
});

const CustomSwitch = styled('div')({
    '.p-inputswitch.slider': {
        borderColor: 'white'
    },
    '.p-inputswitch.p-highlight': {
        backgroundColor: 'rgba(10, 45, 90, 0.965)',
        borderColor: 'rgba(10, 45, 90, 0.965)'
    },
    '.p-inputswitch .p-inputswitch-slider': {
        backgroundColor: 'white'
    },
    '.p-inputswitch.p-highlight .p-inputswitch-slider': {
        backgroundColor: 'rgba(10, 45, 90, 0.965)'
    }
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
    const [isOpen, setIsOpen] = useState<boolean>(false);
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
            <GlobalStyles />
            <userContext.Provider value={defaultvalues}>
                <LayoutContainer>
                    <ContainerNavbar>
                        <Navbar isOpen={isOpen} toggleSidebar={toggleSidebar} />
                    </ContainerNavbar>
                    <LayoutSidebar>
                        <ContainerSidebar>
                            <Sidebar isOpen={isOpen} />
                        </ContainerSidebar>
                    </LayoutSidebar>
                    <LayoutContainers>
                        <LayoutContent>{children}</LayoutContent>
                    </LayoutContainers>
                </LayoutContainer>
            </userContext.Provider>
        </>
    );
}
