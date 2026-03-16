"use client";

import { useEffect, useState } from "react";

import styles from "@/components/layout/header/base/header.module.css";

import HeaderLeft from "@/components/layout/header/base/HeaderLeft";
import HeaderRight from "@/components/layout/header/base/HeaderRight";

const SCROLL_THRESHOLD = 8;

type HeaderProps = {
  useScrollHide?: boolean;
};

export default function Header({ useScrollHide = false }: HeaderProps) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (!useScrollHide) {
      setIsHidden(false);
      return;
    }

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
  }, [useScrollHide]);

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
