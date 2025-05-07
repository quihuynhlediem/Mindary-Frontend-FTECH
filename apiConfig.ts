import axios, { Axios, AxiosError } from "axios";
import { AuthResponse } from "./app/types/diary";
import { headers } from "next/headers";
import useAuthStore from "./hooks/useAuthStore";

// Module augmentation for InternalAxiosRequestConfig
declare module 'axios' {
    interface InternalAxiosRequestConfig<D = any> {
        _retry?: boolean;
    }
}

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1"
})


const refreshAccessToken = async (refreshToken: string) => {
    const setAuth = useAuthStore((state: any) => state.setAuthTokens)

    if (!refreshToken) {
        window.location.href = "/login"
        return null
    }

    try {
        const res = await axios.post<AuthResponse>("http://localhost:8080/api/v1/auth/refresh-token",
            {}, // No body needed
            {
                headers: {
                    "Authorization": `Bearer ${refreshToken}`,
                }
            })

        if (res.status != 200) {
            localStorage.clear();
            window.location.href = "/login"
            return null;
        }

        setAuth(res.data.userId, res.data.accessToken, res.data.refreshToken, res.data.salt);

        return res.data.refreshToken
    } catch (error) {
        localStorage.clear();
        window.location.href = "/login"
        return null;
    }
}

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