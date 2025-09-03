import React from "react";
import { IconButton } from "@chakra-ui/react";

interface SocialButtonProps {
  url: string;
  ariaLabel: string;
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined;
}

const SocialButton: React.FC<SocialButtonProps> = ({ url, ariaLabel, icon }) => {
  return (
    <IconButton
      as="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      icon={icon}
      variant="outline"
      colorScheme="primary"
      borderRadius="full"
      size="md"
    />
  );
};

export default SocialButton;
