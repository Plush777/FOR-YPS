import styles from "@/components/subPage/layoutContents/myYpsContents.module.css";

export default function MyYpsContents() {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <p className={styles.text}>여기에 편지 내용이 들어갑니다</p>
          </li>
          <li className={styles.item}>
            <p className={styles.text}>여기에 편지 내용이 들어갑니다</p>
          </li>
          <li className={styles.item}>
            <p className={styles.text}>여기에 편지 내용이 들어갑니다</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
