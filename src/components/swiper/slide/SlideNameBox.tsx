import styles from "./slideNameBox.module.css";
import { ReactNode } from "react";

type Props = {
  title: string;
  desc: string;
  buttons?: ReactNode;
};

export default function SlideNameBox({ title, desc, buttons }: Props) {
  return (
    <div className={styles.slideBox}>
      <p className={styles.slideTitle}>{title}</p>
      <p className={styles.slideDesc}>{desc}</p>
      {buttons}
    </div>
  );
}
