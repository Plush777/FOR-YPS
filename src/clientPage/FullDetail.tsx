"use client";

import { useRouter } from "@/i18n/routing";
import HeartCanvas from "@/components/canvas/HeartCanvas";
import LetterCard from "@/components/letterCard/LetterCard";

export default function FullDetail({ letter }: any) {
  const router = useRouter();

  return (
    <div>
      {/* 배경 하트 애니메이션 */}
      <HeartCanvas hMin={360} hMax={360} bgColor="transparent" count={40} />

      {/* 뒤로가기 */}
      <button onClick={() => router.back()}>← 돌아가기</button>

      {/* 본문 */}
      <div>
        <LetterCard isEllipsis={false} item={letter} />
      </div>

      {/* 메타 정보 */}
      <div>
        <span>By {letter.username}</span>
        <span>
          {new Date(letter.created_at).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
