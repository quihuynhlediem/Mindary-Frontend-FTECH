import { useState, useEffect } from "react";
import { MeditationProp } from "@/app/types/meditation";
import { fetchMeditations } from "@/app/actions";
import { useInView } from "react-intersection-observer";
import { set } from "date-fns";

export function useMeditationData() {
  const [meditations, setMeditations] = useState<MeditationProp[]>([]);
  const [page, setPage] = useState(2);
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
      const newData = await fetchMeditations(page);

      if (newData && newData.length > 0) {
        setMeditations(prev => [...prev, ...newData]);
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

  // Initial load
  useEffect(() => {
    loadMoreMeditations();
  }, []);

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