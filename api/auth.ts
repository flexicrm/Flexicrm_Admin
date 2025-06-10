import fetchHandler from './Handler';

export const LoginAPI = async (subdomain?: any, data?: any) => {
    try {
        const response = await fetchHandler({
            method: 'POST',
            endpoint: `/user/${subdomain}/login`,
            data
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};

export const ResetPasswordChange = async (slugname?: string, payload?: any, slug?: any) => {
    try {
        const response = await fetchHandler({
            method: 'POST',
            // endpoint: `/user/${slugname}/change-password`,
            endpoint: `/user/${slugname}/reset-password/${slug}`,
            data: payload
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
export const Changepassword = async (slugname?: string, data?: any) => {
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
export const ResetPassword = async (slugname?: any, email?: string) => {
    console.log('slugname', slugname);
    try {
        const response = await fetchHandler({
            method: 'POST',
            endpoint: `/user/${slugname}/forgot-password`,
            data: email
        });
        return response;
    } catch (error) {
        console.error('Unexpected error:', error);
    }
};
