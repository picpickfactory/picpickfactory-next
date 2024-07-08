import { useState } from "react";

export default function useMouseDrag(minDistance: number = 50) {
  const [startX, setStartX] = useState(NaN);
  const [endX, setEndX] = useState(NaN);
  const [dragDistance, setDragDistance] = useState(0);

  const handleDragStart = (e: React.MouseEvent) => {
    setEndX(NaN);
    setStartX(e.clientX);
  };

  const handleDragMove = (e: React.MouseEvent) => {
    if (!Number.isNaN(startX)) {
      setDragDistance(e.clientX - startX);
    }
    setEndX(e.clientX);
  };

  const handleDragEnd =
    (onSwipeLeft: () => void, onSwipeRight: () => void) => () => {
      if (Number.isNaN(startX) || Number.isNaN(endX)) return;
      if (Math.abs(dragDistance) > minDistance) {
        if (endX > startX) {
          onSwipeRight();
        } else {
          onSwipeLeft();
        }
      }
    };

  return {
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    moveDistance: dragDistance,
  };
}
