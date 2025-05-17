"use client"
import React, { useState, useEffect } from "react";
import HomePage from "@/components/homepage/HomePage";
import { Toaster } from "@/components/ui/toaster"
import api from "@/apiConfig";
import { useRouter } from "next/navigation";
import useAuthStore from "@/hooks/useAuthStore";

export default function Home() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isFirstTime = useAuthStore((state) => state.isFirstTimeLogin());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      const handleNavigation = async () => {
        try {
          if (!isAuthenticated()) {
            const hasVisited = typeof window !== 'undefined' ? localStorage.getItem('hasVisited') : null;

            if (!hasVisited) {
              router.replace('/onboarding');
              return;
            } else {
              router.replace('/login');
              return;
            }
          }

          if (isFirstTime) {
            router.replace('/onboarding-profile');
            return;
          }

          // Authenticated returning user - fetch CSRF and show homepage
          const response = await api.get('/api/v1/csrf');
          console.log("CSRF Token:", response.data.csrfToken);
          setCsrfToken(response.data.csrfToken);
          setIsLoading(false);
        } catch (error) {
          console.error("Error in navigation:", error);
          setIsLoading(false);
        }
      };

      handleNavigation();
    }
  }, [isAuthenticated, isFirstTime, router, isLoading]);

  if (isLoading || !isAuthenticated() || isFirstTime) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Toaster />
      <HomePage />
    </div>
  );
}
