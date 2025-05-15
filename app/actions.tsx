"use client";

import axiosInstance from "@/apiConfig";
import axios from "axios";
import { headers } from "next/headers";

export async function fetchMeditations(page: number) {
    try {
        const response = await axios.get(`http://localhost:8080/api/v1/meditations/load-data?page=${page}&limit=10`,
            {
                headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9DVVNUT01FUiIsInVzZXJJZCI6IjdlNmJhODU3LTI2ODYtNDM0Yi1iNzJhLWJjNThmODM4NjA1YyIsInN1YiI6InRhbm5tNDNAZ21haWwuY29tIiwiaWF0IjoxNzQ3MzMyNzcyLCJleHAiOjE3NDc0MTkxNzJ9.iooEOuUiyk5NpQWhRUSrtkDi2Itj3E8TLE2iyY6TP2k` },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching meditation data:", error);
        return [];  // Return empty array instead of object with meditations property
    }
}