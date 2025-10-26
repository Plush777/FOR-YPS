import modalStyles from "@/components/modal/modal.module.css";
import styles from "@/components/nurui/video-modal/video-modal.module.css";
import { motion } from "motion/react";
import { XIcon } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function ModalContentsLayout({
  onClose,
  title,
  children,
}: Props) {
  return (
    <div className={modalStyles.motionDivInner}>
      <div className={modalStyles.motionDivHead}>
        <strong className={modalStyles.motionDivTitle}>{title}</strong>
        <motion.button
          className={`${styles.motionTransitionDivInButton} ${modalStyles.closeButton}`}
          onClick={onClose}
        >
          <XIcon className={styles.xIcon} />
        </motion.button>
      </div>

      <div className={modalStyles.motionDivBody}>{children}</div>
    </div>
  );
}
