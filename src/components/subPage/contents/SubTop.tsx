import styles from "@/components/subPage/contents/subTop.module.css";
import ArrowLeft from "@/components/svg/ArrowLeft";
import { useRouter } from "@/i18n/routing";
import { ReactNode } from "react";

interface Props {
  rightComponent?: ReactNode;
}

export default function SubTop({ rightComponent }: Props) {
  const router = useRouter();

  return (
    <div className={`${styles.subTop} ${rightComponent ? styles.between : ""}`}>
      <button
        type="button"
        className={styles.subTopButton}
        onClick={() => router.back()}
      >
        <ArrowLeft />
        <span className="hidden">돌아가기</span>
      </button>

      {rightComponent}
    </div>
  );
}
