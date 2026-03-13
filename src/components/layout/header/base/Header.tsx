import styles from "@/components/layout/header/base/header.module.css";

import HeaderLeft from "@/components/layout/header/base/HeaderLeft";
import HeaderRight from "@/components/layout/header/base/HeaderRight";
import HeaderUtils from "@/components/layout/header/base/HeaderUtils";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.headerContents}>
          <HeaderLeft />
          <HeaderRight />
        </div>

        <HeaderUtils />
      </div>
    </header>
  );
}
