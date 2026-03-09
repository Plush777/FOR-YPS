"use client";

import React from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import styles from "@/components/form/LocaleDropdown/localeDropdown.module.css";

export default function LocaleDropdown() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale = e.target.value;
    router.push({ pathname }, { locale });
  };

  return (
    <select
      className={`${styles.localeDropdownWrapper}`}
      value={locale}
      onChange={handleChange}
    >
      <option value="ko">한국어</option>
      <option value="en">English</option>
      <option value="jp">日本語</option>
      <option value="zh-CN">简体中文</option>
      <option value="zh-TW">繁體中文</option>
    </select>
  );
}
