import React from "react";
import NextImage, { ImageProps } from "next/image";
import { chakra } from "@chakra-ui/react";

const ChakraNextImage = chakra(NextImage, {
  shouldForwardProp: (prop) => ["src", "alt", "width", "height", "sizes"].includes(prop as string),
});

export type MdxImageProps = {
  src: string;
  alt?: string;
} & Partial<Pick<ImageProps, "width" | "height" | "sizes">>;

export const MdxImage: React.FC<MdxImageProps> = ({
  src,
  alt = "",
  width,
  height,
  sizes,
  ...rest
}) => {
  return (
    <ChakraNextImage
      src={src}
      alt={alt}
      width={width ?? 1200}
      height={height ?? 630}
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
