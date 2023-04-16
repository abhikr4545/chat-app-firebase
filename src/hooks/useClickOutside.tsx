import { useRef, useEffect, RefObject } from "react";

const useClickOutside = (handler: () => void): RefObject<HTMLDivElement> => {
  const elementRef = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    const eventHandler = (event: MouseEvent) => {
      if (elementRef.current && !elementRef.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", eventHandler);

    return () => {
      document.removeEventListener("mousedown", eventHandler);
    };
  }, [handler]);

  return elementRef;
};

export default useClickOutside;
