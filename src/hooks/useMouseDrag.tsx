import { useState } from "react"

export default function useMouseDrag(minDistance: number = 50) {
    const [startX, setStartX] = useState(NaN);
    const [endX, setEndX] = useState(NaN);
    const [mouseMoveDistance, setMouseMoveDistance] = useState(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        setEndX(NaN);
        setStartX(e.clientX);
      };
    
      const handleMouseMove = (e: React.MouseEvent) => {
        if (!Number.isNaN(startX)) {
            setMouseMoveDistance(e.clientX - startX);
        }
        setEndX(e.clientX);
      };
    
      const handleMouseUp = (onSwipeLeft: () => void, onSwipeRight: () => void) => () => {
        if (Number.isNaN(startX) || Number.isNaN(endX)) return;
        if (Math.abs(mouseMoveDistance) > minDistance) {
          if (endX > startX) {
            onSwipeRight();
          } else {
            onSwipeLeft();
          }
        }
      };

      return {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        moveDistance: mouseMoveDistance
      }
}