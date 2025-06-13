import axios from 'axios';
import Cookies from 'js-cookie';
import { API_BASE_URL } from '../src/app/utils';

export const refreshAccessToken = async (subdomain: string): Promise<string | null> => {
    try {
        // Get refresh token from cookies
        const refreshToken = Cookies.get('crmrefresh');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        // Set headers with Authorization
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`
        };

        // Make the POST request to refresh endpoint
        const response = await axios.post(
            `${API_BASE_URL}/user/${subdomain}/refresh`,
            {}, // No body needed
            { headers }
        );

        // Debug: Log entire response
        console.log('Full Axios response:', response);

        // Extract access token from response
        const newAccessToken = response?.data?.data.accessToken;

        if (newAccessToken && typeof newAccessToken === 'string') {
            // Store new access token in cookies
            Cookies.set('crmaccess', newAccessToken);
            return newAccessToken;
        }

        console.error('No access token found in response data:', response?.data);
        return null;
    } catch (error: any) {
        // If it's an AxiosError with a response
        if (error.response) {
            console.error('Refresh failed with response:', error.response.data);
        } else {
            console.error('Refresh failed:', error.message);
        }
        return null;
    }
};
/**
 * Generic fetch handler to make authenticated API calls with auto token refresh.
 */
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
        const status = error?.response?.status;
        console.log(status, 'status>>>>');
        if (status === 404) {
            // window.location.href = '/';
            window.location.href = '/not-found';
            return { isError: true, data: 'Resource not found' };
        }
        // Handle token expiration
        if (status === 401) {
            const newAccessToken = await refreshAccessToken(subdomain);

            if (newAccessToken) {
                headers['Authorization'] = `Bearer ${newAccessToken}`;
                options.headers = headers;

                try {
                    const retryResponse = await axios(options);
                    return retryResponse?.data;
                } catch (retryError) {
                    if (process.env.NODE_ENV !== 'production') {
                        console.error('Retry failed after token refresh:', retryError);
                    }
                    Cookies.remove('crmaccess');
                    Cookies.remove('crmrefresh');
                    window.location.href = `/${subdomain}/login`;
                    return { isError: true, data: 'Session expired. Please login again.' };
                }
            } else {
                Cookies.remove('crmaccess');
                Cookies.remove('crmrefresh');
                window.location.href = `/${subdomain}/login`;
                return { isError: true, data: 'Session expired. Please login again.' };
            }
        }

        // Other errors
        if (error.response) {
            return { isError: true, data: error.response.data };
        } else {
            if (process.env.NODE_ENV !== 'production') {
                console.error('Network error:', error);
            }
            return { isError: true, data: "We can't process your request at this time. Please try later." };
        }
    }
};

export default fetchHandler;
