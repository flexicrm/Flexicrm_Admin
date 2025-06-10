import fetchHandler from './Handler';

export const SubdmoainChekers = async (slugname) => {
    try {
        const response = await fetchHandler({
            method: 'GET',
            endpoint: `/user/check-subdomain/${slugname}`
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
