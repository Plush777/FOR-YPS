"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

import Portal from "@/components/common/portal/Portal";
import { LetterModal } from "@/components/page/sub/letterModal/LetterModal";
import LetterCard from "@/components/page/sub/letterCard/LetterCard";
import { useAuth } from "@/contexts/AuthContext";

export default function LetterModalPage() {
  const router = useRouter();
  const params = useParams();
  const { user: currentUser } = useAuth();

  const [letter, setLetter] = useState<any>(null);

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

  // console.log(letter);
  // console.log(currentUser);

  const isMyLetter =
    !!currentUser?.id && !!letter?.user_id && currentUser.id === letter.user_id;

  return (
    <Portal>
      <LetterModal
        data={letter}
        isMyLetter={isMyLetter}
        onClose={() => router.back()}
      >
        <LetterCard useType="modal" isEllipsis={false} item={letter} />
      </LetterModal>
    </Portal>
  );
}
