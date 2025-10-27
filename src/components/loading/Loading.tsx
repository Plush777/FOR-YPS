import styles from "@/components/loading/loading.module.css";

interface Props {
  type: string;
}

export default function Loading({ type }: Props) {
  function textCondition() {
    if (type === "letter") return "불러오는중...";

    return undefined;
  }

  function styleCondition() {
    if (type === "letter") return styles.letterWrap;

    return undefined;
  }

  return (
    <div className={styleCondition()}>
      <p className={styles.text}>{textCondition()}</p>
    </div>
  );
}
