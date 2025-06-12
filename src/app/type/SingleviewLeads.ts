// Interfaces
export interface User {
    firstname?: string;
    lastname?: string;
    profileImage?: string;
}

export interface ActivityItem {
    userId?: User;
    actionType?: string;
    description?: string;
    createdAt?: string;
    timestamp?: string;
}

export interface Address {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zipCode?: string;
}

export interface ManualData {
    email?: string;
    mobileNo?: string;
    company?: string;
    address?: Address;
    website?: string;
    name?: string;
}

export interface FollowUp {
    id?: string;
    title?: string;
    notes: string;
    followUpDate: string;
    status?: 'completed' | 'pending' | 'overdue';
    priority?: 'high' | 'medium' | 'low';
    assignedTo?: string;
    type?: 'call' | 'meeting' | 'email' | 'whatsapp' | 'visit' | 'other';
    reminderSet?: boolean;
    reminderDate?: string;
    outcome?: string;
}

export interface Lead {
    LeadId?: string;
    manualData?: ManualData;
    leadstatus?: any;
    leadsource?: string;
    description?: string;
    followUps?: FollowUp[];
    notes?: any;
    createdAt?: string;
    potentialValue?: number;
    owner?: string;
    lastActivity?: string;
    assignTo: any;
    _id?: string;
}

export interface LeadsActivityProps {
    id: any;
}
export type Severity = 'error' | 'warning' | 'info' | 'success';
