import styles from "@/components/page/sub/contents/subContentsLayout.module.css";
import type { ReactNode } from "react";

interface Props {
  title?: string;
  description?: any;
  children: ReactNode;
}

export default function SubContentsLayout({ children }: Props) {
  return (
    <div className={styles.inner}>
      <section className={styles.contents}>
        <div className={styles.contentsInner}>{children}</div>
      </section>
    </div>
  );
}
