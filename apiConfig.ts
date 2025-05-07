import axios, { Axios, AxiosError } from "axios";
import { AuthResponse } from "./app/types/diary";
import { headers } from "next/headers";
import { refreshTokenAtom } from "./app/login/page";
import { useAtomValue } from "jotai";

// Module augmentation for InternalAxiosRequestConfig
declare module 'axios' {
    interface InternalAxiosRequestConfig<D = any> {
        _retry?: boolean;
    }
}

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        'Content-Type': 'application/json',
    },
});

const refreshAccessToken = async (refreshToken: string) => {
    if (!refreshToken) {
        window.location.href = "/login"
        return null
    }

    try {
        const refreshResponse = await axios.post<AuthResponse>("http://localhost:8080/api/v1/auth/refresh-token",
            {}, // No body needed
            {
                headers: {
                    "Authorization": `Bearer ${refreshToken}`,
                }
            })

        const newAccessToken = refreshResponse.data.accessToken

        if (!newAccessToken) {
            localStorage.clear();
            window.location.href = "/login"
            return null;
        }

        localStorage.setItem("accessToken", refreshResponse.data.accessToken)
        localStorage.setItem("refreshToken", refreshResponse.data.refreshToken)

        return newAccessToken
    } catch (error) {
        localStorage.clear();
        window.location.href = "/login"
        return null;
    }
}

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && originalRequest && !originalRequest?._retry) {
            console.log("gi")
            const refreshToken: string = localStorage.getItem("refreshToken") as string;
            // const refreshToken: string = useAtomValue(refreshTokenAtom) as string;
            originalRequest._retry = true

            try {
                const newAccessToken = await refreshAccessToken(refreshToken);
                if (newAccessToken && originalRequest) {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    originalRequest._retry = false
                    return axiosInstance(originalRequest)
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                // localStorage.clear()
                // window.location.href = '/login';
                return Promise.reject(refreshError);
            }

            // console.log("unauthorized")
            // // try {
            // const newAccessToken = await refreshAccessToken();

            // if (newAccessToken && originalRequest) {
            //     originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
            //     originalRequest._retry = false
            //     return axiosInstance(originalRequest)
            // } else {
            //     return Promise.reject(error)
            // }
        }

        return Promise.reject(error)
    }
)

export default axiosInstance