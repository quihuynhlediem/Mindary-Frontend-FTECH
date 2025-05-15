"use client";

import axiosInstance from "@/apiConfig";
import axios from "axios";

export async function fetchMeditations(page: number) {
    try {
        const response = await axiosInstance.get(`/meditation/load-data?page=${page}&limit=10`);
        console.log("load succes");
        return response.data;
    } catch (error) {
        console.error("Error fetching meditation data:", error);
        return [];  // Return empty array instead of object with meditations property
    }
}