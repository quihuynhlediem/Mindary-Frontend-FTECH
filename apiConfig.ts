import axios, { AxiosError } from "axios";
import { AuthResponse } from "./app/types/diary";
import Cookies from "js-cookie";
import useAuthStore from "./hooks/useAuthStore";
import useUserStore from "./hooks/useUserStore";

// Module augmentation for InternalAxiosRequestConfig
declare module 'axios' {
    interface InternalAxiosRequestConfig<D = any> {
        _retry?: boolean;
    }
}

// Define an interface for environment variables (for better type safety)
interface EnvConfig {
    PRODUCTION: string;
    LOCALHOST: string;
    PROD: string;
}

// Access environment variables with type safety
const env: EnvConfig = {
    PRODUCTION: process.env.NEXT_PUBLIC_PRODUCTION || '0',
    LOCALHOST: process.env.NEXT_PUBLIC_LOCALHOST || 'http://localhost:8080',
    PROD: process.env.NEXT_PUBLIC_PROD || 'http://mindary-alb-1862688611.ap-southeast-2.elb.amazonaws.com',
};

// Log to verify environment variables
console.log("Environment Variables:", env);

// Create Axios instance with proxy base URL
const axiosInstance = axios.create({
    baseURL: '/api/proxy', // Proxy route handles dynamic backend URL
});

// Refresh access token function
const refreshAccessToken = async (refreshToken: string) => {
    const setAuth = useAuthStore((state: any) => state.setAuthTokens);
    const clearAuthTokens = useAuthStore((state) => state.clearAuthTokens);

    if (!refreshToken) {
        window.location.href = "/login";
        return null;
    }

    try {
        const res = await axiosInstance.post<AuthResponse>('/auth/refresh-token', {}, {
            headers: {
                "Authorization": `Bearer ${refreshToken}`,
            },
        });

        if (res.status !== 200) {
            clearAuthTokens();
            window.location.href = "/login";
            return null;
        }

        setAuth(res.data.userId, res.data.accessToken, res.data.refreshToken, res.data.salt);
        return res.data.accessToken; // Return the new access token for the interceptor
    } catch (error) {
        clearAuthTokens();
        window.location.href = "/login";
        return null;
    }
};

// Add interceptor for token refresh
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
            const refreshToken = Cookies.get("refreshToken") as string;
            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshAccessToken(refreshToken);
                if (newAccessToken && originalRequest) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    originalRequest._retry = false;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;