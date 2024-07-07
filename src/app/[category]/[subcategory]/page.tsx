'use client'

import ImageGallery from "@/components/ImageGallery"
import { cn } from "@/utils/tailwind"
import { Box, Typography } from "@mui/material"

const bbkNoTitle = [
  { title: "", url: "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/BKKCIRCUS01.jpg?alt=media&token=1bca2fbf-2902-4761-945f-167dc12200cd" },
  { title: "", url: "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/BKKCIRCUS02.jpg?alt=media&token=4a06006c-aee9-4218-99e4-0ce38a6e3a42" },
  { title: "", url: "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/BKKCIRCUSLONGWAY.jpg?alt=media&token=d68d460f-9480-43cc-85c6-11c44afcb447" },
  { title: "", url: "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/LB.jpg?alt=media&token=b41e836a-cdc4-4041-ad8e-091a0ee70d67" },
  { title: "", url: "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/Red-004.jpg?alt=media&token=f3640af6-43d6-4398-ac4c-dd25df69aa52" },
  { title: "", url: "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/Red-019.jpg?alt=media&token=d88fddc1-c735-4eeb-b6d0-4c5cd2a5474d" },
  { title: "", url: "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/Red-028.jpg?alt=media&token=d9d6304e-c1ad-486d-8dcb-d6957a715082" },
  { title: "", url: "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/Red-030.jpg?alt=media&token=3e0f9f61-30ad-4427-8727-28298facb911" },
  { title: "", url: "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/S1-023.jpg?alt=media&token=a810daf3-50e3-42e6-930c-f6e8955fbf1f" }
]

export default function Page({ params }: { params: { category: string, subcategory: string } }) {

  const title = "BANGKOK CIRCUS 2024"
  var description = "BKK Circus is a group of young artists who are passionate about circus arts. They have been performing in various events and festivals in Thailand and abroad. They are known for their unique style and creativity. Their performances are a mix of acrobatics, juggling, and other circus acts. They are always looking for new ways to entertain and inspire their audience."
  const titleStyle = cn("sm:text-5xl mx-[5%]", description ? "text-3xl mt-[60px] text-center" : "text-base mt-[50px] text-right")
  return <Box className="mt-[20px]">
    <ImageGallery images={bbkNoTitle} duration={5} autoSlideShow={true} fadeInDuration={'duration-[3s]'} fadeOutDuration={'duration-[5s]'} imageBoxStyling={["h-[45vh]", "w-full"]} imageStyling={["object-contain", "h-full", "w-full"]}/>
    <Typography className={titleStyle}>{title}</Typography>
    {description && <Typography className="text-center ml-[10%] mr-[5%] mt-[20px]">{description}</Typography>}
  </Box>
}