"use client";

import FullDetail from "@/clientPage/FullDetail";
import LetterCard from "@/components/page/sub/letterCard/LetterCard";

export default function DetailClient({ letter, currentUser }: any) {
  const isLoggedIn = !!currentUser;
  const isMyLetter = isLoggedIn && currentUser.id === letter.user_id;

  return (
    <FullDetail
      data={letter}
      currentUser={currentUser} // null 가능
      isMyLetter={isMyLetter}
      isLoggedIn={isLoggedIn}
    >
      <LetterCard useType="detail" isEllipsis={false} item={letter} />
    </FullDetail>
  );
}
