"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import styles from "@/components/nurui/video-modal/video-modal.module.css";
import modalStyles from "@/components/modal/modal.module.css";
import Portal from "@/components/portal/Portal";
import FixedButton from "@/components/button/FixedButton";
import { useTranslations } from "next-intl";

import AuthArea from "@/components/auth/AuthArea";
import ModalContentsLayout from "@/components/modalContents/ModalContentsLayout";
import ModalMyypsContents from "@/components/modalContents/ModalMyypsContents";
import AuthContents from "@/components/modalContents/AuthContents";
import { supabase } from "@/lib/supabaseClient";

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
  onSubmitMyYps?: (message: string) => Promise<void> | void;
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
  onSubmitMyYps,
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(useType === "fixedButton");
  const [authUser, setAuthUser] = useState<{
    name?: string | null;
    email?: string | null;
  } | null>(null);
  const selectedAnimation = animationVariants[animationStyle];
  const tLetterPopup = useTranslations("subPage.myYps.letterPopup");
  const tAuthPopup = useTranslations("auth.authPopup");

  useEffect(() => {
    if (useType !== "fixedButton") return;

    let isMounted = true;

    async function fetchUser() {
      try {
        const { data } = await supabase.auth.getUser();
        if (!isMounted) return;

        const user = data.user
          ? {
              name: data.user.user_metadata?.name ?? data.user.email,
              email: data.user.email,
            }
          : null;

        setAuthUser(user);
      } finally {
        if (isMounted) {
          setIsAuthLoading(false);
        }
      }
    }

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!isMounted) return;

        if (session?.user) {
          setAuthUser({
            name: session.user.user_metadata?.name ?? session.user.email,
            email: session.user.email,
          });
        } else {
          setAuthUser(null);
        }
        setIsAuthLoading(false);
      }
    );

    return () => {
      isMounted = false;
      listener?.subscription.unsubscribe();
    };
  }, [useType]);

  const handleFixedButtonClick = () => {
    if (useType !== "fixedButton") return;
    if (isAuthLoading) return;

    if (!authUser) {
      alert(tLetterPopup("loginRequired"));
      return;
    }

    setIsVideoOpen(true);
  };

  const handleMyYpsSubmit = async (message: string) => {
    if (!onSubmitMyYps) return;

    try {
      await Promise.resolve(onSubmitMyYps(message));
      setIsVideoOpen(false);
    } catch (error) {
      console.error("Failed to submit message:", error);
    }
  };

  function clickContentsCondition() {
    if (useType === "fixedButton") {
      if (isAuthLoading) return null; // 로딩 중일 때 아무것도 표시하지 않음

      return <FixedButton onClickModal={handleFixedButtonClick} type="write" />;
    }

    if (useType === "auth") {
      return <AuthArea onClickModal={() => setIsVideoOpen(true)} />;
    }
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
          <ModalMyypsContents
            username={authUser?.name ?? authUser?.email ?? ""}
            placeholder={tLetterPopup("placeholder")}
            buttonText={tLetterPopup("submit")}
            onSubmit={handleMyYpsSubmit}
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
    <div className={`${styles.wrap} ${modalStyles.stickyWrap}`}>
      <div className={`${styles.inner} ${modalStyles.inner}`}>
        {clickContentsCondition()}
      </div>

      <Portal>
        <AnimatePresence>
          {isVideoOpen && (
            <motion.div
              key={useType}
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
