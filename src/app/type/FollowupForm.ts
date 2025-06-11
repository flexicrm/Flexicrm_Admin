export interface FollowUp {
    id?: string;
    leadStatus?: any;
    notes: string;
    dueDate: any;
    followUpDate?: any;
    status?: 'completed' | 'pending' | 'overdue' | 'scheduled';
    priority?: 'high' | 'medium' | 'low';
    assignTo?: string;
    type?: 'call' | 'meeting' | 'email' | 'whatsapp' | 'visit' | 'other';
    isSetTimer?: boolean;
    dateTime?: string;
    outcome?: string;
    leadId?: any;
    createdAt?: any;
}

export interface FollowUpFormProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    leadId: any;
    followUp?: any;
    UsersOptions: any;
    setLeads: any;
    setSnackbarMessage: any;
    setSnackbarSeverity: any;
    setSnackbarOpen: any;
    handleMenuClose: any;
}

export interface LeadStatuss {
    _id: string;
    StatusName: string;
    color: string;
}

export const defaultFollowUp: Partial<FollowUp> = {
    leadStatus: '',
    type: 'call',
    notes: '',
    priority: 'medium',
    status: 'scheduled'
};