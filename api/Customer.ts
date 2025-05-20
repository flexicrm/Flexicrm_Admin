import fetchHandler from './Handler';

export const CustomerSingleGET = async (slugname: string) => {
    try {
        const response = await fetchHandler({
            method: 'GET',
            endpoint: `/customer/${slugname}`,
            data: undefined
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const CustomerPOST = async (slugname: string, _id: string) => {
    console.log(_id, 'dsdsdssdsdddddddddddddddddddddddddddddddddddddddddddd');

    try {
        const response = await fetchHandler({
            method: 'GET',
            endpoint: `/task/${slugname}/?id=${_id}`,
            data: undefined
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const CustomerPatch = async (slugname: string, _id: string, status: any) => {
    console.log(_id, 'dsdsdssdsdddddddddddddddddddddddddddddddddddddddddddd');

    try {
        const response = await fetchHandler({
            method: 'GET',
            endpoint: `/customer/${slugname}/${_id}`,
            data: status
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const CustomerDELETe = async (slugname: string, _id: string) => {
    console.log(_id, 'dsdsdssdsdddddddddddddddddddddddddddddddddddddddddddd');

    try {
        const response = await fetchHandler({
            method: 'GET',
            endpoint: `/customer/${slugname}/${_id}`,
            data: undefined
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
