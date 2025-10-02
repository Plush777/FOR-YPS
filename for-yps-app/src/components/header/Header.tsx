"use client";

import { useState, useEffect } from "react";
import styles from "./header.module.css";
import Image from "next/image";

import Nav from "@/components/nav/Nav";
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
          <h1>
            <Link href="/">
              <Image
                width={120}
                height={46}
                src="/icons/logo/logo-for-yps.svg"
                alt="for yps logo"
                priority
              />
            </Link>
          </h1>

          <Nav />
        </div>
      </header>
    </>
  );
}
