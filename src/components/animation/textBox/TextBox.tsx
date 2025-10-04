import styles from "./textBox.module.css";

export default function TextBox({ children }: Props) {
  return <div className={styles.textBox}>{children}</div>;
}

type Props = {
  children: React.ReactNode;
};
