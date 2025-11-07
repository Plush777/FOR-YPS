"use client";

import { toast } from "react-toastify";
import { useTranslations } from "next-intl";

export function useClipboard() {
  const t = useTranslations("toast.copyUrl");

  const copyUrl = async (text?: string) => {
    try {
      const url = text || window.location.href;
      await navigator.clipboard.writeText(url);

      toast.success(t("success"));
    } catch (error) {
      console.error("Copy failed:", error);
      toast.error(t("error"));
    }
  };

  return { copyUrl };
}
