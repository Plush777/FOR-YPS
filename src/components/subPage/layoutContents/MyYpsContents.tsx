import type { Letter } from "@/types/letter";
import styles from "@/components/subPage/layoutContents/myYpsContents.module.css";
import EmptyLetter from "@/components/subPage/letters/EmptyLetter";
import Skeleton from "@/components/skeleton/Skeleton";

interface Props {
  items: Letter[];
  isLoading: boolean;
}

export default function MyYpsContents({ items, isLoading }: Props) {
  const hasItems = items.length > 0;
  const rotateArray = ["5deg", "-22deg", "15deg", "-14deg", "24deg", "-11deg"];

  function renderItems() {
    return (
      <ul className={hasItems ? styles.list : styles.emptyList}>
        {hasItems ? (
          <>
            {items.map((item, i) => {
              return (
                <li className={styles.item} key={item.id}>
                  <div
                    className={styles.letterInner}
                    style={{
                      transform: `rotate(${
                        rotateArray[i % rotateArray.length]
                      })`,
                    }}
                  >
                    <p className={styles.text}>{item.content}</p>

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
                  </div>
                </li>
              );
            })}
          </>
        ) : (
          <EmptyLetter />
        )}
      </ul>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        {isLoading ? <Skeleton rotate={rotateArray} /> : renderItems()}
      </div>
    </div>
  );
}
