// types.ts
export interface Customer {
    _id: string;
    Companyname: string;
    customerProfile?: string;
}

export interface User {
    _id: string;
    firstname: string;
}

export interface Project {
    _id: string;
    projectName: string;
    customer: Customer;
    projectStatus: string;
    totalRate: number;
    members: User[];
    status: string;
    startDate: Date | null;
    deadline: Date | null;
    description: string;
    sendEmail: boolean;
    tags: string[];
}

export interface FormValues {
    projectName: string;
    customer: string | null;
    projectStatus: string;
    totalRate: any;
    members: string[];
    status: string;
    startDate: Date | null;
    deadline: Date | null;
    description: string;
    sendEmail: boolean;
    tags: string[];
}
