"use client";

import { useEffect } from "react";
import AnimateHeartCanvas from "./AnimateHeartCanvas";

interface Props {
  hMin?: number;
  hMax?: number;
  count?: number;
  bgColor?: string;
}

export default function HeartCanvas({
  hMin = 330,
  hMax = 350,
  count = 150,
  bgColor = "transparent",
}: Props) {
  useEffect(() => {
    const heart = new AnimateHeartCanvas(
      hMin,
      hMax,
      count,
      50,
      350,
      bgColor,
      "main-bg-layer"
    );
    return () => {
      heart.destroy();
    };
  }, [hMin, hMax, count, bgColor]);

  return null; // 캔버스는 JS로 생성되므로 DOM 출력 없음
}
