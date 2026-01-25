/* 서버 컴포넌트용 미디어쿼리 컴포넌트 */
import styles from "@/components/mobile/responsive/responsive.module.css";

type Props = {
  useType: "min768" | "max768";
  children: React.ReactNode;
};

export function Responsive({ useType, children }: Props) {
  return (
    <>
      {useType === "min768" && <div className={styles.min768}>{children}</div>}
      {useType === "max768" && <div className={styles.max768}>{children}</div>}
    </>
  );
}
