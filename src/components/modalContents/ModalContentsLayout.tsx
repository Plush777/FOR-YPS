import modalStyles from "@/components/modal/modal.module.css";
import { ReactNode } from "react";
import Button from "@/components/button/Button";
import ModalClose from "@/components/svg/ModalClose";
import { MotionModalHeader } from "../modal/modalHeader/ModalHeader";

interface Props {
  onClose: () => void;
  title?: any;
  children: ReactNode;
}

export default function ModalContentsLayout({
  onClose,
  title,
  children,
}: Props) {
  return (
    <div className={modalStyles.motionDivInner}>
      <MotionModalHeader title={title}>
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
      </MotionModalHeader>
      <div className={modalStyles.motionDivBody}>{children}</div>
    </div>
  );
}
