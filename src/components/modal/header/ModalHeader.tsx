import letterModalStyles from "@/components/page/sub/letterModal/letterModal.module.css";
import modalStyles from "@/components/modal/base/modal.module.css";

import { ReactNode } from "react";

type letterModalHeaderProps = {
  children: ReactNode;
};

type motionModalHeaderProps = {
  children: ReactNode;
  title: string;
};

function LetterModalHeader({ children }: letterModalHeaderProps) {
  return (
    <header className={letterModalStyles.modalHeader}>
      <div className={letterModalStyles.modalHeaderButtonGroup}>{children}</div>
    </header>
  );
}

function MotionModalHeader({ children, title }: motionModalHeaderProps) {
  return (
    <header className={modalStyles.motionDivHead}>
      <strong className={modalStyles.motionDivTitle}>{title}</strong>

      {children}
    </header>
  );
}

export { LetterModalHeader, MotionModalHeader };
