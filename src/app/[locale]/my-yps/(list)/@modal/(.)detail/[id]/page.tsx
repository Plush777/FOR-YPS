"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import Portal from "@/components/portal/Portal";
import { LetterModal } from "@/components/letterModal/LetterModal";
import LetterCard from "@/components/letterCard/LetterCard";

export default function LetterModalPage() {
  const router = useRouter();
  const params = useParams();
  const [letter, setLetter] = useState<any>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // ✅ 처음에 모달은 뜨되, 데이터만 지연 로딩
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLetter = async () => {
      const { data } = await supabase
        .from("letters")
        .select("id, username, content, created_at")
        .eq("id", params.id)
        .single();
      setLetter(data);
      setLoading(false);
    };

    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setCurrentUser({
          avatar_url: user.user_metadata.avatar_url,
          name: user.user_metadata.name,
        });
      }
    };

    fetchUser();
    fetchLetter();
  }, [params.id]);

  return (
    <Portal>
      <LetterModal
        currentUser={currentUser}
        data={letter}
        onClose={() => router.back()}
      >
        <LetterCard useType="modal" isEllipsis={false} item={letter} />
      </LetterModal>
    </Portal>
  );
}
