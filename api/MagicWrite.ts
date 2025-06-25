import fetchHandler from './Handler';

export const MagicWrite = async (slugname?: string, data?: any) => {
    try {
        const response = await fetchHandler({
            method: 'POST',
            endpoint: `/magicWriteRoute/${slugname}`,
            data: data
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
