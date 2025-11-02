"use client";

import styles from "@/components/menuDropdown/menuDropdown.module.css";
import Edit from "@/components/svg/Edit";
import Delete from "@/components/svg/Delete";
import Siren from "@/components/svg/Siren";
import { useTranslations } from "next-intl";

interface Props {
  useType: string;
  items: string[];
  onClose?: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
  isLoggedIn?: boolean;
  isMyLetter?: boolean;
  onEdit: () => void;
}

export default function MenuDropDown({
  onClose,
  triggerRef,
  isLoggedIn,
  isMyLetter,
  onEdit,
}: Props) {
  const t = useTranslations("auth.modalMenuDropdown");
  const menus = t.raw("menus") as string[];

  const canEdit = isLoggedIn && isMyLetter;

  return (
    <ul className={`${styles.menu} ${styles.letterModalMenu}`}>
      {canEdit && (
        <li className={`${styles.menuItem} ${styles.topBdrs8}`}>
          <button
            className={styles.menuItemButton}
            onClick={() => {
              onEdit();
              onClose?.();
            }}
          >
            <Edit /> {menus[0]}
          </button>
        </li>
      )}

      {canEdit && (
        <li className={styles.menuItem}>
          <button
            className={styles.menuItemButton}
            onClick={() => alert("삭제 기능 추후 구현")}
          >
            <Delete /> {menus[1]}
          </button>
        </li>
      )}

      <li
        className={`${styles.menuItem} ${
          canEdit ? styles.bottomBdrs8 : styles.bdrs8
        }`}
      >
        <button className={`${styles.menuItemButton} text-red`}>
          <Siren /> {menus[2]}
        </button>
      </li>
    </ul>
  );
}
