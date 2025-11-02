import axios from "axios";
import { store } from "../../redux/store";

import { refreshTokens } from "../../redux/auth/auth-thunks";

const { VITE_API_URL: baseURL } = import.meta.env;


const instance = axios.create({
    // baseURL: "http://localhost:3000/api",
    baseURL: `${baseURL}/api`,
    withCredentials: true
});



instance.interceptors.response.use(
    response => response, // Directly return successful responses.
    async error => {
        const message = error.response?.data?.message || error.message
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {

            if (['AccessToken not found', 'AccessToken verification failed'].includes(message)) {
                originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.
                try {
                    await store.dispatch(refreshTokens());
                    // await instance.get('/auth/refresh');
                    return instance(originalRequest); // Retry the original request with the new access token.
                } catch (refreshError) {
                    // console.error('Token refresh failed:', refreshError);
                    //     window.location.href = '/auth/login';
                    return Promise.reject(refreshError);
                }

            }

        }
        return Promise.reject(error); // For all other errors, return the error as is.
    }
);

instance.interceptors.request.use(request => {
    if (request.data && typeof request.data === 'object') {
        const cleanedData: {[key: string]: unknown} = {};
        for (const key in request.data) {
            const value = request.data[key];
            // Exclude null, undefined, and empty strings
            if (value !== null && value !== undefined && value !== '') {
                cleanedData[key] = value;
            }
        }
        request.data = cleanedData;
    }
    return request;
}, error => {
    return Promise.reject(error);
});

export default instance;