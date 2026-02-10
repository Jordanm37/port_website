import { Container, ContainerProps, VStack } from "@chakra-ui/react";
import React from "react";

export interface PageContainerProps extends Omit<ContainerProps, "children"> {
  stackSpacing?: number | string | Record<string, any> | Array<string | number>;
  stackPy?: number | string | Record<string, any> | Array<string | number>;
  children?: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  stackSpacing = { base: 8, md: 12 },
  stackPy = { base: 12, md: 16 },
  maxW = "680px",
  px = { base: 4, md: 5 },
  ...props
}) => {
  return (
    <Container maxW={maxW} px={px} {...props}>
      <VStack spacing={stackSpacing} py={stackPy} align="stretch">
        {children}
      </VStack>
    </Container>
  );
};

export default PageContainer;
