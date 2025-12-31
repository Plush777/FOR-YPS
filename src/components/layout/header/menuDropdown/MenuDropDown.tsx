"use client";

import styles from "@/components/layout/header/menuDropdown/menuDropdown.module.css";
import Edit from "@/components/common/svg/Edit";
import Delete from "@/components/common/svg/Delete";
import Siren from "@/components/common/svg/Siren";

import { toast } from "react-toastify";
import { supabase } from "@/lib/supabase/client";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/routing";
import { useRouter } from "next/navigation";
import Confirm from "@/components/modal/confirm/Confirm";

interface Props {
  useType: string;
  items: string[];
  onSelect?: (label: string, index: number) => void;
  onClose?: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
  isLoggedIn?: boolean;
  isMyLetter?: boolean;
  onEdit?: () => void;
  letterId?: string;
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
  letterId,
}: Props) {
  const router = useRouter();

  const links = ["my-letters", "settings"];
  const menuRef = useRef<HTMLUListElement | null>(null);
  const t = useTranslations("auth.modalMenuDropdown");
  const menus = t.raw("menus") as string[];
  const [showConfirm, setShowConfirm] = useState(false);

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
      if (showConfirm) return; // ✅ Confirm이 열려있을 땐 닫기 이벤트 무시

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
  }, [onClose, triggerRef, showConfirm]); // ✅ showConfirm 의존성 추가

  const canEdit = isLoggedIn && isMyLetter;
  console.log("🟣 letterId", letterId); // ✅ 추가

  // ✅ 삭제 실행 함수
  async function handleDelete() {
    console.log("🟣 handleDelete 실행됨", letterId);

    try {
      const { error } = await supabase
        .from("letters")
        .delete()
        .eq("id", letterId);
      console.log("🟣 Supabase 응답", error);

      if (error) throw error;

      toast.success("메시지가 삭제되었습니다 🎉");
      setShowConfirm(false);
      router.back();
    } catch (err) {
      console.error("🟥 삭제 에러:", err);
      toast.error("삭제에 실패했습니다 😢");
    }
  }

  return (
    <>
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
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ 버블링 차단
                    setShowConfirm(true);
                  }}
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

      {showConfirm && (
        <Confirm
          message="정말로 이 메시지를 삭제하시겠습니까?"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
