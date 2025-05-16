"use client"
import React, { useState } from 'react'
import OnboardingStep from './OnboardingStep';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

interface SelectPreferName {
    title: string,
    description: string
    nickname: string;
    setNickname: (value: string) => void;
    error: string | null;
}

const SelectPreferName: React.FC<SelectPreferName> = ({
    title,
    description,
    nickname,
    setNickname,
    error
}) => {
    return (
        <OnboardingStep title="What should we call you?" description="First things first, enter your nickname">
            <div className="w-full">
                <Label htmlFor="nickname" className="sr-only">Nickname</Label>
                <Input
                    id="nickname"
                    type="text"
                    placeholder="Andrew"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className={cn(
                        "border-gray-300 bg-slate-100 shadow-sm focus:ring-0 focus:border-sky-500 rounded-lg py-3 px-4 w-full",
                        "placeholder:text-gray-400"
                    )}
                />
                {error !== null ? <p className='text-red-700 text-sm text-center'>{error}</p> : <p></p>}
            </div>
        </OnboardingStep>
    )
}

export default SelectPreferName