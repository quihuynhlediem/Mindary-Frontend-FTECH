"use client";
import React, { useState, useEffect, useCallback } from "react";
import AnimatedEmoji from "./AnimatedEmoji";
import axios, { AxiosError } from "axios";
import { Button } from "../ui/button";
import { format } from "date-fns";
import EmptyDiary from "./EmptyDiary";
import Loader from "../general/Loader";
import { Diaries, DiaryDto, DiaryImageDto, ErrorResponse, UserEncryptionData } from "@/app/types/diary";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import axiosInstance from "@/apiConfig";
import useAuthStore from "@/hooks/useAuthStore";
import useUserStore from "@/hooks/useUserStore";
import ImageViewer from "./ImageViewer";
import { Lock, Calendar, Edit, ImageIcon } from "lucide-react";
import { ChartArea } from 'lucide-react';

const passwordSchema = z.object({
    password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/, {
        message: "Password must be 8+ characters with uppercase, lowercase, number, and special character"
    })
});

// const diaryAtom = atom<Diaries>({});

interface PasswordFormData {
    password: string;
}

// Password Modal Component with refined styling
const PasswordModal: React.FC<{
    isOpen: boolean;
    onSubmit: (password: string) => void;
    onClose: () => void;
}> = ({ isOpen, onSubmit, onClose }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
        defaultValues: { password: "" }
    });

    const onFormSubmit = (data: PasswordFormData) => {
        onSubmit(data.password);
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-2xl max-w-sm w-full border border-neutral-200">
                <div className="flex items-center gap-2 mb-6">
                    <Lock className="w-5 h-5 text-[#7EC8D3]" />
                    <h2 className="text-2xl font-serif font-semibold">Diary Locked</h2>
                </div>
                <p className="text-neutral-600 mb-4">Enter your password to unlock your private diary entries.</p>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="mb-4">
                        <input
                            type="password"
                            {...register("password")}
                            placeholder="Enter your password"
                            className="border border-neutral-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#7EC8D3] bg-neutral-50"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
                        )}
                    </div>
                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            onClick={onClose}
                            className="bg-white border border-neutral-300 text-neutral-600 p-2 rounded-lg hover:bg-neutral-100"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-[#7EC8D3] text-white p-2 rounded-lg hover:bg-[#7EC8D3]/90"
                        >
                            Unlock Diary
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const DailyUserContent: React.FC<{
    handleAnalysisButtonClick: () => void;
    isAnalysisLoading: boolean,
}> = ({ handleAnalysisButtonClick, isAnalysisLoading }) => {
    const chosenDate = useUserStore((state) => state.selectedDate);
    const addDiary = useUserStore((state) => state.addDiary);
    const addImage = useUserStore((state) => state.addImages);
    const diaries = useUserStore((state) => state.diaries);
    const diaryImages = useUserStore((state) => state.diaryImages);
    const accessToken = useAuthStore((state) => state.accessToken);
    const userId = useAuthStore((state) => state.userId);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [password, setPassword] = useState<string | null>(null);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState<boolean>(false);
    const setDecryptKey = useAuthStore((state) => state.setDecryptKey);
    const decryptKey = useAuthStore((state) => state.decryptKey);

    const UNIT_8_ARRAY: number = parseInt(process.env.UNIT_8_ARRAY || "32")

    // Open modal if password is missing and chosenDate is set
    useEffect(() => {
        if (!decryptKey && chosenDate) {
            setIsPasswordModalOpen(true);
        }
    }, [decryptKey, chosenDate]);

    // Decrypt private key using password
    const decryptPrivateKey = useCallback(
        async (password: string): Promise<string> => {
            try {
                const response = await axiosInstance.get<UserEncryptionData>(
                    `/customers/${userId}`,
                    {
                        headers: { Authorization: `Bearer ${accessToken}` },
                    }
                );
                const { encryptedPrivateKey, privateKeyIv } = response.data;

                const iv = Uint8Array.from(atob(privateKeyIv), (c) => c.charCodeAt(0));
                const encryptedPrivateKeyBytes = Uint8Array.from(
                    atob(encryptedPrivateKey),
                    (c) => c.charCodeAt(0)
                );

                // Pad or truncate password to 32 bytes
                const passwordBytes = new TextEncoder().encode(password);
                const keyBytes = new Uint8Array(UNIT_8_ARRAY).fill(0);
                passwordBytes.forEach((byte, i) => {
                    if (i < 32) keyBytes[i] = byte;
                });

                const privateAESKey = await crypto.subtle.importKey(
                    "raw",
                    keyBytes,
                    { name: "AES-GCM" },
                    false,
                    ["decrypt"]
                );

                const privateKeyBytes = await crypto.subtle.decrypt(
                    { name: "AES-GCM", iv },
                    privateAESKey,
                    encryptedPrivateKeyBytes
                );

                return btoa(String.fromCharCode(...new Uint8Array(privateKeyBytes)));
            } catch (error) {
                throw new Error("Invalid password or failed to decrypt private key");
            }
        },
        [userId, accessToken]
    );

    // Decrypt diary content
    const decryptDiaryContent = useCallback(
        async (diary: DiaryDto, privateKeyBase64: string): Promise<string> => {
            const { content, aesKey, aesIv } = diary;

            // Request AES key decryption
            const aesKeyResponse = await axiosInstance.post<string>(
                `/diaries/user/${userId}/decrypt-aes-key`,
                { encryptedAESKey: aesKey, privateKey: privateKeyBase64 },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            const diaryAESKeyBase64 = aesKeyResponse.data;

            // Decrypt diary content locally
            const aesKeyBytes = Uint8Array.from(
                atob(diaryAESKeyBase64),
                (c) => c.charCodeAt(0)
            );
            const diaryAesKey = await crypto.subtle.importKey(
                "raw",
                aesKeyBytes,
                { name: "AES-GCM" },
                false,
                ["decrypt"]
            );
            const aesIvBytes = Uint8Array.from(atob(aesIv), (c) => c.charCodeAt(0));
            const encryptedContentBytes = Uint8Array.from(
                atob(content),
                (c) => c.charCodeAt(0)
            );

            const decryptedContentBytes = await crypto.subtle.decrypt(
                { name: "AES-GCM", iv: aesIvBytes },
                diaryAesKey,
                encryptedContentBytes
            );
            return new TextDecoder().decode(decryptedContentBytes);
        },
        [userId, accessToken]
    );

    // Fetch and decrypt diary
    const fetchDiary = useCallback(async () => {
        if (!chosenDate || !userId || !accessToken || !decryptKey) return;

        setIsLoading(true);

        try {
            // Fetch diary metadata
            const diaryResponse = await axiosInstance.get<DiaryDto>(
                `/diaries/user/${userId}/${chosenDate}`,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );
            const data = diaryResponse.data;
            const diaryId: string = data.id

            // Decrypt diary content
            const decryptedText = await decryptDiaryContent(data, decryptKey);

            // Store decrypted diary
            addDiary(format(new Date(data.createdAt), "yyyy-MM-dd"), decryptedText);

            // Get images
            const diaryImagesResponse = await axiosInstance.get<DiaryImageDto[]>(
                `/diaries/${diaryId}/user/${userId}/images`,
                {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }
            );

            const images: DiaryImageDto[] = diaryImagesResponse.data
            console.log(images.length)
            if (images.length > 0) {
                addImage(format(new Date(data.createdAt), "yyyy-MM-dd"), images);
            }
        } catch (error) {
            let message = "Failed to fetch or decrypt diary.";
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                message = axiosError.response?.data.message || message;
            } else if (error instanceof Error) {
                message = error.message;
            }
        } finally {
            setIsLoading(false);
        }
    }, [chosenDate, userId, accessToken, decryptKey, addDiary, decryptDiaryContent]);

    // Handle password submission
    const handlePasswordSubmit = useCallback(
        async (password: string) => {
            setIsPasswordModalOpen(false);
            setIsLoading(true);
            setErrorMessage("");

            try {
                const privateKeyBase64 = await decryptPrivateKey(password);
                setDecryptKey(privateKeyBase64);
            } catch (error) {
                setErrorMessage("Invalid password. Please try again.");
                setIsPasswordModalOpen(true);
            } finally {
                setIsLoading(false);
            }
        },
        [decryptPrivateKey, setDecryptKey]
    );

    // Fetch diary when decryptKey is set
    useEffect(() => {
        fetchDiary();
    }, [fetchDiary]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center my-20">
                <div className="flex flex-col items-center gap-3">
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 rounded-full border-4 border-t-[#7EC8D3] border-neutral-200 animate-spin"></div>
                    </div>
                    <p className="text-neutral-500">Opening your diary...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 flex flex-col items-center">
            {errorMessage && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 text-center border border-red-200 max-w-md mx-auto">
                    <p className="mb-2">{errorMessage}</p>
                    <Button
                        onClick={() => { setPassword(null); setIsPasswordModalOpen(true); }}
                        className="text-white bg-[#7EC8D3] hover:bg-[#7EC8D3]/90 rounded-lg"
                    >
                        Try Again
                    </Button>
                </div>
            )}
            <PasswordModal
                isOpen={isPasswordModalOpen}
                onSubmit={handlePasswordSubmit}
                onClose={() => setIsPasswordModalOpen(false)}
            />

            {/* Diary Book Container */}
            {diaries[chosenDate!] ? (
                <div className="w-full max-w-3xl mx-auto">
                    {/* Date Header */}
                    <div className="mb-4 flex items-center justify-between">
                        <div className="w-full flex items-center justify-between gap-2">

                            <div className="text-xs px-2 py-1 bg-[#7EC8D3]/10 text-[#7EC8D3] rounded-full font-medium">
                                {diaryImages[chosenDate!]?.length ? (
                                    <div className="flex items-center gap-1">
                                        <ImageIcon className="w-3 h-3" />
                                        <span>{diaryImages[chosenDate!].length} images</span>
                                    </div>
                                ) : "Text entry"}
                            </div>
                            <button onClick={handleAnalysisButtonClick} disabled={isAnalysisLoading} className="flex justify-center items-center gap-1.5 bg-[#E6F4F1] border-[#7EC8D3] rounded-lg border-2 border-solid p-1 cursor-pointer">
                                <ChartArea className="w-4" /> <span className="text-center justify-start text-black text-sm font-semibold tracking-wide">View Analysis</span>
                            </button>
                        </div>
                    </div>

                    {/* Diary Paper Effect */}
                    <div className="bg-white rounded-lg border border-neutral-200 shadow-md overflow-hidden">
                        {/* Notebook Header Bar */}
                        <div className="h-4 bg-gradient-to-r from-[#7EC8D3]/80 to-[#7EC8D3]"></div>

                        {/* Diary Content */}
                        <div className="diary-content p-8 relative bg-[url('/paper-texture.png')] bg-repeat">
                            {/* Decorative paperclip */}
                            <div className="absolute -right-2 -top-1 w-8 h-16 bg-[url('/paperclip.png')] bg-contain bg-no-repeat rotate-6 opacity-30 pointer-events-none"></div>

                            {/* Diary text with improved typography */}
                            <div className="prose prose-neutral max-w-none font-serif whitespace-pre-wrap leading-relaxed">
                                {diaries[chosenDate!]?.split('\n').map((paragraph, idx) => (
                                    paragraph ? <p key={idx} className="mb-4">{paragraph}</p> : <br key={idx} />
                                ))}
                            </div>

                            {/* Images with diary styling */}
                            {diaryImages[chosenDate!] && diaryImages[chosenDate!].length > 0 && (
                                <div className="mt-6 pt-6 border-t border-neutral-200">
                                    <div className="flex items-center gap-2 mb-4">
                                        <ImageIcon className="w-4 h-4 text-neutral-500" />
                                        <h3 className="font-serif text-lg text-neutral-700">Photos</h3>
                                    </div>
                                    <div className="diary-photos">
                                        <ImageViewer
                                            diaryImages={diaryImages[chosenDate!]}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-3xl mx-auto bg-white rounded-lg border border-neutral-200 shadow-md p-8 flex flex-col items-center justify-center min-h-[300px]">
                    <EmptyDiary />
                </div>
            )}
        </div>
    );
};

export default DailyUserContent;