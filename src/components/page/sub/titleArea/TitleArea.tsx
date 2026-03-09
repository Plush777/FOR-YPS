import styles from "@/components/page/sub/titleArea/titleArea.module.css";

interface Props {
  title: string;
  desc?: string;
  gapName: string | undefined;
}

export default function TitleArea({ title, desc, gapName }: Props) {
  function getGap() {
    if (gapName === "myLetters") return styles.myLetters;
  }

  return (
    <div className={`${styles.titleArea} ${getGap()}`}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{desc}</p>
    </div>
  );
}
