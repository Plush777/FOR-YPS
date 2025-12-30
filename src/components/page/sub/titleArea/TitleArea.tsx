import styles from "@/components/page/sub/titleArea/titleArea.module.css";

interface Props {
  title: string;
}

export default function TitleArea({ title }: Props) {
  return (
    <div className={styles.titleArea}>
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
}
