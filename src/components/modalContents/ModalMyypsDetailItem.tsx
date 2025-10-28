import styles from "@/components/subPage/layoutContents/myYpsContents.module.css";

interface Props {
  data: {
    content: string;
    username: string;
    created_at: string;
  };
}

export default function ModalMyypsDetailItem({ data }: Props) {
  return (
    <div className={styles.item}>
      <div className={styles.letterInner}>
        <p className={styles.text}>{data.content}</p>

        <div className={styles.metaArea}>
          <span className={`${styles.username} ${styles.metaText}`}>
            By {data.username}
          </span>
          <span className={`${styles.date} ${styles.metaText}`}>
            {new Date(data.created_at).toLocaleString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
