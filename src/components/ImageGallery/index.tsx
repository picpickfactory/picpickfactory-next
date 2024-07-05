import { use, useEffect, useRef, useState } from 'react';
import { cn } from '@/utilities/tailwindUtils';
import useSwipe from '@/hooks/useSwipe';
import useMouseDrag from '@/hooks/useMouseDrag';
export interface IimageGallery {
  imgUrl: string[];
  duration: number;
  autoSlideShow: boolean;
  fadeInDuration?: string;
  fadeOutDuration?: string;
  styling?: string[];
}

const ImageGallery: React.FC<IimageGallery> = ({ imgUrl, duration, autoSlideShow, fadeInDuration, fadeOutDuration, styling }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSlideShowActive, setIsSlideShowActive] = useState<boolean>(autoSlideShow);
  const {handleTouchStart, handleTouchMove, handleTouchEnd, moveDistance} = useSwipe(50);
  const {handleMouseDown, handleMouseMove, handleMouseUp} = useMouseDrag(50);
  const timerRef = useRef<any>(null);
  const imageFadeInStyle = cn("opacity-100", fadeInDuration ?? "duration-[3s]");
  const imageFadeOutStyle = cn("opacity-0", fadeOutDuration ?? "duration-[5s]");

  useEffect(() => {
    if (isSlideShowActive) {
      timerRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex >= imgUrl.length - 1 ? 0 : prevIndex + 1));
      }, duration * 1000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isSlideShowActive, currentIndex, duration, imgUrl.length]);

  const startSlideShow = () => {
    setIsSlideShowActive(true);
  };

  const pauseSlideShow = () => {
    setIsSlideShowActive(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const handleSwipeLeft = () => {
    if (currentIndex >= imgUrl.length - 1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleSwipeRight = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(imgUrl.length - 1)
    } else {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const onTouchStart = (e: any) => {
    handleTouchStart(e)
    pauseSlideShow()
  }

  const onTouchEnd = () => {
    handleTouchEnd(handleSwipeLeft, handleSwipeRight)()
    startSlideShow()
  }

  const onMouseDown = (e: any) => {
    handleMouseDown(e)
    pauseSlideShow()
  }

  const onMouseUp = () => {
    handleMouseUp(handleSwipeLeft, handleSwipeRight)()
    startSlideShow()
  }

  return (
    <div className={cn("relative z-0 flex", styling)}
        onTouchStart={onTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={onMouseUp}
    >
      {imgUrl.map((img, index) => {
        return (
        <img
        key={index}
        className={cn("object-contain h-full w-full absolute", index === currentIndex ? imageFadeInStyle : imageFadeOutStyle)}
        src={img}
        alt="image"
        draggable={false}
        />)
      })}
    </div>
  );
};

export default ImageGallery;