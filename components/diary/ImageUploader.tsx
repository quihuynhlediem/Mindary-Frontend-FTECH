"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { X, Camera, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploaderProps {
  onImagesChange: (files: File[]) => void;
  value: File[] | undefined
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesChange, value }) => {
  const [images, setImages] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop: (acceptedFiles) => {
      const newImages = [...images, ...acceptedFiles];
      setImages(newImages);
      onImagesChange(newImages);
    },
  });

  const removeImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  return (
    <div className="">
      <Label className="text-[18px] font-semibold">Photo</Label>
      <div className="flex flex-wrap gap-2">
        {images.map((file, index) => (
          <div key={index} className="relative w-20 h-20">
            <Image
              src={URL.createObjectURL(file)}
              alt={`Uploaded ${index + 1}`}
              className="object-cover rounded w-full h-full"
              // layout="fill"
              // objectFit="cover"
              fill={true}
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-1 right-1 bg-white rounded-full p-1"
              onClick={() => removeImage(index)}
              type="button"
            >
              <X size={16} className="text-red-500" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex space-x-4 mt-2 justify-evenly">
        <div {...getRootProps()} className="flex flex-col">
          <Input {...getInputProps()} className="hidden" />
          <Button variant="outline" className="flex items-center space-x-2" type="button">
            <Camera size={20} className="text-primary" />
            <span>Camera</span>
          </Button>
        </div>
        <div {...getRootProps()} className="flex flex-col">
          <Input {...getInputProps()} className="hidden" />
          <Button variant="outline" className="flex items-center space-x-2" type="button">
            <ImageIcon size={20} className="text-primary" />
            <span>Gallery</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;