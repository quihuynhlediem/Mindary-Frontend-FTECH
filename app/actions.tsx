"use client";

import axiosInstance from "@/apiConfig";

export async function fetchMeditations(page: number, accessToken: { accessToken: string | null }) {
    try {
        // console.log("page", typeof page)
        const pageNumber = page.toString();
        console.log("accessToken", accessToken.accessToken);
        const response = await axiosInstance.get(`/meditations/load-data?page=${pageNumber}&limit=10`, {
            headers: {
                "Authorization": `Bearer ${accessToken.accessToken}`
            },
        });
        console.log("load success", response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching meditation data:", error);
        return [];  // Return empty array instead of object with meditations property
    }
}