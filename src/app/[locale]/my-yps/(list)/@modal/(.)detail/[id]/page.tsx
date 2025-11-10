"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import Portal from "@/components/common/portal/Portal";
import { LetterModal } from "@/components/page/sub/letterModal/LetterModal";
import LetterCard from "@/components/page/sub/letterCard/LetterCard";
import { useGetMyProfile } from "@/hooks/feature/profile/useGetMyProfile";
import { useAuthorProfile } from "@/hooks/feature/auth/useAuthorProfile";

export default function LetterModalPage() {
  const router = useRouter();
  const params = useParams();
  const { user: currentUser } = useGetMyProfile();

  const [letter, setLetter] = useState<any>(null);

  const author = useAuthorProfile(letter?.user_id);

  useEffect(() => {
    async function fetchLetter() {
      const { data } = await supabase
        .from("letters")
        .select("id, username, user_id, content, created_at")
        .eq("id", params.id)
        .single();
      setLetter(data);
    }
    fetchLetter();
  }, [params.id]);

  const isMyLetter =
    currentUser?.id && letter?.user_id && currentUser.id === letter.user_id;

  const avatarCondition = isMyLetter
    ? currentUser?.avatar_url // 내가 쓴 글이면 내 프로필
    : author?.avatar_url; // 남의 글이면 작성자 프로필

  console.log(letter);

  console.log(avatarCondition);

  return (
    <Portal>
      <LetterModal
        currentUser={currentUser}
        data={letter}
        isMyLetter={isMyLetter}
        onClose={() => router.back()}
        avatarCondition={avatarCondition ?? ""}
      >
        <LetterCard useType="modal" isEllipsis={false} item={letter} />
      </LetterModal>
    </Portal>
  );
}
