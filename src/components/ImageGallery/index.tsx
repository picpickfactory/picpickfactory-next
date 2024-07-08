import ImageGalleryWrapper, { ImageGalleryChildProps } from "./wrapper";
import {
  SingleImageTemplateProps,
  SingleImageTemplate,
} from "./template/singleImageTemplate";
import { Image } from "@/types/image";

export interface SingleImageGalleryProps extends SingleImageTemplateProps {
  images: Image[];
  duration: number;
  autoSlideShow: boolean;
  onClick?: (image: Image) => void;
}

export const SingleImageGallery: React.FC<SingleImageGalleryProps> = ({
  images,
  duration,
  autoSlideShow,
  onClick,
  titleBoxStyling,
  titleTextStyling,
  imageBoxStyling,
  imageStyling,
}) => {
  return (
    <ImageGalleryWrapper
      images={images}
      duration={duration}
      autoSlideShow={autoSlideShow}
      onClick={onClick}
      extraProps={{
        imageStyling: imageStyling,
        imageBoxStyling: imageBoxStyling,
        titleBoxStyling: titleBoxStyling,
        titleTextStyling: titleTextStyling,
      }}
    >
      {(injectedProps: ImageGalleryChildProps<SingleImageTemplateProps>) => (
        <SingleImageTemplate {...injectedProps} />
      )}
    </ImageGalleryWrapper>
  );
};
