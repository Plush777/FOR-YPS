"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import styles from "@/components/nurui/video-modal/video-modal.module.css";
import modalStyles from "@/components/modal/modal.module.css";
import Portal from "@/components/portal/Portal";
import FixedButton from "@/components/button/FixedButton";
import { useTranslations } from "next-intl";

import AuthArea from "@/components/auth/AuthArea";
import ModalContentsLayout from "@/components/modalContents/ModalContentsLayout";
import MyypsContents from "@/components/modalContents/MyypsContents";
import AuthContents from "@/components/modalContents/AuthContents";
import { Link } from "@/i18n/routing";

type AnimationStyle =
  | "from-bottom"
  | "from-center"
  | "from-top"
  | "from-left"
  | "from-right"
  | "fade"
  | "top-in-bottom-out"
  | "left-in-right-out";

interface HeroVideoProps {
  animationStyle?: AnimationStyle;
  useType: string;
}

const animationVariants = {
  "from-bottom": {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "from-center": {
    initial: { scale: 0.5, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.5, opacity: 0 },
  },
  "from-top": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "-100%", opacity: 0 },
  },
  "from-left": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  },
  "from-right": {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  "top-in-bottom-out": {
    initial: { y: "-100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
  },
  "left-in-right-out": {
    initial: { x: "-100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  },
};

export function Modal({
  animationStyle = "from-center",
  useType,
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const selectedAnimation = animationVariants[animationStyle];
  const tLetterPopup = useTranslations("subPage.myYps.letterPopup");
  const tAuthPopup = useTranslations("auth.authPopup");

  function clickContentsCondition() {
    if (useType === "fixedButton") return <FixedButton type="write" />;
    if (useType === "auth")
      return <AuthArea onClickModal={() => setIsVideoOpen(true)} />;
  }

  function modalStylesCondition() {
    if (useType === "fixedButton") return modalStyles.myypsModalStyle;
    if (useType === "auth") return modalStyles.authModalStyle;
  }

  function innerContentsCondition() {
    if (useType === "fixedButton")
      return (
        <ModalContentsLayout
          onClose={() => setIsVideoOpen(false)}
          title={tLetterPopup("title")}
        >
          <MyypsContents
            username="test"
            placeholder={tLetterPopup("placeholder")}
            buttonText={tLetterPopup("submit")}
          />
        </ModalContentsLayout>
      );
    if (useType === "auth")
      return (
        <ModalContentsLayout
          onClose={() => setIsVideoOpen(false)}
          title={tAuthPopup("title")}
        >
          <AuthContents
            description={tAuthPopup.rich("description", {
              br: () => <br />,
            })}
            smallDescription={tAuthPopup.rich("smallDescription", {
              underline: (chunks) => (
                <a href="/privacy" target="_blank" className="underline">
                  {chunks}
                </a>
              ),
              br: () => <br />,
            })}
          />
        </ModalContentsLayout>
      );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>{clickContentsCondition()}</div>

      <Portal>
        <AnimatePresence>
          {isVideoOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={styles.motionDiv}
            >
              <motion.div
                {...selectedAnimation}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className={`
                  ${styles.motionTransitionDiv} ${modalStylesCondition()}
                `}
              >
                {innerContentsCondition()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </div>
  );
}
