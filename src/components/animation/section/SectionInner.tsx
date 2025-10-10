import { ReactNode } from "react";
import styles from "./sectionInner.module.css";

type Props = {
  children: ReactNode;
  horizontal?: string;
  vertical?: string;
};

export default function SectionInner({
  children,
  horizontal = "start",
  vertical = "start",
}: Props) {
  function horizonAlign() {
    if (horizontal === "start") return "horizontalStart";
    if (horizontal === "center") return "horizontalCenter";
    if (horizontal === "end") return "horizontalEnd";
  }

  function verticalAlign() {
    if (vertical === "start") return "verticalStart";
    if (vertical === "center") return "verticalCenter";
    if (vertical === "end") return "verticalEnd";
  }

  return (
    <div
      className={`${styles.sectionInner} ${horizonAlign()} ${verticalAlign()}`}
    >
      {children}
    </div>
  );
}
