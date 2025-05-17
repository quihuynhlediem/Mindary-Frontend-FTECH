"use client"
import React from "react";
import { ReactNode } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card"

interface OnboardingStep {
    title: string,
    description?: string,
    children: ReactNode
}

const OnboardingStep: React.FC<OnboardingStep> = ({ title, description, children }) => {
    return (
        <Card className="h-full flex flex-col mx-4 justify-evenly">
            <CardHeader className="text-center my-0 px-3 py-6">
                <h1 className="text-2xl font-semibold">{title}</h1>
                {description && <p className="text-sm text-gray-500">{description}</p>}
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    )
}

export default OnboardingStep