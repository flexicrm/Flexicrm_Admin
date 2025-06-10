export interface Summary {
    totalLeads?: number;
    activeLeads?: number;
    conversionRate?: number;
}

export interface Acquisition {
    monthly: {
        labels?: string[];
        data?: number[];
    };
}

export interface Lead {
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

export interface FollowUp {
    title: string;
    date: string;
    assignTo: {
        firstname: string;
        lastname: string;
    };
}

export interface DashboardData {
    summary?: Summary;
    acquisition: Acquisition;
    recentLeads: Lead[];
    upcomingFollowups: Array<{ followUps: FollowUp[] }>;
    leadsByStatus: any;
    funnelData: any;
    highValueLeads: any;
}
