"use client";

import { usePathname } from "@/i18n/routing";
import { Modal } from "@/components/modal/Modal";
import { useEffect, useState } from "react";

export default function WriteButton() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // ✅ hydration mismatch 방지 (SSR 고려)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDetailPage =
    pathname.includes("/my-yps/detail") ||
    pathname.includes("/my-yps/(detail)");

  // ✅ 상세 모달/페이지에서는 버튼 숨김
  if (isDetailPage) return null;

  return (
    <Modal
      useType="fixedButton"
      onSubmitMyYps={(message) => {
        window.dispatchEvent(
          new CustomEvent("yps-add-message", { detail: message })
        );
      }}
    />
  );
}
