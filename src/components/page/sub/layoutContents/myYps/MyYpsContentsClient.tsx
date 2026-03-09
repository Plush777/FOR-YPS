"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Letter } from "@/types/letter";
import MyYpsContents from "@/components/page/sub/layoutContents/myYps/MyYpsContents";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const PAGE_SIZE = 9;

export default function MyYpsContentsClient({
  initialMessages,
}: {
  initialMessages: Letter[];
}) {
  const t = useTranslations("toast");

  const [hasMore, setHasMore] = useState(true);
  const [messages, setMessages] = useState<Letter[]>(initialMessages);
  const [page, setPage] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(
    initialMessages.length === 0,
  );
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [showAllLoadedNotice, setShowAllLoadedNotice] = useState(false);

  const fetchPage = useCallback(
    async (pageIndex: number) => {
      const from = pageIndex * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, error } = await supabase
        .from("letters")
        .select("id, user_id, username, content, created_at, author_avatar_url")
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) {
        console.error("❌ 메시지 불러오기 실패:", error);
        toast.error(t("letterLoad.error"));
        return [];
      }

      return data ?? [];
    },
    [t],
  );

  // ✅ 초기 로딩
  useEffect(() => {
    (async () => {
      setIsInitialLoading(true);

      const first = await fetchPage(0);
      setMessages(first);
      setPage(0);

      setHasMore(first.length === PAGE_SIZE); // ✅ 9개 꽉 차면 더 있을 가능성
      setShowAllLoadedNotice(first.length < PAGE_SIZE); // ✅ 선택(원하면)
      setIsInitialLoading(false);
    })();
  }, [fetchPage]);

  // ✅ Load More 핸들러
  const handleLoadMore = useCallback(async () => {
    if (isLoadMoreLoading || !hasMore) return;

    setIsLoadMoreLoading(true);

    const nextPage = page + 1;
    const next = await fetchPage(nextPage);

    if (next.length > 0) {
      setMessages((prev) => [...prev, ...next]);
      setPage(nextPage);
    }

    // ✅ 다음이 9개보다 적으면 더 이상 없음
    const stillHasMore = next.length === PAGE_SIZE;
    setHasMore(stillHasMore);
    setShowAllLoadedNotice(!stillHasMore);

    setIsLoadMoreLoading(false);
  }, [isLoadMoreLoading, hasMore, page, fetchPage]);

  // ✅ 유저가 글 쓰기 버튼으로 입력한 값 반영 + Toast
  useEffect(() => {
    const handler = async (e: any) => {
      const content = e.detail;

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const username =
        user.user_metadata?.name || user.email?.split("@")[0] || "익명";

      // ✅ provider 상관없이 avatar url 추출 (google/kakao 등)
      const author_avatar_url =
        user.user_metadata?.avatar_url ||
        user.user_metadata?.picture ||
        user.user_metadata?.profile_image_url || // 카카오에서 종종 사용
        user.user_metadata?.thumbnail_image_url || // 카카오 썸네일 키 가능성
        null;

      const { data, error } = await supabase
        .from("letters")
        .insert({ user_id: user.id, username, content, author_avatar_url })
        .select("id, user_id, username, content, created_at, author_avatar_url")
        .single();

      if (error) {
        console.error(error);
        toast.error(t("letterEnroll.error"));
        return;
      }

      toast.success(t("letterEnroll.success"));

      setMessages((prev) => {
        if (prev.find((m) => m.id === data.id)) return prev;
        return [data, ...prev];
      });
    };

    window.addEventListener("yps-add-message", handler);
    return () => window.removeEventListener("yps-add-message", handler);
  }, []);

  // ✅ Realtime (INSERT / UPDATE / DELETE 모두 처리)
  useEffect(() => {
    const channel = supabase
      .channel("letters-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "letters" },
        (payload) => {
          console.log("🔄 Realtime 변화 감지:", payload);

          setMessages((prev) => {
            // ✅ INSERT
            if (payload.eventType === "INSERT") {
              const newMessage = payload.new as Letter;
              if (prev.find((m) => m.id === newMessage.id)) return prev;
              return [newMessage, ...prev];
            }

            // ✅ UPDATE
            if (payload.eventType === "UPDATE") {
              const updated = payload.new as Letter;
              return prev.map((m) => (m.id === updated.id ? updated : m));
            }

            // ✅ DELETE
            if (payload.eventType === "DELETE") {
              const deletedId = payload.old.id;
              return prev.filter((m) => m.id !== deletedId);
            }

            return prev;
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <MyYpsContents
      items={messages}
      isInitialLoading={isInitialLoading}
      isLoadMoreLoading={isLoadMoreLoading}
      onLoadMore={handleLoadMore}
      showAllLoadedNotice={showAllLoadedNotice}
      hasMore={hasMore}
    />
  );
}
