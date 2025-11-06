import styles from "@/components/layout/skeleton/base/skeleton.module.css";

interface Props {
  length?: number;
  rotate?: string[];
}

export default function Skeleton({ length = 9, rotate = [] }: Props) {
  return (
    <ul className={styles.list}>
      {Array.from({ length }).map((_, i) => (
        <li key={i} className={styles.item}>
          <div
            className={styles.inner}
            style={{
              transform: `rotate(${rotate[i % rotate.length]})`,
            }}
          ></div>
        </li>
      ))}
    </ul>
  );
}
