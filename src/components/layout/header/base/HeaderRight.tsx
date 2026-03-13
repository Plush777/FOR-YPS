import styles from "@/components/layout/header/base/header.module.css";
import navData from "@/data/nav/nav.json";
import Nav from "@/components/layout/nav/Nav";
import { Modal } from "@/components/modal/base/Modal";
import { Responsive } from "@/components/mobile/responsive/Responsive";

export default function HeaderRight() {
  return (
    <div className={styles.headerRight}>
      <Responsive useType="min768">
        <Modal useType="auth" />
      </Responsive>

      <Responsive useType="min768">
        <Nav data={navData.navList} />
      </Responsive>

      <Responsive useType="max768">
        <Modal useType="auth" />
      </Responsive>
    </div>
  );
}
