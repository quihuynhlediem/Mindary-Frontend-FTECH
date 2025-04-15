"use client"
import axiosInstance from '@/apiConfig'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { AuthResponse, ErrorResponse } from '../types/diary'
import { toast } from '@/hooks/use-toast'
import { AxiosError } from 'axios'
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
import { Button } from '@/components/ui/button'

const formSchema = z.object({
    username: z.string()
        .min(5, "Username must be at least 5 characters")
        .max(50, "Username must be at most 50 characters"),
    email: z.string().email({
        message: "Invalid email address"
    }),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(30, { message: "Password must be at most 30 characters long" })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        .regex(/[0-9]/, { message: "Password must contain at least one number" })
        .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character" }),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password not match",
    path: ["confirmPassword"]
})

const page = () => {
    const [errorMessage, setErrorMessage] = useState<string | any>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

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


    const handleSignup = async (values: z.infer<typeof formSchema>) => {
        const username = values.username
        const email = values.email
        const password = values.password

        try {
            setIsLoading(true)
            const response = await axiosInstance.post<AuthResponse>("/auth/signup", {
                username,
                email,
                password
            })

            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('refreshToken', response.data.refreshToken)
            localStorage.setItem('userId', response.data.userId)

            toast({
                variant: "default",
                title: "Create Account Success",
            })

            window.location.href = "/diary"
        } catch (error: any) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError.response?.data && axiosError.response.status === 401) { // Check if data exists
                console.log(axiosError.response?.data.message)
                setErrorMessage("Invalid email or password");
            } else {
                setErrorMessage("An error occurred. Please try again later.");
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
                <form onSubmit={form.handleSubmit(handleSignup)}>
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder='superstar' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
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
                <p>Already have an account? <a href='/login' className='text-primary'>Login</a></p>
            </div>
        </div>
    )
}

export default page