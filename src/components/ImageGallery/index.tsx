import ImageGalleryWrapper, {
  ImageGalleryChildProps,
  ImageGalleryOptions,
} from "./wrapper";
import {
  SingleImageTemplateProps,
  SingleImageTemplate,
} from "./template/singleImageTemplate";

export const SingleImageGallery: React.FC<
  ImageGalleryOptions & SingleImageTemplateProps
> = ({
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
