"use client";

import Image from "next/image";

import { Link, usePathname } from "@/i18n/routing";
import AuthArea from "@/components/layout/header/auth/AuthArea";
import logo from "../../../../../public/icons/logo/logo-for-yps.svg";
import styles from "@/components/layout/header/subSide/subSideHeader.module.css";

const sideMenus = [
  { label: "홈", href: "/" },
  { label: "탐색", href: "/my-yps" },
  { label: "마이페이지", href: "/my-page" },
];

export default function SubSideHeader() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.topArea}>
        <h1>
          <Link href="/">
            <Image
              width={120}
              height={36}
              src={logo}
              alt="for yps logo"
              priority
            />
          </Link>
        </h1>

        <nav>
          <ul className={styles.menuList}>
            {sideMenus.map((menu) => {
              const isActive =
                menu.href === "/"
                  ? pathname === "/"
                  : pathname === menu.href ||
                    pathname.startsWith(`${menu.href}/`);

              return (
                <li key={menu.href}>
                  <Link
                    href={menu.href}
                    className={`${styles.menuLink} ${isActive ? styles.active : ""}`}
                  >
                    {menu.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className={styles.bottomArea}>
        <AuthArea />
      </div>
    </aside>
  );
}
