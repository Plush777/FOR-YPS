"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import Globe from "@/components/common/svg/Globe";
import styles from "@/components/form/LocaleDropdown/localeDropdown.module.css";

const LOCALES = [
  { value: "ko", label: "한국어" },
  { value: "en", label: "English" },
  { value: "jp", label: "日本語" },
  { value: "zh-CN", label: "简体中文" },
  { value: "zh-TW", label: "繁體中文" },
];

export default function LocaleDropdown() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLocaleChange = (nextLocale: string) => {
    router.push({ pathname }, { locale: nextLocale });
    setIsOpen(false);
  };

  return (
    <div className={styles.localeDropdownWrapper} ref={dropdownRef}>
      <button
        type="button"
        className={styles.localeButton}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <span className={styles.localeIcon}>
          <Globe />
        </span>
      </button>

      {isOpen && (
        <ul className={styles.localeMenu} role="menu">
          {LOCALES.map(({ value, label }) => {
            const isCurrent = locale === value;

            return (
              <li key={value}>
                <button
                  type="button"
                  className={`${styles.localeMenuItem} ${isCurrent ? styles.active : ""}`}
                  onClick={() => handleLocaleChange(value)}
                  role="menuitemradio"
                  aria-checked={isCurrent}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
