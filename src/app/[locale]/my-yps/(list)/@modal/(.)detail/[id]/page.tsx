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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLetter = async () => {
      const { data } = await supabase
        .from("letters")
        .select("id, username, user_id, avatar_url, content, created_at")
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
          id: user.id,
          avatar_url: user.user_metadata.avatar_url,
          name: user.user_metadata.name,
        });
      }
    };

    fetchUser();
    fetchLetter();
  }, [params.id]);

  const isMyLetter =
    currentUser?.id && letter?.user_id && currentUser.id === letter.user_id;

  return (
    <Portal>
      <LetterModal
        currentUser={currentUser}
        data={letter}
        isMyLetter={isMyLetter}
        onClose={() => router.back()}
      >
        <LetterCard useType="modal" isEllipsis={false} item={letter} />
      </LetterModal>
    </Portal>
  );
}
