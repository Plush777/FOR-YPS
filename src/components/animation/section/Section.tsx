import { ReactNode } from "react";
import styles from "./section.module.css";
import { RefObject } from "react";

type Props = {
  children: ReactNode;
  dataSpeed?: string;
  sectionName: string;
  gsapClassName: string;
};

export default function Section({
  children,
  dataSpeed = "1.5",
  sectionName = "",
  gsapClassName = "",
}: Props) {
  return (
    <section
      data-speed={dataSpeed}
      className={`${styles.section} section ${styles[sectionName]} ${gsapClassName}`}
    >
      {children}
    </section>
  );
}
