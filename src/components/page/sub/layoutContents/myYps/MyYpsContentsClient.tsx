"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import type { Letter } from "@/types/letter";
import MyYpsContents from "@/components/page/sub/layoutContents/myYps/MyYpsContents";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const PAGE_SIZE = 50;

export default function MyYpsContentsClient({
  initialMessages,
}: {
  initialMessages: Letter[];
}) {
  const t = useTranslations("toast");

  const [messages, setMessages] = useState<Letter[]>(initialMessages);
  const [page, setPage] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(
    initialMessages.length === 0
  );
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
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
      toast.error(t("letterLoad.error"));
      return [];
    }

    return data ?? [];
  }, []);

  // ✅ 초기 로딩
  useEffect(() => {
    (async () => {
      setIsInitialLoading(true);
      const first = await fetchPage(0);
      setMessages(first);
      setIsInitialLoading(false);
      setPage(0);
      setShowAllLoadedNotice(false);
    })();
  }, [fetchPage]);

  // ✅ Load More 핸들러
  const handleLoadMore = useCallback(async () => {
    if (isLoadMoreLoading) return;

    setIsLoadMoreLoading(true);
    setShowAllLoadedNotice(false);

    const nextPage = page + 1;
    const next = await fetchPage(nextPage);

    if (next.length > 0) {
      setMessages((prev) => [...prev, ...next]);
      setPage(nextPage);
    } else {
      setShowAllLoadedNotice(true);
    }

    setIsLoadMoreLoading(false);
  }, [isLoadMoreLoading, page, fetchPage]);

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

      const { data, error } = await supabase
        .from("letters")
        .insert({ user_id: user.id, username, content })
        .select()
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
        }
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
    />
  );
}
