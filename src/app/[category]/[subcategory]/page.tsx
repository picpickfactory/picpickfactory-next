"use client";

import { SingleImageGallery } from "@/components/ImageGallery";
import { cn } from "@/utils/tailwind";
import { Box, Typography } from "@mui/material";

import { personal , commissioned } from "@/app/data";
import { useEffect, useState } from "react";

import { Image } from "@/types/image";
import { Data } from "@/types/data";

export default function Page({
  params,
}: {
  params: { category: string; subcategory: string };
}) {


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string | undefined>("");
  const [listImageUrl, setListImageUrl] = useState<Image[]>([]);

  console.log(params.category);
  console.log(params.subcategory);

  useEffect(() => {

    if(params.category === 'personal'){

      personal.forEach((item: Data) => {
        console.log(item);
        if (item.path.replace("/","") === params.subcategory) {
          
          setTitle(item.title);
          setDescription(item.description);

          const image : Image[] = item.url.map((url : string) => {
            return {url : url}
          })
          setListImageUrl(image);
        
        }
      });

    }else{

      commissioned.forEach((item: Data) => {
        console.log("path : " + item.path);
        if (item.path.replace("/","") === params.subcategory) {
          setTitle(item.title);
          setDescription(item.description);
          const image : Image[] = item.url.map((url : string) => {
            return {url : url}
          })
          setListImageUrl(image);
        }
      });

    }
  },[]);
  
  const titleStyle = cn(
    "sm:text-5xl mx-[5%]",
    description
      ? "text-3xl mt-[60px] text-center"
      : "text-xl mt-10 mr-10 text-right"
  );
  return (
    <Box className="mt-[20px]">
      <SingleImageGallery
        images={listImageUrl}
        duration={4}
        autoSlideShow={true}
        titleBoxStyling={[]}
        titleTextStyling={[]}
        imageStyling={[
          "object-contain",
          "h-auto",
          "w-auto",
          "max-h-full",
          "max-w-full",
          "left-[50%]",
          "tranform translate-x-[-50%]",
        ]}
        imageBoxStyling={["h-[45vh]", "w-full"]}
      />
      <Typography className={titleStyle}>{title}</Typography>
      {description && (
        <Typography className="text-center ml-[10%] mr-[5%] mt-[20px] mb-[40px]">
          {description}
        </Typography>
      )}
    </Box>
  );
}
