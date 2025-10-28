"use client";

import React, { ReactNode } from "react";
import styles from "@/components/letterModal/letterModal.module.css";
import ModalClose from "@/components/svg/ModalClose";
import DotMore from "@/components/svg/DotMore";

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
  function widthStyleCondition() {
    if (width === "large") return styles.widthLarge;
    if (width === "default") return styles.widthDefault;
    if (width === "small") return styles.widthSmall;

    return undefined;
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
                <DotMore />
              </button>
            </div>

            {children}
          </div>
        </div>
      </section>
    </div>
  );
}
