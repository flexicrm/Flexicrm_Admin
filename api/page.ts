// import { useSelector } from "react-redux";
import fetchHandler from './Handler';
export const TaskManagementGET = async (slugname: any) => {
    try {
        const response = await fetchHandler({
            method: 'GET',
            endpoint: `/task/${slugname}`
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const TaskManagementGETsingle = async ({ slugname, _id }: any) => {
    console.log(_id, 'dsdsdssdsdddddddddddddddddddddddddddddddddddddddddddd');

    try {
        const response = await fetchHandler({
            method: 'GET',
            endpoint: `/task/${slugname}/?id=${_id}`
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const TaskManagement = async ({ data, slugname }: any) => {
    console.log('slugname', slugname);
    try {
        const response = await fetchHandler({
            method: 'POST',
            endpoint: `/task/${slugname}`,
            data
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const TaskManagementpatch = async ({ data, _id, slugname }: any) => {
    try {
        const response = await fetchHandler({
            method: 'PATCH',
            endpoint: `/task/${slugname}/${_id}`,
            data
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const TaskManagementdelete = async ({ slugname, _id }: any) => {
    try {
        const response = await fetchHandler({
            method: 'DELETE',
            endpoint: `/task/${slugname}/${_id}`
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
