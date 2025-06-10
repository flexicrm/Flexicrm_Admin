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
        highValueLeads: any;
    };
}

export const GETactivity = async (slugname: any): Promise<DashboardData> => {
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
export const fetchAllSections = async (slugname: any): Promise<DashboardData> => {
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
// export const FetchSections1 = async (slugname: any): Promise<DashboardData> => {
//     try {
//         // /lead/ajin-company/OFFLINE8400/followups
//         const response = await fetchHandler({
//             method: 'GET',
//             endpoint: `/dashboard/${slugname}/section1
// `,
//             data: undefined
//         });
//         return response;
//     } catch (error) {
//         console.error('Unexpected error:', error);
//     }
// };
// export const FetchSections2 = async (slugname: any): Promise<DashboardData> => {
//     try {
//         // /lead/ajin-company/OFFLINE8400/followups
//         const response = await fetchHandler({
//             method: 'GET',
//             endpoint: `/dashboard/${slugname}/section2
// `,
//             data: undefined
//         });
//         return response;
//     } catch (error) {
//         console.error('Unexpected error:', error);
//     }
// };
// export const FetchSections3 = async (slugname: any): Promise<DashboardData> => {
//     try {
//         // /lead/ajin-company/OFFLINE8400/followups
//         const response = await fetchHandler({
//             method: 'GET',
//             endpoint: `/dashboard/${slugname}/section3
// `,
//             data: undefined
//         });
//         return response;
//     } catch (error) {
//         console.error('Unexpected error:', error);
//     }
// };
// export const FetchSections4 = async (slugname: any): Promise<DashboardData> => {
//     try {
//         // /lead/ajin-company/OFFLINE8400/followups
//         const response = await fetchHandler({
//             method: 'GET',
//             endpoint: `/dashboard/${slugname}/section4
// `,
//             data: undefined
//         });
//         return response;
//     } catch (error) {
//         console.error('Unexpected error:', error);
//     }
// };
// export const FetchSections5 = async (slugname: any): Promise<DashboardData> => {
//     try {
//         // /lead/ajin-company/OFFLINE8400/followups
//         const response = await fetchHandler({
//             method: 'GET',
//             endpoint: `/dashboard/${slugname}/section5
// `,
//             data: undefined
//         });
//         return response;
//     } catch (error) {
//         console.error('Unexpected error:', error);
//     }
// };
// export const DraganddropSection = async (slugname: any): Promise<DashboardData> => {
//     try {
//         // /lead/ajin-company/OFFLINE8400/followups
//         const response = await fetchHandler({
//             method: 'PUT',
//             endpoint: `/dashboard/${slugname}/section
// `,
//             data: undefined
//         });
//         return response;
//     } catch (error) {
//         console.error('Unexpected error:', error);
//     }
// };

/**
 * Generic function to fetch a dashboard section
 * @param slugname - The company identifier (e.g., 'ajin-company')
 * @param section - The section key (e.g., 'section1', 'section2')
 * @returns A promise resolving to DashboardData
 */
const fetchSection = async (slugname: string, section: string): Promise<DashboardData | undefined> => {
    try {
        const response = await fetchHandler({
            method: 'GET',
            endpoint: `/dashboard/${slugname}/${section}`,
            data: undefined
        });
        return response;
    } catch (error) {
        console.error(`Error fetching ${section}:`, error);
    }
};

/**
 * Named exports for common sections (section1 to section5)
 */
export const FetchSections1 = (slugname: string) => fetchSection(slugname, 'section1');
export const FetchSections2 = (slugname: string) => fetchSection(slugname, 'section2');
export const FetchSections3 = (slugname: string) => fetchSection(slugname, 'section3');
export const FetchSections4 = (slugname: string) => fetchSection(slugname, 'section4');
export const FetchSections5 = (slugname: string) => fetchSection(slugname, 'section5');

/**
 * Fetch any dynamic section (section6, section7, etc.)
 */
export const FetchDynamicSection = (slugname: string, sectionKey: string) => fetchSection(slugname, sectionKey);

export const DraganddropSection = async (slugname: string, data: { sections: string[] }): Promise<DashboardData | undefined> => {
    try {
        const response = await fetchHandler({
            method: 'PUT',
            endpoint: `/dashboard/${slugname}/section`,
            data
        });
        return response;
    } catch (error) {
        console.error('Error updating section order:', error);
    }
};
export const LeadsChartfilter = async (slugname: string, timeframe, customRange): Promise<DashboardData | undefined> => {
    let url = `/dashboard/${slugname}/section2?type=${timeframe}`;

    if (timeframe === 'custom' && customRange) {
        const { startDate, endDate } = customRange;
        url += `&startDate=${startDate}&endDate=${endDate}`;
    }
    try {
        const response = await fetchHandler({
            method: 'GET',
            endpoint: url,
            data: null
        });
        return response;
    } catch (error) {
        console.error('Error updating section order:', error);
    }
};
// export const fetchDashboardData = async (): Promise<DashboardData> => {
//   const response = await axios.get(`/dashboard/ajin-company`);
//   return response.data;
// };
