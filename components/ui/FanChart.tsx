import React, { useEffect, useRef } from "react";
import { Box } from "@chakra-ui/react";

export interface ConfidenceInterval {
  x: number;
  median: number;
  p10: number;
  p25: number;
  p75: number;
  p90: number;
}

export interface FanChartProps {
  data: ConfidenceInterval[];
  width?: number;
  height?: number;
  xLabel?: string;
  yLabel?: string;
  title?: string;
}

export const FanChart: React.FC<FanChartProps> = ({
  data,
  width = 600,
  height = 300,
  xLabel = "Time",
  yLabel = "Value",
  title,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    const svg = svgRef.current;
    svg.innerHTML = ""; // Clear previous content

    const margin = { top: 20, right: 20, bottom: 40, left: 60 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Scales
    const xScale = (value: number) => {
      const minX = Math.min(...data.map((d) => d.x));
      const maxX = Math.max(...data.map((d) => d.x));
      return ((value - minX) / (maxX - minX)) * innerWidth + margin.left;
    };

    const yScale = (value: number) => {
      const allValues = data.flatMap((d) => [d.p10, d.median, d.p90]);
      const minY = Math.min(...allValues);
      const maxY = Math.max(...allValues);
      const padding = (maxY - minY) * 0.1;
      return height - margin.bottom - ((value - minY) / (maxY - minY + 2 * padding)) * innerHeight;
    };

    // Create path functions
    const createPath = (accessor: (d: ConfidenceInterval) => number) => {
      return data
        .map((d, i) => {
          const x = xScale(d.x);
          const y = yScale(accessor(d));
          return `${i === 0 ? "M" : "L"} ${x} ${y}`;
        })
        .join(" ");
    };

    // Draw bands with varying opacity
    const bands = [
      { accessor: (d: ConfidenceInterval) => d.p90, fill: "var(--oklch-accent)", opacity: 0.1 },
      { accessor: (d: ConfidenceInterval) => d.p75, fill: "var(--oklch-accent)", opacity: 0.15 },
      { accessor: (d: ConfidenceInterval) => d.p25, fill: "var(--oklch-accent)", opacity: 0.15 },
      { accessor: (d: ConfidenceInterval) => d.p10, fill: "var(--oklch-accent)", opacity: 0.1 },
    ];

    bands.forEach(({ accessor, fill, opacity }) => {
      const upperPath = createPath(accessor);
      const lowerPath = createPath((d) => 2 * d.median - accessor(d));

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute(
        "d",
        `${upperPath} L ${lowerPath.split(" ").slice().reverse().join(" ")} Z`
      );
      path.setAttribute("fill", fill);
      path.setAttribute("fill-opacity", opacity.toString());
      svg.appendChild(path);
    });

    // Draw median line
    const medianPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    medianPath.setAttribute(
      "d",
      createPath((d) => d.median)
    );
    medianPath.setAttribute("stroke", "var(--oklch-accent)");
    medianPath.setAttribute("stroke-width", "2");
    medianPath.setAttribute("fill", "none");
    svg.appendChild(medianPath);

    // Add axes (simplified)
    const xAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    xAxis.setAttribute("x1", margin.left.toString());
    xAxis.setAttribute("y1", (height - margin.bottom).toString());
    xAxis.setAttribute("x2", (width - margin.right).toString());
    xAxis.setAttribute("y2", (height - margin.bottom).toString());
    xAxis.setAttribute("stroke", "var(--oklch-border)");
    svg.appendChild(xAxis);

    const yAxis = document.createElementNS("http://www.w3.org/2000/svg", "line");
    yAxis.setAttribute("x1", margin.left.toString());
    yAxis.setAttribute("y1", margin.top.toString());
    yAxis.setAttribute("x2", margin.left.toString());
    yAxis.setAttribute("y2", (height - margin.bottom).toString());
    yAxis.setAttribute("stroke", "var(--oklch-border)");
    svg.appendChild(yAxis);
  }, [data, width, height]);

  return (
    <Box>
      {title && (
        <Box as="h3" fontSize="sm" color="muted" mb={2}>
          {title}
        </Box>
      )}
      <Box
        borderWidth="1px"
        borderColor="border"
        borderRadius="md"
        overflow="hidden"
        bg="readingBg"
        p={4}
      >
        <svg
          ref={svgRef}
          width={width}
          height={height}
          style={{ display: "block", margin: "0 auto" }}
        />
        <Box display="flex" justifyContent="space-between" mt={2} fontSize="xs" color="muted">
          <Box>{xLabel}</Box>
          <Box>{yLabel}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FanChart;
