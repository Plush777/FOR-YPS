import SubPageLayout from "@/components/page/sub/layout/SubPageLayout";
import SubInner from "@/components/page/sub/layout/subInner/SubInner";
import WriteButton from "@/components/button/writeButton/WriteButton";
import Main from "@/components/page/main/base/Main";
import TitleArea from "@/components/page/sub/titleArea/TitleArea";

import { useTranslations } from "next-intl";

export default function SubDefaultLayout({
  children,
  isDetail,
  isWrite,
  isCanvas,
  isTitle,
}: {
  children: React.ReactNode;
  isDetail: boolean;
  isWrite: boolean;
  isCanvas: boolean;
  isTitle: boolean;
}) {
  const t = useTranslations("subPage.myYps.letter");

  return (
    <Main isCanvas={isCanvas} background="gray">
      <SubPageLayout>
        <SubInner width={isDetail ? "large" : "default"}>
          {isTitle && (
            <TitleArea
              gapName="myYps"
              title={t("title")}
              desc={t("description")}
            />
          )}
          {children}
        </SubInner>
        {isWrite && <WriteButton />}
      </SubPageLayout>
    </Main>
  );
}
