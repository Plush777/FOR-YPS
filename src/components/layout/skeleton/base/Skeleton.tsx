import styles from "@/components/layout/skeleton/base/skeleton.module.css";
import writeButtonStyles from "@/components/button/writeButton/writeButton.module.css";

interface Props {
  length?: number;
  rotate?: string[];
}

export function Skeleton({ length = 9, rotate = [] }: Props) {
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

export function WriteButtonSkeleton() {
  return (
    <div className={writeButtonStyles.writeButtonSkeletonWrapper}>
      <div className={writeButtonStyles.writeButtonSkeleton}></div>
    </div>
  );
}
