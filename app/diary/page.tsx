// diary/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { format } from "date-fns";

const DiaryRedirect = () => {
    const router = useRouter();
    const today = format(new Date(), "yyyy-MM-dd");

    useEffect(() => {
        router.replace(`/diary/${today}`);
    }, [router]);

    return null;
};

export default DiaryRedirect;