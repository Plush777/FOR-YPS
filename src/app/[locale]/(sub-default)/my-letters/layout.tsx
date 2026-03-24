import PageBackground from "@/components/layout/pageBackground/PageBackground";
import Inner from "@/components/layout/inner/Inner";
import TitleArea from "@/components/page/sub/titleArea/TitleArea";

import { useTranslations } from "next-intl";

export default function ListLayout({ children }: any) {
  const t = useTranslations("subPage.myLetters");

  return (
    <PageBackground styleType="sub">
      <Inner type="wide">
        <TitleArea
          gapName="myLetters"
          title={t("title")}
          desc={t("description")}
        />
        {children}
      </Inner>
    </PageBackground>
  );
}
