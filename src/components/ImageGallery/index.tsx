import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/tailwind';
import useSwipe from '@/hooks/useSwipe';
import useMouseDrag from '@/hooks/useMouseDrag';
import { Box, Modal, Typography } from '@mui/material';
import { Image } from '@/types/image';
export interface IimageGallery {
  images: Image[];
  duration: number;
  autoSlideShow: boolean;
  fadeInDuration?: string;
  fadeOutDuration?: string;
  imageBoxStyling?: string[];
  imageStyling?: string[];
  titleBoxStyling?: string[];
  titleTextStyling?: string[];
  allowSwipe?: boolean;
  allowDrag?: boolean;
  onClick?: (image: Image) => void;
}

const ImageGallery: React.FC<IimageGallery> = ({ images, duration, autoSlideShow, fadeInDuration, fadeOutDuration, imageBoxStyling, imageStyling, titleBoxStyling, titleTextStyling, allowDrag = true, allowSwipe = true, onClick }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSlideShowActive, setIsSlideShowActive] = useState<boolean>(autoSlideShow);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isHolding, setIsHolding] = useState(false);
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe(50);
  const { handleDragStart, handleDragMove, handleDragEnd } = useMouseDrag(50);
  const slideShowTimeRef = useRef<any>(null);
  const mouseClickTimeRef = useRef<any>(null);
  const fadeInStyle = cn("opacity-100", fadeInDuration ?? "duration-[3s]");
  const fadeOutStyle = cn("opacity-0", fadeOutDuration ?? "duration-[5s]");

  useEffect(() => {
    if (isSlideShowActive) {
      slideShowTimeRef.current = setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex >= images.length - 1 ? 0 : prevIndex + 1));
      }, duration * 1000);
    }

    return () => {
      if (slideShowTimeRef.current) {
        clearTimeout(slideShowTimeRef.current);
      }
    };
  }, [isSlideShowActive, currentIndex, duration, images.length]);

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
    if (currentIndex >= images.length - 1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleSwipeRight = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(images.length - 1)
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
      const currentImage = images.find((image) => images.indexOf(image) === currentIndex);
      if (currentImage && onClick) {
        onClick(currentImage);
      } else {
        setIsModalOpen(true);
      }

    }
  };

  const handleOnModalClose = () => {
    setIsModalOpen(false);
    setIsSlideShowActive(true);
  }

  return (
    <>
      <Modal
        className='flex justify-center items-center'
        open={isModalOpen}
        onClose={handleOnModalClose}
      >
        <img className="object-contain max-h-[90%] max-w-[90%] outline-none" src={images[currentIndex].url} alt="image" />
      </Modal>
      <Box className={cn("relative z-0 flex", imageBoxStyling)}
        onTouchStart={onTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleDragMove}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
      >
        {images.map((img, index) => {
          return (
            <>
              <img
                key={index}
                className={cn("absolute", imageStyling, index === currentIndex ? fadeInStyle : fadeOutStyle)}
                src={img.url}
                alt="image"
                draggable={false}
              />

            </>
          )
        })}
      </Box>
      <Box className={cn("relative z-0 flex", titleBoxStyling)}>
        {images.map((img, index) => {
          return (
            <>
              {img.title && <Typography key={index} className={cn("absolute h-full w-full text-right", titleTextStyling, index === currentIndex ? fadeInStyle : fadeOutStyle)}>{img.title}</Typography>}
            </>
          )
        })}
      </Box>


    </>

  );
};

export default ImageGallery;