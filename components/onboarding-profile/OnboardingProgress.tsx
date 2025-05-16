"use client"
import { Progress } from "../ui/progress"

interface OnboardingProgress {
    currentStep: number,
    totalSteps: number
}

const OnboardingProgress: React.FC<OnboardingProgress> = ({ currentStep, totalSteps }) => {
    const progressPercentage = (currentStep / totalSteps) * 100

    return (
        <div className="flex items-center w-full">

            <Progress value={progressPercentage} className="mr-4" />
            <span className="text-gray-500 mr-4">
                {currentStep}/{totalSteps}
            </span>
        </div>
    )
}

export default OnboardingProgress