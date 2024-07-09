"use client";

import { SingleImageGallery } from "@/components/ImageGallery";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Image } from "@/types/image";
import {
  isSizeGreaterThan,
  isSizeGreaterThanOrEqualTo,
  isSizeLessThan,
  isSizeLessThanOrEqualTo,
} from "@/utils/screenSize";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import {bbk} from '@/app/data';

interface HomeImageList {
  title: string,
  path: string,
  imgUrl: string,
}

export default function Home() {
  const router = useRouter();
  const screenSize = useScreenSize();

  useEffect(() => {
    console.log(screenSize);
  }, [screenSize]);

  const onClick = (image: Image) => {
    router.push(image.path ? image.path : "/");
  };

  return (
    <div>
      {isSizeLessThanOrEqualTo(screenSize, "sm") ? (
        <SingleImageGallery
          images={bbk}
          duration={6}
          autoSlideShow={true}
          onClick={onClick}
          imageBoxStyling={["h-[60vh]", "w-full", "mt-[15%]"]}
          imageStyling={["object-cover", "h-full", "w-full"]}
          titleBoxStyling={["mr-[5%] h-[40px] mt-4"]}
          titleTextStyling={["text-2xl right-0"]}
        />
      ) : (
        <SingleImageGallery
          images={bbk}
          duration={6}
          autoSlideShow={true}
          onClick={onClick}
          imageBoxStyling={["h-[60vh]", "w-full", "mt-[15%]"]}
          imageStyling={["object-cover", "h-full", "w-full"]}
          titleBoxStyling={["mr-[5%] h-[40px] mt-4"]}
          titleTextStyling={["text-2xl right-0"]}
        />
      )}
    </div>
  );
}
