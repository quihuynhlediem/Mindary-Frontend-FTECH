'use server';

import { MeditationDto } from "./types/meditation"
import axiosInstance from "@/apiConfig";

interface Meditations {
    meditations: MeditationDto[];
    nextCursor: string | null;
    error: string | null;
}

export async function fetchMeditations(
    cursor: string | null = null,
    limit: number = 10,
): Promise<Meditations> {
    try {
        const response = await axiosInstance.get<{
            meditations: MeditationDto[];
            nextCursor: string | null;
        }>("/meditations/", {
            params: { cursor, limit }
        });

        const { meditations, nextCursor } = response.data;

        return { meditations, nextCursor, error: null };
    } catch (err) {
        console.error("Error fetching meditation data:", err);

        return {
            meditations: [],
            nextCursor: null,
            error: "Failed to fetch meditation data.",
        };
    }
}