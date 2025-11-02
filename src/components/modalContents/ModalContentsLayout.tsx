import modalStyles from "@/components/modal/modal.module.css";
import styles from "@/components/nurui/video-modal/video-modal.module.css";
import { motion } from "motion/react";
import { XIcon } from "lucide-react";
import { ReactNode } from "react";
import Button from "@/components/button/Button";
import ModalClose from "@/components/svg/ModalClose";

interface Props {
  onClose: () => void;
  title?: string;
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

        <Button
          rounded="roundedMd"
          onlyIcon={true}
          iconSize="lg"
          color="transparent-gray"
          onClick={onClose}
          className={modalStyles.closeButton}
        >
          <ModalClose />
        </Button>
      </div>

      <div className={modalStyles.motionDivBody}>{children}</div>
    </div>
  );
}
