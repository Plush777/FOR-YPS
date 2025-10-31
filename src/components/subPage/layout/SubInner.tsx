import styles from "@/components/subPage/layout/subInner.module.css";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  width?: string;
}

export default function SubInner({ children, width = "default" }: Props) {
  function widthStyleCondition() {
    if (width === "small") return styles.w768;
    if (width === "default") return styles.w968;
    if (width === "large") return styles.w1600;
  }

  return (
    <div className={`${styles.subInner} ${widthStyleCondition()}`}>
      {children}
    </div>
  );
}
