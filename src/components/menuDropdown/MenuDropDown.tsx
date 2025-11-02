"use client";

import styles from "@/components/menuDropdown/menuDropdown.module.css";
import { Link } from "@/i18n/routing";
import { useEffect, useRef } from "react";
import Edit from "../svg/Edit";
import Delete from "@/components/svg/Delete";
import Siren from "@/components/svg/Siren";
import { useTranslations } from "next-intl";

interface MenuDropDownProps {
  items: string[];
  onSelect?: (label: string, index: number) => void;
  onClose?: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
  useType: string;
  isLoggedIn?: boolean;
}

export default function MenuDropDown({
  items,
  onSelect,
  onClose,
  triggerRef,
  useType,
  isLoggedIn,
}: MenuDropDownProps) {
  const links = ["myLetters", "settings"];
  const menuRef = useRef<HTMLUListElement | null>(null);
  const isLoggedInUser = isLoggedIn === true;
  const t = useTranslations("auth.modalMenuDropdown");
  const menus = t.raw("menus") as string[];

  function useTypeStyleCondition() {
    if (useType === "profile") return styles.menu;
    if (useType === "letterModal")
      return `${styles.menu} ${styles.letterModalMenu} `;

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

  return (
    <ul role="menu" className={useTypeStyleCondition()} ref={menuRef}>
      {/* 프로필 메뉴일 때만 map 사용 */}
      {useType === "profile" &&
        items.map((label, index, arr) => {
          const isLast = index === arr.length - 1;
          return (
            <li key={`${label}-${index}`} className={styles.menuItem}>
              {useTypeHtmlCondition(isLast, label, index)}
            </li>
          );
        })}

      {/* ✅ LetterModal 메뉴 — map 없이 명시적으로 렌더 */}
      {useType === "letterModal" && (
        <>
          {/* 로그인 사용자만: 수정 */}
          {isLoggedInUser && (
            <li className={`${styles.menuItem} ${styles.topBdrs8}`}>
              <button
                className={styles.menuItemButton}
                onClick={() => onSelect?.("edit", 0)}
              >
                <Edit />
                {menus[0]}
              </button>
            </li>
          )}

          {/* 로그인 사용자만: 삭제 */}
          {isLoggedInUser && (
            <li className={styles.menuItem}>
              <button
                className={styles.menuItemButton}
                onClick={() => onSelect?.("delete", 1)}
              >
                <Delete /> {menus[1]}
              </button>
            </li>
          )}

          {/* 항상 표시: 신고 */}
          <li
            className={`${styles.menuItem} ${
              isLoggedInUser ? styles.bottomBdrs8 : styles.bdrs8
            }`}
          >
            <button
              className={`${styles.menuItemButton} text-red`}
              onClick={() => onSelect?.("report", 2)}
            >
              <Siren /> {menus[2]}
            </button>
          </li>
        </>
      )}
    </ul>
  );
}
