import styles from "@/components/page/sub/contents/contentsArea.module.css";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function ContentsArea({ children }: Props) {
  return <div className={styles.contentsArea}>{children}</div>;
}
