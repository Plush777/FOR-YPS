import styles from "@/components/form/textCounter/textCounter.module.css";

type Props = {
  value: string;
  username?: string;
  maxLength: number;
};

export default function TextCounter({ value, username, maxLength }: Props) {
  return (
    <div
      className={`
          ${styles.motionTextareaInfo} 
          ${!username ? styles.end : styles.between}
          ${!username ? styles.upDownMargin : styles.topMargin}
        `}
    >
      {username && (
        <div className={styles.fromArea}>
          <span className={styles.fromText}>from</span>
          <span className={styles.fromName}>{username}</span>
        </div>
      )}

      <div
        className={`
            ${styles.textareaCounter} 
            ${!username ? styles.colorBlack : styles.colorGray}
          `}
      >
        {value?.length} / {maxLength}
      </div>
    </div>
  );
}
