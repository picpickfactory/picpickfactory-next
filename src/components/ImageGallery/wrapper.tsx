import { ReactElement, useEffect, useRef, useState } from "react";
import useSwipe from "@/hooks/useSwipe";
import useMouseDrag from "@/hooks/useMouseDrag";
import { Modal } from "@mui/material";
import { Image } from "@/types/image";
import "../../styles/imageGallery.css";

export interface ImageGalleryOptions {
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
  imageSkipLength?: number;
}

export interface ImageGalleryChildProps<T> {
  onTouchStart: (e: any) => void;
  onTouchMove: (e: any) => void;
  onTouchEnd: () => void;
  onMouseDown: (e: any) => void;
  onMouseMove: (e: any) => void;
  onMouseUp: () => void;
  currentIndex: number;
  prevIndex: number;
  images: Image[];
  handleClick: (index: number) => () => void;
  extraProps: T;
}

export interface ImageGalleryWrapperProps<T> {
  children: (props: ImageGalleryChildProps<T>) => JSX.Element;
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
  imageSkipLength?: number;
  extraProps: T;
}

const ImageGalleryWrapper = <T,>({
  children,
  images,
  duration,
  autoSlideShow,
  allowDrag = true,
  allowSwipe = true,
  onClick,
  extraProps,
  imageSkipLength = 1,
}: ImageGalleryWrapperProps<T>): ReactElement => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [prevIndex, setPrevIndex] = useState<number>(0);
  const [isSlideShowActive, setIsSlideShowActive] =
    useState<boolean>(autoSlideShow);
  const [showImage, setShowImage] = useState<Image | null>(null);
  const [isHolding, setIsHolding] = useState(false);
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useSwipe(50);
  const { handleDragStart, handleDragMove, handleDragEnd } = useMouseDrag(50);
  const slideShowTimeRef = useRef<any>(null);
  const mouseClickTimeRef = useRef<any>(null);

  useEffect(() => {
    if (isSlideShowActive) {
      slideShowTimeRef.current = setTimeout(() => {
        setPrevIndex(currentIndex);
        setCurrentIndex((index) => {
          return (index + imageSkipLength) % images.length;
        });
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
    setPrevIndex(currentIndex);
    setCurrentIndex((index) => {
      return (index + imageSkipLength) % images.length;
    });
  };

  const handleSwipeRight = () => {
    setPrevIndex(currentIndex);
    setCurrentIndex((index) => {
      return (index - imageSkipLength + images.length) % images.length;
    });
  };

  const onTouchStart = (e: any) => {
    mouseClickTimeRef.current = window.setTimeout(() => {
      setIsHolding(true);
    }, 200);
    if (!allowSwipe) return;
    handleTouchStart(e);
    pauseSlideShow();
  };

  const onTouchEnd = () => {
    if (!allowSwipe) return;
    handleTouchEnd(handleSwipeLeft, handleSwipeRight)();
    startSlideShow();
  };

  const onDragStart = (e: any) => {
    if (!allowDrag) return;
    handleDragStart(e);
    pauseSlideShow();
  };

  const onDragEnd = () => {
    if (!allowDrag) return;
    handleDragEnd(handleSwipeLeft, handleSwipeRight)();
    startSlideShow();
  };

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
    console.log("onClick");
    if (isHolding || (index != currentIndex && index != prevIndex)) return;
    setIsSlideShowActive(false);
    onClick ? onClick(images[index]) : setShowImage(images[index]);
  };

  const handleOnModalClose = () => {
    setShowImage(null);
    setIsSlideShowActive(true);
  };

  return (
    <>
      <Modal
        className="flex justify-center items-center"
        open={showImage !== null}
        onClose={handleOnModalClose}
      >
        <img
          className="object-contain max-h-[90%] max-w-[90%] outline-none"
          src={showImage?.url}
          alt="image"
          draggable={false}
        />
      </Modal>
      {children({
        onTouchStart: onTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: onTouchEnd,
        onMouseDown: handleMouseDown,
        onMouseMove: handleDragMove,
        onMouseUp: handleMouseUp,
        currentIndex: currentIndex,
        prevIndex: prevIndex,
        images: images,
        handleClick: handleClick,
        extraProps: extraProps,
      })}
    </>
  );
};

export default ImageGalleryWrapper;
