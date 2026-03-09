import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

import TitleArea from "@/components/page/sub/titleArea/TitleArea";
import PageBackground from "@/components/layout/pageBackground/PageBackground";

interface Props {
  pageName: string;
  children: ReactNode;
}

export default function SubPageLayout({ children, pageName }: Props) {
  function getPageText() {
    if (pageName === "myLetters") return "subPage.myLetters";
    if (pageName === "myYps") return "subPage.myYps";
  }

  const pageTextKey = getPageText();
  const t = useTranslations(pageTextKey);

  function getGap() {
    if (pageTextKey?.includes("myLetters")) return "myLetters";
    if (pageTextKey?.includes("myYps")) return "myYps";
  }

  const gapName = getGap();

  return (
    <PageBackground styleType="sub">
      <TitleArea gapName={gapName} title={t("title")} desc={t("description")} />
      {children}
    </PageBackground>
  );
}
