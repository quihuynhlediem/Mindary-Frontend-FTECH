import { useState, useEffect } from "react";
import { MeditationProp } from "@/app/types/meditation";
import { useInView } from "react-intersection-observer";
import axiosInstance from "@/apiConfig";

export function useMeditationData(accessToken: { accessToken: string | null }) {
  const [meditations, setMeditations] = useState<MeditationProp[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  const loadMoreMeditations = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const newData = await axiosInstance.get(`/meditations/load-data?page=${page}&limit=10`, {
            headers: {
                "Authorization": `Bearer ${accessToken.accessToken}`
            },
        });
      console.log(newData.data.length);
      if (newData.data && newData.data.length > 0) {
        setMeditations(prev => [...prev, ...newData.data]);
        setPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading meditations:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load more when scrolled to bottom
  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMoreMeditations();
    }
  }, [inView, hasMore, loading]);

  return {
    meditations,
    loading,
    hasMore,
    setMeditations,
    observerRef: ref
  };
}