import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/tailwind';
import useSwipe from '@/hooks/useSwipe';
import useMouseDrag from '@/hooks/useMouseDrag';
import { Box, Modal, Typography } from '@mui/material';
import { Image } from '@/types/image';
import '../../styles/imageGallery.css';
export interface IimageGallery {
  images: Image[];
  duration: number;
  autoSlideShow: boolean;
  imageBoxStyling?: string[];
  imageStyling?: string[];
  titleBoxStyling?: string[];
  titleTextStyling?: string[];
  allowSwipe?: boolean;
  allowDrag?: boolean;
  onClick?: (image: Image) => void;
}

const ImageGallery: React.FC<IimageGallery> = ({ images, duration, autoSlideShow, imageBoxStyling, imageStyling, titleBoxStyling, titleTextStyling, allowDrag = true, allowSwipe = true, onClick }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [prevIndex, setPrevIndex] = useState<number>(0);
  const [isSlideShowActive, setIsSlideShowActive] = useState<boolean>(autoSlideShow);
  const [showImage, setShowImage] = useState<Image | null>(null);
  const [isHolding, setIsHolding] = useState(false);
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe(50);
  const { handleDragStart, handleDragMove, handleDragEnd } = useMouseDrag(50);
  const slideShowTimeRef = useRef<any>(null);
  const mouseClickTimeRef = useRef<any>(null);
  const fadeInStyle = cn("opacity-100 z-20");
  const fadeOutStyle = cn("opacity-0 z-10");

  useEffect(() => {
    if (isSlideShowActive) {
      slideShowTimeRef.current = setTimeout(() => {
        setPrevIndex(currentIndex);
        setCurrentIndex((index) => (index >= images.length - 1 ? 0 : index + 1));
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
    setPrevIndex(currentIndex)
    if (currentIndex >= images.length - 1) {
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleSwipeRight = () => {
    setPrevIndex(currentIndex)
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

  const handleClick = (index: number) => () => {
    if (isHolding || (index != currentIndex && index != prevIndex)) return;
    setIsSlideShowActive(false);
    onClick ? onClick(images[index]) : setShowImage(images[index]);
  };

  const handleOnModalClose = () => {
    setShowImage(null);
    setIsSlideShowActive(true);
  }

  return (
    <>
      <Modal
        className='flex justify-center items-center'
        open={showImage !== null}
        onClose={handleOnModalClose}
      >
        <img className="object-contain max-h-[90%] max-w-[90%] outline-none" src={showImage?.url} alt="image" />
      </Modal>
      <Box className={cn("relative z-0 flex", imageBoxStyling)}
        onTouchStart={onTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleDragMove}
        onMouseUp={handleMouseUp}
      >
        {images.map((img, index) => {
          return (
            <img
              key={index}
              className={cn("absolute", imageStyling)}
              src={img.url}
              alt="image"
              draggable={false}
              id={index === currentIndex ? 'fade-in' : 'fade-out'}
              onClick={handleClick(index)}
            />
          )
        })}
      </Box>
      <Box className={cn("relative z-0 flex", titleBoxStyling)}>
        {images.map((img, index) => {
          return (
            <Box key={index}>
              {img.title &&
                <Typography
                  className={cn("absolute text-right", titleTextStyling)}
                  id={index === currentIndex ? 'fade-in' : 'fade-out'}
                >
                  {img.title}
                </Typography>}
            </Box>
          )
        })}
      </Box>


    </>

  );
};

export default ImageGallery;