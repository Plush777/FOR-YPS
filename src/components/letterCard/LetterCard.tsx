import styles from "@/components/subPage/layoutContents/myYpsContents.module.css";

interface Props {
  style?: React.CSSProperties;
  item: {
    content: string;
    username: string;
    created_at: string;
  };
  isEllipsis?: boolean;
}

export default function LetterCard({ style, item, isEllipsis = true }: Props) {
  return (
    <div className={`${styles.item} ${isEllipsis ? styles.hasEllipsis : ""}`}>
      <div className={styles.letterInner} style={style}>
        <p className={styles.text}>{item.content}</p>

        {isEllipsis && (
          <div className={styles.metaArea}>
            <span className={`${styles.username} ${styles.metaText}`}>
              By {item.username}
            </span>
            <span className={`${styles.date} ${styles.metaText}`}>
              {new Date(item.created_at).toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
