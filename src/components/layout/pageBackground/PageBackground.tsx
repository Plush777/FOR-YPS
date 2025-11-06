import styles from "@/components/layout/pageBackground/pageBackground.module.css";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  styleType?: string;
}

export default function PageBackground({
  children,
  styleType = "main",
}: Props) {
  function styleTypeClassName() {
    if (styleType === "main") return styles.main;
    if (styleType === "sub") return styles.sub;
    if (styleType === "myyps") return styles.myyps;

    return undefined;
  }

  return (
    <div className={`${styles.pageBackground} ${styleTypeClassName()}`}>
      {children}
    </div>
  );
}
