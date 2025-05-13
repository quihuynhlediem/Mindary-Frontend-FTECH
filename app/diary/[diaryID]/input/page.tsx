"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useParams } from "next/navigation";
import { X } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Lottie from "lottie-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogHeader,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { DiaryDto, DiaryImageDto, ErrorResponse } from "@/app/types/diary";
import { useToast } from "@/hooks/use-toast"
import axios, { AxiosError } from "axios";
import { UUID } from "crypto";
import { DiaryFormData } from "@/app/types/diary";
import warmSmile from "@/public/warm-smile.json";
import loudlyCrying from "@/public/loudly-crying.json";
import Loader from "@/components/general/Loader";
import axiosInstance from "@/apiConfig";
import ImageUploader from "@/components/diary/ImageUploader";
import VoiceRecorder from "@/components/diary/VoiceRecorder";
import useAuthStore from "@/hooks/useAuthStore";
import useUserStore from "@/hooks/useUserStore";

const formSchema = z.object({
    diary: z
        .string()
        .min(50)
        .max(2000, { message: "Diary exceed character limit" }),
    audio: z.instanceof(Blob).optional(),
    images: z.array(z.instanceof(File)).optional(),
    analysis: z.boolean().default(true).optional(),
});

const Input = () => {
    const [images, setImages] = useState<File[]>([]);
    const [audioUrl, setAudioUrl] = useState<Blob | null>(null);
    const router = useRouter();
    const { push } = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)
    const [errorDialog, setErrorDialog] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>(
        "It looks like something went wrong with the server, please try again sometime later 😢"
    );
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const accessToken = useAuthStore((state) => state.accessToken)
    const userId = useAuthStore((state) => state.userId)
    const chosenDate = useUserStore((state) => state.selectedDate);
    // const chosenDate = useParams<{ diaryID: string }>;
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated());

    const { toast } = useToast()

    // Redirect to login page
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, router])

    // Prevent rendering while redirecting
    if (!isAuthenticated) {
        return null
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            diary: "",
            audio: undefined,
            images: [],
            analysis: true,
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        setOpen(true);

        // Create form data
        // const formData: DiaryFormData = {
        //     diary: values.diary,
        //     timezone: timezone,
        //     ai: values.analysis ? "yes" : "no",
        //     audio: values.audio,
        //     images: values.images,
        // };

        let formData = new FormData();
        formData.append("diary", values.diary);
        formData.append("timezone", timezone)

        if (values.analysis) {
            formData.append("ai", "yes")
        } else {
            formData.append("ai", "no")
        }

        let req = async () => {

            // await new Promise((resolve) => setTimeout(() => resolve("yay"), 5000));
            try {
                // Send user's diary to back-end
                console.log(chosenDate)
                const res = await axiosInstance.post<DiaryDto>(`/diaries/user/${userId}/${chosenDate}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": `Bearer ${accessToken}`
                    },
                });
                // Handle response
                toast({
                    variant: "success",
                    title: "Successfully Saved!",
                    description: "Your diary is saved"
                })
                // Navigate to the diary page for the selected date
                router.push(`/diary/${chosenDate}`)
            } catch (error: any) {
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<ErrorResponse>
                    if (axiosError.response?.data) {
                        console.log(axiosError.response.data.message)
                    }
                }
                setOpen(false);
                setErrorDialog(true);
            } finally {
                setIsLoading(false);
                setOpen(false);
            }
        };

        return (
            <div className="px-4 min-h-screen h-screen flex flex-col">
                <div className="mt-6">
                    <Button
                        className="bg-transparent rounded-full "
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            router.back()
                        }}
                    >
                        <X
                            className="text-primary"
                        />
                    </Button>
                </div>
                <h1 className="text-[32px] text-center font-bold text-primary">Your Diary</h1>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col space-y-10 min-h-screen"
                    >
                        <FormField
                            control={form.control}
                            name="diary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl font-semibold">
                                        Tell us more about your day
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Today i felt..."
                                            className="resize-none text-body-1 min-h-48 bg-primary-foreground"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="audio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl font-semibold">
                                        Upload your photos
                                    </FormLabel>
                                    <FormControl>
                                        <VoiceRecorder
                                            onAudioChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl font-semibold">
                                        Upload your photos
                                    </FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            onChange={field.onChange}
                                            value={field.value}
                                            className="border-border rounded-lg"
                                        />
                                    </FormControl>{" "}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* AI Analysis Checkbox */}
                        {/* <FormField
                        control={form.control}
                        name="analysis"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>
                                        Allow AI Analysis
                                    </FormLabel>
                                    <FormDescription>
                                        You agree to our Terms of Service and Privacy towards the Information Privacy.
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    /> */}
                        {/* Align bottom */}
                        <Button className="w-full" type="submit">
                            Continue
                        </Button>
                    </form>
                </Form>

                {/* Dialog for analyzing */}
                <Dialog open={open}>
                    <DialogContent className="p-4 max-w-[90dvw] rounded-lg">
                        <DialogHeader>
                            <div className="flex justify-center w-full">
                                <Lottie
                                    className="size-36"
                                    animationData={warmSmile}
                                    loop={true}
                                />
                            </div>
                            <DialogTitle className="flex justify-center gap-1 text-center">
                                Analyzing
                                <div className="relative top-2">
                                    <Loader />
                                </div>
                            </DialogTitle>
                            <DialogDescription className="text-center">
                                Please wait for a bit while we are trying to analyzing through
                                your diary, it won't be long we promise 😉
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                {/* Dialog for error */}
                <Dialog open={errorDialog} onOpenChange={setErrorDialog}>
                    <DialogContent className="p-4 max-w-[90dvw] rounded-lg">
                        <DialogHeader>
                            <div className="flex justify-center w-full">
                                <Lottie
                                    className="size-36"
                                    animationData={loudlyCrying}
                                    loop={true}
                                />
                            </div>
                            <DialogTitle className="flex justify-center gap-1 text-center">
                                Oops
                            </DialogTitle>
                            <DialogDescription className="text-center">
                                {errorMessage}
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        );
    };
}

export default Input;