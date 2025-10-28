"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation"; // ✅ 현재 경로 확인용

import HeartCanvas from "@/components/canvas/HeartCanvas";
import { Modal } from "@/components/modal/Modal";
import { supabase } from "@/lib/supabaseClient";

import type { Letter } from "@/types/letter";

export default function Page() {
  const pathname = usePathname(); // ✅ ex) "/ko/my-yps" or "/ko/my-yps/detail/7"
  const isListPage = pathname.endsWith("/my-yps"); // ✅ 리스트 페이지 여부 감지

  const [messages, setMessages] = useState<Letter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ 메시지 불러오기
  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("letters")
      .select("id, username, content, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ 메시지 불러오기 실패:", error);
    } else {
      setMessages(data ?? []);
    }
    setIsLoading(false);
  }, []);

  // ✅ 리스트 페이지일 때만 메시지 불러오기
  useEffect(() => {
    if (isListPage) fetchMessages();
  }, [fetchMessages, isListPage]);

  // ✅ 메시지 등록
  const handleSubmitMessage = useCallback(
    async (message: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("로그인이 필요합니다.");
        return;
      }

      const username =
        user.user_metadata?.name || user.email?.split("@")[0] || "익명";

      const { error } = await supabase.from("letters").insert({
        user_id: user.id,
        username,
        content: message,
      });

      if (error) {
        console.error("❌ 메시지 저장 실패:", error);
        alert("메시지 저장 중 오류가 발생했습니다.");
        return;
      }

      // ✅ 리스트일 때만 새로고침
      if (isListPage) await fetchMessages();
    },
    [fetchMessages, isListPage]
  );

  return (
    <>
      {/* ✅ 리스트 페이지일 때만 카드 작성 Modal 버튼 노출 */}
      {isListPage && (
        <>
          <Modal useType="fixedButton" onSubmitMyYps={handleSubmitMessage} />
          <HeartCanvas hMin={360} hMax={360} bgColor="transparent" count={40} />
        </>
      )}
    </>
  );
}
