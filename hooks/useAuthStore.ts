"use client"
import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthStore {
    userId: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    salt: string | null;
    decryptKey: string | null;
    setAuthTokens: (userId: string, accessToken: string, refreshToken: string, salt: string) => void;
    setDecryptKey: (decryptKey: string) => void;
    clearAuthTokens: () => void;
    isAuthenticated: () => boolean;
}

const useAuthStore = create<AuthStore>((set, get) => {
    let userId: string | null = null;
    let accessToken: string | null = null;
    let refreshToken: string | null = null;
    let salt: string | null = null;
    let decryptKey: string | null = null;

    if (typeof window !== 'undefined') {
        // Only access localStorage in the browser environment
        userId = Cookies.get('userId') || null;
        accessToken = Cookies.get('accessToken') || null;
        refreshToken = Cookies.get('refreshToken') || null;
        salt = Cookies.get('salt') || null;
        decryptKey = Cookies.get('decryptKey') || null;
    }

    return {
        userId: userId || null,
        accessToken: accessToken || null,
        refreshToken: refreshToken || null,
        salt: salt || null,
        decryptKey: decryptKey || null,
        setAuthTokens: (userId: string, accessToken: string, refreshToken: string, salt: string) => {
            if (typeof window !== 'undefined') {
                Cookies.set('userId', userId, { expires: 1, secure: true, sameSite: "Strict" });
                Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: "Strict" });
                Cookies.set('refreshToken', refreshToken, { expires: 1, secure: true, sameSite: "Strict" });
                Cookies.set('salt', salt, { expires: 1, secure: true, sameSite: "Strict" })
            }
            set({ userId, accessToken, refreshToken, salt });
        },
        setDecryptKey: (decryptKey: string) => {
            Cookies.set('decryptKey', decryptKey, { expires: 1, secure: true, sameSite: "Strict" })
            set({ decryptKey });
        },
        clearAuthTokens: () => {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('userId');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('salt')
            }
            set({ userId: null, accessToken: null, refreshToken: null, salt: null });
        },
        isAuthenticated: () => {
            return !!get().accessToken;
        },
    };
});

export default useAuthStore;