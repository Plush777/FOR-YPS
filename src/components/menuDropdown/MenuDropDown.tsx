"use client";

import styles from "@/components/menuDropdown/menuDropdown.module.css";

interface MenuDropDownProps {
  items: string[];
  onSelect?: (label: string, index: number) => void;
}

export default function MenuDropDown({ items, onSelect }: MenuDropDownProps) {
  return (
    <ul role="menu" className={styles.menu}>
      {items.map((label, index) => (
        <li key={`${label}-${index}`} role="none" className={styles.menuItem}>
          <button
            type="button"
            role="menuitem"
            onClick={() => onSelect?.(label, index)}
          >
            {label}
          </button>
        </li>
      ))}
    </ul>
  );
}
