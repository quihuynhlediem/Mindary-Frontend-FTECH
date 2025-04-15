"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'
import axios, { AxiosError } from 'axios'
import { useToast } from "@/hooks/use-toast"
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { UUID } from 'crypto'
import { ErrorResponse } from '../types/diary'
import { atom, useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { AuthResponse } from '../types/diary'
import axiosInstance from '@/apiConfig'

const formSchema = z.object({
    email: z.string().email({
        message: "Email not valid"
    }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
    // .max(30, { message: "Password must be at most 30 characters long" })
    // .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    // .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    // .regex(/[0-9]/, { message: "Password must contain at least one number" })
    // .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" })
})

const accessTokenAtom = atomWithStorage<string | null>("accessToken", typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null);
const refreshTokenAtom = atomWithStorage<string | null>("refreshToken", typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null);
const userIdAtom = atomWithStorage<string | null>("userId", typeof window !== 'undefined' ? localStorage.getItem('userId') : null);

const page = () => {
    const [errorMessage, setErrorMessage] = useState<string | any>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast()
    const [accessToken, setAccessToken] = useAtom(accessTokenAtom)
    const [userId, setUserId] = useAtom(userIdAtom)
    const [refreshToken, setRefreshToken] = useAtom(refreshTokenAtom)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    useEffect(() => {
        if (errorMessage != null) {
            console.log(errorMessage)
            toast({
                variant: "destructive",
                title: "Error",
                description: errorMessage
            })
        }
    }, [errorMessage])

    const handleLogin = async (values: z.infer<typeof formSchema>) => {
        const email = values.email
        const password = values.password
        try {
            const response = await axiosInstance.post<AuthResponse>("/auth/login", {
                email,
                password
            })


            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            localStorage.setItem('userId', response.data.userId)

            toast({
                variant: "default",
                title: "Login Success",
            })

            window.location.href = "/diary"
        } catch (error: any) {
            console.error('Sign in error:', error);

            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>;
                if (axiosError.response?.data && axiosError.response.status === 401) { // Check if data exists
                    console.log(axiosError.response?.data.message)
                    setErrorMessage("Invalid email or password");
                } else {
                    setErrorMessage("An error occurred. Please try again later.");
                }
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div>

            <header>
                <h1>Welcome Back</h1>
                <h4>Input your credentials to sign in</h4>
            </header>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder='nguyenvana@gmail.com' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder='**********' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </Form>
            <div>
                <p>Don't have an account? <a href='/signup' className='text-primary'>Sign Up</a></p>
            </div>
        </div>
    )
}

export default page
export { accessTokenAtom, refreshTokenAtom, userIdAtom }