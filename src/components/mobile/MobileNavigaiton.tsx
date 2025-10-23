"use client";

import React from "react";
import { usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Link from "next/link";
import styles from "./mobileNavigation.module.css";

type NavItem = {
  name: string;
  link: string;
};

type Props = {
  data: NavItem[];
  isOpen: boolean;
  onClose: () => void;
};

const localeList = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "jp", label: "日本語" },
  { code: "zh-CN", label: "简体中文" },
  { code: "zh-TW", label: "繁體中文" },
];

export default function MobileNavigation({ data, isOpen, onClose }: Props) {
  const pathname = usePathname();
  const currentLocale = useLocale();

  return (
    <div
      className={`
        ${styles.wrap} 
        ${isOpen ? styles.active : ""} 
        mobileNavigation`}
    >
      <ul className={styles.list}>
        {data.map((item, i) => (
          <li key={i} className={styles.item}>
            <Link href={item.link} className={styles.button}>
              {item.name}
            </Link>
          </li>
        ))}

        <li className={`${styles.item} ${styles.localeItem}`}>
          {localeList.map(({ code, label }) => (
            <Link
              key={code}
              href={`/${code}`}
              // locale={code}
              className={`${styles.localeLink} ${
                currentLocale === code ? styles.active : ""
              }`}
              onClick={onClose}
            >
              {label}
            </Link>
          ))}
        </li>
      </ul>
    </div>
  );
}
