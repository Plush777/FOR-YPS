import styles from "@/components/layout/inner/inner.module.css";

type Props = {
  type: "common" | "onlyTop" | "wide";
  children: React.ReactNode;
};

export default function Inner({ type, children }: Props) {
  function getInnerStyle() {
    if (type === "common") return styles.inner;
    if (type === "onlyTop") return `${styles.inner} ${styles.onlyTopInner}`;
    if (type === "wide") return `${styles.inner} ${styles.wide}`;
  }

  return <div className={getInnerStyle()}>{children}</div>;
}
