"use client"

import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel"
import { useRouter } from "next/navigation"

// Define the structure of our carousel items
interface CarouselItemData {
    title: string
    description: string
}

// Predefined array of carousel items
const carouselData: CarouselItemData[] = [
    {
        title: "Welcome to Mindary - Your Close Friend",
        description:
            "Easily log your emotions and activities every day to gain valuable insights into your mental wellbeing.",
    },
    {
        title: "Gain Valuable & Detailed Mood Insights",
        description:
            "Monitor your progress with detailed mood charts, mood count, activity counts, etc. to enhance your mood.",
    },
    {
        title: "Stay Motivated with Achievements",
        description:
            "Earn badges as you track your mood, making your journey to better mental health fun and engaging.",
    },
]

const Onboarding = () => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const router = useRouter()


    useEffect(() => {
        const hasVisited = localStorage.getItem('hasVisited');
        if (hasVisited) {
            router.push('/');
        }
    }, [router]);

    useEffect(() => {
        if (!api) return
        setCurrent(api.selectedScrollSnap())
        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    const handleContinue = React.useCallback(() => {
        api?.scrollNext()
    }, [api])

    const handleSkip = React.useCallback(() => {
        // Mark the user as having visited and navigate to signup
        localStorage.setItem('hasVisited', 'true')
        router.push('/signup')
    }, [router])

    const renderDots = () => {
        return carouselData.map((_, index) => (
            <div
                key={index}
                className={cn(
                    "h-2 w-2 rounded-full transition-all duration-300",
                    index === current ? "bg-primary" : "bg-primary/30"
                )}
            />
        ))
    }

    return (
        <div className="relative w-[430px] h-[932px] overflow-hidden bg-white">
            <div className="absolute w-[1000px] h-[1000px] bg-primary-hover rounded-full -top-[500px] -left-[285px]" />

            {/* Main carousel content */}
            <div className="relative top-[500px] flex flex-col items-center justify-center p-6">
                <Carousel setApi={setApi} className="w-full">
                    <CarouselContent>
                        {carouselData.map((item, index) => (
                            <CarouselItem key={index} className="w-full">
                                <Card className="border-none rounded-none w-full h-full shadow-none bg-transparent">
                                    <CardContent className="flex flex-col items-center justify-center p-6">
                                        <h1 className="text-2xl font-bold mb-3 text-center">
                                            {item.title}
                                        </h1>
                                        <p className="text-center text-sm text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>

                {/* Carousel dots */}
                <div className="py-4 flex justify-center space-x-2">{renderDots()}</div>

                <div className="mt-4 flex justify-between w-full max-w-sm">
                    <Button
                        onClick={handleSkip}
                        variant="outline"
                        className={`${current === carouselData.length - 1 ? "hidden" : ""} text-base w-[180px] rounded-full p-6`}
                    >
                        Skip
                    </Button>
                    <Button
                        onClick={current === carouselData.length - 1 ? handleSkip : handleContinue}
                        className={`${current === carouselData.length - 1 ? "w-full" : "w-[180px]"} text-base rounded-full p-6`}
                    >
                        {current === carouselData.length - 1 ? "Let's Get Started" : "Continue"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Onboarding