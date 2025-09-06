import React from "react";
import { Box } from "@chakra-ui/react";

export type MastheadKind = "perlin" | "brownian" | "ou" | "gp";

export interface MastheadSignatureProps {
  kind?: MastheadKind;
  seed?: string;
  height?: number;
}

function hashStringToInt(str: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
}

function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generatePath(
  kind: MastheadKind,
  width: number,
  height: number,
  rng: () => number
): string {
  const n = 160;
  const step = width / (n - 1);
  let y = height / 2;
  const points: Array<[number, number]> = [];
  const amp = kind === "perlin" ? 10 : kind === "ou" ? 14 : kind === "gp" ? 16 : 12;
  const drift = kind === "ou" ? 0.04 : 0.02;
  for (let i = 0; i < n; i++) {
    const x = i * step;
    const noise = (rng() - 0.5) * 2 * amp;
    // Ornstein-Uhlenbeck tendency towards mean
    const pull = kind === "ou" ? (height / 2 - y) * drift : 0;
    y = Math.max(0, Math.min(height, y + noise + pull));
    points.push([x, y]);
  }
  return points
    .map((p, idx) => `${idx === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`)
    .join(" ");
}

export const MastheadSignature: React.FC<MastheadSignatureProps> = ({
  kind = "brownian",
  seed = "seed",
  height = 150,
}) => {
  const width = 1200; // will scale to container width
  const rng = mulberry32(hashStringToInt(`${kind}:${seed}`));
  const d = generatePath(kind, width, height, rng);
  const stroke = "var(--oklch-accent, currentColor)";

  return (
    <Box role="img" aria-label={`${kind} stochastic signature`} width="100%" overflow="hidden">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height={height}
        preserveAspectRatio="none"
      >
        {kind === "perlin" ? (
          <title>Perlin noise (Ken Perlin, 1980s) shaped film CGI and game terrain</title>
        ) : null}
        <path d={d} stroke={stroke} strokeWidth={0.8} fill="none" opacity={0.25} />
      </svg>
    </Box>
  );
};

export default MastheadSignature;
