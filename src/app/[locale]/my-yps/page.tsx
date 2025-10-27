"use client";

import { useCallback, useEffect, useState } from "react";

import Header from "@/components/header/Header";
import Main from "@/components/main/Main";

import HeartCanvas from "@/components/canvas/HeartCanvas";
import { Modal } from "@/components/modal/Modal";
import SubPageLayout from "@/components/subPage/layout/SubPageLayout";
import MyYpsContents from "@/components/subPage/layoutContents/MyYpsContents";

import { supabase } from "@/lib/supabaseClient";

import type { Letter } from "@/types/letter";

export default function Page() {
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

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

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

      // ✅ 유저 이름 계산
      const username =
        user.user_metadata?.name || user.email?.split("@")[0] || "익명";

      // ✅ DB 저장 시 username 추가
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

      await fetchMessages();
    },
    [fetchMessages]
  );

  return (
    <>
      <Header name="default" />
      <Main background="gray">
        <SubPageLayout isVisual={false}>
          <MyYpsContents items={messages} isLoading={isLoading} />
          <Modal useType="fixedButton" onSubmitMyYps={handleSubmitMessage} />
        </SubPageLayout>
      </Main>
      <HeartCanvas hMin={360} hMax={360} bgColor="transparent" count={40} />
    </>
  );
}
