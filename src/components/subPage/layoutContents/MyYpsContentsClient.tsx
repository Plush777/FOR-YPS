"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Letter } from "@/types/letter";
import MyYpsContents from "./MyYpsContents";

const PAGE_SIZE = 50;

export default function MyYpsContentsClient({
  initialMessages,
}: {
  initialMessages: Letter[];
}) {
  const [messages, setMessages] = useState<Letter[]>(initialMessages);
  const [page, setPage] = useState(0);

  // ✅ 로딩 상태 분리: 초기 로딩 vs 더보기 로딩
  const [isInitialLoading, setIsInitialLoading] = useState(
    initialMessages.length === 0
  );

  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);

  // ✅ “모든 메시지 로드 완료” 문구는 ‘클릭했는데 더 이상 없을 때’만 보여줌
  const [showAllLoadedNotice, setShowAllLoadedNotice] = useState(false);

  const fetchPage = useCallback(async (pageIndex: number) => {
    const from = pageIndex * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from("letters")
      .select("id, username, content, created_at")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      console.error("❌ 메시지 불러오기 실패:", error);
      return [];
    }
    return data ?? [];
  }, []);

  // ✅ 초기 로딩: 스켈레톤만, 버튼은 “더보기”로 유지
  useEffect(() => {
    (async () => {
      setIsInitialLoading(true);
      const first = await fetchPage(0);
      setMessages(first);
      setIsInitialLoading(false);
      setPage(0);
      setShowAllLoadedNotice(false); // 초기 진입 시 안내문은 감추기
    })();
  }, [fetchPage]);

  // ✅ Realtime (INSERT만 반영: 상단 prepend)
  useEffect(() => {
    const channel = supabase
      .channel("letters-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "letters" },
        (payload) => {
          const newMessage = payload.new as Letter;
          setMessages((prev) => [newMessage, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ✅ “더보기” 클릭: 이때만 로딩 문구로 바뀌고, 결과 0개면 안내문 노출
  const handleLoadMore = async () => {
    if (isLoadMoreLoading) return;
    setIsLoadMoreLoading(true);
    setShowAllLoadedNotice(false); // 새로운 클릭 시 기존 안내문 감추기(선택)

    const nextPage = page + 1;
    const next = await fetchPage(nextPage);

    if (next.length > 0) {
      setMessages((prev) => [...prev, ...next]);
      setPage(nextPage);
    } else {
      // ✅ 클릭했는데 더 가져올 데이터가 없을 때만 안내문 표시
      setShowAllLoadedNotice(true);
    }

    setIsLoadMoreLoading(false);
  };

  return (
    <MyYpsContents
      items={messages}
      isInitialLoading={isInitialLoading}
      isLoadMoreLoading={isLoadMoreLoading}
      onLoadMore={handleLoadMore}
      showAllLoadedNotice={showAllLoadedNotice}
    />
  );
}
