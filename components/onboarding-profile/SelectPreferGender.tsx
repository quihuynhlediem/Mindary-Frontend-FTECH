"use client"
import React from 'react'
import OnboardingStep from './OnboardingStep'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'

interface SelectPreferGender {
    title: string,
    description: string,
    gender: string,
    setGender: (value: string) => void,
    error: string | null
}

const SelectPreferGender: React.FC<SelectPreferGender> = ({
    title,
    description,
    gender,
    setGender,
    error
}) => {

    const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGender(e.target.value)
    }

    return (
        <OnboardingStep title="What is your gender?" description="Help us tailor your experience">
            <div className="grid grid-cols-2 gap-4"> {/* Grid for the buttons */}
                <Label className={cn(
                    "flex items-center justify-center p-4 rounded-full border",
                    gender === 'male' ? "border-blue-500 bg-blue-100 text-blue-500" : "border-gray-300 text-gray-500"
                )}>
                    <Input
                        type="radio"
                        value="male"
                        checked={gender === 'male'}
                        onChange={handleGenderChange}
                        className="hidden" // Hide the default radio button
                    />
                    <span className="flex flex-col items-center"> {/* Icon and text container */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mars"><path d="M16 3h5v5" /><path d="m21 3-6.75 6.75" /><circle cx="10" cy="14" r="6" /></svg>
                        Male
                    </span>
                </Label>

                <Label className={cn(
                    "flex items-center justify-center p-4 rounded-full border",
                    gender === 'female' ? "border-pink-500 bg-pink-100 text-pink-500" : "border-gray-300 text-gray-500"
                )}>
                    <Input
                        type="radio"
                        value="female"
                        checked={gender === 'female'}
                        onChange={handleGenderChange}
                        className="hidden" // Hide the default radio button
                    />
                    <span className="flex flex-col items-center"> {/* Icon and text container */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-venus"><path d="M12 15v7" /><path d="M9 19h6" /><circle cx="12" cy="9" r="6" /></svg>
                        Female
                    </span>
                </Label>
            </div>

            {/* <div className="mt-4 flex justify-center"> Center the "Prefer not to say" button */}
            <Label className={cn(
                "flex items-center justify-center p-4 rounded-full border mt-4",
                gender === 'preferNotToSay' ? "border-purple-500 bg-purple-100 text-purple-500" : "border-gray-300 text-gray-500"
            )}>
                <Input
                    type='radio'
                    value="preferNotToSay"
                    onChange={handleGenderChange}
                    className='hidden'
                    checked={gender === 'preferNotToSay'}
                />
                <span>Prefer not to say</span>
            </Label>
            {/* </div> */}
            {error !== null ? <p className='text-red-700 text-sm text-center'>{error}</p> : ""}
        </OnboardingStep>
    )
}

export default SelectPreferGender