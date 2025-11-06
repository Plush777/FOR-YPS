import Header from "@/components/layout/header/base/Header";
import Main from "@/components/page/main/base/Main";
import SubInner from "@/components/page/sub/layout/subInner/SubInner";
import SubPageLayout from "@/components/page/sub/layout/SubPageLayout";

export default function DetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header name="default" />
      <Main background="gray">
        <SubPageLayout isVisual={false}>
          <SubInner width="large">{children}</SubInner>
        </SubPageLayout>
      </Main>
    </>
  );
}
