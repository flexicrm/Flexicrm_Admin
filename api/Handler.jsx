import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../src/app/utils';

const refreshAccessToken = async () => {
    try {
        const refreshToken = Cookies.get('crmrefresh');
        if (!refreshToken) throw new Error('No refresh token available');

        const response = await axios.post(`${API_BASE_URL}/user/ajin-company/refresh`, {
            refreshToken
        });

        const newAccessToken = response?.data?.accessToken;

        if (newAccessToken) {
            Cookies.set('crmaccess', newAccessToken); // Update token in cookie
            return newAccessToken;
        }

        throw new Error('No access token received from refresh');
    } catch (error) {
        console.error('Failed to refresh access token:', error);
        return null;
    }
};

const fetchHandler = async ({ method, endpoint, data }) => {
    const subdomain = Cookies.get('subdomain');
    const fullURL = `${API_BASE_URL}${endpoint}`;

    let accessToken = Cookies.get('crmaccess');
    const headers = {
        'Content-Type': 'application/json'
    };
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const options = {
        method,
        url: fullURL,
        headers,
        data: method !== 'GET' ? data : undefined
    };

    try {
        const response = await axios(options);
        return response?.data;
    } catch (error) {
        const status = error?.response?.status;

        // Token expired or unauthorized — try refresh
        if (status === 401) {
            const newAccessToken = await refreshAccessToken();

            if (newAccessToken) {
                headers['Authorization'] = `Bearer ${newAccessToken}`;
                options.headers = headers;

                try {
                    const retryResponse = await axios(options);
                    return retryResponse?.data;
                } catch (retryError) {
                    console.error('Retry failed after token refresh:', retryError);
                    window.location.href = `/${subdomain}/login`;
                    return { isError: true, data: 'Session expired. Please login again.' };
                }
            } else {
                Cookies.remove('crmaccess');
                Cookies.remove('refreshToken');
                window.location.href = `/${subdomain}/login`;
                return { isError: true, data: 'Session expired. Please login again.' };
            }
        }

        // Other errors
        if (error.response) {
            return { isError: true, data: error.response.data };
        } else {
            console.error('Network error:', error);
            return { isError: true, data: "We can't process your request at this time. Please try later." };
        }
    }
};

export default fetchHandler;
