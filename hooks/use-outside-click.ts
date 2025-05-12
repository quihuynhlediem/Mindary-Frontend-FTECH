import React, { useEffect } from "react";

export const useOutsideClick = (
  ref: React.RefObject<HTMLElement | null>,
  ...callbacks: Function[]
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      callbacks.forEach(callback => callback(event));
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, ...callbacks]);
};
