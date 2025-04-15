"use client"
import React from 'react'

import { ActivityType } from '@/app/onboarding-profile/page'
import { ScrollArea } from '../ui/scroll-area'
import OnboardingStep from './OnboardingStep'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface SelectPreferActivities {
    title: string,
    description: string,
    selectedActivities: ActivityType[],
    setSelectedActivities: (value: ActivityType[]) => void
}

const SelectPreferActivities: React.FC<SelectPreferActivities> = ({
    title,
    description,
    selectedActivities,
    setSelectedActivities
}) => {

    const handleActivityToggle = (index: number) => {
        const updatedActivities = [...selectedActivities];
        updatedActivities[index].selected = !updatedActivities[index].selected;
        setSelectedActivities(updatedActivities);
    };

    return (
        <ScrollArea>
            <OnboardingStep title='What do you want to record?' description='Track activities that matter to you. Choose the types of activities you want to log.'>
                <div className="space-y-4 h-full w-full">
                    {selectedActivities.map((activity, index) => (
                        <div
                            key={activity.label}
                            className={cn(
                                "border rounded-lg p-4 relative flex items-start justify-between", // Relative for icon positioning
                                activity.selected ? "border-primary bg-blue-50" : "border-gray-300"
                            )}
                            onClick={() => handleActivityToggle(index)}
                        >
                            <Input
                                type="checkbox"
                                checked={activity.selected}
                                onChange={() => { }}
                                className="hidden"
                            />
                            <div className='w-4/5'>
                                <h3 className="text-lg font-medium">{activity.label}</h3>
                                <p className="text-gray-500 text-sm">{activity.description}</p>
                            </div>

                            {/* Tick Icon (Conditional Rendering) */}
                            <div className=''>
                                {activity.selected && (
                                    <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-primary">
                                        <Check className="w-6 h-6" />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </OnboardingStep>
        </ScrollArea>
    )
}

export default SelectPreferActivities