"use client";

import { SingleImageGallery } from "@/components/ImageGallery";
import { useScreenSize } from "@/hooks/useScreenSize";
import {
  isSizeGreaterThan,
  isSizeGreaterThanOrEqualTo,
  isSizeLessThan,
  isSizeLessThanOrEqualTo,
} from "@/utils/screenSize";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {commissioned , personal} from '@/app/data';

import { Data } from "@/types/data";
import { Image } from "@/types/image";

export default function Home() {
  const router = useRouter();
  const screenSize = useScreenSize();

  const [imgList , setImgList] = useState<Image[]>([]);

  useEffect(() => {
    const list_personal : Image[] = personal.map((item : Data) => {

      return {title : item.title,
              path : item.path,
              url : item.url[0]
             }

    })
    const list_commissioned : Image[] = commissioned.map((item : Data) => {

      return {title : item.title,
              path : item.path,
              url : item.url[0]
             }

    })

    setImgList(list_personal.concat(list_commissioned));

    console.log(screenSize);

  }, [screenSize]);

  const onClick = (image: Image) => {
    router.push(image.path ? `/${image.type}/${image.path}` : "/");
  };

  return (
    <div>
      {isSizeLessThanOrEqualTo(screenSize, "sm") ? (
        <SingleImageGallery
          images={imgList}
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
          images={imgList}
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
