// import { API_BASE_URL } from "@/app/utils";
import axios from 'axios';
import { API_BASE_URL } from '../src/app/utils';
// import { useRouter } from "next/navigation";
import Cookies from 'js-cookie';
const fetchHandler = async ({ method, endpoint, data }) => {
    const API_BASE_URLS = `${API_BASE_URL}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json'
    };

    // Attach Authorization token if available
    // const router = useRouter();
    const accessToken = Cookies.get('crmaccess');
    const subdomain = Cookies.get('subdomain');
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    const options = {
        method,
        url: API_BASE_URLS,
        headers,
        data: method !== 'GET' ? data : undefined
    };

    try {
        const response = await axios(options);
        return response?.data; // Return parsed response data
    } catch (error) {
        // // Handle errors
        if (error.response) {
            // Server responded with a status outside the 2xx range
            const { status, data } = error.response;

            if (status === 401) {
                // Optional: Clear session and redirect to login
                // sessionStorage.clear();
                window.location.href = `/${subdomain}/login`;
                return { isError: true, data: 'Unauthorized access. Redirecting to login.' };
            }

            return { isError: true, data }; // Return the server error response
        } else {
            // Network or other error
            // router.push("/404");
            console.error('Network error:', error);
            return { isError: true, data: "We can't process your request at this time. Please try later." };
        }
    }
};

export default fetchHandler;

// import React from "react";
// import { API_BASE_URL } from "../src/app/utils";
// import axios from "axios";

// export default fetchHandler = async ({ method, endpoint, data }) => {
//   const API_BASE_URLS = `${API_BASE_URL}/${endpoint}`;
//   const headers = {
//     "Content-Type": "application/json",
//   };
//   const accessToken = localStorage.getItem("accessToken");
//   if (accessToken) {
//     headers["Authorization"] = `bearer${accessToken}`;
//   }

//   const options = {
//     method,
//     url: API_BASE_URLS,
//     headers,
//     data: method !== "GET" ? data : undefined,
//   };

//   try {
//     const response = await axios(options);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// };
