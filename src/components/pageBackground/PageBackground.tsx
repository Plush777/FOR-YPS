import styles from "@/components/pageBackground/pageBackground.module.css";
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

    return undefined;
  }

  return (
    <main className={`${styles.pageBackground} ${styleTypeClassName()}`}>
      {children}
    </main>
  );
}
