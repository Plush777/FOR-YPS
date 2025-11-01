"use client";

import styles from "@/components/letterModal/letterModalSkeleton.module.css";

interface Props {
  useType: "modal" | "detail";
  name: "top" | "content" | "buttons";
}

export default function LetterModalSkeleton({ name, useType }: Props) {
  function useTypeStyleCondition() {
    if (useType === "modal") return styles.modalType;
    if (useType === "detail") return styles.detailType;

    return "";
  }

  return (
    <>
      {name === "top" && (
        <div className={`${styles.bodyTop} ${useTypeStyleCondition()}`}>
          <div className={styles.bodyTopTitleArea}>
            <div className={styles.bodyTopImg}></div>

            <div className={styles.bodyTopUsername}></div>
          </div>

          <div className={styles.bodyTopDate}></div>
        </div>
      )}

      {name === "buttons" && (
        <div className={`${styles.buttonsWrap} ${useTypeStyleCondition()}`}>
          <div className={styles.buttonsWrapButton}></div>
          <div className={styles.buttonsWrapButton}></div>
        </div>
      )}

      {name === "content" && (
        <div className={`${styles.contentItem} ${useTypeStyleCondition()}`}>
          <div className={styles.contentLetterInner}>
            <div className={styles.contentText}></div>
            <div className={styles.contentText}></div>
            <div className={styles.contentText}></div>
          </div>
        </div>
      )}
    </>
  );
}
