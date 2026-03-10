import styles from "@/components/layout/inner/inner.module.css";

export default function Inner({ children }: { children: React.ReactNode }) {
  return <div className={styles.inner}>{children}</div>;
}
