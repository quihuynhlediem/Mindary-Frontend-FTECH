"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi
} from "@/components/ui/carousel"
import { DiaryImageDto } from "@/app/types/diary";

interface ImageViews {
    diaryImages: DiaryImageDto[];
}

const ImageViewer: React.FC<ImageViews> = ({ diaryImages }) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)

    const myLoader = ({ src }: { src: string }): string => {
        return src;
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <div className="flex flex-col space-y-4 ">
            <Label className="text-[25px] font-semibold">Photo</Label>
            <Carousel className="flex flex-wrap gap-2 w-full px-10 left-2">
                <CarouselContent>
                    {diaryImages.map((image, index) => (
                        <CarouselItem
                            key={index}
                            className="relative h-32 w-32 cursor-pointer"
                            onClick={() => setSelectedImage(image.url)}
                        >
                            <Image
                                src={image.url}
                                alt={`Uploaded ${index + 1}`}
                                className="object-cover rounded w-full h-full"
                                fill={true}
                                loader={myLoader}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-0" />
                <CarouselNext className="right-0" />
            </Carousel>

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
                    onClick={closeModal}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src={selectedImage}
                            alt="Selected Image"
                            className="left-2 object-contain w-full h-full"
                            fill={true}
                            loader={myLoader}
                        />
                        <button
                            className="absolute top-2 right-2 bg-white p-1 rounded-full"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeModal();
                            }}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageViewer; 