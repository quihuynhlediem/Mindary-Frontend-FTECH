"use client"
import React from 'react'
import OnboardingStep from './OnboardingStep';
import WheelPicker from '../general/WheelPicker';

interface SelectAge {
    title: string,
    description: string
    age: string;
    setAge: (value: string) => void;
}

const SelectAge: React.FC<SelectAge> = ({
    title,
    description,
    age,
    setAge
}) => {

    const ages = Array.from({ length: 100 }, (_, i) => `${i + 1}`)

    return (
        <OnboardingStep title={title} description={description}>
            <WheelPicker
                data={ages}
                selectedValue={age}
                onValueChange={setAge}
                height={300}
                itemHeight={40}
            />
        </OnboardingStep>
    )
}

export default SelectAge