import fetchHandler from './Handler';

export const TOURFinsher = async (slugname, data) => {
    try {
        const response = await fetchHandler({
            method: 'PATCH',
            endpoint: `/user/${slugname}/me/tour`,
            data
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
