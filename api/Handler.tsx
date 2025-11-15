import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../src/app/utils';

export const refreshAccessToken = async (subdomain: string): Promise<string | null> => {
    try {
        const refreshToken = Cookies.get('crmrefresh');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`
        };

        const response = await axios.post(`${API_BASE_URL}/user/${subdomain}/refresh`, {}, { headers });

        console.log('Full Axios response:', response);

        const newAccessToken = response?.data?.data?.accessToken;

        if (newAccessToken && typeof newAccessToken === 'string') {
            Cookies.set('crmaccess', newAccessToken);
            return newAccessToken;
        }

        console.error('No access token found in response data:', response?.data);
        return null;
    } catch (error: any) {
        if (error.response) {
            console.error('Refresh failed with response:', error.response.data);
        } else {
            console.error('Refresh failed:', error.message);
        }
        return null;
    }
};

const fetchHandler = async ({ method = 'GET', endpoint, data = {} }: { method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; endpoint: string; data?: any }) => {
    const subdomain = Cookies.get('subdomain') || 'default';
    const fullURL = `${API_BASE_URL}${endpoint}`;
    let accessToken = Cookies.get('crmaccess');
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const options = {
        method,
        url: fullURL,
        headers,
        ...(method !== 'GET' ? { data } : { params: data })
    };

    try {
        const response = await axios(options);
        return response?.data;
    } catch (error: any) {
        console.log(error, ':error');
        const status = error?.response?.status;
        console.log(error?.response, 'backendMessage');
        const backendMessage = error?.response?.data?.errors || error?.response?.data?.error || null;

        if (status === 404) {
            setTimeout(() => {
                window.location.href = '/';
            }, 60000);
            return {
                isError: true,
                data: backendMessage || 'Resource not found'
            };
        }

        if (status === 401) {
            const newAccessToken = await refreshAccessToken(subdomain);

            if (newAccessToken) {
                headers['Authorization'] = `Bearer ${newAccessToken}`;
                options.headers = headers;

                try {
                    const retryResponse = await axios(options);
                    return retryResponse?.data;
                } catch (retryError: any) {
                    const retryMessage = retryError?.response?.data?.message || retryError?.response?.data?.error || 'Retry failed after token refresh';

                    Cookies.remove('crmaccess');
                    Cookies.remove('crmrefresh');
                    return { isError: true, data: retryMessage };
                }
            } else {
                Cookies.remove('crmaccess');
                Cookies.remove('crmrefresh');
                return { isError: true, data: backendMessage || 'Unauthorized. Please log in again.' };
            }
        }

        if (error.response) {
            return { isError: true, data: backendMessage || error.response.data };
        } else {
            return {
                isError: true,
                data: backendMessage || "We can't process your request at this time. Please try later."
            };
        }
    }
};

export default fetchHandler;
