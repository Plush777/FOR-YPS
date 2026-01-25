import SubPageLayout from "@/components/page/sub/layout/SubPageLayout";
import SubInner from "@/components/page/sub/layout/subInner/SubInner";
import WriteButton from "@/components/button/writeButton/WriteButton";
import Main from "@/components/page/main/base/Main";

export default function SubDefaultLayout({
  children,
  isDetail,
  isWrite,
  isCanvas,
}: {
  children: React.ReactNode;
  isDetail: boolean;
  isWrite: boolean;
  isCanvas: boolean;
}) {
  return (
    <Main isCanvas={isCanvas} background="gray">
      <SubPageLayout isVisual={false}>
        <SubInner width={isDetail ? "large" : "default"}>{children}</SubInner>
        {isWrite && <WriteButton />}
      </SubPageLayout>
    </Main>
  );
}
