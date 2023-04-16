import { useEffect, useRef } from "react";

const useScrollToBottom = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, []);

  return scrollRef;
};

export default useScrollToBottom;