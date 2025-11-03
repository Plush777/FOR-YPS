"use client";

import React, { ReactNode, useRef, useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useTranslations } from "next-intl";

import styles from "@/components/letterModal/letterModal.module.css";
import ModalClose from "@/components/svg/ModalClose";
import DetailTop from "@/components/subPage/detail/DetailTop";
import DetailButtons from "@/components/subPage/detail/DetailButtons";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";
import {
  LetterModalSkeletonHeader,
  LetterModalSkeletonTop,
  LetterModalSkeletonButtons,
  LetterModalSkeletonContent,
} from "@/components/letterModal/LetterModalSkeleton";
import Button from "@/components/button/Button";
import { LetterModalHeader } from "../modal/modalHeader/ModalHeader";

interface Props {
  width?: string;
  children: ReactNode;
  onClose: () => void;
  data: any;
  currentUser?: any;
  isMyLetter?: boolean;
}

export function LetterModal({
  width = "default",
  children,
  onClose,
  data,
  currentUser,
  isMyLetter,
}: Props) {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState<string>("");

  const buttonRef = useRef<HTMLButtonElement>(null);
  const tModalMenu = useTranslations("auth.modalMenuDropdown");
  const menus = (tModalMenu.raw("menus") as string[]) || [];

  const isLoading = !data;

  // ✅ 데이터가 도착/변경될 때 원본 내용으로 동기화 (편집모드 아닐 때만)
  useEffect(() => {
    if (data?.content && !editMode) {
      setEditedText(data.content);
    }
  }, [data?.content, editMode]);

  // ✅ 수정 시작: 먼저 현재 내용 주입 → 그 다음 editMode = true
  function handleEditStart() {
    setEditedText(data?.content ?? "");
    setEditMode(true);
  }

  // ✅ 취소: 원래 내용 복구 + 편집모드 종료
  function handleCancel() {
    setEditedText(data?.content ?? "");
    setEditMode(false);
  }

  async function handleSave() {
    const { error } = await supabase
      .from("letters")
      .update({ content: editedText })
      .eq("id", data.id);

    if (!error) {
      // UI 즉시 반영
      data.content = editedText;
      setEditMode(false);
    }
  }

  useBodyScrollLock(true);

  return (
    <div onClick={onClose} className={styles.overlay}>
      <section
        onClick={(e) => e.stopPropagation()}
        className={`${styles.modal} ${
          width === "large"
            ? styles.widthLarge
            : width === "small"
            ? styles.widthSmall
            : styles.widthDefault
        }`}
      >
        {isLoading ? (
          <LetterModalSkeletonHeader />
        ) : (
          <LetterModalHeader>
            <Button
              rounded="roundedMd"
              onlyIcon={true}
              iconSize="lg"
              color="transparent-gray"
              onClick={onClose}
            >
              <ModalClose />
            </Button>
          </LetterModalHeader>
        )}

        <div className={styles.modalBody}>
          <div className={styles.modalBodyColumn}>
            {isLoading ? (
              <LetterModalSkeletonTop useType="modal" />
            ) : (
              <DetailTop data={data} useType="modal" />
            )}

            {isLoading ? (
              <LetterModalSkeletonButtons useType="modal" />
            ) : (
              <DetailButtons
                useType="modal"
                dropdownMenus={menus}
                buttonRef={buttonRef}
                onDropdownToogle={() => setOpen((v) => !v)}
                openState={open}
                onClose={() => setOpen(false)}
                onSelect={() => setOpen(false)}
                isLoggedIn={!!currentUser}
                isMyLetter={!!isMyLetter}
                onEdit={handleEditStart}
              />
            )}

            <div
              className={`${styles.whiteDimmed} ${open ? styles.active : ""}`}
            >
              {isLoading ? (
                <LetterModalSkeletonContent useType="modal" />
              ) : (
                React.cloneElement(children as any, {
                  editMode,
                  editedText,
                  setEditedText,
                  onSave: handleSave,
                  onCancel: handleCancel, // ✅ 취소 전달
                })
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
