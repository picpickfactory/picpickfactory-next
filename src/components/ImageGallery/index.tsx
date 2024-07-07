import { use, useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/tailwind';
import useSwipe from '@/hooks/useSwipe';
import useMouseDrag from '@/hooks/useMouseDrag';
import { Box, Modal, Typography } from '@mui/material';
export interface IimageGallery {
  imgUrl: string[];
  duration: number;
  autoSlideShow: boolean;
  fadeInDuration?: string;
  fadeOutDuration?: string;
  styling?: string[];
  allowSwipe?: boolean;
  allowDrag?: boolean;
  onClick?: () => void;
}

const ImageGallery: React.FC<IimageGallery> = ({ imgUrl, duration, autoSlideShow, fadeInDuration, fadeOutDuration, styling, allowDrag = true, allowSwipe = true, onClick }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSlideShowActive, setIsSlideShowActive] = useState<boolean>(autoSlideShow);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isHolding, setIsHolding] = useState(false);
  const {handleTouchStart, handleTouchMove, handleTouchEnd} = useSwipe(50);
  const {handleDragStart, handleDragMove, handleDragEnd} = useMouseDrag(50);
  const slideShowTimeRef = useRef<any>(null);
  const mouseClickTimeRef = useRef<any>(null);
  const imageFadeInStyle = cn("opacity-100", fadeInDuration ?? "duration-[3s]");
  const imageFadeOutStyle = cn("opacity-0", fadeOutDuration ?? "duration-[5s]");

  useEffect(() => {
    if (isSlideShowActive) {
      slideShowTimeRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex >= imgUrl.length - 1 ? 0 : prevIndex + 1));
      }, duration * 1000);
    }

    return () => {
      if (slideShowTimeRef.current) {
        clearTimeout(slideShowTimeRef.current);
      }
    };
  }, [isSlideShowActive, currentIndex, duration, imgUrl.length]);

  const startSlideShow = () => {
    setIsSlideShowActive(true);
  };

  const pauseSlideShow = () => {
    setIsSlideShowActive(false);
    if (slideShowTimeRef.current) {
      clearTimeout(slideShowTimeRef.current);
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
    if (!allowSwipe) return
    handleTouchStart(e)
    pauseSlideShow()
  }

  const onTouchEnd = () => {
    if (!allowSwipe) return
    handleTouchEnd(handleSwipeLeft, handleSwipeRight)()
    startSlideShow()
  }

  const onDragStart = (e: any) => {
    if (!allowDrag) return
    handleDragStart(e)
    pauseSlideShow()
  }

  const onDragEnd = () => {
    if (!allowDrag) return
    handleDragEnd(handleSwipeLeft, handleSwipeRight)()
    startSlideShow()
  }

  const handleMouseDown = (e: any) => {
    onDragStart(e);
    setIsHolding(false);
    mouseClickTimeRef.current = window.setTimeout(() => {
      setIsHolding(true);
    }, 200);
  };

  const handleMouseUp = () => {
    onDragEnd();
    if (mouseClickTimeRef.current) {
      clearTimeout(mouseClickTimeRef.current);
    }
  };

  const handleClick = () => {
    if (!isHolding) {
      setIsSlideShowActive(false);
      setIsModalOpen(true);
    }
  };

  const handleOnModalClose = () => {
    setIsModalOpen(false);
    setIsSlideShowActive(true);
  }

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={handleOnModalClose}
      >
        <img className="object-contain m-auto max-h-[90%] max-w-[90%] outline-none" src={imgUrl[currentIndex]} alt="image"/>
      </Modal>
      <Box className={cn("relative z-0 flex", styling)}
        onTouchStart={onTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleDragMove}
        onMouseUp={handleMouseUp}
        onClick={onClick ?? handleClick}
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
      </Box>
    </>

  );
};

export default ImageGallery;