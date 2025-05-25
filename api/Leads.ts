import fetchHandler from './Handler';

export const LeadPost = async (slugname: string, data: any) => {
    try {
        const response = await fetchHandler({
            method: 'POST',
            endpoint: `/lead/offline/${slugname}/addlead`,
            data: data
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const getLeads = async (slugname: string) => {
    try {
        const response = await fetchHandler({
            method: 'GET',
            endpoint: `/lead/${slugname}`,
            data: undefined
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const getLeadsByID = async (slugname: string, id?: any) => {
    try {
        const response = await fetchHandler({
            method: 'GET',
            endpoint: `/lead/${slugname}/${id}`,
            data: undefined
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const UpdateLeadsByID = async (slugname: string, id?: any, data?: any) => {
    try {
        const response = await fetchHandler({
            method: 'PATCH',
            endpoint: `/lead/${slugname}/${id}`,
            data: data
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};

// Followupdata
export const createFollowupdata = async (slugname: string, id?: any, data?: any) => {
    try {
        // /lead/ajin-company/OFFLINE8400/followups
        const response = await fetchHandler({
            method: 'PATCH',
            endpoint: `/lead/${slugname}/${id}/followups`,
            data: data
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const UpdateFollowupdata = async (slugname: string, id?: any, data?: any, followID?: string) => {
    try {
        // /lead/ajin-company/OFFLINE8400/followups
        const response = await fetchHandler({
            method: 'PATCH',
            endpoint: `/lead/${slugname}/${id}/followups/${followID}`,
            data: data
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};

// Followupdata type

export const createFollowupStatus = async (slugname: string, data: any) => {
    try {
        // /lead/ajin-company/OFFLINE8400/followups
        const response = await fetchHandler({
            method: 'POST',
            endpoint: `/leadfollowuptype/${slugname}`,
            data: data
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const UpdateFollowupStatus = async (slugname: string, id: any, data?: any) => {
    try {
        // /lead/ajin-company/OFFLINE8400/followups
        const response = await fetchHandler({
            method: 'PATCH',
            endpoint: `/leadfollowuptype/${slugname}/${id}`,
            data: data
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const GetFollowupStatus = async (slugname: string) => {
    try {
        // /lead/ajin-company/OFFLINE8400/followups
        const response = await fetchHandler({
            method: 'GET',
            endpoint: `/leadfollowuptype/${slugname}`,
            data: undefined
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const DELETEFollowupStatus = async (slugname: string, id?: any) => {
    try {
        // /lead/ajin-company/OFFLINE8400/followups
        const response = await fetchHandler({
            method: 'DELETE',
            endpoint: `/leadfollowuptype/${slugname}/${id}`,
            data: undefined
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const createStatus = async (slugname: string, data: any) => {
    try {
        // /lead/ajin-company/OFFLINE8400/followups
        const response = await fetchHandler({
            method: 'POST',
            endpoint: `/leadfollowupstatus/${slugname}`,
            data: data
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const UpdateStatus = async (slugname: string, id: any, data?: any) => {
    try {
        // /lead/ajin-company/OFFLINE8400/followups
        const response = await fetchHandler({
            method: 'PATCH',
            endpoint: `/leadfollowupstatus/${slugname}/${id}`,
            data: data
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const GetStatus = async (slugname: string) => {
    try {
        // /lead/ajin-company/OFFLINE8400/followups
        const response = await fetchHandler({
            method: 'GET',
            endpoint: `/leadfollowupstatus/${slugname}`,
            data: undefined
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const DELETEStatus = async (slugname: string, id?: any) => {
    try {
        // /lead/ajin-company/OFFLINE8400/followups
        const response = await fetchHandler({
            method: 'DELETE',
            endpoint: `/leadfollowupstatus/${slugname}/${id}`,
            data: undefined
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const GETactivity = async (slugname: string, id?: any) => {
    try {
        // /lead/ajin-company/OFFLINE8400/followups
        const response = await fetchHandler({
            method: 'GET',
            endpoint: `/activity/${slugname}/${id}`,
            data: undefined
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};




// Leads  status 
// Leads  status 
// Leads  status 
// Leads  status 



