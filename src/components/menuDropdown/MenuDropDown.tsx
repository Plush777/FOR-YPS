"use client";

import styles from "@/components/menuDropdown/menuDropdown.module.css";
import { Link } from "@/i18n/routing";
import { useEffect, useRef } from "react";

interface MenuDropDownProps {
  items: string[];
  onSelect?: (label: string, index: number) => void;
  onClose?: () => void;
}

export default function MenuDropDown({
  items,
  onSelect,
  onClose,
}: MenuDropDownProps) {
  const links = ["myLetters", "settings"];
  const menuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!onClose) {
      return;
    }

    function handlePointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;
      if (target && menuRef.current && !menuRef.current.contains(target)) {
        onClose?.();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [onClose]);

  return (
    <ul role="menu" className={styles.menu} ref={menuRef}>
      {items.map((label, index, arr) => {
        const isLast = index === arr.length - 1;

        return (
          <li key={`${label}-${index}`} role="none" className={styles.menuItem}>
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
          </li>
        );
      })}
    </ul>
  );
}
