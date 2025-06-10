import { Grid } from '@mui/material';
import React from 'react';
import SummaryCard from '../SummaryCard';
import { Users, MessageSquare, PiggyBank, Calendar } from 'lucide-react';
export default function SummarySection(data: any, isLoading: boolean) {
    console.log(data, 'data');
    return (
        <>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard title="Total Leads" value={data?.data?.totalLeads?.overall || 0} loading={isLoading} icon={<Users className="h-5 w-5" />} trend={data?.data?.totalLeads?.trend} change={data?.data?.totalLeads?.percentage} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard
                        title="Active Opportunities"
                        value={data?.data?.activeLeads?.overall || 0}
                        loading={isLoading}
                        icon={<MessageSquare className="h-5 w-5" />}
                        trend={data?.data?.activeLeads?.trend}
                        change={data?.data?.activeLeads?.percentage}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard
                        title="Potential Value"
                        value={`₹ ${data.data.potentialValue?.overall.toLocaleString()}`}
                        loading={isLoading}
                        icon={<PiggyBank className="h-5 w-5" />}
                        trend={data?.data?.potentialValue?.trend}
                        change={data?.data?.potentialValue?.percentage}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <SummaryCard
                        title="Conversion Rate"
                        value={`${data?.data?.convertedLeads?.overall || 0}%`}
                        loading={isLoading}
                        icon={<Calendar className="h-5 w-5" />}
                        trend={data?.data?.convertedLeads?.trend}
                        change={data?.data?.convertedLeads?.percentage}
                    />
                </Grid>
            </Grid>
        </>
    );
}
