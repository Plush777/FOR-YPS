import type { Letter } from "@/types/letter";
import styles from "@/components/subPage/layoutContents/myYpsContents.module.css";
import EmptyLetter from "@/components/subPage/letters/EmptyLetter";
import Skeleton from "@/components/skeleton/Skeleton";
import { Link } from "@/i18n/routing";
import LetterCard from "@/components/letterCard/LetterCard";

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
                <li key={item.id}>
                  <Link href={`/my-yps/detail/${item.id}`}>
                    <LetterCard
                      style={{
                        transform: `rotate(${
                          rotateArray[i % rotateArray.length]
                        })`,
                      }}
                      item={item}
                    />
                  </Link>
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
