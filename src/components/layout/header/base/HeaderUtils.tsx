import LocaleDropdown from "@/components/form/LocaleDropdown/LocaleDropdown";
import { Responsive } from "@/components/mobile/responsive/Responsive";
import styles from "@/components/layout/header/base/header.module.css";

export default function HeaderUtils() {
  return (
    <Responsive useType="min768">
      <div className={styles.headerUtils}>
        <LocaleDropdown useType="header" />
      </div>
    </Responsive>
  );
}
