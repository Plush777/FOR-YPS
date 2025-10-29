"use client";

import styles from "@/components/menuDropdown/menuDropdown.module.css";
import { Link } from "@/i18n/routing";
import { useEffect, useRef } from "react";
import Edit from "../svg/Edit";
import Delete from "@/components/svg/Delete";
import Siren from "@/components/svg/Siren";

interface MenuDropDownProps {
  items: string[];
  onSelect?: (label: string, index: number) => void;
  onClose?: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
  useType: string;
}

export default function MenuDropDown({
  items,
  onSelect,
  onClose,
  triggerRef,
  useType,
}: MenuDropDownProps) {
  const links = ["myLetters", "settings"];
  const menuRef = useRef<HTMLUListElement | null>(null);

  function useTypeStyleCondition() {
    if (useType === "profile") return styles.menu;
    if (useType === "letterModal")
      return `${styles.menu} ${styles.letterModalMenu}`;

    return undefined;
  }

  function useTypeHtmlCondition(isLast: boolean, label: string, index: number) {
    if (useType === "profile") {
      return (
        <>
          {isLast ? (
            <button
              type="button"
              role="menuitem"
              className={styles.menuItemButton}
              onClick={() => onSelect?.(label, index)}
            >
              {label}
            </button>
          ) : (
            <Link className={styles.link} href={`/${links[index]}`}>
              {label}
            </Link>
          )}
        </>
      );
    }

    if (useType === "letterModal")
      return (
        <>
          <button
            type="button"
            role="menuitem"
            className={`${styles.menuItemButton} ${
              index === 2 ? "text-red" : ""
            }`}
            onClick={() => onSelect?.(label, index)}
          >
            {index === 0 && <Edit />}
            {index === 1 && <Delete />}
            {index === 2 && <Siren />}
            {label}
          </button>
        </>
      );
  }

  useEffect(() => {
    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;
      if (
        target &&
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !(triggerRef?.current?.contains(target) ?? false)
      ) {
        onClose?.();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [onClose, triggerRef]);

  return (
    <ul role="menu" className={useTypeStyleCondition()} ref={menuRef}>
      {items.map((label, index, arr) => {
        const isLast = index === arr.length - 1;

        return (
          <li key={`${label}-${index}`} role="none" className={styles.menuItem}>
            {useTypeHtmlCondition(isLast, label, index)}
          </li>
        );
      })}
    </ul>
  );
}
