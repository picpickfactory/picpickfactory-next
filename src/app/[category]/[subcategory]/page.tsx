"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import { personal, commissioned } from "@/app/data";
import { Image } from "@/types/image";
import { Data } from "@/types/data";
import { SingleImageGallery } from "@/components/ImageGallery";
import { cn } from "@/utils/tailwind";

export default function Page() {
  const params = useParams<{ category: string; subcategory: string }>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string | undefined>("");
  const [listImageUrl, setListImageUrl] = useState<Image[]>([]);

  useEffect(() => {
    if (!params?.category || !params?.subcategory) return;

    const source = params.category === "personal" ? personal : commissioned;

    const found = source.find(
      (item: Data) => item.path.replace("/", "") === params.subcategory
    );

    if (!found) {
      setTitle("");
      setDescription("");
      setListImageUrl([]);
      return;
    }

    setTitle(found.title);
    setDescription(found.description);

    setListImageUrl(found.url.map((url: string) => ({ url })));
  }, [params?.category, params?.subcategory]);

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
