"use client";

import { useState, useEffect } from "react";
import styles from "./header.module.css";
import Image from "next/image";
import Nav from "@/components/nav/Nav";
import LocaleDropdown from "@/components/form/LocaleDropdown/LocaleDropdown";

import { Link } from "@/i18n/routing";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    // 초기 스크롤 위치 확인
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.active : ""}`}>
        <div className={styles.headerInner}>
          <div className={styles.headerLeft}>
            <h1>
              <Link href="/">
                <Image
                  width={150}
                  height={36}
                  src="/icons/logo/logo-for-yps.svg"
                  alt="for yps logo"
                  priority
                />
              </Link>
            </h1>

            <Nav />
          </div>

          <div className={styles.headerRight}>
            <LocaleDropdown />
          </div>
        </div>
      </header>
    </>
  );
}
