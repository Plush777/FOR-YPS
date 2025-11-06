"use client";

import { useState } from "react";
import styles from "@/components/layout/header/base/header.module.css";
import Image from "next/image";
import Nav from "@/components/layout/nav/Nav";
import LocaleDropdown from "@/components/form/LocaleDropdown/LocaleDropdown";
import SvgHamburger from "@/components/common/svg/HamburgerMenu";
import { Modal } from "@/components/modal/base/Modal";

import { Link } from "@/i18n/routing";
import { M768, Min768 } from "@/components/mobile/mediaQuery/MediaQuery";

import navData from "@/data/nav/nav.json";
import MobileNavigation from "@/components/mobile/mobileNavigation/MobileNavigaiton";
import Button from "@/components/button/base/Button";

import logo from "../../../../../public/icons/logo/logo-for-yps.svg";

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
                  src={logo}
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
              <LocaleDropdown />
              <Modal useType="auth" />
            </Min768>

            <M768>
              <Button
                color="transparent-white"
                onlyIcon={true}
                iconSize="onlySizeXl"
                className={`
                  ${styles.hamburgerButton} 
                  ${isMenuOpen ? styles.active : ""}`}
                onClick={hamburgerButtonToggle}
              >
                <SvgHamburger />
              </Button>
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
