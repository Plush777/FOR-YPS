import styles from "@/components/subPage/contents/contentsArea.module.css";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function ContentsArea({ children }: Props) {
  return <div className={styles.contentsArea}>{children}</div>;
}
