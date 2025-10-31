"use client";

import { useState, useRef } from "react";

import { useTranslations } from "next-intl";
import HeartCanvas from "@/components/canvas/HeartCanvas";
import LetterCard from "@/components/letterCard/LetterCard";
import DetailTop from "@/components/subPage/detail/DetailTop";
import DetailButtons from "@/components/subPage/detail/DetailButtons";
import SubTop from "@/components/subPage/contents/SubTop";
import styles from "@/app/[locale]/my-yps/detail/[id]/fullDetail.module.css";

export default function FullDetail({ letter }: any) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tModalMenu = useTranslations("auth.modalMenuDropdown");
  const menus = (tModalMenu.raw("menus") as string[]) || [];

  function handleSelect() {
    setOpen(false);
  }

  return (
    <>
      <HeartCanvas hMin={360} hMax={360} bgColor="transparent" count={40} />

      <SubTop
        rightComponent={
          <DetailButtons
            useType="detail"
            dropdownMenus={menus}
            buttonRef={buttonRef}
            onDropdownToogle={() => setOpen((v) => !v)}
            openState={open}
            onClose={() => setOpen(false)}
            onSelect={handleSelect}
          />
        }
      />

      <div className={styles.subContentsWrapper}>
        <DetailTop data={letter} useType="detail" />
        <LetterCard useType="detail" isEllipsis={false} item={letter} />
      </div>
    </>
  );
}
