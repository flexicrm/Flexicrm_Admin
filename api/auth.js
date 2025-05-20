import fetchHandler from './Handler';

export const LoginAPI = async (slugname, data) => {
    console.log('slugname', slugname);
    try {
        const response = await fetchHandler({
            method: 'POST',
            endpoint: `/user/${slugname}/login`,
            data
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};

export const ResetPasswordChange = async (slugname, data, slug) => {
    console.log('slugname', slugname);
    try {
        const response = await fetchHandler({
            method: 'POST',
            // endpoint: `/user/${slugname}/change-password`,
            endpoint: `/user/${slugname}/reset-password/${slug}`,
            data
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const Changepassword = async (slugname, data) => {
    console.log('slugname', slugname);
    try {
        const response = await fetchHandler({
            method: 'PUT',
            endpoint: `/user/${slugname}/change-password`,
            // endpoint: `/user/${slugname}/reset-password/${slug}`,
            data
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const ResetPassword = async (slugname, data) => {
    console.log('slugname', slugname);
    try {
        const response = await fetchHandler({
            method: 'POST',
            endpoint: `/user/${slugname}/forgot-password`,
            data
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
