"use client";

import type { Letter } from "@/types/letter";
import { Link } from "@/i18n/routing";
import dynamic from "next/dynamic";

import styles from "@/components/page/sub/layoutContents/myYps/myYpsContents.module.css";
import EmptyLetter from "@/components/page/sub/letters/EmptyLetter";
import Skeleton from "@/components/layout/skeleton/base/Skeleton";
import LetterCard from "@/components/page/sub/letterCard/LetterCard";
import LoadMoreButton from "@/components/button/loadMoreButton/LoadMoreButton";
import FixedImage from "@/components/page/sub/fixedImage/FixedImage";

interface Props {
  items: Letter[];
  isInitialLoading: boolean; // ✅ 초기 로딩 전용
  isLoadMoreLoading: boolean; // ✅ 더보기 로딩 전용
  onLoadMore: () => void;
  showAllLoadedNotice: boolean; // ✅ 클릭 후 더 이상 없을 때만 true
  isBackground?: boolean;
  hasMore?: boolean;
}

export default function MyYpsContents({
  items,
  isInitialLoading,
  isLoadMoreLoading,
  onLoadMore,
  showAllLoadedNotice,
  isBackground = true,
  hasMore,
}: Props) {
  const isNineItems = items.length > 9;
  const isItems = items.length < 0;
  const rotateArray = ["5deg", "-22deg", "15deg", "-14deg", "24deg", "-11deg"];
  const shouldShowLoadMore = items.length >= 9 && hasMore;

  const HeartCanvas = dynamic(
    () => import("@/components/page/sub/canvas/HeartCanvas"),
    { ssr: false },
  );

  return (
    <>
      {isBackground && (
        <HeartCanvas hMin={360} hMax={360} bgColor="transparent" count={40} />
      )}

      <div className={styles.wrap}>
        <div
          className={`
            ${styles.inner} 
            ${
              isBackground == true ? styles.innerBackground : styles.emptyInner
            }`}
        >
          {isBackground && (
            <FixedImage
              src="/images/common/img-letter-fixed.png"
              alt="young posse"
            />
          )}

          {/* 로딩 중일땐 스켈레톤 */}
          {isInitialLoading ? (
            <Skeleton rotate={rotateArray} />
          ) : hasItems ? (
            <>
              <ul className={styles.list}>
                {items.map((item, i) => (
                  <li key={item.id}>
                    <Link scroll={false} href={`/my-yps/detail/${item.id}`}>
                      <LetterCard
                        useType="cardList"
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

              {shouldShowLoadMore && (
                <LoadMoreButton
                  showAllLoadedNotice={showAllLoadedNotice}
                  onLoadMore={onLoadMore}
                  isLoadMoreLoading={isLoadMoreLoading}
                />
              )}
            </>
          ) : (
            <>
              {/* 
                로딩이 끝난 후, item이 0개면 EmptyLetter를 보여주고
                item이 0개 이상이면 펴지 리스트를 보여줌. 
              */}

              {isItems ? (
                <EmptyLetter />
              ) : (
                <ul className={styles.list}>
                  {items.map((item, i) => (
                    <li key={item.id}>
                      <Link scroll={false} href={`/my-yps/detail/${item.id}`}>
                        <LetterCard
                          useType="cardList"
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
              )}

              {/* item이 9개 이상이면 더보기 버튼 표출 */}
              {isNineItems && (
                <LoadMoreButton
                  showAllLoadedNotice={showAllLoadedNotice}
                  onLoadMore={onLoadMore}
                  isLoadMoreLoading={isLoadMoreLoading}
                  isBackground={isBackground}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
