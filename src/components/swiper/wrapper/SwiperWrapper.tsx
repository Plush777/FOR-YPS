import { ReactNode } from "react";
import styles from "./swiperWrapper.module.css";

type Props = {
  className?: string;
  children: ReactNode;
};

export default function SwiperWrapper({ className, children }: Props) {
  return (
    <div className={`${styles.hasSwiperBox} ${className} hasSwiperBox`}>
      {children}
    </div>
  );
}
