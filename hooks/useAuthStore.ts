"use client"
import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthStore {
    userId: string | null;
    accessToken: string | null;
    refreshToken: string | null;
    salt: string | null;
    decryptKey: string | null;
    username: string | null;
    firstTimeLogin: string | null;
    setFirstTimeLogin: (firstTimeLogin: string) => void;
    setAuthTokens: (userId: string, accessToken: string, refreshToken: string, salt: string, username: string, firstTimeLogin: string) => void;
    setDecryptKey: (decryptKey: string) => void;
    clearAuthTokens: () => void;
    isAuthenticated: () => boolean;
    isFirstTimeLogin: () => boolean;
}

const useAuthStore = create<AuthStore>((set, get) => {
    let userId: string | null = null;
    let accessToken: string | null = null;
    let refreshToken: string | null = null;
    let salt: string | null = null;
    let decryptKey: string | null = null;
    let username: string | null = null
    let firstTimeLogin: string | null = null;

    if (typeof window !== 'undefined') {
        // Only access localStorage in the browser environment
        userId = Cookies.get('userId') || null;
        accessToken = Cookies.get('accessToken') || null;
        refreshToken = Cookies.get('refreshToken') || null;
        salt = Cookies.get('salt') || null;
        decryptKey = Cookies.get('decryptKey') || null;
        username = Cookies.get('username') || null;
        firstTimeLogin = Cookies.get('firstTimeLogin') || null;
    }

    return {
        userId: userId || null,
        accessToken: accessToken || null,
        refreshToken: refreshToken || null,
        salt: salt || null,
        decryptKey: decryptKey || null,
        username: username || null,
        firstTimeLogin: firstTimeLogin || null,

        setFirstTimeLogin: (firstTimeLogin: string) => {
            if (typeof window !== "undefined") {
                Cookies.set('firstTimeLogin', firstTimeLogin, { expires: 1, secure: false, sameSite: "Strict" })
            }
            set({ firstTimeLogin })
        },

        setAuthTokens: (userId: string, accessToken: string, refreshToken: string, salt: string, username: string, firstTimeLogin: string) => {
            if (typeof window !== 'undefined') {
                Cookies.set('userId', userId, { expires: 1, secure: true, sameSite: "Strict" });
                Cookies.set('accessToken', accessToken, { expires: 1, secure: true, sameSite: "Strict" });
                Cookies.set('refreshToken', refreshToken, { expires: 1, secure: true, sameSite: "Strict" });
                Cookies.set('salt', salt, { expires: 1, secure: true, sameSite: "Strict" });
                Cookies.set('username', username, { expires: 1, secure: false, sameSite: "Strict" });
                Cookies.set('firstTimeLogin', firstTimeLogin, { expires: 1, secure: false, sameSite: "Strict" })
            }
            set({ userId, accessToken, refreshToken, salt, username, firstTimeLogin });
        },
        setDecryptKey: (decryptKey: string) => {
            Cookies.set('decryptKey', decryptKey, { expires: 1, secure: true, sameSite: "Strict" })
            set({ decryptKey });
        },
        clearAuthTokens: () => {
            if (typeof window !== 'undefined') {
                Cookies.remove('userId');
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
                Cookies.remove('salt');
                Cookies.remove('username')
                Cookies.remove('firstTimeLogin')
            }
            set({ userId: null, accessToken: null, refreshToken: null, salt: null, username: null, firstTimeLogin: null });
        },

        isAuthenticated: () => {
            return !!get().accessToken;
        },

        isFirstTimeLogin: () => {
            if (get().firstTimeLogin === "true") {
                return true;
            }
            return false;
        }
    };
});

export default useAuthStore;