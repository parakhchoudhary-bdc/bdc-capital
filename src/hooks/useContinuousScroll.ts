import { useEffect, useRef } from "react";

const useContinuousScroll = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const scrollPosRef = useRef(0);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const getSpeed = () => {
      const width = window.innerWidth;
      if (width < 640) return 1.2;
      if (width < 1024) return 0.8;
      return 0.6;
    };

    let currentSpeed = getSpeed();

    const handleResize = () => {
      currentSpeed = getSpeed();
    };

    window.addEventListener("resize", handleResize);

    const smoothScroll = () => {
      scrollPosRef.current += currentSpeed;

      const maxScroll =
        scrollContainer.scrollWidth - scrollContainer.clientWidth;

      if (scrollPosRef.current >= maxScroll) {
        scrollPosRef.current = 0;
      }

      scrollContainer.scrollLeft = scrollPosRef.current;
      animationFrameIdRef.current = requestAnimationFrame(smoothScroll);
    };

    animationFrameIdRef.current = requestAnimationFrame(smoothScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, []);

  return scrollRef;
};

export default useContinuousScroll;