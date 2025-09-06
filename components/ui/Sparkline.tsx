import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";

export interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  width = 60,
  height = 20,
  strokeColor = "var(--oklch-accent)",
  strokeWidth = 1,
  className,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = svgRef.current;
    svg.innerHTML = ""; // Clear previous content

    if (data.length < 2) return;

    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);
    const range = maxValue - minValue || 1;

    // Create path
    const pathData = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - ((value - minValue) / range) * height;
        return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    path.setAttribute("stroke", strokeColor);
    path.setAttribute("stroke-width", strokeWidth.toString());
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("stroke-linejoin", "round");

    svg.appendChild(path);
  }, [data, width, height, strokeColor, strokeWidth]);

  return (
    <Box
      className={className}
      position="absolute"
      right={-16}
      top="50%"
      transform="translateY(-50%)"
      display={{ base: "none", xl: "block" }}
      zIndex={1}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        style={{ display: "block" }}
        role="img"
        aria-label="Data sparkline"
      />
    </Box>
  );
};

export default Sparkline;
