'use client';
import React, { useEffect, useState } from 'react';
import { FaUser, FaPhone, FaClipboardList } from 'react-icons/fa';
import BasicContent from './BasicContent';
import Cookies from 'js-cookie';
import axios from 'axios';
import Acvitivitycontet from './Acvitivitycontet';
import FollowContent from './FollowContent';
import { API_BASE_URL } from '../../../../utils';
import { Box, Card, List, ListItemButton, ListItemIcon, ListItemText, Tabs, Tab } from '@mui/material';

type LeadsActivityProps = {
    leadId: string;
    currentLead: any;
    convertUnder: string;
};

const items = [
    { name: 'Basic', icon: <FaUser /> },
    { name: 'Follow Up', icon: <FaPhone /> },
    { name: 'Activity', icon: <FaClipboardList /> }
];

const LeadsActivity: React.FC<LeadsActivityProps> = ({ leadId, currentLead, convertUnder }) => {
    const accessToken = Cookies.get('accessToken');
    const subdomain = Cookies.get('subdomain');
    const [leads, setLeads] = useState<any>({});
    const [selectedTab, setSelectedTab] = useState(0);
    const [follow, setFollow] = useState<any[]>([]);

    const fetchdata = () => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        axios
            .get(`${API_BASE_URL}/lead/${subdomain}/${leadId}`, { headers })
            .then((res) => {
                const dataleads = res.data.data.lead;
                setLeads(dataleads);
            })
            .catch(() => {});
    };

    const fetchlead = () => {
        const headers = { Authorization: `Bearer ${accessToken}` };
        axios
            .get(`${API_BASE_URL}/activity/${subdomain}/${convertUnder}`, { headers })
            .then((res) => {
                const dataleads = res.data.data.activities;
                setFollow(dataleads);
            })
            .catch(() => {});
    };

    useEffect(() => {
        fetchdata();
        fetchlead();
        // eslint-disable-next-line
    }, []);

    const renderContent = () => {
        switch (selectedTab) {
            case 0:
                return <BasicContent currentLead={leads} />;
            case 1:
                return <FollowContent currentLead={leads} />;
            case 2:
                return <Acvitivitycontet follow={follow} />;
            default:
                return null;
        }
    };

    return (
        <Box display="flex">
            <Card
                sx={{
                    width: 200,
                    height: 470,
                    borderRight: '1px solid #ccc',
                    mt: 5
                }}
            >
                <List>
                    {items.map((item, idx) => (
                        <ListItemButton key={item.name} selected={selectedTab === idx} onClick={() => setSelectedTab(idx)}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    ))}
                </List>
            </Card>
            <Box sx={{ p: 3, flexGrow: 1 }}>{renderContent()}</Box>
        </Box>
    );
};

export default LeadsActivity;
