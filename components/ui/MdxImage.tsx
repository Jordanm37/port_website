import React from "react";
import NextImage, { ImageProps } from "next/image";
import { chakra } from "@chakra-ui/react";

const ChakraNextImage = chakra(NextImage, {
  shouldForwardProp: (prop) => ["src", "alt", "width", "height", "sizes"].includes(prop as string),
});

export type MdxImageProps = {
  src: string;
  alt?: string;
  aspectRatio?: number; // width / height
} & Partial<Pick<ImageProps, "width" | "height" | "sizes">>;

export const MdxImage: React.FC<MdxImageProps> = ({
  src,
  alt = "",
  width,
  height,
  sizes,
  aspectRatio,
  ...rest
}) => {
  const resolvedWidth = width ?? (aspectRatio ? 1200 : 1200);
  const resolvedHeight = height ?? (aspectRatio ? Math.round(1200 / aspectRatio) : 630);
  return (
    <ChakraNextImage
      src={src}
      alt={alt}
      width={resolvedWidth}
      height={resolvedHeight}
      sizes={sizes ?? "(min-width: 768px) 720px, 100vw"}
      style={{ width: "100%", height: "auto" }}
      borderRadius="md"
      my={2}
      loading="lazy"
      {...rest}
    />
  );
};

export default MdxImage;
