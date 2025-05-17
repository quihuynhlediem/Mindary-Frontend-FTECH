import { useState, useRef, useEffect } from "react";
import { MeditationProp } from "@/app/types/meditation";
import Hls from "hls.js";

export function useMeditationPlayer(active: MeditationProp | null | boolean) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const videoRef = useRef<HTMLAudioElement>(null);

  // HLS.js setup
  useEffect(() => {
    if (!active || typeof active !== "object" || !videoRef.current) return;

    const hls = new Hls({ debug: true });

    if (Hls.isSupported()) {
      hls.loadSource(active.media_url);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.ERROR, (err) => {
        console.log(err);
      });
    } else {
      console.log("HLS not supported");
    }

    return () => {
      hls.destroy();
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };
  }, [active]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(isFinite(progress) ? progress : 0);
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (value: number) => {
    if (videoRef.current && videoRef.current.duration) {
      const time = (value / 100) * videoRef.current.duration;
      if (isFinite(time)) {
        videoRef.current.currentTime = time;
        setProgress(value);
      }
    }
  };

  const handleShuffle = () => setIsShuffle(!isShuffle);
  const handleRepeat = () => setIsRepeat(!isRepeat);

  return {
    videoRef,
    isPlaying,
    progress,
    currentTime,
    duration,
    isShuffle,
    isRepeat,
    togglePlay,
    handleTimeUpdate,
    handleSeek,
    handleShuffle,
    handleRepeat,
    resetDuration: () => setDuration(0)
  };
}