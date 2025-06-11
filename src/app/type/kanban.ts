export interface LeadStatus {
    _id: string;
    statusName: string;
    color?: string;
    [key: string]: any;
}

export interface Lead {
    _id: string;
    LeadId: string;
    assignTo: { firstname: string; lastname: string; email?: string; Profile?: string };
    createdAt: string;
    description: string;
    manualData: any;
    leadsource: string;
    followUps: any[];
    leadstatus: LeadStatus;
    [key: string]: any;
}

export interface TaskManagementProps {
    leads: { leads: Lead[] };
    setLeads: any;
    leadStatus: any;
}

export type Severity = 'error' | 'warning' | 'info' | 'success';