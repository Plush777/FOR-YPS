"use client";

import { useEffect, useState, useRef } from "react";
import styles from "@/components/page/sub/fixedImage/fixedImage.module.css";

interface Props {
  src: string;
  alt: string;
}

export default function FixedImage({ src, alt }: Props) {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScrollY.current) {
        // 아래로 스크롤 → 숨기기
        setHidden(true);
      } else {
        // 위로 스크롤 → 보이기
        setHidden(false);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`${styles.fixedImage} ${hidden ? styles.hide : ""}`}>
      <img src={src} alt={alt} />
    </div>
  );
}
