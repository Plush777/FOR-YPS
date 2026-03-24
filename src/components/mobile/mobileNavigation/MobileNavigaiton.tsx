"use client";

import React from "react";
import styles from "./mobileNavigation.module.css";
import { Link } from "@/i18n/routing";

type NavItem = {
  name: string;
  link: string;
};

type Props = {
  data: NavItem[];
  isOpen: boolean;
  onClose: () => void;
};


export default function MobileNavigation({ data, isOpen, onClose }: Props) {
  return (
    <div
      className={`
        ${styles.wrap} 
        ${isOpen ? styles.active : ""} 
      `}
    >
      <ul className={styles.list}>
        {data.map((item, i) => (
          <li key={i} className={styles.item}>
            <Link href={item.link} className={styles.button}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
