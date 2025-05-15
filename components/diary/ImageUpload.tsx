import { ImageUp, Target, X } from "lucide-react";
import React, { FC, InputHTMLAttributes, useRef, useState } from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface Props
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
    className?: string;
}

const ImageUpload: FC<Props> = ({ className, ...inputProps }) => {
    const [images, setImages] = useState<string[]>([]);
    const [fileNames, setFileNames] = useState<string[] | null>(null);

    const maxImages = 3;
    const inputRef = useRef<HTMLInputElement>(null);

    // 1KB * nMB (in MBs)
    const fileSizeLimit = 1024 * (1024 * 2);

    const checkFile = (file: File): boolean => {
        // Check size
        if (file.size > fileSizeLimit) {
            return false;
        }

        return true;
    };

    return (
        <>
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                }}
                className={cn(
                    "border-dashed border-2 border-border",
                    "cursor-pointer",
                    "transition-all",
                    className,
                )}
            >
                <Input
                    ref={inputRef}
                    {...inputProps}
                    onChange={(e) => {
                        const files = e.target.files;
                        if (!files) return;
                        // If can input multiple files
                        if (inputProps.multiple) {
                            if (images.length >= maxImages) return;

                            let imageObjectUrls: string[] = [];
                            let fileNames: string[] = [];

                            for (let i = 0; i < files.length; i++) {
                                if (!checkFile(files[i])) return;
                                imageObjectUrls.push(URL.createObjectURL(files[i]));
                                fileNames.push(files[i].name);
                            }

                            setImages((prev) => [...prev, ...imageObjectUrls]);
                            setFileNames((prev) => {
                                if (prev) {
                                    return [...prev!, ...fileNames];
                                } else return fileNames;
                            });
                        } else {
                            if (!checkFile(files[0])) return;
                            setImages([URL.createObjectURL(files[0])]);
                            setFileNames([files[0].name]);
                        }

                        if (inputProps.onChange) {
                            inputProps.onChange(e);
                        }
                    }}
                    className="border-none hidden"
                    type="file"
                    accept="image/*"
                />
                {images.length > 0 ? (
                    <div className="flex flex-col gap-2 justify-center items-center size-full p-4">
                        {images.map((img, idx) => {
                            return (
                                <div
                                    key={idx}
                                    className="relative size-full transition-all rounded-lg overflow-hidden group drop-shadow-lg"
                                >
                                    <img
                                        src={img}
                                        className="animate-zoom-in size-full object-cover rounded-lg group-hover:brightness-[.25]"
                                        alt="uploadedImage"
                                    />
                                    <Button
                                        size={"icon"}
                                        variant={"destructive"}
                                        className="absolute top-2 right-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setImages((prev) =>
                                                prev!.filter((_, prevIdx) => prevIdx !== idx),
                                            );
                                            setFileNames((prev) =>
                                                prev!.filter((_, prevIdx) => prevIdx !== idx),
                                            );
                                        }}
                                    >
                                        <X />
                                    </Button>
                                    {/* <div className="flex gap-2 items-center justify-start absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-all"> */}
                                    {/* 	<span className="truncate">{fileNames![idx]}</span> */}
                                    {/* 	<button */}
                                    {/* 		onClick={(e) => { */}
                                    {/* 			e.stopPropagation(); */}
                                    {/* 			setImages((prev) => */}
                                    {/* 				prev!.filter((_, prevIdx) => prevIdx !== idx), */}
                                    {/* 			); */}
                                    {/* 			setFileNames((prev) => */}
                                    {/* 				prev!.filter((_, prevIdx) => prevIdx !== idx), */}
                                    {/* 			); */}
                                    {/* 		}} */}
                                    {/* 		className="ml-auto rounded-full p-2 bg-background/75 border-solid hover:bg-primary hover:text-primary-foreground transition-all" */}
                                    {/* 	> */}
                                    {/* 		<X /> */}
                                    {/* 	</button> */}
                                    {/* </div> */}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex flex-col gap-2 justify-center items-center size-full p-4">
                        <ImageUp className="text-muted-foreground" size={36} />
                        <p>
                            <span className="underline">Browse</span> files and images here
                        </p>
                    </div>
                )}
            </div>
            {inputProps.multiple == true && (
                <p className="tracking-widest text-muted-foreground float-end">
                    {images.length}/{maxImages}
                </p>
            )}
        </>
    );
};

export default ImageUpload;