import { ReactNode } from "react";
import styles from "@/components/page/main/base/main.module.css";

interface Props {
  children: ReactNode;
  background?: string;
}

export default function Main({ children, background }: Props) {
  function backgroundCondition() {
    if (background === "gray") return styles.gray;
  }

  return (
    <main className={backgroundCondition()} style={{ position: "relative" }}>
      <div
        id="main-bg-layer"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      {children}
    </main>
  );
}
