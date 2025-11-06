"use client";

import styles from "@/components/layout/header/menuDropdown/menuDropdown.module.css";
import Edit from "@/components/common/svg/Edit";
import Delete from "@/components/common/svg/Delete";
import Siren from "@/components/common/svg/Siren";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import { Link } from "@/i18n/routing";

interface Props {
  useType: string;
  items: string[];
  onSelect?: (label: string, index: number) => void;
  onClose?: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
  isLoggedIn?: boolean;
  isMyLetter?: boolean;
  onEdit?: () => void;
}

export default function MenuDropDown({
  useType,
  items,
  onSelect,
  onClose,
  triggerRef,
  isLoggedIn,
  isMyLetter,
  onEdit,
}: Props) {
  const links = ["myLetters", "settings"];
  const menuRef = useRef<HTMLUListElement | null>(null);
  const t = useTranslations("auth.modalMenuDropdown");
  const menus = t.raw("menus") as string[];

  function useTypeStyleCondition() {
    if (useType === "profile") return styles.profileModalMenu;
    if (useType === "letterModal") return styles.letterModalMenu;

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

  const canEdit = isLoggedIn && isMyLetter;

  return (
    <ul className={`${styles.menu} ${useTypeStyleCondition()}`} ref={menuRef}>
      {useType === "profile" &&
        items.map((label, index, arr) => {
          const isLast = index === arr.length - 1;
          return (
            <li key={`${label}-${index}`} className={styles.menuItem}>
              {useTypeHtmlCondition(isLast, label, index)}
            </li>
          );
        })}

      {useType === "letterModal" && (
        <>
          {canEdit && (
            <li className={`${styles.menuItem} ${styles.topBdrs8}`}>
              <button
                className={styles.menuItemButton}
                onClick={() => {
                  onEdit?.();
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
        </>
      )}
    </ul>
  );
}
