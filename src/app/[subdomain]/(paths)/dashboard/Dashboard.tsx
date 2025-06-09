'use client';
import React, { useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Container, Grid, Box, Typography, CircularProgress, Alert, Button } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { Users, MessageSquare, PiggyBank, Calendar } from 'lucide-react';
import { GETactivity } from '../../../../../api/dashboardApi';
import SummaryCard from './SummaryCard';
import UpcomingFollowUps from './UpcomingFollowUps';
import LeadAcquisitionChart from './LeadAcquisitionChart';
import RecentLeadsTable from './RecentLeadsTable';
import HighValueOpportunities from './HighValueOpportunities';

interface Summary {
    totalLeads: number;
    activeLeads: number;
    conversionRate: number;
}

interface Acquisition {
    monthly: {
        labels: string[];
        data: number[];
    };
}

interface Lead {
    _id: string;
    manualData?: {
        name?: string;
        company?: string;
        email?: string;
        mobileNo?: string;
    };
    potentialValue?: number;
    leadstatus?: {
        statusName?: string;
    };
    lastContact?: string;
    LeadId?: string;
}

interface FollowUp {
    title: string;
    date: string;
    assignTo: {
        firstname: string;
        lastname: string;
    };
}

interface DashboardData {
    summary: Summary;
    acquisition: Acquisition;
    recentLeads: Lead[];
    upcomingFollowups: Array<{ followUps: FollowUp[] }>;
}

const Dashboard: React.FC = () => {
    const [data, setData] = useState<any | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [timeframe, setTimeframe] = useState<string>('monthly');
    const subdomain = Cookies.get('subdomain');

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setRefreshing(true);
            const response = await GETactivity(subdomain);
            if (response) {
                setData(response.data);
                setError(null);
            } else {
                setError('Failed to fetch data');
            }
        } catch (err) {
            setError('An error occurred while fetching data');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, [subdomain]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const monthlyAcquisitionData = data?.acquisition?.monthly?.labels?.map((label, index) => ({
        name: label,
        value: data.acquisition.monthly.data[index] || 0
    }));

    const recentLeads = data?.recentLeads?.map((lead) => ({
        id: lead._id,
        name: lead.manualData?.name || 'Unknown',
        company: lead.manualData?.company || 'Unknown',
        value: lead.potentialValue || 0,
        status: lead.leadstatus?.statusName || 'New',
        email: lead.manualData?.email,
        phone: lead.manualData?.mobileNo,
        LeadId: lead?.LeadId,
        lastContact: lead.lastContact ? new Date(lead.lastContact).toLocaleDateString() : 'Never'
    }));

    const highValueOpportunities = recentLeads
        ?.sort((a, b) => b.value - a.value)
        .slice(0, 5)
        .map((lead) => ({
            ...lead,
            valueFormatted: `₹ ${lead.value.toLocaleString()}`
        }));

    const totalPotentialValue = recentLeads?.reduce((sum, lead) => sum + (lead.value || 0), 0) || 0;

    const handleRefresh = () => {
        fetchData();
    };

    const handleSummaryClick = (type: string) => {
        console.log(`View all ${type}`);
    };

    const handleTimeframeChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const value = event.target.value as string;
        setTimeframe(value);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    };

    if (isLoading && !data) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 2 }}>
                <Alert
                    severity="error"
                    action={
                        <Button color="error" size="small" onClick={fetchData} endIcon={<Refresh />}>
                            Retry
                        </Button>
                    }
                >
                    {error}
                </Alert>
            </Box>
        );
    }

    return (
        <Container maxWidth="xl">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h5" component="h2" fontWeight={600}>
                    Dashboard
                </Typography>
            </Box>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="Total Leads" value={data?.summary?.totalLeads || 0} loading={isLoading} icon={<Users className="h-5 w-5" />} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="Active Opportunities" value={data?.summary?.activeLeads || 0} loading={isLoading} icon={<MessageSquare className="h-5 w-5" />} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="Potential Value" value={`₹ ${totalPotentialValue.toLocaleString()}`} loading={isLoading} icon={<PiggyBank className="h-5 w-5" />} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="Conversion Rate" value={`${data?.summary?.conversionRate || 0}%`} loading={isLoading} icon={<Calendar className="h-5 w-5" />} />
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, sm: 6, md: 9 }}>
                    <LeadAcquisitionChart data={monthlyAcquisitionData || []} timeframe={timeframe} handleTimeframeChange={handleTimeframeChange} isLoading={isLoading} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <UpcomingFollowUps data={data?.upcomingFollowups || []} isLoading={isLoading} />
                </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <RecentLeadsTable data={recentLeads || []} isLoading={isLoading} subdomain={subdomain || ''} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <HighValueOpportunities data={highValueOpportunities || []} isLoading={isLoading} subdomain={subdomain || ''} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;
