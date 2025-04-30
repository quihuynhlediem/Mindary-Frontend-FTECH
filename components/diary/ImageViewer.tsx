"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { X, Camera, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DiaryImageDto } from "@/app/types/diary";

interface ImageViews {
    diaryImages: DiaryImageDto[]
}

const ImageViewer: React.FC<ImageViews> = ({ diaryImages }) => {
    // const [images, setImages] = useState<File[]>([]);

    // const { getRootProps, getInputProps } = useDropzone({
    //     accept: { "image/*": [] },
    //     multiple: true,
    //     onDrop: (acceptedFiles) => {
    //         const newImages = [...images, ...acceptedFiles];
    //         setImages(newImages);
    //         onImagesChange(newImages);
    //     },
    // });

    // const removeImage = (index: number) => {
    //     const updatedImages = images.filter((_, i) => i !== index);
    //     setImages(updatedImages);
    //     onImagesChange(updatedImages);
    // };

    return (
        <div className="">
            <Label className="text-[18px] font-semibold">Photo</Label>
            <div className="flex flex-wrap gap-2">
                {diaryImages.map((image, index) => (
                    <div key={index} className="relative w-20 h-20">
                        <Image
                            src={image.url}
                            alt={`Uploaded ${index + 1}`}
                            className="object-cover rounded w-full h-full"
                            // layout="fill"
                            // objectFit="cover"
                            fill={true}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageViewer;