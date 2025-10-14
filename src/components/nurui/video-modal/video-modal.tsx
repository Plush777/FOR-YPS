"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, XIcon } from "lucide-react";
import Image from "next/image";

import styles from "./video-modal.module.css";
import Portal from "@/components/portal/Portal";

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
  videoSrc: string;
  thumbnailSrc: string;
  thumbnailAlt?: string;
  className?: string;
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

export function VideoModal({
  animationStyle = "from-center",
  videoSrc,
  thumbnailSrc,
  thumbnailAlt = "Video thumbnail",
}: HeroVideoProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const selectedAnimation = animationVariants[animationStyle];

  return (
    <div className={styles.wrap}>
      <div className={styles.inner} onClick={() => setIsVideoOpen(true)}>
        <Image
          src={thumbnailSrc}
          alt={thumbnailAlt}
          className={styles.image}
          height={0}
          width={0}
          unoptimized
          priority={true}
        />
        <div className={styles.absoluteBox}>
          <div className={styles.blurBox}>
            <div className={styles.hasPlayBox}>
              <Play
                className={styles.playSvg}
                style={{
                  filter:
                    "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <Portal>
        <AnimatePresence>
          {isVideoOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setIsVideoOpen(false)}
              exit={{ opacity: 0 }}
              className={styles.motionDiv}
            >
              <motion.div
                {...selectedAnimation}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className={styles.motionTransitionDiv}
              >
                <motion.button className={styles.motionTransitionDivInButton}>
                  <XIcon className={styles.xIcon} />
                </motion.button>
                <div className={styles.hasIframe}>
                  <iframe
                    src={videoSrc}
                    className={styles.iframe}
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  ></iframe>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Portal>
    </div>
  );
}
