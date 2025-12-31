"use client";

import SubPageLayout from "@/components/page/sub/layout/SubPageLayout";
import ContentsArea from "@/components/page/sub/contents/ContentsArea";
import TitleArea from "@/components/page/sub/titleArea/TitleArea";
import MyLettersContentsClient from "@/clientPage/MyLettersContentsClient";
import { useTranslations } from "next-intl";

export default function MyLettersPage() {
  const t = useTranslations("subPage.myLetters");

  return (
    <SubPageLayout
      title={t("title")}
      isVisual={true}
      description={t("description")}
    >
      <ContentsArea>
        <TitleArea title={t("title")} />
        <MyLettersContentsClient isBackground={false} />
      </ContentsArea>
    </SubPageLayout>
  );
}
