import fetchHandler from './Handler';

export const bulkUpload = async (slugname?: any, data?: any) => {
    try {
        const response = await fetchHandler({
            method: 'POST',
            endpoint: `/lead/bulk/upload/${slugname}`,
            data: data
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
