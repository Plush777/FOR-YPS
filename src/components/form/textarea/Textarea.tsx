import styles from "@/components/form/textarea/textarea.module.css";
import type { ChangeEvent } from "react";

interface Props {
  placeholder?: string;
  maxLength?: number;
  value?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({
  placeholder,
  maxLength,
  value,
  onChange,
}: Props) {
  return (
    <textarea
      className={styles.textarea}
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
    ></textarea>
  );
}
