import styles from "@/components/button/buttonGroup/buttonGroup.module.css";
import { ReactNode } from "react";

type ButtonGroupProps = {
  children: ReactNode;
};

export function ButtonGroup({ children }: ButtonGroupProps) {
  return <div className={styles.buttonGroup}>{children}</div>;
}
