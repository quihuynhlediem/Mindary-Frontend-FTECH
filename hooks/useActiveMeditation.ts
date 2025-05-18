import { useState, useRef, useEffect } from "react";
import { MeditationProp } from "@/app/types/meditation";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { MeditationDto } from "@/components/diary/Tips";

export function useActiveMeditation() {
  const [active, setActive] = useState<MeditationProp | boolean | null | MeditationDto>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle Escape key press
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    // // Handle body scroll lock
    // if (active && typeof active === "object") {
    //   document.body.style.overflow = "hidden";
    // } else {
    //   document.body.style.overflow = "auto";
    // }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  const getActiveMeditation = () => {
    return typeof active === "object" ? active : null;
  };

  return {
    active,
    setActive,
    modalRef,
    getActiveMeditation
  };
}