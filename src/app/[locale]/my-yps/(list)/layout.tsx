import Header from "@/components/layout/header/base/Header";
import Main from "@/components/page/main/base/Main";
import SubInner from "@/components/page/sub/layout/subInner/SubInner";
import SubPageLayout from "@/components/page/sub/layout/SubPageLayout";
import MyYpsContentsClient from "@/components/page/sub/layoutContents/myYps/MyYpsContentsClient";
import WriteButton from "@/components/button/writeButton/WriteButton";

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
