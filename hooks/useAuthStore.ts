"use client"
import { create } from 'zustand';

interface AuthStore {
    userId: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    setAuthTokens: (userId: string, accessToken: string, refreshToken: string) => void;
    clearAuthTokens: () => void;
    isAuthenticated: () => boolean;
}

const useAuthStore = create<AuthStore>((set, get) => {
    let userId: string | null = null;
    let accessToken: string | null = null;
    let refreshToken: string | null = null;

    if (typeof window !== 'undefined') {
        // Only access localStorage in the browser environment
        userId = localStorage.getItem('userId');
        accessToken = localStorage.getItem('accessToken');
        refreshToken = localStorage.getItem('refreshToken')
    }

    return {
        userId: userId || null,
        accessToken: accessToken || null,
        refreshToken: refreshToken || null,
        setAuthTokens: (userId, accessToken, refreshToken) => {
            if (typeof window !== 'undefined') {
                localStorage.setItem('userId', userId);
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
            }
            set({ userId, accessToken, refreshToken });
        },
        clearAuthTokens: () => {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('userId');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken')
            }
            set({ userId: null, accessToken: null, refreshToken: null });
        },
        isAuthenticated: () => {
            return !!get().accessToken;
        },
    };
});

export default useAuthStore;