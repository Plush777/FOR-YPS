import Textarea from "@/components/form/textarea/Textarea";
import styles from "@/components/form/textareaCounter/textareaCounter.module.css";
import type { ChangeEvent } from "react";

type BaseProps = {
  placeholder: string;
  maxLength: number;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

// isUsername = true ➜ username 필수
type UsernameProps = BaseProps & {
  isUsername: true;
  username: string;
};

// isUsername = false ➜ username 옵션
type NoUsernameProps = BaseProps & {
  isUsername: false;
  username?: string;
};

export type Props = UsernameProps | NoUsernameProps;

export default function TextareaCounter({
  placeholder,
  maxLength,
  value,
  username,
  isUsername,
  onChange,
}: Props) {
  return (
    <>
      <Textarea
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
      />

      <div
        className={`
          ${styles.motionTextareaInfo} 
          ${!isUsername ? styles.end : styles.between}
          ${!isUsername ? styles.upDownMargin : styles.topMargin}
        `}
      >
        {isUsername && (
          <div className={styles.fromArea}>
            <span className={styles.fromText}>from</span>
            <span className={styles.fromName}>{username}</span>
          </div>
        )}

        <div
          className={`
            ${styles.textareaCounter} 
            ${!isUsername ? styles.colorBlack : styles.colorGray}
          `}
        >
          {value?.length} / {maxLength}
        </div>
      </div>
    </>
  );
}
