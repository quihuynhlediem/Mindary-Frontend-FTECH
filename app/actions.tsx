"use client";

import axiosInstance from "@/apiConfig";
import axios from "axios";

export async function fetchMeditations(page: number) {
    try {
        const response = await axios.get(`http://localhost:8084/api/v1/meditation/load-data?page=${page}&limit=10`);
        console.log("load succes");
        return response.data;
    } catch (error) {
        console.error("Error fetching meditation data:", error);
        return [];  // Return empty array instead of object with meditations property
    }
}