import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface WheelPickerProps {
    data: string[];
    selectedValue: string;
    onValueChange: (value: string) => void;
    height: number;
    itemHeight: number;
}

const WheelPicker: React.FC<WheelPickerProps> = ({
    data,
    selectedValue,
    onValueChange,
    height,
    itemHeight,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const index = data.indexOf(selectedValue);
            containerRef.current.scrollTo({
                top: index * itemHeight,
                behavior: "smooth",
            });
        }
    }, [selectedValue, data, itemHeight]);

    const handleScroll = () => {
        if (containerRef.current) {
            const index = Math.round(containerRef.current.scrollTop / itemHeight);
            if (data[index]) {
                onValueChange(data[index]);
            }
        }
    };

    const getOpacity = (index: number) => {
        const selectedIndex = data.indexOf(selectedValue);
        const diff = Math.abs(index - selectedIndex);
        return Math.max(0.2, 1 - diff * 0.15);
    };

    const getFontSize = (index: number) => {
        const selectedIndex = data.indexOf(selectedValue);
        const diff = Math.abs(index - selectedIndex);
        return Math.max(1, 1.4 - diff * 0.2) + "rem";
    };

    return (
        <div className="relative" style={{ height }}>
            {/* Selection Indicator */}
            <div
                className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 border-t-2 border-b-2 border-primary mx-10"
                style={{ height: itemHeight }}
            ></div>

            {/* Scrolling List */}
            <div
                ref={containerRef}
                className="overflow-y-scroll scrollbar-hide snap-y snap-mandatory"
                style={{ height }}
                onScroll={handleScroll}
            >
                <div style={{ paddingTop: height / 2 - itemHeight / 2, paddingBottom: height / 2 - itemHeight / 2 }}>
                    {data.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`flex items-center justify-center snap-center font-semibold ${item === selectedValue ? "text-primary" : "text-gray-500"
                                }`}
                            style={{
                                height: itemHeight,
                                opacity: getOpacity(index),
                                fontSize: getFontSize(index),
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {item}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WheelPicker;