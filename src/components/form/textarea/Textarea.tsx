import styles from "@/components/form/textarea/textarea.module.css";
import type { ChangeEvent } from "react";

type FormProps = {
  placeholder?: string;
  maxLength?: number;
  value?: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

type StyleProps = {
  isBorder?: boolean;
};

export type TextareaProps = FormProps & StyleProps;

export default function Textarea({
  placeholder,
  maxLength,
  value,
  onChange,
  isBorder = false,
}: TextareaProps) {
  return (
    <textarea
      className={`${styles.textarea} ${isBorder && styles.border}`}
      placeholder={placeholder}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
    ></textarea>
  );
}
