"use client";

import React, { ReactNode, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import styles from "@/components/letterModal/letterModal.module.css";
import ModalClose from "@/components/svg/ModalClose";
import DetailTop from "@/components/subPage/detail/DetailTop";
import DetailButtons from "@/components/subPage/detail/DetailButtons";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import LetterModalSkeleton from "@/components/letterModal/LetterModalSkeleton";

interface Props {
  width?: string;
  children: ReactNode;
  onClose: () => void;
  data: {
    username: string;
    created_at: string;
  };
  currentUser?: {
    avatar_url?: string;
    name?: string;
  };
}

export function LetterModal({
  width = "default",
  children,
  onClose,
  data,
  currentUser,
}: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tModalMenu = useTranslations("auth.modalMenuDropdown");
  const menus = (tModalMenu.raw("menus") as string[]) || [];

  const isLoading = !data; // ✅ 데이터 로딩 상태 체크

  function widthStyleCondition() {
    if (width === "large") return styles.widthLarge;
    if (width === "default") return styles.widthDefault;
    if (width === "small") return styles.widthSmall;

    return undefined;
  }

  function handleSelect() {
    setOpen(false);
  }

  useBodyScrollLock(true); // ✅ 스크롤 잠금

  return (
    <div onClick={onClose} className={styles.overlay}>
      <section
        onClick={(e) => e.stopPropagation()}
        className={`${styles.modal} ${widthStyleCondition()}`}
      >
        <header className={styles.modalHeader}>
          <div className={styles.modalHeaderButtonGroup}>
            <button className={styles.close} onClick={onClose}>
              <ModalClose />
            </button>
          </div>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyColumn}>
            {/* {isLoading ? (
              ""
            ) : (
              <LetterModalSkeleton useType="modal" name="top" />
            )} */}

            {isLoading ? (
              <LetterModalSkeleton useType="modal" name="top" />
            ) : (
              <DetailTop
                data={data}
                useType="modal"
                currentUser={currentUser}
              />
            )}

            {/* {isLoading ? (
              ""
            ) : (
              <LetterModalSkeleton useType="modal" name="buttons" />
            )} */}

            {isLoading ? (
              <LetterModalSkeleton useType="modal" name="buttons" />
            ) : (
              <DetailButtons
                useType="modal"
                dropdownMenus={menus}
                buttonRef={buttonRef}
                onDropdownToogle={() => setOpen((v) => !v)}
                openState={open}
                onClose={() => setOpen(false)}
                onSelect={handleSelect}
              />
            )}

            <div
              className={`${styles.whiteDimmed} ${open ? styles.active : ""}`}
            >
              {/* {isLoading ? (
                ""
              ) : (
                <LetterModalSkeleton useType="modal" name="content" />
              )} */}

              {isLoading ? (
                <LetterModalSkeleton useType="modal" name="content" />
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
