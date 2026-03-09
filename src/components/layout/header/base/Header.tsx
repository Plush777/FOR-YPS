import styles from "@/components/layout/header/base/header.module.css";
import Image from "next/image";
import Nav from "@/components/layout/nav/Nav";
import LocaleDropdown from "@/components/form/LocaleDropdown/LocaleDropdown";
import { Modal } from "@/components/modal/base/Modal";

import { Link } from "@/i18n/routing";

import navData from "@/data/nav/nav.json";

import logo from "../../../../../public/icons/logo/logo-for-yps.svg";

import { Responsive } from "@/components/mobile/responsive/Responsive";

interface Props {
  name: string;
}

export default function Header({ name }: Props) {
  return (
    <>
      <header className={`${styles.header} header ${name}`}>
        <div className={styles.headerRowBox}>
          <div className={styles.headerRow}>
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

                <Responsive useType="min768">
                  <Nav data={navData.navList} />
                </Responsive>
              </div>

              <div className={styles.headerRight}>
                <Responsive useType="min768">
                  <LocaleDropdown />
                </Responsive>

                <Modal useType="auth" />
              </div>
            </div>
          </div>

          <div className={styles.headerRow}>
            <Responsive useType="max768">
              <Nav data={navData.navList} />
            </Responsive>
          </div>
        </div>
      </header>
    </>
  );
}
