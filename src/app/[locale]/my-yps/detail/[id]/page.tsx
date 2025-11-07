"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import LetterCard from "@/components/page/sub/letterCard/LetterCard";
import FullDetail from "@/clientPage/FullDetail";

import { useGetMyProfile } from "@/hooks/feature/profile/useGetMyProfile";

export default function DetailPage() {
  const params = useParams();
  const { user: currentUser } = useGetMyProfile();

  const [letter, setLetter] = useState<any>(null);

  useEffect(() => {
    const fetchLetter = async () => {
      const { data } = await supabase
        .from("letters")
        .select("id, username, user_id, avatar_url, content, created_at")
        .eq("id", params.id)
        .single();
      setLetter(data);
    };

    fetchLetter();
  }, [params.id]);

  const isMyLetter =
    currentUser?.id && letter?.user_id && currentUser.id === letter.user_id;

  return (
    <FullDetail
      data={letter}
      currentUser={currentUser}
      isMyLetter={isMyLetter}
      isLoggedIn={!!currentUser}
    >
      <LetterCard useType="detail" isEllipsis={false} item={letter} />
    </FullDetail>
  );
}
