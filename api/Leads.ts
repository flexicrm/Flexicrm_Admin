import fetchHandler from './Handler';

export const LeadPost = async (slugname: string, data: any) => {
    try {
        const response = await fetchHandler({
            method: 'GET',
            endpoint: `/lead/offline/${slugname}/addlead`,
            data: data
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
