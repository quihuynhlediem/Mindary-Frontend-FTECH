"use client";
import { Card, CardBody, CardFooter, CardHeader, Image } from "@heroui/react";
import { MeditationDto } from "../types/meditation";
import { fetchMeditations } from "../actions";
import React, { useEffect, useState, useRef } from "react";
import { set } from "date-fns";

interface InfiniteSCrollProps {
    initialMeditations: MeditationDto[];
    initialCursor: string | null;
    limit: number;
    renderMeditation: (meditation: MeditationDto) => React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteSCrollProps> = ({
    initialMeditations,
    initialCursor,
    limit,
    renderMeditation
}) => {
    const [meditations, setMeditations] = useState<MeditationDto[]>(initialMeditations);
    const [nextCursor, setNextCursor] = useState<string | null>(initialCursor);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState<boolean>(initialCursor !== null);
    const [error, setError] = useState<string | null>(null);

    const observerTarget = useRef<HTMLDivElement>(null);

    const loadMore = async () => {
        if (loading || !hasMore) return;
        setLoading(true);

        try {
            const response = await fetchMeditations(nextCursor, limit);

            if (response.error) {
                setError(response.error);
            } else if (response.meditations && response.meditations.length > 0) {
                setMeditations((prev) => [...prev, ...response.meditations]);
                setNextCursor(response.nextCursor);

                if (!nextCursor || response.meditations.length < limit) {
                    setHasMore(false);
                }
            } else {
                setHasMore(false);
            }
        } catch (error) {
            setError("Failed to load more meditations.");
            //setHasMore(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!observerTarget.current || !hasMore) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    loadMore();
                }
            },
            // { threshold: 0.1 }
            { rootMargin: '200px' }
        );

        observer.observe(observerTarget.current);

        return () => {
            observer.disconnect();
        };
    }, [hasMore, loading, nextCursor]);

    return (
        <div className="infinite-scroll-container">
            {error && <div className="text-red-500 text-center my-4">{error}</div>}

            {meditations.map(m => renderMeditation(m))}

            <div
                ref={observerTarget}
                className="trigger h-20 flex justify-center"
            >
                {loading && <div className="spinner animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>}
            </div>

            {!hasMore && meditations.length > 0 && (
                <p className="text-center text-gray-500 my-4">You've reached the end</p>
            )}
        </div>
    );
};

const MeditationCard: React.FC<{ meditation: MeditationDto }> = ({ meditation }) => {
    return (
        <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{meditation.author}</p>
                <small className="text-default-500">{meditation.media_length}</small>
                <h4 className="font-bold text-large">{meditation.title}</h4>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl"
                    src={meditation.picture_url}
                    width={270}
                />
            </CardBody>
        </Card>
    )
}

export default async function HomePage({
    searchParams,
}: {
    searchParams: { cursor?: string; limit?: string };
}) {
    // 1. Parse query params for cursor and limit
    const limit = parseInt(searchParams.limit || String(10));
    const initialCursor = searchParams.cursor ?? null;

    // 2. Fetch initial batch with cursor-based API
    const {
        meditations: initialMeditations,
        nextCursor,
        error,
    } = await fetchMeditations(initialCursor, limit);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Meditations</h1>

            {/* Error state */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Infinite scroll list */}
            {!error && (
                <InfiniteScroll
                    initialMeditations={initialMeditations}
                    initialCursor={nextCursor}
                    limit={limit}
                    renderMeditation={(meditation) => (
                        <div key={meditation.id} className="mb-6">
                            <MeditationCard meditation={meditation} />
                        </div>
                    )}
                />
            )}
        </div>
    );
}