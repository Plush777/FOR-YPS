import Header from "@/components/header/Header";
import Main from "@/components/main/Main";
import SubInner from "@/components/subPage/layout/SubInner";
import SubPageLayout from "@/components/subPage/layout/SubPageLayout";
import MyYpsContentsClient from "@/components/subPage/layoutContents/MyYpsContentsClient";
import WriteButton from "@/components/button/WriteButton";

export default function ListLayout({ children, modal }: any) {
  return (
    <>
      <Header name="default" />
      <Main background="gray">
        <SubPageLayout isVisual={false}>
          <SubInner>
            <MyYpsContentsClient initialMessages={[]} />
            {children}
            {modal}
          </SubInner>

          {/* ✅ 클라이언트에서 조건 판단 */}
          <WriteButton />
        </SubPageLayout>
      </Main>
    </>
  );
}
