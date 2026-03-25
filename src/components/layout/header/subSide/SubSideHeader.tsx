"use client";

import { Link, usePathname } from "@/i18n/routing";
import Home from "@/components/common/svg/Home";
import Compass from "@/components/common/svg/Compass";
import User from "@/components/common/svg/User";
import styles from "@/components/layout/header/subSide/subSideHeader.module.css";

const sideMenus = [
  { label: "홈", href: "/" },
  { label: "탐색", href: "/my-yps" },
  { label: "마이페이지", href: "/my-page" },
];

export default function SubSideHeader() {
  const pathname = usePathname();

  function getSvg(i: number) {
    if (i === 0) return <Home />;
    if (i === 1) return <Compass />;
    if (i === 2) return <User />;
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.topArea}>
        <nav>
          <ul className={styles.menuList}>
            {sideMenus.map((menu, i) => {
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
                    {getSvg(i)}
                    {menu.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
