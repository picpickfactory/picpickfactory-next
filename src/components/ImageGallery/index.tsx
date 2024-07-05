import { useEffect, useState } from 'react';
import { cn } from '@/utilities/tailwindUtils';
export interface IimageGallery {
  imgUrl: string[];
  duration: number;
  fadeInDuration?: number;
  fadeOutDuration?: number;
  isSlideShowActive: boolean;
  styling?: string[];
}

const ImageGallery: React.FC<IimageGallery> = ({ imgUrl, duration, fadeInDuration, fadeOutDuration, isSlideShowActive, styling }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const imageFadeInStyle = cn("opacity-100", fadeInDuration ? `duration-[${fadeInDuration}s]` : "duration-[1s]");
  const imageFadeOutStyle = cn("opacity-0", fadeOutDuration ? `duration-[${fadeOutDuration}s]` : "duration-[1s]");

  useEffect(() => {
    if (isSlideShowActive) {
      setTimeout(()=> {
        if (currentIndex >= imgUrl.length - 1) {
          setCurrentIndex(0)
        } else {
          setCurrentIndex(currentIndex + 1)
        }
        
      }, duration * 1000)
    }
  })

  return (
    <div className={cn("relative z-0 flex", styling)}>
      {imgUrl.map((img, index) => {
        return (
        <img
        key={index}
        className={cn("object-contain h-full w-full absolute", index === currentIndex ? imageFadeInStyle : imageFadeOutStyle)}
        src={img}
        alt="image"
        />)
      })}
    </div>
  );
};

export default ImageGallery;