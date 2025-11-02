"use client";

import { useCallback } from "react";
import styles from "@/components/topDownButton/topDownButton.module.css";
import ArrowTop from "@/components/svg/ArrowTop";
import ArrowDown from "@/components/svg/ArrowDown";

export default function TopDownButton() {
  const handleScrollTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleScrollDown = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    window.scrollTo({
      top: scrollHeight - clientHeight,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className={`${styles.wrap} topDownButtonWrapper`}>
      <button
        type="button"
        className={styles.topDownButton}
        onClick={handleScrollTop}
      >
        <span className="hidden">위로 올라가기</span>
        <ArrowTop />
      </button>

      <button
        type="button"
        className={styles.topDownButton}
        onClick={handleScrollDown}
      >
        <span className="hidden">아래로 내려가기</span>
        <ArrowDown />
      </button>
    </div>
  );
}
