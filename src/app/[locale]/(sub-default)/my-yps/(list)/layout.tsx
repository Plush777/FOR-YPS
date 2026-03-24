import MyYpsContentsClient from "@/components/page/sub/layoutContents/myYps/MyYpsContentsClient";
import PageBackground from "@/components/layout/pageBackground/PageBackground";
import WriteButton from "@/components/button/writeButton/WriteButton";
import TitleArea from "@/components/page/sub/titleArea/TitleArea";
import Inner from "@/components/layout/inner/Inner";

import { useTranslations } from "next-intl";

export default function ListLayout({ children, modal }: any) {
  const t = useTranslations("subPage.myYps");

  return (
    <PageBackground styleType="sub">
      <Inner type="onlyTop">
        <TitleArea gapName="myYps" title={t("title")} desc={t("description")} />
        <MyYpsContentsClient initialMessages={[]} />
        {children}
        {modal}
      </Inner>

      <WriteButton />
    </PageBackground>
  );
}
