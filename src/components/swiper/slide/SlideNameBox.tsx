import styles from "./slideNameBox.module.css";

type Props = {
  title: string;
  desc: string;
};

export default function SlideNameBox({ title, desc }: Props) {
  return (
    <div className={styles.slideBox}>
      <p className={styles.slideTitle}>{title}</p>
      <p className={styles.slideDesc}>{desc}</p>
    </div>
  );
}
