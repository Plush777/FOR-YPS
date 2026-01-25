"use client";

import { supabase } from "@/lib/supabase/client";
import { useState, useRef, ReactNode, useEffect } from "react";
import React from "react";
import dynamic from "next/dynamic";

import { useTranslations } from "next-intl";
import {
  LetterModalSkeletonContent,
  LetterModalSkeletonTop,
  LetterModalSkeletonButtons,
} from "@/components/layout/skeleton/letterModal/LetterModalSkeleton";
import DetailTop from "@/components/page/sub/detail/detailTop/DetailTop";
import DetailButtons from "@/components/page/sub/detail/detailButtons/DetailButtons";
import SubTop from "@/components/page/sub/subTop/SubTop";
import styles from "@/app/[locale]/(sub-default)/my-yps/detail/[id]/fullDetail.module.css";

type Props = {
  data: any;
  currentUser: any;
  isMyLetter: boolean;
  isLoggedIn: boolean;
  children?: ReactNode;
};

export default function FullDetail({
  data,
  currentUser,
  isMyLetter,
  isLoggedIn,
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState<string>("");

  const avatarCondition =
    data?.author_avatar_url || "/images/common/img-user-default.png";

  const buttonRef = useRef<HTMLButtonElement>(null);
  const tModalMenu = useTranslations("auth.modalMenuDropdown");
  const menus = (tModalMenu.raw("menus") as string[]) || [];

  const isLoading = !data;

  const HeartCanvas = dynamic(
    () => import("@/components/page/sub/canvas/HeartCanvas"),
    { ssr: false },
  );

  // ✅ 데이터가 도착/변경될 때 원본 내용으로 동기화 (편집모드 아닐 때만)
  useEffect(() => {
    if (data?.content && !editMode) {
      setEditedText(data.content);
    }
  }, [data?.content, editMode]);

  // ✅ 수정 시작: 기존 내용 주입 + 편집모드 true
  function handleEditStart() {
    setEditedText(data?.content ?? "");
    setEditMode(true);
  }

  // ✅ 취소: 원래 내용 복구 + 편집모드 종료
  function handleCancel() {
    setEditedText(data?.content ?? "");
    setEditMode(false);
  }

  // ✅ 저장
  async function handleSave() {
    const { error } = await supabase
      .from("letters")
      .update({ content: editedText })
      .eq("id", data.id);

    if (!error) {
      data.content = editedText; // UI 즉시 반영
      setEditMode(false);
    }
  }

  console.log("currentUser", currentUser);

  return (
    <>
      <HeartCanvas hMin={360} hMax={360} bgColor="transparent" count={40} />

      <SubTop
        rightComponent={
          <>
            {isLoading ? (
              <LetterModalSkeletonButtons useType="detail" />
            ) : (
              <DetailButtons
                useType="detail"
                dropdownMenus={menus}
                buttonRef={buttonRef}
                onDropdownToogle={() => setOpen((v) => !v)}
                openState={open}
                onClose={() => setOpen(false)}
                onSelect={() => setOpen(false)}
                isLoggedIn={!!currentUser}
                isMyLetter={!!isMyLetter}
                onEdit={handleEditStart}
                data={data}
              />
            )}
          </>
        }
      />

      <div className={styles.subContentsWrapper}>
        {isLoading ? (
          <LetterModalSkeletonTop useType="detail" />
        ) : (
          <DetailTop
            avatarCondition={avatarCondition}
            data={data}
            useType="detail"
          />
        )}

        {isLoading ? (
          <LetterModalSkeletonContent useType="detail" />
        ) : (
          React.isValidElement(children) &&
          React.cloneElement(children as any, {
            editMode,
            editedText,
            setEditedText,
            onSave: handleSave,
            onCancel: handleCancel,
          })
        )}
      </div>
    </>
  );
}
