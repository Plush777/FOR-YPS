"use client";

import { useRouter } from "@/i18n/routing";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { LetterModal } from "@/components/letterModal/LetterModal";
import LetterCard from "@/components/letterCard/LetterCard";

export default function LetterModalPage() {
  const router = useRouter();
  const params = useParams(); // ✅ 클라이언트 훅 → await 불필요
  const [letter, setLetter] = useState<any>(null);

  useEffect(() => {
    const fetchLetter = async () => {
      const { data, error } = await supabase
        .from("letters")
        .select("id, username, content, created_at")
        .eq("id", params.id) // ✅ 바로 사용 가능
        .single();
      if (!error && data) setLetter(data);
    };
    fetchLetter();
  }, [params.id]);

  if (!letter) return null;

  return (
    <LetterModal data={letter} onClose={() => router.back()}>
      <LetterCard useType="modal" isEllipsis={false} item={letter} />
    </LetterModal>
  );
}
