import type { Letter } from "@/types/letter";
import { Link } from "@/i18n/routing";

import styles from "@/components/subPage/layoutContents/myYpsContents.module.css";
import EmptyLetter from "@/components/subPage/letters/EmptyLetter";
import Skeleton from "@/components/skeleton/Skeleton";
import LetterCard from "@/components/letterCard/LetterCard";
import LoadMoreButton from "@/components/loadMoreButton/LoadMoreButton";
import FixedImage from "@/components/subPage/letters/FixedImage";
import HeartCanvas from "@/components/canvas/HeartCanvas";

interface Props {
  items: Letter[];
  isInitialLoading: boolean; // ✅ 초기 로딩 전용
  isLoadMoreLoading: boolean; // ✅ 더보기 로딩 전용
  onLoadMore: () => void;
  showAllLoadedNotice: boolean; // ✅ 클릭 후 더 이상 없을 때만 true
}

export default function MyYpsContents({
  items,
  isInitialLoading,
  isLoadMoreLoading,
  onLoadMore,
  showAllLoadedNotice,
}: Props) {
  const hasItems = items.length > 0;
  const rotateArray = ["5deg", "-22deg", "15deg", "-14deg", "24deg", "-11deg"];

  return (
    <>
      <HeartCanvas hMin={360} hMax={360} bgColor="transparent" count={40} />
      <div className={styles.wrap}>
        <div className={styles.inner}>
          <FixedImage
            src="/images/common/img-letter-fixed.png"
            alt="young posse"
          />

          {/* ✅ 초기 로딩 중 + 아직 데이터 없음 → 스켈레톤 */}
          {isInitialLoading ? (
            <Skeleton rotate={rotateArray} />
          ) : hasItems ? (
            <>
              <ul className={styles.list}>
                {items.map((item, i) => (
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
                ))}
              </ul>

              <LoadMoreButton
                showAllLoadedNotice={showAllLoadedNotice}
                onLoadMore={onLoadMore}
                isLoadMoreLoading={isLoadMoreLoading}
              />
            </>
          ) : (
            <EmptyLetter /> // ✅ 로딩이 끝났고 + 진짜 메시지 없을 때만 노출
          )}
        </div>
      </div>
    </>
  );
}
