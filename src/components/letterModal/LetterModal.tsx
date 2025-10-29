"use client";

import React, { ReactNode, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import styles from "@/components/letterModal/letterModal.module.css";
import ModalClose from "@/components/svg/ModalClose";
import DotMore from "@/components/svg/DotMore";
import MenuDropDown from "@/components/menuDropdown/MenuDropDown";
import Share from "@/components/svg/Share";

interface Props {
  width?: string;
  children: ReactNode;
  onClose: () => void;
  data: {
    username: string;
    created_at: string;
  };
}

export function LetterModal({
  width = "default",
  children,
  onClose,
  data,
}: Props) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tModalMenu = useTranslations("auth.modalMenuDropdown");
  const menus = (tModalMenu.raw("menus") as string[]) || [];

  function widthStyleCondition() {
    if (width === "large") return styles.widthLarge;
    if (width === "default") return styles.widthDefault;
    if (width === "small") return styles.widthSmall;

    return undefined;
  }

  async function handleSelect(label: string) {
    // if (label === logoutLabel) {
    //   await logout();
    // }
    setOpen(false);
  }

  return (
    <div className={styles.overlay}>
      <section className={`${styles.modal} ${widthStyleCondition()}`}>
        <header className={styles.modalHeader}>
          <div className={styles.modalHeaderButtonGroup}>
            <button className={styles.close} onClick={onClose}>
              <ModalClose />
            </button>
          </div>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyColumn}>
            <div className={styles.modalBodyTop}>
              {data.username && (
                <strong className={styles.username}>
                  {data.username}&nbsp;님의 편지
                </strong>
              )}

              <span className={styles.modalDate}>
                {new Date(data.created_at).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </span>
            </div>

            <div className={styles.modalBodyButtons}>
              <button type="button" className={styles.modalBodyButton}>
                <Share />
              </button>
              <button
                type="button"
                ref={buttonRef}
                onClick={() => setOpen((v) => !v)}
                className={styles.modalBodyButton}
              >
                <DotMore />
              </button>

              {open && (
                <MenuDropDown
                  useType="letterModal"
                  items={menus}
                  onSelect={(label) => handleSelect(label)}
                  onClose={() => setOpen(false)}
                  triggerRef={buttonRef}
                />
              )}
            </div>

            <div
              className={`${styles.whiteDimmed} ${open ? styles.active : ""}`}
            >
              {children}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
