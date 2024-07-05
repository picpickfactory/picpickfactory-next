import { useEffect, useState } from 'react';
import { cn } from '@/utilities/tailwindUtils';
export interface IimageGallery {
  imgUrl: string[];
  duration: number;
  transitionDuration?: string;
  isSlideShowActive: boolean;
  styling?: string[];
}

const ImageGallery: React.FC<IimageGallery> = ({ imgUrl, duration, transitionDuration, isSlideShowActive, styling }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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
        className={cn("object-contain h-full w-full absolute", transitionDuration ? transitionDuration : "duration-[5s]", index === currentIndex ? "opacity-100" : "opacity-0")}
        src={img}
        alt="image"
        />)
      })}
    </div>
  );
};

export default ImageGallery;