import fetchHandler from './Handler';

export const usersSingleGET = async (slugname: string) => {
    try {
        const response = await fetchHandler({
            method: 'GET',
            endpoint: `/user/${slugname}`,
            data: undefined
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
