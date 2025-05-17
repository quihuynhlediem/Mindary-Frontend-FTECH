"use client"
import React, { useState, useEffect } from "react";
import HomePage from "@/components/homepage/HomePage";
import { Toaster } from "@/components/ui/toaster"
import api from "@/apiConfig";
import { useRouter } from "next/navigation";
import useAuthStore from "@/hooks/useAuthStore";

export default function Home() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const isFirstTimeLogin = useAuthStore((state) => state.isFirstTimeLogin);
  const router = useRouter();

  useEffect(() => {
    if (!isFirstTimeLogin!) {
      router.push('/onboarding-profile');
    }
  })

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      router.push('/onboarding');
    }
  }, [router]);

  // useEffect(() => {
  //   // Fetch CSRF token on component mount
  //   api.get('/api/v1/csrf')
  //     .then(response => {
  //       console.log("CSRF Token:", response.data.csrfToken);
  //       setCsrfToken(response.data.csrfToken);
  //     })
  //     .catch(error => console.error("Error fetching CSRF token:", error));
  // }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Toaster />
      <HomePage />

    </div>
  );
}
