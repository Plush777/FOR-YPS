import Header from "@/components/header/Header";
import Main from "@/components/main/Main";
import SubInner from "@/components/subPage/layout/SubInner";
import SubPageLayout from "@/components/subPage/layout/SubPageLayout";

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
