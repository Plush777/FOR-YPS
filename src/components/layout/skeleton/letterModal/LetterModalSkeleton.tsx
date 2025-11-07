import styles from "@/components/layout/skeleton/letterModal/letterModalSkeleton.module.css";

type UseType = "modal" | "detail";

function useTypeClass(useType?: UseType) {
  if (useType === "modal") return styles.modalType;
  if (useType === "detail") return styles.detailType;
  return "";
}

export function LetterModalSkeletonHeader() {
  return (
    <header className={styles.modalHeader}>
      <div className={styles.modalHeaderButtonGroup}>
        <div className={styles.modalHeaderButton}></div>
      </div>
    </header>
  );
}

export function LetterModalSkeletonTop({ useType }: { useType: UseType }) {
  return (
    <div className={`${styles.bodyTop} ${useTypeClass(useType)}`}>
      <div className={styles.bodyTopTitleArea}>
        <div className={styles.bodyTopImg}></div>
        <div className={styles.bodyTopUsername}></div>
      </div>
      <div className={styles.bodyTopDate}></div>
    </div>
  );
}

export function LetterModalSkeletonButtons({ useType }: { useType: UseType }) {
  return (
    <div className={`${styles.buttonsWrap} ${useTypeClass(useType)}`}>
      <div className={styles.buttonsWrapButton}></div>
      <div className={styles.buttonsWrapButton}></div>
    </div>
  );
}

export function LetterModalSkeletonContent({ useType }: { useType: UseType }) {
  return (
    <div className={`${styles.contentItem} ${useTypeClass(useType)}`}>
      <div className={styles.contentLetterInner}>
        <div className={styles.contentText}></div>
        <div className={styles.contentText}></div>
        <div className={styles.contentText}></div>
      </div>
    </div>
  );
}
