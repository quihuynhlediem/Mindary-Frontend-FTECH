"use client";
import React, { useState, useEffect } from "react";
import AnimatedEmoji from "./AnimatedEmoji";
import PersonalizedMessage from "./PersonalizedMessage";
import StatusMessage from "./StatusMessage";
import ReasonSection from "./ReasonSection";
import Tips from "./Tips";
import axios, { AxiosError } from "axios";
import { Button } from "../ui/button";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { format } from "date-fns";
import EmptyDiary from "./EmptyDiary";
import Loader from "../general/Loader";
import { Diaries, DiaryDto, ErrorResponse } from "@/app/types/diary";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import axiosInstance from "@/apiConfig";
import useAuthStore from "@/hooks/useAuthStore";
import useUserStore from "@/hooks/useUserStore";

const loginSchema = z.object({
    password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/, {
        message: "Password must be 8+ characters with uppercase, lowercase, number, and special character"
    })
});

const diaryAtom = atom<Diaries>({});

interface PasswordFormData {
    password: string;
}

// Password Modal Component
const PasswordModal: React.FC<{
    isOpen: boolean;
    onSubmit: (password: string) => void;
    onClose: () => void;
}> = ({ isOpen, onSubmit, onClose }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<PasswordFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { password: "" }
    });

    const onFormSubmit = (data: PasswordFormData) => {
        onSubmit(data.password);
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Enter Your Password</h2>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="mb-4">
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="Password"
                            className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 p-2 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-primary text-white p-2 rounded hover:bg-primary-hover"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const DailyUserContent = () => {
    const chosenDate = useUserStore((state) => state.selectedDate);
    const addDiary = useUserStore((state) => state.addDiary);
    const diaries = useUserStore((state) => state.diaries);
    const accessToken = useAuthStore((state) => state.accessToken);
    const userId = useAuthStore((state) => state.userId);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [password, setPassword] = useState<string | null>(null);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
    const setDecryptKey = useAuthStore((state) => state.setDecryptKey);
    const decryptKey = useAuthStore((state) => state.decryptKey);

    // Open modal if password is missing and chosenDate is set
    useEffect(() => {
        if (!decryptKey && chosenDate) {
            setIsPasswordModalOpen(true);
        }
    }, [decryptKey, chosenDate]);

    // Handle password submission
    const handlePasswordSubmit = async (password: string) => {
        setPassword(password.trim());
        setIsPasswordModalOpen(false);
    };

    // Fetch diary entry
    useEffect(() => {
        // if (!password) return; // Wait for password and date

        const fetchDiary = async () => {
            setIsLoading(true);
            setErrorMessage("");

            try {
                if (decryptKey == null && password) {
                    // Fetch user encryption data
                    const userResponse = await axiosInstance.get(
                        `/customers/${userId}`,
                        {
                            headers: {
                                "Authorization": `Bearer ${accessToken}`
                            }
                        }
                    );
                    const { encryptedPrivateKey, privateKeyIv } = userResponse.data;
                    console.log("encryptedPrivateKey: " + encryptedPrivateKey)
                    console.log("privateKeyIv: + " + privateKeyIv)

                    // Decrypt private key locally
                    const iv = Uint8Array.from(atob(privateKeyIv), c => c.charCodeAt(0));
                    const encryptedPrivateKeyBytes = Uint8Array.from(atob(encryptedPrivateKey), c => c.charCodeAt(0));

                    // Pad or truncate password to 32 bytes
                    const passwordBytes = new TextEncoder().encode(password);
                    const keyBytes = new Uint8Array(32);
                    for (let i = 0; i < 32; i++) {
                        keyBytes[i] = i < passwordBytes.length ? passwordBytes[i] : 0;
                    }

                    const privateAESKey = await crypto.subtle.importKey(
                        "raw",
                        keyBytes,
                        { name: "AES-GCM" },
                        false,
                        ["decrypt"]
                    );

                    let privateKeyBytes;
                    try {
                        privateKeyBytes = await crypto.subtle.decrypt(
                            { name: "AES-GCM", iv },
                            privateAESKey,
                            encryptedPrivateKeyBytes
                        );
                    } catch (e) {
                        throw new Error("Invalid password");
                    }
                    const privateKeyBase64 = btoa(String.fromCharCode(...new Uint8Array(privateKeyBytes)));
                    console.log("privateKeyBase64: " + privateKeyBase64)
                    setDecryptKey(privateKeyBase64)
                }

                console.log(decryptKey)

                // Fetch diary metadata
                const diaryResponse = await axiosInstance.get<DiaryDto>(
                    `/diaries/user/${userId}/${chosenDate}`,
                    {
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        }
                    }
                );
                const { content, createdAt, aesKey, aesIv } = diaryResponse.data;
                console.log("aesIV: " + aesIv)

                // // Request AES key decryption
                const aesKeyResponse = await axiosInstance.post(
                    `/diaries/user/${userId}/decrypt-aes-key`,
                    {
                        encryptedAESKey: aesKey,
                        privateKey: useAuthStore.getState().decryptKey
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${accessToken}`
                        }
                    }
                );
                const diaryAESKeyBase64 = aesKeyResponse.data;
                console.log(aesKeyResponse)
                console.log("diaryAESKeyBase64: " + diaryAESKeyBase64)

                // Decrypt diary content locally
                const aesKeyBytes = Uint8Array.from(atob(diaryAESKeyBase64), c => c.charCodeAt(0));
                const diaryAesKey = await crypto.subtle.importKey(
                    "raw",
                    aesKeyBytes,
                    { name: "AES-GCM" },
                    false,
                    ["decrypt"]
                );
                const aesIvBytes = Uint8Array.from(atob(aesIv), c => c.charCodeAt(0));
                const encryptedContentBytes = Uint8Array.from(atob(content), c => c.charCodeAt(0));

                const decryptedContentBytes = await crypto.subtle.decrypt(
                    { name: "AES-GCM", iv: aesIvBytes },
                    diaryAesKey,
                    encryptedContentBytes
                );
                const decryptedText = new TextDecoder().decode(decryptedContentBytes);
                console.log(decryptedText)

                // Store diary with media
                addDiary(format(createdAt, "yyyy-MM-dd"), decryptedText);
            } catch (error: any) {
                console.error("Fetch diary error:", error);
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<ErrorResponse>;
                    if (axiosError.response?.data) {
                        setErrorMessage(axiosError.response.data.message);
                    } else {
                        setErrorMessage("Failed to fetch diary. Please check your password.");
                    }
                } else {
                    setErrorMessage(error.message || "An unexpected error occurred.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchDiary();
    }, [chosenDate, password, userId, accessToken, addDiary]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-full">
                <Loader />
            </div>
        );
    }

    return (
        <div className="p-2">
            {errorMessage && (
                <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
                    {errorMessage}
                    <Button
                        onClick={() => { setPassword(null); setIsPasswordModalOpen(true); }}
                        className="text-white ml-2 bg-primary hover:bg-primary-hover text-center"
                    >
                        Retry Password
                    </Button>
                </div>
            )}
            <PasswordModal
                isOpen={isPasswordModalOpen}
                onSubmit={handlePasswordSubmit}
                onClose={() => setIsPasswordModalOpen(false)}
            />
            {diaries[chosenDate!] ? (
                <div>
                    <p>{diaries[chosenDate!]}</p>
                    {/* Uncomment when ready to include these components */}
                    {/* <AnimatedEmoji />
                    <StatusMessage />
                    <PersonalizedMessage />
                    <ReasonSection />
                    <Tips /> */}
                </div>
            ) : (
                <EmptyDiary />
            )}
        </div>
    );
};

export default DailyUserContent;
export { diaryAtom };