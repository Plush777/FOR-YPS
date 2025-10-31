import styles from "@/components/subPage/layoutContents/myYpsContents.module.css";

interface Props {
  useType: string;
  style?: React.CSSProperties;
  item: {
    content: string;
    username: string;
    created_at: string;
  };
  isEllipsis?: boolean;
}

export default function LetterCard({
  useType,
  style,
  item,
  isEllipsis = true,
}: Props) {
  function cardSizeCondition() {
    if (useType === "detail") return styles.detailSize;
    if (useType === "cardList") return styles.cardListSize;
    if (useType === "modal") return styles.modalSize;

    return "";
  }

  return (
    <div className={`${styles.item} ${isEllipsis ? styles.hasEllipsis : ""}`}>
      <div
        className={`${styles.letterInner} ${cardSizeCondition()}`}
        style={style}
      >
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
