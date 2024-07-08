"use client";

import { SingleImageGallery } from "@/components/ImageGallery";
import { Image } from "@/types/image";
import { useRouter } from "next/navigation";


const bbk = [
  {
    title: "Bangkok Circus 1",
    path: "/personal/bangkok-circus-1",
    url: "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/BKKCIRCUS01.jpg?alt=media&token=1bca2fbf-2902-4761-945f-167dc12200cd",
  },
  {
    title: "Bangkok Circus 2",
    path: "/personal/bangkok-circus-2",
    url: "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/BKKCIRCUS02.jpg?alt=media&token=4a06006c-aee9-4218-99e4-0ce38a6e3a42",
  },
  {
    title: "Bangkok Circus 3",
    path: "/personal/bangkok-circus-3",
    url: "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/BKKCIRCUSLONGWAY.jpg?alt=media&token=d68d460f-9480-43cc-85c6-11c44afcb447",
  },
  {
    title: "Bangkok Circus 4",
    path: "/personal/bangkok-circus-4",
    url: "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/LB.jpg?alt=media&token=b41e836a-cdc4-4041-ad8e-091a0ee70d67",
  },
  {
    title: "Bangkok Circus 5",
    path: "/personal/bangkok-circus-5",
    url: "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/Red-004.jpg?alt=media&token=f3640af6-43d6-4398-ac4c-dd25df69aa52",
  },
  {
    title: "Bangkok Circus 6",
    path: "/personal/bangkok-circus-6",
    url: "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/Red-019.jpg?alt=media&token=d88fddc1-c735-4eeb-b6d0-4c5cd2a5474d",
  },
  {
    title: "Bangkok Circus 7",
    path: "/personal/bangkok-circus-7",
    url: "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/Red-028.jpg?alt=media&token=d9d6304e-c1ad-486d-8dcb-d6957a715082",
  },
  {
    title: "Bangkok Circus 8",
    path: "/personal/bangkok-circus-8",
    url: "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/Red-030.jpg?alt=media&token=3e0f9f61-30ad-4427-8727-28298facb911",
  },
  {
    title: "Bangkok Circus 9",
    path: "/personal/bangkok-circus-9",
    url: "https://firebasestorage.googleapis.com/v0/b/pic-pick-factory.appspot.com/o/S1-023.jpg?alt=media&token=a810daf3-50e3-42e6-930c-f6e8955fbf1f",
  },
];

export default function Home() {
  const router = useRouter();

  const onClick = (image: Image) => {
    router.push(image.path ? image.path : "/");
  };

  return (
    <div className="ml-[10px]">
      <SingleImageGallery
        images={bbk}
        duration={4}
        autoSlideShow={true}
        onClick={onClick}
        imageBoxStyling={["h-[45vh]", "w-[85%]", "mr-[15%]", "mt-[120px]"]}
        imageStyling={["object-cover", "h-full", "w-full"]}
        titleBoxStyling={["mr-[18%] h-[40px] mt-4"]}
        titleTextStyling={["text-2xl right-0"]}
      />
    </div>
  );
}
