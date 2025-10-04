import { ReactNode } from "react";
import styles from "./sectionInner.module.css";

type Props = {
  children: ReactNode;
};

export default function SectionInner({ children }: Props) {
  return <div className={styles.sectionInner}>{children}</div>;
}
