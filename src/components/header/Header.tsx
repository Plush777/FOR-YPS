"use client";

import { useState } from "react";
import styles from "./header.module.css";
import Image from "next/image";
import Nav from "@/components/nav/Nav";
import LocaleDropdown from "@/components/form/LocaleDropdown/LocaleDropdown";
import SvgHamburger from "@/components/svg/HamburgerMenu";
import { Modal } from "@/components/modal/Modal";

import { Link } from "@/i18n/routing";
import { M768, Min768 } from "../mediaQuery/MediaQuery";

import navData from "@/data/nav/nav.json";
import MobileNavigation from "../mobile/MobileNavigaiton";

interface Props {
  name: string;
}

export default function Header({ name }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function linkClickCloseNavigation() {
    setIsMenuOpen(false);
  }

  function hamburgerButtonToggle() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <header className={`${styles.header} header ${name}`}>
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

            <Min768>
              <Nav data={navData.navList} />
            </Min768>
          </div>

          <div className={styles.headerRight}>
            <Min768>
              <Modal useType="auth" />
              <LocaleDropdown />
            </Min768>

            <M768>
              <button
                type="button"
                className={`
                  ${styles.hamburgerButton} 
                  ${isMenuOpen ? styles.active : ""}`}
                onClick={hamburgerButtonToggle}
              >
                <SvgHamburger />
              </button>
            </M768>
          </div>

          <M768>
            <MobileNavigation
              data={navData.navList}
              isOpen={isMenuOpen}
              onClose={linkClickCloseNavigation}
            />
          </M768>
        </div>
      </header>
    </>
  );
}
