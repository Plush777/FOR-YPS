"use client";

import styles from "@/components/modal/confirm/confirm.module.css";
import Button from "@/components/button/base/Button";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Confirm({
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.message}>{message}</p>
        <div className={styles.buttons}>
          <Button
            size="md"
            onlyIcon={false}
            color="gray"
            text="취소"
            onClick={onCancel}
          />
          <Button
            size="md"
            onlyIcon={false}
            color="red"
            text="확인"
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
}
