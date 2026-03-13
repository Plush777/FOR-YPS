"use client";

import { useEffect, useState } from "react";

import styles from "@/components/layout/header/base/header.module.css";

import HeaderLeft from "@/components/layout/header/base/HeaderLeft";
import HeaderRight from "@/components/layout/header/base/HeaderRight";

const SCROLL_THRESHOLD = 8;

export default function Header() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - previousScrollY;

      if (currentScrollY <= 0) {
        setIsHidden(false);
      } else if (delta > SCROLL_THRESHOLD) {
        setIsHidden(true);
      } else if (delta < -SCROLL_THRESHOLD) {
        setIsHidden(false);
      }

      previousScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${styles.header} ${isHidden ? styles.hidden : ""}`}>
      <div className={styles.headerInner}>
        <div className={styles.headerContents}>
          <HeaderLeft />
          <HeaderRight />
        </div>
      </div>
    </header>
  );
}
