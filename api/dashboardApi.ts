// src/api/dashboardApi.ts
import axios from 'axios';
import fetchHandler from './Handler';

const API_BASE_URL = 'http://localhost:8081/api/v1';

export interface DashboardData {
  data: {
    summary: {
      totalLeads: number;
      activeLeads: number;
      conversionRate: number;
    };
    recentLeads: Array<{
      _id: string;
      LeadId: string;
      manualData: {
        name: string;
        company: string;
        email: string;
        mobileNo: string;
        jobTitle: string;
      };
      potentialValue: number;
      leadstatus: {
        _id: string;
        statusName?: string;
      };
    }>;
    acquisition: {
      monthly: {
        labels: any;
        data: any;
      };
    };
    upcomingFollowups: Array<{
      title: string;
      dueDate: string;
    }>;
  };
}


export const GETactivity = async (slugname:any): Promise<DashboardData> => {
    try {
        // /lead/ajin-company/OFFLINE8400/followups
        const response = await fetchHandler({
            method: 'GET',
            endpoint: `/dashboard/${slugname}`,
            data: undefined
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};

// export const fetchDashboardData = async (): Promise<DashboardData> => {
//   const response = await axios.get(`/dashboard/ajin-company`);
//   return response.data;
// };