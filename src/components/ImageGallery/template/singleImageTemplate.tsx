import { cn } from "@/utils/tailwind";
import { Box, Typography } from "@mui/material";
import { ImageGalleryChildProps } from "../wrapper";
import "../../../styles/imageGallery.css";

export interface SingleImageTemplateProps {
  imageStyling: string[];
  imageBoxStyling: string[];
  titleBoxStyling: string[];
  titleTextStyling: string[];
}

export const SingleImageTemplate = (
  props: ImageGalleryChildProps<SingleImageTemplateProps>
) => {
  return (
    <>
      <Box
        className={cn("relative z-0 flex", props.extraProps.imageBoxStyling)}
        onTouchStart={props.onTouchStart}
        onTouchMove={props.onTouchMove}
        onTouchEnd={props.onTouchEnd}
        onMouseDown={props.onMouseDown}
        onMouseMove={props.onMouseMove}
        onMouseUp={props.onMouseUp}
      >
        {props.images.map((img, index) => {
          return (
            <img
              key={index}
              className={cn("absolute", props.extraProps.imageStyling)}
              src={img.url}
              alt="image"
              draggable={false}
              id={index === props.currentIndex ? "fade-in" : "fade-out"}
              onClick={props.handleClick(index)}
            />
          );
        })}
      </Box>
      <Box
        className={cn("relative z-0 flex", props.extraProps.titleBoxStyling)}
      >
        {props.images.map((img, index) => {
          return (
            <Box key={index}>
              {img.title && (
                <Typography
                  className={cn(
                    "absolute text-right",
                    props.extraProps.titleTextStyling
                  )}
                  id={index === props.currentIndex ? "fade-in" : "fade-out"}
                >
                  {img.title}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </>
  );
};
