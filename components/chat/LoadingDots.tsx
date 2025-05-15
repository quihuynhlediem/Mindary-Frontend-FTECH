import { cn } from "@/lib/utils";

export function LoadingDots({ className }: { className?: string }) {
    return (
        <div className={cn("flex space-x-1.5 items-center", className)}>
            <div className="w-2 h-2 rounded-full bg-[#7EC8D3]/60 animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 rounded-full bg-[#7EC8D3]/60 animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 rounded-full bg-[#7EC8D3]/60 animate-bounce" />
        </div>
    );
} 