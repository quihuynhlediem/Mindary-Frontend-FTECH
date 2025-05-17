"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/hooks/useAuthStore";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
    ArrowLeft,
    LogOut,
    UserCog,
    ChevronRight,
    Settings,
    UserCircle2,
} from "lucide-react";

export default function ProfilePage() {
    const router = useRouter();
    const { toast } = useToast();
    const { username, clearAuthTokens, isAuthenticated } = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (!isAuthenticated()) {
                router.replace("/login");
                toast({
                    title: "Unauthorized",
                    description: "Please log in to view your profile.",
                    variant: "destructive",
                });
            } else {
                setIsLoading(false);
            }
        }
    }, [isAuthenticated, router, toast]);

    const handleLogout = () => {
        clearAuthTokens();
        if (typeof window !== "undefined") {
            localStorage.clear();
        }
        toast({
            title: "Logged Out",
            description: "You have been successfully logged out.",
        });
        router.replace("/login");
    };

    const handleUpdatePreferences = () => {
        router.push("/onboarding-profile");
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-50">
                <p className="text-gray-700">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white shadow-sm">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="w-6 h-6" style={{ color: "#7EC8D3" }} />
                </Button>
                <h1 className="text-xl font-semibold" style={{ color: "#7EC8D3" }}>
                    Account
                </h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <div className="flex items-center space-x-4">
                        <div
                            className="flex items-center justify-center w-16 h-16 rounded-full"
                            style={{ backgroundColor: "#7EC8D3" }}
                        >
                            <UserCircle2 className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">
                                {username || "User"}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <button
                        onClick={handleUpdatePreferences}
                        className="flex items-center justify-between w-full p-4 text-left bg-white rounded-lg shadow hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center space-x-3">
                            <Settings className="w-6 h-6" style={{ color: "#7EC8D3" }} />
                            <span className="text-gray-700">Update Preferences</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-between w-full p-4 text-left bg-white rounded-lg shadow hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center space-x-3">
                            <LogOut className="w-6 h-6 text-red-500" />
                            <span className="text-red-500">Logout</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                </div>
            </main>
        </div>
    );
} 