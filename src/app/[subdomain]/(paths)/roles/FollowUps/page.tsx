'use client';
import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography, useMediaQuery, useTheme, Card, CardContent } from '@mui/material';
import FollowupStatusPage from './pages/FollowupStatusPage';
import FollowupTypePage from './pages/LeadStatusPage';
import LeadStatusPage from '../Leads/LeadsStatus';
import LeadSoruce from '../Leads/LeadSoruce';

const LeadManagement: React.FC = () => {
    const [tabIndex, setTabIndex] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setTabIndex(newValue);
    };

    return (
        <Box sx={{ width: '100%', p: { xs: 1, sm: 2, md: 3 } }}>
            <Card sx={{ boxShadow: 0, background: 'transparent' }}>
                <CardContent>
                    <Tabs
                        value={tabIndex}
                        onChange={handleChange}
                        variant={isMobile ? 'scrollable' : 'standard'}
                        scrollButtons={isMobile ? 'auto' : false}
                        aria-label="Lead Configuration Tabs"
                        textColor="primary"
                        indicatorColor="primary"
                        sx={{ borderBottom: 1, borderColor: 'divider' }}
                    >
                        <Tab label="Follow-up Type" id="tab-0" aria-controls="tabpanel-0" />
                        <Tab label="Follow-up Status" id="tab-1" aria-controls="tabpanel-1" />
                        <Tab label="Lead Status" id="tab-2" aria-controls="tabpanel-2" />
                        <Tab label="Lead Soruce" id="tab-3" aria-controls="tabpanel-3" />
                    </Tabs>

                    <Box sx={{ mt: 2 }}>
                        {tabIndex === 0 && (
                            <Box role="tabpanel" id="tabpanel-0" aria-labelledby="tab-0">
                                <FollowupStatusPage />
                            </Box>
                        )}
                        {tabIndex === 1 && (
                            <Box role="tabpanel" id="tabpanel-1" aria-labelledby="tab-1">
                                <FollowupTypePage />
                            </Box>
                        )}
                        {tabIndex === 2 && (
                            <Box role="tabpanel" id="tabpanel-2" aria-labelledby="tab-2">
                                <LeadStatusPage />
                            </Box>
                        )}
                        {tabIndex === 3 && (
                            <Box role="tabpanel" id="tabpanel-3" aria-labelledby="tab-3">
                                <LeadSoruce />
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default LeadManagement;
