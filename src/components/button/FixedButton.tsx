import styles from "@/components/button/fixedButton.module.css";
import Pencil from "@/components/svg/Pencil";

interface Props {
  type: string;
}

export default function FixedButton({ type }: Props) {
  return (
    <div className={styles.fixedButtonWrap}>
      {type === "write" && (
        <button type="button" className={styles.fixedButton}>
          <span className="hidden">작성하기</span>
          <Pencil />
        </button>
      )}
    </div>
  );
}
