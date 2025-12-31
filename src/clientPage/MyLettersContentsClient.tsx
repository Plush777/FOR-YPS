"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Letter } from "@/types/letter";
import MyYpsContents from "@/components/page/sub/layoutContents/myYps/MyYpsContents";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

const PAGE_SIZE = 50;

interface Props {
  isBackground?: boolean;
}

export default function MyLettersContentsClient({ isBackground }: Props) {
  const t = useTranslations("toast");

  const [messages, setMessages] = useState<Letter[]>([]);
  const [page, setPage] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isLoadMoreLoading, setIsLoadMoreLoading] = useState(false);
  const [showAllLoadedNotice, setShowAllLoadedNotice] = useState(false);

  const fetchPage = useCallback(async (pageIndex: number) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    const from = pageIndex * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    const { data, error } = await supabase
      .from("letters")
      .select("id, username, content, created_at")
      .eq("user_id", user.id) // ✅ 핵심
      .order("created_at", { ascending: false })
      .range(from, to);

    if (error) {
      toast.error(t("letterLoad.error"));
      return [];
    }

    return data ?? [];
  }, []);

  useEffect(() => {
    (async () => {
      setIsInitialLoading(true);
      const first = await fetchPage(0);
      setMessages(first);
      setIsInitialLoading(false);
      setPage(0);
    })();
  }, [fetchPage]);

  const handleLoadMore = async () => {
    if (isLoadMoreLoading) return;

    setIsLoadMoreLoading(true);
    const nextPage = page + 1;
    const next = await fetchPage(nextPage);

    if (next.length) {
      setMessages((prev) => [...prev, ...next]);
      setPage(nextPage);
    } else {
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
      isBackground={isBackground}
    />
  );
}
