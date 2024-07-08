import { useState } from "react";

export default function useSwipe(minDistance: number = 50) {
  const [touchStart, setTouchStart] = useState(NaN);
  const [touchEnd, setTouchEnd] = useState(NaN);
  const [swipeDistance, setSwipeDistance] = useState(0);

  const handleTouchStart = (e: any) => {
    setTouchEnd(NaN);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: any) => {
    if (!Number.isNaN(touchStart)) {
      setSwipeDistance(e.targetTouches[0].clientX - touchStart);
    }
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd =
    (onSwipeLeft: () => void, onSwipeRight: () => void) => () => {
      if (Number.isNaN(touchStart) || Number.isNaN(touchEnd)) return;
      if (Math.abs(swipeDistance) > minDistance) {
        if (touchEnd > touchStart) {
          onSwipeRight();
        } else {
          onSwipeLeft();
        }
      }
    };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    moveDistance: swipeDistance,
  };
}
