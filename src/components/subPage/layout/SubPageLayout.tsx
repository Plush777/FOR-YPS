import type { ReactNode } from "react";
import TopDownButton from "@/components/topDownButton/TopDownButton";
import PageBackground from "@/components/pageBackground/PageBackground";
import MyYpsContents from "@/components/subPage/layoutContents/MyYpsContents";
import AboutLayoutContents from "@/components/subPage/layoutContents/AboutLayoutContents";

interface Props {
  children: ReactNode;
  styleType: string;
  description?: string;
}

export default function SubPageLayout({
  children,
  description,
  styleType,
}: Props) {
  function contentsCondition() {
    if (styleType === "common") {
      return (
        <AboutLayoutContents description={description}>
          {children}
        </AboutLayoutContents>
      );
    }
    if (styleType === "myYps") return <MyYpsContents />;
  }

  return (
    <PageBackground styleType="sub">
      {contentsCondition()}
      <TopDownButton />
    </PageBackground>
  );
}
