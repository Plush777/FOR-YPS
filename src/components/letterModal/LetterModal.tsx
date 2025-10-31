"use client";

import React, { ReactNode, useRef, useState } from "react";
import { useTranslations } from "next-intl";

import styles from "@/components/letterModal/letterModal.module.css";
import ModalClose from "@/components/svg/ModalClose";
import DotMore from "@/components/svg/DotMore";
import MenuDropDown from "@/components/menuDropdown/MenuDropDown";
import Share from "@/components/svg/Share";
import DetailTop from "@/components/subPage/detail/DetailTop";
import DetailButtons from "@/components/subPage/detail/DetailButtons";

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

  function handleSelect() {
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
            <DetailTop data={data} useType="modal" />

            <DetailButtons
              useType="modal"
              dropdownMenus={menus}
              buttonRef={buttonRef}
              onDropdownToogle={() => setOpen((v) => !v)}
              openState={open}
              onClose={() => setOpen(false)}
              onSelect={handleSelect}
            />

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
