"use client";

import FullDetail from "@/clientPage/FullDetail";
import LetterCard from "@/components/page/sub/letterCard/LetterCard";

export default function DetailClient({ letter, currentUser }: any) {
  const isMyLetter = currentUser.id === letter.user_id;

  return (
    <FullDetail
      data={letter}
      currentUser={currentUser}
      isMyLetter={isMyLetter}
      isLoggedIn
    >
      <LetterCard useType="detail" isEllipsis={false} item={letter} />
    </FullDetail>
  );
}
