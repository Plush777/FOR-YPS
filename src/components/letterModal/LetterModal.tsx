"use client";

import React, { ReactNode } from "react";
import styles from "@/components/letterModal/letterModal.module.css";
import ModalClose from "@/components/svg/ModalClose";

interface Props {
  children: ReactNode;
  onClose: () => void;
  data: {
    username: string;
    created_at: string;
  };
}

export function LetterModal({ children, onClose, data }: Props) {
  return (
    <div className={styles.overlay}>
      <section className={styles.modal}>
        <header className={styles.modalHeader}>
          <div className={styles.modalHeaderButtonGroup}>
            <button className={styles.close} onClick={onClose}>
              <ModalClose />
            </button>
          </div>
        </header>

        <div className={styles.modalBody}>
          <div className={styles.modalBodyColumn}>
            {data.username && (
              <strong className={styles.username}>
                {data.username}&nbsp;님의 편지
              </strong>
            )}
            <div className={styles.modalBodyInCard}>{children}</div>
            <div className={styles.modalBodyBottom}>
              {/* 왼쪽 아이템이 생겼을 때를 대비 */}
              <div></div>
              <span className={styles.modalBodyBottomDate}>
                {new Date(data.created_at).toLocaleString("ko-KR", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
