import { ScreenSize, sizeOrder } from "@/types/screenSize";

export const isSizeGreaterThan = (size1: ScreenSize, size2: ScreenSize) => {
  return sizeOrder.indexOf(size1) >= sizeOrder.indexOf(size2);
};

export const isSizeLessThan = (size1: ScreenSize, size2: ScreenSize) => {
  return sizeOrder.indexOf(size1) < sizeOrder.indexOf(size2);
};

export const isSizeGreaterThanOrEqualTo = (
  size1: ScreenSize,
  size2: ScreenSize
) => {
  return sizeOrder.indexOf(size1) > sizeOrder.indexOf(size2);
};

export const isSizeLessThanOrEqualTo = (
  size1: ScreenSize,
  size2: ScreenSize
) => {
  return sizeOrder.indexOf(size1) <= sizeOrder.indexOf(size2);
};
