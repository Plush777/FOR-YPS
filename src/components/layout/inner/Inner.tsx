import styles from "@/components/layout/inner/inner.module.css";

type Props = {
  children: React.ReactNode;
};

export default function Inner({ children }: Props) {
  return <div className={styles.inner}>{children}</div>;
}
